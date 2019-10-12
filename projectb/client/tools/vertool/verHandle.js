
var fs          = require('fs');
var path        = require('path');


function findVerFile( dirPath )
{
    var files = fs.readdirSync( dirPath );
    
	var fileDir = null;
	files.forEach( function(item){
            var tmpPath = path.join( dirPath, item );
            var stats = fs.statSync( tmpPath );
			if( !stats.isDirectory() && item.indexOf( "webver_" )>=0 ){
				fileDir = item;
			}
		});

	return fileDir;
};

function doMainHandle()
{
    var verFileNm = findVerFile( _outUrl );
    var webver;
    //if( verFileNm ){
        //var idx = verFileNm.indexOf( "." );
        //webver = verFileNm.substring( "webver_".length, idx );
    //}
	
	var webverFile = path.join( _verUrl, "manifest.json" );
	var fileData = fs.readFileSync( webverFile );
	var oldWebverList = JSON.parse(fileData);
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
    if( webver ){
        oldWebverList.webver = webver;
		newverList.webver = webver;
		
		fs.writeFileSync( webverFile, JSON.stringify(oldWebverList, null, 4) );
    }
    fs.writeFileSync( path.join( _outUrl, "manifest.json" ), JSON.stringify(newverList) );
}

function doGameHandle()
{
    var oldWebverList = {};
	var webverFile = path.join( _verUrl, "webver.ver" );
	if( fs.existsSync( webverFile ) ){
		var fileData = fs.readFileSync( webverFile );
		oldWebverList = JSON.parse(fileData);
	}
	
	var webverFile = path.join( _verUrl, "manifest.json" );
	var fileData = fs.readFileSync( webverFile );
    var jsverList = JSON.parse(fileData);
    var jsVer = jsverList.js[_gameNm];
    if( jsVer ){
        oldWebverList.js = jsVer;
    }
    
	delete oldWebverList.ver;
    webverFile = path.join( _outUrl, "webver_" + _gameNm + ".ver" );
    fs.writeFileSync( webverFile, JSON.stringify(oldWebverList) );
}

var _verUrl = process.argv[2];
var _outUrl = process.argv[3];
var _gameNm = process.argv[4];

if( _gameNm ){
    doGameHandle();
}
else{
    doMainHandle();
}
