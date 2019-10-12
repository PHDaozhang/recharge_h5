
module game
{
    export interface ILoadShow
    {
        showBusy();
        hideBusy();
    }

    const enum LoadResConsts
    {
        MAX_LOAD_CNT = 3,
    }

    
    type LoadConfInfo = {
        tars:{fin:Function,tar:any}[];
        url:string;
        data:any;
    }

    /**
     * 资源管理器
     *
     * */
    export let resMgr:ResManager;

    export const enum ResMgr_EVT{
        LINE_LOAD_FIN = "line_fin",  // 线性加载完成
    }

    const enum ResConst {
        confPath = "conf/",
        RES_POSTFIX = "_res",
        THEME_POSTFIX = "_theme",
        WEBVER_HEAD = "webver_",
    }

    type ResLoadData = {nm:string, cb:(succ:boolean)=>void, tar:any};

    export class ResManager
    {
        public static getConfUrl( name:string ){
            return ResConst.confPath + name + ".json";
        }

        public static loadVer( fileNm:string, cb:(succ:boolean, jsver?:string)=>void, tar:any, needHome?:boolean ): void {
            let verCtrl = RES.getVersionController() as TRain.WebVerController;
            let homeUrl = "";
            if( needHome ){
                homeUrl = verCtrl.getHome(fileNm);
                if( !homeUrl ){
                    homeUrl = CONF.res[fileNm] || (fileNm + (CONF.res.all || ""));
                    verCtrl.addHome( fileNm, homeUrl );
                    homeUrl = verCtrl.getHome(fileNm);
                }
            } 

            let cb1 = function (event: egret.Event): void {
                if (event.type == egret.Event.COMPLETE) {
                    let request: egret.HttpRequest = <egret.HttpRequest>(event.target);
                    let data = JSON.parse(request.response);
                    let jsver = data.js;
                    if( jsver ) delete data.js;
    
                    (RES.getVersionController() as TRain.WebVerController).addWebVer(data);

                    cb.call( tar, true, jsver );
                }
                else{
                    cb.call( tar, false );
                }
            }

            let request: egret.HttpRequest = new egret.HttpRequest();
            request.addEventListener(egret.Event.COMPLETE, cb1, ResManager);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, cb1, ResManager);

            request.responseType = egret.HttpResponseType.TEXT;
            request.open(homeUrl + ResConst.WEBVER_HEAD + fileNm + ".ver?v=" + Date.now());
            request.send();
        }

