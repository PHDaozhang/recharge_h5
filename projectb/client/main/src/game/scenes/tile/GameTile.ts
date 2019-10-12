///<reference path="./ItemTile.ts" />
module game{
    export class GameTile extends ItemTile
    {
        //--------------skin 可选皮肤
        public skAni:any;
        public static props:string[] = ["state"];
        public hasProp( key:string ):boolean{
            if( key == "state" ) return true;

            return super.hasProp( key );
        }
        public dataChanged(): void{
            let self = this;
            if( self._data ){
                //清除上一个动画
                TRain.actionMgr.rmvActsByTar(self);
                self.visible = true;
                super.dataChanged();
            }
        }
        public set ani(val:string)
        {
            let ctrl = this.skAni;
            if(ctrl){
                ctrl.dbNm = val;
            }
        }
        public set state(val:any){
            let self = this;
            let isClick = val.isClick;
            if(isClick){
                val.isClick = false;
                self.visible = false;
                let action:TRain.ActionPropDo = new TRain.ActionPropDo(val.tm*100,{visible:true,alpha:0});
                let actionProp: TRain.ActionPropTo = new TRain.ActionPropTo(200, 1, {alpha:val.alpha});
                actionProp.setEaseFun(EaseUtil.quadIn);
                let actionSeq = new TRain.ActionSequence([action, actionProp]);
                TRain.actionMgr.addAction(actionSeq,self, false);
            }
        }
    }
}