module game
{
    /**
     * 界面窗口基类，此类界面必须使用open接口来打开。
     *
     * */
    export class UIFullFW extends UIFWBase
    {
        /**
         * @
         * 舞台尺寸改变
         */
        protected onResize( w:number, h:number ):void{
        }

        private doResize( w:number, h:number ){
            let self = this;
            self.width = w;
            self.height = h;
            TRain.core.addDelayDo( self.onResize, self, 0, 0, false, w, h );
        }

        public $onAddToStage(stage:egret.Stage, nestLevel:number):void{
            let self = this;
            let w = stage.$stageWidth;
            let h = stage.$stageHeight;
            if( self.width != w || self.height != h ){
                self.doResize( w, h );
            }

            super.$onAddToStage(stage, nestLevel);

            notifiCenter.addListener(egret.Event.RESIZE,self.doResize,self);
        }

        public $onRemoveFromStage():void{
            super.$onRemoveFromStage();

            notifiCenter.rmvListener( egret.Event.RESIZE, this );
        }
    }
}