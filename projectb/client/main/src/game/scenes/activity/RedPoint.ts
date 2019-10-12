module game {
    export class RedPoint extends cui.Component  {
        public skCount : cui.BitmapLabel;
        constructor(){
            super();
            let self = this;
            self.skinName = "redPointSkin";
        }
    }
}