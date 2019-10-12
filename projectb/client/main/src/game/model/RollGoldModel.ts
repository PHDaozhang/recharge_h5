module game {
    export class RollGoldModel {
        //多少个下注区域
        private _betAreaNum: number;
        //各个下注区域金额
        private _goldList: number[];
        private _goldList2: number[];
        //每次间隔时间
        private _time: number;
        //间隔次数
        private _gapNum: number;
        private _isBit: boolean;
        private _isNeedYuan: boolean;

        public constructor() {
            let self = this;
            self._time = 50;
            self._gapNum = 5;
        }

        public init(betAreaNum: number, isBit: boolean, isNeedYuan: boolean) {
            let self = this;
            self._betAreaNum = betAreaNum;
            self._goldList = [];
            for (let i = 0; i < betAreaNum; i++) {
                self._goldList.push(0);
            }
            self._goldList2 = [];
            for (let i = 0; i < betAreaNum; i++) {
                self._goldList2.push(0);
            }
            self._isBit = isBit;
            self._isNeedYuan = isNeedYuan;
        }

        public initGold(gold: number[]) {
            let self = this;
            self._goldList = gold.concat();
            self._goldList2 = gold.concat();
        }

        public reset() {
            let self = this;
            self._goldList = [];
            for (let i = 0; i < self._betAreaNum; i++) {
                self._goldList.push(0);
            }
            self._goldList2 = [];
            for (let i = 0; i < self._betAreaNum; i++) {
                self._goldList2.push(0);
            }
        }

        /**
         * @param index 0~x 
         * @param gold 没有/100  就是差值
         */
        public setCurGold(index: number, gold: number, target: any, thisObj: any, flag: number) {
            let self = this;
            if (gold <= 0) {
                return;
            }
            // if (self._goldList[index] < self._goldList2[index]) {
            //     self._goldList[index] = self._goldList2[index];
            //     self.setData(self._goldList[index], index);
            // }
            self._goldList2[index] = self._goldList[index] + gold;//实际增加一次的最终值
            let goldNum = Math.floor(gold / self._gapNum);
            for (let i = 0; i < self._gapNum; i++) {
                self._goldList[index] += goldNum;
                let value = 0;
                if (i == self._gapNum - 1) {
                    if (self._goldList[index] != self._goldList2[index]) {
                        value = self._goldList2[index];
                    } else {
                        value = self._goldList[index];
                    }
                } else {
                    value = self._goldList[index];
                }
                let num = TRain.core.addDelayDo(function () {
                    target.text = self.setData(value, index);
                    TRain.core.rmvDelayDoByID(num);
                }, thisObj, self._time * i, flag);
            }
        }

        private setData(gold: number, index: number): string {
            let self = this;
            let name = !self._isBit ? TRain.langMgr.getTxt(LangGrp.mainLang + "", langConsts.mainLang.RMBText) : moneyTp.y;
            if (!self._isNeedYuan) name = "";
            return Math.floor(DataFormat.convertGold(gold)).toString() + name;
        }
    }

    export const rollGoldMgr = new RollGoldModel;
}