module game{
    export class ForgotPwd extends UIPopup{
        public skPhone:cui.EditableText;
        public skCode:cui.EditableText;
        public skPwd:cui.EditableText;
        public skAgainPwd:cui.EditableText;
        public skGetCode:cui.ScaleButton;
        public skSure:cui.ScaleButton;
        public skClose:cui.SimpleButton;
        public skLCode:cui.Label;
        public skLPhone:cui.Label;
        public skLPwd:cui.Label;
        public skLAgainPwd:cui.Label;


        constructor(){
            super();
            let self = this;
            self.skinName = "forgotPwdSkin";
            //self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skGetCode.setTarget(self.getCode,self);
            self.skSure.setTarget(self.enSure,self);
            self.skPhone.addEventListener(egret.Event.CHANGE,self.OnChangePhone,self);
            self.skCode.addEventListener(egret.Event.CHANGE,self.OnChangeCode,self);
            self.skPwd.addEventListener(egret.Event.CHANGE,self.OnChangePwd,self);
            self.skAgainPwd.addEventListener(egret.Event.CHANGE,self.OnChangeAgainPwd,self);
            self.skClose.setTarget(self.close,self);
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
        }
        private OnChangePhone(e:egret.Event):void{
            this.skPhone.text = e.target.text;
        }
        private OnChangeCode(e:egret.Event):void{
            this.skCode.text = e.target.text;
        }
        private OnChangePwd(e:egret.Event):void{
            this.skPwd.text = e.target.text;
        }
        private OnChangeAgainPwd(e:egret.Event):void{
            this.skAgainPwd.text = e.target.text;
        }
        public getCode():void{
            let self = this;
            //首先判断手机号位数是否正确再发送
            let phone = self.skPhone.text;
            if (phone == null || phone == "" || phone.length != 11 || phone.match(/\D/g)) {
                MsgBox.showPrompt(langConsts.errCode.e_rmt_input_correct_num);
                return;
            }else{
               dataMgr.accMo.checkCode(phone);
            }
        }
        public enSure():void{
            let self = this;
            //挨个验证前面四个是否满足条件
        }
    }
}