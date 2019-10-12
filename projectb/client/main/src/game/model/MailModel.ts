module game {
    export const enum Mail_EVT{
        read = "read_mail",
        delete = "mail_delete",
        list = "mail_list"
    }
    export class MailModel extends DataModel{
        private _mailList:NET_CONF.msg_some_info[];
        private _rmvList:string[];
        constructor() {
            super();
            this.initRegHandle();
        }
        public initRegHandle(): void {
            let self = this;
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_ask_message_result, self.askMsgResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_delete_message_result, self.deleteMsgResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_read_message_result, self.readMsgResult, self);
        }
        public get list():NET_CONF.msg_some_info[]{
            return this._mailList || [];
        }
        public rmvList(list:string[]):void{
            let mailList = this._mailList;
            for(let i = 0;i<list.length;i++){
                let id = list[i];
                for(let j = 0;j<mailList.length;j++){
                    if(id == mailList[j].id)mailList.splice(j,1);
                }
            }
        }
        //标记邮件已读
        public setReadMail(id:string):void{
            let self = this;
            let mailList = self._mailList;
            for(let i = 0;i<mailList.length;i++){
                let mailInfo = mailList[i];
                if(id == mailInfo.id)mailInfo.read = 1;
            }
        }
        // ------------------------------客户端接收消息--------------------------------------
        //获取邮件列表返回
        public askMsgResult(data: NET_CONF.s2c_ask_message_result) {
            let self = this;
            let list = self._mailList;
            if(data.result){
                if(list){
                    list.concat(data.msg_list);
                }else{
                    self._mailList = data.msg_list;
                }
                self.postEvent(Mail_EVT.list);
            }
        }
        //删除邮件返回
        public deleteMsgResult(data: NET_CONF.s2c_delete_message_result) {
            let self = this;
            if(data.result){
                //邮件删除成功
                let tip  = TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.deleteMailSuccess); //邮件删除成功
                TipsMgr.showPrompt(tip);
                self.rmvList(self._rmvList);
                self.postEvent(Mail_EVT.delete);
            }
        }
        //读取邮件返回
        public readMsgResult(data: NET_CONF.s2c_read_message_result) {
            let self = this;
            if(data.result == langConsts.errCode.e_rmt_success){
                self.setReadMail(data.id);
                self.postEvent(Mail_EVT.read);
            }
        }
        // ------------------------------客户端发消息--------------------------------------
        //发送获取邮件列表的消息
        public askMessage() {
            let args: NET_CONF.c2s_ask_message = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_ask_message, args);
        }
        //删除邮件的消息
        public deleteMessage(list:string[]) {
            let args: NET_CONF.c2s_delete_message = <any>{};
            args.delete_list = list;
            this._rmvList = list;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_delete_message, args);
        }
        //读取邮件
        public readMessage(id:string) {
            let args: NET_CONF.c2s_read_message = <any>{};
            args.id = id;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_read_message, args);
        }
    }
}