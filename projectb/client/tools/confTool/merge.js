
var url         = require('url');
var fs          = require('fs');
var path        = require('path');


//я╟урнд╪Ч
function getJsonDirs( dirPath, jsonFiles )
{
	var files = fs.readdirSync( dirPath );

	files.forEach( function(item){
			var tmpPath = path.join( dirPath, item );
			var stats = fs.statSync( tmpPath );
			if( !stats.isDirectory() ){
				var extName = path.extname(item);
				if( extName == ".json" ){
					jsonFiles.push( path.join( dirPath, item ) );
				}				
			}
		});
};

function doHandle()
{
	var jsonFiles = [];
	getJsonDirs( workUrl, jsonFiles );
	
	var outData = {};
	for( var i=0; i<jsonFiles.length; ++i )
	{
		var filePath = jsonFiles[i];
		var confStr = fs.readFileSync(filePath, 'utf8');
		var conf = JSON.parse( confStr );
	
		var fileName = path.basename( filePath, ".json" );
		outData[fileName] = conf;		
	}
	
	var contentStr = JSON.stringify(outData);
	var res  = /\\\\n/g;
	contentStr = contentStr.replace(res,"\\u000a");
			
	fs.writeFileSync( outUrl, contentStr );
}

var workUrl = process.argv[2];
var outUrl = process.argv[3];

doHandle();