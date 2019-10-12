module game{
    export class LimitReward extends UIPopup{
        public skTips:cui.Label;
        public skClose:cui.SimpleButton;
        public skList:cui.DataGroup;

        private _itemPro:cui.ArrayCollection;
        constructor(){
            super();
            let self = this;
            self.skinName = "RewardTaskSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            let list = self.skList;
			list.itemRender = LimitRewardItem;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            self.skTips.text = TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.limitRewardTips);
            self.skClose.setTarget(function(){
                self.close();
                dataMgr.generalMo.postEvent(General_EVT_POP.Close);
            } ,self);
            self.updateView();
            dataMgr.generalMo.addListener(General_EVT.UpdateTaskList,self.updateView,self);
        }
        public updateView():void{
            let self = this;
             //获取任务列表
             let generalMo =  dataMgr.generalMo;
             let list = generalMo.getLimitList();
             self._itemPro.source = list;
        }
        protected onDispose(){
            dataMgr.generalMo.rmvListener(General_EVT.UpdateTaskList,this);
            super.onDispose();
        }
    }
    export class LimitRewardItem extends cui.DataItem{
        public skOverImg:cui.Image;
        public skGold:cui.BitmapLabel;
        public skName:cui.Label;
        public skContent:cui.Label;
        public skGo:cui.ScaleButton;
        public skBar:cui.ProgressBar;
        public skBarLab:cui.Label;
        public skBg:cui.Image;
        public skGoldBg:cui.Image;

        private _isGoLink:boolean; //是否是前往
        constructor(){
            super();
            let self = this;
            self.skinName = "RewardItemSkin";
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skGo.setTarget(self.BtnClick,self);
            self.skBar.openAni = false;
        }
        private BtnClick(){
            let self = this;
            let data:ITaskItem = <ITaskItem>self.data;
            if(self._isGoLink){
                //前往
                let id:confConsts.GameTp = data.cfg.gameID[0];
                gameScene.startGame(id);
            }else{
                //领取
                dataMgr.generalMo.sendGetQuestReward(data.questid);
            }
        }
        protected dataChanged(){
            super.dataChanged();
            let self = this;
            let data:ITaskItem = <ITaskItem>self.data;
            let isReceived = data.received;
            self.skOverImg.visible = isReceived;
            //获取配置数量
            let questConf = data.cfg;
            let curCount = questConf.type !=1 ? data.count/100 : data.count;
            let totalCount = questConf.type !=1 ? questConf.completeCount/100 : questConf.completeCount;
            let isGoLink = self._isGoLink = curCount < totalCount;
            self.skBar.visible = self.skBarLab.visible = !isReceived;
            self.skGo.visible = dataMgr.accMo.gameId == 0 && !isReceived;
            self.skGo.icon =  isGoLink ? "reward@txt_go" : "reward@txt_receive";
            if(isReceived){
                self.skGold.filterNm = self.skBg.filterNm = self.skGoldBg.filterNm = self.skName.filterNm = self.skContent.filterNm = self.skGold.filterNm = "grayCF";
            } 
            self.skGold.text = "jl" + (questConf.awardItemCount /100) + "y";
            self.skName.text = questConf.name;
            self.skContent.text = questConf.desc;
            self.skBarLab.text = curCount + "/" + totalCount;
            self.skBar.setProgressValue(curCount/totalCount,1000);
        }
    }
}