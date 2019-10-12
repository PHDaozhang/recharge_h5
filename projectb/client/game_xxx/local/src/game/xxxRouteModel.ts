module GMD_xxx{
    export const enum RouteMo_EVT{
        upRoom = "room",//更新房间信息
        upTime = "tm",//更新游戏状态和时间
    } 
    export interface IRoomInfo {
        roomConf:any;//房间信息配置文件
        baseRoom:xxx_NET_CONF.gs_base_room_info;//服务器返回的房间信息
        hisList:Array<number>;//历史场数数组 庄 xx 闲  xx 和  xx
		route:game.RouteModel; //牌路model
    }
    export const enum gameState{//这个状态每个子游戏
		begin = 0,//开始游戏
		bet = 1,//开始下注
		award = 2,//开奖期间
    }
    export const enum resultState{
		addHis = 0,// 0：代表追加数据
		changeHis = 1,//1：代表所有 重置
		upTm   = 2,//2：代表更新游戏状态和时间
	}
    export class xxxRouteModel extends game.DataModel{
        private _btRoomConfs:any;

        private _roomListInfo:IRoomInfo[];//房间列表信息

        private _roomHisResult:any;//房间历史记录结果
        constructor(roomConfigs:any){//roomConfigs 配置
            super();
            let self = this;
            self._roomListInfo = [];
            self._roomHisResult = {};
            self.onLoadConf(roomConfigs);
        }
        public onLoadConf(data: any): void {
            let self = this;
            let bRConfs = self._btRoomConfs = data.BaccaratRoomConfig;//子游戏对应的房间配置
            for (let key in bRConfs) {
                let bRConf = bRConfs[key];
                let tmpInfo:IRoomInfo = {
                    roomConf:bRConf,
                    baseRoom:null,
                    hisList:[],
                    route:new game.RouteModel,
                };
                self._roomListInfo[bRConf.id] = tmpInfo;
            }
        }
        public getBtRoomConf(roomId:number):game.BaccaratRoomConfigConf
        {
            return this._btRoomConfs[roomId];
        }
        public getBtRoomConfs(){
            return this._btRoomConfs;
        }
        public getRoomListInfo():IRoomInfo[]{
			return this._roomListInfo;
        }
        public setRoomListInfo(state:number,room_history:xxx_NET_CONF.gs_msg_baccarat_room_info[]){
            let self = this;
            let roomListInfos = self._roomListInfo;
            if(state == resultState.upTm){
                self.postEvent(RouteMo_EVT.upTime,room_history[0].base_room_info);
                return;
            }
			for(let i = 0;i<room_history.length;i++){
                let roomInfo:xxx_NET_CONF.gs_msg_baccarat_room_info = room_history[i];
                let roomId = roomInfo.base_room_info.room_id;
                let roomListInfo = roomListInfos[roomId];
                roomListInfo.baseRoom = roomInfo.base_room_info;
                self.updateHistory(state,roomInfo);
                let historys = roomListInfo.route.historys;
                self._roomHisResult[roomId] = historys;
                roomListInfo.hisList = self.getSessionList(historys);
            }
            self.postEvent(RouteMo_EVT.upRoom);
        }
        public getSessionList(list:xxx_NET_CONF.gs_msg_baccarat_history[]):Array<number>{//获取对应房间的庄闲和数 
			let win:number = 0;
			let lose:number = 0;
			let peace:number = 0;
			for(let i:number = 0; i < list.length; i++){
				let history:xxx_NET_CONF.gs_msg_baccarat_history = list[i];
				if(history.is_tie == 1)
					{
						peace ++;
					}else if(history.is_player_win)
					{
						lose ++;
					}else if(history.is_banker_win)
					{
						win ++;
					}
			}
			return [win,lose,peace];
		}
        public updateHistory(state:number,info:xxx_NET_CONF.gs_msg_baccarat_room_info){
            let self = this;
            let roomId = info.base_room_info.room_id;
            let baccaratInfo = info.baccarat_info;
            let roomListInfo = self._roomListInfo[roomId];
            let routeMo = roomListInfo.route;
            routeMo.data2Zhupanlu = self.history2Zupanlu;
            if(state == resultState.addHis){
                routeMo.addHistory(baccaratInfo);	
            }else if(state == resultState.changeHis){
                routeMo.historys =  baccaratInfo;
            }
        }
        private history2Zupanlu( history:xxx_NET_CONF.gs_msg_baccarat_history ):game.IGameResult{ //格式化珠盘路数据
			let ret  = {r:game.GameResultTp.none,pt:0,up:false,down:false};
				if(history.is_tie == 1)
				{
					ret.r = game.GameResultTp.peace;
				}else if(history.is_player_win)
				{
					ret.r = game.GameResultTp.lose;
				}else if(history.is_banker_win)
				{
					ret.r = game.GameResultTp.win;
				}
				ret.down = history.is_player_pair;
				ret.up = history.is_banker_pair;
				ret.pt = history.win_point;
			return ret;
		}
    }
}