module game{
    export interface IShowServiceData extends cui.IItemData{
        handle:LookRuleHander,
        tag:number,
        titleLab:string,
        content:string,
        isNotOpen:boolean, //true 不展开 false 展开
    }
    export interface LookRuleHander{
        click(item:ServiceItem),
    }
    export interface IShowComplaintsData extends cui.IItemData{
        time:number,
        info:string,
    }


    export class ServiceView extends game.UIPopup{
        public skConsultation:cui.ScaleButton;
        public skSuggestion:cui.ScaleButton;
        public skClose:cui.ScaleButton;   
        public skList:cui.DataGroup;
        
        private _itemPro:cui.ArrayCollection;
        private _showArr:Array<IShowServiceData>;

        constructor(){
            super();
            let self = this;
            self.skinName = "CustomerServiceSkin"; 
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0; 
        }
        public childrenCreated():void{
            super.childrenCreated();
            let self = this;
            self.skConsultation.setTarget(function(){
            },self);

            self.skSuggestion.setTarget(function(){
                gameScene.openPopup(new Complaints());
                self.close();
            },self);
            self.skClose.setTarget(self.close,self);
            self.skList.itemRender = ServiceItem;
            let dataPro = self._itemPro = new cui.ArrayCollection();
            self.skList.dataProvider = dataPro;
            let generalMo = dataMgr.generalMo;
            generalMo.askFaq();
            generalMo.addListener(General_EVT.GetFaqResult,self.updateList,self);
            generalMo.addListener(General_EVT.GetFaqDetailResult,self.updateDetailInfo,self);
        }
        //获取规则的名字和内容
        public updateList(list:NET_CONF.msg_faq_def[]):void{
            let self = this;
            let showArr:Array<IShowServiceData> = [];
            for(let i = 0;i< list.length; i++){
                let faqDef = list[i];
                let showData:IShowServiceData = {
                    handle:self,
                    tag:faqDef.index,
                    titleLab:faqDef.text,
                    content:"",
                    isNotOpen:true,
                };
                showArr.push(showData);
            }
            self._showArr = showArr;
            self._itemPro.source = showArr;
        }
        public click(item:ServiceItem):void{
            let self = this;
            let data:IShowServiceData = <IShowServiceData> item.data;
            let tag = data.tag;
            dataMgr.generalMo.askFaqDetail(tag);
            for(let i = 0 ;i<self._showArr.length;i++){
                let itemData = self._showArr[i];
                if(itemData.tag == tag){
                    itemData.isNotOpen = !data.isNotOpen;
                }
            }
        }
        public updateDetailInfo(data:NET_CONF.msg_faq_def):void{
            let self = this;
            for(let i = 0 ;i<self._showArr.length;i++){
                let itemData = self._showArr[i];
                if(itemData.tag == data.index){
                    itemData.content = data.text;
                }
            }      
            self._itemPro.source = self._showArr;
        }
        protected onDispose(){
            dataMgr.generalMo.rmvListener(General_EVT.GetFaqResult,self);
            dataMgr.generalMo.rmvListener(General_EVT.GetFaqDetailResult,self);
            super.onDispose();
        }
    }
    export class ServiceItem extends cui.DataItem{
        public skGroup:cui.Group;
        public skTitleLab:cui.Label;
        public skBtn:cui.ScaleButton;
        public skImg:cui.Image;
        constructor(){
            super();
            let self = this;
            self.skinName = "serviceItemSKin"; 
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            let data:IShowServiceData = <IShowServiceData> self.data;
            self.skBtn.setTarget(function(){
                data.handle.click(self);
            },self);
        }
        protected dataChanged(){
            super.dataChanged();
            let self = this;
            let data:IShowServiceData = <IShowServiceData> self.data;
            self.skBtn.icon = data.isNotOpen ? "kefu@btn_more" : "kefu@btn_down";
            self.skTitleLab.text = data.titleLab;
            let contentLab = self.skGroup.getChildAt(1) as cui.Label;
            contentLab.text = data.content;
            self.skGroup.visible = !data.isNotOpen; 
            self.height = data.isNotOpen ? self.skImg.height : self.skGroup.height;
        }
    }

