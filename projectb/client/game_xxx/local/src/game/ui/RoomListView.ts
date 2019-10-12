module GMD_bjl {
	export class RoomListView extends game.Room2 {
		constructor(){
			super();
		}
		public childrenCreated() {
			super.childrenCreated();
			let self = this;
			self.skBack.setTarget(end,self);
			self.setTitle("txt_bjl_tips");
			self.initMo();
			_routeMo.addListener(RouteMo_EVT.upRoom,self.updateRoomInfo,self);
			self.updateRoomInfo();
		}
		public initMo(){
			let tmpList:Array<game.IRouteData> = [];
			let roomInfos = _routeMo.getRoomListInfo();
			for(let key in roomInfos){
				let roomInfo = roomInfos[key];
				tmpList.push({route:roomInfo.route});
			}
			this.skList.init(tmpList,RoomListItem);
		}
		public updateRoomInfo(){
			let roomInfos = _routeMo.getRoomListInfo();
			let iRoomData:game.IRoomData[] = [];
			for(let key in roomInfos){
				let roomInfo:IRoomInfo = roomInfos[key];
				iRoomData.push({room:roomInfo});
			}
			this.skList.updateRoom(iRoomData);
		}
		public onDispose(){
			_routeMo.rmvListener(RouteMo_EVT.upRoom,this);
			super.onDispose();
		}
	}
	export class RoomListItem extends game.RouteItemBase{
		public skZPL:game.RouteCom;
        public skDL:game.RouteCom;
        public skDYZL:game.RouteCom;
        public skXL:game.RouteCom;
        public skXQL:game.RouteCom;
		public skLimitLab: cui.Label;
		public skTimeLab: cui.Label;
		public skChang: cui.BitmapLabel;
		public skJu: cui.BitmapLabel;
		public skWinLab: cui.Label;
		public skLoseLab: cui.Label;
		public skPeaceLab: cui.Label;
		public skEnterGame:cui.ScaleButton;
		public skBar:cui.ProgressBar;


		private _roomId:number;
		//private _baseRoom:Bjl_NET_CONF.gs_base_room_info;
		constructor() {
			super();
			this.skinName = "roomList1Skin";
		}
		public childrenCreated() {
			super.childrenCreated();
			let self = this;
			self.skEnterGame.setTarget(function(){
					let roomid = self._roomId;
					let gold = _roomModel.getRoomObjById(roomid).configObj.GoldCondition;
					if (game.dataMgr.accMo.getData().gold < gold) {
						game.MsgBox.showTxt(bjlLang.bjl,langConsts.bjlLang.GoldNotEnough);
						return;
					}
					_dataModel.enterGame(confConsts.GameTp.bjl, roomid);
			},self);
			_routeMo.addListener(RouteMo_EVT.upTime,self.updateTime,self);
			self.skBar.labelFunction = self.pbLabelFun.bind(self);
			self.skBar.openAni = true;
		}
		public updateTime(data:Bjl_NET_CONF.gs_base_room_info){
			let self = this;
			if(data.room_id == self._roomId){
				if( data.game_state == gameState.bet){
					let tm  = data.calc_time ;
					self.skBar.value = (tm / 15); //这里是游戏选场的最大时间，一般都是15秒
					self.skBar.setProgressValue(0,tm * 1000);
				}else{
					self.skTimeLab.text = TRain.langMgr.getTxt(game.LangGrp.mainLang,langConsts.mainLang.InResult) ;
				}
			}
		}
		private pbLabelFun(val:number):string
        {          
            let self = this;
            let value = Math.floor(val * 15);
			if(value > 0){
				self.skTimeLab.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt(game.LangGrp.mainLang,langConsts.mainLang.InBet),value)) ;
			}else{
				self.skBar.value = 0;
				self.skTimeLab.textFlow = cui.htmlParser.parser(TRain.langMgr.getTxt(game.LangGrp.mainLang,langConsts.mainLang.InResult));
			}
            return "";
        }
		public updateRoom(roomData:game.IRoomData){
			super.updateRoom(roomData);
			let self = this;
			// if(!roomData)return ;
			let room = roomData.room;
			let roomConf:game.BaccaratRoomConfigConf = room.roomConf;
			let baseRoom:Bjl_NET_CONF.gs_base_room_info = room.baseRoom;
			//let time:number = self._time = baseRoom ? baseRoom.state_time : 0;
			let hisList = room.hisList;
			self._roomId = roomConf.id;
			//获取配置
			self.skChang.text = roomConf.RoomIDTxt + "c";
			self.skLimitLab.text = StringUtil.printf(TRain.langMgr.getTxt(game.LangGrp.mainLang,langConsts.mainLang.LimitRed),roomConf.BetRange[0],roomConf.BetRange[1] );

			// if(time>0){
			// 	self.skBar.openAni = true;
			// 	self.skBar.value = time;
			// 	self.skBar.setProgressValue(0,time* 1000);
			// }else{
			// 	self.skTimeLab.text = TRain.langMgr.getTxt(game.LangGrp.mainLang,langConsts.mainLang.InResult) ;
			// }
			let win = hisList[0] || 0;
			let lose = hisList[1] || 0;
			let peace = hisList[2] || 0;
			self.skJu.text = win + lose + peace + "j";
			self.skWinLab.text = StringUtil.printf(TRain.langMgr.getTxt(game.LangGrp.mainLang,langConsts.mainLang.zhuang),win);
			self.skLoseLab.text =  StringUtil.printf(TRain.langMgr.getTxt(game.LangGrp.mainLang,langConsts.mainLang.xian),lose);
			self.skPeaceLab.text =  StringUtil.printf(TRain.langMgr.getTxt(game.LangGrp.mainLang,langConsts.mainLang.he),peace);
		}
		public dispose(){
			_routeMo.rmvListener(RouteMo_EVT.upTime,this);
			super.dispose();
		}
	}
}