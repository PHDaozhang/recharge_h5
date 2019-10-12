var fs          = require("fs");
var path        = require('path');
var xlsx  =  require("xlsx");

var config = require("./config/config.js");

function getExcelFiles( dirPath, exFiles )
{
	var files = fs.readdirSync( dirPath );

	files.forEach( function(item){
			var extName = path.extname(item);
			if( extName == ".xlsx" ){
				exFiles.push( path.basename(item,".xlsx") );
			}
		});

};

function parseList( handleCfg ){
    var xlsxsFiles = handleCfg.xlsxs || [];
	if( xlsxsFiles.length==0 ){
		getExcelFiles( workUrl, xlsxsFiles );
	}

	var stores = [];
	var exXlsxs = handleCfg.exXlsxs || [];
    for(var i = 0; i < xlsxsFiles.length; ++i){
		var xlsxName = xlsxsFiles[i];
		if( exXlsxs.indexOf(xlsxName)>=0 ) continue;
		
        parseXlsxSheet(handleCfg, xlsxsFiles[i], stores);
    }
    return stores;
}

var defPropOp = {transer:"Prop", outTp:1, noStore:1};

function parseXlsxSheet( handleCfg, xlsxName, stores )
{
	var xlsxPath = path.join(workUrl, xlsxName+".xlsx");
	var fsResult = fs.existsSync( xlsxPath );
	if( !fsResult ){
		console.log( "file not exist xlsxPath=" + xlsxPath );
		return;
	}
	
	var storeList = {};
	stores.push( storeList );
	var workbook = xlsx.readFile(xlsxPath);
	var sheetOpts = handleCfg.sheets || [];
	var rmvSheets = handleCfg.rmvSheets || [];
	var defSheetOpt = handleCfg.defOp || {};
	var sheetNames = workbook.SheetNames;
	for( var i=0; i<sheetNames.length; ++i ){
		var sheetName = sheetNames[i];
		if( sheetName[0] != "@" ) continue;

		var realName = sheetName.substr(1);
		if( rmvSheets.indexOf(realName)>=0 ) continue;
		
		var idx = realName.indexOf("_");
		var mainSheetName = null;
		var parentIdName = null;
		if( idx>0 ){
			var keys = realName.split("_");
			if(keys.length<3){
				console.log( "not find parent key in sheetname, sheetname=" + realName + " xlsxName=" + xlsxName );
				continue;
			}
			
			mainSheetName = keys[0];
			if( rmvSheets.indexOf(mainSheetName)>=0 ) continue;
			
			parentIdName = keys[2];
		}
		
		var sheet = workbook.Sheets[sheetName];
		if( !sheet ){
			console.log( "sheet not find sheetName=" + realName + " xlsxName=" + xlsxName );
			continue;
		}

		var sheetOpt = sheetOpts[realName];		
		if(!sheetOpt) {
			sheetOpt = defSheetOpt;
			if( !parentIdName ){
				let len = realName.length;
				if( realName.substr(len-2) == "Tp" || (len>5 && realName.substr(len-5) == "Const") ){
					sheetOpt = defPropOp;
				}
			}
		}
	
		var transerName = sheetOpt.transer || "Transer";
		var TranserClass = require("./transer/" + transerName);
		var trans = new TranserClass( sheetOpt, realName, sheet, parentIdName );
		try{
			trans.parse();
		}
		catch(e){
			console.log( "err: file hand error  xlsxName=" + xlsxName + "  sheetName=" + sheetName + " e=" + e );
		}
		
		storeList[realName] = trans;
	}
}

