module game{
    export class ChipTile extends cui.Group
    {
        public skChip:cui.Image;
        public skBitImg:cui.Image;
        constructor(){
            super();
            let self = this;
            let image: cui.Image = self.skChip = new cui.Image();
            image.anthorPerX = image.anthorPerY = 0.5;
            self.addChild(image);
            let bitImg: cui.Image = self.skBitImg = new cui.Image();
            bitImg.anthorPerX = 0.5
            bitImg.anthorPerY = 0.7;
            self.addChild(bitImg);
        }
        /**
         * 
         * @param id 筹码下标
         * 
         * @param gold 筹码金币
         */
        public setData(id:number,gold:number,chipTp?:string):void{
            let self = this;
            self.skChip.source = (chipTp || confConsts.ComResTp.Chip) + id;
            self.skBitImg.source = confConsts.ComResTp.chip1 + game.DataFormat.convertGoldString4(gold);
        }

        public clear(){
            let self = this;
            self.scaleX = self.scaleY = 1;
        }
    }
}