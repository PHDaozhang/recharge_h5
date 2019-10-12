module game{
    export interface IShowMailItem extends cui.IItemData{
        handle:DeleteMailHandle,
        id:string,
        read:number,
        time:number,
        info:string,
    }
    export interface DeleteMailHandle{
        click(item:MailItem),
        readClick(item:MailItem),
    }
    export class MailView extends UIPopup{
        public skClose:cui.ScaleButton;
        public skNoHaveImg:cui.Image;
        public skScroller:cui.Scroller;
        public skList:cui.DataGroup;

        private _dataPro:cui.ArrayCollection;
        constructor(){
            super();
            let self = this;
            self.skinName = "mailSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            dataMgr.mailMo.askMessage();
        }
        public childrenCreated():void{
            super.childrenCreated();
            let self = this;
            let mailMo = dataMgr.mailMo;
            mailMo.addListener(Mail_EVT.list,self.updateView,self);
            mailMo.addListener(Mail_EVT.delete,self.updateView,self);
            mailMo.addListener(Mail_EVT.read,self.updateView,self);
            self.skClose.setTarget(self.close,self);
            self.skList.itemRender = MailItem;
            let dataPro = self._dataPro = new cui.ArrayCollection();
            self.skList.dataProvider = dataPro;
            self.updateView();
        }
        public updateView():void{
            let self = this;
            let mailMo = dataMgr.mailMo;
            let mailList = mailMo.list;
            self.skNoHaveImg.visible = false;
            self.skScroller.visible = true;
            let mailArr:Array<IShowMailItem> = [];
            if(mailList.length > 0){
                for(let i = 0;i<mailList.length;i++){
                    mailArr.push(self.formatMialItem(mailList[i]));
                }
                mailArr.sort(function(a:IShowMailItem,b:IShowMailItem){
                    if(a.read  ==  b.read)return b.time - a.time;
                    return a.read - b.read;
                });
                self._dataPro.source = mailArr;
            }else{
                self.skNoHaveImg.visible = true;
                self.skScroller.visible = false;
            }
        }
        public formatMialItem(mailInfo:NET_CONF.msg_some_info):IShowMailItem{
            let self = this;
            let showData:IShowMailItem = {
                handle:self,
                id:mailInfo.id,
                read:mailInfo.read,
                time:mailInfo.timeValue,
                info:mailInfo.msgInfo,
            }
            return showData;
        }
        public click(item:MailItem):void{
            let self = this;
            let data:IShowMailItem = <IShowMailItem>item.data;
            //判断当前是否存在附件
            // if(true){
            //     
            //     let tip  = TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.ACAccountIsNull); //附件尚未领取，无法删除邮件
            //     TipsMgr.showPrompt(tip);
            // }else{
                dataMgr.mailMo.deleteMessage([data.id]);
            // }
        }
        public readClick(item:MailItem):void{
            let self = this;
            let data:IShowMailItem = <IShowMailItem>item.data;
            let view = new MailDetail(data);
            view.pri = PopupPriority.layer1;
            gameScene.openPopup(view);
            if(!data.read)dataMgr.mailMo.readMessage(data.id);
        }
        public onDispose(){
            super.onDispose();
            let mailMo = dataMgr.mailMo;
            mailMo.rmvListener(Mail_EVT.list,self);
            mailMo.rmvListener(Mail_EVT.delete,self);
            mailMo.rmvListener(Mail_EVT.read,self);
        }
    }
    export class MailItem extends cui.DataItem{
        public skIcon:cui.Image;
        public skTime:cui.Label;
        public skInfo:cui.Label;
        public skRmvMail:cui.ScaleButton;
        public skReadBtn:cui.SimpleButton;
        constructor(){
            super();
            let self = this;
            self.skinName = "mailItemSkin";
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            let data:IShowMailItem = <IShowMailItem>self.data;
            self.skRmvMail.setTarget(function(){
                data.handle.click(self);
            },self);
            self.skReadBtn.setTarget(function(){
                data.handle.readClick(self);
            },self);
        }
        protected dataChanged(){
            super.dataChanged();
            let self = this;
            let data:IShowMailItem = <IShowMailItem>self.data;
            self.skIcon.source = !!data.read ? "mail@overRead" : "mail@unRead";
            //格式化成当前时间
            let date = new Date( data.time* 1000);
            self.skTime.text = date.toLocaleString();
            self.skInfo.text = data.info;
        }
    }
    export class MailDetail extends UIPopup{
        public skClose:cui.ScaleButton;
        public skTitle:cui.Label;
        public skSender:cui.Label;
        public skContent:cui.Label;
        public skOverImg:cui.Image;
        public skAccessory:cui.Group;
        public skGold:cui.Label;

        private _info:IShowMailItem;
        constructor(info:IShowMailItem){
            super();
            let self = this;
            self.skinName = "mailDetailSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.skOverImg.visible = self.skAccessory.visible = false;
            self._info = info;
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skClose.setTarget(self.close,self);
            let langMgr = TRain.langMgr;
            self.skTitle.text = langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.MailTitle) +  langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.Mail_Title);
            self.skSender.text = langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.MailSendName)  + langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.Mail_From);
            self.skContent.text = self._info.info;
        }

    }
}