module game {
    export class ActGamesView extends UIPopup {
        private skClose: cui.ScaleButton;
        private skGames: cui.DataGroup;
        private _itemPro: cui.ArrayCollection;

        constructor() {
            super();
            let self = this;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.useOnce = false;
            self.skinName = "actGamesSkin";
        }
        protected childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skClose.setTarget(self.close, self);
            game.dataMgr.activityMo.addListener(<any>ActMo_EVT.close, self.close, self);
        }

        public setData(data: number[]) {
            let self = this;
            let list = self.skGames;
            list.itemRender = GamesItemView;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            let objs: Object[] = [];
            for (let key in data) {
                let obj = {
                    gameId : data[key]
                };
                objs.push(obj);
            }
            self._itemPro.source = objs;
        }

         protected onDispose() {
            let self = this;
            super.onDispose();
            game.dataMgr.activityMo.rmvAllListener();
        }
    }
    class GamesItemView extends cui.DataItem {
        private skEnter: cui.ScaleButton;
        private skImg: cui.Image;

        constructor() {
            super();
            this.skinName = "gameItemSkin";
        }
        public childrenCreated() {
            super.childrenCreated();
        }
        protected dataChanged() {
            super.dataChanged();
            let self = this;
            let gameId: number = self.data.gameId;
            self.skImg.source = "gameImg@txt_" + gameId;
            self.skEnter.setTarget(function () {
                game.dataMgr.activityMo.enterGame(gameId);
            }, self)
        }
    }
}