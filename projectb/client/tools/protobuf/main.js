var fs          = require('fs');
var path        = require('path');


 var _c2sRoute = {list:{}, encode:{}, decode:{}};
 var _s2cRoute = {list:{}, encode:{}, decode:{}};
 var _type = {list:{}, encode:{}, decode:{}};

 function handleRoute( msgConfs, isC2S )
 {
	var routeData, routeEnumStr;
	if( isC2S ){
		routeData = _c2sRoute;
		routeEnumStr = "##export const enum C2S_ROUTE_TP {\r\n";
	}
	else{
		routeData = _s2cRoute;
		routeEnumStr = "##export const enum S2C_ROUTE_TP {\r\n";
	}

	var typeStr = "";
	for( var i=0, len=msgConfs.length; i<len; i++ ){
		var conf = msgConfs[i];
		var name = conf.name;
		var routeId = conf.id;
		
		routeEnumStr += "##\t" + name + " = " + routeId + ",\r\n";
		
		typeStr += _transTypeStr( name, conf.keys ) + "\r\n";

		routeData.encode[routeId] = _transEncodeObj(conf.keys);
		routeData.decode[routeId] = _transDecodeObj(conf.keys);
		routeData.list[routeId] = name.split("_");
	}

	routeEnumStr += "##}";

	return {type:typeStr, enum:routeEnumStr};
 }

 function getRouteList( isC2S ){
	if( isC2S ){
		return "##export let c2sRouteList=" + JSON.stringify( _c2sRouteList, null, 2 ) + ";";
	}
	return "##export let s2cRouteList=" + JSON.stringify( _s2cRouteList, null, 2 ) + ";";
 }

 function getRouteProtoStr( isC2S, isEncode ){
	if( isC2S ){
		if( isEncode ){
			return "##export let c2sEncode=" + JSON.stringify( _c2sRoute.encode ) + ";";
		}
		return "##export let c2sDecode=" + JSON.stringify( _c2sRoute.decode ) + ";";
	}

	if( isEncode ){
		return "##export let s2cEncode=" + JSON.stringify( _s2cRoute.encode ) + ";";
	}
	return "##export let s2cDecode=" + JSON.stringify( _s2cRoute.decode ) + ";";
 }
 
 function handleType( typeConfList )
 {
	var typeStr = "";
	var id = typeId;
	var list = _type.list;
	for( var key in typeConfList ){
		var typeData = { id:id++ };
		list[key] = typeData;

		var typeKeys = typeConfList[key];
		typeData.keys = typeKeys;
		typeStr += _transTypeStr( key, typeKeys ) + "\r\n";
	}

	for( var key in list ){
		var typeData = list[key];
		_type.encode[typeData.id] = _transEncodeObj(typeData.keys);
		_type.decode[typeData.id] = _transDecodeObj(typeData.keys);
	}

	return {type:typeStr};
 }

 function getTypeProtoStr( isEncode ){
	if( isEncode ){
		return "##export let typeEncode=" + JSON.stringify( _type.encode ) + ";";
	}
	return "##export let typeDecode=" + JSON.stringify( _type.decode ) + ";";
 }

 function _transEncodeObj( keysList ){
	var ret = {};
	for( var key in keysList ){
		var keyConf = keysList[key];
		var keyData = [keyConf.tag];
		keyData.push( _getTypeId(keyConf.type) );
		keyData.push( keyConf.isOption?1:0 );
		if(keyConf.isArr) keyData.push( 1 );
		//if( keyConf.default ) {
			//keyData.push( keyConf.default );
		//}
		ret[key] = keyData;
	}
	return ret;
 }

 function _transDecodeObj( keysList ){
	var ret = {};
	for( var key in keysList ){
		var keyConf = keysList[key];
		var keyData = [key];
		keyData.push( _getTypeId(keyConf.type) );
		keyData.push( keyConf.isOption?1:0 );
		if(keyConf.isArr) keyData.push( 1 );
		//if( keyConf.default ) {
			//keyData.push( keyConf.default );
		//}
		ret[keyConf.tag] = keyData;
	}
	return ret;
 }

 function _transTypeStr( name, keysList ){
	var typeStr = "##export type " + name + " = {";
	for( var key in keysList ){
		var keyConf = keysList[key];
		typeStr += "\r\n##\t" + key;

		if( keyConf.isOption ){
			typeStr += "?";
		}
		typeStr += ":";

		var typeName = keyConf.type;
		var desc = null;
		if( typeName == "uint32" || typeName == "int32" || typeName == "int64" ) {
			desc = typeName;
			typeName = "number";
		}
		else if( typeName=="bool" ){
			typeName="boolean";
		}
		else if( typeName=="bytes" ){
			typeName="egret.ByteArray";
		}

		typeStr += typeName;
		if( keyConf.isArr ){
			typeStr += "[]";
		}
		typeStr += ";"

		if( keyConf.default ){
			desc = (desc||"") + "   default=" +  keyConf.default;
		}
		
		if( keyConf.desc ){
			desc = (desc||"") + "   " +  keyConf.desc;
		}

		if( desc ){
			typeStr += "//" + desc
		}
	}
	typeStr += "\r\n##}";

	return typeStr;
 }

 
function _getTypeId( typeNm ){
	switch( typeNm ){
		case "uint32": return 0;
		case "int32": return 1;
		case "bool": return 2;
		case "int64": return 3;
		case "string": return 5;
		case "bytes": return 6;
	}

	var typeData = _type.list[typeNm];
	if( !typeData ){
		console.log( "not handle type =" + typeNm );
	}
    return typeData.id;
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


function handleProto(filePath, outClientPath, moduleNm ){
	var contentStr = fs.readFileSync(filePath).toString();
	
	var conf = JSON.parse(contentStr);
	var typeData = handleType( conf.type );

	var c2sRouteData = handleRoute( conf.c2s, true );

	var s2cRouteData = handleRoute( conf.s2c, false );

	//var serverStr = routeData.enum + "\r\n" + routeData.type + "\r\n" + typeData.type + "\r\n" + getRouteList() + "\r\n" + getRouteProtoStr() + "\r\n" + getTypeProtoStr();

	var clientStr = c2sRouteData.enum + "\r\n" + s2cRouteData.enum + "\r\n" + c2sRouteData.type + "\r\n" + s2cRouteData.type + "\r\n" + typeData.type;
	clientStr += "\r\n" + getRouteProtoStr(true, true);
	clientStr += "\r\n" + getRouteProtoStr(false, false);
	clientStr += "\r\n" + getTypeProtoStr(false);

	let moduleHead = "module NET_CONF{\r\n";
	if( moduleNm ){
		let tmpNm = moduleNm.substring(0,1).toUpperCase() + moduleNm.substr(1);
		moduleHead = "module " + tmpNm + "_NET_CONF{\r\n";
	}

	let fileName = path.basename( filePath, ".json" );
	makeDir( outClientPath );
	fs.writeFileSync( path.join( outClientPath, fileName+".ts" ), moduleHead + clientStr.replace( /##/g, "\t" ) + "\r\n}" );
	//fs.writeFileSync( outServerPath, serverStr.replace( /##/g, "" ) );
}


var argv = process.argv;
var typeId = (argv[5]||0)*30 + 10;
handleProto( argv[2], argv[3], argv[4] );
