
var url         = require('url');
var fs          = require('fs');
var path        = require('path');


var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function base64Encode(arraybuffer) {
	var bytes = new Uint8Array(arraybuffer);
	var len = bytes.length;
	var base64 = '';

	for (var i = 0; i < len; i += 3) {
		base64 += chars[bytes[i] >> 2];
		base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
		base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
		base64 += chars[bytes[i + 2] & 63];
	}

	if ((len % 3) === 2) {
		base64 = base64.substring(0, base64.length - 1) + '=';
	} else if (len % 3 === 1) {
		base64 = base64.substring(0, base64.length - 2) + '==';
	}

	return base64;
}

function str2Array(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
		var code = str.charCodeAt(i);
		if( code>255 ){
			console.log( "error char is not ascii char=" + str.charAt[i] );
		}
        bufView[i] = (code<<4)+(code>>4);
    }
    return buf;
}

function unicodeStr2Array(str) {
    var buf = new ArrayBuffer(str.length*2);
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
		var code = str.charCodeAt(i);
        bufView[i] = (code<<8)+(code>>8);
    }
    return buf;
}

function arr2Str(arr) {
	var tmpArr = new Uint16Array(arr.length);
    for (var i=0, len=arr.length; i<len; i++) {
		var code = arr[i];
        tmpArr[i] = ((code<<4)&0xff)+(code>>4);
    }
    return String.fromCharCode.apply(null, tmpArr);
}

function resetFontKey( conf ) {
    var frames = conf.frames;
	var needResetKeys = [];
	var i, len, key;
    for (key in frames ) {
		for (i=0, len=key.length; i<len; i++) {
			var code = key.charCodeAt(i);
			if( code>255 ){
				needResetKeys.push( key );
				break;
			}
		}
    }
	
	if( needResetKeys.length>0 ){
		var resetKeyList = {};
		for (i=0, len=needResetKeys.length; i<len; i++) {
			key = needResetKeys[i];
			var newKey = "_" + i;
			frames[newKey] = frames[key];
			delete frames[key];
			resetKeyList[key] = newKey;
		}
		return resetKeyList;
	}
    return null;
}

function mergeArray( arr8_1, arr8_2, arr16 ){
	var lenSize = 8;
	var arr8Len = arr8_1.byteLength+arr8_2.byteLength;	
	var buf = new ArrayBuffer(arr8Len+lenSize+arr16.byteLength);
	var intView = new Uint32Array(buf, 0, 2);
	intView[0] = arr8_1.byteLength;
	intView[1] = arr8_2.byteLength;
	
	var buf1 = new Uint8Array(arr8_1);
	var buf2 = new Uint8Array(arr8_2);
    var bufView = new Uint8Array(buf,lenSize);
	bufView.set( buf1 );
	bufView.set( buf2, arr8_1.byteLength );
	if( arr16.byteLength>0 ){
		var buf16View = new Uint16Array(buf,arr8Len+lenSize);
		var buf3 = new Uint16Array(arr16);
		buf16View.set( buf3 );
	}
	return buf;
}

function getSheetFiles( fpath, sheetFiles )
{
	var files = fs.readdirSync( fpath );
	var dirs = [];
	
	var fileNms = [];
	files.forEach( function(item){
			var tmpPath = path.join( fpath, item );
			var stats = fs.statSync( tmpPath );
			if( stats.isDirectory() ){
				dirs.push( tmpPath );
			}
			else{
				if( path.extname(item) == filterExt ){
					//
					var fileName = path.basename(item, filterExt);
					if( fs.existsSync( path.join( fpath, fileName + ".png" ) ) ){
						fileNms.push( fileName );
					}
				}
			}
		});
		
	if( fileNms.length>0 ){
		sheetFiles.push( {path:fpath, files:fileNms} );
	}
	
	dirs.forEach( function(item){
		getSheetFiles( item, sheetFiles );
	} );
};

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

function mergeSheet( workPath )
{
	var sheetDatas = [];
	getSheetFiles( workPath, sheetDatas );
	
	makeDir( outPath );
	handSheetFiles( workPath, sheetDatas );
}

