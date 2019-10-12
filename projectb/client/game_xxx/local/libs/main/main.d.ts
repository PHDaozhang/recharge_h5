declare module game {
    /**
     * 界面窗口基类，此类界面必须使用open接口来打开。
     *
     * */
    class UIFWBase extends cui.Component {
        data: any;
        isFull: boolean;
        protected _aniWrap: TRain.AniWrapper;
        protected _needRes: boolean;
        private _openData;
        dispose(): void;
        protected onDispose(): void;
        open(parent: egret.DisplayObjectContainer, data?: any, fin?: (ui: UIFWBase) => void, tar?: any): void;
        close(): void;
        isOpened(): boolean;
        private _open();
        /**
         *
         * @param data 界面重新显示时， data为空
         */
        protected openImpl(data?: any): void;
        protected closeImpl(): void;
        protected _clsAni: TRain.IAniObj;
        protected getCloseAni(): TRain.IAniObj;
        protected _openAni: TRain.IAniObj;
        protected getOpenAni(): TRain.IAniObj;
        protected startAni(ani: TRain.IAniObj, fin?: Function, tar?: any): void;
        /**
         * 添加到舞台后且构建完成后调用
         * */
        protected onShow(stage: egret.Stage): void;
        /**
         * 移除舞台后触发
         * */
        protected onHide(): void;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        protected loadFWRes(): void;
        protected onLoadFin(): void;
    }
}
declare module game {
    interface IListen {
        once: boolean;
        tar: any;
        fun: (param1?: any, param2?: any) => void;
    }
    class Notification {
        private static _frees;
        static getListen(): IListen;
        static freeListen(data: IListen): void;
        private _listens;
        hasListener(evt: string, tar?: any): boolean;
        addListener(evt: string, fun: (param1?: any, param2?: any) => void, tar: any, once?: boolean): void;
        rmvListener(evt: string, target: any): void;
        rmvAllListener(target?: any): void;
        delayPostEvent(key: string, delay: number, param1?: any, param2?: any): void;
        postEvent(key: string, param1?: any, param2?: any): void;
    }
    let notifiCenter: Notification;
}
declare module game {
    /**
     * 界面窗口基类，此类界面必须使用open接口来打开。
     *
     * */
    class UIFullFW extends UIFWBase {
        /**
         * @
         * 舞台尺寸改变
         */
        protected onResize(w: number, h: number): void;
        /**
         * 添加到舞台后且构建完成后调用
         * */
        protected onShow(stage: egret.Stage): void;
        /**
         * 移除舞台后触发
         * */
        protected onHide(): void;
    }
}
declare module game {
    const enum PopupPriority {
        back = -10,
        normal = 0,
        layer1 = 100,
        top = 10000,
    }
    interface PopupDelegate {
        onPopupClose(popup: UIPopup): void;
        onPopupOpen(popup: UIPopup): void;
    }
    /**
     * 界面弹出窗口基类
     *
     * */
    class UIPopup extends UIFWBase {
        pri: number;
        delegate: PopupDelegate;
        useOnce: boolean;
        hideHome: boolean;
        hideChar: boolean;
        hideBg: boolean;
        bgClose: boolean;
        constructor();
        protected openImpl(data: any): void;
        protected getCloseAni(): TRain.IAniObj;
        protected closeImpl(): void;
    }
    class PopupLayer extends cui.Group {
        private _deque;
        private _canPop;
        private _bgImg;
        private _curPri;
        private _delayTag;
        delegate: LayerDelegate;
        constructor();
        startPop(): void;
        stopPop(): void;
        openPopup(ui: UIPopup, openData?: any): void;
        private _openPopup(popup, openData?);
        /**
         * 删除所有的弹出界面，包括队列内的
         * */
        closeAll(): void;
        private hasPopup();
        $childRemoved(child: egret.DisplayObject, index: number): void;
        protected update(): void;
        private reset();
    }
}
declare module game {
    interface IMsgPrompt {
        showErr(errCode: number): any;
        showPrompt(errCode: number): any;
    }
    let msgPrompt: IMsgPrompt;
    /**
     *
     * 数据类基类，内含有本地配置表数据_configData 和 服务器下发数据 _svrData。
     * 对数据操作逻辑
     *
     * */
    class DataModel extends Notification {
        confLoaded: boolean;
        confNm: string;
        protected _data: any;
        protected _lProps: (string | number)[];
        /**
         * 配置表加载完成后调用。再各自的数据类中解析客户端配置数据
         * */
        onLoadConf(data: any): void;
        setData(data: any): void;
        getData(): any;
        setVal(key: string | number, val: any): any;
        updateData(newData: any): void;
        addPropListener(propKey: string | number, fun: (param1?: any) => void, tar: any): void;
        rmvPropListener(propKey: string | number, tar: any): void;
    }
}
declare module game {
    interface LayerDelegate {
        showLayer(layer: cui.Group): void;
        hideLayer(layer: cui.Group): void;
    }
    class BaseScene extends cui.Group implements LayerDelegate {
        constructor();
        /**
         * @
         * 舞台尺寸改变
         */
        protected onResize(w: number, h: number): void;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        $hitTest(stageX: number, stageY: number): egret.DisplayObject;
        onMsgErr(errCode: number): void;
        showLayer(layer: cui.Group): void;
        hideLayer(layer: cui.Group): void;
    }
}
declare module game {
    module MsgBox {
        function showBoxCB(gp: string, key: string, fun: (tag: number) => void, tar: any): void;
        function showBox(gp: string, key: string | number): void;
        function showErr(errCode: number | string): void;
        function showPrompt(errCode: number | string): void;
    }
}
declare module game {
    class OpenFWAni implements TRain.IAniObj {
        private static props;
        tar: cui.BaseContainer;
        action: TRain.Action;
        private _props;
        constructor(tar: cui.BaseContainer);
        beforeAni(): void;
        endAni(): void;
    }
    class CloseFWAni implements TRain.IAniObj {
        private static props;
        tar: cui.BaseContainer;
        action: TRain.Action;
        private _props;
        constructor(tar: cui.BaseContainer);
        beforeAni(): void;
        endAni(): void;
    }
    class MoveXFWAni implements TRain.IAniObj {
        tar: cui.BaseContainer;
        action: TRain.Action;
        private _props;
        constructor(tar: cui.BaseContainer, isOut: boolean);
        beforeAni(): void;
        endAni(): void;
    }
}
declare module game {
    class EffectNode extends cui.Group {
        protected _inPly: boolean;
        protected _cb: {
            fun: (tar: any) => void;
            tar: any;
        };
        constructor();
        setTarget(cb: (tar: any) => void, tar: any): void;
        play(): void;
        protected aniFin(): void;
        dispose(): void;
    }
    class ImgEffect extends EffectNode {
        protected _img: cui.Image;
        protected _aniTm: number;
        protected _tag: number;
        constructor(img: cui.Image, showTm: number);
        play(): void;
        protected aniFin(): void;
        dispose(): void;
    }
    class ClipEffect extends EffectNode {
        protected _anitp: number;
        protected _clip: TRain.MovieClip;
        constructor(anitp: number, aniName: string);
        protected onLoadDataFinish(clipData: TRain.MovieClipData, anitp: number): void;
        play(): void;
        protected aniFin(): void;
        dispose(): void;
    }
    class EffectLayer extends cui.Group {
        delegate: LayerDelegate;
        private _deque;
        dispose(): void;
        isPlaying(): boolean;
        addEffect(node: EffectNode): void;
        showEffect(node: EffectNode): void;
        clearAll(): void;
        $childRemoved(child: egret.DisplayObject, index: number): void;
        private update();
    }
}
declare module CONF {
    let inner: number;
    let svrUrl: string;
    let res: string;
}
declare class Main extends egret.DisplayObjectContainer implements IMainDelegate {
    private _initThemeFin;
    private _preLoadFin;
    private loadingView;
    constructor();
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event);
    private loadThemeAndPre();
    private onThemeInitFin(event);
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event);
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event);
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event);
    private createScene();
    onGameShow(): void;
}
declare module TRain {
    interface IAniObj {
        tar: any;
        action: Action;
        beforeAni(): void;
        endAni(): void;
    }
    class AniWrapper {
        inAni: boolean;
        ani: IAniObj;
        private _tag;
        private _seqAct;
        private _acts;
        private _data;
        constructor();
        clear(): void;
        start(finFun?: Function, tar?: any): void;
        stop(): void;
        protected actFin(tar: any, notDo: boolean): void;
    }
    module WrapperMgr {
        function getWrapper(): AniWrapper;
        function freeWrapper(wrapper: AniWrapper): void;
    }
}
interface IMainDelegate extends egret.DisplayObjectContainer {
    onGameShow(): void;
}
interface IMainInfo {
    svrData: any;
    svrInfo: any;
    loginInfo: any;
    platConf: any;
}
declare module AppDelegate {
    function run(main: IMainDelegate): void;
}
declare module game {
    const enum MC_TYPE {
        UI = 0,
        EFFECT = 1,
        MAX_CNT = 2,
    }
    const enum CapabilityOS {
        Unknown = 0,
        iOS = 1,
        Android = 2,
        WinPhone = 3,
        WinPC = 4,
        MacOS = 5,
    }
    const enum RenderModeTp {
        canvas = 0,
        webgl = 1,
    }
    const enum EnterGameType {
        Normal = 1,
        Reconnect = 2,
    }
    const enum GAME_CONST {
        DESIGN_WIDTH = 1280,
        DESIGN_HEIGTH = 720,
        DESIGN_WIDTH_HALF = 568,
        DESIGN_HEIGTH_HALF = 320,
    }
    let c_zeroArr: number[];
    module GameUtil {
        let rm: RenderModeTp;
        let gc: boolean;
        function enCharCode(cryptKey: string, reqStr: string): string;
        /**
         * 计算次数恢复
         * @param 恢复数据 [恢复次数，上次恢复时间]
         * @param 恢复间隔时间 单位秒
         * @param 最大次数
         * */
        const enum LocalKey {
            ACC_NAME = "ACC_NAME",
            SERVERID = "SERVERID",
            MUSICID = "MUSICID",
            SFX_STATUS = "SFX_STATUS",
            MUSIC_STATUS = "MUSIC_STATUS",
        }
        function getLocal(key: string, defVal?: any): any;
        function getLocalBool(key: string, defVal?: boolean): boolean;
        function setLocal(key: string, val: string | boolean): void;
    }
}
declare module confConsts {
    const enum GameTp {
        doudizhu = 16,
        jinchanbuyu = 1,
        jinshayinsha = 12,
        zhajinhua = 17,
        bjl = 5,
        heihongmeifang = 10,
        longhudou = 32,
        brniuniu = 4,
        max = 33,
    }
}
declare module game {
    interface GmdConf {
        id: number;
        nm: string;
        file: string;
        ver0: string;
        ver1: string;
        wg: number;
    }
}
declare module langConsts {
    const enum errCode {
        e_rmt_unknow = 0,
        e_rmt_success = 1,
        e_rmt_fail = 2,
        e_rmt_change_gate = 3,
        e_rmt_connect_full = 4,
        e_rmt_player_max = 5,
        e_rmt_has_dial_lottery = 6,
        e_rmt_error_nickname = 7,
        e_rmt_same_nickname = 8,
        e_rmt_length_beyond_range = 9,
        e_rmt_gold_not_enough = 10,
        e_rmt_ticket_not_enough = 11,
        e_rmt_room_full = 12,
        e_rmt_vip_under = 13,
        e_rmt_level_under = 14,
        e_rmt_friend_full = 15,
        e_rmt_exists_friend = 16,
        e_rmt_player_not_exists = 17,
        e_rmt_runout_count = 18,
        e_rmt_time_not_arrive = 19,
        e_rmt_no_can_bet = 20,
        e_rmt_bet_index_error = 21,
        e_rmt_outof_bet_limit = 22,
        e_rmt_no_find_table = 23,
        e_rmt_pwd_not_same = 24,
        e_rmt_format_invalid = 25,
        e_rmt_need_set_pwd = 26,
        e_rmt_pwd_error = 27,
        e_rmt_not_find_item = 28,
        e_rmt_friend_offline = 29,
        e_rmt_not_in_game = 30,
        e_rmt_cant_buyitem = 31,
        e_rmt_cannot_add_self = 32,
        e_rmt_chat_too_often = 33,
        e_rmt_exp_not_enough = 34,
        e_rmt_level_max = 35,
        e_rmt_cannot_collect = 36,
        e_rmt_has_bind_phone = 37,
        e_rmt_code_error = 38,
        e_rmt_beyond_limit = 39,
        e_rmt_not_bind_phone = 40,
        e_rmt_cannot_sendto_self = 41,
        e_rmt_room_notopen = 42,
        e_rmt_bet_full = 43,
        e_rmt_game_begun = 44,
        e_rmt_banker_not_bet = 45,
        e_rmt_banker_is_full = 46,
        e_rmt_can_not_leave = 47,
        e_rmt_has_receive_reward = 48,
        e_rmt_not_recharge = 49,
        e_rmt_custom_head_freezing = 50,
        e_rmt_now_banker_first = 51,
        e_rmt_has_in_banker_list = 52,
        e_rmt_now_is_banker = 53,
        e_rmt_is_not_banker = 54,
        e_rmt_haven_apply_leave = 55,
        e_rmt_banker_not_enough = 56,
        e_rmt_banker_betgold_is_full = 57,
        e_rmt_other_betgold_is_full = 58,
        e_rmt_error_game_state = 59,
        e_rmt_box_not_exist = 60,
        e_rmt_box_has_opened = 61,
        e_rmt_thank_you_not_enough = 62,
        e_rmt_now_is_you = 63,
        e_rmt_banker_protect = 64,
        e_rmt_snatch_is_you = 65,
        e_rmt_snatch_is_low = 66,
        e_rmt_last_speaker_not_finish = 67,
        e_rmt_speaker_beyond_max_count = 68,
        e_rmt_roping_over = 69,
        e_rmt_activity_outofdate = 70,
        e_rmt_activity_not_satisfy_cond = 71,
        e_rmt_time_over = 72,
        e_rmt_not_follow = 73,
        e_rmt_not_follow_roping = 74,
        e_rmt_chip_not_enough = 75,
        e_rmt_month_card_out_date = 76,
        e_rmt_not_follow_prize_claw = 77,
        e_rmt_no_empty_seat = 78,
        e_rmt_player_prohibit = 79,
        e_rmt_can_not_change_table_setting = 80,
        e_rmt_player_have_no_enough_gold = 81,
        e_rmt_player_absent_room = 82,
        e_rmt_player_absent_desk = 83,
        e_rmt_can_not_leave_bet = 84,
        e_rmt_can_not_bet_hasbet = 85,
        e_rmt_cdk_used = 86,
        e_rmt_cdk_none = 87,
        e_rmt_cdk_notenough = 88,
        e_rmt_cdk_past = 89,
        e_rmt_betgold_not_enough = 92,
        e_rmt_shutdown = 93,
        e_rmt_has_inviter = 94,
        e_rmt_not_has_inviter = 95,
        e_rmt_binded_bank_card = 96,
        e_rmt_not_bind_bank_card = 97,
        e_rmt_inviter_error = 98,
        e_rmt_suggest_limit = 99,
        max = 100,
    }
    const enum mainLang {
        Version_Check = 0,
        Version_NetError = 1,
        Version_IsNew = 2,
        Version_DownloadFile = 3,
        Version_DownloadComplete = 4,
        Version_NeedUpdate = 5,
        Version_DownloadList = 6,
        Version_UpdateFail = 7,
        Version_Updating = 8,
        Version_NeedRedownload = 9,
        Version_Downloading = 10,
        Login_AccIsEmpty = 11,
        Login_AccIsShort = 12,
        Login_AccIsInvalid = 13,
        Login_PwdIsEmpty = 14,
        Login_PwdIsShort = 15,
        Login_AccIsExists = 16,
        Login_AccIsNotExists = 17,
        Login_AccOrPwdError = 18,
        Login_UnknownError = 19,
        Login_NetError = 20,
        Login_IsLogining = 21,
        Login_IsRegistering = 22,
        Login_RegisterSuccess = 23,
        Login_SystemError = 24,
        Login_NetErrorTitle = 25,
        Login_LoginSuccess = 26,
        Login_NeedRelogin = 27,
        Login_DownloadServerList = 28,
        Login_DownloadError = 29,
        Login_PhoneError = 30,
        Login_CodeError = 31,
        Login_AskCode = 32,
        Login_AskCodeSuccess = 33,
        Login_Reset = 34,
        Login_ResetSuccess = 35,
        Login_Init = 36,
        Login_GetAccount = 37,
        Login_NotInfo = 38,
        Login_Binging = 39,
        Login_AccountIsFormal = 40,
        Login_AccountIsNotFormal = 41,
        Login_DeviceIDError = 42,
        Login_PhoneCode = 43,
        Logic_InvalidDeviceID = 44,
        Login_Notice = 45,
        Net_ConnectServer = 46,
        Net_ConnectFail = 47,
        Net_ConnectSuccess = 48,
        Net_SelectGate = 49,
        Net_VerifyLogin = 50,
        Net_AskLogin = 51,
        Net_VerifyLoginFail = 52,
        Net_ReConnect = 53,
        Net_Confirm = 54,
        Net_Retry = 55,
        Net_ShutDown = 56,
        Download_Downloading = 57,
        Download_Wait = 58,
        Download_Complete = 59,
        Download_Fail = 60,
        Recharge_Success = 61,
        SendGiftTitle = 62,
        SendGiftContent = 63,
        GameNotOpen = 64,
        GoldNotEnough = 65,
        BetFull = 66,
        GetOnlineAward = 67,
        OnlineAwardIsOver = 68,
        TicketNotEnough = 69,
        StartBet = 70,
        StopBet = 71,
        WaitNewGame = 72,
        Big = 73,
        Small = 74,
        Leopard = 75,
        Point = 76,
        RoomNotOpen = 77,
        Text_Give = 155,
        MaintenanceNotify = 156,
        Mail_Title = 157,
        Mail_From = 158,
        Mail_Text = 159,
        Mail_Title_1 = 160,
        Mail_Text_1 = 161,
        Mail_Title_2 = 162,
        Mail_Text_2 = 163,
        BuyGold = 164,
        BuyTicket = 165,
        System = 166,
        Loading_Loading = 167,
        Setting_Success = 168,
        pwd_not_same = 169,
        pwd_error = 170,
        olpwd = 171,
        newpwd = 172,
        pwd_6_to_8 = 173,
        pwd1 = 174,
        pwd = 175,
        confirm_pwd = 176,
        cash = 177,
        deposit = 178,
        Enter_Money = 179,
        Enter_pwd = 180,
        Re_enter1 = 181,
        Re_enter2 = 182,
        Save_money = 183,
        Withdrawals = 184,
        Repeat_add_friend = 185,
        Send_add_friend = 186,
        NewAccountName = 187,
        not_add_self = 188,
        RoomGoldCondition = 189,
        RoomVipCondition = 190,
        BuySuccess = 191,
        OperationSuccess = 192,
        SendGift = 193,
        BetAreaFull = 194,
        OldInfo = 195,
        ChatTooOfen = 196,
        YouNowText = 197,
        LevelText = 198,
        YouNextText = 199,
        YouNeedText = 200,
        RMBText = 201,
        BroadcastHelpText = 202,
        VipInfo_1 = 203,
        VipInfo_2 = 204,
        VipInfo_3 = 205,
        VipInfo_4 = 206,
        VipInfo_5 = 207,
        VipInfo_6 = 208,
        AlmsIntroduce = 209,
        AlmsGetOver = 210,
        AlmsGetInfo = 211,
        not_search_self = 212,
        AlmsGetFail = 213,
        Choose_gift = 214,
        GoldToCharge = 215,
        TicketToCharge = 216,
        VipToCharge = 217,
        giftSuccess = 218,
        error_id = 219,
        addFirendSuc = 220,
        RoomGoldTip = 221,
        RoomVipTip = 222,
        BetMaxText = 223,
        FishLevelLimit = 224,
        SelfRank = 225,
        ServerText_1 = 226,
        ServerText_2 = 227,
        ServerText_3 = 228,
        ServerInfo_1 = 229,
        ServerInfo_2 = 230,
        ServerInfo_3 = 231,
        ServerTip = 232,
        RepeatLogin1 = 233,
        RepeatLogin2 = 234,
        RepeatLogin3 = 235,
        RepeatLogin4 = 236,
        NoNoticeText = 237,
        PlayerNameOverLong = 238,
        PhoneNumTip = 239,
        VerifyTip = 240,
        PhoneRepeat = 241,
        PhoneNumError = 242,
        PhoneTooOfen = 243,
        BindSuccess = 244,
        VerifyBefore = 245,
        VerifyNull = 246,
        VerifyError = 247,
        SendGoldTip = 248,
        SendGift1 = 249,
        SendGift2 = 250,
        SendGift3 = 251,
        SendGift4 = 252,
        SendGift5 = 253,
        selfSignature = 254,
        isFloor = 255,
        GoldError = 256,
        playername = 257,
        BeginBet = 258,
        DiceHelpText = 259,
        MaxGiftslimit = 260,
        GameBroadcast = 261,
        WHNBroadcast = 262,
        FishHitGoldMsg = 263,
        FishHitGiftMsg = 264,
        MoneyType1 = 265,
        MoneyType2 = 266,
        VipNotice = 267,
        BroadcastCdTip = 268,
        BroadcastTooOfen = 269,
        MailTitle = 270,
        MailSendName = 271,
        SendSuc = 272,
        MailReceiveName = 273,
        InputTitle = 274,
        InputDesc = 275,
        MailDeleteTip = 276,
        ReplyTip = 277,
        Get = 278,
        getCode = 279,
        InputPwd1 = 280,
        InputPwd2 = 281,
        changPwdText = 282,
        HeadFrameHaveText = 283,
        HeadFrameEquipText = 284,
        GiftText1 = 285,
        GiftText2 = 286,
        GiftText3 = 287,
        GiftText4 = 288,
        GetMailGift = 289,
        updateCusHead2 = 290,
        updateCusHeadFree = 291,
        updateCusHead1 = 292,
        ExChangeTip = 293,
        ExChangeGoldTip = 294,
        ExChangeTicketTip = 295,
        ExChangePhoneTip = 296,
        TimeFormat = 297,
        ChangeNameTip = 298,
        NameNotNull = 299,
        ChangeNamePayTip = 300,
        ChangeNameFirst = 301,
        ChargeErrorTip = 302,
        DataText = 303,
        ExChangeItemName = 304,
        ExChangeState = 305,
        ExChangeWait = 306,
        ExChangeSend = 307,
        ExChangeNoRecord = 308,
        betName = 309,
        betDesc = 310,
        betOdds = 311,
        betExample = 312,
        UpdateGame_Download = 313,
        UpdateGame_DownloadInfo = 314,
        UpdateGame_Update = 315,
        UpdateGame_UpdateInfo = 316,
        UpdateGame_Unzip = 317,
        input_error = 318,
        HitType1 = 319,
        HitType2 = 320,
        HitType3 = 321,
        HitType4 = 322,
        HitType5 = 323,
        SetPanelText_1 = 324,
        SetPanelText_2 = 325,
        SetPanelText_3 = 326,
        SetPanelText_4 = 327,
        SetPanelText_5 = 328,
        LoginOut = 329,
        LoginOutConfirm = 330,
        Retry = 331,
        GoldUpLimit = 332,
        SendGoldLimit = 333,
        AccountText = 334,
        PasswordText1 = 335,
        PasswordText2 = 336,
        notOpen = 337,
        GiftNotReceive = 338,
        GetMonthCardTip = 339,
        MonthCardRemainTime = 340,
        MonthCardBuyTip = 341,
        GoldUpLimitTip = 342,
        online = 343,
        not_online = 344,
        input_f_id = 345,
        gift_num = 346,
        ExChangeVipTip = 347,
        ExChangeTip1 = 348,
        ExChangeTip2 = 349,
        ModifyPwd = 350,
        PlayerInfoText1 = 351,
        PlayerInfoText2 = 352,
        PlayerInfoText3 = 353,
        PlayerInfoText4 = 354,
        PlayerInfoText5 = 355,
        NoMonthCard = 356,
        UsePhotoTip = 357,
        UseCameraTip = 358,
        OnLineCountText = 359,
        ExperienceVipDayText = 360,
        ExperienceVipHourText = 361,
        PlayerNum = 362,
        plyaer_win = 363,
        VipInfo_7 = 364,
        DiceHelpLab1 = 365,
        DiceHelpLab2 = 366,
        DiceHelpLab3 = 367,
        DiceHelpLab4 = 368,
        goldout = 369,
        LotteryTip1 = 370,
        LotteryTip2 = 371,
        LotteryTip3 = 372,
        LotteryTip4 = 373,
        LotteryWin = 374,
        LotteryThanks = 375,
        LotteryThanksNotEnough = 376,
        LotteryUseTicket = 377,
        LotteryWinTip = 378,
        LotteryFailTip = 379,
        err_not_phone = 380,
        err_not_bind = 381,
        err_timecd = 382,
        err_maxcount = 383,
        err_sendfailed = 384,
        err_sign_error = 385,
        err_data_error = 386,
        err_acc_error = 387,
        err_pwd_error = 388,
        err_system_error = 389,
        err_code_error = 390,
        err_weixin_error = 391,
        ExitGameTip = 392,
        Msg_AppStoreWait = 393,
        TimeText = 394,
        ContinueSendText2 = 395,
        ContinueSendText3 = 396,
        SendContentNotNull = 397,
        ContinueSendTip1 = 398,
        ContinueSendMaxCount = 399,
        ContinueSendRemainCount = 400,
        Login_AccountInfo = 401,
        Login_PasswordInfo = 402,
        Register_AccountInfo = 403,
        Register_PasswordInfo = 404,
        Register_PhoneNum = 405,
        Register_GetCode = 406,
        SafeBoxTip = 407,
        BcPlayerEnter = 408,
        touchGo = 409,
        Goldnotenough = 410,
        chongfanbiaoti2016 = 411,
        chongfanneirong1002016 = 412,
        chongfanneirong3002016 = 413,
        denglubiaoti20160207 = 414,
        denglubiaoti20160208 = 415,
        denglubiaoti20160209 = 416,
        denglubiaoti20160210 = 417,
        denglubiaoti20160211 = 418,
        denglubiaoti20160212 = 419,
        denglubiaoti20160213 = 420,
        dengluneirong20160207 = 421,
        dengluneirong20160208 = 422,
        dengluneirong20160209 = 423,
        dengluneirong20160210 = 424,
        dengluneirong20160211 = 425,
        dengluneirong20160212 = 426,
        dengluneirong20160213 = 427,
        BuySend = 428,
        ApplyToCharge = 429,
        RechargeTip = 430,
        nowRecharge = 431,
        BuyItemNeedVIP = 432,
        GetFirstFrameTip = 433,
        ActivityGetTip = 434,
        OnlineRemainTime = 435,
        OnlineOverTimer = 436,
        OnlineNotBegin = 437,
        DragonsTip1 = 438,
        DragonsTip2 = 439,
        DragonsTip3 = 440,
        DragonsTip4 = 441,
        DragonsTip5 = 442,
        DragonsTip6 = 443,
        NoticeSendTime = 444,
        NotHave = 445,
        DragonsTip7 = 446,
        EnterRoomGold = 447,
        EnterRoomVIP = 448,
        PokerGameIdx1 = 449,
        PokerGameIdx2 = 450,
        PokerGameIdx3 = 451,
        MonthCardSend1 = 452,
        MonthCardSend2 = 453,
        MonthCardSend3 = 454,
        ChipNotEnough = 455,
        ChipNotEnough2 = 456,
        FreeGoldInfo = 457,
        RewardLotteryInfo = 458,
        ReportTip = 459,
        FreeLotteryNotStar1 = 460,
        FreeLotteryStar1 = 461,
        FreeLotteryNotStar4 = 462,
        FreeLotteryStar4 = 463,
        FreeLotteryNotStar2 = 464,
        FreeLotteryStar2 = 465,
        FreeLotteryNotStar3 = 466,
        FreeLotteryStar3 = 467,
        FreeLotteryNotStar5 = 468,
        FreeLotteryStar5 = 469,
        FreeLotteryNotStar6 = 470,
        FreeLotteryStar7 = 471,
        FreeLotteryNotStar9 = 472,
        FreeLotteryStar9 = 473,
        FreeLotteryClick = 474,
        FreeLotteryNotStar = 475,
        FreeLotteryStar = 476,
        CowsBroadcast = 477,
        RechargeLotteryNotice = 478,
        StarLotteryNotice = 479,
        rechargeNotify = 480,
        RechargeNotify01 = 481,
        RechargeNotify02 = 482,
        RechargeNotify03 = 483,
        RechargeNotify04 = 484,
        RobotNotice01 = 485,
        RobotNotice02 = 486,
        RobotNotice03 = 487,
        RobotNotice04 = 488,
        RobotNotice05 = 489,
        RobotNotice06 = 490,
        RobotNotice07 = 491,
        ExchangeTelCharge = 492,
        AutoRegister = 493,
        TenThousand = 494,
        SendGiftLimitTip = 495,
        ConfirmPayment = 496,
        PriceRMBText = 497,
        PriceGemText = 498,
        FirstGiveGold = 499,
        GiveGold = 500,
        HaveBoughtItem = 501,
        WithdrawNotify = 502,
        WithdrawHistory = 503,
        RechargeHistory = 504,
        MaintenanceNotice = 505,
        UISafeBoxNew_receiverIDStr = 506,
        UISafeBoxNew_transferNumStr = 507,
        UISafeBoxNew_oldPassWordStr = 508,
        UISafeBoxNew_newPassWordStr = 509,
        UISafeBoxNew_againPassWordStr = 510,
        UISafeBoxNewReminder_passWordStr = 511,
        RoomEnterLimit = 512,
        transferDtailsStringFormat = 513,
        TransferAffirmDesc = 514,
        GoldIsNotEnough = 515,
        TicketIsNotEnough = 516,
        FindNotGame = 517,
        CowsGoldNotEnough = 518,
        RelieveSuccess = 519,
        FishLevelEnough = 520,
        FishGoldEnough = 521,
        Player_AutoEnter = 522,
        FishLevelInfo = 523,
        Debug_HighCount = 524,
        Debug_HighLimit = 525,
        Debug_SpecialLimit = 526,
        Debug_SpecialCount = 527,
        Debug_TotalProfit = 528,
        Debug_TotalStock = 529,
        Debug_Lucky = 530,
        Debug_TempIncome = 531,
        Debug_TotalIncome = 532,
        Debug_oddsType = 533,
        Recharge_First = 534,
        Recharge_Five = 535,
        Recharge_Continue = 536,
        Recharge_First_Content = 537,
        BetHas = 538,
        CopySuccess = 539,
        CowsGoldToCharge = 540,
        BindInfo = 541,
        AccountIsFormal = 542,
        Room_NeedGold = 543,
        NeedNewHead = 544,
        UpdateHeadSuccess = 545,
        ACIsBinded = 546,
        ACIsNotBind = 547,
        ACIsNotBindOrVerify = 548,
        ACAccountIsNull = 549,
        ACRealNameIsNull = 550,
        ACBindSuccess = 551,
        ACBindVerify = 552,
        ACTransferSuccess = 553,
        ACBindError = 554,
        ACInfoError = 555,
        FishGoldFormat = 556,
        Bank_NewRule = 557,
        Bank_Password = 558,
        Bank_PasswordRule = 559,
        Register_RefereeID = 560,
        BankPassword_and_LoginPassword = 561,
        Please_RechargeAmount = 562,
        Please_CashWithdrawal = 563,
        Please_AC = 564,
        Please_RealName = 565,
        WithdrawGoldTip = 566,
        MinChargeGoldTip = 567,
        MaxChargeGoldTip = 568,
        MinWithdrawGoldTip = 569,
        MaxWithdrawGoldTip = 570,
        ChargeURLErrorTip = 571,
        BindRewardTip = 572,
        Please_Draw = 573,
        Please_Deposit = 574,
        NotHaveAccountID = 575,
        TransSuccess = 576,
        AccountIDError = 577,
        TransNumError = 578,
        TransContent = 579,
        PaySuccessTip = 580,
        PayWayAipai = 581,
        TransAtten = 582,
        Tip_LeaveBankerList = 583,
        WithdrawInfo = 584,
        WithdrawInfoFail = 585,
        WithdrawInfoSuccess = 586,
        PayType1 = 587,
        PayType2 = 588,
        PayType = 589,
        WXNotOpen = 590,
        CanNotBetTip = 591,
        GameIp = 592,
        GameErweima = 593,
        SuccessNewHead = 594,
        SuccessChangeName = 595,
        AllBetTip = 596,
        SelfBetTip = 597,
        RegisterPhone = 598,
        ServiceInfo = 599,
        ProxyInfo = 600,
        PayTipsInfo1 = 601,
        PayTipsInfo2 = 602,
        PayTipsInfo3 = 603,
        PayTipsInfo4 = 604,
        Msg_ExitGame = 605,
        ChargePayedTip = 606,
        ShareText = 607,
        ShareCopySuccess = 608,
        NetErrorHost = 609,
        NetErrorPath = 610,
        CardBetError = 611,
        VersionPrompt = 612,
        CodeCountEnough = 613,
        PayFail = 614,
        MaxPayMoney = 615,
        BindInviterSuccess = 616,
        BindInviterError = 617,
        ShareLose = 618,
        BankIsBinded = 619,
        BindBankSuccess = 620,
        BindWeChatSuccess = 621,
        WeChatBinded = 622,
        BankIsError = 623,
        ContentIsNull = 624,
        ContentAlipayID = 625,
        ContentBankID = 626,
        RealName = 627,
        WeChatAccount = 628,
        WeChatName = 629,
        BankIsNotBind = 630,
        ServiceQQTip = 631,
        OpponentLeaveTable = 632,
        ShareLandingPageTitle = 633,
        ShareLandingPageContent = 634,
        ShareImageBg = 635,
        CaptureScreenTipIOS = 636,
        CaptureScreenTip = 637,
        CaptureScreenError = 638,
        AdviseTip = 639,
        PayIsClosed = 640,
        RoomTips = 641,
        BankerMinLimitTip = 642,
        InputHaveCardName = 643,
        InputBankAcc = 644,
        InputBodyCode = 645,
        InputBranch = 646,
        InputBankPhoneNum = 647,
        InputBankAccAgain = 648,
        BankAccIsNull = 649,
        BankReAccIsNull = 650,
        BankTypeIsNull = 651,
        BodyCodIsNull = 652,
        BodyNameIsNull = 653,
        InputBankDiffrent = 654,
        InputBodyCodeError = 655,
        InputBankAccError = 656,
        BankIsNotUsed = 657,
        accountAlreadyBindedInAppid = 658,
        WithdrawIsClosed = 659,
        TaskRemainedTimes = 660,
        TaskAwardGold = 661,
        TaskNameTip = 662,
        LobbyUITips0 = 663,
        LobbyUITips1 = 664,
        LobbyUITips2 = 665,
        LobbyUITips3 = 666,
        LobbyUITips4 = 667,
        LobbyUITips5 = 668,
        ShareGameIp = 669,
        ShareFailed = 670,
        AlipayBindError = 671,
        SevenDayTaskDone = 672,
        GameTaskDone = 673,
        GetDayRankReward = 674,
        GetWeekRankReward = 675,
        IncomeHistory = 676,
        ReceiveIncomeHistory = 677,
        UnlockHead = 678,
        CopyUrlSuccess = 679,
        RedPacketJoinInfo = 680,
        RedPacketJoinInfo1 = 681,
        max = 682,
    }
}
/**
 * Created by wjdeng on 2015/9/2.
 */
