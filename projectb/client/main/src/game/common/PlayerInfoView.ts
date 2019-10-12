module game {
    export class playerInfoView extends cui.SimpleButton {
        public skHead: cui.Image;
        public skHeadFrame: cui.Image;
        public skbackGuang: cui.Image;
        public skteshu: cui.Image;
        public skFont: cui.BitmapLabel;
        public skNickName: cui.Label;
        public skgold: cui.Label;
        public skJiao: cui.Image;
        private _date = [];
        public cleanDate() {
            let self = this;
            self._date = [];
        }

        public setData(data, rank) {
            let self = this;
            self._date.push(data);
            if (rank == 0) {
                self.skbackGuang.source = confConsts.ComResTp.SpecialFrame + '';
                self.skteshu.source = confConsts.ComResTp.dushen + ''; self.skteshu.x = -19; self.skteshu.y = -30;
                self.skgold.text = game.DataFormat.convertYuanString2(data.player_gold, true);
                self.skFont.visible = false;
                self.skJiao.visible = false;
            } else if (rank == 1) {
                self.skbackGuang.source = confConsts.ComResTp.SpecialFrame + '';
                self.skteshu.source = confConsts.ComResTp.fuhao + '';
                self.skgold.text = game.DataFormat.convertYuanString2(data.player_gold, true);
                self.skFont.visible = false;
                self.skJiao.visible = false;
            } else {
                self.skbackGuang.source = confConsts.ComResTp.PlayerFrame + '';
                self.skteshu.visible = false;
                self.skgold.visible = false;
                self.skFont.text = String(rank);
            }
            self.skHead.source = game.DataFormat.getHeadIcon(data.player_head_custom);
            self.skHeadFrame.source = confConsts.ComResTp.headframe + data.player_vip_lv;
            self.skNickName.text = self.formatString(data.player_nickname);
        }

        public formatString(str: string): string {
            if (str.length > 5) {
                return str.substr(0, 5) + "...";
            } else {
                return str;
            }
        }

        public updateGold(data: any, isAward: boolean, gold = 0) {
            let self = this;
            if (self._date.length == 0) return;
            for (let i = 0; i < self._date.length; i++) {
                let tempDate = self._date[i];
                if (tempDate.player_id == data.player_id) {
                    if (!isAward) {
                        tempDate.player_gold -= gold;
                        self.skgold.text = game.DataFormat.convertYuanString2(tempDate.player_gold, true);
                    } else {
                        self.skgold.text = game.DataFormat.convertYuanString2(data.player_gold, true);
                    }
                }
            }
        }
    }
}