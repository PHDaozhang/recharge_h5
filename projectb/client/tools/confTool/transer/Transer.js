var path = require("path");
var fs = require("fs");

var NUM_EXP = /(^([\-]?[\d]+)$)|(^([\-]?[\d]+\.[\d]+)$)/

module.exports = function(opt, sheetName, sheet, pIdName){
	this.input = sheetName;
    this.opt = opt;
	this.sheet = sheet;
    this.idName = opt.idName;
	this.isOutList = opt.idName ? 1 : 0; //1为列表  0为数组;
	this.pIdName = pIdName;

	this.key2Idx; //
    this.outResult;	
	
	this.stCol = opt.stCol || 4;
	
	this.colArr = [];
	this.allColList = {};
    this.maxRow = 0;

    this._initColMap = function(){
        var sheet = this.sheet;

		var colMap = {};
		var allColList = this.allColList;
		var ignores = this.opt.ignores || [];
		var includes = this.opt.includes;
		var key, colData;
        for( key in sheet ){
			if(key[0] == "!") continue;
				
            var row = parseInt(key.match(/\d+$/)[0]);
			var colName = key.match(/^[A-Za-z]+/)[0];
			colData = allColList[colName];
			if( !colData ){
				colData = {colName:colName, valCnt:0};
				allColList[colName] = colData;
			}
			
			if( row==1 ){//描述
				if(sheet[key]){
                    var desc = sheet[key].v;
                    if(desc) {
						colData.desc = desc.replace(/\r\n/g, "  " );
					}
                }
			}
            else if(row == 2){//类型
                if(sheet[key]){
                    var type = sheet[key].v;
                    if(type) colData.tp = type;
                }
            }
			else if(row == 3){
                if(sheet[key]){//键值
                    var name = sheet[key].v;
                    if(name){
						name = name.toString();
						if(name[0] == "#"){
							name = name.substring(1);
							this.idName = name;
							this.isOutList = 1;
						}
						colData.name = name.toString();
						if( (includes && includes.indexOf(name)>=0) || ignores.indexOf(name) < 0 ){
							var tmpColData = colMap[name];
							if( tmpColData ){
								var otherCols = tmpColData.otherCols || [];
								otherCols.push(colData);
								tmpColData.otherCols = otherCols;
							}
							else{
								colMap[name] = colData;
							}
						}
					}
                }
            }
			
			if(this.maxRow < row) this.maxRow = row;
        }
		
		var colArr = this.colArr;
		for( key in colMap )
		{
			colData = colMap[key];
			colArr.push(colMap[key]);
		}
		
		//colArr.sort( function(a,b){ return a.colName>b.colName?1:-1} );
    };

    this._parse = function(){
		var sheet = this.sheet;
		var colArr = this.colArr;
		var idName = this.idName;
		var colLen = colArr.length;
		
		var isOutList = this.isOutList;
		if( this.pIdName ) isOutList = 0;//对于子表 内部只存数组形式  isOutList只用于合并时

		var result = isOutList?{}:[];
		this.outResult = result;
		
		var i, j, m, len;
		var colData, cellName, cellValue;
        for( i = this.stCol, len=this.maxRow; i <= len; ++i ){
            var rowData = {};
            for( j=0; j<colLen; ++j ){
                colData = colArr[j];
				var otherCols = colData.otherCols;
				var isMutil = !!otherCols;
                cellName = colData.colName+i;
				var cell = sheet[cellName];
				if( cell ){
					cellValue = this._transValue(cell.v, colData.tp);
					if( cellValue != null ){
						this._assignVal(rowData,cellValue,colData.name, isMutil);
						colData.valCnt++;
					}
				} 

				if( isMutil ){
					for( m=0; m<otherCols.length; ++m ){
						colData = otherCols[m];
						cellName = colData.colName+i;
						cell = sheet[cellName];
						if( cell ){
							cellValue = this._transValue(cell.v, colData.tp);
							if( cellValue != null ){
								this._assignVal(rowData,cellValue,colData.name,isMutil);
							}
						} 
					}
				}
            }

			this._saveRowData( i, isOutList, idName, rowData );
        }
		//console.log( JSON.stringify(result) );
		
		// if( isOutList ){
		// 	for( j=0; j<colLen; ++j ){
        //         colData = colArr[j];
		// 		if( colData.name == idName ){
		// 			colArr.splice(j,1);
		// 			break;
		// 		}
		// 	}
		// }
	};
	
	this._saveRowData = function( row, isOutList, idName, rowData ){
		var result = this.outResult;
		if( isOutList ){
			var id = rowData[idName];
			if(id == null || id === "") return;	
			
			if(result[id] != null) {
				console.warn("%s ： 数据结果中已经存在id为【%s】的数据，将会进行覆盖！【第%d行数据】", this.input, id, row);
				console.log( JSON.stringify(rowData) );
			}
			if( this.opt.keepKey === 0 ) delete rowData[idName];

			result[id] = rowData;
		}
		else{
			result.push( rowData );
		}		
	}
	
    this._transValue = function(value, tp){
        if(value == null) return null;
		if( value === "" ) return null;
		
		if( value == undefined ) return null;
			
		value = value.toString();
		if( tp== "any" ){
			if( value.indexOf("|")>0 ){
				tp = "arr2";
			}
			else if( value.indexOf("_")>0 ){
				tp = "arr1";
			}
			else{
				if(value.search(NUM_EXP) == 0){
					tp = value.indexOf(".") > 0 ? "float" : "int";
				}
				else{
					tp = "string";
				}
			}
		}

		var tmpVal,tmpArr;
		switch( tp ){
			case "int":
				return parseInt(value);
			case "float":
				return parseFloat(value);
			case "string":
				value = value.toString();
				return value.replace(/[\r\n]/g, "");
			case "arr1": // 一维
				tmpVal = [];
				var tempArr = value.split("_");
				for (var i = 0, li = tempArr.length; i < li; i++) {
					var v = tempArr[i].trim();
					//console.log(v);
					if((v+"").search(NUM_EXP) == 0){
						v = v.indexOf(".") > 0 ? parseFloat(v) : parseInt(v);
					}
					tmpVal.push(v);
				}		
				return tmpVal
			case "arr2": // 二维
				tmpVal = [];
				var tempArr0 = value.split("|");
				for(var i = 0, li = tempArr0.length; i < li; ++i){
					var strI = tempArr0[i].trim();
					if(strI === ""){
						continue;
					}
					var tempArr1 = strI.split("_");
					var arr1 = [];
					for (var j = 0, lj = tempArr1.length; j < lj; j++) {
						var v = tempArr1[j].trim();
						if((v+"").search(NUM_EXP) == 0){
							v = v.indexOf(".") > 0 ? parseFloat(v) : parseInt(v);
						}
						arr1.push(v);
					}
					tmpVal.push(arr1);
				}
				return tmpVal;
			//default:
				//if( valHandler.hasOwnProperty( colData.tp ) ) {
					//return valHandler[funcName](value, row, colData);
				//}
		}
		
		return value;
    };
	
	this._assignVal = function(data, value, key, isMutil ){
		var idx = key.indexOf("_");
		var tmpVal;
		if( idx>0 ){
			//6. 复合数据（在一个字段下，挂多个不数据）  字段名之间用"_"连接    
			//		注：复合数据 不会处理成数组结构   如需要出现多个   可采用子表完成
			var tmpKey = key.substring(0,idx);
			var subKey = key.substr(idx+1);
			
			var tmpVal = data[tmpKey];
			if( !tmpVal ){
				tmpVal = {}; 
				data[tmpKey] = tmpVal;
			}
			
			this._assignVal( tmpVal, value, subKey, isMutil );
		}
		else{
			//同一个表出现重名字段时， 该字段将被解析为数组结构。  只支持单数据数组
			if( isMutil ){
				var tmpVal = data[key];
				if( tmpVal ){
					tmpVal.push( value );
				}
				else{
					data[key] = [value];
				}
			}
			else{
				data[key] = value;
			}
		}
    };
	
	this.transToArr = function(){
		var colArr = this.colArr;
		var colLen = colArr.length;
		var pIdName = this.pIdName;
		colArr.sort( function(a,b){ 
			return a.valCnt<b.valCnt?1:-1} 
		);
		 
		var key, idx=0, outIdx=0;
		var key2Idx = {};
		for( var i=0; i<colLen; ++i ){
			var colData = colArr[i];
			key = colData.name;
			var charIdx = key.indexOf("_");
			var desc = null;
			if( charIdx>0 ){
				key = key.substring(0,charIdx);
			}
			else{
				desc = colData.desc;
			}
			
			if( !key2Idx.hasOwnProperty(key) ){
				var info = {idx:idx, outIdx:outIdx, desc:desc, tp:colData.tp};
				key2Idx[key] = info;
				if( key != pIdName ){
					outIdx++;
				}
				else{
					info.rmv = 1;
				}
				idx++;
			}
		}

		this.key2Idx = key2Idx;
		
		var result = this.outResult;
		for( key in result ){
			var data = result[key];
			var tmpData = [];
			for( var subkey in data ){
				idx = key2Idx[subkey].idx;
				if(tmpData.length<idx){
					for( var i=tmpData.length; i<=idx; ++i ) tmpData.push(0);
				}
				tmpData[idx] = data[subkey];
			}
			//console.log( JSON.stringify(tmpData) );
			result[key] = tmpData;
		}
	}
	
    this.parse = function(){
        this._initColMap();
        this._parse();
		if( this.opt.outTp == 2 ){
			this.transToArr();
		}
	};
	
	this.outType = function( rowStartStr, addkeys ){
		var colArr = this.colArr;
		var colLen = colArr.length;

		var pIdName = this.pIdName;
		var typeDatas, j, tpStr;
		var objTypeList = {};
		var ret = "\r\n\r\n" + rowStartStr + "export interface " + this.getTypeName() + " {";
		for( j=0; j<colLen; ++j ){
			var colData = colArr[j];
			var colName = colData.name;
			var idx = colName.indexOf("_");

			tpStr = getTpStr( colData.tp, !!colData.otherCols );
			if( idx>0 ){
				//6. 复合数据（在一个字段下，挂多个不数据）  字段名之间用"_"连接    
				//		注：复合数据 不会处理成数组结构   如需要出现多个   可采用子表完成
				var tmpKey = colName.substring(0,idx);
				var subKey = colName.substr(idx+1);
				typeDatas = objTypeList[tmpKey];
				if( !typeDatas ){
					typeDatas = objTypeList[tmpKey] = [];
				}
				
				typeDatas.push( [subKey,tpStr,colData.desc] );
			}
			else{
				if( pIdName != colData.name ){
					ret += "\r\n" + rowStartStr + "\t" + colData.name + ":" + tpStr + ";";
					if(colData.desc) ret += "  //" + colData.desc;
				}
			}
		}

		var descStr;
		for( var key in objTypeList ){
			typeDatas = objTypeList[tmpKey];
			descStr = "";
			tpStr = "{"
			for( j=0; j<typeDatas.length; ++j ){
				if( j>0 ) tpStr+=",";
				let typeData = typeDatas[j];
				tpStr += typeData[0] + ":" + typeData[1];
				if( typeData[2] ) descStr += "  " + typeData[0] + ":" + typeData[2];
			}
			tpStr+="}";

			ret += "\r\n" + rowStartStr + "\t" + key + ":" + tpStr + ";";
			ret += "  //" + descStr;
		}

		if( addkeys ){
			for( j=0; j<addkeys.length; ++j ){
				let addKeyData = addkeys[j];
				ret += "\r\n" + rowStartStr + "\t" + addKeyData[0] + ":";
				if(  addKeyData[2] ){// list
					ret += "{[key:string]:" + addKeyData[1] + "};";
				}
				else{
					ret += addKeyData[1] + "[];";
				}
			}
		}

		ret += "\r\n" + rowStartStr + "}"
		return ret;
	}

	function getTpStr( tp, isMutil ){
		var str = tp || "any";
		switch( tp ){
			case "int":
				str = "number";
				break;
			case "float":
				str = "number";
				break;
			case "arr1": // 一维		
				str = "number[]";
				break;
			case "arr2": // 二维
				str = "number[][]";
				break;
		}

		if( isMutil ) str += "[]";
		return str;
	}

	this.getTypeName = function(){
		var name = "";
		var tempNames = this.input.split( "_" );
		var len = tempNames.length;
		if( len>2 ) len = 2;
		for( var j=0; j<len; ++j ){
			var tmpNm = tempNames[j];
			name += tmpNm[0].toUpperCase() + tmpNm.substring(1, tmpNm.length);
		}
		return name + "Conf";
	}
};
