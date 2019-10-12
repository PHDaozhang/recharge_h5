module game{
    export class RoutePop extends game.UIPopup{
        public skClose:cui.ScaleButton;
        public skList:game.UIRouteList;
        public skImg:cui.Image;
        constructor(){
            super();
            let self = this;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.skinName = "routePopSkin";
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            self.skClose.setTarget(self.close,self);
        }
        public setImg(value:string):void{
            this.skImg.source = value;
        }
    }
}