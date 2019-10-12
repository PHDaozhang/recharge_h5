module game {
    interface IUIBase extends egret.DisplayObjectContainer {
        tag: number;
        ud: any;//userdata
        dispose();
    }

    export interface IScene {
        /**
         * 调用 HomeView的 homeUI.setNotifyParent(跑马灯父窗口)
         * 游戏结束时， 需要还原跑马灯父窗口 调用 homeUI.setNotifyParent(null);
         */
        homeUI: game.HomeView;

        /**
         * 返回到主界面（如果有显示过主界面的话， 无会则不显示任何界面 ）
         * 游戏必须要设置主界面
         */
        goBack();
        /**
         * 
         * @param popup 
         * @param data 
         * @param isTop 
         */
        openPopup(popup: UIPopup, data?: any, isTop?: boolean): void

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

        regUICls(tag: number, uiCls: any);
        unregUICls(tag: number);
        // startPlugin( id:confConsts.PluginsTp, data?:any);
        // stopPlugin(id:confConsts.PluginsTp);

    }


    const enum GameLayer {
        kMainLayer = 0,
        kEffectLayer,
        kPopup,
        kTopPopup,
        kMessageBox,
        kTipsLayer,        //提示层
    }

    export const enum UITag {
        NIL = 0,        //无
        Home = 1,        //主城
        shop = 2,        //商城
        safeBox = 3,
        sevenReward = 4,        //七日奖励
        extension = 5,          //全民代理
        code = 6,               //代理二维码
        systemMsg = 7,
        max,        //最大一级跳转码
    }

    export const enum GameScene_EVT {
        created = "create" //全局事件
    }

    export let gameScene: GameScene;
    /**
     * 游戏主逻辑界面，分层控制游戏内其他界面。
     *
     * */
    export class GameScene extends BaseScene implements PopupDelegate {
        public static createInst(): GameScene {
            if (!gameScene) {
                gameScene = new GameScene();
            }
            return gameScene;
        }

        public homeUI: HomeView;

        private _curTag: UITag;
        private _curUI: cui.BaseContainer;
        private _firstShow: boolean;

        private _mainUI: cui.BaseContainer;

        private _layers: CMap<number, IUIBase>;//Array<cui.IUIBase>;
        private _mainLayer: cui.Group;              //主ui层
        private _popupLayer: PopupLayer;             //弹出界面层
        private _popupTop: PopupLayer;             //顶层弹出界面层

        private _hideHome: number;

        private _uiClss: { [tag: number]: any };

        protected childrenCreated(): void {
            let self = this;
            self._uiClss = {};
            self._hideHome = 0;
            //
            self._firstShow = true;
            let layers: CMap<number, IUIBase> = new CMap<number, IUIBase>();
            self._layers = layers;
            let layer: cui.Group = new cui.Group;
            self._mainLayer = layer;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layers.set(GameLayer.kMainLayer, layer);//mainLayer
            layer.tag = GameLayer.kMainLayer;
            layer.hitCheckBound = false;
            self.addChild(layer);

            // let topBar = MainTop.impl = new MainTop();
            // topBar.tag = GameLayer.kFloatLayer;
            // layers.set( GameLayer.kFloatLayer, layer );
            // self.addChild( topBar );     

            let popupLayer = new PopupLayer();
            popupLayer.delegate = self;
            popupLayer.hitCheckBound = false;
            popupLayer.perWidth = 100;
            popupLayer.perHeight = 100;
            popupLayer.tag = GameLayer.kPopup;
            layers.set(GameLayer.kPopup, popupLayer);//kPopup
            self._popupLayer = popupLayer;

            let effLay = new EffectLayer();
            effLay.touchEnabled = false;
            effLay.delegate = self;
            effLay.hCenter = 0;
            effLay.vCenter = 0;
            effLay.tag = GameLayer.kEffectLayer;
            effLay.hitCheckBound = false;
            layers.set(GameLayer.kEffectLayer, effLay);//kEffectLayer

            layer = new cui.Group();
            //layer.touchEnabled = false;
            layer.hitCheckBound = false;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.tag = GameLayer.kMessageBox;
            layers.set(GameLayer.kMessageBox, layer);//kMessageBox

            BoxMgr.setParent(layer, self);

            layer = new cui.Group();
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.touchEnabled = false;
            layer.tag = GameLayer.kTipsLayer;
            layers.set(GameLayer.kTipsLayer, layer);//kTipsLayer

            TipsMgr.setParent(layer, self);

            popupLayer = new PopupLayer();
            popupLayer.delegate = self;
            popupLayer.hitCheckBound = false;
            popupLayer.perWidth = 100;
            popupLayer.perHeight = 100;
            popupLayer.tag = GameLayer.kTopPopup;
            layers.set(GameLayer.kTopPopup, popupLayer);//kPopup
            self._popupTop = popupLayer;

            let busyUI = BusyLayer.getInst();
            busyUI.setParent(self);
            resMgr.loadShow = busyUI;
            Net.busyUI = busyUI;

            let core = TRain.core;
            core.addFrameDo(function () {
                TRain.assetMgr.doGC();
                TRain.soundMgr.gcRess();
            }, self, false, 300000);

            self.showHallUI(UITag.Home);

            notifiCenter.addListener(Noti_G_EVT.JS_ERR, function (datas: any[]) {
                busyUI.stopBusy();
                // let curGMD = dataMgr.gameMo.getCurGMD();
                // if( curGMD ) curGMD.gm.end();

                MsgBox.showBox(LangGrp.mainLang, langConsts.mainLang.gameError, datas.toString())
            }, self);
            notifiCenter.addListener(CONN_EVT.CONN_FAIL,function(){
                MsgBox.showBoxCB(LangGrp.mainLang, langConsts.mainLang.loginInfoOver,function(tag){
                    if(tag == 1){
                        //登出
                        location.reload(); 
                    }
                },self); 
            },self);
            let accMo = dataMgr.accMo;
            let gameId = accMo.gameId;
            if (gameId) {
                self.startGame(gameId, { inGame: true });
            }

            //断线重连
            TRain.core.addNextDo(function () {
                accMo.addListener(AccountMo_EVT.login_svr_fin, function () {
                    if (Net.isReCon) {
                        let curGMD = dataMgr.gameMo.getCurGMD();
                        let gameId = accMo.gameId;
                        if (curGMD) {
                            if (curGMD.id != gameId) {
                                curGMD.gm.end();
                                curGMD = null;
                            }
                        }

                        if (gameId) {
                            if (curGMD) {
                                curGMD.gm.onReConnect();
                            }
                            else {
                                self.startGame(gameId, { inGame: true });
                            }

                        }
                    }
                }, self);
            }, self);

            notifiCenter.delayPostEvent(GameUtil.GAME_EVT.enter_game_fin, 1);

            chipMgr = new ChipManager();
            goldMgr = new GoldMange();
        }

        //--------------------------------------------------------------------------------------------
        public showLayer(layer: cui.Group): void {
            this._showLayer(layer.tag, true);
        }

        public hideLayer(layer: cui.Group): void {
            this._showLayer(layer.tag, false);
        }

        private _showLayer(id: GameLayer, visible: boolean): IUIBase {
            let self = this;
            let layers = self._layers;
            let layer = layers.get(id);
            if (visible) {
                //
                if (!layer.parent) {
                    let tag = layer.tag;
                    let children = self.$children;
                    let idx: number = children.length - 1;
                    for (; idx >= 0; --idx) {
                        let tmp = <IUIBase>children[idx];
                        if (tmp.tag >= 0 && tmp.tag < tag) break;
                    }
                    self.addChildAt(layer, idx + 1);
                }
            }
            else {
                if (layer.parent) {
                    self.removeChild(layer);
                }
            }

            return layer;
        }

        //--------------------------  UIDelegate start -----------------------------------------

        /**
         * 显示大厅UI
         * @param value:number 界面码
         * @param data?:any 传递给界面的参数 可选。其中 lastUI:打开此界面的上一个界面
         * */
        public showHallUI(tag: UITag, data?: any): cui.BaseContainer {
            let self = this;

            let oldTag = self._curTag;
            if (oldTag == tag) {
                return;
            }

            let openUI: UIFWBase;
            if (tag > UITag.Home) {
                switch (tag) {
                    case UITag.extension:
                        openUI = new ExtensionView(data);
                        break;
                    case UITag.sevenReward:
                        openUI = new SevenRewardView();
                        break;
                    case UITag.code:
                        openUI = new ExtensionShareView(data);
                        break;
                    default:
                        let cls = self._uiClss[tag];
                        if (cls) {
                            openUI = new cls();
                        }
                        break;
                }
            }

            if (openUI) {
                self._curTag = tag;
                openUI.tag = tag;
                openUI.open(self._mainLayer, data, function (ui: UIFWBase) {
                    self.openFWUI(ui, ui.tag);
                }, self);
            }
            else {
                self.openFWUI(null, tag);
            }

            return openUI;
        }

        /**
         * 显示游戏UI  注：游戏UI  tag 需要大于1000
         * @param uiCls:传入要打开的界面类
         * */
        public showGameUI(tag: number, uiCls: any, isMain?: boolean): cui.BaseContainer {
            let self = this;
            let oldTag = self._curTag;
            if (oldTag == tag) {
                return;
            }

            let openUI = new uiCls();
            openUI.tag = tag;
            self.openFWUI(openUI, tag, isMain);
            return openUI;
        }

        public getCurUI(): cui.BaseContainer {
            return this._curUI;
        }

        public getCurTag(): UITag {
            return this._curTag;
        }

        private openFWUI(newUI?: cui.BaseContainer, tag?: UITag, isMain?: boolean): void {
            let self = this;

            let oldUI = self._curUI;
            if (oldUI && oldUI != self._mainUI) oldUI.dispose();

            self._curUI = newUI;


            self._mainLayer.removeChildren();

            let oldMainUI = self._mainUI;
            //主界面时， 才可弹出界面
            if (newUI) {
                if (isMain) {
                    //卸载 mainUI
                    if (oldMainUI && oldMainUI.tag != UITag.Home) {
                        oldMainUI.dispose();
                    }

                    self._mainUI = newUI;
                }
            }
            else {
                if (tag == UITag.Home) {
                    //卸载 mainUI
                    if (oldMainUI && oldMainUI.tag != UITag.Home) {
                        oldMainUI.dispose();
                        oldMainUI = self._mainUI = null;
                    }
                }

                if (oldMainUI) {
                    newUI = oldMainUI;
                }
                else {
                    newUI = self.homeUI;
                    if (!newUI) {
                        newUI = self.homeUI = new HomeView();
                        newUI.tag = UITag.Home;
                    }
                }
            }

            self._curTag = tag;
            self._mainLayer.addChild(newUI);
            if (self._firstShow) {
                self._firstShow = false;

            }
        }


        //-----------------------------------------------------------
        public regUICls(tag: number, uiCls: any) {
            let uiClss = this._uiClss;
            uiClss[tag] = uiCls;
        }

        public unregUICls(tag: number) {
            delete this._uiClss[tag];
        }

        //---------------------------------- 进入子游戏 ----------------------------------
        /**
         * 
         * @param gameId 
         * @param data   当data有值  且inGame=true 表示当前正在游戏中
         */
        public startGame(gameId: confConsts.GameTp, data?: { inGame: boolean }) {
            let self = this;
            let gameMo = dataMgr.gameMo;
            gameMo.addListener(GameMo_EVT.start_fin, function (err: string) {
                BusyLayer.getInst().hideBusy();
                if (err) {
                    MsgBox.showPrompt(err);
                } else {
                    GameUtil.setLocal(GameUtil.LocalKey.LAST_GAME, gameId.toString());
                    // dataMgr.accMo.lastGmId = gameId;
                    chipMgr.setPure(false);
                }
            }, self, true);
            self._popupLayer.closeAll();
            BusyLayer.getInst().showBusy();
            gameMo.startGMD(gameId, data);

        }

        public endGame() {
            let self = this;
            //七日奖励请求
			dataMgr.generalMo.sendGetQuestlist(false,true);
            self.homeUI.openFunPop(true);
            TipsMgr.clear();
            chipMgr.resetAreaArr();
            goldMgr.reset();
            self.homeUI.setNotifyParent(null);
            self.goHome();

            dataMgr.gameMo.closeGMD();
            dataMgr.gsMo.endConn();

            TRain.mcMgr.doGC();
            dbMgr.doGC();
        }

        //----------------------------------弹出窗口---------------------------------------
        public goBack(): void {
            let ui = this._mainUI;
            if (ui) {
                this.openFWUI();
            }
            else {
                this.openFWUI(null, UITag.Home);
            }
        }

        public goHome(): void {
            this.openFWUI(null, UITag.Home);
        }

        public openPopup(popup: UIPopup, data?: any, isTop?: boolean): void {
            let self = this;
            let layer: PopupLayer = isTop ? self._popupTop : self._popupLayer;
            popup.delegate = self;
            layer.openPopup(popup, data);
        }

        public openPopupByTag(tag: number, data?: any, isTop?: boolean): void {
            let self = this;
            let uiCls = self._uiClss[tag];
            if (uiCls) {
                self.openPopup(new uiCls(), data, isTop);
            }
        }

        public closeAllPopup(): void {
            let self = this;
            let layer: PopupLayer = self._popupLayer;
            layer.closeAll();
        }

        public onPopupOpen(popup: UIPopup): void {
            let self = this;
            if (popup.hideHome) {
                self._hideHome++;
                if (self._hideHome == 1) {
                    self._showLayer(GameLayer.kMainLayer, false);
                }
            }
        }

        public onPopupClose(popup: UIPopup): void {
            let self = this;
            if (popup.hideHome) {
                self._hideHome--;
                if (self._hideHome == 0) {
                    self._showLayer(GameLayer.kMainLayer, true);
                }
            }
        }

        public stopPopup(): void {
            let layer: PopupLayer = <PopupLayer>(this._layers.get(GameLayer.kPopup));
            layer.stopPop();
        }

        public startPopup(): void {
            let layer: PopupLayer = <PopupLayer>(this._layers.get(GameLayer.kPopup));
            layer.startPop();
        }

        //----------------------全屏特效-------------------------
        public addSceneEff(eff: EffectNode): void {
            let self = this;
            let effLay: EffectLayer = <EffectLayer>self._layers.get(GameLayer.kEffectLayer);
            effLay.addEffect(eff);
        }

        /**
         * 同时播放多个场景特效，仅用于小特效 
         */
        public showSceneEff(eff: EffectNode): void {
            let self = this;
            let effLay: EffectLayer = <EffectLayer>self._layers.get(GameLayer.kEffectLayer);
            effLay.showEffect(eff);
        }
    }

}
