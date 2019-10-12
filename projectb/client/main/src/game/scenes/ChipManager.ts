module game {
    export let chipMgr: ChipManager;
    const enum ChipConst {
        halfW = 25,
        halfH = 27,
        w = 50,
        h = 54,
    }
    export class ChipManager {
        private _parent: cui.BaseContainer;
        private _areaArr: { [key: number]: { id: number, maxCnt: number, x: number, y: number, tiles: ChipTile[], flyTiles: ChipTile[], w?: number, h?: number } };
        private _aniTag: number;

        private _chipArr: ChipTile[] = [];
        // private _maxAreaTileCnt:number;
        private _pure: boolean;

        private _flyBefore: boolean;


        constructor() {
            let self = this;
            this._areaArr = [];
            self._aniTag = TRain.actionMgr.getUnitTag();
            self._pure = false;
        }
        public setParent(p: cui.BaseContainer) {
            this._parent = p;
            p.touchThrough = true;
            p.touchEnabled = false;
        }
        public resetAreaArr() {
            let self = this;
            self.clear();
            self._areaArr = [];
        }
        /**
         * 
         * @param id 区域id
         * @param maxCnt 区域最大显示数量
         * @param x 区域的x ,转化为舞台的全局坐标
         * @param y 区域的y ,转化为舞台的全局坐标
         * @param w 区域的w
         * @param h 区域的h
         */
        public addArea(id: number, maxCnt: number, x: number, y: number, w?: number, h?: number) {
            let self = this;
            let areaArr = self._areaArr;
            let area = areaArr[id];
            if (area && (area.x != x || area.y != y)) {
                if (area.w) {
                    x += ChipConst.halfW;
                    y += ChipConst.halfH;
                }
                area.x = x;
                area.y = y;
                let tiles = area.tiles;
                let i = 0, len = tiles.length;
                for (; i < len; i++) {
                    self.freeChip(tiles[i]);
                }
                tiles.length = 0;
                tiles = area.flyTiles;
                i = 0, len = tiles.length;
                for (; i < len; i++) {
                    let tile = tiles[i];
                    TRain.actionMgr.rmvActsByTar(tile);
                    self.freeChip(tile);
                }
                tiles.length = 0;
            }
            else {
                if (w) {
                    x += ChipConst.halfW;
                    y += ChipConst.halfH;
                    w -= ChipConst.w;
                    h -= ChipConst.h;
                }
                areaArr[id] = { id: id, maxCnt: maxCnt, x: x, y: y, w: w, h: h, tiles: [], flyTiles: [] };
            }

        }

        /**
         * 
         * @param formAreaId 出发点区域id
         * @param toAreaId 到达点区域id
         * @param tm 飞行时间
         * @param data {chipId:筹码id，gold:筹码下注额,chipTp:筹码枚举，默认是通用的}
         * @param bScale 初始的大小x
         * @param sfxName 音效 
         * @param delay 延迟多久播放音效
         */
        public addChip(formAreaId: number, toAreaId: number, tm: number, data: { chipId: number, gold: number,chipTp?:string}, bScale?: number, eScale?: number, sfxName?: string,delay?:number, cb?: Function, thisObj?: any): void {
            bScale = bScale || 0.5;
            eScale = eScale || 0.55;
            delay = delay || 0;
            sfxName = sfxName || confConsts.SoundTp.jetton;
            if(delay>=0)TRain.soundMgr.playSFX(sfxName,delay);
            let self = this;
            let formArea = self._areaArr[formAreaId];
            let toArea = self._areaArr[toAreaId];

            let chip = self.getChip();
            chip.alpha = 1;
            chip.setData(data.chipId, data.gold,data.chipTp);
            chip.tag = toAreaId;
            toArea.flyTiles.push(chip);

            let parent = self._parent;
            parent.addChild(chip);
            chip.x = formArea.x;
            chip.y = formArea.y;
            chip.scaleX = chip.scaleY = bScale;
            let toPointX = toArea.x + Math.floor(Math.random() * (toArea.w || 0));
            let toPointY = toArea.y + Math.floor(Math.random() * (toArea.h || 0));

            let delaytm = Math.floor(Math.random() * 500);
            let actionDelay: TRain.Action = new TRain.Action(delaytm);
            let toProps: any = { x: toPointX, y: toPointY };
            if (bScale != eScale) {
                toProps.scaleY = toProps.scaleX = eScale;
            }

            let action = new TRain.ActionPropTo(tm, 1, toProps);
            action.setEaseFun(EaseUtil.quadOut);

            let actionCall = new TRain.ActionCallDo();
            actionCall.setCall(function () {
                self.addChipToArea(chip);
                if (cb) cb.apply(thisObj);
            }, self);

            let actionSeq = new TRain.ActionSequence([actionDelay, action, actionCall]);
            TRain.actionMgr.addAction(actionSeq, chip, false, self._aniTag);
        }
        /**
         * 
         * @param pure true 纯净模式
         */
        public setPure(pure: boolean) {
            let self = this;
            self._pure = pure;
            if (pure) {
                let parent = self._parent;
                let areaArr = self._areaArr;
                for (let key in areaArr) {
                    let tiles = areaArr[key].tiles;
                    for (let i = 0; i < tiles.length; i++) {
                        let chip = tiles[i];
                        if (chip.parent) parent.removeChild(chip);
                    }
                }
            } else {
                for (let key in self._areaArr) {
                    let tiles = self._areaArr[key].tiles;
                    for (let i = 0; i < tiles.length; i++) {
                        let chip = tiles[i];
                        chip.alpha = 1;
                        self._parent.addChild(chip);
                    }
                }
            }
        }

        public isPure(): boolean {
            return this._pure;
        }

        private addChipToArea(chip: ChipTile) {
            let self = this;
            let tag = chip.tag;
            let area = self._areaArr[tag];
            let tiles = area.tiles;
            let flyTiles = area.flyTiles;
            let idx = flyTiles.indexOf(chip);
            if (idx >= 0) flyTiles.splice(idx, 1);

            if (area.maxCnt <= tiles.length) {
                self.freeChip(tiles.shift());
            }

            tiles.push(chip);
            if (self._pure) {
                let action: TRain.Action = new TRain.ActionPropTo(500, 1, { alpha: 0 });
                let actionCall = new TRain.ActionCallDo();
                actionCall.setCall(function () {
                    if (chip.parent) chip.parent.removeChild(chip);
                }, self);
                let actionSeq = new TRain.ActionSequence([action, actionCall]);
                TRain.actionMgr.addAction(actionSeq, chip, false, self._aniTag);
            }
        }

        /**
         * 
         * @param formAreaId 出发点区域id
         * @param toAreaId 到达点区域id
         * @param flytm 飞行的总时间
         * @param isPlay 是否播放声音
         */
        public moveAll(formAreaId: number, toAreaId: number, flytm: number,isPlay:boolean = true): number {
            let self = this;
            if (!self._flyBefore) self._flyBefore = self._pure; //记录飞行前的模式
            self.setPure(false);
            let formArea = self._areaArr[formAreaId];
            let formTiles = formArea.tiles;
            self.moveChip(formTiles, toAreaId, flytm,20,confConsts.SoundTp.win_bet,isPlay);
            formTiles.length = 0;
            return flytm + 500;
        }
        /**
         * 
         * @param formAreaId 出发点区域id
         * @param toAreaIds 到达点区域ids
         * @param flytm  飞行的总时间
         * @param isPlay  是否播放声音 默认播
         */
        public moveAllMuti(formAreaId: number, toAreaIds: { id: number, wg: number }[], flytm: number,isPlay:boolean = true): number {
            let self = this;
            if (!self._flyBefore) self._flyBefore = self._pure; //记录飞行前的模式
            self.setPure(false);
            let formArea = self._areaArr[formAreaId];
            let formTotalLen = formArea.tiles.length;
            let formAllTile = formArea.tiles;
            for (let i = 0, len = toAreaIds.length; i < len; i++) {
                let toArea = toAreaIds[i];
                let toAreaId: number = toArea.id;
                let formLen = Math.floor(toArea.wg * formTotalLen);
                let formTiles = formAllTile.splice(0, formLen);
                self.moveChip(formTiles, toAreaId, flytm,20,confConsts.SoundTp.win_bet,(isPlay && i == 0));
            }
            let endLen = formAllTile.length;
            for (let j = 0; j < endLen; j++) {
                self.freeChip(formAllTile[j]);
            }
            formAllTile.length = 0;
            return flytm + 500;
        }
        private moveChip(formTiles: ChipTile[], toAreaId: number, flyTm: number, maxCnt?: number, sfxName?: string,isPlay?:boolean) {
            let self = this;
            maxCnt = maxCnt || 20;
            sfxName = sfxName || confConsts.SoundTp.win_bet;
            if(isPlay)TRain.soundMgr.playSFX(sfxName);
            let formAllLen = formTiles.length;
            let len = formAllLen > maxCnt ? maxCnt : formAllLen;
            let toArea = self._areaArr[toAreaId];
            let flyTiles = toArea.flyTiles;
            let toAreaX = toArea.x, toAreaY = toArea.y, toAreaW = toArea.w, toAreaH = toArea.h;
            let tmpX: number, tmpY: number;
            let delaytm = 0;
            for (let i = 0; i < len; i++) {
                let chip = formTiles[i];
                chip.tag = toAreaId;
                flyTiles.push(chip);
                let actionSeq = new TRain.ActionSequence();


                let actionDelay: TRain.Action = new TRain.Action(delaytm);
                actionSeq.addAction(actionDelay);
                delaytm += 16.7;
                tmpX = toAreaX;
                tmpY = toAreaY;
                if (toAreaW) {
                    tmpX += Math.floor(Math.random() * toAreaW);
                    tmpY += Math.floor(Math.random() * toAreaH);
                }

                let action: TRain.ActionPropTo = new TRain.ActionPropTo(
                    flyTm,
                    1,
                    {
                        x: tmpX,
                        y: tmpY
                    });

                action.setEaseFun(EaseUtil.quartOut);
                actionSeq.addAction(action);
                let actionCall = new TRain.ActionCallDo();
                actionCall.setCall(function () {
                    self.addChipToArea(chip);
                }, self);
                actionSeq.addAction(actionCall);
                TRain.actionMgr.addAction(actionSeq, chip, false, self._aniTag);
            }
            let m = len;
            for (; m < formAllLen; m++) {
                self.freeChip(formTiles[m]);
            }
            formTiles.length = 0;
        }
        public clear(): void {
            let self = this;
            if (self._flyBefore) {
                self._flyBefore = null;
                self.setPure(true);
            }
            let parent = self._parent;
            if (parent) parent.removeChildren();
            TRain.actionMgr.rmvActsByTag(this._aniTag);
            //回收所有筹码
            let areaArr = self._areaArr;
            for (let key in areaArr) {
                let area = areaArr[key];
                let tiles = area.tiles;
                let i = 0, len = tiles.length;
                for (; i < len; i++) {
                    self.freeChip(tiles[i]);
                }
                tiles.length = 0;
                tiles = area.flyTiles;
                i = 0, len = tiles.length;
                for (; i < len; i++) {
                    self.freeChip(tiles[i]);
                }
                tiles.length = 0;
            }
        }

        private getChip(): game.ChipTile {
            return this._chipArr.length > 0 ? this._chipArr.pop() : new ChipTile();
        }

        private freeChip(chip: game.ChipTile) {
            if (chip.parent) {
                chip.parent.removeChild(chip);
            }

            if (this._chipArr.length < 100) {
                //chip.clear();
                this._chipArr.push(chip);
            }
            else {
                chip.dispose();
            }
        }
    }
}