declare module game {
    let dataMgr: DataManager;
    class DataManager {
        accMo: AccountModel;
        promptMo: PromptModel;
        gameMo: GameModel;
        private _needLoads;
        constructor();
        private createMo(name, modelCls);
        loadConfs(): void;
        private startHeart();
        stopHeart(): void;
        private heartSync();
    }
}
declare module game {
    const enum SceneType {
        NONE = 0,
        LodingScene = 1,
        LoginScene = 2,
        GameScene = 3,
    }
    const enum DelayFlag {
        normal = 0,
        newday = 1,
    }
    let gameMgr: GameManager;
    class GameManager {
        private _loadStep;
        private _stepState;
        constructor();
        begin(main: IMainDelegate): void;
        private _main;
        private _scTp;
        private _curScene;
        gotoScene(tp: SceneType): void;
        private startLogin();
        /**
         * 登录游戏服务器
         * */
        /**
         * 进入游戏
         * */
        enterGame(): void;
        private startGame();
        private loadUpdate();
        private setStepState(state);
        private tryStartStep();
        private onGroupFined();
    }
}
declare module game {
    class RedBtn extends cui.ScaleButton {
        skRed: cui.Image;
        private _red;
        protected onPartAdded(): void;
        red: boolean;
    }
}
declare module game {
    interface ILoadShow {
        showBusy(): any;
        hideBusy(): any;
    }
    type PitchConf = {
        tx: number;
        ty: number;
        tw: number;
        bw: number;
        halfh: number;
        h: number;
        hTrans: number;
        slope: number;
        cx: number;
        cy: number;
        offA: number;
        offB: number;
    };
    type MapConf = {
        tile: number;
        w: number;
        h: number;
        tw: number;
        th: number;
        pitch: PitchConf;
        door: {
            res: string;
            layer: number;
            x: number;
            y: number;
        }[];
        obj: {
            res: string;
            layer: number;
            x: number;
            y: number;
            ox?: number;
            oy?: number;
        }[];
    };
    /**
     * 资源管理器
     *
     * */
    let resMgr: ResManager;
    const enum ResMgr_EVT {
        LINE_LOAD_FIN = "line_fin",
    }
    class ResManager {
        static confPath: string;
        loadShow: ILoadShow;
        mapConf: MapConf;
        private _iconRes;
        private _paths;
        private _parses;
        private _loadConf;
        private _loadcnt;
        private _lineLoads;
        private _lineLoadCnt;
        private _clrs;
        constructor();
        initResConf(data: any): void;
        getQualColor(qual: number): number;
        private _getIconSrc(key, arg1);
        getLoadCnt(): number;
        getParseCnt(): number;
        getConfUrl(name: string): string;
        loadConf(url: string, fin: Function, tar: any, isURL?: boolean): void;
        private loadConfFin(data, url);
        private parseConf();
        lineLoad(source: string, tp: string): void;
        private _lineLoad(source, tp);
        private _lineLoadFin();
    }
}
declare module game {
    const enum AccountMo_EVT {
        login_fin = "fin",
        got_svrinfo = "info",
        maintain = "mt",
    }
    class AccountModel extends DataModel {
        accNm: string;
        svrIp: string;
        gameId: number;
        isAuto: boolean;
        channel: number;
        private _token;
        protected _data: NET_CONF.msg_account_info;
        constructor();
        getData(): NET_CONF.msg_account_info;
        /**
         *
         * @param nm  游客则传null
         * @param pwd  游客则传null
         */
        login(nm: string, pwd: string): void;
        private connectWorld();
        private onT2TStart();
        private onConnRes(data);
        private onLoginRes(data);
    }
}
declare module game {
    class RedMenuItem extends cui.MenuItemImage {
        skRed: cui.Image;
        private _red;
        protected onPartAdded(): void;
        red: boolean;
    }
}
declare module game {
    interface IGameModule {
        init(): void;
        start(data: any): void;
        close(): void;
    }
    const enum GameMo_EVT {
        start_fin = "fin",
    }
    class GameModel extends DataModel {
        private _gmdConf;
        private _gmdList;
        private _curGMD;
        protected _data: NET_CONF.msg_game_info[];
        constructor();
        onLoadConf(data: any): void;
        getGmdConf(gid: confConsts.GameTp): GmdConf;
        getData(): NET_CONF.msg_game_info[];
        getCurGMD(): IGameModule;
        startGMD(gameId: confConsts.GameTp, data?: any): boolean;
        closeGMD(): void;
        private loadGMD(curGMD);
        private loadJs(curGMD);
        private loadRes(curGMD);
        private loadTheme(curGMD);
        private loadVer(curGMD);
        private loadGroup(curGMD);
        private tryLoadFin();
        private loadFin();
    }
}
declare module game {
    const enum PromptType {
        new_mem = 0,
        MAX = 1,
    }
    /**
     * 1. 不需要具体数据的  使用addRedObj 添加监视对象 注意不需要时  注意消除
     *
     *
     * 2.   需要具体数据 作提示的  由界面逻辑自己控制
     * 具体  大概是打开时 使用数据初始化  中间不更新  操作守后 取消提示且删除具体数据
     */
    interface IRedObj {
        red: boolean;
    }
    class PromptModel extends Notification {
        private _sts;
        private _stVals;
        private _reds;
        private _tmpReds;
        constructor();
        /**
         * 添加监听对象
         */
        addRedObj(obj: IRedObj, tps: PromptType[]): void;
        /**
         * 删除监听对象
         */
        rmvRedObj(obj: IRedObj): void;
        /**
         * 添加临时监听对象  在调用rmvTmpObjs
         */
        addTmpObj(obj: IRedObj, tps: PromptType[]): void;
        rmvTmpObjs(): void;
        hasStates(tps: PromptType[]): boolean;
        hasState(tp: PromptType): boolean;
        getStDatas(tp: PromptType): number[];
        hasStData(tp: PromptType, data: number): boolean;
        addStVals(tp: PromptType, addVals: number[]): void;
        rmvStVals(tp: PromptType, rmvVals: number[]): void;
        rmvStVal(tp: PromptType, rmvVal: number): void;
        setState(tp: PromptType): void;
        private setRed(reds, tp);
        private updateRed(reds, tp);
        cancelState(tp: PromptType): void;
    }
}
declare module game {
    class TwoTxtBtn extends cui.ScaleButton {
        skLab1: cui.Label;
        skLab2: cui.Label;
        protected onPartAdded(): void;
        lab1: string;
        lab2: string;
    }
}
/**
 * Created by wjdeng on 2015/9/6.
 */