function saveTsEnums( fileName, stores, confKey ){
	var needModuel = !(confKey=="server");
	var idKeyConstsContent = needModuel ? "module " + fileName + "\r\n{" : "";
	for( var i=0; i<stores.length; ++i ){
		var storeList = stores[i];
		for (var name in storeList) {
			var trans = storeList[name];
			if( trans.opt.outTp != 1 ) continue;

			var key2Idx = trans.key2Idx;
			//console.log( JSON.stringify(key2Idx) );
			if( key2Idx ) 
			{
				var tmpName = getSheetName(name);
				//if( tmpName.indexOf( "Const" )<0 ) tmpName+="Const";
				idKeyConstsContent += "\r\n\texport const enum " + tmpName + " \r\n\t{";
				//var maxIdx = 0;
				for( var keyName in key2Idx )
				{
					var keyData = key2Idx[keyName];
					if( keyData.rmv ) continue;
					
					if( typeof keyData.outIdx != "string" ){
						idKeyConstsContent += "\r\n\t\t" + keyName + " = " + keyData.outIdx + ",";
					}
					else{
						idKeyConstsContent += "\r\n\t\t" + keyName + " = '" + keyData.outIdx + "',";
					}
					if( keyData.desc ) idKeyConstsContent += "  //" + keyData.desc;

					//if( maxIdx < keyData.outIdx ) maxIdx = keyData.outIdx;
				}

				//idKeyConstsContent += "\r\n\t\tmax = " + (maxIdx+1) + ",";
				idKeyConstsContent += "\r\n\t}";
			}
		}
	}
	
	if( needModuel ) idKeyConstsContent += "\r\n}";
	
	fs.writeFileSync(path.join(outUrl, fileName + ".ts"), idKeyConstsContent);
}

function saveTsTransFun( fileName, stores ){
	var idKeyConstsContent = "module game{ export module " + fileName + "{ \r\n\
	var transList:any = {};\r\n\
	var fun:Function;\r\n\
	export function addRawConf( confName:string, data:any ):any{\r\n\
		var tmp = transList[confName];\r\n\
		if( tmp ) tmp.data = data;\r\n\
	}\r\n\
	export function getConf( confName:string, id:any ):any{\r\n\
		var tmp = transList[confName];\r\n\
		if( tmp ){\r\n\
			var dataList = tmp.data;\r\n\
			if( dataList ){\r\n\
				var data = dataList[id];\r\n\
				if( data ) {\r\n\
					return tmp.fun( data );\r\n\
				}\r\n\
			} \r\n\
		}\r\n\
		return null;\r\n\
	} \r\n";

	//先处理字表
	var mainList = {};
	var leftTrans = [];
	var name;
	for( var i=0; i<stores.length; ++i ){
		var storeList = stores[i];
		for ( name in storeList) {
			var trans = storeList[name];
			if( trans.opt.outTp != 2 ) continue;

			var idx = name.indexOf( "_" );
			if( idx < 0 ){
				leftTrans.push( trans );
				continue;
			}

			var key2Idx = trans.key2Idx;
			if( key2Idx ) 
			{
				var sheetName = getSheetName(name);
				var mainSheetName = sheetName.substring(0,idx);
				var keyName = sheetName.substr(idx+1);
				var keys = mainList[mainSheetName] || [];
				keys.push(keyName);
				mainList[mainSheetName] = keys;
				
				idKeyConstsContent += "\r\n\tfun = function(data):void{ var out:any={};";
				for( var keyName in key2Idx )
				{
					var keyData = key2Idx[keyName];
					if( keyData.rmv ) continue;
					
					if( keyData.tp=="int" || keyData.tp=="float" ){
						idKeyConstsContent += "\r\n\t\tout." + keyName + " = data[" + keyData.outIdx + "] || 0;";
					}
					else{
						idKeyConstsContent += "\r\n\t\tout." + keyName + " = data[" + keyData.outIdx + "];";
					}
					
					if( keyData.desc ) {
						idKeyConstsContent += "  //" + keyData.desc;
					}
				}

				idKeyConstsContent += "\r\n\treturn out;}";
				idKeyConstsContent += "\r\n\ttransList."+sheetName+"={fun:fun};\r\n";
			}
		}
	}
	
	for( var i=0; i<leftTrans.length; ++i ){
		var trans = leftTrans[i];
		var key2Idx = trans.key2Idx;
		if( key2Idx ) 
		{
			name = trans.input;
			idKeyConstsContent += "\r\n\tfun = function(data):any{ var out:any={};";
			for( var keyName in key2Idx )
			{
				var keyData = key2Idx[keyName];
				if( keyData.tp=="int" || keyData.tp=="float" ){
					idKeyConstsContent += "\r\n\t\tout." + keyName + " = data[" + keyData.outIdx + "] || 0;";
				}
				else{
					idKeyConstsContent += "\r\n\t\tout." + keyName + " = data[" + keyData.outIdx + "];";
				}
	
				if( keyData.desc ) {
					idKeyConstsContent += "  //" + keyData.desc;
				}
			}
			
			var subKeys = mainList[name];
			if( subKeys ){
				idKeyConstsContent += "\r\n\t\tvar i, len, subDatas;";
				for( var m=0; m<subKeys.length; ++m ){
					var subKey = subKeys[m];
					idKeyConstsContent += (m==0) ? "\r\n\t\tvar tmpDatas = [];" : "\r\n\t\t tmpDatas=[];";
					idKeyConstsContent += "\r\n\t\tout."+subKey+" = tmpDatas;";
					idKeyConstsContent += "\r\n\t\tsubDatas = data."+subKey;
					idKeyConstsContent += "\r\n\t\tfor( i=0, len=subDatas.length; i<len; ++i ){";
					idKeyConstsContent += "\r\n\t\t\tvar tmpData = {};";
					idKeyConstsContent += "\r\n\t\t\t"+name+"_"+subKey+"_arr2list(subDatas[i],tmpData);";
					idKeyConstsContent += "\r\n\t\t\ttmpDatas.push( tmpData);";
					idKeyConstsContent += "\r\n\t\t}";
				}
			}

			idKeyConstsContent += "\r\n\treturn out;}";
			idKeyConstsContent += "\r\n\ttransList." + getSheetName(name) +"={fun:fun};\r\n";
		}
	}
	
	idKeyConstsContent += "\r\n}}";
	
	fs.writeFileSync(path.join(outUrl, fileName + ".ts"), idKeyConstsContent);
}

