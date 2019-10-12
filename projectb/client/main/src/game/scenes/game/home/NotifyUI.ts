
module game
{
    const enum NoticeType{
        robot = 196,//机器人通告
        imptConsume = 197,//重要消费通告
        winningPrize = 198,//奖励通告
        playerSpeaker = 199,//用户喇叭
        sys = 200, // 跑马灯 系统消息
    }
    export class NotifyUI extends cui.Component
    {
        public skTxt:cui.Label;
        public skBg:cui.Image;
        public skAni:cui.UIMovieClip;

        private _stX:number;
        private _parent:cui.BaseContainer;
        private _showing:boolean;//当前处于显示状态
        private _data:{data:NET_CONF.s2c_w2c_notify, tm:number,txt:egret.ITextElement[]};
        private _sysData:{data:NET_CONF.s2c_w2c_notify, tm:number,txt:egret.ITextElement[]};
       // private _sysTm:number;
        constructor()
        {
            super();
            let self = this;
            self.touchEnabled = false;

            self._showing = false;
            self.skinName = "NotifySkin";
        }

        public onPartAdded() {
            super.onPartAdded();

            let self = this;
            
            
            // let notifyMo = dataMgr.notifyMo;
            // notifyMo.addListener( NotifyMo_EVT.got_notify, self.showNext, self );
            let accMo = dataMgr.accMo;
            accMo.addListener( NotifyMo_EVT.got_notify, self.showNext, self );
        }

        public rmvParent( p:cui.BaseContainer ){
            let self = this;
            if( p == self._parent && self.parent){
                self._parent = null;
                TRain.core.rmvAllDelayDo(self);
                p.removeChild( self );
            }
        }

        public setParent( p:cui.BaseContainer, width?:number){
            let self = this;
            self._parent = p;
            let group = self.skTxt.parent;
            self._stX = group.width-45;
            width = width || p.width;
            self.skBg.width = width;
            group.mask = new egret.Rectangle(45,0,width-45,group.height);

            if( p ){
                p.addChild( self );
                self.skAni.visible = self.skBg.visible = self._showing;
                self.showNext();
            }
            else{
                let oldParent = self.parent;
                if( oldParent ) oldParent.removeChild( self );
            }
        }

        private update( tm:number ){
            let self = this;
            let skTxt = self.skTxt;
            let x = skTxt.x - 1;
            skTxt.x = x;
            if( x + skTxt.width<0 ){
                let curData = self._data;
                if(!curData)curData = self._sysData;
                curData.tm++;
                if( (curData.data.repCount||1)<=curData.tm ){
                    self._data = null;
                    TRain.core.rmvAllDelayDo(self);
                    self.showNext();
                    //if(self._sysTm > 0)TRain.core.rmvAllDelayDo(self._sysTm);
                }
                else{
                    //self.resetTxt();
                    self._sysData = curData;
                    self._data = null;
                    self.setShowing( false );
                    TRain.core.addDelayDo(self.showNext,self,(self._sysData.data.interval * 1000));
                }
            }
        }

        private showNext(){
            let self = this;
            if( !self._parent || self._data ) return;
            let sysData = self._sysData;
            let nodifyData = dataMgr.accMo.popNotify();
            if(!nodifyData && sysData){
                self._data = {data:sysData.data, tm:sysData.tm,txt:sysData.txt};
                self.skTxt.textFlow = self._data.txt;
                self.resetTxt();
                self.setShowing( true );
            }else{
                if( nodifyData ){
                    let formatText:egret.ITextElement[] ;
                    if(nodifyData.notifyType == NoticeType.sys){
                        let ret = []; 
                        let txtNum:egret.ITextElement = {text: (nodifyData.talkerNickName + ":") };
                        let propStr = "color=0xffffff";
                        txtNum.style = this.parseProp( propStr );
                        ret.push(txtNum);
                        let txtContent:egret.ITextElement = {text: nodifyData.content };
                        let propStr1 = "color=0xFFFF0000";
                        txtContent.style = this.parseProp( propStr1 );
                        ret.push(txtContent);
                        formatText = ret ;
                    }else{
                        formatText = self.formatTxt(nodifyData);
                    }
                    self._data = {data:nodifyData, tm:0,txt:formatText};
                    self.skTxt.textFlow = formatText;
                    self.resetTxt();
                    self.setShowing( true );
                }
                else{
                    self._data = null;
                    self.setShowing( false );
                }  
            }
        }

