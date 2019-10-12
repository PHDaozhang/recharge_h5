module game {
    export enum act_type {
        xs = 0,
        hd = 1,
        gg = 2
    }
    export class ActMainView extends UIPopup {
        private skClose: cui.ScaleButton;
        private skGpInfo: cui.Group;
        private skMenuAct: cui.MenuGroup;
        private _curTag: number;
        private _viewList: ActBaseView[];
        private skBtns: cui.MenuGroup;
        private skGpNotice: cui.Group;
        private _noticeView: NoticeHall;
        private skTitle: cui.Image;
        private _curType: number;
        private skXsRed: game.RedPoint;
        private skGgRed: game.RedPoint;
        private _menuList: cui.MenuItemImage[];

        constructor() {
            super();
            let self = this;
            self.skinName = "actMainSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
        }
        protected childrenCreated() {
            super.childrenCreated();
            let self = this;
            let model = game.dataMgr.activityMo;
            model.addListener(<any>ActMo_EVT.upRed, self.updateRed, self);
            model.addListener(<any>ActMo_EVT.upNew, self.updateNew, self);
            model.addListener(<any>ActMo_EVT.close, self.closeSelf, self);
            self.skClose.setTarget(self.closeSelf, self);
            self._viewList = [];
            self._menuList = [];
            self.skGpNotice.visible = false;
            self.skBtns.setTarget(self.createMenu, self)
            self.skBtns.selectTag = act_type.xs;
            self.changeRedNum(act_type.gg);
        }

        private closeSelf(){
            this.close();  
            GameUtil.setLocal(<any>GameUtil.LocalKey.OVER_READ_Activity, ""); 
        }

        private createMenu(item: cui.MenuItemImage) {
            GameUtil.playClickSound();
            let self = this;
            if (self._curType == item.tag) return;
            self._curType = item.tag;
            let imgGrp = self.skMenuAct;
            imgGrp.removeChildren();
            let maxHeight: number = 0;
            let selectTag = 1;
            self.skTitle.source = "activity@txt_title" + self._curType;

            if (self._curType == act_type.gg) {
                if (self._noticeView == undefined) {
                    self._noticeView = new NoticeHall(noticeState.hall, self);
                    self.skGpNotice.removeChildren();
                    self.skGpNotice.addChild(self._noticeView);
                }
                self.skGpNotice.visible = true;
            } else {
                self.skGpNotice.visible = false;
                let model = game.dataMgr.activityMo;
                let list = model.getActMenu();
                let msg = {};
                let isFir = true;
                for (let i in list) {
                    let key = parseInt(i);
                    let actId = list[i];
                    let img = new cui.MenuItemImage();
                    let data = model.getActConf(actId);
                    if ((self._curType == act_type.xs && data.show == 1) || (self._curType == act_type.hd && data.show == 0)) {
                        img.skinName = "actMenuSkin";
                        img.label = data.name;
                        img.tag = actId;
                        img.y = img.height * (key) + 42;
                        if (maxHeight < img.y) maxHeight = img.y;
                        if (data.new == 1 && model.isNoReadAct(actId)) {
                            let dbAni = new game.UIDBAni();
                            dbAni.dbNm = "actnew";
                            dbAni.autoPlay = true;
                            dbAni.tag = 0;
                            dbAni.x = 45;
                            dbAni.y = 26;
                            img.addChildAt(dbAni, 2);
                        }
                        if (data.boom == 1 ) {
                            let dbAni = new game.UIDBAni();
                            dbAni.dbNm = "actboom";
                            dbAni.autoPlay = true;
                            dbAni.tag = 1;
                            dbAni.x = 190;
                            dbAni.y = 35;
                            img.addChildAt(dbAni, 3);
                        }
                        self._menuList[actId] = img;
                        imgGrp.addChild(img);
                        if (isFir) {
                            isFir = false;
                            selectTag = actId;
                        }
                    }
                }
            }

            imgGrp.setContentSize(imgGrp.width, maxHeight);
            imgGrp.setTarget(self.clickMenu, self);
            imgGrp.selectTag = selectTag;
        }

        private clickMenu(item: cui.MenuItemImage) {
            let self = this;
            let tag = item.tag;
            if (tag == self._curTag) return;
            self._curTag = tag;
            self.skGpInfo.removeChildren();
            let page = self._viewList[tag];
            if (page == undefined) {
                switch (tag) {
                    case confConsts.ActTp.bycj:
                        page = new ActBycjView(confConsts.ActTp.bycj);
                        break;
                    case confConsts.ActTp.rysj:
                        page = new ActBycjView(confConsts.ActTp.rysj);
                        break;
                }
            }
            if (page) { self.skGpInfo.addChild(page); }
        }

        private updateRed(tp: confConsts.ActTp, data: boolean) {
            let self = this;
            let item = self._menuList[tp];
            if (item) {
                item.skIcon.visible = data;
            }
            self.changeRedNum(self._curType);
            let accMo = dataMgr.accMo;
            if (accMo.gameId == 0) gameScene.homeUI.showNoticeNum();
        }

        private updateNew(tp: number, data: boolean) {
            let self = this;
            let item = self._menuList[tp];
            if (!data && item) {
                let ani = item.getChildAt(2) as game.UIDBAni;
                if(ani && ani.tag == 0 ){
                    item.removeChildAt(2);
                }
            }
            self.changeRedNum(self._curType);
            let accMo = dataMgr.accMo;
            if (accMo.gameId == 0) gameScene.homeUI.showNoticeNum();
        }

        public changeRedNum(type: act_type) {
            let self = this;
            let item: game.RedPoint;
            let number = 0;
            let model = game.dataMgr.activityMo;
            if (type == act_type.xs) {
                item = self.skXsRed;
                number = model.getRedByType(false, act_type.xs);
            } else if (type == act_type.gg) {
                item = self.skGgRed;
                number = dataMgr.accMo.getNoReadNum();
            }
            item.visible = number > 0;
            item.skCount.text = number.toString();
        }

        protected onDispose() {
            let self = this;
            super.onDispose();
            self.skGpInfo.removeChildren();
            game.dataMgr.activityMo.rmvAllListener();
        }
    }
}