///<reference path="./DataModel.ts" />

module game {
    export const enum AccountMo_EVT {
        login_svr_fin = "svr_fin",  //登入服务器结束事件  断线重连也会触发此事件
        reg_phone_fin = "reg_fin", //注册账号成功
        bin_phone_fin = "bin_fin",
        check_svr_info = "check_fin", //获取公告事件
    }
    export const enum NotifyMo_EVT {
        got_notify = "new"
    }
    // export const enum PidType {
    //     channelId = "Cloud249", //440001 Cloud259  Cloud249
    //     agentId = "310"// 1 165 310
    // }
    export class AccountModel extends DataModel {
        //---------------------------------------------------
        //游戏账号  nm:账号  isAuto:
        public accNm: string;
        public gameId: number;
        // public lastGmId:number;//上次玩过的游戏id

        public isAuto: boolean;//是否是游客
        public channel: string;

        private _token: string;

        protected _data: NET_CONF.msg_account_info;       //服务器数据存储

        private _notifys: NET_CONF.s2c_w2c_notify[]; //广播

        private _noticeDatas: any[];

        public isNew: boolean;

        constructor() {
            super();
            let self = this;
            self.accNm = "";
            self.isAuto = true;
            self._notifys = [];
        }

        public getData(): NET_CONF.msg_account_info {
            return this._data;
        }
        public getNoticeDatas(): any[] {
            return this._noticeDatas || [];
        }
        /**
         * 
         * @param nm  游客则传null
         * @param pwd  游客则传null
         */
        public verlogin(nm: string, pwd: string) {
            let self = this;
            if (!nm) {
                nm = self.accNm;
                pwd = "";

                if (!nm) {
                    nm = GameUtil.getLocal(GameUtil.LocalKey.ACC_NAME) || "";
                }
            }

            HttpUtil.accLogin({ nm: nm, channel: CONF.channelId, agentId: CONF.agentId,hardwareId:CONF.deviceId }, true, function (data: any) {
                if (data && data.ret) {
                    let accNm = data.acc;
                    self.accNm = accNm;
                    self._token = data.info;
                    Net.ip = data.gameip;

                    GameUtil.setLocal(GameUtil.LocalKey.ACC_NAME, accNm);

                    self.connectWorld();
                    //notifiCenter.postEvent( AccountMo_EVT.login_fin );
                }
                else {
                    GameUtil.setLocal(GameUtil.LocalKey.ACC_NAME, "");
                    MsgBox.showPrompt(langConsts.errCode.svrConnectErr);
                }
            }, self);
        }

        //账号密码登录
        public login(nm: string, pwd: string) {
            let self = this;
            HttpUtil.loginAcc({ phone: nm, pwd: pwd, channel: CONF.channelId, agentId: CONF.agentId ,hardwareId:CONF.deviceId}, true, function (data: any) {
                if (data && data.ret) {
                    let accNm = data.acc;
                    self.accNm = accNm;
                    self._token = data.info;
                    Net.ip = data.gameip;

                    GameUtil.setLocal(GameUtil.LocalKey.ACC_NAME, accNm);

                    self.connectWorld();
                    //notifiCenter.postEvent( AccountMo_EVT.login_fin );
                }
                else {
                    GameUtil.setLocal(GameUtil.LocalKey.ACC_NAME, "");
                    if (data.info == "Login_AccIsNotExist") {
                        MsgBox.showPrompt(langConsts.errCode.e_rmt_login_AccIsNotExists);
                    } else {
                        MsgBox.showPrompt(langConsts.errCode.e_rmt_gold_accountnum_or_pwd_error);// MsgBox.showPrompt(data ? data.info : "");
                    }
                }
            }, self);
        }

        protected reLogin() {
            let self = this;
            HttpUtil.serverList({ nm: self.accNm }, true, function (data: any) {
                if (data && data.ret) {
                    Net.ip = data.info;
                    self.connectWorld();
                }
                else {
                    notifiCenter.postEvent(CONN_EVT.CONN_FAIL);
                }
            }, self);
        }

