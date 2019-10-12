module game{
    export class LimitRwOpen extends UIPopup{
        public skClose:cui.SimpleButton;
        private _tm:number;
        private _tagTm:number;
        constructor(){
            super();
            let self = this;
            self.skinName = "LimRwOpenSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self._tm = 11;
        }
        protected childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skClose.setTarget(self.close,self);
            self._tagTm = TRain.core.addFrameDo(self.updateTm,self,false,1000);
        }
        private updateTm(){
            let self = this;
            let tm = self._tm --;
            if(tm < 1){
                self.close();
                TRain.core.rmvFrameDo(self._tagTm );
                self._tagTm = 0;
            }
        }
    }
}