    export class ComplaintsItem extends cui.DataItem{
        public skReturn:cui.Label;
        public skTime:cui.Label;
        public skAdvice:cui.Label;
        
        constructor(){
            super();
            let self = this;
            self.skinName = "ComplaintItemSkin"; 
        }

        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            let data:IShowComplaintsData = <IShowComplaintsData>self.data;
        }
         protected dataChanged(){
            super.dataChanged();
            let self = this;
            let data:IShowComplaintsData = <IShowComplaintsData>self.data;
            let date = new Date( data.time* 1000);
            self.skTime.text = date.toLocaleString();
            self.skReturn.text = data.info;
            self.skAdvice.text = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.CustomerFeedback);
         }

    }


    export class Complaints extends game.UIPopup{ 
        public skClose:cui.ScaleButton;
        public skMenuGrp:cui.MenuGroup;
        public skAdvice:cui.EditableText;
        public skSubmission:cui.ScaleButton; 
       // public skReturn:cui.Label;
        public skHandImage:cui.Image;
        public skList:cui.DataGroup;
        public skScroller:cui.Scroller;

        private _itemPro:cui.ArrayCollection;
        private _listArr:Array<IShowComplaintsData>;

        constructor(){
            super();
            let self = this;
            self.skinName = "ComplaintsSkin"; 
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
        }
     public childrenCreated():void{
        super.childrenCreated();
        let self = this;
        self.skClose.setTarget(function(){
            self.close();
        },self); 
        self.skMenuGrp.setTarget(self.menuClick,self);
        self.skMenuGrp.selectTag = 0;
        self.skAdvice.prompt = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.AdviseTip);
        self.skSubmission.setTarget(function(){
            if(self.skAdvice.text.length == 0){
                let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.SendContentNotNull);
                TipsMgr.showPrompt(tips,game.UIColor.white);
            }else{
                dataMgr.generalMo.sendAdviceReq(self.skAdvice.text);
                dataMgr.generalMo.adviceListReq();
                let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.SendSuc);
                TipsMgr.showPrompt(tips,game.UIColor.white);
                self.skAdvice.text = "";
            }
        },self);
        self.skList.itemRender = ComplaintsItem;
        let dataPro = self._itemPro = new cui.ArrayCollection();
        self.skList.dataProvider = dataPro;
        let generalMo = dataMgr.generalMo;
        generalMo.addListener(General_EVT.GetadviceListResult,self.updateView,self);
        //let generalMo = dataMgr.generalMo;
     }
     public menuClick(item:cui.MenuItemImage):void{
         let self = this;
         let tag = item.tag;
         if(tag == 0){
             //self.skList.visible = false;
             self.skSubmission.visible = true;
             self.skHandImage.visible = true;
             self.skAdvice.visible = true;
             self.skScroller.visible = false;
         }
         else if(tag == 1){
             dataMgr.generalMo.adviceListReq();
             self.skSubmission.visible = false;
             self.skHandImage.visible = false;
             self.skAdvice.visible = false;
             self.skScroller.visible = true;
         }
     }

    public updateView(list:NET_CONF.msg_suggest[]):void{
        let self = this; 
        let complaintsArr:Array<IShowComplaintsData> = [];
        for(let i = 0; i < list.length; i++){
            let suggest = list[i];
            let showData:IShowComplaintsData = {
                time:suggest.time,
                info:suggest.text,
             };
            complaintsArr.push(showData);
        }
        self._listArr = complaintsArr;
        self._itemPro.source = complaintsArr;
    }

      protected onDispose(){
             dataMgr.generalMo.rmvListener(General_EVT.GetadviceListResult,self);
             super.onDispose();
        }
    }
}