declare module URLUtil {
    function getLocationParam(key: string): string;
    function getLocationParams(): {
        [key: string]: string;
    };
    function getWebParam(key: string): any;
    function openURL(url: string): void;
    function changeWebURL(url: string): void;
    function getUserAgent(): string;
    function loadScript(src: string, cb?: Function): void;
    function getGlobal(name: string): any;
    function setGlobal(name: string, val: any): any;
    function hideLoad(): void;
    function copyText(value: string): void;
    function isHttps(): boolean;
}
declare module game {
    interface IListen {
        once: boolean;
        tar: any;
        fun: (param1?: any, param2?: any) => void;
    }
    const enum Noti_G_EVT {
        JS_ERR = "jserr",
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
    class UIFWBase extends cui.Component {
        protected _aniWrap: TRain.AniWrapper;
        private _openData;
        dispose(): void;
        protected onDispose(): void;
        private stopOpen();
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
        protected _clsAni: TRain.AniBase;
        protected getCloseAni(): TRain.AniBase;
        protected _openAni: TRain.AniBase;
        protected getOpenAni(): TRain.AniBase;
        protected startAni(ani: TRain.AniBase, fin?: Function, tar?: any): void;
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
        private loadFWRes(needRess);
        protected getNeedRes(): {
            res: string;
            tp?: string;
        }[];
        protected onLoadFin(): void;
    }
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
        private doResize(w, h);
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
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
        protected getCloseAni(): any;
        protected closeImpl(): void;
    }
    class PopupLayer extends cui.Group {
        private _deque;
        private _canPop;
        private _bgImg;
        private _curPri;
        private _delayTag;
        private _waitUI;
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
declare module TRain {
    class AniBase {
        tar: any;
        action: Action;
        protected _props: any;
        constructor(tar?: any);
        setData(...args: any[]): void;
        beforeAni(): void;
        endAni(): void;
        clear(): void;
    }
    class AniWrapper {
        inFree: boolean;
        inAni: boolean;
        ani: AniBase;
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
        getVal(key: string | number): any;
        addVal(key: string | number, val: number): any;
        setVal(key: string | number, val: any): any;
        updateData(newData: any): void;
        addPropListener(propKey: string | number, fun: (param1?: any) => void, tar: any): void;
        rmvPropListener(propKey: string | number, tar: any): void;
    }
}
declare module game {
    const enum GameResultTp {
        none = 0,
        win = 1,
        lose = 2,
        peace = 3,
        peaceSmall = 4,
    }
    interface IGameResult {
        r: GameResultTp;
        pt?: number;
    }
    const enum RouteTp {
        zhupanlu = 0,
        dalu = 1,
        dayanzailu = 2,
        xiaolu = 3,
        xiaoqianglu = 4,
        max = 5,
    }
    const enum RouteConst {
        overRmvcnt = 1,
        maxRow = 6,
        maxHisCnt = 100,
    }
    const enum RouteMo_EVT {
        DATA_CHANGE = "d_change",
        DATA_UPDATE = "d_update",
    }
    class RouteModel extends Notification {
        data2Zhupanlu: (data: any, param1?: any) => IGameResult;
        maxHisCnt: number;
        overRmvcnt: number;
        protected _historys: any[];
        protected _routes: IGameResult[][];
        protected _tmps: IGameResult[][][];
        protected _lastIdxs: number[];
        constructor(maxHisCnt?: number, overRmvcnt?: number);
        historys: any[];
        addHistory(data: any): void;
        getRouteData(tp: RouteTp | number): IGameResult[];
        getRouteLastIdx(tp: RouteTp | number): number;
        getForecast(): GameResultTp[][];
        protected freeArrs(list: IGameResult[][]): void;
        protected _handHistory(stIdx: number, resetSub?: boolean): void;
        protected shiftHistory(cnt: number): void;
        protected zpl2Dalu(list: IGameResult[], stIdx: number, ret: IGameResult[][]): void;
        protected calcSubs(daluList: IGameResult[][], reset?: boolean, stCol?: number, stRow?: number): void;
        protected resetSubs(): void;
        protected result2Sub(list: IGameResult[][], tp: RouteTp, col?: number, row?: number): void;
        /**
         *
         * @param ret 处理后 值存放的 一维数组
         * @param list 待处理的二维数组
         * @param col 有， 则从指定列开始
         * @param row 有， 则从指定行开始
         * @param free 是否要回收数组  内部使用， 外部不要使用
         */
        protected two2one(list: IGameResult[][], ret: IGameResult[], col: number, row: number): number;
        protected _result2Sub(list: IGameResult[][], col: number, row: number, doFun: (lists: IGameResult[][], col: number, row: number) => GameResultTp, ret: IGameResult[][]): void;
        protected calcDYZLResult(lists: IGameResult[][], col: number, row: number): GameResultTp;
        protected calcXLResult(lists: IGameResult[][], col: number, row: number): GameResultTp;
        protected calcXQLResult(lists: IGameResult[][], col: number, row: number): GameResultTp;
    }
}
declare module game {
    interface LayerDelegate {
        showLayer(layer: cui.Group): void;
        hideLayer(layer: cui.Group): void;
    }
    class BaseScene extends cui.Group {
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
    }
}
declare module game {
    abstract class ActBaseView extends cui.Component {
        private _curPage;
        private _ruleView;
        private _gameView;
        constructor(tp: confConsts.ActTp);
        protected childrenCreated(): void;
        protected abstract updateData(data: any): any;
        protected abstract updateAwd(data: any): any;
        openRule(type: confConsts.ActTp): void;
        openGames(type: confConsts.ActTp): void;
        dispose(): void;
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
        skFont: cui.BitmapLabel;
        constructor(skinName?: string);
        hasProp(key: string): boolean;
        icon: string;
        bg: string;
        sel: boolean;
        ani: string;
        font: string;
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
declare let nativeInterface: any;
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
    type WebLoginData = {
        acc: string;
        info: string;
        gameip: string;
        gameId: number;
        homeUrl?: string;
    };
    let c_zeroArr: number[];
    module GameUtil {
        let os: CapabilityOS;
        let rm: RenderModeTp;
        let gc: boolean;
        let isWebLogin: boolean;
        let webLoginData: WebLoginData;
        const enum GAME_EVT {
            enter_game_fin = "enter_fin",
        }
        function enCharCode(cryptKey: string, reqStr: string): string;
        /**
         * 计算次数恢复
         * @param 恢复数据 [恢复次数，上次恢复时间]
         * @param 恢复间隔时间 单位秒
         * @param 最大次数
         * */
        function loadParam(): void;
        function loadMo(fileNm: string): void;
        function loadMoRes(fileNm: string, cb: () => void, tar: any): void;
        const enum LocalKey {
            ACC_NAME = "ACC_NAME",
            SERVERID = "SERVERID",
            MUSICID = "MUSICID",
            SFX_STATUS = "SFX_STATUS",
            MUSIC_STATUS = "MUSIC_STATUS",
            LAST_GAME = "LAST_GAME",
            NOTICE_2 = "NOTICE_2",
            NOTICE_3 = "NOTICE_3",
            NOTICE_TM_1 = "NOTICE_TM_1",
            NOTICE_TM_2 = "NOTICE_TM_2",
            NOW_NOTICE = "NOW_NOTICE",
            OVER_READ_NOTICE = "OVER_NOTICE",
            ISOVERPOP_BINDREWARD = "BINDREWARD",
            ISOVERPOP_FIRSTRECHANGE = "FIRSTRECHANGE",
            OVER_READ_Activity = "OVER_Activity",
        }
        function getLocal(key: string, defVal?: any): any;
        function getLocalBool(key: string, defVal?: boolean): boolean;
        function setLocal(key: string, val: string | boolean): void;
        function playClickSound(): void;
    }
}
declare module game {
    class BankerView extends game.UIPopup {
        private skDBAniGetBank;
        private skDBAniLeaveBank;
        private skShangZ;
        private skSZHead;
        private skSZHeadBack;
        private skSZName;
        private _isleave;
        private _bankerInfo;
        constructor();
        childrenCreated(): void;
        setIsLeave(isLeave: any): void;
        setBankerInfo(info: any): void;
        playToBanker(): void;
        updateBanker(bankerGold: any, income: any, limitGold: any): boolean;
        playLeaveBanker(): void;
        protected onDispose(): void;
    }
}
declare module game {
    let goldMgr: GoldMange;
    type PlayerDatas = {
        player_id: number;
    }[];
    type betDatas = {
        bet_golds: number;
        master_bets?: master_bets;
    }[];
    type master_bets = {
        player_id: number;
        player_bets: number;
    }[];
    class GoldMange {
        private _particleWrapper;
        private _parent;
        private _plyData;
        private _flyState;
        private _startPos;
        private _endPosArr;
        private _firData;
        private _secData;
        private _othFirGold;
        private _othSecGold;
        private _areaNum;
        private _spcNum;
        private _isFly;
        constructor();
        setParent(parent: cui.BaseContainer): void;
        setAreaNum(num: number, spcNum?: number): void;
        initData(data: PlayerDatas): void;
        setStartPoint(point: cui.IPointData): void;
        addEndPoint(point: cui.IPointData[]): void;
        private getOtherGold(betDate);
        private getSixGold(plyData, betData);
        getGold(betData: betDatas): {
            other: any[];
            six: any[];
        };
        private flyStar(toArea, fin?, tar?);
        reset(): void;
        clear(): void;
    }
}
declare module game {
    interface MomentMediator {
        onReturn(): void;
    }
    class MomentView extends UIFullFW {
        skImgName: cui.Image;
        skBtnReturn: cui.ScaleButton;
        skList: cui.DataGroup;
        skNotify: cui.Group;
        private _arr;
        constructor();
        childrenCreated(): void;
        protected onReturn(): void;
        setData(itemRen: any, source: any[]): void;
    }
}
declare module game {
    class playerInfoView extends cui.SimpleButton {
        skHead: cui.Image;
        skHeadFrame: cui.Image;
        skbackGuang: cui.Image;
        skteshu: cui.Image;
        skFont: cui.BitmapLabel;
        skNickName: cui.Label;
        skgold: cui.Label;
        skJiao: cui.Image;
        private _date;
        cleanDate(): void;
        setData(data: any, rank: any): void;
        formatString(str: string): string;
        updateGold(data: any, isAward: boolean, gold?: number): void;
    }
}
declare module game {
    interface hallPlayerListShowData extends cui.IItemData {
        rankid: number;
        player_head_custom: string;
        player_vip_lv: string;
        player_nickname: string;
        win_count: number;
        play_cnt: number;
        player_gold: number;
        bets: number;
    }
    class PlayerListView extends game.UIPopup {
        skBack: cui.ScaleButton;
        skplyHead: cui.Image;
        skplyHeadF: cui.Image;
        skList: cui.DataGroup;
        skDushen: cui.Label;
        skwinCount: cui.Label;
        skplayCount: cui.Label;
        skgold: cui.BitmapLabel;
        skbets: cui.BitmapLabel;
        private _itemPro;
        private _data;
        constructor();
        childrenCreated(): void;
        setData(data: any): void;
        updateView(): void;
    }
    class PlayerListItem extends cui.DataItem {
        skfuhao: cui.Image;
        skplyHead: cui.Image;
        skplyHeadF: cui.Image;
        sknickname: cui.Label;
        skwinConut: cui.Label;
        skplayCount: cui.Label;
        skgold: cui.BitmapLabel;
        skbets: cui.BitmapLabel;
        skrank: cui.BitmapLabel;
        skJiao: cui.Image;
        constructor();
        childrenCreated(): void;
        protected dataChanged(): void;
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
        robcow = 18,
        benchibaoma = 23,
        hhdz = 40,
        gan28 = 31,
        hlgz = 3,
        dzpk = 30,
        ernn = 34,
        srnn = 39,
        ermj = 21,
        srmj = 28,
        sgbf = 37,
        shz = 22,
        wrdz = 29,
        sgj = 20,
        tbnn = 36,
        yydb = 33,
        ttz = 35,
        slwh = 26,
        hlzz = 14,
        rywz = 44,
        hch = 43,
        yqcm = 56,
        dfdc = 42,
        ssq = 52,
        hcdh = 53,
        fkby = 27,
        dntg = 25,
        lkpy = 24,
        lpxy = 55,
        lpak = 54,
        lp = 41,
        sss = 38,
        wbdj = 58,
    }
    const enum ConstTp {
        base_gold = 100,
        base_ticket = 0,
        base_chip = 0,
        signatureMaxLength = 80,
        giftDepreciation = 100,
        friendLimit = 50,
        noticeCdTime = 30,
        all_notice_player = 5000,
        worldChatInterval = 5,
        almsGoldCount = 50,
        almsLimit = 30,
        almsMaxCount = 6,
        nickNameMaxLength = 16,
        bindCount = 3,
        bindCodeExpiryDate = 60,
        isOpenGuide = 0,
        isAutoConnect = 1,
        isInsertAnySdk = 0,
        sendGiftLogMaxCount = 50,
        sendMailLogMaxCount = 50,
        UpdateIcon = 10000,
        modifyNicknameCost = 500,
        costType = 1,
        exchangeMaxCount = 50,
        updateGameList = 300,
        updateMailPoint = 60,
        isOfflineVersion = 0,
        defaultvip = 0,
        firstGameId = 1,
        isApple = 0,
        lotteryBigPrize = 30000,
        lotterySmallPrize = 500,
        ticketLotteryCost = 20,
        lotteryBoxCount = 0,
        thankYouJoinExchangeTicket = 5,
        thankYouExchangeLimit = 20,
        tankkYouCountLimit = 999,
        continuousVipCount = 1,
        continuousSendSpeakerCost = 5000,
        continuousSendSpeakerInterval = 120,
        continuousSendTime1 = 10,
        continuousSendTime2 = 100,
        continuousSendTime3 = 1000,
        continuousSpeakerMaxCount = 1000,
        ptotectTime = 604800,
        FreeSpeakerLevel = 9,
        rechargeNumSpeaker = 30,
        silverMember = 100,
        goldMember = 1000,
        notifyEnterGameVipLevel = 3,
        DiceCondition = 3000,
        MinLifeTime = 1800,
        MaxLifeTime = 7200,
        MaxGold = 400000000,
        DiscountVIP = 11,
        DiscountValue = 100,
        StarMax = 50,
        AwardMax = 100000,
        BaseChip = 200,
        ChipRate = 50,
        StarCount = 20,
        RobotNoticeMinTime = 10,
        RobotNoticeMaxTime = 20,
        SendGiftLimit = 200000,
        safeBoxLogMaxCount = 50,
        InitRobot = 1000,
        MoneyBase = 100,
        BindReward = 100,
        MinChargeGold = 1000,
        MaxDefaultChargeGold = 300000,
        MaxChargeGold3 = 500000,
        MinWithdrawGold = 10000,
        MaxWithdrawGold = 5000000,
        ExtraWithdrawGold = 600,
        WithdrawCost = 50,
        DefaultDiscount = 100,
        MinDiscount = 90,
        VerifyTime = 60,
        CheckPayLimit = 0,
        InviterTipReceiveMinGold = 100,
    }
    const enum SoundTp {
        click = "click",
        back = "back",
        bonus = "bonus",
        coins = "coins",
        popup = "popup",
        lvup = "lvup",
        charge = "charge",
        BG00 = "BG00",
        BG309 = "BG309",
        ReceiveGold1 = "ReceiveGold1",
        arcade = "arcade",
        gold = "gold",
        dating = "dating",
        denglu = "denglu",
        bangdingyouli = "bangdingyouli",
        fenxiang = "fenxiang",
        kefu = "kefu",
        yinghang = "yinghang",
        shangcheng = "shangcheng",
        shouchong = "shouchong",
        sevenDay = "sevenDay",
        xianshixuanshang = "xianshixuanshang",
        email = "email",
        personInfo = "personInfo",
        count_down = "count_down",
        countdown_3 = "countdown_3",
        countdown_2 = "countdown_2",
        countdown_1 = "countdown_1",
        countdown_open = "countdown_open",
        onBet = "on_bet",
        bet = "bet",
        jiesuan2 = "jiesuan2",
        jetton = "sound_jetton",
        win_bet = "win_bet",
        fanpai = "fanpai",
        fapai2 = "fapai2",
    }
    const enum PluginsTp {
        recharge = 10000,
    }
    const enum ComResTp {
        mk_bg = "common@mk_bg",
        back1 = "menuList@back",
        Poker01 = "card@ddzPoker",
        Poker02 = "poker",
        girlHead = "head@nv_",
        manHead = "head@nan_",
        headframe = "head@new",
        vip = "vip@v",
        txt_lose = "common@txt_lose",
        txt_notHit = "common@txt_notHit",
        txt_notBet = "common@txt_notBet",
        notMusic = "menuList@notMusic",
        music = "menuList@music",
        pull_off = "menuList@top",
        pull_on = "menuList@bottom",
        game_rules = "menuList@question",
        bottomScore = "common@txt_df",
        juNum = "common@txt_js",
        admission = "common@txt_rc",
        yuan = "common@txt_y",
        diban_db = "diban",
        store = "common@txt_shop",
        Chip = "chip@",
        txt_robZhuang = "banker@txt_robZhuang",
        txt_kamisho = "banker@txt_kamisho",
        txt_shimosho = "banker@txt_shimosho",
        txt_againBet = "chip@txt_againBet",
        txt_getGold = "common@txt_getGold",
        txt_applyZhuang = "banker@txt_applyZhuang",
        txt_applyShimosho = "banker@txt_applyShimosho",
        close = "common@close",
        txt_enter = "common@txt_enter",
        fastMatching = "common@txt_quickMa",
        bottomRes = "dingbu",
        txt_you = "banker@txt_you",
        txt_zhuang = "banker@txt_zhuang",
        rank = "common@rank",
        gold = "common@gold",
        zhuangSign = "banker@txt_bZhuang",
        redCircle = "common@redCircle",
        greenCircle = "common@greenCircle",
        nihezhuang_db = "jieSuan",
        txt_allKill = "banker@txt_allKill",
        ListTable = "listTable",
        tableBg = "tablesBg",
        list_zhuang = "zhuangList",
        listBg = "txt_ListBg",
        momentBg = "momentBg",
        txt_rules = "common@txt_rules",
        txt_gameOver = "common@txt_gameOver",
        bottomBg = "common@goldBottom",
        txt_win = "common@txt_win",
        decoration = "common@decoration",
        ruleBg = "ruleBg",
        rule = "rule",
        nameBg = "common@nameBg",
        countDown = "common@djsBg",
        pureOn = "menuList@pureOn",
        pureOff = "menuList@pureOff",
        Popup01 = "menuList@db01",
        Popup02 = "menuList@db02",
        enterGame = "moment@txt_enterGame ",
        selectBar = "pic_xuanchangBar",
        arrow = "common@pic_jushujiantou",
        back2 = "common@back",
        girlBg = "renwu_xuanchang",
        QuickStart = "txt_QuickStart",
        guizuchangIcon = "common@guizuchang",
        huangjiachangIcon = "common@huangjiachang",
        newScene = "txt_newScene",
        paibe = "newPoker0",
        pic_v = "vip@pic_v",
        PlayerList = "txt_wjdb",
        PListNeiDi = "txt_wjnd",
        Add = "chip@txt_doubleBet",
        chipchoose = "chip@chipchoose",
        pailu = "common@pailu",
        daluOff = "common@txt_dl_off",
        daluOn = "common@txt_dl_on",
        quanluOff = "common@txt_ql_off",
        quanluOn = "common@txt_ql_on",
        zplOff = "common@txt_off",
        zplOn = "common@txt_on",
        jiaobiao = "common@jiaobiao",
        zhuangxianDB = "common@txt_zhuangxian",
        PlayerFrame = "common@wanjiakuang",
        SpecialFrame = "common@teshukuang",
        xing = "common@xing",
        fuhao = "common@txt_fuhao",
        dushen = "common@txt_dushen",
        oldFrame = "head@old",
        panzhulu = "route@pzl_",
        selectNum = "route@num_",
        dayanzai = "route@dyz_",
        xiaolu = "route@xl_",
        xiaoquanlu = "route@xql_",
        pailuxian = "route@bg_",
        fapaiqi = "common@pic_fapaiqi",
        online = "common@txt_online",
        xuanchangBg = "txt_xuanchangBg",
        dalu = "route@dl_",
        dayan = "route@bigeyes_",
        xianxiao = "route@xx_",
        zhx = "route@bjl_",
        xiaolu1 = "route@xiaolu_",
        dxbz = "route@hltz_",
        lhh = "route@lhd_",
        qss = "route@jsys_",
        tablebBase = "paizhuo_diban",
        chipBase = "pic_chipdizuo",
        table_BG = "paizhuoBG1",
        ruleBg01 = "txt_ruleBg",
        pailuBg = "txt_pailuBg",
        zhxInner = "route@bjlInner_",
        daluInner = "route@dlInner_",
        numInner = "route@numInner_",
        pzlInner = "route@pzlInner_",
        xiaoluInner = "route@xiaoluInner_",
        xqlInner = "route@xqlInner_",
        xxInner = "route@xxInner_",
        bgPop = "route@bgPop_",
        dayanPop = "route@bigeyesPop_",
        zhxPop = "route@bjlPop_",
        daluPop = "route@dlPop_",
        dyzPop = "route@dyzPop_",
        pzlPop = "route@pzlPop_",
        xiaoluPop = "route@xiaoluPop_",
        xlPop = "route@xlPop_",
        xqlPop = "route@xqlPop_",
        xxPop = "route@xxPop_",
        Green = "route@dalulv_",
        dlNum = "route@dlNum_",
        hlgzPop = "route@txtHlgzPop_",
        hlgzInner = "route@txtHlgzIn_",
        labelInner = "common@pic_biaoqian",
        routeBg = "pailuBg",
        resultBg = "resultBg",
        upSide = "upSide",
        tablelBG1 = "paizhuoBG",
        routeUpBg = "paiLu@pailu_bg",
        routeUp = "paiLu@tou_",
        jin = "paiLu@txt_jing",
        jushengfu = "paiLu@txt_jushengfu",
        ruleBG1 = "txt_ruleBg1",
        star = "common@star",
        chip1 = "chip@num_",
        sevenDay = "hall@txt_qiriyoujiang",
        limitReward = "hall@txt_task",
        yqChip = "chip@yq_",
    }
    const enum ComFontTp {
        loseMul = "loseMup",
        winMul = "winMup",
        ruleMag = "ruleRatio",
        moment = "moment",
        gold = "gold",
        bjlJu = "bjlJu",
        bjlXian = "bjlXian",
        chip = "chip",
        endPoint = "endPoint",
        topJu = "topJu",
        publicMup = "publicMup",
        and = "and",
        tiger = "tiger",
        closeMup = "closeMup",
        quartetLose = "quartetLose",
        quartetWin = "quartetWin",
        closeLose = "closeLose",
        closeWin = "closeWin",
        playerList = "playerList",
        lhdJu = "lhdJu",
        lhdBet = "lhdBet",
        lhdTotal = "lhdTotal",
        dragon = "dragon",
        match = "match",
        cardPerCentS = "cardPerCentS",
        cardPerCentB = "cardPerCentB",
        cardJu = "cardJu",
        cardOutCome = "cardOutCome",
        cardRoad = "cardRoad",
        cardClock = "cardClock",
        playerGold = "playerGold",
        list = "list",
        clock = "clock",
        loseMon = "loseMon",
        playerRk = "playerRk",
        betY = "betY",
        betG = "betG",
        winMon = "winMon",
        beadRoad = "beadRoad",
        zhuangXianHe = "zhuangXianHe",
        cardTableFen = "cardTableFen",
        remain = "remain",
        remember = "remember",
        zjhEndPoint = "zjhEndPoint",
        remainNum = "remainNum",
        difenNum = "difenNum",
        tableCaichiGold = "tableCaichiGold",
        resultNumLose = "resultNumLose",
        resultNumWin = "resultNumWin",
        caiChiGold = "caiChiGold",
        fieldNum = "fieldNum",
        jushuNum = "jushuNum",
        ruChangFen = "ruChangFen",
        xuanchangDiFen = "xuanchangDiFen",
        hhmfRound = "hhmfRound",
        pokerNum = "pokerNum",
        BJLfuping = "BJLfuping",
        loseMoney = "loseMoney",
        winMoney = "winMoney",
        goldNum = "goldNum",
        chipNum = "chipNum",
        coldTime = "coldTime",
        dzpkBet = "dzpkBet",
        dzpkFollow = "dzpkFollow",
        jsysrouteNum = "JSYSrouteNum",
    }
    const enum ComDbTp {
        bjl = "bjl",
        brniuniu = "brniuniu",
        doudizhu = "doudizhu",
        heihongmeifang = "heihongmeifang",
        jinchanbuyu = "jinchanbuyu",
        jinshayinsha = "jinshayinsha",
        longhudou = "longhudou",
        zhajinhua = "zhajinhua",
        brnnwin = "brnnwin",
        brnnlose = "brnnlose",
        benchibaoma = "benchibaoma",
        robcow = "robcow",
        gameBegin = "gameBegin ",
        pingju = "pingju",
        wuhuaniu = "wuhuaniu",
        zhuang = "zhuang",
        touxiang = "touxiang",
        beishu = "beishu",
        chuntian = "chuntian",
        tishi = "tishi",
        dzBs = "dzBs",
        fanchuntian = "fanchuntian",
        feiji = "feiji",
        gzyz = "gzyz",
        liandui = "liandui",
        baozha = "baozha",
        vs = "vs",
        mbdc = "mbdc",
        shengli = "shengli",
        shibai = "shibai",
        pk = "pk",
        dg = "dg",
        shunzi = "shunzi",
        wangzha = "wangzha",
        wmpzz = "wmpzz",
        zhadan = "zhadan",
        jcbyTurret = "jcbyTurret",
        xiazhushou = "xiazhushou",
        hhdz = "hhdz",
        dzpk = "dzpk",
        erbagan = "gan28",
        hlgz = "hlgz",
        hhdzVS = "hhdzVS",
        jcbyHit = "jcbyHit",
        WaterWave = "WaterWave",
        yuchaolailin = "yuchaolailin",
        jcbyBomb = "jcbyBomb",
        jcbyAuto = " jcbyAuto",
        jcbyding = "jcbyding",
        jcbyGold = "jcbyGold",
        jcbyFlash = "jcbyFlash",
        jcbyLizi = "jcbyLizi",
        jcby1 = "jcby1",
        jcby2 = "jcby2",
        jcby3 = "jcby3",
        jcbyDie = "jcbyDie",
        erbagangDice = "erbagangDice",
        erbagangxipai = "erbagangxipai",
        ddzfuhao = "ddzfuhao",
        ddzpingmin = "ddzpingmin",
        ddztiyan = "ddztiyan",
        dzpkChip = "dzpkChip",
        dzpkFrame = "dzpkFrame",
        dzpkWaitBegin = "dzpkWaitBegin",
        dzpkWin = "dzpkWin",
        dzpkWinFrame = "dzpkWinFrame",
        guizuchang = "guizuchang",
        jcbyfuhao = "jcbyfuhao",
        jcbyguizu = "jcbyguizu",
        jcbypingmin = "jcbypingmin",
        jcbytiyan = "jcbytiyan",
        quickStart = "quickStart",
        qznnCaijin = "qznnCaijin",
        qznnTishi = "qznnTishi",
        renwu = "renwu",
        zjhfuhao = "zjhfuhao",
        zjhpingmin = "zjhpingmin",
        zjhtiyan = "zjhtiyan",
        zjhPK = "zjhPK",
        hlgzDice = "hlgzDice",
        hlgzWord = "hlgzWord",
        huangjiachang = "huangjiachang",
        tongchi = "tongchi",
        tongpei = "tongpei",
        jcbyBossCome = "jcbyBossCome",
        jcby4 = "jcby4",
        bcbmResult = "bcbmResult",
        jsysResult = "jsysResult",
        dzpkFuhao = "dzpkFuhao",
        dzpkPingmin = "dzpkPingmin",
        brnnjiepai = "brnnjiepai",
        brnnCaijin = "brnnCaijin",
        errenCardGirl = "errenCardGirl",
        fkbyGirl = "fkbyGirl",
        lhdWinFrame = "lhdWinFrame",
        niuniuGirl = "niuniuGirl",
        sssGirl = "sssGirl",
        yydbGirl = "yydbGirl",
        sgjGoldTurn = "sgjGoldTurn",
    }
    const enum DbNameTp {
        erbaGang = "dating_erbagang",
        baozha = "longhudou_lizi_baozha",
        beishu = "beishu",
        bcbm = "dating_bengchibaoma",
        bjl = "dating_baijiale",
        brnn = "dating_bairenniuniu",
        brnnLose = "bairenniuniu_paizhuo_lose",
        brnnWin = "bairenniuniu_paizhuo_win",
        chuntian = "chuntian",
        ddzfuhao = "xinhuang_jinchanbuyu_fuhaochan",
        ddzpingmin = "xinhuang_doudizhu_pingmingchan",
        ddztiyan = "xinhuang_doudizhu_tiyanchang",
        dg = "pk_daoguang",
        doudizhu = "dating_doudizhu",
        dizhuSign = "doudizhu_paizhuo_dizhu_biaoshi",
        dzpk = "dating_dezhoupuke",
        allin = "allin",
        dzChip = "chouma",
        jiantou = "jiantou",
        waikuang = "allin_waikuang",
        WaitBegin = "dengdaikaishi",
        win = "youwin",
        winFrame = "shengliwaikuang",
        left = "left_",
        crash = "pengzhuanglizi",
        right = "right_",
        xipai = "28gang_xipai",
        fanchuntian = "fanchuntian",
        feiji = "feiji",
        BeginSoon = "zhajinhua_youxijijiangkaishi",
        guizuchang = "xinhuang_zhajinhua_guizuchang",
        guzhiyizhi = "guzhiyizhi",
        hhmf = "dating_heihongmeifang",
        hhdzVS = "honghheidazhan_VS",
        hlgz = "dating_huanletouzi",
        dice1 = "touzi_01_0",
        dice2 = "touzi_02_0",
        dice3 = "touzi_03_0",
        dizuo = "touzi_dizuo",
        gaizi = "touzi_gaizi",
        wenzi1 = "kaishai_wenzi_",
        wenzi2 = "kaishai_wenzi_0",
        baozi = "kaishai_wenzi_baozi",
        da = "kaishai_wenzi_da",
        db = "kaishai_wenzi_db",
        lizi = "kaishai_wenzi_lizi",
        xiao = "kaishai_wenzi_xiao",
        hhdz = "dating_hongheidazhan",
        huangjiachang = "xinhuang_zhajinhua_huangjiachang",
        huolongzhu = "huolongzhu2",
        hlBomb = "huotongbaozhayan",
        dropGold = "xiajinbiyu",
        autoFire = "buyuzidongfapao",
        bomb = "buyu_baozha",
        bomb1 = "baozhagai_1",
        bomb2 = "baozhagai_4",
        bomb3 = "baozhagai_5",
        bomb4 = "dayubaozha",
        bomb5 = "dayubaozha2",
        bomb6 = "dayubaozha3",
        bomb7 = "hongyubaozha",
        bomb8 = "huotongbaozha",
        bomb9 = "shenshuizhadan_baozha",
        bomb10 = "xingxingbaozha",
        die = "xiaoyusiwang",
        ding = "dingzi",
        falsh = "hongyu_flash",
        byFuhao = "xinhuang_jinchanbuyu_fuhaochan",
        dropFrame = "GoldDropFrame",
        GoldPlate0 = "GoldPlate0",
        GoldPlate1 = "GoldPlate1",
        byGuizu = "xinhuang_jinchanbuyu_guizuchan",
        hit = "jinchanbuyu_paotai_jizhong",
        byHuangjia = "xinhuang_jinchanbuyu_huangjiac",
        lizi1 = "hongyulizi",
        lizi2 = "lihualizi1",
        lizi3 = "lihualizi2",
        lizi4 = "lihualizi3",
        byPingmin = "xinhuang_jinchanbuyu_pingmingc",
        byTiyan = "xinhuang_jinchanbuyu_tiyanchan",
        attack = "attack",
        stand = "stand",
        jcby = "dating_jinchanbuyu",
        jsys = "dating_jinshayinsha",
        liandui = "liandui",
        lhd = "dating_longhudou",
        mbdc = "mubiaodacheng",
        pingju = "paizhuo_pingju",
        pk = "PK",
        quickStart = "xinhuang_kuaisukaishi",
        caijin = "xinhuang_togbiniuniu_caijincua",
        huanpai = "huanpai",
        qiangzhuang = "qiangzhuang",
        xiazhu = "xiazhu",
        girl = "xinhuang_xuanchang_nvren",
        robcow = "dating_qiangzhuangniuniu",
        shengli = "paizhuo_shengli",
        shibai = "paizhuo_shibai",
        shunzi = "shunzi",
        kaipai = "common_paizhuo_kaipai",
        kaishaile = "common_paizhuo_kaishaila",
        beginBet = "common_paizhuo_kaishixiazhu",
        stopBet = "common_paizhuo_tingzhixiazhu",
        gameBegin = "common_paizhuo_youxikaishi",
        touxiang = "zhongjiang_touxiang",
        vs = "longhudou_vs",
        wangzha = "wangzha",
        WaterWave = "WaterWave_1",
        wmpzz = "wanmingpeizhuozhong",
        wuhuaniu = "qiangzhuangniuniu_wuhuaniu",
        xiazhushou1 = "zhajinhua_xiazhu_shou_xaizhu01",
        xiazhushou2 = "zhajinhua_xiazhu_shou_xaizhu02",
        yuchaolailin = "buyu_yuchaolailin",
        zhadan = "zhadan",
        zhajinhua = "dating_zhajinhua",
        zhuang = "qiangzhuangniuniu_zhuang",
        zjhFuhao = "xinhuang_zhajinhua_fuhaochang",
        zjhPingmin = "xinhuang_zhajinhua_pingmingchang",
        zjhLose = "zhajinhua_pk_lose",
        zjhWin = "zhajinhua_pk_win",
        zjhTiyan = "xinhuang_zhajinhua_tiyanchang",
        tongchi = "paizhuo_tongchi",
        tongpei = "paizhuo_tongpei",
        BossCome = "jinchanbuyu_bosslaixi",
        huolongzhu1 = "huolongzhua",
        baoma = "benchibaoma_jiesuan_baoma0",
        baoshijie = "benchibaoma_jiesuan_baoshijie0",
        benchi = "benchibaoma_jiesuan_benchi0",
        dazhong = "benchibaoma_jiesuan_dazhong0",
        gezi = "jinshayinsha_jiesuan_gezi",
        houzi = "jinshayinsha_jiesuan_houzi",
        jinsha = "jinshayinsha_jiesuan_jinsha",
        kongque = "jinshayinsha_jiesuan_kongque",
        laoying = "jinshayinsha_jiesuan_laoying",
        shizi = "jinshayinsha_jiesuan_shizi",
        jsystongchi = "jinshayinsha_jiesuan_tongchi",
        jsystongpei = "jinshayinsha_jiesuan_tongpei",
        tuzi = "jinshayinsha_jiesuan_tuzi",
        xiongmao = "jinshayinsha_jiesuan_xiongmao",
        yingwu = "jinshayinsha_jiesuan_yingwu",
        yinsha = "jinshayinsha_jiesuan_yinsha",
        dzpkFuhao = "deizhoupuke_fuhaochang",
        dzpkPingmin = "deizhoupuke_pingmingchang",
        brnnjiepai = "jiepaidonghua",
        brnnCaijin = "xinhuang_togbiniuniu_caijincua",
        errenCardGirl = "xh_xuanchangnvren_errenqipai",
        fkbyGirl = "xh_xuanchangnvren_fengkuangbuy",
        lhdWinFrame = "longhudou_poker_win_waikuang",
        niuniuGirl = "xh_xuanchangnvren_niuniu",
        sssGirl = "xh_xuanchangnvren_shisanshui",
        yydbGirl = "xh_xuanchangnvren_yiyuanduobao",
        sgjGold = "shuiguojijinbizhuan",
    }
    const enum ParticleTp {
        starbomb = "starbomb",
        golddrop = "golddrop",
    }
    const enum openFunTp {
        benefits = 1,
        agency = 2,
        bindPolite = 3,
        firstRechange = 4,
        sevenDay = 5,
        earnings = 6,
        shop = 7,
    }
    const enum ActTp {
        bdyl = 1,
        qrrw = 2,
        scyl = 3,
        cz = 4,
        ls = 5,
        cj = 6,
        tjhy = 7,
        czyk = 8,
        yqdzz = 9,
        fglp = 10,
        rysj = 11,
        bflj = 12,
        bycj = 13,
        vipcz = 14,
        ysf = 15,
        vipgn = 16,
        max = 17,
    }
    const enum hallFunTp {
        limitReward = 1,
        bindReward = 2,
        firstRechange = 3,
        allAgent = 4,
        sevenDay = 5,
        runWater = 6,
    }
}
declare module game {
    interface ParticlePropConf {
        key: string;
        bb: number;
        br: number;
        rb: number;
        rr: number;
        eb: number;
        er: number;
        ease: string;
    }
    interface ParticleColorConf {
        key: string;
        bb: number;
        br: number;
        rb: number;
        rr: number;
        eb: number;
        er: number;
        ease: string;
    }
    interface ActivityAwardConf {
        id: number;
        vip: number[];
        tarVal: number;
        awd: number;
        cnt: number;
        gold: number;
        rank: number;
        sRank: number;
        eRank: number;
        desc: string;
    }
    interface ActivityRuleConf {
        id: number;
        text: string;
        isImg: number;
        x: number;
        y: number;
    }
    interface GmdConf {
        id: number;
        nm: string;
        file: string;
        wg: number;
        class: number;
        isOpen: number;
    }
    interface QuestConf {
        id: number;
        name: string;
        desc: string;
        gameID: number[];
        default: number;
        weight: number;
        Style: number;
        class: number;
        type: number;
        completeType: number;
        completeCount: number;
        completeParam: number;
        nextQuestID: number;
        isSaveCount: number;
        awardItemID: number;
        awardItemCount: number;
        isSet: number;
        goTo: number;
        group: number;
        template: number;
        index: number;
        icon1: string;
    }
    interface PluginsConf {
        id: number;
        nm: string;
        file: string;
        ver0: string;
        ver1: string;
    }
    interface ParticleConf {
        id: string;
        einte: number;
        emax: number;
        dur: number;
        oneMin: number;
        oneMax: number;
        src: string;
        blendMode: number;
        pcls: string;
        anchor: {
            x: number;
            y: number;
        };
        prop: {
            [key: string]: ParticlePropConf;
        };
        color: {
            [key: string]: ParticleColorConf;
        };
    }
    interface VIPProfitConf {
        VipLv: number;
        VipExp: number;
        OnlineReward: number;
        MaxGiftslimit: number;
        GiveTicket: number;
        DailyLottery: number;
    }
    interface PerformConf {
        Level: number;
        PButton: number;
        PTop: number;
        Rate: number;
        Describe: string;
    }
    interface ExtendConf {
        id: number;
        text: string;
        isImg: number;
        x: number;
        y: number;
    }
    interface OpenConf {
        id: number;
        isOpen: number;
    }
    interface ActivityConf {
        id: number;
        sid: number;
        name: string;
        show: number;
        new: number;
        boom: number;
        type: number;
        title: string;
        award: {
            [key: string]: ActivityAwardConf;
        };
        rule: {
            [key: string]: ActivityRuleConf;
        };
    }
    interface ActShowConf {
        id: number;
        icon: string;
        link: string;
        name: string;
        profile: string;
        desc: string;
        tag: number;
        sort: number;
        viewTp: number;
        font: number[];
        bg: number[];
        actN: string;
        aniN: number[];
    }
    interface TipControlConf {
        txt: string;
        os: number;
    }
    interface HallFunPopConf {
        ID: number;
        WindowName: any;
        Sort: number;
        Probability: number;
        IsShow: number;
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
        e_rmt_gold_limit = 100,
        e_rmt_gold_accountnum_or_pwd_error = 101,
        e_rmt_not_empty = 102,
        e_rmt_input_correct_num = 103,
        e_rmt_input_correct_code = 104,
        e_rmt_agree_consent = 105,
        e_rmt_register_faild = 106,
        e_rmt_binding_success = 107,
        e_rmt_binding_falid = 108,
        e_rmt_pwd_not_less_6 = 109,
        e_rmt_login_AccIsExists = 110,
        e_rmt_login_AccIsNotExists = 111,
        svrConnectErr = 112,
        client_actJoin_fail = 10001,
        client_actAwd_fail = 10002,
        client_actAwd_success = 10003,
        device_invalid_error = 113,
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
        ShareGameIp = 779,
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
        tenThousandRmb = 682,
        hundredMillionRmb = 683,
        tenThousand = 684,
        hundredMillion = 685,
        shareOpenLock = 686,
        loadingLab = 687,
        AlmsRestCount = 688,
        AlmsGetCondition = 689,
        deleteMailSuccess = 690,
        dontDeleteMail = 691,
        Enter_AccountNum = 692,
        EnterChar6To20 = 693,
        PhoneNum = 694,
        VerCode = 695,
        InputPwd = 696,
        ConfirmPwd = 697,
        AgreeConsent = 698,
        SevenDayRest = 699,
        CustomerFeedback = 700,
        TwoNameSame = 701,
        gameError = 702,
        mainMan = 703,
        mainWoman = 704,
        mainRewardTip = 705,
        InResult = 706,
        InBet = 707,
        LimitRed = 708,
        zhuang = 709,
        xian = 710,
        he = 711,
        Tiger = 712,
        Dragon = 713,
        Big1 = 714,
        Small1 = 715,
        Birds = 716,
        Animal = 717,
        shark = 718,
        Leopard1 = 719,
        totalNum = 720,
        backGain = 721,
        yeji = 722,
        inPlayerId = 723,
        preId = 724,
        teamnum = 725,
        todaygold = 726,
        weekgold = 727,
        createTime = 728,
        noresult = 729,
        noplayer = 730,
        teamname = 731,
        copynet = 732,
        cannotnoTeam = 733,
        setteamname = 734,
        teamsName = 735,
        setPaixian = 736,
        teamsNum = 737,
        notAllNumber = 738,
        wrongNumber = 739,
        teamSuccess = 740,
        sameName = 741,
        noTeam = 742,
        notices = 743,
        teamChange = 744,
        resetMa = 745,
        resetMaName = 746,
        isOverBetLimit = 747,
        otherOverBetLimit = 748,
        WaitNextGame = 749,
        WaitNextGame1 = 750,
        inputNum = 751,
        WaitBetTime = 756,
        resultTmNoRobBank = 757,
        loginInfoOver = 758,
        gameNum = 759,
        robNeedGold = 760,
        RepeatBetNotBet = 761,
        RepeatBetMaxLimit = 762,
        RepeatBetGoldEnought = 763,
        notGoldToCharge = 764,
        fuhao = 765,
        robBankTip = 766,
        common_error_game_state = 767,
        common_banker_betgold_is_full = 768,
        common_other_betgold_is_full = 769,
        common_hasEnd = 770,
        common_noBetBefore = 771,
        common_hasBet = 772,
        commmon_lessCondition = 773,
        common_noGold = 774,
        commmon_partFull = 775,
        sevenGetGold = 776,
        ComingSoon = 777,
        headHasGet = 778,
        limitRewardTips = 780,
        LobbyUITips6 = 781,
        betCondition = 782,
        todayCanGet = 783,
        serviceHttp = 784,
        Tourist = 785,
        avatarSuffix = 786,
        anotherBet = 787,
        enterRoomCondition = 788,
        actBycjTip1 = 789,
        actBycjTip2 = 790,
        actBycjTip3 = 791,
        actBycjTip4 = 792,
        actBycjTip5 = 793,
        getDLGold = 794,
    }
}
/**
 * Created by wjdeng on 2015/9/2.
 */
declare module game {
    let dataMgr: DataManager;
    class DataManager {
        preload: boolean;
        accMo: AccountModel;
        notifyMo: NotifyModel;
        gameMo: GameModel;
        soundMo: SoundModel;
        generalMo: GeneralModel;
        mailMo: MailModel;
        activityMo: ActivityModel;
        gsMo: GameStateModel;
        private _inited;
        private _needLoads;
        private _heartTag;
        constructor();
        private createMo(name, modelCls);
        loadConfs(): void;
        init(): void;
        private startHeart();
        stopHeart(): void;
        private heartSync();
    }
}
declare module game {
    let dbMgr: DBoneManager;
    class DBoneManager {
        static resPath: string;
        private _factory;
        private _usecnts;
        private _loadings;
        constructor();
        private incUsecnt(skName);
        private decUsecnt(skName);
        createArm(skName: string): dragonBones.EgretArmatureDisplay;
        createArmAsync(skName: string, finBack: (arm: dragonBones.EgretArmatureDisplay, skName: string) => void, thisObj: any): void;
        loadAnimate(skName: string, callback?: (succ: boolean, skName: string) => void, thisObj?: any): void;
        getUrl(skName: string): string;
        private loadResImpl(skName, callback?, thisObj?);
        private onLoadResFin(data, skName);
        onArmDispose(arm: dragonBones.EgretArmatureDisplay): void;
        doGC(): void;
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
    class UIDBAni extends cui.BaseContainer {
        protected _arm: dragonBones.EgretArmatureDisplay;
        protected _playData: {
            ani?: string;
            times?: number;
            frame?: number;
            stopFrame?: number;
        };
        protected _dbNm: string;
        autoPlay: boolean;
        $hitTest(stageX: number, stageY: number): egret.DisplayObject;
        dbNm: string;
        protected childrenCreated(): void;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        protected loadData(): void;
        protected onLoadFin(succ: boolean, skName: string): void;
        setSlotDisplay(nm: string, display: cui.IBaseCtrl): void;
        play(aniNm?: string, playTimes?: number): void;
        gotoAndPlay(aniNm: string, frame?: number, playTimes?: number): void;
        private _play();
        private _stop();
        gotoAndStop(frame: number, aniNm?: string): void;
        stop(): void;
        protected onAniFin(e: any): void;
        protected freeArm(): void;
    }
}
declare module game {
    interface ILoadShow {
        showBusy(): any;
        hideBusy(): any;
    }
    /**
     * 资源管理器
     *
     * */
    let resMgr: ResManager;
    const enum ResMgr_EVT {
        LINE_LOAD_FIN = "line_fin",
    }
    class ResManager {
        static getConfUrl(name: string): string;
        static loadVer(fileNm: string, cb: (succ: boolean, jsver?: string) => void, tar: any, needHome?: boolean): void;
        private static _resData;
        static loadRes(fileNm: string, cb: (succ: boolean) => void, tar: any): void;
        static loadTheme(fileNm: string, cb: (succ: boolean) => void, tar: any, gpNm?: string): void;
        static loadGroup(groupNm: string, cb: () => void, tar: any): void;
        loadShow: ILoadShow;
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
        getImgUrl(nm: string, isJpg: boolean): string;
        getLoadCnt(): number;
        getParseCnt(): number;
        loadConf(url: string, fin: Function, tar: any, isURL?: boolean): void;
        private loadConfFin(data, url);
        private parseConf();
        preloadFin: boolean;
        startPreload(): void;
        private _startPreload();
        /**
         *
         * @param source
         * @param isUrl 当url为true， 需要指定
         * @param tp
         */
        lineLoad(source: string, isUrl?: boolean, tp?: string): void;
        private _startLineLoad();
        private _trylineLoad();
        private _lineLoadFin();
    }
}
declare module game {
    class EffectNode extends cui.Group {
        useOnce: boolean;
        protected _inPly: boolean;
        protected _cb: {
            fun: (tar: any) => void;
            tar: any;
        };
        constructor();
        setFinish(cb: (tar: any) => void, tar: any): void;
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
    class DBEffect extends EffectNode {
        protected _arm: dragonBones.EgretArmatureDisplay;
        protected _aniNm: string;
        protected _playTime: number;
        /**
         * - 播放指定动画。
         * @param name - 龙骨资源名字
         * @param aniNm - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
         * @param playTimes - 循环播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
         */
        constructor(name: string, aniNm?: string, playTime?: number);
        play(): void;
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
declare module game {
    const enum AccountMo_EVT {
        login_svr_fin = "svr_fin",
        reg_phone_fin = "reg_fin",
        bin_phone_fin = "bin_fin",
        check_svr_info = "check_fin",
    }
    const enum NotifyMo_EVT {
        got_notify = "new",
    }
    class AccountModel extends DataModel {
        accNm: string;
        gameId: number;
        isAuto: boolean;
        channel: string;
        private _token;
        protected _data: NET_CONF.msg_account_info;
        private _notifys;
        private _noticeDatas;
        isNew: boolean;
        constructor();
        getData(): NET_CONF.msg_account_info;
        getNoticeDatas(): any[];
        /**
         *
         * @param nm  游客则传null
         * @param pwd  游客则传null
         */
        verlogin(nm: string, pwd: string): void;
        login(nm: string, pwd: string): void;
        protected reLogin(): void;
        registered(phone: string, pwd: string, code: string): void;
        bind(phone: string, pwd: string, nm: string, code: string): void;
        checkCode(phone: string): void;
        CheckNoticeInfo(): void;
        private connectWorld();
        private onNotify(data);
        popNotify(): NET_CONF.s2c_w2c_notify;
        private onT2TStart();
        private onConnRes(data);
        askLogin(): void;
        private onLoginRes(data);
        changeHead(icon: string): void;
        private onHeadChange(data);
        changeNickName(nickname: string): void;
        private onNickNameChange(data);
        changeSex(sex: number): void;
        private onSexChange(data);
        private onBindReward(data);
        updateGetCount(): void;
        havePopNotice(): boolean;
        haveLoginNotice(): boolean;
        isNewNotice(nId: string): boolean;
        isNoRead(nId: string): boolean;
        getNoReadNum(): number;
    }
}
declare module game {
    class bycjResult {
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
    const enum ActMo_EVT {
        update = "update",
        award = "award",
        upRed = "updateRed",
        upNew = "updateNew",
        close = "close",
    }
    class ActivityModel extends DataModel {
        private _actConf;
        private _showConf;
        private _actData;
        private _curActs;
        private _redPoint;
        constructor();
        onLoadConf(data: any): void;
        getShowConf(aid: number): ActShowConf;
        getActConf(aid: number): ActivityConf;
        getActData(id: number): any;
        getActAwd(awdId: number): void;
        getActAllAwd(activityId: number): void;
        getActMenu(): number[];
        getRedByAid(aid: number): boolean;
        askRedPoint(): void;
        askBycjInfo(): void;
        askBycjApply(): void;
        askRysjInfo(): void;
        askRysjApply(): void;
        private regActMsg();
        private redPointResult(data);
        getRedByType(isAll: boolean, type?: act_type): number;
        isNoReadAct(aId: number): boolean;
        addReadAct(aId: number): void;
        private bycjInfoResult(data);
        bycJionResult(data: NET_CONF.gs2c_activity_accumulate_rmb_apply_result): void;
        bycjAwardResult(data: NET_CONF.gs2c_activity_accumulate_rmb_reward_result): void;
        private rysjInfoResult(data);
        rysjJionResult(data: NET_CONF.gs2c_activity_accumulate_per_apply_result): void;
        rysjAwardResult(data: NET_CONF.gs2c_activity_accumulate_per_reward_result): void;
        setBycjRedPoint(tp: confConsts.ActTp, info: bycjResult): void;
        enterGame(gId: number): void;
    }
}
declare module game {
    interface IGameModule {
        init(): void;
        start(data: any): void;
        end(): void;
        onReConnect(): void;
        close(): void;
    }
    type GmdInfo = {
        id: number;
        conf: GmdConf;
        inited: boolean;
        gm?: IGameModule;
        data?: any;
        theme?: boolean;
        res?: boolean;
        gp?: boolean;
        ver?: boolean;
        jsVer?: string;
    };
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
        getCurGMD(): GmdInfo;
        startGMD(gameId: confConsts.GameTp, data?: any): boolean;
        closeGMD(): void;
        private onLoadErr(gmdInfo, err);
        private loadGMD(curGMD);
        private loadJs(curGMD);
        private tryLoadFin();
        private loadFin();
    }
}
declare module game {
    class GameStateModel {
        private _inConn;
        init(): void;
        startConn(): void;
        endConn(): void;
        restCoon(): void;
    }
}
declare module game {
    interface ITaskItem {
        questid: number;
        count: number;
        received: boolean;
        cfg: QuestConf;
    }
    const enum General_EVT {
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
        IsDone = "IsDone",
        GetVipInfoResult = "GetVipInfoResult",
    }
    const enum General_EVT_Dai {
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
    const enum General_EVT_POP {
        Close = "close",
        backInfo = "backInfo",
    }
    class GeneralModel extends DataModel {
        isOpen: boolean;
        isDone: boolean;
        partConf: {
            [key: string]: ParticleConf;
        };
        private _questList;
        private _curDay;
        private _adviceList;
        private _questConf;
        private _openConfs;
        private _gainConf;
        private _FAQConf;
        private _gain;
        private _performsInfo;
        private _performsList;
        private _performsChild;
        private _performsTeamlist;
        private _performsTeamInfo;
        private _teamID;
        private _tag;
        private _vipConf;
        private _tipConf;
        private _teamName;
        private _changeName;
        private _hallFunConfs;
        private _isOpenLimitRw;
        private _isPopSevenDay;
        private _isFirstPList;
        private _openShop;
        constructor();
        onLoadConf(data: any): void;
        readonly tipConf: TipControlConf[];
        curDay: number;
        openShop: boolean;
        getLimitList(): ITaskItem[];
        isOpenLimitRw: boolean;
        isFunOpen(tp: confConsts.openFunTp): boolean;
        getFunPopInfos(): HallFunPopConf[];
        getSuggestList(): NET_CONF.msg_suggest[];
        getAllGold(): number;
        getQuestByID(id: number): QuestConf;
        getQuest(): {
            [key: string]: QuestConf;
        };
        getPerform(): PerformConf;
        getExtend(): ExtendConf;
        getVipProfit(): VIPProfitConf;
        setGain(gain: any): void;
        getGain(): number;
        setCreateTeamName(name: string): void;
        getCreateTeamName(): string;
        setChangeTeamName(name: string): void;
        getChangeTeamName(): string;
        setPerformanceInfo(data: any): void;
        getPerformanceInfo(): any;
        setPerformanceList(data: any): void;
        getPerformanceList(): NET_CONF.msg_performance_info[];
        setPerformanceChild(data: any): void;
        getPerformanceChild(): NET_CONF.msg_performance_info;
        setPerformanceTeamlist(data: any): void;
        getPerformanceTeamlist(): NET_CONF.msg_performance_team[];
        setPerformTeamInfo(data: any): void;
        getPerformanceTeamInfo(): NET_CONF.msg_performance_team;
        setTeamId(teamId: any): void;
        getTeamId(): number;
        setCodeTag(tag: any): void;
        getCodeTag(): number;
        initRegHandle(): void;
        performanceTeamInfoResult(data: NET_CONF.s2c_performance_team_info_result): void;
        performanceTeamUpdateResult(data: NET_CONF.s2c_performance_team_update_result): void;
        performanceTeamcreateResult(data: NET_CONF.s2c_performance_team_create_result): void;
        performanceTeamlistResult(data: NET_CONF.s2c_performance_team_list_result): void;
        performanceChildResult(data: NET_CONF.s2c_performance_child_result): void;
        performanceListResult(data: NET_CONF.s2c_performance_list_result): void;
        performanceInfoResult(data: NET_CONF.s2c_performance_info_result): void;
        getGainResult(data: NET_CONF.s2c_performance_gain_result): void;
        checkGainResult(data: NET_CONF.s2c_performance_check_gain_result): void;
        benefits(data: NET_CONF.s2c_benefits_result): void;
        getQuestlist(data: NET_CONF.s2c_get_questlist_result): void;
        notifyShare(data: NET_CONF.s2c_notify_share): void;
        shareReward(data: NET_CONF.s2c_receive_share_reward_result): void;
        taskReflush(data: NET_CONF.s2c_notify_task_reflush): void;
        getQuestReward(data: NET_CONF.s2c_receive_questreward_result): void;
        private checkAllOver();
        changeQuest(data: NET_CONF.s2c_change_quest): void;
        sendSearchTeam(team_id: any): void;
        sendChangeTeamName(optype: number, team_id: number, limit: number, nick_name: string): void;
        sendCreateTeam(count: number, nick_name: string): void;
        sendPerformTeamList(): void;
        sendPerformanceChild(player_id: any): void;
        sendPerformList(isFirst?: boolean): void;
        sendPerformanceInfo(): void;
        sendGetGain(): void;
        sendAskForGain(): void;
        sendBenefits(): void;
        sendGetQuestlist(isOpen?: boolean, isPopSevenDay?: boolean): void;
        sendshareReward(): void;
        sendWXshareTask(): void;
        sendGetQuestReward(questid: number): void;
        getTaskByDay(day?: number): ITaskItem[];
        setTaskByDay(index: number, day?: number): any;
        getRestReward(): number;
        sendAdviceReq(text: string): void;
        adviceReqResult(data: NET_CONF.s2c_suggestion_result): void;
        adviceListReq(): void;
        adviceListReqResult(data: NET_CONF.s2c_req_suggest_result): void;
        askFaq(): void;
        faqResult(data: NET_CONF.s2c_req_faq_result): void;
        askFaqDetail(index: number): void;
        faqDetailResult(data: NET_CONF.s2c_req_faq_detail_result): void;
        askVipInfo(): void;
        askVipInfoResult(data: NET_CONF.s2c_req_vip_info_result): void;
        showGameClass(tag: number): void;
    }
}
declare module game {
    const enum Mail_EVT {
        read = "read_mail",
        delete = "mail_delete",
        list = "mail_list",
    }
    class MailModel extends DataModel {
        private _mailList;
        private _rmvList;
        constructor();
        initRegHandle(): void;
        readonly list: NET_CONF.msg_some_info[];
        rmvList(list: string[]): void;
        setReadMail(id: string): void;
        askMsgResult(data: NET_CONF.s2c_ask_message_result): void;
        deleteMsgResult(data: NET_CONF.s2c_delete_message_result): void;
        readMsgResult(data: NET_CONF.s2c_read_message_result): void;
        askMessage(): void;
        deleteMessage(list: string[]): void;
        readMessage(id: string): void;
    }
}
declare module game {
    class NotifyModel extends Notification {
        private _notifys;
        constructor();
        private onNotify(data);
        popNotify(): NET_CONF.s2c_w2c_notify;
    }
}
declare module game {
    interface IPluginModule {
        init(): void;
        start(data: any): void;
        end(): void;
        close(): void;
    }
    class PluginsModel extends DataModel {
        private _conf;
        private _list;
        constructor();
        onLoadConf(data: any): void;
        start(id: confConsts.PluginsTp, data?: any): boolean;
        stop(id: confConsts.PluginsTp): void;
        private loadGMD(curGMD);
        private loadJs(curGMD);
        private loadRes(curGMD);
        private loadTheme(curGMD);
        private loadVer(curGMD);
        private loadGroup(curGMD);
        private tryLoadFin(curGMD);
        private loadFin(curGMD);
    }
}
declare module game {
    class RollGoldModel {
        private _betAreaNum;
        private _goldList;
        private _goldList2;
        private _time;
        private _gapNum;
        private _isBit;
        private _isNeedYuan;
        constructor();
        init(betAreaNum: number, isBit: boolean, isNeedYuan: boolean): void;
        initGold(gold: number[]): void;
        reset(): void;
        /**
         * @param index 0~x
         * @param gold 没有/100  就是差值
         */
        setCurGold(index: number, gold: number, target: any, thisObj: any, flag: number): void;
        private setData(gold, index);
    }
    const rollGoldMgr: RollGoldModel;
}
declare module game {
    const enum RouteLineMo_EVT {
        DATA_CHANGE = "d_change",
    }
    class RouteLineModel extends Notification {
        history2Tp: (historyData: any) => number;
        tps: number[];
        hits: number[][];
        private _historys;
        private _maxRow;
        private _maxNHit;
        private _tpCnt;
        /**
         *
         * @param tpCnt 类型数量
         * @param maxRow 最大局数
         * @param maxNotHit 最大未命中数
         */
        constructor(tpCnt?: number, maxRow?: number, maxHit?: number);
        historys: any[];
        addHistory(data: any): void;
        private _addHistory(tp);
        private _shiftHistory();
    }
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
declare module game {
    const enum RouteTpMo_EVT {
        DATA_CHANGE = "d_change",
    }
    class RouteTpModel extends RouteModel {
        data2Zhupanlu: (data: any, tp: number) => IGameResult;
        private _tpCnt;
        private _zpls;
        constructor(tpCnt: number);
        historys: any[];
        getForecast(): any;
        protected _handHistory(stIdx: number, resetSub?: boolean): void;
        protected shiftHistory(cnt: number): void;
    }
}
declare module game {
    class SoundModel {
        setState(val: boolean): void;
        getState(): boolean;
    }
}
declare module CONF {
    let inner: number;
    let svrUrl: string;
    let kefuUrl: string;
    let erweima: string;
    let isNative: boolean;
    let channelId: string;
    let agentId: string;
    let shareId: string;
    let deviceId: string;
    let res: {
        [key: string]: string;
    };
    const enum apkRes {
        login = "login",
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
        stopBusy(): void;
        setParent(container: cui.BaseContainer): void;
        private update();
    }
}
declare module game {
    let chipMgr: ChipManager;
    class ChipManager {
        private _parent;
        private _areaArr;
        private _aniTag;
        private _chipArr;
        private _pure;
        private _flyBefore;
        constructor();
        setParent(p: cui.BaseContainer): void;
        resetAreaArr(): void;
        /**
         *
         * @param id 区域id
         * @param maxCnt 区域最大显示数量
         * @param x 区域的x ,转化为舞台的全局坐标
         * @param y 区域的y ,转化为舞台的全局坐标
         * @param w 区域的w
         * @param h 区域的h
         */
        addArea(id: number, maxCnt: number, x: number, y: number, w?: number, h?: number): void;
        /**
         *
         * @param formAreaId 出发点区域id
         * @param toAreaId 到达点区域id
         * @param tm 飞行时间
         * @param data {chipId:筹码id，gold:筹码下注额,chipTp:筹码枚举，默认是通用的}
         * @param bScale 初始的大小x
         * @param sfxName 音效
         * @param delay 延迟多久播放音效
         */
        addChip(formAreaId: number, toAreaId: number, tm: number, data: {
            chipId: number;
            gold: number;
            chipTp?: string;
        }, bScale?: number, eScale?: number, sfxName?: string, delay?: number, cb?: Function, thisObj?: any): void;
        /**
         *
         * @param pure true 纯净模式
         */
        setPure(pure: boolean): void;
        isPure(): boolean;
        private addChipToArea(chip);
        /**
         *
         * @param formAreaId 出发点区域id
         * @param toAreaId 到达点区域id
         * @param flytm 飞行的总时间
         * @param isPlay 是否播放声音
         */
        moveAll(formAreaId: number, toAreaId: number, flytm: number, isPlay?: boolean): number;
        /**
         *
         * @param formAreaId 出发点区域id
         * @param toAreaIds 到达点区域ids
         * @param flytm  飞行的总时间
         * @param isPlay  是否播放声音 默认播
         */
        moveAllMuti(formAreaId: number, toAreaIds: {
            id: number;
            wg: number;
        }[], flytm: number, isPlay?: boolean): number;
        private moveChip(formTiles, toAreaId, flyTm, maxCnt?, sfxName?, isPlay?);
        clear(): void;
        private getChip();
        private freeChip(chip);
    }
}
declare module game.DataFormat {
    function formatGold(gold: number, isLang?: boolean, fixed?: number): string;
    /**
     * 获取角色头像资源
     * @param icon_custom
     */
    function getHeadIcon(icon_custom: string): string;
    function convertGold(value: number): number;
    function convertGoldString2(gold: number, isLang?: boolean): string;
    function convertGoldString3(gold: number): string;
    function convertGoldString4(gold: number, isLang?: boolean): string;
    function convertYuanString(value: number, isLang?: boolean): string;
    function convertYuanString2(gold: number, isLang?: boolean): string;
    function convertYuanString3(gold: number, isLang?: boolean): string;
    function formatName(name: string, maxLen?: number, halfLen?: number): string;
    function CheckStringLength(txt: string): number[];
}
declare module game {
    module MsgBox {
        function showBoxCB(gp: string, key: string | number, fun: (tag: number) => void, tar: any): void;
        function showBoxCB2(str: string, fun: (tag: number) => void, tar: any): void;
        function showPrintBoxCB(gpName: string, key: string | number, fun: (tag: number) => void, tar: any, ...rest: any[]): void;
        function showBox(gp: string, key: string | number, other?: string): void;
        function showErr(errCode: number | string): void;
        function showPrompt(errCode: number | string): void;
        /**
         *
         * @param gpName
         * @param key
         * @param color  默认白色
         */
        function showTxt(gpName: string, key: string | number, size?: number, color?: UIColor): void;
        /**
         *
         * @param gpName
         * @param key
         * @param repValue 要替换的
         * @param color  默认白色
         */
        function showPrintfTxt(gpName: string, key: string | number, color?: UIColor, ...rest: any[]): void;
    }
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
        mainLang = "mainLang",
    }
    const enum moneyTp {
        y = "y",
        w = "w",
        q = "q",
        b = "b",
        by = "by",
        wy = "wy",
    }
    const enum soundEnum {
        nn = "sound_brnn_type_",
    }
    const enum gamePoker {
        poker = "poker",
        ddzPoker = "card@ddzPoker",
    }
    const enum HallImg {
        hall = "hall@",
    }
    const enum moment {
        scene = "txt_scene",
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
        var quakeFun: Function;
        /**
         * @param targetPos中可以设置多个属性 例如 x ,y , scaleX,scaleY   {x:600,y:110,scaleX:0.3,scaleY:0.3}
         * confConsts.GameTp.xxx
         * TRain.core.addDelayDo( move, self, delayTime, 游戏id, false, display, targetPos, speed, dur ,times );
         */
        function move(display: egret.DisplayObject, targetPos: any, speed: Function, dur?: number, times?: number, cb?: Function, flag?: number): void;
        /**
         * @param targetPos中可以设置多个属性 例如 x ,y , scaleX,scaleY   {x:600,y:110,scaleX:0.3,scaleY:0.3}
         */
        function startActCB(display: egret.DisplayObject, actions: Array<TRain.Action>, cb?: Function, flag?: number): void;
        /**
         * @param scr:资源名
         * @param closeTm:合上的时间
         * @param openTm:翻开的时间
         * @param scaleX:翻开后的scale
         */
        function flipCardCB(display: cui.Image, scr: string, scaleX: number, closeTm?: number, openTm?: number, cb?: Function, flag?: number): void;
        /**
         * @param missTm:什么时间消失
         *
         * @param LookTm:什么时间出现
         */
        function flashAni(display: egret.DisplayObject, missTm: number, endTm: number, cb?: Function, flag?: number): void;
        function sin(t: number): number;
        function secToStr(sec: number): string;
        /**
         *
         * @param parent 存放星星的容器
         * @param form 初始位置
         * @param to 结束位置
         * @param flyTm 飞行时间
         * @param flag 标记
         * @param cb 返回函数
         */
        function flyStarAni(parent: cui.Group, form: {
            x: number;
            y: number;
        }, to: {
            x: number;
            y: number;
        }, flyTm?: number, flag?: number, cb?: Function): void;
        /**
         *
         * @param parent 父容器
         * @param gold 金币
         * @param form 出发点
         * @param to 结束点
         * @param flag 标记
         */
        function showGold(parent: cui.BaseContainer, gold: number, form: {
            x: number;
            y: number;
        }, to: {
            y: number;
        }, flag?: number): void;
        function createParticle(nm: string): cui.ParticleSys;
        /**
         * 金币显示滚动增加
         * @param fromGold   初始金币
         * @param fromGold   最终金币
         * @param fromGold   你的label或者bitmaplabel
         * @param fromGold   是否是bitmaplabel  是就true不是false
         * @param fromGold   就是self
         * @param fromGold   游戏id
         */
        function showRollGold(fromGold: number, toGold: number, target: any, isBit: boolean, thisObj: any, flag: number, hasYuan?: boolean): void;
        function getQRCodeTeam(id: number, codeTag: number, cb: Function): void;
        function getQRCodePly(cb: Function): void;
        function getQRLinkUrl(id: number, codeTag?: number, type?: number): string;
    }
}
declare module game {
    class ParticleAni {
        private _p;
        private _sys;
        constructor(parent: egret.DisplayObjectContainer, particleNm: string);
        start(): void;
        stop(): void;
        dispose(): void;
        private onFin();
    }
}
declare module game {
    class ActBycjView extends ActBaseView {
        private skBg;
        private skDesc;
        private skTip2;
        private skTip1;
        private skTipAni;
        private skJoin;
        private skBtnAni;
        private skList;
        private _itemPro;
        private skGold;
        private skRule;
        private _datas;
        private skGaBtn;
        constructor(tp: confConsts.ActTp);
        childrenCreated(): void;
        private init();
        protected updateData(data: bycjResult): void;
        updateAwd(data: any): void;
        dispose(): void;
    }
}
declare module game {
    class ActGamesView extends UIPopup {
        private skClose;
        private skGames;
        private _itemPro;
        constructor();
        protected childrenCreated(): void;
        setData(data: number[]): void;
        protected onDispose(): void;
    }
}
declare module game {
    enum act_type {
        xs = 0,
        hd = 1,
        gg = 2,
    }
    class ActMainView extends UIPopup {
        private skClose;
        private skGpInfo;
        private skMenuAct;
        private _curTag;
        private _viewList;
        private skBtns;
        private skGpNotice;
        private _noticeView;
        private skTitle;
        private _curType;
        private skXsRed;
        private skGgRed;
        private _menuList;
        constructor();
        protected childrenCreated(): void;
        private closeSelf();
        private createMenu(item);
        private clickMenu(item);
        private updateRed(tp, data);
        private updateNew(tp, data);
        changeRedNum(type: act_type): void;
        protected onDispose(): void;
    }
}
declare module game {
    class ActRuleView extends UIPopup {
        skClose: cui.ScaleButton;
        skGrp: cui.Group;
        skInGrp: cui.Group;
        constructor();
        protected childrenCreated(): void;
        private rmvInGrp();
        updateView(confs: any): void;
    }
}
declare module game {
    class NoticeHall extends cui.Component {
        skNoticeBg: cui.Image;
        skBtn: cui.ScaleButton;
        skTitle1: cui.Label;
        skTitle2: cui.Label;
        skTitle3: cui.Label;
        skIcon: cui.Image;
        skMenuNotice: cui.MenuGroup;
        private _state;
        private _showNoticeDatas;
        private _curTag;
        private _parent;
        constructor(state: number, parent?: any);
        protected childrenCreated(): void;
        setState(state: number): void;
        updateView(): void;
        private clickMenu(item);
        private reflshMenu(tag);
        private getListByState();
    }
}
declare module game {
    class RedPoint extends cui.Component {
        skCount: cui.BitmapLabel;
        constructor();
    }
}
declare module game {
    class BindGiftDialog extends game.UIPopup {
        skBtnClose: cui.ScaleButton;
        skBtnBind: cui.ScaleButton;
        skImgSay: cui.Image;
        private _sayDur;
        private _sayID;
        private _delayDur;
        private _gameTag;
        constructor();
        childrenCreated(): void;
        onDispose(): void;
    }
}
declare module game {
    class SaveMoneyDialog extends UIPopup {
        skBtnClose: cui.ScaleButton;
        skBtnSave: cui.ScaleButton;
        skBtnCharge: cui.ScaleButton;
        skLabCount: cui.Label;
        skLabCondition: cui.Label;
        constructor();
        childrenCreated(): void;
        private updateInfo();
        private getSaveMoney();
    }
}
declare module game {
    class ExtensionNoticeView extends UIPopup {
        sknoticeName: cui.Image;
        skclose: cui.ScaleButton;
        skCreateGrp: cui.Group;
        skCreate: cui.ScaleButton;
        skTname: cui.EditableText;
        skTnum: cui.EditableText;
        sksetname: cui.Label;
        sksetnum: cui.Label;
        skChangeGrp: cui.Group;
        skTchange: cui.EditableText;
        skTishi: cui.Label;
        skchange: cui.ScaleButton;
        skcancle: cui.ScaleButton;
        skresetGrp: cui.Group;
        skReset: cui.Label;
        skSure: cui.ScaleButton;
        sknoSure: cui.ScaleButton;
        private _isCreate;
        private _data;
        constructor(isCreate: number, data?: any);
        childrenCreated(): void;
        private getIsAllNumber(val);
        private onFocus1(e);
        private OnAccount(e);
        private onFocus2(e);
        private OnAccount1(e);
        private onFocus3(e);
        private OnAccount2(e);
        private showResult();
        private showResult2(optype, data);
        protected onShow(stage: egret.Stage): void;
        protected onHide(): void;
    }
}
declare class LoadingUI extends egret.Sprite {
    private textField;
    constructor();
    createdView(): void;
    setProgress(current: any, total: any): void;
}
declare module game {
    class ExtensionShareView extends UIFullFW {
        private skclose;
        private skCopy;
        private skNet;
        private skerwei;
        private _data;
        constructor(data: any);
        childrenCreated(): void;
        private createImg();
        protected onShow(stage: egret.Stage): void;
        protected onHide(): void;
    }
}
declare module game {
    interface IBtnHanderTeamList {
        btnClick(item: ExtensionPerformTeamList, num: any): any;
    }
    class ExtensionView extends UIFullFW {
        skBack: cui.ScaleButton;
        private skdiGrp;
        private skdiYJGrp;
        private skdlXian;
        private skYJxian;
        private skdiTeam;
        skBtnGrp: cui.MenuGroup;
        skYeJiGrp: cui.MenuGroup;
        skteamGrp: cui.MenuGroup;
        skChaxun: cui.MenuGroup;
        skdaili0: cui.Group;
        skGet: cui.ScaleButton;
        skPay: cui.Label;
        skVip: cui.Label;
        skYeji: cui.Label;
        skList: cui.DataGroup;
        skdaili1: cui.Group;
        skteamNum: cui.BitmapLabel;
        skyesNew: cui.BitmapLabel;
        skmonthNew: cui.BitmapLabel;
        skteamtoday: cui.Label;
        skselftoday: cui.Label;
        skdltoday: cui.Label;
        skteamtodaygold: cui.Label;
        skselftodaygold: cui.Label;
        skdltodaygold: cui.Label;
        skteamyes: cui.Label;
        skselfyes: cui.Label;
        skdlyes: cui.Label;
        skteamyesgold: cui.Label;
        skselfyesgold: cui.Label;
        skdlyesgold: cui.Label;
        skmyyj: cui.Label;
        sktodayyj: cui.Label;
        skmyweek: cui.Label;
        skweekyj: cui.Label;
        skmyZY: cui.Label;
        skmyZYyes: cui.Label;
        skZS: cui.Label;
        skZSyes: cui.Label;
        skdaili2: cui.Group;
        skDLList: cui.DataGroup;
        skLast: cui.ScaleButton;
        skNext: cui.ScaleButton;
        skFirst: cui.ScaleButton;
        skEnd: cui.ScaleButton;
        skFind: cui.ScaleButton;
        skCancle: cui.ScaleButton;
        skX: cui.ScaleButton;
        skName: cui.EditableText;
        skGLPage0: cui.BitmapLabel;
        skGLPage1: cui.BitmapLabel;
        skdaili3: cui.Group;
        skplayerId: cui.EditableText;
        skSearch: cui.ScaleButton;
        skSearchGrp: cui.Group;
        skupId: cui.Label;
        skteamnum: cui.Label;
        sktodaygold: cui.Label;
        skweekgold: cui.Label;
        sktime: cui.Label;
        skdaili4: cui.Group;
        skCopy: cui.ScaleButton;
        skNet: cui.Label;
        skerwei: cui.Base64Img;
        skQQ: cui.ScaleButton;
        skWX: cui.ScaleButton;
        skdaili5: cui.Group;
        skGrp: cui.Group;
        skInGrp: cui.Group;
        skdaili6: cui.Group;
        skteamName: cui.EditableText;
        skCreateTeam: cui.ScaleButton;
        skSearchTeam: cui.ScaleButton;
        skclean: cui.ScaleButton;
        skTeamList: cui.DataGroup;
        skTeam: cui.Group;
        skTeamBack: cui.ScaleButton;
        skScerchName: cui.EditableText;
        skteamScerch: cui.ScaleButton;
        skTeamX: cui.ScaleButton;
        skTeamCancle: cui.ScaleButton;
        skteamList: cui.DataGroup;
        skTeamLast: cui.ScaleButton;
        skTeamNext: cui.ScaleButton;
        skTeamFirst: cui.ScaleButton;
        skTeamEnd: cui.ScaleButton;
        skpaixianNum: cui.BitmapLabel;
        skpaixianNew: cui.BitmapLabel;
        skTeamPage0: cui.BitmapLabel;
        skTeamPage1: cui.BitmapLabel;
        skyejiGrp: cui.Group;
        skYejiBack: cui.ScaleButton;
        skYJLast: cui.ScaleButton;
        skYJNext: cui.ScaleButton;
        skYJFirst: cui.ScaleButton;
        skYJEnd: cui.ScaleButton;
        skyejiBG: cui.Image;
        skyejiPic: cui.Image;
        skDLYJlist: cui.DataGroup;
        skYJPage0: cui.BitmapLabel;
        skYJPage1: cui.BitmapLabel;
        private _itemPro;
        private _itemProPerformance;
        private _itemProTeam;
        private _itemProTeamList;
        private _itemExtendList;
        private _dailiPage;
        private _yejiPage;
        private _teamPage;
        private _openId;
        constructor(openid?: number);
        childrenCreated(): void;
        btnClickExtend(item: cui.MenuItemImage): void;
        showExtendResult(num: any): void;
        btnClickYeji(item: cui.MenuItemImage): void;
        updateDLView(num: any): void;
        btnClickChip(item: cui.MenuItemImage): void;
        showDate(num: any): void;
        private updatePic();
        private getQRLinkUrl();
        teamSearchResult(): void;
        searchResult(): void;
        memberSearchResult(): void;
        updateView(num: any): void;
        private GMTToStr(time);
        private onFocus1(e);
        private OnAccount(e);
        private onFocus2(e);
        private OnAccount2(e);
        private onFocus3(e);
        private OnAccount3(e);
        private onFocus4(e);
        private OnAccount4(e);
        showResult(num: any): void;
        showGain(): void;
        showPerforms(): void;
        showPerformsList(): void;
        showPerformsChild(): void;
        showPerformsTeamlist(): void;
        showTeamInfo(): void;
        btnClick(item: ExtensionPerformTeamList, num: any): void;
        showTeamGrp(data: any): void;
        protected onShow(stage: egret.Stage): void;
        protected onHide(): void;
        dispose(): void;
    }
    interface WuXianShowData extends cui.IItemData {
        id: number;
        Level: number;
        PButton: number;
        PTop: number;
        Rate: number;
        Describe: string;
    }
    class extensionWuXian extends cui.DataItem {
        skWXgold: cui.Label;
        skWXlv: cui.Label;
        skWXget: cui.Label;
        private skXian;
        constructor();
        protected dataChanged(): void;
    }
    interface PerformListShowData extends cui.IItemData {
        rank: number;
        player_id: number;
        nick_name: string;
        per_tw: number;
        ac: number;
        bd: number;
    }
    class ExtensionPerformList extends cui.DataItem {
        skRank: cui.Label;
        skNickname: cui.Label;
        skId: cui.Label;
        skyj: cui.Label;
        skTeamNum: cui.Label;
        skBaodi: cui.Label;
        constructor();
        protected dataChanged(): void;
    }
    function formatString(str: string): string;
    interface PerformTeamlistShowData extends cui.IItemData {
        handle: IBtnHanderTeamList;
        name: string;
        count: number;
        count_limit: number;
        player_id: number;
        id: number;
        code_tag: number;
    }
    class ExtensionPerformTeamList extends cui.DataItem {
        skChange: cui.ScaleButton;
        skTeam: cui.ScaleButton;
        skerweima: cui.ScaleButton;
        skshare: cui.ScaleButton;
        skteamName: cui.Label;
        sknumber: cui.Label;
        skpaixian: cui.Label;
        sknewId: cui.Label;
        constructor();
        protected dataChanged(): void;
    }
    interface PerformTeamMemberShowData extends cui.IItemData {
        rank: number;
        name: string;
        player_id: number;
        ts_create: number;
        per_sub_tw: number;
        ac: number;
    }
    class ExtensionPerformTeamMemberList extends cui.DataItem {
        skRank: cui.Label;
        skNickname: cui.Label;
        skId: cui.Label;
        sktime: cui.Label;
        skyj: cui.Label;
        skTeamNum: cui.Label;
        constructor();
        private showdata();
    }
    interface PerformYJShowData extends cui.IItemData {
        isself: boolean;
        rank: number;
        name: string;
        player_id: number;
        yej: number;
        yongj?: number;
    }
    class ExtensionDLList extends cui.DataItem {
        skself: cui.Group;
        skmyRank: cui.Label;
        skmyname: cui.Label;
        skmyid: cui.Label;
        skmygold: cui.Label;
        skother: cui.Group;
        skotherRank: cui.Label;
        skothername: cui.Label;
        skotherid: cui.Label;
        skothergold: cui.Label;
        skotheryj: cui.Label;
        constructor();
        protected dataChanged(): void;
    }
}
declare module game {
    interface IScene {
        /**
         * 调用 HomeView的 homeUI.setNotifyParent(跑马灯父窗口)
         * 游戏结束时， 需要还原跑马灯父窗口 调用 homeUI.setNotifyParent(null);
         */
        homeUI: game.HomeView;
        /**
         * 返回到主界面（如果有显示过主界面的话， 无会则不显示任何界面 ）
         * 游戏必须要设置主界面
         */
        goBack(): any;
        /**
         *
         * @param popup
         * @param data
         * @param isTop
         */
        openPopup(popup: UIPopup, data?: any, isTop?: boolean): void;
        /**
         * 显示大厅UI
         * @param tag
         * @param data
         */
        showHallUI(tag: UITag, data?: any): cui.BaseContainer;
        /**
         * 显示游戏UI  UI概念 UI是全屏界面  同时显示一个所谓的UI 有新的UI显示时, 老的UI会被dispose
         *
         * 注： uiCls: 传入要打开的界面类
         * @param tag 游戏UI 标识
         * @param uiCls 游戏UI类   注： 是类 不是 实例
         * @param isMain 表示是否是主界面
         *        主界面会被缓存起来   调用goBack函数  会返回到主界面
         * */
        showGameUI(tag: number, uiCls: any, isMain?: boolean): cui.BaseContainer;
        /**
         * 获取当前显示UI
         */
        getCurUI(): cui.BaseContainer;
        /**
         * 顺序播放全屏特效  前面的特效播后，后面的特效才开始播
         */
        addSceneEff(eff: game.EffectNode): void;
        /**
         * 立即播放全屏特效
         */
        showSceneEff(eff: EffectNode): void;
        regUICls(tag: number, uiCls: any): any;
        unregUICls(tag: number): any;
    }
    const enum UITag {
        NIL = 0,
        Home = 1,
        shop = 2,
        safeBox = 3,
        sevenReward = 4,
        extension = 5,
        code = 6,
        systemMsg = 7,
        max = 8,
    }
    const enum GameScene_EVT {
        created = "create",
    }
    let gameScene: GameScene;
    /**
     * 游戏主逻辑界面，分层控制游戏内其他界面。
     *
     * */
    class GameScene extends BaseScene implements PopupDelegate {
        static createInst(): GameScene;
        homeUI: HomeView;
        private _curTag;
        private _curUI;
        private _firstShow;
        private _mainUI;
        private _layers;
        private _mainLayer;
        private _popupLayer;
        private _popupTop;
        private _hideHome;
        private _uiClss;
        protected childrenCreated(): void;
        showLayer(layer: cui.Group): void;
        hideLayer(layer: cui.Group): void;
        private _showLayer(id, visible);
        /**
         * 显示大厅UI
         * @param value:number 界面码
         * @param data?:any 传递给界面的参数 可选。其中 lastUI:打开此界面的上一个界面
         * */
        showHallUI(tag: UITag, data?: any): cui.BaseContainer;
        /**
         * 显示游戏UI  注：游戏UI  tag 需要大于1000
         * @param uiCls:传入要打开的界面类
         * */
        showGameUI(tag: number, uiCls: any, isMain?: boolean): cui.BaseContainer;
        getCurUI(): cui.BaseContainer;
        getCurTag(): UITag;
        private openFWUI(newUI?, tag?, isMain?);
        regUICls(tag: number, uiCls: any): void;
        unregUICls(tag: number): void;
        /**
         *
         * @param gameId
         * @param data   当data有值  且inGame=true 表示当前正在游戏中
         */
        startGame(gameId: confConsts.GameTp, data?: {
            inGame: boolean;
        }): void;
        endGame(): void;
        goBack(): void;
        goHome(): void;
        openPopup(popup: UIPopup, data?: any, isTop?: boolean): void;
        openPopupByTag(tag: number, data?: any, isTop?: boolean): void;
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
        skGold: cui.BitmapLabel;
        skBHead: cui.SimpleButton;
        skBSet: cui.ScaleButton;
        skGames: cui.DataGroup;
        skNotify: cui.Group;
        skMail: cui.ScaleButton;
        skGirlImg: cui.Image;
        skBFull: cui.ScaleButton;
        skBLang: cui.ScaleButton;
        skExtension: cui.SimpleButton;
        skAgent: cui.SimpleButton;
        skBinding: cui.SimpleButton;
        skAniBinding: cui.UIMovieClip;
        skReward: cui.SimpleButton;
        skTask: cui.SimpleButton;
        skLeftGrp: cui.Group;
        skTipBtn: cui.SimpleButton;
        skTipBtn1: cui.SimpleButton;
        skNotice: cui.SimpleButton;
        skAniRelief: cui.UIMovieClip;
        skRelief: cui.SimpleButton;
        skFirstRecharge: cui.SimpleButton;
        skService: cui.ScaleButton;
        skClass: cui.ScaleButton;
        skClassGrp: cui.MenuGroup;
        skGameName: cui.Label;
        skLeft: cui.SimpleButton;
        skRight: cui.SimpleButton;
        skGameSc: cui.Scroller;
        skClassGroup: cui.Group;
        skLastGmBtn: cui.SimpleButton;
        skLast: cui.Image;
        skAniTask: cui.UIMovieClip;
        skAniReward: cui.UIMovieClip;
        skProfit: cui.ScaleButton;
        _classFlag: number;
        skImgDone: cui.Image;
        _loginCount: number;
        skGrp: cui.Group;
        private _notifyUI;
        private _actionLoop;
        private _gamesBeginX;
        private _tempGameId;
        constructor();
        childrenCreated(): void;
        showNoticeNum(): void;
        private updateSevenDayBtn();
        private setBindOrSave();
        menuClick(item: cui.MenuItemImage): void;
        private bindGift();
        setNotifyParent(p: cui.BaseContainer, maskWidth?: number): void;
        rmvNotifyParent(p: cui.BaseContainer): void;
        private frameFunClose();
        private frameFunOpen();
        protected onShow(stage: egret.Stage): void;
        protected onHide(): void;
        private flipGirlGrp();
        private updateHead();
        private outOrIn(isOut, cb?);
        private randomTxt();
        private showGameClass(tag?);
        private showArrow(e);
        openFunPop(isNotEvt?: boolean): void;
        private getIsPopProB(proBVal);
    }
}
declare module game {
    class LimitReward extends UIPopup {
        skTips: cui.Label;
        skClose: cui.SimpleButton;
        skList: cui.DataGroup;
        private _itemPro;
        constructor();
        childrenCreated(): void;
        updateView(): void;
        protected onDispose(): void;
    }
    class LimitRewardItem extends cui.DataItem {
        skOverImg: cui.Image;
        skGold: cui.BitmapLabel;
        skName: cui.Label;
        skContent: cui.Label;
        skGo: cui.ScaleButton;
        skBar: cui.ProgressBar;
        skBarLab: cui.Label;
        skBg: cui.Image;
        skGoldBg: cui.Image;
        private _isGoLink;
        constructor();
        childrenCreated(): void;
        private BtnClick();
        protected dataChanged(): void;
    }
}
declare module game {
    class LimitReward2 extends UIPopup {
        skTime: cui.Label;
        skClose: cui.ScaleButton;
        skList: cui.DataGroup;
        private _itemPro;
        private _tagTm;
        constructor();
        childrenCreated(): void;
        private updateTm();
        updateView(): void;
        protected onDispose(): void;
    }
}
declare module game {
    class LimitRwOpen extends UIPopup {
        skClose: cui.SimpleButton;
        private _tm;
        private _tagTm;
        constructor();
        protected childrenCreated(): void;
        private updateTm();
    }
}
declare module game {
    interface IShowMailItem extends cui.IItemData {
        handle: DeleteMailHandle;
        id: string;
        read: number;
        time: number;
        info: string;
    }
    interface DeleteMailHandle {
        click(item: MailItem): any;
        readClick(item: MailItem): any;
    }
    class MailView extends UIPopup {
        skClose: cui.ScaleButton;
        skNoHaveImg: cui.Image;
        skScroller: cui.Scroller;
        skList: cui.DataGroup;
        private _dataPro;
        constructor();
        childrenCreated(): void;
        updateView(): void;
        formatMialItem(mailInfo: NET_CONF.msg_some_info): IShowMailItem;
        click(item: MailItem): void;
        readClick(item: MailItem): void;
        onDispose(): void;
    }
    class MailItem extends cui.DataItem {
        skIcon: cui.Image;
        skTime: cui.Label;
        skInfo: cui.Label;
        skRmvMail: cui.ScaleButton;
        skReadBtn: cui.SimpleButton;
        constructor();
        childrenCreated(): void;
        protected dataChanged(): void;
    }
    class MailDetail extends UIPopup {
        skClose: cui.ScaleButton;
        skTitle: cui.Label;
        skSender: cui.Label;
        skContent: cui.Label;
        skOverImg: cui.Image;
        skAccessory: cui.Group;
        skGold: cui.Label;
        private _info;
        constructor(info: IShowMailItem);
        childrenCreated(): void;
    }
}
declare module game {
    interface INoticeData {
        _id: string;
        Page: string;
        Title: string;
        Notice: string;
        ShowStage: number;
        Id: string;
        EndTime: string;
        StartTime: string;
        Games: number;
        AgentId: number;
        ShowIdx: number;
        Url: string;
    }
    const enum noticeState {
        login = 0,
        hall = 1,
        hallPop = 2,
    }
    const enum noticeType {
        one = 1,
        two = 2,
        three = 3,
        oneToOne = 101,
        oneToTwo = 102,
        oneToThree = 103,
    }
    class NoticeView extends UIPopup {
        skClose: cui.ScaleButton;
        private _state;
        private skHall;
        constructor(state: number);
        protected childrenCreated(): void;
    }
}
declare module game {
    class NotifyUI extends cui.Component {
        skTxt: cui.Label;
        skBg: cui.Image;
        skAni: cui.UIMovieClip;
        private _stX;
        private _parent;
        private _showing;
        private _data;
        private _sysData;
        constructor();
        onPartAdded(): void;
        rmvParent(p: cui.BaseContainer): void;
        setParent(p: cui.BaseContainer, width?: number): void;
        private update(tm);
        private showNext();
        private setShowing(b);
        private resetTxt();
        private formatTxt(nodifyData);
        private parseProp(propStr);
    }
}
declare module game {
    interface IShowServiceData extends cui.IItemData {
        handle: LookRuleHander;
        tag: number;
        titleLab: string;
        content: string;
        isNotOpen: boolean;
    }
    interface LookRuleHander {
        click(item: ServiceItem): any;
    }
    interface IShowComplaintsData extends cui.IItemData {
        time: number;
        info: string;
    }
    class ServiceView extends game.UIPopup {
        skConsultation: cui.ScaleButton;
        skSuggestion: cui.ScaleButton;
        skClose: cui.ScaleButton;
        skList: cui.DataGroup;
        private _itemPro;
        private _showArr;
        constructor();
        childrenCreated(): void;
        updateList(list: NET_CONF.msg_faq_def[]): void;
        click(item: ServiceItem): void;
        updateDetailInfo(data: NET_CONF.msg_faq_def): void;
        protected onDispose(): void;
    }
    class ServiceItem extends cui.DataItem {
        skGroup: cui.Group;
        skTitleLab: cui.Label;
        skBtn: cui.ScaleButton;
        skImg: cui.Image;
        constructor();
        childrenCreated(): void;
        protected dataChanged(): void;
    }
    class ComplaintsItem extends cui.DataItem {
        skReturn: cui.Label;
        skTime: cui.Label;
        skAdvice: cui.Label;
        constructor();
        childrenCreated(): void;
        protected dataChanged(): void;
    }
    class Complaints extends game.UIPopup {
        skClose: cui.ScaleButton;
        skMenuGrp: cui.MenuGroup;
        skAdvice: cui.EditableText;
        skSubmission: cui.ScaleButton;
        skHandImage: cui.Image;
        skList: cui.DataGroup;
        skScroller: cui.Scroller;
        private _itemPro;
        private _listArr;
        constructor();
        childrenCreated(): void;
        menuClick(item: cui.MenuItemImage): void;
        updateView(list: NET_CONF.msg_suggest[]): void;
        protected onDispose(): void;
    }
}
declare module game {
    class SettingView extends game.UIPopup {
        skClose: cui.ScaleButton;
        skMusic: cui.ScaleButton;
        skSound: cui.ScaleButton;
        skSwitch: cui.ScaleButton;
        skBinding: cui.ScaleButton;
        skHead: cui.Image;
        skHeadFrame: cui.Image;
        skName: cui.Label;
        skId: cui.Label;
        skPhoneNum: cui.Label;
        constructor();
        childrenCreated(): void;
        private updateHead();
        updateMcAndSd(): void;
    }
}
declare module game {
    module BoxMgr {
        function setParent(parent: cui.Group, layerDelegate: LayerDelegate): void;
        function showBox(txt: string, cb?: (tag: number) => void, tar?: any): void;
    }
}
declare module game {
    class BoxUI extends UIFullFW {
        skTxt: cui.Label;
        skClose: cui.ScaleButton;
        skOk: cui.ScaleButton;
        private _data;
        constructor();
        protected onPartAdded(): void;
        setData(txt: string, cb?: (tag: number) => void, tar?: any): void;
    }
}
declare module game {
    module TipsMgr {
        function init(): void;
        function setParent(parent: cui.Group, layerDelegate: LayerDelegate): void;
        function clear(): void;
        function clearWait(): void;
        /**
         *
         * @param txt 文本
         * @param tm 延迟多久关闭
         * @param cantTouch 是否接受用的触摸事件
         */
        function waitPrompt(txt: string, tm?: number, cantTouch?: boolean): void;
        function showPrompt(txt: string, color?: UIColor, tm?: number, cantTouch?: boolean, size?: number): void;
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
        private onFocus1(e);
        private OnAccount(e);
    }
}
declare module game {
    class PersonCenter extends UIPopup {
        skBack: cui.ScaleButton;
        skIconImg: cui.Image;
        skIconFrame: cui.Image;
        skName: cui.Label;
        skMod: cui.ScaleButton;
        skId: cui.Label;
        skAddresss: cui.Label;
        skList: cui.DataGroup;
        skCopyId: cui.ScaleButton;
        skMenuBtn: cui.MenuGroup;
        skLeftbtn: cui.SimpleButton;
        skRightbtn: cui.SimpleButton;
        skAwardBtn: cui.ScaleButton;
        skReceive1: cui.ScaleButton;
        skReceive2: cui.ScaleButton;
        skLeftlab: cui.BitmapLabel;
        skRightlab: cui.BitmapLabel;
        skGoldLab: cui.BitmapLabel;
        skVipGroup: cui.Group;
        skHeadScr: cui.Scroller;
        skBarLabel: cui.Label;
        skBar: cui.ProgressBar;
        private _curIcon;
        private _iconArr;
        private _dataArr;
        private _dataPro;
        private _tagTm;
        private _isHaveTag;
        constructor();
        childrenCreated(): void;
        updateHead(): void;
        private initIcons();
        private showIcontTxt();
        private isLock(iconStr);
        menuClick(item: cui.MenuItemImage): void;
        updataVipInfo(vipexp: number, viplv: number): void;
        onDispose(): void;
    }
}
declare module game {
    class ChipComp extends cui.Component {
        private _fontArr;
        private _indexY;
        constructor();
        childrenCreated(): void;
        setFont(fontArr: number[]): void;
        updateChip(): void;
        clickChip(tile: cui.UITile): void;
    }
}
declare module game {
    class RouteIntroduction extends UIPopup {
        skClose: cui.ScaleButton;
        skLeftBtn: cui.ScaleButton;
        skRightBtn: cui.ScaleButton;
        skInGrp: cui.Group;
        skImgGrp: cui.MenuGroup;
        private _routeInConfs;
        private _curTg;
        private _maxTg;
        constructor(routeInConfs: any[], skin?: string);
        protected childrenCreated(): void;
        private rmvInGrp();
        private btnClick(item);
        private clickMenu(item);
        private updateView();
    }
}
declare module game {
    interface ICloseDoorData {
        leftX: number;
        leftEndX: number;
        rightX: number;
        rightEndX: number;
    }
    class Room1 extends UIFullFW {
        skBack: cui.ScaleButton;
        skQuickStart: cui.SimpleButton;
        skList: cui.DataGroup;
        skTitle: cui.Image;
        skGroup: cui.Group;
        skScroller: cui.Scroller;
        skImg: UIDBAni;
        skNotify: cui.Group;
        private _closeDoorWrapper;
        private _itemPro;
        private _closeDoorData;
        constructor(data?: ICloseDoorData);
        childrenCreated(): void;
        setTitle(value: string, girlDb?: string): void;
        setData(item: any, listArr: any[]): void;
        protected onDispose(): void;
    }
    class Room2 extends UIFullFW {
        skBack: cui.ScaleButton;
        skList: game.UIRouteList;
        skTitle: cui.Image;
        skNotify: cui.Group;
        skRouteIn: cui.ScaleButton;
        constructor();
        setTitle(value: string): void;
    }
    class Room3 extends UIFullFW {
        skBack: cui.ScaleButton;
        skList: game.UIRouteList2;
        skTitle: cui.Image;
        skNotify: cui.Group;
        skRouteIn: cui.ScaleButton;
        constructor();
        setTitle(value: string): void;
    }
}
declare module game {
    class RoutePop extends game.UIPopup {
        skClose: cui.ScaleButton;
        skList: game.UIRouteList;
        skImg: cui.Image;
        constructor();
        childrenCreated(): void;
        setImg(value: string): void;
    }
}
declare module game {
    interface IShowResult {
        bg: number;
        num: number;
        up: number;
        down: number;
    }
    interface IRoomData {
        room: any;
    }
    interface IRouteData {
        route: game.RouteModel;
    }
    const enum colTp {
        six = 6,
    }
    class UIRouteList extends cui.Group {
        private _items;
        /**
         *
         * @param datas
         * @param itemCls 必须继承RouteItemBase
         * @param haveDbRow 是否有双列
         */
        init(datas: IRouteData[], itemCls: any, haveDbRow?: boolean): void;
        updateRoom(datas: IRoomData[]): void;
    }
    class RouteItemBase extends cui.Component {
        skZPL: RouteCom;
        skDL: RouteCom;
        skDYZL: RouteCom;
        skXL: RouteCom;
        skXQL: RouteCom;
        skWin0: cui.Image;
        skWin1: cui.Image;
        skWin2: cui.Image;
        skLose0: cui.Image;
        skLose1: cui.Image;
        skLose2: cui.Image;
        _data: RouteModel;
        private _winStr;
        private _win1Str;
        private _win2Str;
        childrenCreated(): void;
        init(data: game.RouteModel, haveDbRow: boolean): void;
        updateRoom(data: IRoomData): void;
    }
    class RouteCom extends cui.Component {
        itemSkinName: string;
        skImg: cui.Image;
        skList: cui.DataGroup;
        skTbScroller: cui.TableScroller;
        private _mo;
        private _tp;
        private _imgLen;
        private _imgW;
        private _oldW;
        private _flashTag;
        private _flashData;
        private _itemPro;
        private _haveDouble;
        private _doubleRow;
        childrenCreated(): void;
        setModel(tp: RouteTp, mo: RouteModel, haveDouble?: boolean): void;
        private updateResult(noclear?);
        private updateTile();
        private endFlash();
        dispose(): void;
    }
}
declare module game {
    class UIRouteList2 extends cui.Group {
        private _items;
        /**
         *
         * @param datas
         * @param itemCls 必须继承RouteItemBase2
         */
        init(datas: IRouteData[], itemCls: any, haveDbRow?: boolean): void;
        updateRoom(datas: IRoomData[]): void;
    }
    class RouteItemBase2 extends cui.Component {
        skDONG: RouteCom;
        skNAN: RouteCom;
        skXI: RouteCom;
        skBEI: RouteCom;
        _data: RouteModel;
        childrenCreated(): void;
        init(data: game.RouteModel, haveDbRow: boolean): void;
        updateRoom(data: IRoomData): void;
    }
}
declare module game {
    class OutGameList extends cui.Component {
        skClose: cui.SimpleButton;
        skBackPure: cui.ScaleButton;
        skRulePure: cui.ScaleButton;
        skmusicPure: cui.ScaleButton;
        skPure: cui.ScaleButton;
        skDbImg: cui.Image;
        skBtn: cui.ScaleButton;
        skGroup: cui.Group;
        private _isPure;
        constructor(isPure?: boolean);
        childrenCreated(): void;
    }
}
declare module game {
    class RuleView extends UIPopup {
        skClose: cui.ScaleButton;
        skGrp: cui.Group;
        skInGrp: cui.Group;
        skBtnGrp: cui.MenuGroup;
        private _ruleConfs;
        constructor(ruleConfs: any[], skin?: string);
        protected childrenCreated(): void;
        private rmvInGrp();
        private updateView(confs);
        private getTxtLen(str, flagStr);
        private menuClick(item);
    }
}
declare module game {
    class LoadingScene extends BaseScene {
        private static _inst;
        static getInst(): LoadingScene;
        private _view;
        constructor();
        dispose(): void;
        setLoadStep(msg: string, totalper: number, tm: number): void;
        isFinish(): boolean;
    }
}
declare module game {
    class LoadingView extends UIFullFW {
        slowSpeed: number;
        fastSpeed: number;
        private _nextPer;
        private _curPer;
        private _showPer;
        private _speed;
        skBar: cui.ProgressBar;
        skBarLab: cui.Label;
        skLoadB: cui.Image;
        skAniLogin: game.UIDBAni;
        skImgLogin: cui.Image;
        constructor();
        protected onPartAdded(): void;
        protected getCloseAni(): any;
        protected getOpenAni(): any;
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
        protected getNeedRes(): {
            res: string;
            tp?: string;
        }[];
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
        skLCode: cui.Label;
        skLPhone: cui.Label;
        skLPwd: cui.Label;
        skLAgainPwd: cui.Label;
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
        skAniLogin: game.UIDBAni;
        skImgLogin: cui.Image;
        private _isLockPwd;
        constructor();
        childrenCreated(): void;
        private onFocus1(e);
        private onFocus2(e);
        private OnAccount(e);
        private OnPwd(e);
        private registeredView();
        private lookPwd();
        private openForgotView();
        private tapLogin(item);
        protected onDispose(): void;
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
        private startLogin();
        dispose(): void;
        showView(page: LoginNavType): void;
        private onNormalOpen(uiView);
        showLayer(layer: cui.Group): void;
        hideLayer(layer: cui.Group): void;
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
        skLCode: cui.Label;
        skLPhone: cui.Label;
        skLPwd: cui.Label;
        skLAgainPwd: cui.Label;
        skLAgreeConsent: cui.Label;
        private _isAgreed;
        private _isBind;
        constructor();
        childrenCreated(): void;
        setData(value: boolean): void;
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
    class SecondSevenView extends cui.Component {
        skBtn: cui.ScaleButton;
        skPb: cui.ProgressBar;
        skLabGame: cui.Label;
        skLabPb: cui.Label;
        skGrp: cui.Group;
        skImgDone: cui.Image;
        constructor();
        childrenCreated(): void;
        updateInfo(): void;
        private updateTask(vo, oldCount);
        private dealDone(isdone);
        regHandle(): void;
        dispose(): void;
    }
}
declare module game {
    const enum GameClass {
        fish = 3,
    }
    class SevenRewardView extends UIFullFW {
        skBtnReturn: cui.ScaleButton;
        skBtnGet: cui.ScaleButton;
        skImgGold0: cui.Image;
        skLabDesc0: cui.Label;
        skBtnGoto0: cui.ScaleButton;
        skImgDown0: cui.Image;
        skPb0: cui.ProgressBar;
        skLabPer0: cui.Label;
        skImgGold1: cui.Image;
        skLabDesc1: cui.Label;
        skBtnGoto1: cui.ScaleButton;
        skImgDown1: cui.Image;
        skPb1: cui.ProgressBar;
        skLabPer1: cui.Label;
        skImgBG0: cui.Image;
        skImgDay0: cui.Image;
        skImgSelect0: cui.Image;
        skImgBG1: cui.Image;
        skImgDay1: cui.Image;
        skImgSelect1: cui.Image;
        skImgBG2: cui.Image;
        skImgDay2: cui.Image;
        skImgSelect2: cui.Image;
        skImgBG3: cui.Image;
        skImgDay3: cui.Image;
        skImgSelect3: cui.Image;
        skImgBG4: cui.Image;
        skImgDay4: cui.Image;
        skImgSelect4: cui.Image;
        skImgBG5: cui.Image;
        skImgDay5: cui.Image;
        skImgSelect5: cui.Image;
        skImgBG6: cui.Image;
        skImgDay6: cui.Image;
        skImgSelect6: cui.Image;
        skBitAll: cui.BitmapLabel;
        skBitSing: cui.BitmapLabel;
        rmv_qiri: cui.Image;
        skGrp0: cui.Group;
        skGrp1: cui.Group;
        skGrp2: cui.Group;
        skGrp3: cui.Group;
        skGrp4: cui.Group;
        skGrp5: cui.Group;
        skGrp6: cui.Group;
        skLabTip: cui.Label;
        skGrp: cui.Group;
        skImgHas: cui.Image;
        skBtn: cui.ScaleButton;
        skLabToday: cui.Label;
        private _taskIndex;
        private _completeCount;
        private _gameTag;
        constructor();
        childrenCreated(): void;
        private updateInfo();
        private updateTask(day?);
        private fallGoldAni();
        private showTalk();
        regHandle(): void;
        onDispose(): void;
    }
}
declare module game {
    /**
     * doudizhu = 16,  //斗地主
        jinchanbuyu = 1,  //金蟾捕鱼
        jinshayinsha = 12,  //金鲨银鲨
        zhajinhua = 17,  //炸金花
        bjl = 5,  //百家乐
        heihongmeifang = 10,  //黑红梅方
        longhudou = 32,  //龙虎斗
        brniuniu = 4,  //百人牛牛
        robcow = 18,  //抢庄牛牛
        benchibaoma = 23,  //奔驰宝马
     */
    class AchieveShareDialog extends UIPopup {
        skBtnClose: cui.ScaleButton;
        skBtnP: cui.ScaleButton;
        skBtnW: cui.ScaleButton;
        skBitGold: cui.BitmapLabel;
        skBitNum: cui.BitmapLabel;
        skImgGame: cui.Image;
        skImgGet: cui.Image;
        skimgKind: cui.Image;
        skBitMoney: cui.BitmapLabel;
        skLabMan: cui.Label;
        skLabWoman: cui.Label;
        skLabTip: cui.Label;
        skerwei: cui.Base64Img;
        constructor();
        childrenCreated(): void;
        updateInfo(): void;
        protected openImpl(data: NET_CONF.s2c_notify_share): void;
    }
}
declare module game {
    class DetailShareView extends UIFullFW {
        constructor();
    }
}
declare module game {
    class ChipTile extends cui.Group {
        skChip: cui.Image;
        skBitImg: cui.Image;
        constructor();
        /**
         *
         * @param id 筹码下标
         *
         * @param gold 筹码金币
         */
        setData(id: number, gold: number, chipTp?: string): void;
        clear(): void;
    }
}
declare module game {
    class OpenFWAni extends TRain.AniBase {
        private static props;
        constructor(tar: cui.BaseContainer);
        beforeAni(): void;
    }
    class CloseFWAni extends TRain.AniBase {
        private static props;
        constructor(tar: cui.BaseContainer);
        beforeAni(): void;
    }
    class MoveXFWAni extends TRain.AniBase {
        private _isHori;
        constructor(tar: egret.DisplayObject, pent: number, isOut: boolean, isHorizontal?: boolean);
        endAni(): void;
    }
    class CloseDoorAni extends TRain.AniBase {
        private _leftTar;
        private _rightTar;
        private _leftBeginX;
        private _rightBeginX;
        private _leftEndX;
        private _rightEndX;
        private _LEndAlpha;
        private _REndAlpha;
        private _LHaveAlpha;
        private _RHaveAlpha;
        constructor(leftTar: egret.DisplayObject, rightTar: egret.DisplayObject, aniTm: number, data?: ICloseDoorData, LHaveAlpha?: boolean, RHaveAlpha?: boolean);
        beforeAni(): void;
        protected update(v: number): void;
    }
    class ScrollAni extends TRain.AniBase {
        private _mask;
        private _isHori;
        private _isOut;
        constructor(tar: cui.BaseContainer, aniTm: number, isHorizontal?: boolean, isOut?: boolean);
        protected update(v: number): void;
        beforeAni(): void;
    }
    class CircleMaskAni extends TRain.AniBase {
        centerX: number;
        centerY: number;
        private mask;
        private _isOut;
        private _isBeginMask;
        private _endAngle;
        private _radius;
        private _beginTm;
        private _aniTm;
        constructor(tar: egret.DisplayObject, aniTm: number, isOut?: boolean, beginTm?: number, isBeginMask?: boolean);
        resetBeginTm(beTm?: number): void;
        protected update(tm: number): void;
        beforeAni(): void;
        endAni(): void;
        private drawFan();
    }
    class QuakeAni extends TRain.AniBase {
        constructor(tar: cui.BaseContainer, aniTm?: number, xRange?: number, yRange?: number);
    }
    class StarParticleAni extends TRain.AniBase {
        parent: egret.DisplayObjectContainer;
        private _movsys;
        private _bomClip;
        private _movActs;
        private _spawnAct;
        private _movTm;
        private _bomName;
        constructor(parent: egret.DisplayObjectContainer);
        clear(): void;
        setData(from: cui.IPointData, to: cui.IPointData): void;
        beforeAni(): void;
        endAni(): void;
    }
}
declare module game {
    class GameTile extends ItemTile {
        skAni: any;
        static props: string[];
        hasProp(key: string): boolean;
        dataChanged(): void;
        ani: string;
        state: any;
    }
}
declare module game {
    class HeadTile extends ItemTile {
        skMask: egret.DisplayObject;
        skLab: cui.Label;
        hasProp(key: string): boolean;
        mk: boolean;
        lab: string;
    }
}
declare module game {
    class RouteStateTile extends cui.UITile {
        static props: string[];
        skBg: cui.Image;
        skNum: cui.Image;
        skDot: cui.Image;
        skDot1: cui.Image;
        constructor(skinName?: string);
        hasProp(key: string): boolean;
        dataChanged(): void;
        r: number;
        pt: number;
        up: boolean;
        down: boolean;
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
            agentId: string;
            hardwareId: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function serverList(args: {
            nm: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function checkCode(args: {
            phone: string;
            agentId: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function regAcc(args: {
            phone: string;
            pwd: string;
            checkcode: string;
            channel: string;
            agentId: string;
            hardwareId: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function loginAcc(args: {
            phone: string;
            pwd: string;
            channel: string;
            agentId: string;
            hardwareId: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function bindAcc(args: {
            phone: string;
            pwd: string;
            nm: string;
            checkcode: string;
            agentId: string;
            hardwareId: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function CheckNotice(args: {
            agentId: string;
        }, showBusy: boolean, cb: Function, target: any): void;
        function getIp(showBusy: boolean, cb: Function, target: any): void;
        function gotoKeFu(): void;
        function askCreateImg(args: {
            playerid: string;
            link: string;
        }, showBusy: boolean, cb: Function, target: any): void;
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
        let ip: string;
        let isReCon: boolean;
        function connect(): void;
        function loginFin(succ: boolean): void;
        function regHandle(msgId: number, handler: (data: any) => void, tar: any): void;
        function unregHandle(msgId: number): void;
        function decodeMsg(msgId: number, len: number, buf: egret.ByteArray): void;
        function sendMsg(msgId: number, args: any): void;
        function sendMsgFilter(msgId: number, args: any, intervalMaxTm: number): void;
        function sendMsgWait(msgId: number, args: any, resultMsgId: number): void;
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
        function rmvEncodeProtos(routeProtos: ProtosList, typeProtos?: ProtosList): void;
        function addDecodeProtos(routeProtos: ProtosList, typeProtos?: ProtosList): void;
        function rmvDecodeProtos(routeProtos: ProtosList, typeProtos?: ProtosList): void;
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
        c2s_update_sex = 5012,
        c2s_beneifts = 5037,
        c2s_get_questlist = 5058,
        c2s_receive_questreward = 5059,
        c2s_ask_message = 5080,
        c2s_delete_message = 5081,
        c2s_read_message = 5082,
        c2s_receive_share_reward = 5091,
        c2s_req_faq = 5092,
        c2s_req_faq_detail = 5093,
        c2s_req_cs_contact = 5094,
        c2s_suggestion = 5097,
        c2s_req_suggest = 5098,
        c2s_wechat_share_task = 5100,
        c2s_performance_list = 5120,
        c2s_performance_gain = 5121,
        c2s_performance_child = 5122,
        c2s_performance_check_gain = 5123,
        c2s_performance_team_create = 5124,
        c2s_performance_team_list = 5125,
        c2s_performance_team_info = 5126,
        c2s_performance_team_update = 5127,
        c2s_performance_info = 5128,
        c2s_performance_info_self_today = 5129,
        c2s_performance_info_self_yesterday = 5130,
        c2s_performance_info_agent_today = 5131,
        c2s_performance_info_agent_yesterday = 5132,
        c2s_req_vip_info = 5150,
        c2gs_player_connect = 30001,
        c2gs_player_disconnect = 30002,
        c2gs_game_history = 30003,
        c2gs_activity_accumulate_rmb_info = 5155,
        c2gs_activity_accumulate_rmb_apply = 5156,
        c2gs_activity_accumulate_rmb_reward = 5157,
        c2gs_activity_check = 5143,
        c2gs_activity_accumulate_per_info = 5158,
        c2gs_activity_accumulate_per_apply = 5159,
        c2gs_activity_accumulate_per_reward = 5160,
    }
    const enum S2C_ROUTE_TP {
        s2c_send_msglist = 401,
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
        s2c_update_sex_result = 7511,
        s2c_w2c_notify = 7523,
        s2c_benefits_result = 7539,
        s2c_get_questlist_result = 7561,
        s2c_receive_questreward_result = 7562,
        s2c_change_quest = 7563,
        s2c_ask_message_result = 7586,
        s2c_delete_message_result = 7587,
        s2c_read_message_result = 7588,
        s2c_bind_reward = 7589,
        s2c_notify_share = 7599,
        s2c_receive_share_reward_result = 7600,
        s2c_req_faq_result = 7601,
        s2c_req_faq_detail_result = 7602,
        s2c_req_cs_contact_result = 7603,
        s2c_suggestion_result = 7606,
        s2c_req_suggest_result = 7607,
        s2c_notify_task_reflush = 7609,
        s2c_performance_list_result = 7631,
        s2c_performance_gain_result = 7632,
        s2c_performance_child_result = 7633,
        s2c_performance_check_gain_result = 7634,
        s2c_performance_team_create_result = 7635,
        s2c_performance_team_list_result = 7636,
        s2c_performance_team_info_result = 7637,
        s2c_performance_team_update_result = 7638,
        s2c_performance_info_result = 7639,
        s2c_performance_info_self_today_result = 7640,
        s2c_performance_info_self_yesterday_result = 7641,
        s2c_performance_info_agent_today_result = 7642,
        s2c_performance_info_agent_yesterday_result = 7643,
        s2c_req_vip_info_result = 7660,
        gs2c_player_connect_result = 31001,
        gs2c_player_disconnect_result = 31002,
        gs2c_activity_accumulate_rmb_info_result = 7665,
        gs2c_activity_accumulate_rmb_apply_result = 7666,
        gs2c_activity_accumulate_rmb_reward_result = 7667,
        gs2c_activity_check_result = 7649,
        gs2c_activity_accumulate_per_info_result = 7668,
        gs2c_activity_accumulate_per_apply_result = 7669,
        gs2c_activity_accumulate_per_reward_result = 7670,
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
        channelid?: string;
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
    type c2s_update_sex = {
        packet_id?: number;
        sex?: number;
    };
    type c2s_beneifts = {
        packet_id?: number;
    };
    type c2s_get_questlist = {
        packet_id?: number;
    };
    type c2s_receive_questreward = {
        packet_id?: number;
        questid?: number;
    };
    type c2s_ask_message = {
        packet_id?: number;
    };
    type c2s_delete_message = {
        packet_id?: number;
        delete_list: string[];
    };
    type c2s_read_message = {
        packet_id?: number;
        id?: string;
    };
    type c2s_receive_share_reward = {
        packet_id?: number;
    };
    type c2s_req_faq = {
        packet_id?: number;
    };
    type c2s_req_faq_detail = {
        packet_id?: number;
        index?: number;
    };
    type c2s_req_cs_contact = {
        packet_id?: number;
    };
    type c2s_suggestion = {
        packet_id?: number;
        text?: string;
    };
    type c2s_req_suggest = {
        packet_id?: number;
    };
    type c2s_wechat_share_task = {
        packet_id?: number;
    };
    type c2s_performance_list = {
        packet_id?: number;
    };
    type c2s_performance_gain = {
        packet_id?: number;
    };
    type c2s_performance_child = {
        packet_id?: number;
        player_id?: number;
    };
    type c2s_performance_check_gain = {
        packet_id?: number;
    };
    type c2s_performance_team_create = {
        packet_id?: number;
        count?: number;
        nick_name?: string;
    };
    type c2s_performance_team_list = {
        packet_id?: number;
    };
    type c2s_performance_team_info = {
        packet_id?: number;
        team_id?: number;
    };
    type c2s_performance_team_update = {
        packet_id?: number;
        optype?: number;
        team_id?: number;
        limit?: number;
        nick_name?: string;
    };
    type c2s_performance_info = {
        packet_id?: number;
    };
    type c2s_performance_info_self_today = {
        packet_id?: number;
    };
    type c2s_performance_info_self_yesterday = {
        packet_id?: number;
    };
    type c2s_performance_info_agent_today = {
        packet_id?: number;
    };
    type c2s_performance_info_agent_yesterday = {
        packet_id?: number;
    };
    type c2s_req_vip_info = {
        packet_id?: number;
    };
    type c2gs_player_connect = {
        packet_id?: number;
        playerid?: number;
        gameid?: number;
    };
    type c2gs_player_disconnect = {
        packet_id?: number;
        playerid?: number;
    };
    type c2gs_game_history = {
        packet_id?: number;
        gameid?: number;
    };
    type c2gs_activity_accumulate_rmb_info = {
        packet_id?: number;
    };
    type c2gs_activity_accumulate_rmb_apply = {
        packet_id?: number;
    };
    type c2gs_activity_accumulate_rmb_reward = {
        packet_id?: number;
    };
    type c2gs_activity_check = {
        packet_id?: number;
    };
    type c2gs_activity_accumulate_per_info = {
        packet_id?: number;
    };
    type c2gs_activity_accumulate_per_apply = {
        packet_id?: number;
    };
    type c2gs_activity_accumulate_per_reward = {
        packet_id?: number;
    };
    type s2c_send_msglist = {
        packet_id?: number;
        msgpaks: msg_list[];
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
    type s2c_update_sex_result = {
        packet_id?: number;
        sex?: number;
        result?: number;
    };
    type s2c_w2c_notify = {
        packet_id?: number;
        content?: string;
        notifyType?: number;
        talkerNickName?: string;
        playerId?: number;
        talkerVIPLevel?: number;
        hasMonthCard?: boolean;
        repCount?: number;
        interval?: number;
        moneyNum?: number;
    };
    type s2c_benefits_result = {
        packet_id?: number;
        result?: number;
    };
    type s2c_get_questlist_result = {
        packet_id?: number;
        questlist: msg_quest_info[];
        is_new?: boolean;
    };
    type s2c_receive_questreward_result = {
        packet_id?: number;
        questid?: number;
        result?: number;
    };
    type s2c_change_quest = {
        packet_id?: number;
        qinfo?: msg_quest_info;
    };
    type s2c_ask_message_result = {
        packet_id?: number;
        result?: boolean;
        msg_list: msg_some_info[];
    };
    type s2c_delete_message_result = {
        packet_id?: number;
        result?: boolean;
    };
    type s2c_read_message_result = {
        packet_id?: number;
        result?: number;
        id?: string;
    };
    type s2c_bind_reward = {
        packet_id?: number;
        reward_gold?: number;
    };
    type s2c_notify_share = {
        packet_id?: number;
        game_id?: number;
        room_id?: number;
        win_gold?: number;
        share_reward?: number;
    };
    type s2c_receive_share_reward_result = {
        packet_id?: number;
        result?: number;
        reward?: number;
    };
    type s2c_req_faq_result = {
        packet_id?: number;
        faq_list: msg_faq_def[];
    };
    type s2c_req_faq_detail_result = {
        packet_id?: number;
        faq?: msg_faq_def;
    };
    type s2c_req_cs_contact_result = {
        packet_id?: number;
        qq?: string;
    };
    type s2c_suggestion_result = {
        packet_id?: number;
        result?: number;
        suggest?: msg_suggest;
    };
    type s2c_req_suggest_result = {
        packet_id?: number;
        list: msg_suggest[];
    };
    type s2c_notify_task_reflush = {
        packet_id?: number;
    };
    type s2c_performance_list_result = {
        packet_id?: number;
        info: msg_performance_info[];
    };
    type s2c_performance_gain_result = {
        packet_id?: number;
        result?: number;
        gain?: number;
    };
    type s2c_performance_child_result = {
        packet_id?: number;
        info?: msg_performance_info;
    };
    type s2c_performance_check_gain_result = {
        packet_id?: number;
        gain?: number;
    };
    type s2c_performance_team_create_result = {
        packet_id?: number;
        result?: number;
        team_id?: number;
        count?: number;
        nick_name?: string;
        code_tag?: number;
    };
    type s2c_performance_team_list_result = {
        packet_id?: number;
        teams: msg_performance_team[];
    };
    type s2c_performance_team_info_result = {
        packet_id?: number;
        team: msg_performance_team[];
    };
    type s2c_performance_team_update_result = {
        packet_id?: number;
        result?: number;
        optype?: number;
        team_id?: number;
        limit?: number;
        nick_name?: string;
        code_tag?: number;
    };
    type s2c_performance_info_result = {
        packet_id?: number;
        commission_today_team?: number;
        commission_today_self?: number;
        commission_today_agent?: number;
        commission_yesterday_team?: number;
        commission_yesterday_self?: number;
        commission_yesterday_agent?: number;
        per_today_team?: number;
        per_today_self?: number;
        per_today_agent?: number;
        per_yesterday_team?: number;
        per_yesterday_self?: number;
        per_yesterday_agent?: number;
        per_today?: number;
        per_this_week?: number;
        rebate_today?: number;
        rebate_this_week?: number;
        per_b_self_today?: number;
        per_b_child_today?: number;
        per_b_self_yesterday?: number;
        per_b_child_yesterday?: number;
        ac?: number;
        ac_inc?: number;
        ac_inc_yd?: number;
        ac_inc_tw?: number;
        ac_inc_lw?: number;
        ac_inc_tm?: number;
        ac_inc_lm?: number;
    };
    type s2c_performance_info_self_today_result = {
        packet_id?: number;
        result?: number;
    };
    type s2c_performance_info_self_yesterday_result = {
        packet_id?: number;
        result?: number;
    };
    type s2c_performance_info_agent_today_result = {
        packet_id?: number;
        result?: number;
    };
    type s2c_performance_info_agent_yesterday_result = {
        packet_id?: number;
        result?: number;
    };
    type s2c_req_vip_info_result = {
        packet_id?: number;
        viplv?: number;
        vipexp?: number;
    };
    type gs2c_player_connect_result = {
        packet_id?: number;
        result?: number;
    };
    type gs2c_player_disconnect_result = {
        packet_id?: number;
        result?: number;
    };
    type gs2c_activity_accumulate_rmb_info_result = {
        packet_id?: number;
        bound?: boolean;
        applied?: boolean;
        accumulation?: number;
        index?: number;
        index_reward?: number;
        ts_ready?: number;
        ts_begin?: number;
        ts_end?: number;
        ts_off?: number;
    };
    type gs2c_activity_accumulate_rmb_apply_result = {
        packet_id?: number;
        result?: number;
    };
    type gs2c_activity_accumulate_rmb_reward_result = {
        packet_id?: number;
        result?: number;
        reward?: number;
        index?: number;
    };
    type gs2c_activity_check_result = {
        packet_id?: number;
        ac_bind?: boolean;
        ac_recharge?: boolean;
        ac_recharge_award?: boolean;
        ac_chest?: boolean;
        ac_chest_new?: boolean;
        yun_isshow?: boolean;
        yun_rebate?: number;
        month_card?: boolean;
        activities: number[];
    };
    type gs2c_activity_accumulate_per_info_result = {
        packet_id?: number;
        bound?: boolean;
        applied?: boolean;
        accumulation?: number;
        index?: number;
        index_reward?: number;
        ts_ready?: number;
        ts_begin?: number;
        ts_end?: number;
        ts_off?: number;
    };
    type gs2c_activity_accumulate_per_apply_result = {
        packet_id?: number;
        result?: number;
    };
    type gs2c_activity_accumulate_per_reward_result = {
        packet_id?: number;
        result?: number;
        reward?: number;
        index?: number;
    };
    type msg_list = {
        msgid?: number;
        msginfo?: egret.ByteArray;
    };
    type msg_game_info = {
        gameid?: number;
        gamever?: number;
        curOnlineNum?: number;
        isHot?: boolean;
        sort?: number;
    };
    type msg_account_info = {
        aid?: number;
        channelId?: string;
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
        performance?: number;
        ts_ac_bind?: number;
        can_bind_alipay?: boolean;
        cs_token?: string;
    };
    type msg_quest_info = {
        questid?: number;
        count?: number;
        received?: boolean;
    };
    type msg_some_info = {
        id?: string;
        userId?: number;
        timeValue?: number;
        msgInfo?: string;
        read?: number;
        items: msg_item[];
    };
    type msg_item = {
        id?: number;
        count?: number;
    };
    type msg_faq_def = {
        index?: number;
        text?: string;
    };
    type msg_suggest = {
        text?: string;
        time?: number;
    };
    type msg_performance_info = {
        player_id?: number;
        photo_frame?: number;
        nick_name?: string;
        parent?: number;
        per_today?: number;
        per_yesterday?: number;
        per_sub_today?: number;
        per_sub_yesterday?: number;
        per_tw?: number;
        per_lw?: number;
        per_sub_tw?: number;
        per_sub_lw?: number;
        ts_create?: number;
        ac?: number;
        ac_inc?: number;
        ac_inc_yd?: number;
        ac_inc_tw?: number;
        ac_inc_lw?: number;
        ac_inc_tm?: number;
        ac_inc_lm?: number;
        gain_yd?: number;
        gain_tw?: number;
        gain_lw?: number;
        gain?: number;
    };
    type msg_performance_team = {
        id?: number;
        name?: string;
        count?: number;
        count_limit?: number;
        code_tag?: number;
        ac_inc?: number;
        member_infos: msg_performance_info[];
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
            "channelid": number[];
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
        "5012": {
            "packet_id": number[];
            "sex": number[];
        };
        "5037": {
            "packet_id": number[];
        };
        "5058": {
            "packet_id": number[];
        };
        "5059": {
            "packet_id": number[];
            "questid": number[];
        };
        "5080": {
            "packet_id": number[];
        };
        "5081": {
            "packet_id": number[];
            "delete_list": number[];
        };
        "5082": {
            "packet_id": number[];
            "id": number[];
        };
        "5091": {
            "packet_id": number[];
        };
        "5092": {
            "packet_id": number[];
        };
        "5093": {
            "packet_id": number[];
            "index": number[];
        };
        "5094": {
            "packet_id": number[];
        };
        "5097": {
            "packet_id": number[];
            "text": number[];
        };
        "5098": {
            "packet_id": number[];
        };
        "5100": {
            "packet_id": number[];
        };
        "5120": {
            "packet_id": number[];
        };
        "5121": {
            "packet_id": number[];
        };
        "5122": {
            "packet_id": number[];
            "player_id": number[];
        };
        "5123": {
            "packet_id": number[];
        };
        "5124": {
            "packet_id": number[];
            "count": number[];
            "nick_name": number[];
        };
        "5125": {
            "packet_id": number[];
        };
        "5126": {
            "packet_id": number[];
            "team_id": number[];
        };
        "5127": {
            "packet_id": number[];
            "optype": number[];
            "team_id": number[];
            "limit": number[];
            "nick_name": number[];
        };
        "5128": {
            "packet_id": number[];
        };
        "5129": {
            "packet_id": number[];
        };
        "5130": {
            "packet_id": number[];
        };
        "5131": {
            "packet_id": number[];
        };
        "5132": {
            "packet_id": number[];
        };
        "5143": {
            "packet_id": number[];
        };
        "5150": {
            "packet_id": number[];
        };
        "5155": {
            "packet_id": number[];
        };
        "5156": {
            "packet_id": number[];
        };
        "5157": {
            "packet_id": number[];
        };
        "5158": {
            "packet_id": number[];
        };
        "5159": {
            "packet_id": number[];
        };
        "5160": {
            "packet_id": number[];
        };
        "30001": {
            "packet_id": number[];
            "playerid": number[];
            "gameid": number[];
        };
        "30002": {
            "packet_id": number[];
            "playerid": number[];
        };
        "30003": {
            "packet_id": number[];
            "gameid": number[];
        };
    };
    let s2cDecode: {
        "401": {
            "1": (string | number)[];
            "3": (string | number)[];
        };
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
        "7511": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7523": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
            "7": (string | number)[];
            "8": (string | number)[];
            "9": (string | number)[];
            "10": (string | number)[];
        };
        "7539": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7561": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7562": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7563": {
            "1": (string | number)[];
            "3": (string | number)[];
        };
        "7586": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7587": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7588": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7589": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7599": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
        };
        "7600": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7601": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7602": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7603": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7606": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7607": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7609": {
            "1": (string | number)[];
        };
        "7631": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7632": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7633": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7634": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7635": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
        };
        "7636": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7637": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7638": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
        };
        "7639": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
            "7": (string | number)[];
            "8": (string | number)[];
            "9": (string | number)[];
            "10": (string | number)[];
            "11": (string | number)[];
            "12": (string | number)[];
            "13": (string | number)[];
            "14": (string | number)[];
            "15": (string | number)[];
            "16": (string | number)[];
            "17": (string | number)[];
            "18": (string | number)[];
            "19": (string | number)[];
            "20": (string | number)[];
            "21": (string | number)[];
            "22": (string | number)[];
            "23": (string | number)[];
            "24": (string | number)[];
            "25": (string | number)[];
            "26": (string | number)[];
            "27": (string | number)[];
            "28": (string | number)[];
        };
        "7640": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7641": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7642": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7643": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7649": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
            "7": (string | number)[];
            "8": (string | number)[];
            "9": (string | number)[];
            "10": (string | number)[];
        };
        "7660": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "7665": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
            "7": (string | number)[];
            "8": (string | number)[];
            "9": (string | number)[];
            "10": (string | number)[];
        };
        "7666": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7667": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
        };
        "7668": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
            "7": (string | number)[];
            "8": (string | number)[];
            "9": (string | number)[];
            "10": (string | number)[];
        };
        "7669": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "7670": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
        };
        "31001": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "31002": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
    };
    let typeDecode: {
        "10": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "11": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
        };
        "12": {
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
            "62": (string | number)[];
            "63": (string | number)[];
            "64": (string | number)[];
            "65": (string | number)[];
        };
        "13": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
        };
        "14": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
        };
        "15": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "16": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "17": {
            "1": (string | number)[];
            "2": (string | number)[];
        };
        "18": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
            "7": (string | number)[];
            "8": (string | number)[];
            "9": (string | number)[];
            "10": (string | number)[];
            "11": (string | number)[];
            "12": (string | number)[];
            "13": (string | number)[];
            "14": (string | number)[];
            "15": (string | number)[];
            "16": (string | number)[];
            "17": (string | number)[];
            "18": (string | number)[];
            "19": (string | number)[];
            "20": (string | number)[];
            "21": (string | number)[];
            "22": (string | number)[];
            "23": (string | number)[];
            "24": (string | number)[];
        };
        "19": {
            "1": (string | number)[];
            "2": (string | number)[];
            "3": (string | number)[];
            "4": (string | number)[];
            "5": (string | number)[];
            "6": (string | number)[];
            "7": (string | number)[];
        };
    };
}
declare module Base64 {
    function base64Encode(str: string): string;
    function decode(str: string): string;
}
declare module CacheUtil {
    function getArr(): any[];
    function freeArr(arr: any[]): void;
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
    /**
     * 本期结束还有几天几时几分几秒 周一 和周五零点结束
     */
    function formatTm(): any;
    /**
     *
     * @param tm 毫秒
     */
    function getHourMinSec(offTm: number): any;
}
declare module game {
    class ExtensionPop extends UIPopup {
        private skclose;
        private skTG;
        constructor();
        childrenCreated(): void;
    }
}
