module game {
    export const enum GameResultTp {
        none = 0, //无
        win = 1,//庄
        lose = 2,//闲
        peace = 3,//和
        peaceSmall = 4,//和小 //骰子中豹子分大小的时候用
    }
    export interface IGameResult {
        r: GameResultTp,
        pt?: number, //点数或和局数量
    }

    //牌路类型
    export const enum RouteTp {
        zhupanlu = 0,//珠盘路
        dalu = 1,//大路
        dayanzailu = 2,//大眼仔路
        xiaolu = 3, //小路
        xiaoqianglu = 4, //小强路
        max = 5,//珠盘路
    }

    //牌路类型
    export const enum RouteConst {
        overRmvcnt = 1,//超过最大数量时删除的个数
        maxRow = 6,//最大多少行
        maxHisCnt = 100
    }

    export const enum RouteMo_EVT {
        DATA_CHANGE = "d_change",
        DATA_UPDATE = "d_update"
    }

    export class RouteModel extends Notification {
        public data2Zhupanlu: (data: any, param1?: any) => IGameResult;

        public maxHisCnt:number;
        public overRmvcnt:number;

        protected _historys: any[];
        protected _routes: IGameResult[][];
        //临时数据
        protected _tmps: IGameResult[][][];

        protected _lastIdxs:number[];

        

        constructor( maxHisCnt?:number, overRmvcnt?:number ) {
            super();

            let self = this;
            self._lastIdxs = [];
            self._historys = [];
            let tmps = self._tmps = [];
            let routes = self._routes = [];
            for (let i = 0; i < RouteTp.max; ++i) {
                routes.push([]);
                tmps.push([]);
            }

            self.maxHisCnt = maxHisCnt || RouteConst.maxHisCnt;
            self.overRmvcnt = overRmvcnt || RouteConst.overRmvcnt;
        }

        public get historys(): any[] {
            return this._historys;
        }

        //设置 将会重置数据
        public set historys(data: any[]) {
            let self = this;
            self._historys = data;

            let tmps = self._tmps;
            self.freeArrs(tmps[RouteTp.zhupanlu]);
            self.freeArrs(tmps[RouteTp.dalu]);

            let routes = self._routes;
            routes[RouteTp.zhupanlu].length = 0;
            routes[RouteTp.dalu].length = 0;

            self._handHistory(0, true);

            //self.delayPostEvent(RouteMo_EVT.DATA_CHANGE, 0);
            self.postEvent(RouteMo_EVT.DATA_CHANGE);
        }

        public addHistory(data: any) {
            let self = this;
            let historys = self._historys;
            let addCnt = 1;
            if (data instanceof Array) {
                addCnt = data.length;
                for (let i = 0; i < addCnt; ++i) {
                    historys.push(data[i]);
                }
            }
            else {
                historys.push(data);
            }

            if (historys.length > self.maxHisCnt) {
                self.shiftHistory(self.overRmvcnt);
                self._handHistory(historys.length - addCnt, true);
                self.postEvent(RouteMo_EVT.DATA_CHANGE);
            }
            else {
                self._handHistory(historys.length - addCnt);
                self.postEvent(RouteMo_EVT.DATA_UPDATE);
            }
        }

        //珠盘路 数据
        //tp为number  时 从1开始
        public getRouteData(tp: RouteTp | number): IGameResult[] {
            return this._routes[tp];
        }

        //獲取牌路最後添加的索引
        public getRouteLastIdx( tp: RouteTp | number ):number{
            return this._lastIdxs[ tp ];
        }

        public getForecast(): GameResultTp[][] {
            let self = this;
            let winResult = [GameResultTp.none, GameResultTp.none, GameResultTp.none];
            let lostResult = [GameResultTp.none, GameResultTp.none, GameResultTp.none];
            let daluTmp = self._tmps[RouteTp.dalu];
            let lastCol = daluTmp.length - 1;
            if (lastCol > 1) {
                let colDatas = daluTmp[lastCol];
                let colLen = colDatas.length;
                let lastData = colDatas[colLen - 1];
                let tmpData = { r: lastData.r };

                let firstResults: GameResultTp[], secondResults: GameResultTp[];
                if (tmpData.r == GameResultTp.win) {
                    firstResults = winResult;
                    secondResults = lostResult;
                }
                else {
                    firstResults = lostResult;
                    secondResults = winResult;
                }

                colDatas.push(tmpData);
                firstResults[0] = self.calcDYZLResult(daluTmp, lastCol, colLen);
                firstResults[1] = self.calcXLResult(daluTmp, lastCol, colLen);
                firstResults[2] = self.calcXQLResult(daluTmp, lastCol, colLen);

                tmpData.r = tmpData.r == GameResultTp.win ? GameResultTp.lose : GameResultTp.win;
                colDatas.pop();

                let freeArr = CacheUtil.getArr();
                freeArr.push(tmpData);
                daluTmp.push(freeArr);
                lastCol++;
                secondResults[0] = self.calcDYZLResult(daluTmp, lastCol, 0);
                secondResults[1] = self.calcXLResult(daluTmp, lastCol, 0);
                secondResults[2] = self.calcXQLResult(daluTmp, lastCol, 0);
                daluTmp.pop();
                CacheUtil.freeArr(freeArr);
            }
            return [winResult, lostResult];
        }

        protected freeArrs(list: IGameResult[][]): void {
            for (let col = 0, colCnt = list.length; col < colCnt; ++col) {
                let arr = list[col];
                if (arr) CacheUtil.freeArr(arr);
            }
            list.length = 0;
        }

        //----------------------------------------------------------------------
        protected _handHistory(stIdx: number, resetSub?: boolean) {
            let self = this;

            let historys = self._historys;

            let zpls = self._routes[RouteTp.zhupanlu];
            let tmpLen = zpls.length;
            let doFun = self.data2Zhupanlu;
            for (let cnt = historys.length; stIdx < cnt; stIdx++) {
                zpls.push(doFun(historys[stIdx]));
            }
            self._lastIdxs[RouteTp.zhupanlu] = zpls.length-1;
            let daluTmp = self._tmps[RouteTp.dalu];

            let oldCol = daluTmp.length;
            let oldRow = 0;
            if (oldCol > 0) {
                oldCol--;
                oldRow = daluTmp[oldCol].length;
            }

            self.zpl2Dalu(zpls, tmpLen, daluTmp);
            let ret: IGameResult[] = self._routes[RouteTp.dalu];
            if (resetSub) {
                oldCol = 0;
                oldRow = 0;
                ret.length = 0;
            }

            self._lastIdxs[RouteTp.dalu] = self.two2one(daluTmp, ret, oldCol, oldRow);

            self.calcSubs(daluTmp, resetSub, oldCol, oldRow);
        }

        protected shiftHistory(cnt: number) {
            let self = this;
            let historys = self._historys;
            let routes = self._routes[RouteTp.zhupanlu];
            let daluList = self._tmps[RouteTp.dalu];

            historys.splice(0, cnt);
            routes.splice(0, cnt);

            while (cnt > 0 && daluList.length>0) {
                let colDatas = daluList[0];
                let len = colDatas.length;
                if (len > cnt) {
                    colDatas.splice(0, cnt);
                    cnt = 0;
                }
                else {
                    CacheUtil.freeArr(daluList.shift());
                    cnt -= len;
                }
            }
        }

        protected zpl2Dalu(list: IGameResult[], stIdx: number, ret: IGameResult[][]): void {
            stIdx = stIdx || 0;
            let newColDatas: IGameResult[];
            let curTp: GameResultTp;
            let lastTp: GameResultTp;
            let lastResult: IGameResult;

            let len = ret.length;
            if (len > 0) {
                newColDatas = ret[len - 1];
                let len1 = newColDatas.length;
                lastResult = newColDatas[len1 - 1];
                lastTp = lastResult.r;
            }
            for (let i = stIdx, cnt = list.length; i < cnt; i++) {
                let result = list[i];
                curTp = result.r;
                if (curTp == GameResultTp.peace || curTp == GameResultTp.peaceSmall) {
                    if (lastResult) lastResult.pt = (lastResult.pt || 0) + 1;
                }
                else {
                    if (curTp != lastTp) {
                        newColDatas = CacheUtil.getArr();
                        ret.push(newColDatas);
                    }
                    lastResult = { r: curTp,pt:0};
                    newColDatas.push(lastResult);
                    lastTp = curTp;
                }
            }
        }

        //--------------------------------- 子路 ---------------------------------------
        protected calcSubs(daluList: IGameResult[][], reset?: boolean, stCol?: number, stRow?: number) {
            let self = this;
            if (reset) self.resetSubs();

            self.result2Sub(daluList, RouteTp.dayanzailu, stCol, stRow);
            self.result2Sub(daluList, RouteTp.xiaolu, stCol, stRow);
            self.result2Sub(daluList, RouteTp.xiaoqianglu, stCol, stRow);
        }

        protected resetSubs() {
            let self = this;
            let tmps = self._tmps;
            self.freeArrs(tmps[RouteTp.dayanzailu]);
            self.freeArrs(tmps[RouteTp.xiaolu]);
            self.freeArrs(tmps[RouteTp.xiaoqianglu]);

            let routes = self._routes;
            routes[RouteTp.dayanzailu].length = 0;
            routes[RouteTp.xiaolu].length = 0;
            routes[RouteTp.xiaoqianglu].length = 0;
        }


        protected result2Sub(list: IGameResult[][], tp: RouteTp, col?: number, row?: number) {
            let self = this;
            col = col || 0;
            let doFun: (lists: IGameResult[][], col: number, row: number) => GameResultTp = null;
            switch (tp) {
                case RouteTp.dayanzailu:
                    if (col < 1) col = 1;
                    doFun = self.calcDYZLResult;
                    break;
                case RouteTp.xiaolu:
                    doFun = self.calcXLResult;
                    if (col < 2) col = 2;
                    break;
                case RouteTp.xiaoqianglu:
                    doFun = self.calcXQLResult;
                    if (col < 3) col = 3;
                    break;
            }

            if (doFun) {
                row = row || 1;
                let colDatas = list[col];
                if (colDatas && !colDatas[row]) {
                    if (colDatas.length < row) {
                        colDatas = null;
                    }
                    else {
                        col++;
                        row = 0;
                        colDatas = list[col];
                    }
                }
                if (colDatas) {
                    let retTmp = self._tmps[tp];

                    let oldCol = retTmp.length;
                    let oldRow = 0;
                    if (oldCol > 0) {
                        oldCol--;
                        oldRow = retTmp[oldCol].length;
                    }

                    self._result2Sub(list, col, row, doFun, retTmp);
                    let ret: IGameResult[] = self._routes[tp];
                    self._lastIdxs[tp] = self.two2one(retTmp, ret, oldCol, oldRow);
                }
            }
        }

        /**
         * 
         * @param ret 处理后 值存放的 一维数组
         * @param list 待处理的二维数组
         * @param col 有， 则从指定列开始
         * @param row 有， 则从指定行开始
         * @param free 是否要回收数组  内部使用， 外部不要使用
         */
        protected two2one(list: IGameResult[][], ret: IGameResult[], col: number, row: number):number {
            let lastIdx = 0;
            for (let colCnt = list.length; col < colCnt; ++col) {
                let colDatas = list[col];
                let startIdx = col * RouteConst.maxRow;
                let returnRow = -1;
                for (let rowCnt = colDatas.length; row < rowCnt; ++row) {

                    if (returnRow < 0 && row > 0) {
                        if (row >= RouteConst.maxRow || !!ret[row + startIdx]) {
                            returnRow = row - 1;
                            if( row>RouteConst.maxRow ){
                                startIdx += (row-RouteConst.maxRow)*RouteConst.maxRow;
                                returnRow = RouteConst.maxRow - 1;
                            }
                        }
                    }

                    let tmpRow = row;
                    if (returnRow >= 0) {
                        tmpRow = returnRow;
                        startIdx += RouteConst.maxRow;
                    }

                    lastIdx = tmpRow + startIdx;
                    ret[tmpRow + startIdx] = colDatas[row];
                }
                row = 0;
            }
            return lastIdx;
        }

        protected _result2Sub(list: IGameResult[][], col: number, row: number, doFun: (lists: IGameResult[][], col: number, row: number) => GameResultTp, ret: IGameResult[][]): void {
            let colDatas: IGameResult[], newColDatas: IGameResult[];
            let curTp: GameResultTp, lastTp: GameResultTp;
            let newResult: IGameResult;

            let len = ret.length;
            if (len > 0) {
                newColDatas = ret[len - 1];
                let len1 = newColDatas.length;
                lastTp = newColDatas[len1 - 1].r;
            }
            for (let colLen = list.length; col < colLen; col++) {
                colDatas = list[col];

                for (let rowLen = colDatas.length; row < rowLen; row++) {
                    //大眼仔路
                    curTp = doFun(list, col, row);
                    if (curTp != lastTp) {
                        newColDatas = CacheUtil.getArr();
                        ret.push(newColDatas);
                    }
                    newResult = { r: curTp };
                    newColDatas.push(newResult);
                    lastTp = curTp;
                }
                row = 0;
            }
        }

        //大眼仔路
        protected calcDYZLResult(lists: IGameResult[][], col: number, row: number): GameResultTp {
            if (row > 0) {
                if (col < 1) return GameResultTp.none;

                let last1Col = lists[col - 1];
                return (last1Col[row] || !last1Col[row - 1]) ? GameResultTp.win : GameResultTp.lose;
            }
            else {
                if (col < 2) return GameResultTp.none;

                return lists[col - 1].length == lists[col - 2].length ? GameResultTp.win : GameResultTp.lose;
            }
        }
        //小路
        protected calcXLResult(lists: IGameResult[][], col: number, row: number): GameResultTp {
            if (row > 0) {
                if (col < 2) return GameResultTp.none;

                let last1Col = lists[col - 2];
                return (last1Col[row] || !last1Col[row - 1]) ? GameResultTp.win : GameResultTp.lose;
            }
            else {
                if (col < 3) return GameResultTp.none;

                return lists[col - 1].length == lists[col - 3].length ? GameResultTp.win : GameResultTp.lose;
            }
        }
        //小强路
        protected calcXQLResult(lists: IGameResult[][], col: number, row: number): GameResultTp {
            if (row > 0) {
                if (col < 3) return GameResultTp.none;

                let last1Col = lists[col - 3];
                return (last1Col[row] || !last1Col[row - 1]) ? GameResultTp.win : GameResultTp.lose;
            }
            else {
                if (col < 4) return GameResultTp.none;

                return lists[col - 1].length == lists[col - 4].length ? GameResultTp.win : GameResultTp.lose;
            }
        }
    }
}