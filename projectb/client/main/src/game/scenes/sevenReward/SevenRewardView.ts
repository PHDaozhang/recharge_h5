module game {
    var colorMatrix = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);//黑白矩阵

    export const enum GameClass {
        fish = 3,
    }

    export class SevenRewardView extends UIFullFW {
        public skBtnReturn: cui.ScaleButton;
        public skBtnGet: cui.ScaleButton;
        public skImgGold0: cui.Image;
        public skLabDesc0: cui.Label;
        public skBtnGoto0: cui.ScaleButton;
        public skImgDown0: cui.Image;
        public skPb0: cui.ProgressBar;
        public skLabPer0: cui.Label;
        public skImgGold1: cui.Image;
        public skLabDesc1: cui.Label;
        public skBtnGoto1: cui.ScaleButton;
        public skImgDown1: cui.Image;
        public skPb1: cui.ProgressBar;
        public skLabPer1: cui.Label;
        public skImgBG0: cui.Image;
        public skImgDay0: cui.Image;
        public skImgSelect0: cui.Image;
        public skImgBG1: cui.Image;
        public skImgDay1: cui.Image;
        public skImgSelect1: cui.Image;
        public skImgBG2: cui.Image;
        public skImgDay2: cui.Image;
        public skImgSelect2: cui.Image;
        public skImgBG3: cui.Image;
        public skImgDay3: cui.Image;
        public skImgSelect3: cui.Image;
        public skImgBG4: cui.Image;
        public skImgDay4: cui.Image;
        public skImgSelect4: cui.Image;
        public skImgBG5: cui.Image;
        public skImgDay5: cui.Image;
        public skImgSelect5: cui.Image;
        public skImgBG6: cui.Image;
        public skImgDay6: cui.Image;
        public skImgSelect6: cui.Image;
        public skBitAll: cui.BitmapLabel;
        public skBitSing: cui.BitmapLabel;
        public rmv_qiri: cui.Image;
        public skGrp0: cui.Group;
        public skGrp1: cui.Group;
        public skGrp2: cui.Group;
        public skGrp3: cui.Group;
        public skGrp4: cui.Group;
        public skGrp5: cui.Group;
        public skGrp6: cui.Group;
        public skLabTip: cui.Label;
        public skGrp: cui.Group;
        public skImgHas: cui.Image;
        public skBtn: cui.ScaleButton;
        public skLabToday: cui.Label;

        //对应任务的id
        private _taskIndex: number;
        //对应任务的完成计数
        private _completeCount: number;
        private _gameTag: number;

        public constructor() {
            super();
            let self = this;
            self.skinName = "SevenRewardSkin";
            self._taskIndex = 0;
            self._completeCount = 0;
            self._gameTag = TRain.actionMgr.getUnitTag();
        }

        public childrenCreated(): void {
            super.childrenCreated();
            let self = this;
            self.regHandle();
            self.skBtnReturn.setTarget(function () {
                GameUtil.playClickSound();
                let gameid = dataMgr.accMo.gameId;
                if (isNaN(gameid) || gameid == 0) {
                    gameScene.goHome();
                } else {
                    gameScene.goBack();
                }
                self.close();
            }, self);
            self.skBtnGet.setTarget(function () {
                GameUtil.playClickSound();
                let list = dataMgr.generalMo.getTaskByDay(dataMgr.generalMo.curDay);
                dataMgr.generalMo.sendGetQuestReward(list[0].cfg.id);
            }, self);
            // for (let i = 0; i < 7; i++) {
            //     self["skGrp" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //         if (i + 1 <= dataMgr.generalMo.curDay) {
            //             for (let j = 0; j < 7; j++) {
            //                 self["skImgSelect" + j].visible = false;
            //             }
            //             self["skImgSelect" + i].visible = true;
            //             self.updateTask(i + 1);
            //         }
            //     }, self);
            // }
            self.skLabToday.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt(game.LangGrp.mainLang, langConsts.mainLang.todayCanGet), game.DataFormat.convertGold(dataMgr.generalMo.getTaskByDay(dataMgr.generalMo.curDay)[0].cfg.awardItemCount)));
            self.updateInfo();
            // self.skBtn.visible = true;
            // self.skBtn.setTarget(function () {
            //     self.fallGoldAni();
            // }, self);
        }

        private updateInfo(): void {
            let self = this;
            self.skBitAll.text = DataFormat.convertYuanString2(dataMgr.generalMo.getAllGold());
            self.updateTask(dataMgr.generalMo.curDay);
            for (let j = 0; j < 7; j++) {
                if (j + 1 > dataMgr.generalMo.curDay) {
                    //未开启的
                    self["skImgBG" + j].source = "sevenReward@pic_qiri_tianshudi_g";
                    self["skImgDay" + j].source = "sevenReward@txt_qiri_day" + (j + 1) + "_g";
                } else {
                    self["skImgBG" + j].source = "sevenReward@pic_qiri_tianshudi";
                    self["skImgDay" + j].source = "sevenReward@txt_qiri_day" + (j + 1);
                }
                if (j + 1 == dataMgr.generalMo.curDay) {
                    self["skImgSelect" + j].visible = true;
                }
            }
            self.skLabTip.textFlow = cui.htmlParser.parse(StringUtil.printf(TRain.langMgr.getTxt("mainLang", langConsts.mainLang.SevenDayRest), DataFormat.convertGold(dataMgr.generalMo.getRestReward())));
        }

        private updateTask(day?: number): void {
            let self = this;
            let list = dataMgr.generalMo.getTaskByDay(day);
            if (!list || list.length == 0) {
                return;
            }
            // self.skBitSing.text = DataFormat.convertYuanString2(list[0].cfg.awardItemCount);
            if (list[0].count >= list[0].cfg.completeCount
                && list[1].count >= list[1].cfg.completeCount
                && list[0].received
                && list[1].received) {
                self.skBitSing.text = DataFormat.convertYuanString2(dataMgr.generalMo.getRestReward());
            } else {
                self.skBitSing.text = DataFormat.convertYuanString2(dataMgr.generalMo.getRestReward() + list[0].cfg.awardItemCount);
            }
            let isDown = true;
            if (list[0].received) {
                self.showTalk();
                isDown = false;
            }
            for (let i = 0; i < 2; i++) {
                let vo = list[i];
                if (!vo.cfg.gameID) {
                    self._taskIndex = i;
                    self._completeCount = vo.cfg.completeCount;
                }
                self["skImgGold" + i].source = vo.cfg.icon1;
                if (vo.received) {
                    //已领取
                    // self["skImgGold" + i].source = "sevenReward@icon_qiri_renwu17";
                    self["skImgDown" + i].visible = true;
                    self["skBtnGoto" + i].visible = false;
                } else {
                    // self["skImgGold" + i].source = "sevenReward@icon_qiri_renwu18";
                    if (vo.count >= vo.cfg.completeCount) {
                        //已完成
                        self["skImgDown" + i].visible = true;
                        self["skBtnGoto" + i].visible = false;
                    } else {
                        //未完成
                        self["skImgDown" + i].visible = false;
                        // self["skBtnGoto" + i].visible = true;
                        let goto = self["skBtnGoto" + i] as cui.ScaleButton;
                        let gameid = dataMgr.accMo.gameId;
                        if (isNaN(gameid) || gameid == 0) {
                            goto.visible = true;
                        } else {
                            goto.visible = false;
                        }
                        goto.setTarget(function () {
                            if (vo.cfg.id >= 3015 && vo.cfg.id <= 3028) {
                                //通用任务
                                gameScene.goHome();
                                self.close();
                            } else if (!vo.cfg.gameID || vo.cfg.gameID.length == 0) {
                                //微信分享
                                dataMgr.generalMo.setTaskByDay(i, day);
                                let index = self._taskIndex;
                                dataMgr.generalMo.sendWXshareTask();
                                let count = self._completeCount;
                                let myCount = vo.count;
                                if (vo.cfg.Style == 2) {
                                    count = DataFormat.convertGold(count);
                                    myCount = DataFormat.convertGold(vo.count);
                                }
                                self["skLabPer" + index].text = myCount + "/" + count;
                                self["skPb" + index].value = myCount / count;
                                if (myCount == count) {
                                    self["skBtnGoto" + index].visible = false;
                                    self["skImgDown" + index].visible = true;
                                }
                                self["skLabPer" + index].textColor = 0x99e815;
                                if (vo.count >= count) {
                                    self.updateTask(dataMgr.generalMo.curDay);
                                }
                            } else if (vo.cfg.gameID.length > 1) {
                                //对应多个游戏
                                if (vo.cfg.gameID.indexOf(confConsts.GameTp.jinchanbuyu) >= 0) {
                                    gameScene.goHome();
                                    game.dataMgr.generalMo.showGameClass(GameClass.fish);
                                    self.close();
                                }
                            } else {
                                gameScene.startGame(vo.cfg.gameID[0]);
                                self.close();
                            }
                        }, self);
                        isDown = false;
                    }
                }
                self["skLabDesc" + i].textFlow = cui.htmlParser.parse(vo.cfg.desc);
                if (vo.cfg.Style == 2) {
                    self["skLabPer" + i].text = DataFormat.convertGold(vo.count) + "/" + DataFormat.convertGold(vo.cfg.completeCount);
                    self["skLabPer" + i].textColor = DataFormat.convertGold(vo.count) == DataFormat.convertGold(vo.cfg.completeCount) ? 0x99e815 : 0xff9000;
                } else {
                    self["skLabPer" + i].text = vo.count + "/" + vo.cfg.completeCount;
                    self["skLabPer" + i].textColor = vo.count == vo.cfg.completeCount ? 0x99e815 : 0xff9000;
                }
                self["skPb" + i].value = vo.count / vo.cfg.completeCount;
            }
            if (list[0].received) {
                self.skImgHas.visible = true;
                self.skBtnGet.visible = false;
            } else {
                self.skImgHas.visible = false;
                self.skBtnGet.visible = true;
                if (day == dataMgr.generalMo.curDay && isDown) {
                    self.skBtnGet.enabled = true;
                    self.skBtnGet.filters = undefined;
                } else {
                    self.skBtnGet.enabled = false;
                    self.skBtnGet.filters = [colorFlilter];
                }
            }
        }

        //掉金币动画
        private fallGoldAni() {
            let self = this;
            //金币数量
            let count = 40;
            let duration = 800;
            for (let i = 0; i < count; i++) {
                let db = new game.UIDBAni();
                // let db = new cui.Image("chip@10");
                db.dbNm = confConsts.ComDbTp.sgjGoldTurn + "";
                db.x = Math.floor(self.stage.stageWidth * Math.random());
                db.y = Math.floor(-800 * Math.random());
                let dur = Math.floor(duration * Math.random()) + 800;
                self.addChild(db);
                db.gotoAndPlay(confConsts.DbNameTp.sgjGold + "", 0, 5);
                game.UIUtils.move(db, { y: self.stage.stageHeight }, undefined, dur, undefined, function () {
                    if (db && self.$children.indexOf(db) >= 0) {
                        self.removeChild(db);
                        db.dispose();
                    }
                }, self._gameTag);
            }
        }

        private showTalk(): void {
            let self = this;
            game.UIUtils.move(self.skGrp, { scaleX: 1, scaleY: 1 }, undefined, 500, undefined, undefined, self._gameTag);
        }

        public regHandle() {
            let self = this;
            dataMgr.generalMo.addListener(General_EVT.GetQuestReward + "", function () {
                self.fallGoldAni();
                self.updateInfo();
            }, self);
        }

        // public onHide() {
        //     let self = this;
        //     for (let temp of self.$children) {
        //         if (temp instanceof game.UIDBAni) {
        //             if (self.$children.indexOf(temp) >= 0 && temp) {
        //                 // temp.dispose();
        //                 self.removeChild(temp);
        //             }
        //         }
        //     }
        //     super.onHide();
        // }

        public onDispose() {
            let self = this;
            dataMgr.generalMo.rmvListener(General_EVT.GetQuestReward + "", self);
            TRain.actionMgr.rmvActsByTag(self._gameTag);
            for (let temp of self.$children) {
                if (temp instanceof game.UIDBAni) {
                    if (temp && self.$children.indexOf(temp) >= 0) {
                        self.removeChild(temp);
                        temp.dispose();
                    }
                }
            }
            super.onDispose();
        }
    }
}