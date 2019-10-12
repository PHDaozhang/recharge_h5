
var fs          = require('fs');
var path        = require('path');

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
				if( path.extname(item) == ".js" && item.indexOf( ".min." )>=0 ){
					retFiles.push( tmpPath );
				}
			}
		});

	dirs.forEach( function(item){
		getAllFiles( item, retFiles );
	} );
};

function mergeJs()
{
    var jsFiles = [];
    getAllFiles( _sourceUrl, jsFiles );

    var egretIdx = 0;
    var egretWebIdx = 0;
    for( var i=0, len=jsFiles.length; i<len; ++i ){
        var jfFile = jsFiles[i];
        if( jfFile.indexOf( "egret.min" )>=0 ){
            egretIdx = i;
        }
        else if( jfFile.indexOf( "egret.web.min" )>=0 ){
            egretWebIdx = i; 
        }  
    }

    var tmp;
    if( egretIdx !=0 ){
        tmp = jsFiles[0];
        jsFiles[0] = jsFiles[egretIdx];
        jsFiles[egretIdx] = tmp;
        if(egretWebIdx==0){
            egretWebIdx = egretIdx;
        }
    }
    if( egretWebIdx != 1 ){
        tmp = jsFiles[1];
        jsFiles[1] = jsFiles[egretWebIdx];
        jsFiles[egretWebIdx] = tmp;
    }
	
	var mergeedJS = '';

	for(var i=0;i < jsFiles.length; i++){
        var tempPath = jsFiles[i];
        if( tempPath.indexOf("dragonBones")<0 ){
            var jsCode = fs.readFileSync( tempPath );
		    mergeedJS += jsCode; 
        }	
	}

	var destPath = path.join(_outUrl, 'core.js');
	fs.writeFileSync(destPath, mergeedJS);
}

var _sourceUrl = process.argv[2];
var _outUrl = process.argv[3];

mergeJs(process.argv);