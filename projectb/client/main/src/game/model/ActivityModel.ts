module game {
    export class bycjResult {
        bound: boolean;
        applied: boolean;
        accumulation: number;
        index: number;
        index_reward: number;
        ts_ready: number;
        ts_begin: number;
        ts_end: number;
        ts_off: number;
        games: number[];
    }

    export const enum ActMo_EVT {
        update = "update", //参数 活动ID 数据
        award = "award",//领取奖励( 活动ID 数据 )
        upRed = "updateRed",//更新小红点信息
        upNew = "updateNew",//更新new标识信息
        close = "close",//关闭所有活动弹窗
    }

    export class ActivityModel extends DataModel {

        private _actConf: ActivityConf[];//活动配置表
        private _showConf: Array<ActShowConf>;//活动模板配置表
        private _actData: any;
        private _curActs: number[];//当前需要展示的活动(活动id)
        private _redPoint: boolean[];//是否显示小红点

        constructor() {
            super();
            let self = this;
            self.confNm = "conf";
            self._actData = {};
            self._curActs = [];
            self._redPoint = [];
            for (let i = 1; i < confConsts.ActTp.max; i++) {
                self._redPoint[i] = false;
            }
        }

        public onLoadConf(data: any): void {
            super.onLoadConf(data);
            let self = this;
            self._showConf = new Array<ActShowConf>();
            self._actConf = [];
            self._showConf = data.actShow;//活动显示配置
            self._actConf = data.activity;
            self.regActMsg();
        }
        //-------------------------------------------------获取页面数据----------------------------------------------------
        //以活动id来获取展示模板配置
        public getShowConf(aid: number): ActShowConf {
            let self = this;
            let act = self._actConf[aid];
            return this._showConf[act.sid];
        }

        //以活动id来获取活动显示配置
        public getActConf(aid: number): ActivityConf {
            return this._actConf[aid];
        }

        //用活动类型获取活动动态信息
        public getActData(id: number): any {
            return this._actData[id];
        }


        public getActAwd(awdId: number) {

        }

        public getActAllAwd(activityId: number) {

        }

        //活动页显示的菜单栏
        public getActMenu() {
            return this._curActs;
        }

        //根据活动Id获取小红点信息
        public getRedByAid(aid: number): boolean {
            return this._redPoint[aid];
        }

        //----------------------------------------------------------活动数据请求---------------------------------------------------
        //小红点数据
        public askRedPoint() {
            let args: NET_CONF.c2gs_activity_check = {};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2gs_activity_check, args);
        }

        //请求必赢彩金界面数据
        public askBycjInfo() {
            let args: NET_CONF.c2gs_activity_accumulate_rmb_info = {};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2gs_activity_accumulate_rmb_info, args);
            this.addReadAct(confConsts.ActTp.bycj);
        }

        public askBycjApply() {
            let self = this;
            let data = self._actData[confConsts.ActTp.bycj];
            if (data) {
                if (!data.bound) return;
                if (data.applied) {//必赢彩金用户领奖
                    if (data.index_reward >= data.index) return;
                    let args: NET_CONF.c2gs_activity_accumulate_rmb_reward = {};
                    Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2gs_activity_accumulate_rmb_reward, args);
                } else {//请求参与必赢彩金
                    let args: NET_CONF.c2gs_activity_accumulate_rmb_apply = {};
                    Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2gs_activity_accumulate_rmb_apply, args);
                }
            }
        }

        //请求荣耀赏金界面数据
        public askRysjInfo() {
            let args: NET_CONF.c2gs_activity_accumulate_per_info = {};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2gs_activity_accumulate_per_info, args);
            this.addReadAct(confConsts.ActTp.rysj);
        }

        public askRysjApply() {
            let self = this;
            let data = self._actData[confConsts.ActTp.rysj];
            if (data) {
                if (!data.bound) return;
                if (data.applied) {//荣耀赏金用户领奖
                    if (data.index_reward >= data.index) return;
                    let args: NET_CONF.c2gs_activity_accumulate_per_reward = {};
                    Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2gs_activity_accumulate_per_reward, args);
                } else {//请求参与荣耀赏金
                    let args: NET_CONF.c2gs_activity_accumulate_per_apply = {};
                    Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2gs_activity_accumulate_per_apply, args);
                }
            }
        }

        //--------------------------------------------------------注册活动消息--------------------------------------------------------
        private regActMsg() {
            let self = this;
            //小红点数据返回
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_activity_check_result, self.redPointResult, self);
            //-----------必赢彩金start----------
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_activity_accumulate_rmb_info_result, self.bycjInfoResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_activity_accumulate_rmb_apply_result, self.bycJionResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_activity_accumulate_rmb_reward_result, self.bycjAwardResult, self);
            //-----------必赢彩金end------------
            //-----------荣耀赏金start----------
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_activity_accumulate_per_info_result, self.rysjInfoResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_activity_accumulate_per_apply_result, self.rysjJionResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.gs2c_activity_accumulate_per_reward_result, self.rysjAwardResult, self);
            //-----------荣耀赏金end------------
        }

        //-------------------------------------------------------活动消息返回-----------------------------------------------------------
        private redPointResult(data: NET_CONF.gs2c_activity_check_result) {
            let self = this;
            //self._curActs = data.activities;
            self._curActs.push(11);
            self._curActs.push(13);
        }

        //根据活动类型获取小红点数量
        public getRedByType(isAll: boolean, type?: act_type): number {
            if (!isAll && type == null) return 0;
            let self = this;
            let count = 0;
            for (let i = 1; i < self._curActs.length; i++) {
                let da = self._curActs[i];
                let info = self.getActConf(i);
                let isNew = false;
                if (info.new == 1 && self.isNoReadAct(i)) {
                    isNew = true;
                }
                if (da || isNew) {
                    if (isAll) {
                        count += 1;
                    } else {
                        if (info.type == type) {
                            count += 1;
                        }
                    }

                }
            }
            return count;
        }

        //获取当前是否是最新活动
        public isNoReadAct(aId: number): boolean {
            let NoReadAct = GameUtil.getLocal(<any>GameUtil.LocalKey.OVER_READ_Activity) as string;
            if (NoReadAct) {
                let ids: string[] = NoReadAct.split("_");
                return ids.indexOf(aId.toString()) == -1;
            } else {
                return true;
            }
        }

        //添加已读活动
        public addReadAct(aId: number) {
            let self = this;
            let noticeStr = GameUtil.getLocal(<any>GameUtil.LocalKey.OVER_READ_Activity) as string;
            if (self.isNoReadAct(aId)) {
                noticeStr += "_" + aId;
                GameUtil.setLocal(<any>GameUtil.LocalKey.OVER_READ_Activity, noticeStr);
                self.postEvent(<any>ActMo_EVT.upNew, aId, false);
            }
        }

        //必赢彩金信息返回
        private bycjInfoResult(data: NET_CONF.gs2c_activity_accumulate_rmb_info_result) {
            let self = this;
            let info = new bycjResult();
            let tp = confConsts.ActTp.bycj;
            info.bound = data.bound || false;
            info.applied = data.applied || false;
            info.accumulation = data.accumulation || 0;
            info.index = data.index || 0;
            info.index_reward = data.index_reward || 0;
            info.ts_ready = data.ts_ready || 0;
            info.ts_begin = data.ts_begin || 0;
            info.ts_end = data.ts_end || 0;
            info.ts_off = data.ts_off || 0;
            self._actData[tp] = info;
            self.postEvent(<any>ActMo_EVT.update, tp, info);
            self.setBycjRedPoint(tp, info);
        }

        //参与必赢彩金活动返回
        public bycJionResult(data: NET_CONF.gs2c_activity_accumulate_rmb_apply_result) {
            let self = this;
            if (data.result == langConsts.errCode.e_rmt_success) {
                let info = self._actData[confConsts.ActTp.bycj];
                info.applied = true;
                self.postEvent(<any>ActMo_EVT.update, confConsts.ActTp.bycj, info);
            } else {
                msgPrompt.showPrompt(langConsts.errCode.client_actJoin_fail);
            }
        }

        //必赢彩金领奖返回
        public bycjAwardResult(data: NET_CONF.gs2c_activity_accumulate_rmb_reward_result) {
            let self = this;
            if (data.result == langConsts.errCode.e_rmt_success) {
                let tp = confConsts.ActTp.bycj;
                let info = self._actData[tp];
                info.index_reward = data.index;
                game.dataMgr.accMo.addVal("gold", data.reward);
                msgPrompt.showPrompt(langConsts.errCode.client_actAwd_success);
                self.postEvent(<any>ActMo_EVT.award, tp, true);
                self.setBycjRedPoint(tp, info);
            } else {
                msgPrompt.showPrompt(langConsts.errCode.client_actAwd_fail);
            }
        }

        //荣耀赏金信息返回
        private rysjInfoResult(data: NET_CONF.gs2c_activity_accumulate_per_info_result) {
            let self = this;
            let info = new bycjResult();
            let tp = confConsts.ActTp.rysj;
            info.bound = data.bound || false;
            info.applied = data.applied || false;
            info.accumulation = data.accumulation || 0;
            info.index = data.index || 0;
            info.index_reward = data.index_reward || 0;
            info.ts_ready = data.ts_ready || 0;
            info.ts_begin = data.ts_begin || 0;
            info.ts_end = data.ts_end || 0;
            info.ts_off = data.ts_off || 0;
            self._actData[tp] = info;
            self.postEvent(<any>ActMo_EVT.update, tp, info);
            self.setBycjRedPoint(tp, info);
        }

        //荣耀赏金彩金活动返回
        public rysjJionResult(data: NET_CONF.gs2c_activity_accumulate_per_apply_result) {
            let self = this;
            if (data.result == langConsts.errCode.e_rmt_success) {
                let info = self._actData[confConsts.ActTp.rysj];
                info.applied = true;
                self.postEvent(<any>ActMo_EVT.update, confConsts.ActTp.rysj, info);
            } else {
                msgPrompt.showPrompt(langConsts.errCode.client_actJoin_fail);
            }
        }

        //荣耀赏金领奖返回
        public rysjAwardResult(data: NET_CONF.gs2c_activity_accumulate_per_reward_result) {
            let self = this;
            if (data.result == langConsts.errCode.e_rmt_success) {
                let tp = confConsts.ActTp.rysj;
                let info = self._actData[tp];
                info.index_reward = data.index;
                game.dataMgr.accMo.addVal("gold", data.reward);
                msgPrompt.showPrompt(langConsts.errCode.client_actAwd_success);
                self.postEvent(<any>ActMo_EVT.award, tp, true);
                self.setBycjRedPoint(tp, info);
            } else {
                msgPrompt.showPrompt(langConsts.errCode.client_actAwd_fail);
            }
        }

        public setBycjRedPoint(tp: confConsts.ActTp, info: bycjResult) {
            let self = this;
            let isShow = false;
            if (info.index > info.index_reward) {
                isShow = true;
            }
            self._redPoint[tp] = isShow;
            self.postEvent(<any>ActMo_EVT.upRed, tp, isShow);
        }

        public enterGame(gId:number) {
            let self = this;
            gameScene.startGame(gId);
            self.postEvent(<any>ActMo_EVT.close);
        }
    }
}