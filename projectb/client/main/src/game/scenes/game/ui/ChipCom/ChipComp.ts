module game{
    export class ChipComp extends cui.Component{
        private _fontArr:number[];
        private _indexY:number[];
        constructor(){
            super();
            this._indexY = [];
        }
        public childrenCreated(){
            super.childrenCreated();
            let self = this;
            for(let i = 1;i<= 5;i++){
                let chip = self.getChildAt(i-1) as game.ItemTile;
                self._indexY.push(chip.y);
                if(i==1)chip.y = chip.y-10;
            }
        }
        public setFont(fontArr:number[]){
            let self = this;
            self._fontArr = fontArr;
            self.updateChip();
        }
        public updateChip(){
            let self = this;
            for(let i = 1;i<= 5;i++){
                let chip = self.getChildAt(i-1) as game.ItemTile;
                chip.tag  = i;
                chip.icon = confConsts.ComResTp.Chip + i;
                let fontStr = DataFormat.convertGoldString4(self._fontArr[i-1]) ;
                chip.font = fontStr;
                chip.sel = i == 1;
                chip.setTarget(self.clickChip,self);
            }
        }
        public clickChip(tile:cui.UITile){
            let self = this;
            for(let i = 1;i<= 5;i++){
                let chip = self.getChildAt(i-1) as game.ItemTile;
                chip.sel = false;
                chip.y = self._indexY[i-1];
            }
            let ChipTile = tile as game.ItemTile;
            ChipTile.sel = true;
            ChipTile.y = ChipTile.y - 10;
           // self.dispatchEvent();
        }
    }
}