module game {
    export class BindGiftDialog extends game.UIPopup {
        public skBtnClose: cui.ScaleButton;
        public skBtnBind: cui.ScaleButton;
        public skImgSay: cui.Image;

        //兔女郎说话框弹出时间
        private _sayDur: number;
        private _sayID: number;
        private _delayDur: number;
        private _gameTag: number;

        public constructor() {
            super();
            let self = this;
            self.skinName = "BindGiftSkin";
            self.hCenter = 0;
            self.vCenter = 0;
            self._sayDur = 500;
            self._delayDur = 1000;
            self.hCenter = self.vCenter = 0;
            self._gameTag = self._gameTag = TRain.actionMgr.getUnitTag();
        }

        public childrenCreated(): void {
            super.childrenCreated();
            let self = this;
            self._sayID = TRain.core.addDelayDo(function () {
                game.UIUtils.move(self.skImgSay, { scaleX: 1, scaleY: 1 }, EaseUtil.quadInOut, self._sayDur, undefined, undefined, self._gameTag);
                TRain.core.rmvDelayDoByID(self._sayID);
                self._sayID = undefined;
            }, self, self._delayDur);
            self.skBtnClose.setTarget(function () {
                self.close();
                dataMgr.generalMo.postEvent(General_EVT_POP.Close);
            }, self);
            self.skBtnBind.setTarget(function () {
                let view = new Registered();
                view.setData(true);
                gameScene.openPopup(view);
                self.close();
            }, self);
        }

        public onDispose(): void {
            let self = this;
            if (!isNaN(self._sayID)) {
                TRain.core.rmvDelayDoByID(self._sayID);
            }
            TRain.actionMgr.rmvActsByTag(self._gameTag);
            super.onDispose();
        }
    }
}