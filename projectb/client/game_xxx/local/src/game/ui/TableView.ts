module GMD_bjl {
	export const enum RouteInnerTp{
		ql = 0,
		dl = 1,
		zpl = 2,
	}
	export class TableView extends game.UIFullFW {
		// -----------------------------------------------------------
		public skMenu:cui.MenuGroup;
		public skList:cui.Group;

		private _uiRouteList:Array<game.UIRouteList>;



		protected childrenCreated(): void {
			super.childrenCreated();
			for(let i = 0 ;i<self.skList.numChildren;i++){
				self._uiRouteList.push(self.skList.getChildAt(i) as game.UIRouteList);
			}
			self.skMenu.setTarget(self.btnClickMenu,self);
			self.skMenu.selectTag = RouteInnerTp.ql;
			//_routeMo.addListener(RouteMo_EVT.upHis,self.updateHisResult,self);
		}
		public btnClickMenu(item:cui.MenuItemImage){
			let self = this;
			let tag = item.tag;
			let tmpList:Array<game.IRouteData> = [];
			let roomInfos = _routeMo.getRoomListInfo();
			let roomId = _gameModel.getRoomId();
			self.skList.removeChildren();
            tmpList.push({route:roomInfos[roomId].route});
			let childRoute:game.UIRouteList = self._uiRouteList[tag];
			self.skList.addChild(childRoute);
			if(tag == RouteInnerTp.ql){
				childRoute.init(tmpList,RouteInner);
			}else if(tag == RouteInnerTp.dl){
				childRoute.init(tmpList,RouteInnerDL);
			}else{
				childRoute.init(tmpList,RouteInnerZPL);
			}
			//self.updateHisResult();
		}
		//public updateHisResult(){
        //    let roomInfos = _routeMo.getRoomListInfo();
        //    let roomId = _gameModel.getRoomId();
		//	let room = roomInfos[roomId];
        //    let hisList = room.route.historys;
        //    let juShuList = _routeMo.getJuShuList(hisList);
        //    for(let i = 0;i< juShuList.length;i++){
        //        let lab = this['skLab' + i] as cui.Label;
        //        lab.text = String(juShuList[i]);
        //   }
		//}
	}
}