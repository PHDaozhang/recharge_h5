/**
 * Created by wjdeng on 2015/9/6.
 */

module game
{
    export class BusyLayer extends cui.Group implements ILoadShow
    {
        private static inst:BusyLayer;
        public static getInst():BusyLayer
        {
            if( !BusyLayer.inst )
            {
                BusyLayer.inst = new BusyLayer();
            }
            return BusyLayer.inst;
        }

        private _gcon:cui.Group;//动画内容添加层
        private _aniTag:number;//动画延时显示的计时器
        private _cnt:number;
     
        private _pcon:cui.BaseContainer;//自身的父节点

        constructor()
        {
            super();

            let self = this;

            self._cnt = 0;
            let con = self._gcon = new cui.Group();
            con.hCenter = 0;
            con.vCenter = 0;
            con.perHeight = 100;
            con.perWidth = 100;

            let img = new cui.Image();
            // img.perHeight = 100;
            // img.perWidth = 100;
            img.hCenter = 0;
            img.vCenter = 0;
            img.source = "common@jzBottom";
            con.addChild(img);

            let ani = new cui.UIMovieClip();
            ani.aniName = "busy";
            ani.autoPlay = true;
            ani.hCenter = 0;
            ani.vCenter = 0;
            con.addChild( ani );
            
            notifiCenter.addListener( egret.Event.RESIZE, function( w:number, h:number ){
                self.width = w;
                self.height = h;
            }, self );
        }

        public $onAddToStage(stage:egret.Stage, nestLevel:number):void
        {
            super.$onAddToStage(stage,nestLevel);

            let self = this;
            self.width = stage.$stageWidth;
            self.height = stage.$stageHeight;

            self.hideAni();
            if( !self._aniTag ){
                self._aniTag = TRain.core.addDelayDo(self.showAni, self, 100);
            }
        }

        public $onRemoveFromStage():void
        {
            super.$onRemoveFromStage();
            let self = this;

            let aniTag = self._aniTag;
            if(aniTag)
            {
                TRain.core.rmvDelayDoByID(aniTag);
                self._aniTag = 0;
            }
        }

        public $hitTest():egret.DisplayObject
        {
            return this;
        }

        private hideAni():void
        {
            let self = this;
            let gcon = self._gcon;
            if(gcon.parent)
            {
                self.removeChild(gcon);
            }
        }

        private showAni():void
        {
            let self = this;
            self._aniTag = 0;
            let gcon = self._gcon;
            if(!gcon.parent)
            {
                self.addChild(gcon);
            }
        }

        public showBusy():void
        {
            let self = this;
            self._cnt++;
            self.update();
        }

        public hideBusy():void
        {
            let self = this;
            if(self._cnt>0) self._cnt--;
            
            self.update();
        }

        public stopBusy():void
        {
            let self = this;
            self._cnt = 0;
            self.update();
        }

        public setParent( container:cui.BaseContainer ):void
        {
            let self = this;
            if( self.parent )
            {
                self.parent.removeChild( self );
            }
            self._pcon = container;
        }

        private update():void
        {
            let self = this;
            if( !self._pcon ) return;

            if( self._cnt > 0 )
            {
                if( !self.parent )
                {
                    self._pcon.addChild( self );
                }
            }
            else
            {
                if( self.parent )
                {
                    self._pcon.removeChild( self );
                }
            }
        }
    }
}