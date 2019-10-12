///<reference path="./ItemTile.ts" />

module game{
    export class HeadTile extends ItemTile
    {
        //--------------skin 可选皮肤
        public skMask:egret.DisplayObject;
        public skLab:cui.Label;

        public hasProp( key:string ):boolean{
            if( key == "mk" || key == "lab" ) return true;

            return super.hasProp( key );
        }

        public set mk(val:boolean)
        {
            let ctrl = this.skMask;
            if(ctrl){
                ctrl.visible = val;
            }
        }
        public set lab(val:string)
        {
            let ctrl = this.skLab;
            if(ctrl){
                ctrl.visible = !!val;
                ctrl.text = val;
            }
        }
    }
}