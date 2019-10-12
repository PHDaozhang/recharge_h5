module game{
    export class SettingView extends game.UIPopup{
        public skClose:cui.ScaleButton;
        public skMusic:cui.ScaleButton;
        public skSound:cui.ScaleButton;
        public skSwitch:cui.ScaleButton;
        public skBinding:cui.ScaleButton;
        public skHead:cui.Image;
        public skHeadFrame:cui.Image;
        public skName:cui.Label;
        public skId:cui.Label;
        public skPhoneNum:cui.Label;

        constructor(){
            super();
            let self = this;
            self.skinName = "SettingSkin";
            self.vCenter = 0;
            self.hCenter = 0;
        }
        public childrenCreated():void{
            let self = this;
            self.skClose.setTarget(function(){
                self.close();
            },self);
            let soundMgr = TRain.soundMgr;
            self.skMusic.setTarget(function(){
                let tempMcState = soundMgr.musicState;
                GameUtil.setLocal( GameUtil.LocalKey.MUSIC_STATUS, !tempMcState );
                soundMgr.musicState = !tempMcState;
                self.updateMcAndSd();
            },self);
            self.skSound.setTarget(function(){
                let tempSdState  = soundMgr.sfxState;
                GameUtil.setLocal( GameUtil.LocalKey.SFX_STATUS, !tempSdState );
                soundMgr.sfxState = !tempSdState;
                self.updateMcAndSd();
            },self);
            let accModel = dataMgr.accMo;
			let accData = accModel.getData();
            self.updateMcAndSd();
            self.updateHead();
            self.skBinding.icon = HallImg.hall + (accData.isFormal ? "txt_binded":"txt_phoneBinding");
            self.skBinding.setTarget(function(){
                if(accData.isFormal)return;
                let view = new Registered();
                view.setData(true);
                gameScene.openPopup(view);
                self.close();
            },self);
            self.skSwitch.setTarget(function(){
                MsgBox.showBoxCB(LangGrp.mainLang,langConsts.mainLang.LoginOutConfirm,function(tag){
                    if(tag == 1){
                        //登出
                        location.reload(); 
                    }
                },self);
            },self);
        }
        private updateHead(): void {
			let self = this;
			let accModel = dataMgr.accMo;
			let accData = accModel.getData();
			//获取当前头像
			self.skHead.source = DataFormat.getHeadIcon(accData.icon_custom);
			self.skHeadFrame.source = confConsts.ComResTp.oldFrame + accData.viplvl;
			//当前玩家名字
			self.skName.text = accData.nickname;
			//当前玩家id
			self.skId.text = "ID：" + accData.aid;
		}
        public updateMcAndSd():void{
            let self = this;
            let soundMgr = TRain.soundMgr;
            self.skMusic.icon = HallImg.hall +  ( soundMgr.musicState ? "open": "close");
            self.skSound.icon = HallImg.hall +  ( soundMgr.sfxState ? "open": "close");
            if(soundMgr.musicState){
                TRain.soundMgr.playMusic(confConsts.SoundTp.BG309);
            }else{
                soundMgr.stopMusic();
            }
            if(!soundMgr.sfxState)soundMgr.stopAllSFX();
        }
    } 
}