var Transer = require("./Transer.js");

//公式转换器
module.exports = function(){
	this.paramCount = 0;
	Transer.apply(this, arguments);
	

	var oldInitColMap = this._initColMap;
	this._initColMap = function(){
		oldInitColMap.apply( this );

		var paramCount = 0;
		var colArr = this.colArr;
		for( var i=0, len=colArr.length; i<len; ++i )
		{
			var colData = colArr[i];
			if(colData.name.match(/^param\d+$/)) paramCount++;
		}

		this.paramCount = paramCount;
		//console.log( "paramCount = " + paramCount );
	}

    this._saveRowData = function( row, isOutList, idName, rowData ){
		var k = rowData["key"];
		if(k == null) return;
		
		var newRowData = [];
		for(var i = 0; i < this.paramCount; ++i){
			var value = rowData["param"+i];
			if(value == null) break;
			
			// var valTp = "int";
			// // if( k=="customizationCfg" )
			// // {
			// // 	if( i==0 || i==3 ){
			// // 		value = valHandler.strToArr(value);
			// // 	}
			// // 	else if(i == 5)
			// // 	{
			// // 		value = valHandler.strToArrInArr(value);
			// // 	}
			// // }
			// value = this._transValue(value, valTp);
			newRowData.push( value);
		}

		var result = this.outResult;
		if( isOutList ){
			if(result[k]) {
				console.warn("%s ： 数据结果中已经存在id为【%s】的数据，将会进行覆盖！【第%d行数据】", this.input, id, row);
			}
			result[k] = newRowData;
		}
		else{
			var idx = result.length;
			result.push( newRowData );

			var info = {idx:idx, outIdx:idx, desc:"", tp:"int"};
			var key2Idx = this.key2Idx;
			if( !key2Idx ){
				key2Idx = {};
				this.key2Idx = key2Idx;
			} 
			key2Idx[k] = info;
		}
    };

};