module GMD_xxx {
	//房间信息
	export interface xxxRoomShowData extends cui.IItemData {
		Handle:IRoomHandle,
		tag:number,//房间id
		bg: string,//底图
		icon: string,//小图
		dfFont: string,//底分字体
		rcFont: string,//入场字体
		idTxt: string,//房间编号
		idTxtNm:number,//字体font
	}
	export interface IRoomHandle{
		click(item:xxxRoomItem);
	}
	export class xxxRoomView extends game.Room1{
		private _listArr:any[];
		public childrenCreated() {
			super.childrenCreated();
			let self = this;
			self.setTitle("zhajinhua_txt_Title");//对应的子游戏title
			self.skBack.setTarget(end, self);
			self.skQuickStart.setTarget(function () {
				//快速进入游戏，如果一个都没有则提示充值，如果有多个则进最高的，否则就进能进去的
				//let id:number;
				//let list = gameDataMo.getroomConf(); //子游戏配置
				//for (let temp in list) {
				//	let roomConf = list[temp];
				//	if (game.dataMgr.accMo.getData().gold >= roomConf.GoldCondition) {
				//		id = roomConf.RoomID;
				//	}
				//}
				//if (id) {
				//	//confConsts.GameTp.zhajinhua 子游戏枚举
				//	gameDataMo.enterGame(confConsts.GameTp.xxx, id);
				//} else {
				//	//充值转入
				//}
			}, self);
			self.initView();
			self.setData(xxxRoomItem,self._listArr);
		}
		public click(item:xxxRoomItem){
			let self = this;
			let data:xxxRoomShowData = <xxxRoomShowData> item.data;
			//请求进入游戏
			let roomid = data.tag;
			let gold = gameDataMo.getGoldCondition(roomid);
			if (game.dataMgr.accMo.getData().gold < gold) {
				//let condition = game.DataFormat.convertGold(gold);
				//let str = StringUtil.printf(TRain.langMgr.getTxt("zhajinhuaLang", langConsts.zhajinhuaLang.enterCondition), condition);
				//game.TipsMgr.showPrompt(str, game.UIColor.white);
				//return;
			}
			//confConsts.GameTp.zhajinhua 子游戏枚举
			gameDataMo.enterGame(confConsts.GameTp.xxx, roomid);
		}
		private initView():void{
			let self = this;
			//获取游戏列表
			//let list = gameDataMo.getroomConf();
			//let listArr = self._listArr = [];
			//let dataFormat = game.DataFormat;
			//for (let index in list) {
			//	let roomConf:game.GoldFlowerRoomConfigConf = list[index];
			//	let showData:xxxRoomShowData = {
			//		Handle:self,
			//		tag:roomConf.RoomID,
			//		bg:"txt_newScene"+roomConf.RoomImage,
			//		icon:roomConf.RoomPc,
			//		dfFont:"dfa" + dataFormat.convertYuanString3(roomConf.Ante),
			//		rcFont:"rca" + dataFormat.convertYuanString3(roomConf.GoldCondition), 
			//		idTxt:roomConf.RoomIDTxt,
			//		idTxtNm:roomConf.RoomImage,
			//	};
			//	listArr.push(showData);
			//}
			//listArr.sort(function(a:any,b:any){
			//	return a.tag - b.tag;
			//});
		}
	}
	export class xxxRoomItem extends cui.DataItem {
		public skBg: cui.Image;
		public skIcon: cui.Image;
		public skDfFont: cui.BitmapLabel;
		public skRcFont: cui.BitmapLabel;
		public skIdTxt: cui.BitmapLabel;
		public skBtn:cui.SimpleButton;
		constructor() {
			super();
			this.skinName = "xxxRmItemSkin";
		}
		public childrenCreated() {
			super.childrenCreated();
			let self = this;
			let data:xxxRoomShowData = <xxxRoomShowData> self.data;
			self.skBtn.setTarget(function(){
				data.Handle.click(self);
			},self);
		}
		protected dataChanged() {
			super.dataChanged();
			let self = this;
			let data:xxxRoomShowData = <xxxRoomShowData> self.data;
			self.skBg.source = data.bg;
			self.skIcon.source = data.icon;
			self.skDfFont.text = data.dfFont;
			self.skRcFont.text = data.rcFont;
			self.skIdTxt.text = data.idTxt;
			self.skIdTxt.font = "moment" + data.idTxtNm;
		}
	}
}