function saveTsType( fileName, stores, confKey ){
	var needModuel = !(confKey=="server");
	var content = needModuel ? "module game{" : "";
	
	var leftList = [];
	var addKeyList = {};
	var name;
	for( var i=0; i<stores.length; ++i ){
		var storeList = stores[i];
		for ( name in storeList) {
			var trans = storeList[name];
			if( trans.opt.outTp == 1 ) continue;

			var keys = name.split( "_" );
			if( keys.length <= 1 ){
				leftList.push( trans );
				continue;
			}

			var mainSheetName = keys[0];
			var addKeys = addKeyList[mainSheetName];
			if( !addKeys ){
				addKeyList[mainSheetName] = addKeys = [];
			}

			addKeys.push( [keys[1],trans.getTypeName(),trans.isOutList] );

			content += trans.outType("\t");
		}
	}
	
	for( var i=0; i<leftList.length; ++i ){
		var trans = leftList[i];
		var addKeys = addKeyList[ trans.input ];
		content += trans.outType("\t", addKeys);
	}
	
	if(needModuel) content += "\r\n}";
	
	fs.writeFileSync(path.join(outUrl, fileName + ".ts"), content);
}

function getSheetName( name ){
	var idx = name.lastIndexOf("_");
	if( idx<0 ) return name;
	
	return name.substring(0,idx);
}

function writeDataFile( data, outFile ){
	
	var contentStr = JSON.stringify(data, null, 4);
	var res  = /\\\\n/g;
	contentStr = contentStr.replace(res,"\\u000a");
	fs.writeFileSync( path.join(outUrl, outFile+".json"), contentStr );
}

