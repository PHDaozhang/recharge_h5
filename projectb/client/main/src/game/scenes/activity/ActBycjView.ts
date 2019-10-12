module game {
    let _curActTp: confConsts.ActTp;

    export class ActBycjView extends ActBaseView {
        private skBg: cui.Image;
        private skDesc: cui.Label;
        private skTip2: cui.Label;
        private skTip1: cui.Label;
        private skTipAni: game.UIDBAni;
        private skJoin: cui.SimpleButton;
        private skBtnAni: game.UIDBAni;
        private skList: cui.DataGroup;
        private _itemPro: cui.ArrayCollection;
        private skGold: cui.BitmapLabel;
        private skRule: cui.ScaleButton;
        private _datas: Array<ActivityAwardConf>;
        private skGaBtn: cui.ScaleButton;

        constructor(tp: confConsts.ActTp) {
            super(tp);
            let self = this;
            self.skinName = "actBycjSkin";
            self.hCenter = 0;
            self.vCenter = 0;
            _curActTp = tp;
        }

        public childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skBtnAni = self.skJoin.getChildAt(0) as game.UIDBAni;
            let model = game.dataMgr.activityMo;
            if (_curActTp == confConsts.ActTp.bycj) {
                model.askBycjInfo();
            } else if (_curActTp == confConsts.ActTp.rysj) {
                model.askRysjInfo();
            }

            let list = self.skList;
            list.itemRender = ActBycjItemView;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            self.init();
            self.skJoin.setTarget(function () {
                if (_curActTp == confConsts.ActTp.bycj) {
                    model.askBycjApply();
                } else if (_curActTp == confConsts.ActTp.rysj) {
                    model.askRysjApply();
                }
            }, self);
            self.skRule.setTarget(function () {
                self.openRule(confConsts.ActTp.bycj);
            }, self);
            self.skGaBtn.setTarget(function(){
                self.openGames(confConsts.ActTp.bycj);
            }, self);
        }

        private init() {
            let self = this;
            let model = game.dataMgr.activityMo;
            let data = model.getShowConf(confConsts.ActTp.bycj);
            self.skDesc.textFlow = cui.htmlParser.parser(data.desc);
            if (_curActTp == confConsts.ActTp.bycj) {
                self.skBg.source = "txt_" + data.bg[0].toString();
                self.skBg.x = 19;
                self.skBg.y = 45;
                self.skGaBtn.visible = false;
                self.skGold.font = data.font[0];
            } else if (_curActTp == confConsts.ActTp.rysj) {
                self.skBg.source = "txt_" + data.bg[1].toString();
                self.skBg.x = -21;
                self.skBg.y = 5;
                self.skRule.y = self.skRule.y - 3;
                self.skTip2.y = self.skTip2.y - 5;
                self.skGold.y = self.skGold.y + 5;
                self.skDesc.width = 355;
                self.skDesc.height = 200;
                self.skDesc.x = 185;
                self.skDesc.y = 320;
                self.skGold.font = data.font[1];
            }
            self.skTipAni.dbNm = data.aniN[1].toString();
            self.skBtnAni.dbNm = data.aniN[2].toString();
            let act = model.getActConf(_curActTp);
            self._datas = new Array<ActivityAwardConf>();
            for (let key in act.award) {
                let da = act.award[key] as ActivityAwardConf;
                self._datas.push(da);
            }
            self._itemPro.source = self._datas;
            self.skBtnAni.gotoAndPlay("canyu");
        }

        protected updateData(data: bycjResult) {
            let self = this;
            let tip1 = "";
            if (!data.bound) {
                tip1 = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.actBycjTip1);
            }
            if (data.bound && !data.applied) {
                tip1 = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.actBycjTip2);
            }
            self.skTip1.text = tip1;
            self.skGold.text = DataFormat.convertYuanString3(data.accumulation);
            self.updateAwd(data.applied);
            let now = TimeUtil.getSvrSec();
            if (now > data.ts_begin && now < data.ts_end) {
                let beg = new Date(data.ts_begin * 1000).toLocaleString();
                let end = new Date(data.ts_end * 1000).toLocaleString();
                let t = StringUtil.printf(TRain.langMgr.getTxt("mainLang", langConsts.mainLang.actBycjTip5), beg, end);
                self.skTip2.text = t;
            } else {
                self.skTip2.text = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.actBycjTip4);
            }
        }

        public updateAwd(data: any) {
            let self = this;
            let isA = data as boolean;
            if (isA) {
                self.skTip1.text = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.actBycjTip3);
                self.skBtnAni.gotoAndPlay("lingqu");
            }
            self._itemPro.source = self._datas;
        }

        public dispose() {
            super.dispose();
            let self = this;
            self.skBtnAni.dispose();
        }
    }

    class ActBycjItemView extends cui.DataItem {
        public skDesc0: cui.Label;
        public skDesc1: cui.Label;
        public skDesc2: cui.Label;

        constructor() {
            super();
            this.skinName = "actBycjItemSkin";
        }
        public childrenCreated() {
            super.childrenCreated();
        }
        protected dataChanged() {
            super.dataChanged();
            let self = this;
            let data: ActivityAwardConf = <ActivityAwardConf>self.data;
            self.skDesc0.text = DataFormat.convertGold(data.tarVal).toString();
            self.skDesc1.text = DataFormat.convertGold(data.awd).toString();
            self.skDesc2.text = data.desc;
            let model = game.dataMgr.activityMo;
            let conf = model.getShowConf(_curActTp);
            let info = model.getActData(_curActTp);
            if (info) {
                if (data.id <= info.index) {
                    if (data.id <= info.index_reward) {
                        let img = new cui.Image;
                        img.source = conf.actN;
                        self.addChild(img);
                        img.x = 240;
                    } else {
                        let ani = new game.UIDBAni;
                        ani.dbNm = conf.aniN[0].toString();
                        self.addChild(ani);
                        ani.x = 270;
                        ani.y = 20;
                        ani.autoPlay = true;
                    }
                }
            }
        }
    }
}