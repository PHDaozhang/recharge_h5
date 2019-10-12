var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var path        = require('path');
var UglifyJS = require("uglify-js");

var EXMLParser = require( "./deps/EXMLParser" );
var conf = require( "./conf" );

EXMLParser.conf = conf;

var parser = new EXMLParser();



 function toJsCode( path, code ) 
 {
    var code = parser.parseToJs( xmlTxt );
	
	fs.writeFileSync(path, code);
 };

function format (text)
{
    var args = arguments;
    
    return text.replace(/%([1-9])/g, function($1, $2) {
        return args[$2] != undefined ? args[$2] : "";
    });
}

function getExmlFiles( fpath, exmlFiles )
{
	var files = fs.readdirSync( fpath );
	var dirs = [];
	
	files.forEach( function(item){
			var tmpPath = path.join( fpath, item );
			var stats = fs.statSync( tmpPath );
			if( stats.isDirectory() ){
				dirs.push( tmpPath );
			}
			else{
				if( path.extname(item) == ".exml" ){
					exmlFiles.push( tmpPath );
				}
			}
		});
		
	dirs.forEach( function(item){
		getExmlFiles( item, exmlFiles );
	} );
};

function handleWinClass( content, findStr ){
	var addStr = "";
	var idx = 0;
	var protoStr = '.prototype, "';
	while( 1) {
		idx = content.indexOf( findStr, idx );
		if( idx>0 ){
			idx += findStr.length;
			var nmidx1 = content.indexOf( protoStr, idx );
			if( nmidx1>0 ){
				nmidx1 += protoStr.length;
				var nmidx2 = content.indexOf( '"', nmidx1 );
				if( nmidx2>0 && nmidx2>nmidx1 ){
					var clsNm = content.substring( nmidx1, nmidx2 );
					addStr += ";window." + clsNm + "=" + clsNm;

					idx = nmidx2 + 1;
				}
			}
		}
		else{
			break;
		}
	}
	return addStr;
}

function tansferSkins()
{
	//var content = fs.readFileSync( path.join( sourceDirectory, "main.js" ) , 'utf8');
	//var viewStr = handleWinClass( content, "}(BaseView));");
	//var layStr = handleWinClass( content, "}(BaseLayer));" );
	//content += viewStr + layStr + ";window.Main = Main;";
	//fs.writeFileSync( path.join(outDirectory, "main.js"), content );
	//return;
	
	var exmlFiles = [];
	getExmlFiles( path.join( sourceDirectory, "skins" ), exmlFiles );
	
	var exmlDatas = {};
	var codeStr = "var egret = window.egret;function __extends(d, b) {\
			for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; \
				function __() { \
					this.constructor = d; \
				} \
			__.prototype = b.prototype;\
			d.prototype = new __();\
		};\
		var allSkin = {}; \
		var UITheme = UITheme || {allSkin:allSkin};\n"
	
	codeStr += handSkinToJs( exmlFiles, exmlDatas, [] );
	
	var initSkins = conf.initSkins;
	if( initSkins.length>0 ){
		var initThemes = [];
		var delKeys = [];
		for( var key in initSkins ){
			var data = exmlDatas[key];
			if( !data ){
				console.log( "initSkins skin  not  exist  key=" + key );
				continue;
			}
			
			delKeys.push(key);
			initThemes.push( data );	
		}
		fs.writeFileSync( path.join(sourceDirectory, "initTheme.json"), JSON.stringify(initThemes, null, 4) );
	}
	
	fs.writeFileSync( path.join(sourceDirectory, "theme.json"), JSON.stringify(exmlDatas, null, 4) );
	
	fs.writeFileSync( path.join(sourceDirectory, "theme.js"), codeStr );
}