function handSheetFiles( workPath, sheetDatas )
{
	var codeStr = "";
	for( var i=0; i<sheetDatas.length; ++i )
	{
		var sheetData = sheetDatas[i];
		var pathStr = sheetData.path;
		
		var relativePath = path.relative(workPath,pathStr);

		var outDir = outPath;
		var dirName;
		relativePath = path.dirname( relativePath );
		outDir = path.join( outPath, relativePath );	
		if( mergeDirCnt>1 ){
			dirName = path.basename(relativePath);
			relativePath = path.dirname( relativePath );
			if( relativePath ){
				outDir = path.join( outPath, relativePath );
			}
		}
		makeDir( outDir );
		
		var files = sheetData.files;
		for( var j=0; j<files.length; ++j ){
			var fileName = files[j];
			var confFile = path.join(pathStr, fileName+filterExt);
			
			var jsonContent = fs.readFileSync(confFile, 'utf8');
			if( jsonContent.indexOf("sourceW")>=0 ){
				jsonContent = jsonContent.replace( new RegExp(fileName+"@",'g'), "" );
				jsonContent = jsonContent.replace( new RegExp("sourceW",'g'), "sw" );
				jsonContent = jsonContent.replace( new RegExp("sourceH",'g'), "sh" );
				jsonContent = jsonContent.replace( new RegExp("offX",'g'), "ox" );
				jsonContent = jsonContent.replace( new RegExp("offY",'g'), "oy" );
			}
			
			//console.log( jsonContent );
		
			var imgContent;
			var imgFile = path.join( pathStr, fileName + "-fs8" + ".png" );
			//ѹ��ͼƬ
			if( fs.existsSync( imgFile ) ){
				imgContent = fs.readFileSync(imgFile);
			}
			
			if( !imgContent ){
				//imgFile = path.join( pathStr, fileName + ".png" );
				//imgContent = fs.readFileSync(imgFile);
				console.log( "not find compless img imgFile=" + imgFile );
				continue;
			}
			
			//var imgStr = base64Encode( imgContent );
			
			//var content = jsonFile + "#@@#" + imgStr;
			//fs.writeFileSync( path.join(outDirectory, fileName), content );
			
			var unicodeArr = new ArrayBuffer();
			if( toExt == ".fnt" ){
				var confObj = JSON.parse( jsonContent );
				var resetKeys = resetFontKey( confObj );
				if( resetKeys ){
					unicodeArr = unicodeStr2Array( JSON.stringify(resetKeys) );
					jsonContent = JSON.stringify(confObj);
				}
			}
			else if(toExt == ".db"){
				var idx = fileName.lastIndexOf("_tex");
				if( idx<0){
					console.log( "not find compless fileName not find _tex  fileName=" + fileName );
					continue;
				}
				var confFileIdx = confFile.lastIndexOf("_tex");
				var newConfFile = confFile.substring(0,confFileIdx);
				var endConfFile = confFile.substring(confFileIdx);
				var skeConfFile = newConfFile + endConfFile.replace( "_tex", "_ske" );
				var skeJsonContent = fs.readFileSync(skeConfFile, 'utf8');

				fileName = fileName.substring( 0, idx );

				var texConf = JSON.parse( jsonContent );
				var skeConf = JSON.parse( skeJsonContent );
				skeConf.name = fileName;
				skeConf.armature[0].name = fileName;
				texConf.name = fileName;

				jsonContent = JSON.stringify({tex:texConf,ske:skeConf});

				
			}
			
			var jsonArr = str2Array( jsonContent );
			
			//console.log( arr2Str(jsonArr) );
			
			var content  = mergeArray( jsonArr, imgContent, unicodeArr );
			var outFileUrl;
			if( dirName ){
				outFileUrl = path.join(outDir, dirName+"@"+fileName+toExt)
			}
			else{
				outFileUrl = path.join(outDir, fileName+toExt);
			}
			fs.writeFileSync( outFileUrl, Buffer.from(content) );	
		}
	}
}


//var baseDirectory = fs.realpathSync(__dirname);

var workPath = process.argv[2];
var outPath = process.argv[3];
var filterExt = process.argv[4];
var toExt = process.argv[5];
var mergeDirCnt = process.argv[6] || 1;

mergeSheet( workPath );

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );