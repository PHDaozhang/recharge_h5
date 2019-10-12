var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var path        = require('path');
var execSync = require('child_process').execSync;

function getMergeDirs( dirPath, sheetDirs )
{
	var files = fs.readdirSync( dirPath );
	var dirs = [];

	var imgCnt = 0;
	files.forEach( function(item){
			var tmpPath = path.join( dirPath, item );
			var stats = fs.statSync( tmpPath );
			if( stats.isDirectory() ){
				dirs.push( tmpPath );
			}
			else{
				var extName = path.extname(item);
				if( extName == ".png" || extName == ".jpg" ){
					imgCnt++;
				}
			}
		});
	
	//console.log( "imgCnt=" + imgCnt );
	if( imgCnt>1 ){
		sheetDirs.push( dirPath );
	}
	
	dirs.forEach( function(item){
		getMergeDirs( item, sheetDirs );
	} );
};

function mergeSheetImgs( sheetDirs )
{
	var mergeCmd = path.join( baseDirectory, "../TextureMerger/TextureMerger.exe" );

	for( i=0; i<sheetDirs.length; ++i )
	{
		dirPath = sheetDirs[i];
		if( !fs.existsSync(dirPath) ){
			console.log( "error:   not exist  dirPath=" + dirPath );
			continue;
		}
		
		console.log( "dirPath=" + dirPath );
	
		var relativePath = path.relative(handDir,dirPath);
		var fileName = path.basename(relativePath);
		var out = path.join(outDir,relativePath+"/" + fileName + ".json");
		execSync( mergeCmd + " -p " + dirPath + " -o " + out );
	}
}


var baseDirectory = fs.realpathSync(__dirname);

var handDir = process.argv[2];
var outDir = process.argv[3];//相对workPath

var sheetDirs = [];
try{
	handFileConf = require('./conf.js');
	for( var key in handFileConf ){
		var relativePath = key.replace("@","/");
		var filePath = path.join( handDir, relativePath );
		sheetDirs.push(filePath);
	}
	//console.log( JSON.stringify(sheetDirs) )
}
catch(e){
	getMergeDirs( handDir, sheetDirs );
}


mergeSheetImgs( sheetDirs );

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );