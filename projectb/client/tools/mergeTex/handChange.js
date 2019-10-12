
var fs          = require('fs');
var path        = require('path');
var execSync = require('child_process').execSync;
var crypto = require('crypto');

function getCheckDirs( dirPath, checkDirs, layer )
{
	var files = fs.readdirSync( dirPath );
	var dirs = [];

	var fileNames = [];
	files.forEach( function(item){
			var tmpPath = path.join( dirPath, item );
			var stats = fs.statSync( tmpPath );
			if( layer && stats.isDirectory() ){
				dirs.push( tmpPath );
			}
			else{
				fileNames.push( item );
			}
		});
	
	if( fileNames.length>1 ){
		var dirKey =  path.relative(workUrl, dirPath);
		checkDirs.push( {dir:dirKey,files:fileNames} );
	}
	
	layer--;

	dirs.forEach( function(item){
		getCheckDirs( item, checkDirs, layer );
	} );
};


function doHandle()
{
	var confUrl = path.join(workUrl, "ver.json");
	var fileData = fs.readFileSync( confUrl );
	var oldMd5List = JSON.parse(fileData);
	//console.log( "dirKey = " + dirKey + " oldMd5List=" + fileData );

	var checkDirs = [];
	getCheckDirs( workUrl, checkDirs, isDir?1:9999 );

	var outMd5List = {};
	var mdsList, dirKey;
	for( var i=0, len=checkDirs.length; i<len; ++i ){
		var checkData = checkDirs[i];
		dirKey =  checkData.dir;
		mdsList = makeMD5( path.join(workUrl,dirKey), checkData.files );
		outMd5List[dirKey] = mdsList;
	}

	var oldList;
	if( isDir ){
		for( dirKey in outMd5List ){
			mdsList = outMd5List[dirKey];
			oldList = oldMd5List[dirKey];
			
			if( !oldList || Object.keys(oldList).length != Object.keys(mdsList).length ){
				copyDir( dirKey );
			}
			else{
				for( var key in mdsList ){
					if( mdsList[key] != oldList[key] ){
						copyDir( dirKey );
						break;
					}
				}
			}
		}
	}
	else{
		for( dirKey in outMd5List ){
			oldList = oldMd5List[key];
			if( !oldList ){
				copyDir( dirKey );
			}
			else{
				mdsList = outMd5List[key];
				for( var subKey in mdsList ){
					if( mdsList[subKey] != oldList[subKey] ){
						copyFile( dirKey, subKey );
					}
				}
			}
		}
	}

	fs.writeFileSync( confUrl, JSON.stringify(outMd5List, null, 4) );	
}

function copyFile( relativeDir, file ){
	var str = "xcopy " + path.join(workUrl, relativeDir, file) + " " +  path.join(outUrl,relativeDir) + "\\  /S /Q /Y";
	execSync( str );
}

function copyDir( relativeDir ){
	var str = "xcopy " + path.join(workUrl,relativeDir) + "\\*.* " +  path.join(outUrl,relativeDir) + "\\  /S /Q /Y";
	execSync( str );
}

function makeMD5( dir, files ){
	var md5List = {};
	for( var i=0, len=files.length; i<len; ++i ){
		var file = files[i];
		console.log( path.join(dir, file) );
		var fileData = fs.readFileSync( path.join(dir, file) );
		var key = md5(fileData);
		
		md5List[file] = key;
	}

	return md5List;
}

function md5(data) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(data);
	str = md5sum.digest('hex');
	return str;
};


var workUrl = process.argv[2];
var outUrl = process.argv[3];
var isDir = process.argv[4]; //已目录方式处理

doHandle( workUrl );