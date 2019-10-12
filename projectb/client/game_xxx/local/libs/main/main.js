var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    /**
     * 界面窗口基类，此类界面必须使用open接口来打开。
     *
     * */
    var UIFWBase = (function (_super) {
        __extends(UIFWBase, _super);
        function UIFWBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UIFWBase.prototype.dispose = function () {
            var self = this;
            if (self._disabled)
                return;
            var container = self.parent;
            if (container) {
                container.removeChild(self);
            }
            var aniWrap = self._aniWrap;
            if (aniWrap) {
                TRain.WrapperMgr.freeWrapper(aniWrap);
                self._aniWrap = null;
            }
            self._openData = null;
            self.onDispose();
        };
        UIFWBase.prototype.onDispose = function () {
            _super.prototype.dispose.call(this);
        };
        UIFWBase.prototype.open = function (parent, data, fin, tar) {
            var self = this;
            self._openData = { fin: fin, tar: tar, p: parent, data: data };
            //self._tm = egret.getTimer();
            if (self._needRes) {
                self.loadFWRes();
            }
            else {
                TRain.core.addDelayDo(self._open, self, 0);
            }
        };
        UIFWBase.prototype.close = function () {
            var self = this;
            self._openData = null;
            if (self.parent) {
                var ani = self.getCloseAni();
                if (ani) {
                    self.startAni(ani, self.closeImpl, self);
                }
                else {
                    self.closeImpl();
                }
            }
        };
        UIFWBase.prototype.isOpened = function () {
            return !!this.parent;
        };
        UIFWBase.prototype._open = function () {
            var self = this;
            var openFinData = self._openData;
            self._openData = null;
            var parent = openFinData.p;
            if (parent)
                parent.addChild(self);
            var finFun = openFinData.fin;
            if (finFun) {
                finFun.call(openFinData.tar, self);
            }
            self.openImpl(openFinData.data);
            var ani = self.getOpenAni();
            if (ani)
                self.startAni(ani);
        };
        /**
         *
         * @param data 界面重新显示时， data为空
         */
        UIFWBase.prototype.openImpl = function (data) {
        };
        UIFWBase.prototype.closeImpl = function () {
            var self = this;
            var parent = self.parent;
            if (parent) {
                parent.removeChild(self);
            }
        };
        UIFWBase.prototype.getCloseAni = function () {
            var ani = this._clsAni;
            if (!ani) {
                ani = this._clsAni = new game.CloseFWAni(this);
            }
            return ani;
        };
        UIFWBase.prototype.getOpenAni = function () {
            var ani = this._openAni;
            if (!ani) {
                ani = this._openAni = new game.OpenFWAni(this);
            }
            return ani;
        };
        UIFWBase.prototype.startAni = function (ani, fin, tar) {
            var self = this;
            var wrapper = self._aniWrap;
            if (wrapper) {
                if (wrapper)
                    wrapper.stop();
            }
            else {
                wrapper = self._aniWrap = TRain.WrapperMgr.getWrapper();
            }
            wrapper.ani = ani;
            wrapper.start(fin, tar);
        };
        //------------------------------------------------------
        /**
         * 添加到舞台后且构建完成后调用
         * */
        UIFWBase.prototype.onShow = function (stage) {
        };
        /**
         * 移除舞台后触发
         * */
        UIFWBase.prototype.onHide = function () {
        };
        UIFWBase.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            this.onShow(stage);
        };
        UIFWBase.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this.onHide();
        };
        UIFWBase.prototype.loadFWRes = function () {
            var self = this;
            game.notifiCenter.addListener("line_fin" /* LINE_LOAD_FIN */, self.onLoadFin, self);
        };
        UIFWBase.prototype.onLoadFin = function () {
            var self = this;
            self._needRes = false;
            game.notifiCenter.rmvListener("line_fin" /* LINE_LOAD_FIN */, self);
            if (self._disposed || !self._openData)
                return;
            TRain.core.addDelayDo(self._open, self, 0);
        };
        return UIFWBase;
    }(cui.Component));
    game.UIFWBase = UIFWBase;
    __reflect(UIFWBase.prototype, "game.UIFWBase");
})(game || (game = {}));
var game;
(function (game) {
    var Notification = (function () {
        function Notification() {
            this._listens = {};
        }
        Notification.getListen = function () {
            var frees = Notification._frees;
            if (frees.length > 0)
                return frees.pop();
            return { once: false, tar: null, fun: null };
        };
        Notification.freeListen = function (data) {
            data.tar = null;
            data.fun = null;
            Notification._frees.push(data);
        };
        Notification.prototype.hasListener = function (evt, tar) {
            var listens = this._listens[evt];
            if (listens) {
                for (var i = listens.length - 1; i >= 0; --i) {
                    var listen = listens[i];
                    if (!listen.tar) {
                        listens.splice(i, 1);
                        Notification.freeListen(listen);
                    }
                    else {
                        if (!tar || listen.tar == tar)
                            return true;
                    }
                }
            }
            return false;
        };
        Notification.prototype.addListener = function (evt, fun, tar, once) {
            if (true) {
                //egret.log( target.__class__ + "  add  Observer  " + key );
            }
            var allListens = this._listens;
            var listens = allListens[evt];
            if (!listens) {
                listens = allListens[evt] = [];
            }
            else {
                if (true) {
                    for (var i = 0, n = listens.length; i < n; i++) {
                        var temp = listens[i];
                        if (temp.tar == tar && temp.fun == fun) {
                            egret.log(tar.__class__ + "  error:  add  Observer " + evt + " already is exist!");
                        }
                    }
                }
            }
            var data = Notification.getListen();
            data.tar = tar;
            data.fun = fun;
            data.once = once;
            listens.push(data);
        };
        Notification.prototype.rmvListener = function (evt, target) {
            var listens = this._listens[evt];
            if (listens) {
                for (var i = 0, n = listens.length; i < n; i++) {
                    var listen = listens[i];
                    if (listen.tar == target) {
                        if (true) {
                            egret.log(target.__class__ + "  remove  Observer  " + evt);
                        }
                        listen.tar = null;
                        listen.fun = null;
                        break;
                    }
                }
            }
        };
        Notification.prototype.rmvAllListener = function (target) {
            var list = this._listens;
            if (target) {
                for (var key in list) {
                    var listens = list[key];
                    for (var i = 0, n = listens.length; i < n; i++) {
                        var listen = listens[i];
                        if (listen.tar == target) {
                            listen.tar = null;
                            listen.fun = null;
                        }
                    }
                }
            }
            else {
                this._listens = {};
                for (var key in list) {
                    var listens = list[key];
                    for (var i = 0, n = listens.length; i < n; i++) {
                        Notification.freeListen(listens[i]);
                    }
                }
            }
        };
        Notification.prototype.delayPostEvent = function (key, delay, param1, param2) {
            var self = this;
            TRain.core.addDelayDo(self.postEvent, self, delay, 0 /* normal */, false, key, param1, param2);
        };
        Notification.prototype.postEvent = function (key, param1, param2) {
            var listens = this._listens[key];
            if (listens) {
                for (var i = listens.length - 1; i >= 0; --i) {
                    var listen = listens[i];
                    if (!listen.tar) {
                        listens.splice(i, 1);
                        Notification.freeListen(listen);
                    }
                    else {
                        listen.fun.call(listen.tar, param1, param2);
                        if (listen.once) {
                            listens.splice(i, 1);
                            Notification.freeListen(listen);
                        }
                    }
                }
            }
        };
        Notification._frees = [];
        return Notification;
    }());
    game.Notification = Notification;
    __reflect(Notification.prototype, "game.Notification");
    game.notifiCenter = new Notification();
})(game || (game = {}));
var game;
(function (game) {
    /**
     * 界面窗口基类，此类界面必须使用open接口来打开。
     *
     * */
    var UIFullFW = (function (_super) {
        __extends(UIFullFW, _super);
        function UIFullFW() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @
         * 舞台尺寸改变
         */
        UIFullFW.prototype.onResize = function (w, h) {
            var self = this;
            self.width = w;
            self.height = h;
        };
        /**
         * 添加到舞台后且构建完成后调用
         * */
        UIFullFW.prototype.onShow = function (stage) {
            var self = this;
            game.notifiCenter.addListener(egret.Event.RESIZE, self.onResize, self);
            self.onResize(stage.$stageWidth, stage.$stageHeight);
        };
        /**
         * 移除舞台后触发
         * */
        UIFullFW.prototype.onHide = function () {
            game.notifiCenter.rmvListener(egret.Event.RESIZE, this);
        };
        return UIFullFW;
    }(game.UIFWBase));
    game.UIFullFW = UIFullFW;
    __reflect(UIFullFW.prototype, "game.UIFullFW");
})(game || (game = {}));
var game;
(function (game) {
    /**
     * 界面弹出窗口基类
     *
     * */
    var UIPopup = (function (_super) {
        __extends(UIPopup, _super);
        function UIPopup() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.pri = -10 /* back */;
            self.useOnce = true;
            return _this;
        }
        UIPopup.prototype.openImpl = function (data) {
            _super.prototype.openImpl.call(this, data);
            var delegate = this.delegate;
            if (delegate) {
                delegate.onPopupOpen(this);
            }
        };
        UIPopup.prototype.getCloseAni = function () {
            return null;
        };
        UIPopup.prototype.closeImpl = function () {
            _super.prototype.closeImpl.call(this);
            var self = this;
            var delegate = self.delegate;
            if (delegate) {
                delegate.onPopupClose(self);
            }
            if (self.useOnce) {
                self.dispose();
            }
        };
        return UIPopup;
    }(game.UIFWBase));
    game.UIPopup = UIPopup;
    __reflect(UIPopup.prototype, "game.UIPopup");
    var PopupLayer = (function (_super) {
        __extends(PopupLayer, _super);
        function PopupLayer() {
            var _this = _super.call(this) || this;
            var self = _this;
            var img = self._bgImg = new cui.Image("common@bg");
            img.perWidth = 100;
            img.perHeight = 100;
            img.visible = false;
            self.addChild(img);
            self._curPri = 0 /* normal */;
            self._canPop = true;
            self._deque = [];
            self.addEventListener(egret.TouchEvent.TOUCH_END, function (evt) {
                if (evt.target != self)
                    return;
                var childCnt = self.numChildren;
                if (childCnt > 0) {
                    var popView = self.getChildAt(childCnt - 1);
                    if ((popView instanceof UIPopup) && popView.bgClose) {
                        popView.close();
                    }
                }
            }, self);
            return _this;
        }
        PopupLayer.prototype.startPop = function () {
            var self = this;
            if (!self._canPop) {
                self._canPop = true;
                var delegate = self.delegate;
                if (self.numElements > 0) {
                    if (delegate)
                        delegate.showLayer(self);
                }
                else if (self._deque.length > 0) {
                    if (delegate)
                        delegate.showLayer(self);
                    self.update();
                }
            }
        };
        PopupLayer.prototype.stopPop = function () {
            var self = this;
            if (self._canPop) {
                self._canPop = false;
                var delayTag = self._delayTag;
                if (delayTag) {
                    TRain.core.rmvDelayDoByID(delayTag);
                    self._delayTag = 0;
                }
                if (self.delegate)
                    self.delegate.hideLayer(self);
            }
        };
        PopupLayer.prototype.openPopup = function (ui, openData) {
            var self = this;
            if (self._canPop && (!self.hasPopup() || self._curPri < ui.pri)) {
                //显示
                self._openPopup(ui, openData);
            }
            else {
                var i = void 0, len = void 0;
                var deque = self._deque;
                for (i = 0, len = deque.length; i < len; ++i) {
                    var tmp = deque[i].ui;
                    if (ui.pri < tmp.pri) {
                        break;
                    }
                }
                deque.splice(i, 0, { ui: ui, data: openData });
            }
        };
        PopupLayer.prototype._openPopup = function (popup, openData) {
            var self = this;
            self._curPri = popup.pri;
            if (self.delegate && !self.hasPopup())
                self.delegate.showLayer(self);
            popup.open(self, openData, self.reset, self);
        };
        /**
         * 删除所有的弹出界面，包括队列内的
         * */
        PopupLayer.prototype.closeAll = function () {
            var self = this;
            var deque = self._deque;
            var view;
            var popView;
            var len = deque.length;
            if (true) {
                var viewNames = [];
                for (var m = 0; m < len; m++) {
                    viewNames.push(deque[m].ui.name);
                }
                for (var n = self.numElements - 1; n >= 0; n--) {
                    popView = self.getChildAt(n);
                    if (popView instanceof game.UIPopup) {
                        viewNames.push(popView.name);
                    }
                }
                if (viewNames.length > 0) {
                    console.log("关闭所有弹出界面：" + viewNames);
                }
            }
            for (var i = 0; i < len; i++) {
                view = deque[i].ui;
                view.dispose();
            }
            self._deque.length = 0;
            var children = self.$children;
            for (var j = children.length - 1; j >= 0; j--) {
                popView = children[j];
                if (popView instanceof UIPopup) {
                    popView.close();
                }
            }
        };
        PopupLayer.prototype.hasPopup = function () {
            return (this._deque.length + this.numElements) > 1;
        };
        PopupLayer.prototype.$childRemoved = function (child, index) {
            _super.prototype.$childRemoved.call(this, child, index);
            if (child instanceof UIPopup) {
                var self_1 = this;
                if (!self_1._delayTag) {
                    self_1._delayTag = TRain.core.addDelayDo(self_1.update, self_1, 0);
                }
            }
        };
        PopupLayer.prototype.update = function () {
            var self = this;
            self._delayTag = 0;
            if (self.numChildren == 1) {
                var deque = self._deque;
                if (deque.length > 0) {
                    var data = deque.pop();
                    self._openPopup(data.ui, data.data);
                }
                else {
                    if (self.delegate) {
                        self.delegate.hideLayer(self);
                    }
                }
            }
            else {
                self.reset();
            }
        };
        PopupLayer.prototype.reset = function () {
            var self = this;
            var children = self.$children;
            var firstUI;
            for (var j = children.length - 1; j >= 0; j--) {
                var ctrl = children[j];
                if (ctrl instanceof UIPopup) {
                    if (firstUI) {
                        ctrl.visible = false;
                    }
                    else {
                        firstUI = ctrl;
                    }
                }
            }
            var curPri = 0;
            if (firstUI) {
                firstUI.visible = true;
                curPri = firstUI.pri;
                self._bgImg.visible = !firstUI.hideBg;
            }
            self._curPri = curPri;
        };
        return PopupLayer;
    }(cui.Group));
    game.PopupLayer = PopupLayer;
    __reflect(PopupLayer.prototype, "game.PopupLayer");
})(game || (game = {}));
var game;
(function (game) {
    game.msgPrompt = {
        showErr: function (errCode) { console.log("errCode=" + errCode); },
        showPrompt: function (errCode) { console.log("promptCode=" + errCode); },
    };
    /**
     *
     * 数据类基类，内含有本地配置表数据_configData 和 服务器下发数据 _svrData。
     * 对数据操作逻辑
     *
     * */
    var DataModel = (function (_super) {
        __extends(DataModel, _super);
        function DataModel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * 配置表加载完成后调用。再各自的数据类中解析客户端配置数据
         * */
        DataModel.prototype.onLoadConf = function (data) {
            var self = this;
            self.confLoaded = true;
        };
        DataModel.prototype.setData = function (data) {
            this._data = data;
        };
        DataModel.prototype.getData = function () {
            return this._data;
        };
        // public getVal(key:string|number):any
        // {
        //     return this._data[key];
        // }
        DataModel.prototype.setVal = function (key, val) {
            var self = this;
            self._data[key] = val;
            var lProps = self._lProps;
            if (lProps) {
                var keyStr = key.toString();
                if (lProps.indexOf(keyStr) >= 0)
                    self.postEvent(keyStr, val);
            }
        };
        DataModel.prototype.updateData = function (newData) {
            var self = this;
            var curData = self._data;
            for (var key in newData) {
                curData[key] = newData[key];
            }
            var lProps = self._lProps;
            if (lProps) {
                for (var i = 0, n = lProps.length; i < n; ++i) {
                    var propKey = lProps[i];
                    var val = newData[propKey];
                    if (val !== undefined) {
                        self.postEvent(propKey, val);
                    }
                }
            }
        };
        DataModel.prototype.addPropListener = function (propKey, fun, tar) {
            var self = this;
            self.addListener(propKey, fun, tar);
            var lProps = self._lProps;
            if (lProps) {
                if (lProps.indexOf(propKey) < 0)
                    lProps.push(propKey);
            }
            else {
                self._lProps = [propKey];
            }
        };
        DataModel.prototype.rmvPropListener = function (propKey, tar) {
            var self = this;
            self.rmvListener(propKey, tar);
            var lProps = self._lProps;
            if (lProps) {
                var idx = lProps.indexOf(propKey);
                if (idx > 0 && !self.hasListener(propKey)) {
                    lProps.splice(idx, 1);
                }
            }
        };
        return DataModel;
    }(game.Notification));
    game.DataModel = DataModel;
    __reflect(DataModel.prototype, "game.DataModel");
})(game || (game = {}));
var game;
(function (game) {
    var BaseScene = (function (_super) {
        __extends(BaseScene, _super);
        function BaseScene() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.hitCheckBound = false;
            return _this;
        }
        // protected onPartAdded():void{
        //     let self = this;
        //     let stageWidth = self.$stage.$stageWidth;
        //     self.x = Math.floor( (stageWidth-Consts.DESIGN_WIDTH)/2 );
        // }
        /**
         * @
         * 舞台尺寸改变
         */
        BaseScene.prototype.onResize = function (w, h) {
            var self = this;
            self.width = w;
            self.height = h;
        };
        BaseScene.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var self = this;
            game.notifiCenter.addListener(egret.Event.RESIZE, self.onResize, self);
            self.onResize(stage.$stageWidth, stage.$stageHeight);
        };
        BaseScene.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            game.notifiCenter.rmvListener(egret.Event.RESIZE, this);
        };
        BaseScene.prototype.$hitTest = function (stageX, stageY) {
            return egret.DisplayObjectContainer.prototype.$hitTest.call(this, stageX, stageY);
        };
        BaseScene.prototype.onMsgErr = function (errCode) {
            switch (errCode) {
                // case ReqConst.reqFail:
                //     Connect.tryReconn();
                //     break;
                // case langConsts.errCode.connect_fail:
                //     Connect.tryReconn();
                //     break;
                // case langConsts.errCode.be_kick_game:
                //     //终断客户端的连接
                //     HttpClient.stop = true;
                //     MsgBox.showPrompt(langConsts.errCode.connect_fail);
                //     break;
                // case langConsts.errCode.logined_in_other:
                //     HttpClient.stop = true;
                //     MsgBox.showPrompt( langConsts.errCode.logined_in_other );
                //     break;
                default:
                    game.MsgBox.showErr(errCode);
                    break;
            }
        };
        BaseScene.prototype.showLayer = function (layer) {
        };
        BaseScene.prototype.hideLayer = function (layer) {
        };
        return BaseScene;
    }(cui.Group));
    game.BaseScene = BaseScene;
    __reflect(BaseScene.prototype, "game.BaseScene", ["game.LayerDelegate"]);
})(game || (game = {}));
var game;
(function (game) {
    var MsgBox;
    (function (MsgBox) {
        function showBoxCB(gp, key, fun, tar) {
            var txt = TRain.langMgr.getTxt(gp, key);
        }
        MsgBox.showBoxCB = showBoxCB;
        function showBox(gp, key) {
            var txt = TRain.langMgr.getTxt(gp, key);
        }
        MsgBox.showBox = showBox;
        function showErr(errCode) {
            var txt;
            if (typeof errCode == 'number') {
                txt = TRain.langMgr.getErrText(errCode);
            }
            else {
                txt = errCode;
            }
            game.TipsMgr.showPrompt(txt, 0 /* prompt */);
        }
        MsgBox.showErr = showErr;
        function showPrompt(errCode) {
            var txt;
            if (typeof errCode == 'number') {
                txt = TRain.langMgr.getErrText(errCode);
            }
            else {
                txt = errCode;
            }
            // let conf = dataMgr.generalMo.getPromptConf( errCode );
            // if( conf ){
            // }
            // else{
            //直接显示
            game.TipsMgr.showPrompt(txt, 0 /* prompt */);
            // }
        }
        MsgBox.showPrompt = showPrompt;
    })(MsgBox = game.MsgBox || (game.MsgBox = {}));
    game.msgPrompt = MsgBox;
})(game || (game = {}));
var game;
(function (game) {
    var OpenFWAni = (function () {
        function OpenFWAni(tar) {
            var self = this;
            self.tar = tar;
            var action = new TRain.ActionPropTween(100);
            action.setProps(OpenFWAni.props);
            self.action = action;
            self._props = { touch: false, x: 0, y: 0 };
        }
        OpenFWAni.prototype.beforeAni = function () {
            var props = this._props;
            var tar = this.tar;
            props.touch = tar.touchEnabled;
            props.x = tar.x;
            props.y = tar.y;
            var hw = Math.floor(tar.width / 2);
            var hh = Math.floor(tar.height / 2);
            tar.anchorOffsetX = hw;
            tar.anchorOffsetY = hh;
            tar.x = props.x + hw;
            tar.y = props.y + hh;
            tar.touchEnabled = false;
        };
        OpenFWAni.prototype.endAni = function () {
            var props = this._props;
            var tar = this.tar;
            tar.touchEnabled = props.touch;
            tar.x = props.x;
            tar.y = props.y;
            tar.anchorOffsetX = 0;
            tar.anchorOffsetY = 0;
            tar.scaleX = 1;
            tar.scaleY = 1;
            tar.alpha = 1;
        };
        OpenFWAni.props = {
            scaleX: { b: 0.9, r: 0.1 },
            scaleY: { b: 0.9, r: 0.1 },
            alpha: { b: 0.3, r: 0.7 }
        };
        return OpenFWAni;
    }());
    game.OpenFWAni = OpenFWAni;
    __reflect(OpenFWAni.prototype, "game.OpenFWAni", ["TRain.IAniObj"]);
    var CloseFWAni = (function () {
        function CloseFWAni(tar) {
            var self = this;
            self.tar = tar;
            var action = new TRain.ActionPropTween(100);
            action.setProps(CloseFWAni.props);
            self.action = action;
            self._props = { touch: false, x: 0, y: 0 };
        }
        CloseFWAni.prototype.beforeAni = function () {
            var props = this._props;
            var tar = this.tar;
            props.touch = tar.touchEnabled;
            props.x = tar.x;
            props.y = tar.y;
            var hw = Math.floor(tar.width / 2);
            var hh = Math.floor(tar.height / 2);
            tar.anchorOffsetX = hw;
            tar.anchorOffsetY = hh;
            tar.x = props.x + hw;
            tar.y = props.y + hh;
            tar.touchEnabled = false;
        };
        CloseFWAni.prototype.endAni = function () {
            var props = this._props;
            var tar = this.tar;
            tar.touchEnabled = props.touch;
            tar.x = props.x;
            tar.y = props.y;
            tar.anchorOffsetX = 0;
            tar.anchorOffsetY = 0;
            tar.scaleX = 1;
            tar.scaleY = 1;
            tar.alpha = 1;
        };
        CloseFWAni.props = {
            scaleX: { b: 1, r: -0.1 },
            scaleY: { b: 1, r: -0.1 },
            alpha: { b: 1, r: -0.7 }
        };
        return CloseFWAni;
    }());
    game.CloseFWAni = CloseFWAni;
    __reflect(CloseFWAni.prototype, "game.CloseFWAni", ["TRain.IAniObj"]);
    var MoveXFWAni = (function () {
        function MoveXFWAni(tar, isOut) {
            var self = this;
            self.tar = tar;
            var w = tar.width;
            var x = tar.x;
            var action = new TRain.ActionPropTween(200);
            action.setEaseFun(EaseUtil.quadOut);
            if (isOut) {
                action.setProps({ x: { b: x - w, r: w } });
            }
            else {
                action.setProps({ x: { b: x, r: -w } });
            }
            self.action = action;
            self._props = { touch: tar.touchEnabled, x: x };
        }
        MoveXFWAni.prototype.beforeAni = function () {
        };
        MoveXFWAni.prototype.endAni = function () {
            var props = this._props;
            var tar = this.tar;
            tar.touchEnabled = props.touch;
            tar.x = props.x;
        };
        return MoveXFWAni;
    }());
    game.MoveXFWAni = MoveXFWAni;
    __reflect(MoveXFWAni.prototype, "game.MoveXFWAni", ["TRain.IAniObj"]);
})(game || (game = {}));
var game;
(function (game) {
    var EffectNode = (function (_super) {
        __extends(EffectNode, _super);
        function EffectNode() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            return _this;
        }
        EffectNode.prototype.setTarget = function (cb, tar) {
            this._cb = { fun: cb, tar: tar };
        };
        EffectNode.prototype.play = function () {
            this._inPly = true;
        };
        EffectNode.prototype.aniFin = function () {
            var self = this;
            var cbData = self._cb;
            if (cbData) {
                self._cb = null;
                cbData.fun.call(cbData.tar, self);
            }
            self.dispose();
        };
        EffectNode.prototype.dispose = function () {
            var self = this;
            var parent = self.parent;
            if (parent)
                parent.removeChild(self);
            self._cb = null;
            _super.prototype.dispose.call(this);
        };
        return EffectNode;
    }(cui.Group));
    game.EffectNode = EffectNode;
    __reflect(EffectNode.prototype, "game.EffectNode");
    var ImgEffect = (function (_super) {
        __extends(ImgEffect, _super);
        function ImgEffect(img, showTm) {
            var _this = _super.call(this) || this;
            var self = _this;
            img.visible = false;
            self._img = img;
            self.addChild(img);
            self._aniTm = showTm;
            return _this;
        }
        ImgEffect.prototype.play = function () {
            _super.prototype.play.call(this);
            var self = this;
            self._img.visible = true;
            self._tag = TRain.core.addDelayDo(self.aniFin, self, self._aniTm);
        };
        ImgEffect.prototype.aniFin = function () {
            this._tag = 0;
            _super.prototype.aniFin.call(this);
        };
        ImgEffect.prototype.dispose = function () {
            var tag = this._tag;
            if (tag) {
                TRain.core.rmvDelayDoByID(tag);
            }
            _super.prototype.dispose.call(this);
        };
        return ImgEffect;
    }(EffectNode));
    game.ImgEffect = ImgEffect;
    __reflect(ImgEffect.prototype, "game.ImgEffect");
    var ClipEffect = (function (_super) {
        __extends(ClipEffect, _super);
        function ClipEffect(anitp, aniName) {
            var _this = _super.call(this) || this;
            var self = _this;
            self._anitp = anitp;
            var clip = new TRain.MovieClip();
            self._clip = clip;
            clip.addEventListener(egret.Event.COMPLETE, self.aniFin, self);
            self.addChild(clip);
            var idx = aniName.indexOf(".");
            if (idx < 0) {
                TRain.mcMgr.getMCDataAsync(anitp, aniName, self.onLoadDataFinish, self);
            }
            else {
                TRain.mcMgr.getMCDataAsync(anitp, aniName.substr(0, idx), self.onLoadDataFinish, self, aniName.substring(idx + 1));
            }
            return _this;
        }
        ClipEffect.prototype.onLoadDataFinish = function (clipData, anitp) {
            var self = this;
            if (!clipData) {
                TRain.core.addDelayDo(self.aniFin, self, 500);
                return;
            }
            var clip = self._clip;
            clip.movieClipData = clipData;
            if (self._inPly) {
                clip.gotoAndPlay(0, 1);
                TRain.mcMgr.add(clip);
            }
        };
        ClipEffect.prototype.play = function () {
            _super.prototype.play.call(this);
            var clip = this._clip;
            if (clip.movieClipData) {
                clip.gotoAndPlay(0, 1);
                TRain.mcMgr.add(clip);
            }
        };
        ClipEffect.prototype.aniFin = function () {
            var self = this;
            var clip = self._clip;
            clip.stop();
            TRain.mcMgr.remove(clip);
            _super.prototype.aniFin.call(this);
        };
        ClipEffect.prototype.dispose = function () {
            var self = this;
            var movieClipData = self._clip.movieClipData;
            if (movieClipData) {
                self._clip.movieClipData = null;
                TRain.mcMgr.freeMCData(self._anitp, movieClipData);
            }
            _super.prototype.dispose.call(this);
        };
        return ClipEffect;
    }(EffectNode));
    game.ClipEffect = ClipEffect;
    __reflect(ClipEffect.prototype, "game.ClipEffect");
    var EffectLayer = (function (_super) {
        __extends(EffectLayer, _super);
        function EffectLayer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._deque = new Array();
            return _this;
        }
        EffectLayer.prototype.dispose = function () {
            var self = this;
            self.clearAll();
            self.delegate = null;
        };
        EffectLayer.prototype.isPlaying = function () {
            var self = this;
            return self.numChildren > 0 || self._deque.length > 0;
        };
        EffectLayer.prototype.addEffect = function (node) {
            var self = this;
            if (self.numChildren <= 0) {
                self.showEffect(node);
            }
            else {
                self._deque.push(node);
            }
        };
        EffectLayer.prototype.showEffect = function (node) {
            var self = this;
            node.play();
            self.addChild(node);
            self.touchEnabled = node.touchEnabled;
            if (self.delegate)
                self.delegate.showLayer(self);
        };
        EffectLayer.prototype.clearAll = function () {
            var self = this;
            self._deque.length = 0;
            var children = self.$children;
            for (var i = 0, n = children.length; i < n; ++i) {
                children[i].dispose();
            }
            self.removeChildren();
        };
        EffectLayer.prototype.$childRemoved = function (child, index) {
            _super.prototype.$childRemoved.call(this, child, index);
            var self = this;
            self.touchEnabled = false;
            TRain.core.addDelayDo(self.update, self, 0);
        };
        EffectLayer.prototype.update = function () {
            var self = this;
            if (self.numChildren <= 0) {
                if (self._deque.length > 0) {
                    var node = self._deque.shift();
                    self.touchEnabled = node.touchEnabled;
                    node.play();
                    self.addChild(node);
                }
                else {
                    if (self.delegate)
                        self.delegate.hideLayer(self);
                }
            }
        };
        return EffectLayer;
    }(cui.Group));
    game.EffectLayer = EffectLayer;
    __reflect(EffectLayer.prototype, "game.EffectLayer");
})(game || (game = {}));
var CONF;
(function (CONF) {
    CONF.inner = 1;
    CONF.svrUrl = "http://10.0.0.211:8611";
    CONF.res = "resource/";
})(CONF || (CONF = {}));
;
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        var self = _this;
        egret.TextField.default_fontFamily = "SimHei";
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            var webVerCtrl = new TRain.WebVerController();
            RES.registerVersionController(webVerCtrl);
            //渲染模式
            var ranmode = egret.Capabilities.renderMode;
            var currRendMode = 0 /* canvas */;
            if (ranmode == "webgl") {
                currRendMode = 1 /* webgl */;
            }
            game.GameUtil.rm = currRendMode;
        }
        // let os = egret.Capabilities.os;
        // let currOS:game.CapabilityOS;
        // switch( os )
        // {
        //     case "iOS":
        //         currOS = game.CapabilityOS.iOS;
        //         break;
        //     case "Android":
        //         currOS = game.CapabilityOS.Android;
        //         break;
        //     case "Windows Phone":
        //         currOS = game.CapabilityOS.WinPhone;
        //         break;
        //     case "Windows PC":
        //         currOS = game.CapabilityOS.WinPC;
        //         break;
        //     case "Mac OS":
        //         currOS = game.CapabilityOS.MacOS;
        //         break;
        //     default :
        //         break;
        // }
        // game.GameUtil.os = currOS;
        //设置加载进度界面
        var loadingUI = self.loadingView = new LoadingUI();
        self.addChild(loadingUI);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, self.onConfigComplete, self);
        RES.loadConfig(CONF.res + "res.json", CONF.res);
        return _this;
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        var self = this;
        egret.updateAllScreens();
        RES.setMaxLoadingThread(4);
        RES.setMaxRetryTimes(0);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        self.loadThemeAndPre();
    };
    Main.prototype.loadThemeAndPre = function () {
        var self = this;
        TRain.UITheme.loadInitConf(CONF.res + "theme.json", self.onThemeInitFin, self);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onResourceLoadComplete, self);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onResourceLoadError, self);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
        RES.loadGroup("preload");
    };
    Main.prototype.onThemeInitFin = function (event) {
        var self = this;
        self._initThemeFin = true;
        self.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        var self = this;
        if (event.groupName == "preload") {
            self._preLoadFin = true;
            self.createScene();
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.createScene = function () {
        var self = this;
        if (self._initThemeFin && self._preLoadFin) {
            AppDelegate.run(self);
        }
    };
    Main.prototype.onGameShow = function () {
        var self = this;
        var loadingUI = self.loadingView;
        if (loadingUI) {
            self.removeChild(loadingUI);
            self.loadingView = null;
        }
        delete self._preLoadFin;
        delete self._initThemeFin;
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main", ["IMainDelegate"]);
var TRain;
(function (TRain) {
    var AniWrapper = (function () {
        function AniWrapper() {
            var self = this;
            self.inAni = false;
            self._tag = TRain.actionMgr.getUnitTag();
            var actEnd = new TRain.ActionCallDo();
            actEnd.once = false;
            actEnd.setCall(self.actFin, self);
            self._acts = [null, actEnd];
            self._seqAct = new TRain.ActionSequence();
            self._data = { fun: undefined, tar: undefined };
        }
        AniWrapper.prototype.clear = function () {
            var self = this;
            if (self.inAni) {
                self._seqAct.stop();
                self.inAni = false;
                var data = self._data;
                data.fun = undefined;
                data.tar = undefined;
            }
            self.ani = null;
        };
        AniWrapper.prototype.start = function (finFun, tar) {
            var self = this;
            var data = self._data;
            data.fun = finFun;
            data.tar = tar;
            var aniObj = self.ani;
            aniObj.beforeAni();
            var action = aniObj.action;
            var acts = self._acts;
            acts[0] = action;
            var seqAct = self._seqAct;
            seqAct.setActions(acts);
            TRain.actionMgr.addAction(seqAct, aniObj.tar, false, self._tag);
            self.inAni = true;
        };
        AniWrapper.prototype.stop = function () {
            var self = this;
            if (self.inAni) {
                TRain.actionMgr.rmvActsByTag(self._tag);
                self.actFin(null, true);
            }
        };
        AniWrapper.prototype.actFin = function (tar, notDo) {
            var self = this;
            self.inAni = false;
            var data = self._data;
            if (data.fun) {
                if (!notDo)
                    data.fun.call(data.tar);
                data.fun = undefined;
                data.tar = undefined;
            }
            self.ani.endAni();
        };
        return AniWrapper;
    }());
    TRain.AniWrapper = AniWrapper;
    __reflect(AniWrapper.prototype, "TRain.AniWrapper");
    var WrapperMgr;
    (function (WrapperMgr) {
        var _wraps = [];
        function getWrapper() {
            if (_wraps.length > 0)
                return _wraps.pop();
            return new AniWrapper();
        }
        WrapperMgr.getWrapper = getWrapper;
        function freeWrapper(wrapper) {
            wrapper.clear();
            _wraps.push(wrapper);
        }
        WrapperMgr.freeWrapper = freeWrapper;
    })(WrapperMgr = TRain.WrapperMgr || (TRain.WrapperMgr = {}));
})(TRain || (TRain = {}));
var AppDelegate;
(function (AppDelegate) {
    function run(main) {
        TRain.core.init(main.stage);
        TRain.mcMgr.init(["ui"], true);
        var gameMgr = game.gameMgr = new game.GameManager();
        gameMgr.begin(main);
    }
    AppDelegate.run = run;
})(AppDelegate || (AppDelegate = {}));
var game;
(function (game) {
    game.c_zeroArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0];
    var GameUtil;
    (function (GameUtil) {
        //export let os:CapabilityOS = 0;
        GameUtil.rm = 0;
        GameUtil.gc = true; //gc enable
        //--------------------------crypt-------------------
        //加密
        function enCharCode(cryptKey, reqStr) {
            var reData = "";
            for (var i = 0, len = reqStr.length; i < len; i++) {
                var locT = reqStr.charCodeAt(i);
                var locStr = String.fromCharCode(charXor(cryptKey, locT));
                reData += locStr;
            }
            return strToCharCode(reData);
        }
        GameUtil.enCharCode = enCharCode;
        function charXor(key, char) {
            for (var n = 0, len = key.length; n < len; n++) {
                var charXor_1 = key.charCodeAt(n);
                char = char ^ charXor_1;
            }
            return char;
        }
        function strToCharCode(str) {
            var charStr = "";
            var lastIdx = str.length - 1;
            for (var i = 0; i < lastIdx; i++) {
                charStr += str.charCodeAt(i) + ",";
            }
            charStr += str.charCodeAt(lastIdx);
            return charStr;
        }
        function getLocal(key, defVal) {
            var val = egret.localStorage.getItem(key);
            if (val == null && (typeof defVal != "undefined")) {
                return defVal;
            }
            return val;
        }
        GameUtil.getLocal = getLocal;
        function getLocalBool(key, defVal) {
            var val = egret.localStorage.getItem(key);
            if (val == null && (typeof defVal != "undefined")) {
                return defVal;
            }
            return !!val;
        }
        GameUtil.getLocalBool = getLocalBool;
        function setLocal(key, val) {
            var savaVal;
            if (typeof val == "boolean") {
                savaVal = val ? 1 : 0;
            }
            else {
                savaVal = val;
            }
            egret.localStorage.setItem(key, savaVal);
        }
        GameUtil.setLocal = setLocal;
    })(GameUtil = game.GameUtil || (game.GameUtil = {}));
})(game || (game = {}));
/**
 * Created by wjdeng on 2015/9/2.
 */
var game;
(function (game) {
    var DataManager = (function () {
        //初始化创建
        function DataManager() {
            var self = this;
            game.notifiCenter.addListener("succ" /* CONN_SUCC */, self.startHeart, self, true);
            self._needLoads = [];
            self.accMo = new game.AccountModel();
            self.promptMo = new game.PromptModel();
            self.createMo("gameMo", game.GameModel);
            //userMo ------放最后创建
            //self.createMo( "userMo", UserModel ); 
        }
        DataManager.prototype.createMo = function (name, modelCls) {
            var model = (new modelCls());
            this[name] = model;
            if (model.confNm) {
                this._needLoads.push(model);
            }
        };
        DataManager.prototype.loadConfs = function () {
            var needLoads = this._needLoads;
            for (var i = 0, n = needLoads.length; i < n; ++i) {
                var model = needLoads[i];
                game.resMgr.loadConf(model.confNm, model.onLoadConf, model);
            }
            delete this._needLoads;
        };
        //-----------------------------------------------------
        DataManager.prototype.startHeart = function () {
            var self = this;
            TRain.core.addFrameDo(self.heartSync, self, false, 30000); //5秒
            game.Net.regHandle(404 /* g2c_heartbeat */, function () {
                //to do
            }, self);
        };
        DataManager.prototype.stopHeart = function () {
            var self = this;
            TRain.core.rmvFrameDo(self);
            game.notifiCenter.rmvAllListener(self);
            game.notifiCenter.addListener("succ" /* CONN_SUCC */, self.startHeart, self, true);
        };
        DataManager.prototype.heartSync = function () {
            game.Net.sendMsg(301 /* c2g_heartbeat */, {});
        };
        return DataManager;
    }());
    game.DataManager = DataManager;
    __reflect(DataManager.prototype, "game.DataManager");
})(game || (game = {}));
var game;
(function (game) {
    var GameManager = (function () {
        function GameManager() {
            var self = this;
            self._loadStep = 0 /* loadLoading */;
            self._stepState = 0 /* wait */;
            self._scTp = 0 /* NONE */;
        }
        GameManager.prototype.begin = function (main) {
            var self = this;
            self._main = main;
            TRain.core.stage.addEventListener(egret.Event.RESIZE, function (e) {
                var stage = e.target;
                game.notifiCenter.postEvent(egret.Event.RESIZE, stage.$stageWidth, stage.$stageHeight);
            }, self);
            game.HttpUtil.svrURL = CONF.svrUrl;
            game.resMgr = new game.ResManager();
            game.dataMgr = new game.DataManager();
            //analyMgr = new AnalyManager();
            game.TipsMgr.init();
            var resName = "resConf";
            var resData = RES.getRes(resName);
            if (resData) {
                game.resMgr.initResConf(resData);
                if (resData.filter)
                    cui.uiMgr.createFilters(resData.filter);
                RES.destroyRes(resName);
            }
            resName = "lang";
            resData = RES.getRes(resName);
            if (resData) {
                TRain.langMgr.addGps(resData);
                RES.destroyRes(resName);
            }
            game.Protobuf.addDecodeProtos(NET_CONF.s2cDecode, NET_CONF.typeDecode);
            game.Protobuf.addEncodeProtos(NET_CONF.c2sEncode);
            TRain.core.addFrameDo(cui.uiMgr.update, cui.uiMgr, false);
            TRain.core.addFrameDo(TRain.actionMgr.advanceTime, TRain.actionMgr, true);
            TRain.core.addFrameDo(TRain.mcMgr.advanceTime, TRain.mcMgr, true);
            self.startLogin();
        };
        GameManager.prototype.gotoScene = function (tp) {
            var self = this;
            if (self._scTp == tp)
                return;
            self._scTp = tp;
            var scene;
            switch (tp) {
                case 1 /* LodingScene */:
                    scene = game.LoadingScene.getInst();
                    break;
                case 2 /* LoginScene */:
                    scene = new game.LoginScene();
                    break;
                case 3 /* GameScene */:
                    scene = game.GameScene.createInst();
                    break;
            }
            var oldScene = self._curScene;
            if (oldScene) {
                self._main.removeChild(oldScene);
                oldScene.dispose();
                self._curScene = null;
            }
            self._curScene = scene;
            if (scene) {
                self._main.addChild(scene);
            }
        };
        //------------------------------------------------- login ---------------------------------------
        GameManager.prototype.startLogin = function () {
            var self = this;
            //notifiCenter.addListener( CONN_EVT.CONN_SUCC, self.tryStartStep, self, true );
            //dataMgr.accMo.addListener( Account_EVT.got_svrinfo, self.tryStartStep, self, true );
            self.gotoScene(2 /* LoginScene */);
            //LoadingScene.getInst();
            self.tryStartStep();
            self._main.onGameShow();
        };
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
        GameManager.prototype.enterGame = function () {
            var self = this;
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
        };
        GameManager.prototype.startGame = function () {
            var self = this;
            self._main.onGameShow();
            self.gotoScene(3 /* GameScene */);
            // dataMgr.startTimeSync();
        };
        //------------------------------------------------ 开始进入游戏 -----------------------------------
        GameManager.prototype.loadUpdate = function () {
            var self = this;
            var step = self._loadStep;
            if (step == 1 /* loadgameConf */) {
                if (game.resMgr.getLoadCnt() == 0) {
                    self.setStepState(2 /* finish */);
                }
            }
            else if (step == 3 /* waitparse */) {
                if (game.resMgr.getParseCnt() == 0) {
                    self.setStepState(2 /* finish */);
                }
            }
            else if (step == 4 /* end */) {
                if (game.LoadingScene.getInst().isFinish() && game.dataMgr.accMo.getData() && self._curScene) {
                    TRain.core.rmvFrameDo(self, self.loadUpdate);
                    self.startGame();
                }
            }
        };
        GameManager.prototype.setStepState = function (state) {
            var self = this;
            if (self._stepState === state)
                return;
            self._stepState = state;
            if (state === 2 /* finish */) {
                self._loadStep++;
                self._stepState = 0 /* wait */;
                self.tryStartStep();
            }
        };
        GameManager.prototype.tryStartStep = function () {
            var self = this;
            if (self._stepState != 0 /* wait */)
                return;
            if (self._loadStep == 4 /* end */)
                return;
            var text = "";
            var loadingScene = game.LoadingScene.getInst();
            switch (self._loadStep) {
                case 0 /* loadLoading */://
                    loadingScene.setLoadStep(text, 15, 2000);
                    //analyMgr.loadingSet( 1, text );
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onGroupFined, self);
                    RES.loadGroup("loading");
                    break;
                case 1 /* loadgameConf */:
                    loadingScene.setLoadStep(text, 45, 2000);
                    //analyMgr.loadingSet( 3, text );
                    game.dataMgr.loadConfs();
                    TRain.core.addFrameDo(self.loadUpdate, self, false, 600);
                    break;
                case 2 /* loadmainui */:
                    loadingScene.setLoadStep(text, 35, 2000);
                    //analyMgr.loadingSet( 5, text );
                    //资源 解析
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onGroupFined, self);
                    RES.loadGroup("hall"); //加载大厅资源
                    break;
                case 3 /* waitparse */://
                    loadingScene.setLoadStep(text, 20, 2000);
                    //analyMgr.loadingSet( 7, text );
                    break;
            }
            var state = self._stepState = 1 /* loading */;
            self.setStepState(state);
        };
        GameManager.prototype.onGroupFined = function () {
            var self = this;
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onGroupFined, self);
            self.setStepState(2 /* finish */);
        };
        return GameManager;
    }());
    game.GameManager = GameManager;
    __reflect(GameManager.prototype, "game.GameManager");
})(game || (game = {}));
var game;
(function (game) {
    var RedBtn = (function (_super) {
        __extends(RedBtn, _super);
        function RedBtn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RedBtn.prototype.onPartAdded = function () {
            _super.prototype.onPartAdded.call(this);
            var self = this;
            var skRed = self.skRed;
            if (skRed)
                skRed.visible = !!self._red;
        };
        Object.defineProperty(RedBtn.prototype, "red", {
            get: function () {
                return this._red;
            },
            set: function (val) {
                var self = this;
                if (self._red != val) {
                    self._red = val;
                    var skRed = self.skRed;
                    if (skRed)
                        skRed.visible = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        return RedBtn;
    }(cui.ScaleButton));
    game.RedBtn = RedBtn;
    __reflect(RedBtn.prototype, "game.RedBtn");
})(game || (game = {}));
var game;
(function (game) {
    var ResManager = (function () {
        function ResManager() {
            this._lineLoadCnt = 0; //正在加载的个数
            var self = this;
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
        ResManager.prototype.initResConf = function (data) {
            var self = this;
            if (data) {
                var paths = self._paths = data.path;
                if (paths) {
                }
                self._iconRes = data.iconRes;
            }
            var soundMgr = TRain.soundMgr;
            soundMgr.sfxState = game.GameUtil.getLocalBool("SFX_STATUS" /* SFX_STATUS */, true);
            soundMgr.musicState = game.GameUtil.getLocalBool("MUSIC_STATUS" /* MUSIC_STATUS */, true);
        };
        ResManager.prototype.getQualColor = function (qual) {
            return this._clrs[qual];
        };
        //---------------------------------------------------------------
        ResManager.prototype._getIconSrc = function (key, arg1) {
            var iconRess = this._iconRes[key];
            for (var i = 0, len = iconRess.length; i < len; ++i) {
                var info = iconRess[i];
                if (info.min <= arg1 && info.max >= arg1) {
                    return info.nm + "@" + arg1;
                }
            }
            return null;
        };
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
        ResManager.prototype.getLoadCnt = function () {
            return this._loadcnt;
        };
        ResManager.prototype.getParseCnt = function () {
            return this._parses.length;
        };
        ResManager.prototype.getConfUrl = function (name) {
            return ResManager.confPath + name + ".json";
        };
        ResManager.prototype.loadConf = function (url, fin, tar, isURL) {
            if (isURL === void 0) { isURL = false; }
            var self = this;
            var loadConfList = self._loadConf;
            if (!isURL)
                url = self.getConfUrl(url);
            var target = { fin: fin, tar: tar };
            var loadInfo = loadConfList[url];
            if (loadInfo) {
                loadInfo.tars.push(target);
            }
            else {
                self._loadcnt++;
                loadInfo = loadConfList[url] = { tars: [target], url: url, data: null };
                RES.getResByUrl(url, self.loadConfFin, self, RES.ResourceItem.TYPE_JSON);
            }
        };
        ResManager.prototype.loadConfFin = function (data, url) {
            var self = this;
            if (data) {
                var loadInfo = self._loadConf[url];
                loadInfo.data = data;
                var parses = self._parses;
                parses.push(loadInfo);
                if (parses.length == 1) {
                    TRain.core.addFrameDo(self.parseConf, self, false);
                }
            }
            self._loadcnt--;
            delete self._loadConf[url];
        };
        ResManager.prototype.parseConf = function () {
            var self = this;
            var loadInfo = self._parses[0];
            var target = loadInfo.tars.shift();
            target.fin.call(target.tar, loadInfo.data, loadInfo.url);
            if (loadInfo.tars.length === 0) {
                self._parses.shift();
                RES.destroyRes(loadInfo.url);
                if (self._parses.length === 0) {
                    TRain.core.rmvFrameDo(self, self.parseConf);
                }
            }
        };
        //-------------------------------流水线加载-----------------
        //加载一批资源
        ResManager.prototype.lineLoad = function (source, tp) {
            var self = this;
            if (self.loadShow)
                self.loadShow.showBusy();
            if (self._lineLoadCnt < 3 /* MAX_LOAD_CNT */) {
                self._lineLoad(source, tp);
            }
            else {
                self._lineLoads.push({ src: source, tp: tp });
            }
        };
        ResManager.prototype._lineLoad = function (source, tp) {
            var self = this;
            self._lineLoadCnt++;
            TRain.assetMgr.getUrlAsset(source, self._lineLoadFin, self, tp);
        };
        ResManager.prototype._lineLoadFin = function () {
            var self = this;
            self._lineLoadCnt--;
            var lineLoads = self._lineLoads;
            if (lineLoads.length <= 0) {
                if (self._lineLoadCnt <= 0) {
                    game.notifiCenter.postEvent("line_fin" /* LINE_LOAD_FIN */);
                    if (self.loadShow)
                        self.loadShow.hideBusy();
                }
            }
            else {
                var loadInfo = lineLoads.shift();
                self._lineLoad(loadInfo.src, loadInfo.tp);
            }
        };
        ResManager.confPath = "resource/conf/";
        return ResManager;
    }());
    game.ResManager = ResManager;
    __reflect(ResManager.prototype, "game.ResManager");
})(game || (game = {}));
var game;
(function (game) {
    var AccountModel = (function (_super) {
        __extends(AccountModel, _super);
        function AccountModel() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.accNm = "";
            self.isAuto = true;
            return _this;
        }
        AccountModel.prototype.getData = function () {
            return this._data;
        };
        /**
         *
         * @param nm  游客则传null
         * @param pwd  游客则传null
         */
        AccountModel.prototype.login = function (nm, pwd) {
            var self = this;
            if (!nm) {
                nm = self.accNm;
                pwd = "";
                // if( !nm ){
                //     nm = GameUtil.getLocal( GameUtil.LocalKey.ACC_NAME ) || "";
                // }
            }
            game.HttpUtil.accLogin({ nm: nm, channel: "440001" }, true, function (data) {
                if (data && data.ret) {
                    var accNm = data.acc;
                    self.accNm = accNm;
                    self._token = data.info;
                    self.svrIp = data.gameip;
                    game.GameUtil.setLocal("ACC_NAME" /* ACC_NAME */, accNm);
                    //self.postEvent( Account_EVT.got_svrinfo );
                    self.connectWorld();
                }
                else {
                    game.MsgBox.showPrompt(data ? data.info : "");
                }
            }, self);
        };
        AccountModel.prototype.connectWorld = function () {
            var self = this;
            game.Net.regHandle(444 /* msg_t2t_start */, self.onT2TStart, self);
            game.Net.regHandle(7501 /* s2c_connect_result */, self.onConnRes, self);
            game.Net.regHandle(7503 /* s2c_asklogin_result */, self.onLoginRes, self);
            game.Net.init(self.svrIp);
        };
        AccountModel.prototype.onT2TStart = function () {
            var self = this;
            var args = {};
            args.account = self.accNm;
            args.token = self._token;
            args.sign = md5(args.account + args.token + "5C4BEE401828DF1D920F9CFD323C9AFA");
            args.platform = "default";
            args.login_platform = "web";
            args.channelid = self.channel || 440001;
            game.Net.sendMsg(5001 /* c2s_connect */, args);
        };
        ;
        AccountModel.prototype.onConnRes = function (data) {
            if (data.result != 1 /* e_rmt_success */) {
                //console.log("Error: connect_result return ", data.result );
                game.msgPrompt.showErr(data.result);
            }
            else {
                var self_2 = this;
                self_2.gameId = data.gaming;
                TimeUtil.setSvrTm(data.servertime);
                //login
                game.Net.sendMsg(5003 /* c2s_asklogin */, {});
            }
        };
        AccountModel.prototype.onLoginRes = function (data) {
            var self = this;
            self.gameId = data.gaming || 0;
            self.setData(data.account_info);
            game.dataMgr.gameMo.setData(data.game_list);
            //self.postEvent( Account_EVT.login_fin )
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
            //     if (_Reconnected && (_GameLogic != null))
            //     {
            //         _ClientLogic.leaveGame();
            //     }
            //     else
            //         _ClientLogic.showLobby();
            // } 
        };
        return AccountModel;
    }(game.DataModel));
    game.AccountModel = AccountModel;
    __reflect(AccountModel.prototype, "game.AccountModel");
})(game || (game = {}));
var game;
(function (game) {
    var RedMenuItem = (function (_super) {
        __extends(RedMenuItem, _super);
        function RedMenuItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RedMenuItem.prototype.onPartAdded = function () {
            _super.prototype.onPartAdded.call(this);
            var self = this;
            var skRed = self.skRed;
            if (skRed)
                skRed.visible = !!self._red;
        };
        Object.defineProperty(RedMenuItem.prototype, "red", {
            get: function () {
                return this._red;
            },
            set: function (val) {
                var self = this;
                if (self._red != val) {
                    self._red = val;
                    var skRed = self.skRed;
                    if (skRed)
                        skRed.visible = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        return RedMenuItem;
    }(cui.MenuItemImage));
    game.RedMenuItem = RedMenuItem;
    __reflect(RedMenuItem.prototype, "game.RedMenuItem");
})(game || (game = {}));
var game;
(function (game) {
    var GameModel = (function (_super) {
        __extends(GameModel, _super);
        function GameModel() {
            var _this = _super.call(this) || this;
            _this._curGMD = null;
            var self = _this;
            self._gmdList = {};
            self.confNm = "conf";
            return _this;
        }
        GameModel.prototype.onLoadConf = function (data) {
            var self = this;
            self.confLoaded = true;
            self._gmdConf = data.gmd;
        };
        GameModel.prototype.getGmdConf = function (gid) {
            return this._gmdConf[gid];
        };
        GameModel.prototype.getData = function () {
            return this._data;
        };
        GameModel.prototype.getCurGMD = function () {
            var curGMD = this._curGMD;
            return curGMD ? curGMD.gm : null;
        };
        GameModel.prototype.startGMD = function (gameId, data) {
            var self = this;
            if (self._curGMD) {
                //"还有模块没结束"
                self.postEvent("fin" /* start_fin */, "curr gmd not finish");
                return;
            }
            var gmdConf = self._gmdConf[gameId];
            if (!gmdConf) {
                self.postEvent("fin" /* start_fin */, "gmdConf not find, gameId=" + gameId);
                return;
            }
            var gmdInfo = self._gmdList[gameId];
            if (!gmdInfo) {
                gmdInfo = self._gmdList[gameId] = { id: gameId, conf: gmdConf, inited: false };
                var gmdNm = "GMD_" /* GMD_HEAD */ + gmdConf.file;
                gmdInfo.gm = URLUtil.getGlobal(gmdNm);
            }
            gmdInfo.data = data;
            self._curGMD = gmdInfo;
            if (true) {
                gmdInfo.ver = true;
                self.loadGMD(gmdInfo);
            }
            else {
                self.loadVer(gmdInfo);
            }
        };
        //
        GameModel.prototype.closeGMD = function () {
            var curGMD = this._curGMD;
            if (curGMD) {
                curGMD.gm.close();
                this._curGMD = null;
            }
        };
        //-------------------------------------------------- load ------------------------------------------------
        GameModel.prototype.loadGMD = function (curGMD) {
            var self = this;
            if (!curGMD.gm) {
                self.loadJs(curGMD);
            }
            if (!curGMD.res) {
                self.loadRes(curGMD);
            }
            if (!curGMD.theme) {
                self.loadTheme(curGMD);
            }
            self.tryLoadFin();
        };
        GameModel.prototype.loadJs = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            var srcPath;
            if (curGMD.jsVer) {
                srcPath = gmdConf.file + "_" + curGMD.jsVer;
            }
            else {
                srcPath = gmdConf.file;
            }
            URLUtil.loadScript(srcPath + ".js", function () {
                var gmdNm = "GMD_" /* GMD_HEAD */ + gmdConf.file;
                var gm = URLUtil.getGlobal(gmdNm);
                if (gm) {
                    curGMD.gm = gm;
                    self.tryLoadFin();
                }
                else {
                    self.postEvent("fin" /* start_fin */, "GMD object not find name=" + gmdConf.file);
                }
            });
        };
        GameModel.prototype.loadRes = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, arguments.callee, self);
                curGMD.res = true;
                self.tryLoadFin();
            }, self);
            var resUrl = CONF.res + "res_" /* RES_HEAD */ + gmdConf.file + "." + "json" /* JSON */;
            //resUrl = (RES.getVersionController() as TRain.WebVerController).getVirtualUrl(resUrl);
            RES.loadConfig(resUrl, CONF.res);
        };
        GameModel.prototype.loadTheme = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            var resUrl = CONF.res + "theme_" /* THEME_HEAD */ + gmdConf.file + "." + "json" /* JSON */;
            game.resMgr.loadConf(resUrl, function (data) {
                curGMD.theme = true;
                TRain.UITheme.addSkinConf(data);
                self.tryLoadFin();
            }, self, true);
        };
        GameModel.prototype.loadVer = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            var resUrl = "webver_" /* WEBVER_HEAD */ + gmdConf.file + ".ver?v=" + Date.now();
            RES.getResByUrl(resUrl, function (data, source) {
                if (data) {
                    curGMD.ver = true;
                    if (data.js) {
                        curGMD.jsVer = data.js;
                        delete data.js;
                    }
                    RES.getVersionController().addWebVer(data);
                    RES.destroyRes(source);
                    self.loadGMD(curGMD);
                }
            }, self, RES.ResourceItem.TYPE_JSON);
        };
        GameModel.prototype.loadGroup = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            var cb = function (event) {
                if (event.groupName == gmdConf.file) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb, self);
                    curGMD.gp = true;
                    self.loadFin();
                }
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb, self);
            RES.loadGroup(gmdConf.file);
        };
        GameModel.prototype.tryLoadFin = function () {
            var self = this;
            var curGMD = self._curGMD;
            if (curGMD.gm && curGMD.res && curGMD.theme && curGMD.ver) {
                if (!curGMD.gp) {
                    self.loadGroup(curGMD);
                }
                else {
                    self.loadFin();
                }
            }
        };
        GameModel.prototype.loadFin = function () {
            var self = this;
            var curGMD = self._curGMD;
            if (curGMD.gp) {
                if (!curGMD.inited) {
                    curGMD.gm.init();
                    curGMD.inited = true;
                }
                curGMD.gm.start(curGMD.data);
                self.postEvent("fin" /* start_fin */);
            }
        };
        return GameModel;
    }(game.DataModel));
    game.GameModel = GameModel;
    __reflect(GameModel.prototype, "game.GameModel");
})(game || (game = {}));
var game;
(function (game) {
    ;
    var PromptModel = (function (_super) {
        __extends(PromptModel, _super);
        function PromptModel() {
            var _this = _super.call(this) || this;
            var self = _this;
            self._sts = new Array(1 /* MAX */);
            self._stVals = {};
            self._reds = [];
            self._tmpReds = [];
            return _this;
        }
        /**
         * 添加监听对象
         */
        PromptModel.prototype.addRedObj = function (obj, tps) {
            var self = this;
            var reds = self._reds;
            if (true) {
                for (var i = 0, len = reds.length; i < len; ++i) {
                    if (reds[i].obj == obj) {
                        egret.error("addRedObj obj already exist");
                        break;
                    }
                }
            }
            obj.red = self.hasStates(tps);
            reds.push({ tps: tps, obj: obj });
        };
        /**
         * 删除监听对象
         */
        PromptModel.prototype.rmvRedObj = function (obj) {
            var reds = this._reds;
            for (var i = 0, len = reds.length; i < len; ++i) {
                if (reds[i].obj == obj) {
                    reds.splice(i, 0);
                    break;
                }
            }
        };
        /**
         * 添加临时监听对象  在调用rmvTmpObjs
         */
        PromptModel.prototype.addTmpObj = function (obj, tps) {
            var self = this;
            obj.red = self.hasStates(tps);
            self._tmpReds.push({ tps: tps, obj: obj });
        };
        PromptModel.prototype.rmvTmpObjs = function () {
            this._tmpReds.length = 0;
        };
        //-----------------------------
        PromptModel.prototype.hasStates = function (tps) {
            var len = tps.length;
            if (len == 0)
                return false;
            var sts = this._sts;
            for (var i = 0; i < len; ++i) {
                var tp = tps[i];
                if (sts[tp])
                    return true;
            }
            return false;
        };
        PromptModel.prototype.hasState = function (tp) {
            return !!this._sts[tp];
        };
        //获取操作数据
        PromptModel.prototype.getStDatas = function (tp) {
            return this._stVals[tp];
        };
        PromptModel.prototype.hasStData = function (tp, data) {
            var _vals = this._stVals[tp];
            return _vals ? _vals.indexOf(data) >= 0 : false;
        };
        PromptModel.prototype.addStVals = function (tp, addVals) {
            var self = this;
            var valsList = this._stVals;
            var vals = valsList[tp];
            if (vals) {
                var oldCnt = vals.length;
                for (var _i = 0, addVals_1 = addVals; _i < addVals_1.length; _i++) {
                    var addVal = addVals_1[_i];
                    if (vals.indexOf(addVal) < 0) {
                        vals.push(addVal);
                    }
                }
                if (oldCnt) {
                    self.setState(tp);
                }
            }
            else {
                valsList[tp] = addVals;
                self.setState(tp);
            }
        };
        PromptModel.prototype.rmvStVals = function (tp, rmvVals) {
            var self = this;
            var vals = self._stVals[tp];
            if (vals) {
                for (var _i = 0, rmvVals_1 = rmvVals; _i < rmvVals_1.length; _i++) {
                    var rmvVal = rmvVals_1[_i];
                    var idx = vals.indexOf(rmvVal);
                    if (idx >= 0) {
                        vals.splice(idx, 1);
                    }
                }
                if (vals.length <= 0)
                    self.cancelState(tp);
            }
        };
        PromptModel.prototype.rmvStVal = function (tp, rmvVal) {
            var self = this;
            var vals = self._stVals[tp];
            if (vals) {
                var idx = vals.indexOf(rmvVal);
                if (idx >= 0) {
                    vals.splice(idx, 1);
                    if (vals.length <= 0)
                        self.cancelState(tp);
                }
            }
        };
        PromptModel.prototype.setState = function (tp) {
            var self = this;
            var sts = self._sts;
            if (!sts[tp]) {
                sts[tp] = 1;
                self.setRed(self._reds, tp);
                self.setRed(self._tmpReds, tp);
            }
        };
        PromptModel.prototype.setRed = function (reds, tp) {
            for (var i = 0, len = reds.length; i < len; ++i) {
                var redData = reds[i];
                if (redData.tps.indexOf(tp) >= 0) {
                    redData.obj.red = true;
                }
            }
        };
        PromptModel.prototype.updateRed = function (reds, tp) {
            for (var i = 0, len = reds.length; i < len; ++i) {
                var redData = reds[i];
                var tps = redData.tps;
                if (tps.indexOf(tp) >= 0) {
                    redData.obj.red = this.hasStates(tps);
                }
            }
        };
        PromptModel.prototype.cancelState = function (tp) {
            var self = this;
            var sts = self._sts;
            if (sts[tp]) {
                var _vals = self._stVals[tp];
                if (_vals && _vals.length > 0) {
                    self._stVals[tp] = null;
                    //self.delayPostEvent( PromptMo_Evt.stdata_rmv, 0, tp, _vals );
                }
                sts[tp] = 0;
                self.updateRed(self._reds, tp);
                self.updateRed(self._tmpReds, tp);
            }
        };
        return PromptModel;
    }(game.Notification));
    game.PromptModel = PromptModel;
    __reflect(PromptModel.prototype, "game.PromptModel");
})(game || (game = {}));
var game;
(function (game) {
    var TwoTxtBtn = (function (_super) {
        __extends(TwoTxtBtn, _super);
        function TwoTxtBtn() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TwoTxtBtn.prototype.onPartAdded = function () {
            _super.prototype.onPartAdded.call(this);
            var self = this;
        };
        Object.defineProperty(TwoTxtBtn.prototype, "lab1", {
            get: function () {
                return this.skLab1.text;
            },
            set: function (val) {
                var self = this;
                self.skLab1.text = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TwoTxtBtn.prototype, "lab2", {
            get: function () {
                return this.skLab2.text;
            },
            set: function (val) {
                var self = this;
                self.skLab2.text = val;
            },
            enumerable: true,
            configurable: true
        });
        return TwoTxtBtn;
    }(cui.ScaleButton));
    game.TwoTxtBtn = TwoTxtBtn;
    __reflect(TwoTxtBtn.prototype, "game.TwoTxtBtn");
})(game || (game = {}));
/**
 * Created by wjdeng on 2015/9/6.
 */
var game;
(function (game) {
    var BusyLayer = (function (_super) {
        __extends(BusyLayer, _super);
        function BusyLayer() {
            var _this = _super.call(this) || this;
            var self = _this;
            self._cnt = 0;
            var con = self._gcon = new cui.Group();
            con.hCenter = 0;
            con.vCenter = 0;
            con.perHeight = 100;
            con.perWidth = 100;
            var img = new cui.Image();
            img.perHeight = 100;
            img.perWidth = 100;
            img.source = "common@bg";
            con.addChild(img);
            var ani = new cui.UIMovieClip();
            ani.aniName = "busy";
            ani.autoPlay = true;
            ani.hCenter = 0;
            ani.vCenter = 0;
            con.addChild(ani);
            game.notifiCenter.addListener(egret.Event.RESIZE, function (w, h) {
                self.width = w;
                self.height = h;
            }, self);
            return _this;
        }
        BusyLayer.getInst = function () {
            if (!BusyLayer.inst) {
                BusyLayer.inst = new BusyLayer();
            }
            return BusyLayer.inst;
        };
        BusyLayer.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var self = this;
            self.width = stage.$stageWidth;
            self.height = stage.$stageHeight;
            self.hideAni();
            if (!self._aniTag) {
                self._aniTag = TRain.core.addDelayDo(self.showAni, self, 100);
            }
        };
        BusyLayer.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            var self = this;
            var aniTag = self._aniTag;
            if (aniTag) {
                TRain.core.rmvDelayDoByID(aniTag);
                self._aniTag = 0;
            }
        };
        BusyLayer.prototype.$hitTest = function () {
            return this;
        };
        BusyLayer.prototype.hideAni = function () {
            var self = this;
            var gcon = self._gcon;
            if (gcon.parent) {
                self.removeChild(gcon);
            }
        };
        BusyLayer.prototype.showAni = function () {
            var self = this;
            self._aniTag = 0;
            var gcon = self._gcon;
            if (!gcon.parent) {
                self.addChild(gcon);
            }
        };
        BusyLayer.prototype.showBusy = function () {
            var self = this;
            self._cnt++;
            self.update();
        };
        BusyLayer.prototype.hideBusy = function () {
            var self = this;
            self._cnt--;
            self.update();
        };
        BusyLayer.prototype.setParent = function (container) {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(self);
            }
            self._pcon = container;
        };
        BusyLayer.prototype.update = function () {
            var self = this;
            if (!self._pcon)
                return;
            if (self._cnt > 0) {
                if (!self.parent) {
                    self._pcon.addChild(self);
                }
            }
            else {
                if (self.parent) {
                    self._pcon.removeChild(self);
                }
            }
        };
        return BusyLayer;
    }(cui.Group));
    game.BusyLayer = BusyLayer;
    __reflect(BusyLayer.prototype, "game.BusyLayer", ["game.ILoadShow"]);
})(game || (game = {}));
var game;
(function (game) {
    var DataFormat;
    (function (DataFormat) {
        function formatGold(gold) {
            var self = this;
            var goldStr = "";
            var wGold = gold / 10000;
            if (gold > 10000) {
                var bGold = wGold / 10000;
                if (bGold > 10000) {
                    goldStr = bGold + "by";
                }
                else {
                    goldStr = wGold + "wy";
                }
            }
            else {
                goldStr = gold + "y";
            }
            return goldStr;
        }
        DataFormat.formatGold = formatGold;
        /**
         * 获取角色头像资源
         * @param icon_custom
         */
        function getHeadIcon(icon_custom) {
            var idx1 = icon_custom.indexOf(".");
            var idx = icon_custom.indexOf("head_");
            if (idx >= 0 && idx1 >= 0) {
                icon_custom = icon_custom.substring(5, idx1);
            }
            return "head@" /* head */ + icon_custom;
        }
        DataFormat.getHeadIcon = getHeadIcon;
    })(DataFormat = game.DataFormat || (game.DataFormat = {}));
})(game || (game = {}));
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.createdView();
        return _this;
    }
    LoadingUI.prototype.createdView = function () {
        var self = this;
        var textCtrl = new egret.TextField();
        self.textField = textCtrl;
        self.addChild(textCtrl);
        textCtrl.y = 300;
        textCtrl.width = 1280;
        textCtrl.height = 100;
        textCtrl.textAlign = "center";
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
var game;
(function (game) {
    var UIUtils;
    (function (UIUtils) {
        // export function itemFlyTo(parent, display, targetPos, cb) {
        // 	let actionSeq = TRain.ActionSequence.create(
        // 		TRain.ActionPropTo.create(1000, {x:targetPos.x, y:targetPos.y, scaleX:0.3, scaleY:0.3}),
        // 		TRain.ActionCallFun.create(0, function() {
        // 			parent.removeChild(display);
        // 			TRain.actionMgr.rmvAction(actionSeq);
        // 			cb();
        // 		}, self)
        // 	);
        // 	TRain.actionMgr.addAction(actionSeq, display, false);
        // }
        function secToStr(sec) {
            var min = Math.floor(sec / 60); //分
            sec = sec - min * 60; //秒
            var minStr = min > 9 ? min : ("0" + min);
            var secStr = sec > 9 ? sec : ("0" + sec);
            return minStr + ":" + secStr;
        }
        UIUtils.secToStr = secToStr;
    })(UIUtils = game.UIUtils || (game.UIUtils = {}));
})(game || (game = {}));
var game;
(function (game) {
    /**
     * 游戏主逻辑界面，分层控制游戏内其他界面。
     *
     * */
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameScene.createInst = function () {
            if (!game.gameScene) {
                game.gameScene = new GameScene();
            }
            return game.gameScene;
        };
        GameScene.prototype.childrenCreated = function () {
            var self = this;
            self._hideHome = 0;
            //
            self._firstShow = true;
            var layers = new CMap();
            self._layers = layers;
            var layer = new cui.Group;
            self._mainLayer = layer;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layers.set(0 /* kMainLayer */, layer); //mainLayer
            layer.tag = 0 /* kMainLayer */;
            layer.hitCheckBound = false;
            self.addChild(layer);
            // let topBar = MainTop.impl = new MainTop();
            // topBar.tag = GameLayer.kFloatLayer;
            // layers.set( GameLayer.kFloatLayer, layer );
            // self.addChild( topBar );     
            var popupLayer = new game.PopupLayer();
            popupLayer.delegate = self;
            popupLayer.hitCheckBound = false;
            popupLayer.perWidth = 100;
            popupLayer.perHeight = 100;
            popupLayer.tag = 2 /* kPopup */;
            layers.set(2 /* kPopup */, popupLayer); //kPopup
            self._popupLayer = popupLayer;
            var effLay = new game.EffectLayer();
            effLay.delegate = self;
            effLay.hCenter = 0;
            effLay.vCenter = 0;
            effLay.tag = 3 /* kEffectLayer */;
            effLay.hitCheckBound = false;
            layers.set(3 /* kEffectLayer */, effLay); //kEffectLayer
            layer = new cui.Group();
            //layer.touchEnabled = false;
            layer.hitCheckBound = false;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.tag = 4 /* kMessageBox */;
            layers.set(4 /* kMessageBox */, layer); //kMessageBox
            layer = new cui.Group();
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.touchEnabled = false;
            layer.tag = 5 /* kTipsLayer */;
            layers.set(5 /* kTipsLayer */, layer); //kTipsLayer
            game.TipsMgr.setParent(layer, self);
            game.BusyLayer.getInst().setParent(self);
            self.showHallUI(1 /* Home */);
            self.addHandler();
            TRain.core.addFrameDo(self._doGC, self, false, 600000);
        };
        GameScene.prototype._doGC = function () {
            TRain.assetMgr.doGC();
            TRain.soundMgr.gcRess();
            TRain.mcMgr.enableGC();
        };
        GameScene.prototype.addHandler = function () {
            var self = this;
            //HttpRequest.setErrHandle( {cb:self.handlerErrMsg, tar:self} );
            // notifiCenter.addListener(self, self.requestFailed, GameEvent.REQUEST_FAILD);
            // notifiCenter.addListener(self, self.reConnetFailed, GameEvent.RECONNETFAIL);
            // notifiCenter.addListener(self, self.onStartReLoad, GameEvent.RECONNETSTART);
            // notifiCenter.addListener(self, self.reConnetSucc, GameEvent.RECONNETSUCC);
        };
        GameScene.prototype.firstGame = function () {
            var self = this;
            // let openUI = new ShowJobInfo();
            // openUI.setData(ShowJobType.fail);
            // self.openPopup(openUI,popMode.block);
        };
        //--------------------------------------------------------------------------------------------
        GameScene.prototype.showLayer = function (layer) {
            this._showLayer(layer.tag, true);
        };
        GameScene.prototype.hideLayer = function (layer) {
            this._showLayer(layer.tag, false);
        };
        GameScene.prototype._showLayer = function (id, visible) {
            var self = this;
            var layers = self._layers;
            var layer = layers.get(id);
            if (visible) {
                //
                if (!layer.parent) {
                    var tag = layer.tag;
                    var children = self.$children;
                    var idx = children.length - 1;
                    for (; idx >= 0; --idx) {
                        var tmp = children[idx];
                        if (tmp.tag >= 0 && tmp.tag < tag)
                            break;
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
        };
        //--------------------------  UIDelegate start -----------------------------------------
        /**
         * 显示大厅UI
         * @param value:number 界面码
         * @param data?:any 传递给界面的参数 可选。其中 lastUI:打开此界面的上一个界面
         * */
        GameScene.prototype.showHallUI = function (tag, data) {
            var self = this;
            var oldTag = self._curTag;
            if (oldTag == tag) {
                return;
            }
            var openUI;
            if (tag > 2 /* Game */) {
                switch (tag) {
                }
            }
            if (openUI) {
                self._curTag = tag;
                openUI.tag = tag;
                openUI.open(self._mainLayer, data, function (ui) {
                    self.openFWUI(ui, ui.tag);
                }, self);
            }
            else {
                self.openFWUI(null, tag);
            }
        };
        /**
         * 显示游戏UI  注：游戏UI  tag 需要大于1000
         * @param openUI:传入要打开的界面
         * */
        GameScene.prototype.showGameUI = function (tag, openUI, isMain) {
            var self = this;
            var oldTag = self._curTag;
            if (oldTag == tag) {
                return;
            }
            openUI.tag = tag;
            self.openFWUI(openUI, tag, isMain);
        };
        GameScene.prototype.getCurUI = function () {
            return this._curUI;
        };
        GameScene.prototype.getCurTag = function () {
            return this._curTag;
        };
        GameScene.prototype.openFWUI = function (newUI, tag, isMain) {
            var self = this;
            var oldUI = self._curUI;
            if (oldUI)
                oldUI.dispose();
            self._curUI = newUI;
            self._mainLayer.removeChildren();
            var oldMainUI = self._mainUI;
            //主界面时， 才可弹出界面
            if (newUI) {
                if (isMain) {
                    //卸载 mainUI
                    if (oldMainUI && oldMainUI.tag != 1 /* Home */) {
                        oldMainUI.dispose();
                    }
                    self._mainUI = newUI;
                }
            }
            else {
                if (tag == 1 /* Home */) {
                    //卸载 mainUI
                    if (oldMainUI && oldMainUI.tag != 1 /* Home */) {
                        oldMainUI.dispose();
                        oldMainUI = null;
                    }
                }
                if (oldMainUI) {
                    newUI = oldMainUI;
                }
                else {
                    newUI = self._homeUI;
                    if (!newUI) {
                        newUI = self._homeUI = new game.HomeView();
                        newUI.tag = 1 /* Home */;
                    }
                }
            }
            self._curTag = tag;
            self._mainLayer.addChild(newUI);
            if (self._firstShow) {
                self._firstShow = false;
            }
            // MainTop.impl.setState( inHome );
        };
        //---------------------------------- 进入子游戏 ----------------------------------
        GameScene.prototype.startGame = function (gameId) {
            var self = this;
            var gameMo = game.dataMgr.gameMo;
            gameMo.addListener("fin" /* start_fin */, function (err) {
                game.BusyLayer.getInst().hideBusy();
                if (err) {
                    console.log(err);
                    game.MsgBox.showPrompt(0 /* e_rmt_unknow */);
                }
                else {
                    self._inGame = true;
                }
            }, self, true);
            gameMo.startGMD(gameId);
            game.BusyLayer.getInst().showBusy();
        };
        GameScene.prototype.endGame = function () {
            var self = this;
            self._inGame = false;
            self.goHome();
            game.dataMgr.gameMo.closeGMD();
            self._doGC();
        };
        //----------------------------------弹出窗口---------------------------------------
        GameScene.prototype.goBack = function () {
            this.openFWUI();
        };
        GameScene.prototype.goHome = function () {
            var self = this;
            this.openFWUI(null, 1 /* Home */);
        };
        GameScene.prototype.openPopup = function (popup, data) {
            var self = this;
            var layer = self._popupLayer;
            popup.delegate = self;
            layer.openPopup(popup, data);
        };
        GameScene.prototype.closeAllPopup = function () {
            var self = this;
            var layer = self._popupLayer;
            layer.closeAll();
        };
        GameScene.prototype.onPopupOpen = function (popup) {
            var self = this;
            if (popup.hideHome) {
                self._hideHome++;
                if (self._hideHome == 1) {
                    self._showLayer(0 /* kMainLayer */, false);
                }
            }
        };
        GameScene.prototype.onPopupClose = function (popup) {
            var self = this;
            if (popup.hideHome) {
                self._hideHome--;
                if (self._hideHome == 0) {
                    self._showLayer(0 /* kMainLayer */, true);
                }
            }
        };
        GameScene.prototype.stopPopup = function () {
            var layer = (this._layers.get(2 /* kPopup */));
            layer.stopPop();
        };
        GameScene.prototype.startPopup = function () {
            var layer = (this._layers.get(2 /* kPopup */));
            layer.startPop();
        };
        // public addToTouch(target:any):void{
        //     let self=this;
        //     self._touchLayer.addChild(target);
        // }
        // public removeFromTouchLayer(target?:any):void{
        //     let self=this;
        //     if(target){
        //        self._touchLayer.removeChild(target);
        //     }else{
        //        self._touchLayer.removeChildren();
        //     } 
        // }
        //----------------------全屏特效-------------------------
        GameScene.prototype.addSceneEff = function (eff) {
            var self = this;
            var effLay = self._layers.get(3 /* kEffectLayer */);
            effLay.addEffect(eff);
        };
        /**
         * 同时播放多个场景特效，仅用于小特效
         */
        GameScene.prototype.showSceneEff = function (eff) {
            var self = this;
            var effLay = self._layers.get(3 /* kEffectLayer */);
            effLay.showEffect(eff);
        };
        return GameScene;
    }(game.BaseScene));
    game.GameScene = GameScene;
    __reflect(GameScene.prototype, "game.GameScene", ["game.PopupDelegate"]);
})(game || (game = {}));
// module game{
//     export class HallRadio extends cui.Component{
//         public skTongZhi:cui.Label;
//         constructor(){
//             super();
//             this.skinName = "radioSkin";
//         }
//         protected onPartAdded(){
//             super.onPartAdded();
//             let self = this;
//             //监听广播变化
//         }
//         public updateTongZhi():void{//更新通知
// 			this.skTongZhi.text = "";
// 		}
//         public dispose(){
//             super.dispose();
//         }
//     }
// } 
var game;
(function (game) {
    var HomeView = (function (_super) {
        __extends(HomeView, _super);
        function HomeView() {
            var _this = _super.call(this) || this;
            _this.skinName = "gameHallSkin";
            _this._txtArr = ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee"];
            return _this;
        }
        HomeView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.initHead();
            self.skBHead.setTarget(function () {
                game.gameScene.openPopup(new game.PersonCenter());
            }, self);
            self.skBSet.setTarget(function () {
                //打开设置界面
            }, self);
            var list = self.skGames;
            list.itemRender = game.ItemTile;
            list.itemSkinName = "gameTileSkin";
            list.dataProvider = new cui.ArrayCollection();
            list.addEventListener("item_tap" /* ITEM_TAP */, function (e) {
                game.gameScene.startGame(e.data.tag);
            }, self);
            self.initGames();
        };
        HomeView.prototype.onShow = function () {
            var self = this;
            TRain.core.addFrameDo(self.randomTxt, self, true, 5000);
        };
        HomeView.prototype.onHide = function () {
            var self = this;
            TRain.core.rmvFrameDo(self, self.randomTxt);
        };
        HomeView.prototype.initHead = function () {
            var self = this;
            var accModel = game.dataMgr.accMo;
            var accData = accModel.getData();
            //获取当前头像
            self.skHeadImg.source = game.DataFormat.getHeadIcon(accData.icon_custom);
            self.skHeadFrame.source = "headFrame@" /* headFrame */ + accData.viplvl; //resMgr.getHeadRes(String(accData.viplvl),"Frame");
            //当前玩家名字
            self.skName.text = accData.nickname;
            //当前玩家id
            self.skId.text = "ID：" + accData.aid;
        };
        HomeView.prototype.randomTxt = function () {
            var self = this;
            var num = Math.ceil(Math.random() * 4);
            self.skRoleTalk.text = self._txtArr[num];
        };
        HomeView.prototype.initGames = function () {
            var self = this;
            //获取游戏列表
            var gameModel = game.dataMgr.gameMo;
            var curSvrList = gameModel.getData();
            var showGames = [];
            for (var i = 0; i < curSvrList.length; i++) {
                var info = curSvrList[i];
                var gameId = info.gameid;
                var gameConf = gameModel.getGmdConf(gameId);
                if (gameConf) {
                    showGames.push({ icon: "rukou" + gameId, ani: "game" + gameId, tag: gameId, ud: gameConf });
                }
            }
            showGames.sort(function (a, b) {
                return a.ud.wg - b.ud.wg;
            });
            self.skGames.dataProvider.source = showGames;
        };
        return HomeView;
    }(game.UIFullFW));
    game.HomeView = HomeView;
    __reflect(HomeView.prototype, "game.HomeView");
})(game || (game = {}));
var game;
(function (game) {
    var TipsMgr;
    (function (TipsMgr) {
        var _parent; //父窗口
        var _delegate;
        var _prompts;
        var _promptGp;
        var _timerId;
        function init() {
            _prompts = [];
            _timerId = 0;
            _promptGp = new cui.Component();
            _promptGp.skinName = "TipPromptSkin";
            _promptGp.vCenter = 0;
            _promptGp.hCenter = 0;
        }
        TipsMgr.init = init;
        function setParent(parent, layerDelegate) {
            if (_parent) {
                _parent.removeChild(_promptGp);
            }
            _parent = parent;
            _delegate = layerDelegate;
            if (parent) {
                parent.addChild(_promptGp);
            }
            preparePrompt();
        }
        TipsMgr.setParent = setParent;
        function tryClose() {
            if (_delegate) {
                _delegate.hideLayer(_parent);
                _timerId = 0;
                TRain.core.rmvFrameDoById(_timerId);
            }
        }
        function tryShow() {
            if (_parent && !_parent.parent && _promptGp.numChildren > 0) {
                _delegate.showLayer(_parent);
            }
        }
        //--------------------------------- prompt -------------------------------------
        function showPrompt(txt, type) {
            if (!txt || txt.length < 1)
                return;
            _prompts = [];
            var data = {};
            data.tp = type;
            data.txt = txt;
            //data.tm = 0;
            _prompts.unshift(data);
            preparePrompt();
        }
        TipsMgr.showPrompt = showPrompt;
        function preparePrompt() {
            if (_parent && _prompts.length > 0) {
                var children = _promptGp.$children;
                var childCnt = children.length;
                if (childCnt > 0) {
                    if (!_timerId) {
                        _timerId = TRain.core.addDelayDo(tryClose, TipsMgr, 3000 /* showTm */);
                    }
                    for (var i = 0, len = _prompts.length; i < len; ++i) {
                        var data = _prompts[i];
                        var label = children[i + 1]; //因为现在是底图加文字
                        label.text = data.txt;
                        label.visible = true;
                        switch (data.tp) {
                            case 0 /* prompt */:
                                label.textColor = 15615301 /* red */;
                                break;
                            case 1 /* white */:
                                label.textColor = 16777215 /* white */;
                                break;
                        }
                    }
                }
                tryShow();
            }
        }
        // function updatePrompt(){
        //     let children = _promptGp.$children;
        //     let len=_prompts.length;
        //     let nowTm = egret.getTimer();
        //     let hasShow = false;
        //     for( let i=0; i<len; ++i ){
        //         let data = _prompts[i]
        //         if(data.tm>nowTm){
        //             hasShow = true;
        //         }
        //         else{
        //             children[i].visible = false;
        //         }
        //     }
        //     if( !hasShow ){
        //         TRain.core.rmvFrameDoById( _timerId );
        //         _timerId = 0;
        //         tryClose();
        //     }
        // }
    })(TipsMgr = game.TipsMgr || (game.TipsMgr = {}));
})(game || (game = {}));
var game;
(function (game) {
    var ModName = (function (_super) {
        __extends(ModName, _super);
        function ModName() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "modNameSkin";
            self.vCenter = 0;
            self.hCenter = 0;
            self.hideBg = false;
            return _this;
        }
        ModName.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skBack.setTarget(function () {
                self.close();
            }, self);
            var accData = game.dataMgr.accMo.getData();
            self.skName.prompt = accData.nickname;
            self.skFirstLab.visible = accData.updateNicknameCount <= 0;
            self.skSecondGp.visible = accData.updateNicknameCount > 0;
            self.skGold.text = "5";
            self.skSure.setTarget(function (accData) {
                // if(){
                // }
            }, self);
        };
        ModName.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return ModName;
    }(game.UIPopup));
    game.ModName = ModName;
    __reflect(ModName.prototype, "game.ModName");
})(game || (game = {}));
var game;
(function (game) {
    var PersonCenter = (function (_super) {
        __extends(PersonCenter, _super);
        function PersonCenter() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.vCenter = 0;
            self.hCenter = 0;
            self.hideBg = false;
            self.skinName = "pCenterSkin";
            self._iconArr = ["nan_1", "nan_2", "nan_3", "nan_4", "nan_5",
                "nv_1", "nv_2", "nv_3", "nv_4", "nv_5", "nan_s1", "nv_s1"];
            return _this;
        }
        PersonCenter.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skBack.setTarget(function () {
                self.close();
            }, self);
            var accData = game.dataMgr.accMo.getData();
            self.skName.text = accData.nickname;
            self.skId.text = "ID：" + accData.aid;
            self.skAddresss.text = accData.ipinfo;
            self.skIconFrame.source = "head@" /* head */ + accData.viplvl;
            self.skIconImg.source = self._curIcon = game.DataFormat.getHeadIcon(accData.icon_custom);
            self.skMod.setTarget(function () {
                game.gameScene.openPopup(new game.ModName());
            }, self);
            var list = self.skList;
            list.itemRender = iconItem;
            list.dataProvider = self._dataPro = new cui.ArrayCollection();
            self.updateIcon();
        };
        PersonCenter.prototype.updateIcon = function () {
            var self = this;
            var iconArr = [];
            for (var i = 0; i < self._iconArr.length; i++) {
                iconArr.push(self.formatIconData(self._iconArr[i], i));
            }
            iconArr.sort(function (a, b) {
                return a.tag - b.tag;
            });
            self._dataPro.source = iconArr;
        };
        PersonCenter.prototype.formatIconData = function (iconStr, num) {
            var self = this;
            var showData = {
                handle: self,
                icon: "",
                isChoose: false,
                isMask: false,
                tag: num,
            };
            //获取当前的头像
            var accData = game.dataMgr.accMo.getData();
            var curIcon = self._curIcon;
            var icon = game.DataFormat.getHeadIcon(iconStr);
            showData.isChoose = curIcon == icon;
            showData.icon = icon;
            if (iconStr == "nan_s1" || iconStr == "nv_s1") {
                showData.isMask = curIcon != game.DataFormat.getHeadIcon(iconStr);
            }
            else {
                showData.isMask = false;
            }
            if (curIcon == icon)
                showData.tag = -1;
            return showData;
        };
        PersonCenter.prototype.iIconHandler = function (item) {
            var self = this;
            var iconData = item.data;
            if (iconData.icon == self._curIcon)
                return;
            if (iconData.isMask) {
                game.TipsMgr.showPrompt("无法修改！", 0 /* prompt */);
            }
            else {
                game.Net.sendMsg(5010 /* c2s_update_playerhead */, iconData.icon);
            }
        };
        PersonCenter.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
        };
        return PersonCenter;
    }(game.UIPopup));
    game.PersonCenter = PersonCenter;
    __reflect(PersonCenter.prototype, "game.PersonCenter");
    var iconItem = (function (_super) {
        __extends(iconItem, _super);
        function iconItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "pcItemSkin";
            return _this;
        }
        iconItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var data = self.data;
            self.skClick.setTarget(function () {
                data.handle.iIconHandler(self);
            }, self);
        };
        iconItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            self.skIcon.source = data.icon;
            self.skChoose.visible = data.isChoose;
            self.skMask.visible = data.isMask;
        };
        return iconItem;
    }(cui.DataItem));
    game.iconItem = iconItem;
    __reflect(iconItem.prototype, "game.iconItem");
})(game || (game = {}));
var game;
(function (game) {
    var LoadingScene = (function (_super) {
        __extends(LoadingScene, _super);
        function LoadingScene() {
            var _this = _super.call(this) || this;
            var self = _this;
            var view = self._view = new game.LoadingView();
            self.addChild(view);
            return _this;
        }
        LoadingScene.getInst = function () {
            if (!LoadingScene._inst) {
                LoadingScene._inst = new LoadingScene();
            }
            return LoadingScene._inst;
        };
        LoadingScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            //TipsMgr.setParent(self, self);
        };
        LoadingScene.prototype.dispose = function () {
            LoadingScene._inst = null;
            //TipsMgr.setParent( null, null );
            _super.prototype.dispose.call(this);
        };
        LoadingScene.prototype.setLoadStep = function (msg, totalper, tm) {
            this._view.setLoadStep(msg, totalper, tm);
        };
        LoadingScene.prototype.isFinish = function () {
            return this._view.isFinish();
        };
        return LoadingScene;
    }(game.BaseScene));
    game.LoadingScene = LoadingScene;
    __reflect(LoadingScene.prototype, "game.LoadingScene");
})(game || (game = {}));
var game;
(function (game) {
    var LoadingView = (function (_super) {
        __extends(LoadingView, _super);
        function LoadingView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.slowSpeed = 0.0005;
            self.fastSpeed = 0.04;
            self._showPer = 0;
            self._nextPer = 0;
            self._curPer = 0;
            return _this;
            //self.skinName = "LoadingSkin"
        }
        LoadingView.prototype.onPartAdded = function () {
            var self = this;
            self.skProBar.labelFunction = self.pbLabelFun.bind(self);
            self.skProBar.openAni = true;
            self.skTip.text = TRain.langMgr.getTxt("loginUI", "tip_" + Math.floor(Math.random() * 13) + 1);
            self._stX = self.skHead.x;
        };
        LoadingView.prototype.getCloseAni = function () {
            return null;
        };
        LoadingView.prototype.getOpenAni = function () {
            return null;
        };
        LoadingView.prototype.onShow = function () {
            var self = this;
            TRain.core.addFrameDo(self.update, self);
            // let loopAct = self._loopAct;
            // if( !loopAct ){
            //     let action = new TRain.ActionPropTween( 1000, 1, {rotation:{b:0,r:357}} );
            //     loopAct = self._loopAct = new TRain.ActionLoop(action);
            // } 
            // TRain.actionMgr.addAction( loopAct, self.skBall, false );
        };
        LoadingView.prototype.onHide = function () {
            var self = this;
            TRain.core.rmvFrameDo(self, self.update);
            //TRain.actionMgr.rmvAction( self._loopAct );
        };
        LoadingView.prototype.pbLabelFun = function (val) {
            var self = this;
            self.skHead.x = self._stX + Math.floor(self.skProBar.width * val);
            self.skPer.text = Math.floor(val * 100) + "%";
            return "";
        };
        LoadingView.prototype.onDispose = function () {
            var self = this;
            TRain.core.rmvFrameDo(self, self.update);
        };
        /**
         * totalper 为占100 的百分比 tm 预计时间 毫秒
         * */
        LoadingView.prototype.setLoadStep = function (msg, totalper, tm) {
            if (totalper < 1)
                return;
            var self = this;
            var nextPer = self._nextPer;
            if (nextPer >= 100)
                return;
            nextPer += totalper;
            if (nextPer >= 100)
                nextPer = 100;
            self._curPer = self._nextPer;
            self._nextPer = nextPer;
            self._speed = tm > 0 ? totalper / tm : 0.01;
            // if( self._showPer < self._curPer )
            // {
            //     self._nextMsg = msg;
            // }
            // else
            // {
            //     self._msg = msg;
            // }
        };
        LoadingView.prototype.isFinish = function () {
            //return this._showPer >= 100;
            return true;
        };
        LoadingView.prototype.update = function (tm) {
            var self = this;
            var showPer = self._showPer;
            if (showPer >= 100) {
                TRain.core.rmvFrameDo(self, self.update);
                return;
            }
            var nextPer = self._nextPer;
            var newPer = showPer;
            if (showPer < self._curPer) {
                newPer += self.fastSpeed * tm;
                if (newPer > nextPer)
                    newPer = nextPer;
            }
            else if (showPer < nextPer) {
                newPer += self._speed * tm;
                if (newPer > nextPer)
                    newPer = nextPer;
            }
            else if (nextPer < 100) {
                newPer += self.slowSpeed * tm;
            }
            var temp = Math.floor(newPer);
            self._showPer = newPer;
            if (temp != Math.floor(showPer)) {
                // let msg = self._nextMsg;
                // if( msg && showPer>=self._curPer )
                // {
                //     self._msg = msg;
                //     self._nextMsg = null;
                // }
                // else
                // {
                //     msg = self._msg;
                // }
                if (temp >= 100)
                    temp = 99;
                //if(!msg) msg = "";
                self.skProBar.setProgressValue(temp, 300);
            }
        };
        return LoadingView;
    }(game.UIFWBase));
    game.LoadingView = LoadingView;
    __reflect(LoadingView.prototype, "game.LoadingView");
})(game || (game = {}));
var game;
(function (game) {
    var CreateRole = (function (_super) {
        __extends(CreateRole, _super);
        function CreateRole() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "CreateChaSkin";
            self.name = "CreateCha";
            self._needRes = true;
            return _this;
        }
        CreateRole.prototype.onPartAdded = function () {
            var self = this;
            self.skLogin.setTarget(self.doCreate, self);
            self.skRand.setTarget(self.doRandName, self);
            self.doRandName();
        };
        CreateRole.prototype.doCreate = function () {
            var name = this.skInput.text;
            // if( !name || name.length<=0 ){
            // 	MsgBox.showBox( LangGrp.loginUI, langConsts.loginUI.inputname );
            // 	return;
            // }
            // if( name.indexOf(" ")>=0 ||
            // 	name.indexOf("\n")>=0 || 
            // 	name.indexOf("\\n")>=0 || 
            // 	name.indexOf("\r")>=0 || 
            // 	name.indexOf("\\r")>=0 || 
            // 	name.indexOf("\"" )>=0 ){
            // 		MsgBox.showBox( LangGrp.loginUI, langConsts.loginUI.invalidchar );
            // 		return;
            // }
            //dataMgr.userMo.createUser( name );
        };
        CreateRole.prototype.doRandName = function () {
            var firstNms = TRain.langMgr.getGp('firstNm');
            var lastNms = TRain.langMgr.getGp('lastNm');
            if (!firstNms || !lastNms)
                return;
            var fIdx = Math.floor(Math.random() * firstNms.length);
            var lIdx = Math.floor(Math.random() * lastNms.length);
            this.skInput.text = firstNms[fIdx] + lastNms[lIdx];
        };
        CreateRole.prototype.loadFWRes = function () {
            game.resMgr.lineLoad(game.resMgr.getConfUrl("randNm"), "json" /* JSON */);
            _super.prototype.loadFWRes.call(this);
        };
        CreateRole.prototype.onLoadFin = function () {
            var url = game.resMgr.getConfUrl("randNm");
            var data = TRain.assetMgr.getUrlRes("json" /* JSON */, url);
            if (data) {
                TRain.langMgr.addGps(data);
                TRain.assetMgr.destroyRes(url);
            }
            _super.prototype.onLoadFin.call(this);
        };
        return CreateRole;
    }(game.UIFWBase));
    game.CreateRole = CreateRole;
    __reflect(CreateRole.prototype, "game.CreateRole");
})(game || (game = {}));
var game;
(function (game) {
    var ForgotPwd = (function (_super) {
        __extends(ForgotPwd, _super);
        function ForgotPwd() {
            var _this = _super.call(this) || this;
            _this.skinName = "forgotPwdSkin";
            return _this;
        }
        ForgotPwd.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skGetCode.setTarget(self.getCode, self);
            self.skSure.setTarget(self.enSure, self);
            self.skPhone.addEventListener(egret.Event.CHANGE, self.OnChangePhone, self);
            self.skCode.addEventListener(egret.Event.CHANGE, self.OnChangeCode, self);
            self.skPwd.addEventListener(egret.Event.CHANGE, self.OnChangePwd, self);
            self.skAgainPwd.addEventListener(egret.Event.CHANGE, self.OnChangeAgainPwd, self);
            self.skClose.setTarget(self.close, self);
            self.skPhone.prompt = "请输入手机号码";
            self.skCode.prompt = "请输入验证码";
            self.skPwd.prompt = "请输入6-20位的字符";
            self.skAgainPwd.prompt = "请输入6-20位的字符";
        };
        ForgotPwd.prototype.OnChangePhone = function (e) {
            this.skPhone.text = e.target.text;
        };
        ForgotPwd.prototype.OnChangeCode = function (e) {
            this.skCode.text = e.target.text;
        };
        ForgotPwd.prototype.OnChangePwd = function (e) {
            this.skPwd.text = e.target.text;
        };
        ForgotPwd.prototype.OnChangeAgainPwd = function (e) {
            this.skPwd.text = e.target.text;
        };
        ForgotPwd.prototype.getCode = function () {
            var self = this;
            //首先判断手机号位数是否正确再发送
        };
        ForgotPwd.prototype.enSure = function () {
            var self = this;
            //挨个验证前面四个是否满足条件
        };
        return ForgotPwd;
    }(game.UIPopup));
    game.ForgotPwd = ForgotPwd;
    __reflect(ForgotPwd.prototype, "game.ForgotPwd");
})(game || (game = {}));
var game;
(function (game) {
    var LoginAccount = (function (_super) {
        __extends(LoginAccount, _super);
        function LoginAccount() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "loginViewSkin";
            return _this;
        }
        LoginAccount.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skLogin.setTarget(self.tapLogin, self);
            self.skRegistered.setTarget(self.registeredView, self);
            self.skVtrLogin.setTarget(self.tapLogin, self);
            self.skPwdLab.displayAsPassword = self._isLockPwd = true;
            self.skKeFu.setTarget(self.keFuBtn, self);
            self.skLookPwd.setTarget(self.lookPwd, self);
            self.skForgotPwd.setTarget(self.openForgotView, self);
            self.skAccountLab.addEventListener(egret.Event.CHANGE, self.OnAccount, self);
            self.skAccountLab.addEventListener(egret.Event.FOCUS_IN, self.onFocus1, self);
            self.skPwdLab.addEventListener(egret.Event.CHANGE, self.OnPwd, self);
            self.skPwdLab.addEventListener(egret.Event.FOCUS_IN, self.onFocus2, self);
            self.skAccountLab.prompt = "请输入账号";
            self.skPwdLab.prompt = "请输入密码";
        };
        LoginAccount.prototype.onFocus1 = function (e) {
            this.skAccountLab.text = "";
        };
        LoginAccount.prototype.onFocus2 = function (e) {
            this.skPwdLab.text = "";
        };
        LoginAccount.prototype.OnAccount = function (e) {
            this.skAccountLab.text = e.target.text;
        };
        LoginAccount.prototype.OnPwd = function (e) {
            this.skPwdLab.text = e.target.text;
        };
        LoginAccount.prototype.keFuBtn = function () {
        };
        LoginAccount.prototype.registeredView = function () {
            var self = this;
            var view = new game.Registered();
            view.open(self);
        };
        LoginAccount.prototype.lookPwd = function () {
            var self = this;
            self.skPwdLab.displayAsPassword = self._isLockPwd = !self._isLockPwd;
            self.skLookPwd.icon = self._isLockPwd ? "login@txt_lookPwdD" : "login@txt_lookPwdb";
        };
        LoginAccount.prototype.openForgotView = function () {
            var self = this;
            var view = new game.ForgotPwd();
            view.open(self);
        };
        LoginAccount.prototype.tapLogin = function (item) {
            var self = this;
            var tag = item.tag;
            var name = tag == 1 /* visitor */ ? null : self.skAccountLab.text;
            var pwd = tag == 1 /* visitor */ ? null : self.skPwdLab.text;
            // if( !name || name.length<=0  ){
            // 	MsgBox.showBox( LangGrp.loginUI, langConsts.loginUI.inputname );
            // 	return;
            // }
            // if(!pwd || pwd.length<=0){
            //     MsgBox.showBox( LangGrp.loginUI, langConsts.loginUI.inputname );//请输入角色密码
            // 	return;
            // }
            // if( name.indexOf(" ")>=0 ||
            // 	name.indexOf("\n")>=0 || 
            // 	name.indexOf("\\n")>=0 || 
            // 	name.indexOf("\r")>=0 || 
            // 	name.indexOf("\\r")>=0 || 
            // 	name.indexOf("\"" )>=0 ){
            // 		MsgBox.showBox( LangGrp.loginUI, langConsts.loginUI.invalidchar );
            // 		return;
            // }
            var accMo = game.dataMgr.accMo;
            accMo.login(name, pwd);
        };
        return LoginAccount;
    }(game.UIFullFW));
    game.LoginAccount = LoginAccount;
    __reflect(LoginAccount.prototype, "game.LoginAccount");
})(game || (game = {}));
var game;
(function (game) {
    var LoginLayer = (function (_super) {
        __extends(LoginLayer, _super);
        function LoginLayer() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "LoginLayerSkin";
            return _this;
        }
        LoginLayer.prototype.onPartAdded = function () {
            var self = this;
            //添加侦听
            self.skEnter.setTarget(self.doLogin, self);
            self.skSel.setTarget(self.doSelSvr, self);
        };
        LoginLayer.prototype.openImpl = function () {
            var self = this;
            // let entryInfo = dataMgr.platMo.getCurEntry();
            // if( !entryInfo ) return;//没有服务器信息
            //self.skCurSvr.text = entryInfo[resConsts.SvrEntryEntity.name] + "   " + entryInfo[resConsts.SvrEntryEntity.area];
            //弹 维护提示
            //if( entryInfo[resConsts.SvrEntryEntity.isClose] )
            // {
            // 	dataMgr.platMo.loginGS();
            // }
        };
        LoginLayer.prototype.doLogin = function () {
            //let self = this;
            // let entryInfo = dataMgr.platMo.getCurEntry();
            // if( entryInfo )
            // {
            // 	dataMgr.platMo.loginGS();
            // }
            // else
            // {
            // 	//MsgBox.showBox( langMgr.getLocalString("userCheckServer") );
            // }
        };
        LoginLayer.prototype.doSelSvr = function () {
            this.delegate.showView(2 /* kLoginServer */);
        };
        return LoginLayer;
    }(game.UIFullFW));
    game.LoginLayer = LoginLayer;
    __reflect(LoginLayer.prototype, "game.LoginLayer");
})(game || (game = {}));
var game;
(function (game) {
    var LoginScene = (function (_super) {
        __extends(LoginScene, _super);
        function LoginScene() {
            var _this = _super.call(this) || this;
            var self = _this;
            //resMgr.loadShow = BusyLayer.getInst();
            //启动平台管理
            // notifiCenter.addListener( AccountMgr_EVT.startup, self.onPlatStartup, self, true );
            // AccountMgr.startup();
            self.startLogin();
            return _this;
        }
        LoginScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            // let loginBg = new cui.Image();
            // loginBg.source = "newbg";
            // self.addChild(loginBg);
            game.BusyLayer.getInst().setParent(self);
            //HttpClient.busyUI = BusyLayer.getInst();
            //TipsMgr.setParent(self, self);
            if (self._platStartup) {
                self.startLogin();
            }
        };
        /**
         * 平台管理启动完成
         * */
        LoginScene.prototype.onPlatStartup = function () {
            var self = this;
            self._platStartup = true;
            if (self._inited) {
                self.startLogin();
            }
        };
        //启动流程 出现界面---平台/内部登录---获取自己登录过服务器列表 ---（可选）选服界面时获取全部服务器列表
        LoginScene.prototype.startLogin = function () {
            var self = this;
            self.showView(0 /* kLoginAccount */);
            // notifiCenter.addListener( UserMo_EVT.no_user, function(){
            //     self.showView( LoginNavType.kLoginCreate );
            // }, self, true );
            // let platMo = dataMgr.platMo;
            // platMo.addListener(PlatMo_EVT.got_my_entrys, self.onMySvrFin, self, true);
            // if(AccountMgr.inner)
            // {
            //     self.showView(LoginNavType.kLoginAccount);
            // }
            // else
            // {
            //     if(!AccountMgr.isLogined){
            //         AccountMgr.login();
            //     }
            //     else{
            //         if( !dataMgr.platMo.syncMyEntrys() ){
            //             self.onMySvrFin();
            //         }
            //     }
            // }
        };
        /**
         * 获取自己登录过的服务器列表完成
         * 准备弹出登录服务器界面
         * */
        LoginScene.prototype.onMySvrFin = function () {
            var self = this;
            // let platMo = dataMgr.platMo;
            // if( platMo.account.isNew ){
            //     let entryData = platMo.getCurEntry();
            //     // if( entryData && !entryData[resConsts.SvrEntryEntity.isClose] ){
            //     //     platMo.loginGS();
            //     //     return;
            //     // }
            // }
            self.showView(1 /* kLoginLayer */);
        };
        LoginScene.prototype.dispose = function () {
            var self = this;
            if (!self._inited || self._disposed) {
                return;
            }
            //TipsMgr.setParent( null, null );
            game.BusyLayer.getInst().setParent(null);
            //dataMgr.platMo.rmvAllListener( self );
            game.notifiCenter.rmvAllListener(self);
            _super.prototype.dispose.call(this);
        };
        //-----------------------------------------------------------------------------
        LoginScene.prototype.showView = function (page) {
            var self = this;
            var uiView;
            switch (page) {
                case 0 /* kLoginAccount */:
                    uiView = new game.LoginAccount();
                    break;
                case 1 /* kLoginLayer */:
                    uiView = new game.LoginLayer();
                    break;
                case 2 /* kLoginServer */:
                    uiView = new game.LoginServer();
                    break;
                case 3 /* kLoginCreate */:
                    uiView = new game.CreateRole();
                    break;
            }
            uiView.delegate = self;
            uiView.open(self, null, self.onNormalOpen, self);
        };
        LoginScene.prototype.onNormalOpen = function (uiView) {
            var self = this;
            var popView = self._curView;
            if (popView) {
                popView.dispose();
                self._curView = null;
            }
            self._curView = uiView;
        };
        return LoginScene;
    }(game.BaseScene));
    game.LoginScene = LoginScene;
    __reflect(LoginScene.prototype, "game.LoginScene", ["game.LoginDelegate"]);
})(game || (game = {}));
var game;
(function (game) {
    var LoginServer = (function (_super) {
        __extends(LoginServer, _super);
        function LoginServer() {
            var _this = _super.call(this) || this;
            //public skClose:cui.Button;
            _this._index = 0;
            //dataMgr.platMo.syncEntrys();
            var self = _this;
            self.name = "LoginServer";
            self.skinName = "LoginServerSkin";
            return _this;
        }
        LoginServer.prototype.onPartAdded = function () {
            var self = this;
            //self.skBClose.setTarget(self.tapClose, self);
            var collect = self._rangeData = new cui.ArrayCollection();
            var list = self.skRange;
            list.dataProvider = collect;
            list.itemRender = LoginServerRangeItem;
            collect = self._svrData = new cui.ArrayCollection();
            list = self.skServer;
            list.dataProvider = collect;
            list.itemRender = LoginServerItem;
            list.itemSkinName = "serverItemSkin";
            collect = self._adviceData = new cui.ArrayCollection();
            list = self.skAdvice;
            list.dataProvider = collect;
            list.itemRender = LoginServerItem;
            list.itemSkinName = "LoginAdviceSerSkin";
            // self.updateRangeList();
            // self.updateServerList();
            // self.updateAdviceList();
        };
        return LoginServer;
    }(game.UIFWBase));
    game.LoginServer = LoginServer;
    __reflect(LoginServer.prototype, "game.LoginServer");
    var LoginServerItem = (function (_super) {
        __extends(LoginServerItem, _super);
        function LoginServerItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoginServerItem.prototype.onPartAdded = function () {
            var self = this;
            self.skBtnMask.setTarget(self.tapBtnMask, self);
        };
        LoginServerItem.prototype.tapBtnMask = function () {
            var self = this;
            var showData = self.data;
            //showData.delegate.clickListServer(showData);
        };
        LoginServerItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var showData = self.data;
            var serInfo = showData.serverData;
            // let isClose = serInfo[resConsts.SvrEntryEntity.isClose];
            // let isNew = serInfo[resConsts.SvrEntryEntity.isNew];
            // self.skLabelContent.text = serInfo[resConsts.SvrEntryEntity.name]+"-"+serInfo[resConsts.SvrEntryEntity.area];
            // self.skIcoStatus.source = isClose ? resMgr.getFullName("ld_img_7") : resMgr.getFullName("ld_img_6");
            // if( isClose )
            // {
            // 	self.skIcoNew.source = resMgr.getFullName("ld_img_8");
            // }
            // else if( isNew )
            // {
            // 	self.skIcoNew.source = resMgr.getFullName("ld_img_3");
            // }
            // else
            // {
            // 	self.skIcoNew.source = resMgr.getFullName("ld_img_9");
            // }
            // self.skImgSelected.source = showData.select ? resMgr.getFullName("ld_bg_8"):resMgr.getFullName("ld_bg_4");
        };
        return LoginServerItem;
    }(cui.DataItem));
    game.LoginServerItem = LoginServerItem;
    __reflect(LoginServerItem.prototype, "game.LoginServerItem");
    var LoginServerRangeItem = (function (_super) {
        __extends(LoginServerRangeItem, _super);
        function LoginServerRangeItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "skins.skgame.LoginServerRangeItemSkin";
            return _this;
        }
        LoginServerRangeItem.prototype.onPartAdded = function () {
            var self = this;
            self.skBtnRange.setTarget(self.tapBtnRange, self);
        };
        LoginServerRangeItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            if (!self._inited)
                return;
            var showData = self.data;
            self.skLabelName.text = showData.text;
            //self.skImgBg.source = showData.select?resMgr.getFullName("ld_btn_1"):resMgr.getFullName("c_btn_19");
        };
        LoginServerRangeItem.prototype.tapBtnRange = function () {
            var self = this;
            var showData = self.data;
            if (showData.delegate) {
                //showData.delegate.serverRangeChange(showData);
            }
        };
        LoginServerRangeItem.ON_BTN_RANGE = "ON_BTN_RANGE";
        return LoginServerRangeItem;
    }(cui.DataItem));
    game.LoginServerRangeItem = LoginServerRangeItem;
    __reflect(LoginServerRangeItem.prototype, "game.LoginServerRangeItem");
})(game || (game = {}));
var game;
(function (game) {
    var Registered = (function (_super) {
        __extends(Registered, _super);
        function Registered() {
            var _this = _super.call(this) || this;
            _this.skinName = "registeredSkin";
            _this._isAgreed = false;
            return _this;
        }
        Registered.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skGetCode.setTarget(self.getCode, self);
            self.skSure.setTarget(self.enSure, self);
            self.skPhone.addEventListener(egret.Event.CHANGE, self.OnChangePhone, self);
            self.skCode.addEventListener(egret.Event.CHANGE, self.OnChangeCode, self);
            self.skPwd.addEventListener(egret.Event.CHANGE, self.OnChangePwd, self);
            self.skAgainPwd.addEventListener(egret.Event.CHANGE, self.OnChangeAgainPwd, self);
            self.skchoose.setTarget(self.chooseBtn, self);
            self.skClose.setTarget(self.close, self);
            self.skPhone.prompt = "请输入手机号码";
            self.skCode.prompt = "请输入验证码";
            self.skPwd.prompt = "请输入6-20位的字符";
            self.skAgainPwd.prompt = "请输入6-20位的字符";
        };
        Registered.prototype.chooseBtn = function () {
            var self = this;
            self._isAgreed = !self._isAgreed;
            self.skchoose.icon = self._isAgreed ? "login@registeredB" : "login@registeredD";
        };
        Registered.prototype.OnChangePhone = function (e) {
            this.skPhone.text = e.target.text;
        };
        Registered.prototype.OnChangeCode = function (e) {
            this.skCode.text = e.target.text;
        };
        Registered.prototype.OnChangePwd = function (e) {
            this.skPwd.text = e.target.text;
        };
        Registered.prototype.OnChangeAgainPwd = function (e) {
            this.skPwd.text = e.target.text;
        };
        Registered.prototype.getCode = function () {
            var self = this;
            //首先判断手机号位数是否正确再发送
        };
        Registered.prototype.enSure = function () {
            var self = this;
            //挨个验证前面四个是否满足条件且同意游戏协议
        };
        return Registered;
    }(game.UIPopup));
    game.Registered = Registered;
    __reflect(Registered.prototype, "game.Registered");
})(game || (game = {}));
var game;
(function (game) {
    var ItemTile = (function (_super) {
        __extends(ItemTile, _super);
        function ItemTile(skinName) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = skinName;
            return _this;
        }
        ItemTile.prototype.hasProp = function (key) {
            return ItemTile.props.indexOf(key) >= 0;
        };
        Object.defineProperty(ItemTile.prototype, "icon", {
            set: function (val) {
                var ctrl = this.skIcon;
                if (ctrl) {
                    ctrl.source = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemTile.prototype, "bg", {
            set: function (val) {
                var ctrl = this.skBg;
                if (ctrl) {
                    ctrl.source = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemTile.prototype, "sel", {
            set: function (val) {
                var ctrl = this.skSel;
                if (ctrl) {
                    ctrl.visible = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ItemTile.prototype, "ani", {
            set: function (val) {
                var ctrl = this.skAni;
                if (ctrl) {
                    ctrl.aniName = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        ItemTile.props = ["tag", "ud", "bg", "icon", "sel", "ani"];
        return ItemTile;
    }(cui.UITile));
    game.ItemTile = ItemTile;
    __reflect(ItemTile.prototype, "game.ItemTile");
})(game || (game = {}));
var game;
(function (game) {
    var HttpUtil;
    (function (HttpUtil) {
        HttpUtil.svrURL = "";
        function accLogin(args, showBusy, cb, target) {
            var postData = makeSign(args.nm) + "&channel=" + args.channel;
            reqURL("/Web/WebLogin.aspx", postData, showBusy, cb, target);
        }
        HttpUtil.accLogin = accLogin;
        function checkCode(args, showBusy, cb, target) {
            var postData = makeSign(args.phone);
            reqURL("/Web/WebCode.aspx", postData, showBusy, cb, target);
        }
        HttpUtil.checkCode = checkCode;
        function bindAcc(args, showBusy, cb, target) {
            var signedPsw = md5(args.pwd + "NANA1314");
            var data = args.nm + ':' + args.phone + ':' + args.checkcode + ':' + signedPsw;
            reqURL("/Web/WebBindAccount.aspx", makeSign(data), showBusy, cb, target);
        }
        HttpUtil.bindAcc = bindAcc;
        function getIp(showBusy, cb, target) {
            reqURL("/Common/GetP.aspx", "", showBusy, cb, target);
        }
        HttpUtil.getIp = getIp;
        function makeSign(data) {
            var sign = md5(data + "5C4BEE401828DF1D920F9CFD323C9AFA");
            return "data=" + data + "&sign=" + sign;
        }
        function reqURL(url, data, showBusy, cb, target) {
            var request = new egret.HttpRequest();
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(HttpUtil.svrURL + url, egret.HttpMethod.POST);
            request.addEventListener(egret.Event.COMPLETE, function (e) {
                if (showBusy && HttpUtil.busyUI)
                    HttpUtil.busyUI.hideBusy();
                var req = e.currentTarget;
                var data = JSON.parse(req.response);
                cb.call(target, data);
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
                if (showBusy && HttpUtil.busyUI)
                    HttpUtil.busyUI.hideBusy();
                cb.call(target);
            }, this);
            if (showBusy && HttpUtil.busyUI)
                HttpUtil.busyUI.showBusy();
            request.send(data);
        }
        HttpUtil.reqURL = reqURL;
    })(HttpUtil = game.HttpUtil || (game.HttpUtil = {}));
})(game || (game = {}));
var game;
(function (game) {
    var Net;
    (function (Net) {
        var _sock;
        var _handles = {};
        function init(ip) {
            _sock = createSock('ws://' + ip);
        }
        Net.init = init;
        function createSock(url) {
            var sock = new egret.WebSocket;
            sock.type = egret.WebSocket.TYPE_BINARY;
            sock.addEventListener(egret.Event.CONNECT, function (e) {
                game.notifiCenter.postEvent("succ" /* CONN_SUCC */);
            }, Net);
            sock.addEventListener(egret.Event.CLOSE, function (e) {
                game.notifiCenter.postEvent("close" /* CONN_CLOSE */, e.data);
            }, Net);
            sock.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
                game.notifiCenter.postEvent("fail" /* CONN_FAIL */, e.data);
            }, Net);
            sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, onData, Net);
            if (url)
                sock.connectByUrl(url);
            return sock;
        }
        //---------------------------------------------------
        function regHandle(msgId, handler, tar) {
            _handles[msgId] = { fun: handler, tar: tar };
        }
        Net.regHandle = regHandle;
        function unregHandle(msgId) {
            delete _handles[msgId];
        }
        Net.unregHandle = unregHandle;
        function onData() {
            var buf = new egret.ByteArray();
            buf.endian = egret.Endian.LITTLE_ENDIAN;
            _sock.readBytes(buf);
            var msg = game.Package.decode(buf);
            var msgId = msg.id;
            console.log("receive id=" + msgId);
            var handle = _handles[msgId];
            if (handle) {
                var data = game.Protobuf.decode(msgId, buf.position + msg.len, buf);
                handle.fun.call(handle.tar, data);
            }
            else {
                egret.log("msg not handle id=" + msgId);
            }
        }
        //----------------------------------------------------
        //let _msgs:any[] = [];
        function sendMsg(msgId, args) {
            //console.log( "SendMsg msgId=" + msgId + "  args=" + JSON.stringify(args) );
            var buf = new egret.ByteArray();
            buf.endian = egret.Endian.LITTLE_ENDIAN;
            var start = 6;
            buf.position = start;
            game.Protobuf.encode(msgId, args, buf);
            var len = buf.position - start;
            buf.position = 0;
            game.Package.encode(msgId, len, buf);
            _sock.writeBytes(buf);
            _sock.flush();
        }
        Net.sendMsg = sendMsg;
    })(Net = game.Net || (game.Net = {}));
})(game || (game = {}));
var game;
(function (game) {
    var Package;
    (function (Package) {
        function encode(msgId, len, buf) {
            buf.writeInt(msgId);
            buf.writeShort(len);
        }
        Package.encode = encode;
        function decode(data) {
            var msgId = data.readInt();
            var msgLen = data.readShort();
            return { id: msgId, len: msgLen };
        }
        Package.decode = decode;
    })(Package = game.Package || (game.Package = {}));
})(game || (game = {}));
var game;
(function (game) {
    var Protobuf;
    (function (Protobuf) {
        function addEncodeProtos(routeProtos, typeProtos) {
            Encoder.init(routeProtos, typeProtos);
        }
        Protobuf.addEncodeProtos = addEncodeProtos;
        function addDecodeProtos(routeProtos, typeProtos) {
            Decoder.init(routeProtos, typeProtos);
        }
        Protobuf.addDecodeProtos = addDecodeProtos;
        function encode(msgId, data, buff) {
            return Encoder.encode(msgId, data, buff);
        }
        Protobuf.encode = encode;
        function decode(msgId, len, data) {
            return Decoder.decode(msgId, len, data);
        }
        Protobuf.decode = decode;
        //--------------------------------------------------------
        var Encoder;
        (function (Encoder) {
            var _routeProtos;
            //let _tpProtos:ProtosList
            function init(routeProtos, typeProtos) {
                if (_routeProtos) {
                    for (var key in routeProtos) {
                        _routeProtos[key] = routeProtos[key];
                    }
                }
                else {
                    _routeProtos = routeProtos;
                }
                //_tpProtos = typeProtos || {};
            }
            Encoder.init = init;
            function encode(route, msg, buff) {
                // Get protos from protos map use the route as key
                var protos = _routeProtos[route];
                if (!protos) {
                    console.error("error: route=" + route + "  protos not exist");
                    return;
                }
                encodeMsg(buff, protos, msg);
                return buff;
            }
            Encoder.encode = encode;
            function encodeMsg(buff, protos, msg) {
                for (var name_1 in msg) {
                    var proto = protos[name_1];
                    if (proto) {
                        var protoTp = proto[1 /* type */];
                        var tag = makeTag(protoTp, proto[0 /* tag */]);
                        var val = msg[name_1];
                        if (proto[3 /* isArr */]) {
                            encodeArray(buff, protoTp, val, tag);
                        }
                        else {
                            Coder.writeUInt32(buff, tag);
                            encodeProp(buff, protoTp, val);
                        }
                    }
                }
            }
            function encodeProp(buff, protoTp, value) {
                switch (protoTp) {
                    case 0 /* uint32 */:
                        Coder.writeUInt32(buff, value);
                        break;
                    case 1 /* int32 */:
                        Coder.writeInt32(buff, value);
                        break;
                    case 2 /* bool */:
                        Coder.writeBool(buff, value);
                        break;
                    case 5 /* string */:
                        var byteLen = utf8.length(value);
                        Coder.writeUInt32(buff, byteLen);
                        utf8.write(value, buff);
                        break;
                }
            }
            function encodeArray(buff, protoTp, valArr, tag) {
                var i = 0, arrLen = valArr.length;
                //if( protoTp<ProtoType.msgstart ){
                Coder.writeUInt32(buff, tag);
                Coder.writeUInt32(buff, arrLen);
                switch (protoTp) {
                    case 0 /* uint32 */:
                        for (; i < arrLen; ++i) {
                            Coder.writeUInt32(buff, valArr[i]);
                        }
                        break;
                    case 1 /* int32 */:
                        for (; i < arrLen; ++i) {
                            Coder.writeInt32(buff, valArr[i]);
                        }
                        break;
                    case 2 /* bool */:
                        for (; i < arrLen; ++i) {
                            buff.writeByte(valArr[i] ? 1 : 0);
                        }
                        break;
                    case 5 /* string */:
                        for (; i < arrLen; ++i) {
                            var str = valArr[i];
                            var byteLen = utf8.length(str);
                            Coder.writeUInt32(buff, byteLen);
                            utf8.write(str, buff);
                        }
                        break;
                }
                //}
                // else{
                //     let tyProtos = _tpProtos[protoTp];
                //     for( ; i<arrLen; ++i ){
                //         Coder.writeVarint32(buff, tag);
                //         encodeMsg(opData, tyProtos, valArr[i]);
                //     }
                // }
            }
            function makeTag(type, tag) {
                var wireTp = 2;
                switch (type) {
                    case 0 /* uint32 */:
                    case 1 /* int32 */:
                    case 2 /* bool */:
                        wireTp = 0;
                        break;
                }
                return (tag << 3) | wireTp;
            }
        })(Encoder || (Encoder = {}));
        //----------------------------------------------------------------
        var Decoder;
        (function (Decoder) {
            var _routeProtos;
            var _tpProtos;
            function init(routeProtos, typeProtos) {
                if (_routeProtos) {
                    for (var key in routeProtos) {
                        _routeProtos[key] = routeProtos[key];
                    }
                }
                else {
                    _routeProtos = routeProtos;
                }
                if (_tpProtos) {
                    if (typeProtos) {
                        for (var key in typeProtos) {
                            _tpProtos[key] = typeProtos[key];
                        }
                    }
                }
                else {
                    _tpProtos = typeProtos || {};
                }
            }
            Decoder.init = init;
            function decode(route, len, buff) {
                var protos = _routeProtos[route];
                if (!protos) {
                    console.error("error: route=" + route + "  protos not exist");
                    return;
                }
                return decodeMsg(buff, len, protos);
            }
            Decoder.decode = decode;
            function decodeMsg(buff, len, protos) {
                var msg = {};
                while (buff.position < len) {
                    var head = Coder.readUInt32(buff);
                    var tag = head >>> 3;
                    var proto = protos[tag];
                    if (!proto) {
                        // let protoStr = JSON.stringify( protos );
                        // console.error( `error: decodeMsg tag=${tag} not exist  protos=${protoStr}`);
                        skipType(buff, len, head & 7);
                        continue;
                    }
                    var protoTp = proto[1 /* type */];
                    var protoKey = proto[0 /* name */];
                    if (proto[3 /* isArr */]) {
                        //arr length
                        var arr = msg[protoKey];
                        if (!arr) {
                            arr = [];
                            msg[protoKey] = arr;
                        }
                        decodeArr(buff, protoTp, arr);
                    }
                    else {
                        msg[protoKey] = decodeProp(buff, protoTp);
                    }
                }
                return msg;
            }
            function skipType(buff, validLen, wireType) {
                var len = 0;
                switch (wireType) {
                    case 0:
                        break;
                    case 1:
                        len = 8;
                        break;
                    case 2:
                        len = Coder.readUInt32(buff);
                        break;
                    case 5:
                        len = 4;
                        break;
                    default:
                        throw Error("invalid wire type " + wireType + " at offset " + this.pos);
                }
                if (len) {
                    var tmpPos = buff.position + len;
                    if (tmpPos > validLen)
                        tmpPos = validLen;
                    buff.position = tmpPos;
                }
                else {
                    while (buff.position < validLen) {
                        if (buff.readUnsignedByte() < 128)
                            break;
                    }
                }
            }
            ;
            function decodeProp(buff, tp) {
                switch (tp) {
                    case 0 /* uint32 */:
                        return Coder.readUInt32(buff);
                    case 1 /* int32 */:
                        return Coder.readInt32(buff);
                    case 2 /* bool */:
                        return Coder.readBool(buff);
                    case 3 /* int64 */:
                        return Coder.readInt64(buff);
                    case 5 /* string */:
                        var strLen = Coder.readUInt32(buff);
                        return utf8.read(buff, strLen);
                    default:
                        var tyProtos = _tpProtos[tp];
                        var msgLen = Coder.readUInt32(buff);
                        return decodeMsg(buff, buff.position + msgLen, tyProtos);
                }
            }
            function decodeArr(buff, tp, ret) {
                var i = 0, tmpVal;
                if (tp < 10 /* msgstart */) {
                    var arrLen = Coder.readUInt32(buff);
                    switch (tp) {
                        case 0 /* uint32 */:
                        case 1 /* int32 */:
                            for (; i < arrLen; ++i) {
                                tmpVal = Coder.readUInt32(buff);
                                ret.push(tmpVal);
                            }
                            break;
                        case 3 /* int64 */:
                            break;
                        case 2 /* bool */:
                            for (; i < arrLen; ++i) {
                                tmpVal = !!buff.readUnsignedByte();
                                ret.push(tmpVal);
                            }
                            break;
                        case 5 /* string */:
                            for (; i < arrLen; ++i) {
                                var strLen = Coder.readUInt32(buff);
                                tmpVal = utf8.read(buff, strLen);
                                ret.push(tmpVal);
                            }
                            break;
                    }
                }
                else {
                    var tyProtos = _tpProtos[tp];
                    var msgLen = Coder.readUInt32(buff);
                    tmpVal = decodeMsg(buff, buff.position + msgLen, tyProtos);
                    ret.push(tmpVal);
                }
            }
            // function getHead( buff:egret.ByteArray ):number[] {
            //     let tag = Coder.readVarint32( buff );
            //     return [tag & 0x7,tag >> 3];
            // }
        })(Decoder || (Decoder = {}));
    })(Protobuf = game.Protobuf || (game.Protobuf = {}));
    var Coder;
    (function (Coder) {
        function readUInt32(buf) {
            return readVarint32(buf);
        }
        Coder.readUInt32 = readUInt32;
        ;
        function readInt32(buf) {
            return readVarint32(buf) | 0;
        }
        Coder.readInt32 = readInt32;
        ;
        function readBool(buf) {
            return !!buf.readUnsignedByte();
        }
        Coder.readBool = readBool;
        ;
        function readInt64(buf) {
            var bits = readLongVarint(buf);
            return longBits2Num(bits, false);
        }
        Coder.readInt64 = readInt64;
        ;
        function writeUInt32(buf, val) {
            writeVarint32(buf, val);
        }
        Coder.writeUInt32 = writeUInt32;
        function writeInt32(buf, val) {
            if (true && val < 0) {
                egret.error("encode not todo native number");
            }
            writeVarint32(buf, val);
        }
        Coder.writeInt32 = writeInt32;
        function writeBool(buf, val) {
            buf.writeByte(val ? 1 : 0);
        }
        Coder.writeBool = writeBool;
        ;
        function writeVarint32(buf, val) {
            while (val > 127) {
                buf.writeByte(val & 127 | 128);
                val >>>= 7;
            }
            buf.writeByte(val);
        }
        function readVarint32(buf) {
            var n = 0, m = 0, bit = 0;
            while (1) {
                m = buf.readUnsignedByte();
                n = n + ((m & 127) << bit);
                if (m < 128)
                    break;
                bit += 7;
            }
            return n;
        }
        function readLongVarint(buf) {
            // tends to deopt with local vars for octet etc.
            var bits = { lo: 0, hi: 0 };
            var i = 0, tmp = 0;
            if (buf.length - buf.position > 4) {
                for (; i < 4; ++i) {
                    // 1st..4th
                    tmp = buf.readUnsignedByte();
                    bits.lo = (bits.lo | (tmp & 127) << i * 7) >>> 0;
                    if (tmp < 128)
                        return bits;
                }
                // 5th
                tmp = buf.readUnsignedByte();
                bits.lo = (bits.lo | (tmp & 127) << 28) >>> 0;
                bits.hi = (bits.hi | (tmp & 127) >> 4) >>> 0;
                if (tmp < 128)
                    return bits;
                i = 0;
            }
            else {
                for (; i < 3; ++i) {
                    // 1st..3th
                    tmp = buf.readUnsignedByte();
                    bits.lo = (bits.lo | (tmp & 127) << i * 7) >>> 0;
                    if (tmp < 128)
                        return bits;
                }
                // 4th
                tmp = buf.readUnsignedByte();
                bits.lo = (bits.lo | (tmp & 127) << i * 7) >>> 0;
                return bits;
            }
            if (this.len - this.pos > 4) {
                for (; i < 5; ++i) {
                    // 6th..10th
                    tmp = buf.readUnsignedByte();
                    bits.hi = (bits.hi | (tmp & 127) << i * 7 + 3) >>> 0;
                    if (tmp < 128)
                        return bits;
                }
            }
            else {
                for (; i < 5; ++i) {
                    // 6th..10th
                    tmp = buf.readUnsignedByte();
                    bits.hi = (bits.hi | (tmp & 127) << i * 7 + 3) >>> 0;
                    if (tmp < 128)
                        return bits;
                }
            }
            /* istanbul ignore next */
            throw Error("invalid varint encoding");
        }
        function longBits2Num(val, isUnsigned) {
            if (!isUnsigned && val.hi >>> 31) {
                var lo = ~val.lo + 1 >>> 0, hi = ~val.hi >>> 0;
                if (!lo)
                    hi = hi + 1 >>> 0;
                return -(lo + hi * 4294967296);
            }
            return val.lo + val.hi * 4294967296;
        }
        ;
    })(Coder || (Coder = {}));
    var utf8;
    (function (utf8) {
        /**
         * Calculates the UTF8 byte length of a string.
         * @param {string} str String
         * @returns {number} Byte length
         */
        function length(str) {
            var len = 0, c = 0;
            for (var i = 0, strLen = str.length; i < strLen; ++i) {
                c = str.charCodeAt(i);
                if (c < 128)
                    len += 1;
                else if (c < 2048)
                    len += 2;
                else if ((c & 0xFC00) === 0xD800 && (str.charCodeAt(i + 1) & 0xFC00) === 0xDC00) {
                    ++i;
                    len += 4;
                }
                else
                    len += 3;
            }
            return len;
        }
        utf8.length = length;
        ;
        /**
         * Reads UTF8 bytes as a string.
         * @param {egret.ByteArray} buffer Source buffer
         * @param {number} len Source len
         * @returns {string} String read
         */
        function read(buff, len) {
            if (len < 1)
                return "";
            var end = buff.position + len;
            var i = 0, t = 0;
            var chunk = [];
            var parts = null;
            while (buff.position < end) {
                t = buff.readUnsignedByte();
                if (t < 128)
                    chunk[i++] = t;
                else if (t > 191 && t < 224)
                    chunk[i++] = (t & 31) << 6 | buff.readUnsignedByte() & 63;
                else if (t > 239 && t < 365) {
                    t = ((t & 7) << 18 | (buff.readUnsignedByte() & 63) << 12 | (buff.readUnsignedByte() & 63) << 6 | buff.readUnsignedByte() & 63) - 0x10000;
                    chunk[i++] = 0xD800 + (t >> 10);
                    chunk[i++] = 0xDC00 + (t & 1023);
                }
                else
                    chunk[i++] = (t & 15) << 12 | (buff.readUnsignedByte() & 63) << 6 | buff.readUnsignedByte() & 63;
                if (i > 8191) {
                    (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
                    i = 0;
                }
            }
            if (parts) {
                if (i)
                    parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
                return parts.join("");
            }
            return String.fromCharCode.apply(String, chunk.slice(0, i));
        }
        utf8.read = read;
        ;
        /**
         * Writes a string as UTF8 bytes.
         * @param {string} string Source string
         * @param {egret.ByteArray} buffer Destination buffer
         * @returns {number} Bytes written
         */
        function write(str, buff) {
            var start = buff.position;
            var c1 = 0, c2 = 0; // character 1  character 2
            for (var i = 0, len = str.length; i < len; ++i) {
                c1 = str.charCodeAt(i);
                if (c1 < 128) {
                    buff.writeByte(c1);
                }
                else if (c1 < 2048) {
                    buff.writeByte(c1 >> 6 | 192);
                    buff.writeByte(c1 & 63 | 128);
                }
                else if ((c1 & 0xFC00) === 0xD800 && ((c2 = str.charCodeAt(i + 1)) & 0xFC00) === 0xDC00) {
                    c1 = 0x10000 + ((c1 & 0x03FF) << 10) + (c2 & 0x03FF);
                    ++i;
                    buff.writeByte(c1 >> 18 | 240);
                    buff.writeByte(c1 >> 12 & 63 | 128);
                    buff.writeByte(c1 >> 6 & 63 | 128);
                    buff.writeByte(c1 & 63 | 128);
                }
                else {
                    buff.writeByte(c1 >> 12 | 224);
                    buff.writeByte(c1 >> 6 & 63 | 128);
                    buff.writeByte(c1 & 63 | 128);
                }
            }
            return buff.position - start;
        }
        utf8.write = write;
        ;
    })(utf8 || (utf8 = {}));
})(game || (game = {}));
var NET_CONF;
(function (NET_CONF) {
    NET_CONF.c2sEncode = { "301": { "packet_id": [1, 0, 1, 0, 301] }, "5001": { "packet_id": [1, 0, 1, 0, 5001], "account": [2, 5, 1, 0], "token": [3, 5, 1, 0], "sign": [4, 5, 1, 0], "platform": [5, 5, 1, 0], "login_platform": [6, 5, 1, 0], "machine_code": [7, 5, 1, 0], "machine_type": [8, 5, 1, 0], "channelid": [9, 1, 1, 0] }, "5003": { "packet_id": [1, 0, 1, 0, 5003] }, "5004": { "packet_id": [1, 0, 1, 0, 5004], "gameid": [2, 1, 1, 0], "gamever": [3, 1, 1, 0], "roomid": [4, 1, 1, 0, -1] }, "5005": { "packet_id": [1, 0, 1, 0, 5005], "command": [2, 5, 1, 0] }, "5006": { "packet_id": [1, 0, 1, 0, 5006], "orderid": [2, 5, 1, 0] }, "5007": { "packet_id": [1, 0, 1, 0, 5007], "pay_type": [2, 1, 1, 0], "pay_value": [3, 1, 1, 0] }, "5008": { "packet_id": [1, 0, 1, 0, 5008] }, "5010": { "packet_id": [1, 0, 1, 0, 5010], "headStr": [2, 5, 1, 0] }, "5011": { "packet_id": [1, 0, 1, 0, 5011], "nickName": [2, 5, 1, 0] } };
    NET_CONF.s2cDecode = { "404": { "1": ["packet_id", 0, 1, 0, 404] }, "444": { "1": ["packet_id", 0, 1, 0, 444] }, "7501": { "1": ["packet_id", 0, 1, 0, 5001], "2": ["result", 1, 1, 0], "3": ["servertime", 1, 1, 0], "4": ["gaming", 1, 1, 0], "5": ["ver", 5, 1, 0] }, "7503": { "1": ["packet_id", 0, 1, 0, 7503], "2": ["account_info", 11, 1, 0], "3": ["game_list", 10, 0, 1], "4": ["gaming", 1, 1, 0] }, "7504": { "1": ["packet_id", 0, 1, 0, 7504], "2": ["result", 1, 1, 0, 2] }, "7505": { "1": ["packet_id", 0, 1, 0, 7505], "2": ["result", 1, 1, 0, 2] }, "7506": { "1": ["packet_id", 0, 1, 0, 7506], "2": ["result", 1, 1, 0, 2], "3": ["pay_type", 1, 1, 0], "4": ["pay_value", 1, 1, 0], "5": ["vip_exp", 1, 1, 0], "6": ["orderid", 5, 1, 0] }, "7507": { "1": ["packet_id", 0, 1, 0, 7507], "2": ["shutdown", 2, 1, 0] }, "7509": { "1": ["packet_id", 0, 1, 0, 7509], "2": ["headstr", 5, 1, 0], "3": ["result", 1, 1, 0] }, "7510": { "1": ["packet_id", 0, 1, 0, 7510], "2": ["nickName", 5, 1, 0], "3": ["result", 1, 1, 0] } };
    NET_CONF.typeDecode = { "10": { "1": ["gameid", 1, 1, 0], "2": ["gamever", 1, 1, 0], "3": ["curOnlineNum", 1, 1, 0], "4": ["isHot", 2, 1, 0] }, "11": { "1": ["aid", 1, 1, 0], "2": ["channelId", 1, 1, 0], "3": ["nickname", 5, 1, 0], "4": ["gold", 3, 1, 0], "5": ["viplvl", 1, 1, 0], "6": ["vipexp", 1, 1, 0], "8": ["icon_custom", 5, 1, 0], "9": ["sex", 1, 1, 0], "14": ["Ticket", 1, 1, 0], "16": ["curPhotoFrameId", 1, 1, 0], "19": ["payids", 1, 0, 1], "20": ["isSafeDepositBoxPwdEmpty", 2, 1, 0], "21": ["safeBoxGold", 3, 1, 0], "22": ["collected", 1, 1, 0], "26": ["updateNicknameCount", 1, 1, 0], "27": ["isBindMobilePhone", 2, 1, 0], "36": ["create_time", 1, 1, 0], "44": ["Privilege", 1, 1, 0], "46": ["lastGameId", 1, 1, 0], "47": ["isFormal", 2, 1, 0, 1], "48": ["BindInfo", 5, 1, 0], "49": ["RealName", 5, 1, 0], "52": ["Recharged", 1, 1, 0], "53": ["inviter_id", 1, 1, 0], "54": ["water", 1, 1, 0], "55": ["inviter_reward_count", 1, 1, 0], "56": ["withdraw", 1, 1, 0], "57": ["sevenday_done", 2, 1, 0], "58": ["quest_list", 1, 0, 1], "59": ["limit_time_photo", 1, 1, 0], "60": ["ipinfo", 5, 1, 0], "61": ["inviter_reward", 3, 1, 0] } };
})(NET_CONF || (NET_CONF = {}));
var Base64;
(function (Base64) {
    //----------------base64--------------
    var base64Tab = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
        'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
        'w', 'x', 'y', 'z', '0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '+', '/'];
    // export function base64Encode(str:string):string
    // {
    //     var utf8 = utf16TpUtf8(str); // 转成UTF8
    //     var i = 0; // 遍历索引
    //     var len = utf8.length;
    //     var res = [];
    //     var table = base64Tab;
    //     while (i < len) {
    //         var c1 = utf8.charCodeAt(i++) & 0xFF;
    //         res.push(table[c1 >> 2]);
    //         // 需要补2个=
    //         if (i == len) {
    //             res.push(table[(c1 & 0x3) << 4]);
    //             res.push('==');
    //             break;
    //         }
    //         var c2 = utf8.charCodeAt(i++);
    //         // 需要补1个=
    //         if (i == len) {
    //             res.push(table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
    //             res.push(table[(c2 & 0x0F) << 2]);
    //             res.push('=');
    //             break;
    //         }
    //         var c3 = utf8.charCodeAt(i++);
    //         res.push(table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
    //         res.push(table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
    //         res.push(table[c3 & 0x3F]);
    //     }
    //     return res.join('');
    // }
    function decode(str) {
        var len = str.length;
        var i = 0;
        var res = [];
        var table = base64Tab;
        while (i < len) {
            var code1 = table.indexOf(str.charAt(i++));
            var code2 = table.indexOf(str.charAt(i++));
            var code3 = table.indexOf(str.charAt(i++));
            var code4 = table.indexOf(str.charAt(i++));
            var c1 = (code1 << 2) | (code2 >> 4);
            var c2 = ((code2 & 0xF) << 4) | (code3 >> 2);
            var c3 = ((code3 & 0x3) << 6) | code4;
            res.push(String.fromCharCode(c1));
            if (code3 != 64) {
                res.push(String.fromCharCode(c2));
            }
            if (code4 != 64) {
                res.push(String.fromCharCode(c3));
            }
        }
        return utf8TpUtf16(res.join(''));
    }
    Base64.decode = decode;
    // function utf16TpUtf8(str:string):string
    // {
    //     var res = [], len = str.length;
    //     for (var i = 0; i < len; i++) {
    //         var code = str.charCodeAt(i);
    //         if (code > 0x0000 && code <= 0x007F) {
    //             // 单字节，这里并不考虑0x0000，因为它是空字节
    //             // U+00000000 – U+0000007F  0xxxxxxx
    //             res.push(str.charAt(i));
    //         } else if (code >= 0x0080 && code <= 0x07FF) {
    //             // 双字节
    //             // U+00000080 – U+000007FF  110xxxxx 10xxxxxx
    //             // 110xxxxx
    //             var byte1 = 0xC0 | ((code >> 6) & 0x1F);
    //             // 10xxxxxx
    //             var byte2 = 0x80 | (code & 0x3F);
    //             res.push(
    //                 String.fromCharCode(byte1),
    //                 String.fromCharCode(byte2)
    //             );
    //         } else if (code >= 0x0800 && code <= 0xFFFF) {
    //             // 三字节
    //             // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx
    //             // 1110xxxx
    //             var byte1 = 0xE0 | ((code >> 12) & 0x0F);
    //             // 10xxxxxx
    //             var byte2 = 0x80 | ((code >> 6) & 0x3F);
    //             // 10xxxxxx
    //             var byte3 = 0x80 | (code & 0x3F);
    //             res.push(
    //                 String.fromCharCode(byte1),
    //                 String.fromCharCode(byte2),
    //                 String.fromCharCode(byte3)
    //             );
    //         } else if (code >= 0x00010000 && code <= 0x001FFFFF) {
    //             // 四字节
    //             // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    //         } else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
    //             // 五字节
    //             // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    //         } else /** if (code >= 0x04000000 && code <= 0x7FFFFFFF)*/ {
    //             // 六字节
    //             // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
    //         }
    //     }
    //     return res.join('');
    // }
    function utf8TpUtf16(str) {
        var res = [], len = str.length, utf16;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            // 对第一个字节进行判断
            if (((code >> 7) & 0xFF) == 0x0) {
                // 单字节
                // 0xxxxxxx
                res.push(str.charAt(i));
            }
            else if (((code >> 5) & 0xFF) == 0x6) {
                // 双字节
                // 110xxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var byte1 = (code & 0x1F) << 6;
                var byte2 = code2 & 0x3F;
                utf16 = byte1 | byte2;
                res.push(String.fromCharCode(utf16));
            }
            else if (((code >> 4) & 0xFF) == 0xE) {
                // 三字节
                // 1110xxxx 10xxxxxx 10xxxxxx
                var code2 = str.charCodeAt(++i);
                var code3 = str.charCodeAt(++i);
                var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
                var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
                utf16 = ((byte1 & 0x00FF) << 8) | byte2;
                res.push(String.fromCharCode(utf16));
            }
            else if (((code >> 3) & 0xFF) == 0x1E) {
                // 四字节
                // 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
            else if (((code >> 2) & 0xFF) == 0x3E) {
                // 五字节
                // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
            else {
                // 六字节
                // 1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }
        return res.join('');
    }
})(Base64 || (Base64 = {}));
/*
* name;
*/
function md5(string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            }
            else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        }
        else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }
    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;
    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;
    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;
    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;
    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    ;
    function md5_WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    ;
    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    ;
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d)).toUpperCase();
}
// function loginEncrypt(accountName : string, password : string, code : string = "", param1 : string = "", param2 : string = "")
// {
//     var deviceID = "9646BD29066FC6B79863ECF04D3C5EB7";
// } 
var StringUtil;
(function (StringUtil) {
    /**
     * 字符串补全。
     * @param src
     * @param fillStr
     * @param isPre
     * @returns {*}
     */
    function fill(src, fillStr, isPre) {
        if (isPre === void 0) {
            isPre = true;
        }
        src = src + "";
        var sl = src.length, fl = fillStr.length;
        if (sl >= fl)
            return src;
        if (isPre) {
            return fillStr.substring(0, fl - sl) + src;
        }
        else {
            return src + fillStr.substring(sl);
        }
    }
    StringUtil.fill = fill;
    /**
     * 格式化字符串
     * */
    function format(str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var num = arguments.length;
        for (var i = 1; i < num; i++) {
            var pattern = "\\{" + (i - 1) + "\\}";
            var re = new RegExp(pattern, "g");
            str = str.replace(re, arguments[i]);
        }
        return str;
    }
    StringUtil.format = format;
    /**
     * 替换字符串，将字符串中%s\%d\%f等 使用后续的参数进行替换
     * @param str 要替换的字符串
     * @param ...rest 后续要进行替换的参数
     * @returns 替换结果后的字符串
     **/
    var _regexp = new RegExp("(%([%]|(\\-)?(\\+| )?(0)?(\\d+)?(\\.(\\d)?)?([bcdfosxX])))", "g");
    function printf(str) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        if (!str)
            return "";
        var matches = new Array();
        var strings = new Array();
        var convCount = 0;
        var stringPosStart = 0;
        var stringPosEnd = 0;
        var matchPosEnd = 0;
        var newString = '';
        var match;
        while (match = _regexp.exec(str)) {
            if (match[9]) {
                convCount += 1;
            }
            stringPosStart = matchPosEnd;
            stringPosEnd = _regexp.lastIndex - match[0].length;
            strings.push(str.substring(stringPosStart, stringPosEnd));
            matchPosEnd = _regexp.lastIndex;
            matches.push({
                match: match[0],
                left: match[3] ? true : false,
                sign: match[4] || '',
                pad: match[5] || ' ',
                min: match[6] || 0,
                precision: match[8],
                code: match[9] || '%',
                negative: parseInt(arguments[convCount]) < 0 ? true : false,
                argument: String(arguments[convCount])
            });
        }
        strings[strings.length] = str.substring(matchPosEnd);
        if (matches.length === 0) {
            return str;
        }
        if ((arguments.length - 1) < convCount) {
            return null;
        }
        var substitution;
        var i = 0;
        for (; i < matches.length; i++) {
            match = matches[i];
            switch (match.code) {
                case '%':
                    substitution = '%';
                    break;
                // case 'b':
                //     match.argument = String(Math.abs(parseInt(match.argument)).toString(2));
                //     substitution = convert(match, true);
                //     break;
                // case 'c':
                //     match.argument = String.fromCharCode( parseInt( String(Math.abs( parseInt(match.argument)) )));
                //     substitution = convert(match, true);
                //     break;
                case 'd':
                    match.argument = String(Math.abs(parseInt(match.argument)));
                    substitution = convert(match);
                    break;
                // case 'f':               
                //     match.argument = String(Math.abs(parseFloat(match.argument)).toFixed(match.precision ? match.precision : 6));
                //     substitution = convert(match);
                //     break;
                // case 'o':
                //     match.argument = String(Math.abs(parseInt(match.argument)).toString(8));
                //     substitution = convert(match);
                //     break;
                case 's':
                    match.argument = match.argument.substring(0, match.precision ? match.precision : match.argument.length);
                    substitution = convert(match, true);
                    break;
                // case 'x':
                //     match.argument = String(Math.abs(parseInt(match.argument)).toString(16));
                //     substitution = convert(match);
                //     break;
                // case 'X':
                //     match.argument = String(Math.abs(parseInt(match.argument)).toString(16));
                //     substitution = convert(match).toUpperCase();
                //     break;
                default:
                    substitution = match.match;
            }
            newString += strings[i];
            newString += substitution;
        }
        newString += strings[i];
        return newString;
    }
    StringUtil.printf = printf;
    function convert(match, nosign) {
        if (nosign === void 0) { nosign = false; }
        if (nosign) {
            match.sign = '';
        }
        else {
            match.sign = match.negative ? '-' : match.sign;
        }
        var l = match.min - match.argument.length + 1 - match.sign.length;
        var pad = new Array(l < 0 ? 0 : l).join(match.pad);
        if (!match.left) {
            if (match.pad === "0" || nosign) {
                return match.sign + pad + match.argument;
            }
            else {
                return pad + match.sign + match.argument;
            }
        }
        else {
            if (match.pad === "0" || nosign) {
                return match.sign + match.argument + pad.replace(/0/g, ' ');
            }
            else {
                return match.sign + match.argument + pad;
            }
        }
    }
})(StringUtil || (StringUtil = {}));
var TimeUtil;
(function (TimeUtil) {
    //-------------------------------------------------------------------
    var _svrBegin; //开服当天，0点， 单位毫秒
    var _localTm;
    var _svrTm;
    function setBeginTm(beginTm_s) {
        _svrBegin = getTodayTm(beginTm_s * 1000);
    }
    TimeUtil.setBeginTm = setBeginTm;
    function isFirstDay() {
        var severTm = getSvrMS();
        return TimeUtil.getTodayTm(severTm) == _svrBegin;
    }
    TimeUtil.isFirstDay = isFirstDay;
    function setSvrTm(svrTm) {
        _localTm = Date.now();
        _svrTm = svrTm;
    }
    TimeUtil.setSvrTm = setSvrTm;
    /**
     * 获取当前服务器的时间戳，单位毫秒
     *
     * */
    function getSvrMS() {
        return _svrTm + Math.floor((Date.now() - _localTm));
    }
    TimeUtil.getSvrMS = getSvrMS;
    function getSvrSec() {
        return Math.floor(getSvrMS() / 1000);
    }
    TimeUtil.getSvrSec = getSvrSec;
    //--------------------------------------------------------------
    /**
     *	@brief	获取相对当天具体时间点的时间
        *
        *	@param 	svrTm 服务器时间  单位毫秒
        *	@param 	offHour 	相当于0点的 移动值  时间点 单位小时
        *
        *	@return 时间戳 单位秒
        */
    function getRefreshTm(svrTm, refreshHour) {
        if (refreshHour === void 0) { refreshHour = 0; }
        var nowDate = new Date(svrTm);
        var nowHour = nowDate.getHours();
        nowDate.setHours(0, 0, 0, 0);
        var retTm = Math.floor(nowDate.getTime() / 1000) + refreshHour * 3600;
        if (nowHour < refreshHour) {
            retTm -= 86400;
        }
        return retTm;
    }
    TimeUtil.getRefreshTm = getRefreshTm;
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
    function getTodayTm(msTm, h, m, s, ms) {
        if (h === void 0) { h = 0; }
        if (m === void 0) { m = 0; }
        if (s === void 0) { s = 0; }
        if (ms === void 0) { ms = 0; }
        var date = new Date(msTm);
        date.setHours(h, m, s, ms);
        return date.getTime();
    }
    TimeUtil.getTodayTm = getTodayTm;
    //明天0点
    function getTowTm(now, h, m, s) {
        if (h === void 0) { h = 0; }
        if (m === void 0) { m = 0; }
        if (s === void 0) { s = 0; }
        return TimeUtil.getTodayTm(now, h, m, s) + 86400000 /* MILLIS_PER_DAY */;
    }
    TimeUtil.getTowTm = getTowTm;
    //到明天还有多久
    function getTowDiff(now, h, m, s) {
        if (h === void 0) { h = 0; }
        if (m === void 0) { m = 0; }
        if (s === void 0) { s = 0; }
        return TimeUtil.getTowTm(now, h, m, s) - now;
    }
    TimeUtil.getTowDiff = getTowDiff;
    /**
     * 判断是否为同一天
     * */
    function equalsDay(secTm1, secTm2) {
        var tm1 = new Date(secTm1);
        var tm2 = new Date(secTm2);
        return tm1.getFullYear() == tm2.getFullYear() && tm1.getMonth() == tm2.getMonth() && tm1.getDate() == tm2.getDate();
    }
    TimeUtil.equalsDay = equalsDay;
})(TimeUtil || (TimeUtil = {}));
var URLUtil;
(function (URLUtil) {
    function getLocationParam(key) {
        if (!window.location)
            return null;
        var search = location.search;
        if (search != "") {
            search = search.slice(1);
            var searchArr = search.split("&");
            var length_1 = searchArr.length;
            for (var i = 0; i < length_1; i++) {
                var str = searchArr[i];
                var arr = str.split("=");
                if (arr[0] == key) {
                    return arr[1];
                }
            }
        }
        return null;
    }
    URLUtil.getLocationParam = getLocationParam;
    var _params;
    function getWebParam(key) {
        if (_params) {
            return _params[key];
        }
        _params = {};
        var nodes = document.getElementsByTagName("body");
        if (nodes.length > 0) {
            var attributes = nodes[0].attributes;
            var length_2 = attributes.length;
            for (var i = 0; i < length_2; i++) {
                var att = attributes[i];
                _params[att.name] = att.value;
            }
        }
        return _params[key];
    }
    URLUtil.getWebParam = getWebParam;
    function openURL(url) {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            window.open(url);
        }
        else {
        }
    }
    URLUtil.openURL = openURL;
    function changeWebURL(url) {
        if (!window.location)
            return;
        window.location.assign(url);
    }
    URLUtil.changeWebURL = changeWebURL;
    function getUserAgent() {
        if (egret.Capabilities.runtimeType == egret.RuntimeType.WEB) {
            return navigator ? navigator.userAgent : "";
        }
        return "";
    }
    URLUtil.getUserAgent = getUserAgent;
    function loadScript(src, cb) {
        var s = document.createElement('script');
        s.async = false;
        s.src = src;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
            s.removeEventListener('load', arguments.callee, false);
            cb(src);
        }, false);
        document.body.appendChild(s);
    }
    URLUtil.loadScript = loadScript;
    function getGlobal(name) {
        return window[name];
    }
    URLUtil.getGlobal = getGlobal;
})(URLUtil || (URLUtil = {}));
