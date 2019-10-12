module game{
    export class LimitReward2 extends UIPopup{
        public skTime:cui.Label;
        public skClose:cui.ScaleButton;
        public skList:cui.DataGroup;

        private _itemPro:cui.ArrayCollection;
        private _tagTm:number;
        constructor(){
            super();
            let self = this;
            self.skinName = "RewardFrameSkin";
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
            
            self.skClose.setTarget(self.close,self);
            self.updateView();
            dataMgr.generalMo.addListener(General_EVT.UpdateTaskList,self.updateView,self);
            self._tagTm = TRain.core.addFrameDo(self.updateTm,self,false,1000);
            self.updateTm();
        }
        private updateTm(){
            let self = this;
            let date = TimeUtil.formatTm();
            let tm:string = StringUtil.printf(TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.TaskRemainedTimes),date.day,date.hour,date.min,date.sec);
            self.skTime.textFlow = cui.htmlParser.parser(tm) //温馨提示：xxxxx
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
            TRain.core.rmvFrameDoById(this._tagTm);
            super.onDispose();
        }
    }
}