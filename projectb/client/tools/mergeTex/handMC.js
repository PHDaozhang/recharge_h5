
var url         = require('url');
var fs          = require('fs');
var path        = require('path');

var handFileConf = null;

//寻找文件
function makeHandleConf( dirPath, handFileConf )
{
	var files = fs.readdirSync( dirPath );
	var dirs = [];
	
	var relativePath = path.relative(confUrl,dirPath);
	var handKey = relativePath.replace("\\","@");

	files.forEach( function(item){
			var tmpPath = path.join( dirPath, item );
			var stats = fs.statSync( tmpPath );
			if( stats.isDirectory() ){
				dirs.push( tmpPath );
			}
			else{
				if( item == "conf.json" ){
					var mcConfStr = fs.readFileSync( tmpPath, 'utf8' );
					var mcConf = JSON.parse( mcConfStr );
					handFileConf[handKey] = mcConf;
				}				
			}
		});
		
	dirs.forEach( function(item){
		makeHandleConf( item, handFileConf );
	} );
};


function doHandle()
{
	for( var key in handFileConf )
	{
		var handleData = handFileConf[key];
		
		var relativePath = key.replace("@","/");
		
		var fileName = path.basename(relativePath);	
		var filePath = path.join( workUrl, relativePath );

		var contentObj = handleMCConf( path.join(filePath,fileName+".json"), handleData );
		
		fs.writeFileSync( path.join(filePath, fileName+".mc"), JSON.stringify(contentObj, null, 4) );
	}
}


//是否覆盖增加的a2资源
function handleMCConf( filePath, mcConf )
{
	if( !fs.existsSync(filePath) ){
		console.log( "error:   not exist  filePath=" + filePath );
		return;
	}
	var sheetConfStr = fs.readFileSync( filePath, 'utf8');
	var sheetConf = JSON.parse( sheetConfStr );
	
	var resList = {};
	var frameData, key;
	var keys = [];
	var oldResList = sheetConf.frames;
	for( key in oldResList ){
		frameData = oldResList[key];
		resList[key] = {x:frameData.x,y:frameData.y,w:frameData.w,h:frameData.h};
		keys.push(key);
	}

	var addFrames = mcConf.addFrames;
	if( addFrames ){
		for( key in addFrames ){
			keys.push(key);
		}
	}
	
	keys.sort( function(a,b){return a>b?1:-1;} );

	var frames=[];
	var isCenter = mcConf.center;
	var offX = 0, offY = 0;
	for( var i=0, len=keys.length; i<len; ++i ){
		key = keys[i];

		frameData = oldResList[key];
		if( addFrames ){
			var repKey = addFrames[key];
			if( repKey ) {
				key = repKey;
				frameData = oldResList[repKey];
			}
		}

		offX = mcConf.offX || 0;
		offY = mcConf.offY || 0;
		if( isCenter ){
			offX = Math.floor( frameData.sourceW/2 );
			offY = Math.floor( frameData.sourceH/2 );
		}
		frames.push( {res:key, x:frameData.offX-offX, y:frameData.offY-offY} );
	}

	//默认名字 mc
	return {mc:{frameRate:mcConf.frameRate,loop:0,frames:frames},res:resList};
}

var workUrl = process.argv[2];
var confUrl = process.argv[3];

try{
	handFileConf = require('./conf.js');
}
catch(e){
	handFileConf = {};
	makeHandleConf( confUrl, handFileConf );
	//fs.writeFileSync( path.join(confUrl, "aaa.json"), JSON.stringify(handFileConf, null, 4) );
}


doHandle( workUrl );