function handSkinToJs( exmlFiles, exmlDatas, excludeExmls )
{
	var codeStr = "";
	for( var i=0; i<exmlFiles.length; ++i )
	{
		var exmlFile = exmlFiles[i];
		if( excludeExmls && excludeExmls.indexOf(exmlFile)>=0 )
		{
			//console.log( exmlFile );
			continue;
		}
		
		
		var skinName = path.basename( exmlFile ).split(".")[0];
		if( skinName in exmlDatas ){
			console.log( "skinName already exist  skinName=" + skinName );
			continue;
		}
				
		var content = fs.readFileSync(exmlFile, 'utf8');

		content = content.replace(/ >/g, ">");
		content = handleSkinName( content );
		//console.log( "content  =" + content );
		
		var code = parser.parse( content );
		code = code.replace(/eui/g, "cui");
		
		//exml转换成未压缩的js文件
		var toPath = path.join(outDirectory, skinName);
		fs.writeFileSync(toPath, code);
		
		var result = UglifyJS.minify(code, {fromString: true,
											mangle: true,
											compress: {
												sequences: true,
												dead_code: true,
												conditionals: true,
												booleans: true,
												unused: true,
												if_return: true,
												join_vars: true,
												drop_console: true
											}});
		
		//压缩后 出现!function 不知道为什么， 这里做个临时处理
		var tmp = result.code;
		tmp = "(" + tmp.substring(1);//去除！
		//加上（）
		var idx = tmp.lastIndexOf( "}" ) + 1;
		tmp = tmp.substring(0,idx) + ")" + tmp.substring(idx);
		
		var tmp1 = tmp.replace(/function\(/g, "#!");
		tmp1 = tmp1.replace(/this\./g, "#@");
		tmp1 = tmp1.replace(/return /g, "#:");
		tmp1 = tmp1.replace(/new cui\./g, "#&");
		
		exmlDatas[skinName] = tmp1;	
		
		codeStr += "allSkin."+skinName+"=" + tmp + "\n";
	}
	//console.log( ".......................................... inits " );
	//console.log( initExmls );
	
	return codeStr;
}

function handleSkinName( content )
{
	var str = "";
	var skinName = 'skinName="';
	var exml = '.exml';
	var idx = content.indexOf( skinName );
	var idx1 = 0;
	var skinNameVal;
	while( idx>=0 ){
		idx += skinName.length;
		str += content.substring( 0, idx );
		content = content.substring( idx );
		idx1 = content.indexOf( '"' );
		if( idx1>exml.length ){
			skinNameVal = content.substring( 0, idx1 );
			
			var tmpIdx = skinNameVal.lastIndexOf( '/' );
			if( tmpIdx>=0 ){
				var tmpIdx1 = skinNameVal.lastIndexOf( '.' );
				skinNameVal = skinNameVal.substring( tmpIdx+1, tmpIdx1 );
				str += skinNameVal;
				content = content.substring( idx1 );	
			}
			
			idx = content.indexOf( skinName );
		}
		else{
			idx = -1;
		}
	}
		
	return str += content;
}

function getDependSkins( exmlcontent, excludeNames )
{
	var ret = [];
	var idx = 0;
	while(1)
	{
		idx = exmlcontent.indexOf( "skinName", idx ) + 1;
		if( idx <= 0 ) break;
		
		var startIdx = exmlcontent.indexOf( '"', idx+7 ) + 1;
		var endIdx = exmlcontent.indexOf( '"', startIdx );
		
		var dependSkinName = exmlcontent.substring( startIdx, endIdx );
		startIdx = dependSkinName.indexOf( "skins" );
		var dependSkinName = dependSkinName.substring( startIdx+6 );
		
		if( ret.indexOf(dependSkinName) < 0 && excludeNames.indexOf(dependSkinName) < 0 )
		{
			ret.push( dependSkinName );
		}
	}
	return ret;	
}

var baseDirectory = fs.realpathSync(__dirname);

var outDirectory = path.join(baseDirectory, "out");

//makeDirectory( sourceDirectory );
var firstName = process.argv[2] || "resource";

var sourceDirectory = path.join(baseDirectory, firstName);

tansferSkins();

//tansferIndex( "1.0.0", "3.0.2", "2", destDir );