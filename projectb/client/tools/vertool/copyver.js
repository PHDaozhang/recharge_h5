
var fs          = require('fs');
var path        = require('path');
var execSync = require('child_process').execSync;

function getResFiles( dirPath, retFiles )
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
				retFiles.push( tmpPath );
			}
		});

	dirs.forEach( function(item){
		getResFiles( item, retFiles );
	} );
};

function getJsFiles( dirPath, retFiles )
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
		getJsFiles( item, retFiles );
	} );
};

function doHandle()
{
	var resverList = null;
	var mainVer = null;
	var tmpFile = path.join( _workUrl, "webver.ver" );
	if( fs.existsSync( tmpFile ) ){
		var fileData = fs.readFileSync( tmpFile );
		resverList = JSON.parse(fileData);
		
		fileData = fs.readFileSync( path.join(__dirname, "mainver.json") );
		mainVer = JSON.parse(fileData).ver;
	}
	
	var jsverList = null;
	tmpFile = path.join( _workUrl, "manifest.json" );
	if( fs.existsSync( tmpFile ) ){
		fileData = fs.readFileSync( tmpFile );
		jsverList = JSON.parse(fileData);
	}
	
	var resFiles = [];
	if(resverList){
		getResFiles( _resUrl, resFiles );
		copyFiles( resFiles, resverList, mainVer, _resNm );
	}

	var jsFiles = [];
	if( jsverList ){
		getJsFiles( _workUrl, jsFiles );
		copyFiles( jsFiles, jsverList, mainVer, null, _jsmovtores );
	}	
}

function copyFiles( files, verList, mainVer, addUrl ){
	let parentUrl = addUrl ? _resUrl : _workUrl;
	for( var file of files ){
		var dirKey =  path.relative(parentUrl, file);

		var idx = dirKey.lastIndexOf( "." );
		var postfix = dirKey.substring( idx+1 );
		var tmpList = verList[postfix];
		var fileVer = null;
		if( tmpList ){
			var key = dirKey.substring( 0, idx );
			key = key.replace(/\\/g,"/");
			fileVer = tmpList[key];
		}

		if( fileVer ){
			copyFile( dirKey, fileVer, addUrl );
		}
		else{
			copyFile( dirKey, mainVer, addUrl );
		}
	}
}

function copyFile( relativeDir, fileVer, addUrl, movtores ){
	var outUrl = (addUrl || movtores) ? path.join(_outUrl, addUrl, relativeDir) : path.join(_outUrl, relativeDir);
	var workUrl = addUrl ? path.join(_workUrl, addUrl, relativeDir) : path.join(_workUrl, relativeDir);
	makeDir( path.dirname(outUrl) );

	var str = "copy " + workUrl + " ";
	if( fileVer ){
		let idx = outUrl.lastIndexOf( "." );
		str += (outUrl.substring( 0, idx ) + "_" + fileVer + outUrl.substring( idx ) );
	}
	else{
		str += outUrl;
	}
	execSync( str );
}

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

var _workUrl = process.argv[2];
var _outUrl = process.argv[3];
var _resNm = process.argv[4];
var _jsmovtores = process.argv[5];

var _resUrl = path.join(_workUrl,_resNm)

doHandle();