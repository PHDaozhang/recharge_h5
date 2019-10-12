module game{
    export class PersonCenter extends UIPopup{
        public skBack:cui.ScaleButton;
        public skIconImg:cui.Image;
        public skIconFrame:cui.Image;
        public skName:cui.Label;
        public skMod:cui.ScaleButton;
        public skId:cui.Label;
        public skAddresss:cui.Label;
        public skList:cui.DataGroup;
        public skCopyId:cui.ScaleButton;
        public skMenuBtn:cui.MenuGroup;
        public skLeftbtn:cui.SimpleButton;
        public skRightbtn:cui.SimpleButton;
        public skAwardBtn:cui.ScaleButton;
        public skReceive1:cui.ScaleButton;
        public skReceive2:cui.ScaleButton;
        public skLeftlab:cui.BitmapLabel;
        public skRightlab:cui.BitmapLabel;
        public skGoldLab:cui.BitmapLabel;
        public skVipGroup:cui.Group;
        public skHeadScr:cui.Scroller;
        public skBarLabel:cui.Label;
        public skBar:cui.ProgressBar;

        private _curIcon:string;
        private _iconArr:Array<string>;
        private _dataArr:any[];
        private _dataPro:cui.ArrayCollection;
        //private _lastData:any;
        private _tagTm:number;
        private _isHaveTag:boolean;
        constructor(){
            super();
            let self = this;
            self.vCenter = 0;
            self.hCenter = 0;
            self.bgClose = true;
            self.hideBg = false;
            self.skinName = "pCenterSkin";
            self._iconArr = ["nan_s1","nv_s1","nan_1","nan_2","nan_3","nan_4","nan_5",
                            "nv_1","nv_2","nv_3","nv_4","nv_5"];
            self._dataArr = [];
            self._isHaveTag = false;
        }

        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skBack.setTarget(function(){
                self.close();
            },self);

            dataMgr.accMo.addPropListener( "icon_custom", self.updateHead, self );
            let accData = dataMgr.accMo.getData();
            // if(accData.nickname.length > 12){
            //     self.skName.text = accData.nickname.substr(0,12) + "...";
            // }else{
            //     self.skName.text = accData.nickname;
            // }
            self.skName.text = DataFormat.formatName(accData.nickname, 12, 12);
            self.skId.text = "ID：" +  accData.aid;
            self.skAddresss.text = accData.ipinfo;
            self.skIconFrame.source = confConsts.ComResTp.oldFrame + accData.viplvl;
            let curIcon = self._curIcon = accData.icon_custom;
            self.skIconImg.source =  DataFormat.getHeadIcon(curIcon);
            self.skMenuBtn.setTarget(self.menuClick, self);
            self.skMenuBtn.selectTag = 1;
            self.skMod.setTarget(function(){
                gameScene.openPopup(new ModName());
                self.close();
            },self);

            self.skCopyId.setTarget(function(){
                let tip = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.CopySuccess);
                TipsMgr.showPrompt(tip,UIColor.orange);
                URLUtil.copyText(String(accData.aid));
            },self);
            let list = self.skList;
            list.itemRender = HeadTile;
            list.itemSkinName = "pcItemSkin";
            list.dataProvider = self._dataPro = new cui.ArrayCollection();
            list.addEventListener( cui.UI_EVENT.ITEM_TAP, function(e:egret.Event){
                let icon = e.data.ud;
                let curMk = e.data.data.mk;
                if(!icon || icon == self._curIcon){
                    let tips = TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.NeedNewHead);
                    TipsMgr.showPrompt(tips);
                    return;
                } 
                if(curMk) return;
                dataMgr.accMo.changeHead( icon );
           }, self);
           let generalMo = dataMgr.generalMo;
           generalMo.addListener(General_EVT.GetVipInfoResult,self.updataVipInfo,self);
        //    self.skReceive1.setTarget(function(){
        //       let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.ComingSoon);
        //       TipsMgr.showPrompt(tips,game.UIColor.white);
        //    },self);
        //     self.skReceive2.setTarget(function(){
        //        let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.ComingSoon);
        //       TipsMgr.showPrompt(tips,game.UIColor.white);
        //    },self);
        //     self.skAwardBtn.setTarget(function(){
        //        let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.ComingSoon);
        //       TipsMgr.showPrompt(tips,game.UIColor.white);
        //    },self);
            // self.initIcons();
        }

        // public getMainMutiTxt(index: langConsts.mainLang): string {
		// 	return TRain.langMgr.getTxt(LangGrp.mainLang, index);
		// }
        public updateHead():void{
            let self = this;
            let accModel = dataMgr.accMo;
            let accData = accModel.getData();
            let icon  = self._curIcon = accData.icon_custom;
			//获取当前头像
            self.skIconImg.source = DataFormat.getHeadIcon(icon);
            for(let i = 0 ;i<self._dataArr.length;i++){
                let data = self._dataArr[i];
                data.sel = data.ud == icon;
            }
            self._dataPro.source = self._dataArr;
        }
        private initIcons(){
            let self = this;
            let iconArr = self._dataArr = [];
            let iconStrs = self._iconArr;
            let icon = dataMgr.accMo.getData().icon_custom; 
            for(let i = 0, len=iconStrs.length; i < len; i++){
                let iconStr = iconStrs[i];
                let data:any = {sel:false, mk:false,lab:""};
                data.icon = HeadImg.head + iconStr;
                data.tag = i;
                if(self.isLock( iconStr)){
                    data.mk = true;
                    data.lab = TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.shareOpenLock);
                }else{
                    if(i == 0 || i == 1){
                        let time1 = game.dataMgr.accMo.getData().limit_time_photo;
                        let time2 = TimeUtil.getSvrSec();
                        let countTime = (time1 - time2) * 1000; 
                        let dataTm = TimeUtil.getHourMinSec(countTime );
                        data.lab = dataTm.hour + ":" + dataTm.min + ":" + dataTm.sec;
                    }
                    if(!self._isHaveTag){
                        self._tagTm = TRain.core.addFrameDo(self.showIcontTxt, self, false, 1000);
                        self._isHaveTag = true;
                    }
                }
                data.ud = "head_" + iconStr + ".png";

                if(icon == data.ud)data.sel = true;
                iconArr.push( data );
            }
            self._dataPro.source = iconArr;
        }

        private showIcontTxt():void{
            let self = this;
            let dataArr = self._dataArr;
            for(let i = 0,len = dataArr.length;i<len;i++){
                let data = dataArr[i];
                if(i == 0 || i == 1){
                    let time1 = game.dataMgr.accMo.getData().limit_time_photo;
                    let time2 = TimeUtil.getSvrSec();
                    let countTime = (time1 - time2) * 1000; 
                    let dataTm = TimeUtil.getHourMinSec(countTime );
                    data.lab = dataTm.hour + ":" + dataTm.min + ":" + dataTm.sec;
                    if(countTime <= 0){
                        data.mk = true;
                        data.lab = TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.shareOpenLock);
                        TRain.core.rmvFrameDoById(self._tagTm);
                    }
                }
                self._dataPro.itemUpdated(data);
            }
            
        }

        private isLock( iconStr:string ):boolean{
            let accModel = dataMgr.accMo;
            let accData = accModel.getData();
            let limitTime = accData.limit_time_photo;
            //拿到当前时间戳 和 服务器时间戳去进行比较 
            let tm:number = TimeUtil.getSvrSec();
            if(iconStr == "nan_s1" || iconStr == "nv_s1"){
                return tm > limitTime;
            }else{
                return false;
            }
        }

        public menuClick(item:cui.MenuItemImage): void{
            let self = this;
            let tag = item.tag;
            if(tag == 1){
                self.skVipGroup.visible = true;
                self.skHeadScr.visible = false;
                dataMgr.generalMo.askVipInfo();
            }else if(tag == 2){
                self.skVipGroup.visible = false;
                self.skHeadScr.visible = true;
                self.initIcons();
            }
        }

        public updataVipInfo(vipexp:number, viplv:number){
            let self = this;
            self.skLeftlab.text = viplv.toString();
            self.skRightlab.text = (viplv + 1).toString();
            let vipAllExp:number = 0;
            let faq = dataMgr.generalMo.getVipProfit();
            for(let i in faq){
                if(faq[i].VipLv == viplv){
                    vipAllExp = faq[i].VipExp;
                }
            }
            self.skBarLabel.text = Math.floor(vipexp / 100) + "/" + vipAllExp / 100;
            if(vipAllExp / vipexp >= 10 && vipexp != 0){
                self.skBar.setProgressValue(1 / 10, 1000);
            }else{
                self.skBar.setProgressValue(vipexp/vipAllExp, 1000);
            }
        }

        public onDispose(){
            super.onDispose();
             dataMgr.generalMo.rmvListener(General_EVT.GetVipInfoResult,self);
        }
        // private copyID()
        // {
        //     let self = this;
        //     var input = document.createElement("input");
        //     input.value = self.skId.text;
        //     document.body.appendChild(input);
        //     input.select();
        //     input.setSelectionRange(0, input.value.length),
        //     document.execCommand('Copy');
        //     document.body.removeChild(input);
        //     TipsMgr.showPrompt(self.getMainMutiTxt(langConsts.mainLang.CopySuccess));
        // }
    }
}