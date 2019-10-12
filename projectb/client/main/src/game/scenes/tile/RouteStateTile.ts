module game{
    // export class RoutesTile extends cui.DataItem{
    //     private _tiles:RouteStateTile;

    //     constructor( tileSkinNm:string ){

    //     }

    //     protected dataChanged( datas:any[] ): void{

    //     }
    // }

    export class RouteStateTile extends cui.UITile{
        public static props:string[] = ["r","pt","up","down"];
        //--------------skin 可选皮肤
        public skBg:cui.Image;
        public skNum:cui.Image;
        public skDot:cui.Image;
        public skDot1:cui.Image;
    
        constructor( skinName?:string ){
            super();

            let self = this;
            self.skinName = skinName;
            self.visible = false;
        }

        // protected onPartAdded(){
        //     let self = this;
        //     // let ctrl = self.skDot;
        //     // if( ctrl && self.getChildIndex(ctrl)) self.removeChild( ctrl );

        //     // ctrl = self.skDot1;
        //     // if( ctrl && self.getChildIndex(ctrl)) self.removeChild( ctrl );
            
        // }

        public hasProp( key:string ):boolean{
            return RouteStateTile.props.indexOf( key )>=0;
        }

        public dataChanged(): void{
            if( this._data ){
                this.visible = true;
                super.dataChanged();
            }
            else{
                this.visible = false;
            }
        }

        public set r(val:number)
        {
            let ctrl = this.skBg;
            let curStr = ctrl.source.split("_")[0];
            if(ctrl){
                ctrl.source = curStr + "_" + val;
            }
        }

        public set pt(val:number)
        {
            let ctrl = this.skNum;
            if(ctrl){
                let curStr = ctrl.source.split("_")[0];
                if( val>0){
                    ctrl.visible = true;
                    ctrl.source = curStr + "_" + val;
                    if( !ctrl.parent ) this.addChild( ctrl );
                }
                else{
                    ctrl.visible = false;
                    if( ctrl.parent ) ctrl.parent.removeChild( ctrl );
                }   
            }
        }

        public set up(val:boolean)
        {
            let ctrl = this.skDot;
            if(ctrl){
                if( val ) {
                    if( !ctrl.parent ) this.addChild( ctrl );
                }
                else{
                    if( ctrl.parent ) ctrl.parent.removeChild( ctrl );
                }   
            }
        }
        
        public set down(val:boolean)
        {
            let ctrl = this.skDot1;
            if(ctrl){
                if( val ) {
                    if( !ctrl.parent ) this.addChild( ctrl );
                }
                else{
                    if( ctrl.parent ) ctrl.parent.removeChild( ctrl );
                }   
            }
        }
    }
}