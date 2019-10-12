module game {
    export class UIRouteList2 extends cui.Group {
        private _items: RouteItemBase2[];
        /**
         * 
         * @param datas 
         * @param itemCls 必须继承RouteItemBase2
         */
        public init(datas: IRouteData[], itemCls: any, haveDbRow?: boolean) {
            let self = this;
            self._items = [];
            let item: RouteItemBase2;
            for (let i = 0, len = datas.length; i < len; ++i) {
                item = new itemCls();
                item.init(datas[i].route, haveDbRow);
                let w = item.width + 10;
                let h = item.height + 10;
                let row = Math.floor(i / 2);
                let col = i - row * 2;
                item.x = w * col;
                item.y = h * row;
                self.addChild(item);
                self._items[i] = item;
            }
        }

        public updateRoom(datas: IRoomData[]) {
            let self = this;
            for (let i = 0; i < datas.length; i++) {
                let data: IRoomData = datas[i];
                let item: RouteItemBase2 = self._items[i];
                item.updateRoom(data);
            }
        }
    }

    export class RouteItemBase2 extends cui.Component {
        // public skZPL: RouteCom;
        // public skDL: RouteCom;
        // public skDYZL: RouteCom;
        // public skXL: RouteCom;
        // public skXQL: RouteCom;
        // public skWin0: cui.Image;
        // public skWin1: cui.Image;
        // public skWin2: cui.Image;
        // public skLose0: cui.Image;
        // public skLose1: cui.Image;
        // public skLose2: cui.Image;
        public skDONG: RouteCom;
        public skNAN: RouteCom;
        public skXI: RouteCom;
        public skBEI: RouteCom;

        public _data: RouteModel;
        // private _winStr: string;
        // private _win1Str: string;
        // private _win2Str: string;

        public childrenCreated() {
            super.childrenCreated();
            let self = this;
            // if (self.skWin0) {
            //     self.skWin0.visible = false;
            //     self._winStr = self.skWin0.source.split("_")[0];
            // }
            // if (self.skWin1) {
            //     self.skWin1.visible = false;
            //     self._win1Str = self.skWin1.source.split("_")[0];
            // }
            // if (self.skWin2) {
            //     self.skWin2.visible = false;
            //     self._win2Str = self.skWin2.source.split("_")[0];
            // }
            // if (self.skLose0) self.skLose0.visible = false;
            // if (self.skLose1) self.skLose1.visible = false;
            // if (self.skLose2) self.skLose2.visible = false;
        }

        public init(data: game.RouteModel, haveDbRow: boolean) {
            let self = this;
            self._data = data;
            // if (self.skZPL) self.skZPL.setModel(RouteTp.zhupanlu, data);
            // if (self.skDL) self.skDL.setModel(RouteTp.dalu, data);
            // if (self.skDYZL) self.skDYZL.setModel(RouteTp.dayanzailu, data);
            // if (self.skXL) self.skXL.setModel(RouteTp.xiaolu, data);
            // if (self.skXQL) self.skXQL.setModel(RouteTp.xiaoqianglu, data);
            if (self.skDONG) self.skDONG.setModel(RouteTp.zhupanlu, data, haveDbRow);
            if (self.skNAN) self.skNAN.setModel(RouteTp.dalu, data, haveDbRow);
            if (self.skXI) self.skXI.setModel(RouteTp.dayanzailu, data, haveDbRow);
            if (self.skBEI) self.skBEI.setModel(RouteTp.xiaolu, data, haveDbRow);
        }

        public updateRoom(data: IRoomData) {
            let self = this;
            // let resultTp: GameResultTp[][] = self._data.getForecast();
            // let winTp: GameResultTp[] = resultTp[0];
            // let loseTp: GameResultTp[] = resultTp[1];
            // if (winTp[0] > 0) {
            //     self.skWin0.visible = true;
            //     self.skWin0.source = self._winStr + "_" + winTp[0];
            // }
            // if (winTp[1] > 0) {
            //     self.skWin1.visible = true;
            //     self.skWin1.source = self._win1Str + "_" + winTp[1];
            // }
            // if (winTp[2] > 0) {
            //     self.skWin2.visible = true;
            //     self.skWin2.source = self._win2Str + "_" + winTp[2];
            // }
            // if (loseTp[0] > 0) {
            //     self.skLose0.visible = true;
            //     self.skLose0.source = self._winStr + "_" + loseTp[0];
            // }
            // if (loseTp[1] > 0) {
            //     self.skLose1.visible = true;
            //     self.skLose1.source = self._win1Str + "_" + loseTp[1];
            // }
            // if (loseTp[2] > 0) {
            //     self.skLose2.visible = true;
            //     self.skLose2.source = self._win2Str + "_" + loseTp[2];
        }
    }
}
