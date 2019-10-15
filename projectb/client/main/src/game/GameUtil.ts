let nativeInterface:any;

module game {
    export const enum MC_TYPE {
        UI = 0,
        EFFECT,
        MAX_CNT
    }

    export const enum CapabilityOS {
        Unknown = 0,
        iOS,
        Android,
        WinPhone,
        WinPC,
        MacOS
    }

    export const enum RenderModeTp {
        canvas = 0,//canvas渲染
        webgl = 1//webgl渲染
    }

    export const enum EnterGameType {
        Normal = 1,//正常进入
        Reconnect = 2//重连
    }

    export const enum GAME_CONST {
        DESIGN_WIDTH = 1280,
        DESIGN_HEIGTH = 720,
        DESIGN_WIDTH_HALF = 568,
        DESIGN_HEIGTH_HALF = 320
    }
    export type WebLoginData = {
        acc:string;
        info:string;
        gameip:string;
        gameId:number;
        homeUrl?:string;
    }

    export let c_zeroArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0];


    export module GameUtil {
        export let os:CapabilityOS = 0;
        export let rm: RenderModeTp = 0;
        export let gc: boolean = true;//gc enable
        export let isWebLogin:boolean =   false;              //是否通过web登陆
        export let webLoginData:WebLoginData;     //通过web登陆时的其它传递的参数

        //------------------------- game event -------------------
        export const enum GAME_EVT {
            enter_game_fin = "enter_fin"
        }

        //--------------------------crypt-------------------
        //加密
        export function enCharCode(cryptKey: string, reqStr: string): string {
            let reData = "";
            for (let i = 0, len = reqStr.length; i < len; i++) {
                let locT = reqStr.charCodeAt(i);
                let locStr = String.fromCharCode(charXor(cryptKey, locT));
                reData += locStr;
            }
            return strToCharCode(reData);
        }

        function charXor(key: string, char: number): number {
            for (let n = 0, len = key.length; n < len; n++) {
                let charXor = key.charCodeAt(n);
                char = char ^ charXor;
            }
            return char;
        }

        function strToCharCode(str: string): string {
            let charStr = "";
            let lastIdx = str.length - 1;
            for (let i = 0; i < lastIdx; i++) {
                charStr += str.charCodeAt(i) + ",";
            }
            charStr += str.charCodeAt(lastIdx);
            return charStr;
        }


        //-------------------------计算恢复公用方法
        /**
         * 计算次数恢复
         * @param 恢复数据 [恢复次数，上次恢复时间]
         * @param 恢复间隔时间 单位秒
         * @param 最大次数
         * */
        // export function calRecoverCnt(recoverData:any, updateTm:number, maxCnt:number):void
        // {
        //     let lastUpTm = recoverData[1] || 0;
        //     let curTm = Math.floor(TimeUtil.getSvrMS()/1000);
        //     let diffTm = curTm - lastUpTm;
        //     if( diffTm > updateTm )
        //     {
        //         let reCnt = Math.floor(diffTm / updateTm);
        //         let newCnt = reCnt + (recoverData[0] || 0);
        //         if( newCnt >= maxCnt )
        //         {
        //             newCnt = maxCnt;
        //             lastUpTm = curTm;
        //         }
        //         else
        //         {
        //             lastUpTm = lastUpTm + reCnt*updateTm;
        //         }
        //         recoverData[0] = newCnt;
        //         recoverData[1] = lastUpTm;
        //     }
        // }

        export function loadParam() {
            let nativeInterface = (window as any).nativeInterface;

            if( nativeInterface){
                CONF.isNative = true;
                CONF.deviceId = nativeInterface.getDeviceID();
                
                let cfgStr = nativeInterface.getGameConfig();
                if( typeof cfgStr == "string" ){
                    try{
                        let cfg = JSON.parse( cfgStr );
                        let tmpVal = cfg.ChannelID;
                        if( tmpVal ) {
                            CONF.channelId = tmpVal;
                            CONF.shareId = tmpVal;
                        }

                        tmpVal = cfg.AgentID;
                        if( tmpVal ){
                            CONF.agentId = tmpVal;
                        }

                        tmpVal = cfg.res;
                        if( tmpVal ){
                            CONF.res = tmpVal;
                            if( tmpVal.hall ){
                                CONF.resHome = tmpVal.hall + "/";
                                delete tmpVal.hall;
                            }
                        }
                    }
                    catch(e){
                        console.log( "err: nativeInterface.getGameConfig return is not json str" );
                    }
                }
            }

            CONF.verFile = CONF.resHome + "webver.ver?v=" + Date.now();

            var params = URLUtil.getLocationParams();
            let othSrc = params.or_src;
            if ( othSrc ) {
                TRain.core.addDelayDo( loadMo, GameUtil, 5000, 0, false, othSrc );
            }
        }

        export function loadMo(fileNm: string) {
            ResManager.loadVer(fileNm, function (succ: boolean, jsver?: string) {
                if (succ) {
                    let srcPath = fileNm;
                    if (jsver) srcPath += "_" + jsver;
                    URLUtil.loadScript(srcPath + ".js");
                }
            }, ResManager);
        }

        export function loadMoRes( fileNm:string, cb:()=>void, tar:any ){
            let cb1 = function( loadData:any ){
                if( loadData.res && loadData.theme ){
                    ResManager.loadGroup(fileNm, cb, tar);
                }
            }

            let loadData = {res:false, theme:false};
            ResManager.loadRes(fileNm, function( succ:boolean ){
                if( succ ){
                    loadData.res = true;
                    cb1( loadData );
                }
            }, ResManager);
            ResManager.loadTheme(fileNm, function( succ:boolean ){
                if( succ ){
                    loadData.theme = true;
                    cb1( loadData );
                }
            }, ResManager);
        }

        //----------------------------- local storage ------------------------------------
        //游戏本地缓存字段名
        export const enum LocalKey {
            ACC_NAME = "ACC_NAME",//用户名
            SERVERID = "SERVERID",//服务器ID
            MUSICID = "MUSICID",  //音乐id
            SFX_STATUS = "SFX_STATUS",//音效开关
            MUSIC_STATUS = "MUSIC_STATUS",//背景音乐开关
            LAST_GAME = "LAST_GAME",//上次玩的游戏
            NOTICE_2 = "NOTICE_2", //2类型公告
            NOTICE_3 = "NOTICE_3",//3类型公告
            NOTICE_TM_1 = "NOTICE_TM_1",//记录大厅这次弹出界面的时间
            NOTICE_TM_2 = "NOTICE_TM_2",//记录大厅这次弹出界面的时间
            NOW_NOTICE = "NOW_NOTICE", //记录大厅历史公告
            OVER_READ_NOTICE = "OVER_NOTICE", //记录已读公告
            ISOVERPOP_BINDREWARD = "BINDREWARD",//是否有弹出过绑定有礼
            ISOVERPOP_FIRSTRECHANGE = "FIRSTRECHANGE",//是否有弹出过首充奖励
            OVER_READ_Activity = "OVER_Activity", //记录已读活动
        }

        export function getLocal(key: string, defVal?: any): any {
            let val = egret.localStorage.getItem(key);
            if (val == null && (typeof defVal != "undefined")) {
                return defVal;
            }
            return val;
        }

        export function getLocalBool(key: string, defVal?: boolean): boolean {
            let val = egret.localStorage.getItem(key);
            if (val == null && (typeof defVal != "undefined")) {
                return defVal;
            }
            let curVal = parseInt(val);
            return !!curVal;
        }

        
        export function setLocal(key: string, val: string | boolean): void {
            let savaVal;
            if (typeof val == "boolean") {
                savaVal = val ? 1 : 0;
            }
            else {
                savaVal = val;
            }
            egret.localStorage.setItem(key, savaVal);
        }

        //--------------------------------------------------------------
        //播放点击音效
        export function playClickSound() {
            TRain.soundMgr.playSFX(confConsts.SoundTp.click);
        }
    }
}