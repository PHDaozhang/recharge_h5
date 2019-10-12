
var url         = require('url');
var fs          = require('fs');
var path        = require('path');

function makeDir( dirpath ) {
	var dirs = dirpath.split( path.sep );
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

function getImgs( dirPath, handleFiles )
{
	var files = fs.readdirSync( dirPath );
	var dirs = [];
	
	files.forEach( function(item){
			var tmpPath = path.join( dirPath, item );
			var stats = fs.statSync( tmpPath );
			if( !stats.isDirectory() ){
				var extName = path.extname(item);
				if( extName == ".png" || extName == ".jpg" ){
					handleFiles.push( item );
				}
				
			}
		});
};

function doHandle()
{
	makeDir( toUrl );
	
	var handleImgs = [];
	getImgs( workUrl, handleImgs );
	
	handleImgs.sort( function(a,b){return parseInt(path.basename(b))-parseInt(path.basename(a));} )
	
	var name = path.basename( workUrl );
	var sheetInfos = [];
	if( handleImgs.length>0 ){
		var maxCnt = Math.floor(512/iconW) * Math.floor(512/iconH);

		var dirCnt = 0;
		var sheetInfos = [];
		
		while( 1 )
		{
			dirCnt++;
			var newDirName = name+"_"+dirCnt;
			var tmpPath = path.join( toUrl, newDirName );
			fs.mkdirSync(tmpPath);
			
			var sheetInfo = {min:0, max:0, nm:newDirName};
			for( var i=0; i<maxCnt; ++i ){
				var fileName = handleImgs.pop();
				if( i==0 ){
					sheetInfo.min = parseInt(path.basename(fileName));
				}
				
				//copy
				var fileData = fs.readFileSync(path.join( workUrl, fileName ));
				fs.writeFileSync( path.join(tmpPath,fileName), fileData );	
				
				if( handleImgs.length==0 || i==maxCnt-1 ){
					sheetInfo.max = parseInt(path.basename(fileName));
					break;
				}
			}
			
			sheetInfos.push( sheetInfo );
			if( handleImgs.length==0 ){
				break;
			}
		}
	}
	
	var confStr = fs.readFileSync( confUrl, 'utf8' );
	var conf = JSON.parse( confStr );
	var iconRes = conf.iconRes;
	if( !iconRes ){
		iconRes = {};
		conf.iconRes = iconRes;
	}
	iconRes[name] = sheetInfos;
	fs.writeFileSync( confUrl, JSON.stringify(conf, null, 4) );		
}


var workUrl = process.argv[2];
var toUrl = process.argv[3];
var confUrl = process.argv[4];
var iconW = process.argv[5];
var iconH = process.argv[6];

doHandle( workUrl );