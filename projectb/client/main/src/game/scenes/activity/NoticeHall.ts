module game {
    export class NoticeHall extends cui.Component {
        public skNoticeBg: cui.Image;
        public skBtn: cui.ScaleButton;
        public skTitle1: cui.Label;
        public skTitle2: cui.Label;
        public skTitle3: cui.Label;
        public skIcon: cui.Image;
        public skMenuNotice: cui.MenuGroup;
        private _state: number;
        private _showNoticeDatas: INoticeData[];
        private _curTag: number;//当前点击的第几个
        private _parent: any;
        constructor(state: number, parent?: any) {
            super();
            let self = this;
            self.skinName = "noticeHallSkin";
            self._state = state;
            self.vCenter = 0;
            self.hCenter = 0;
            self._parent = parent;
        }
        protected childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skBtn.setTarget(function () {
                //跳转链接
                let self = this;
                let data = self._showNoticeDatas;
                let url = data[self._curTag].Url;
                URLUtil.openURL(url);
            }, self);
            self.updateView();
        }
        public setState(state: number) {
            this._state = state;
        }
        public updateView() {
            let self = this;
            let noticeList = self._showNoticeDatas = self.getListByState();
            let len = noticeList.length;
            self.skNoticeBg.source = len > 0 ? "activityInnerDB" : "noNoticeDB";
            self.skIcon.visible = len <= 0;
            self.skBtn.visible = self.skMenuNotice.visible = len > 0;
            let imgGrp = self.skMenuNotice;
            let maxHeight: number = 0;
            let accMo = dataMgr.accMo;
            let noticeStr = GameUtil.getLocal(<any>GameUtil.LocalKey.NOW_NOTICE) as string || "";
            for (let i = 0; i < len; i++) {
                let data = noticeList[i];
                let img = new cui.MenuItemImage();
                img.skinName = "noticeItemSkin";
                img.label = data.Page;
                let isNew = accMo.isNewNotice(String(data.Id));
                let isNoRead = accMo.isNoRead(String(data.Id));
                img.icon = isNew ? "notice@txt_new" : isNoRead ? "notice@txt_noRead" : "";
                img.tag = i;
                img.y = img.height * i;
                if (maxHeight < img.y) maxHeight = img.y;
                imgGrp.addChild(img);
                if (isNew) {
                    noticeStr += "_" + data.Id;
                    GameUtil.setLocal(<any>GameUtil.LocalKey.NOW_NOTICE, noticeStr);
                }
            }
            imgGrp.setContentSize(imgGrp.width, maxHeight + 90);
            imgGrp.setTarget(self.clickMenu, self);
            imgGrp.selectTag = 0;
        }
        private clickMenu(item: cui.MenuItemImage) {
            let self = this;
            let tag = item.tag;
            if (tag == self._curTag) return;
            self._curTag = tag;
            let data = self._showNoticeDatas[tag];
            self.skTitle1.text = data.Title;
            self.skTitle2.text = data.Notice;
            self.skBtn.visible = !!data.Url;
            let noticeStr = GameUtil.getLocal(<any>GameUtil.LocalKey.OVER_READ_NOTICE) as string || "";
            let isNoRead = dataMgr.accMo.isNoRead(String(data.Id));
            if (isNoRead) {
                noticeStr += "_" + data.Id;
                GameUtil.setLocal(<any>GameUtil.LocalKey.OVER_READ_NOTICE, noticeStr);
            }
            //刷新未读等状态
            self.reflshMenu(tag);
        }
        private reflshMenu(tag: number) {
            let self = this;
            let child = self.skMenuNotice.getChildAt(tag) as cui.MenuItemImage;

            let accMo = dataMgr.accMo;
            let noticeList = self._showNoticeDatas;
            let data = noticeList[tag];
            let isNew = accMo.isNewNotice(String(data.Id));
            let isNoRead = accMo.isNoRead(String(data.Id));
            child.icon = isNew ? "notice@txt_new" : isNoRead ? "notice@txt_noRead" : "";
            if (accMo.gameId == 0) gameScene.homeUI.showNoticeNum();
            if (self._parent) self._parent.changeRedNum(act_type.gg);
        }
        private getListByState(): INoticeData[] {
            let self = this;
            let state = self._state;
            let datas = dataMgr.accMo.getNoticeDatas();
            let tempDatas: INoticeData[] = [];
            for (let i = 0, len = datas.length; i < len; i++) {
                let data = datas[i];
                if (state == noticeState.login) {
                    if (data.ShowStage == noticeType.two || data.ShowStage == noticeType.oneToTwo) {
                        continue;
                    } else {
                        tempDatas.push(data);
                    }
                } else if (state == noticeState.hallPop) {
                    let isOpen_2 = GameUtil.getLocal(<any>GameUtil.LocalKey.NOTICE_2);
                    let isOpen_3 = GameUtil.getLocal(<any>GameUtil.LocalKey.NOTICE_3);
                    let localSvrTm1 = parseInt(GameUtil.getLocal(<any>GameUtil.LocalKey.NOTICE_TM_1));
                    let localSvrTm2 = parseInt(GameUtil.getLocal(<any>GameUtil.LocalKey.NOTICE_TM_2));
                    let svrMsTm = TimeUtil.getSvrMS();
                    let isEqual1 = TimeUtil.equalsDay(localSvrTm1, svrMsTm);
                    let isEqual2 = TimeUtil.equalsDay(localSvrTm2, svrMsTm);
                    if (data.ShowStage == noticeType.one || data.ShowStage == noticeType.oneToOne) {
                        continue;
                    } else if (data.ShowStage == noticeType.two) {
                        if (!isOpen_2) {
                            tempDatas.push(data);
                            GameUtil.setLocal(<any>GameUtil.LocalKey.NOTICE_2, true);//已经弹出过了
                        }
                    } else if (data.ShowStage == noticeType.three) {
                        if (!isOpen_3) {
                            tempDatas.push(data);
                            GameUtil.setLocal(<any>GameUtil.LocalKey.NOTICE_3, true);
                        }
                    } else if (data.ShowStage == noticeType.oneToTwo) {
                        //获取服务器时间
                        if (!isEqual1) {
                            tempDatas.push(data);
                            GameUtil.setLocal(<any>GameUtil.LocalKey.NOTICE_TM_1, String(svrMsTm));
                        }
                    } else if (data.ShowStage == noticeType.oneToThree) {
                        //获取服务器时间
                        if (!isEqual2) {
                            tempDatas.push(data);
                            GameUtil.setLocal(<any>GameUtil.LocalKey.NOTICE_TM_2, String(svrMsTm));
                        }
                    }
                } else {
                    tempDatas.push(data);
                }
            }
            tempDatas.sort(function (a: INoticeData, b: INoticeData) {
                return a.ShowIdx - b.ShowIdx;
            });
            return tempDatas;
        }
    }
}