module game {
	export class ExtensionShareView extends UIFullFW {
		private skclose: cui.ScaleButton;
		private skCopy: cui.ScaleButton;
		private skNet: cui.Label;
		private skerwei: cui.Base64Img;
		private _data: any;
		public constructor(data: any) {
			super();
			let self = this;
			self.skinName = "TeamShareListSkin";
			self._data = data;
		}

		public childrenCreated() {
			super.childrenCreated();
			let self = this;

			let LinkUrl = game.UIUtils.getQRLinkUrl(self._data.id, self._data.code_tag, 2);
			self.skNet.text = LinkUrl;
			self.skCopy.setTarget(function () {
				MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.copynet);
				URLUtil.copyText(self.skNet.text);
			}, self);
			self.skclose.setTarget(function () {
				TRain.soundMgr.playSFX(<any>confConsts.SoundTp.click);
				self.close();
				gameScene.showHallUI(UITag.extension, 6);
			}, self);
			self.createImg();
		}

		private createImg() {
			let self = this;
			let teamID = self._data.id;
			let tag = self._data.code_tag;
			game.UIUtils.getQRCodeTeam(teamID, tag, function (data) {
				self.skerwei.source = data;
			});
		}

		protected onShow(stage: egret.Stage) {
			super.onShow(stage);
		}

		protected onHide() {
			super.onHide();
		}
	}
}