module game
{
    export const enum loginTp{
        normal,
        visitor,
    }
    export class LoginAccount extends UIFullFW
    {

        public skAccountLab:cui.EditableText;
        public skPwdLab:cui.EditableText;
        public skLogin:cui.ScaleButton;
        public skRegistered:cui.ScaleButton;
        public skVtrLogin:cui.ScaleButton;
        public skLookPwd:cui.ScaleButton;
        public skForgotPwd:cui.ScaleButton;
        public skKeFu:cui.ScaleButton;

        public skAniLogin:game.UIDBAni;
        public skImgLogin:cui.Image;
        //public delegate:LoginScene;
        private _isLockPwd:boolean;
        constructor()
        {
            super();
            let self = this;
            self.skinName = "loginViewSkin";
            URLUtil.hideLoad();
        }

        public childrenCreated():void
        {
            super.childrenCreated();
            let self = this;
            self.skLogin.setTarget(self.tapLogin, self);
            self.skRegistered.setTarget(self.registeredView, self);
            self.skVtrLogin.setTarget(self.tapLogin, self);
            self.skPwdLab.inputType = egret.TextFieldInputType.PASSWORD;
            self.skPwdLab.displayAsPassword = self._isLockPwd = true;
            self.skKeFu.setTarget(HttpUtil.gotoKeFu, HttpUtil);
            self.skLookPwd.setTarget(self.lookPwd,self);
            self.skForgotPwd.setTarget(self.openForgotView,self);
            self.skAccountLab.addEventListener(egret.Event.CHANGE,self.OnAccount,self);
            self.skAccountLab.addEventListener(egret.Event.FOCUS_IN,self.onFocus1,self);
            self.skPwdLab.addEventListener(egret.Event.CHANGE,self.OnPwd,self);
            self.skPwdLab.addEventListener(egret.Event.FOCUS_IN,self.onFocus2,self);
            self.skAccountLab.prompt = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.Enter_AccountNum);
            self.skPwdLab.prompt = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.Enter_pwd);
            let accMo = dataMgr.accMo;
            accMo.addListener( AccountMo_EVT.login_svr_fin, function(){ 
                gameMgr.gotoScene(SceneType.LodingScene);
            },self,true);

            accMo.addListener( AccountMo_EVT.check_svr_info, function(){ 
                if(accMo.haveLoginNotice()){
                    let view = new NoticeView(noticeState.login);
                    view.open(self);
                }     
            },self,true);
            dataMgr.accMo.CheckNoticeInfo();
            let loginNm = CONF.res[CONF.apkRes.login];
            self.skAniLogin.dbNm = self.skImgLogin.source = loginNm || "nover_login_bg";
        }
        private onFocus1(e:egret.Event):void{
            this.skAccountLab.text = "";
        }
        private onFocus2(e:egret.Event):void{
            this.skPwdLab.text = "";
        }
        private OnAccount(e:egret.Event):void{
            this.skAccountLab.text = e.target.text;
        }
        private OnPwd(e:egret.Event):void{
            this.skPwdLab.text = e.target.text;
        }
        // private keFuBtn():void{

        // }
        private registeredView():void{
            TRain.soundMgr.playSFX(confConsts.SoundTp.click);
            let self = this;
            let view = new Registered();
            view.open(self);
        }
        private lookPwd():void{
            let self = this;
            let tmpPwd = self._isLockPwd;
            self.skPwdLab.displayAsPassword  = !tmpPwd;
            self.skPwdLab.inputType = !tmpPwd ?  egret.TextFieldInputType.PASSWORD : egret.TextFieldInputType.TEXT ;
            self.skLookPwd.icon = !self._isLockPwd ? "login@txt_lookPwdD" : "login@txt_lookPwdb";
            self._isLockPwd =!tmpPwd ;
        }
        private openForgotView():void{
            let self = this;
            let view = new ForgotPwd();
            view.open(self);
        }
        private tapLogin(item:cui.ScaleButton):void
        {
            TRain.soundMgr.playSFX(confConsts.SoundTp.click);
            let self = this;
            let tag = item.tag ;
            let name:string ;
            let pwd:string ;
            let accMo = dataMgr.accMo;
            if(tag == loginTp.visitor){
                name = null;
                pwd = null;
                if(CONF.isNative && CONF.deviceId.length == 0){
                    MsgBox.showErr(langConsts.errCode.device_invalid_error);
                    return;
                }
                accMo.verlogin(name,pwd);
            }else{
                name = self.skAccountLab.text;
                pwd = self.skPwdLab.text;
                if (name != null && (name.length != 11 || name.match(/\D/g))) {
                    MsgBox.showPrompt(langConsts.errCode.e_rmt_gold_accountnum_or_pwd_error);
                    return;
                }
                accMo.login(name,pwd);
            }
            // if(!pwd || pwd.length<=0){
            //     MsgBox.showBox( LangGrp.loginUI, langConsts.loginUI.inputname );//请输入角色密码
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
            
            
        }
        protected onDispose(){
            let self = this;
            dataMgr.accMo.rmvAllListener( self );
            super.onDispose();
        }
    }
}
