module game {
    export interface MomentMediator {
        onReturn(): void;
    }

    //选场
    export class MomentView extends UIFullFW {
        public skImgName: cui.Image;
        public skBtnReturn: cui.ScaleButton;
        public skList: cui.DataGroup;
        public skNotify: cui.Group;

        private _arr: cui.ArrayCollection;

        public constructor() {
            super();
            let self = this;
            self.skinName = "MomentSkin2";
        }

        public childrenCreated(): void {
            super.childrenCreated();
            let self = this;
            self.skBtnReturn.setTarget(self.onReturn, self);
            self._arr = new cui.ArrayCollection();
            self.skList.dataProvider = self._arr;
        }

        //返回大厅界面
        protected onReturn(): void { }

        public setData(itemRen: any, source: any[]): void {
            let self = this;
            self.skList.itemRender = itemRen;
            self._arr.source = source;
            self._arr.refresh();
        }
    }
}