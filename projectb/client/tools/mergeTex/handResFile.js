var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var path        = require('path');


function handMergeRes( resFile )
{
	var jsonContent = fs.readFileSync(resFile, 'utf8');
	var resData = JSON.parse( jsonContent );
	
	var resources = handResources(resData.resources);	
	var groups = handGroups(resData.groups);
	
	fs.writeFileSync( outUrl, JSON.stringify({groups:groups,resources:resources}, null, 4) );
}

function handResources( resources )
{
	var ret = [];
	var handSheetNames = [];
	var idx, idx1, sheetUrl, sheetName;
	for( var i=0,len=resources.length; i<len; ++i ){
		var resData = resources[i];
		var url = resData.url;
		idx = url.indexOf( "@" );
		if( idx>=0 ){
			idx1 = url.lastIndexOf( "/" );
			sheetName = url.substring(idx1+1, idx);
			//console.log(sheetName);
			if( handSheetNames.indexOf(sheetName)<0 ){
				handSheetNames.push( sheetName );
				var sheetUrl = url.substring(0,idx1) + ".st";
				ret.push( {name:sheetName,type:"st",url:sheetUrl} );
			}
			continue;
		}
		
		idx = url.indexOf( "fonts/" );
		if( idx>=0 ){
			idx1 = url.lastIndexOf( "/" );
			url = url.substring(0,idx1);
			resData.type = "fnt";
			resData.url = url.substring(0,idx1) + ".fnt";
			ret.push( resData );
			continue;
		}
		
		idx = url.indexOf( "out/" );
		if( idx==0 ){
			//console.log( "idx=" + idx )
			resData.url = url.substr(idx+4);
			if( resData.type== "bin" ) resData.type = "mc";
			ret.push( resData );
			continue;
		}
		
		if( url.indexOf( "rmv_" )<0 ){
			ret.push( resData );
		}
	}
	
	return ret;
}

function handGroups( groups )
{
	for( var i=0,len=groups.length; i<len; ++i ){
		var groupData = groups[i];
		var keyStr = groupData.keys;
		var handSheetNames = [];
		
		var idx = keyStr.indexOf( "@" );
		while( idx>=0 ){
			var idx1 = keyStr.lastIndexOf( ",", idx );
			var idx2 = keyStr.indexOf( ",", idx );
			var str1 = null;
			if( idx2>0 ){
				str1 = keyStr.substr(idx2);
			}
			//console.log(str1,idx1,idx2);
			var str = null;
			var sheetName;
			if(idx1>0){
				str = keyStr.substring(0, idx1);
				sheetName = keyStr.substring(idx1+1, idx);
			}
			else{
				sheetName = keyStr.substring(0, idx);
				idx1=0;
			}
			console.log(keyStr,sheetName,str);
			if( handSheetNames.indexOf(sheetName)<0 ){
				handSheetNames.push( sheetName );
				keyStr = str? str+","+sheetName : sheetName;
			}
			else{
				keyStr = str;
			}
			
			if( str1 ) keyStr+=str1;
			
			idx = keyStr.indexOf( "@", idx1 );
		}
		
		
		while(1){
			idx = keyStr.indexOf( "xiaoguotu_" );
			if(idx<0) break;
			
			var idx1 = keyStr.indexOf( ",", idx );
			
			if(idx1<0){
				keyStr = (idx==0) ? "" : keyStr.substring(0,idx-1);
			}
			else{
				keyStr = keyStr.substring(0,idx) + keyStr.substr(idx1);
			}		
		}
		
		groupData.keys = keyStr;
	}
	
	return groups;
}


var baseDirectory = fs.realpathSync(__dirname);
   
//makeDirectory( sourceDirectory );

var fileUrl = process.argv[2];
var outUrl = process.argv[3];
var stUrl = process.argv[4];


handMergeRes( fileUrl );

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );