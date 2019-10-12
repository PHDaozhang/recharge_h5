module game {
    export interface INoticeData {
        _id: string,
        Page: string,
        Title: string,
        Notice: string,
        ShowStage: number,
        Id: string,
        EndTime: string,
        StartTime: string,
        Games: number,
        AgentId: number,
        ShowIdx: number,
        Url: string,
    }
    export const enum noticeState {
        login,//登录界面
        hall,//大厅界面
        hallPop,//大厅弹出框
    }
    export const enum noticeType {
        one = 1,
        two = 2,
        three = 3,
        oneToOne = 101,
        oneToTwo = 102,
        oneToThree = 103,
    }
    export class NoticeView extends UIPopup {
        public skClose: cui.ScaleButton;
        private _state: number;
        private skHall: game.NoticeHall;
        constructor(state: number) {
            super();
            let self = this;
            self.skinName = "noticeSkin";
            self._state = state;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
        }
        protected childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skClose.setTarget(self.close, self);
            self.skHall.setState(self._state);
        }
    }
}