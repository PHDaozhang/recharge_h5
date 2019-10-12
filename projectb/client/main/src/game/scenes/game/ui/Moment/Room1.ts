module game {
    export interface ICloseDoorData{
        leftX:number,
        leftEndX:number,
        rightX:number,
        rightEndX:number,
    }
    export class Room1 extends UIFullFW {
        public skBack: cui.ScaleButton;
        public skQuickStart: cui.SimpleButton;
        public skList: cui.DataGroup;
        public skTitle: cui.Image;
        //public skImg: cui.Image;
        public skGroup: cui.Group;
        public skScroller: cui.Scroller;
        public skImg:UIDBAni;
        public skNotify:cui.Group;

        private _closeDoorWrapper: TRain.AniWrapper;
        private _itemPro: cui.ArrayCollection;
        private _closeDoorData:ICloseDoorData;
        public constructor(data?:ICloseDoorData) {
            super();
            this.skinName = "newMomentSkin";
            this._closeDoorData = data || <any>{};
        }
        public childrenCreated() {
            super.childrenCreated();
            let self = this;
            let closeDoorWrapper: TRain.AniWrapper;
            if (!self._closeDoorWrapper) {
                closeDoorWrapper = self._closeDoorWrapper = TRain.WrapperMgr.getWrapper();
                closeDoorWrapper.ani = new CloseDoorAni(self.skImg, self.skScroller, 300, self._closeDoorData, false, true);
            }
            closeDoorWrapper.start();
            self.skList.dataProvider = self._itemPro = new cui.ArrayCollection();
        }
        public setTitle(value: string,girlDb?:string) {
            let self = this;
            self.skTitle.source = value;
            self.skImg.dbNm = girlDb || "renwu";
        }
        public setData(item: any, listArr: any[]): void {
            let self = this;
            self.skList.itemRender = item;
            self._itemPro.source = listArr;
        }
        protected onDispose() {
            let self = this;
            if (self._closeDoorWrapper) TRain.WrapperMgr.freeWrapper(self._closeDoorWrapper);
            super.onDispose();

        }
    }

    export class Room2 extends UIFullFW {
        public skBack: cui.ScaleButton;
        public skList: game.UIRouteList;
        public skTitle: cui.Image;
        public skNotify:cui.Group;
        public skRouteIn:cui.ScaleButton;

        public constructor() {
            super();
            this.skinName = "newMoment1Skin";
        }
        public setTitle(value: string) {
            this.skTitle.source = value;
        }
    }

    export class Room3 extends UIFullFW {
        public skBack: cui.ScaleButton;
        public skList: game.UIRouteList2;
        public skTitle: cui.Image;
        public skNotify:cui.Group;
        public skRouteIn:cui.ScaleButton;

        public constructor() {
            super();
            this.skinName = "newMoment2Skin";
        }
        public setTitle(value: string) {
            this.skTitle.source = value;
        }
    }
}