
var url         = require('url');
var fs          = require('fs');
var path        = require('path');
var execSync = require('child_process').execSync;

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

function getComplessImg( dirPath, imgFiles )
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
				if( extName == ".png" ){
					var fileName = path.basename(item,extName);
					if( fileName.indexOf("-fs8")<0 ){
						imgFiles.push( tmpPath );
					}
				}
			}
		});
	
	dirs.forEach( function(item){
		getComplessImg( item, imgFiles );
	} );
};

function complessSheetImgs( dirPath )
{
	if( outDir ){
		makeDir( outDir );
	}
	
	var imgFiles = [];
	getComplessImg( handDir, imgFiles );

	complessFiles( imgFiles );
}


function complessFiles( imgFiles ){ 
	console.log( "complessFiles len=" + imgFiles.length );
	var complessCmd = path.join( baseDirectory, "../pngquant/pngquant.exe -f -v " );
	var i = 0;
	var len = imgFiles.length;
	if( len>20 ) len = 20;
	if( outDir ){
		for( i=0; i<len; ++i ){
			var imgFile = imgFiles[i];
			var relativePath = path.relative(handDir,imgFile);
			var out = path.join(outDir,relativePath);
			//console.log( relativePath );	
			//console.log( out );			
			execSync( complessCmd + "-o " + out + " " + imgFile );
		}
	}
	else{
		for( i=0; i<len; ++i ){
			var imgFile = imgFiles[i];	
			execSync( complessCmd + imgFile );
		}
	}
	
	if( imgFiles.length>len ){
		imgFiles = imgFiles.slice( len );
		setTimeout( complessFiles, 5000, imgFiles );
	}
}


var baseDirectory = fs.realpathSync(__dirname);
   
//makeDirectory( sourceDirectory );

var handDir = process.argv[2];

var outDir = process.argv[3];

complessSheetImgs();

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );