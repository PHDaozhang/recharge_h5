module game{

	export interface GmdConf {
		id:number;  //游戏类型
		nm:string;  //游戏名字
		file:string;  //游戏名字母简称
		ver0:string;  //游戏皮肤版本号
		ver1:string;  //游戏脚本版本号
		wg:number;  //子游戏权重
	}
}