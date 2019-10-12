var Transer = require("./Transer.js");

//公式转换器
module.exports = function(){
	Transer.apply(this, arguments);
	
    this._saveRowData = function( row, isOutList, idName, rowData ){
		if( !rowData.txt ) return;

		var result = this.outResult;
		

		if( isOutList ){
			var id = rowData.id;
			if(id == null) return;
			
			if(result[id]) {
				console.warn("%s ： 数据结果中已经存在id为【%s】的数据，将会进行覆盖！【第%d行数据】", this.input, id, row);
			}
	
			var colCnt = 2;
			delete rowData.id;

			var key = rowData.key;	
			if( key ){
				colCnt = 3;
				delete rowData.key;
				var info = {idx:id, outIdx:id, desc:"", tp:"int"};

				if( rowData.txt.length<100 ){
					info.desc = rowData.txt;
				}
				
				var key2Idx = this.key2Idx;
				if( !key2Idx ){
					key2Idx = {};
					this.key2Idx = key2Idx;
				}
				this.key2Idx[key] = info;
			}

			result[id] = rowData;
			if( this.colArr.length==colCnt){
				result[id] = rowData.txt;
			}
		}
		else{

			var colCnt = 1;
			var key = rowData.key;	
			if( key ){
				colCnt = 2;
				delete rowData.key;

				var idx = result.length;
				var info = {idx:idx, outIdx:idx, desc:"", tp:"int"};

				if( rowData.txt.length<100 ){
					info.desc = rowData.txt;
				}

				var key2Idx = this.key2Idx;
				if( !key2Idx ){
					key2Idx = {};
					this.key2Idx = key2Idx;
				}
				this.key2Idx[key] = info;
			}

			if( this.colArr.length==colCnt ){
				result.push(rowData.txt);
			}
			else{
				result.push(rowData);
			}
		}
    };

};