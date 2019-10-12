module game
{
    export const enum SceneType
    {
        NONE,
        LodingScene,
        LoginScene,
        GameScene,
    }

    const enum EnterGameStep
    {
        loadLoading = 0,//加载游戏内初始配置
        loadgameConf, //加载game_config
        loadmainui, //加载主界面资源
        loadPreload,//预加载资源 
        waitparse, //等待解析完
        end//结束
    }

    const enum LoadStepState
    {
        wait = 0, //等待开始
        loading,
        finish,
    }

    export const enum DelayFlag
    {
        normal      = 0,
        newday      = 1,
    }

    export let gameMgr:GameManager;

    export class GameManager
    {
        //------------------------------- 进入游戏 ------------------------------
        private _loadStep:EnterGameStep; //加载阶段
        private _stepState:LoadStepState;

        constructor()
        {
            let self = this;
            self._loadStep = EnterGameStep.loadLoading;
            self._stepState = LoadStepState.wait;

            self._scTp = SceneType.NONE;
        }

        public begin( main:IMainDelegate ):void
        {
            let self = this;
            self._main = main;

            TRain.core.stage.addEventListener( egret.Event.RESIZE, function( e:Event ){
                let stage:egret.Stage = <any>e.target;
                notifiCenter.postEvent( egret.Event.RESIZE, stage.$stageWidth, stage.$stageHeight );
            }, self );

            HttpUtil.svrURL = CONF.svrUrl;

            resMgr = new ResManager();
            dataMgr = new DataManager();
            dbMgr = new DBoneManager();

            TipsMgr.init();
            let resName = "resConf";
            let resData = RES.getRes( resName );
            if( resData )
            {
                resMgr.initResConf( resData );
                if(resData.filter) cui.uiMgr.createFilters( resData.filter );
                RES.destroyRes( resName );
            }

            resName = "lang";
            resData = RES.getRes( resName );
            if( resData )
            {
                TRain.langMgr.addGps( resData );
                RES.destroyRes( resName );
            }

            Protobuf.addDecodeProtos( NET_CONF.s2cDecode, NET_CONF.typeDecode );
            Protobuf.addEncodeProtos( NET_CONF.c2sEncode );

            TRain.core.addFrameDo( TRain.actionMgr.advanceTime, TRain.actionMgr, true );
            TRain.core.addFrameDo( TRain.mcMgr.advanceTime, TRain.mcMgr, true );

            self.startLogin();
        }

        //----------------------------------- scene --------------------------------
        private _main:IMainDelegate;

        private _scTp:SceneType;
        private _curScene:BaseScene;
        public gotoScene( tp:SceneType ):void
        {
            let self = this;
            if( self._scTp == tp ) return;

            self._scTp = tp;
            let scene:BaseScene;
            switch (tp)
            {
                case SceneType.LodingScene:
                    scene = LoadingScene.getInst();
                    break;
                case SceneType.LoginScene:
                    scene = new LoginScene();
                    break;
                case SceneType.GameScene:
                    scene = GameScene.createInst();
                    break;
            }

            let oldScene = self._curScene;
            if( oldScene )
            {
                self._main.removeChild( oldScene );
                oldScene.dispose();
                self._curScene = null;
            }

            self._curScene = scene;

            if( scene )
            {
                self._main.addChild( scene );
            }
        }

        //------------------------------------------------- login ---------------------------------------
        private startLogin():void
        {
            let self = this;
            //notifiCenter.addListener( CONN_EVT.CONN_SUCC, self.tryStartStep, self, true );
            //dataMgr.accMo.addListener( Account_EVT.got_svrinfo, self.tryStartStep, self, true );
            self.gotoScene( SceneType.LoginScene );
            //LoadingScene.getInst();
            self.tryStartStep();

            self._main.onGameShow();
        }

        /**
         * 登录游戏服务器
         * */
        // private _conn:boolean;
        // private onConnect():void
        // {
        //     let self = this;
        //     let platMo = dataMgr.platMo;
        //     //analyMgr.svr = platMo.svr;

        //     //dataMgr.userMo.enterGame();

        //     if( !Connect.isRe ){
        //         self._conn = true;
        //         self.tryStartStep();
        //     }
        // }

        /**
         * 进入游戏
         * */
 
        public enterGame():void
        {
            let self = this;
            // dataMgr.userModel.enterGame(function(data){
            //     if(!data){
            //         self._playStatus = PlayStatus.noRole;
            //         //创角
            //         notifiCenter.postEvent(GameEvent.CREATEROLE);
            //     }
            //     else
            //     {
            //         self._playStatus = PlayStatus.role;
            //         self.gotoScene(SceneType.kSceneTagSplash);
            //         notifiCenter.postEvent(GameEvent.SHOWLOADING);
            //     }
            // }, self);
        }

        private startGame():void
        {
            let self = this;
            self._main.onGameShow();
            self.gotoScene( SceneType.GameScene );
            TRain.core.addDelayDo(function(){
                RES.loadGroup( "publicRes" );
            },self,500);
           // dataMgr.startTimeSync();
        }
        //------------------------------------------------ 开始进入游戏 -----------------------------------
        private loadUpdate():void
        {
            let self = this;
            let step = self._loadStep;
            if( step==EnterGameStep.loadgameConf )
            {
                if( self._scTp != SceneType.LoginScene && resMgr.getLoadCnt() == 0 )
                {
                    self.setStepState( LoadStepState.finish );
                }
            }
            else if( step == EnterGameStep.loadPreload )
            {
                if( resMgr.preloadFin )
                {
                    self.setStepState( LoadStepState.finish );
                }
            } 
            else if( step == EnterGameStep.waitparse )
            {
                if( resMgr.getParseCnt() == 0 )
                {
                    self.setStepState( LoadStepState.finish );
                }
            } 
            else if( step == EnterGameStep.end )
            {
                if(LoadingScene.getInst().isFinish() && self._curScene)
                {
                    TRain.core.rmvFrameDo( self, self.loadUpdate );
                    self.startGame();
                }
            }
        }

        private setStepState( state:LoadStepState ):void
        {
            let self = this;
            if( self._stepState === state ) return;

            self._stepState = state;
            if( state === LoadStepState.finish )
            {
                self._loadStep++;
                self._stepState = LoadStepState.wait;
                self.tryStartStep();
            }
        }

        private tryStartStep():void
        {
            let self = this;
            if( self._stepState != LoadStepState.wait ) return;
            if( self._loadStep == EnterGameStep.end ) return;

            let text:string = "";
            let loadingScene = LoadingScene.getInst();
            switch( self._loadStep )
            {
                case EnterGameStep.loadLoading://
                    loadingScene.setLoadStep( text, 10, 333 );
                    //analyMgr.loadingSet( 1, text );
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onGroupFined, self );
                    RES.loadGroup( "loading" );
                    break;
                case EnterGameStep.loadgameConf:
                    loadingScene.setLoadStep( text, 10, 333 );
                    //analyMgr.loadingSet( 3, text );
                    dataMgr.loadConfs();
                    TRain.core.addFrameDo( self.loadUpdate, self, false, 100 );
                    break;
                case EnterGameStep.loadmainui:
                    loadingScene.setLoadStep( text, 30, 1000 );
                    //analyMgr.loadingSet( 5, text );
                    //资源 解析
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onGroupFined, self );
                    RES.loadGroup( "hall" );//加载大厅资源
                    break;
                case EnterGameStep.loadPreload:
                    loadingScene.setLoadStep( text, 30, 1000 );
                    resMgr.startPreload();
                    break;
                case EnterGameStep.waitparse://
                    loadingScene.setLoadStep( text, 20, 666 );
                    //analyMgr.loadingSet( 7, text );
                    break;
            }
            let state = self._stepState = LoadStepState.loading;
            self.setStepState( state );
        }

        private onGroupFined():void
        {
            let self = this;
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onGroupFined, self );
            self.setStepState( LoadStepState.finish );
        }
    }
}