        public registered(phone: string, pwd: string, code: string) {
            let self = this;
            //if (DEBUG) code = "111111";
            HttpUtil.regAcc({ phone: phone, pwd: pwd, checkcode: code, channel: CONF.channelId, agentId: CONF.agentId ,hardwareId:CONF.deviceId}, true, function (data: any) {
                if (data && data.ret) {
                    self.postEvent(AccountMo_EVT.reg_phone_fin);
                } else if (data.info == "Login_AccIsExists") {
                    MsgBox.showPrompt(langConsts.errCode.e_rmt_login_AccIsExists);
                } else if(data.info == "VerifyError"){
                    MsgBox.showPrompt(langConsts.errCode.e_rmt_code_error);
                }else {
                    MsgBox.showPrompt(langConsts.errCode.e_rmt_register_faild);
                }
            }, self);
        }
        public bind(phone: string, pwd: string, nm: string, code: string ) {
            let self = this;
            //if (DEBUG) code = "111111";
            HttpUtil.bindAcc({ phone: phone, pwd: pwd, nm: nm, checkcode: code, agentId: CONF.agentId ,hardwareId:CONF.deviceId }, true, function (data: any) {
                if (data && data.ret) {
                    this.setVal("isFormal",true);
                    self.postEvent(AccountMo_EVT.bin_phone_fin);
                    MsgBox.showPrompt(langConsts.errCode.e_rmt_binding_success);
                    // let view = new SaveMoneyDialog();
                    // gameScene.openPopup(view);
                }
                else if(data.info == "VerifyError"){
                    MsgBox.showPrompt(langConsts.errCode.e_rmt_code_error);
                }else{
                    MsgBox.showPrompt(langConsts.errCode.e_rmt_binding_falid);
                }
            }, self);
        }
        public checkCode(phone: string) {
            MsgBox.showTxt(LangGrp.mainLang,langConsts.mainLang.Login_AskCode);
            HttpUtil.checkCode({ phone: phone, agentId: CONF.agentId }, false, function (data: any) {
                if (data && data.ret) {
                    MsgBox.showTxt(LangGrp.mainLang,langConsts.mainLang.Login_AskCodeSuccess);
                    // self.postEvent(AccountMo_EVT.bin_phone_fin);
                    // MsgBox.showPrompt(langConsts.errCode.e_rmt_binding_success);
                    // // let view = new SaveMoneyDialog();
                    // // gameScene.openPopup(view);
                }
                // else {
                //     MsgBox.showPrompt(langConsts.errCode.e_rmt_binding_falid);
                // }
            }, self);
        }
        public CheckNoticeInfo() {
            let self = this;
            HttpUtil.CheckNotice({ agentId: CONF.agentId }, false, function (data: any) {
                let noticeDatas = self._noticeDatas = data;
                self.postEvent(AccountMo_EVT.check_svr_info, data);
                let newNotice = GameUtil.getLocal(GameUtil.LocalKey.NOW_NOTICE) as string;
                if (newNotice && noticeDatas) {
                    let noticeStr: string = "";
                    //将公告记录到缓存
                    for (let i = 0, len = noticeDatas.length; i < len; i++) {
                        let data = noticeDatas[i];
                        noticeStr += "_" + data.Id;
                    }
                    GameUtil.setLocal(GameUtil.LocalKey.NOW_NOTICE, noticeStr);
                }
            }, self);
        }
        private connectWorld() {
            let self = this;
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_send_msglist, function (data: NET_CONF.s2c_send_msglist) {
                let msgs = data.msgpaks;
                if (msgs) {
                    for (let msg of msgs) {
                        Net.decodeMsg(msg.msgid, msg.msginfo.length, msg.msginfo);
                    }
                }
            }, self);