        private static _resData:{waits:ResLoadData[], cur:ResLoadData} = {waits:[], cur:null};
        public static loadRes( fileNm:string, cb:(succ:boolean)=>void, tar:any ): void {
            let loadData = {nm:fileNm, cb:cb, tar:tar};
            let resData = ResManager._resData;
            if(resData.cur){
                resData.waits.push(loadData);
            }
            else{
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
                    let resData = ResManager._resData;
                    let loadData = resData.cur;
                    if( loadData ){
                        loadData.cb.call( loadData.tar, true );
                        resData.cur = null;
                    }

                    let waits = resData.waits;
                    if( waits.length <=0 ){
                        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, <any>arguments.callee, ResManager);
                    }
                    else{
                        loadData = resData.cur = waits.shift();
                        let resUrl = loadData.nm + ResConst.RES_POSTFIX + "." + TRain.RES_TYPE.JSON;
                        RES.loadConfig(resUrl, "");
                    }
                }, ResManager);
    
                resData.cur = loadData;
                
                let resUrl = fileNm + ResConst.RES_POSTFIX + "." + TRain.RES_TYPE.JSON;
                RES.loadConfig(resUrl, "");
            }
        }

        public static loadTheme( fileNm:string, cb:(succ:boolean)=>void, tar:any, gpNm?:string ): void {
            let resUrl = fileNm + ResConst.THEME_POSTFIX + "." + TRain.RES_TYPE.JSON;
            RES.getResByUrl(resUrl, function (data: any) {
                if( data ) TRain.UITheme.addSkinConf(data, gpNm);
                cb.call( tar, !!data );
            }, ResManager, RES.ResourceItem.TYPE_JSON);
        }

        public static loadGroup( groupNm:string, cb:()=>void, tar:any ):void{
            let cb1 = function (event: RES.ResourceEvent) {
                if (event.groupName == groupNm) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb1, ResManager);

                    cb.call(tar);
                }
            };

            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb1, ResManager);
            RES.loadGroup(groupNm);
        }



        //------------------------------------------------------------------------
        public loadShow:ILoadShow;

        private _iconRes:any;
        private _paths:any;

        //------------ 加载 配置 
        private _parses:LoadConfInfo[];//等待解析的配置
        private _loadConf:{[key:string]:LoadConfInfo};
        private _loadcnt:number;

        //------------- 流水线加载 
        private _lineLoads:{src:string, tp:string, url:boolean}[];//队列待加载的资源
        private _lineLoadCnt:number = 0;//正在加载的个数

        private _clrs:number[];

        constructor()
        {
            let self = this;
            self._loadConf = {};
            self._parses = [];
            self._loadcnt = 0;

            self._lineLoads = [];
            self._lineLoadCnt = 0;

            self._iconRes = {};

            self._clrs = [
                0,
                0xafd1db,
                0x70c1ff,
                0xde88fe,
                0xff983c,
                0xffffff,
                0xffcc00,
                0xfff600
            ];
        }

        public initResConf( data:any ):void
        {
            let self = this;
            if(data)
            {
                let paths = self._paths = data.path;
                if(paths)
                {
                    DBoneManager.resPath = paths.db;
                }
                self._iconRes = data.iconRes;
            }

            let soundMgr = TRain.soundMgr;
            soundMgr.sfxState = GameUtil.getLocalBool( GameUtil.LocalKey.SFX_STATUS,true );
            soundMgr.musicState = GameUtil.getLocalBool( GameUtil.LocalKey.MUSIC_STATUS,true);
        }

        public getQualColor( qual:number ){
            return this._clrs[qual];
        }

        //---------------------------------------------------------------
        // private _getIconSrc( key:string, arg1:number|string ):string
        // {
        //     let iconRess = this._iconRes[key];
        //     for( let i=0, len=iconRess.length; i<len; ++i ){
        //         let info = iconRess[i];
        //         if( info.min<=arg1 && info.max>=arg1 ){
        //             return info.nm + "@" + arg1;
        //         }
        //     }
        //     return null;
        // }

        public getImgUrl( nm:string, isJpg:boolean ){
            return this._paths.img + nm + (isJpg?".jpg":".png");
        }

        //-------------------------- load config ----------------------------------------
        //获取游戏内平台相关配置
        // public loadPlatConf(tp:PlatSourceTp,platId:number,fin:Function, thisObj:any)
        // {
        //     let self = this;
        //     let key = "";
        //     switch (tp)
        //     {
        //         case PlatSourceTp.poster: key = "poster"; break;
        //     }
        //     if(platId) key += "_" + platId;
        //     self.loadConf(self._paths.plat + key + ".json",fin,thisObj,true);
        // }


        //----------------------------------- 加载 config ----------------------------------------------
        public getLoadCnt():number
        {
            return this._loadcnt;
        }

        public getParseCnt():number
        {
            return this._parses.length;
        }

        public loadConf( url:string, fin:Function, tar:any, isURL:boolean = false):void
        {
            let self = this;
            let loadConfList = self._loadConf;
            if(!isURL) url = ResManager.getConfUrl(url);
   
            let target = {fin:fin, tar:tar};
            let loadInfo = loadConfList[url];
            if( loadInfo ){
                loadInfo.tars.push( target );
            }
            else{
                self._loadcnt++;
                loadInfo = loadConfList[url] = {tars:[target], url:url, data:null};
                RES.getResByUrl(url, self.loadConfFin, self, RES.ResourceItem.TYPE_JSON);
            }
        }

        private loadConfFin( data:any, url:string ):void
        {
            let self = this;
            if( data ){
                let loadInfo = self._loadConf[url];
                loadInfo.data = data;
                let parses = self._parses;
                parses.push( loadInfo );
                if( parses.length==1 ){
                    TRain.core.addFrameDo( self.parseConf, self, false );
                }
            }
            self._loadcnt--;
            delete self._loadConf[url];
        }

        private parseConf():void
        {
            let self = this;
            let loadInfo = self._parses[0];
            let target = loadInfo.tars.shift();
            target.fin.call( target.tar, loadInfo.data, loadInfo.url );

            if( loadInfo.tars.length === 0 )
            {
                self._parses.shift();
                RES.destroyRes( loadInfo.url );

                if( self._parses.length === 0 )
                {
                    TRain.core.rmvFrameDo( self, self.parseConf );
                }
            }
        }

        //---------------------------------------------------------
        public preloadFin:boolean;//预加载是否结束
        public startPreload():void{
            let self = this;
            let accMo = dataMgr.accMo;
            if( accMo.getData() ){
                self._startPreload();
            }
            else{
                accMo.addListener( AccountMo_EVT.login_svr_fin, self._startPreload, self, true );
            }
        }

        private _startPreload(){
            let self = this;
            let gameModel = dataMgr.gameMo;
            let curSvrList = gameModel.getData();
            let loadGmds:GmdConf[] = [];
            for(let i = 0;i<curSvrList.length;i++){
                let gameId = curSvrList[i].gameid;
                let gameConf = gameModel.getGmdConf(gameId);
                if(gameConf){
                    loadGmds.push(gameConf); 
                }
            }

            let loadCnt = loadGmds.length;
            if( loadCnt>0 ){
                notifiCenter.addListener( ResMgr_EVT.LINE_LOAD_FIN, function(){
                    self.preloadFin = true;
                }, self, true );

                if( loadCnt>10 ) {
                    loadGmds.sort( function( a:GmdConf, b:GmdConf ):number{
                        return a.wg - b.wg;
                    } )

                    loadCnt = 10;
                }

                for( let i=0; i<loadCnt; ++i ){
                    let url = dbMgr.getUrl( loadGmds[i].file );
                    self.lineLoad( url, true, TRain.RES_TYPE.MC );
                }
            }
            else{
                self.preloadFin = true;
            }
        }

        //-------------------------------流水线加载-----------------
        //加载一批资源
        /**
         * 
         * @param source 
         * @param isUrl 当url为true， 需要指定
         * @param tp 
         */
        public lineLoad( source:string, isUrl?:boolean, tp?:string  ):void
        {
            let self = this;
            self._lineLoads.push( {src:source, tp:tp, url:isUrl} );

            if( self._lineLoads.length == 1 ){
                TRain.core.addNextDo( self._startLineLoad, self );
            }
        }

        private _startLineLoad():void{
            let self = this;
            if(self.loadShow) self.loadShow.showBusy();

            self._trylineLoad();
        }

        private _trylineLoad():void{
            let self = this;
            let lineLoads = self._lineLoads;
            while( lineLoads.length>0 && self._lineLoadCnt<LoadResConsts.MAX_LOAD_CNT ){
                let loadInfo = lineLoads.shift();
                self._lineLoadCnt++;
                if( loadInfo.url ){
                    TRain.assetMgr.getUrlAsset( loadInfo.src, self._lineLoadFin, self, loadInfo.tp );
                }
                else{
                    TRain.assetMgr.getAsset( loadInfo.src, self._lineLoadFin, self );
                }
            }

            if( self._lineLoadCnt==0 ){
                if(self.loadShow) self.loadShow.hideBusy();
                notifiCenter.postEvent( ResMgr_EVT.LINE_LOAD_FIN );
            }
        }

        private _lineLoadFin():void{
            let self = this;
            self._lineLoadCnt--;
            self._trylineLoad();
        }

        //----------------------------------------------- 特定加载 ----------------------------------
    }
}

