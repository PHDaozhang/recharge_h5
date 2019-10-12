module game
{
    export interface LayerDelegate
    {
        showLayer( layer:cui.Group ):void;
        hideLayer( layer:cui.Group ):void;
    }

    export class BaseScene extends cui.Group
    {
        constructor()
        {
            super();
            let self = this;
            self.hitCheckBound = false;
        }

        // protected onPartAdded():void{

        //     let self = this;
        //     let stageWidth = self.$stage.$stageWidth;
        //     self.x = Math.floor( (stageWidth-Consts.DESIGN_WIDTH)/2 );
        // }

        /**
         * @
         * 舞台尺寸改变
         */
        protected onResize( w:number, h:number ):void{
            let self = this;
            self.width = w;
            self.height = h;
        }

        public $onAddToStage(stage:egret.Stage, nestLevel:number):void{
            super.$onAddToStage(stage, nestLevel);

            let self = this;
            notifiCenter.addListener(egret.Event.RESIZE,self.onResize,self);
            self.onResize( stage.$stageWidth, stage.$stageHeight );
        }

        public $onRemoveFromStage():void{
            super.$onRemoveFromStage();
            
            notifiCenter.rmvListener(egret.Event.RESIZE,this);
        }


        public $hitTest(stageX:number, stageY:number):egret.DisplayObject
        {
            return egret.DisplayObjectContainer.prototype.$hitTest.call( this, stageX, stageY );
        }

        public onMsgErr(errCode:number){
            switch( errCode ){
                // case ReqConst.reqFail:
                //     Connect.tryReconn();
                //     break;
                // case langConsts.errCode.connect_fail:
                //     Connect.tryReconn();
                //     break;
                // case langConsts.errCode.be_kick_game:
                //     //终断客户端的连接
                //     HttpClient.stop = true;
                //     MsgBox.showPrompt(langConsts.errCode.connect_fail);
                //     break;
                // case langConsts.errCode.logined_in_other:
                //     HttpClient.stop = true;
                //     MsgBox.showPrompt( langConsts.errCode.logined_in_other );
                //     break;
                default:
                    MsgBox.showErr( errCode );
                    break;
            }
        }
    }
}