            Net.regHandle(NET_CONF.S2C_ROUTE_TP.msg_t2t_start, self.onT2TStart, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_connect_result, self.onConnRes, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_asklogin_result, self.onLoginRes, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_update_playerhead_result, self.onHeadChange, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_update_nickname_result, self.onNickNameChange, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_update_sex_result, self.onSexChange, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_bind_reward, self.onBindReward, self);
            Net.regHandle(NET_CONF.S2C_ROUTE_TP.s2c_w2c_notify, self.onNotify, self);
            // Net.regHandle( NET_CONF.S2C_ROUTE_TP.s2c_w2c_notify, self.onHeadChange, self );

            Net.connect();
        }
        private onNotify(data: NET_CONF.s2c_w2c_notify) {
            let self = this;
            self._notifys.push(data);
            self.postEvent(NotifyMo_EVT.got_notify);
        }

        public popNotify(): NET_CONF.s2c_w2c_notify {
            return this._notifys.shift();
        }
        private onT2TStart() {
            let self = this;
            let args: NET_CONF.c2s_connect = {};
            args.account = self.accNm;
            args.token = self._token;
            args.sign = md5(args.account + args.token + "5C4BEE401828DF1D920F9CFD323C9AFA");
            args.platform = "default";
            args.login_platform = "web";
            //args.channelid = self.channel || 440001;

            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_connect, args);
        };

        private onConnRes(data: NET_CONF.s2c_connect_result) {
            let succ = data.result == langConsts.errCode.e_rmt_success;
            Net.loginFin(succ);

            if (succ) {
                this.gameId = data.gaming;
                TimeUtil.setSvrTm(data.servertime);

                //login
                //Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_asklogin, {});  
                this.askLogin();
            }
            else {
                if (data.result == langConsts.errCode.e_rmt_input_correct_code) {
                    //重新登入
                    this.reLogin();
                }
                else {
                    notifiCenter.postEvent(CONN_EVT.CONN_FAIL);
                }
            }
        }
        public askLogin() {
            let args: NET_CONF.c2s_asklogin = <any>{};
            args.channelid = this.channel || CONF.channelId;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_asklogin, args);
        }
        private onLoginRes(data: NET_CONF.s2c_asklogin_result) {
            let self = this;
            self.gameId = data.gaming || 0;
            self.setData(data.account_info);

            dataMgr.init();

            dataMgr.gameMo.setData(data.game_list || {});
            dataMgr.gsMo.restCoon();
            dataMgr.activityMo.askRedPoint();
            //断线重连时，立即发游戏消息 服务器收不到  这边延时100
            self.delayPostEvent(AccountMo_EVT.login_svr_fin, 100);
            //self.postEvent( NotifyMo_EVT.got_notify );
            // if (self.gameId > 0)
            // {
            //     if (_Reconnected && (_GameLogic != null) && (_GameLogic.onVerifySucess != null))
            //     {
            //         _GameLogic.onVerifySucess();
            //     }
            //     else
            //         _ClientLogic.enterGame();
            // }
            // else
            // {
            //     if (Net.isReCon && ( != null))
            //     {
            //         _ClientLogic.leaveGame();
            //     }
            //     else
            //         _ClientLogic.showLobby();
            // } 
        }

        public changeHead(icon: string) {
            let args: NET_CONF.c2s_update_playerhead = <any>{};
            args.headStr = icon;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_update_playerhead, args);
        }

        private onHeadChange(data: NET_CONF.s2c_update_playerhead_result) {
            if (data.result != langConsts.errCode.e_rmt_success) {
                msgPrompt.showErr(data.result);
            }
            else {
                this.setVal("icon_custom", data.headstr);
                let sex = data.headstr.indexOf("nan") >= 0 ? 1 : 2;
                this.changeSex(sex);
            }
        }

        public changeNickName(nickname: string) {
            let args: NET_CONF.c2s_update_nickname = <any>{};
            args.nickName = nickname;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_update_nickname, args);
        }

        private onNickNameChange(data: NET_CONF.s2c_update_nickname_result) {
            let self = this;
            if (data.result != langConsts.errCode.e_rmt_success) {
                msgPrompt.showErr(data.result);
            }
            else {
                //当前玩家的updateNicknameCount
                let count = self.getData().updateNicknameCount;
                if (count == 0) {
                    self.setVal("updateNicknameCount", ++count);
                    self.setVal("nickname", data.nickName);
                } else {
                    let curGold = self.getData().gold;
                    self.setVal("updateNicknameCount", ++count);
                    self.setVal("nickname", data.nickName);
                    self.setVal("gold", (curGold - confConsts.ConstTp.modifyNicknameCost));
                }
                let datas = self.getData();
            }
        }

        //1-男    2-女
        public changeSex(sex: number) {
            let args: NET_CONF.c2s_update_sex = <any>{};
            args.sex = sex;
            Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_update_sex, args);
        }

        private onSexChange(data: NET_CONF.s2c_update_sex_result) {
            let self = this;
            if (data.result != langConsts.errCode.e_rmt_success) {
                msgPrompt.showErr(data.result);
            } else {
                self.setVal("sex", data.sex);
            }
        }

        private onBindReward(data: NET_CONF.s2c_bind_reward) {
            let self = this;
            // let curGold = self.getVal("gold");
            // self.setVal("gold", (curGold+data.reward_gold));
        }
        // public checkChangeNickNameCount()
        // {

        // }

        // function do_packetw2c_enter_game_result(msgData){
        //     if (_AccountInfo.myInfo == null)
        //     {
        //         console.log("Error: do_packetw2c_enter_game_result before receive ask_login_result, result-", result);
        //         return;
        //     }
        //     var result = msgData.result;
        //     if (result != e_msg_result_def.e_rmt_success)
        //     {
        //         console.log("Error: do_packetw2c_enter_game_result return ", result);
        //         //_ClientLogic.enterGame();
        //     }
        //     else
        //     {
        //         _ClientLogic.enterGame();
        //     }
        // }

        // function do_packetw2c_leave_game_result(msgData){
        //     _ClientLogic.leaveGame();
        // }

        // function do_packetw2c_update_nickname_result(msgData){
        //     if(msgData.result == e_msg_result_def.e_rmt_success)
        //     {
        //         if (_AccountInfo.getUpdateNameCount() >= 1)
        //         {
        //             _AccountInfo.addPlayerGold(-_GetBaseValue("modifyNicknameCost"));
        //         }
        //         _AccountInfo.updateNameCount();
        //         _ClientLogic.processUpdateNicknameResult(msgData.nickName);
        //     }
        //     else if (msgData.result == e_msg_result_def.e_rmt_error_nickname)//   --昵称错误
        //         _M_ShowMsgTip("Msg_Result7");
        //     else if (msgData.result == e_msg_result_def.e_rmt_same_nickname)//     --昵称重复
        //         _M_ShowMsgTip("Msg_Result8");
        //     else
        //         _M_ShowMsgTip("InvalidName");
        // }

        // function do_packetw2c_update_sex_result(msgData){
        //     if(msgData.result == e_msg_result_def.e_rmt_success)
        //     {
        //         _ClientLogic.processUpdateSexResult(msgData.sex);
        //     }
        //     else
        //     {
        //         console.log("Error: packetw2c_update_nickname_result return failed: ", msgData.result);
        //         _M_ShowMsgTip("Failed");
        //     }
        // }

        // function do_packetw2c_change_photo_frame_result(msgData){
        //     if(msgData.result == e_msg_result_def.e_rmt_success)
        //     {
        //         _ClientLogic.processChangePhotoFrameResult(msgData.photoFrameId);
        //     }
        //     else
        //     {
        //         console.log("Error: packetw2c_update_nickname_result return failed: ", msgData.result);
        //         _M_ShowMsgTip("Failed");
        //     }
        // }

        // function do_packetw2c_player_kick(msgData){
        //     console.log("do_packetw2c_player_kick for ", msgData.kickType);// 0: "relogin"  1: "kick"
        //     if (msgData.kickType == 0)
        //         _M_ShowMsgTip("RepeatLogin5");
        //     else
        //         _M_ShowMsgTip("RepeatLogin4");
        // }

        //救济金领取成功后，更新本地领取次数
        public updateGetCount(): void {
            let self = this;
            ++self._data.collected;
            game.TipsMgr.showPrompt(StringUtil.printf(TRain.langMgr.getTxt("mainLang", langConsts.mainLang.AlmsGetInfo),
                game.DataFormat.convertGold(confConsts.ConstTp.almsGoldCount),
                confConsts.ConstTp.almsMaxCount - self._data.collected
            ));
            // self.postEvent("getSaveMoney");
        }
        public havePopNotice(): boolean {
            let self = this;
            let datas = self._noticeDatas || [];
            let tempDatas: INoticeData[] = [];
            let isOpen_2 = GameUtil.getLocal(GameUtil.LocalKey.NOTICE_2);
            let isOpen_3 = GameUtil.getLocal(GameUtil.LocalKey.NOTICE_3);
            let localSvrTm1 = parseInt(GameUtil.getLocal(GameUtil.LocalKey.NOTICE_TM_1));
            let localSvrTm2 = parseInt(GameUtil.getLocal(GameUtil.LocalKey.NOTICE_TM_2));
            let svrMsTm = TimeUtil.getSvrMS();
            let isEqual1 = TimeUtil.equalsDay(localSvrTm1, svrMsTm);
            let isEqual2 = TimeUtil.equalsDay(localSvrTm2, svrMsTm);
            for (let i = 0, len = datas.length; i < len; i++) {
                let data = datas[i];
                if (data.ShowStage == noticeType.one || data.ShowStage == noticeType.oneToOne) {
                    continue;
                } else if (data.ShowStage == noticeType.two) {
                    if (!isOpen_2) {
                        tempDatas.push(data);
                    }
                } else if (data.ShowStage == noticeType.three) {
                    if (!isOpen_3) {
                        tempDatas.push(data);
                    }
                } else if (data.ShowStage == noticeType.oneToTwo) {
                    //获取服务器时间
                    if (!isEqual1) {
                        tempDatas.push(data);
                    }
                } else if (data.ShowStage == noticeType.oneToThree) {
                    //获取服务器时间
                    if (!isEqual2) {
                        tempDatas.push(data);
                    }
                }
            }
            return tempDatas.length > 0;
        }
        public haveLoginNotice(): boolean {
            let self = this;
            let datas = self._noticeDatas || [];
            let tempDatas: INoticeData[] = [];
            for (let i = 0, len = datas.length; i < len; i++) {
                let data = datas[i];
                if (data.ShowStage == noticeType.two || data.ShowStage == noticeType.oneToTwo) {
                    continue;
                } else {
                    tempDatas.push(data);
                }
            }
            return tempDatas.length > 0;
        }
        //获取哪几条是新公告
        public isNewNotice(nId: string): boolean {
            let newNotice = GameUtil.getLocal(GameUtil.LocalKey.NOW_NOTICE) as string;
            if (newNotice) {
                let ids: string[] = newNotice.split("_");
                return ids.indexOf(nId) == -1;
            } else {
                return true;
            }
        }
        //获取当前是否是未读公告
        public isNoRead(nId: string): boolean {
            let NoReadNotice = GameUtil.getLocal(GameUtil.LocalKey.OVER_READ_NOTICE) as string;
            if (NoReadNotice) {
                let ids: string[] = NoReadNotice.split("_");
                return ids.indexOf(nId) == -1;
            } else {
                return true;
            }
        }
        //获有多少条未读
        public getNoReadNum(): number {
            let self = this;
            let NoReadNotice = GameUtil.getLocal(GameUtil.LocalKey.OVER_READ_NOTICE) as string;
            let noticeDatas = self._noticeDatas || [];
            let num: number = 0;
            if (NoReadNotice) {
                for (let i = 0, len = noticeDatas.length; i < len; i++) {
                    let data = noticeDatas[i];
                    let ids: string[] = NoReadNotice.split("_");
                    if (ids.indexOf(String(data.Id)) == -1) num++;
                }
            } else {
                num = noticeDatas.length;
            }
            return num;
        }
    }
}