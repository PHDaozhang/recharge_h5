module game
{

	interface IServerRangeShowData extends cui.IItemData
	{
		text:string;
		index:number;
		select:boolean;//是否选中
		delegate:LoginServer;
	}

	interface IServerItemShowData extends cui.IItemData
	{
		delegate:LoginServer;
		select:boolean;
		index:number;
		isHot:boolean;
		serverData:any;
	}

	export class LoginServer extends game.UIFWBase
	{
		//-----------------------skin
		public skRange:cui.DataGroup;
		public skServer:cui.DataGroup;
		public skAdvice:cui.DataGroup;
		//public skClose:cui.Button;

		private _index:number = 0;

		private _rangeData:cui.ArrayCollection;
		private _svrData:cui.ArrayCollection;
		private _adviceData:cui.ArrayCollection;

		public delegate:LoginScene;

		constructor()
		{
			super();

			//dataMgr.platMo.syncEntrys();

			let self = this;
			self.name = "LoginServer";
			self.skinName = "LoginServerSkin";
		}

		protected onPartAdded():void
		{
			let self = this;
			//self.skBClose.setTarget(self.tapClose, self);
			let collect = self._rangeData = new cui.ArrayCollection();

			let list = self.skRange;
			list.dataProvider = collect;
			list.itemRender = LoginServerRangeItem;

			collect = self._svrData = new cui.ArrayCollection();
			list = self.skServer;
			list.dataProvider = collect;
			list.itemRender = LoginServerItem;
			list.itemSkinName = "serverItemSkin";

			collect = self._adviceData = new cui.ArrayCollection();
			list = self.skAdvice;
			list.dataProvider = collect;
			list.itemRender = LoginServerItem;
			list.itemSkinName = "LoginAdviceSerSkin";

			// self.updateRangeList();
			// self.updateServerList();
			// self.updateAdviceList();
		}

		// private tapClose():void
		// {
		// 	let self = this;
		// 	self.doClose();
		// }

		// private doClose():void
		// {
		// 	let self = this;
		// 	self.delegate.showView( LoginNavType.kLoginLayer );
		// }

		// private updateRangeList():void
		// {
		// 	let self = this;
		// 	let arr:Array<IServerRangeShowData> = self.dataListServerRange();
		// 	self._rangeData.replaceAll(arr);
		// }

		// private updateServerList():void
		// {
		// 	let self = this;
		// 	let arr:Array<any> = self.dataListServer();
		// 	let listArr:Array<IServerItemShowData> = [];
		// 	for(let i=0, cnt = arr.length; i<cnt;i++)
		// 	{
		// 		let serInfo = arr[i];
		// 		let serItemInfo:IServerItemShowData = {
		// 			width:351,
		// 			height:78,
		// 			delegate:self,
		// 			select:false,
		// 			index:i,
		// 			isHot:false,
		// 			serverData:serInfo
		// 		};
		// 		if( i == 0 )
		// 		{
		// 			serItemInfo.select = true;
		// 			self._curServerInfo = serItemInfo;
		// 		}
		// 		serItemInfo.isHot = !serInfo[resConsts.SvrEntryEntity.isNew];
		// 		listArr.push( serItemInfo );
		// 	}
		// 	self._listDataPro.replaceAll( listArr );
		// }

		// public serverRangeChange(rangInfo:IServerRangeShowData):void
		// {
		// 	let self = this;
		// 	let oldInfo = self._curTitleInfo;
		// 	if(oldInfo)
		// 	{
		// 		oldInfo.select = false;
		// 		self._rangeDataPro.itemUpdated(oldInfo);
		// 	}
		// 	rangInfo.select = true;
		// 	self._rangeDataPro.itemUpdated(rangInfo);
		// 	self._curTitleInfo = rangInfo;
		// 	self._index = rangInfo.index;
		// 	//改变服务器列表的数据
		// 	self._listDataPro.refresh();
		// 	self.updateServerList();
		// }

		// private updateAdviceList():void
		// {
		// 	let self = this;
		// 	let arr:Array<any> = dataMgr.platMo.getAdviceList();
		// 	let listArr:Array<IServerItemShowData> = [];
		// 	for(let i=0, cnt = arr.length; i<cnt;i++)
		// 	{
		// 		let serInfo = arr[i];
		// 		let adviceSerInfo:IServerItemShowData = {
		// 			width:540,
		// 			height:78,
		// 			delegate:self,
		// 			select:false,
		// 			index:i,
		// 			isHot:false,
		// 			serverData:serInfo
		// 		};

		// 		if(i == 0)
		// 		{
		// 			adviceSerInfo.select = true;
		// 		}
		// 		adviceSerInfo.isHot = !serInfo[resConsts.SvrEntryEntity.isNew];
		// 		listArr.push(adviceSerInfo);
		// 	}
		// 	self._adviceDataPro.replaceAll(listArr);
		// }

		// private getRangeData():Array<IServerRangeShowData>
		// {
		// 	let self = this;
		// 	let  titleArr = dataMgr.platMo.getTitleList();
		// 	let tempArr = [];
		// 	let titleInfo:IServerRangeShowData;
		// 	for(let i=1, cnt = titleArr.length; i<cnt; i++)
		// 	{
		// 		titleInfo = {
		// 			width:207,
		// 			height:75,
		// 			text:titleArr[i],
		// 			index:i,
		// 			select:false,
		// 			delegate:self
		// 		};
		// 		tempArr.push(titleInfo);
		// 	}
		// 	tempArr.reverse();
		// 	//处理登录过的
		// 	titleInfo = {
		// 		width:207,
		// 		height:75,
		// 		text:titleArr[0],
		// 		index:0,
		// 		select:true,
		// 		delegate:self
		// 	};
		// 	tempArr.unshift(titleInfo);
		// 	self._curTitleInfo = titleInfo;
		// 	return tempArr;
		// }

		// private dataListServer():Array<any>
		// {
		// 	let self = this;
		// 	let listArr = dataMgr.platMo.getServerList( self._index );
		// 	if( self._index != 0 )
		// 	{
		// 		listArr.reverse();
		// 	}
		// 	return listArr;
		// }

		// public clickListServer( serInfo:IServerItemShowData,isLogin = true ):void
		// {
		// 	let self = this;
		// 	let serData = serInfo.serverData;
		// 	let oldInfo = self._curServerInfo;
		// 	if( oldInfo )
		// 	{
		// 		oldInfo.select = false;
		// 		self._listDataPro.itemUpdated( oldInfo );
		// 	}
		// 	serInfo.select = true;
		// 	self._listDataPro.itemUpdated( serInfo );
		// 	self._curServerInfo = serInfo;
		// 	let entryId = serData[resConsts.SvrEntryEntity.id];
		// 	dataMgr.platMo.selectSvr( entryId );
		// 	if( isLogin )
		// 	{
		// 		dataMgr.platMo.loginGame( serData );
		// 	}
		// 	self.doClose();
		// }
	}

	export class LoginServerItem extends cui.DataItem
	{
		//-----------------------skin
		public skImgSelected:cui.Image;
		public skLabelContent:cui.Label;
		public skIcoNew:cui.Image;
		public skIcoStatus:cui.Image;
		public skBtnMask:cui.SimpleButton;

		protected onPartAdded():void
		{
			let self = this;
			self.skBtnMask.setTarget(self.tapBtnMask, self);
		}

		private tapBtnMask():void
		{
			let self = this;
			let showData:IServerItemShowData = <IServerItemShowData>self.data;
			//showData.delegate.clickListServer(showData);
		}
		protected dataChanged():void
		{
			super.dataChanged();
			let self = this;
			let showData:IServerItemShowData = <IServerItemShowData>self.data;
			let serInfo:any = showData.serverData;
			// let isClose = serInfo[resConsts.SvrEntryEntity.isClose];
			// let isNew = serInfo[resConsts.SvrEntryEntity.isNew];
			// self.skLabelContent.text = serInfo[resConsts.SvrEntryEntity.name]+"-"+serInfo[resConsts.SvrEntryEntity.area];
			// self.skIcoStatus.source = isClose ? resMgr.getFullName("ld_img_7") : resMgr.getFullName("ld_img_6");
			// if( isClose )
			// {
			// 	self.skIcoNew.source = resMgr.getFullName("ld_img_8");
			// }
			// else if( isNew )
			// {
			// 	self.skIcoNew.source = resMgr.getFullName("ld_img_3");
			// }
			// else
			// {
			// 	self.skIcoNew.source = resMgr.getFullName("ld_img_9");
			// }
			// self.skImgSelected.source = showData.select ? resMgr.getFullName("ld_bg_8"):resMgr.getFullName("ld_bg_4");
		}
	}

	export class LoginServerRangeItem extends cui.DataItem
	{
		static ON_BTN_RANGE:string = "ON_BTN_RANGE";

		public skLabelName:cui.Label;
		public skImgBg:cui.Image;
		public skBtnRange:cui.SimpleButton;

		constructor()
		{
			super();
			let self = this;
			self.skinName = "skins.skgame.LoginServerRangeItemSkin";
		}

		protected onPartAdded():void
		{
			let self = this;
			self.skBtnRange.setTarget(self.tapBtnRange, self);
		}

		protected dataChanged():void
		{
			super.dataChanged();
			let self = this;
			if(!self._inited) return;
			let showData:IServerRangeShowData = <IServerRangeShowData>self.data;
			self.skLabelName.text = showData.text;
			//self.skImgBg.source = showData.select?resMgr.getFullName("ld_btn_1"):resMgr.getFullName("c_btn_19");
		}

		private tapBtnRange():void
		{
			let self = this;
			let showData:IServerRangeShowData = <IServerRangeShowData>self.data;
			if(showData.delegate)
			{
				//showData.delegate.serverRangeChange(showData);
			}
		}
	}
}
