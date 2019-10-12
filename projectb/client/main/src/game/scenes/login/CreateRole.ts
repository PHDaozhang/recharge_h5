module game
{
	export class CreateRole extends game.UIFWBase
	{
		//-------------skin---------------
		public skLogin:cui.Button;
		public skInput:cui.EditableText;
		public skRand:cui.ScaleButton;
	
		constructor()
		{
			super();
			let self = this;
		
			self.skinName = "CreateChaSkin";
		}


		protected onPartAdded():void
		{
			let self = this;
			self.skLogin.setTarget(self.doCreate, self);
			self.skRand.setTarget(self.doRandName,self);

			self.doRandName();
		}

		private doCreate():void
		{
			let name = this.skInput.text;
			// if( !name || name.length<=0 ){
			// 	MsgBox.showBox( LangGrp.loginUI, langConsts.loginUI.inputname );
			// 	return;
			// }

			// if( name.indexOf(" ")>=0 ||
			// 	name.indexOf("\n")>=0 || 
			// 	name.indexOf("\\n")>=0 || 
			// 	name.indexOf("\r")>=0 || 
			// 	name.indexOf("\\r")>=0 || 
			// 	name.indexOf("\"" )>=0 ){
			// 		MsgBox.showBox( LangGrp.loginUI, langConsts.loginUI.invalidchar );
			// 		return;
			// }
			
			//dataMgr.userMo.createUser( name );
		}

		private doRandName():void
		{
			let firstNms = <string[]>TRain.langMgr.getGp( 'firstNm' );
			let lastNms = <string[]>TRain.langMgr.getGp( 'lastNm' );
			if( !firstNms || !lastNms ) return;

			let fIdx = Math.floor(Math.random() * firstNms.length);
            let lIdx = Math.floor(Math.random() * lastNms.length);
			this.skInput.text = firstNms[fIdx] + lastNms[lIdx];
		}

		protected getNeedRes():{res:string,tp?:string}[]{
			let ret = super.getNeedRes() || [];
			ret.push( {res:ResManager.getConfUrl("randNm"), tp:TRain.RES_TYPE.JSON} );
			return ret;
		}

		protected onLoadFin(){
			let url = ResManager.getConfUrl("randNm");
			let data =  TRain.assetMgr.getUrlRes( TRain.RES_TYPE.JSON, url );
			if(data) {
				TRain.langMgr.addGps( data );
				TRain.assetMgr.destroyRes( url );
			}
			
			super.onLoadFin();
		}
	}
}


