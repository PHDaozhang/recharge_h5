var Transer = require("./Transer.js");

//公式转换器
module.exports = function(){
    Transer.apply(this, arguments);
    
    this.parse = function(){
        this._initColMap();
        this._parse();
		this.key2Idx = this.outResult;
    };
};