        private setShowing( b:boolean ){
            let self = this;
            if( self._showing == b ) return;

            let parent = self._parent;
            self._showing = b;
            self.skAni.visible = self.skBg.visible = b;
            if( b ){
                TRain.core.addFrameDo( self.update, self, false, 33 );
                parent.addChild( self );
            }
            else{
                TRain.core.rmvFrameDo( self );
                if(parent)parent.removeChild( self );
            }
        }

        private resetTxt():void
        {
            let self = this;
            let skTxt = this.skTxt;
            skTxt.x = self._stX;
        }

        private formatTxt(nodifyData:NET_CONF.s2c_w2c_notify ):egret.ITextElement[]{
            let name = nodifyData.talkerNickName;
            let txt = nodifyData.content;
            let moneyNum = nodifyData.moneyNum; 
            let stIdx = txt.indexOf( "{");
            let pos = 0;
            let txtLen = txt.length;
            let ret = []; 
            let style:egret.ITextStyle;
            let txtName:egret.ITextElement = {text:name+":"};
            let propStr = "color=0xffffff";
            txtName.style = this.parseProp( propStr );
            ret.push(txtName);
            while( stIdx>=0 ){
                let endIdx = txt.indexOf( "}", stIdx );
                if( endIdx<0 ) break;

                if(pos<stIdx){
                    let txtEle:egret.ITextElement = {text:txt.substring(pos, stIdx)};
                    if( style ) txtEle.style = style;
                    ret.push( txtEle );
                }

                style = null;
                if( endIdx-stIdx>3 ){
                    let propStr = txt.substring(stIdx+1, endIdx);
                    style = this.parseProp( propStr );
                }
                
                stIdx = txt.indexOf( "{", pos );
                pos = endIdx+1;
            }

            if( pos<txtLen ){
                let tempTxt = txt.substring(pos,txtLen);
                let maxLen = tempTxt.length;
                if(tempTxt.charAt(maxLen-1) == "1"){
                    tempTxt = tempTxt.substring(0,maxLen-1);
                }
                let txtEle:egret.ITextElement = {text:tempTxt};
                if( style ) txtEle.style = style;
                ret.push( txtEle );
                let goldLab = TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.MoneyType1);
                let goldNum = DataFormat.convertGoldString3(moneyNum);
                let txtNum:egret.ITextElement = {text: goldNum + goldLab };
                let propStr = "color=0xfffc00";
                txtNum.style = this.parseProp( propStr );
                ret.push( txtNum );
                let txtTH:egret.ITextElement = {text:"!"};
                let propStr1 = "color=0xffffff";
                txtTH.style = this.parseProp( propStr1 );
                ret.push( txtTH );
            }

            return ret;
        }

        private parseProp( propStr:string ):egret.ITextStyle{
            let ret:egret.ITextStyle = null;
            let props = propStr.split(",");
            for( let i=0, len=props.length; i<len; ++i ){
                let prop = props[i];
                let tmps=prop.split("=");
                if(tmps.length==2){
                    ret = ret || <egret.ITextStyle>{};
                    switch( tmps[0] ){
                        case "color":
                            let colorStr = tmps[1];
                            //0xffffffff
                            if( colorStr.length == 10 ){
                                ret.textColor = parseInt( "0x" + colorStr.substr(4) );
                            }
                            else{
                                ret.textColor = parseInt( colorStr );
                            }
                            break;
                    }
                }
            }
            return ret;
        }
    }
}