function mergeSubSheet( stores ){
	for( var i=0; i<stores.length; ++i ){
		var storeList = stores[i];
		var newStoreList = {};
		stores[i] = newStoreList;
		for (var name in storeList) {
			var idx = name.indexOf("_");
			var trans = storeList[name];
			if( idx<0 ){
				newStoreList[name] = trans;
				continue;
			}
			
			var keys = name.split( "_" );
			//console.log( JSON.stringify(keys) );
			var pTrans = storeList[keys[0]];
			if( !pTrans ) continue;
			
			var outResult = trans.outResult;
			var idKey = keys[2];
			var idIdx = -1;
			if( trans.key2Idx ){
				idIdx = trans.key2Idx[idKey].idx;
			}
			
			var subKey = keys[3] || trans.idName;
			var isArray = !subKey;
		
			//console.log( "subKey=" + subKey + "isArray=" + isArray + "           " + JSON.stringify(trans.opt) );
			var tmpDataList = {};
			var id, data, val, datas;
			for( id in outResult ){
				data = outResult[id];
			
				if( idIdx>=0 ){
					val = data[idIdx];
					data.splice(idIdx,1);
				}
				else{
					val = data[idKey];
					delete data[idKey];
				}
				
				datas = tmpDataList[val];
				if( isArray ){
					if( !datas ){
						datas = [];
						tmpDataList[val] = datas;
					}
					datas.push( data );
				}
				else{
					if( !datas ){
						datas = {};
						tmpDataList[val] = datas;
					}
					
					datas[data[subKey]] = data;
				}
			}
			
			var valKey = keys[1];
			var pOutResult = pTrans.outResult;
			var pIdKey = pTrans.idName;
			for( id in pOutResult ){
				data = pOutResult[id];
				val = data[pIdKey];
				datas = tmpDataList[val];
				if( datas ){
					data[valKey] = datas;
				}
			}
		}
    }
}

function saveStore( stores ){
    for( var i=0; i<stores.length; ++i ){
		var storeList = stores[i];
		for (var name in storeList) {
			var trans = storeList[name];
			if( !trans.opt.noStore ){
				writeDataFile( trans.outResult, name );
			}
		}
    }
}

function makeDir( dirpath ) {
	var dirs = dirpath.split( path.sep );
	var tmpPath = dirpath;
	var makes = [];
	while( !fs.existsSync( tmpPath ) ){
		makes.push( path.basename( tmpPath ) );
		tmpPath = path.dirname( tmpPath );
	} 
	
	//console.log( "dirpath = " + dirpath );
	//console.log( "tmpPath = " + tmpPath );
	for( var i=makes.length-1; i>=0; --i ){
		tmpPath = path.join( tmpPath, makes[i] );
		//console.log( "tmpPath = " + tmpPath );
		fs.mkdirSync(tmpPath);
	}
}

function handleExcel( confKey ){
	makeDir( outUrl );
	
	var handleCfg = config[confKey];
	var stores = parseList(handleCfg);

	if(handleCfg.funFile) saveTsTransFun(handleCfg.funFile, stores);

	if(handleCfg.enumFile) saveTsEnums(handleCfg.enumFile, stores, confKey);

	if(handleCfg.typeFile){
		saveTsType( handleCfg.typeFile, stores, confKey );
	}

	if(handleCfg.outFile){
		mergeSubSheet( stores );
		saveStore( stores );
	}
	
	// var enumFile = handleCfg.enumFile;
	// if( enumFile ){
	// 	switch( handleCfg.outTp || 0 ){
	// 		case 1:
	// 			saveTsTransFun(enumFile, stores);
	// 			break;
	// 		case 2:
	// 			saveJSON(enumFile, stores);
	// 			break;
	// 		default:
	// 			saveTsEnums(enumFile, stores);
	// 	}	
	// }
	
	// var noJson = handleCfg.noJson || 0;
	// if( !noJson ){
	// 	mergeSubSheet( stores );
	// 	saveStore( stores, handleCfg.out );
	// }
}

//--------------------------------

var workUrl = process.argv[3];
var outUrl = process.argv[4];

handleExcel( process.argv[2] );