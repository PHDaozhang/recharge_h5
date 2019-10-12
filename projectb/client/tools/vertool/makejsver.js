
var fs          = require('fs');
var path        = require('path');
var execSync = require('child_process').execSync;
var crypto = require('crypto');

function getAllFiles( dirPath, retFiles )
{
	var files = fs.readdirSync( dirPath );
	var dirs = [];

	files.forEach( function(item){
			var tmpPath = path.join( dirPath, item );
			var stats = fs.statSync( tmpPath );
			if( stats.isDirectory() ){
				dirs.push( tmpPath );
			}
			else{
				if( path.extname(item) == ".js" ){
					retFiles.push( tmpPath );
				}
			}
		});

	dirs.forEach( function(item){
		getAllFiles( item, retFiles );
	} );
};

function doHandle()
{
	var oldVerList = {};
	var verFile = path.join( _verUrl, "jsver.ver" );
	if( fs.existsSync( verFile ) ){
		var fileData = fs.readFileSync( verFile );
		oldVerList = JSON.parse(fileData);
	}

	var oldWebverList = {};
	var webverFile = path.join( _verUrl, "manifest.json" );
	if( fs.existsSync( webverFile ) ){
		var fileData = fs.readFileSync( webverFile );
		oldWebverList = JSON.parse(fileData);
	}
	
	var files = [];
	getAllFiles( _workUrl, files );

	var outVerList = makeVers( files );

	var fileVer = getFileVer();
	//console.log( "fileVer =" + fileVer );
	for( var dirKey in outVerList ){
		var newVer = outVerList[dirKey];
		var oldVer = oldVerList[dirKey];
		if( newVer != oldVer ){
			oldVerList[dirKey] = newVer;

			saveWebVer( dirKey, fileVer, oldWebverList );
			copyFile( dirKey, fileVer );
		}
	}

	fs.writeFileSync( verFile, JSON.stringify(oldVerList, null, 4) );	

	fs.writeFileSync( webverFile, JSON.stringify(oldWebverList, null, 4) );

	if( !_gameNm ){
		var newverList = {};
		for( var key in oldWebverList ){
			newverList[key] = oldWebverList[key];
		}

		var jsFiles = [];
		var jsList = newverList.js;
		var key = "libs/core";
		jsFiles.push( key + "_" + jsList[key] + ".js" );
		key = "libs/dragonBones";
		jsFiles.push( key + "_" + jsList[key] + ".js" );
		key = "main";
		jsFiles.push( key + "_" + jsList[key] + ".js" );

		newverList.js = jsFiles;
		fs.writeFileSync( path.join( _outUrl, "manifest.json" ), JSON.stringify(newverList) );
	}
	else{
		var webverList = {};
		var webverFile = path.join( _verUrl, "webver.ver" );
		if( fs.existsSync( webverFile ) ){
			var fileData = fs.readFileSync( webverFile );
			webverList = JSON.parse(fileData);
		}
		
		if( oldWebverList.js ){
			var jsVer = oldWebverList.js[_gameNm];
			if( jsVer ){
				webverList.js = jsVer;
			}
		}
		else{
			console.error( "编译出错" );
		}
		
		delete webverList.ver;
		webverFile = path.join( _outUrl, "webver_" + _gameNm + ".ver" );
		fs.writeFileSync( webverFile, JSON.stringify(webverList) );
	}
}

function copyFile( relativeDir, fileVer ){
	var outUrl = path.join(_outUrl, relativeDir);
	makeDir( path.dirname(outUrl) );

	var str = "copy " + path.join(_workUrl, relativeDir) + " ";
	if( fileVer ){
		let idx = outUrl.lastIndexOf( "." );
		str += (outUrl.substring( 0, idx ) + "_" + fileVer + outUrl.substring( idx ) );
	}
	else{
		str += outUrl;
	}
	execSync( str );
}

function makeVers( files ){
	var verList = {};
	for( var i=0, len=files.length; i<len; ++i ){
		var file = files[i];
		var fileData = fs.readFileSync( file );
		var key = md5(fileData);

		var dirKey =  path.relative(_workUrl, file);
		verList[dirKey] = key;
	}
	return verList;
}

function md5(data) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(data);
	str = md5sum.digest('hex');
	return str;
};

function makeDir( dirpath ) {
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

function getFileVer(){
	var startDate = new Date( 2019, 0, 1, 0, 0, 0 );
	var tm = Math.floor( (Date.now() - startDate.getTime())/2000 );
	return tm.toString(16);
}

function saveWebVer( pathStr, webver, webverList ){
	var idx = pathStr.lastIndexOf( "." );
	var postfix = pathStr.substring( idx+1 );
	var key = pathStr.substring( 0, idx );
	var verList = webverList[postfix];
	if( !verList ){
		verList = webverList[postfix] = {};
	}

	key = key.replace(/\\/g,"/");
	verList[key] = webver;
}


var _verUrl = process.argv[2];
var _workUrl = process.argv[3];
var _outUrl = process.argv[4];
var _gameNm = process.argv[5];

doHandle();