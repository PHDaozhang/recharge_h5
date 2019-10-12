module game {
    export class SaveMoneyDialog extends UIPopup {
        public skBtnClose: cui.ScaleButton;
        public skBtnSave: cui.ScaleButton;
        public skBtnCharge: cui.ScaleButton;
        public skLabCount: cui.Label;
        public skLabCondition: cui.Label;

        public constructor() {
            super();
            let self = this;
            self.skinName = "SaveMoneySkin";
            self.hCenter = self.vCenter = 0;
        }

        public childrenCreated(): void {
            super.childrenCreated();
            let self = this;
            self.skBtnClose.setTarget(function () {
                self.close();
            }, self);
            //充值
            self.skBtnCharge.setTarget(function () {
                self.close();
                gameScene.showHallUI(UITag.shop);
            }, self);
            //领取救济金
            self.skBtnSave.setTarget(function () {
                self.getSaveMoney();
            }, self);
            self.updateInfo();
            // dataMgr.accMo.addListener("getSaveMoney", function () {
            //     self.updateInfo();
            // }, self);
        }

        private updateInfo(): void {
            //今日剩余次数
            let self = this;
            let count = confConsts.ConstTp.almsMaxCount - dataMgr.accMo.getData().collected;
            self.skLabCount.text = StringUtil.printf(TRain.langMgr.getTxt("mainLang", langConsts.mainLang.AlmsRestCount), count);
            //领取金币限制条件
            self.skLabCondition.text = StringUtil.printf(TRain.langMgr.getTxt("mainLang", langConsts.mainLang.AlmsGetCondition),
                DataFormat.convertGold(confConsts.ConstTp.almsLimit).toFixed(2));
        }

        //领取救济金
        private getSaveMoney(): void {
            let self = this;
            dataMgr.generalMo.sendBenefits();
            self.close();
        }

        // public onDispose(): void {
        //     super.onDispose();
        //     dataMgr.accMo.rmvListener("getSaveMoney", self);
        // }
    }
}