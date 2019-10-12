module game {
    export class BankerView extends game.UIPopup {
        private skDBAniGetBank: game.UIDBAni;      //上庄动画
        private skDBAniLeaveBank: game.UIDBAni;    //爆庄动画
        private skShangZ: cui.Group;
        private skSZHead: cui.Image;
        private skSZHeadBack: cui.Image;
        private skSZName: cui.Label;
        private _isleave: boolean = false;
        private _bankerInfo: any;
        constructor() {
            super();
            let self = this;
            this.skinName = "bankerSkin";
            self.hideBg = true;
            self.vCenter = 0;
            self.hCenter = 0;
        }
        public childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skShangZ.visible = false;
            self.skDBAniGetBank.dbNm = "shangzhuang";
            self.skDBAniGetBank.visible = false;

            self.skDBAniLeaveBank.dbNm = "baozhuang";
            self.skDBAniLeaveBank.visible = false;

            if (self._isleave) {
                self.playLeaveBanker();
            } else {
                self.playToBanker();
            }
        }

        public setIsLeave(isLeave) {
            this._isleave = isLeave;
        }
        public setBankerInfo(info) {
            this._bankerInfo = info;
        }

        public playToBanker() {
            let self = this;
            let bankerInfo = self._bankerInfo;
            self.skSZHead.source = game.DataFormat.getHeadIcon(bankerInfo.player_head_custom);
            self.skSZHeadBack.source = confConsts.ComResTp.oldFrame + bankerInfo.player_vip_lv;
            self.skSZName.text = bankerInfo.player_nickname;
            self.skDBAniGetBank.visible = true;
            self.skDBAniGetBank.gotoAndPlay("xh_shangzhuang_wenzitexiao", 0, 1);
            TRain.soundMgr.playSFX("zhuang_2");
            TRain.core.addDelayDo(function () {
                self.skShangZ.visible = true;
            }, self, 200);
            TRain.core.addDelayDo(function () {
                self.skShangZ.visible = false;
            }, self, 1920);
            TRain.core.addDelayDo(function () {
                self.skDBAniGetBank.stop();
                self.skDBAniGetBank.visible = false;
                self.close();
            }, self, 2300);
        }

        public updateBanker(bankerGold, income, limitGold) {
            let self = this;
            let bankGold = bankerGold + income;
            if (bankGold <= limitGold) {
                return true;
            } else {
                return false;
            }
        }

        public playLeaveBanker() {
            let self = this;
            self.skDBAniLeaveBank.visible = true;
            self.skShangZ.visible = false;
            self.skDBAniLeaveBank.gotoAndPlay("xh_baozhuang_wenzitexiao", 0, 1);
            TRain.soundMgr.playSFX("allkill");
            TRain.core.addDelayDo(function () {
                self.skDBAniLeaveBank.stop();
                self.skDBAniLeaveBank.visible = false;
                self.close();
            }, self, 1600);
        }

        protected onDispose() {
            let self = this;
            if (self.skDBAniLeaveBank) {
                self.skDBAniLeaveBank.dispose();
            }
            if (self.skDBAniGetBank) {
                self.skDBAniGetBank.dispose();
            }
            TRain.core.rmvAllDelayDo(self);
            super.onDispose();
        }
    }
}