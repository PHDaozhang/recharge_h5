module game
{
    
    export class BoxUI extends UIFullFW
    {
        public skTxt:cui.Label;
        public skClose:cui.ScaleButton;
        public skOk:cui.ScaleButton;

        //private _db:dragonBones.EgretArmatureDisplay;

        private _data:{fun:(tag:number)=>void, tar:any, txt?:string};
        constructor(){
            super();

            let self = this;
            self.skinName = "MsgboxSkin";
            self.vCenter = 0;
            self.hCenter = 0;
        }

        protected onPartAdded(){
            let self = this;

            self.skClose.tag = 0;
            self.skOk.tag = 1;

            let cb = function( ctrl:cui.ScaleButton ){
                let cbData = self._data;
                if( cbData.fun ){
                    self._data = null;
                    cbData.fun.call( cbData.tar, ctrl.tag );
                }
            }

            self.skClose.setTarget( cb, self );
            self.skOk.setTarget( cb, self );

            let data = self._data;
            if( data ){
                self.skTxt.textFlow = cui.htmlParser.parse( data.txt ); 
            }
        }

        public setData( txt:string, cb?:(tag:number)=>void, tar?:any ){
            let self = this;
            if( self._inited ){
                self.skTxt.textFlow = cui.htmlParser.parse( txt );
                self._data = {fun:cb, tar:tar};
            }
            else{
                self._data = {fun:cb, tar:tar, txt:txt};
            }
        }

        // public dispose(){
        //     if( !this._db.parent ){
                
        //     }
        // }
    }
}