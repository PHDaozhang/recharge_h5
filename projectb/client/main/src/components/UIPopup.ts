module game
{
    export const enum PopupPriority{
        back = -10,
        normal = 0,
        layer1 = 100,
        top = 10000
    }

    export interface PopupDelegate
    {
        onPopupClose( popup:UIPopup ):void;
        onPopupOpen( popup:UIPopup ):void;
    }
    /**
     * 界面弹出窗口基类
     *
     * */
    export class UIPopup extends UIFWBase
    {
        public pri:number;//优先级 大的就显示， 小的等大的界面关掉后显示
        public delegate:PopupDelegate;
        public useOnce:boolean; //只用一次

        public hideHome:boolean;        //是否要隐藏桌面 true：弹出时，将隐藏掉桌面显示的界面。 false：不隐藏
        public hideChar:boolean;        //是否隐藏ava形象

        public hideBg:boolean;        //不显示半透明背景 
        public bgClose:boolean;       //点击空白区域关闭此页 
        
        constructor()
        {
            super();
            let self = this;
            self.pri = PopupPriority.back;
            self.useOnce = true;
        }

        protected openImpl( data:any ):void
        {
            super.openImpl( data );

            let delegate = this.delegate;
            if( delegate )
            {
                delegate.onPopupOpen( this );
            }
        }

        protected getCloseAni(){
            return null;
        }

        protected closeImpl():void
        {
            super.closeImpl();
            let self = this;
            let delegate = self.delegate;
            if ( delegate )
            {
                delegate.onPopupClose( self );
            }
            if( self.useOnce )
            {
                self.dispose();
            }
        }
    }

    export class PopupLayer extends cui.Group
    {
        private _deque:{ui:UIPopup, data?:any}[];      //队列
        private _canPop:boolean;        //是否可弹出
        private _bgImg:cui.Image;       //统一背景
        private _curPri:number;
       
        private _delayTag:number;

        private _waitUI:UIPopup;

        public delegate:LayerDelegate;

        constructor()
        {
            super();
            let self = this;
            let img = self._bgImg = new cui.Image( "common@mk_bg" );
            img.perWidth = 100;
            img.perHeight = 100;
            img.visible = false;
            self.addChild( img );

            self._curPri = PopupPriority.normal;
            self._canPop = true;
            self._deque = [];

            self.addEventListener(egret.TouchEvent.TOUCH_END, function( evt:egret.Event ){
                    if( evt.target != self ) return;
                    
                    let childCnt = self.numChildren;
                    if( childCnt>0 ){
                        let popView = self.getChildAt( childCnt-1 );
                        if( (popView instanceof UIPopup) && popView.bgClose )
                        {
                            popView.close();
                        }
                    }
                }, self);
        }

        public startPop():void
        {
            let self = this;
            if( !self._canPop )
            {
                self._canPop = true;
                let delegate = self.delegate;
                if( self.numElements > 0 )
                {
                    if( delegate ) delegate.showLayer( self );
                }
                else if( self._deque.length>0 )
                {
                    if( delegate ) delegate.showLayer( self );

                    self.update();
                }
            }
        }

        public stopPop():void
        {
            let self = this;
            if( self._canPop )
            {
                self._canPop = false;

                let delayTag = self._delayTag;
                if( delayTag ){
                    TRain.core.rmvDelayDoByID( delayTag );
                    self._delayTag = 0;
                }

                if( self.delegate ) self.delegate.hideLayer( self );
            }
        }

        public openPopup( ui:UIPopup, openData?:any ):void
        {
            let self = this;
            if( ui.parent ){
                ui.open( ui.parent, openData );
                return;
            }

            if( self._canPop && ((!self.hasPopup() && !self._waitUI) || self._curPri<ui.pri) ){
                //显示
                self._openPopup( ui, openData )
            }
            else{
                let i, len;
                let deque = self._deque;
                for( i = 0, len=deque.length; i < len; ++i){
                    let tmp = deque[i].ui;
                    if(ui.pri < tmp.pri)
                    {
                        break;
                    }
                }
                deque.splice(i, 0, {ui:ui, data:openData});
            }
        }

        private _openPopup( popup:UIPopup, openData?:any ):void{
            let self = this;
            self._curPri = popup.pri;
            if( self.delegate && !self.hasPopup() ) self.delegate.showLayer( self );

            self._waitUI = popup;
            popup.visible = false;
            popup.open( self, openData, function(ui:UIFWBase){
                if( self._waitUI == popup ){
                    self._waitUI = null;
                    self.reset();
                }
            }, self );
        }

        /**
         * 删除所有的弹出界面，包括队列内的
         * */
        public closeAll():void
        {
            let self = this;
            let deque = self._deque;
            let view:UIPopup;
            let popView:egret.DisplayObject;
            let len = deque.length;


            if(DEBUG)
            {
                let viewNames = [];
                for(let m = 0 ; m < len ; m++)
                {
                    viewNames.push(deque[m].ui.name);
                }
                for(let n = self.numElements -1 ; n >= 0 ; n--)
                {
                    popView = self.getChildAt(n);
                    if(popView instanceof game.UIPopup)
                    {
                        viewNames.push(popView.name);
                    }
                }
                if(viewNames.length > 0)
                {
                    console.log("关闭所有弹出界面：" + viewNames);
                }
            }

            for(let i = 0 ; i < len ; i++)
            {
                view = deque[i].ui;
                view.close();
            }
            self._deque.length = 0;

            let children = self.$children;
            for(let j = children.length -1; j >= 0 ;j--)
            {
                popView = children[j];
                if(popView instanceof UIPopup)
                {
                    popView.close();
                }
            }
        }

        private hasPopup():boolean
        {
            return (this._deque.length + this.numElements)>1;
        }

        $childRemoved( child:egret.DisplayObject, index:number ):void
        {
            super.$childRemoved( child, index );

            if( child instanceof UIPopup ){
                let self = this;
                if( !self._delayTag ){
                    self._delayTag = TRain.core.addDelayDo(self.update, self, 0);
                }
            }
        }

        protected update():void
        {
            let self = this;
            self._delayTag = 0;

            if( self.numChildren==1 )
            {
                let deque = self._deque;
                let openData:{ui:UIPopup, data?:any};
                while( deque.length > 0 )
                {
                    openData = deque.pop();
                    if( !openData.ui.disposed ) break;

                    openData = null;
                }

                if( openData ){
                    self._openPopup( openData.ui, openData.data );
                }
                else
                {
                    if( self.delegate )
                    {
                        self.delegate.hideLayer( self );
                    }
                }
            }
            else{
                self.reset();
            }
            
        }

        private reset():void
        {
            let self = this;
            let children = self.$children;
            let firstUI:UIPopup;
            for(let j = children.length-1; j >= 0 ;j--){
                let ctrl = children[j];
                if(ctrl instanceof UIPopup){
                    if( firstUI ){
                        ctrl.visible = false;
                    }
                    else{
                        firstUI = ctrl as UIPopup;
                    }
                }
            }

            let curPri = 0;
            if( firstUI ){
                firstUI.visible = true;
                curPri = firstUI.pri; 
                self._bgImg.visible = !firstUI.hideBg;
            }
            self._curPri = curPri;
        }
    }
}
