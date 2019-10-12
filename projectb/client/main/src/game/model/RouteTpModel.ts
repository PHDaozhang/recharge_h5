module game {

    export const enum RouteTpMo_EVT {
        DATA_CHANGE = "d_change"
    }

    export class RouteTpModel extends RouteModel {
        public data2Zhupanlu: (data: any, tp: number) => IGameResult;

        private _tpCnt: number;

        private _zpls: IGameResult[][];

        //取 类型结果 从0开始取
        constructor(tpCnt: number) {
            super()

            let self = this;
            let zpls = self._zpls = [];
            self._tpCnt = tpCnt;
            if (tpCnt > RouteTp.max) {
                let tmps = self._tmps;
                let routes = self._routes;
                for (let i = RouteTp.max; i < tpCnt; ++i) {
                    routes.push([]);
                    tmps.push([]);
                }
            }

            for (let i = 0; i < tpCnt; ++i) {
                zpls.push([]);
            }
        }

        public get historys(): any[] {
            return this._historys;
        }

        //设置 将会重置数据
        public set historys(data: any[]) {
            let self = this;
            self._historys = data;

            let tmps = self._tmps;
            let routes = self._routes;
            for (let i = 0, len = self._tpCnt; i <= len; ++i) {
                self.freeArrs(tmps[i]);
                routes[i].length = 0;
            }

            self._handHistory(0, true);

            self.delayPostEvent(RouteMo_EVT.DATA_CHANGE, 0);
        }

        public getForecast() {
            return null;
        }

        //----------------------------------------------------------------------
        protected _handHistory(stIdx: number, resetSub?: boolean) {
            let self = this;

            let historys = self._historys;

            let routes = self._routes;
            let zpls = self._zpls;
            let tmps = self._tmps;
            let lastIdxs = self._lastIdxs;
            let doFun = self.data2Zhupanlu;
            let tpCnt = self._tpCnt;
            let historyLen = historys.length;
            for (let tp = 0; tp < tpCnt; ++tp) {
                let zplTmp = zpls[tp];
                let zplStIdx = zplTmp.length;
                for (let i = stIdx; i < historyLen; i++) {
                    zplTmp.push(doFun(historys[i], tp));
                }

                let daluTmp = tmps[tp];
                let oldCol = daluTmp.length;
                let oldRow = 0;
                if (oldCol > 0) {
                    oldCol--;
                    oldRow = daluTmp[oldCol].length;
                }

                self.zpl2Dalu(zplTmp, zplStIdx, daluTmp);
                let ret: IGameResult[] = routes[tp];
                if (resetSub) {
                    oldCol = 0;
                    oldRow = 0;
                    ret.length = 0;
                }

                lastIdxs[tp] = self.two2one(daluTmp, ret, oldCol, oldRow);
            }
        }

        protected shiftHistory(cnt: number) {
            let self = this;
            let historys = self._historys;

            historys.splice(0, cnt);

            let zpls = self._zpls;
            let tmps = self._tmps;
            for (let i = 0, len = self._tpCnt; i < len; ++i) {
                zpls[i].splice(0, cnt);
                let list = tmps[i];
                let tmpCnt = cnt;
                while (tmpCnt > 0) {
                    let colDatas = list[0];
                    let len = colDatas.length;
                    if (len > tmpCnt) {
                        colDatas.splice(0, tmpCnt);
                        tmpCnt = 0;
                    }
                    else {
                        CacheUtil.freeArr(list.shift());
                        tmpCnt -= len;
                    }
                }
            }
        }

        //珠盘路 数据
        //tp为number  时 从1开始
        // public getRouteData(tp: RouteTp | number): IGameResult[] {
        //     return this._routes[tp - RouteTp.dong];
        // }
    }
}