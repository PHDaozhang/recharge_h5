module GMD_bjl{
    export class RoutePopView extends game.RoutePop{
        constructor(){
            super();
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.setImg("txt_bjl_routePop");
            _routeMo.addListener(RouteMo_EVT.upHis,self.updateHisResult,self);
            self.initMo();
            self.updateHisResult();
        }
        public initMo(){
			let tmpList:Array<game.IRouteData> = [];
			let roomInfos = _routeMo.getRoomListInfo();
            let roomId = _gameModel.getRoomId();
            tmpList.push({route:roomInfos[roomId].route});
			this.skList.init(tmpList,RoutePopList);
        }
        public updateHisResult(){
            let roomInfos = _routeMo.getRoomListInfo();
            let roomId = _gameModel.getRoomId();
			let iRoomData:game.IRoomData[] = [];
            iRoomData.push({room:roomInfos[roomId]});
			this.skList.updateRoom(iRoomData);
		}
        public onDispose(){
			_routeMo.rmvListener(RouteMo_EVT.upHis,this);
			super.onDispose();
		}
    }
    export class RoutePopList extends game.RouteItemBase{
		constructor() {
			super();
			this.skinName = "routeItemSkin";
		}
		public childrenCreated() {
            super.childrenCreated();
        }
        public updateRoom(roomData:game.IRoomData){
            super.updateRoom(roomData);
            let room = roomData.room;
            let hisList = room.route.historys;
            let juShuList = _routeMo.getJuShuList(hisList);
            for(let i = 0;i< juShuList.length;i++){
                let lab = this['skLab' + i] as cui.Label;
                lab.text = String(juShuList[i]);
            }
        }
	}
}