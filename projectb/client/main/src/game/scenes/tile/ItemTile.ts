
module game
{
    export class ItemTile extends cui.UITile
    {
        public static props:string[] = ["tag","ud","bg","icon","sel","ani","font"];
        //--------------skin 可选皮肤
        public skIcon:cui.Image;
        public skSel:cui.Image;
        public skBg:cui.Image;
        public skRed:cui.Image;
        public skAni:cui.UIMovieClip;
        public skFont:cui.BitmapLabel;
  
        constructor( skinName?:string ){
            super();

            let self = this;
            self.skinName = skinName;
        }

        public hasProp( key:string ):boolean{
            return ItemTile.props.indexOf( key )>=0;
        }

        public set icon(val:string)
        {
            let ctrl = this.skIcon;
            if(ctrl){
                ctrl.source = val;
            }
        }

        public set bg(val:string)
        {
            let ctrl = this.skBg;
            if(ctrl){
                ctrl.source = val;
            }
        }

        public set sel(val:boolean)
        {
            let ctrl = this.skSel;
            if(ctrl){
                ctrl.visible = val;
            }
        }

        public set ani(val:string)
        {
            let ctrl = this.skAni;
            if(ctrl){
                ctrl.aniName = val;
            }
        }
        public set font(val:string)
        {
            let ctrl = this.skFont;
            if(ctrl){
                ctrl.text = val;
            }
        }
    }
}