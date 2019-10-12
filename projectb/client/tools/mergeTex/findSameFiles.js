
var url         = require('url');
var fs          = require('fs');
var path        = require('path');

var crypto = require('crypto');

function getCheckDirs( dirPath, checkDirs )
{
	var files = fs.readdirSync( dirPath );
	var dirs = [];

	var fileNames = [];
	files.forEach( function(item){
			var tmpPath = path.join( dirPath, item );
			var stats = fs.statSync( tmpPath );
			if( stats.isDirectory() ){
				dirs.push( tmpPath );
			}
			else{
				fileNames.push( item );
			}
		});
	
	if( fileNames.length>1 ){
		checkDirs.push( {dir:dirPath,files:fileNames} );
	}
	
	dirs.forEach( function(item){
		getCheckDirs( item, checkDirs );
	} );
};

function doHandle()
{
	var checkDirs = [];
	getCheckDirs( workUrl, checkDirs );

	var md5List = {};
	for( var i=0, len=checkDirs.length; i<len; ++i ){
		var checkData = checkDirs[i];
		checkSameFile( checkData.dir, checkData.files, md5List );
	}
}

function checkSameFile( dir, files, md5List ){
	var relativePath = path.relative( workUrl, dir );
	for( var i=0, len=files.length; i<len; ++i ){
		var file = files[i];
		var fileData = fs.readFileSync( path.join(dir, file) );
		var key = md5(fileData);
		
		var sameFileName = md5List[key];
		if( sameFileName ){
			console.log( sameFileName + " ======= " + relativePath+ "/" + file );
		}
		else{
			md5List[key] = relativePath + "/" + file;
		}
	}
}

function md5(data) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(data);
	str = md5sum.digest('hex');
	return str;
};


var workUrl = process.argv[2];

doHandle( workUrl );