declare module game {
    class BusyLayer extends cui.Group implements ILoadShow {
        private static inst;
        static getInst(): BusyLayer;
        private _gcon;
        private _aniTag;
        private _cnt;
        private _pcon;
        constructor();
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        $hitTest(): egret.DisplayObject;
        private hideAni();
        private showAni();
        showBusy(): void;
        hideBusy(): void;
        setParent(container: cui.BaseContainer): void;
        private update();
    }
}
declare module game.DataFormat {
    function formatGold(gold: number): string;
    /**
     * 获取角色头像资源
     * @param icon_custom
     */
    function getHeadIcon(icon_custom: string): string;
}
declare class LoadingUI extends egret.Sprite {
    private textField;
    constructor();
    createdView(): void;
    setProgress(current: any, total: any): void;
}
declare module game {
    const enum MCType {
        ui = 0,
    }
    /**
     * 界面有关常量
     *
     * */
    const enum UIConsts {
    }
    const enum UIColor {
        white = 16777215,
        green = 1041935,
        blue = 5551845,
        orange = 15648323,
        gray = 7829367,
        red = 15615301,
        yellow = 16763904,
        purple = 13762815,
        txt = 14602122,
        link = 968553,
        greeng = 1244928,
        COLOR_1 = 0,
        COLOR_2 = 16777215,
        COLOR_3 = 16711680,
        COLOR_4 = 16744192,
        COLOR_5 = 16776960,
        COLOR_6 = 65280,
        COLOR_7 = 255,
        COLOR_8 = 8855416,
        COLOR_9 = 11053224,
        COLOR_10 = 12632256,
        COLOR_11 = 15132922,
        COLOR_12 = 16770315,
        COLOR_13 = 1244928,
        COLOR_14 = 12237498,
        COLOR_15 = 16772735,
        COLOR_16 = 16743936,
        COLOR_17 = 11857588,
    }
    const enum ImgPrefix {
    }
    const enum LangGrp {
    }
    const enum HeadImg {
        head = "head@",
        headFrame = "headFrame@",
    }
    const enum UIFilerNm {
        grayCF = "grayCF",
    }
    const enum UIEvent {
        CHAT_CLOSE = "chat_cls",
    }
    module UIUtils {
        function secToStr(sec: number): string;
    }
}
declare module game {
    const enum UITag {
        NIL = 0,
        Home = 1,
        Game = 2,
        max = 3,
    }
    const enum PopupType {
        Vip = 201,
        Recharge = 202,
        FirRecharge = 203,
    }
    let gameScene: GameScene;
    /**
     * 游戏主逻辑界面，分层控制游戏内其他界面。
     *
     * */
    class GameScene extends BaseScene implements PopupDelegate {
        static createInst(): GameScene;
        private _curTag;
        private _curUI;
        private _homeUI;
        private _firstShow;
        private _mainUI;
        private _layers;
        private _mainLayer;
        private _popupLayer;
        private _inGame;
        private _hideHome;
        protected childrenCreated(): void;
        private _doGC();
        private addHandler();
        firstGame(): void;
        showLayer(layer: cui.Group): void;
        hideLayer(layer: cui.Group): void;
        private _showLayer(id, visible);
        /**
         * 显示大厅UI
         * @param value:number 界面码
         * @param data?:any 传递给界面的参数 可选。其中 lastUI:打开此界面的上一个界面
         * */
        showHallUI(tag: UITag, data?: any): void;
        /**
         * 显示游戏UI  注：游戏UI  tag 需要大于1000
         * @param openUI:传入要打开的界面
         * */
        showGameUI(tag: number, openUI: cui.Component, isMain?: boolean): void;
        getCurUI(): cui.Component;
        getCurTag(): UITag;
        private openFWUI(newUI?, tag?, isMain?);
        startGame(gameId: confConsts.GameTp): void;
        endGame(): void;
        goBack(): void;
        goHome(): void;
        openPopup(popup: UIPopup, data?: any): void;
        closeAllPopup(): void;
        onPopupOpen(popup: UIPopup): void;
        onPopupClose(popup: UIPopup): void;
        stopPopup(): void;
        startPopup(): void;
        addSceneEff(eff: EffectNode): void;
        /**
         * 同时播放多个场景特效，仅用于小特效
         */
        showSceneEff(eff: EffectNode): void;
    }
}
declare module game {
    class HomeView extends UIFullFW {
        skRoleTalk: cui.Label;
        skHeadImg: cui.Image;
        skName: cui.Label;
        skId: cui.Label;
        skHeadFrame: cui.Image;
        skBHead: cui.SimpleButton;
        skBSet: cui.SimpleButton;
        skGames: cui.DataGroup;
        private _txtArr;
        constructor();
        childrenCreated(): void;
        protected onShow(): void;
        protected onHide(): void;
        private initHead();
        private randomTxt();
        private initGames();
    }
}
declare module game {
    const enum ItemShowType {
        none = 0,
        tips = 1,
        pop = 2,
    }
    const enum PropmtShowType {
        prompt = 0,
        white = 1,
    }
    module TipsMgr {
        function init(): void;
        function setParent(parent: cui.Group, layerDelegate: LayerDelegate): void;
        function showPrompt(txt: string, type: PropmtShowType): void;
    }
}
declare module game {
    class ModName extends UIPopup {
        skBack: cui.ScaleButton;
        skName: cui.EditableText;
        skFirstLab: cui.Image;
        skSecondGp: cui.Group;
        skGold: cui.Label;
        skSure: cui.ScaleButton;
        skCancel: cui.ScaleButton;
        constructor();
        childrenCreated(): void;
        dispose(): void;
    }
}
declare module game {
    interface showIconData extends cui.IItemData {
        handle: iconHandler;
        icon: string;
        isChoose: boolean;
        isMask: boolean;
        tag: number;
    }
    interface iconHandler {
        iIconHandler(item: iconItem): any;
    }
    class PersonCenter extends UIPopup {
        skBack: cui.ScaleButton;
        skIconImg: cui.Image;
        skIconFrame: cui.Image;
        skName: cui.Label;
        skMod: cui.ScaleButton;
        skId: cui.Label;
        skAddresss: cui.Label;
        skList: cui.DataGroup;
        private _dataPro;
        private _curIcon;
        private _iconArr;
        constructor();
        childrenCreated(): void;
        updateIcon(): void;
        formatIconData(iconStr: string, num: number): showIconData;
        iIconHandler(item: iconItem): void;
        dispose(): void;
    }
    class iconItem extends cui.DataItem {
        skIcon: cui.Image;
        skChoose: cui.Image;
        skMask: cui.Group;
        skClick: cui.SimpleButton;
        constructor();
        childrenCreated(): void;
        dataChanged(): void;
    }
}
declare module game {
    class LoadingScene extends BaseScene {
        private static _inst;
        static getInst(): LoadingScene;
        private _view;
        constructor();
        protected childrenCreated(): void;
        dispose(): void;
        setLoadStep(msg: string, totalper: number, tm: number): void;
        isFinish(): boolean;
    }
}
declare module game {
    class LoadingView extends UIFWBase {
        slowSpeed: number;
        fastSpeed: number;
        private _nextPer;
        private _curPer;
        private _showPer;
        private _speed;
        private _stX;
        skProBar: cui.ProgressBar;
        skTip: cui.Label;
        skHead: cui.Group;
        skPer: cui.Label;
        constructor();
        protected onPartAdded(): void;
        protected getCloseAni(): TRain.IAniObj;
        protected getOpenAni(): TRain.IAniObj;
        protected onShow(): void;
        protected onHide(): void;
        private pbLabelFun(val);
        protected onDispose(): void;
        /**
         * totalper 为占100 的百分比 tm 预计时间 毫秒
         * */
        setLoadStep(msg: string, totalper: number, tm: number): void;
        isFinish(): boolean;
        private update(tm);
    }
}
declare module game {
    class CreateRole extends game.UIFWBase {
        skLogin: cui.Button;
        skInput: cui.EditableText;
        skRand: cui.ScaleButton;
        constructor();
        protected onPartAdded(): void;
        private doCreate();
        private doRandName();
        protected loadFWRes(): void;
        protected onLoadFin(): void;
    }
}
declare module game {
    class ForgotPwd extends UIPopup {
        skPhone: cui.EditableText;
        skCode: cui.EditableText;
        skPwd: cui.EditableText;
        skAgainPwd: cui.EditableText;
        skGetCode: cui.ScaleButton;
        skSure: cui.ScaleButton;
        skClose: cui.SimpleButton;
        constructor();
        childrenCreated(): void;
        private OnChangePhone(e);
        private OnChangeCode(e);
        private OnChangePwd(e);
        private OnChangeAgainPwd(e);
        getCode(): void;
        enSure(): void;
    }
}
declare module game {
    const enum loginTp {
        normal = 0,
        visitor = 1,
    }
    class LoginAccount extends UIFullFW {
        skAccountLab: cui.EditableText;
        skPwdLab: cui.EditableText;
        skLogin: cui.ScaleButton;
        skRegistered: cui.ScaleButton;
        skVtrLogin: cui.ScaleButton;
        skLookPwd: cui.ScaleButton;
        skForgotPwd: cui.ScaleButton;
        skKeFu: cui.ScaleButton;
        private _isLockPwd;
        constructor();
        childrenCreated(): void;
        private onFocus1(e);
        private onFocus2(e);
        private OnAccount(e);
        private OnPwd(e);
        private keFuBtn();
        private registeredView();
        private lookPwd();
        private openForgotView();
        private tapLogin(item);
    }
}
declare module game {
    interface IServerShortItem extends cui.IItemData {
        delegate: LoginLayer;
        select: boolean;
        icoState: string;
        serName: string;
        serverData: any;
    }
    const enum SerStatue {
        good = 1,
        normal = 2,
        full = 3,
    }
    class LoginLayer extends UIFullFW {
        skCurSvr: cui.Label;
        skSel: cui.SimpleButton;
        skEnter: cui.ScaleButton;
        delegate: LoginScene;
        constructor();
        protected onPartAdded(): void;
        protected openImpl(): void;
        private doLogin();
        private doSelSvr();
    }
}
declare module game {
    const enum LoginNavType {
        kLoginAccount = 0,
        kLoginLayer = 1,
        kLoginServer = 2,
        kLoginCreate = 3,
    }
    interface ICreateDelegate {
        onCreateFin(job: number, sex: number): void;
    }
    interface LoginDelegate {
        showView(page: LoginNavType, data?: any): any;
    }
    class LoginScene extends BaseScene implements LoginDelegate, LayerDelegate {
        private _platStartup;
        private _curView;
        constructor();
        protected childrenCreated(): void;
        /**
         * 平台管理启动完成
         * */
        private onPlatStartup();
        private startLogin();
        /**
         * 获取自己登录过的服务器列表完成
         * 准备弹出登录服务器界面
         * */
        private onMySvrFin();
        dispose(): void;
        showView(page: LoginNavType): void;
        private onNormalOpen(uiView);
    }
}
declare module game {
    class LoginServer extends game.UIFWBase {
        skRange: cui.DataGroup;
        skServer: cui.DataGroup;
        skAdvice: cui.DataGroup;
        private _index;
        private _rangeData;
        private _svrData;
        private _adviceData;
        delegate: LoginScene;
        constructor();
        protected onPartAdded(): void;
    }
    class LoginServerItem extends cui.DataItem {
        skImgSelected: cui.Image;
        skLabelContent: cui.Label;
        skIcoNew: cui.Image;
        skIcoStatus: cui.Image;
        skBtnMask: cui.SimpleButton;
        protected onPartAdded(): void;
        private tapBtnMask();
        protected dataChanged(): void;
    }
    class LoginServerRangeItem extends cui.DataItem {
        static ON_BTN_RANGE: string;
        skLabelName: cui.Label;
        skImgBg: cui.Image;
        skBtnRange: cui.SimpleButton;
        constructor();
        protected onPartAdded(): void;
        protected dataChanged(): void;
        private tapBtnRange();
    }
}
declare module game {
    class Registered extends UIPopup {
        skPhone: cui.EditableText;
        skCode: cui.EditableText;
        skPwd: cui.EditableText;
        skAgainPwd: cui.EditableText;
        skGetCode: cui.ScaleButton;
        skSure: cui.ScaleButton;
        skchoose: cui.ScaleButton;
        skClose: cui.SimpleButton;
        private _isAgreed;
        constructor();
        childrenCreated(): void;
        private chooseBtn();
        private OnChangePhone(e);
        private OnChangeCode(e);
        private OnChangePwd(e);
        private OnChangeAgainPwd(e);
        getCode(): void;
        enSure(): void;
    }
}
declare module game {
    class ItemTile extends cui.UITile {
        static props: string[];
        skIcon: cui.Image;
        skSel: cui.Image;
        skBg: cui.Image;
        skRed: cui.Image;
        skAni: cui.UIMovieClip;
        constructor(skinName?: string);
        hasProp(key: string): boolean;
        icon: string;
        bg: string;
        sel: boolean;
        ani: string;
    }
}
declare module game {
    module HttpUtil {
        interface ILoadShow {
            showBusy(): any;
            hideBusy(): any;
        }
        let busyUI: ILoadShow;
        let svrURL: string;
        function accLogin(args: {
            nm: string;
            channel: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function checkCode(args: {
            phone: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function bindAcc(args: {
            phone: string;
            pwd: string;
            nm: string;
            checkcode: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function getIp(showBusy: boolean, cb: Function, target: any): void;
        function reqURL(url: string, data: string, showBusy: boolean, cb: Function, target: any): void;
    }
}
declare module game {
    const enum CONN_EVT {
        RECONN = "re",
        CONN_SUCC = "succ",
        CONN_FAIL = "fail",
        CONN_CLOSE = "close",
    }
    type DecodeData = {
        off: number;
        data: egret.ByteArray;
    };
    module Net {
        let busyUI: ILoadShow;
        function init(ip: string): void;
        function regHandle(msgId: number, handler: (data: any) => void, tar: any): void;
        function unregHandle(msgId: number): void;
        function sendMsg(msgId: number, args: any): void;
    }
}
declare module game {
    module Package {
        function encode(msgId: number, len: number, buf: egret.ByteArray): void;
        function decode(data: egret.ByteArray): {
            id: number;
            len: number;
        };
    }
}
declare module game {
    module Protobuf {
        type ProtoInfos = {
            [key: string]: any[];
        };
        type ProtosList = {
            [key: number]: ProtoInfos;
        };
        function addEncodeProtos(routeProtos: ProtosList, typeProtos?: ProtosList): void;
        function addDecodeProtos(routeProtos: ProtosList, typeProtos?: ProtosList): void;
        function encode(msgId: number, data: any, buff: egret.ByteArray): egret.ByteArray;
        function decode(msgId: number, len: number, data: egret.ByteArray): any;
    }
}
declare module NET_CONF {
    const enum C2S_ROUTE_TP {
        c2g_heartbeat = 301,
        c2s_connect = 5001,
        c2s_asklogin = 5003,
        c2s_enter_game = 5004,
        c2s_command = 5005,
        c2s_ask_check_payment = 5006,
        c2s_ask_test_payment = 5007,
        c2s_leave_game = 5008,
        c2s_update_playerhead = 5010,
        c2s_update_nickname = 5011,
    }
    const enum S2C_ROUTE_TP {
        g2c_heartbeat = 404,
        msg_t2t_start = 444,
        s2c_connect_result = 7501,
        s2c_asklogin_result = 7503,
        s2c_enter_game_result = 7504,
        s2c_command_result = 7505,
        s2c_ask_check_payment_result = 7506,
        s2c_leave_game_result = 7507,
        s2c_update_playerhead_result = 7509,
        s2c_update_nickname_result = 7510,
    }
    type c2g_heartbeat = {
        packet_id?: number;
    };
    type c2s_connect = {
        packet_id?: number;
        account?: string;
        token?: string;
        sign?: string;
        platform?: string;
        login_platform?: string;
        machine_code?: string;
        machine_type?: string;
        channelid?: number;
    };
    type c2s_asklogin = {
        packet_id?: number;
    };
    type c2s_enter_game = {
        packet_id?: number;
        gameid?: number;
        gamever?: number;
        roomid?: number;
    };
    type c2s_command = {
        packet_id?: number;
        command?: string;
    };
    type c2s_ask_check_payment = {
        packet_id?: number;
        orderid?: string;
    };
    type c2s_ask_test_payment = {
        packet_id?: number;
        pay_type?: number;
        pay_value?: number;
    };
    type c2s_leave_game = {
        packet_id?: number;
    };
    type c2s_update_playerhead = {
        packet_id?: number;
        headStr?: string;
    };
    type c2s_update_nickname = {
        packet_id?: number;
        nickName?: string;
    };
    type g2c_heartbeat = {
        packet_id?: number;
    };
    type msg_t2t_start = {
        packet_id?: number;
    };
    type s2c_connect_result = {
        packet_id?: number;
        result?: number;
        servertime?: number;
        gaming?: number;
        ver?: string;
    };
    type s2c_asklogin_result = {
        packet_id?: number;
        account_info?: msg_account_info;
        game_list: msg_game_info[];
        gaming?: number;
    };
    type s2c_enter_game_result = {
        packet_id?: number;
        result?: number;
    };
    type s2c_command_result = {
        packet_id?: number;
        result?: number;
    };
    type s2c_ask_check_payment_result = {
        packet_id?: number;
        result?: number;
        pay_type?: number;
        pay_value?: number;
        vip_exp?: number;
        orderid?: string;
    };
    type s2c_leave_game_result = {
        packet_id?: number;
        shutdown?: boolean;
    };
    type s2c_update_playerhead_result = {
        packet_id?: number;
        headstr?: string;
        result?: number;
    };
    type s2c_update_nickname_result = {
        packet_id?: number;
        nickName?: string;
        result?: number;
    };
    type msg_game_info = {
        gameid?: number;
        gamever?: number;
        curOnlineNum?: number;
        isHot?: boolean;
    };
    type msg_account_info = {
        aid?: number;
        channelId?: number;
        nickname?: string;
        gold?: number;
        viplvl?: number;
        vipexp?: number;
        icon_custom?: string;
        sex?: number;
        Ticket?: number;
        curPhotoFrameId?: number;
        payids: number[];
        isSafeDepositBoxPwdEmpty?: boolean;
        safeBoxGold?: number;
        collected?: number;
        updateNicknameCount?: number;
        isBindMobilePhone?: boolean;
        create_time?: number;
        Privilege?: number;
        lastGameId?: number;
        isFormal?: boolean;
        BindInfo?: string;
        RealName?: string;
        Recharged?: number;
        inviter_id?: number;
        water?: number;
        inviter_reward_count?: number;
        withdraw?: number;
        sevenday_done?: boolean;
        quest_list: number[];
        limit_time_photo?: number;
        ipinfo?: string;
        inviter_reward?: number;
    };
    let c2sEncode: {
        "301": {
            "packet_id": number[];
        };
        "5001": {
            "packet_id": number[];
            "account": number[];
            "token": number[];
            "sign": number[];
            "platform": number[];
            "login_platform": number[];
            "machine_code": number[];
            "machine_type": number[];
            "channelid": number[];
        };
        "5003": {
            "packet_id": number[];
        };
        "5004": {
            "packet_id": number[];
            "gameid": number[];
            "gamever": number[];
            "roomid": number[];
        };
        "5005": {
            "packet_id": number[];
            "command": number[];
        };
        "5006": {
            "packet_id": number[];
            "orderid": number[];
        };
        "5007": {
            "packet_id": number[];
            "pay_type": number[];
            "pay_value": number[];
        };
        "5008": {
            "packet_id": number[];
        };
        "5010": {
            "packet_id": number[];
            "headStr": number[];
        };
        "5011": {
            "packet_id": number[];
            "nickName": number[];
        };
    };
    let s2cDecode: {
        "404": {
            "1": (string | number)[];
        };
        "444": {
            "1": (string | number)[];
        };
        "7501": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
        };
        "7503": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
        };
        "7504": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7505": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7506": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
        };
        "7507": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7509": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7510": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
    };
    let typeDecode: {
        "10": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
        };
        "11": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
            "8": (string | number)[];
            "9": (string | number)[];
            "14": (string | number)[];
            "16": (string | number)[];
            "19": (string | number)[];
            "20": (string | number)[];
            "21": (string | number)[];
            "22": (string | number)[];
            "26": (string | number)[];
            "27": (string | number)[];
            "36": (string | number)[];
            "44": (string | number)[];
            "46": (string | number)[];
            "47": (string | number)[];
            "48": (string | number)[];
            "49": (string | number)[];
            "52": (string | number)[];
            "53": (string | number)[];
            "54": (string | number)[];
            "55": (string | number)[];
            "56": (string | number)[];
            "57": (string | number)[];
            "58": (string | number)[];
            "59": (string | number)[];
            "60": (string | number)[];
            "61": (string | number)[];
        };
    };
}
declare module Base64 {
    function decode(str: string): string;
}
declare function md5(string: any): string;
declare module StringUtil {
    /**
     * 字符串补全。
     * @param src
     * @param fillStr
     * @param isPre
     * @returns {*}
     */
    function fill(src: any, fillStr: string, isPre?: boolean): string;
    /**
     * 格式化字符串
     * */
    function format(str: string, ...rest: any[]): string;
    function printf(str: string, ...rest: any[]): string;
}
declare module TimeUtil {
    const enum TimeConst {
        MONTHS_PER_YEAR = 12,
        DAYS_PER_WEEK = 7,
        HOURS_PER_DAY = 24,
        MINUTES_PER_HOUR = 60,
        SECONDS_PER_MINUTE = 60,
        SECONDS_PER_HOUR = 3600,
        SECONDS_PER_DAY = 86400,
        WEEKDAY_AT_FIRST_DAY = 4,
        MILLIS_PER_SECOND = 1000,
        MILLIS_PER_MINUTE = 60000,
        MILLIS_PER_HOUR = 3600000,
        MILLIS_PER_DAY = 86400000,
        SERVER_OPEN_DAY = 259200,
        DAYS_ONE = 1,
    }
    function setBeginTm(beginTm_s: number): void;
    function isFirstDay(): boolean;
    function setSvrTm(svrTm: number): void;
    /**
     * 获取当前服务器的时间戳，单位毫秒
     *
     * */
    function getSvrMS(): number;
    function getSvrSec(): number;
    /**
     *	@brief	获取相对当天具体时间点的时间
        *
        *	@param 	svrTm 服务器时间  单位毫秒
        *	@param 	offHour 	相当于0点的 移动值  时间点 单位小时
        *
        *	@return 时间戳 单位秒
        */
    function getRefreshTm(svrTm: number, refreshHour?: number): number;
    /**
     *	@brief	获取参数now当天的几点几分的time_t
        *
        *	@param 	time 要获取的当前时间 单位毫秒
        *	@param 	h 	时
        *	@param 	m 	分
        *	@param 	s 	秒
        *
        *	@return 时间戳 单位毫秒
        */
    function getTodayTm(msTm: number, h?: number, m?: number, s?: number, ms?: number): number;
    function getTowTm(now: number, h?: number, m?: number, s?: number): number;
    function getTowDiff(now: number, h?: number, m?: number, s?: number): number;
    /**
     * 判断是否为同一天
     * */
    function equalsDay(secTm1: number, secTm2: number): boolean;
}
declare module URLUtil {
    function getLocationParam(key: string): string;
    function getWebParam(key: string): any;
    function openURL(url: string): void;
    function changeWebURL(url: string): void;
    function getUserAgent(): string;
    function loadScript(src: string, cb: Function): void;
    function getGlobal(name: string): any;
}
