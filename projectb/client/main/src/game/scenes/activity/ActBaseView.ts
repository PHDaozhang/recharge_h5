module game {
    export abstract class ActBaseView extends cui.Component {
        private _curPage: ActBaseView;
        private _ruleView: ActRuleView;
        private _gameView: ActGamesView;

        constructor(tp: confConsts.ActTp) {
            super();
            let self = this;
        }
        protected childrenCreated() {
            super.childrenCreated();
            let self = this;
            let model = game.dataMgr.activityMo;
            model.addListener(<any>ActMo_EVT.update, function (tp: confConsts.ActTp, data: any) {
                //if (tp == confConsts.ActTp.bycj) {
                self.updateData(data);
                //}
            }, self);

            model.addListener(<any>ActMo_EVT.award, self.updateAwd, self);
        }

        protected abstract updateData(data: any);

        protected abstract updateAwd(data: any);

        public openRule(type: confConsts.ActTp) {
            let self = this;
            if (self._ruleView == undefined) {
                self._ruleView = new ActRuleView();
            }
            self._ruleView.updateView(game.dataMgr.activityMo.getActConf(type).rule);
            gameScene.openPopup(self._ruleView, null, true);
        }

        public openGames(type: confConsts.ActTp) {
            let self = this;
            if (self._gameView == undefined) {
                self._gameView = new ActGamesView();
            }
            let add = [];
            add.push(1);
            add.push(3);
            add.push(4);
            add.push(5);
            add.push(10);
            self._gameView.setData(add);
            gameScene.openPopup(self._gameView, null, true);
        }

        public dispose() {
            let self = this;
            super.dispose();
            game.dataMgr.activityMo.rmvAllListener();
        }
    }
}