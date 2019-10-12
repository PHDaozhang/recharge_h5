module game {
    export class Registered extends UIPopup {
        public skPhone: cui.EditableText;
        public skCode: cui.EditableText;
        public skPwd: cui.EditableText;
        public skAgainPwd: cui.EditableText;
        public skGetCode: cui.ScaleButton;
        public skSure: cui.ScaleButton;
        public skchoose: cui.ScaleButton;
        public skClose: cui.SimpleButton;
        public skLCode: cui.Label;
        public skLPhone: cui.Label;
        public skLPwd: cui.Label;
        public skLAgainPwd: cui.Label;
        public skLAgreeConsent: cui.Label;
        private _isAgreed: boolean;
        private _isBind: boolean;
        constructor() {
            super();
            let self = this;
            self.skinName = "registeredSkin";
            self._isAgreed = true;
            //self.pri = PopupPriority.normal;
            //self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
        }
        public childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skGetCode.setTarget(self.getCode, self);
            self.skSure.setTarget(self.enSure, self);
            self.skPhone.addEventListener(egret.Event.CHANGE, self.OnChangePhone, self);
            self.skCode.addEventListener(egret.Event.CHANGE, self.OnChangeCode, self);
            self.skPwd.addEventListener(egret.Event.CHANGE, self.OnChangePwd, self);
            self.skAgainPwd.addEventListener(egret.Event.CHANGE, self.OnChangeAgainPwd, self);
            self.skchoose.setTarget(self.chooseBtn, self);
            self.skClose.setTarget(self.close, self);
            self.skPhone.prompt = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.Register_PhoneNum);
            self.skCode.prompt = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.Register_GetCode);
            self.skPwd.prompt = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.EnterChar6To20);
            self.skPwd.inputType = egret.TextFieldInputType.PASSWORD;
            self.skPwd.displayAsPassword = true;
            self.skAgainPwd.prompt = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.EnterChar6To20);
            self.skAgainPwd.inputType = egret.TextFieldInputType.PASSWORD;
            self.skAgainPwd.displayAsPassword = true;
            self.skLCode.text = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.VerCode);
            self.skLPhone.text = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.PhoneNum);
            self.skLPwd.text = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.InputPwd);
            self.skLAgainPwd.text = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.ConfirmPwd);
            self.skLAgreeConsent.text = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.AgreeConsent);
            let accMo = dataMgr.accMo;
            accMo.addListener(AccountMo_EVT.reg_phone_fin, function () {
                self.close();
                let tip = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.Login_RegisterSuccess);
                TipsMgr.showPrompt(tip);
				accMo.isNew = true;
            }, self);
            accMo.addListener(AccountMo_EVT.bin_phone_fin, function () {
                let view = new SaveMoneyDialog();
                gameScene.openPopup(view);
                self.close();
            }, self);
        }
        public setData(value: boolean) {
            this._isBind = value;
        }
        private chooseBtn(): void {
            let self = this;
            self._isAgreed = !self._isAgreed;
            self.skchoose.icon = self._isAgreed ? "login@registeredB" : "login@registeredD";
        }
        private OnChangePhone(e: egret.Event): void {
            this.skPhone.text = e.target.text;
        }
        private OnChangeCode(e: egret.Event): void {
            this.skCode.text = e.target.text;
        }
        private OnChangePwd(e: egret.Event): void {
            this.skPwd.text = e.target.text;
        }
        private OnChangeAgainPwd(e: egret.Event): void {
            this.skAgainPwd.text = e.target.text;
        }
        public getCode(): void {
            let self = this;
            let phone = self.skPhone.text;
            if (phone == null || phone == "" || phone.length != 11 || phone.match(/\D/g)) {
                MsgBox.showPrompt(langConsts.errCode.e_rmt_input_correct_num);
                return;
            }else{
               dataMgr.accMo.checkCode(phone);
            }
        }
        public enSure(): void {
            let self = this;
            //挨个验证前面四个是否满足条件且同意游戏协议
            let phone = self.skPhone.text;
            let code = self.skCode.text;
            let pwd = self.skPwd.text;
            let againPwd = self.skAgainPwd.text;
            if (phone == null || phone == "" || phone.length != 11 || phone.match(/\D/g)) {
                MsgBox.showPrompt(langConsts.errCode.e_rmt_input_correct_num);
                return;
            }
            if (code == null || code == "" || code.length != 6 || code.match(/\D/g)) {
                MsgBox.showPrompt(langConsts.errCode.e_rmt_input_correct_code);
                return;
            }
            if (pwd.length < 6 || againPwd.length < 6) {
                MsgBox.showPrompt(langConsts.errCode.e_rmt_pwd_not_less_6);//密码不能少于6个字符。
                return;
            }
            if (pwd != againPwd) {
                MsgBox.showPrompt(langConsts.errCode.e_rmt_pwd_not_same);
                return;
            }
            if (!self._isAgreed) {
                MsgBox.showPrompt(langConsts.errCode.e_rmt_agree_consent);
                return;
            }
            let accMo = dataMgr.accMo;
            if (self._isBind) {
                let accName = GameUtil.getLocal(GameUtil.LocalKey.ACC_NAME);
                accMo.bind(phone, pwd, accName, code);
            } else {
                accMo.registered(phone, pwd, code);
            }
        }
    }
}