module game {
    /**
     * doudizhu = 16,  //斗地主
		jinchanbuyu = 1,  //金蟾捕鱼
		jinshayinsha = 12,  //金鲨银鲨
		zhajinhua = 17,  //炸金花
		bjl = 5,  //百家乐
		heihongmeifang = 10,  //黑红梅方
		longhudou = 32,  //龙虎斗
		brniuniu = 4,  //百人牛牛
		robcow = 18,  //抢庄牛牛
		benchibaoma = 23,  //奔驰宝马
     */
    export class AchieveShareDialog extends UIPopup {
        public skBtnClose: cui.ScaleButton;
        public skBtnP: cui.ScaleButton;
        public skBtnW: cui.ScaleButton;
        public skBitGold: cui.BitmapLabel;
        public skBitNum: cui.BitmapLabel;
        public skImgGame: cui.Image;
        public skImgGet: cui.Image;
        public skimgKind: cui.Image;
        public skBitMoney: cui.BitmapLabel;
        public skLabMan: cui.Label;
        public skLabWoman: cui.Label;
        public skLabTip: cui.Label;
        public skerwei: cui.Base64Img;

        public constructor() {
            super();
            let self = this;
            self.skinName = "AchieveShareSkin";
            self.hCenter = self.vCenter = 0;
            self.pri = game.PopupPriority.layer1;
        }

        public childrenCreated(): void {
            super.childrenCreated();
            let self = this;
            game.UIUtils.getQRCodePly(function (data) {
                self.skerwei.source = data;
            });
            // self.createImg();
            self.skBtnClose.setTarget(function () {
                TRain.soundMgr.playSFX(confConsts.SoundTp.click + "");
                self.close();
            }, self);
            //默认分享成功
            self.skBtnP.setTarget(function () {
                TRain.soundMgr.playSFX(confConsts.SoundTp.click + "");
                dataMgr.generalMo.sendshareReward();
                self.close();
            }, self);
            self.skBtnW.setTarget(function () {
                TRain.soundMgr.playSFX(confConsts.SoundTp.click + "");
                dataMgr.generalMo.sendshareReward();
                self.close();
            }, self);
            self.updateInfo();
        }

        public updateInfo(): void {
            let self = this;
            self.skLabMan.text = TRain.langMgr.getTxt("mainLang", langConsts.mainLang.mainMan);
            self.skLabWoman.text = TRain.langMgr.getTxt("mainLang", langConsts.mainLang.mainWoman);
            self.skLabTip.text = TRain.langMgr.getTxt("mainLang", langConsts.mainLang.mainRewardTip);
        }

        protected openImpl(data: NET_CONF.s2c_notify_share): void {
            if (!data || !data.win_gold) {
                return;
            }
            let self = this;
            switch (data.game_id) {
                case confConsts.GameTp.doudizhu:
                    self.skImgGame.source = "txt_fenxiang_doudizhu";
                    break;
                case confConsts.GameTp.jinchanbuyu:
                    self.skImgGame.source = "txt_fenxiang_jinchanbuyu";
                    break;
                case confConsts.GameTp.jinshayinsha:
                    self.skImgGame.source = "txt_fenxiang_jinshayinsha";
                    break;
                case confConsts.GameTp.zhajinhua:
                    self.skImgGame.source = "txt_fenxiang_zhajinhua";
                    break;
                case confConsts.GameTp.bjl:
                    self.skImgGame.source = "txt_fenxiang_baijiale";
                    break;
                case confConsts.GameTp.heihongmeifang:
                    self.skImgGame.source = "txt_fenxiang_heihongmeifang";
                    break;
                case confConsts.GameTp.longhudou:
                    self.skImgGame.source = "txt_fenxiang_longhudou";
                    break;
                case confConsts.GameTp.brniuniu:
                    self.skImgGame.source = "txt_fenxiang_bairenniuniu";
                    break;
                case confConsts.GameTp.robcow:
                    self.skImgGame.source = "txt_fenxiang_qiangzhuangniuniu";
                    break;
                case confConsts.GameTp.benchibaoma:
                    self.skImgGame.source = "txt_fenxiang_benchibaoma";
                    break;
                case confConsts.GameTp.hhdz:
                    self.skImgGame.source = "txt_fenxiang_hongheidazhan";
                    break;
                case confConsts.GameTp.gan28:
                    self.skImgGame.source = "txt_fenxiang_erbagang";
                    break;
                case confConsts.GameTp.hlgz:
                    self.skImgGame.source = "txt_fenxiang_huanletouzi";
                    break;
                case confConsts.GameTp.dzpk:
                    self.skImgGame.source = "txt_fenxiang_dezhoupuke";
                    break;
            }
            //一把翻了     txt_fenxiang_yibafanle
            //一把赢了     txt_fenxiang_yibayingle
            //一炮赚了     txt_fenxiang_yipaozhuanle
            //倍          share@txt_fenxiang_bei
            //元          share@txt_fenxiang_yuan
            if (data.game_id == confConsts.GameTp.jinchanbuyu) {
                self.skImgGet.source = "txt_fenxiang_yipaozhuanle";
            } else if (data.game_id == confConsts.GameTp.doudizhu) {
                self.skImgGet.source = "txt_fenxiang_yibafanle";
                self.skimgKind.source = "share@txt_fenxiang_bei";
            }
            if (data.game_id == confConsts.GameTp.doudizhu) {
                self.skBitMoney.text = data.win_gold.toFixed(2) + "";
            } else {
                self.skBitMoney.text = DataFormat.convertGold(data.win_gold).toFixed(2) + "";
            }
            if (isNaN(data.share_reward) || data.share_reward == 0) {
                self.skBitGold.visible = self.skBitNum.visible = self.skLabTip.visible = false;
            } else {
                self.skBitGold.text = DataFormat.convertGold(data.share_reward) + "";
                self.skBitGold.visible = self.skBitNum.visible = self.skLabTip.visible = true;
            }
        }

        // private createImg() {
        //     let self = this;
        //     let LinkUrl = self.getQRLinkUrl();
        //     let teamID = dataMgr.accMo.getData().aid;
        //     let args = { playerid: String(teamID), link: LinkUrl };
        //     HttpUtil.askCreateImg(args, false, function (data: any) {
        //         if (data.info) self.skerwei.source = data.info;
        //     }, self);
        // }

        // private getQRLinkUrl() {
        //     let self = this;
        //     let teamID = dataMgr.accMo.getData().aid;
        //     let playerID = "";
        //     playerID = 1 + "|" + String(teamID);
        //     let signKey = Base64.base64Encode(playerID);
        //     let channelID = String(440001);
        //     let info = StringUtil.printf(TRain.langMgr.getTxt(<any>game.LangGrp.mainLang, langConsts.mainLang.ShareGameIp), channelID, channelID, signKey);
        //     return info;
        // }
    }
}