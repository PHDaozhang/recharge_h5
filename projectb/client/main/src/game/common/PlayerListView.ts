module game {

    export interface hallPlayerListShowData extends cui.IItemData {
        rankid: number,
        player_head_custom: string,
        player_vip_lv: string,
        player_nickname: string,
        win_count: number,
        play_cnt: number,
        player_gold: number,
        bets: number
    }
    export class PlayerListView extends game.UIPopup {
        public skBack: cui.ScaleButton;
        public skplyHead: cui.Image;
        public skplyHeadF: cui.Image;
        public skList: cui.DataGroup;
        public skDushen: cui.Label;
        public skwinCount: cui.Label;
        public skplayCount: cui.Label;
        public skgold: cui.BitmapLabel;
        public skbets: cui.BitmapLabel;
        private _itemPro: cui.ArrayCollection;
        private _data: any;
        constructor() {
            super();
            let self = this;
            this.skinName = "playerSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
        }
        public childrenCreated() {
            super.childrenCreated();
            let self = this;
            self.skBack.setTarget(self.close, self);
            let list = self.skList;
            list.itemRender = PlayerListItem;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            self.updateView();
        }
        public setData(data: any) {
            let self = this;
            self._data = data;
            //self.updateView();
        }
        public updateView() {
            let self = this;
            let datas = self._data;
            if (!datas || datas <= 0) return;
            //更新赌神信息
            self.skplyHead.source = game.DataFormat.getHeadIcon(datas[0].player_head_custom);
            self.skplyHeadF.source = confConsts.ComResTp.oldFrame + datas[0].player_vip_lv;
            self.skDushen.text = datas[0].player_nickname;
            self.skwinCount.text = String(datas[0].win_count);
            self.skplayCount.text = String(datas[0].play_cnt);
            self.skgold.text = game.DataFormat.convertYuanString2(datas[0].player_gold, false);
            self.skbets.text = game.DataFormat.convertYuanString2(datas[0].bets, false);
            datas.splice(0, 1);
            //获取游戏列表
            let listArr: Array<hallPlayerListShowData> = datas.slice(0);
            for (let i = 0; i < self._data.length; i++) {
                listArr[i].rankid = i + 1;
                // let listInfo: hallPlayerListShowData = {
                //     rankid: i,
                //     player_head_custom: self._data[i].player_head_custom,
                //     player_head_frame: self._data[i].player_head_frame,
                //     player_nickname: self._data[i].player_nickname,
                //     win_count: self._data[i].win_count,
                //     play_cnt: self._data[i].play_cnt,
                //     player_gold: self._data[i].player_gold,
                //     bets: self._data[i].bets
                // };
                // listArr.push(listInfo);
            }
            self._itemPro.source = listArr;
        }
    }
    export class PlayerListItem extends cui.DataItem {
        public skfuhao: cui.Image;
        public skplyHead: cui.Image;
        public skplyHeadF: cui.Image;
        public sknickname: cui.Label;
        public skwinConut: cui.Label;
        public skplayCount: cui.Label;
        public skgold: cui.BitmapLabel;
        public skbets: cui.BitmapLabel;
        public skrank: cui.BitmapLabel;
        public skJiao: cui.Image;
        constructor() {
            super();
            this.skinName = "playerListSkin";
        }
        public childrenCreated() {
            super.childrenCreated();
        }
        protected dataChanged() {
            super.dataChanged();
            let self = this;
            let data: hallPlayerListShowData = <hallPlayerListShowData>self.data;
            if (data.rankid == 1) {
                self.skfuhao.visible = true;
                self.skrank.visible = false;
                self.skJiao.visible = false;
            } else {
                self.skfuhao.visible = false;
                self.skrank.visible = true;
                self.skJiao.visible = true;
            }
            self.skplyHead.source = game.DataFormat.getHeadIcon(data.player_head_custom);
            self.skplyHeadF.source = confConsts.ComResTp.oldFrame + data.player_vip_lv;
            self.sknickname.text = data.player_nickname;
            self.skwinConut.text = String(data.win_count);
            self.skplayCount.text = String(data.play_cnt);
            self.skgold.text = game.DataFormat.convertYuanString2(data.player_gold, false);
            self.skbets.text = game.DataFormat.convertYuanString2(data.bets, false);
            self.skrank.text = String(data.rankid);
            if (data.rankid >= 10) {
                self.skrank.scaleX = 0.75;
                self.skrank.scaleY = 0.75;
            }
        }
    }
}