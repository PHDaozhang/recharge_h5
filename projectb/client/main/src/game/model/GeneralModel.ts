module game {
    export interface ITaskItem {
        questid: number,
        count: number,
        received: boolean,
        cfg: QuestConf,
    }

    export const enum General_EVT {
        Quest_List_Result = "quest_list",
        Notify_Achieve_Share = "achieve_share",
        UpdateTaskList = "UpdateTaskList",
        UpdateTaskList2 = "UpdateTaskList2",
        OpenTaskToday = "OpenTaskToday",
        GetFaqResult = "GetFaqResult",
        GetFaqDetailResult = "GetFaqDetailResult",
        GetadviceListResult = "GetadviceListResult",
        GetQuestReward = "GetQuestReward",
        ShowGameClass = "ShowGameClass",
        //七日奖励当前任务是否完成且未领取
        IsDone = "IsDone",
        GetVipInfoResult = "GetVipInfoResult",
    }
    export const enum General_EVT_Dai {
        Gain_result = "Gain_result",
        GetGain = "GetGain",
        Perform = "Perform",
        PerformList = "PerformList",
        PerformChild = "PerformChild",
        PerformTeamlist = "PerformTeamlist",
        PerformTeamcreate = "PerformTeamcreate",
        PerformTeamupdate = "PerformTeamupdate",
        PerformTeaminfo = "PerformTeaminfo",
    }
    export const enum General_EVT_POP {
        Close = "close",
        backInfo = "backInfo",
    }
    export class GeneralModel extends DataModel {
        public isOpen: boolean;
        //当前天任务是否完成还未领取
        public isDone: boolean;

        public partConf: { [key: string]: ParticleConf };

        private _questList: ITaskItem[];
        //当前是第几天（七日奖励）
        private _curDay: number;
        //是否在游戏中
        // private _isInGame: boolean;

        private _adviceList: NET_CONF.msg_suggest[];

        private _questConf: { [key: string]: QuestConf };

        private _openConfs: any;

        private _gainConf: PerformConf;

        private _FAQConf: ExtendConf;

        private _gain: number;

        private _performsInfo;

        private _performsList: NET_CONF.msg_performance_info[];

        private _performsChild: NET_CONF.msg_performance_info;

        private _performsTeamlist: NET_CONF.msg_performance_team[];

        private _performsTeamInfo: NET_CONF.msg_performance_team;

        private _teamID: number;
        private _tag: number;

        private _vipConf: VIPProfitConf;

        private _tipConf: TipControlConf[];
        private _teamName: string;
        private _changeName: string;

        private _hallFunConfs: HallFunPopConf[];

        private _isOpenLimitRw: boolean;
        private _isPopSevenDay: boolean;
        private _isFirstPList: boolean;//是大厅请求的代理列表
        
        private _openShop:boolean;

        constructor() {
            super();
            let self = this;
            notifiCenter.addListener(<any>GameUtil.GAME_EVT.enter_game_fin, function () {
                self.initRegHandle();
                // if (dataMgr.accMo.getData().sevenday_done) self.sendGetQuestlist();
                self.sendGetQuestlist(false);
            }, this);
            self.confNm = "conf";
            self._openShop = false;
        }

        public onLoadConf(data: any): void {
            let self = this;
            self._questConf = data.Quest;
            self._gainConf = data.Perform;
            self._FAQConf = data.Extend;
            self._openConfs = data.open;
            self.partConf = data.particle;
            self._vipConf = data.VIPProfit;
            self._hallFunConfs = data.hallFunPop;
            let tipConf = self._tipConf = [];
            for (let tmpTip of data.tipControl) {
                if (!tmpTip.os || tmpTip.os == GameUtil.os) {
                    tipConf.push(tmpTip);
                }
            }
            self._tipConf = tipConf;
        }

        public get tipConf() {
            return this._tipConf;
        }
        public get curDay(): number {
            return this._curDay;
        }
        public set curDay(value: number) {
            this._curDay = value;
        }
        public set openShop(value:boolean){
            this._openShop = value;
        }
        public getLimitList(): ITaskItem[] {
            return this._questList;
        }
        public set isOpenLimitRw(value: boolean) {
            this._isOpenLimitRw = value;
        }
        public get isOpenLimitRw(): boolean {
            return this._isOpenLimitRw;
        }
        public isFunOpen(tp: confConsts.openFunTp): boolean {
            let self = this;
            let isOpen = (self._openConfs(tp) as OpenConf).isOpen;
            if(tp == confConsts.openFunTp.shop){
                return self._openShop && !!isOpen;
            }else{
                return !!isOpen;
            }
            
        }
        public getFunPopInfos(): HallFunPopConf[] {
            return this._hallFunConfs;
        }
        // public get isInGame(): boolean {
        //     return this._isInGame;
        // }
        // public set isInGame(value: boolean) {
        //     this._isInGame = value;
        // }
        public getSuggestList(): NET_CONF.msg_suggest[] {
            return this._adviceList || [];
        }
        // public setIsNotNewTask(is_new: boolean): void {
        //     let self = this;
        //     //self._isHaveData = true;
        //     if (is_new) GameUtil.setLocal("isNotNewTask", is_new);
        // }
        // public getIsHaveData() {
        //     return this._isHaveData;
        // }

        //七日奖励配置
        //七日奖励可得到的总奖励
        public getAllGold(): number {
            let sum = 0;
            let self = this;
            for (let i in self._questConf) {
                let id = self._questConf[i].id;
                if (id >= 3001 && id <= 3014) sum += self._questConf[i].awardItemCount;
            }
            return sum / 2;
        }

        public getQuestByID(id: number): QuestConf {
            return this._questConf[id];
        }

        public getQuest(): { [key: string]: QuestConf } {
            return this._questConf;
        }

        public getPerform() {
            return this._gainConf;
        }

        public getExtend() {
            return this._FAQConf;
        }

        public getVipProfit() {
            return this._vipConf;
        }

        public setGain(gain) {
            let self = this;
            self._gain = gain;
        }
        public getGain() {
            return this._gain;
        }

        public setCreateTeamName(name: string) {
            this._teamName = name;
        }
        public getCreateTeamName() {
            return this._teamName;
        }

        public setChangeTeamName(name: string) {
            this._changeName = name;
        }
        public getChangeTeamName() {
            return this._changeName;
        }

        public setPerformanceInfo(data) {
            let self = this;
            self._performsInfo = data;
        }
        public getPerformanceInfo() {
            return this._performsInfo;
        }

        public setPerformanceList(data) {
            let self = this;
            self._performsList = data;
        }
        public getPerformanceList() {
            return this._performsList;
        }

        public setPerformanceChild(data) {
            let self = this;
            self._performsChild = data;
        }
        public getPerformanceChild() {
            return this._performsChild;
        }

        public setPerformanceTeamlist(data) {
            let self = this;
            self._performsTeamlist = data;
        }
        public getPerformanceTeamlist() {
            return this._performsTeamlist;
        }

        public setPerformTeamInfo(data) {
            let self = this;
            self._performsTeamInfo = data;
        }
        public getPerformanceTeamInfo() {
            return this._performsTeamInfo;
        }

        public setTeamId(teamId) {
            this._teamID = teamId;
        }
        public getTeamId() {
            return this._teamID;
        }

        public setCodeTag(tag) {
            this._tag = tag;
        }
        public getCodeTag() {
            return this._tag;
        }

        public initRegHandle(): void {
            let self = this;
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_benefits_result, self.benefits, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_get_questlist_result, self.getQuestlist, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_change_quest, self.changeQuest, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_notify_share, self.notifyShare, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_receive_share_reward_result, self.shareReward, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_notify_task_reflush, self.taskReflush, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_receive_questreward_result, self.getQuestReward, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_req_faq_result, self.faqResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_req_faq_detail_result, self.faqDetailResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_suggestion_result, self.adviceReqResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_req_suggest_result, self.adviceListReqResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_req_vip_info_result, self.askVipInfoResult, self);

            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_check_gain_result, self.checkGainResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_gain_result, self.getGainResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_info_result, self.performanceInfoResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_list_result, self.performanceListResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_child_result, self.performanceChildResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_team_list_result, self.performanceTeamlistResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_team_create_result, self.performanceTeamcreateResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_team_update_result, self.performanceTeamUpdateResult, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_performance_team_info_result, self.performanceTeamInfoResult, self);
        }
        // ------------------------------客户端接收消息--------------------------------------
        //团队具体信息，成员列表
        public performanceTeamInfoResult(data: NET_CONF.s2c_performance_team_info_result) {
            let self = this;
            self.setPerformTeamInfo(data.team);
            self.postEvent(<any>General_EVT_Dai.PerformTeaminfo);
        }
        //更新团队信息返回
        public performanceTeamUpdateResult(data: NET_CONF.s2c_performance_team_update_result) {
            let self = this;
            self.setTeamId(data.team_id);
            self.setCodeTag(data.code_tag);
            if (data.result == 1) {
                self.postEvent(<any>General_EVT_Dai.PerformTeamupdate, data.optype, data);
            } else {
                MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.sameName);
            }
        }
        //申请创建团队返回
        public performanceTeamcreateResult(data: NET_CONF.s2c_performance_team_create_result) {
            let self = this;
            if (data.result == 1) {
                self.postEvent(<any>General_EVT_Dai.PerformTeamcreate);
            } else {
                MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.sameName);
            }
        }
        //申请团队列表返回
        public performanceTeamlistResult(data: NET_CONF.s2c_performance_team_list_result) {
            let self = this;
            self.setPerformanceTeamlist(data.teams);
            self.postEvent(<any>General_EVT_Dai.PerformTeamlist);
        }
        //申请下级查询返回
        public performanceChildResult(data: NET_CONF.s2c_performance_child_result) {
            let self = this;
            self.setPerformanceChild(data.info);
            self.postEvent(<any>General_EVT_Dai.PerformChild);
        }
        //代理管理返回
        public performanceListResult(data: NET_CONF.s2c_performance_list_result) {
            let self = this;
            self.setPerformanceList(data.info);
            self.postEvent(<any>General_EVT_Dai.PerformList);
            if (self._isFirstPList) self.postEvent(General_EVT_POP.backInfo);
        }
        //申请业绩查询返回
        public performanceInfoResult(data: NET_CONF.s2c_performance_info_result) {
            let self = this;
            self.setPerformanceInfo(data);
            self.postEvent(<any>General_EVT_Dai.Perform);
        }
        //申请领取佣金返回
        public getGainResult(data: NET_CONF.s2c_performance_gain_result) {
            let self = this;
            if (data.result == 1) {
                self.setGain(0);
                self.postEvent(<any>General_EVT_Dai.GetGain);
                let gold = dataMgr.accMo.getData().gold + data.gain;
                dataMgr.accMo.setVal("gold", gold);
                game.TipsMgr.showPrompt(StringUtil.printf(TRain.langMgr.getTxt("mainLang", langConsts.mainLang.getDLGold),
                game.DataFormat.convertGold(data.gain)
            ));
            }
        }

        //代理佣金数量
        public checkGainResult(data: NET_CONF.s2c_performance_check_gain_result) {
            let self = this;
            self.setGain(data.gain);
            self.postEvent(<any>General_EVT_Dai.Gain_result);
        }

        //玩家领取救济金的结果
        public benefits(data: NET_CONF.s2c_benefits_result) {
            //救济金是固定的 confConsts.ConstTp.almsGoldCount 
            let result = data.result;
            if (result == langConsts.errCode.e_rmt_success) {
                // 领取成功
                let gold = dataMgr.accMo.getData().gold + confConsts.ConstTp.almsGoldCount;
                dataMgr.accMo.setVal("gold", gold);
                game.dataMgr.accMo.updateGetCount();
            } else {
                // 领取失败
                // game.TipsMgr.showPrompt(TRain.langMgr.getTxt("errCode", result));
            }
            game.TipsMgr.showPrompt(TRain.langMgr.getTxt("errCode", result));
        }
        //返回任务列表
        public getQuestlist(data: NET_CONF.s2c_get_questlist_result) {
            //data.is_new    这个是限时悬赏使用,任务是否已重置
            let self = this;
            if (Object.keys(data).length == 0) return;
            if (!self._questList) {
                self._questList = [];
            } else {
                self._questList.length = 0;
            }
            for (let temp of data.questlist) {
                let val = <any>{};
                val.questid = temp.questid;
                val.count = temp.count;
                val.received = temp.received;
                let qcfg = self.getQuestByID(temp.questid);
                val.cfg = qcfg;
                if (isNaN(self._curDay) || self._curDay < qcfg.group) {
                    self._curDay = qcfg.group;
                }
                self._questList.push(val);
            }
            //self.setIsNotNewTask(data.is_new);
            // self.postEvent(General_EVT.Quest_List_Result + "");
            //let isNotNewTask = GameUtil.getLocalBool("isNotNewTask");
            let sevendayDone = dataMgr.accMo.getVal("sevenday_done");
            let oneTask = self._questList[self._curDay];
            let twoTask = self._questList[self._curDay - 1];
            if (!sevendayDone && oneTask && twoTask && !oneTask.received && !twoTask.received && oneTask.count >= oneTask.cfg.completeCount && twoTask.count >= twoTask.cfg.completeCount) {
                self.isDone = true;//显示
            } else {
                self.isDone = false;//不显示
            }
            self.postEvent(General_EVT.IsDone, self.isDone);
            //是否是可弹出七日奖励
            let isPopSevenDay = self._isPopSevenDay;
            if (!sevendayDone && self.isOpen) {
                if (isPopSevenDay) {
                    self.postEvent(General_EVT_POP.backInfo);
                } else {
                    self.postEvent(General_EVT.Quest_List_Result);//打开七日
                }
            }
            //if (sevendayDone && data.is_new && self.isOpen) {
            self.isOpenLimitRw = sevendayDone && data.is_new && self.isOpen;
            // self.postEvent(General_EVT.OpenTaskToday); //新一期第一次进入游戏
            //}
        }
        //通知成就分享
        public notifyShare(data: NET_CONF.s2c_notify_share) {
            if (data && data.game_id == dataMgr.accMo.gameId) this.postEvent(General_EVT.Notify_Achieve_Share + "", data);
        }
        //领取成就分享奖励结果
        public shareReward(data: NET_CONF.s2c_receive_share_reward_result) {
            let result = data.result;
            if (result == langConsts.errCode.e_rmt_success) {
                game.MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.headHasGet);
                let reward = data.reward;
                if (!isNaN(reward) && reward > 0) {
                    let acco = game.dataMgr.accMo;
                    acco.setVal("gold", acco.getData().gold + reward);
                }
                dataMgr.accMo.askLogin();
            } else {
                game.TipsMgr.showPrompt(TRain.langMgr.getTxt("errCode", result));
            }
        }
        //通知玩家任务刷新
        public taskReflush(data: NET_CONF.s2c_notify_task_reflush) {
            this.sendGetQuestlist();
        }
        //领取奖励（七日奖励）
        public getQuestReward(data: NET_CONF.s2c_receive_questreward_result) {
            let self = this;
            let accMo = dataMgr.accMo;
            if (data.result == langConsts.errCode.e_rmt_success) {
                //当前是七日奖励还是限时悬赏
                if (dataMgr.accMo.getVal("sevenday_done")) {
                    for (let i = 0, len = self._questList.length; i < len; i++) {
                        let questItem = self._questList[i];
                        if (questItem.questid == data.questid) {
                            questItem.received = true;
                            accMo.addVal("gold", questItem.cfg.awardItemCount);
                        }
                    }
                    self.postEvent(General_EVT.UpdateTaskList);
                } else {//七日
                    let seven = self._questConf[data.questid];
                    let grp = seven.group;
                    let award = game.DataFormat.convertGold(seven.awardItemCount);
                    let t = StringUtil.printf(TRain.langMgr.getTxt("mainLang", langConsts.mainLang.sevenGetGold), award);
                    game.TipsMgr.showPrompt(t);
                    for (let i = 0; i < self._questList.length; i++) {
                        if (self._questList[i].cfg.group == grp) {
                            self._questList[i].received = true;
                        }
                    }
                    let isOver = self.checkAllOver();
                    if (isOver && self.curDay == 7) { //如果全部完成
                        accMo.setVal("sevenday_done", true);
                        self.sendGetQuestlist();
                    }
                    self.postEvent(General_EVT.GetQuestReward + "");
                }

            } else {

            }
        }
        private checkAllOver(): boolean {//七日奖励是否全部领取完成
            let self = this;
            let questList = self.getLimitList();
            for (let i = 0; i < questList.length; i++) {
                let questItem: ITaskItem = questList[i];
                if (questItem.received) {
                    continue;
                } else {
                    return false;
                }
            }
            return true;
        }
        //通知任务信息变更（七日奖励）//任务进度增加的时候会发
        public changeQuest(data: NET_CONF.s2c_change_quest) {
            let self = this;
            let vo = data.qinfo;
            if (self._questList) {
                let oldCount = 0;
                for (let temp of self._questList) {
                    if (temp.questid == vo.questid) {
                        oldCount = temp.count;
                        temp.count = vo.count;
                        // temp.received = vo.received;
                        break;
                    }
                }
                self.postEvent(General_EVT.UpdateTaskList);
                self.postEvent(General_EVT.UpdateTaskList2, vo, oldCount);

                let sevendayDone = dataMgr.accMo.getVal("sevenday_done");
                let oneTask = self._questList[self._curDay];
                let twoTask = self._questList[self._curDay - 1];
                if (!sevendayDone && oneTask && twoTask && !oneTask.received && !twoTask.received && oneTask.count >= oneTask.cfg.completeCount && twoTask.count >= twoTask.cfg.completeCount) {
                    self.isDone = true;//显示
                } else {
                    self.isDone = false;//不显示
                }
                self.postEvent(General_EVT.IsDone, self.isDone);
            }
        }

        // ------------------------------客户端发消息--------------------------------------
        //申请请求团队详情（成员列表） performance_team_info
        public sendSearchTeam(team_id) {
            let args: NET_CONF.c2s_performance_team_info = <any>{};
            args.team_id = team_id;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_team_info, args);
        }
        //申请修改团队信息
        public sendChangeTeamName(optype: number, team_id: number, limit: number, nick_name: string) {
            let args: NET_CONF.c2s_performance_team_update = <any>{};
            args.optype = optype;
            args.team_id = team_id;
            args.limit = limit;
            args.nick_name = nick_name;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_team_update, args);
        }
        //申请创建团队
        public sendCreateTeam(count: number, nick_name: string) {
            let args: NET_CONF.c2s_performance_team_create = <any>{};
            args.count = count;
            args.nick_name = nick_name;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_team_create, args);
        }
        //申请团队列表
        public sendPerformTeamList() {
            let args: NET_CONF.c2s_performance_team_list = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_team_list, args);
        }
        //申请下级查询
        public sendPerformanceChild(player_id) {
            let args: NET_CONF.c2s_performance_child = <any>{};
            args.player_id = player_id;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_child, args);
        }
        //代理列表申请
        public sendPerformList(isFirst?: boolean) {
            this._isFirstPList = isFirst || false;
            let args: NET_CONF.c2s_performance_list = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_list, args);
        }
        //申请业绩查询
        public sendPerformanceInfo() {
            let args: NET_CONF.c2s_performance_info = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_info, args);
        }

        //玩家申请自己的佣金数量
        public sendGetGain() {
            let args: NET_CONF.c2s_performance_check_gain = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_check_gain, args);
        }

        public sendAskForGain() {
            let args: NET_CONF.c2s_performance_gain = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_performance_gain, args);
        }

        //玩家领取救济金
        public sendBenefits() {
            let args: NET_CONF.c2s_beneifts = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_beneifts, args);
        }
        //请求任务列表
        public sendGetQuestlist(isOpen: boolean = true, isPopSevenDay: boolean = false) {
            let self = this;
            self.isOpen = !isOpen ? false : true;
            self._isPopSevenDay = isPopSevenDay;
            let args: NET_CONF.c2s_get_questlist = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_get_questlist, args);
        }
        //领取成就分享奖励
        public sendshareReward() {
            let args: NET_CONF.c2s_receive_share_reward = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_receive_share_reward, args);
        }
        //微信分享任务
        public sendWXshareTask() {
            let args: NET_CONF.c2s_wechat_share_task = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_wechat_share_task, args);
        }
        //领取奖励（七日奖励）
        public sendGetQuestReward(questid: number) {
            let args: NET_CONF.c2s_receive_questreward = <any>{ questid: questid };
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_receive_questreward, args);
        }
        // ---------------------------------限时悬赏-----------------------------------------------
        //--显示一次今日刷新的任务
        // public showTaskOfToday(): void {
        //     let self = this;
        //     // if (self._questList && self._questList.length > 0 && !!isNotNewTask && self.getIsHaveData() && !!dataMgr.accMo.getData().sevenday_done) {
        //     //GameUtil.setLocal("isNotNewTask", false);
        //     //弹出限时广告界面
        //     self.postEvent(General_EVT.OpenTaskToday);
        //     self.postEvent(General_EVT.UpdateTaskList);
        //     // }
        // }
        //==============================================================================================
        public getTaskByDay(day?: number): ITaskItem[] {
            let self = this;
            if (!self._questList) {
                return undefined;
            }
            let list = [];
            if (isNaN(day)) {
                day = self._curDay;
            }
            for (let temp of self._questList) {
                if (temp.cfg.group == day) {
                    list.push(temp);
                }
            }
            return list;
        }

        public setTaskByDay(index: number, day?: number) {
            let self = this;
            if (!self._questList) {
                return undefined;
            }
            if (isNaN(day)) {
                day = self._curDay;
            }
            let count = 0;
            for (let i = 0; i < self._questList.length; i++) {
                if (self._questList[i].cfg.group == day) {
                    if (count == index) {
                        self._questList[i].count++;
                    }
                    count++;
                }
            }
        }

        public getRestReward(): number {
            let self = this;
            let list = self.getQuest();
            let sum = 0;
            for (let i in list) {
                if (list[i].id >= 3001 && list[i].id <= 3014) {
                    if (list[i].group > self._curDay) {
                        sum += list[i].awardItemCount;
                    }
                }
            }
            return sum / 2;
        }
        //---------------------客服-------------------------------
        public sendAdviceReq(text: string) {
            let args: NET_CONF.c2s_suggestion = <any>{};
            args.text = text;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_suggestion, args);
        }

        public adviceReqResult(data: NET_CONF.s2c_suggestion_result) {
            let self = this;
            if (data.result != langConsts.errCode.e_rmt_success) {
                msgPrompt.showErr(data.result);
            }
        }

        public adviceListReq() {
            let args: NET_CONF.c2s_req_suggest = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_req_suggest, args);
        }

        public adviceListReqResult(data: NET_CONF.s2c_req_suggest_result) {
            let self = this;
            self._adviceList = data.list;
            self.postEvent(<any>General_EVT.GetadviceListResult, data.list || []);
            self.postEvent(<any>General_EVT.GetadviceListResult, data.list || []);
        }
        public askFaq() {
            let args: NET_CONF.c2s_req_faq = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_req_faq, args);
        }
        public faqResult(data: NET_CONF.s2c_req_faq_result) {
            this.postEvent(<any>General_EVT.GetFaqResult, data.faq_list || []);
            // public faqResult(data: NET_CONF.s2c_req_faq_result) {
            //     this.postEvent(General_EVT.GetFaqResult, data.faq_list || []);
        }
        public askFaqDetail(index: number) {
            let args: NET_CONF.c2s_req_faq_detail = <any>{};
            args.index = index;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_req_faq_detail, args);
        }
        public faqDetailResult(data: NET_CONF.s2c_req_faq_detail_result) {
            this.postEvent(<any>General_EVT.GetFaqDetailResult, data.faq);
            // public faqDetailResult(data: NET_CONF.s2c_req_faq_detail_result) {
            //     this.postEvent(General_EVT.GetFaqDetailResult, data.faq);
        }
        //===============================================================================
        //请求vip信息
        public askVipInfo() {
            let args: NET_CONF.c2s_req_vip_info = <any>{};
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_req_vip_info, args);
        }

        public askVipInfoResult(data: NET_CONF.s2c_req_vip_info_result) {
            this.postEvent(<any>General_EVT.GetVipInfoResult, data.vipexp, data.viplv);
        }
        //===============================================================================
        //打开捕鱼类xx类游戏
        public showGameClass(tag: number) {
            let self = this;
            self.postEvent(General_EVT.ShowGameClass, tag);
        }
    }
}