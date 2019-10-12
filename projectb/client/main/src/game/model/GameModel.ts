module game {
    export interface IGameModule {
        init(): void;
        start(data): void;
        end(): void;
        onReConnect(): void;
        close(): void;
    }

    export type GmdInfo = {
        id: number;
        conf: GmdConf;
        inited: boolean;
        gm?: IGameModule;
        data?: any;
        theme?: boolean;
        res?: boolean;
        gp?: boolean;
        ver?: boolean;
        jsVer?: string;
    }

    const enum GMDStrConst {
        GMD_HEAD = "GMD_"
    }

    export const enum GameMo_EVT {
        start_fin = "fin" //param1 err 
    }

    export class GameModel extends DataModel {
        //public path:string;//游戏目录

        private _gmdConf: { [key: string]: GmdConf };
        private _gmdList: { [key: string]: GmdInfo };

        private _curGMD: GmdInfo = null;

        protected _data: NET_CONF.msg_game_info[];       //服务器数据存储

        constructor() {
            super();

            let self = this;
            self._gmdList = {};
            self.confNm = "conf";
        }

        public onLoadConf(data: any): void {
            let self = this;
            self.confLoaded = true;
            self._gmdConf = data.gmd;
        }

        public getGmdConf(gid: confConsts.GameTp): GmdConf {
            return this._gmdConf[gid];
        }

        public getData(): NET_CONF.msg_game_info[] {
            return this._data;
        }

        public getCurGMD(): GmdInfo {
            return this._curGMD;
        }

        public startGMD(gameId: confConsts.GameTp, data?: any): boolean {
            let self = this;
            if (self._curGMD) {
                //"还有模块没结束"
                self.postEvent(GameMo_EVT.start_fin, "curr gmd not finish");
                return;
            }

            let gmdConf = self._gmdConf[gameId];
            if (!gmdConf) {
                self.postEvent(GameMo_EVT.start_fin, "gmdConf not find, gameId=" + gameId);
                return;
            }

            let gmdInfo = self._gmdList[gameId];
            if (!gmdInfo) {
                gmdInfo = self._gmdList[gameId] = { id: gameId, conf: gmdConf, inited: false };
                let gmdNm = GMDStrConst.GMD_HEAD + gmdConf.file;
                gmdInfo.gm = URLUtil.getGlobal(gmdNm);
            }

            gmdInfo.data = data;

            let fileNm = gmdConf.file;
            self._curGMD = gmdInfo;
            if (DEBUG) {
                (RES.getVersionController() as TRain.WebVerController).addHome(fileNm,fileNm);
                gmdInfo.ver = true;
                self.loadGMD(gmdInfo);
            }
            else {
                ResManager.loadVer(fileNm, function (succ: boolean, jsVer?: string) {
                    if (succ) {
                        gmdInfo.ver = true;
                        gmdInfo.jsVer = jsVer;
                        self.loadGMD(gmdInfo);
                    }
                    else {
                        self.onLoadErr(gmdInfo, "curr gmd load ver fail");
                    }
                }, self, true);
            }
        }

        //
        public closeGMD(): void {
            let curGMD = this._curGMD;
            if (curGMD) {
                let gameId = curGMD.id;
                TRain.core.rmvDelayDoByFlag(gameId);
                TRain.actionMgr.rmvActsByTag(gameId);

                TRain.UITheme.setCurGp(null);
                dataMgr.accMo.gameId = 0;

                this._curGMD = null;

                curGMD.gm.close();
            }
        }

        private onLoadErr(gmdInfo: GmdInfo, err: string): void {
            let self = this;
            if (gmdInfo == self._curGMD) {
                self._curGMD = null;
                self.postEvent(GameMo_EVT.start_fin, err);
            }
        }

        //-------------------------------------------------- load ------------------------------------------------
        private loadGMD(curGMD: GmdInfo): void {
            let self = this;
            if (!curGMD.gm) {
                self.loadJs(curGMD);
            }

            let fileNm = curGMD.conf.file;
            if (!curGMD.res) {
                ResManager.loadRes(fileNm, function (succ: boolean) {
                    if (succ) {
                        curGMD.res = true;
                        self.tryLoadFin();
                    }
                    else {
                        self.onLoadErr(curGMD, "GMD resource load fail name=" + fileNm);
                    }
                }, self);
            }
            if (!curGMD.theme) {
                ResManager.loadTheme(fileNm, function (succ: boolean) {
                    if (succ) {
                        curGMD.theme = true;
                        self.tryLoadFin();
                    }
                    else {
                        self.onLoadErr(curGMD, "GMD theme load fail name=" + fileNm);
                    }
                }, self, fileNm);
            }
            self.tryLoadFin();
        }

        private loadJs(curGMD: GmdInfo): void {
            let self = this;
            let gmdConf = curGMD.conf;

            let fileNm = gmdConf.file;
            let homeUrl = (RES.getVersionController() as TRain.WebVerController).getHome(fileNm);
            let srcPath: string = homeUrl + fileNm;
            if (curGMD.jsVer) {
                srcPath += "_" + curGMD.jsVer;
            }
            URLUtil.loadScript(srcPath + ".js", function () {
                let gmdNm = GMDStrConst.GMD_HEAD + gmdConf.file;
                let gm = URLUtil.getGlobal(gmdNm);
                if (gm) {
                    curGMD.gm = gm;
                    self.tryLoadFin();
                }
                else {
                    self.onLoadErr(curGMD, "GMD object not find name=" + gmdConf.file);
                }
            })
        }

        private tryLoadFin(): void {
            let self = this;
            let curGMD = self._curGMD;
            if (curGMD && curGMD.gm && curGMD.res && curGMD.theme && curGMD.ver) {
                if (!curGMD.gp) {
                    ResManager.loadGroup(curGMD.conf.file, function () {
                        curGMD.gp = true;
                        self.loadFin();
                    }, self)
                }
                else {
                    self.loadFin();
                }
            }
        }

        private loadFin(): void {
            let self = this;
            let curGMD = self._curGMD;
            if (curGMD && curGMD.gp) {
                let gmdConf = curGMD.conf;
                dataMgr.accMo.gameId = gmdConf.id;

                if (!curGMD.inited) {
                    curGMD.gm.init();
                    curGMD.inited = true;
                }

                TRain.UITheme.setCurGp(gmdConf.file);
                curGMD.gm.start(curGMD.data);
                self.postEvent(GameMo_EVT.start_fin);
            }
        }
    }
}