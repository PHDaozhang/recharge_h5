var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var path        = require('path');
var execSync = require('child_process').execSync;

function getRenameFiles( dirPath, limitExts, renFiles )
{
	var files = fs.readdirSync( dirPath );
	var dirs = [];
	
	var dirName = path.basename(dirPath);
	
	var noLimit = limitExts.length<=0;
	files.forEach( function(item){
			var tmpPath = path.join( dirPath, item );
			var stats = fs.statSync( tmpPath );
			if( stats.isDirectory() ){
				dirs.push( tmpPath );
			}
			else{
				var extName = path.extname(item);
				if( noLimit || limitExts.indexOf(extName)>=0 ){
					var fileName = path.basename(item,extName);
					var newFileName;
					if( addhead ){
						if( item.indexOf(addhead)==0 ) return;
						
						newFileName	= addhead+fileName+extName;
					}
					else{
						if( item.indexOf("@")>=0 ) return;
						
						newFileName	= dirName+"@"+fileName+extName;	
					}
					
					var oldPath = path.join(dirPath, fileName+extName);
			
					if(fileName == "ver")newFileName = fileName + extName;
					renFiles.push( [oldPath,newFileName] );
				}
			}
		});
		
	dirs.forEach( function(item){
		getRenameFiles( item, limitExts, renFiles );
	} );
};

function renameFiles( dirPath, limitExts )
{
	var renFiles = [];
	getRenameFiles( dirPath, limitExts, renFiles );
	
	
	for( var i=0; i<renFiles.length; ++i )
	{
		var renData = renFiles[i];
		console.log( renData[1] );
		execSync( "ren " + renData[0] + " " + renData[1] );
	}
}


var baseDirectory = fs.realpathSync(__dirname);
   
//makeDirectory( sourceDirectory );

var tarPath = process.argv[2];
var limitExtStr = process.argv[3];
var addhead = process.argv[4];

var limitExts = [];
if( limitExtStr ){
	limitExts = limitExtStr.split( "," );
	console.log( JSON.stringify(limitExts));
}

renameFiles(tarPath, limitExts);

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );