module game {

    export interface IShowResult {
        bg: number,
        num: number,
        up: number,
        down: number,
    }

    export interface IRoomData {
        room: any;
    }

    export interface IRouteData {
        route: game.RouteModel;
    }
    export const enum colTp {
        six = 6,//每列有多少tile
    }

    //
    export class UIRouteList extends cui.Group {
        private _items: RouteItemBase[];
        /**
         * 
         * @param datas 
         * @param itemCls 必须继承RouteItemBase
         * @param haveDbRow 是否有双列 
         */
        public init(datas: IRouteData[], itemCls: any,haveDbRow?:boolean) {
            let self = this;
            self._items = [];
            let item: RouteItemBase;
            for (let i = 0, len = datas.length; i < len; ++i) {
                item = new itemCls();
                item.init(datas[i].route,haveDbRow);
                let w = item.width + 10;
                let h = item.height + 10;
                let row = Math.floor(i / 2);
                let col = i - row * 2;
                item.x = w * col + 5;
                item.y = h * row;
                self.addChild(item);
                self._items[i] = item;
            }
        }

        public updateRoom(datas: IRoomData[]) {
            let self = this;
            for (let i = 0; i < datas.length; i++) {
                let data: IRoomData = datas[i];
                let item: RouteItemBase = self._items[i];
                item.updateRoom(data);
            }
        }
    }

    export class RouteItemBase extends cui.Component {
        public skZPL: RouteCom;
        public skDL: RouteCom;
        public skDYZL: RouteCom;
        public skXL: RouteCom;
        public skXQL: RouteCom;
        public skWin0: cui.Image;
        public skWin1: cui.Image;
        public skWin2: cui.Image;
        public skLose0: cui.Image;
        public skLose1: cui.Image;
        public skLose2: cui.Image;
        public _data: RouteModel;

        private _winStr: string;
        private _win1Str: string;
        private _win2Str: string;
        public childrenCreated() {
            super.childrenCreated();
            let self = this;
            if (self.skWin0) {
                self.skWin0.visible = false;
                self._winStr = self.skWin0.source.split("_")[0];
            }
            if (self.skWin1) {
                self.skWin1.visible = false;
                self._win1Str = self.skWin1.source.split("_")[0];
            }
            if (self.skWin2) {
                self.skWin2.visible = false;
                self._win2Str = self.skWin2.source.split("_")[0];
            }
            if (self.skLose0) self.skLose0.visible = false;
            if (self.skLose1) self.skLose1.visible = false;
            if (self.skLose2) self.skLose2.visible = false;
        }
        public init(data: game.RouteModel,haveDbRow:boolean) {
            let self = this;
            self._data = data;
            if (self.skZPL) self.skZPL.setModel(RouteTp.zhupanlu, data);
            if (self.skDL) self.skDL.setModel(RouteTp.dalu, data);
            if (self.skDYZL) self.skDYZL.setModel(RouteTp.dayanzailu, data,haveDbRow);
            if (self.skXL) self.skXL.setModel(RouteTp.xiaolu, data,haveDbRow);
            if (self.skXQL) self.skXQL.setModel(RouteTp.xiaoqianglu, data,haveDbRow);
        }
        public updateRoom(data: IRoomData) {
            let self = this;
            let forceCast = self._data.getForecast();
            if (!forceCast) {
                return;
            }
            let resultTp: GameResultTp[][] = forceCast;
            let winTp: GameResultTp[] = resultTp[0];
            let loseTp: GameResultTp[] = resultTp[1];
            if (winTp[0] > 0) {
                self.skWin0.visible = true;
                self.skWin0.source = self._winStr + "_" + winTp[0];
            }
            if (winTp[1] > 0) {
                self.skWin1.visible = true;
                self.skWin1.source = self._win1Str + "_" + winTp[1];
            }
            if (winTp[2] > 0) {
                self.skWin2.visible = true;
                self.skWin2.source = self._win2Str + "_" + winTp[2];
            }
            if (loseTp[0] > 0) {
                self.skLose0.visible = true;
                self.skLose0.source = self._winStr + "_" + loseTp[0];
            }
            if (loseTp[1] > 0) {
                self.skLose1.visible = true;
                self.skLose1.source = self._win1Str + "_" + loseTp[1];
            }
            if (loseTp[2] > 0) {
                self.skLose2.visible = true;
                self.skLose2.source = self._win2Str + "_" + loseTp[2];
            }
        }
    }


