module game {
    export let goldMgr: GoldMange;

    export type PlayerDatas = { player_id: number }[];
    export type betDatas = { bet_golds: number, master_bets?: master_bets }[];
    export type master_bets = { player_id: number, player_bets: number }[];

    export class GoldMange {
        private _particleWrapper: TRain.AniWrapper;
        private _parent: cui.BaseContainer;
        private _plyData: PlayerDatas;
        private _flyState = [];
        private _startPos: cui.IPointData;
        private _endPosArr = [];

        private _firData = [];
        private _secData = [];

        private _othFirGold = [];
        private _othSecGold = [];

        private _areaNum: number = 0;
        private _spcNum: number = -1;
        private _isFly: boolean = false;
        constructor() {
            let self = this;
            self._firData = [];
            self._secData = [];
            self._othFirGold = [];
            self._othSecGold = [];
            self._isFly = false;
        }

        public setParent(parent: cui.BaseContainer) {
            let self = this;
            self._parent = parent;
            self._endPosArr = [];
            //parent.touchThrough = false;
            parent.touchEnabled = false;
        }

        public setAreaNum(num: number, spcNum?: number) {
            let self = this;
            self._areaNum = num;
            self._spcNum = spcNum;
        }

        public initData(data: PlayerDatas) {
            let self = this;
            self._plyData = data;
            for (let i = 0; i < self._areaNum; i++) {
                self._flyState[i] = -1;
                self._othFirGold[i] = 0;
                self._othSecGold[i] = 0;
            }
            self._isFly = false;
            self._firData = [];
            self._secData = [];
            for (let i = 0; i < 6; i++) {
                let tempArr = [];
                for (let j = 0; j < self._areaNum; j++) {
                    tempArr.push(0);
                }
                self._firData.push(tempArr);
                self._secData.push(tempArr);
            }
        }

        public setStartPoint(point: cui.IPointData) {
            this._startPos = point;
        }

        public addEndPoint(point: cui.IPointData[]) {
            let self = this;
            self._endPosArr = point;
        }

        private getOtherGold(betDate: betDatas) {
            let sixGold = [];
            let otherGold = [];
            for (let j = 0; j < betDate.length; j++) {
                let temp = betDate[j];
                otherGold[j] = temp.bet_golds;
                sixGold[j] = 0;
                if (temp.master_bets) {
                    let tempGold = 0;
                    for (let k = 0; k < temp.master_bets.length; k++) {
                        let masterBet = temp.master_bets[k];
                        tempGold += masterBet.player_bets;
                    }
                    sixGold[j] = tempGold;
                }
            }

            for (let i = 0; i < otherGold.length; i++) {
                otherGold[i] = otherGold[i] - sixGold[i];
            }

            return otherGold;
        }

        private getSixGold(plyData: PlayerDatas, betData: betDatas) {
            let self = this;
            let sixGold = [];
            for (let i = 0; i < 6; i++) {
                let tempArr = [];
                for (let j = 0; j < self._areaNum; j++) {
                    tempArr.push(0);
                }
                sixGold.push(tempArr);
            }

            for (let i = 0; i < 6; i++) {
                let ply = plyData[i];
                for (let j = 0; j < betData.length; j++) {
                    let tempBet = betData[j];
                    if (tempBet.master_bets) {
                        for (let k = 0; k < tempBet.master_bets.length; k++) {
                            if (ply.player_id == tempBet.master_bets[k].player_id) {
                                sixGold[i][j] = tempBet.master_bets[k].player_bets;
                            }
                        }
                    }
                }
            }
            return sixGold;
        }

        public getGold(betData: betDatas) {
            let self = this;
            if (self._plyData) {
                let plyDate = self._plyData;
                let otherGold = self.getOtherGold(betData);

                for (let i = 0; i < betData.length; i++) {
                    let bet = betData[i];
                    if (bet.master_bets) {
                        for (let j = 0; j < bet.master_bets.length; j++) {
                            if (plyDate[0].player_id == bet.master_bets[j].player_id && self._flyState[i] == -1) {
                                self._flyState[i] = 0;
                            }
                        }
                    }
                }

                self._othFirGold = otherGold;
                let tempOther = [];
                for (let i = 0; i < self._othFirGold.length; i++) {
                    tempOther[i] = self._othFirGold[i] - self._othSecGold[i];
                    self._othSecGold[i] = self._othFirGold[i];
                }

                let tempSix = [];
                for (let i = 0; i < 6; i++) {
                    let tempArr = [];
                    for (let j = 0; j < self._areaNum; j++) {
                        tempArr.push(0);
                    }
                    tempSix.push(tempArr);
                }
                let sixs = self.getSixGold(plyDate, betData);
                self._firData = sixs;
                for (let i = 0; i < 6; i++) {
                    let tempnum = 0;
                    if(self._spcNum > 0){
                        tempnum = self._spcNum;
                    }else {
                        tempnum = self._areaNum;
                    }
                    for (let j = 0; j < tempnum; j++) {
                        let temp = self._firData[i][j] - self._secData[i][j];
                        tempSix[i][j] = temp;
                        self._secData[i][j] = self._firData[i][j];
                        if (i == 0 && temp > 0 || self._flyState[j] == 0) {
                            if (self._isFly == false) {
                                self._flyState[j] = 1;
                                self._isFly = true;
                                let endP: cui.IPointData = { x: self._endPosArr[j].x + 14, y: self._endPosArr[j].y + 14 };
                                self.flyStar(endP, function () {
                                    self._isFly = false;
                                    let img = new cui.Image();
                                    img.source = confConsts.ComResTp.xing;
                                    self._parent.addChild(img);
                                    img.x = self._endPosArr[j].x;
                                    img.y = self._endPosArr[j].y;
                                });
                                TRain.soundMgr.playSFX(<any>confConsts.SoundTp.jiesuan2);
                            }
                        }
                    }
                }

                let GoldArr = { other: tempOther, six: tempSix };
                return GoldArr;
            }
        }

        private flyStar(toArea, fin?: Function, tar?: any) {
            let self = this;
            let wrapper = self._particleWrapper;
            if (!wrapper) {
                wrapper = self._particleWrapper = TRain.WrapperMgr.getWrapper();
                let ani = new game.StarParticleAni(self._parent);
                wrapper.ani = ani;
            }
            wrapper.stop();
            wrapper.ani.setData(self._startPos, toArea);
            wrapper.start(fin, tar);
        }

        public reset() {
            let self = this;
            self.clear();
            self._firData = [];
            self._secData = [];
            self._othFirGold = [];
            self._othSecGold = [];
            if (self._particleWrapper) {
                TRain.WrapperMgr.freeWrapper(self._particleWrapper);
                self._particleWrapper = undefined;
            }
        }

        public clear(): void {
            let self = this;
            let parent = self._parent;
            if (parent) parent.removeChildren();
            for (let i = 0; i < self._areaNum; i++) {
                self._flyState[i] = -1;
            }
        }
    }
}