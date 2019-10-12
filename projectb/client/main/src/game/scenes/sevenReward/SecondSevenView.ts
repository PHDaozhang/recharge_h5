module game {
    export class SecondSevenView extends cui.Component {
        public skBtn: cui.ScaleButton;
        public skPb: cui.ProgressBar;
        public skLabGame: cui.Label;
        public skLabPb: cui.Label;
        public skGrp: cui.Group;
        public skImgDone: cui.Image;

        constructor() {
            super();
            let self = this;
            self.skinName = "SecondSevenSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            //初始登陆获取任务列表info
            // dataMgr.generalMo.sendGetQuestlist(false);
            let self = this;
            self.visible = dataMgr.gameMo.getData().length > 7 ? true : false;
            let sevenDayDone = dataMgr.accMo.getVal("sevenday_done");
            if (!sevenDayDone) self.regHandle();
            self.skBtn.setTarget(function () {
                GameUtil.playClickSound();
                if (!sevenDayDone) {
                    dataMgr.generalMo.sendGetQuestlist();
                } else {
                    gameScene.openPopup(new game.LimitReward2());
                }
            }, self);
            self.updateInfo();
        }

        public updateInfo() {
            let self = this;
            self.skGrp.scaleX = self.skGrp.scaleY = 0;
            self.skImgDone.visible = (dataMgr.generalMo.isDone && dataMgr.gameMo.getData().length > 7) ? true : false;
            //设置七日奖励按钮的图标（不同子游戏图标不一样）
            // let icon = self.skBtn.icon;
            let sevenDayDone = dataMgr.accMo.getVal("sevenday_done");
            self.skBtn.icon = !!sevenDayDone ? "hall@txt_task" : "hall@txt_qiriyoujiang";
            let gameid = dataMgr.accMo.gameId;
            if (!isNaN(gameid) && gameid != 0) {
                switch (gameid) {
                    case confConsts.GameTp.jinchanbuyu:
                        self.skBtn.icon = !!sevenDayDone ? "jcby2@26" : "jcby2@16";
                        break;
                }
            }
        }

        private updateTask(vo: NET_CONF.msg_quest_info, oldCount: number) {
            let self = this;
            let id = vo.questid;
            let count = vo.count;
            let receive = vo.received;
            if (isNaN(id) && isNaN(count)) {
                return;
            }
            let list = dataMgr.generalMo.getLimitList();
            if (!list || list.length <= 0) {
                return;
            }
            let cfg = dataMgr.generalMo.getQuestByID(id);
            self.skLabGame.text = cfg.name;
            let completeCount = cfg.completeCount;
            if (cfg.Style == 2) {
                self.skLabPb.text = DataFormat.convertGold(oldCount) + "/" + DataFormat.convertGold(completeCount);
            } else {
                self.skLabPb.text = oldCount + "/" + completeCount;
            }
            self.skPb.value = oldCount / completeCount;
            if (self.skGrp.scaleX == 0 || self.skGrp.scaleY == 0) {
                self.skGrp.scaleX = self.skGrp.scaleY = 1;
                // UIUtils.move(self.skGrp, { scaleX: 1, scaleY: 1 }, undefined, 800);
            }
            let num = TRain.core.addDelayDo(function () {
                if (cfg.Style == 2) {
                    self.skLabPb.text = DataFormat.convertGold(count) + "/" + DataFormat.convertGold(completeCount);
                } else {
                    self.skLabPb.text = count + "/" + completeCount;
                }
                self.skPb.value = count / completeCount;
                TRain.core.rmvDelayDoByID(num);
            }, self, 1000);
            let num2 = TRain.core.addDelayDo(function () {
                self.skGrp.scaleX = self.skGrp.scaleY = 0;
                TRain.core.rmvDelayDoByID(num2);
            }, self, 3000);
        }

        private dealDone(isdone: boolean) {
            this.skImgDone.visible = (isdone && dataMgr.gameMo.getData().length > 7) ? true : false;
        }

        public regHandle() {
            let self = this;
            dataMgr.generalMo.addListener(General_EVT.UpdateTaskList2, self.updateTask, self);
            dataMgr.generalMo.addListener(General_EVT.IsDone, self.dealDone, self);
        }

        public dispose() {
            let self = this;
            dataMgr.generalMo.rmvListener(General_EVT.UpdateTaskList2, self);
            dataMgr.generalMo.rmvListener(General_EVT.IsDone, self);
            super.dispose();
        }
    }
}