    export class RouteCom extends cui.Component {
        public itemSkinName: string;

        public skImg: cui.Image;
        public skList: cui.DataGroup;
        public skTbScroller: cui.TableScroller;
        private _mo: RouteModel;
        private _tp: RouteTp;

        private _imgLen: number;
        private _imgW: number;
        private _oldW: number;
        private _flashTag: number;
        private _flashData: { cnt: number, data: any, idx: number };

        private _itemPro: cui.ArrayCollection;

        private _haveDouble:boolean;

        private _doubleRow:boolean;

        public childrenCreated() {
            super.childrenCreated();
            let self = this;
            let list = self.skList;
            list.itemRender = RouteStateTile;
            list.itemSkinName = self.itemSkinName;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            if (self.skImg) {
                self._imgLen = self.skList.width / self.skImg.width;
                self._imgW = self.skImg.width;
                self._oldW = self.skList.width;
            }

            if (self._mo) {
                self.updateResult();
            }
        }

        public setModel(tp: RouteTp, mo: RouteModel,haveDouble:boolean = true) {
            //注册事件
            let self = this;
            self._tp = tp;
            self._doubleRow = tp == RouteTp.dayanzailu || tp == RouteTp.xiaolu || tp == RouteTp.xiaoqianglu;
            self._haveDouble = haveDouble ;
            self._mo = mo;
            mo.addListener(RouteMo_EVT.DATA_CHANGE, self.updateResult, self);
            mo.addListener(RouteMo_EVT.DATA_UPDATE, function () {
                self.updateResult(true);
            }, self);

            if (self._inited) self.updateResult();
        }

        private updateResult(noclear?: boolean) {
            let self = this;
            let tp = self._tp;
            let routeList = self._mo.getRouteData(tp);
            let itemPro = self._itemPro;
            let len = routeList.length;
            let notInit = itemPro.source.length > 0;
            if (notInit) {
                if (!self._flashTag) {
                    self._flashTag = TRain.core.addFrameDo(self.updateTile, self, false, 300);
                }
                else {
                    self.endFlash();
                }
                let lastIdx = self._mo.getRouteLastIdx( tp );
                self._flashData = { idx: lastIdx, data: routeList[lastIdx], cnt: 0 };
            }

            let tmpRouteList:IGameResult[];
            if( self._doubleRow && self._haveDouble){
                let rowCnt = Math.ceil( len/RouteConst.maxRow );
                if( rowCnt%2 != 0 ){
                    tmpRouteList = routeList.slice(0);
                    tmpRouteList[rowCnt*RouteConst.maxRow] = null;
                    len = tmpRouteList.length;
                }
            }

            // if (!noclear) {
            itemPro.source = tmpRouteList || routeList.slice(0);
            // } 
            // else {
            //     for (let i = itemPro.source.length; i < len; i++) {
            //         itemPro.addItem(routeList[i]);        
            //     }
            // }

            self.skTbScroller.showTableInViewStart(itemPro.source.length - 1, false);
            let addLen:number = tp == RouteTp.dalu ? 15 : 10;
            if (self.skImg) {
                let tmpLen = routeList.length / colTp.six;
                if (tmpLen <= self._imgLen) {
                    self.skImg.width = self.skList.width + self._imgW * addLen;
                } else {
                    let delLen: number = Math.ceil(tmpLen - (self._oldW / self._imgW));
                    self.skImg.width = self._oldW + self._imgW * (delLen+addLen);
                    self._oldW = self.skImg.width;
                }
            }
        }

        private updateTile() {
            let self = this;
            let flashData = self._flashData;
            flashData.cnt++;
            if (flashData.cnt > 10) {
                self.endFlash();
            } else {
                let itemPro = self._itemPro;
                let idx = flashData.idx;
                itemPro.source[idx] = itemPro.getItemAt(idx) ? null : flashData.data;
                itemPro.updateItemAt(idx);
            }
        }

        private endFlash() {
            let self = this;
            let flashData = self._flashData;
            TRain.core.rmvFrameDoById(self._flashTag);
            self._flashTag = 0;
            let itemPro = self._itemPro;
            let idx = flashData.idx;
            itemPro.source[idx] = flashData.data;
            itemPro.updateItemAt(idx);
        }

        public dispose() {

            let self = this;
            if (self._flashTag)
                TRain.core.rmvFrameDoById(self._flashTag);

            if (self._mo) self._mo.rmvAllListener(self);

            super.dispose();
        }
    }

}
