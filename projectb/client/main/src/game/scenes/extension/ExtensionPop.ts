module game {
	export class ExtensionPop extends UIPopup {
		private skclose: cui.SimpleButton;
		private skTG:cui.ScaleButton;
		public constructor() {
			super();
			let self = this;
			self.skinName = "ExtendPopSkin";
			self.hideBg = false;
			self.vCenter = 0;
			self.hCenter = 0;
		}

		public childrenCreated() {
			super.childrenCreated();
			let self = this;
			self.skclose.setTarget(function () {
				self.close();
				dataMgr.generalMo.postEvent(General_EVT_POP.Close);
			}, self);
			self.skTG.setTarget(function () {
				self.close();
				gameScene.showHallUI(UITag.extension);
			}, self);
		}
	}
}