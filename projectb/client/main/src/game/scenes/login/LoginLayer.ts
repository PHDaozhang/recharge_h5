module game
{
	export interface IServerShortItem extends cui.IItemData
	{
		delegate:LoginLayer;
		select:boolean;
		icoState:string;
		serName:string;
		serverData:any;
	}

	export const enum SerStatue
	{
		good = 1,   //优良
		normal = 2, //正常
		full = 3,   //爆满
	}

	export class LoginLayer extends UIFullFW
	{
		//-----------------skin
		public skCurSvr:cui.Label;
		public skSel:cui.SimpleButton;
		public skEnter:cui.ScaleButton;

		public delegate:LoginScene;
		constructor()
		{
			super();
			let self = this;
			self.skinName = "LoginLayerSkin";
		}

		protected onPartAdded():void
		{
			let self = this;

			//添加侦听
			self.skEnter.setTarget(self.doLogin,self);
			self.skSel.setTarget(self.doSelSvr, self);
		}

		protected openImpl():void
		{
			let self = this;
			// let entryInfo = dataMgr.platMo.getCurEntry();
			// if( !entryInfo ) return;//没有服务器信息

			//self.skCurSvr.text = entryInfo[resConsts.SvrEntryEntity.name] + "   " + entryInfo[resConsts.SvrEntryEntity.area];

			//弹 维护提示
			//if( entryInfo[resConsts.SvrEntryEntity.isClose] )
			// {
			// 	dataMgr.platMo.loginGS();
			// }
		}

		private doLogin():void// 开始游戏
		{
			//let self = this;
			// let entryInfo = dataMgr.platMo.getCurEntry();
			// if( entryInfo )
			// {
			// 	dataMgr.platMo.loginGS();
			// }
			// else
			// {
			// 	//MsgBox.showBox( langMgr.getLocalString("userCheckServer") );
			// }
		}

		private doSelSvr():void
		{// 选择服务器
			this.delegate.showView( LoginNavType.kLoginServer );
		}
	}
}
