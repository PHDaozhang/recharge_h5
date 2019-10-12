module game{
    export class ModName extends UIPopup{
        public skBack:cui.ScaleButton;
        public skName:cui.EditableText;
        public skFirstLab:cui.Image;
        public skSecondGp:cui.Group;
        public skGold:cui.Label;
        public skSure:cui.ScaleButton;
        public skCancel:cui.ScaleButton;

        constructor(){
            super();
            let self = this;
            self.skinName = "modNameSkin";
            self.vCenter = 0;
            self.hCenter = 0;
            self.hideBg = false;
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skBack.setTarget(function(){
                self.close();
            },self);
            self.skCancel.setTarget(function(){
                self.close();
            },self);
            let accMo = dataMgr.accMo;
            let count:number = accMo.getVal("updateNicknameCount");
            let nickname = accMo.getVal("nickname");
            //self.skName.prompt = accData.nickname;
            self.skName.addEventListener(egret.Event.CHANGE,self.OnAccount,self);
            self.skName.addEventListener(egret.Event.FOCUS_IN,self.onFocus1,self);
            self.skFirstLab.visible = count <= 0;
            self.skSecondGp.visible = count > 0;
            self.skGold.text = DataFormat.convertYuanString(confConsts.ConstTp.modifyNicknameCost, true);
            self.skName.prompt = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.ChangeNameTip);
            self.skSure.setTarget(function(){
                 let name = self.skName.text;
                 if(name.length == 0){
                    let view = new PersonCenter();
				    gameScene.openPopup(view);
                    self.close();
                    let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.NameNotNull); 
                    TipsMgr.showPrompt(tips,game.UIColor.white);
                 }else if(name == nickname){
                    let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.TwoNameSame); //新名字与旧名字相同
                    TipsMgr.showPrompt(tips,game.UIColor.white);
                 }else{
                     let count = accMo.getData().updateNicknameCount;
                     let curGold = accMo.getData().gold;
                     if(count == 0){
                         dataMgr.accMo.changeNickName(name);
                     }else if(curGold < confConsts.ConstTp.modifyNicknameCost){
                        let tip = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.GoldIsNotEnough);
                        TipsMgr.showPrompt(tip,UIColor.white); 
                     }else{ 
                        dataMgr.accMo.changeNickName(name); 
                     }          
                 }
                 self.close();
            },self);
        }

        private onFocus1(e:egret.Event):void{
            this.skName.text = "";
        }

         private OnAccount(e:egret.Event):void{
             let self = this;
             let inputText = e.target.text;
             let str = game.DataFormat.CheckStringLength(inputText);
             let len = str[0];
             let chaLen = str[1] > 6 ? 6: str[1];
             if(len > 12){
                let firstIdx:number = 12 - chaLen;
                inputText = inputText.substring(0,firstIdx);
             }
             self.skName.text = inputText;
        }


        // protected onDispose(){
        //     super.onDispose();
        // }
    }
}