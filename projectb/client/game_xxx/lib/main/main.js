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
    function getLocationParams() {
        var ret = {};
        if (window.location) {
            var search = location.search;
            if (search != "") {
                search = search.slice(1);
                var searchArr = search.split("&");
                var length_2 = searchArr.length;
                for (var i = 0; i < length_2; i++) {
                    var str = searchArr[i];
                    var arr = str.split("=");
                    ret[arr[0]] = arr[1];
                }
            }
        }
        return ret;
    }
    URLUtil.getLocationParams = getLocationParams;
    var _params;
    function getWebParam(key) {
        if (_params) {
            return _params[key];
        }
        _params = {};
        var nodes = document.getElementsByTagName("body");
        if (nodes.length > 0) {
            var attributes = nodes[0].attributes;
            var length_3 = attributes.length;
            for (var i = 0; i < length_3; i++) {
                var att = attributes[i];
                _params[att.name] = att.value;
            }
        }
        return _params[key];
    }
    URLUtil.getWebParam = getWebParam;
    function openURL(url) {
        if (CONF.isNative) {
            // openWebView 参数
            // {
            // "url":"",
            // "showbar":false,		//显示标题栏
            // "title":"",			//标题
            // "orientation":默认和游戏一样,	// portait 竖屏  landscape 横屏  sensorlandscape 横屏，激活传感器  sensor 按传感器方向
            // "usesdk":false		//使用SDK
            // }
            window.nativeInterface.openWebView(JSON.stringify({ url: url }));
        }
        else {
            window.open(url);
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
            if (cb)
                cb(src);
        }, false);
        document.body.appendChild(s);
    }
    URLUtil.loadScript = loadScript;
    function getGlobal(name) {
        return window[name];
    }
    URLUtil.getGlobal = getGlobal;
    function setGlobal(name, val) {
        window[name] = val;
    }
    URLUtil.setGlobal = setGlobal;
    function hideLoad() {
        var e = document.getElementById("loadingDiv");
        e && e.parentNode.removeChild(e);
    }
    URLUtil.hideLoad = hideLoad;
    function copyText(value) {
        var input = document.createElement("input");
        input.value = value;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
    }
    URLUtil.copyText = copyText;
    function isHttps() {
        if (!window.location)
            return false;
        return window.location.protocol == "https:";
    }
    URLUtil.isHttps = isHttps;
})(URLUtil || (URLUtil = {}));
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
                        // if( DEBUG ){
                        //     egret.log( target.__class__ + "  remove  Observer  " + evt );
                        // }
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
    URLUtil.setGlobal("onerror", function (errorMessage, scriptURI, lineNumber, columnNumber, errorObj) {
        var args = [errorMessage, errorObj.stack];
        game.notifiCenter.postEvent("jserr" /* JS_ERR */, args);
    });
})(game || (game = {}));
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
            self.stopOpen();
            self.onDispose();
        };
        UIFWBase.prototype.onDispose = function () {
            _super.prototype.dispose.call(this);
        };
        UIFWBase.prototype.stopOpen = function () {
            var self = this;
            if (self._openData) {
                self._openData = null;
                TRain.core.rmvDelayDo(self._open, self);
            }
        };
        UIFWBase.prototype.open = function (parent, data, fin, tar) {
            var self = this;
            self._openData = { fin: fin, tar: tar, p: parent, data: data };
            //self._tm = egret.getTimer();
            var needRess = self.getNeedRes();
            if (needRess && needRess.length > 0) {
                self.loadFWRes(needRess);
            }
            else {
                TRain.core.addDelayDo(self._open, self, 0);
            }
        };
        UIFWBase.prototype.close = function () {
            var self = this;
            self.stopOpen();
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
        UIFWBase.prototype.loadFWRes = function (needRess) {
            var self = this;
            game.notifiCenter.addListener("line_fin" /* LINE_LOAD_FIN */, self.onLoadFin, self, true);
            for (var _i = 0, needRess_1 = needRess; _i < needRess_1.length; _i++) {
                var needRes = needRess_1[_i];
                var tp = needRes.tp;
                game.resMgr.lineLoad(needRes.res, !!tp, tp);
            }
        };
        UIFWBase.prototype.getNeedRes = function () {
            var ret;
            var needRess = this._needRess;
            if (needRess && needRess.length > 0) {
                ret = [];
                while (needRess.length > 0) {
                    var needRes = needRess.pop();
                    var idx = needRes.lastIndexOf("#");
                    if (idx > 0) {
                        var name_1 = needRes.substring(0, idx);
                        var tp = needRes.substr(idx + 1);
                        switch (tp) {
                            case "fnt" /* FONT */:
                                name_1 = CONF.fontUrl + name_1 + "." + tp;
                                break;
                            case "st" /* SHEET */:
                                name_1 = CONF.sheetUrl + name_1 + "." + tp;
                                break;
                            default:
                                tp = null;
                                break;
                        }
                        ret.push({ res: name_1, tp: tp });
                    }
                    else {
                        ret.push({ res: needRes });
                    }
                }
            }
            return ret;
        };
        UIFWBase.prototype.onLoadFin = function () {
            var self = this;
            if (self.disposed || !self._openData)
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
        };
        UIFullFW.prototype.doResize = function (w, h) {
            var self = this;
            self.width = w;
            self.height = h;
            TRain.core.addDelayDo(self.onResize, self, 0, 0, false, w, h);
        };
        UIFullFW.prototype.$onAddToStage = function (stage, nestLevel) {
            var self = this;
            var w = stage.$stageWidth;
            var h = stage.$stageHeight;
            if (self.width != w || self.height != h) {
                self.doResize(w, h);
            }
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            game.notifiCenter.addListener(egret.Event.RESIZE, self.doResize, self);
        };
        UIFullFW.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
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
            var img = self._bgImg = new cui.Image("common@mk_bg");
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
            if (ui.parent) {
                ui.open(ui.parent, openData);
                return;
            }
            if (self._canPop && ((!self.hasPopup() && !self._waitUI) || self._curPri < ui.pri)) {
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
            self._waitUI = popup;
            popup.visible = false;
            popup.open(self, openData, function (ui) {
                if (self._waitUI == popup) {
                    self._waitUI = null;
                    self.reset();
                }
            }, self);
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
                view.close();
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
                var openData = void 0;
                while (deque.length > 0) {
                    openData = deque.pop();
                    if (!openData.ui.disposed)
                        break;
                    openData = null;
                }
                if (openData) {
                    self._openPopup(openData.ui, openData.data);
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
var TRain;
(function (TRain) {
    var AniBase = (function () {
        function AniBase(tar) {
            this.tar = tar;
        }
        AniBase.prototype.setData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        //动画开启前
        AniBase.prototype.beforeAni = function () {
            var props = this._props;
            if (props) {
                var tar = this.tar;
                for (var key in props) {
                    props[key] = tar[key];
                }
            }
        };
        //动画结束前
        AniBase.prototype.endAni = function () {
            var props = this._props;
            if (props) {
                var tar = this.tar;
                for (var key in props) {
                    tar[key] = props[key];
                }
            }
        };
        AniBase.prototype.clear = function () {
            var self = this;
            self.endAni();
            self.action.clear();
            self.tar = null;
        };
        return AniBase;
    }());
    TRain.AniBase = AniBase;
    __reflect(AniBase.prototype, "TRain.AniBase");
    var AniWrapper = (function () {
        function AniWrapper() {
            var self = this;
            self.inAni = false;
            var actEnd = new TRain.ActionCallDo();
            actEnd.once = false;
            actEnd.setCall(self.actFin, self);
            self._acts = [null, actEnd];
            self._seqAct = new TRain.ActionSequence();
            self._data = { fun: null, tar: null };
        }
        AniWrapper.prototype.clear = function () {
            var self = this;
            if (self.inAni) {
                self._seqAct.stop();
                self.inAni = false;
                self.ani.clear();
                var data = self._data;
                data.fun = undefined;
                data.tar = undefined;
            }
            self._acts[0] = null;
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
            TRain.actionMgr.addAction(seqAct, aniObj.tar, false);
            self.inAni = true;
        };
        AniWrapper.prototype.stop = function () {
            var self = this;
            if (self.inAni) {
                self._seqAct.stop();
                self.actFin(null, true);
            }
        };
        AniWrapper.prototype.actFin = function (tar, notDo) {
            var self = this;
            self.inAni = false;
            self.ani.endAni();
            var data = self._data;
            if (data.fun) {
                if (!notDo)
                    data.fun.call(data.tar);
                data.fun = undefined;
                data.tar = undefined;
            }
        };
        return AniWrapper;
    }());
    TRain.AniWrapper = AniWrapper;
    __reflect(AniWrapper.prototype, "TRain.AniWrapper");
    var WrapperMgr;
    (function (WrapperMgr) {
        var _wraps = [];
        function getWrapper() {
            if (_wraps.length > 0) {
                var wrapper = _wraps.pop();
                if (true) {
                    wrapper.inFree = false;
                }
                return wrapper;
            }
            return new AniWrapper();
        }
        WrapperMgr.getWrapper = getWrapper;
        function freeWrapper(wrapper) {
            if (true && wrapper.inFree)
                egret.error("wrapper already free");
            wrapper.clear();
            wrapper.inFree = true;
            _wraps.push(wrapper);
        }
        WrapperMgr.freeWrapper = freeWrapper;
    })(WrapperMgr = TRain.WrapperMgr || (TRain.WrapperMgr = {}));
})(TRain || (TRain = {}));
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
        DataModel.prototype.getVal = function (key) {
            return this._data[key];
        };
        DataModel.prototype.addVal = function (key, val) {
            return this._data[key] += val;
        };
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
    var RouteModel = (function (_super) {
        __extends(RouteModel, _super);
        function RouteModel(maxHisCnt, overRmvcnt) {
            var _this = _super.call(this) || this;
            var self = _this;
            self._lastIdxs = [];
            self._historys = [];
            var tmps = self._tmps = [];
            var routes = self._routes = [];
            for (var i = 0; i < 5 /* max */; ++i) {
                routes.push([]);
                tmps.push([]);
            }
            self.maxHisCnt = maxHisCnt || 100 /* maxHisCnt */;
            self.overRmvcnt = overRmvcnt || 1 /* overRmvcnt */;
            return _this;
        }
        Object.defineProperty(RouteModel.prototype, "historys", {
            get: function () {
                return this._historys;
            },
            //设置 将会重置数据
            set: function (data) {
                var self = this;
                self._historys = data;
                var tmps = self._tmps;
                self.freeArrs(tmps[0 /* zhupanlu */]);
                self.freeArrs(tmps[1 /* dalu */]);
                var routes = self._routes;
                routes[0 /* zhupanlu */].length = 0;
                routes[1 /* dalu */].length = 0;
                self._handHistory(0, true);
                //self.delayPostEvent(RouteMo_EVT.DATA_CHANGE, 0);
                self.postEvent("d_change" /* DATA_CHANGE */);
            },
            enumerable: true,
            configurable: true
        });
        RouteModel.prototype.addHistory = function (data) {
            var self = this;
            var historys = self._historys;
            var addCnt = 1;
            if (data instanceof Array) {
                addCnt = data.length;
                for (var i = 0; i < addCnt; ++i) {
                    historys.push(data[i]);
                }
            }
            else {
                historys.push(data);
            }
            if (historys.length > self.maxHisCnt) {
                self.shiftHistory(self.overRmvcnt);
                self._handHistory(historys.length - addCnt, true);
                self.postEvent("d_change" /* DATA_CHANGE */);
            }
            else {
                self._handHistory(historys.length - addCnt);
                self.postEvent("d_update" /* DATA_UPDATE */);
            }
        };
        //珠盘路 数据
        //tp为number  时 从1开始
        RouteModel.prototype.getRouteData = function (tp) {
            return this._routes[tp];
        };
        //獲取牌路最後添加的索引
        RouteModel.prototype.getRouteLastIdx = function (tp) {
            return this._lastIdxs[tp];
        };
        RouteModel.prototype.getForecast = function () {
            var self = this;
            var winResult = [0 /* none */, 0 /* none */, 0 /* none */];
            var lostResult = [0 /* none */, 0 /* none */, 0 /* none */];
            var daluTmp = self._tmps[1 /* dalu */];
            var lastCol = daluTmp.length - 1;
            if (lastCol > 1) {
                var colDatas = daluTmp[lastCol];
                var colLen = colDatas.length;
                var lastData = colDatas[colLen - 1];
                var tmpData = { r: lastData.r };
                var firstResults = void 0, secondResults = void 0;
                if (tmpData.r == 1 /* win */) {
                    firstResults = winResult;
                    secondResults = lostResult;
                }
                else {
                    firstResults = lostResult;
                    secondResults = winResult;
                }
                colDatas.push(tmpData);
                firstResults[0] = self.calcDYZLResult(daluTmp, lastCol, colLen);
                firstResults[1] = self.calcXLResult(daluTmp, lastCol, colLen);
                firstResults[2] = self.calcXQLResult(daluTmp, lastCol, colLen);
                tmpData.r = tmpData.r == 1 /* win */ ? 2 /* lose */ : 1 /* win */;
                colDatas.pop();
                var freeArr = CacheUtil.getArr();
                freeArr.push(tmpData);
                daluTmp.push(freeArr);
                lastCol++;
                secondResults[0] = self.calcDYZLResult(daluTmp, lastCol, 0);
                secondResults[1] = self.calcXLResult(daluTmp, lastCol, 0);
                secondResults[2] = self.calcXQLResult(daluTmp, lastCol, 0);
                daluTmp.pop();
                CacheUtil.freeArr(freeArr);
            }
            return [winResult, lostResult];
        };
        RouteModel.prototype.freeArrs = function (list) {
            for (var col = 0, colCnt = list.length; col < colCnt; ++col) {
                var arr = list[col];
                if (arr)
                    CacheUtil.freeArr(arr);
            }
            list.length = 0;
        };
        //----------------------------------------------------------------------
        RouteModel.prototype._handHistory = function (stIdx, resetSub) {
            var self = this;
            var historys = self._historys;
            var zpls = self._routes[0 /* zhupanlu */];
            var tmpLen = zpls.length;
            var doFun = self.data2Zhupanlu;
            for (var cnt = historys.length; stIdx < cnt; stIdx++) {
                zpls.push(doFun(historys[stIdx]));
            }
            self._lastIdxs[0 /* zhupanlu */] = zpls.length - 1;
            var daluTmp = self._tmps[1 /* dalu */];
            var oldCol = daluTmp.length;
            var oldRow = 0;
            if (oldCol > 0) {
                oldCol--;
                oldRow = daluTmp[oldCol].length;
            }
            self.zpl2Dalu(zpls, tmpLen, daluTmp);
            var ret = self._routes[1 /* dalu */];
            if (resetSub) {
                oldCol = 0;
                oldRow = 0;
                ret.length = 0;
            }
            self._lastIdxs[1 /* dalu */] = self.two2one(daluTmp, ret, oldCol, oldRow);
            self.calcSubs(daluTmp, resetSub, oldCol, oldRow);
        };
        RouteModel.prototype.shiftHistory = function (cnt) {
            var self = this;
            var historys = self._historys;
            var routes = self._routes[0 /* zhupanlu */];
            var daluList = self._tmps[1 /* dalu */];
            historys.splice(0, cnt);
            routes.splice(0, cnt);
            while (cnt > 0 && daluList.length > 0) {
                var colDatas = daluList[0];
                var len = colDatas.length;
                if (len > cnt) {
                    colDatas.splice(0, cnt);
                    cnt = 0;
                }
                else {
                    CacheUtil.freeArr(daluList.shift());
                    cnt -= len;
                }
            }
        };
        RouteModel.prototype.zpl2Dalu = function (list, stIdx, ret) {
            stIdx = stIdx || 0;
            var newColDatas;
            var curTp;
            var lastTp;
            var lastResult;
            var len = ret.length;
            if (len > 0) {
                newColDatas = ret[len - 1];
                var len1 = newColDatas.length;
                lastResult = newColDatas[len1 - 1];
                lastTp = lastResult.r;
            }
            for (var i = stIdx, cnt = list.length; i < cnt; i++) {
                var result = list[i];
                curTp = result.r;
                if (curTp == 3 /* peace */ || curTp == 4 /* peaceSmall */) {
                    if (lastResult)
                        lastResult.pt = (lastResult.pt || 0) + 1;
                }
                else {
                    if (curTp != lastTp) {
                        newColDatas = CacheUtil.getArr();
                        ret.push(newColDatas);
                    }
                    lastResult = { r: curTp, pt: 0 };
                    newColDatas.push(lastResult);
                    lastTp = curTp;
                }
            }
        };
        //--------------------------------- 子路 ---------------------------------------
        RouteModel.prototype.calcSubs = function (daluList, reset, stCol, stRow) {
            var self = this;
            if (reset)
                self.resetSubs();
            self.result2Sub(daluList, 2 /* dayanzailu */, stCol, stRow);
            self.result2Sub(daluList, 3 /* xiaolu */, stCol, stRow);
            self.result2Sub(daluList, 4 /* xiaoqianglu */, stCol, stRow);
        };
        RouteModel.prototype.resetSubs = function () {
            var self = this;
            var tmps = self._tmps;
            self.freeArrs(tmps[2 /* dayanzailu */]);
            self.freeArrs(tmps[3 /* xiaolu */]);
            self.freeArrs(tmps[4 /* xiaoqianglu */]);
            var routes = self._routes;
            routes[2 /* dayanzailu */].length = 0;
            routes[3 /* xiaolu */].length = 0;
            routes[4 /* xiaoqianglu */].length = 0;
        };
        RouteModel.prototype.result2Sub = function (list, tp, col, row) {
            var self = this;
            col = col || 0;
            var doFun = null;
            switch (tp) {
                case 2 /* dayanzailu */:
                    if (col < 1)
                        col = 1;
                    doFun = self.calcDYZLResult;
                    break;
                case 3 /* xiaolu */:
                    doFun = self.calcXLResult;
                    if (col < 2)
                        col = 2;
                    break;
                case 4 /* xiaoqianglu */:
                    doFun = self.calcXQLResult;
                    if (col < 3)
                        col = 3;
                    break;
            }
            if (doFun) {
                row = row || 1;
                var colDatas = list[col];
                if (colDatas && !colDatas[row]) {
                    if (colDatas.length < row) {
                        colDatas = null;
                    }
                    else {
                        col++;
                        row = 0;
                        colDatas = list[col];
                    }
                }
                if (colDatas) {
                    var retTmp = self._tmps[tp];
                    var oldCol = retTmp.length;
                    var oldRow = 0;
                    if (oldCol > 0) {
                        oldCol--;
                        oldRow = retTmp[oldCol].length;
                    }
                    self._result2Sub(list, col, row, doFun, retTmp);
                    var ret = self._routes[tp];
                    self._lastIdxs[tp] = self.two2one(retTmp, ret, oldCol, oldRow);
                }
            }
        };
        /**
         *
         * @param ret 处理后 值存放的 一维数组
         * @param list 待处理的二维数组
         * @param col 有， 则从指定列开始
         * @param row 有， 则从指定行开始
         * @param free 是否要回收数组  内部使用， 外部不要使用
         */
        RouteModel.prototype.two2one = function (list, ret, col, row) {
            var lastIdx = 0;
            for (var colCnt = list.length; col < colCnt; ++col) {
                var colDatas = list[col];
                var startIdx = col * 6 /* maxRow */;
                var returnRow = -1;
                for (var rowCnt = colDatas.length; row < rowCnt; ++row) {
                    if (returnRow < 0 && row > 0) {
                        if (row >= 6 /* maxRow */ || !!ret[row + startIdx]) {
                            returnRow = row - 1;
                            if (row > 6 /* maxRow */) {
                                startIdx += (row - 6 /* maxRow */) * 6 /* maxRow */;
                                returnRow = 6 /* maxRow */ - 1;
                            }
                        }
                    }
                    var tmpRow = row;
                    if (returnRow >= 0) {
                        tmpRow = returnRow;
                        startIdx += 6 /* maxRow */;
                    }
                    lastIdx = tmpRow + startIdx;
                    ret[tmpRow + startIdx] = colDatas[row];
                }
                row = 0;
            }
            return lastIdx;
        };
        RouteModel.prototype._result2Sub = function (list, col, row, doFun, ret) {
            var colDatas, newColDatas;
            var curTp, lastTp;
            var newResult;
            var len = ret.length;
            if (len > 0) {
                newColDatas = ret[len - 1];
                var len1 = newColDatas.length;
                lastTp = newColDatas[len1 - 1].r;
            }
            for (var colLen = list.length; col < colLen; col++) {
                colDatas = list[col];
                for (var rowLen = colDatas.length; row < rowLen; row++) {
                    //大眼仔路
                    curTp = doFun(list, col, row);
                    if (curTp != lastTp) {
                        newColDatas = CacheUtil.getArr();
                        ret.push(newColDatas);
                    }
                    newResult = { r: curTp };
                    newColDatas.push(newResult);
                    lastTp = curTp;
                }
                row = 0;
            }
        };
        //大眼仔路
        RouteModel.prototype.calcDYZLResult = function (lists, col, row) {
            if (row > 0) {
                if (col < 1)
                    return 0 /* none */;
                var last1Col = lists[col - 1];
                return (last1Col[row] || !last1Col[row - 1]) ? 1 /* win */ : 2 /* lose */;
            }
            else {
                if (col < 2)
                    return 0 /* none */;
                return lists[col - 1].length == lists[col - 2].length ? 1 /* win */ : 2 /* lose */;
            }
        };
        //小路
        RouteModel.prototype.calcXLResult = function (lists, col, row) {
            if (row > 0) {
                if (col < 2)
                    return 0 /* none */;
                var last1Col = lists[col - 2];
                return (last1Col[row] || !last1Col[row - 1]) ? 1 /* win */ : 2 /* lose */;
            }
            else {
                if (col < 3)
                    return 0 /* none */;
                return lists[col - 1].length == lists[col - 3].length ? 1 /* win */ : 2 /* lose */;
            }
        };
        //小强路
        RouteModel.prototype.calcXQLResult = function (lists, col, row) {
            if (row > 0) {
                if (col < 3)
                    return 0 /* none */;
                var last1Col = lists[col - 3];
                return (last1Col[row] || !last1Col[row - 1]) ? 1 /* win */ : 2 /* lose */;
            }
            else {
                if (col < 4)
                    return 0 /* none */;
                return lists[col - 1].length == lists[col - 4].length ? 1 /* win */ : 2 /* lose */;
            }
        };
        return RouteModel;
    }(game.Notification));
    game.RouteModel = RouteModel;
    __reflect(RouteModel.prototype, "game.RouteModel");
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
        return BaseScene;
    }(cui.Group));
    game.BaseScene = BaseScene;
    __reflect(BaseScene.prototype, "game.BaseScene");
})(game || (game = {}));
var game;
(function (game) {
    var ActBaseView = (function (_super) {
        __extends(ActBaseView, _super);
        function ActBaseView(tp) {
            var _this = _super.call(this) || this;
            var self = _this;
            return _this;
        }
        ActBaseView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var model = game.dataMgr.activityMo;
            model.addListener("update" /* update */, function (tp, data) {
                //if (tp == confConsts.ActTp.bycj) {
                self.updateData(data);
                //}
            }, self);
            model.addListener("award" /* award */, self.updateAwd, self);
        };
        ActBaseView.prototype.openRule = function (type) {
            var self = this;
            if (self._ruleView == undefined) {
                self._ruleView = new game.ActRuleView();
            }
            self._ruleView.updateView(game.dataMgr.activityMo.getActConf(type).rule);
            game.gameScene.openPopup(self._ruleView, null, true);
        };
        ActBaseView.prototype.openGames = function (type) {
            var self = this;
            if (self._gameView == undefined) {
                self._gameView = new game.ActGamesView();
            }
            var add = [];
            add.push(1);
            add.push(3);
            add.push(4);
            add.push(5);
            add.push(10);
            self._gameView.setData(add);
            game.gameScene.openPopup(self._gameView, null, true);
        };
        ActBaseView.prototype.dispose = function () {
            var self = this;
            _super.prototype.dispose.call(this);
            game.dataMgr.activityMo.rmvAllListener();
        };
        return ActBaseView;
    }(cui.Component));
    game.ActBaseView = ActBaseView;
    __reflect(ActBaseView.prototype, "game.ActBaseView");
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
        Object.defineProperty(ItemTile.prototype, "font", {
            set: function (val) {
                var ctrl = this.skFont;
                if (ctrl) {
                    ctrl.text = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        ItemTile.props = ["tag", "ud", "bg", "icon", "sel", "ani", "font"];
        return ItemTile;
    }(cui.UITile));
    game.ItemTile = ItemTile;
    __reflect(ItemTile.prototype, "game.ItemTile");
})(game || (game = {}));
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
var nativeInterface;
var game;
(function (game) {
    game.c_zeroArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0];
    var GameUtil;
    (function (GameUtil) {
        GameUtil.os = 0;
        GameUtil.rm = 0;
        GameUtil.gc = true; //gc enable
        GameUtil.isWebLogin = false; //是否通过web登陆
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
        function loadParam() {
            var nativeInterface = window.nativeInterface;
            console.log("..............................1");
            if (nativeInterface || true) {
                console.log("..............................2");
                CONF.isNative = true;
                CONF.deviceId = nativeInterface.getDeviceID();
                var cfgStr = "{\"AgentID\":\"34\",\"ChannelID\":\"22213131_1\", \"Res\":{}}"; //nativeInterface.getGameConfig();
                if (typeof cfgStr == "string") {
                    console.log("..............................3");
                    try {
                        var cfg = JSON.parse(cfgStr);
                        var tmpVal = cfg.ChannelID;
                        if (tmpVal) {
                            CONF.channelId = tmpVal;
                            CONF.shareId = tmpVal;
                        }
                        console.log("..............................4");
                        tmpVal = cfg.AgentID;
                        if (tmpVal) {
                            CONF.agentId = tmpVal;
                        }
                        console.log("..............................5");
                        tmpVal = cfg.res;
                        if (tmpVal) {
                            CONF.res = tmpVal;
                            if (tmpVal.hall) {
                                CONF.resHome = tmpVal.hall + "/";
                                delete tmpVal.hall;
                            }
                        }
                    }
                    catch (e) {
                        console.log("err: nativeInterface.getGameConfig return is not json str");
                    }
                }
            }
            console.log("..............................6 conf:" + CONF.channelId + " agent:" + CONF.agentId);
            CONF.verFile = CONF.resHome + "webver.ver?v=" + Date.now();
            var params = URLUtil.getLocationParams();
            var othSrc = params.or_src;
            if (othSrc) {
                TRain.core.addDelayDo(loadMo, GameUtil, 5000, 0, false, othSrc);
            }
        }
        GameUtil.loadParam = loadParam;
        function loadMo(fileNm) {
            game.ResManager.loadVer(fileNm, function (succ, jsver) {
                if (succ) {
                    var srcPath = fileNm;
                    if (jsver)
                        srcPath += "_" + jsver;
                    URLUtil.loadScript(srcPath + ".js");
                }
            }, game.ResManager);
        }
        GameUtil.loadMo = loadMo;
        function loadMoRes(fileNm, cb, tar) {
            var cb1 = function (loadData) {
                if (loadData.res && loadData.theme) {
                    game.ResManager.loadGroup(fileNm, cb, tar);
                }
            };
            var loadData = { res: false, theme: false };
            game.ResManager.loadRes(fileNm, function (succ) {
                if (succ) {
                    loadData.res = true;
                    cb1(loadData);
                }
            }, game.ResManager);
            game.ResManager.loadTheme(fileNm, function (succ) {
                if (succ) {
                    loadData.theme = true;
                    cb1(loadData);
                }
            }, game.ResManager);
        }
        GameUtil.loadMoRes = loadMoRes;
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
            var curVal = parseInt(val);
            return !!curVal;
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
        //--------------------------------------------------------------
        //播放点击音效
        function playClickSound() {
            TRain.soundMgr.playSFX("click" /* click */);
        }
        GameUtil.playClickSound = playClickSound;
    })(GameUtil = game.GameUtil || (game.GameUtil = {}));
})(game || (game = {}));
var game;
(function (game) {
    var BankerView = (function (_super) {
        __extends(BankerView, _super);
        function BankerView() {
            var _this = _super.call(this) || this;
            _this._isleave = false;
            var self = _this;
            _this.skinName = "bankerSkin";
            self.hideBg = true;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        BankerView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skShangZ.visible = false;
            self.skDBAniGetBank.dbNm = "shangzhuang";
            self.skDBAniGetBank.visible = false;
            self.skDBAniLeaveBank.dbNm = "baozhuang";
            self.skDBAniLeaveBank.visible = false;
            if (self._isleave) {
                self.playLeaveBanker();
            }
            else {
                self.playToBanker();
            }
        };
        BankerView.prototype.setIsLeave = function (isLeave) {
            this._isleave = isLeave;
        };
        BankerView.prototype.setBankerInfo = function (info) {
            this._bankerInfo = info;
        };
        BankerView.prototype.playToBanker = function () {
            var self = this;
            var bankerInfo = self._bankerInfo;
            self.skSZHead.source = game.DataFormat.getHeadIcon(bankerInfo.player_head_custom);
            self.skSZHeadBack.source = "head@old" /* oldFrame */ + bankerInfo.player_vip_lv;
            self.skSZName.text = bankerInfo.player_nickname;
            self.skDBAniGetBank.visible = true;
            self.skDBAniGetBank.gotoAndPlay("xh_shangzhuang_wenzitexiao", 0, 1);
            TRain.soundMgr.playSFX("zhuang_2");
            TRain.core.addDelayDo(function () {
                self.skShangZ.visible = true;
            }, self, 200);
            TRain.core.addDelayDo(function () {
                self.skShangZ.visible = false;
            }, self, 1920);
            TRain.core.addDelayDo(function () {
                self.skDBAniGetBank.stop();
                self.skDBAniGetBank.visible = false;
                self.close();
            }, self, 2300);
        };
        BankerView.prototype.updateBanker = function (bankerGold, income, limitGold) {
            var self = this;
            var bankGold = bankerGold + income;
            if (bankGold <= limitGold) {
                return true;
            }
            else {
                return false;
            }
        };
        BankerView.prototype.playLeaveBanker = function () {
            var self = this;
            self.skDBAniLeaveBank.visible = true;
            self.skShangZ.visible = false;
            self.skDBAniLeaveBank.gotoAndPlay("xh_baozhuang_wenzitexiao", 0, 1);
            TRain.soundMgr.playSFX("allkill");
            TRain.core.addDelayDo(function () {
                self.skDBAniLeaveBank.stop();
                self.skDBAniLeaveBank.visible = false;
                self.close();
            }, self, 1600);
        };
        BankerView.prototype.onDispose = function () {
            var self = this;
            if (self.skDBAniLeaveBank) {
                self.skDBAniLeaveBank.dispose();
            }
            if (self.skDBAniGetBank) {
                self.skDBAniGetBank.dispose();
            }
            TRain.core.rmvAllDelayDo(self);
            _super.prototype.onDispose.call(this);
        };
        return BankerView;
    }(game.UIPopup));
    game.BankerView = BankerView;
    __reflect(BankerView.prototype, "game.BankerView");
})(game || (game = {}));
var game;
(function (game) {
    var GoldMange = (function () {
        function GoldMange() {
            this._flyState = [];
            this._endPosArr = [];
            this._firData = [];
            this._secData = [];
            this._othFirGold = [];
            this._othSecGold = [];
            this._areaNum = 0;
            this._spcNum = -1;
            this._isFly = false;
            var self = this;
            self._firData = [];
            self._secData = [];
            self._othFirGold = [];
            self._othSecGold = [];
            self._isFly = false;
        }
        GoldMange.prototype.setParent = function (parent) {
            var self = this;
            self._parent = parent;
            self._endPosArr = [];
            //parent.touchThrough = false;
            parent.touchEnabled = false;
        };
        GoldMange.prototype.setAreaNum = function (num, spcNum) {
            var self = this;
            self._areaNum = num;
            self._spcNum = spcNum;
        };
        GoldMange.prototype.initData = function (data) {
            var self = this;
            self._plyData = data;
            for (var i = 0; i < self._areaNum; i++) {
                self._flyState[i] = -1;
                self._othFirGold[i] = 0;
                self._othSecGold[i] = 0;
            }
            self._isFly = false;
            self._firData = [];
            self._secData = [];
            for (var i = 0; i < 6; i++) {
                var tempArr = [];
                for (var j = 0; j < self._areaNum; j++) {
                    tempArr.push(0);
                }
                self._firData.push(tempArr);
                self._secData.push(tempArr);
            }
        };
        GoldMange.prototype.setStartPoint = function (point) {
            this._startPos = point;
        };
        GoldMange.prototype.addEndPoint = function (point) {
            var self = this;
            self._endPosArr = point;
        };
        GoldMange.prototype.getOtherGold = function (betDate) {
            var sixGold = [];
            var otherGold = [];
            for (var j = 0; j < betDate.length; j++) {
                var temp = betDate[j];
                otherGold[j] = temp.bet_golds;
                sixGold[j] = 0;
                if (temp.master_bets) {
                    var tempGold = 0;
                    for (var k = 0; k < temp.master_bets.length; k++) {
                        var masterBet = temp.master_bets[k];
                        tempGold += masterBet.player_bets;
                    }
                    sixGold[j] = tempGold;
                }
            }
            for (var i = 0; i < otherGold.length; i++) {
                otherGold[i] = otherGold[i] - sixGold[i];
            }
            return otherGold;
        };
        GoldMange.prototype.getSixGold = function (plyData, betData) {
            var self = this;
            var sixGold = [];
            for (var i = 0; i < 6; i++) {
                var tempArr = [];
                for (var j = 0; j < self._areaNum; j++) {
                    tempArr.push(0);
                }
                sixGold.push(tempArr);
            }
            for (var i = 0; i < 6; i++) {
                var ply = plyData[i];
                for (var j = 0; j < betData.length; j++) {
                    var tempBet = betData[j];
                    if (tempBet.master_bets) {
                        for (var k = 0; k < tempBet.master_bets.length; k++) {
                            if (ply.player_id == tempBet.master_bets[k].player_id) {
                                sixGold[i][j] = tempBet.master_bets[k].player_bets;
                            }
                        }
                    }
                }
            }
            return sixGold;
        };
        GoldMange.prototype.getGold = function (betData) {
            var self = this;
            if (self._plyData) {
                var plyDate = self._plyData;
                var otherGold = self.getOtherGold(betData);
                for (var i = 0; i < betData.length; i++) {
                    var bet = betData[i];
                    if (bet.master_bets) {
                        for (var j = 0; j < bet.master_bets.length; j++) {
                            if (plyDate[0].player_id == bet.master_bets[j].player_id && self._flyState[i] == -1) {
                                self._flyState[i] = 0;
                            }
                        }
                    }
                }
                self._othFirGold = otherGold;
                var tempOther = [];
                for (var i = 0; i < self._othFirGold.length; i++) {
                    tempOther[i] = self._othFirGold[i] - self._othSecGold[i];
                    self._othSecGold[i] = self._othFirGold[i];
                }
                var tempSix = [];
                for (var i = 0; i < 6; i++) {
                    var tempArr = [];
                    for (var j = 0; j < self._areaNum; j++) {
                        tempArr.push(0);
                    }
                    tempSix.push(tempArr);
                }
                var sixs = self.getSixGold(plyDate, betData);
                self._firData = sixs;
                for (var i = 0; i < 6; i++) {
                    var tempnum = 0;
                    if (self._spcNum > 0) {
                        tempnum = self._spcNum;
                    }
                    else {
                        tempnum = self._areaNum;
                    }
                    var _loop_1 = function (j) {
                        var temp = self._firData[i][j] - self._secData[i][j];
                        tempSix[i][j] = temp;
                        self._secData[i][j] = self._firData[i][j];
                        if (i == 0 && temp > 0 || self._flyState[j] == 0) {
                            if (self._isFly == false) {
                                self._flyState[j] = 1;
                                self._isFly = true;
                                var endP = { x: self._endPosArr[j].x + 14, y: self._endPosArr[j].y + 14 };
                                self.flyStar(endP, function () {
                                    self._isFly = false;
                                    var img = new cui.Image();
                                    img.source = "common@xing" /* xing */;
                                    self._parent.addChild(img);
                                    img.x = self._endPosArr[j].x;
                                    img.y = self._endPosArr[j].y;
                                });
                                TRain.soundMgr.playSFX("jiesuan2" /* jiesuan2 */);
                            }
                        }
                    };
                    for (var j = 0; j < tempnum; j++) {
                        _loop_1(j);
                    }
                }
                var GoldArr = { other: tempOther, six: tempSix };
                return GoldArr;
            }
        };
        GoldMange.prototype.flyStar = function (toArea, fin, tar) {
            var self = this;
            var wrapper = self._particleWrapper;
            if (!wrapper) {
                wrapper = self._particleWrapper = TRain.WrapperMgr.getWrapper();
                var ani = new game.StarParticleAni(self._parent);
                wrapper.ani = ani;
            }
            wrapper.stop();
            wrapper.ani.setData(self._startPos, toArea);
            wrapper.start(fin, tar);
        };
        GoldMange.prototype.reset = function () {
            var self = this;
            self.clear();
            self._firData = [];
            self._secData = [];
            self._othFirGold = [];
            self._othSecGold = [];
            if (self._particleWrapper) {
                TRain.WrapperMgr.freeWrapper(self._particleWrapper);
                self._particleWrapper = undefined;
            }
        };
        GoldMange.prototype.clear = function () {
            var self = this;
            var parent = self._parent;
            if (parent)
                parent.removeChildren();
            for (var i = 0; i < self._areaNum; i++) {
                self._flyState[i] = -1;
            }
        };
        return GoldMange;
    }());
    game.GoldMange = GoldMange;
    __reflect(GoldMange.prototype, "game.GoldMange");
})(game || (game = {}));
var game;
(function (game) {
    //选场
    var MomentView = (function (_super) {
        __extends(MomentView, _super);
        function MomentView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "MomentSkin2";
            return _this;
        }
        MomentView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skBtnReturn.setTarget(self.onReturn, self);
            self._arr = new cui.ArrayCollection();
            self.skList.dataProvider = self._arr;
        };
        //返回大厅界面
        MomentView.prototype.onReturn = function () { };
        MomentView.prototype.setData = function (itemRen, source) {
            var self = this;
            self.skList.itemRender = itemRen;
            self._arr.source = source;
            self._arr.refresh();
        };
        return MomentView;
    }(game.UIFullFW));
    game.MomentView = MomentView;
    __reflect(MomentView.prototype, "game.MomentView");
})(game || (game = {}));
var game;
(function (game) {
    var playerInfoView = (function (_super) {
        __extends(playerInfoView, _super);
        function playerInfoView() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._date = [];
            return _this;
        }
        playerInfoView.prototype.cleanDate = function () {
            var self = this;
            self._date = [];
        };
        playerInfoView.prototype.setData = function (data, rank) {
            var self = this;
            self._date.push(data);
            if (rank == 0) {
                self.skbackGuang.source = "common@teshukuang" /* SpecialFrame */ + '';
                self.skteshu.source = "common@txt_dushen" /* dushen */ + '';
                self.skteshu.x = -19;
                self.skteshu.y = -30;
                self.skgold.text = game.DataFormat.convertYuanString2(data.player_gold, true);
                self.skFont.visible = false;
                self.skJiao.visible = false;
            }
            else if (rank == 1) {
                self.skbackGuang.source = "common@teshukuang" /* SpecialFrame */ + '';
                self.skteshu.source = "common@txt_fuhao" /* fuhao */ + '';
                self.skgold.text = game.DataFormat.convertYuanString2(data.player_gold, true);
                self.skFont.visible = false;
                self.skJiao.visible = false;
            }
            else {
                self.skbackGuang.source = "common@wanjiakuang" /* PlayerFrame */ + '';
                self.skteshu.visible = false;
                self.skgold.visible = false;
                self.skFont.text = String(rank);
            }
            self.skHead.source = game.DataFormat.getHeadIcon(data.player_head_custom);
            self.skHeadFrame.source = "head@new" /* headframe */ + data.player_vip_lv;
            self.skNickName.text = self.formatString(data.player_nickname);
        };
        playerInfoView.prototype.formatString = function (str) {
            if (str.length > 5) {
                return str.substr(0, 5) + "...";
            }
            else {
                return str;
            }
        };
        playerInfoView.prototype.updateGold = function (data, isAward, gold) {
            if (gold === void 0) { gold = 0; }
            var self = this;
            if (self._date.length == 0)
                return;
            for (var i = 0; i < self._date.length; i++) {
                var tempDate = self._date[i];
                if (tempDate.player_id == data.player_id) {
                    if (!isAward) {
                        tempDate.player_gold -= gold;
                        self.skgold.text = game.DataFormat.convertYuanString2(tempDate.player_gold, true);
                    }
                    else {
                        self.skgold.text = game.DataFormat.convertYuanString2(data.player_gold, true);
                    }
                }
            }
        };
        return playerInfoView;
    }(cui.SimpleButton));
    game.playerInfoView = playerInfoView;
    __reflect(playerInfoView.prototype, "game.playerInfoView");
})(game || (game = {}));
var game;
(function (game) {
    var PlayerListView = (function (_super) {
        __extends(PlayerListView, _super);
        function PlayerListView() {
            var _this = _super.call(this) || this;
            var self = _this;
            _this.skinName = "playerSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        PlayerListView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skBack.setTarget(self.close, self);
            var list = self.skList;
            list.itemRender = PlayerListItem;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            self.updateView();
        };
        PlayerListView.prototype.setData = function (data) {
            var self = this;
            self._data = data;
            //self.updateView();
        };
        PlayerListView.prototype.updateView = function () {
            var self = this;
            var datas = self._data;
            if (!datas || datas <= 0)
                return;
            //更新赌神信息
            self.skplyHead.source = game.DataFormat.getHeadIcon(datas[0].player_head_custom);
            self.skplyHeadF.source = "head@old" /* oldFrame */ + datas[0].player_vip_lv;
            self.skDushen.text = datas[0].player_nickname;
            self.skwinCount.text = String(datas[0].win_count);
            self.skplayCount.text = String(datas[0].play_cnt);
            self.skgold.text = game.DataFormat.convertYuanString2(datas[0].player_gold, false);
            self.skbets.text = game.DataFormat.convertYuanString2(datas[0].bets, false);
            datas.splice(0, 1);
            //获取游戏列表
            var listArr = datas.slice(0);
            for (var i = 0; i < self._data.length; i++) {
                listArr[i].rankid = i + 1;
                // let listInfo: hallPlayerListShowData = {
                //     rankid: i,
                //     player_head_custom: self._data[i].player_head_custom,
                //     player_head_frame: self._data[i].player_head_frame,
                //     player_nickname: self._data[i].player_nickname,
                //     win_count: self._data[i].win_count,
                //     play_cnt: self._data[i].play_cnt,
                //     player_gold: self._data[i].player_gold,
                //     bets: self._data[i].bets
                // };
                // listArr.push(listInfo);
            }
            self._itemPro.source = listArr;
        };
        return PlayerListView;
    }(game.UIPopup));
    game.PlayerListView = PlayerListView;
    __reflect(PlayerListView.prototype, "game.PlayerListView");
    var PlayerListItem = (function (_super) {
        __extends(PlayerListItem, _super);
        function PlayerListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "playerListSkin";
            return _this;
        }
        PlayerListItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        PlayerListItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            if (data.rankid == 1) {
                self.skfuhao.visible = true;
                self.skrank.visible = false;
                self.skJiao.visible = false;
            }
            else {
                self.skfuhao.visible = false;
                self.skrank.visible = true;
                self.skJiao.visible = true;
            }
            self.skplyHead.source = game.DataFormat.getHeadIcon(data.player_head_custom);
            self.skplyHeadF.source = "head@old" /* oldFrame */ + data.player_vip_lv;
            self.sknickname.text = data.player_nickname;
            self.skwinConut.text = String(data.win_count);
            self.skplayCount.text = String(data.play_cnt);
            self.skgold.text = game.DataFormat.convertYuanString2(data.player_gold, false);
            self.skbets.text = game.DataFormat.convertYuanString2(data.bets, false);
            self.skrank.text = String(data.rankid);
            if (data.rankid >= 10) {
                self.skrank.scaleX = 0.75;
                self.skrank.scaleY = 0.75;
            }
        };
        return PlayerListItem;
    }(cui.DataItem));
    game.PlayerListItem = PlayerListItem;
    __reflect(PlayerListItem.prototype, "game.PlayerListItem");
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
            self._needLoads = [];
            self.accMo = new game.AccountModel();
            self.accMo.addListener("svr_fin" /* login_svr_fin */, self.startHeart, self);
            game.notifiCenter.addListener("close" /* CONN_CLOSE */, self.stopHeart, self);
            self.notifyMo = new game.NotifyModel();
            self.soundMo = new game.SoundModel();
            self.mailMo = new game.MailModel();
            self.gsMo = new game.GameStateModel();
            self.createMo("gameMo", game.GameModel);
            self.createMo("generalMo", game.GeneralModel);
            self.createMo("activityMo", game.ActivityModel);
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
        DataManager.prototype.init = function () {
            var self = this;
            if (!self._inited) {
                self._inited = true;
                self.gsMo.init();
            }
        };
        //-----------------------------------------------------
        DataManager.prototype.startHeart = function () {
            var self = this;
            if (!self._heartTag) {
                self._heartTag = TRain.core.addFrameDo(self.heartSync, self, false, 30000); //5秒
                game.Net.regHandle(404 /* g2c_heartbeat */, function () {
                    //to do
                }, self);
                self.heartSync();
            }
        };
        DataManager.prototype.stopHeart = function () {
            var self = this;
            if (self._heartTag) {
                TRain.core.rmvFrameDoById(self._heartTag);
                self._heartTag = 0;
            }
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
    // dbMgr.createArmAsync( "aaa", function(arm:dragonBones.EgretArmatureDisplay, skinName:string){
    //     arm.x = 200;
    //     arm.y = 200;
    //     arm.animation.play();
    //     self.addChild( arm );
    // }, self );
    var DBoneManager = (function () {
        function DBoneManager() {
            var self = this;
            self._factory = dragonBones.EgretFactory.factory;
            self._usecnts = {};
            self._loadings = {};
            var p = dragonBones.EgretArmatureDisplay.prototype;
            var disposeFun = p.dispose;
            p.dispose = function () {
                game.dbMgr.onArmDispose(this);
                disposeFun.call(this);
            };
        }
        //---------------------------------- 使用计数 --------------------------------------------------
        DBoneManager.prototype.incUsecnt = function (skName) {
            var usecnts = this._usecnts;
            var val = usecnts[skName] || 0;
            usecnts[skName] = val + 1;
        };
        DBoneManager.prototype.decUsecnt = function (skName) {
            var usecnts = this._usecnts;
            var val = usecnts[skName] || 0;
            usecnts[skName] = val - 1;
        };
        //-------------------------------------------------------------------------------------
        DBoneManager.prototype.createArm = function (skName) {
            var self = this;
            var factory = self._factory;
            var dbDisply = factory.buildArmatureDisplay(skName, skName);
            if (dbDisply) {
                dbDisply.ud = skName;
                self.incUsecnt(skName);
                return dbDisply;
            }
            return null;
        };
        DBoneManager.prototype.createArmAsync = function (skName, finBack, thisObj) {
            var self = this;
            var arm = self.createArm(skName);
            if (arm) {
                TRain.core.addNextDo(finBack, thisObj, arm, skName);
                return;
            }
            self.loadResImpl(skName, function (succ, skName) {
                var arm = succ ? self.createArm(skName) : null;
                finBack.call(thisObj, arm, skName);
            }, self);
        };
        DBoneManager.prototype.loadAnimate = function (skName, callback, thisObj) {
            var self = this;
            var factory = this._factory;
            if (factory.getDragonBonesData(skName)) {
                if (callback) {
                    TRain.core.addNextDo(callback, thisObj, true, skName);
                } //已加载
                return;
            }
            self.loadResImpl(skName, callback, thisObj);
        };
        //-----------------------------------------------------------------------------------
        DBoneManager.prototype.getUrl = function (skName) {
            return DBoneManager.resPath + skName + ".db";
        };
        DBoneManager.prototype.loadResImpl = function (skName, callback, thisObj) {
            var self = this;
            var loadings = self._loadings[skName];
            if (loadings) {
                if (callback) {
                    loadings.push({ callback: callback, target: thisObj });
                }
                return;
            }
            loadings = [];
            self._loadings[skName] = loadings;
            if (callback) {
                loadings.push({ callback: callback, target: thisObj });
            }
            var url = self.getUrl(skName);
            TRain.assetMgr.getTex(url, function (data) {
                self.onLoadResFin(data, skName);
            }, self, "mc" /* MC */);
        };
        DBoneManager.prototype.onLoadResFin = function (data, skName) {
            var self = this;
            var success = false;
            if (data) {
                success = true;
                var factory = self._factory;
                var conf = data.conf;
                factory.parseDragonBonesData(conf.ske, skName);
                factory.parseTextureAtlasData(conf.tex, data, skName);
            }
            var loadingList = self._loadings;
            var loadings = loadingList[skName];
            delete loadingList[skName];
            for (var i = loadings.length - 1; i >= 0; --i) {
                var loadData = loadings[i];
                loadData.callback.call(loadData.target, success, skName);
            }
        };
        //-----------------------------------------------------------------
        DBoneManager.prototype.onArmDispose = function (arm) {
            this.decUsecnt(arm.ud);
        };
        DBoneManager.prototype.doGC = function () {
            var self = this;
            var usecnts = self._usecnts;
            var factory = self._factory;
            var delKeys = [];
            for (var skName in usecnts) {
                var usecnt = usecnts[skName];
                if (usecnt <= 0) {
                    delKeys.push(skName);
                    var texData = factory.getTextureAtlasData(skName)[0];
                    if (texData) {
                        factory.removeDragonBonesData(skName);
                        factory.removeTextureAtlasData(skName);
                        TRain.assetMgr.releaseTex(texData.renderTexture);
                    }
                }
            }
            if (delKeys.length > 0) {
                for (var i = 0, n = delKeys.length; i < n; ++i) {
                    delete usecnts[delKeys[i]];
                }
            }
        };
        return DBoneManager;
    }());
    game.DBoneManager = DBoneManager;
    __reflect(DBoneManager.prototype, "game.DBoneManager");
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
            game.dbMgr = new game.DBoneManager();
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
            TRain.core.addDelayDo(function () {
                RES.loadGroup("publicRes");
            }, self, 500);
            // dataMgr.startTimeSync();
        };
        //------------------------------------------------ 开始进入游戏 -----------------------------------
        GameManager.prototype.loadUpdate = function () {
            var self = this;
            var step = self._loadStep;
            if (step == 1 /* loadgameConf */) {
                if (self._scTp != 2 /* LoginScene */ && game.resMgr.getLoadCnt() == 0) {
                    self.setStepState(2 /* finish */);
                }
            }
            else if (step == 3 /* loadPreload */) {
                if (game.resMgr.preloadFin) {
                    self.setStepState(2 /* finish */);
                }
            }
            else if (step == 4 /* waitparse */) {
                if (game.resMgr.getParseCnt() == 0) {
                    self.setStepState(2 /* finish */);
                }
            }
            else if (step == 5 /* end */) {
                if (game.LoadingScene.getInst().isFinish() && self._curScene) {
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
            if (self._loadStep == 5 /* end */)
                return;
            var text = "";
            var loadingScene = game.LoadingScene.getInst();
            switch (self._loadStep) {
                case 0 /* loadLoading */://
                    loadingScene.setLoadStep(text, 10, 333);
                    //analyMgr.loadingSet( 1, text );
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onGroupFined, self);
                    RES.loadGroup("loading");
                    break;
                case 1 /* loadgameConf */:
                    loadingScene.setLoadStep(text, 10, 333);
                    //analyMgr.loadingSet( 3, text );
                    game.dataMgr.loadConfs();
                    TRain.core.addFrameDo(self.loadUpdate, self, false, 100);
                    break;
                case 2 /* loadmainui */:
                    loadingScene.setLoadStep(text, 30, 1000);
                    //analyMgr.loadingSet( 5, text );
                    //资源 解析
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onGroupFined, self);
                    RES.loadGroup("hall"); //加载大厅资源
                    break;
                case 3 /* loadPreload */:
                    loadingScene.setLoadStep(text, 30, 1000);
                    game.resMgr.startPreload();
                    break;
                case 4 /* waitparse */://
                    loadingScene.setLoadStep(text, 20, 666);
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
    var UIDBAni = (function (_super) {
        __extends(UIDBAni, _super);
        function UIDBAni() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.autoPlay = false;
            return _this;
        }
        // constructor()
        // {
        //     super();
        //     let self = this;
        // }
        UIDBAni.prototype.$hitTest = function (stageX, stageY) {
            return null;
        };
        Object.defineProperty(UIDBAni.prototype, "dbNm", {
            get: function () {
                return this._dbNm;
            },
            set: function (name) {
                var self = this;
                name = (!!name) ? name : null;
                if (self._dbNm == name)
                    return;
                self._dbNm = name;
                self.freeArm();
                if (self._inited) {
                    self.loadData();
                }
            },
            enumerable: true,
            configurable: true
        });
        UIDBAni.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.loadData();
        };
        UIDBAni.prototype.$onAddToStage = function (stage, nestLevel) {
            _super.prototype.$onAddToStage.call(this, stage, nestLevel);
            var self = this;
            if (self._playData) {
                self._play();
            }
        };
        UIDBAni.prototype.$onRemoveFromStage = function () {
            _super.prototype.$onRemoveFromStage.call(this);
            this._stop();
        };
        //------------------------------- load --------------------------------------
        //加载动画数据
        UIDBAni.prototype.loadData = function () {
            var self = this;
            var dbNm = self._dbNm;
            if (dbNm) {
                game.dbMgr.loadAnimate(dbNm, self.onLoadFin, self);
            }
        };
        UIDBAni.prototype.onLoadFin = function (succ, skName) {
            if (!succ)
                return;
            var self = this;
            var dbNm = self._dbNm;
            if (!dbNm || dbNm != skName)
                return;
            var arm = self._arm = game.dbMgr.createArm(skName);
            arm.addDBEventListener(dragonBones.EventObject.COMPLETE, self.onAniFin, self);
            self.addChild(arm);
            if (!self._playData && self.autoPlay) {
                self._playData = { times: -1 };
            }
            if (self._playData) {
                self._play();
            }
            self.dispatchEventWith("created" /* EVT_CREATED */, false);
            self.invalidateDL();
        };
        //---------------------------------------------------------------------
        UIDBAni.prototype.setSlotDisplay = function (nm, display) {
            // let slot = armature.getSlot("text");
            // slot.display = new yourEngine.TextField();
        };
        //---------------------------------------------------------------------
        //aniNm - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
        UIDBAni.prototype.play = function (aniNm, playTimes) {
            var self = this;
            if (aniNm && !self._playData) {
                self._playData = { ani: aniNm, times: playTimes };
            }
            self._play();
        };
        UIDBAni.prototype.gotoAndPlay = function (aniNm, frame, playTimes) {
            playTimes = playTimes || 0;
            frame = frame || 0;
            var self = this;
            self._playData = { ani: aniNm, times: playTimes, frame: frame };
            self._play();
        };
        UIDBAni.prototype._play = function () {
            var self = this;
            var arm = self._arm;
            if (arm) {
                var playData = self._playData;
                if (playData.stopFrame) {
                    self._playData = null;
                    arm.animation.gotoAndStopByFrame(playData.ani, playData.stopFrame);
                }
                else {
                    if (playData.ani) {
                        arm.animation.gotoAndPlayByFrame(playData.ani, playData.frame, playData.times);
                    }
                    else {
                        arm.animation.play(playData.ani, playData.times);
                    }
                }
            }
        };
        UIDBAni.prototype._stop = function () {
            var arm = this._arm;
            if (arm) {
                arm.animation.stop();
            }
        };
        UIDBAni.prototype.gotoAndStop = function (frame, aniNm) {
            var self = this;
            self._playData = { ani: aniNm, stopFrame: frame };
            self._play();
        };
        UIDBAni.prototype.stop = function () {
            var self = this;
            self._playData = null;
            self._stop();
        };
        UIDBAni.prototype.onAniFin = function (e) {
            var self = this;
            self._playData = null;
            self.dispatchEventWith("play_fin" /* EVT_PLAY_FIN */, false);
        };
        UIDBAni.prototype.freeArm = function () {
            var self = this;
            var arm = self._arm;
            if (arm) {
                self._arm = null;
                self.removeChild(arm);
                arm.dispose();
            }
        };
        return UIDBAni;
    }(cui.BaseContainer));
    game.UIDBAni = UIDBAni;
    __reflect(UIDBAni.prototype, "game.UIDBAni");
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
        ResManager.getConfUrl = function (name) {
            return "conf/" /* confPath */ + name + ".json";
        };
        ResManager.loadVer = function (fileNm, cb, tar, needHome) {
            var verCtrl = RES.getVersionController();
            var homeUrl = "";
            if (needHome) {
                homeUrl = verCtrl.getHome(fileNm);
                if (!homeUrl) {
                    homeUrl = CONF.res[fileNm] || (fileNm + (CONF.res.all || ""));
                    verCtrl.addHome(fileNm, homeUrl);
                    homeUrl = verCtrl.getHome(fileNm);
                }
            }
            var cb1 = function (event) {
                if (event.type == egret.Event.COMPLETE) {
                    var request_1 = (event.target);
                    var data = JSON.parse(request_1.response);
                    var jsver = data.js;
                    if (jsver)
                        delete data.js;
                    RES.getVersionController().addWebVer(data);
                    cb.call(tar, true, jsver);
                }
                else {
                    cb.call(tar, false);
                }
            };
            var request = new egret.HttpRequest();
            request.addEventListener(egret.Event.COMPLETE, cb1, ResManager);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, cb1, ResManager);
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(homeUrl + "webver_" /* WEBVER_HEAD */ + fileNm + ".ver?v=" + Date.now());
            request.send();
        };
        ResManager.loadRes = function (fileNm, cb, tar) {
            var loadData = { nm: fileNm, cb: cb, tar: tar };
            var resData = ResManager._resData;
            if (resData.cur) {
                resData.waits.push(loadData);
            }
            else {
                RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
                    var resData = ResManager._resData;
                    var loadData = resData.cur;
                    if (loadData) {
                        loadData.cb.call(loadData.tar, true);
                        resData.cur = null;
                    }
                    var waits = resData.waits;
                    if (waits.length <= 0) {
                        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, arguments.callee, ResManager);
                    }
                    else {
                        loadData = resData.cur = waits.shift();
                        var resUrl_1 = loadData.nm + "_res" /* RES_POSTFIX */ + "." + "json" /* JSON */;
                        RES.loadConfig(resUrl_1, "");
                    }
                }, ResManager);
                resData.cur = loadData;
                var resUrl = fileNm + "_res" /* RES_POSTFIX */ + "." + "json" /* JSON */;
                RES.loadConfig(resUrl, "");
            }
        };
        ResManager.loadTheme = function (fileNm, cb, tar, gpNm) {
            var resUrl = fileNm + "_theme" /* THEME_POSTFIX */ + "." + "json" /* JSON */;
            RES.getResByUrl(resUrl, function (data) {
                if (data)
                    TRain.UITheme.addSkinConf(data, gpNm);
                cb.call(tar, !!data);
            }, ResManager, RES.ResourceItem.TYPE_JSON);
        };
        ResManager.loadGroup = function (groupNm, cb, tar) {
            var cb1 = function (event) {
                if (event.groupName == groupNm) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb1, ResManager);
                    cb.call(tar);
                }
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb1, ResManager);
            RES.loadGroup(groupNm);
        };
        ResManager.prototype.initResConf = function (data) {
            var self = this;
            if (data) {
                var paths = self._paths = data.path;
                if (paths) {
                    game.DBoneManager.resPath = paths.db;
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
        ResManager.prototype.getImgUrl = function (nm, isJpg) {
            return this._paths.img + nm + (isJpg ? ".jpg" : ".png");
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
        ResManager.prototype.loadConf = function (url, fin, tar, isURL) {
            if (isURL === void 0) { isURL = false; }
            var self = this;
            var loadConfList = self._loadConf;
            if (!isURL)
                url = ResManager.getConfUrl(url);
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
        ResManager.prototype.startPreload = function () {
            var self = this;
            var accMo = game.dataMgr.accMo;
            if (accMo.getData()) {
                self._startPreload();
            }
            else {
                accMo.addListener("svr_fin" /* login_svr_fin */, self._startPreload, self, true);
            }
        };
        ResManager.prototype._startPreload = function () {
            var self = this;
            var gameModel = game.dataMgr.gameMo;
            var curSvrList = gameModel.getData();
            var loadGmds = [];
            for (var i = 0; i < curSvrList.length; i++) {
                var gameId = curSvrList[i].gameid;
                var gameConf = gameModel.getGmdConf(gameId);
                if (gameConf) {
                    loadGmds.push(gameConf);
                }
            }
            var loadCnt = loadGmds.length;
            if (loadCnt > 0) {
                game.notifiCenter.addListener("line_fin" /* LINE_LOAD_FIN */, function () {
                    self.preloadFin = true;
                }, self, true);
                if (loadCnt > 10) {
                    loadGmds.sort(function (a, b) {
                        return a.wg - b.wg;
                    });
                    loadCnt = 10;
                }
                for (var i = 0; i < loadCnt; ++i) {
                    var url = game.dbMgr.getUrl(loadGmds[i].file);
                    self.lineLoad(url, true, "mc" /* MC */);
                }
            }
            else {
                self.preloadFin = true;
            }
        };
        //-------------------------------流水线加载-----------------
        //加载一批资源
        /**
         *
         * @param source
         * @param isUrl 当url为true， 需要指定
         * @param tp
         */
        ResManager.prototype.lineLoad = function (source, isUrl, tp) {
            var self = this;
            self._lineLoads.push({ src: source, tp: tp, url: isUrl });
            if (self._lineLoads.length == 1) {
                TRain.core.addNextDo(self._startLineLoad, self);
            }
        };
        ResManager.prototype._startLineLoad = function () {
            var self = this;
            if (self.loadShow)
                self.loadShow.showBusy();
            self._trylineLoad();
        };
        ResManager.prototype._trylineLoad = function () {
            var self = this;
            var lineLoads = self._lineLoads;
            while (lineLoads.length > 0 && self._lineLoadCnt < 3 /* MAX_LOAD_CNT */) {
                var loadInfo = lineLoads.shift();
                self._lineLoadCnt++;
                if (loadInfo.url) {
                    TRain.assetMgr.getUrlAsset(loadInfo.src, self._lineLoadFin, self, loadInfo.tp);
                }
                else {
                    TRain.assetMgr.getAsset(loadInfo.src, self._lineLoadFin, self);
                }
            }
            if (self._lineLoadCnt == 0) {
                if (self.loadShow)
                    self.loadShow.hideBusy();
                game.notifiCenter.postEvent("line_fin" /* LINE_LOAD_FIN */);
            }
        };
        ResManager.prototype._lineLoadFin = function () {
            var self = this;
            self._lineLoadCnt--;
            self._trylineLoad();
        };
        ResManager._resData = { waits: [], cur: null };
        return ResManager;
    }());
    game.ResManager = ResManager;
    __reflect(ResManager.prototype, "game.ResManager");
})(game || (game = {}));
var game;
(function (game) {
    var EffectNode = (function (_super) {
        __extends(EffectNode, _super);
        function EffectNode() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.useOnce = true;
            self.touchEnabled = false;
            return _this;
        }
        EffectNode.prototype.setFinish = function (cb, tar) {
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
            if (self.useOnce) {
                self.dispose();
            }
            else {
                var parent_1 = self.parent;
                if (parent_1)
                    parent_1.removeChild(self);
            }
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
    var DBEffect = (function (_super) {
        __extends(DBEffect, _super);
        /**
         * - 播放指定动画。
         * @param name - 龙骨资源名字
         * @param aniNm - 动画数据名称。 （如果未设置，则播放默认动画，或将暂停状态切换为播放状态，或重新播放之前播放的动画）
         * @param playTimes - 循环播放次数。 [-1: 使用动画数据默认值, 0: 无限循环播放, [1~N]: 循环播放 N 次] （默认: -1）
         */
        function DBEffect(name, aniNm, playTime) {
            var _this = _super.call(this) || this;
            var self = _this;
            self._aniNm = aniNm;
            self._playTime = playTime || -1;
            game.dbMgr.createArmAsync(name, function (arm) {
                if (self.disposed)
                    return;
                self._arm = arm;
                arm.addDBEventListener(dragonBones.EventObject.COMPLETE, self.aniFin, self);
                self.addChild(arm);
                if (self._inPly) {
                    arm.animation.play(self._aniNm, self._playTime);
                }
            }, self);
            return _this;
        }
        DBEffect.prototype.play = function () {
            _super.prototype.play.call(this);
            var self = this;
            var arm = self._arm;
            if (arm) {
                arm.animation.play(self._aniNm, self._playTime);
            }
        };
        return DBEffect;
    }(EffectNode));
    game.DBEffect = DBEffect;
    __reflect(DBEffect.prototype, "game.DBEffect");
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
                var deque = self._deque;
                var node = void 0;
                while (deque.length > 0) {
                    node = deque.shift();
                    if (!node.disposed)
                        break;
                    node = null;
                }
                if (node) {
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
///<reference path="./DataModel.ts" />
var game;
(function (game) {
    // export const enum PidType {
    //     channelId = "Cloud249", //440001 Cloud259  Cloud249
    //     agentId = "310"// 1 165 310
    // }
    var AccountModel = (function (_super) {
        __extends(AccountModel, _super);
        function AccountModel() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.accNm = "";
            self.isAuto = true;
            self._notifys = [];
            return _this;
        }
        AccountModel.prototype.getData = function () {
            return this._data;
        };
        AccountModel.prototype.getNoticeDatas = function () {
            return this._noticeDatas || [];
        };
        /**
         *
         * @param nm  游客则传null
         * @param pwd  游客则传null
         */
        AccountModel.prototype.verlogin = function (nm, pwd) {
            var self = this;
            if (!nm) {
                nm = self.accNm;
                pwd = "";
                if (!nm) {
                    nm = game.GameUtil.getLocal("ACC_NAME" /* ACC_NAME */) || "";
                }
            }
            game.HttpUtil.accLogin({ nm: nm, channel: CONF.channelId, agentId: CONF.agentId, hardwareId: CONF.deviceId }, true, function (data) {
                if (data && data.ret) {
                    var accNm = data.acc;
                    self.accNm = accNm;
                    self._token = data.info;
                    game.Net.ip = data.gameip;
                    game.GameUtil.setLocal("ACC_NAME" /* ACC_NAME */, accNm);
                    self.connectWorld();
                    //notifiCenter.postEvent( AccountMo_EVT.login_fin );
                }
                else {
                    game.GameUtil.setLocal("ACC_NAME" /* ACC_NAME */, "");
                    game.MsgBox.showPrompt(112 /* svrConnectErr */);
                }
            }, self);
        };
        //账号密码登录
        AccountModel.prototype.login = function (nm, pwd) {
            var self = this;
            game.HttpUtil.loginAcc({ phone: nm, pwd: pwd, channel: CONF.channelId, agentId: CONF.agentId, hardwareId: CONF.deviceId }, true, function (data) {
                if (data && data.ret) {
                    var accNm = data.acc;
                    self.accNm = accNm;
                    self._token = data.info;
                    game.Net.ip = data.gameip;
                    game.GameUtil.setLocal("ACC_NAME" /* ACC_NAME */, accNm);
                    self.connectWorld();
                    //notifiCenter.postEvent( AccountMo_EVT.login_fin );
                }
                else {
                    game.GameUtil.setLocal("ACC_NAME" /* ACC_NAME */, "");
                    if (data.info == "Login_AccIsNotExist") {
                        game.MsgBox.showPrompt(111 /* e_rmt_login_AccIsNotExists */);
                    }
                    else {
                        game.MsgBox.showPrompt(101 /* e_rmt_gold_accountnum_or_pwd_error */); // MsgBox.showPrompt(data ? data.info : "");
                    }
                }
            }, self);
        };
        AccountModel.prototype.reLogin = function () {
            var self = this;
            game.HttpUtil.serverList({ nm: self.accNm }, true, function (data) {
                if (data && data.ret) {
                    game.Net.ip = data.info;
                    self.connectWorld();
                }
                else {
                    game.notifiCenter.postEvent("fail" /* CONN_FAIL */);
                }
            }, self);
        };
        AccountModel.prototype.registered = function (phone, pwd, code) {
            var self = this;
            //if (DEBUG) code = "111111";
            game.HttpUtil.regAcc({ phone: phone, pwd: pwd, checkcode: code, channel: CONF.channelId, agentId: CONF.agentId, hardwareId: CONF.deviceId }, true, function (data) {
                if (data && data.ret) {
                    self.postEvent("reg_fin" /* reg_phone_fin */);
                }
                else if (data.info == "Login_AccIsExists") {
                    game.MsgBox.showPrompt(110 /* e_rmt_login_AccIsExists */);
                }
                else if (data.info == "VerifyError") {
                    game.MsgBox.showPrompt(38 /* e_rmt_code_error */);
                }
                else {
                    game.MsgBox.showPrompt(106 /* e_rmt_register_faild */);
                }
            }, self);
        };
        AccountModel.prototype.bind = function (phone, pwd, nm, code) {
            var self = this;
            //if (DEBUG) code = "111111";
            game.HttpUtil.bindAcc({ phone: phone, pwd: pwd, nm: nm, checkcode: code, agentId: CONF.agentId, hardwareId: CONF.deviceId }, true, function (data) {
                if (data && data.ret) {
                    this.setVal("isFormal", true);
                    self.postEvent("bin_fin" /* bin_phone_fin */);
                    game.MsgBox.showPrompt(107 /* e_rmt_binding_success */);
                    // let view = new SaveMoneyDialog();
                    // gameScene.openPopup(view);
                }
                else if (data.info == "VerifyError") {
                    game.MsgBox.showPrompt(38 /* e_rmt_code_error */);
                }
                else {
                    game.MsgBox.showPrompt(108 /* e_rmt_binding_falid */);
                }
            }, self);
        };
        AccountModel.prototype.checkCode = function (phone) {
            game.MsgBox.showTxt("mainLang" /* mainLang */, 32 /* Login_AskCode */);
            game.HttpUtil.checkCode({ phone: phone, agentId: CONF.agentId }, false, function (data) {
                if (data && data.ret) {
                    game.MsgBox.showTxt("mainLang" /* mainLang */, 33 /* Login_AskCodeSuccess */);
                    // self.postEvent(AccountMo_EVT.bin_phone_fin);
                    // MsgBox.showPrompt(langConsts.errCode.e_rmt_binding_success);
                    // // let view = new SaveMoneyDialog();
                    // // gameScene.openPopup(view);
                }
                // else {
                //     MsgBox.showPrompt(langConsts.errCode.e_rmt_binding_falid);
                // }
            }, self);
        };
        AccountModel.prototype.CheckNoticeInfo = function () {
            var self = this;
            game.HttpUtil.CheckNotice({ agentId: CONF.agentId }, false, function (data) {
                var noticeDatas = self._noticeDatas = data;
                self.postEvent("check_fin" /* check_svr_info */, data);
                var newNotice = game.GameUtil.getLocal("NOW_NOTICE" /* NOW_NOTICE */);
                if (newNotice && noticeDatas) {
                    var noticeStr = "";
                    //将公告记录到缓存
                    for (var i = 0, len = noticeDatas.length; i < len; i++) {
                        var data_1 = noticeDatas[i];
                        noticeStr += "_" + data_1.Id;
                    }
                    game.GameUtil.setLocal("NOW_NOTICE" /* NOW_NOTICE */, noticeStr);
                }
            }, self);
        };
        AccountModel.prototype.connectWorld = function () {
            var self = this;
            game.Net.regHandle(401 /* s2c_send_msglist */, function (data) {
                var msgs = data.msgpaks;
                if (msgs) {
                    for (var _i = 0, msgs_1 = msgs; _i < msgs_1.length; _i++) {
                        var msg = msgs_1[_i];
                        game.Net.decodeMsg(msg.msgid, msg.msginfo.length, msg.msginfo);
                    }
                }
            }, self);
            game.Net.regHandle(444 /* msg_t2t_start */, self.onT2TStart, self);
            game.Net.regHandle(7501 /* s2c_connect_result */, self.onConnRes, self);
            game.Net.regHandle(7503 /* s2c_asklogin_result */, self.onLoginRes, self);
            game.Net.regHandle(7509 /* s2c_update_playerhead_result */, self.onHeadChange, self);
            game.Net.regHandle(7510 /* s2c_update_nickname_result */, self.onNickNameChange, self);
            game.Net.regHandle(7511 /* s2c_update_sex_result */, self.onSexChange, self);
            game.Net.regHandle(7589 /* s2c_bind_reward */, self.onBindReward, self);
            game.Net.regHandle(7523 /* s2c_w2c_notify */, self.onNotify, self);
            // Net.regHandle( NET_CONF.S2C_ROUTE_TP.s2c_w2c_notify, self.onHeadChange, self );
            game.Net.connect();
        };
        AccountModel.prototype.onNotify = function (data) {
            var self = this;
            self._notifys.push(data);
            self.postEvent("new" /* got_notify */);
        };
        AccountModel.prototype.popNotify = function () {
            return this._notifys.shift();
        };
        AccountModel.prototype.onT2TStart = function () {
            var self = this;
            var args = {};
            args.account = self.accNm;
            args.token = self._token;
            args.sign = md5(args.account + args.token + "5C4BEE401828DF1D920F9CFD323C9AFA");
            args.platform = "default";
            args.login_platform = "web";
            //args.channelid = self.channel || 440001;
            game.Net.sendMsg(5001 /* c2s_connect */, args);
        };
        ;
        AccountModel.prototype.onConnRes = function (data) {
            var succ = data.result == 1 /* e_rmt_success */;
            game.Net.loginFin(succ);
            if (succ) {
                this.gameId = data.gaming;
                TimeUtil.setSvrTm(data.servertime);
                //login
                //Net.sendMsg(NET_CONF.C2S_ROUTE_TP.c2s_asklogin, {});  
                this.askLogin();
            }
            else {
                if (data.result == 104 /* e_rmt_input_correct_code */) {
                    //重新登入
                    this.reLogin();
                }
                else {
                    game.notifiCenter.postEvent("fail" /* CONN_FAIL */);
                }
            }
        };
        AccountModel.prototype.askLogin = function () {
            var args = {};
            args.channelid = this.channel || CONF.channelId;
            game.Net.sendMsg(5003 /* c2s_asklogin */, args);
        };
        AccountModel.prototype.onLoginRes = function (data) {
            var self = this;
            self.gameId = data.gaming || 0;
            self.setData(data.account_info);
            game.dataMgr.init();
            game.dataMgr.gameMo.setData(data.game_list || {});
            game.dataMgr.gsMo.restCoon();
            game.dataMgr.activityMo.askRedPoint();
            //断线重连时，立即发游戏消息 服务器收不到  这边延时100
            self.delayPostEvent("svr_fin" /* login_svr_fin */, 100);
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
        };
        AccountModel.prototype.changeHead = function (icon) {
            var args = {};
            args.headStr = icon;
            game.Net.sendMsg(5010 /* c2s_update_playerhead */, args);
        };
        AccountModel.prototype.onHeadChange = function (data) {
            if (data.result != 1 /* e_rmt_success */) {
                game.msgPrompt.showErr(data.result);
            }
            else {
                this.setVal("icon_custom", data.headstr);
                var sex = data.headstr.indexOf("nan") >= 0 ? 1 : 2;
                this.changeSex(sex);
            }
        };
        AccountModel.prototype.changeNickName = function (nickname) {
            var args = {};
            args.nickName = nickname;
            game.Net.sendMsg(5011 /* c2s_update_nickname */, args);
        };
        AccountModel.prototype.onNickNameChange = function (data) {
            var self = this;
            if (data.result != 1 /* e_rmt_success */) {
                game.msgPrompt.showErr(data.result);
            }
            else {
                //当前玩家的updateNicknameCount
                var count = self.getData().updateNicknameCount;
                if (count == 0) {
                    self.setVal("updateNicknameCount", ++count);
                    self.setVal("nickname", data.nickName);
                }
                else {
                    var curGold = self.getData().gold;
                    self.setVal("updateNicknameCount", ++count);
                    self.setVal("nickname", data.nickName);
                    self.setVal("gold", (curGold - 500 /* modifyNicknameCost */));
                }
                var datas = self.getData();
            }
        };
        //1-男    2-女
        AccountModel.prototype.changeSex = function (sex) {
            var args = {};
            args.sex = sex;
            game.Net.sendMsg(5012 /* c2s_update_sex */, args);
        };
        AccountModel.prototype.onSexChange = function (data) {
            var self = this;
            if (data.result != 1 /* e_rmt_success */) {
                game.msgPrompt.showErr(data.result);
            }
            else {
                self.setVal("sex", data.sex);
            }
        };
        AccountModel.prototype.onBindReward = function (data) {
            var self = this;
            // let curGold = self.getVal("gold");
            // self.setVal("gold", (curGold+data.reward_gold));
        };
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
        AccountModel.prototype.updateGetCount = function () {
            var self = this;
            ++self._data.collected;
            game.TipsMgr.showPrompt(StringUtil.printf(TRain.langMgr.getTxt("mainLang", 211 /* AlmsGetInfo */), game.DataFormat.convertGold(50 /* almsGoldCount */), 6 /* almsMaxCount */ - self._data.collected));
            // self.postEvent("getSaveMoney");
        };
        AccountModel.prototype.havePopNotice = function () {
            var self = this;
            var datas = self._noticeDatas || [];
            var tempDatas = [];
            var isOpen_2 = game.GameUtil.getLocal("NOTICE_2" /* NOTICE_2 */);
            var isOpen_3 = game.GameUtil.getLocal("NOTICE_3" /* NOTICE_3 */);
            var localSvrTm1 = parseInt(game.GameUtil.getLocal("NOTICE_TM_1" /* NOTICE_TM_1 */));
            var localSvrTm2 = parseInt(game.GameUtil.getLocal("NOTICE_TM_2" /* NOTICE_TM_2 */));
            var svrMsTm = TimeUtil.getSvrMS();
            var isEqual1 = TimeUtil.equalsDay(localSvrTm1, svrMsTm);
            var isEqual2 = TimeUtil.equalsDay(localSvrTm2, svrMsTm);
            for (var i = 0, len = datas.length; i < len; i++) {
                var data = datas[i];
                if (data.ShowStage == 1 /* one */ || data.ShowStage == 101 /* oneToOne */) {
                    continue;
                }
                else if (data.ShowStage == 2 /* two */) {
                    if (!isOpen_2) {
                        tempDatas.push(data);
                    }
                }
                else if (data.ShowStage == 3 /* three */) {
                    if (!isOpen_3) {
                        tempDatas.push(data);
                    }
                }
                else if (data.ShowStage == 102 /* oneToTwo */) {
                    //获取服务器时间
                    if (!isEqual1) {
                        tempDatas.push(data);
                    }
                }
                else if (data.ShowStage == 103 /* oneToThree */) {
                    //获取服务器时间
                    if (!isEqual2) {
                        tempDatas.push(data);
                    }
                }
            }
            return tempDatas.length > 0;
        };
        AccountModel.prototype.haveLoginNotice = function () {
            var self = this;
            var datas = self._noticeDatas || [];
            var tempDatas = [];
            for (var i = 0, len = datas.length; i < len; i++) {
                var data = datas[i];
                if (data.ShowStage == 2 /* two */ || data.ShowStage == 102 /* oneToTwo */) {
                    continue;
                }
                else {
                    tempDatas.push(data);
                }
            }
            return tempDatas.length > 0;
        };
        //获取哪几条是新公告
        AccountModel.prototype.isNewNotice = function (nId) {
            var newNotice = game.GameUtil.getLocal("NOW_NOTICE" /* NOW_NOTICE */);
            if (newNotice) {
                var ids = newNotice.split("_");
                return ids.indexOf(nId) == -1;
            }
            else {
                return true;
            }
        };
        //获取当前是否是未读公告
        AccountModel.prototype.isNoRead = function (nId) {
            var NoReadNotice = game.GameUtil.getLocal("OVER_NOTICE" /* OVER_READ_NOTICE */);
            if (NoReadNotice) {
                var ids = NoReadNotice.split("_");
                return ids.indexOf(nId) == -1;
            }
            else {
                return true;
            }
        };
        //获有多少条未读
        AccountModel.prototype.getNoReadNum = function () {
            var self = this;
            var NoReadNotice = game.GameUtil.getLocal("OVER_NOTICE" /* OVER_READ_NOTICE */);
            var noticeDatas = self._noticeDatas || [];
            var num = 0;
            if (NoReadNotice) {
                for (var i = 0, len = noticeDatas.length; i < len; i++) {
                    var data = noticeDatas[i];
                    var ids = NoReadNotice.split("_");
                    if (ids.indexOf(String(data.Id)) == -1)
                        num++;
                }
            }
            else {
                num = noticeDatas.length;
            }
            return num;
        };
        return AccountModel;
    }(game.DataModel));
    game.AccountModel = AccountModel;
    __reflect(AccountModel.prototype, "game.AccountModel");
})(game || (game = {}));
var game;
(function (game) {
    var bycjResult = (function () {
        function bycjResult() {
        }
        return bycjResult;
    }());
    game.bycjResult = bycjResult;
    __reflect(bycjResult.prototype, "game.bycjResult");
    var ActivityModel = (function (_super) {
        __extends(ActivityModel, _super);
        function ActivityModel() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.confNm = "conf";
            self._actData = {};
            self._curActs = [];
            self._redPoint = [];
            for (var i = 1; i < 17 /* max */; i++) {
                self._redPoint[i] = false;
            }
            return _this;
        }
        ActivityModel.prototype.onLoadConf = function (data) {
            _super.prototype.onLoadConf.call(this, data);
            var self = this;
            self._showConf = new Array();
            self._actConf = [];
            self._showConf = data.actShow; //活动显示配置
            self._actConf = data.activity;
            self.regActMsg();
        };
        //-------------------------------------------------获取页面数据----------------------------------------------------
        //以活动id来获取展示模板配置
        ActivityModel.prototype.getShowConf = function (aid) {
            var self = this;
            var act = self._actConf[aid];
            return this._showConf[act.sid];
        };
        //以活动id来获取活动显示配置
        ActivityModel.prototype.getActConf = function (aid) {
            return this._actConf[aid];
        };
        //用活动类型获取活动动态信息
        ActivityModel.prototype.getActData = function (id) {
            return this._actData[id];
        };
        ActivityModel.prototype.getActAwd = function (awdId) {
        };
        ActivityModel.prototype.getActAllAwd = function (activityId) {
        };
        //活动页显示的菜单栏
        ActivityModel.prototype.getActMenu = function () {
            return this._curActs;
        };
        //根据活动Id获取小红点信息
        ActivityModel.prototype.getRedByAid = function (aid) {
            return this._redPoint[aid];
        };
        //----------------------------------------------------------活动数据请求---------------------------------------------------
        //小红点数据
        ActivityModel.prototype.askRedPoint = function () {
            var args = {};
            game.Net.sendMsg(5143 /* c2gs_activity_check */, args);
        };
        //请求必赢彩金界面数据
        ActivityModel.prototype.askBycjInfo = function () {
            var args = {};
            game.Net.sendMsg(5155 /* c2gs_activity_accumulate_rmb_info */, args);
            this.addReadAct(13 /* bycj */);
        };
        ActivityModel.prototype.askBycjApply = function () {
            var self = this;
            var data = self._actData[13 /* bycj */];
            if (data) {
                if (!data.bound)
                    return;
                if (data.applied) {
                    if (data.index_reward >= data.index)
                        return;
                    var args = {};
                    game.Net.sendMsg(5157 /* c2gs_activity_accumulate_rmb_reward */, args);
                }
                else {
                    var args = {};
                    game.Net.sendMsg(5156 /* c2gs_activity_accumulate_rmb_apply */, args);
                }
            }
        };
        //请求荣耀赏金界面数据
        ActivityModel.prototype.askRysjInfo = function () {
            var args = {};
            game.Net.sendMsg(5158 /* c2gs_activity_accumulate_per_info */, args);
            this.addReadAct(11 /* rysj */);
        };
        ActivityModel.prototype.askRysjApply = function () {
            var self = this;
            var data = self._actData[11 /* rysj */];
            if (data) {
                if (!data.bound)
                    return;
                if (data.applied) {
                    if (data.index_reward >= data.index)
                        return;
                    var args = {};
                    game.Net.sendMsg(5160 /* c2gs_activity_accumulate_per_reward */, args);
                }
                else {
                    var args = {};
                    game.Net.sendMsg(5159 /* c2gs_activity_accumulate_per_apply */, args);
                }
            }
        };
        //--------------------------------------------------------注册活动消息--------------------------------------------------------
        ActivityModel.prototype.regActMsg = function () {
            var self = this;
            //小红点数据返回
            game.Net.regHandle(7649 /* gs2c_activity_check_result */, self.redPointResult, self);
            //-----------必赢彩金start----------
            game.Net.regHandle(7665 /* gs2c_activity_accumulate_rmb_info_result */, self.bycjInfoResult, self);
            game.Net.regHandle(7666 /* gs2c_activity_accumulate_rmb_apply_result */, self.bycJionResult, self);
            game.Net.regHandle(7667 /* gs2c_activity_accumulate_rmb_reward_result */, self.bycjAwardResult, self);
            //-----------必赢彩金end------------
            //-----------荣耀赏金start----------
            game.Net.regHandle(7668 /* gs2c_activity_accumulate_per_info_result */, self.rysjInfoResult, self);
            game.Net.regHandle(7669 /* gs2c_activity_accumulate_per_apply_result */, self.rysjJionResult, self);
            game.Net.regHandle(7670 /* gs2c_activity_accumulate_per_reward_result */, self.rysjAwardResult, self);
            //-----------荣耀赏金end------------
        };
        //-------------------------------------------------------活动消息返回-----------------------------------------------------------
        ActivityModel.prototype.redPointResult = function (data) {
            var self = this;
            //self._curActs = data.activities;
            self._curActs.push(11);
            self._curActs.push(13);
        };
        //根据活动类型获取小红点数量
        ActivityModel.prototype.getRedByType = function (isAll, type) {
            if (!isAll && type == null)
                return 0;
            var self = this;
            var count = 0;
            for (var i = 1; i < self._curActs.length; i++) {
                var da = self._curActs[i];
                var info = self.getActConf(i);
                var isNew = false;
                if (info.new == 1 && self.isNoReadAct(i)) {
                    isNew = true;
                }
                if (da || isNew) {
                    if (isAll) {
                        count += 1;
                    }
                    else {
                        if (info.type == type) {
                            count += 1;
                        }
                    }
                }
            }
            return count;
        };
        //获取当前是否是最新活动
        ActivityModel.prototype.isNoReadAct = function (aId) {
            var NoReadAct = game.GameUtil.getLocal("OVER_Activity" /* OVER_READ_Activity */);
            if (NoReadAct) {
                var ids = NoReadAct.split("_");
                return ids.indexOf(aId.toString()) == -1;
            }
            else {
                return true;
            }
        };
        //添加已读活动
        ActivityModel.prototype.addReadAct = function (aId) {
            var self = this;
            var noticeStr = game.GameUtil.getLocal("OVER_Activity" /* OVER_READ_Activity */);
            if (self.isNoReadAct(aId)) {
                noticeStr += "_" + aId;
                game.GameUtil.setLocal("OVER_Activity" /* OVER_READ_Activity */, noticeStr);
                self.postEvent("updateNew" /* upNew */, aId, false);
            }
        };
        //必赢彩金信息返回
        ActivityModel.prototype.bycjInfoResult = function (data) {
            var self = this;
            var info = new bycjResult();
            var tp = 13 /* bycj */;
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
            self.postEvent("update" /* update */, tp, info);
            self.setBycjRedPoint(tp, info);
        };
        //参与必赢彩金活动返回
        ActivityModel.prototype.bycJionResult = function (data) {
            var self = this;
            if (data.result == 1 /* e_rmt_success */) {
                var info = self._actData[13 /* bycj */];
                info.applied = true;
                self.postEvent("update" /* update */, 13 /* bycj */, info);
            }
            else {
                game.msgPrompt.showPrompt(10001 /* client_actJoin_fail */);
            }
        };
        //必赢彩金领奖返回
        ActivityModel.prototype.bycjAwardResult = function (data) {
            var self = this;
            if (data.result == 1 /* e_rmt_success */) {
                var tp = 13 /* bycj */;
                var info = self._actData[tp];
                info.index_reward = data.index;
                game.dataMgr.accMo.addVal("gold", data.reward);
                game.msgPrompt.showPrompt(10003 /* client_actAwd_success */);
                self.postEvent("award" /* award */, tp, true);
                self.setBycjRedPoint(tp, info);
            }
            else {
                game.msgPrompt.showPrompt(10002 /* client_actAwd_fail */);
            }
        };
        //荣耀赏金信息返回
        ActivityModel.prototype.rysjInfoResult = function (data) {
            var self = this;
            var info = new bycjResult();
            var tp = 11 /* rysj */;
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
            self.postEvent("update" /* update */, tp, info);
            self.setBycjRedPoint(tp, info);
        };
        //荣耀赏金彩金活动返回
        ActivityModel.prototype.rysjJionResult = function (data) {
            var self = this;
            if (data.result == 1 /* e_rmt_success */) {
                var info = self._actData[11 /* rysj */];
                info.applied = true;
                self.postEvent("update" /* update */, 11 /* rysj */, info);
            }
            else {
                game.msgPrompt.showPrompt(10001 /* client_actJoin_fail */);
            }
        };
        //荣耀赏金领奖返回
        ActivityModel.prototype.rysjAwardResult = function (data) {
            var self = this;
            if (data.result == 1 /* e_rmt_success */) {
                var tp = 11 /* rysj */;
                var info = self._actData[tp];
                info.index_reward = data.index;
                game.dataMgr.accMo.addVal("gold", data.reward);
                game.msgPrompt.showPrompt(10003 /* client_actAwd_success */);
                self.postEvent("award" /* award */, tp, true);
                self.setBycjRedPoint(tp, info);
            }
            else {
                game.msgPrompt.showPrompt(10002 /* client_actAwd_fail */);
            }
        };
        ActivityModel.prototype.setBycjRedPoint = function (tp, info) {
            var self = this;
            var isShow = false;
            if (info.index > info.index_reward) {
                isShow = true;
            }
            self._redPoint[tp] = isShow;
            self.postEvent("updateRed" /* upRed */, tp, isShow);
        };
        ActivityModel.prototype.enterGame = function (gId) {
            var self = this;
            game.gameScene.startGame(gId);
            self.postEvent("close" /* close */);
        };
        return ActivityModel;
    }(game.DataModel));
    game.ActivityModel = ActivityModel;
    __reflect(ActivityModel.prototype, "game.ActivityModel");
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
            return this._curGMD;
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
            var fileNm = gmdConf.file;
            self._curGMD = gmdInfo;
            if (true) {
                RES.getVersionController().addHome(fileNm, fileNm);
                gmdInfo.ver = true;
                self.loadGMD(gmdInfo);
            }
            else {
                game.ResManager.loadVer(fileNm, function (succ, jsVer) {
                    if (succ) {
                        gmdInfo.ver = true;
                        gmdInfo.jsVer = jsVer;
                        self.loadGMD(gmdInfo);
                    }
                    else {
                        self.onLoadErr(gmdInfo, "curr gmd load ver fail");
                    }
                }, self, true);
            }
        };
        //
        GameModel.prototype.closeGMD = function () {
            var curGMD = this._curGMD;
            if (curGMD) {
                var gameId = curGMD.id;
                TRain.core.rmvDelayDoByFlag(gameId);
                TRain.actionMgr.rmvActsByTag(gameId);
                TRain.UITheme.setCurGp(null);
                game.dataMgr.accMo.gameId = 0;
                this._curGMD = null;
                curGMD.gm.close();
            }
        };
        GameModel.prototype.onLoadErr = function (gmdInfo, err) {
            var self = this;
            if (gmdInfo == self._curGMD) {
                self._curGMD = null;
                self.postEvent("fin" /* start_fin */, err);
            }
        };
        //-------------------------------------------------- load ------------------------------------------------
        GameModel.prototype.loadGMD = function (curGMD) {
            var self = this;
            if (!curGMD.gm) {
                self.loadJs(curGMD);
            }
            var fileNm = curGMD.conf.file;
            if (!curGMD.res) {
                game.ResManager.loadRes(fileNm, function (succ) {
                    if (succ) {
                        curGMD.res = true;
                        self.tryLoadFin();
                    }
                    else {
                        self.onLoadErr(curGMD, "GMD resource load fail name=" + fileNm);
                    }
                }, self);
            }
            if (!curGMD.theme) {
                game.ResManager.loadTheme(fileNm, function (succ) {
                    if (succ) {
                        curGMD.theme = true;
                        self.tryLoadFin();
                    }
                    else {
                        self.onLoadErr(curGMD, "GMD theme load fail name=" + fileNm);
                    }
                }, self, fileNm);
            }
            self.tryLoadFin();
        };
        GameModel.prototype.loadJs = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            var fileNm = gmdConf.file;
            var homeUrl = RES.getVersionController().getHome(fileNm);
            var srcPath = homeUrl + fileNm;
            if (curGMD.jsVer) {
                srcPath += "_" + curGMD.jsVer;
            }
            URLUtil.loadScript(srcPath + ".js", function () {
                var gmdNm = "GMD_" /* GMD_HEAD */ + gmdConf.file;
                var gm = URLUtil.getGlobal(gmdNm);
                if (gm) {
                    curGMD.gm = gm;
                    self.tryLoadFin();
                }
                else {
                    self.onLoadErr(curGMD, "GMD object not find name=" + gmdConf.file);
                }
            });
        };
        GameModel.prototype.tryLoadFin = function () {
            var self = this;
            var curGMD = self._curGMD;
            if (curGMD && curGMD.gm && curGMD.res && curGMD.theme && curGMD.ver) {
                if (!curGMD.gp) {
                    game.ResManager.loadGroup(curGMD.conf.file, function () {
                        curGMD.gp = true;
                        self.loadFin();
                    }, self);
                }
                else {
                    self.loadFin();
                }
            }
        };
        GameModel.prototype.loadFin = function () {
            var self = this;
            var curGMD = self._curGMD;
            if (curGMD && curGMD.gp) {
                var gmdConf = curGMD.conf;
                game.dataMgr.accMo.gameId = gmdConf.id;
                if (!curGMD.inited) {
                    curGMD.gm.init();
                    curGMD.inited = true;
                }
                TRain.UITheme.setCurGp(gmdConf.file);
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
    var GameStateModel = (function () {
        function GameStateModel() {
        }
        GameStateModel.prototype.init = function () {
            var self = this;
            game.Net.regHandle(31001 /* gs2c_player_connect_result */, function (data) {
                if (data.result == 1 /* e_rmt_success */) {
                    self._inConn = true;
                    var accMo = game.dataMgr.accMo;
                    if (accMo.gameId) {
                        var args = {};
                        args.gameid = accMo.gameId;
                        game.Net.sendMsg(30003 /* c2gs_game_history */, args);
                    }
                }
            }, self);
            game.Net.regHandle(31002 /* gs2c_player_disconnect_result */, function (data) {
                if (data.result == 1 /* e_rmt_success */)
                    self._inConn = false;
            }, self);
        };
        GameStateModel.prototype.startConn = function () {
            var accMo = game.dataMgr.accMo;
            if (accMo.gameId && !this._inConn) {
                var args = {};
                args.playerid = accMo.getData().aid;
                args.gameid = accMo.gameId;
                game.Net.sendMsg(30001 /* c2gs_player_connect */, args);
            }
        };
        GameStateModel.prototype.endConn = function () {
            if (this._inConn) {
                var args = {};
                args.playerid = game.dataMgr.accMo.getData().aid;
                game.Net.sendMsg(30002 /* c2gs_player_disconnect */, args);
            }
        };
        GameStateModel.prototype.restCoon = function () {
            this._inConn = false;
        };
        return GameStateModel;
    }());
    game.GameStateModel = GameStateModel;
    __reflect(GameStateModel.prototype, "game.GameStateModel");
})(game || (game = {}));
var game;
(function (game) {
    var GeneralModel = (function (_super) {
        __extends(GeneralModel, _super);
        function GeneralModel() {
            var _this = _super.call(this) || this;
            var self = _this;
            game.notifiCenter.addListener("enter_fin" /* enter_game_fin */, function () {
                self.initRegHandle();
                // if (dataMgr.accMo.getData().sevenday_done) self.sendGetQuestlist();
                self.sendGetQuestlist(false);
            }, _this);
            self.confNm = "conf";
            self._openShop = false;
            return _this;
        }
        GeneralModel.prototype.onLoadConf = function (data) {
            var self = this;
            self._questConf = data.Quest;
            self._gainConf = data.Perform;
            self._FAQConf = data.Extend;
            self._openConfs = data.open;
            self.partConf = data.particle;
            self._vipConf = data.VIPProfit;
            self._hallFunConfs = data.hallFunPop;
            var tipConf = self._tipConf = [];
            for (var _i = 0, _a = data.tipControl; _i < _a.length; _i++) {
                var tmpTip = _a[_i];
                if (!tmpTip.os || tmpTip.os == game.GameUtil.os) {
                    tipConf.push(tmpTip);
                }
            }
            self._tipConf = tipConf;
        };
        Object.defineProperty(GeneralModel.prototype, "tipConf", {
            get: function () {
                return this._tipConf;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeneralModel.prototype, "curDay", {
            get: function () {
                return this._curDay;
            },
            set: function (value) {
                this._curDay = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GeneralModel.prototype, "openShop", {
            set: function (value) {
                this._openShop = value;
            },
            enumerable: true,
            configurable: true
        });
        GeneralModel.prototype.getLimitList = function () {
            return this._questList;
        };
        Object.defineProperty(GeneralModel.prototype, "isOpenLimitRw", {
            get: function () {
                return this._isOpenLimitRw;
            },
            set: function (value) {
                this._isOpenLimitRw = value;
            },
            enumerable: true,
            configurable: true
        });
        GeneralModel.prototype.isFunOpen = function (tp) {
            var self = this;
            var isOpen = self._openConfs(tp).isOpen;
            if (tp == 7 /* shop */) {
                return self._openShop && !!isOpen;
            }
            else {
                return !!isOpen;
            }
        };
        GeneralModel.prototype.getFunPopInfos = function () {
            return this._hallFunConfs;
        };
        // public get isInGame(): boolean {
        //     return this._isInGame;
        // }
        // public set isInGame(value: boolean) {
        //     this._isInGame = value;
        // }
        GeneralModel.prototype.getSuggestList = function () {
            return this._adviceList || [];
        };
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
        GeneralModel.prototype.getAllGold = function () {
            var sum = 0;
            var self = this;
            for (var i in self._questConf) {
                var id = self._questConf[i].id;
                if (id >= 3001 && id <= 3014)
                    sum += self._questConf[i].awardItemCount;
            }
            return sum / 2;
        };
        GeneralModel.prototype.getQuestByID = function (id) {
            return this._questConf[id];
        };
        GeneralModel.prototype.getQuest = function () {
            return this._questConf;
        };
        GeneralModel.prototype.getPerform = function () {
            return this._gainConf;
        };
        GeneralModel.prototype.getExtend = function () {
            return this._FAQConf;
        };
        GeneralModel.prototype.getVipProfit = function () {
            return this._vipConf;
        };
        GeneralModel.prototype.setGain = function (gain) {
            var self = this;
            self._gain = gain;
        };
        GeneralModel.prototype.getGain = function () {
            return this._gain;
        };
        GeneralModel.prototype.setCreateTeamName = function (name) {
            this._teamName = name;
        };
        GeneralModel.prototype.getCreateTeamName = function () {
            return this._teamName;
        };
        GeneralModel.prototype.setChangeTeamName = function (name) {
            this._changeName = name;
        };
        GeneralModel.prototype.getChangeTeamName = function () {
            return this._changeName;
        };
        GeneralModel.prototype.setPerformanceInfo = function (data) {
            var self = this;
            self._performsInfo = data;
        };
        GeneralModel.prototype.getPerformanceInfo = function () {
            return this._performsInfo;
        };
        GeneralModel.prototype.setPerformanceList = function (data) {
            var self = this;
            self._performsList = data;
        };
        GeneralModel.prototype.getPerformanceList = function () {
            return this._performsList;
        };
        GeneralModel.prototype.setPerformanceChild = function (data) {
            var self = this;
            self._performsChild = data;
        };
        GeneralModel.prototype.getPerformanceChild = function () {
            return this._performsChild;
        };
        GeneralModel.prototype.setPerformanceTeamlist = function (data) {
            var self = this;
            self._performsTeamlist = data;
        };
        GeneralModel.prototype.getPerformanceTeamlist = function () {
            return this._performsTeamlist;
        };
        GeneralModel.prototype.setPerformTeamInfo = function (data) {
            var self = this;
            self._performsTeamInfo = data;
        };
        GeneralModel.prototype.getPerformanceTeamInfo = function () {
            return this._performsTeamInfo;
        };
        GeneralModel.prototype.setTeamId = function (teamId) {
            this._teamID = teamId;
        };
        GeneralModel.prototype.getTeamId = function () {
            return this._teamID;
        };
        GeneralModel.prototype.setCodeTag = function (tag) {
            this._tag = tag;
        };
        GeneralModel.prototype.getCodeTag = function () {
            return this._tag;
        };
        GeneralModel.prototype.initRegHandle = function () {
            var self = this;
            game.Net.regHandle(7539 /* s2c_benefits_result */, self.benefits, self);
            game.Net.regHandle(7561 /* s2c_get_questlist_result */, self.getQuestlist, self);
            game.Net.regHandle(7563 /* s2c_change_quest */, self.changeQuest, self);
            game.Net.regHandle(7599 /* s2c_notify_share */, self.notifyShare, self);
            game.Net.regHandle(7600 /* s2c_receive_share_reward_result */, self.shareReward, self);
            game.Net.regHandle(7609 /* s2c_notify_task_reflush */, self.taskReflush, self);
            game.Net.regHandle(7562 /* s2c_receive_questreward_result */, self.getQuestReward, self);
            game.Net.regHandle(7601 /* s2c_req_faq_result */, self.faqResult, self);
            game.Net.regHandle(7602 /* s2c_req_faq_detail_result */, self.faqDetailResult, self);
            game.Net.regHandle(7606 /* s2c_suggestion_result */, self.adviceReqResult, self);
            game.Net.regHandle(7607 /* s2c_req_suggest_result */, self.adviceListReqResult, self);
            game.Net.regHandle(7660 /* s2c_req_vip_info_result */, self.askVipInfoResult, self);
            game.Net.regHandle(7634 /* s2c_performance_check_gain_result */, self.checkGainResult, self);
            game.Net.regHandle(7632 /* s2c_performance_gain_result */, self.getGainResult, self);
            game.Net.regHandle(7639 /* s2c_performance_info_result */, self.performanceInfoResult, self);
            game.Net.regHandle(7631 /* s2c_performance_list_result */, self.performanceListResult, self);
            game.Net.regHandle(7633 /* s2c_performance_child_result */, self.performanceChildResult, self);
            game.Net.regHandle(7636 /* s2c_performance_team_list_result */, self.performanceTeamlistResult, self);
            game.Net.regHandle(7635 /* s2c_performance_team_create_result */, self.performanceTeamcreateResult, self);
            game.Net.regHandle(7638 /* s2c_performance_team_update_result */, self.performanceTeamUpdateResult, self);
            game.Net.regHandle(7637 /* s2c_performance_team_info_result */, self.performanceTeamInfoResult, self);
        };
        // ------------------------------客户端接收消息--------------------------------------
        //团队具体信息，成员列表
        GeneralModel.prototype.performanceTeamInfoResult = function (data) {
            var self = this;
            self.setPerformTeamInfo(data.team);
            self.postEvent("PerformTeaminfo" /* PerformTeaminfo */);
        };
        //更新团队信息返回
        GeneralModel.prototype.performanceTeamUpdateResult = function (data) {
            var self = this;
            self.setTeamId(data.team_id);
            self.setCodeTag(data.code_tag);
            if (data.result == 1) {
                self.postEvent("PerformTeamupdate" /* PerformTeamupdate */, data.optype, data);
            }
            else {
                game.MsgBox.showTxt("mainLang" /* mainLang */, 741 /* sameName */);
            }
        };
        //申请创建团队返回
        GeneralModel.prototype.performanceTeamcreateResult = function (data) {
            var self = this;
            if (data.result == 1) {
                self.postEvent("PerformTeamcreate" /* PerformTeamcreate */);
            }
            else {
                game.MsgBox.showTxt("mainLang" /* mainLang */, 741 /* sameName */);
            }
        };
        //申请团队列表返回
        GeneralModel.prototype.performanceTeamlistResult = function (data) {
            var self = this;
            self.setPerformanceTeamlist(data.teams);
            self.postEvent("PerformTeamlist" /* PerformTeamlist */);
        };
        //申请下级查询返回
        GeneralModel.prototype.performanceChildResult = function (data) {
            var self = this;
            self.setPerformanceChild(data.info);
            self.postEvent("PerformChild" /* PerformChild */);
        };
        //代理管理返回
        GeneralModel.prototype.performanceListResult = function (data) {
            var self = this;
            self.setPerformanceList(data.info);
            self.postEvent("PerformList" /* PerformList */);
            if (self._isFirstPList)
                self.postEvent("backInfo" /* backInfo */);
        };
        //申请业绩查询返回
        GeneralModel.prototype.performanceInfoResult = function (data) {
            var self = this;
            self.setPerformanceInfo(data);
            self.postEvent("Perform" /* Perform */);
        };
        //申请领取佣金返回
        GeneralModel.prototype.getGainResult = function (data) {
            var self = this;
            if (data.result == 1) {
                self.setGain(0);
                self.postEvent("GetGain" /* GetGain */);
                var gold = game.dataMgr.accMo.getData().gold + data.gain;
                game.dataMgr.accMo.setVal("gold", gold);
                game.TipsMgr.showPrompt(StringUtil.printf(TRain.langMgr.getTxt("mainLang", 794 /* getDLGold */), game.DataFormat.convertGold(data.gain)));
            }
        };
        //代理佣金数量
        GeneralModel.prototype.checkGainResult = function (data) {
            var self = this;
            self.setGain(data.gain);
            self.postEvent("Gain_result" /* Gain_result */);
        };
        //玩家领取救济金的结果
        GeneralModel.prototype.benefits = function (data) {
            //救济金是固定的 confConsts.ConstTp.almsGoldCount 
            var result = data.result;
            if (result == 1 /* e_rmt_success */) {
                // 领取成功
                var gold = game.dataMgr.accMo.getData().gold + 50 /* almsGoldCount */;
                game.dataMgr.accMo.setVal("gold", gold);
                game.dataMgr.accMo.updateGetCount();
            }
            else {
                // 领取失败
                // game.TipsMgr.showPrompt(TRain.langMgr.getTxt("errCode", result));
            }
            game.TipsMgr.showPrompt(TRain.langMgr.getTxt("errCode", result));
        };
        //返回任务列表
        GeneralModel.prototype.getQuestlist = function (data) {
            //data.is_new    这个是限时悬赏使用,任务是否已重置
            var self = this;
            if (Object.keys(data).length == 0)
                return;
            if (!self._questList) {
                self._questList = [];
            }
            else {
                self._questList.length = 0;
            }
            for (var _i = 0, _a = data.questlist; _i < _a.length; _i++) {
                var temp = _a[_i];
                var val = {};
                val.questid = temp.questid;
                val.count = temp.count;
                val.received = temp.received;
                var qcfg = self.getQuestByID(temp.questid);
                val.cfg = qcfg;
                if (isNaN(self._curDay) || self._curDay < qcfg.group) {
                    self._curDay = qcfg.group;
                }
                self._questList.push(val);
            }
            //self.setIsNotNewTask(data.is_new);
            // self.postEvent(General_EVT.Quest_List_Result + "");
            //let isNotNewTask = GameUtil.getLocalBool("isNotNewTask");
            var sevendayDone = game.dataMgr.accMo.getVal("sevenday_done");
            var oneTask = self._questList[self._curDay];
            var twoTask = self._questList[self._curDay - 1];
            if (!sevendayDone && oneTask && twoTask && !oneTask.received && !twoTask.received && oneTask.count >= oneTask.cfg.completeCount && twoTask.count >= twoTask.cfg.completeCount) {
                self.isDone = true; //显示
            }
            else {
                self.isDone = false; //不显示
            }
            self.postEvent("IsDone" /* IsDone */, self.isDone);
            //是否是可弹出七日奖励
            var isPopSevenDay = self._isPopSevenDay;
            if (!sevendayDone && self.isOpen) {
                if (isPopSevenDay) {
                    self.postEvent("backInfo" /* backInfo */);
                }
                else {
                    self.postEvent("quest_list" /* Quest_List_Result */); //打开七日
                }
            }
            //if (sevendayDone && data.is_new && self.isOpen) {
            self.isOpenLimitRw = sevendayDone && data.is_new && self.isOpen;
            // self.postEvent(General_EVT.OpenTaskToday); //新一期第一次进入游戏
            //}
        };
        //通知成就分享
        GeneralModel.prototype.notifyShare = function (data) {
            if (data && data.game_id == game.dataMgr.accMo.gameId)
                this.postEvent("achieve_share" /* Notify_Achieve_Share */ + "", data);
        };
        //领取成就分享奖励结果
        GeneralModel.prototype.shareReward = function (data) {
            var result = data.result;
            if (result == 1 /* e_rmt_success */) {
                game.MsgBox.showTxt("mainLang" /* mainLang */, 778 /* headHasGet */);
                var reward = data.reward;
                if (!isNaN(reward) && reward > 0) {
                    var acco = game.dataMgr.accMo;
                    acco.setVal("gold", acco.getData().gold + reward);
                }
                game.dataMgr.accMo.askLogin();
            }
            else {
                game.TipsMgr.showPrompt(TRain.langMgr.getTxt("errCode", result));
            }
        };
        //通知玩家任务刷新
        GeneralModel.prototype.taskReflush = function (data) {
            this.sendGetQuestlist();
        };
        //领取奖励（七日奖励）
        GeneralModel.prototype.getQuestReward = function (data) {
            var self = this;
            var accMo = game.dataMgr.accMo;
            if (data.result == 1 /* e_rmt_success */) {
                //当前是七日奖励还是限时悬赏
                if (game.dataMgr.accMo.getVal("sevenday_done")) {
                    for (var i = 0, len = self._questList.length; i < len; i++) {
                        var questItem = self._questList[i];
                        if (questItem.questid == data.questid) {
                            questItem.received = true;
                            accMo.addVal("gold", questItem.cfg.awardItemCount);
                        }
                    }
                    self.postEvent("UpdateTaskList" /* UpdateTaskList */);
                }
                else {
                    var seven = self._questConf[data.questid];
                    var grp = seven.group;
                    var award = game.DataFormat.convertGold(seven.awardItemCount);
                    var t = StringUtil.printf(TRain.langMgr.getTxt("mainLang", 776 /* sevenGetGold */), award);
                    game.TipsMgr.showPrompt(t);
                    for (var i = 0; i < self._questList.length; i++) {
                        if (self._questList[i].cfg.group == grp) {
                            self._questList[i].received = true;
                        }
                    }
                    var isOver = self.checkAllOver();
                    if (isOver && self.curDay == 7) {
                        accMo.setVal("sevenday_done", true);
                        self.sendGetQuestlist();
                    }
                    self.postEvent("GetQuestReward" /* GetQuestReward */ + "");
                }
            }
            else {
            }
        };
        GeneralModel.prototype.checkAllOver = function () {
            var self = this;
            var questList = self.getLimitList();
            for (var i = 0; i < questList.length; i++) {
                var questItem = questList[i];
                if (questItem.received) {
                    continue;
                }
                else {
                    return false;
                }
            }
            return true;
        };
        //通知任务信息变更（七日奖励）//任务进度增加的时候会发
        GeneralModel.prototype.changeQuest = function (data) {
            var self = this;
            var vo = data.qinfo;
            if (self._questList) {
                var oldCount = 0;
                for (var _i = 0, _a = self._questList; _i < _a.length; _i++) {
                    var temp = _a[_i];
                    if (temp.questid == vo.questid) {
                        oldCount = temp.count;
                        temp.count = vo.count;
                        // temp.received = vo.received;
                        break;
                    }
                }
                self.postEvent("UpdateTaskList" /* UpdateTaskList */);
                self.postEvent("UpdateTaskList2" /* UpdateTaskList2 */, vo, oldCount);
                var sevendayDone = game.dataMgr.accMo.getVal("sevenday_done");
                var oneTask = self._questList[self._curDay];
                var twoTask = self._questList[self._curDay - 1];
                if (!sevendayDone && oneTask && twoTask && !oneTask.received && !twoTask.received && oneTask.count >= oneTask.cfg.completeCount && twoTask.count >= twoTask.cfg.completeCount) {
                    self.isDone = true; //显示
                }
                else {
                    self.isDone = false; //不显示
                }
                self.postEvent("IsDone" /* IsDone */, self.isDone);
            }
        };
        // ------------------------------客户端发消息--------------------------------------
        //申请请求团队详情（成员列表） performance_team_info
        GeneralModel.prototype.sendSearchTeam = function (team_id) {
            var args = {};
            args.team_id = team_id;
            game.Net.sendMsg(5126 /* c2s_performance_team_info */, args);
        };
        //申请修改团队信息
        GeneralModel.prototype.sendChangeTeamName = function (optype, team_id, limit, nick_name) {
            var args = {};
            args.optype = optype;
            args.team_id = team_id;
            args.limit = limit;
            args.nick_name = nick_name;
            game.Net.sendMsg(5127 /* c2s_performance_team_update */, args);
        };
        //申请创建团队
        GeneralModel.prototype.sendCreateTeam = function (count, nick_name) {
            var args = {};
            args.count = count;
            args.nick_name = nick_name;
            game.Net.sendMsg(5124 /* c2s_performance_team_create */, args);
        };
        //申请团队列表
        GeneralModel.prototype.sendPerformTeamList = function () {
            var args = {};
            game.Net.sendMsg(5125 /* c2s_performance_team_list */, args);
        };
        //申请下级查询
        GeneralModel.prototype.sendPerformanceChild = function (player_id) {
            var args = {};
            args.player_id = player_id;
            game.Net.sendMsg(5122 /* c2s_performance_child */, args);
        };
        //代理列表申请
        GeneralModel.prototype.sendPerformList = function (isFirst) {
            this._isFirstPList = isFirst || false;
            var args = {};
            game.Net.sendMsg(5120 /* c2s_performance_list */, args);
        };
        //申请业绩查询
        GeneralModel.prototype.sendPerformanceInfo = function () {
            var args = {};
            game.Net.sendMsg(5128 /* c2s_performance_info */, args);
        };
        //玩家申请自己的佣金数量
        GeneralModel.prototype.sendGetGain = function () {
            var args = {};
            game.Net.sendMsg(5123 /* c2s_performance_check_gain */, args);
        };
        GeneralModel.prototype.sendAskForGain = function () {
            var args = {};
            game.Net.sendMsg(5121 /* c2s_performance_gain */, args);
        };
        //玩家领取救济金
        GeneralModel.prototype.sendBenefits = function () {
            var args = {};
            game.Net.sendMsg(5037 /* c2s_beneifts */, args);
        };
        //请求任务列表
        GeneralModel.prototype.sendGetQuestlist = function (isOpen, isPopSevenDay) {
            if (isOpen === void 0) { isOpen = true; }
            if (isPopSevenDay === void 0) { isPopSevenDay = false; }
            var self = this;
            self.isOpen = !isOpen ? false : true;
            self._isPopSevenDay = isPopSevenDay;
            var args = {};
            game.Net.sendMsg(5058 /* c2s_get_questlist */, args);
        };
        //领取成就分享奖励
        GeneralModel.prototype.sendshareReward = function () {
            var args = {};
            game.Net.sendMsg(5091 /* c2s_receive_share_reward */, args);
        };
        //微信分享任务
        GeneralModel.prototype.sendWXshareTask = function () {
            var args = {};
            game.Net.sendMsg(5100 /* c2s_wechat_share_task */, args);
        };
        //领取奖励（七日奖励）
        GeneralModel.prototype.sendGetQuestReward = function (questid) {
            var args = { questid: questid };
            game.Net.sendMsg(5059 /* c2s_receive_questreward */, args);
        };
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
        GeneralModel.prototype.getTaskByDay = function (day) {
            var self = this;
            if (!self._questList) {
                return undefined;
            }
            var list = [];
            if (isNaN(day)) {
                day = self._curDay;
            }
            for (var _i = 0, _a = self._questList; _i < _a.length; _i++) {
                var temp = _a[_i];
                if (temp.cfg.group == day) {
                    list.push(temp);
                }
            }
            return list;
        };
        GeneralModel.prototype.setTaskByDay = function (index, day) {
            var self = this;
            if (!self._questList) {
                return undefined;
            }
            if (isNaN(day)) {
                day = self._curDay;
            }
            var count = 0;
            for (var i = 0; i < self._questList.length; i++) {
                if (self._questList[i].cfg.group == day) {
                    if (count == index) {
                        self._questList[i].count++;
                    }
                    count++;
                }
            }
        };
        GeneralModel.prototype.getRestReward = function () {
            var self = this;
            var list = self.getQuest();
            var sum = 0;
            for (var i in list) {
                if (list[i].id >= 3001 && list[i].id <= 3014) {
                    if (list[i].group > self._curDay) {
                        sum += list[i].awardItemCount;
                    }
                }
            }
            return sum / 2;
        };
        //---------------------客服-------------------------------
        GeneralModel.prototype.sendAdviceReq = function (text) {
            var args = {};
            args.text = text;
            game.Net.sendMsg(5097 /* c2s_suggestion */, args);
        };
        GeneralModel.prototype.adviceReqResult = function (data) {
            var self = this;
            if (data.result != 1 /* e_rmt_success */) {
                game.msgPrompt.showErr(data.result);
            }
        };
        GeneralModel.prototype.adviceListReq = function () {
            var args = {};
            game.Net.sendMsg(5098 /* c2s_req_suggest */, args);
        };
        GeneralModel.prototype.adviceListReqResult = function (data) {
            var self = this;
            self._adviceList = data.list;
            self.postEvent("GetadviceListResult" /* GetadviceListResult */, data.list || []);
            self.postEvent("GetadviceListResult" /* GetadviceListResult */, data.list || []);
        };
        GeneralModel.prototype.askFaq = function () {
            var args = {};
            game.Net.sendMsg(5092 /* c2s_req_faq */, args);
        };
        GeneralModel.prototype.faqResult = function (data) {
            this.postEvent("GetFaqResult" /* GetFaqResult */, data.faq_list || []);
            // public faqResult(data: NET_CONF.s2c_req_faq_result) {
            //     this.postEvent(General_EVT.GetFaqResult, data.faq_list || []);
        };
        GeneralModel.prototype.askFaqDetail = function (index) {
            var args = {};
            args.index = index;
            game.Net.sendMsg(5093 /* c2s_req_faq_detail */, args);
        };
        GeneralModel.prototype.faqDetailResult = function (data) {
            this.postEvent("GetFaqDetailResult" /* GetFaqDetailResult */, data.faq);
            // public faqDetailResult(data: NET_CONF.s2c_req_faq_detail_result) {
            //     this.postEvent(General_EVT.GetFaqDetailResult, data.faq);
        };
        //===============================================================================
        //请求vip信息
        GeneralModel.prototype.askVipInfo = function () {
            var args = {};
            game.Net.sendMsg(5150 /* c2s_req_vip_info */, args);
        };
        GeneralModel.prototype.askVipInfoResult = function (data) {
            this.postEvent("GetVipInfoResult" /* GetVipInfoResult */, data.vipexp, data.viplv);
        };
        //===============================================================================
        //打开捕鱼类xx类游戏
        GeneralModel.prototype.showGameClass = function (tag) {
            var self = this;
            self.postEvent("ShowGameClass" /* ShowGameClass */, tag);
        };
        return GeneralModel;
    }(game.DataModel));
    game.GeneralModel = GeneralModel;
    __reflect(GeneralModel.prototype, "game.GeneralModel");
})(game || (game = {}));
var game;
(function (game) {
    var MailModel = (function (_super) {
        __extends(MailModel, _super);
        function MailModel() {
            var _this = _super.call(this) || this;
            _this.initRegHandle();
            return _this;
        }
        MailModel.prototype.initRegHandle = function () {
            var self = this;
            game.Net.regHandle(7586 /* s2c_ask_message_result */, self.askMsgResult, self);
            game.Net.regHandle(7587 /* s2c_delete_message_result */, self.deleteMsgResult, self);
            game.Net.regHandle(7588 /* s2c_read_message_result */, self.readMsgResult, self);
        };
        Object.defineProperty(MailModel.prototype, "list", {
            get: function () {
                return this._mailList || [];
            },
            enumerable: true,
            configurable: true
        });
        MailModel.prototype.rmvList = function (list) {
            var mailList = this._mailList;
            for (var i = 0; i < list.length; i++) {
                var id = list[i];
                for (var j = 0; j < mailList.length; j++) {
                    if (id == mailList[j].id)
                        mailList.splice(j, 1);
                }
            }
        };
        //标记邮件已读
        MailModel.prototype.setReadMail = function (id) {
            var self = this;
            var mailList = self._mailList;
            for (var i = 0; i < mailList.length; i++) {
                var mailInfo = mailList[i];
                if (id == mailInfo.id)
                    mailInfo.read = 1;
            }
        };
        // ------------------------------客户端接收消息--------------------------------------
        //获取邮件列表返回
        MailModel.prototype.askMsgResult = function (data) {
            var self = this;
            var list = self._mailList;
            if (data.result) {
                if (list) {
                    list.concat(data.msg_list);
                }
                else {
                    self._mailList = data.msg_list;
                }
                self.postEvent("mail_list" /* list */);
            }
        };
        //删除邮件返回
        MailModel.prototype.deleteMsgResult = function (data) {
            var self = this;
            if (data.result) {
                //邮件删除成功
                var tip = TRain.langMgr.getTxt("mainLang" /* mainLang */, 690 /* deleteMailSuccess */); //邮件删除成功
                game.TipsMgr.showPrompt(tip);
                self.rmvList(self._rmvList);
                self.postEvent("mail_delete" /* delete */);
            }
        };
        //读取邮件返回
        MailModel.prototype.readMsgResult = function (data) {
            var self = this;
            if (data.result == 1 /* e_rmt_success */) {
                self.setReadMail(data.id);
                self.postEvent("read_mail" /* read */);
            }
        };
        // ------------------------------客户端发消息--------------------------------------
        //发送获取邮件列表的消息
        MailModel.prototype.askMessage = function () {
            var args = {};
            game.Net.sendMsg(5080 /* c2s_ask_message */, args);
        };
        //删除邮件的消息
        MailModel.prototype.deleteMessage = function (list) {
            var args = {};
            args.delete_list = list;
            this._rmvList = list;
            game.Net.sendMsg(5081 /* c2s_delete_message */, args);
        };
        //读取邮件
        MailModel.prototype.readMessage = function (id) {
            var args = {};
            args.id = id;
            game.Net.sendMsg(5082 /* c2s_read_message */, args);
        };
        return MailModel;
    }(game.DataModel));
    game.MailModel = MailModel;
    __reflect(MailModel.prototype, "game.MailModel");
})(game || (game = {}));
var game;
(function (game) {
    // export const enum NotifyMo_EVT{
    //     got_notify = "new"
    // }
    var NotifyModel = (function (_super) {
        __extends(NotifyModel, _super);
        function NotifyModel() {
            var _this = _super.call(this) || this;
            var self = _this;
            self._notifys = [];
            return _this;
            //notifiCenter.addListener( AccountMo_EVT.w2c_notify,self.onNotify, self );
        }
        NotifyModel.prototype.onNotify = function (data) {
            var self = this;
            self._notifys.push(data);
            self.postEvent("new" /* got_notify */);
        };
        NotifyModel.prototype.popNotify = function () {
            return this._notifys.shift();
        };
        return NotifyModel;
    }(game.Notification));
    game.NotifyModel = NotifyModel;
    __reflect(NotifyModel.prototype, "game.NotifyModel");
})(game || (game = {}));
var game;
(function (game) {
    var PluginsModel = (function (_super) {
        __extends(PluginsModel, _super);
        function PluginsModel() {
            var _this = _super.call(this) || this;
            var self = _this;
            self._list = {};
            self.confNm = "conf";
            return _this;
        }
        PluginsModel.prototype.onLoadConf = function (data) {
            var self = this;
            self.confLoaded = true;
            self._conf = data.plugins;
        };
        PluginsModel.prototype.start = function (id, data) {
            var self = this;
            var conf = self._conf[id];
            if (!conf) {
                self.postEvent("fin" /* start_fin */, "conf not find, id=" + id);
                return;
            }
            var pluginInfo = self._list[id];
            if (!pluginInfo) {
                pluginInfo = self._list[id] = { id: id, conf: conf, inited: false };
                var gmdNm = "PLUGIN_" /* HEAD */ + conf.file;
                pluginInfo.gm = URLUtil.getGlobal(gmdNm);
            }
            pluginInfo.data = data;
            if (true) {
                pluginInfo.ver = true;
                self.loadGMD(pluginInfo);
            }
            else {
                self.loadVer(pluginInfo);
            }
        };
        //
        PluginsModel.prototype.stop = function (id) {
            var self = this;
            var pluginInfo = self._list[id];
            if (!pluginInfo) {
                console.error("unplug id[" + id + "] error!");
                return;
            }
            TRain.core.rmvDelayDoByFlag(id);
            TRain.actionMgr.rmvActsByTag(id);
            //TRain.UITheme.setCurGp(null);
            pluginInfo.gm.close();
        };
        //-------------------------------------------------- load ------------------------------------------------
        PluginsModel.prototype.loadGMD = function (curGMD) {
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
            self.tryLoadFin(curGMD);
        };
        PluginsModel.prototype.loadJs = function (curGMD) {
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
                var gmdNm = "PLUGIN_" /* HEAD */ + gmdConf.file;
                var gm = URLUtil.getGlobal(gmdNm);
                if (gm) {
                    curGMD.gm = gm;
                    self.tryLoadFin(curGMD);
                }
                else {
                    self.postEvent("fin" /* start_fin */, "plugin object not find name=" + gmdConf.file);
                }
            });
        };
        PluginsModel.prototype.loadRes = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
                RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, arguments.callee, self);
                curGMD.res = true;
                self.tryLoadFin(curGMD);
            }, self);
            var resUrl = "res_" /* RES_HEAD */ + gmdConf.file + "." + "json" /* JSON */;
            //resUrl = (RES.getVersionController() as TRain.WebVerController).getVirtualUrl(resUrl);
            RES.loadConfig(resUrl, "");
        };
        PluginsModel.prototype.loadTheme = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            var resUrl = "theme_" /* THEME_HEAD */ + gmdConf.file + "." + "json" /* JSON */;
            game.resMgr.loadConf(resUrl, function (data) {
                curGMD.theme = true;
                TRain.UITheme.addSkinConf(data, gmdConf.file);
                self.tryLoadFin(curGMD);
            }, self, true);
        };
        PluginsModel.prototype.loadVer = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            var cb = function (event) {
                if (event.type == egret.Event.COMPLETE) {
                    var request_2 = (event.target);
                    var data = JSON.parse(request_2.response);
                    curGMD.ver = true;
                    if (data.js) {
                        curGMD.jsVer = data.js;
                        delete data.js;
                    }
                    RES.getVersionController().addWebVer(data);
                    self.loadGMD(curGMD);
                }
            };
            var request = new egret.HttpRequest();
            request.addEventListener(egret.Event.COMPLETE, cb, self);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, cb, self);
            request.responseType = egret.HttpResponseType.TEXT;
            request.open("webver_" /* WEBVER_HEAD */ + gmdConf.file + ".ver?v=" + Date.now());
            request.send();
        };
        PluginsModel.prototype.loadGroup = function (curGMD) {
            var self = this;
            var gmdConf = curGMD.conf;
            var cb = function (event) {
                if (event.groupName == gmdConf.file) {
                    RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb, self);
                    curGMD.gp = true;
                    self.loadFin(curGMD);
                }
            };
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, cb, self);
            RES.loadGroup(gmdConf.file);
        };
        PluginsModel.prototype.tryLoadFin = function (curGMD) {
            var self = this;
            if (curGMD.gm && curGMD.res && curGMD.theme && curGMD.ver) {
                if (!curGMD.gp) {
                    self.loadGroup(curGMD);
                }
                else {
                    self.loadFin(curGMD);
                }
            }
        };
        PluginsModel.prototype.loadFin = function (curGMD) {
            var self = this;
            if (curGMD.gp) {
                var gmdConf = curGMD.conf;
                game.dataMgr.accMo.gameId = gmdConf.id;
                if (!curGMD.inited) {
                    curGMD.gm.init();
                    curGMD.inited = true;
                }
                TRain.UITheme.setCurGp(gmdConf.file);
                curGMD.gm.start(curGMD.data);
                self.postEvent("fin" /* start_fin */);
            }
        };
        return PluginsModel;
    }(game.DataModel));
    game.PluginsModel = PluginsModel;
    __reflect(PluginsModel.prototype, "game.PluginsModel");
})(game || (game = {}));
var game;
(function (game) {
    var RollGoldModel = (function () {
        function RollGoldModel() {
            var self = this;
            self._time = 50;
            self._gapNum = 5;
        }
        RollGoldModel.prototype.init = function (betAreaNum, isBit, isNeedYuan) {
            var self = this;
            self._betAreaNum = betAreaNum;
            self._goldList = [];
            for (var i = 0; i < betAreaNum; i++) {
                self._goldList.push(0);
            }
            self._goldList2 = [];
            for (var i = 0; i < betAreaNum; i++) {
                self._goldList2.push(0);
            }
            self._isBit = isBit;
            self._isNeedYuan = isNeedYuan;
        };
        RollGoldModel.prototype.initGold = function (gold) {
            var self = this;
            self._goldList = gold.concat();
            self._goldList2 = gold.concat();
        };
        RollGoldModel.prototype.reset = function () {
            var self = this;
            self._goldList = [];
            for (var i = 0; i < self._betAreaNum; i++) {
                self._goldList.push(0);
            }
            self._goldList2 = [];
            for (var i = 0; i < self._betAreaNum; i++) {
                self._goldList2.push(0);
            }
        };
        /**
         * @param index 0~x
         * @param gold 没有/100  就是差值
         */
        RollGoldModel.prototype.setCurGold = function (index, gold, target, thisObj, flag) {
            var self = this;
            if (gold <= 0) {
                return;
            }
            // if (self._goldList[index] < self._goldList2[index]) {
            //     self._goldList[index] = self._goldList2[index];
            //     self.setData(self._goldList[index], index);
            // }
            self._goldList2[index] = self._goldList[index] + gold; //实际增加一次的最终值
            var goldNum = Math.floor(gold / self._gapNum);
            var _loop_2 = function (i) {
                self._goldList[index] += goldNum;
                var value = 0;
                if (i == self._gapNum - 1) {
                    if (self._goldList[index] != self._goldList2[index]) {
                        value = self._goldList2[index];
                    }
                    else {
                        value = self._goldList[index];
                    }
                }
                else {
                    value = self._goldList[index];
                }
                var num = TRain.core.addDelayDo(function () {
                    target.text = self.setData(value, index);
                    TRain.core.rmvDelayDoByID(num);
                }, thisObj, self._time * i, flag);
            };
            for (var i = 0; i < self._gapNum; i++) {
                _loop_2(i);
            }
        };
        RollGoldModel.prototype.setData = function (gold, index) {
            var self = this;
            var name = !self._isBit ? TRain.langMgr.getTxt("mainLang" /* mainLang */ + "", 201 /* RMBText */) : "y" /* y */;
            if (!self._isNeedYuan)
                name = "";
            return Math.floor(game.DataFormat.convertGold(gold)).toString() + name;
        };
        return RollGoldModel;
    }());
    game.RollGoldModel = RollGoldModel;
    __reflect(RollGoldModel.prototype, "game.RollGoldModel");
    game.rollGoldMgr = new RollGoldModel;
})(game || (game = {}));
var game;
(function (game) {
    var RouteLineModel = (function (_super) {
        __extends(RouteLineModel, _super);
        /**
         *
         * @param tpCnt 类型数量
         * @param maxRow 最大局数
         * @param maxNotHit 最大未命中数
         */
        function RouteLineModel(tpCnt, maxRow, maxHit) {
            var _this = _super.call(this) || this;
            var self = _this;
            self._historys = [];
            self.tps = [];
            self.hits = [];
            self._tpCnt = tpCnt || 8;
            self._maxRow = maxRow || 100;
            self._maxNHit = maxHit || 50;
            return _this;
        }
        Object.defineProperty(RouteLineModel.prototype, "historys", {
            get: function () {
                return this._historys;
            },
            //设置 将会重置数据
            set: function (datas) {
                var self = this;
                self._historys = datas;
                self.tps.length = 0;
                var hits = self.hits;
                for (var i = 0, len = hits.length; i < len; ++i) {
                    CacheUtil.freeArr(hits[i]);
                }
                hits.length = 0;
                for (var i = 0, len = datas.length; i < len; ++i) {
                    var tp = self.history2Tp(datas[i]);
                    self._addHistory(tp);
                }
                self.delayPostEvent("d_change" /* DATA_CHANGE */, 0);
            },
            enumerable: true,
            configurable: true
        });
        RouteLineModel.prototype.addHistory = function (data) {
            var self = this;
            var historys = self._historys;
            historys.push(data);
            if (historys.length > self._maxRow) {
                self._shiftHistory();
            }
            var tp = self.history2Tp(data);
            self._addHistory(tp);
            self.delayPostEvent("d_change" /* DATA_CHANGE */, 0);
        };
        RouteLineModel.prototype._addHistory = function (tp) {
            var self = this;
            var newRowDatas = CacheUtil.getArr();
            var hits = self.hits;
            newRowDatas[tp] = 0;
            var tpCnt = self._tpCnt;
            var row = hits.length;
            if (row > 0) {
                var maxNotHit = self._maxNHit;
                var lastRowDatas = hits[row - 1];
                for (var i = 0; i < tpCnt; ++i) {
                    if (i != tp) {
                        var lastHitCnt = lastRowDatas[i];
                        newRowDatas[i] = lastHitCnt < maxNotHit ? lastHitCnt + 1 : maxNotHit;
                    }
                }
            }
            else {
                for (var i = 0; i < tpCnt; ++i) {
                    if (i != tp)
                        newRowDatas[i] = 1;
                }
            }
            hits.push(newRowDatas);
            self.tps.push(tp);
        };
        RouteLineModel.prototype._shiftHistory = function () {
            var self = this;
            self._historys.shift();
            self.tps.shift();
            var tmpTps = CacheUtil.getArr();
            var i = 0, len = 0, j = 0;
            var tpCnt = self._tpCnt;
            for (; i < tpCnt; ++i) {
                tmpTps.push(i);
            }
            var hits = self.hits;
            CacheUtil.freeArr(hits.shift());
            for (i = 0, len = hits.length; i < len; ++i) {
                var rowDatas = hits[i];
                for (j = tmpTps.length - 1; j >= 0; --j) {
                    var tp = tmpTps[j];
                    var hitTp = rowDatas[tp];
                    if (hitTp <= 1) {
                        tmpTps.splice(j, 1);
                    }
                    else {
                        if (hitTp == self._maxNHit) {
                            tmpTps.splice(j, 1);
                        }
                        rowDatas[tp] = hitTp - 1;
                    }
                }
                if (tmpTps.length <= 0)
                    break;
            }
            CacheUtil.freeArr(tmpTps);
        };
        return RouteLineModel;
    }(game.Notification));
    game.RouteLineModel = RouteLineModel;
    __reflect(RouteLineModel.prototype, "game.RouteLineModel");
})(game || (game = {}));
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
        var os = egret.Capabilities.os;
        var currOS;
        switch (os) {
            case "iOS":
                currOS = 1 /* iOS */;
                break;
            case "Android":
                currOS = 2 /* Android */;
                break;
            case "Windows Phone":
                currOS = 3 /* WinPhone */;
                break;
            case "Windows PC":
                currOS = 4 /* WinPC */;
                break;
            case "Mac OS":
                currOS = 5 /* MacOS */;
                break;
            default:
                break;
        }
        game.GameUtil.os = currOS;
        //设置加载进度界面
        var loadingUI = self.loadingView = new LoadingUI();
        self.addChild(loadingUI);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, self.onConfigComplete, self);
        RES.loadConfig("res.json", "");
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
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, self.onConfigComplete, self);
        self.loadThemeAndPre();
    };
    Main.prototype.loadThemeAndPre = function () {
        var self = this;
        TRain.UITheme.loadInitConf("theme.json", self.onThemeInitFin, self);
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
        game.GameUtil.loadParam();
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
var game;
(function (game) {
    var RouteTpModel = (function (_super) {
        __extends(RouteTpModel, _super);
        //取 类型结果 从0开始取
        function RouteTpModel(tpCnt) {
            var _this = _super.call(this) || this;
            var self = _this;
            var zpls = self._zpls = [];
            self._tpCnt = tpCnt;
            if (tpCnt > 5 /* max */) {
                var tmps = self._tmps;
                var routes = self._routes;
                for (var i = 5 /* max */; i < tpCnt; ++i) {
                    routes.push([]);
                    tmps.push([]);
                }
            }
            for (var i = 0; i < tpCnt; ++i) {
                zpls.push([]);
            }
            return _this;
        }
        Object.defineProperty(RouteTpModel.prototype, "historys", {
            get: function () {
                return this._historys;
            },
            //设置 将会重置数据
            set: function (data) {
                var self = this;
                self._historys = data;
                var tmps = self._tmps;
                var routes = self._routes;
                for (var i = 0, len = self._tpCnt; i <= len; ++i) {
                    self.freeArrs(tmps[i]);
                    routes[i].length = 0;
                }
                self._handHistory(0, true);
                self.delayPostEvent("d_change" /* DATA_CHANGE */, 0);
            },
            enumerable: true,
            configurable: true
        });
        RouteTpModel.prototype.getForecast = function () {
            return null;
        };
        //----------------------------------------------------------------------
        RouteTpModel.prototype._handHistory = function (stIdx, resetSub) {
            var self = this;
            var historys = self._historys;
            var routes = self._routes;
            var zpls = self._zpls;
            var tmps = self._tmps;
            var lastIdxs = self._lastIdxs;
            var doFun = self.data2Zhupanlu;
            var tpCnt = self._tpCnt;
            var historyLen = historys.length;
            for (var tp = 0; tp < tpCnt; ++tp) {
                var zplTmp = zpls[tp];
                var zplStIdx = zplTmp.length;
                for (var i = stIdx; i < historyLen; i++) {
                    zplTmp.push(doFun(historys[i], tp));
                }
                var daluTmp = tmps[tp];
                var oldCol = daluTmp.length;
                var oldRow = 0;
                if (oldCol > 0) {
                    oldCol--;
                    oldRow = daluTmp[oldCol].length;
                }
                self.zpl2Dalu(zplTmp, zplStIdx, daluTmp);
                var ret = routes[tp];
                if (resetSub) {
                    oldCol = 0;
                    oldRow = 0;
                    ret.length = 0;
                }
                lastIdxs[tp] = self.two2one(daluTmp, ret, oldCol, oldRow);
            }
        };
        RouteTpModel.prototype.shiftHistory = function (cnt) {
            var self = this;
            var historys = self._historys;
            historys.splice(0, cnt);
            var zpls = self._zpls;
            var tmps = self._tmps;
            for (var i = 0, len = self._tpCnt; i < len; ++i) {
                zpls[i].splice(0, cnt);
                var list = tmps[i];
                var tmpCnt = cnt;
                while (tmpCnt > 0) {
                    var colDatas = list[0];
                    var len_1 = colDatas.length;
                    if (len_1 > tmpCnt) {
                        colDatas.splice(0, tmpCnt);
                        tmpCnt = 0;
                    }
                    else {
                        CacheUtil.freeArr(list.shift());
                        tmpCnt -= len_1;
                    }
                }
            }
        };
        return RouteTpModel;
    }(game.RouteModel));
    game.RouteTpModel = RouteTpModel;
    __reflect(RouteTpModel.prototype, "game.RouteTpModel");
})(game || (game = {}));
var game;
(function (game) {
    var SoundModel = (function () {
        function SoundModel() {
        }
        // public playSound(id:number):void{
        //     let self = this;
        //     let soundMgr = TRain.soundMgr;
        //     let soundConf = dataMgr.gameMo.getSoundConf(id);
        //     if(id == 8 || id == 9){//播放背景音乐
        //         soundMgr.playMusic(soundConf.name);
        //     }else{
        //         soundMgr.playSFX(soundConf.name);
        //     }
        // }
        SoundModel.prototype.setState = function (val) {
            var soundMgr = TRain.soundMgr;
            game.GameUtil.setLocal("SFX_STATUS" /* SFX_STATUS */, val);
            soundMgr.sfxState = val;
            game.GameUtil.setLocal("MUSIC_STATUS" /* MUSIC_STATUS */, val);
            soundMgr.musicState = val;
        };
        SoundModel.prototype.getState = function () {
            var soundMgr = TRain.soundMgr;
            return soundMgr.musicState || soundMgr.sfxState;
        };
        return SoundModel;
    }());
    game.SoundModel = SoundModel;
    __reflect(SoundModel.prototype, "game.SoundModel");
})(game || (game = {}));
var CONF;
(function (CONF) {
    CONF.inner = 1;
    //export let svrUrl = "http://10.0.0.116:8611"; 
    //export let svrUrl = "http://192.168.1.49:8611";
    // export let svrUrl = "https://www.zhuangroume.com:1002/"
    CONF.svrUrl = "http://3.113.107.12:1001";
    //export let svrUrl = "http://10.0.0.211:8611";
    //export let svrUrl = "https://www.qilinziguan.net" 
    // export let svrUrl = "https://www.tiantianypt.com"
    CONF.kefuUrl = "https://www.mmhtml.com/";
    CONF.erweima = "https://www.best-xiaoxiao.xyz/";
    CONF.isNative = false;
    CONF.channelId = "657054_1"; // 440001  657054_1 
    CONF.agentId = "3"; // 1  3
    CONF.shareId = "657054_1"; //分享id // 440001 657054_1
    CONF.deviceId = ""; //设备号
    CONF.res = {};
})(CONF || (CONF = {}));
;
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
            // img.perHeight = 100;
            // img.perWidth = 100;
            img.hCenter = 0;
            img.vCenter = 0;
            img.source = "common@jzBottom";
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
            if (self._cnt > 0)
                self._cnt--;
            self.update();
        };
        BusyLayer.prototype.stopBusy = function () {
            var self = this;
            self._cnt = 0;
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
    var ChipManager = (function () {
        function ChipManager() {
            this._chipArr = [];
            var self = this;
            this._areaArr = [];
            self._aniTag = TRain.actionMgr.getUnitTag();
            self._pure = false;
        }
        ChipManager.prototype.setParent = function (p) {
            this._parent = p;
            p.touchThrough = true;
            p.touchEnabled = false;
        };
        ChipManager.prototype.resetAreaArr = function () {
            var self = this;
            self.clear();
            self._areaArr = [];
        };
        /**
         *
         * @param id 区域id
         * @param maxCnt 区域最大显示数量
         * @param x 区域的x ,转化为舞台的全局坐标
         * @param y 区域的y ,转化为舞台的全局坐标
         * @param w 区域的w
         * @param h 区域的h
         */
        ChipManager.prototype.addArea = function (id, maxCnt, x, y, w, h) {
            var self = this;
            var areaArr = self._areaArr;
            var area = areaArr[id];
            if (area && (area.x != x || area.y != y)) {
                if (area.w) {
                    x += 25 /* halfW */;
                    y += 27 /* halfH */;
                }
                area.x = x;
                area.y = y;
                var tiles = area.tiles;
                var i = 0, len = tiles.length;
                for (; i < len; i++) {
                    self.freeChip(tiles[i]);
                }
                tiles.length = 0;
                tiles = area.flyTiles;
                i = 0, len = tiles.length;
                for (; i < len; i++) {
                    var tile = tiles[i];
                    TRain.actionMgr.rmvActsByTar(tile);
                    self.freeChip(tile);
                }
                tiles.length = 0;
            }
            else {
                if (w) {
                    x += 25 /* halfW */;
                    y += 27 /* halfH */;
                    w -= 50 /* w */;
                    h -= 54 /* h */;
                }
                areaArr[id] = { id: id, maxCnt: maxCnt, x: x, y: y, w: w, h: h, tiles: [], flyTiles: [] };
            }
        };
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
        ChipManager.prototype.addChip = function (formAreaId, toAreaId, tm, data, bScale, eScale, sfxName, delay, cb, thisObj) {
            bScale = bScale || 0.5;
            eScale = eScale || 0.55;
            delay = delay || 0;
            sfxName = sfxName || "sound_jetton" /* jetton */;
            if (delay >= 0)
                TRain.soundMgr.playSFX(sfxName, delay);
            var self = this;
            var formArea = self._areaArr[formAreaId];
            var toArea = self._areaArr[toAreaId];
            var chip = self.getChip();
            chip.alpha = 1;
            chip.setData(data.chipId, data.gold, data.chipTp);
            chip.tag = toAreaId;
            toArea.flyTiles.push(chip);
            var parent = self._parent;
            parent.addChild(chip);
            chip.x = formArea.x;
            chip.y = formArea.y;
            chip.scaleX = chip.scaleY = bScale;
            var toPointX = toArea.x + Math.floor(Math.random() * (toArea.w || 0));
            var toPointY = toArea.y + Math.floor(Math.random() * (toArea.h || 0));
            var delaytm = Math.floor(Math.random() * 500);
            var actionDelay = new TRain.Action(delaytm);
            var toProps = { x: toPointX, y: toPointY };
            if (bScale != eScale) {
                toProps.scaleY = toProps.scaleX = eScale;
            }
            var action = new TRain.ActionPropTo(tm, 1, toProps);
            action.setEaseFun(EaseUtil.quadOut);
            var actionCall = new TRain.ActionCallDo();
            actionCall.setCall(function () {
                self.addChipToArea(chip);
                if (cb)
                    cb.apply(thisObj);
            }, self);
            var actionSeq = new TRain.ActionSequence([actionDelay, action, actionCall]);
            TRain.actionMgr.addAction(actionSeq, chip, false, self._aniTag);
        };
        /**
         *
         * @param pure true 纯净模式
         */
        ChipManager.prototype.setPure = function (pure) {
            var self = this;
            self._pure = pure;
            if (pure) {
                var parent_2 = self._parent;
                var areaArr = self._areaArr;
                for (var key in areaArr) {
                    var tiles = areaArr[key].tiles;
                    for (var i = 0; i < tiles.length; i++) {
                        var chip = tiles[i];
                        if (chip.parent)
                            parent_2.removeChild(chip);
                    }
                }
            }
            else {
                for (var key in self._areaArr) {
                    var tiles = self._areaArr[key].tiles;
                    for (var i = 0; i < tiles.length; i++) {
                        var chip = tiles[i];
                        chip.alpha = 1;
                        self._parent.addChild(chip);
                    }
                }
            }
        };
        ChipManager.prototype.isPure = function () {
            return this._pure;
        };
        ChipManager.prototype.addChipToArea = function (chip) {
            var self = this;
            var tag = chip.tag;
            var area = self._areaArr[tag];
            var tiles = area.tiles;
            var flyTiles = area.flyTiles;
            var idx = flyTiles.indexOf(chip);
            if (idx >= 0)
                flyTiles.splice(idx, 1);
            if (area.maxCnt <= tiles.length) {
                self.freeChip(tiles.shift());
            }
            tiles.push(chip);
            if (self._pure) {
                var action = new TRain.ActionPropTo(500, 1, { alpha: 0 });
                var actionCall = new TRain.ActionCallDo();
                actionCall.setCall(function () {
                    if (chip.parent)
                        chip.parent.removeChild(chip);
                }, self);
                var actionSeq = new TRain.ActionSequence([action, actionCall]);
                TRain.actionMgr.addAction(actionSeq, chip, false, self._aniTag);
            }
        };
        /**
         *
         * @param formAreaId 出发点区域id
         * @param toAreaId 到达点区域id
         * @param flytm 飞行的总时间
         * @param isPlay 是否播放声音
         */
        ChipManager.prototype.moveAll = function (formAreaId, toAreaId, flytm, isPlay) {
            if (isPlay === void 0) { isPlay = true; }
            var self = this;
            if (!self._flyBefore)
                self._flyBefore = self._pure; //记录飞行前的模式
            self.setPure(false);
            var formArea = self._areaArr[formAreaId];
            var formTiles = formArea.tiles;
            self.moveChip(formTiles, toAreaId, flytm, 20, "win_bet" /* win_bet */, isPlay);
            formTiles.length = 0;
            return flytm + 500;
        };
        /**
         *
         * @param formAreaId 出发点区域id
         * @param toAreaIds 到达点区域ids
         * @param flytm  飞行的总时间
         * @param isPlay  是否播放声音 默认播
         */
        ChipManager.prototype.moveAllMuti = function (formAreaId, toAreaIds, flytm, isPlay) {
            if (isPlay === void 0) { isPlay = true; }
            var self = this;
            if (!self._flyBefore)
                self._flyBefore = self._pure; //记录飞行前的模式
            self.setPure(false);
            var formArea = self._areaArr[formAreaId];
            var formTotalLen = formArea.tiles.length;
            var formAllTile = formArea.tiles;
            for (var i = 0, len = toAreaIds.length; i < len; i++) {
                var toArea = toAreaIds[i];
                var toAreaId = toArea.id;
                var formLen = Math.floor(toArea.wg * formTotalLen);
                var formTiles = formAllTile.splice(0, formLen);
                self.moveChip(formTiles, toAreaId, flytm, 20, "win_bet" /* win_bet */, (isPlay && i == 0));
            }
            var endLen = formAllTile.length;
            for (var j = 0; j < endLen; j++) {
                self.freeChip(formAllTile[j]);
            }
            formAllTile.length = 0;
            return flytm + 500;
        };
        ChipManager.prototype.moveChip = function (formTiles, toAreaId, flyTm, maxCnt, sfxName, isPlay) {
            var self = this;
            maxCnt = maxCnt || 20;
            sfxName = sfxName || "win_bet" /* win_bet */;
            if (isPlay)
                TRain.soundMgr.playSFX(sfxName);
            var formAllLen = formTiles.length;
            var len = formAllLen > maxCnt ? maxCnt : formAllLen;
            var toArea = self._areaArr[toAreaId];
            var flyTiles = toArea.flyTiles;
            var toAreaX = toArea.x, toAreaY = toArea.y, toAreaW = toArea.w, toAreaH = toArea.h;
            var tmpX, tmpY;
            var delaytm = 0;
            var _loop_3 = function (i) {
                var chip = formTiles[i];
                chip.tag = toAreaId;
                flyTiles.push(chip);
                var actionSeq = new TRain.ActionSequence();
                var actionDelay = new TRain.Action(delaytm);
                actionSeq.addAction(actionDelay);
                delaytm += 16.7;
                tmpX = toAreaX;
                tmpY = toAreaY;
                if (toAreaW) {
                    tmpX += Math.floor(Math.random() * toAreaW);
                    tmpY += Math.floor(Math.random() * toAreaH);
                }
                var action = new TRain.ActionPropTo(flyTm, 1, {
                    x: tmpX,
                    y: tmpY
                });
                action.setEaseFun(EaseUtil.quartOut);
                actionSeq.addAction(action);
                var actionCall = new TRain.ActionCallDo();
                actionCall.setCall(function () {
                    self.addChipToArea(chip);
                }, self);
                actionSeq.addAction(actionCall);
                TRain.actionMgr.addAction(actionSeq, chip, false, self._aniTag);
            };
            for (var i = 0; i < len; i++) {
                _loop_3(i);
            }
            var m = len;
            for (; m < formAllLen; m++) {
                self.freeChip(formTiles[m]);
            }
            formTiles.length = 0;
        };
        ChipManager.prototype.clear = function () {
            var self = this;
            if (self._flyBefore) {
                self._flyBefore = null;
                self.setPure(true);
            }
            var parent = self._parent;
            if (parent)
                parent.removeChildren();
            TRain.actionMgr.rmvActsByTag(this._aniTag);
            //回收所有筹码
            var areaArr = self._areaArr;
            for (var key in areaArr) {
                var area = areaArr[key];
                var tiles = area.tiles;
                var i = 0, len = tiles.length;
                for (; i < len; i++) {
                    self.freeChip(tiles[i]);
                }
                tiles.length = 0;
                tiles = area.flyTiles;
                i = 0, len = tiles.length;
                for (; i < len; i++) {
                    self.freeChip(tiles[i]);
                }
                tiles.length = 0;
            }
        };
        ChipManager.prototype.getChip = function () {
            return this._chipArr.length > 0 ? this._chipArr.pop() : new game.ChipTile();
        };
        ChipManager.prototype.freeChip = function (chip) {
            if (chip.parent) {
                chip.parent.removeChild(chip);
            }
            if (this._chipArr.length < 100) {
                //chip.clear();
                this._chipArr.push(chip);
            }
            else {
                chip.dispose();
            }
        };
        return ChipManager;
    }());
    game.ChipManager = ChipManager;
    __reflect(ChipManager.prototype, "game.ChipManager");
})(game || (game = {}));
var game;
(function (game) {
    var DataFormat;
    (function (DataFormat) {
        function formatGold(gold, isLang, fixed) {
            var self = this;
            var value = convertGold(gold);
            var goldStr = "";
            var wGold = value / 10000;
            if (value > 10000) {
                var bGold = wGold / 10000;
                if (bGold > 10000) {
                    goldStr = bGold.toFixed(fixed || 2) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 683 /* hundredMillionRmb */) : "by" /* by */);
                }
                else {
                    goldStr = wGold.toFixed(fixed || 2) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 682 /* tenThousandRmb */) : "wy" /* wy */);
                }
            }
            else {
                goldStr = value.toFixed(fixed || 2) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */) : "y" /* y */);
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
        //原始格式
        function convertGold(value) {
            if (value == null || isNaN(value)) {
                return 0;
            }
            return value / 100 /* MoneyBase */;
        }
        DataFormat.convertGold = convertGold;
        //万亿格式,带小数
        function convertGoldString2(gold, isLang) {
            var value = convertGold(gold);
            if (value >= 100000000) {
                return (Math.floor(value / 1000000) / 100).toFixed(2) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 685 /* hundredMillion */) : "b" /* b */);
            }
            else if (value >= 10000) {
                return (Math.floor(value / 100) / 100).toFixed(2) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 684 /* tenThousand */) : "w" /* w */);
            }
            else if (value >= 1000) {
                return (Math.floor(value / 100) / 10).toFixed(2) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 684 /* tenThousand */) : "q" /* q */); //千
            }
            else {
                return value.toFixed(2);
            }
        }
        DataFormat.convertGoldString2 = convertGoldString2;
        //有小数显示小数，没小数不显示
        function convertGoldString3(gold) {
            var value = convertGold(gold);
            var intValue = Math.floor(value);
            if (intValue == value) {
                return intValue.toString();
            }
            else {
                return value.toFixed(2);
            }
        }
        DataFormat.convertGoldString3 = convertGoldString3;
        //格式化金币，不带小数点后两位
        function convertGoldString4(gold, isLang) {
            var value = convertGold(gold);
            if (value >= 100000000) {
                return (Math.floor(value / 1000000) / 100) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 685 /* hundredMillion */) : "b" /* b */);
            }
            else if (value >= 10000) {
                return (Math.floor(value / 100) / 100) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 684 /* tenThousand */) : "w" /* w */);
            }
            else if (value >= 1000) {
                return (Math.floor(value / 100) / 10) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 684 /* tenThousand */) : "q" /* q */); //千
            }
            else {
                return String(value);
            }
        }
        DataFormat.convertGoldString4 = convertGoldString4;
        function convertYuanString(value, isLang) {
            return convertGold(value) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */) : "y" /* y */);
        }
        DataFormat.convertYuanString = convertYuanString;
        //万亿格式,带小数
        function convertYuanString2(gold, isLang) {
            var value = convertGold(gold);
            if (value >= 100000000) {
                return (Math.floor(value / 1000000) / 100) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 683 /* hundredMillionRmb */) : "by" /* by */);
            }
            else if (value >= 10000) {
                return (Math.floor(value / 100) / 100) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 682 /* tenThousandRmb */) : "wy" /* wy */);
            }
            else {
                return value + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */) : "y" /* y */);
            }
        }
        DataFormat.convertYuanString2 = convertYuanString2;
        //有小数显示小数，没小数不显示
        function convertYuanString3(gold, isLang) {
            var value = convertGold(gold);
            var intValue = Math.floor(value);
            if (intValue == value) {
                return intValue + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */) : "y" /* y */);
            }
            else {
                return value.toFixed(2) + (isLang ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */) : "y" /* y */);
            }
        }
        DataFormat.convertYuanString3 = convertYuanString3;
        //格式化名字显示
        //maxLen 策划要求的字符数量的最大值
        //halfLen  策划要显示的半角数
        function formatName(name, maxLen, halfLen) {
            var str = CheckStringLength(name);
            var len = str[0];
            var chaLen = str[1];
            if (len > (maxLen || 10)) {
                var firstIdx = void 0;
                var tmpHalfLen = (halfLen || 6);
                var halfIdx = (tmpHalfLen / 2);
                if (chaLen >= halfIdx) {
                    firstIdx = halfIdx;
                }
                else {
                    firstIdx = tmpHalfLen - chaLen;
                }
                var replaceStr = name.substring(firstIdx);
                return name.replace(replaceStr, "...");
            }
            else {
                return name;
            }
        }
        DataFormat.formatName = formatName;
        //返回半角字符长度和有几个全角
        function CheckStringLength(txt) {
            var len = 0;
            var chaLen = 0;
            for (var i = 0; i < txt.length; i++) {
                if (txt.charCodeAt(i) >= 0x4e00 && txt.charCodeAt(i) <= 0x9fa5) {
                    len += 2;
                    chaLen++;
                }
                else {
                    len += 1;
                }
            }
            return [len, chaLen];
        }
        DataFormat.CheckStringLength = CheckStringLength;
    })(DataFormat = game.DataFormat || (game.DataFormat = {}));
})(game || (game = {}));
var game;
(function (game) {
    var MsgBox;
    (function (MsgBox) {
        //tag =0 表示取消  =1表示确定
        function showBoxCB(gp, key, fun, tar) {
            var txt = TRain.langMgr.getTxt(gp, key);
            game.BoxMgr.showBox(txt, fun, tar);
        }
        MsgBox.showBoxCB = showBoxCB;
        function showBoxCB2(str, fun, tar) {
            game.BoxMgr.showBox(str, fun, tar);
        }
        MsgBox.showBoxCB2 = showBoxCB2;
        function showPrintBoxCB(gpName, key, fun, tar) {
            var rest = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                rest[_i - 4] = arguments[_i];
            }
            var txt = TRain.langMgr.getTxt(gpName, key);
            rest.unshift(txt);
            txt = StringUtil.printf.apply(StringUtil, rest);
            game.BoxMgr.showBox(txt, fun, tar);
        }
        MsgBox.showPrintBoxCB = showPrintBoxCB;
        function showBox(gp, key, other) {
            var txt = TRain.langMgr.getTxt(gp, key);
            if (other)
                txt += other;
            game.BoxMgr.showBox(txt);
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
            game.TipsMgr.showPrompt(txt, 15615301 /* red */);
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
            game.TipsMgr.showPrompt(txt, 15615301 /* red */);
            // }
        }
        MsgBox.showPrompt = showPrompt;
        /**
         *
         * @param gpName
         * @param key
         * @param color  默认白色
         */
        function showTxt(gpName, key, size, color) {
            var txt = TRain.langMgr.getTxt(gpName, key);
            game.TipsMgr.showPrompt(txt, color, 3000, false, size);
        }
        MsgBox.showTxt = showTxt;
        /**
         *
         * @param gpName
         * @param key
         * @param repValue 要替换的
         * @param color  默认白色
         */
        function showPrintfTxt(gpName, key, color) {
            var rest = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                rest[_i - 3] = arguments[_i];
            }
            var txt = TRain.langMgr.getTxt(gpName, key);
            rest.unshift(txt);
            txt = StringUtil.printf.apply(StringUtil, rest);
            game.TipsMgr.showPrompt(txt, (color == undefined) ? 16777215 /* white */ : color);
        }
        MsgBox.showPrintfTxt = showPrintfTxt;
    })(MsgBox = game.MsgBox || (game.MsgBox = {}));
    game.msgPrompt = MsgBox;
})(game || (game = {}));
var game;
(function (game) {
    var UIUtils;
    (function (UIUtils) {
        UIUtils.quakeFun = EaseUtil.getQuakeFun(5, 5);
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
        /**
         * @param targetPos中可以设置多个属性 例如 x ,y , scaleX,scaleY   {x:600,y:110,scaleX:0.3,scaleY:0.3}
         * confConsts.GameTp.xxx
         * TRain.core.addDelayDo( move, self, delayTime, 游戏id, false, display, targetPos, speed, dur ,times );
         */
        function move(display, targetPos, speed, dur, times, cb, flag) {
            if (dur === void 0) { dur = 1000; }
            if (times === void 0) { times = 1; }
            var action = new TRain.ActionPropTo(dur, times, targetPos);
            action.setEaseFun(speed);
            if (cb) {
                var actionCall = new TRain.ActionCallDo();
                actionCall.setCall(cb, self);
                action = new TRain.ActionSequence([action, actionCall]);
            }
            TRain.actionMgr.addAction(action, display, false, flag);
        }
        UIUtils.move = move;
        // export function createMoveAct( x:number, y:number, dur:number, action?:TRain.ActionPropTo ):TRain.ActionPropTo{
        // 	action = action || new TRain.ActionPropTo(dur || 1000, 1 );
        // 	action.addProp();
        // 	return action;
        // }
        // export function createScaleAct( scaleX:number, scaleY:number, dur:number, action?:TRain.ActionPropTo ):TRain.ActionPropTo{
        // 	action = action || new TRain.ActionPropTo(dur || 1000, 1 );
        // 	return action;
        // }
        /**
         * @param targetPos中可以设置多个属性 例如 x ,y , scaleX,scaleY   {x:600,y:110,scaleX:0.3,scaleY:0.3}
         */
        function startActCB(display, actions, cb, flag) {
            var actionSeq = new TRain.ActionSequence();
            actionSeq.setActions(actions);
            if (cb) {
                var actionCall = new TRain.ActionCallDo();
                actionCall.setCall(cb, self);
                actionSeq.addAction(actionCall);
            }
            TRain.actionMgr.addAction(actionSeq, display, false, flag);
        }
        UIUtils.startActCB = startActCB;
        // export function scaleAct(display:egret.DisplayObject,dur:number,dur1:number,scaleX:number,scaleY:number,cb?:Function):void{
        // 	let self = this;
        // 	let oldScaleX = display.scaleX;
        // 	let oldScaleY = display.scaleY;
        // 	let action = new TRain.ActionPropTo(dur,1,{scaleX:scaleX,scaleY:scaleY});
        //     action.setEaseFun(EaseUtil.quadIn);
        //     let action2 = new TRain.ActionPropTo(dur1,1,{scaleX:oldScaleX,scaleY:oldScaleX});
        // 	action2.setEaseFun(EaseUtil.quadOut);
        // 	self.startActCB(display,[action,action2],cb);
        // }
        /**
         * @param scr:资源名
         * @param closeTm:合上的时间
         * @param openTm:翻开的时间
         * @param scaleX:翻开后的scale
         */
        function flipCardCB(display, scr, scaleX, closeTm, openTm, cb, flag) {
            var self = this;
            var action = new TRain.ActionPropTo(closeTm || 250, 1, { scaleX: 0 });
            action.setEaseFun(EaseUtil.quadIn);
            var action1 = new TRain.ActionPropDo(0, { source: scr });
            var action2 = new TRain.ActionPropTo(openTm || 150, 1, { scaleX: scaleX });
            action2.setEaseFun(EaseUtil.quadOut);
            display.anthorPerX = 0.5;
            self.startActCB(display, [action, action1, action2], cb, flag);
        }
        UIUtils.flipCardCB = flipCardCB;
        /**
         * @param missTm:什么时间消失
         *
         * @param LookTm:什么时间出现
         */
        function flashAni(display, missTm, endTm, cb, flag) {
            var action = new TRain.ActionPropDo(missTm, { visible: false });
            var action2 = new TRain.ActionPropDo(endTm, { visible: true });
            startActCB(display, [action, action2], cb, flag);
        }
        UIUtils.flashAni = flashAni;
        //来回缓动
        function sin(t) {
            return Math.sin(t * Math.PI);
        }
        UIUtils.sin = sin;
        function secToStr(sec) {
            var min = Math.floor(sec / 60); //分
            sec = sec - min * 60; //秒
            var minStr = min > 9 ? min : ("0" + min);
            var secStr = sec > 9 ? sec : ("0" + sec);
            return minStr + ":" + secStr;
        }
        UIUtils.secToStr = secToStr;
        /**
         *
         * @param parent 存放星星的容器
         * @param form 初始位置
         * @param to 结束位置
         * @param flyTm 飞行时间
         * @param flag 标记
         * @param cb 返回函数
         */
        function flyStarAni(parent, form, to, flyTm, flag, cb) {
            var self = this;
            form.y -= 80;
            TRain.soundMgr.playSFX("jiesuan2" /* jiesuan2 */);
            flyTm = flyTm || 1000;
            var _loop_4 = function (i) {
                var imgstar = new cui.Image(); //todo 粒子效果
                imgstar.source = i == 0 ? "common@xing" /* xing */ : "common@star" /* star */;
                imgstar.anthorPerX = 0.5;
                imgstar.anthorPerY = 0.5;
                imgstar.scaleX = imgstar.scaleY = 1 - i * 0.1;
                var changeTm = i * 55;
                var actionDelay = new TRain.ActionCallDo(changeTm);
                actionDelay.setCall(function () {
                    parent.addChild(imgstar);
                }, self);
                var actionX = new TRain.ActionPropTween(flyTm, 1, {
                    x: { b: form.x, r: to.x - form.x }
                });
                var actionSeqX = new TRain.ActionSequence([actionDelay, actionX]);
                TRain.actionMgr.addAction(actionSeqX, imgstar, false, flag);
                var actionY = new TRain.ActionPropTween(flyTm + changeTm, 1, {
                    y: { b: form.y, r: to.y - form.y }
                });
                actionY.setEaseFun(EaseUtil.quintIn);
                var actionCall = new TRain.ActionCallDo();
                actionCall.setCall(function () {
                    var index = parent.getChildIndex(imgstar);
                    if (index != -1)
                        parent.removeChild(imgstar);
                    if (cb)
                        cb();
                }, self);
                var actionSeqY = new TRain.ActionSequence([actionY, actionCall]);
                TRain.actionMgr.addAction(actionSeqY, imgstar, false, flag);
            };
            for (var i = 0; i < 5; i++) {
                _loop_4(i);
            }
        }
        UIUtils.flyStarAni = flyStarAni;
        /**
         *
         * @param parent 父容器
         * @param gold 金币
         * @param form 出发点
         * @param to 结束点
         * @param flag 标记
         */
        function showGold(parent, gold, form, to, flag) {
            var self = this;
            var winGold = new cui.BitmapLabel();
            winGold.font = "winMoney" /* winMoney */;
            winGold.text = "+" + game.DataFormat.convertYuanString3(gold);
            winGold.x = form.x;
            winGold.y = form.y;
            winGold.alpha = 0;
            parent.addChild(winGold);
            var action = new TRain.ActionPropTo(300, 1, { alpha: 1 });
            var action1 = new TRain.ActionPropTo(500, 1, { y: to.y });
            var action2 = new TRain.Action(1000);
            var action3 = new TRain.ActionPropTo(800, 1, { alpha: 0 });
            var actionCall = new TRain.ActionCallDo();
            actionCall.setCall(function () {
                if (winGold.parent)
                    parent.removeChild(winGold);
            }, self);
            var actionSeq = new TRain.ActionSequence([action, action1, action2, action3, actionCall]);
            TRain.actionMgr.addAction(actionSeq, winGold, false, flag);
        }
        UIUtils.showGold = showGold;
        function createParticle(nm) {
            var conf = game.dataMgr.generalMo.partConf[nm];
            var sys = new cui.ParticleSys(conf);
            switch (conf.pcls) {
                case "global":
                    sys.particleCls = cui.GlobalParticle;
                    break;
                case "gravity":
                    sys.particleCls = cui.GravityParticle;
                    break;
                case "mov":
                    sys.particleCls = cui.MovParticle;
                    break;
            }
            return sys;
        }
        UIUtils.createParticle = createParticle;
        /**
         * 金币显示滚动增加
         * @param fromGold   初始金币
         * @param fromGold   最终金币
         * @param fromGold   你的label或者bitmaplabel
         * @param fromGold   是否是bitmaplabel  是就true不是false
         * @param fromGold   就是self
         * @param fromGold   游戏id
         */
        function showRollGold(fromGold, toGold, target, isBit, thisObj, flag, hasYuan) {
            if (hasYuan === void 0) { hasYuan = true; }
            //每次变化间隔时间
            var duration = 5;
            //变化次数
            var count = 1;
            //金币差
            var lerp = toGold - fromGold;
            var gold;
            //每次变化数量
            var num = ~~(lerp / count);
            var temp = !isBit ? TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */) : "y" /* y */;
            var _loop_5 = function (i) {
                var n = TRain.core.addDelayDo(function () {
                    gold = Math.floor(game.DataFormat.convertGold((fromGold + i * num)));
                    target.text = hasYuan ? (~~game.DataFormat.convertGold(fromGold + i * num) + temp) : gold;
                    // target.text = hasYuan ? DataFormat.convertYuanString((fromGold + i * num), !isBit) : gold;
                    TRain.core.rmvDelayDoByID(n);
                }, thisObj, duration * (i - 1), flag);
            };
            for (var i = 1; i <= count; i++) {
                _loop_5(i);
            }
            if ((fromGold + count * num) != toGold) {
                var n2_1 = TRain.core.addDelayDo(function () {
                    gold = Math.floor(game.DataFormat.convertGold(toGold));
                    target.text = hasYuan ? (~~game.DataFormat.convertGold(toGold) + temp) : gold;
                    // target.text = hasYuan ? DataFormat.convertYuanString(toGold, !isBit) : gold;
                    TRain.core.rmvDelayDoByID(n2_1);
                }, thisObj, duration * count, flag);
            }
        }
        UIUtils.showRollGold = showRollGold;
        function getQRCodeTeam(id, codeTag, cb) {
            var key = "QRteamId" + id + "_" + codeTag;
            var val = egret.localStorage.getItem(key);
            if (val) {
                cb(val);
            }
            else {
                var LinkUrl = getQRLinkUrl(id, codeTag);
                var args = { playerid: String(id), link: LinkUrl };
                game.HttpUtil.askCreateImg(args, false, function (data) {
                    var base64 = "";
                    if (data) {
                        if (data.info) {
                            base64 = data.info;
                        }
                        egret.localStorage.setItem(key, base64);
                        cb(base64);
                    }
                }, self);
            }
        }
        UIUtils.getQRCodeTeam = getQRCodeTeam;
        function getQRCodePly(cb) {
            var myID = game.dataMgr.accMo.getData().aid;
            var key = "QRPlyId" + myID;
            var val = egret.localStorage.getItem(key);
            if (val) {
                cb(val);
            }
            else {
                var LinkUrl = getQRLinkUrl(myID);
                var args = { playerid: String(myID), link: LinkUrl };
                game.HttpUtil.askCreateImg(args, false, function (data) {
                    var base64 = "";
                    if (data) {
                        if (data.info) {
                            base64 = data.info;
                        }
                        egret.localStorage.setItem(key, base64);
                        cb(base64);
                    }
                }, self);
            }
        }
        UIUtils.getQRCodePly = getQRCodePly;
        function getQRLinkUrl(id, codeTag, type) {
            if (type === void 0) { type = 1; }
            var ID = id;
            var tag = codeTag;
            var playerID = "";
            if (type == 1) {
                playerID = type + "|" + String(ID);
            }
            else if (type == 2) {
                playerID = type + "|" + String(ID) + ":" + tag;
            }
            var signKey = Base64.base64Encode(playerID);
            var channelID = CONF.shareId;
            var url = CONF.erweima + channelID + "/?channelId=" + channelID + "&recommendId=" + signKey;
            return url;
        }
        UIUtils.getQRLinkUrl = getQRLinkUrl;
    })(UIUtils = game.UIUtils || (game.UIUtils = {}));
})(game || (game = {}));
var game;
(function (game) {
    var ParticleAni = (function () {
        function ParticleAni(parent, particleNm) {
            var self = this;
            self._p = parent;
            var sys = self._sys = game.UIUtils.createParticle(particleNm);
            sys.addEventListener("play_fin" /* EVT_PLAY_FIN */, self.onFin, self);
        }
        ParticleAni.prototype.start = function () {
            var self = this;
            var sys = self._sys;
            if (!sys.parent) {
                self._p.addChild(sys);
            }
            sys.start();
        };
        ParticleAni.prototype.stop = function () {
            var self = this;
            var sys = self._sys;
            sys.stop(true);
            self.onFin();
        };
        ParticleAni.prototype.dispose = function () {
            var self = this;
            self.onFin();
            self._sys.dispose();
        };
        ParticleAni.prototype.onFin = function () {
            var sys = this._sys;
            var p = sys.parent;
            if (p)
                p.removeChild(sys);
        };
        return ParticleAni;
    }());
    game.ParticleAni = ParticleAni;
    __reflect(ParticleAni.prototype, "game.ParticleAni");
})(game || (game = {}));
var game;
(function (game) {
    var _curActTp;
    var ActBycjView = (function (_super) {
        __extends(ActBycjView, _super);
        function ActBycjView(tp) {
            var _this = _super.call(this, tp) || this;
            var self = _this;
            self.skinName = "actBycjSkin";
            self.hCenter = 0;
            self.vCenter = 0;
            _curActTp = tp;
            return _this;
        }
        ActBycjView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skBtnAni = self.skJoin.getChildAt(0);
            var model = game.dataMgr.activityMo;
            if (_curActTp == 13 /* bycj */) {
                model.askBycjInfo();
            }
            else if (_curActTp == 11 /* rysj */) {
                model.askRysjInfo();
            }
            var list = self.skList;
            list.itemRender = ActBycjItemView;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            self.init();
            self.skJoin.setTarget(function () {
                if (_curActTp == 13 /* bycj */) {
                    model.askBycjApply();
                }
                else if (_curActTp == 11 /* rysj */) {
                    model.askRysjApply();
                }
            }, self);
            self.skRule.setTarget(function () {
                self.openRule(13 /* bycj */);
            }, self);
            self.skGaBtn.setTarget(function () {
                self.openGames(13 /* bycj */);
            }, self);
        };
        ActBycjView.prototype.init = function () {
            var self = this;
            var model = game.dataMgr.activityMo;
            var data = model.getShowConf(13 /* bycj */);
            self.skDesc.textFlow = cui.htmlParser.parser(data.desc);
            if (_curActTp == 13 /* bycj */) {
                self.skBg.source = "txt_" + data.bg[0].toString();
                self.skBg.x = 19;
                self.skBg.y = 45;
                self.skGaBtn.visible = false;
                self.skGold.font = data.font[0];
            }
            else if (_curActTp == 11 /* rysj */) {
                self.skBg.source = "txt_" + data.bg[1].toString();
                self.skBg.x = -21;
                self.skBg.y = 5;
                self.skRule.y = self.skRule.y - 3;
                self.skTip2.y = self.skTip2.y - 5;
                self.skGold.y = self.skGold.y + 5;
                self.skDesc.width = 355;
                self.skDesc.height = 200;
                self.skDesc.x = 185;
                self.skDesc.y = 320;
                self.skGold.font = data.font[1];
            }
            self.skTipAni.dbNm = data.aniN[1].toString();
            self.skBtnAni.dbNm = data.aniN[2].toString();
            var act = model.getActConf(_curActTp);
            self._datas = new Array();
            for (var key in act.award) {
                var da = act.award[key];
                self._datas.push(da);
            }
            self._itemPro.source = self._datas;
            self.skBtnAni.gotoAndPlay("canyu");
        };
        ActBycjView.prototype.updateData = function (data) {
            var self = this;
            var tip1 = "";
            if (!data.bound) {
                tip1 = TRain.langMgr.getTxt("mainLang" /* mainLang */, 789 /* actBycjTip1 */);
            }
            if (data.bound && !data.applied) {
                tip1 = TRain.langMgr.getTxt("mainLang" /* mainLang */, 790 /* actBycjTip2 */);
            }
            self.skTip1.text = tip1;
            self.skGold.text = game.DataFormat.convertYuanString3(data.accumulation);
            self.updateAwd(data.applied);
            var now = TimeUtil.getSvrSec();
            if (now > data.ts_begin && now < data.ts_end) {
                var beg = new Date(data.ts_begin * 1000).toLocaleString();
                var end = new Date(data.ts_end * 1000).toLocaleString();
                var t = StringUtil.printf(TRain.langMgr.getTxt("mainLang", 793 /* actBycjTip5 */), beg, end);
                self.skTip2.text = t;
            }
            else {
                self.skTip2.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 792 /* actBycjTip4 */);
            }
        };
        ActBycjView.prototype.updateAwd = function (data) {
            var self = this;
            var isA = data;
            if (isA) {
                self.skTip1.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 791 /* actBycjTip3 */);
                self.skBtnAni.gotoAndPlay("lingqu");
            }
            self._itemPro.source = self._datas;
        };
        ActBycjView.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            var self = this;
            self.skBtnAni.dispose();
        };
        return ActBycjView;
    }(game.ActBaseView));
    game.ActBycjView = ActBycjView;
    __reflect(ActBycjView.prototype, "game.ActBycjView");
    var ActBycjItemView = (function (_super) {
        __extends(ActBycjItemView, _super);
        function ActBycjItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "actBycjItemSkin";
            return _this;
        }
        ActBycjItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ActBycjItemView.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            self.skDesc0.text = game.DataFormat.convertGold(data.tarVal).toString();
            self.skDesc1.text = game.DataFormat.convertGold(data.awd).toString();
            self.skDesc2.text = data.desc;
            var model = game.dataMgr.activityMo;
            var conf = model.getShowConf(_curActTp);
            var info = model.getActData(_curActTp);
            if (info) {
                if (data.id <= info.index) {
                    if (data.id <= info.index_reward) {
                        var img = new cui.Image;
                        img.source = conf.actN;
                        self.addChild(img);
                        img.x = 240;
                    }
                    else {
                        var ani = new game.UIDBAni;
                        ani.dbNm = conf.aniN[0].toString();
                        self.addChild(ani);
                        ani.x = 270;
                        ani.y = 20;
                        ani.autoPlay = true;
                    }
                }
            }
        };
        return ActBycjItemView;
    }(cui.DataItem));
    __reflect(ActBycjItemView.prototype, "ActBycjItemView");
})(game || (game = {}));
var game;
(function (game) {
    var ActGamesView = (function (_super) {
        __extends(ActGamesView, _super);
        function ActGamesView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.useOnce = false;
            self.skinName = "actGamesSkin";
            return _this;
        }
        ActGamesView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(self.close, self);
            game.dataMgr.activityMo.addListener("close" /* close */, self.close, self);
        };
        ActGamesView.prototype.setData = function (data) {
            var self = this;
            var list = self.skGames;
            list.itemRender = GamesItemView;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            var objs = [];
            for (var key in data) {
                var obj = {
                    gameId: data[key]
                };
                objs.push(obj);
            }
            self._itemPro.source = objs;
        };
        ActGamesView.prototype.onDispose = function () {
            var self = this;
            _super.prototype.onDispose.call(this);
            game.dataMgr.activityMo.rmvAllListener();
        };
        return ActGamesView;
    }(game.UIPopup));
    game.ActGamesView = ActGamesView;
    __reflect(ActGamesView.prototype, "game.ActGamesView");
    var GamesItemView = (function (_super) {
        __extends(GamesItemView, _super);
        function GamesItemView() {
            var _this = _super.call(this) || this;
            _this.skinName = "gameItemSkin";
            return _this;
        }
        GamesItemView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        GamesItemView.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var gameId = self.data.gameId;
            self.skImg.source = "gameImg@txt_" + gameId;
            self.skEnter.setTarget(function () {
                game.dataMgr.activityMo.enterGame(gameId);
            }, self);
        };
        return GamesItemView;
    }(cui.DataItem));
    __reflect(GamesItemView.prototype, "GamesItemView");
})(game || (game = {}));
var game;
(function (game) {
    var act_type;
    (function (act_type) {
        act_type[act_type["xs"] = 0] = "xs";
        act_type[act_type["hd"] = 1] = "hd";
        act_type[act_type["gg"] = 2] = "gg";
    })(act_type = game.act_type || (game.act_type = {}));
    var ActMainView = (function (_super) {
        __extends(ActMainView, _super);
        function ActMainView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "actMainSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        ActMainView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var model = game.dataMgr.activityMo;
            model.addListener("updateRed" /* upRed */, self.updateRed, self);
            model.addListener("updateNew" /* upNew */, self.updateNew, self);
            model.addListener("close" /* close */, self.closeSelf, self);
            self.skClose.setTarget(self.closeSelf, self);
            self._viewList = [];
            self._menuList = [];
            self.skGpNotice.visible = false;
            self.skBtns.setTarget(self.createMenu, self);
            self.skBtns.selectTag = act_type.xs;
            self.changeRedNum(act_type.gg);
        };
        ActMainView.prototype.closeSelf = function () {
            this.close();
            game.GameUtil.setLocal("OVER_Activity" /* OVER_READ_Activity */, "");
        };
        ActMainView.prototype.createMenu = function (item) {
            game.GameUtil.playClickSound();
            var self = this;
            if (self._curType == item.tag)
                return;
            self._curType = item.tag;
            var imgGrp = self.skMenuAct;
            imgGrp.removeChildren();
            var maxHeight = 0;
            var selectTag = 1;
            self.skTitle.source = "activity@txt_title" + self._curType;
            if (self._curType == act_type.gg) {
                if (self._noticeView == undefined) {
                    self._noticeView = new game.NoticeHall(1 /* hall */, self);
                    self.skGpNotice.removeChildren();
                    self.skGpNotice.addChild(self._noticeView);
                }
                self.skGpNotice.visible = true;
            }
            else {
                self.skGpNotice.visible = false;
                var model = game.dataMgr.activityMo;
                var list = model.getActMenu();
                var msg = {};
                var isFir = true;
                for (var i in list) {
                    var key = parseInt(i);
                    var actId = list[i];
                    var img = new cui.MenuItemImage();
                    var data = model.getActConf(actId);
                    if ((self._curType == act_type.xs && data.show == 1) || (self._curType == act_type.hd && data.show == 0)) {
                        img.skinName = "actMenuSkin";
                        img.label = data.name;
                        img.tag = actId;
                        img.y = img.height * (key) + 42;
                        if (maxHeight < img.y)
                            maxHeight = img.y;
                        if (data.new == 1 && model.isNoReadAct(actId)) {
                            var dbAni = new game.UIDBAni();
                            dbAni.dbNm = "actnew";
                            dbAni.autoPlay = true;
                            dbAni.tag = 0;
                            dbAni.x = 45;
                            dbAni.y = 26;
                            img.addChildAt(dbAni, 2);
                        }
                        if (data.boom == 1) {
                            var dbAni = new game.UIDBAni();
                            dbAni.dbNm = "actboom";
                            dbAni.autoPlay = true;
                            dbAni.tag = 1;
                            dbAni.x = 190;
                            dbAni.y = 35;
                            img.addChildAt(dbAni, 3);
                        }
                        self._menuList[actId] = img;
                        imgGrp.addChild(img);
                        if (isFir) {
                            isFir = false;
                            selectTag = actId;
                        }
                    }
                }
            }
            imgGrp.setContentSize(imgGrp.width, maxHeight);
            imgGrp.setTarget(self.clickMenu, self);
            imgGrp.selectTag = selectTag;
        };
        ActMainView.prototype.clickMenu = function (item) {
            var self = this;
            var tag = item.tag;
            if (tag == self._curTag)
                return;
            self._curTag = tag;
            self.skGpInfo.removeChildren();
            var page = self._viewList[tag];
            if (page == undefined) {
                switch (tag) {
                    case 13 /* bycj */:
                        page = new game.ActBycjView(13 /* bycj */);
                        break;
                    case 11 /* rysj */:
                        page = new game.ActBycjView(11 /* rysj */);
                        break;
                }
            }
            if (page) {
                self.skGpInfo.addChild(page);
            }
        };
        ActMainView.prototype.updateRed = function (tp, data) {
            var self = this;
            var item = self._menuList[tp];
            if (item) {
                item.skIcon.visible = data;
            }
            self.changeRedNum(self._curType);
            var accMo = game.dataMgr.accMo;
            if (accMo.gameId == 0)
                game.gameScene.homeUI.showNoticeNum();
        };
        ActMainView.prototype.updateNew = function (tp, data) {
            var self = this;
            var item = self._menuList[tp];
            if (!data && item) {
                var ani = item.getChildAt(2);
                if (ani && ani.tag == 0) {
                    item.removeChildAt(2);
                }
            }
            self.changeRedNum(self._curType);
            var accMo = game.dataMgr.accMo;
            if (accMo.gameId == 0)
                game.gameScene.homeUI.showNoticeNum();
        };
        ActMainView.prototype.changeRedNum = function (type) {
            var self = this;
            var item;
            var number = 0;
            var model = game.dataMgr.activityMo;
            if (type == act_type.xs) {
                item = self.skXsRed;
                number = model.getRedByType(false, act_type.xs);
            }
            else if (type == act_type.gg) {
                item = self.skGgRed;
                number = game.dataMgr.accMo.getNoReadNum();
            }
            item.visible = number > 0;
            item.skCount.text = number.toString();
        };
        ActMainView.prototype.onDispose = function () {
            var self = this;
            _super.prototype.onDispose.call(this);
            self.skGpInfo.removeChildren();
            game.dataMgr.activityMo.rmvAllListener();
        };
        return ActMainView;
    }(game.UIPopup));
    game.ActMainView = ActMainView;
    __reflect(ActMainView.prototype, "game.ActMainView");
})(game || (game = {}));
var game;
(function (game) {
    var ActRuleView = (function (_super) {
        __extends(ActRuleView, _super);
        function ActRuleView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.useOnce = false;
            self.skinName = "actRuleSkin";
            return _this;
        }
        ActRuleView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(self.close, self);
        };
        ActRuleView.prototype.rmvInGrp = function () {
            var innerGrp = this.skInGrp;
            for (var i = 0; i < innerGrp.numChildren; i++) {
                innerGrp.getChildAt(i).dispose();
            }
            innerGrp.removeChildren();
        };
        ActRuleView.prototype.updateView = function (confs) {
            var self = this;
            self.rmvInGrp();
            var maxHeight = 0;
            var addH = 0;
            for (var key in confs) {
                var ruleConf = confs[key];
                if (ruleConf.isImg) {
                    var img = new cui.Image();
                    img.source = ruleConf.text;
                    img.x = ruleConf.x;
                    img.y = ruleConf.y;
                    self.skInGrp.addChild(img);
                    if (maxHeight < img.y) {
                        maxHeight = img.y;
                        addH = img.height;
                    }
                }
                else {
                    var lab = new cui.Label();
                    lab.textFlow = cui.htmlParser.parser(ruleConf.text);
                    lab.x = ruleConf.x;
                    lab.y = ruleConf.y;
                    lab.size = ruleConf.size || 30;
                    self.skInGrp.addChild(lab);
                    if (maxHeight < lab.y) {
                        maxHeight = lab.y;
                        //获取\n的个数
                        addH = 30 * 3;
                    }
                }
            }
            self.skInGrp.width = self.skGrp.width;
            self.skInGrp.height = maxHeight + 90;
            //self.skInGrp.cacheAsBitmap = true;
            self.skGrp.setContentSize(self.skGrp.width, maxHeight + 90);
        };
        return ActRuleView;
    }(game.UIPopup));
    game.ActRuleView = ActRuleView;
    __reflect(ActRuleView.prototype, "game.ActRuleView");
})(game || (game = {}));
var game;
(function (game) {
    var NoticeHall = (function (_super) {
        __extends(NoticeHall, _super);
        function NoticeHall(state, parent) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "noticeHallSkin";
            self._state = state;
            self.vCenter = 0;
            self.hCenter = 0;
            self._parent = parent;
            return _this;
        }
        NoticeHall.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skBtn.setTarget(function () {
                //跳转链接
                var self = this;
                var data = self._showNoticeDatas;
                var url = data[self._curTag].Url;
                URLUtil.openURL(url);
            }, self);
            self.updateView();
        };
        NoticeHall.prototype.setState = function (state) {
            this._state = state;
        };
        NoticeHall.prototype.updateView = function () {
            var self = this;
            var noticeList = self._showNoticeDatas = self.getListByState();
            var len = noticeList.length;
            self.skNoticeBg.source = len > 0 ? "activityInnerDB" : "noNoticeDB";
            self.skIcon.visible = len <= 0;
            self.skBtn.visible = self.skMenuNotice.visible = len > 0;
            var imgGrp = self.skMenuNotice;
            var maxHeight = 0;
            var accMo = game.dataMgr.accMo;
            var noticeStr = game.GameUtil.getLocal("NOW_NOTICE" /* NOW_NOTICE */) || "";
            for (var i = 0; i < len; i++) {
                var data = noticeList[i];
                var img = new cui.MenuItemImage();
                img.skinName = "noticeItemSkin";
                img.label = data.Page;
                var isNew = accMo.isNewNotice(String(data.Id));
                var isNoRead = accMo.isNoRead(String(data.Id));
                img.icon = isNew ? "notice@txt_new" : isNoRead ? "notice@txt_noRead" : "";
                img.tag = i;
                img.y = img.height * i;
                if (maxHeight < img.y)
                    maxHeight = img.y;
                imgGrp.addChild(img);
                if (isNew) {
                    noticeStr += "_" + data.Id;
                    game.GameUtil.setLocal("NOW_NOTICE" /* NOW_NOTICE */, noticeStr);
                }
            }
            imgGrp.setContentSize(imgGrp.width, maxHeight + 90);
            imgGrp.setTarget(self.clickMenu, self);
            imgGrp.selectTag = 0;
        };
        NoticeHall.prototype.clickMenu = function (item) {
            var self = this;
            var tag = item.tag;
            if (tag == self._curTag)
                return;
            self._curTag = tag;
            var data = self._showNoticeDatas[tag];
            self.skTitle1.text = data.Title;
            self.skTitle2.text = data.Notice;
            self.skBtn.visible = !!data.Url;
            var noticeStr = game.GameUtil.getLocal("OVER_NOTICE" /* OVER_READ_NOTICE */) || "";
            var isNoRead = game.dataMgr.accMo.isNoRead(String(data.Id));
            if (isNoRead) {
                noticeStr += "_" + data.Id;
                game.GameUtil.setLocal("OVER_NOTICE" /* OVER_READ_NOTICE */, noticeStr);
            }
            //刷新未读等状态
            self.reflshMenu(tag);
        };
        NoticeHall.prototype.reflshMenu = function (tag) {
            var self = this;
            var child = self.skMenuNotice.getChildAt(tag);
            var accMo = game.dataMgr.accMo;
            var noticeList = self._showNoticeDatas;
            var data = noticeList[tag];
            var isNew = accMo.isNewNotice(String(data.Id));
            var isNoRead = accMo.isNoRead(String(data.Id));
            child.icon = isNew ? "notice@txt_new" : isNoRead ? "notice@txt_noRead" : "";
            if (accMo.gameId == 0)
                game.gameScene.homeUI.showNoticeNum();
            if (self._parent)
                self._parent.changeRedNum(game.act_type.gg);
        };
        NoticeHall.prototype.getListByState = function () {
            var self = this;
            var state = self._state;
            var datas = game.dataMgr.accMo.getNoticeDatas();
            var tempDatas = [];
            for (var i = 0, len = datas.length; i < len; i++) {
                var data = datas[i];
                if (state == 0 /* login */) {
                    if (data.ShowStage == 2 /* two */ || data.ShowStage == 102 /* oneToTwo */) {
                        continue;
                    }
                    else {
                        tempDatas.push(data);
                    }
                }
                else if (state == 2 /* hallPop */) {
                    var isOpen_2 = game.GameUtil.getLocal("NOTICE_2" /* NOTICE_2 */);
                    var isOpen_3 = game.GameUtil.getLocal("NOTICE_3" /* NOTICE_3 */);
                    var localSvrTm1 = parseInt(game.GameUtil.getLocal("NOTICE_TM_1" /* NOTICE_TM_1 */));
                    var localSvrTm2 = parseInt(game.GameUtil.getLocal("NOTICE_TM_2" /* NOTICE_TM_2 */));
                    var svrMsTm = TimeUtil.getSvrMS();
                    var isEqual1 = TimeUtil.equalsDay(localSvrTm1, svrMsTm);
                    var isEqual2 = TimeUtil.equalsDay(localSvrTm2, svrMsTm);
                    if (data.ShowStage == 1 /* one */ || data.ShowStage == 101 /* oneToOne */) {
                        continue;
                    }
                    else if (data.ShowStage == 2 /* two */) {
                        if (!isOpen_2) {
                            tempDatas.push(data);
                            game.GameUtil.setLocal("NOTICE_2" /* NOTICE_2 */, true); //已经弹出过了
                        }
                    }
                    else if (data.ShowStage == 3 /* three */) {
                        if (!isOpen_3) {
                            tempDatas.push(data);
                            game.GameUtil.setLocal("NOTICE_3" /* NOTICE_3 */, true);
                        }
                    }
                    else if (data.ShowStage == 102 /* oneToTwo */) {
                        //获取服务器时间
                        if (!isEqual1) {
                            tempDatas.push(data);
                            game.GameUtil.setLocal("NOTICE_TM_1" /* NOTICE_TM_1 */, String(svrMsTm));
                        }
                    }
                    else if (data.ShowStage == 103 /* oneToThree */) {
                        //获取服务器时间
                        if (!isEqual2) {
                            tempDatas.push(data);
                            game.GameUtil.setLocal("NOTICE_TM_2" /* NOTICE_TM_2 */, String(svrMsTm));
                        }
                    }
                }
                else {
                    tempDatas.push(data);
                }
            }
            tempDatas.sort(function (a, b) {
                return a.ShowIdx - b.ShowIdx;
            });
            return tempDatas;
        };
        return NoticeHall;
    }(cui.Component));
    game.NoticeHall = NoticeHall;
    __reflect(NoticeHall.prototype, "game.NoticeHall");
})(game || (game = {}));
var game;
(function (game) {
    var RedPoint = (function (_super) {
        __extends(RedPoint, _super);
        function RedPoint() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "redPointSkin";
            return _this;
        }
        return RedPoint;
    }(cui.Component));
    game.RedPoint = RedPoint;
    __reflect(RedPoint.prototype, "game.RedPoint");
})(game || (game = {}));
var game;
(function (game) {
    var BindGiftDialog = (function (_super) {
        __extends(BindGiftDialog, _super);
        function BindGiftDialog() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "BindGiftSkin";
            self.hCenter = 0;
            self.vCenter = 0;
            self._sayDur = 500;
            self._delayDur = 1000;
            self.hCenter = self.vCenter = 0;
            self._gameTag = self._gameTag = TRain.actionMgr.getUnitTag();
            return _this;
        }
        BindGiftDialog.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self._sayID = TRain.core.addDelayDo(function () {
                game.UIUtils.move(self.skImgSay, { scaleX: 1, scaleY: 1 }, EaseUtil.quadInOut, self._sayDur, undefined, undefined, self._gameTag);
                TRain.core.rmvDelayDoByID(self._sayID);
                self._sayID = undefined;
            }, self, self._delayDur);
            self.skBtnClose.setTarget(function () {
                self.close();
                game.dataMgr.generalMo.postEvent("close" /* Close */);
            }, self);
            self.skBtnBind.setTarget(function () {
                var view = new game.Registered();
                view.setData(true);
                game.gameScene.openPopup(view);
                self.close();
            }, self);
        };
        BindGiftDialog.prototype.onDispose = function () {
            var self = this;
            if (!isNaN(self._sayID)) {
                TRain.core.rmvDelayDoByID(self._sayID);
            }
            TRain.actionMgr.rmvActsByTag(self._gameTag);
            _super.prototype.onDispose.call(this);
        };
        return BindGiftDialog;
    }(game.UIPopup));
    game.BindGiftDialog = BindGiftDialog;
    __reflect(BindGiftDialog.prototype, "game.BindGiftDialog");
})(game || (game = {}));
var game;
(function (game) {
    var SaveMoneyDialog = (function (_super) {
        __extends(SaveMoneyDialog, _super);
        function SaveMoneyDialog() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "SaveMoneySkin";
            self.hCenter = self.vCenter = 0;
            return _this;
        }
        SaveMoneyDialog.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skBtnClose.setTarget(function () {
                self.close();
            }, self);
            //充值
            self.skBtnCharge.setTarget(function () {
                self.close();
                game.gameScene.showHallUI(2 /* shop */);
            }, self);
            //领取救济金
            self.skBtnSave.setTarget(function () {
                self.getSaveMoney();
            }, self);
            self.updateInfo();
            // dataMgr.accMo.addListener("getSaveMoney", function () {
            //     self.updateInfo();
            // }, self);
        };
        SaveMoneyDialog.prototype.updateInfo = function () {
            //今日剩余次数
            var self = this;
            var count = 6 /* almsMaxCount */ - game.dataMgr.accMo.getData().collected;
            self.skLabCount.text = StringUtil.printf(TRain.langMgr.getTxt("mainLang", 688 /* AlmsRestCount */), count);
            //领取金币限制条件
            self.skLabCondition.text = StringUtil.printf(TRain.langMgr.getTxt("mainLang", 689 /* AlmsGetCondition */), game.DataFormat.convertGold(30 /* almsLimit */).toFixed(2));
        };
        //领取救济金
        SaveMoneyDialog.prototype.getSaveMoney = function () {
            var self = this;
            game.dataMgr.generalMo.sendBenefits();
            self.close();
        };
        return SaveMoneyDialog;
    }(game.UIPopup));
    game.SaveMoneyDialog = SaveMoneyDialog;
    __reflect(SaveMoneyDialog.prototype, "game.SaveMoneyDialog");
})(game || (game = {}));
var game;
(function (game) {
    var ExtensionNoticeView = (function (_super) {
        __extends(ExtensionNoticeView, _super);
        function ExtensionNoticeView(isCreate, data) {
            var _this = _super.call(this) || this;
            _this._isCreate = -1;
            var self = _this;
            self._isCreate = isCreate;
            self._data = data;
            self.skinName = "TeamNoticeSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        ExtensionNoticeView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            game.dataMgr.generalMo.addListener("PerformTeamcreate" /* PerformTeamcreate */, self.showResult, self);
            game.dataMgr.generalMo.addListener("PerformTeamupdate" /* PerformTeamupdate */, self.showResult2, self);
            self.skclose.setTarget(function () {
                game.dataMgr.generalMo.rmvListener("PerformTeamcreate" /* PerformTeamcreate */, self.showResult);
                game.dataMgr.generalMo.rmvListener("PerformTeamupdate" /* PerformTeamupdate */, self.showResult2);
                self.close();
            }, self);
            var CreateGrp = self.skCreateGrp;
            var ChangeGrp = self.skChangeGrp;
            var resetGrp = self.skresetGrp;
            if (self._isCreate == 0) {
                self.sknoticeName.source = "extend@txt_createTeam";
                CreateGrp.visible = true;
                ChangeGrp.visible = false;
                resetGrp.visible = false;
            }
            else if (self._isCreate == 1) {
                self.sknoticeName.source = "extend@txt_changeTeamN";
                CreateGrp.visible = false;
                ChangeGrp.visible = true;
                resetGrp.visible = false;
            }
            else if (self._isCreate == 2) {
                self.sknoticeName.source = "extend@txt_tishi";
                CreateGrp.visible = false;
                ChangeGrp.visible = false;
                resetGrp.visible = true;
            }
            self.sksetname.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 734 /* setteamname */);
            self.sksetnum.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 736 /* setPaixian */);
            self.skTname.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 731 /* teamname */);
            self.skTname.promptColor = 0x988293;
            self.skTname.addEventListener(egret.Event.CHANGE, self.OnAccount, self);
            self.skTname.addEventListener(egret.Event.FOCUS_IN, self.onFocus1, self);
            self.skTnum.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 737 /* teamsNum */);
            self.skTnum.promptColor = 0x988293;
            self.skTnum.addEventListener(egret.Event.CHANGE, self.OnAccount1, self);
            self.skTnum.addEventListener(egret.Event.FOCUS_IN, self.onFocus2, self);
            self.skCreate.setTarget(function () {
                if (self.skTname.text.length > 0) {
                    var isNumber = self.getIsAllNumber(self.skTname.text);
                    var limitNumber = self.getIsAllNumber(self.skTnum.text);
                    if (isNumber) {
                        game.MsgBox.showTxt("mainLang" /* mainLang */, 738 /* notAllNumber */);
                    }
                    else {
                        var teamNum = parseInt(self.skTnum.text);
                        if (teamNum < 1 || teamNum > 50 || self.skTnum.text.length == 0) {
                            game.MsgBox.showTxt("mainLang" /* mainLang */, 739 /* wrongNumber */);
                        }
                        else {
                            if (limitNumber) {
                                if (true)
                                    console.log("创建团队的名字是：   ", self.skTname.text);
                                game.dataMgr.generalMo.setCreateTeamName(self.skTname.text);
                                game.dataMgr.generalMo.sendCreateTeam(teamNum, self.skTname.text);
                            }
                            else {
                                game.MsgBox.showTxt("mainLang" /* mainLang */, 751 /* inputNum */);
                            }
                        }
                    }
                }
                else {
                    game.MsgBox.showTxt("mainLang" /* mainLang */, 733 /* cannotnoTeam */);
                }
            }, self);
            self.skTishi.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 743 /* notices */);
            self.skTchange.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 735 /* teamsName */);
            self.skTchange.promptColor = 0x988293;
            self.skTchange.addEventListener(egret.Event.CHANGE, self.OnAccount2, self);
            self.skTchange.addEventListener(egret.Event.FOCUS_IN, self.onFocus3, self);
            self.skcancle.setTarget(self.close, self);
            self.skchange.setTarget(function () {
                if (self.skTchange.text.length > 0) {
                    var isNumber = self.getIsAllNumber(self.skTchange.text);
                    if (isNumber) {
                        game.MsgBox.showTxt("mainLang" /* mainLang */, 738 /* notAllNumber */);
                    }
                    else {
                        var data = self._data;
                        if (true)
                            console.log("修改团队的名字是：   ", self.skTchange.text);
                        game.dataMgr.generalMo.setChangeTeamName(self.skTchange.text);
                        game.dataMgr.generalMo.sendChangeTeamName(2, data.id, data.count_limit, self.skTchange.text);
                    }
                }
                else {
                    game.MsgBox.showTxt("mainLang" /* mainLang */, 733 /* cannotnoTeam */);
                }
            }, self);
            self.skReset.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 745 /* resetMa */)));
            self.sknoSure.setTarget(self.close, self);
            self.skSure.setTarget(function () {
                var data = self._data;
                game.dataMgr.generalMo.sendChangeTeamName(0, data.id, data.count_limit, data.name);
            }, self);
        };
        ExtensionNoticeView.prototype.getIsAllNumber = function (val) {
            var regPos = /^\d+(\.\d+)?$/; //非负浮点数
            var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
            if (regPos.test(val) || regNeg.test(val)) {
                return true;
            }
            else {
                return false;
            }
        };
        ExtensionNoticeView.prototype.onFocus1 = function (e) {
            this.skTname.text = "";
        };
        ExtensionNoticeView.prototype.OnAccount = function (e) {
            var self = this;
            var inputText = e.target.text;
            var str = game.DataFormat.CheckStringLength(inputText);
            var len = str[0];
            var chaLen = str[1] > 8 ? 8 : str[1];
            if (len > 16) {
                var firstIdx = 16 - chaLen;
                inputText = inputText.substring(0, firstIdx);
            }
            self.skTname.text = inputText;
            self.skTname.textColor = 0xe9e9e9;
        };
        ExtensionNoticeView.prototype.onFocus2 = function (e) {
            this.skTnum.text = "";
        };
        ExtensionNoticeView.prototype.OnAccount1 = function (e) {
            var self = this;
            var inputText = e.target.text;
            var str = game.DataFormat.CheckStringLength(inputText);
            var len = str[0];
            var chaLen = str[1] > 8 ? 8 : str[1];
            if (len > 16) {
                var firstIdx = 16 - chaLen;
                inputText = inputText.substring(0, firstIdx);
            }
            self.skTnum.text = inputText;
            self.skTnum.textColor = 0xe9e9e9;
        };
        ExtensionNoticeView.prototype.onFocus3 = function (e) {
            this.skTchange.text = "";
        };
        ExtensionNoticeView.prototype.OnAccount2 = function (e) {
            var self = this;
            var inputText = e.target.text;
            var str = game.DataFormat.CheckStringLength(inputText);
            var len = str[0];
            var chaLen = str[1] > 8 ? 8 : str[1];
            if (len > 16) {
                var firstIdx = 16 - chaLen;
                inputText = inputText.substring(0, firstIdx);
            }
            self.skTchange.text = inputText;
            self.skTchange.textColor = 0xe9e9e9;
        };
        ExtensionNoticeView.prototype.showResult = function () {
            var self = this;
            game.dataMgr.generalMo.sendPerformTeamList();
            var teamname = game.dataMgr.generalMo.getCreateTeamName();
            if (true)
                console.log("teamname  ==  ", teamname);
            var info = StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 740 /* teamSuccess */), teamname);
            game.BoxMgr.showBox(info);
            self.close();
        };
        ExtensionNoticeView.prototype.showResult2 = function (optype, data) {
            var self = this;
            game.dataMgr.generalMo.sendPerformTeamList();
            var teamList = game.dataMgr.generalMo.getPerformanceTeamlist();
            var name;
            for (var i = 0; i < teamList.length; i++) {
                var temp = teamList[i];
                if (temp.id == data.team_id) {
                    name = temp.name;
                }
            }
            var info;
            if (optype == 0) {
                info = StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 746 /* resetMaName */), name);
            }
            else if (optype == 2) {
                var changename = game.dataMgr.generalMo.getChangeTeamName();
                if (true)
                    console.log("changename  ==  ", changename);
                info = StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 744 /* teamChange */), changename);
            }
            game.BoxMgr.showBox(info);
            self.close();
        };
        ExtensionNoticeView.prototype.onShow = function (stage) {
            _super.prototype.onShow.call(this, stage);
            var self = this;
        };
        ExtensionNoticeView.prototype.onHide = function () {
            _super.prototype.onHide.call(this);
            var self = this;
        };
        return ExtensionNoticeView;
    }(game.UIPopup));
    game.ExtensionNoticeView = ExtensionNoticeView;
    __reflect(ExtensionNoticeView.prototype, "game.ExtensionNoticeView");
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
        //this.textField.text = "Loading..." + current + "/" + total;
    };
    return LoadingUI;
}(egret.Sprite));
__reflect(LoadingUI.prototype, "LoadingUI");
var game;
(function (game) {
    var ExtensionShareView = (function (_super) {
        __extends(ExtensionShareView, _super);
        function ExtensionShareView(data) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "TeamShareListSkin";
            self._data = data;
            return _this;
        }
        ExtensionShareView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var LinkUrl = game.UIUtils.getQRLinkUrl(self._data.id, self._data.code_tag, 2);
            self.skNet.text = LinkUrl;
            self.skCopy.setTarget(function () {
                game.MsgBox.showTxt("mainLang" /* mainLang */, 732 /* copynet */);
                URLUtil.copyText(self.skNet.text);
            }, self);
            self.skclose.setTarget(function () {
                TRain.soundMgr.playSFX("click" /* click */);
                self.close();
                game.gameScene.showHallUI(5 /* extension */, 6);
            }, self);
            self.createImg();
        };
        ExtensionShareView.prototype.createImg = function () {
            var self = this;
            var teamID = self._data.id;
            var tag = self._data.code_tag;
            game.UIUtils.getQRCodeTeam(teamID, tag, function (data) {
                self.skerwei.source = data;
            });
        };
        ExtensionShareView.prototype.onShow = function (stage) {
            _super.prototype.onShow.call(this, stage);
        };
        ExtensionShareView.prototype.onHide = function () {
            _super.prototype.onHide.call(this);
        };
        return ExtensionShareView;
    }(game.UIFullFW));
    game.ExtensionShareView = ExtensionShareView;
    __reflect(ExtensionShareView.prototype, "game.ExtensionShareView");
})(game || (game = {}));
var game;
(function (game) {
    var yjIndex = 0;
    var ExtensionView = (function (_super) {
        __extends(ExtensionView, _super);
        function ExtensionView(openid) {
            if (openid === void 0) { openid = 0; }
            var _this = _super.call(this) || this;
            _this._dailiPage = 1;
            _this._yejiPage = 1;
            _this._teamPage = 1;
            _this._openId = 0;
            var self = _this;
            self.skinName = "gameExtendSkin";
            //self._notifyUI = new NotifyUI();
            self._openId = openid;
            return _this;
        }
        ExtensionView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var generalMo = game.dataMgr.generalMo;
            generalMo.sendPerformanceInfo();
            generalMo.addListener("Gain_result" /* Gain_result */, self.showGain, self);
            generalMo.addListener("GetGain" /* GetGain */, self.showGain, self);
            generalMo.addListener("Perform" /* Perform */, self.showPerforms, self);
            generalMo.addListener("PerformList" /* PerformList */, self.showPerformsList, self);
            generalMo.addListener("PerformChild" /* PerformChild */, self.showPerformsChild, self);
            generalMo.addListener("PerformTeamlist" /* PerformTeamlist */, self.showPerformsTeamlist, self);
            generalMo.addListener("PerformTeaminfo" /* PerformTeaminfo */, self.showTeamInfo, self);
            self.skdaili0.visible = true;
            self.skdiGrp.visible = true;
            self.skdiYJGrp.visible = false;
            self.skdlXian.visible = true;
            self.skYJxian.visible = false;
            self.skdiTeam.visible = false;
            var list0 = self.skList;
            list0.itemRender = extensionWuXian;
            list0.dataProvider = self._itemPro = new cui.ArrayCollection();
            var list1 = self.skDLList;
            list1.itemRender = ExtensionPerformList;
            list1.dataProvider = self._itemProPerformance = new cui.ArrayCollection();
            var list2 = self.skteamList;
            list2.itemRender = ExtensionPerformTeamMemberList;
            list2.dataProvider = self._itemProTeamList = new cui.ArrayCollection();
            var list3 = self.skTeamList;
            list3.itemRender = ExtensionPerformTeamList;
            list3.dataProvider = self._itemProTeam = new cui.ArrayCollection();
            var list4 = self.skDLYJlist;
            list4.itemRender = ExtensionDLList;
            list4.dataProvider = self._itemExtendList = new cui.ArrayCollection();
            for (var i = 1; i < 7; i++) {
                self["skdaili" + i].visible = false;
            }
            self.skBtnGrp.visible = true;
            self.skTeam.visible = false;
            self.skyejiGrp.visible = false;
            self.skYeJiGrp.visible = false;
            self.skSearchGrp.visible = false;
            self.skBtnGrp.setTarget(self.btnClickChip, self);
            self.skBtnGrp.selectTag = self._openId;
            generalMo.sendGetGain();
            self.skChaxun.setTarget(self.btnClickExtend, self);
            self.skYeJiGrp.setTarget(self.btnClickYeji, self);
            self.skFind.setTarget(function () {
                if (self.skName.text.length > 0) {
                    self.searchResult();
                }
                else {
                    game.MsgBox.showTxt("mainLang" /* mainLang */, 624 /* ContentIsNull */);
                }
            }, self);
            self.skX.setTarget(function () {
                self.skName.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 723 /* inPlayerId */);
                self.skName.text = "";
                self.skX.visible = false;
                self.skCancle.visible = false;
                self.skFind.visible = true;
                self.updateView(2);
            }, self);
            self.skCancle.setTarget(function () {
                self.skName.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 723 /* inPlayerId */);
                self.skName.text = "";
                self.skX.visible = false;
                self.skCancle.visible = false;
                self.skFind.visible = true;
            }, self);
            self.skCopy.setTarget(function () {
                game.MsgBox.showTxt("mainLang" /* mainLang */, 732 /* copynet */);
                URLUtil.copyText(self.skNet.text);
            }, self);
            self.skNext.setTarget(function () {
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                if (PerformList.length / 7 > self._dailiPage) {
                    self._dailiPage += 1;
                    self.updateView(2);
                }
            }, self);
            self.skLast.setTarget(function () {
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                if (self._dailiPage > 1) {
                    self._dailiPage -= 1;
                    self.updateView(2);
                }
            }, self);
            self.skFirst.setTarget(function () {
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                if (PerformList.length / 7 > self._dailiPage) {
                    self._dailiPage = Math.ceil(PerformList.length / 7);
                    self.updateView(2);
                }
            }, self);
            self.skEnd.setTarget(function () {
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                if (self._dailiPage > 1) {
                    self._dailiPage = 1;
                    self.updateView(2);
                }
            }, self);
            self.skclean.setTarget(function () {
                self.skteamName.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 731 /* teamname */);
                self.skteamName.text = "";
                self.skclean.visible = false;
                self.updateView(6);
            }, self);
            self.skSearchTeam.setTarget(function () {
                if (self.skteamName.text.length > 0) {
                    self.teamSearchResult();
                }
                else {
                    game.MsgBox.showTxt("mainLang" /* mainLang */, 733 /* cannotnoTeam */);
                }
            }, self);
            self.skCreateTeam.setTarget(function () {
                var view = new game.ExtensionNoticeView(0);
                game.gameScene.openPopup(view);
            }, self);
            self.skTeamBack.setTarget(function () {
                self.skdlXian.visible = true;
                self.skYJxian.visible = false;
                self.skdiGrp.visible = true;
                self.skdiYJGrp.visible = false;
                self.skdiTeam.visible = false;
                self.skTeamBack.visible = false;
                self.skTeam.visible = false;
                self.skteamGrp.visible = false;
                self.skBack.visible = true;
                self.skBtnGrp.visible = true;
                self.showResult(6);
            }, self);
            self.skYejiBack.setTarget(function () {
                self.skdiGrp.visible = true;
                self.skdiYJGrp.visible = false;
                self.skdlXian.visible = true;
                self.skYJxian.visible = false;
                self.skdiTeam.visible = false;
                self.skyejiGrp.visible = false;
                self.skYeJiGrp.visible = false;
                self.skYejiBack.visible = false;
                self.skBack.visible = true;
                self.skBtnGrp.visible = true;
                self.showResult(1);
                self.showDate(1);
            }, self);
            self.skBack.setTarget(function () {
                TRain.soundMgr.playSFX("click" /* click */);
                game.gameScene.goHome();
                self.close();
            }, self);
            self.skTeamNext.setTarget(function () {
                var teamInfo = game.dataMgr.generalMo.getPerformanceTeamInfo();
                if (!teamInfo)
                    return;
                var member_infos = teamInfo.member_infos;
                if (member_infos.length / 7 > self._teamPage) {
                    self._teamPage += 1;
                    self.showTeamInfo();
                }
            }, self);
            self.skTeamLast.setTarget(function () {
                var teamInfo = game.dataMgr.generalMo.getPerformanceTeamInfo();
                if (!teamInfo)
                    return;
                if (self._dailiPage > 1) {
                    self._dailiPage -= 1;
                    self.showTeamInfo();
                }
            }, self);
            self.skTeamFirst.setTarget(function () {
                var teamInfo = game.dataMgr.generalMo.getPerformanceTeamInfo();
                if (!teamInfo)
                    return;
                if (self._teamPage > 1) {
                    self._teamPage = 1;
                    self.showTeamInfo();
                }
            }, self);
            self.skTeamEnd.setTarget(function () {
                var teamInfo = game.dataMgr.generalMo.getPerformanceTeamInfo();
                if (!teamInfo)
                    return;
                var member_infos = teamInfo.member_infos;
                if (member_infos.length / 7 > self._teamPage) {
                    self._teamPage = Math.ceil(member_infos.length / 7);
                    self.showTeamInfo();
                }
            }, self);
            self.skteamScerch.setTarget(function () {
                if (self.skScerchName.text.length > 0) {
                    self.memberSearchResult();
                }
                else {
                    game.MsgBox.showTxt("mainLang" /* mainLang */, 624 /* ContentIsNull */);
                }
            }, self);
            self.skYJNext.setTarget(function () {
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                if (PerformList.length / 7 > self._yejiPage) {
                    self._yejiPage += 1;
                    self.updateDLView(yjIndex);
                }
            }, self);
            self.skYJLast.setTarget(function () {
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                if (self._yejiPage > 1) {
                    self._yejiPage -= 1;
                    self.updateDLView(yjIndex);
                }
            }, self);
            self.skYJEnd.setTarget(function () {
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                if (PerformList.length / 7 > self._yejiPage) {
                    self._yejiPage = Math.ceil(PerformList.length / 7);
                    self.updateDLView(yjIndex);
                }
            }, self);
            self.skYJFirst.setTarget(function () {
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                if (self._yejiPage > 1) {
                    self._yejiPage = 1;
                    self.showTeamInfo();
                }
            }, self);
        };
        ExtensionView.prototype.btnClickExtend = function (item) {
            TRain.soundMgr.playSFX("click" /* click */);
            var self = this;
            self.showExtendResult(item.tag);
        };
        ExtensionView.prototype.showExtendResult = function (num) {
            var self = this;
            for (var i = 0; i < 7; i++) {
                self["skdaili" + i].visible = false;
            }
            self.skdiGrp.visible = false;
            self.skdiYJGrp.visible = true;
            self.skdlXian.visible = false;
            self.skYJxian.visible = true;
            self.skBtnGrp.visible = false;
            self.skBack.visible = false;
            self.skyejiGrp.visible = true;
            self.skYeJiGrp.visible = true;
            self.skYejiBack.visible = true;
            self.skYeJiGrp.selectTag = 0;
            for (var i = 0; i < 8; i++) {
                // if (i == num) {
                // 	self.skdiYJGrp.getChildAt(i).visible = true;
                // 	continue;
                // }
                self.skdiYJGrp.getChildAt(i).visible = i == num;
            }
            self.updateDLView(num);
        };
        ExtensionView.prototype.btnClickYeji = function (item) {
            var self = this;
            TRain.soundMgr.playSFX("click" /* click */);
            for (var i = 0; i < 8; i++) {
                // if (i == item.tag) {
                // 	self.skdiYJGrp.getChildAt(i).visible = true;
                // 	continue;
                // }
                self.skdiYJGrp.getChildAt(i).visible = i == item.tag;
            }
            self._yejiPage = 1;
            yjIndex = item.tag;
            self.updateDLView(item.tag);
        };
        ExtensionView.prototype.updateDLView = function (num) {
            var self = this;
            var generalMo = game.dataMgr.generalMo;
            self.skyejiPic.source = "extend@txt_yeji" + num;
            if (num % 2 == 0) {
                self.skyejiBG.source = "txt_yejiBiao";
            }
            else {
                self.skyejiBG.source = "txt_yejizhishu";
            }
            var PerformList = generalMo.getPerformanceList();
            if (!PerformList)
                return;
            var listArr = [];
            var lenght = 0;
            if (PerformList.length > 7)
                lenght = 7;
            else
                lenght = PerformList.length;
            var i = 0;
            if (self._yejiPage == 1)
                i = 0;
            else
                i = (self._yejiPage - 1) * 7;
            self.skYJPage0.text = String(self._dailiPage - 1);
            self.skYJPage1.text = String(Math.ceil(PerformList.length / 7));
            if (num == 0) {
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var YJinfo = {
                        isself: true,
                        rank: (i + 1),
                        name: temp.nick_name,
                        player_id: temp.player_id,
                        yej: temp.per_today,
                    };
                    listArr.push(YJinfo);
                }
                self._itemExtendList.source = listArr;
            }
            else if (num == 1) {
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var YJinfo = {
                        isself: false,
                        rank: (i + 1),
                        name: temp.nick_name,
                        player_id: temp.player_id,
                        yej: temp.per_sub_today,
                        yongj: temp.gain,
                    };
                    listArr.push(YJinfo);
                }
                self._itemExtendList.source = listArr;
            }
            else if (num == 2) {
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var YJinfo = {
                        isself: true,
                        rank: (i + 1),
                        name: temp.nick_name,
                        player_id: temp.player_id,
                        yej: temp.per_sub_yesterday,
                    };
                    listArr.push(YJinfo);
                }
                self._itemExtendList.source = listArr;
            }
            else if (num == 3) {
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var YJinfo = {
                        isself: false,
                        rank: (i + 1),
                        name: temp.nick_name,
                        player_id: temp.player_id,
                        yej: temp.per_sub_yesterday,
                        yongj: temp.gain_yd,
                    };
                    listArr.push(YJinfo);
                }
                self._itemExtendList.source = listArr;
            }
            else if (num == 4) {
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var YJinfo = {
                        isself: true,
                        rank: (i + 1),
                        name: temp.nick_name,
                        player_id: temp.player_id,
                        yej: temp.per_sub_tw,
                    };
                    listArr.push(YJinfo);
                }
                self._itemExtendList.source = listArr;
            }
            else if (num == 5) {
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var YJinfo = {
                        isself: false,
                        rank: (i + 1),
                        name: temp.nick_name,
                        player_id: temp.player_id,
                        yej: temp.per_sub_tw,
                        yongj: temp.gain_tw,
                    };
                    listArr.push(YJinfo);
                }
                self._itemExtendList.source = listArr;
            }
            else if (num == 6) {
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var YJinfo = {
                        isself: true,
                        rank: (i + 1),
                        name: temp.nick_name,
                        player_id: temp.player_id,
                        yej: temp.per_sub_lw,
                    };
                    listArr.push(YJinfo);
                }
                self._itemExtendList.source = listArr;
            }
            else if (num == 7) {
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var YJinfo = {
                        isself: false,
                        rank: (i + 1),
                        name: temp.nick_name,
                        player_id: temp.player_id,
                        yej: temp.per_sub_lw,
                        yongj: temp.gain_tw,
                    };
                    listArr.push(YJinfo);
                }
                self._itemExtendList.source = listArr;
            }
        };
        ExtensionView.prototype.btnClickChip = function (item) {
            TRain.soundMgr.playSFX("click" /* click */);
            var self = this;
            for (var i = 0; i < self.skdiGrp.numChildren; i++) {
                // if (i == item.tag) {
                // 	self.skdiGrp.getChildAt(i).visible = true;
                // 	continue;
                // }
                self.skdiGrp.getChildAt(i).visible = i == item.tag;
            }
            self.showResult(item.tag);
            self.showDate(item.tag);
        };
        ExtensionView.prototype.showDate = function (num) {
            var self = this;
            var generalMo = game.dataMgr.generalMo;
            if (num == 0) {
                generalMo.sendGetGain();
                var gain = generalMo.getGain();
                if (gain > 0) {
                    self.skGet.icon = "extend@txt_canGet";
                    self.skGet.touchEnabled = true;
                    self.skGet.setTarget(function () {
                        generalMo.sendAskForGain();
                    }, self);
                }
                else {
                    self.skGet.touchEnabled = false;
                    self.skGet.icon = "extend@txt_noGet";
                }
                self.skVip.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, (721 /* backGain */));
                self.skYeji.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, (722 /* yeji */));
                self.skPay.text = "当前佣金：" + String(gain / 100) + "元";
                self.updateView(num);
            }
            else if (num == 1) {
                generalMo.sendPerformanceInfo();
            }
            else if (num == 2) {
                self._dailiPage = 1;
                generalMo.sendPerformList();
                self.skName.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 723 /* inPlayerId */);
                self.skName.promptColor = 0xC4904D;
                self.skName.addEventListener(egret.Event.CHANGE, self.OnAccount, self);
                self.skName.addEventListener(egret.Event.FOCUS_IN, self.onFocus1, self);
            }
            else if (num == 3) {
                self.skSearchGrp.visible = false;
                self.skplayerId.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 723 /* inPlayerId */);
                self.skplayerId.promptColor = 0xC4904D;
                self.skplayerId.addEventListener(egret.Event.CHANGE, self.OnAccount2, self);
                self.skplayerId.addEventListener(egret.Event.FOCUS_IN, self.onFocus2, self);
                self.skSearch.setTarget(function () {
                    var playerid = parseInt(self.skplayerId.text);
                    generalMo.sendPerformanceChild(playerid);
                }, self);
            }
            else if (num == 4) {
                var linkUrl = self.getQRLinkUrl();
                self.skNet.text = linkUrl;
                self.updatePic();
            }
            else if (num == 5) {
                self.updateView(num);
            }
            else if (num == 6) {
                self.skteamName.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 731 /* teamname */);
                self.skteamName.promptColor = 0xC4904D;
                self.skteamName.addEventListener(egret.Event.CHANGE, self.OnAccount3, self);
                self.skteamName.addEventListener(egret.Event.FOCUS_IN, self.onFocus3, self);
                generalMo.sendPerformTeamList();
            }
        };
        ExtensionView.prototype.updatePic = function () {
            var self = this;
            game.UIUtils.getQRCodePly(function (data) {
                self.skerwei.source = data;
            });
        };
        ExtensionView.prototype.getQRLinkUrl = function () {
            var myID = game.dataMgr.accMo.getData().aid;
            var playerID = "";
            playerID = 1 + "|" + String(myID);
            var signKey = Base64.base64Encode(playerID);
            var channelID = CONF.shareId;
            var info = StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 779 /* ShareGameIp */), channelID, channelID, signKey);
            return info;
        };
        ExtensionView.prototype.teamSearchResult = function () {
            var self = this;
            var teamList = game.dataMgr.generalMo.getPerformanceTeamlist();
            if (!teamList) {
                self.skclean.visible = true;
                game.MsgBox.showTxt("mainLang" /* mainLang */, 742 /* noTeam */);
                return;
            }
            var hasTeam = false;
            var number = -1;
            var searchName = self.skteamName.text;
            for (var i = 0; i < teamList.length; i++) {
                if (searchName == teamList[i].name) {
                    hasTeam = true;
                    number = i;
                }
            }
            self.skclean.visible = true;
            if (hasTeam) {
                var listArr = [];
                var id = 0;
                var temp = teamList[number];
                var tempinfos = temp.member_infos;
                if (tempinfos) {
                    id = tempinfos[tempinfos.length - 1].player_id;
                }
                var PerformTeamlist = {
                    handle: self,
                    name: temp.name,
                    count: temp.count,
                    count_limit: temp.count_limit,
                    player_id: id,
                    id: temp.id,
                    code_tag: temp.code_tag,
                };
                listArr.push(PerformTeamlist);
                self._itemProTeam.source = listArr;
            }
            else {
                game.MsgBox.showTxt("mainLang" /* mainLang */, 742 /* noTeam */);
            }
        };
        ExtensionView.prototype.searchResult = function () {
            var self = this;
            var PerformList = game.dataMgr.generalMo.getPerformanceList();
            self.skFind.visible = false;
            if (!PerformList) {
                self.skCancle.visible = true;
                self.skX.visible = true;
                game.MsgBox.showTxt("mainLang" /* mainLang */, 730 /* noplayer */);
                return;
            }
            var hasPlayer = false;
            var number = -1;
            var searchId = parseInt(self.skName.text);
            for (var i = 0; i < PerformList.length; i++) {
                if (searchId == PerformList[i].player_id) {
                    hasPlayer = true;
                    number = i;
                }
            }
            self.skCancle.visible = true;
            self.skX.visible = true;
            if (hasPlayer) {
                var temp = PerformList[number];
                var listArr = [];
                var PerformInfo = {
                    rank: (number + 1),
                    player_id: temp.player_id,
                    nick_name: temp.nick_name,
                    per_tw: temp.per_tw,
                    ac: temp.ac,
                    bd: 0,
                };
                listArr.push(PerformInfo);
                self._itemProPerformance.source = listArr;
            }
            else {
                game.MsgBox.showTxt("mainLang" /* mainLang */, 730 /* noplayer */);
            }
        };
        ExtensionView.prototype.memberSearchResult = function () {
            var self = this;
            var teamInfo = game.dataMgr.generalMo.getPerformanceTeamInfo();
            if (!teamInfo) {
                self.skTeamX.visible = true;
                self.skTeamCancle.visible = true;
                game.MsgBox.showTxt("mainLang" /* mainLang */, 730 /* noplayer */);
                return;
            }
            ;
            var member_infos = teamInfo.member_infos;
            self.skteamScerch.visible = false;
            var hasPlayer = false;
            var number = -1;
            var searchId = parseInt(self.skScerchName.text);
            for (var i = 0; i < member_infos.length; i++) {
                if (searchId == member_infos[i].player_id) {
                    hasPlayer = true;
                    number = i;
                }
            }
            self.skTeamX.visible = true;
            self.skTeamCancle.visible = true;
            if (hasPlayer) {
                var temp = member_infos[number];
                var listArr = [];
                var memberInfo = {
                    rank: (number + 1),
                    name: temp.nick_name,
                    player_id: temp.player_id,
                    ts_create: temp.ts_create,
                    per_sub_tw: temp.per_sub_tw,
                    ac: temp.ac,
                };
                listArr.push(memberInfo);
                self._itemProTeamList.source = listArr;
            }
            else {
                game.MsgBox.showTxt("mainLang" /* mainLang */, 730 /* noplayer */);
            }
        };
        ExtensionView.prototype.updateView = function (num) {
            var self = this;
            var generalMo = game.dataMgr.generalMo;
            if (num == 0) {
                var listArr = [];
                var info = generalMo.getPerform();
                var id = 0;
                for (var i in info) {
                    id += 1;
                    var temp = info[i];
                    var WuXianinfo = {
                        id: id,
                        Level: temp.Level,
                        PButton: temp.PButton,
                        PTop: temp.PTop,
                        Rate: temp.Rate,
                        Describe: temp.Describe,
                    };
                    listArr.push(WuXianinfo);
                }
                self._itemPro.source = listArr;
            }
            else if (num == 1) {
                var performInfo = generalMo.getPerformanceInfo();
                if (performInfo.commission_today_team)
                    self.skteamtoday.text = String(performInfo.commission_today_team / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skteamtoday.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.commission_today_self)
                    self.skselftoday.text = String(performInfo.commission_today_self / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skselftoday.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.commission_today_agent)
                    self.skdltoday.text = String(performInfo.commission_today_agent / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skdltoday.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.commission_yesterday_team)
                    self.skteamyes.text = String(performInfo.commission_yesterday_team / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skteamyes.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.commission_yesterday_self)
                    self.skselfyes.text = String(performInfo.commission_yesterday_self / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skselfyes.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.commission_yesterday_agent)
                    self.skdlyes.text = String(performInfo.commission_yesterday_agent / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skdlyes.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_today_team)
                    self.skteamtodaygold.text = String(performInfo.per_today_team / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skteamtodaygold.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_today_self)
                    self.skselftodaygold.text = String(performInfo.per_today_self / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skselftodaygold.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_today_agent)
                    self.skdltodaygold.text = String(performInfo.per_today_agent / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skdltodaygold.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_yesterday_team)
                    self.skteamyesgold.text = String(performInfo.per_yesterday_team / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skteamyesgold.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_yesterday_self)
                    self.skselfyesgold.text = String(performInfo.per_yesterday_self / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skselfyesgold.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_yesterday_agent)
                    self.skdlyesgold.text = String(performInfo.per_yesterday_agent / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skdlyesgold.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_today)
                    self.skmyyj.text = String(performInfo.per_today / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skmyyj.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_this_week)
                    self.skmyweek.text = String(performInfo.per_this_week / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skmyweek.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.rebate_today)
                    self.sktodayyj.text = String(performInfo.rebate_today / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.sktodayyj.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.rebate_this_week)
                    self.skweekyj.text = String(performInfo.rebate_this_week / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skweekyj.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_b_self_today)
                    self.skmyZY.text = String(performInfo.per_b_self_today / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skmyZY.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_b_child_today)
                    self.skZS.text = String(performInfo.per_b_child_today / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skZS.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_b_self_yesterday)
                    self.skmyZYyes.text = String(performInfo.per_b_self_yesterday / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skmyZYyes.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.per_b_child_yesterday)
                    self.skZSyes.text = String(performInfo.per_b_child_yesterday / 100) + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                else
                    self.skZSyes.text = 0 + TRain.langMgr.getTxt("mainLang" /* mainLang */, 201 /* RMBText */);
                if (performInfo.ac)
                    self.skteamNum.text = String(performInfo.ac);
                else
                    self.skteamNum.text = "0";
                if (performInfo.ac_inc_yd)
                    self.skyesNew.text = String(performInfo.ac_inc_yd);
                else
                    self.skyesNew.text = "0";
                if (performInfo.ac_inc_tm)
                    self.skmonthNew.text = String(performInfo.ac_inc_tm);
                else
                    self.skmonthNew.text = "0";
            }
            else if (num == 2) {
                var listArr = [];
                var PerformList = generalMo.getPerformanceList();
                if (!PerformList)
                    return;
                var lenght = 0;
                if (PerformList.length > 7)
                    lenght = 7;
                else
                    lenght = PerformList.length;
                var i = 0;
                self.skGLPage0.text = String(self._dailiPage - 1);
                self.skGLPage1.text = String(Math.ceil(PerformList.length / 7));
                if (self._dailiPage == 1)
                    i = 0;
                else
                    i = (self._dailiPage - 1) * 7;
                for (; i < lenght; i++) {
                    var temp = PerformList[i];
                    var PerformInfo = {
                        rank: (i + 1),
                        player_id: temp.player_id,
                        nick_name: temp.nick_name,
                        per_tw: temp.per_tw,
                        ac: temp.ac,
                        bd: 0,
                    };
                    listArr.push(PerformInfo);
                }
                self._itemProPerformance.source = listArr;
            }
            else if (num == 3) {
                var performChild = generalMo.getPerformanceChild();
                if (performChild.player_id) {
                    self.skSearchGrp.visible = true;
                    self.skupId.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 724 /* preId */), performChild.parent));
                    self.skteamnum.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 725 /* teamnum */), performChild.ac));
                    self.sktodaygold.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 726 /* todaygold */), performChild.per_sub_today / 100));
                    self.skweekgold.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 727 /* weekgold */), performChild.per_sub_tw / 100));
                    var time = self.GMTToStr(performChild.ts_create);
                    self.sktime.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 728 /* createTime */), time));
                }
                else {
                    game.MsgBox.showTxt("mainLang" /* mainLang */, 729 /* noresult */);
                }
            }
            else if (num == 5) {
                if (self.skInGrp.numChildren > 0) {
                    for (var i = 0; i < self.skInGrp.numChildren; i++) {
                        var temp = self.skInGrp.getChildAt(i);
                        temp.dispose();
                    }
                }
                self.skInGrp.removeChildren();
                var maxHeight = 0;
                var faq = generalMo.getExtend();
                for (var key in faq) {
                    var faqConf = faq[key];
                    if (faqConf.isImg) {
                        var img = new cui.Image();
                        img.source = faqConf.text;
                        img.x = faqConf.x;
                        img.y = faqConf.y;
                        self.skInGrp.addChild(img);
                        if (maxHeight < img.y)
                            maxHeight = img.y;
                    }
                    else {
                        var lab = new cui.Label();
                        lab.textFlow = cui.htmlParser.parser(faqConf.text);
                        lab.x = faqConf.x;
                        lab.y = faqConf.y;
                        self.skInGrp.addChild(lab);
                        if (maxHeight < lab.y)
                            maxHeight = lab.y;
                    }
                }
                self.skInGrp.width = self.skGrp.width;
                self.skInGrp.height = maxHeight + 120;
                self.skGrp.setContentSize(self.skGrp.width, maxHeight + 120);
            }
            else if (num == 6) {
                var listArr = [];
                var teamList = generalMo.getPerformanceTeamlist();
                if (!teamList)
                    return;
                for (var i = 0; i < teamList.length; i++) {
                    var id = 0;
                    var temp = teamList[i];
                    var tempinfo = temp.member_infos;
                    if (tempinfo) {
                        id = tempinfo[tempinfo.length - 1].player_id;
                    }
                    var PerformTeamlist = {
                        handle: self,
                        name: temp.name,
                        count: temp.count,
                        count_limit: temp.count_limit,
                        player_id: id,
                        id: temp.id,
                        code_tag: temp.code_tag,
                    };
                    listArr.push(PerformTeamlist);
                }
                self._itemProTeam.source = listArr;
            }
        };
        ExtensionView.prototype.GMTToStr = function (time) {
            var date = new Date(time);
            var Str = date.getFullYear() + '年' +
                (date.getMonth() + 1) + '月' +
                date.getDate() + '日' +
                date.getHours() + '时' +
                date.getMinutes() + '分' +
                date.getSeconds() + "秒";
            return Str;
        };
        ExtensionView.prototype.onFocus1 = function (e) {
            this.skName.text = "";
        };
        ExtensionView.prototype.OnAccount = function (e) {
            var self = this;
            var inputText = e.target.text;
            if (true)
                console.log("inputText ==", inputText);
            var str = game.DataFormat.CheckStringLength(inputText);
            var len = str[0];
            var chaLen = str[1] > 8 ? 8 : str[1];
            if (len > 16) {
                var firstIdx = 16 - chaLen;
                inputText = inputText.substring(0, firstIdx);
            }
            self.skName.text = inputText;
            self.skName.textColor = 0xeddF36;
        };
        ExtensionView.prototype.onFocus2 = function (e) {
            this.skplayerId.text = "";
        };
        ExtensionView.prototype.OnAccount2 = function (e) {
            var self = this;
            var inputText = e.target.text;
            var str = game.DataFormat.CheckStringLength(inputText);
            var len = str[0];
            var chaLen = str[1] > 8 ? 8 : str[1];
            if (len > 16) {
                var firstIdx = 16 - chaLen;
                inputText = inputText.substring(0, firstIdx);
            }
            self.skplayerId.text = inputText;
            self.skplayerId.textColor = 0xeddF36;
        };
        ExtensionView.prototype.onFocus3 = function (e) {
            this.skteamName.text = "";
        };
        ExtensionView.prototype.OnAccount3 = function (e) {
            var self = this;
            var inputText = e.target.text;
            var str = game.DataFormat.CheckStringLength(inputText);
            var len = str[0];
            var chaLen = str[1] > 8 ? 8 : str[1];
            if (len > 16) {
                var firstIdx = 16 - chaLen;
                inputText = inputText.substring(0, firstIdx);
            }
            self.skteamName.text = inputText;
            self.skteamName.textColor = 0xeddF36;
        };
        ExtensionView.prototype.onFocus4 = function (e) {
            this.skScerchName.text = "";
        };
        ExtensionView.prototype.OnAccount4 = function (e) {
            var self = this;
            var inputText = e.target.text;
            var str = game.DataFormat.CheckStringLength(inputText);
            var len = str[0];
            var chaLen = str[1] > 8 ? 8 : str[1];
            if (len > 16) {
                var firstIdx = 16 - chaLen;
                inputText = inputText.substring(0, firstIdx);
            }
            self.skScerchName.text = inputText;
            self.skScerchName.textColor = 0xeddF36;
        };
        ExtensionView.prototype.showResult = function (num) {
            var self = this;
            for (var i = 0; i < 7; i++) {
                // if (num == i) {
                // 	self["skdaili" + i].visible = true;
                // 	continue;
                // }
                self["skdaili" + i].visible = num == i;
            }
        };
        ExtensionView.prototype.showGain = function () {
            var self = this;
            self.showDate(0);
        };
        ExtensionView.prototype.showPerforms = function () {
            var self = this;
            self.updateView(1);
        };
        ExtensionView.prototype.showPerformsList = function () {
            var self = this;
            self.updateView(2);
        };
        ExtensionView.prototype.showPerformsChild = function () {
            var self = this;
            self.updateView(3);
        };
        ExtensionView.prototype.showPerformsTeamlist = function () {
            var self = this;
            self.updateView(6);
        };
        ExtensionView.prototype.showTeamInfo = function () {
            var self = this;
            var teamInfo = game.dataMgr.generalMo.getPerformanceTeamInfo();
            var listArr = [];
            if (!teamInfo)
                return;
            self.skpaixianNum.text = String(teamInfo.count);
            self.skpaixianNew.text = String(teamInfo.ac_inc);
            var member_infos = teamInfo.member_infos;
            if (member_infos.length == 0)
                return;
            var length = 0;
            if (member_infos.length > 7)
                length = 7;
            else
                length = member_infos.length;
            var i = 0;
            if (self._teamPage == 1)
                i = 0;
            else
                i = (self._teamPage - 1) * 7;
            self.skTeamPage0.text = String(self._teamPage - 1);
            self.skTeamPage1.text = String(Math.ceil(member_infos.length / 7));
            for (; i < length; i++) {
                var temp = member_infos[i];
                var PerformTeamlist = {
                    rank: (i + 1),
                    name: temp.nick_name,
                    player_id: temp.player_id,
                    ts_create: temp.ts_create,
                    per_sub_tw: temp.per_sub_tw,
                    ac: temp.ac,
                };
                listArr.push(PerformTeamlist);
            }
            self._itemProTeamList.source = listArr;
        };
        ExtensionView.prototype.btnClick = function (item, num) {
            var self = this;
            TRain.soundMgr.playSFX("click" /* click */);
            var data = item.data;
            if (num == 1) {
                var view = new game.ExtensionNoticeView(1, data);
                game.gameScene.openPopup(view);
            }
            else if (num == 2) {
                game.gameScene.showHallUI(6 /* code */, data);
            }
            else if (num == 3) {
                var view = new game.ExtensionNoticeView(2, data);
                game.gameScene.openPopup(view);
            }
            else if (num == 4) {
                self.showTeamGrp(data);
            }
        };
        ExtensionView.prototype.showTeamGrp = function (data) {
            var self = this;
            self.skBtnGrp.visible = false;
            self.skBack.visible = false;
            self.skdlXian.visible = false;
            self.skYJxian.visible = false;
            self.skdiGrp.visible = false;
            self.skdiYJGrp.visible = false;
            self.skdiTeam.visible = true;
            for (var i = 0; i < 7; i++) {
                self["skdaili" + i].visible = false;
            }
            self.skTeam.visible = true;
            self.skteamGrp.visible = true;
            self.skTeamBack.visible = true;
            self.skScerchName.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 723 /* inPlayerId */);
            self.skScerchName.promptColor = 0xC4904D;
            self.skScerchName.addEventListener(egret.Event.CHANGE, self.OnAccount4, self);
            self.skScerchName.addEventListener(egret.Event.FOCUS_IN, self.onFocus4, self);
            game.dataMgr.generalMo.sendSearchTeam(data.id);
        };
        ExtensionView.prototype.onShow = function (stage) {
            _super.prototype.onShow.call(this, stage);
            //let self = this;
        };
        ExtensionView.prototype.onHide = function () {
            _super.prototype.onHide.call(this);
            //let self = this;
        };
        ExtensionView.prototype.dispose = function () {
            var self = this;
            var generalMo = game.dataMgr.generalMo;
            generalMo.rmvListener("Gain_result" /* Gain_result */, self.showGain);
            generalMo.rmvListener("GetGain" /* GetGain */, self.showGain);
            generalMo.rmvListener("Perform" /* Perform */, self.showPerforms);
            generalMo.rmvListener("PerformList" /* PerformList */, self.showPerformsList);
            generalMo.rmvListener("PerformChild" /* PerformChild */, self.showPerformsChild);
            generalMo.rmvListener("PerformTeamlist" /* PerformTeamlist */, self.showPerformsTeamlist);
            generalMo.rmvListener("PerformTeaminfo" /* PerformTeaminfo */, self.showTeamInfo);
            _super.prototype.dispose.call(this);
        };
        return ExtensionView;
    }(game.UIFullFW));
    game.ExtensionView = ExtensionView;
    __reflect(ExtensionView.prototype, "game.ExtensionView");
    var extensionWuXian = (function (_super) {
        __extends(extensionWuXian, _super);
        function extensionWuXian() {
            var _this = _super.call(this) || this;
            _this.skinName = "gameWuxianListSkin";
            return _this;
        }
        extensionWuXian.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            if (data.id == 1) {
                self.skXian.visible = true;
            }
            else {
                self.skXian.visible = false;
            }
            if (data.PButton == 0) {
                self.skWXgold.text = game.DataFormat.convertYuanString2(data.PTop, true) + "以下";
            }
            else if (data.PTop == 0) {
                self.skWXgold.text = game.DataFormat.convertYuanString2(data.PButton, true) + "以上";
            }
            else {
                self.skWXgold.text = game.DataFormat.convertYuanString2(data.PButton, true) + "～" + game.DataFormat.convertYuanString2(data.PTop, true);
            }
            self.skWXlv.text = data.Describe;
            self.skWXget.text = "每万" + data.Rate + "元";
        };
        return extensionWuXian;
    }(cui.DataItem));
    game.extensionWuXian = extensionWuXian;
    __reflect(extensionWuXian.prototype, "game.extensionWuXian");
    var ExtensionPerformList = (function (_super) {
        __extends(ExtensionPerformList, _super);
        function ExtensionPerformList() {
            var _this = _super.call(this) || this;
            _this.skinName = "gameDLListSkin";
            return _this;
        }
        ExtensionPerformList.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            self.skRank.text = String(data.rank);
            self.skNickname.text = formatString(data.nick_name);
            self.skId.text = String(data.player_id);
            self.skyj.text = String(data.per_tw / 100);
            self.skTeamNum.text = String(data.ac);
            self.skBaodi.text = String(data.bd);
        };
        return ExtensionPerformList;
    }(cui.DataItem));
    game.ExtensionPerformList = ExtensionPerformList;
    __reflect(ExtensionPerformList.prototype, "game.ExtensionPerformList");
    function formatString(str) {
        if (str.length > 5) {
            return str.substr(0, 5) + "...";
        }
        else {
            return str;
        }
    }
    game.formatString = formatString;
    var ExtensionPerformTeamList = (function (_super) {
        __extends(ExtensionPerformTeamList, _super);
        function ExtensionPerformTeamList() {
            var _this = _super.call(this) || this;
            _this.skinName = "gameTeamListSkin";
            var self = _this;
            self.skChange.setTarget(function () {
                self.data.handle.btnClick(self, 1);
            }, self);
            self.skshare.setTarget(function () {
                self.data.handle.btnClick(self, 2);
            }, self);
            self.skerweima.setTarget(function () {
                self.data.handle.btnClick(self, 3);
            }, self);
            self.skTeam.setTarget(function () {
                self.data.handle.btnClick(self, 4);
            }, self);
            return _this;
        }
        ExtensionPerformTeamList.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            self.skteamName.text = data.name;
            self.sknumber.text = String(data.count);
            self.skpaixian.text = String(data.count) + "/" + String(data.count_limit);
            if (data.player_id != 0)
                self.sknewId.text = String(data.player_id);
            else
                self.sknewId.text = "--";
        };
        return ExtensionPerformTeamList;
    }(cui.DataItem));
    game.ExtensionPerformTeamList = ExtensionPerformTeamList;
    __reflect(ExtensionPerformTeamList.prototype, "game.ExtensionPerformTeamList");
    var ExtensionPerformTeamMemberList = (function (_super) {
        __extends(ExtensionPerformTeamMemberList, _super);
        function ExtensionPerformTeamMemberList() {
            var _this = _super.call(this) || this;
            _this.skinName = "gamePXListSkin";
            var self = _this;
            self.showdata();
            return _this;
        }
        ExtensionPerformTeamMemberList.prototype.showdata = function () {
            var self = this;
            var data = self.data;
            self.skRank.text = String(data.rank);
            self.skNickname.text = String(data.name);
            self.skId.text = String(data.player_id);
            self.sktime.text = String(data.ts_create);
            self.skyj.text = String(data.per_sub_tw / 100);
            self.skTeamNum.text = String(data.ac);
        };
        return ExtensionPerformTeamMemberList;
    }(cui.DataItem));
    game.ExtensionPerformTeamMemberList = ExtensionPerformTeamMemberList;
    __reflect(ExtensionPerformTeamMemberList.prototype, "game.ExtensionPerformTeamMemberList");
    var ExtensionDLList = (function (_super) {
        __extends(ExtensionDLList, _super);
        function ExtensionDLList() {
            var _this = _super.call(this) || this;
            _this.skinName = "gameSelfYejiListSkin";
            return _this;
        }
        ExtensionDLList.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            if (data) {
                if (data.isself) {
                    self.skself.visible = true;
                    self.skother.visible = false;
                    self.skmyRank.text = String(data.rank);
                    self.skmyname.text = formatString(data.name);
                    self.skmyid.text = String(data.player_id);
                    self.skmygold.text = String(data.yej / 100);
                }
                else {
                    self.skself.visible = false;
                    self.skother.visible = true;
                    self.skotherRank.text = String(data.rank);
                    self.skothername.text = formatString(data.name);
                    self.skotherid.text = String(data.player_id);
                    self.skothergold.text = String(data.yej / 100);
                    self.skotheryj.text = String(data.yongj / 100);
                }
            }
        };
        return ExtensionDLList;
    }(cui.DataItem));
    game.ExtensionDLList = ExtensionDLList;
    __reflect(ExtensionDLList.prototype, "game.ExtensionDLList");
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
            self._uiClss = {};
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
            effLay.touchEnabled = false;
            effLay.delegate = self;
            effLay.hCenter = 0;
            effLay.vCenter = 0;
            effLay.tag = 1 /* kEffectLayer */;
            effLay.hitCheckBound = false;
            layers.set(1 /* kEffectLayer */, effLay); //kEffectLayer
            layer = new cui.Group();
            //layer.touchEnabled = false;
            layer.hitCheckBound = false;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.tag = 4 /* kMessageBox */;
            layers.set(4 /* kMessageBox */, layer); //kMessageBox
            game.BoxMgr.setParent(layer, self);
            layer = new cui.Group();
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.touchEnabled = false;
            layer.tag = 5 /* kTipsLayer */;
            layers.set(5 /* kTipsLayer */, layer); //kTipsLayer
            game.TipsMgr.setParent(layer, self);
            popupLayer = new game.PopupLayer();
            popupLayer.delegate = self;
            popupLayer.hitCheckBound = false;
            popupLayer.perWidth = 100;
            popupLayer.perHeight = 100;
            popupLayer.tag = 3 /* kTopPopup */;
            layers.set(3 /* kTopPopup */, popupLayer); //kPopup
            self._popupTop = popupLayer;
            var busyUI = game.BusyLayer.getInst();
            busyUI.setParent(self);
            game.resMgr.loadShow = busyUI;
            game.Net.busyUI = busyUI;
            var core = TRain.core;
            core.addFrameDo(function () {
                TRain.assetMgr.doGC();
                TRain.soundMgr.gcRess();
            }, self, false, 300000);
            self.showHallUI(1 /* Home */);
            game.notifiCenter.addListener("jserr" /* JS_ERR */, function (datas) {
                busyUI.stopBusy();
                // let curGMD = dataMgr.gameMo.getCurGMD();
                // if( curGMD ) curGMD.gm.end();
                game.MsgBox.showBox("mainLang" /* mainLang */, 702 /* gameError */, datas.toString());
            }, self);
            game.notifiCenter.addListener("fail" /* CONN_FAIL */, function () {
                game.MsgBox.showBoxCB("mainLang" /* mainLang */, 758 /* loginInfoOver */, function (tag) {
                    if (tag == 1) {
                        //登出
                        location.reload();
                    }
                }, self);
            }, self);
            var accMo = game.dataMgr.accMo;
            var gameId = accMo.gameId;
            if (gameId) {
                self.startGame(gameId, { inGame: true });
            }
            //断线重连
            TRain.core.addNextDo(function () {
                accMo.addListener("svr_fin" /* login_svr_fin */, function () {
                    if (game.Net.isReCon) {
                        var curGMD = game.dataMgr.gameMo.getCurGMD();
                        var gameId_1 = accMo.gameId;
                        if (curGMD) {
                            if (curGMD.id != gameId_1) {
                                curGMD.gm.end();
                                curGMD = null;
                            }
                        }
                        if (gameId_1) {
                            if (curGMD) {
                                curGMD.gm.onReConnect();
                            }
                            else {
                                self.startGame(gameId_1, { inGame: true });
                            }
                        }
                    }
                }, self);
            }, self);
            game.notifiCenter.delayPostEvent("enter_fin" /* enter_game_fin */, 1);
            game.chipMgr = new game.ChipManager();
            game.goldMgr = new game.GoldMange();
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
            if (tag > 1 /* Home */) {
                switch (tag) {
                    case 5 /* extension */:
                        openUI = new game.ExtensionView(data);
                        break;
                    case 4 /* sevenReward */:
                        openUI = new game.SevenRewardView();
                        break;
                    case 6 /* code */:
                        openUI = new game.ExtensionShareView(data);
                        break;
                    default:
                        var cls = self._uiClss[tag];
                        if (cls) {
                            openUI = new cls();
                        }
                        break;
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
            return openUI;
        };
        /**
         * 显示游戏UI  注：游戏UI  tag 需要大于1000
         * @param uiCls:传入要打开的界面类
         * */
        GameScene.prototype.showGameUI = function (tag, uiCls, isMain) {
            var self = this;
            var oldTag = self._curTag;
            if (oldTag == tag) {
                return;
            }
            var openUI = new uiCls();
            openUI.tag = tag;
            self.openFWUI(openUI, tag, isMain);
            return openUI;
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
            if (oldUI && oldUI != self._mainUI)
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
                        oldMainUI = self._mainUI = null;
                    }
                }
                if (oldMainUI) {
                    newUI = oldMainUI;
                }
                else {
                    newUI = self.homeUI;
                    if (!newUI) {
                        newUI = self.homeUI = new game.HomeView();
                        newUI.tag = 1 /* Home */;
                    }
                }
            }
            self._curTag = tag;
            self._mainLayer.addChild(newUI);
            if (self._firstShow) {
                self._firstShow = false;
            }
        };
        //-----------------------------------------------------------
        GameScene.prototype.regUICls = function (tag, uiCls) {
            var uiClss = this._uiClss;
            uiClss[tag] = uiCls;
        };
        GameScene.prototype.unregUICls = function (tag) {
            delete this._uiClss[tag];
        };
        //---------------------------------- 进入子游戏 ----------------------------------
        /**
         *
         * @param gameId
         * @param data   当data有值  且inGame=true 表示当前正在游戏中
         */
        GameScene.prototype.startGame = function (gameId, data) {
            var self = this;
            var gameMo = game.dataMgr.gameMo;
            gameMo.addListener("fin" /* start_fin */, function (err) {
                game.BusyLayer.getInst().hideBusy();
                if (err) {
                    game.MsgBox.showPrompt(err);
                }
                else {
                    game.GameUtil.setLocal("LAST_GAME" /* LAST_GAME */, gameId.toString());
                    // dataMgr.accMo.lastGmId = gameId;
                    game.chipMgr.setPure(false);
                }
            }, self, true);
            self._popupLayer.closeAll();
            game.BusyLayer.getInst().showBusy();
            gameMo.startGMD(gameId, data);
        };
        GameScene.prototype.endGame = function () {
            var self = this;
            //七日奖励请求
            game.dataMgr.generalMo.sendGetQuestlist(false, true);
            self.homeUI.openFunPop(true);
            game.TipsMgr.clear();
            game.chipMgr.resetAreaArr();
            game.goldMgr.reset();
            self.homeUI.setNotifyParent(null);
            self.goHome();
            game.dataMgr.gameMo.closeGMD();
            game.dataMgr.gsMo.endConn();
            TRain.mcMgr.doGC();
            game.dbMgr.doGC();
        };
        //----------------------------------弹出窗口---------------------------------------
        GameScene.prototype.goBack = function () {
            var ui = this._mainUI;
            if (ui) {
                this.openFWUI();
            }
            else {
                this.openFWUI(null, 1 /* Home */);
            }
        };
        GameScene.prototype.goHome = function () {
            this.openFWUI(null, 1 /* Home */);
        };
        GameScene.prototype.openPopup = function (popup, data, isTop) {
            var self = this;
            var layer = isTop ? self._popupTop : self._popupLayer;
            popup.delegate = self;
            layer.openPopup(popup, data);
        };
        GameScene.prototype.openPopupByTag = function (tag, data, isTop) {
            var self = this;
            var uiCls = self._uiClss[tag];
            if (uiCls) {
                self.openPopup(new uiCls(), data, isTop);
            }
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
        //----------------------全屏特效-------------------------
        GameScene.prototype.addSceneEff = function (eff) {
            var self = this;
            var effLay = self._layers.get(1 /* kEffectLayer */);
            effLay.addEffect(eff);
        };
        /**
         * 同时播放多个场景特效，仅用于小特效
         */
        GameScene.prototype.showSceneEff = function (eff) {
            var self = this;
            var effLay = self._layers.get(1 /* kEffectLayer */);
            effLay.showEffect(eff);
        };
        return GameScene;
    }(game.BaseScene));
    game.GameScene = GameScene;
    __reflect(GameScene.prototype, "game.GameScene", ["game.PopupDelegate"]);
})(game || (game = {}));
var game;
(function (game) {
    var HomeView = (function (_super) {
        __extends(HomeView, _super);
        function HomeView() {
            var _this = _super.call(this) || this;
            // public skAniLeft:cui.UIMovieClip;
            // public skAniRight:cui.UIMovieClip;
            _this._classFlag = 0;
            var self = _this;
            self.skinName = "gameHallSkin";
            self._notifyUI = new game.NotifyUI();
            self._loginCount = 0;
            return _this;
            // self._tipNum = 0;
        }
        HomeView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skTipBtn1.setTarget(function () {
                TRain.core.rmvDelayDoByFlag(self._tempGameId);
                TRain.core.rmvFrameDo(self, self.frameFunClose);
                TRain.core.rmvFrameDo(self, self.frameFunOpen);
                if (self.skGrp.scaleX == 1 && self.skGrp.scaleY == 1) {
                    //打开状态
                    self.randomTxt();
                    TRain.core.addFrameDo(self.frameFunClose, self, true, 5000);
                    TRain.core.addFrameDo(self.frameFunOpen, self, true, 30000);
                }
                else if (self.skGrp.scaleX == 0 && self.skGrp.scaleY == 0) {
                    //关闭状态
                    self.outOrIn(true);
                    self.randomTxt();
                    TRain.core.addFrameDo(self.frameFunClose, self, true, 5000);
                    TRain.core.addFrameDo(self.frameFunOpen, self, true, 30000);
                }
            }, self);
            self.skTipBtn.setTarget(function () {
                TRain.core.rmvDelayDoByFlag(self._tempGameId);
                TRain.core.rmvFrameDo(self, self.frameFunClose);
                TRain.core.rmvFrameDo(self, self.frameFunOpen);
                //打开状态
                self.randomTxt();
                TRain.core.addFrameDo(self.frameFunClose, self, true, 5000);
                TRain.core.addFrameDo(self.frameFunOpen, self, true, 30000);
            }, self);
            self.skClassGrp.visible = false;
            // self.skAniRelief.visible = false;
            // self.skRelief.visible = false;
            //self.skLeft.visible = false;
            self.setBindOrSave();
            var accMo = game.dataMgr.accMo;
            var accData = game.dataMgr.accMo.getData();
            var sevenDay_Done = accData.sevenday_done;
            self.skTask.visible = (!!sevenDay_Done && game.dataMgr.gameMo.getData().length > 7) ? true : false;
            self.skReward.visible = (!sevenDay_Done && game.dataMgr.gameMo.getData().length > 7) ? true : false;
            self._gamesBeginX = self.skGameSc.x;
            self.skBHead.setTarget(function () {
                game.gameScene.openPopup(new game.PersonCenter());
            }, self);
            self.skBSet.setTarget(function () {
                //打开设置界面
                TRain.soundMgr.playSFX("click" /* click */);
                // self.skBSet.sound ="click";
                // self.skBSet.sound = confConsts.SoundTp.click;
                var view = new game.SettingView();
                game.gameScene.openPopup(view);
            }, self);
            self.skMail.setTarget(function () {
                //打开邮件界面
                TRain.soundMgr.playSFX("click" /* click */);
                // self.skMail.sound ="click";
                var view = new game.MailView();
                game.gameScene.openPopup(view);
            }, self);
            self.skService.setTarget(game.HttpUtil.gotoKeFu, game.HttpUtil);
            self.skClass.setTarget(function () {
                if (self._classFlag == 0) {
                    self.skClassGroup.addChildAt(self.skClassGrp, 4);
                    self.skClassGrp.visible = true;
                    self._classFlag = 1;
                }
                else {
                    self.skClassGroup.removeChildAt(4);
                    self._classFlag = 0;
                }
            }, self);
            self.skProfit.setTarget(function () {
                TRain.soundMgr.playSFX("click" /* click */);
            }, self);
            self.skLeft.setTarget(function () {
                // if(self.skGames.scrollH == 0){
                // 	self.skLeft.visible = false;
                // 	self.skRight.visible = true;
                // }else 
                if (self.skGames.scrollH < 700) {
                    self.skGameSc.setScrollLeft(0, 500);
                    // self.skLeft.visible = false;
                    // self.skRight.visible = true;
                }
                else {
                    self.skGameSc.setScrollLeft(self.skGames.scrollH - 700, 500);
                }
                TRain.core.addDelayDo(self.showArrow, self, 500);
            }, self);
            self.skRight.setTarget(function () {
                self.skGameSc.setScrollLeft(self.skGames.scrollH + 700, 500);
                // self.skLeft.visible = true;
                TRain.core.addDelayDo(self.showArrow, self, 500);
            }, self);
            // self.skTipBtn.setTarget(function(){
            // 	// self._tipNum++;
            // 	//TRain.core.rmvDelayDoByID(self._flag);
            // 	self.randomTxt();
            // },self);
            // self.skTipBtn1.setTarget(function(){
            // 	// self._tipNum++;
            // 	//TRain.core.rmvDelayDoByID(self._flag);
            // 	self.randomTxt();
            // },self);
            // self.skCopyHttp.setTarget(function(){
            // 	self.skRoleTalk.text = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.LobbyUITips5);
            // 	let tip = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.CopyUrlSuccess);
            // 	TipsMgr.showPrompt(tip,UIColor.orange);
            // 	URLUtil.copyText(TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.GameIp));
            // },self);
            var list = self.skGames;
            list.itemRender = game.GameTile;
            list.itemSkinName = "gameTileSkin";
            list.dataProvider = new cui.ArrayCollection();
            list.addEventListener("item_tap" /* ITEM_TAP */, function (e) {
                TRain.soundMgr.playSFX("click" /* click */);
                // self.skBSet.sound ="click";
                game.gameScene.startGame(e.data.tag);
            }, self);
            self.showGameClass();
            self.updateHead();
            accMo.addPropListener("icon_custom", self.updateHead, self);
            accMo.addPropListener("gold", self.updateHead, self);
            accMo.addPropListener("nickname", self.updateHead, self);
            accMo.addPropListener("sevenday_done", self.updateSevenDayBtn, self);
            self.skClassGrp.setTarget(self.menuClick, self);
            self.skClassGrp.selectTag = 5;
            self.flipGirlGrp();
            self.skBinding.setTarget(self.bindGift, self);
            self.skRelief.setTarget(self.bindGift, self);
            self.skExtension.setTarget(function () {
                game.gameScene.showHallUI(5 /* extension */);
            }, self);
            self.skAgent.setTarget(function () {
                game.gameScene.showHallUI(5 /* extension */);
            }, self);
            // self.skBinding.setTarget(self.bindGift, self);
            // self.skReward.setTarget(function () {
            // 	dataMgr.generalMo.sendGetQuestlist(false);
            // }, self);
            self.skTask.setTarget(function () {
                //打开限时悬赏界面
                TRain.soundMgr.playSFX("click" /* click */);
                game.gameScene.openPopup(new game.LimitReward2());
                //generalMo.sendGetQuestlist();
            }, self);
            self.skReward.setTarget(function () {
                //七日奖励
                TRain.soundMgr.playSFX("click" /* click */);
                game.GameUtil.playClickSound();
                generalMo.sendGetQuestlist();
                // gameScene.openPopup(new AchieveShareDialog());
            }, self);
            self.setNotifyParent(null);
            //刚登陆游戏，需要弹出某个窗口
            //也需要判断是游客还是用户
            var generalMo = game.dataMgr.generalMo;
            if (accMo.gameId == 0) {
                if (accMo.havePopNotice())
                    game.gameScene.openPopup(new game.NoticeView(2 /* hallPop */), null, true);
            }
            // if (accMo.gameId == 0) {
            // 	self.bindGift();
            // }
            generalMo.addListener("quest_list" /* Quest_List_Result */, function () {
                // if (!sevenDay_Done && generalMo.isOpen) {
                //七日奖励
                // let view = new SevenRewardView();
                // view.open(gameScene.homeUI);
                game.gameScene.showHallUI(4 /* sevenReward */);
                // }
                // let view = new AchieveShareDialog();
                // gameScene.openPopup(view, undefined);
            }, self);
            //成就分享
            // generalMo.addListener(General_EVT.Notify_Achieve_Share, function (data) {
            // 	let view = new AchieveShareDialog();
            // 	gameScene.openPopup(view, data);
            // }, self);
            // generalMo.addListener(General_EVT.OpenTaskToday, function () {
            // 	//打开限时悬赏广告
            // 	if (dataMgr.accMo.gameId == 0 && dataMgr.gameMo.getData().length > 7) {
            // 		let view = new LimitReward();
            // 		gameScene.openPopup(view);
            // 	}
            // }, self);
            generalMo.addListener("ShowGameClass" /* ShowGameClass */, function (tag) {
                // self.showGameClass(tag);
                self.skClassGrp.selectTag = tag;
            }, self);
            accMo.addListener("bin_fin" /* bin_phone_fin */, self.setBindOrSave, self);
            generalMo.addListener("IsDone" /* IsDone */, function (data) {
                self.skImgDone.visible = (data && game.dataMgr.gameMo.getData().length > 7) ? true : false;
            }, self);
            self.skImgDone.visible = (generalMo.isDone && game.dataMgr.gameMo.getData().length > 7) ? true : false;
            // self._tipNum = 0;
            // TRain.core.addFrameDo(self.randomTxt, self, true, 2000);
            self.skNotice.setTarget(function () {
                TRain.soundMgr.playSFX("click" /* click */);
                game.gameScene.openPopup(new game.NoticeView(1 /* hall */));
                //gameScene.openPopup(new ActMainView());
            }, self);
            //注册游戏后首次登陆游戏，调用定位，该功能用于玩家发展下线用
            if (accMo.isNew) {
                var request = new egret.HttpRequest();
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                request.responseType = egret.HttpResponseType.TEXT;
                request.open("https://www.ccatv.pro/channel/location?PlayerId=%s" + game.dataMgr.accMo.getData().aid + "&PackageChannelId=%s" + CONF.shareId, egret.HttpMethod.POST);
                request.send();
                request.addEventListener(egret.Event.COMPLETE, function (e) {
                    var req = e.currentTarget;
                    var data = JSON.parse(req.response);
                    if (true)
                        console.log("data  ==  ", data);
                }, this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
                    if (true)
                        console.log("get error : " + e);
                }, this);
            }
            self.showNoticeNum();
            generalMo.addListener("backInfo" /* backInfo */, self.openFunPop, self);
            game.dataMgr.generalMo.sendPerformList(true);
        };
        HomeView.prototype.showNoticeNum = function () {
            var self = this;
            var noticeNum = game.dataMgr.accMo.getNoReadNum();
            var inGrp = self.skNotice.getChildAt(1);
            inGrp.visible = noticeNum > 0;
            inGrp.getChildAt(1).text = String(noticeNum);
        };
        HomeView.prototype.updateSevenDayBtn = function () {
            var self = this;
            var accMo = game.dataMgr.accMo;
            var sevenDay_Done = accMo.getData().sevenday_done;
            var isOpen = game.dataMgr.gameMo.getData().length > 7;
            self.skTask.visible = (!!sevenDay_Done && isOpen) ? true : false;
            self.skReward.visible = (!sevenDay_Done && isOpen) ? true : false;
            //弹出系统解锁
            if (!!sevenDay_Done && game.dataMgr.accMo.gameId == 0 && isOpen) {
                var view = new game.LimitRwOpen();
                game.gameScene.openPopup(view);
            }
        };
        HomeView.prototype.setBindOrSave = function () {
            var self = this;
            self.skBinding.visible = game.dataMgr.accMo.getData().isFormal ? false : true;
            self.skRelief.visible = game.dataMgr.accMo.getData().isFormal ? true : false;
        };
        HomeView.prototype.menuClick = function (item) {
            var self = this;
            var tag = item.tag;
            self.showGameClass(tag);
            // let index = self.getChildIndex(self.skLeft);
            // if (index > 0) self.removeChild(self.skLeft);
        };
        HomeView.prototype.bindGift = function () {
            TRain.soundMgr.playSFX("click" /* click */);
            var view = game.dataMgr.accMo.getData().isFormal ? new game.SaveMoneyDialog() : new game.BindGiftDialog();
            game.gameScene.openPopup(view);
        };
        HomeView.prototype.setNotifyParent = function (p, maskWidth) {
            this._notifyUI.setParent(p || this.skNotify, maskWidth);
        };
        //移除时 使用
        HomeView.prototype.rmvNotifyParent = function (p) {
            this._notifyUI.rmvParent(p);
        };
        HomeView.prototype.frameFunClose = function () {
            var self = this;
            self.outOrIn(false);
        };
        HomeView.prototype.frameFunOpen = function () {
            var self = this;
            self.outOrIn(true);
            self.randomTxt();
        };
        HomeView.prototype.onShow = function (stage) {
            _super.prototype.onShow.call(this, stage);
            var self = this;
            self.skGrp.scaleX = self.skGrp.scaleY = 0;
            self._tempGameId = TRain.actionMgr.getUnitTag();
            var num = TRain.core.addDelayDo(function () {
                self.outOrIn(true);
                self.randomTxt();
                TRain.core.addFrameDo(self.frameFunClose, self, true, 5000);
                TRain.core.addFrameDo(self.frameFunOpen, self, true, 30000);
                TRain.core.rmvDelayDoByID(num);
            }, self, 2000, self._tempGameId);
            // TRain.core.addFrameDo(self.randomTxt, self, true, 5000);
            if (TRain.soundMgr.musicState)
                TRain.soundMgr.playMusic("BG309" /* BG309 */);
            var gameModel = game.dataMgr.gameMo;
            var lastGmId = game.GameUtil.getLocal("LAST_GAME" /* LAST_GAME */);
            var gameConf = gameModel.getGmdConf(lastGmId);
            if (gameConf != null) {
                self.skLast.source = "hall@txt_lastPlay";
                self.skGameName.text = gameConf.nm;
                self.skLastGmBtn.setTarget(function () {
                    TRain.soundMgr.playSFX("click" /* click */);
                    game.gameScene.startGame(lastGmId);
                }, self);
            }
            else {
                self.skLast.source = "hall@txt_popular";
                self.skGameName.text = gameModel.getGmdConf(16 /* doudizhu */).nm;
                self.skLastGmBtn.setTarget(function () {
                    TRain.soundMgr.playSFX("click" /* click */);
                    game.gameScene.startGame(16 /* doudizhu */);
                }, self);
            }
            TRain.actionMgr.addAction(self._actionLoop, self.skGirlImg, false);
            TRain.core.stage.addEventListener(egret.TouchEvent.TOUCH_END, self.showArrow, self);
        };
        HomeView.prototype.onHide = function () {
            _super.prototype.onHide.call(this);
            var self = this;
            TRain.actionMgr.rmvActsByTag(self._tempGameId);
            TRain.core.rmvDelayDoByFlag(self._tempGameId);
            TRain.core.rmvFrameDo(self, self.frameFunClose);
            TRain.core.rmvFrameDo(self, self.frameFunOpen);
            // TRain.core.rmvFrameDo(self, self.randomTxt);
            self._actionLoop.stop();
            TRain.core.stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.showArrow, self);
        };
        HomeView.prototype.flipGirlGrp = function () {
            var self = this;
            var action = new TRain.ActionPropTween(3000, 1, { vCenter: { b: 60, r: -10 } });
            action.setEaseFun(game.UIUtils.sin);
            var actionLoop = self._actionLoop = new TRain.ActionLoop(action);
        };
        HomeView.prototype.updateHead = function () {
            var self = this;
            var accModel = game.dataMgr.accMo;
            var accData = accModel.getData();
            //获取当前头像
            self.skHeadImg.source = game.DataFormat.getHeadIcon(accData.icon_custom);
            self.skHeadFrame.source = "head@old" /* oldFrame */ + accData.viplvl;
            //当前玩家名字
            // if(accData.nickname.length > 12){
            // 	self.skName.text = accData.nickname.substr(0,12) + "...";
            // }else{
            // 	self.skName.text = accData.nickname;
            // }
            self.skName.text = game.DataFormat.formatName(accData.nickname, 12, 12);
            //当前玩家id
            self.skId.text = "ID：" + accData.aid;
            self.skGold.text = String(game.DataFormat.convertYuanString2(accData.gold, false));
        };
        //美女说话框弹出和收回动画
        HomeView.prototype.outOrIn = function (isOut, cb) {
            var self = this;
            var duration = 200;
            var temp = isOut ? 1 : 0;
            game.UIUtils.move(self.skGrp, { scaleX: temp, scaleY: temp }, EaseUtil.quadOut, duration, undefined, cb, self._tempGameId);
        };
        // public _flag:number;
        //随机显示美女讲的话
        HomeView.prototype.randomTxt = function () {
            var self = this;
            var temp = game.dataMgr.generalMo.tipConf;
            var len = temp.length;
            // temp.push(langConsts.mainLang.LobbyUITips0);
            // temp.push(langConsts.mainLang.LobbyUITips1);
            // temp.push(langConsts.mainLang.LobbyUITips2);
            // temp.push(langConsts.mainLang.LobbyUITips3);
            // temp.push(langConsts.mainLang.LobbyUITips4);
            // temp.push(langConsts.mainLang.LobbyUITips5);
            // temp.push(langConsts.mainLang.LobbyUITips6);
            var num = Math.ceil(Math.random() * len - 1);
            // if(self._tipNum > 5)self._tipNum = 0;
            //self.skRoleTalk.text = TRain.langMgr.getTxt(LangGrp.mainLang, temp[num]);
            self.skRoleTalk.text = temp[num].txt;
            // self._tipNum++;
            // self._flag = TRain.core.addFrameDo(function(){
            // 	self.skRoleTalk.text = "";
            // 	TRain.core.rmvDelayDoByID(self._flag);
            // },self, false, 5000);
        };
        //游戏分类显示
        HomeView.prototype.showGameClass = function (tag) {
            var self = this;
            var gameModel = game.dataMgr.gameMo;
            var beginX = self._gamesBeginX;
            var gameSc = self.skGameSc;
            var curSvrList = gameModel.getData();
            var showGames = [];
            for (var i = 0; i < curSvrList.length; i++) {
                var info = curSvrList[i];
                var gameId = info.gameid;
                var gameConf = gameModel.getGmdConf(gameId);
                if (gameConf && !!gameConf.isOpen) {
                    if (!tag || gameConf.class == tag || tag == 5) {
                        showGames.push({ ani: gameConf.file, tag: gameId, ud: gameConf });
                    }
                }
            }
            showGames.sort(function (a, b) {
                return a.ud.wg - b.ud.wg;
            });
            var scW = gameSc.width;
            var maxNum = Math.ceil(scW / 175) + 2;
            if (maxNum % 2 != 0)
                maxNum++; // 计算显示的个数 偶数个
            for (var i = 0, len = showGames.length; i < len; i++) {
                var data = showGames[i];
                var idx = i > maxNum - 1 ? i - maxNum : i;
                var isLook = i < maxNum;
                data.state = { alpha: 1, tm: idx, isClick: isLook };
            }
            TRain.actionMgr.rmvActsByTar(gameSc);
            self.skGames.dataProvider.source = showGames;
            gameSc.x = beginX + 200;
            game.UIUtils.move(gameSc, { x: beginX }, EaseUtil.quadInOut, 300);
            gameSc.setScrollLeft(0, 500); //第一个是坐标，滚动到哪个位置
        };
        HomeView.prototype.showArrow = function (e) {
            var self = this;
            //if( !(e && e.target instanceof cui.DataGroup &&  e.target instanceof cui.SimpleButton) ) return;
            if (!e && self._loginCount < 1) {
                self._loginCount++;
                return;
            }
            var isShow1 = true;
            var isShow2 = true;
            if (self.skGames.scrollH + self.skGames.width + 100 >= self.skGames.contentWidth) {
                isShow2 = false;
            }
            if (self.skGames.scrollH <= 10) {
                isShow1 = false;
            }
            if (isShow1) {
                self.addChild(self.skLeft);
            }
            else {
                var index = self.getChildIndex(self.skLeft);
                if (index > 0)
                    self.removeChild(self.skLeft);
            }
            if (isShow2) {
                self.addChild(self.skRight);
            }
            else {
                var index = self.getChildIndex(self.skRight);
                if (index > 0)
                    self.removeChild(self.skRight);
            }
            // self.skLeft.visible = isShow1;
            // self.skRight.visible = isShow2;
        };
        //在大厅中打开相关的弹出框
        HomeView.prototype.openFunPop = function (isNotEvt) {
            var self = this;
            //首先判断哪些是在这次里面是需要弹出的
            var gameMo = game.dataMgr.generalMo;
            var hallFunPopConfs = gameMo.getFunPopInfos();
            var i = 0, len = hallFunPopConfs.length;
            var accData = game.dataMgr.accMo.getData();
            var showArr = [];
            for (; i < len; i++) {
                var hallFunPopConf = hallFunPopConfs[i];
                var proBVal = self.getIsPopProB(hallFunPopConf.Probability);
                switch (hallFunPopConf.ID) {
                    case 1 /* limitReward */:
                        if (!!hallFunPopConf.IsShow && gameMo.isOpenLimitRw && proBVal) {
                            showArr.push(hallFunPopConf);
                        }
                        break;
                    case 2 /* bindReward */:
                        if (!!hallFunPopConf.IsShow && proBVal && isNotEvt) {
                            //获取今天是否弹出过
                            var svrMsTm = TimeUtil.getSvrMS();
                            var localSvrTm = parseInt(game.GameUtil.getLocal("BINDREWARD" /* ISOVERPOP_BINDREWARD */));
                            var isPop = TimeUtil.equalsDay(localSvrTm, svrMsTm);
                            if (!accData.isFormal && !isPop) {
                                //gameScene.openPopup(new BindGiftDialog());
                                game.GameUtil.setLocal("BINDREWARD" /* ISOVERPOP_BINDREWARD */, String(svrMsTm));
                                showArr.push(hallFunPopConf);
                            }
                        }
                        break;
                    case 3 /* firstRechange */:
                        if (!!hallFunPopConf.IsShow && proBVal) {
                            //获取今天是否弹出过
                            var svrMsTm = TimeUtil.getSvrMS();
                            var localSvrTm = parseInt(game.GameUtil.getLocal("FIRSTRECHANGE" /* ISOVERPOP_FIRSTRECHANGE */));
                            var isPop = TimeUtil.equalsDay(localSvrTm, svrMsTm);
                            if ((accData.Recharged > 0) && !isPop) {
                                //gameScene.openPopup(new BindGiftDialog());
                                //打开首充界面
                                game.GameUtil.setLocal("FIRSTRECHANGE" /* ISOVERPOP_FIRSTRECHANGE */, String(svrMsTm));
                                showArr.push(hallFunPopConf);
                            }
                        }
                        break;
                    case 4 /* allAgent */:
                        if (!!hallFunPopConf.IsShow && proBVal) {
                            var createTm = accData.create_time;
                            var svrMsTm = TimeUtil.getSvrMS();
                            var isEqDay = TimeUtil.equalsDay(createTm * 1000, svrMsTm);
                            var list = gameMo.getPerformanceList();
                            if (!!hallFunPopConf.IsShow && list && list.length > 0 && !isEqDay) {
                                showArr.push(hallFunPopConf);
                            }
                        }
                        break;
                    case 5 /* sevenDay */:
                        if (!!hallFunPopConf.IsShow && proBVal) {
                            var day = game.dataMgr.generalMo.curDay;
                            var list = game.dataMgr.generalMo.getTaskByDay(day);
                            if (list && list.length > 0) {
                                var count = 0;
                                for (var i_1 = 0; i_1 < list.length; i_1++) {
                                    var sevenDayData = list[i_1];
                                    if (sevenDayData.count >= sevenDayData.cfg.completeCount && !sevenDayData.received) {
                                        count++;
                                    }
                                }
                                if (count == list.length)
                                    showArr.push(hallFunPopConf);
                            }
                        }
                        break;
                    case 6 /* runWater */:
                        break;
                }
            }
            showArr.sort(function (a, b) {
                if (a.Sort == b.Sort) {
                    return a.ID - b.ID;
                }
                else {
                    return a.Sort - b.Sort;
                }
            });
            var val = 500;
            for (i = 0, len = showArr.length; i < len; i++) {
                var hallFunPopConf = showArr[i];
                var openView = void 0;
                if (hallFunPopConf.ID != 5 /* sevenDay */) {
                    switch (hallFunPopConf.ID) {
                        case 1 /* limitReward */:
                            openView = new game.LimitReward();
                            break;
                        case 2 /* bindReward */:
                            openView = new game.BindGiftDialog();
                            break;
                        case 3 /* firstRechange */:
                            break;
                        case 4 /* allAgent */:
                            openView = new game.ExtensionPop();
                            break;
                        case 6 /* runWater */:
                            break;
                    }
                    openView.pri = val;
                    val -= 10;
                    game.gameScene.openPopup(openView);
                }
                else {
                    if (i == 0) {
                        game.gameScene.showHallUI(4 /* sevenReward */);
                    }
                    else {
                        gameMo.addListener("close" /* Close */, function () {
                            game.gameScene.showHallUI(4 /* sevenReward */);
                        }, self);
                    }
                }
            }
        };
        //根据弹出概率判断是否弹出
        HomeView.prototype.getIsPopProB = function (proBVal) {
            var self = this;
            var len = 100 / proBVal;
            var temProB = [];
            for (var i = 0; i < len; i++) {
                temProB.push(i);
            }
            //
            var val = Math.floor(Math.random() * len);
            return val == temProB[0];
        };
        return HomeView;
    }(game.UIFullFW));
    game.HomeView = HomeView;
    __reflect(HomeView.prototype, "game.HomeView");
})(game || (game = {}));
var game;
(function (game) {
    var LimitReward = (function (_super) {
        __extends(LimitReward, _super);
        function LimitReward() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "RewardTaskSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        LimitReward.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var list = self.skList;
            list.itemRender = LimitRewardItem;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            self.skTips.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 780 /* limitRewardTips */);
            self.skClose.setTarget(function () {
                self.close();
                game.dataMgr.generalMo.postEvent("close" /* Close */);
            }, self);
            self.updateView();
            game.dataMgr.generalMo.addListener("UpdateTaskList" /* UpdateTaskList */, self.updateView, self);
        };
        LimitReward.prototype.updateView = function () {
            var self = this;
            //获取任务列表
            var generalMo = game.dataMgr.generalMo;
            var list = generalMo.getLimitList();
            self._itemPro.source = list;
        };
        LimitReward.prototype.onDispose = function () {
            game.dataMgr.generalMo.rmvListener("UpdateTaskList" /* UpdateTaskList */, this);
            _super.prototype.onDispose.call(this);
        };
        return LimitReward;
    }(game.UIPopup));
    game.LimitReward = LimitReward;
    __reflect(LimitReward.prototype, "game.LimitReward");
    var LimitRewardItem = (function (_super) {
        __extends(LimitRewardItem, _super);
        function LimitRewardItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "RewardItemSkin";
            return _this;
        }
        LimitRewardItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skGo.setTarget(self.BtnClick, self);
            self.skBar.openAni = false;
        };
        LimitRewardItem.prototype.BtnClick = function () {
            var self = this;
            var data = self.data;
            if (self._isGoLink) {
                //前往
                var id = data.cfg.gameID[0];
                game.gameScene.startGame(id);
            }
            else {
                //领取
                game.dataMgr.generalMo.sendGetQuestReward(data.questid);
            }
        };
        LimitRewardItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            var isReceived = data.received;
            self.skOverImg.visible = isReceived;
            //获取配置数量
            var questConf = data.cfg;
            var curCount = questConf.type != 1 ? data.count / 100 : data.count;
            var totalCount = questConf.type != 1 ? questConf.completeCount / 100 : questConf.completeCount;
            var isGoLink = self._isGoLink = curCount < totalCount;
            self.skBar.visible = self.skBarLab.visible = !isReceived;
            self.skGo.visible = game.dataMgr.accMo.gameId == 0 && !isReceived;
            self.skGo.icon = isGoLink ? "reward@txt_go" : "reward@txt_receive";
            if (isReceived) {
                self.skGold.filterNm = self.skBg.filterNm = self.skGoldBg.filterNm = self.skName.filterNm = self.skContent.filterNm = self.skGold.filterNm = "grayCF";
            }
            self.skGold.text = "jl" + (questConf.awardItemCount / 100) + "y";
            self.skName.text = questConf.name;
            self.skContent.text = questConf.desc;
            self.skBarLab.text = curCount + "/" + totalCount;
            self.skBar.setProgressValue(curCount / totalCount, 1000);
        };
        return LimitRewardItem;
    }(cui.DataItem));
    game.LimitRewardItem = LimitRewardItem;
    __reflect(LimitRewardItem.prototype, "game.LimitRewardItem");
})(game || (game = {}));
var game;
(function (game) {
    var LimitReward2 = (function (_super) {
        __extends(LimitReward2, _super);
        function LimitReward2() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "RewardFrameSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        LimitReward2.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var list = self.skList;
            list.itemRender = game.LimitRewardItem;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            self.skClose.setTarget(self.close, self);
            self.updateView();
            game.dataMgr.generalMo.addListener("UpdateTaskList" /* UpdateTaskList */, self.updateView, self);
            self._tagTm = TRain.core.addFrameDo(self.updateTm, self, false, 1000);
            self.updateTm();
        };
        LimitReward2.prototype.updateTm = function () {
            var self = this;
            var date = TimeUtil.formatTm();
            var tm = StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 660 /* TaskRemainedTimes */), date.day, date.hour, date.min, date.sec);
            self.skTime.textFlow = cui.htmlParser.parser(tm); //温馨提示：xxxxx
        };
        LimitReward2.prototype.updateView = function () {
            var self = this;
            //获取任务列表
            var generalMo = game.dataMgr.generalMo;
            var list = generalMo.getLimitList();
            self._itemPro.source = list;
        };
        LimitReward2.prototype.onDispose = function () {
            game.dataMgr.generalMo.rmvListener("UpdateTaskList" /* UpdateTaskList */, this);
            TRain.core.rmvFrameDoById(this._tagTm);
            _super.prototype.onDispose.call(this);
        };
        return LimitReward2;
    }(game.UIPopup));
    game.LimitReward2 = LimitReward2;
    __reflect(LimitReward2.prototype, "game.LimitReward2");
})(game || (game = {}));
var game;
(function (game) {
    var LimitRwOpen = (function (_super) {
        __extends(LimitRwOpen, _super);
        function LimitRwOpen() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "LimRwOpenSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self._tm = 11;
            return _this;
        }
        LimitRwOpen.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(self.close, self);
            self._tagTm = TRain.core.addFrameDo(self.updateTm, self, false, 1000);
        };
        LimitRwOpen.prototype.updateTm = function () {
            var self = this;
            var tm = self._tm--;
            if (tm < 1) {
                self.close();
                TRain.core.rmvFrameDo(self._tagTm);
                self._tagTm = 0;
            }
        };
        return LimitRwOpen;
    }(game.UIPopup));
    game.LimitRwOpen = LimitRwOpen;
    __reflect(LimitRwOpen.prototype, "game.LimitRwOpen");
})(game || (game = {}));
var game;
(function (game) {
    var MailView = (function (_super) {
        __extends(MailView, _super);
        function MailView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "mailSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            game.dataMgr.mailMo.askMessage();
            return _this;
        }
        MailView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var mailMo = game.dataMgr.mailMo;
            mailMo.addListener("mail_list" /* list */, self.updateView, self);
            mailMo.addListener("mail_delete" /* delete */, self.updateView, self);
            mailMo.addListener("read_mail" /* read */, self.updateView, self);
            self.skClose.setTarget(self.close, self);
            self.skList.itemRender = MailItem;
            var dataPro = self._dataPro = new cui.ArrayCollection();
            self.skList.dataProvider = dataPro;
            self.updateView();
        };
        MailView.prototype.updateView = function () {
            var self = this;
            var mailMo = game.dataMgr.mailMo;
            var mailList = mailMo.list;
            self.skNoHaveImg.visible = false;
            self.skScroller.visible = true;
            var mailArr = [];
            if (mailList.length > 0) {
                for (var i = 0; i < mailList.length; i++) {
                    mailArr.push(self.formatMialItem(mailList[i]));
                }
                mailArr.sort(function (a, b) {
                    if (a.read == b.read)
                        return b.time - a.time;
                    return a.read - b.read;
                });
                self._dataPro.source = mailArr;
            }
            else {
                self.skNoHaveImg.visible = true;
                self.skScroller.visible = false;
            }
        };
        MailView.prototype.formatMialItem = function (mailInfo) {
            var self = this;
            var showData = {
                handle: self,
                id: mailInfo.id,
                read: mailInfo.read,
                time: mailInfo.timeValue,
                info: mailInfo.msgInfo,
            };
            return showData;
        };
        MailView.prototype.click = function (item) {
            var self = this;
            var data = item.data;
            //判断当前是否存在附件
            // if(true){
            //     
            //     let tip  = TRain.langMgr.getTxt(LangGrp.mainLang,langConsts.mainLang.ACAccountIsNull); //附件尚未领取，无法删除邮件
            //     TipsMgr.showPrompt(tip);
            // }else{
            game.dataMgr.mailMo.deleteMessage([data.id]);
            // }
        };
        MailView.prototype.readClick = function (item) {
            var self = this;
            var data = item.data;
            var view = new MailDetail(data);
            view.pri = 100 /* layer1 */;
            game.gameScene.openPopup(view);
            if (!data.read)
                game.dataMgr.mailMo.readMessage(data.id);
        };
        MailView.prototype.onDispose = function () {
            _super.prototype.onDispose.call(this);
            var mailMo = game.dataMgr.mailMo;
            mailMo.rmvListener("mail_list" /* list */, self);
            mailMo.rmvListener("mail_delete" /* delete */, self);
            mailMo.rmvListener("read_mail" /* read */, self);
        };
        return MailView;
    }(game.UIPopup));
    game.MailView = MailView;
    __reflect(MailView.prototype, "game.MailView");
    var MailItem = (function (_super) {
        __extends(MailItem, _super);
        function MailItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "mailItemSkin";
            return _this;
        }
        MailItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var data = self.data;
            self.skRmvMail.setTarget(function () {
                data.handle.click(self);
            }, self);
            self.skReadBtn.setTarget(function () {
                data.handle.readClick(self);
            }, self);
        };
        MailItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            self.skIcon.source = !!data.read ? "mail@overRead" : "mail@unRead";
            //格式化成当前时间
            var date = new Date(data.time * 1000);
            self.skTime.text = date.toLocaleString();
            self.skInfo.text = data.info;
        };
        return MailItem;
    }(cui.DataItem));
    game.MailItem = MailItem;
    __reflect(MailItem.prototype, "game.MailItem");
    var MailDetail = (function (_super) {
        __extends(MailDetail, _super);
        function MailDetail(info) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "mailDetailSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.skOverImg.visible = self.skAccessory.visible = false;
            self._info = info;
            return _this;
        }
        MailDetail.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(self.close, self);
            var langMgr = TRain.langMgr;
            self.skTitle.text = langMgr.getTxt("mainLang" /* mainLang */, 270 /* MailTitle */) + langMgr.getTxt("mainLang" /* mainLang */, 157 /* Mail_Title */);
            self.skSender.text = langMgr.getTxt("mainLang" /* mainLang */, 271 /* MailSendName */) + langMgr.getTxt("mainLang" /* mainLang */, 158 /* Mail_From */);
            self.skContent.text = self._info.info;
        };
        return MailDetail;
    }(game.UIPopup));
    game.MailDetail = MailDetail;
    __reflect(MailDetail.prototype, "game.MailDetail");
})(game || (game = {}));
var game;
(function (game) {
    var NoticeView = (function (_super) {
        __extends(NoticeView, _super);
        function NoticeView(state) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "noticeSkin";
            self._state = state;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        NoticeView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(self.close, self);
            self.skHall.setState(self._state);
        };
        return NoticeView;
    }(game.UIPopup));
    game.NoticeView = NoticeView;
    __reflect(NoticeView.prototype, "game.NoticeView");
})(game || (game = {}));
var game;
(function (game) {
    var NotifyUI = (function (_super) {
        __extends(NotifyUI, _super);
        // private _sysTm:number;
        function NotifyUI() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.touchEnabled = false;
            self._showing = false;
            self.skinName = "NotifySkin";
            return _this;
        }
        NotifyUI.prototype.onPartAdded = function () {
            _super.prototype.onPartAdded.call(this);
            var self = this;
            // let notifyMo = dataMgr.notifyMo;
            // notifyMo.addListener( NotifyMo_EVT.got_notify, self.showNext, self );
            var accMo = game.dataMgr.accMo;
            accMo.addListener("new" /* got_notify */, self.showNext, self);
        };
        NotifyUI.prototype.rmvParent = function (p) {
            var self = this;
            if (p == self._parent && self.parent) {
                self._parent = null;
                TRain.core.rmvAllDelayDo(self);
                p.removeChild(self);
            }
        };
        NotifyUI.prototype.setParent = function (p, width) {
            var self = this;
            self._parent = p;
            var group = self.skTxt.parent;
            self._stX = group.width - 45;
            width = width || p.width;
            self.skBg.width = width;
            group.mask = new egret.Rectangle(45, 0, width - 45, group.height);
            if (p) {
                p.addChild(self);
                self.skAni.visible = self.skBg.visible = self._showing;
                self.showNext();
            }
            else {
                var oldParent = self.parent;
                if (oldParent)
                    oldParent.removeChild(self);
            }
        };
        NotifyUI.prototype.update = function (tm) {
            var self = this;
            var skTxt = self.skTxt;
            var x = skTxt.x - 1;
            skTxt.x = x;
            if (x + skTxt.width < 0) {
                var curData = self._data;
                if (!curData)
                    curData = self._sysData;
                curData.tm++;
                if ((curData.data.repCount || 1) <= curData.tm) {
                    self._data = null;
                    TRain.core.rmvAllDelayDo(self);
                    self.showNext();
                    //if(self._sysTm > 0)TRain.core.rmvAllDelayDo(self._sysTm);
                }
                else {
                    //self.resetTxt();
                    self._sysData = curData;
                    self._data = null;
                    self.setShowing(false);
                    TRain.core.addDelayDo(self.showNext, self, (self._sysData.data.interval * 1000));
                }
            }
        };
        NotifyUI.prototype.showNext = function () {
            var self = this;
            if (!self._parent || self._data)
                return;
            var sysData = self._sysData;
            var nodifyData = game.dataMgr.accMo.popNotify();
            if (!nodifyData && sysData) {
                self._data = { data: sysData.data, tm: sysData.tm, txt: sysData.txt };
                self.skTxt.textFlow = self._data.txt;
                self.resetTxt();
                self.setShowing(true);
            }
            else {
                if (nodifyData) {
                    var formatText = void 0;
                    if (nodifyData.notifyType == 200 /* sys */) {
                        var ret = [];
                        var txtNum = { text: (nodifyData.talkerNickName + ":") };
                        var propStr = "color=0xffffff";
                        txtNum.style = this.parseProp(propStr);
                        ret.push(txtNum);
                        var txtContent = { text: nodifyData.content };
                        var propStr1 = "color=0xFFFF0000";
                        txtContent.style = this.parseProp(propStr1);
                        ret.push(txtContent);
                        formatText = ret;
                    }
                    else {
                        formatText = self.formatTxt(nodifyData);
                    }
                    self._data = { data: nodifyData, tm: 0, txt: formatText };
                    self.skTxt.textFlow = formatText;
                    self.resetTxt();
                    self.setShowing(true);
                }
                else {
                    self._data = null;
                    self.setShowing(false);
                }
            }
        };
        NotifyUI.prototype.setShowing = function (b) {
            var self = this;
            if (self._showing == b)
                return;
            var parent = self._parent;
            self._showing = b;
            self.skAni.visible = self.skBg.visible = b;
            if (b) {
                TRain.core.addFrameDo(self.update, self, false, 33);
                parent.addChild(self);
            }
            else {
                TRain.core.rmvFrameDo(self);
                if (parent)
                    parent.removeChild(self);
            }
        };
        NotifyUI.prototype.resetTxt = function () {
            var self = this;
            var skTxt = this.skTxt;
            skTxt.x = self._stX;
        };
        NotifyUI.prototype.formatTxt = function (nodifyData) {
            var name = nodifyData.talkerNickName;
            var txt = nodifyData.content;
            var moneyNum = nodifyData.moneyNum;
            var stIdx = txt.indexOf("{");
            var pos = 0;
            var txtLen = txt.length;
            var ret = [];
            var style;
            var txtName = { text: name + ":" };
            var propStr = "color=0xffffff";
            txtName.style = this.parseProp(propStr);
            ret.push(txtName);
            while (stIdx >= 0) {
                var endIdx = txt.indexOf("}", stIdx);
                if (endIdx < 0)
                    break;
                if (pos < stIdx) {
                    var txtEle = { text: txt.substring(pos, stIdx) };
                    if (style)
                        txtEle.style = style;
                    ret.push(txtEle);
                }
                style = null;
                if (endIdx - stIdx > 3) {
                    var propStr_1 = txt.substring(stIdx + 1, endIdx);
                    style = this.parseProp(propStr_1);
                }
                stIdx = txt.indexOf("{", pos);
                pos = endIdx + 1;
            }
            if (pos < txtLen) {
                var tempTxt = txt.substring(pos, txtLen);
                var maxLen = tempTxt.length;
                if (tempTxt.charAt(maxLen - 1) == "1") {
                    tempTxt = tempTxt.substring(0, maxLen - 1);
                }
                var txtEle = { text: tempTxt };
                if (style)
                    txtEle.style = style;
                ret.push(txtEle);
                var goldLab = TRain.langMgr.getTxt("mainLang" /* mainLang */, 265 /* MoneyType1 */);
                var goldNum = game.DataFormat.convertGoldString3(moneyNum);
                var txtNum = { text: goldNum + goldLab };
                var propStr_2 = "color=0xfffc00";
                txtNum.style = this.parseProp(propStr_2);
                ret.push(txtNum);
                var txtTH = { text: "!" };
                var propStr1 = "color=0xffffff";
                txtTH.style = this.parseProp(propStr1);
                ret.push(txtTH);
            }
            return ret;
        };
        NotifyUI.prototype.parseProp = function (propStr) {
            var ret = null;
            var props = propStr.split(",");
            for (var i = 0, len = props.length; i < len; ++i) {
                var prop = props[i];
                var tmps = prop.split("=");
                if (tmps.length == 2) {
                    ret = ret || {};
                    switch (tmps[0]) {
                        case "color":
                            var colorStr = tmps[1];
                            //0xffffffff
                            if (colorStr.length == 10) {
                                ret.textColor = parseInt("0x" + colorStr.substr(4));
                            }
                            else {
                                ret.textColor = parseInt(colorStr);
                            }
                            break;
                    }
                }
            }
            return ret;
        };
        return NotifyUI;
    }(cui.Component));
    game.NotifyUI = NotifyUI;
    __reflect(NotifyUI.prototype, "game.NotifyUI");
})(game || (game = {}));
var game;
(function (game) {
    var ServiceView = (function (_super) {
        __extends(ServiceView, _super);
        function ServiceView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "CustomerServiceSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        ServiceView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skConsultation.setTarget(function () {
            }, self);
            self.skSuggestion.setTarget(function () {
                game.gameScene.openPopup(new Complaints());
                self.close();
            }, self);
            self.skClose.setTarget(self.close, self);
            self.skList.itemRender = ServiceItem;
            var dataPro = self._itemPro = new cui.ArrayCollection();
            self.skList.dataProvider = dataPro;
            var generalMo = game.dataMgr.generalMo;
            generalMo.askFaq();
            generalMo.addListener("GetFaqResult" /* GetFaqResult */, self.updateList, self);
            generalMo.addListener("GetFaqDetailResult" /* GetFaqDetailResult */, self.updateDetailInfo, self);
        };
        //获取规则的名字和内容
        ServiceView.prototype.updateList = function (list) {
            var self = this;
            var showArr = [];
            for (var i = 0; i < list.length; i++) {
                var faqDef = list[i];
                var showData = {
                    handle: self,
                    tag: faqDef.index,
                    titleLab: faqDef.text,
                    content: "",
                    isNotOpen: true,
                };
                showArr.push(showData);
            }
            self._showArr = showArr;
            self._itemPro.source = showArr;
        };
        ServiceView.prototype.click = function (item) {
            var self = this;
            var data = item.data;
            var tag = data.tag;
            game.dataMgr.generalMo.askFaqDetail(tag);
            for (var i = 0; i < self._showArr.length; i++) {
                var itemData = self._showArr[i];
                if (itemData.tag == tag) {
                    itemData.isNotOpen = !data.isNotOpen;
                }
            }
        };
        ServiceView.prototype.updateDetailInfo = function (data) {
            var self = this;
            for (var i = 0; i < self._showArr.length; i++) {
                var itemData = self._showArr[i];
                if (itemData.tag == data.index) {
                    itemData.content = data.text;
                }
            }
            self._itemPro.source = self._showArr;
        };
        ServiceView.prototype.onDispose = function () {
            game.dataMgr.generalMo.rmvListener("GetFaqResult" /* GetFaqResult */, self);
            game.dataMgr.generalMo.rmvListener("GetFaqDetailResult" /* GetFaqDetailResult */, self);
            _super.prototype.onDispose.call(this);
        };
        return ServiceView;
    }(game.UIPopup));
    game.ServiceView = ServiceView;
    __reflect(ServiceView.prototype, "game.ServiceView");
    var ServiceItem = (function (_super) {
        __extends(ServiceItem, _super);
        function ServiceItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "serviceItemSKin";
            return _this;
        }
        ServiceItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var data = self.data;
            self.skBtn.setTarget(function () {
                data.handle.click(self);
            }, self);
        };
        ServiceItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            self.skBtn.icon = data.isNotOpen ? "kefu@btn_more" : "kefu@btn_down";
            self.skTitleLab.text = data.titleLab;
            var contentLab = self.skGroup.getChildAt(1);
            contentLab.text = data.content;
            self.skGroup.visible = !data.isNotOpen;
            self.height = data.isNotOpen ? self.skImg.height : self.skGroup.height;
        };
        return ServiceItem;
    }(cui.DataItem));
    game.ServiceItem = ServiceItem;
    __reflect(ServiceItem.prototype, "game.ServiceItem");
    var ComplaintsItem = (function (_super) {
        __extends(ComplaintsItem, _super);
        function ComplaintsItem() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "ComplaintItemSkin";
            return _this;
        }
        ComplaintsItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var data = self.data;
        };
        ComplaintsItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var self = this;
            var data = self.data;
            var date = new Date(data.time * 1000);
            self.skTime.text = date.toLocaleString();
            self.skReturn.text = data.info;
            self.skAdvice.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 700 /* CustomerFeedback */);
        };
        return ComplaintsItem;
    }(cui.DataItem));
    game.ComplaintsItem = ComplaintsItem;
    __reflect(ComplaintsItem.prototype, "game.ComplaintsItem");
    var Complaints = (function (_super) {
        __extends(Complaints, _super);
        function Complaints() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "ComplaintsSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        Complaints.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(function () {
                self.close();
            }, self);
            self.skMenuGrp.setTarget(self.menuClick, self);
            self.skMenuGrp.selectTag = 0;
            self.skAdvice.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 639 /* AdviseTip */);
            self.skSubmission.setTarget(function () {
                if (self.skAdvice.text.length == 0) {
                    var tips = TRain.langMgr.getTxt("mainLang" /* mainLang */, 397 /* SendContentNotNull */);
                    game.TipsMgr.showPrompt(tips, 16777215 /* white */);
                }
                else {
                    game.dataMgr.generalMo.sendAdviceReq(self.skAdvice.text);
                    game.dataMgr.generalMo.adviceListReq();
                    var tips = TRain.langMgr.getTxt("mainLang" /* mainLang */, 272 /* SendSuc */);
                    game.TipsMgr.showPrompt(tips, 16777215 /* white */);
                    self.skAdvice.text = "";
                }
            }, self);
            self.skList.itemRender = ComplaintsItem;
            var dataPro = self._itemPro = new cui.ArrayCollection();
            self.skList.dataProvider = dataPro;
            var generalMo = game.dataMgr.generalMo;
            generalMo.addListener("GetadviceListResult" /* GetadviceListResult */, self.updateView, self);
            //let generalMo = dataMgr.generalMo;
        };
        Complaints.prototype.menuClick = function (item) {
            var self = this;
            var tag = item.tag;
            if (tag == 0) {
                //self.skList.visible = false;
                self.skSubmission.visible = true;
                self.skHandImage.visible = true;
                self.skAdvice.visible = true;
                self.skScroller.visible = false;
            }
            else if (tag == 1) {
                game.dataMgr.generalMo.adviceListReq();
                self.skSubmission.visible = false;
                self.skHandImage.visible = false;
                self.skAdvice.visible = false;
                self.skScroller.visible = true;
            }
        };
        Complaints.prototype.updateView = function (list) {
            var self = this;
            var complaintsArr = [];
            for (var i = 0; i < list.length; i++) {
                var suggest = list[i];
                var showData = {
                    time: suggest.time,
                    info: suggest.text,
                };
                complaintsArr.push(showData);
            }
            self._listArr = complaintsArr;
            self._itemPro.source = complaintsArr;
        };
        Complaints.prototype.onDispose = function () {
            game.dataMgr.generalMo.rmvListener("GetadviceListResult" /* GetadviceListResult */, self);
            _super.prototype.onDispose.call(this);
        };
        return Complaints;
    }(game.UIPopup));
    game.Complaints = Complaints;
    __reflect(Complaints.prototype, "game.Complaints");
})(game || (game = {}));
var game;
(function (game) {
    var SettingView = (function (_super) {
        __extends(SettingView, _super);
        function SettingView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "SettingSkin";
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        SettingView.prototype.childrenCreated = function () {
            var self = this;
            self.skClose.setTarget(function () {
                self.close();
            }, self);
            var soundMgr = TRain.soundMgr;
            self.skMusic.setTarget(function () {
                var tempMcState = soundMgr.musicState;
                game.GameUtil.setLocal("MUSIC_STATUS" /* MUSIC_STATUS */, !tempMcState);
                soundMgr.musicState = !tempMcState;
                self.updateMcAndSd();
            }, self);
            self.skSound.setTarget(function () {
                var tempSdState = soundMgr.sfxState;
                game.GameUtil.setLocal("SFX_STATUS" /* SFX_STATUS */, !tempSdState);
                soundMgr.sfxState = !tempSdState;
                self.updateMcAndSd();
            }, self);
            var accModel = game.dataMgr.accMo;
            var accData = accModel.getData();
            self.updateMcAndSd();
            self.updateHead();
            self.skBinding.icon = "hall@" /* hall */ + (accData.isFormal ? "txt_binded" : "txt_phoneBinding");
            self.skBinding.setTarget(function () {
                if (accData.isFormal)
                    return;
                var view = new game.Registered();
                view.setData(true);
                game.gameScene.openPopup(view);
                self.close();
            }, self);
            self.skSwitch.setTarget(function () {
                game.MsgBox.showBoxCB("mainLang" /* mainLang */, 330 /* LoginOutConfirm */, function (tag) {
                    if (tag == 1) {
                        //登出
                        location.reload();
                    }
                }, self);
            }, self);
        };
        SettingView.prototype.updateHead = function () {
            var self = this;
            var accModel = game.dataMgr.accMo;
            var accData = accModel.getData();
            //获取当前头像
            self.skHead.source = game.DataFormat.getHeadIcon(accData.icon_custom);
            self.skHeadFrame.source = "head@old" /* oldFrame */ + accData.viplvl;
            //当前玩家名字
            self.skName.text = accData.nickname;
            //当前玩家id
            self.skId.text = "ID：" + accData.aid;
        };
        SettingView.prototype.updateMcAndSd = function () {
            var self = this;
            var soundMgr = TRain.soundMgr;
            self.skMusic.icon = "hall@" /* hall */ + (soundMgr.musicState ? "open" : "close");
            self.skSound.icon = "hall@" /* hall */ + (soundMgr.sfxState ? "open" : "close");
            if (soundMgr.musicState) {
                TRain.soundMgr.playMusic("BG309" /* BG309 */);
            }
            else {
                soundMgr.stopMusic();
            }
            if (!soundMgr.sfxState)
                soundMgr.stopAllSFX();
        };
        return SettingView;
    }(game.UIPopup));
    game.SettingView = SettingView;
    __reflect(SettingView.prototype, "game.SettingView");
})(game || (game = {}));
var game;
(function (game) {
    var BoxMgr;
    (function (BoxMgr) {
        var _parent; //父窗口
        var _delegate;
        var _boxGp;
        function setParent(parent, layerDelegate) {
            if (_parent && _boxGp) {
                _parent.removeChild(_boxGp);
            }
            _parent = parent;
            _delegate = layerDelegate;
            if (parent && _boxGp) {
                parent.addChild(_boxGp);
            }
        }
        BoxMgr.setParent = setParent;
        function close() {
            if (_parent.parent) {
                _delegate.hideLayer(_parent);
            }
        }
        function show() {
            if (!_parent.parent) {
                _delegate.showLayer(_parent);
            }
        }
        //--------------------------------- prompt -------------------------------------
        function showBox(txt, cb, tar) {
            if (!_parent)
                return;
            if (!_boxGp) {
                _boxGp = new game.BoxUI();
                _parent.addChild(_boxGp);
            }
            _boxGp.setData(txt, function (tag) {
                close();
                if (cb != null)
                    cb.call(tar, tag);
            }, BoxMgr);
            show();
        }
        BoxMgr.showBox = showBox;
    })(BoxMgr = game.BoxMgr || (game.BoxMgr = {}));
})(game || (game = {}));
var game;
(function (game) {
    var BoxUI = (function (_super) {
        __extends(BoxUI, _super);
        function BoxUI() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "MsgboxSkin";
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        BoxUI.prototype.onPartAdded = function () {
            var self = this;
            self.skClose.tag = 0;
            self.skOk.tag = 1;
            var cb = function (ctrl) {
                var cbData = self._data;
                if (cbData.fun) {
                    self._data = null;
                    cbData.fun.call(cbData.tar, ctrl.tag);
                }
            };
            self.skClose.setTarget(cb, self);
            self.skOk.setTarget(cb, self);
            var data = self._data;
            if (data) {
                self.skTxt.textFlow = cui.htmlParser.parse(data.txt);
            }
        };
        BoxUI.prototype.setData = function (txt, cb, tar) {
            var self = this;
            if (self._inited) {
                self.skTxt.textFlow = cui.htmlParser.parse(txt);
                self._data = { fun: cb, tar: tar };
            }
            else {
                self._data = { fun: cb, tar: tar, txt: txt };
            }
        };
        return BoxUI;
    }(game.UIFullFW));
    game.BoxUI = BoxUI;
    __reflect(BoxUI.prototype, "game.BoxUI");
})(game || (game = {}));
var game;
(function (game) {
    // type PromptData = {
    //     tp:PropmtShowType,
    //     txt:string,
    //     tm:number,
    //     cantTouch:boolean;
    // }
    var TipsMgr;
    (function (TipsMgr) {
        var _parent; //父窗口
        var _delegate;
        //let _data:PromptData;
        var _promptGp;
        var _timerId;
        var _cantTouch;
        var _tm;
        var _txt;
        function init() {
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
        }
        TipsMgr.setParent = setParent;
        function close() {
            _timerId = 0;
            if (_delegate) {
                _parent.touchEnabled = false;
                _delegate.hideLayer(_parent);
            }
        }
        function show() {
            if (_parent) {
                _parent.touchEnabled = !!_cantTouch;
                if (!_parent.parent)
                    _delegate.showLayer(_parent);
            }
        }
        //--------------------------------- prompt -------------------------------------
        function clear() {
            if (_timerId) {
                TRain.core.rmvDelayDoByID(_timerId);
            }
            close();
        }
        TipsMgr.clear = clear;
        function clearWait() {
            if (_timerId) {
                TRain.core.rmvFrameDoById(_timerId);
            }
            close();
        }
        TipsMgr.clearWait = clearWait;
        function updateTm() {
            _tm--;
            if (_tm >= 0) {
                var label = _promptGp.skTxt;
                var str = StringUtil.printf(_txt, _tm);
                label.textFlow = cui.htmlParser.parser(str);
                label.textColor = 16777215 /* white */;
            }
            else {
                clearWait();
            }
        }
        /**
         *
         * @param txt 文本
         * @param tm 延迟多久关闭
         * @param cantTouch 是否接受用的触摸事件
         */
        function waitPrompt(txt, tm, cantTouch) {
            _cantTouch = cantTouch;
            _tm = tm;
            _txt = txt;
            var label = _promptGp.skTxt;
            label.textColor = 16777215 /* white */;
            if (!_timerId && !!tm) {
                TRain.core.rmvFrameDo(TipsMgr, updateTm);
                var str = StringUtil.printf(_txt, _tm);
                label.textFlow = cui.htmlParser.parser(str);
                _timerId = TRain.core.addFrameDo(updateTm, TipsMgr, false, 1000);
            }
            else {
                label.text = txt;
            }
            show();
        }
        TipsMgr.waitPrompt = waitPrompt;
        function showPrompt(txt, color, tm, cantTouch, size) {
            _cantTouch = cantTouch;
            tm = tm || 3000 /* showTm */;
            if (!_timerId) {
                _timerId = TRain.core.addDelayDo(close, TipsMgr, tm);
            }
            else {
                TRain.core.adjustDelayTmByID(_timerId, tm);
            }
            color = color || 16777215 /* white */;
            var label = _promptGp.skTxt;
            label.size = size || 40;
            label.text = txt;
            label.textColor = color;
            show();
        }
        TipsMgr.showPrompt = showPrompt;
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
            self.skCancel.setTarget(function () {
                self.close();
            }, self);
            var accMo = game.dataMgr.accMo;
            var count = accMo.getVal("updateNicknameCount");
            var nickname = accMo.getVal("nickname");
            //self.skName.prompt = accData.nickname;
            self.skName.addEventListener(egret.Event.CHANGE, self.OnAccount, self);
            self.skName.addEventListener(egret.Event.FOCUS_IN, self.onFocus1, self);
            self.skFirstLab.visible = count <= 0;
            self.skSecondGp.visible = count > 0;
            self.skGold.text = game.DataFormat.convertYuanString(500 /* modifyNicknameCost */, true);
            self.skName.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 298 /* ChangeNameTip */);
            self.skSure.setTarget(function () {
                var name = self.skName.text;
                if (name.length == 0) {
                    var view = new game.PersonCenter();
                    game.gameScene.openPopup(view);
                    self.close();
                    var tips = TRain.langMgr.getTxt("mainLang" /* mainLang */, 299 /* NameNotNull */);
                    game.TipsMgr.showPrompt(tips, 16777215 /* white */);
                }
                else if (name == nickname) {
                    var tips = TRain.langMgr.getTxt("mainLang" /* mainLang */, 701 /* TwoNameSame */); //新名字与旧名字相同
                    game.TipsMgr.showPrompt(tips, 16777215 /* white */);
                }
                else {
                    var count_1 = accMo.getData().updateNicknameCount;
                    var curGold = accMo.getData().gold;
                    if (count_1 == 0) {
                        game.dataMgr.accMo.changeNickName(name);
                    }
                    else if (curGold < 500 /* modifyNicknameCost */) {
                        var tip = TRain.langMgr.getTxt("mainLang" /* mainLang */, 515 /* GoldIsNotEnough */);
                        game.TipsMgr.showPrompt(tip, 16777215 /* white */);
                    }
                    else {
                        game.dataMgr.accMo.changeNickName(name);
                    }
                }
                self.close();
            }, self);
        };
        ModName.prototype.onFocus1 = function (e) {
            this.skName.text = "";
        };
        ModName.prototype.OnAccount = function (e) {
            var self = this;
            var inputText = e.target.text;
            var str = game.DataFormat.CheckStringLength(inputText);
            var len = str[0];
            var chaLen = str[1] > 6 ? 6 : str[1];
            if (len > 12) {
                var firstIdx = 12 - chaLen;
                inputText = inputText.substring(0, firstIdx);
            }
            self.skName.text = inputText;
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
            self.bgClose = true;
            self.hideBg = false;
            self.skinName = "pCenterSkin";
            self._iconArr = ["nan_s1", "nv_s1", "nan_1", "nan_2", "nan_3", "nan_4", "nan_5",
                "nv_1", "nv_2", "nv_3", "nv_4", "nv_5"];
            self._dataArr = [];
            self._isHaveTag = false;
            return _this;
        }
        PersonCenter.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skBack.setTarget(function () {
                self.close();
            }, self);
            game.dataMgr.accMo.addPropListener("icon_custom", self.updateHead, self);
            var accData = game.dataMgr.accMo.getData();
            // if(accData.nickname.length > 12){
            //     self.skName.text = accData.nickname.substr(0,12) + "...";
            // }else{
            //     self.skName.text = accData.nickname;
            // }
            self.skName.text = game.DataFormat.formatName(accData.nickname, 12, 12);
            self.skId.text = "ID：" + accData.aid;
            self.skAddresss.text = accData.ipinfo;
            self.skIconFrame.source = "head@old" /* oldFrame */ + accData.viplvl;
            var curIcon = self._curIcon = accData.icon_custom;
            self.skIconImg.source = game.DataFormat.getHeadIcon(curIcon);
            self.skMenuBtn.setTarget(self.menuClick, self);
            self.skMenuBtn.selectTag = 1;
            self.skMod.setTarget(function () {
                game.gameScene.openPopup(new game.ModName());
                self.close();
            }, self);
            self.skCopyId.setTarget(function () {
                var tip = TRain.langMgr.getTxt("mainLang" /* mainLang */, 539 /* CopySuccess */);
                game.TipsMgr.showPrompt(tip, 15648323 /* orange */);
                URLUtil.copyText(String(accData.aid));
            }, self);
            var list = self.skList;
            list.itemRender = game.HeadTile;
            list.itemSkinName = "pcItemSkin";
            list.dataProvider = self._dataPro = new cui.ArrayCollection();
            list.addEventListener("item_tap" /* ITEM_TAP */, function (e) {
                var icon = e.data.ud;
                var curMk = e.data.data.mk;
                if (!icon || icon == self._curIcon) {
                    var tips = TRain.langMgr.getTxt("mainLang" /* mainLang */, 544 /* NeedNewHead */);
                    game.TipsMgr.showPrompt(tips);
                    return;
                }
                if (curMk)
                    return;
                game.dataMgr.accMo.changeHead(icon);
            }, self);
            var generalMo = game.dataMgr.generalMo;
            generalMo.addListener("GetVipInfoResult" /* GetVipInfoResult */, self.updataVipInfo, self);
            //    self.skReceive1.setTarget(function(){
            //       let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.ComingSoon);
            //       TipsMgr.showPrompt(tips,game.UIColor.white);
            //    },self);
            //     self.skReceive2.setTarget(function(){
            //        let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.ComingSoon);
            //       TipsMgr.showPrompt(tips,game.UIColor.white);
            //    },self);
            //     self.skAwardBtn.setTarget(function(){
            //        let tips = TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.ComingSoon);
            //       TipsMgr.showPrompt(tips,game.UIColor.white);
            //    },self);
            // self.initIcons();
        };
        // public getMainMutiTxt(index: langConsts.mainLang): string {
        // 	return TRain.langMgr.getTxt(LangGrp.mainLang, index);
        // }
        PersonCenter.prototype.updateHead = function () {
            var self = this;
            var accModel = game.dataMgr.accMo;
            var accData = accModel.getData();
            var icon = self._curIcon = accData.icon_custom;
            //获取当前头像
            self.skIconImg.source = game.DataFormat.getHeadIcon(icon);
            for (var i = 0; i < self._dataArr.length; i++) {
                var data = self._dataArr[i];
                data.sel = data.ud == icon;
            }
            self._dataPro.source = self._dataArr;
        };
        PersonCenter.prototype.initIcons = function () {
            var self = this;
            var iconArr = self._dataArr = [];
            var iconStrs = self._iconArr;
            var icon = game.dataMgr.accMo.getData().icon_custom;
            for (var i = 0, len = iconStrs.length; i < len; i++) {
                var iconStr = iconStrs[i];
                var data = { sel: false, mk: false, lab: "" };
                data.icon = "head@" /* head */ + iconStr;
                data.tag = i;
                if (self.isLock(iconStr)) {
                    data.mk = true;
                    data.lab = TRain.langMgr.getTxt("mainLang" /* mainLang */, 686 /* shareOpenLock */);
                }
                else {
                    if (i == 0 || i == 1) {
                        var time1 = game.dataMgr.accMo.getData().limit_time_photo;
                        var time2 = TimeUtil.getSvrSec();
                        var countTime = (time1 - time2) * 1000;
                        var dataTm = TimeUtil.getHourMinSec(countTime);
                        data.lab = dataTm.hour + ":" + dataTm.min + ":" + dataTm.sec;
                    }
                    if (!self._isHaveTag) {
                        self._tagTm = TRain.core.addFrameDo(self.showIcontTxt, self, false, 1000);
                        self._isHaveTag = true;
                    }
                }
                data.ud = "head_" + iconStr + ".png";
                if (icon == data.ud)
                    data.sel = true;
                iconArr.push(data);
            }
            self._dataPro.source = iconArr;
        };
        PersonCenter.prototype.showIcontTxt = function () {
            var self = this;
            var dataArr = self._dataArr;
            for (var i = 0, len = dataArr.length; i < len; i++) {
                var data = dataArr[i];
                if (i == 0 || i == 1) {
                    var time1 = game.dataMgr.accMo.getData().limit_time_photo;
                    var time2 = TimeUtil.getSvrSec();
                    var countTime = (time1 - time2) * 1000;
                    var dataTm = TimeUtil.getHourMinSec(countTime);
                    data.lab = dataTm.hour + ":" + dataTm.min + ":" + dataTm.sec;
                    if (countTime <= 0) {
                        data.mk = true;
                        data.lab = TRain.langMgr.getTxt("mainLang" /* mainLang */, 686 /* shareOpenLock */);
                        TRain.core.rmvFrameDoById(self._tagTm);
                    }
                }
                self._dataPro.itemUpdated(data);
            }
        };
        PersonCenter.prototype.isLock = function (iconStr) {
            var accModel = game.dataMgr.accMo;
            var accData = accModel.getData();
            var limitTime = accData.limit_time_photo;
            //拿到当前时间戳 和 服务器时间戳去进行比较 
            var tm = TimeUtil.getSvrSec();
            if (iconStr == "nan_s1" || iconStr == "nv_s1") {
                return tm > limitTime;
            }
            else {
                return false;
            }
        };
        PersonCenter.prototype.menuClick = function (item) {
            var self = this;
            var tag = item.tag;
            if (tag == 1) {
                self.skVipGroup.visible = true;
                self.skHeadScr.visible = false;
                game.dataMgr.generalMo.askVipInfo();
            }
            else if (tag == 2) {
                self.skVipGroup.visible = false;
                self.skHeadScr.visible = true;
                self.initIcons();
            }
        };
        PersonCenter.prototype.updataVipInfo = function (vipexp, viplv) {
            var self = this;
            self.skLeftlab.text = viplv.toString();
            self.skRightlab.text = (viplv + 1).toString();
            var vipAllExp = 0;
            var faq = game.dataMgr.generalMo.getVipProfit();
            for (var i in faq) {
                if (faq[i].VipLv == viplv) {
                    vipAllExp = faq[i].VipExp;
                }
            }
            self.skBarLabel.text = Math.floor(vipexp / 100) + "/" + vipAllExp / 100;
            if (vipAllExp / vipexp >= 10 && vipexp != 0) {
                self.skBar.setProgressValue(1 / 10, 1000);
            }
            else {
                self.skBar.setProgressValue(vipexp / vipAllExp, 1000);
            }
        };
        PersonCenter.prototype.onDispose = function () {
            _super.prototype.onDispose.call(this);
            game.dataMgr.generalMo.rmvListener("GetVipInfoResult" /* GetVipInfoResult */, self);
        };
        return PersonCenter;
    }(game.UIPopup));
    game.PersonCenter = PersonCenter;
    __reflect(PersonCenter.prototype, "game.PersonCenter");
})(game || (game = {}));
var game;
(function (game) {
    var ChipComp = (function (_super) {
        __extends(ChipComp, _super);
        function ChipComp() {
            var _this = _super.call(this) || this;
            _this._indexY = [];
            return _this;
        }
        ChipComp.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            for (var i = 1; i <= 5; i++) {
                var chip = self.getChildAt(i - 1);
                self._indexY.push(chip.y);
                if (i == 1)
                    chip.y = chip.y - 10;
            }
        };
        ChipComp.prototype.setFont = function (fontArr) {
            var self = this;
            self._fontArr = fontArr;
            self.updateChip();
        };
        ChipComp.prototype.updateChip = function () {
            var self = this;
            for (var i = 1; i <= 5; i++) {
                var chip = self.getChildAt(i - 1);
                chip.tag = i;
                chip.icon = "chip@" /* Chip */ + i;
                var fontStr = game.DataFormat.convertGoldString4(self._fontArr[i - 1]);
                chip.font = fontStr;
                chip.sel = i == 1;
                chip.setTarget(self.clickChip, self);
            }
        };
        ChipComp.prototype.clickChip = function (tile) {
            var self = this;
            for (var i = 1; i <= 5; i++) {
                var chip = self.getChildAt(i - 1);
                chip.sel = false;
                chip.y = self._indexY[i - 1];
            }
            var ChipTile = tile;
            ChipTile.sel = true;
            ChipTile.y = ChipTile.y - 10;
            // self.dispatchEvent();
        };
        return ChipComp;
    }(cui.Component));
    game.ChipComp = ChipComp;
    __reflect(ChipComp.prototype, "game.ChipComp");
})(game || (game = {}));
var game;
(function (game) {
    var RouteIntroduction = (function (_super) {
        __extends(RouteIntroduction, _super);
        function RouteIntroduction(routeInConfs, skin) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.useOnce = false;
            self.skinName = skin || "RouteIntroSkin";
            self._routeInConfs = routeInConfs;
            self.vCenter = 0;
            self.hCenter = 0;
            self.hideBg = false;
            return _this;
        }
        RouteIntroduction.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(self.close, self);
            var routeConfs = self._routeInConfs;
            self.skLeftBtn.visible = self.skRightBtn.visible = routeConfs.length != 1;
            self.skLeftBtn.setTarget(self.btnClick, self);
            self.skRightBtn.setTarget(self.btnClick, self);
            self._curTg = 0; //默认是第一页
            var len = routeConfs.length;
            self._maxTg = len - 1;
            var imgGrp = self.skImgGrp;
            for (var i = 0; i < len; i++) {
                var img = new cui.MenuItemImage();
                img.skinName = "menuItemSkin";
                img.tag = i;
                img.x = i * 29;
                imgGrp.addChild(img);
            }
            imgGrp.width = 19 * len + 10 * (len - 1);
            imgGrp.hCenter = 0 - 19;
            imgGrp.setTarget(self.clickMenu, self);
            imgGrp.selectTag = self._curTg;
            self.updateView();
        };
        RouteIntroduction.prototype.rmvInGrp = function () {
            var innerGrp = this.skInGrp;
            for (var i = 0; i < innerGrp.numChildren; i++) {
                innerGrp.getChildAt(i).dispose();
            }
            innerGrp.removeChildren();
        };
        RouteIntroduction.prototype.btnClick = function (item) {
            var self = this;
            var tag = item.tag;
            var curTg = self._curTg;
            if (tag == 0) {
                if (curTg != 0) {
                    self._curTg--;
                    self.rmvInGrp();
                }
            }
            else {
                if (curTg != self._maxTg) {
                    self._curTg++;
                    self.rmvInGrp();
                }
            }
            self.skImgGrp.selectTag = self._curTg;
        };
        RouteIntroduction.prototype.clickMenu = function (item) {
            var self = this;
            self.rmvInGrp();
            self._curTg = item.tag;
            self.updateView();
        };
        RouteIntroduction.prototype.updateView = function () {
            var self = this;
            var curTg = self._curTg;
            var routeInConf = self._routeInConfs[curTg];
            for (var key in routeInConf) {
                var ruleConf = routeInConf[key];
                if (ruleConf.isImg) {
                    var img = new cui.Image();
                    img.source = ruleConf.text;
                    img.x = ruleConf.x;
                    img.y = ruleConf.y;
                    self.skInGrp.addChild(img);
                }
                else {
                    var lab = new cui.Label();
                    lab.textFlow = cui.htmlParser.parser(ruleConf.text);
                    lab.x = ruleConf.x;
                    lab.y = ruleConf.y;
                    lab.lineSpacing = 5;
                    lab.textColor = ruleConf.color || 0xe0d5bd;
                    lab.size = ruleConf.size || 24;
                    self.skInGrp.addChild(lab);
                }
            }
        };
        return RouteIntroduction;
    }(game.UIPopup));
    game.RouteIntroduction = RouteIntroduction;
    __reflect(RouteIntroduction.prototype, "game.RouteIntroduction");
})(game || (game = {}));
var game;
(function (game) {
    var Room1 = (function (_super) {
        __extends(Room1, _super);
        function Room1(data) {
            var _this = _super.call(this) || this;
            _this.skinName = "newMomentSkin";
            _this._closeDoorData = data || {};
            return _this;
        }
        Room1.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var closeDoorWrapper;
            if (!self._closeDoorWrapper) {
                closeDoorWrapper = self._closeDoorWrapper = TRain.WrapperMgr.getWrapper();
                closeDoorWrapper.ani = new game.CloseDoorAni(self.skImg, self.skScroller, 300, self._closeDoorData, false, true);
            }
            closeDoorWrapper.start();
            self.skList.dataProvider = self._itemPro = new cui.ArrayCollection();
        };
        Room1.prototype.setTitle = function (value, girlDb) {
            var self = this;
            self.skTitle.source = value;
            self.skImg.dbNm = girlDb || "renwu";
        };
        Room1.prototype.setData = function (item, listArr) {
            var self = this;
            self.skList.itemRender = item;
            self._itemPro.source = listArr;
        };
        Room1.prototype.onDispose = function () {
            var self = this;
            if (self._closeDoorWrapper)
                TRain.WrapperMgr.freeWrapper(self._closeDoorWrapper);
            _super.prototype.onDispose.call(this);
        };
        return Room1;
    }(game.UIFullFW));
    game.Room1 = Room1;
    __reflect(Room1.prototype, "game.Room1");
    var Room2 = (function (_super) {
        __extends(Room2, _super);
        function Room2() {
            var _this = _super.call(this) || this;
            _this.skinName = "newMoment1Skin";
            return _this;
        }
        Room2.prototype.setTitle = function (value) {
            this.skTitle.source = value;
        };
        return Room2;
    }(game.UIFullFW));
    game.Room2 = Room2;
    __reflect(Room2.prototype, "game.Room2");
    var Room3 = (function (_super) {
        __extends(Room3, _super);
        function Room3() {
            var _this = _super.call(this) || this;
            _this.skinName = "newMoment2Skin";
            return _this;
        }
        Room3.prototype.setTitle = function (value) {
            this.skTitle.source = value;
        };
        return Room3;
    }(game.UIFullFW));
    game.Room3 = Room3;
    __reflect(Room3.prototype, "game.Room3");
})(game || (game = {}));
// module game{
//     export class RouteList extends cui.Component{
//         public skList:cui.DataGroup;
//         public skImg:cui.Image;
//         public itemSkinName:string;
//         private _imgLen:number;
//         private _itemPro:cui.ArrayCollection;
//         constructor(){
//             super();
//         }
//         public childrenCreated():void{
//             let self = this;
//             let list = self.skList;
//             list.itemRender = RouteStateTile;
//             list.itemSkinName = self.itemSkinName;
//             list.dataProvider = self._itemPro = new cui.ArrayCollection();
//             self._imgLen = self.skList.width / self.skImg.width;
//         }
//         /**
//          * 
//          * @param data {格式化后的数据，item的皮肤名}
//          */
//         public setData(routeList:any[]){
//             let self = this;
//             let showTile = [];
//             for(let i = 0 ;i < routeList.length;i++){
//                 showTile.push(routeList[i]);
//             }
//             self._itemPro.source = showTile;
//             let tmpLen = routeList.length / colTp.six ;
//             if(tmpLen <= self._imgLen){
//                 self.skImg.width = self.skList.width;
//             }else{
//                 self.skImg.width = self.skImg.width * Math.ceil(tmpLen);
//             }
//         }
//     }
// }
var game;
(function (game) {
    var RoutePop = (function (_super) {
        __extends(RoutePop, _super);
        function RoutePop() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.skinName = "routePopSkin";
            return _this;
        }
        RoutePop.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(self.close, self);
        };
        RoutePop.prototype.setImg = function (value) {
            this.skImg.source = value;
        };
        return RoutePop;
    }(game.UIPopup));
    game.RoutePop = RoutePop;
    __reflect(RoutePop.prototype, "game.RoutePop");
})(game || (game = {}));
var game;
(function (game) {
    //
    var UIRouteList = (function (_super) {
        __extends(UIRouteList, _super);
        function UIRouteList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         * @param datas
         * @param itemCls 必须继承RouteItemBase
         * @param haveDbRow 是否有双列
         */
        UIRouteList.prototype.init = function (datas, itemCls, haveDbRow) {
            var self = this;
            self._items = [];
            var item;
            for (var i = 0, len = datas.length; i < len; ++i) {
                item = new itemCls();
                item.init(datas[i].route, haveDbRow);
                var w = item.width + 10;
                var h = item.height + 10;
                var row = Math.floor(i / 2);
                var col = i - row * 2;
                item.x = w * col + 5;
                item.y = h * row;
                self.addChild(item);
                self._items[i] = item;
            }
        };
        UIRouteList.prototype.updateRoom = function (datas) {
            var self = this;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var item = self._items[i];
                item.updateRoom(data);
            }
        };
        return UIRouteList;
    }(cui.Group));
    game.UIRouteList = UIRouteList;
    __reflect(UIRouteList.prototype, "game.UIRouteList");
    var RouteItemBase = (function (_super) {
        __extends(RouteItemBase, _super);
        function RouteItemBase() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RouteItemBase.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            if (self.skWin0) {
                self.skWin0.visible = false;
                self._winStr = self.skWin0.source.split("_")[0];
            }
            if (self.skWin1) {
                self.skWin1.visible = false;
                self._win1Str = self.skWin1.source.split("_")[0];
            }
            if (self.skWin2) {
                self.skWin2.visible = false;
                self._win2Str = self.skWin2.source.split("_")[0];
            }
            if (self.skLose0)
                self.skLose0.visible = false;
            if (self.skLose1)
                self.skLose1.visible = false;
            if (self.skLose2)
                self.skLose2.visible = false;
        };
        RouteItemBase.prototype.init = function (data, haveDbRow) {
            var self = this;
            self._data = data;
            if (self.skZPL)
                self.skZPL.setModel(0 /* zhupanlu */, data);
            if (self.skDL)
                self.skDL.setModel(1 /* dalu */, data);
            if (self.skDYZL)
                self.skDYZL.setModel(2 /* dayanzailu */, data, haveDbRow);
            if (self.skXL)
                self.skXL.setModel(3 /* xiaolu */, data, haveDbRow);
            if (self.skXQL)
                self.skXQL.setModel(4 /* xiaoqianglu */, data, haveDbRow);
        };
        RouteItemBase.prototype.updateRoom = function (data) {
            var self = this;
            var forceCast = self._data.getForecast();
            if (!forceCast) {
                return;
            }
            var resultTp = forceCast;
            var winTp = resultTp[0];
            var loseTp = resultTp[1];
            if (winTp[0] > 0) {
                self.skWin0.visible = true;
                self.skWin0.source = self._winStr + "_" + winTp[0];
            }
            if (winTp[1] > 0) {
                self.skWin1.visible = true;
                self.skWin1.source = self._win1Str + "_" + winTp[1];
            }
            if (winTp[2] > 0) {
                self.skWin2.visible = true;
                self.skWin2.source = self._win2Str + "_" + winTp[2];
            }
            if (loseTp[0] > 0) {
                self.skLose0.visible = true;
                self.skLose0.source = self._winStr + "_" + loseTp[0];
            }
            if (loseTp[1] > 0) {
                self.skLose1.visible = true;
                self.skLose1.source = self._win1Str + "_" + loseTp[1];
            }
            if (loseTp[2] > 0) {
                self.skLose2.visible = true;
                self.skLose2.source = self._win2Str + "_" + loseTp[2];
            }
        };
        return RouteItemBase;
    }(cui.Component));
    game.RouteItemBase = RouteItemBase;
    __reflect(RouteItemBase.prototype, "game.RouteItemBase");
    var RouteCom = (function (_super) {
        __extends(RouteCom, _super);
        function RouteCom() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RouteCom.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var list = self.skList;
            list.itemRender = game.RouteStateTile;
            list.itemSkinName = self.itemSkinName;
            list.dataProvider = self._itemPro = new cui.ArrayCollection();
            if (self.skImg) {
                self._imgLen = self.skList.width / self.skImg.width;
                self._imgW = self.skImg.width;
                self._oldW = self.skList.width;
            }
            if (self._mo) {
                self.updateResult();
            }
        };
        RouteCom.prototype.setModel = function (tp, mo, haveDouble) {
            if (haveDouble === void 0) { haveDouble = true; }
            //注册事件
            var self = this;
            self._tp = tp;
            self._doubleRow = tp == 2 /* dayanzailu */ || tp == 3 /* xiaolu */ || tp == 4 /* xiaoqianglu */;
            self._haveDouble = haveDouble;
            self._mo = mo;
            mo.addListener("d_change" /* DATA_CHANGE */, self.updateResult, self);
            mo.addListener("d_update" /* DATA_UPDATE */, function () {
                self.updateResult(true);
            }, self);
            if (self._inited)
                self.updateResult();
        };
        RouteCom.prototype.updateResult = function (noclear) {
            var self = this;
            var tp = self._tp;
            var routeList = self._mo.getRouteData(tp);
            var itemPro = self._itemPro;
            var len = routeList.length;
            var notInit = itemPro.source.length > 0;
            if (notInit) {
                if (!self._flashTag) {
                    self._flashTag = TRain.core.addFrameDo(self.updateTile, self, false, 300);
                }
                else {
                    self.endFlash();
                }
                var lastIdx = self._mo.getRouteLastIdx(tp);
                self._flashData = { idx: lastIdx, data: routeList[lastIdx], cnt: 0 };
            }
            var tmpRouteList;
            if (self._doubleRow && self._haveDouble) {
                var rowCnt = Math.ceil(len / 6 /* maxRow */);
                if (rowCnt % 2 != 0) {
                    tmpRouteList = routeList.slice(0);
                    tmpRouteList[rowCnt * 6 /* maxRow */] = null;
                    len = tmpRouteList.length;
                }
            }
            // if (!noclear) {
            itemPro.source = tmpRouteList || routeList.slice(0);
            // } 
            // else {
            //     for (let i = itemPro.source.length; i < len; i++) {
            //         itemPro.addItem(routeList[i]);        
            //     }
            // }
            self.skTbScroller.showTableInViewStart(itemPro.source.length - 1, false);
            var addLen = tp == 1 /* dalu */ ? 15 : 10;
            if (self.skImg) {
                var tmpLen = routeList.length / 6 /* six */;
                if (tmpLen <= self._imgLen) {
                    self.skImg.width = self.skList.width + self._imgW * addLen;
                }
                else {
                    var delLen = Math.ceil(tmpLen - (self._oldW / self._imgW));
                    self.skImg.width = self._oldW + self._imgW * (delLen + addLen);
                    self._oldW = self.skImg.width;
                }
            }
        };
        RouteCom.prototype.updateTile = function () {
            var self = this;
            var flashData = self._flashData;
            flashData.cnt++;
            if (flashData.cnt > 10) {
                self.endFlash();
            }
            else {
                var itemPro = self._itemPro;
                var idx = flashData.idx;
                itemPro.source[idx] = itemPro.getItemAt(idx) ? null : flashData.data;
                itemPro.updateItemAt(idx);
            }
        };
        RouteCom.prototype.endFlash = function () {
            var self = this;
            var flashData = self._flashData;
            TRain.core.rmvFrameDoById(self._flashTag);
            self._flashTag = 0;
            var itemPro = self._itemPro;
            var idx = flashData.idx;
            itemPro.source[idx] = flashData.data;
            itemPro.updateItemAt(idx);
        };
        RouteCom.prototype.dispose = function () {
            var self = this;
            if (self._flashTag)
                TRain.core.rmvFrameDoById(self._flashTag);
            if (self._mo)
                self._mo.rmvAllListener(self);
            _super.prototype.dispose.call(this);
        };
        return RouteCom;
    }(cui.Component));
    game.RouteCom = RouteCom;
    __reflect(RouteCom.prototype, "game.RouteCom");
})(game || (game = {}));
var game;
(function (game) {
    var UIRouteList2 = (function (_super) {
        __extends(UIRouteList2, _super);
        function UIRouteList2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         *
         * @param datas
         * @param itemCls 必须继承RouteItemBase2
         */
        UIRouteList2.prototype.init = function (datas, itemCls, haveDbRow) {
            var self = this;
            self._items = [];
            var item;
            for (var i = 0, len = datas.length; i < len; ++i) {
                item = new itemCls();
                item.init(datas[i].route, haveDbRow);
                var w = item.width + 10;
                var h = item.height + 10;
                var row = Math.floor(i / 2);
                var col = i - row * 2;
                item.x = w * col;
                item.y = h * row;
                self.addChild(item);
                self._items[i] = item;
            }
        };
        UIRouteList2.prototype.updateRoom = function (datas) {
            var self = this;
            for (var i = 0; i < datas.length; i++) {
                var data = datas[i];
                var item = self._items[i];
                item.updateRoom(data);
            }
        };
        return UIRouteList2;
    }(cui.Group));
    game.UIRouteList2 = UIRouteList2;
    __reflect(UIRouteList2.prototype, "game.UIRouteList2");
    var RouteItemBase2 = (function (_super) {
        __extends(RouteItemBase2, _super);
        function RouteItemBase2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // private _winStr: string;
        // private _win1Str: string;
        // private _win2Str: string;
        RouteItemBase2.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            // if (self.skWin0) {
            //     self.skWin0.visible = false;
            //     self._winStr = self.skWin0.source.split("_")[0];
            // }
            // if (self.skWin1) {
            //     self.skWin1.visible = false;
            //     self._win1Str = self.skWin1.source.split("_")[0];
            // }
            // if (self.skWin2) {
            //     self.skWin2.visible = false;
            //     self._win2Str = self.skWin2.source.split("_")[0];
            // }
            // if (self.skLose0) self.skLose0.visible = false;
            // if (self.skLose1) self.skLose1.visible = false;
            // if (self.skLose2) self.skLose2.visible = false;
        };
        RouteItemBase2.prototype.init = function (data, haveDbRow) {
            var self = this;
            self._data = data;
            // if (self.skZPL) self.skZPL.setModel(RouteTp.zhupanlu, data);
            // if (self.skDL) self.skDL.setModel(RouteTp.dalu, data);
            // if (self.skDYZL) self.skDYZL.setModel(RouteTp.dayanzailu, data);
            // if (self.skXL) self.skXL.setModel(RouteTp.xiaolu, data);
            // if (self.skXQL) self.skXQL.setModel(RouteTp.xiaoqianglu, data);
            if (self.skDONG)
                self.skDONG.setModel(0 /* zhupanlu */, data, haveDbRow);
            if (self.skNAN)
                self.skNAN.setModel(1 /* dalu */, data, haveDbRow);
            if (self.skXI)
                self.skXI.setModel(2 /* dayanzailu */, data, haveDbRow);
            if (self.skBEI)
                self.skBEI.setModel(3 /* xiaolu */, data, haveDbRow);
        };
        RouteItemBase2.prototype.updateRoom = function (data) {
            var self = this;
            // let resultTp: GameResultTp[][] = self._data.getForecast();
            // let winTp: GameResultTp[] = resultTp[0];
            // let loseTp: GameResultTp[] = resultTp[1];
            // if (winTp[0] > 0) {
            //     self.skWin0.visible = true;
            //     self.skWin0.source = self._winStr + "_" + winTp[0];
            // }
            // if (winTp[1] > 0) {
            //     self.skWin1.visible = true;
            //     self.skWin1.source = self._win1Str + "_" + winTp[1];
            // }
            // if (winTp[2] > 0) {
            //     self.skWin2.visible = true;
            //     self.skWin2.source = self._win2Str + "_" + winTp[2];
            // }
            // if (loseTp[0] > 0) {
            //     self.skLose0.visible = true;
            //     self.skLose0.source = self._winStr + "_" + loseTp[0];
            // }
            // if (loseTp[1] > 0) {
            //     self.skLose1.visible = true;
            //     self.skLose1.source = self._win1Str + "_" + loseTp[1];
            // }
            // if (loseTp[2] > 0) {
            //     self.skLose2.visible = true;
            //     self.skLose2.source = self._win2Str + "_" + loseTp[2];
        };
        return RouteItemBase2;
    }(cui.Component));
    game.RouteItemBase2 = RouteItemBase2;
    __reflect(RouteItemBase2.prototype, "game.RouteItemBase2");
})(game || (game = {}));
var game;
(function (game) {
    var OutGameList = (function (_super) {
        __extends(OutGameList, _super);
        function OutGameList(isPure) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "gameMenuListSkin";
            self._isPure = isPure || false;
            return _this;
        }
        OutGameList.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            var soundMo = game.dataMgr.soundMo;
            self.skDbImg.source = self._isPure ? "menuList@db01" /* Popup01 */ : "menuList@db02" /* Popup02 */;
            self.skPure.visible = self._isPure;
            var state = soundMo.getState();
            self.skmusicPure.icon = state ? "menuList@music" /* music */ : "menuList@notMusic" /* notMusic */;
            self.skmusicPure.setTarget(function () {
                TRain.soundMgr.playSFX("click" /* click */);
                var curState = soundMo.getState();
                soundMo.setState(!curState);
                self.skmusicPure.icon = !curState ? "menuList@music" /* music */ : "menuList@notMusic" /* notMusic */;
            }, self);
        };
        return OutGameList;
    }(cui.Component));
    game.OutGameList = OutGameList;
    __reflect(OutGameList.prototype, "game.OutGameList");
})(game || (game = {}));
var game;
(function (game) {
    var RuleView = (function (_super) {
        __extends(RuleView, _super);
        function RuleView(ruleConfs, skin) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            self.useOnce = false;
            self.skinName = skin || "RuleSkin";
            self._ruleConfs = ruleConfs;
            return _this;
        }
        RuleView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skClose.setTarget(self.close, self);
            //self.updateView(self._ruleConfs[0]);
            if (self.skBtnGrp == null) {
                self.updateView(self._ruleConfs);
            }
            else {
                self.skBtnGrp.setTarget(self.menuClick, self);
                self.skBtnGrp.selectTag = 0;
            }
        };
        RuleView.prototype.rmvInGrp = function () {
            var innerGrp = this.skInGrp;
            for (var i = 0; i < innerGrp.numChildren; i++) {
                innerGrp.getChildAt(i).dispose();
            }
            innerGrp.removeChildren();
        };
        RuleView.prototype.updateView = function (confs) {
            var self = this;
            self.rmvInGrp();
            var maxHeight = 0;
            var addH = 90;
            for (var key in confs) {
                var ruleConf = confs[key];
                if (ruleConf.isImg) {
                    var img = new cui.Image();
                    img.source = ruleConf.text;
                    img.x = ruleConf.x;
                    img.y = ruleConf.y;
                    self.skInGrp.addChild(img);
                    if (maxHeight < img.y) {
                        maxHeight = img.y;
                        if (ruleConf.isLong && img.height > addH)
                            addH = img.height;
                    }
                }
                else {
                    var lab = new cui.Label();
                    var txt = ruleConf.text;
                    lab.textFlow = cui.htmlParser.parser(txt);
                    lab.x = ruleConf.x;
                    lab.y = ruleConf.y;
                    var size = lab.size = ruleConf.size || 30;
                    self.skInGrp.addChild(lab);
                    if (maxHeight < lab.y) {
                        maxHeight = lab.y;
                        //获取\n的个数
                        var len = self.getTxtLen(txt, "\n"); // txt.match(/[\n]/g).length;
                        if (ruleConf.isLong && size * len > addH)
                            addH = size * len;
                    }
                }
            }
            self.skInGrp.width = self.skGrp.width;
            self.skInGrp.height = maxHeight + addH;
            //self.skInGrp.cacheAsBitmap = true;
            self.skGrp.setContentSize(self.skGrp.width, maxHeight + addH);
        };
        //获取\n出现的次数
        RuleView.prototype.getTxtLen = function (str, flagStr) {
            var newStr = str.replace(new RegExp(flagStr, "g"), "");
            var count = (str.length - newStr.length) / flagStr.length;
            return count;
        };
        RuleView.prototype.menuClick = function (item) {
            var self = this;
            var tag = item.tag;
            self.updateView(self._ruleConfs[tag]);
        };
        return RuleView;
    }(game.UIPopup));
    game.RuleView = RuleView;
    __reflect(RuleView.prototype, "game.RuleView");
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
        // public skHead:cui.Group;
        // public skPer:cui.Label;
        function LoadingView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.slowSpeed = 0.0005;
            self.fastSpeed = 0.04;
            self._showPer = 0;
            self._nextPer = 0;
            self._curPer = 0;
            self.skinName = "loadingSkin";
            var loginNm = CONF.res["login" /* login */];
            self.skAniLogin.dbNm = self.skImgLogin.source = loginNm || "nover_login_bg";
            return _this;
        }
        LoadingView.prototype.onPartAdded = function () {
            var self = this;
            self.skBar.labelFunction = self.pbLabelFun.bind(self);
            //self.skBarLab.text = TRain.langMgr.getTxt("loginUI", "tip_" + Math.floor(Math.random()*13)+1);
            //self._stX = self.skHead.x;
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
            //self.skHead.x = self._stX + Math.floor(self.skProBar.width * val);
            self.skBarLab.text = StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 687 /* loadingLab */), Math.floor(val * 100));
            self.skLoadB.x = val * self.skLoadB.parent.width - (self.skLoadB.width * 0.5);
            return "";
        };
        LoadingView.prototype.onDispose = function () {
            var self = this;
            TRain.core.rmvFrameDo(self, self.update);
            _super.prototype.onDispose.call(this);
        };
        /**
         * totalper 为占100 的百分比 tm 预计时间 毫秒
         * */
        LoadingView.prototype.setLoadStep = function (msg, totalper, tm) {
            var self = this;
            var nextPer = self._nextPer;
            if (nextPer >= 100)
                return;
            nextPer += totalper;
            if (nextPer >= 100)
                nextPer = 100;
            self._curPer = self._nextPer;
            self._nextPer = nextPer;
            //console.log( "nextPer=" + nextPer );
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
            return this._showPer >= 100;
            //return true;
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
            }
            else if (showPer < nextPer) {
                newPer += self._speed * tm;
            }
            else if (nextPer < 100) {
                newPer += self.slowSpeed * tm;
            }
            if (newPer >= nextPer && nextPer < 100) {
                newPer = nextPer - 0.1;
            }
            //console.log( "newPer=" + newPer );
            self._showPer = newPer;
            if (Math.floor(newPer) != Math.floor(showPer)) {
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
                //if(!msg) msg = "";
                self.skBar.value = newPer / 100;
            }
        };
        return LoadingView;
    }(game.UIFullFW));
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
        CreateRole.prototype.getNeedRes = function () {
            var ret = _super.prototype.getNeedRes.call(this) || [];
            ret.push({ res: game.ResManager.getConfUrl("randNm"), tp: "json" /* JSON */ });
            return ret;
        };
        CreateRole.prototype.onLoadFin = function () {
            var url = game.ResManager.getConfUrl("randNm");
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
            var self = _this;
            self.skinName = "forgotPwdSkin";
            //self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
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
            self.skPhone.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 405 /* Register_PhoneNum */);
            self.skCode.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 406 /* Register_GetCode */);
            self.skPwd.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 693 /* EnterChar6To20 */);
            self.skPwd.inputType = egret.TextFieldInputType.PASSWORD;
            self.skPwd.displayAsPassword = true;
            self.skAgainPwd.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 693 /* EnterChar6To20 */);
            self.skAgainPwd.inputType = egret.TextFieldInputType.PASSWORD;
            self.skAgainPwd.displayAsPassword = true;
            self.skLCode.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 695 /* VerCode */);
            self.skLPhone.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 694 /* PhoneNum */);
            self.skLPwd.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 696 /* InputPwd */);
            self.skLAgainPwd.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 697 /* ConfirmPwd */);
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
            this.skAgainPwd.text = e.target.text;
        };
        ForgotPwd.prototype.getCode = function () {
            var self = this;
            //首先判断手机号位数是否正确再发送
            var phone = self.skPhone.text;
            if (phone == null || phone == "" || phone.length != 11 || phone.match(/\D/g)) {
                game.MsgBox.showPrompt(103 /* e_rmt_input_correct_num */);
                return;
            }
            else {
                game.dataMgr.accMo.checkCode(phone);
            }
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
            URLUtil.hideLoad();
            return _this;
        }
        LoginAccount.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skLogin.setTarget(self.tapLogin, self);
            self.skRegistered.setTarget(self.registeredView, self);
            self.skVtrLogin.setTarget(self.tapLogin, self);
            self.skPwdLab.inputType = egret.TextFieldInputType.PASSWORD;
            self.skPwdLab.displayAsPassword = self._isLockPwd = true;
            self.skKeFu.setTarget(game.HttpUtil.gotoKeFu, game.HttpUtil);
            self.skLookPwd.setTarget(self.lookPwd, self);
            self.skForgotPwd.setTarget(self.openForgotView, self);
            self.skAccountLab.addEventListener(egret.Event.CHANGE, self.OnAccount, self);
            self.skAccountLab.addEventListener(egret.Event.FOCUS_IN, self.onFocus1, self);
            self.skPwdLab.addEventListener(egret.Event.CHANGE, self.OnPwd, self);
            self.skPwdLab.addEventListener(egret.Event.FOCUS_IN, self.onFocus2, self);
            self.skAccountLab.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 692 /* Enter_AccountNum */);
            self.skPwdLab.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 180 /* Enter_pwd */);
            var accMo = game.dataMgr.accMo;
            accMo.addListener("svr_fin" /* login_svr_fin */, function () {
                game.gameMgr.gotoScene(1 /* LodingScene */);
            }, self, true);
            accMo.addListener("check_fin" /* check_svr_info */, function () {
                if (accMo.haveLoginNotice()) {
                    var view = new game.NoticeView(0 /* login */);
                    view.open(self);
                }
            }, self, true);
            game.dataMgr.accMo.CheckNoticeInfo();
            var loginNm = CONF.res["login" /* login */];
            self.skAniLogin.dbNm = self.skImgLogin.source = loginNm || "nover_login_bg";
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
        // private keFuBtn():void{
        // }
        LoginAccount.prototype.registeredView = function () {
            TRain.soundMgr.playSFX("click" /* click */);
            var self = this;
            var view = new game.Registered();
            view.open(self);
        };
        LoginAccount.prototype.lookPwd = function () {
            var self = this;
            var tmpPwd = self._isLockPwd;
            self.skPwdLab.displayAsPassword = !tmpPwd;
            self.skPwdLab.inputType = !tmpPwd ? egret.TextFieldInputType.PASSWORD : egret.TextFieldInputType.TEXT;
            self.skLookPwd.icon = !self._isLockPwd ? "login@txt_lookPwdD" : "login@txt_lookPwdb";
            self._isLockPwd = !tmpPwd;
        };
        LoginAccount.prototype.openForgotView = function () {
            var self = this;
            var view = new game.ForgotPwd();
            view.open(self);
        };
        LoginAccount.prototype.tapLogin = function (item) {
            TRain.soundMgr.playSFX("click" /* click */);
            var self = this;
            var tag = item.tag;
            var name;
            var pwd;
            var accMo = game.dataMgr.accMo;
            if (tag == 1 /* visitor */) {
                name = null;
                pwd = null;
                if (CONF.isNative && CONF.deviceId.length == 0) {
                    game.MsgBox.showErr(113 /* device_invalid_error */);
                    return;
                }
                accMo.verlogin(name, pwd);
            }
            else {
                name = self.skAccountLab.text;
                pwd = self.skPwdLab.text;
                if (name != null && (name.length != 11 || name.match(/\D/g))) {
                    game.MsgBox.showPrompt(101 /* e_rmt_gold_accountnum_or_pwd_error */);
                    return;
                }
                accMo.login(name, pwd);
            }
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
        };
        LoginAccount.prototype.onDispose = function () {
            var self = this;
            game.dataMgr.accMo.rmvAllListener(self);
            _super.prototype.onDispose.call(this);
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
            game.HttpUtil.busyUI = game.BusyLayer.getInst();
            var layer = new cui.Group();
            layer.hitCheckBound = false;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.tag = 1;
            game.BoxMgr.setParent(layer, self);
            layer = new cui.Group();
            layer.touchEnabled = false;
            layer.perWidth = 100;
            layer.perHeight = 100;
            layer.tag = 1;
            game.TipsMgr.setParent(layer, self);
            if (self._platStartup) {
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
        LoginScene.prototype.dispose = function () {
            var self = this;
            if (!self._inited || self.disposed) {
                return;
            }
            var curView = self._curView;
            if (curView) {
                curView.dispose();
            }
            game.BoxMgr.setParent(null, null);
            game.TipsMgr.setParent(null, null);
            game.BusyLayer.getInst().setParent(null);
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
        LoginScene.prototype.showLayer = function (layer) {
            this.addChild(layer);
        };
        LoginScene.prototype.hideLayer = function (layer) {
            this.removeChild(layer);
        };
        return LoginScene;
    }(game.BaseScene));
    game.LoginScene = LoginScene;
    __reflect(LoginScene.prototype, "game.LoginScene", ["game.LoginDelegate", "game.LayerDelegate"]);
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
            var self = _this;
            self.skinName = "registeredSkin";
            self._isAgreed = true;
            //self.pri = PopupPriority.normal;
            //self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
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
            self.skPhone.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 405 /* Register_PhoneNum */);
            self.skCode.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 406 /* Register_GetCode */);
            self.skPwd.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 693 /* EnterChar6To20 */);
            self.skPwd.inputType = egret.TextFieldInputType.PASSWORD;
            self.skPwd.displayAsPassword = true;
            self.skAgainPwd.prompt = TRain.langMgr.getTxt("mainLang" /* mainLang */, 693 /* EnterChar6To20 */);
            self.skAgainPwd.inputType = egret.TextFieldInputType.PASSWORD;
            self.skAgainPwd.displayAsPassword = true;
            self.skLCode.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 695 /* VerCode */);
            self.skLPhone.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 694 /* PhoneNum */);
            self.skLPwd.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 696 /* InputPwd */);
            self.skLAgainPwd.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 697 /* ConfirmPwd */);
            self.skLAgreeConsent.text = TRain.langMgr.getTxt("mainLang" /* mainLang */, 698 /* AgreeConsent */);
            var accMo = game.dataMgr.accMo;
            accMo.addListener("reg_fin" /* reg_phone_fin */, function () {
                self.close();
                var tip = TRain.langMgr.getTxt("mainLang" /* mainLang */, 23 /* Login_RegisterSuccess */);
                game.TipsMgr.showPrompt(tip);
                accMo.isNew = true;
            }, self);
            accMo.addListener("bin_fin" /* bin_phone_fin */, function () {
                var view = new game.SaveMoneyDialog();
                game.gameScene.openPopup(view);
                self.close();
            }, self);
        };
        Registered.prototype.setData = function (value) {
            this._isBind = value;
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
            this.skAgainPwd.text = e.target.text;
        };
        Registered.prototype.getCode = function () {
            var self = this;
            var phone = self.skPhone.text;
            if (phone == null || phone == "" || phone.length != 11 || phone.match(/\D/g)) {
                game.MsgBox.showPrompt(103 /* e_rmt_input_correct_num */);
                return;
            }
            else {
                game.dataMgr.accMo.checkCode(phone);
            }
        };
        Registered.prototype.enSure = function () {
            var self = this;
            //挨个验证前面四个是否满足条件且同意游戏协议
            var phone = self.skPhone.text;
            var code = self.skCode.text;
            var pwd = self.skPwd.text;
            var againPwd = self.skAgainPwd.text;
            if (phone == null || phone == "" || phone.length != 11 || phone.match(/\D/g)) {
                game.MsgBox.showPrompt(103 /* e_rmt_input_correct_num */);
                return;
            }
            if (code == null || code == "" || code.length != 6 || code.match(/\D/g)) {
                game.MsgBox.showPrompt(104 /* e_rmt_input_correct_code */);
                return;
            }
            if (pwd.length < 6 || againPwd.length < 6) {
                game.MsgBox.showPrompt(109 /* e_rmt_pwd_not_less_6 */); //密码不能少于6个字符。
                return;
            }
            if (pwd != againPwd) {
                game.MsgBox.showPrompt(24 /* e_rmt_pwd_not_same */);
                return;
            }
            if (!self._isAgreed) {
                game.MsgBox.showPrompt(105 /* e_rmt_agree_consent */);
                return;
            }
            var accMo = game.dataMgr.accMo;
            if (self._isBind) {
                var accName = game.GameUtil.getLocal("ACC_NAME" /* ACC_NAME */);
                accMo.bind(phone, pwd, accName, code);
            }
            else {
                accMo.registered(phone, pwd, code);
            }
        };
        return Registered;
    }(game.UIPopup));
    game.Registered = Registered;
    __reflect(Registered.prototype, "game.Registered");
})(game || (game = {}));
var game;
(function (game) {
    var SecondSevenView = (function (_super) {
        __extends(SecondSevenView, _super);
        function SecondSevenView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "SecondSevenSkin";
            return _this;
        }
        SecondSevenView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //初始登陆获取任务列表info
            // dataMgr.generalMo.sendGetQuestlist(false);
            var self = this;
            self.visible = game.dataMgr.gameMo.getData().length > 7 ? true : false;
            var sevenDayDone = game.dataMgr.accMo.getVal("sevenday_done");
            if (!sevenDayDone)
                self.regHandle();
            self.skBtn.setTarget(function () {
                game.GameUtil.playClickSound();
                if (!sevenDayDone) {
                    game.dataMgr.generalMo.sendGetQuestlist();
                }
                else {
                    game.gameScene.openPopup(new game.LimitReward2());
                }
            }, self);
            self.updateInfo();
        };
        SecondSevenView.prototype.updateInfo = function () {
            var self = this;
            self.skGrp.scaleX = self.skGrp.scaleY = 0;
            self.skImgDone.visible = (game.dataMgr.generalMo.isDone && game.dataMgr.gameMo.getData().length > 7) ? true : false;
            //设置七日奖励按钮的图标（不同子游戏图标不一样）
            // let icon = self.skBtn.icon;
            var sevenDayDone = game.dataMgr.accMo.getVal("sevenday_done");
            self.skBtn.icon = !!sevenDayDone ? "hall@txt_task" : "hall@txt_qiriyoujiang";
            var gameid = game.dataMgr.accMo.gameId;
            if (!isNaN(gameid) && gameid != 0) {
                switch (gameid) {
                    case 1 /* jinchanbuyu */:
                        self.skBtn.icon = !!sevenDayDone ? "jcby2@26" : "jcby2@16";
                        break;
                }
            }
        };
        SecondSevenView.prototype.updateTask = function (vo, oldCount) {
            var self = this;
            var id = vo.questid;
            var count = vo.count;
            var receive = vo.received;
            if (isNaN(id) && isNaN(count)) {
                return;
            }
            var list = game.dataMgr.generalMo.getLimitList();
            if (!list || list.length <= 0) {
                return;
            }
            var cfg = game.dataMgr.generalMo.getQuestByID(id);
            self.skLabGame.text = cfg.name;
            var completeCount = cfg.completeCount;
            if (cfg.Style == 2) {
                self.skLabPb.text = game.DataFormat.convertGold(oldCount) + "/" + game.DataFormat.convertGold(completeCount);
            }
            else {
                self.skLabPb.text = oldCount + "/" + completeCount;
            }
            self.skPb.value = oldCount / completeCount;
            if (self.skGrp.scaleX == 0 || self.skGrp.scaleY == 0) {
                self.skGrp.scaleX = self.skGrp.scaleY = 1;
                // UIUtils.move(self.skGrp, { scaleX: 1, scaleY: 1 }, undefined, 800);
            }
            var num = TRain.core.addDelayDo(function () {
                if (cfg.Style == 2) {
                    self.skLabPb.text = game.DataFormat.convertGold(count) + "/" + game.DataFormat.convertGold(completeCount);
                }
                else {
                    self.skLabPb.text = count + "/" + completeCount;
                }
                self.skPb.value = count / completeCount;
                TRain.core.rmvDelayDoByID(num);
            }, self, 1000);
            var num2 = TRain.core.addDelayDo(function () {
                self.skGrp.scaleX = self.skGrp.scaleY = 0;
                TRain.core.rmvDelayDoByID(num2);
            }, self, 3000);
        };
        SecondSevenView.prototype.dealDone = function (isdone) {
            this.skImgDone.visible = (isdone && game.dataMgr.gameMo.getData().length > 7) ? true : false;
        };
        SecondSevenView.prototype.regHandle = function () {
            var self = this;
            game.dataMgr.generalMo.addListener("UpdateTaskList2" /* UpdateTaskList2 */, self.updateTask, self);
            game.dataMgr.generalMo.addListener("IsDone" /* IsDone */, self.dealDone, self);
        };
        SecondSevenView.prototype.dispose = function () {
            var self = this;
            game.dataMgr.generalMo.rmvListener("UpdateTaskList2" /* UpdateTaskList2 */, self);
            game.dataMgr.generalMo.rmvListener("IsDone" /* IsDone */, self);
            _super.prototype.dispose.call(this);
        };
        return SecondSevenView;
    }(cui.Component));
    game.SecondSevenView = SecondSevenView;
    __reflect(SecondSevenView.prototype, "game.SecondSevenView");
})(game || (game = {}));
var game;
(function (game) {
    var colorMatrix = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    var colorFlilter = new egret.ColorMatrixFilter(colorMatrix); //黑白矩阵
    var SevenRewardView = (function (_super) {
        __extends(SevenRewardView, _super);
        function SevenRewardView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "SevenRewardSkin";
            self._taskIndex = 0;
            self._completeCount = 0;
            self._gameTag = TRain.actionMgr.getUnitTag();
            return _this;
        }
        SevenRewardView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.regHandle();
            self.skBtnReturn.setTarget(function () {
                game.GameUtil.playClickSound();
                var gameid = game.dataMgr.accMo.gameId;
                if (isNaN(gameid) || gameid == 0) {
                    game.gameScene.goHome();
                }
                else {
                    game.gameScene.goBack();
                }
                self.close();
            }, self);
            self.skBtnGet.setTarget(function () {
                game.GameUtil.playClickSound();
                var list = game.dataMgr.generalMo.getTaskByDay(game.dataMgr.generalMo.curDay);
                game.dataMgr.generalMo.sendGetQuestReward(list[0].cfg.id);
            }, self);
            // for (let i = 0; i < 7; i++) {
            //     self["skGrp" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            //         if (i + 1 <= dataMgr.generalMo.curDay) {
            //             for (let j = 0; j < 7; j++) {
            //                 self["skImgSelect" + j].visible = false;
            //             }
            //             self["skImgSelect" + i].visible = true;
            //             self.updateTask(i + 1);
            //         }
            //     }, self);
            // }
            self.skLabToday.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt("mainLang" /* mainLang */, 783 /* todayCanGet */), game.DataFormat.convertGold(game.dataMgr.generalMo.getTaskByDay(game.dataMgr.generalMo.curDay)[0].cfg.awardItemCount)));
            self.updateInfo();
            // self.skBtn.visible = true;
            // self.skBtn.setTarget(function () {
            //     self.fallGoldAni();
            // }, self);
        };
        SevenRewardView.prototype.updateInfo = function () {
            var self = this;
            self.skBitAll.text = game.DataFormat.convertYuanString2(game.dataMgr.generalMo.getAllGold());
            self.updateTask(game.dataMgr.generalMo.curDay);
            for (var j = 0; j < 7; j++) {
                if (j + 1 > game.dataMgr.generalMo.curDay) {
                    //未开启的
                    self["skImgBG" + j].source = "sevenReward@pic_qiri_tianshudi_g";
                    self["skImgDay" + j].source = "sevenReward@txt_qiri_day" + (j + 1) + "_g";
                }
                else {
                    self["skImgBG" + j].source = "sevenReward@pic_qiri_tianshudi";
                    self["skImgDay" + j].source = "sevenReward@txt_qiri_day" + (j + 1);
                }
                if (j + 1 == game.dataMgr.generalMo.curDay) {
                    self["skImgSelect" + j].visible = true;
                }
            }
            self.skLabTip.textFlow = cui.htmlParser.parse(StringUtil.printf(TRain.langMgr.getTxt("mainLang", 699 /* SevenDayRest */), game.DataFormat.convertGold(game.dataMgr.generalMo.getRestReward())));
        };
        SevenRewardView.prototype.updateTask = function (day) {
            var self = this;
            var list = game.dataMgr.generalMo.getTaskByDay(day);
            if (!list || list.length == 0) {
                return;
            }
            // self.skBitSing.text = DataFormat.convertYuanString2(list[0].cfg.awardItemCount);
            if (list[0].count >= list[0].cfg.completeCount
                && list[1].count >= list[1].cfg.completeCount
                && list[0].received
                && list[1].received) {
                self.skBitSing.text = game.DataFormat.convertYuanString2(game.dataMgr.generalMo.getRestReward());
            }
            else {
                self.skBitSing.text = game.DataFormat.convertYuanString2(game.dataMgr.generalMo.getRestReward() + list[0].cfg.awardItemCount);
            }
            var isDown = true;
            if (list[0].received) {
                self.showTalk();
                isDown = false;
            }
            var _loop_6 = function (i) {
                var vo = list[i];
                if (!vo.cfg.gameID) {
                    self._taskIndex = i;
                    self._completeCount = vo.cfg.completeCount;
                }
                self["skImgGold" + i].source = vo.cfg.icon1;
                if (vo.received) {
                    //已领取
                    // self["skImgGold" + i].source = "sevenReward@icon_qiri_renwu17";
                    self["skImgDown" + i].visible = true;
                    self["skBtnGoto" + i].visible = false;
                }
                else {
                    // self["skImgGold" + i].source = "sevenReward@icon_qiri_renwu18";
                    if (vo.count >= vo.cfg.completeCount) {
                        //已完成
                        self["skImgDown" + i].visible = true;
                        self["skBtnGoto" + i].visible = false;
                    }
                    else {
                        //未完成
                        self["skImgDown" + i].visible = false;
                        // self["skBtnGoto" + i].visible = true;
                        var goto = self["skBtnGoto" + i];
                        var gameid = game.dataMgr.accMo.gameId;
                        if (isNaN(gameid) || gameid == 0) {
                            goto.visible = true;
                        }
                        else {
                            goto.visible = false;
                        }
                        goto.setTarget(function () {
                            if (vo.cfg.id >= 3015 && vo.cfg.id <= 3028) {
                                //通用任务
                                game.gameScene.goHome();
                                self.close();
                            }
                            else if (!vo.cfg.gameID || vo.cfg.gameID.length == 0) {
                                //微信分享
                                game.dataMgr.generalMo.setTaskByDay(i, day);
                                var index = self._taskIndex;
                                game.dataMgr.generalMo.sendWXshareTask();
                                var count = self._completeCount;
                                var myCount = vo.count;
                                if (vo.cfg.Style == 2) {
                                    count = game.DataFormat.convertGold(count);
                                    myCount = game.DataFormat.convertGold(vo.count);
                                }
                                self["skLabPer" + index].text = myCount + "/" + count;
                                self["skPb" + index].value = myCount / count;
                                if (myCount == count) {
                                    self["skBtnGoto" + index].visible = false;
                                    self["skImgDown" + index].visible = true;
                                }
                                self["skLabPer" + index].textColor = 0x99e815;
                                if (vo.count >= count) {
                                    self.updateTask(game.dataMgr.generalMo.curDay);
                                }
                            }
                            else if (vo.cfg.gameID.length > 1) {
                                //对应多个游戏
                                if (vo.cfg.gameID.indexOf(1 /* jinchanbuyu */) >= 0) {
                                    game.gameScene.goHome();
                                    game.dataMgr.generalMo.showGameClass(3 /* fish */);
                                    self.close();
                                }
                            }
                            else {
                                game.gameScene.startGame(vo.cfg.gameID[0]);
                                self.close();
                            }
                        }, self);
                        isDown = false;
                    }
                }
                self["skLabDesc" + i].textFlow = cui.htmlParser.parse(vo.cfg.desc);
                if (vo.cfg.Style == 2) {
                    self["skLabPer" + i].text = game.DataFormat.convertGold(vo.count) + "/" + game.DataFormat.convertGold(vo.cfg.completeCount);
                    self["skLabPer" + i].textColor = game.DataFormat.convertGold(vo.count) == game.DataFormat.convertGold(vo.cfg.completeCount) ? 0x99e815 : 0xff9000;
                }
                else {
                    self["skLabPer" + i].text = vo.count + "/" + vo.cfg.completeCount;
                    self["skLabPer" + i].textColor = vo.count == vo.cfg.completeCount ? 0x99e815 : 0xff9000;
                }
                self["skPb" + i].value = vo.count / vo.cfg.completeCount;
            };
            for (var i = 0; i < 2; i++) {
                _loop_6(i);
            }
            if (list[0].received) {
                self.skImgHas.visible = true;
                self.skBtnGet.visible = false;
            }
            else {
                self.skImgHas.visible = false;
                self.skBtnGet.visible = true;
                if (day == game.dataMgr.generalMo.curDay && isDown) {
                    self.skBtnGet.enabled = true;
                    self.skBtnGet.filters = undefined;
                }
                else {
                    self.skBtnGet.enabled = false;
                    self.skBtnGet.filters = [colorFlilter];
                }
            }
        };
        //掉金币动画
        SevenRewardView.prototype.fallGoldAni = function () {
            var self = this;
            //金币数量
            var count = 40;
            var duration = 800;
            var _loop_7 = function (i) {
                var db = new game.UIDBAni();
                // let db = new cui.Image("chip@10");
                db.dbNm = "sgjGoldTurn" /* sgjGoldTurn */ + "";
                db.x = Math.floor(self.stage.stageWidth * Math.random());
                db.y = Math.floor(-800 * Math.random());
                var dur = Math.floor(duration * Math.random()) + 800;
                self.addChild(db);
                db.gotoAndPlay("shuiguojijinbizhuan" /* sgjGold */ + "", 0, 5);
                game.UIUtils.move(db, { y: self.stage.stageHeight }, undefined, dur, undefined, function () {
                    if (db && self.$children.indexOf(db) >= 0) {
                        self.removeChild(db);
                        db.dispose();
                    }
                }, self._gameTag);
            };
            for (var i = 0; i < count; i++) {
                _loop_7(i);
            }
        };
        SevenRewardView.prototype.showTalk = function () {
            var self = this;
            game.UIUtils.move(self.skGrp, { scaleX: 1, scaleY: 1 }, undefined, 500, undefined, undefined, self._gameTag);
        };
        SevenRewardView.prototype.regHandle = function () {
            var self = this;
            game.dataMgr.generalMo.addListener("GetQuestReward" /* GetQuestReward */ + "", function () {
                self.fallGoldAni();
                self.updateInfo();
            }, self);
        };
        // public onHide() {
        //     let self = this;
        //     for (let temp of self.$children) {
        //         if (temp instanceof game.UIDBAni) {
        //             if (self.$children.indexOf(temp) >= 0 && temp) {
        //                 // temp.dispose();
        //                 self.removeChild(temp);
        //             }
        //         }
        //     }
        //     super.onHide();
        // }
        SevenRewardView.prototype.onDispose = function () {
            var self = this;
            game.dataMgr.generalMo.rmvListener("GetQuestReward" /* GetQuestReward */ + "", self);
            TRain.actionMgr.rmvActsByTag(self._gameTag);
            for (var _i = 0, _a = self.$children; _i < _a.length; _i++) {
                var temp = _a[_i];
                if (temp instanceof game.UIDBAni) {
                    if (temp && self.$children.indexOf(temp) >= 0) {
                        self.removeChild(temp);
                        temp.dispose();
                    }
                }
            }
            _super.prototype.onDispose.call(this);
        };
        return SevenRewardView;
    }(game.UIFullFW));
    game.SevenRewardView = SevenRewardView;
    __reflect(SevenRewardView.prototype, "game.SevenRewardView");
})(game || (game = {}));
var game;
(function (game) {
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
    var AchieveShareDialog = (function (_super) {
        __extends(AchieveShareDialog, _super);
        function AchieveShareDialog() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "AchieveShareSkin";
            self.hCenter = self.vCenter = 0;
            self.pri = 100 /* layer1 */;
            return _this;
        }
        AchieveShareDialog.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            game.UIUtils.getQRCodePly(function (data) {
                self.skerwei.source = data;
            });
            // self.createImg();
            self.skBtnClose.setTarget(function () {
                TRain.soundMgr.playSFX("click" /* click */ + "");
                self.close();
            }, self);
            //默认分享成功
            self.skBtnP.setTarget(function () {
                TRain.soundMgr.playSFX("click" /* click */ + "");
                game.dataMgr.generalMo.sendshareReward();
                self.close();
            }, self);
            self.skBtnW.setTarget(function () {
                TRain.soundMgr.playSFX("click" /* click */ + "");
                game.dataMgr.generalMo.sendshareReward();
                self.close();
            }, self);
            self.updateInfo();
        };
        AchieveShareDialog.prototype.updateInfo = function () {
            var self = this;
            self.skLabMan.text = TRain.langMgr.getTxt("mainLang", 703 /* mainMan */);
            self.skLabWoman.text = TRain.langMgr.getTxt("mainLang", 704 /* mainWoman */);
            self.skLabTip.text = TRain.langMgr.getTxt("mainLang", 705 /* mainRewardTip */);
        };
        AchieveShareDialog.prototype.openImpl = function (data) {
            if (!data || !data.win_gold) {
                return;
            }
            var self = this;
            switch (data.game_id) {
                case 16 /* doudizhu */:
                    self.skImgGame.source = "txt_fenxiang_doudizhu";
                    break;
                case 1 /* jinchanbuyu */:
                    self.skImgGame.source = "txt_fenxiang_jinchanbuyu";
                    break;
                case 12 /* jinshayinsha */:
                    self.skImgGame.source = "txt_fenxiang_jinshayinsha";
                    break;
                case 17 /* zhajinhua */:
                    self.skImgGame.source = "txt_fenxiang_zhajinhua";
                    break;
                case 5 /* bjl */:
                    self.skImgGame.source = "txt_fenxiang_baijiale";
                    break;
                case 10 /* heihongmeifang */:
                    self.skImgGame.source = "txt_fenxiang_heihongmeifang";
                    break;
                case 32 /* longhudou */:
                    self.skImgGame.source = "txt_fenxiang_longhudou";
                    break;
                case 4 /* brniuniu */:
                    self.skImgGame.source = "txt_fenxiang_bairenniuniu";
                    break;
                case 18 /* robcow */:
                    self.skImgGame.source = "txt_fenxiang_qiangzhuangniuniu";
                    break;
                case 23 /* benchibaoma */:
                    self.skImgGame.source = "txt_fenxiang_benchibaoma";
                    break;
                case 40 /* hhdz */:
                    self.skImgGame.source = "txt_fenxiang_hongheidazhan";
                    break;
                case 31 /* gan28 */:
                    self.skImgGame.source = "txt_fenxiang_erbagang";
                    break;
                case 3 /* hlgz */:
                    self.skImgGame.source = "txt_fenxiang_huanletouzi";
                    break;
                case 30 /* dzpk */:
                    self.skImgGame.source = "txt_fenxiang_dezhoupuke";
                    break;
            }
            //一把翻了     txt_fenxiang_yibafanle
            //一把赢了     txt_fenxiang_yibayingle
            //一炮赚了     txt_fenxiang_yipaozhuanle
            //倍          share@txt_fenxiang_bei
            //元          share@txt_fenxiang_yuan
            if (data.game_id == 1 /* jinchanbuyu */) {
                self.skImgGet.source = "txt_fenxiang_yipaozhuanle";
            }
            else if (data.game_id == 16 /* doudizhu */) {
                self.skImgGet.source = "txt_fenxiang_yibafanle";
                self.skimgKind.source = "share@txt_fenxiang_bei";
            }
            if (data.game_id == 16 /* doudizhu */) {
                self.skBitMoney.text = data.win_gold.toFixed(2) + "";
            }
            else {
                self.skBitMoney.text = game.DataFormat.convertGold(data.win_gold).toFixed(2) + "";
            }
            if (isNaN(data.share_reward) || data.share_reward == 0) {
                self.skBitGold.visible = self.skBitNum.visible = self.skLabTip.visible = false;
            }
            else {
                self.skBitGold.text = game.DataFormat.convertGold(data.share_reward) + "";
                self.skBitGold.visible = self.skBitNum.visible = self.skLabTip.visible = true;
            }
        };
        return AchieveShareDialog;
    }(game.UIPopup));
    game.AchieveShareDialog = AchieveShareDialog;
    __reflect(AchieveShareDialog.prototype, "game.AchieveShareDialog");
})(game || (game = {}));
var game;
(function (game) {
    var DetailShareView = (function (_super) {
        __extends(DetailShareView, _super);
        function DetailShareView() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "DetailShareSkin";
            return _this;
        }
        return DetailShareView;
    }(game.UIFullFW));
    game.DetailShareView = DetailShareView;
    __reflect(DetailShareView.prototype, "game.DetailShareView");
})(game || (game = {}));
var game;
(function (game) {
    var ChipTile = (function (_super) {
        __extends(ChipTile, _super);
        function ChipTile() {
            var _this = _super.call(this) || this;
            var self = _this;
            var image = self.skChip = new cui.Image();
            image.anthorPerX = image.anthorPerY = 0.5;
            self.addChild(image);
            var bitImg = self.skBitImg = new cui.Image();
            bitImg.anthorPerX = 0.5;
            bitImg.anthorPerY = 0.7;
            self.addChild(bitImg);
            return _this;
        }
        /**
         *
         * @param id 筹码下标
         *
         * @param gold 筹码金币
         */
        ChipTile.prototype.setData = function (id, gold, chipTp) {
            var self = this;
            self.skChip.source = (chipTp || "chip@" /* Chip */) + id;
            self.skBitImg.source = "chip@num_" /* chip1 */ + game.DataFormat.convertGoldString4(gold);
        };
        ChipTile.prototype.clear = function () {
            var self = this;
            self.scaleX = self.scaleY = 1;
        };
        return ChipTile;
    }(cui.Group));
    game.ChipTile = ChipTile;
    __reflect(ChipTile.prototype, "game.ChipTile");
})(game || (game = {}));
var game;
(function (game) {
    var OpenFWAni = (function (_super) {
        __extends(OpenFWAni, _super);
        function OpenFWAni(tar) {
            var _this = _super.call(this, tar) || this;
            var self = _this;
            var action = new TRain.ActionPropTween(100);
            action.setProps(OpenFWAni.props);
            self.action = action;
            self._props = { touchEnabled: false, x: 0, y: 0, anchorOffsetX: 0, anchorOffsetY: 0, alpha: 1 };
            return _this;
        }
        OpenFWAni.prototype.beforeAni = function () {
            _super.prototype.beforeAni.call(this);
            var props = this._props;
            var tar = this.tar;
            var hw = Math.floor(tar.width / 2);
            var hh = Math.floor(tar.height / 2);
            tar.anchorOffsetX = hw;
            tar.anchorOffsetY = hh;
            tar.x = props.x + hw;
            tar.y = props.y + hh;
            tar.touchEnabled = false;
        };
        OpenFWAni.props = {
            scaleX: { b: 0.9, r: 0.1 },
            scaleY: { b: 0.9, r: 0.1 },
            alpha: { b: 0.3, r: 0.7 }
        };
        return OpenFWAni;
    }(TRain.AniBase));
    game.OpenFWAni = OpenFWAni;
    __reflect(OpenFWAni.prototype, "game.OpenFWAni");
    var CloseFWAni = (function (_super) {
        __extends(CloseFWAni, _super);
        function CloseFWAni(tar) {
            var _this = _super.call(this, tar) || this;
            var self = _this;
            var action = new TRain.ActionPropTween(100);
            action.setProps(CloseFWAni.props);
            self.action = action;
            self._props = { touchEnabled: false, x: 0, y: 0, anchorOffsetX: 0, anchorOffsetY: 0, alpha: 1 };
            return _this;
        }
        CloseFWAni.prototype.beforeAni = function () {
            _super.prototype.beforeAni.call(this);
            var props = this._props;
            var tar = this.tar;
            var hw = Math.floor(tar.width / 2);
            var hh = Math.floor(tar.height / 2);
            tar.anchorOffsetX = hw;
            tar.anchorOffsetY = hh;
            tar.x = props.x + hw;
            tar.y = props.y + hh;
            tar.touchEnabled = false;
        };
        CloseFWAni.props = {
            scaleX: { b: 1, r: -0.1 },
            scaleY: { b: 1, r: -0.1 },
            alpha: { b: 1, r: -0.7 }
        };
        return CloseFWAni;
    }(TRain.AniBase));
    game.CloseFWAni = CloseFWAni;
    __reflect(CloseFWAni.prototype, "game.CloseFWAni");
    var MoveXFWAni = (function (_super) {
        __extends(MoveXFWAni, _super);
        function MoveXFWAni(tar, pent, isOut, isHorizontal) {
            var _this = _super.call(this, tar) || this;
            var self = _this;
            self._props = { touchEnabled: false, x: 0, y: 0 };
            var w = tar.width * (pent / 100);
            var h = tar.height * (pent / 100);
            var x = tar.x;
            var y = tar.y;
            self._isHori = isHorizontal;
            var action = new TRain.ActionPropTween(200);
            action.setEaseFun(EaseUtil.quadOut);
            var b = 0, r = 0;
            if (isHorizontal) {
                if (isOut) {
                    b = x - w;
                    r = w;
                }
                else {
                    b = x;
                    r = -w;
                }
                action.setProps({ x: { b: b, r: r } });
            }
            else {
                if (isOut) {
                    b = y - h;
                    r = h;
                }
                else {
                    b = y;
                    r = -h;
                }
                action.setProps({ y: { b: b, r: r } });
            }
            self.action = action;
            return _this;
        }
        MoveXFWAni.prototype.endAni = function () {
            var self = this;
            var props = self._props;
            var tar = self.tar;
            tar.touchEnabled = props.touchEnabled;
            if (self._isHori) {
                tar.x = props.x;
            }
            else {
                tar.y = props.y;
            }
        };
        return MoveXFWAni;
    }(TRain.AniBase));
    game.MoveXFWAni = MoveXFWAni;
    __reflect(MoveXFWAni.prototype, "game.MoveXFWAni");
    var CloseDoorAni = (function (_super) {
        __extends(CloseDoorAni, _super);
        function CloseDoorAni(leftTar, rightTar, aniTm, data, LHaveAlpha, RHaveAlpha) {
            var _this = _super.call(this, CloseDoorAni) || this;
            var self = _this;
            self._leftTar = leftTar;
            self._rightTar = rightTar;
            self._leftBeginX = data.leftX || leftTar.width;
            self._rightBeginX = data.rightX || rightTar.parent.width;
            self._leftEndX = data.leftEndX || rightTar.x;
            self._rightEndX = data.rightEndX || rightTar.x;
            self._LEndAlpha = leftTar.alpha;
            self._REndAlpha = rightTar.alpha;
            self._LHaveAlpha = LHaveAlpha;
            self._RHaveAlpha = RHaveAlpha;
            var action = new TRain.ActionTweenCall(aniTm);
            action.setEaseFun(EaseUtil.quadOut);
            action.setCall(self.update, self);
            self.action = action;
            return _this;
        }
        CloseDoorAni.prototype.beforeAni = function () {
            _super.prototype.beforeAni.call(this);
            this.update(0);
        };
        CloseDoorAni.prototype.update = function (v) {
            var self = this;
            self._leftTar.x = -self._leftBeginX + v * self._leftEndX;
            self._rightTar.x = self._rightBeginX - v * (self._rightBeginX - self._rightEndX);
            if (self._LHaveAlpha)
                self._leftTar.alpha = v * self._LEndAlpha;
            if (self._RHaveAlpha)
                self._rightTar.alpha = v * self._REndAlpha;
        };
        return CloseDoorAni;
    }(TRain.AniBase));
    game.CloseDoorAni = CloseDoorAni;
    __reflect(CloseDoorAni.prototype, "game.CloseDoorAni");
    var ScrollAni = (function (_super) {
        __extends(ScrollAni, _super);
        function ScrollAni(tar, aniTm, isHorizontal, isOut) {
            var _this = _super.call(this, tar) || this;
            var self = _this;
            self._props = { touchEnabled: false, scrollRect: null };
            self._isHori = isHorizontal;
            self._isOut = isOut;
            self._mask = new egret.Rectangle(0, 0, tar.width, tar.height);
            var action = new TRain.ActionTweenCall(aniTm);
            action.setEaseFun(EaseUtil.quadOut);
            action.setCall(self.update, self);
            self.action = action;
            return _this;
        }
        ScrollAni.prototype.update = function (v) {
            var self = this;
            var mask = self._mask;
            if (self._isOut)
                v = 1 - v;
            if (self._isHori) {
                mask.x = Math.floor(mask.width * v);
            }
            else {
                mask.y = Math.floor(mask.height * v);
            }
            self.tar.scrollRect = mask;
        };
        ScrollAni.prototype.beforeAni = function () {
            _super.prototype.beforeAni.call(this);
            this.update(0);
        };
        return ScrollAni;
    }(TRain.AniBase));
    game.ScrollAni = ScrollAni;
    __reflect(ScrollAni.prototype, "game.ScrollAni");
    var CircleMaskAni = (function (_super) {
        __extends(CircleMaskAni, _super);
        function CircleMaskAni(tar, aniTm, isOut, beginTm, isBeginMask) {
            var _this = _super.call(this, tar) || this;
            beginTm = beginTm || 0;
            aniTm -= beginTm;
            var self = _this;
            self._isOut = isOut;
            self._beginTm = beginTm;
            self._aniTm = aniTm;
            self._isBeginMask = isBeginMask;
            self.centerX = Math.floor(tar.width / 2 + 0.5);
            self.centerY = Math.floor(tar.height / 2 + 0.5);
            self.mask = new egret.Shape();
            var action = new TRain.ActionTweenCall(aniTm);
            action.once = false;
            action.setCall(self.update, self);
            self.action = action;
            return _this;
        }
        CircleMaskAni.prototype.resetBeginTm = function (beTm) {
            this._beginTm = beTm || 0;
        };
        CircleMaskAni.prototype.update = function (tm) {
            var self = this;
            //从某一个位置开始转
            if (self._beginTm)
                tm = (self._beginTm + self._aniTm * tm) / self._aniTm;
            self._endAngle = self._isOut ? (-90 + tm * 360) : (270 - tm * 360);
            self.drawFan();
        };
        CircleMaskAni.prototype.beforeAni = function () {
            var self = this;
            var tar = self.tar;
            var mask = self.mask;
            self._radius = Math.ceil(Math.sqrt(self.centerX * self.centerX + self.centerY * self.centerY));
            mask.x = tar.x;
            mask.y = tar.y;
            tar.parent.addChild(mask);
            tar.mask = mask;
            self.update(0);
        };
        CircleMaskAni.prototype.endAni = function () {
            var self = this;
            var tar = self.tar;
            tar.parent.removeChild(self.mask);
            tar.mask = null;
        };
        CircleMaskAni.prototype.drawFan = function () {
            var self = this;
            var shape = self.mask;
            var g = shape.graphics;
            g.clear();
            var startAngle = -90;
            var endAngle = self._endAngle;
            if (startAngle == endAngle)
                return;
            if (self._isBeginMask) {
                startAngle = endAngle;
                endAngle = -90;
            }
            var centerX = self.centerX;
            var centerY = self.centerY;
            var radius = self._radius;
            g.beginFill(0xff0000);
            g.moveTo(centerX, centerY);
            var radians = startAngle / 180 * Math.PI;
            var tx = radius * (1 + Math.cos(radians));
            var ty = radius * (1 + Math.sin(radians));
            g.lineTo(tx, ty);
            g.drawArc(centerX, centerY, radius, radians, endAngle / 180 * Math.PI);
            g.lineTo(centerX, centerY);
            g.endFill();
        };
        return CircleMaskAni;
    }(TRain.AniBase));
    game.CircleMaskAni = CircleMaskAni;
    __reflect(CircleMaskAni.prototype, "game.CircleMaskAni");
    var QuakeAni = (function (_super) {
        __extends(QuakeAni, _super);
        function QuakeAni(tar, aniTm, xRange, yRange) {
            var _this = _super.call(this, tar) || this;
            var self = _this;
            self._props = { x: 0, y: 0 };
            aniTm = aniTm || 400;
            xRange = xRange || 2;
            yRange = yRange || 8;
            var action1 = new TRain.ActionPropTween(aniTm, 1, { x: { b: tar.x, r: xRange } });
            action1.setEaseFun(EaseUtil.waveRandFun);
            var action2 = new TRain.ActionPropTween(aniTm, 1, { y: { b: tar.y, r: yRange } });
            action2.setEaseFun(game.UIUtils.quakeFun);
            self.action = new TRain.ActionSpawn([action1, action2]);
            return _this;
        }
        return QuakeAni;
    }(TRain.AniBase));
    game.QuakeAni = QuakeAni;
    __reflect(QuakeAni.prototype, "game.QuakeAni");
    var StarParticleAni = (function (_super) {
        __extends(StarParticleAni, _super);
        function StarParticleAni(parent) {
            var _this = _super.call(this) || this;
            _this._bomName = "Bomb";
            var self = _this;
            self.parent = parent;
            var star = new cui.Image();
            star.anthorPerX = star.anthorPerY = 0.5;
            star.source = "common@xing" /* xing */;
            var movConf = {
                einte: 16.7,
                emax: -1,
                oneMin: 1,
                oneMax: 0,
                src: "common@star" /* star */,
                anchor: { x: 27, y: 26 },
                prop: {
                    x: { bb: -5, br: 10 },
                    y: { bb: -5, br: 10 },
                    rot: { br: 360, rr: 180 },
                    ttm: { bb: 500, br: 200 },
                    scale: { bb: 1, rb: -0.5 },
                    alpha: { bb: 1, rb: -0.5 }
                }
            };
            // let bomConf = {
            //     einte: 16.7,
            //     emax: 60,
            //     oneMin: 6,
            //     oneMax: 12,
            //     src: confConsts.ComResTp.star,
            //     anchor: { x: 27, y: 26 },
            //     prop: {
            //         dist: { bb: 100, br: 20 },
            //         angle: { br: 360 },
            //         xEase: { bb: "cubicIn" },
            //         yEase: { bb: "cubicIn" },
            //         rot: { br: 360 },
            //         ttm: { bb: 100, br: 300 },
            //         scale: { bb: 2, br: -1.5, rb: -0.5 },
            //         alpha: { bb: 1, rb: -0.3 }
            //     }
            // };
            var sys = self._movsys = new cui.ParticleSys(movConf);
            sys.particleCls = cui.GlobalParticle;
            // sys = self._bomsys = new cui.ParticleSys(bomConf);
            // sys.particleCls = cui.MovParticle;
            var clip = self._bomClip = new cui.UIMovieClip();
            clip.aniName = self._bomName;
            var gp = self.tar = new cui.Group();
            gp.addChild(self._movsys);
            gp.addChild(star);
            var movTm = self._movTm = 1000;
            var movxAct = new TRain.ActionPropTween(movTm, 1, { x: { b: 0, r: 0 } });
            var movyAct = new TRain.ActionPropTween(movTm, 1, { y: { b: 0, r: 0 } });
            movyAct.setEaseFun(EaseUtil.quadIn);
            var step1FinAct = new TRain.ActionCallDo(movTm);
            step1FinAct.once = false;
            step1FinAct.setCall(function () {
                // let bomsys = self._bomsys;
                // self.tar.addChild(bomsys);
                // bomsys.start(StarParticleConst.bomEmitTm);
                var bomClip = self._bomClip;
                self.tar.addChild(bomClip);
                bomClip.gotoAndPlay(0, 1);
            }, self);
            self._movActs = [movxAct, movyAct, step1FinAct];
            var tmAct = new TRain.Action(1000 /* bomTm */);
            var spawnAct = self._spawnAct = new TRain.ActionSpawn(self._movActs);
            self.action = new TRain.ActionSequence([spawnAct, tmAct]);
            return _this;
        }
        StarParticleAni.prototype.clear = function () {
            var tar = this.tar;
            if (tar.parent)
                tar.parent.removeChild(tar);
            tar.dispose();
            _super.prototype.clear.call(this);
        };
        StarParticleAni.prototype.setData = function (from, to) {
            var self = this;
            var offx = from.x - to.x;
            var offy = from.y - to.y;
            var dist = Math.sqrt(offx * offx + offy * offy);
            var movTm = self._movTm = Math.floor(dist * 1.3);
            var acts = self._movActs;
            var movAct = acts[0];
            movAct.addProp("x", from.x, to.x);
            movAct.duration = movTm;
            movAct = acts[1];
            movAct.addProp("y", from.y, to.y);
            movAct.duration = movTm;
            acts[2].duration = movTm;
            self._spawnAct.duration = movTm;
            self.action.duration = movTm + 1000 /* bomTm */;
        };
        StarParticleAni.prototype.beforeAni = function () {
            var self = this;
            // let bomsys = self._bomsys;
            // if (bomsys.parent) bomsys.parent.removeChild(bomsys);
            var bomClip = self._bomClip;
            if (bomClip.parent)
                bomClip.parent.removeChild(bomClip);
            self.parent.addChild(self.tar);
            self._movsys.start(self._movTm);
        };
        StarParticleAni.prototype.endAni = function () {
            var self = this;
            var tar = self.tar;
            if (tar.parent)
                tar.parent.removeChild(tar);
            self._movsys.stop(true);
            // self._bomsys.stop(true);
            self._bomClip.stop();
            _super.prototype.endAni.call(this);
        };
        return StarParticleAni;
    }(TRain.AniBase));
    game.StarParticleAni = StarParticleAni;
    __reflect(StarParticleAni.prototype, "game.StarParticleAni");
})(game || (game = {}));
///<reference path="./ItemTile.ts" />
var game;
(function (game) {
    var GameTile = (function (_super) {
        __extends(GameTile, _super);
        function GameTile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameTile.prototype.hasProp = function (key) {
            if (key == "state")
                return true;
            return _super.prototype.hasProp.call(this, key);
        };
        GameTile.prototype.dataChanged = function () {
            var self = this;
            if (self._data) {
                //清除上一个动画
                TRain.actionMgr.rmvActsByTar(self);
                self.visible = true;
                _super.prototype.dataChanged.call(this);
            }
        };
        Object.defineProperty(GameTile.prototype, "ani", {
            set: function (val) {
                var ctrl = this.skAni;
                if (ctrl) {
                    ctrl.dbNm = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameTile.prototype, "state", {
            set: function (val) {
                var self = this;
                var isClick = val.isClick;
                if (isClick) {
                    val.isClick = false;
                    self.visible = false;
                    var action = new TRain.ActionPropDo(val.tm * 100, { visible: true, alpha: 0 });
                    var actionProp = new TRain.ActionPropTo(200, 1, { alpha: val.alpha });
                    actionProp.setEaseFun(EaseUtil.quadIn);
                    var actionSeq = new TRain.ActionSequence([action, actionProp]);
                    TRain.actionMgr.addAction(actionSeq, self, false);
                }
            },
            enumerable: true,
            configurable: true
        });
        GameTile.props = ["state"];
        return GameTile;
    }(game.ItemTile));
    game.GameTile = GameTile;
    __reflect(GameTile.prototype, "game.GameTile");
})(game || (game = {}));
///<reference path="./ItemTile.ts" />
var game;
(function (game) {
    var HeadTile = (function (_super) {
        __extends(HeadTile, _super);
        function HeadTile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        HeadTile.prototype.hasProp = function (key) {
            if (key == "mk" || key == "lab")
                return true;
            return _super.prototype.hasProp.call(this, key);
        };
        Object.defineProperty(HeadTile.prototype, "mk", {
            set: function (val) {
                var ctrl = this.skMask;
                if (ctrl) {
                    ctrl.visible = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HeadTile.prototype, "lab", {
            set: function (val) {
                var ctrl = this.skLab;
                if (ctrl) {
                    ctrl.visible = !!val;
                    ctrl.text = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        return HeadTile;
    }(game.ItemTile));
    game.HeadTile = HeadTile;
    __reflect(HeadTile.prototype, "game.HeadTile");
})(game || (game = {}));
var game;
(function (game) {
    // export class RoutesTile extends cui.DataItem{
    //     private _tiles:RouteStateTile;
    //     constructor( tileSkinNm:string ){
    //     }
    //     protected dataChanged( datas:any[] ): void{
    //     }
    // }
    var RouteStateTile = (function (_super) {
        __extends(RouteStateTile, _super);
        function RouteStateTile(skinName) {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = skinName;
            self.visible = false;
            return _this;
        }
        // protected onPartAdded(){
        //     let self = this;
        //     // let ctrl = self.skDot;
        //     // if( ctrl && self.getChildIndex(ctrl)) self.removeChild( ctrl );
        //     // ctrl = self.skDot1;
        //     // if( ctrl && self.getChildIndex(ctrl)) self.removeChild( ctrl );
        // }
        RouteStateTile.prototype.hasProp = function (key) {
            return RouteStateTile.props.indexOf(key) >= 0;
        };
        RouteStateTile.prototype.dataChanged = function () {
            if (this._data) {
                this.visible = true;
                _super.prototype.dataChanged.call(this);
            }
            else {
                this.visible = false;
            }
        };
        Object.defineProperty(RouteStateTile.prototype, "r", {
            set: function (val) {
                var ctrl = this.skBg;
                var curStr = ctrl.source.split("_")[0];
                if (ctrl) {
                    ctrl.source = curStr + "_" + val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouteStateTile.prototype, "pt", {
            set: function (val) {
                var ctrl = this.skNum;
                if (ctrl) {
                    var curStr = ctrl.source.split("_")[0];
                    if (val > 0) {
                        ctrl.visible = true;
                        ctrl.source = curStr + "_" + val;
                        if (!ctrl.parent)
                            this.addChild(ctrl);
                    }
                    else {
                        ctrl.visible = false;
                        if (ctrl.parent)
                            ctrl.parent.removeChild(ctrl);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouteStateTile.prototype, "up", {
            set: function (val) {
                var ctrl = this.skDot;
                if (ctrl) {
                    if (val) {
                        if (!ctrl.parent)
                            this.addChild(ctrl);
                    }
                    else {
                        if (ctrl.parent)
                            ctrl.parent.removeChild(ctrl);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RouteStateTile.prototype, "down", {
            set: function (val) {
                var ctrl = this.skDot1;
                if (ctrl) {
                    if (val) {
                        if (!ctrl.parent)
                            this.addChild(ctrl);
                    }
                    else {
                        if (ctrl.parent)
                            ctrl.parent.removeChild(ctrl);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        RouteStateTile.props = ["r", "pt", "up", "down"];
        return RouteStateTile;
    }(cui.UITile));
    game.RouteStateTile = RouteStateTile;
    __reflect(RouteStateTile.prototype, "game.RouteStateTile");
})(game || (game = {}));
var game;
(function (game) {
    var HttpUtil;
    (function (HttpUtil) {
        HttpUtil.svrURL = "";
        function accLogin(args, showBusy, cb, target) {
            console.log("CONF.isNative:" + CONF.isNative);
            CONF.isNative = true;
            if (CONF.isNative) {
                var postData = args.nm + ':' + args.channel + ':' + args.agentId + ':' + args.hardwareId;
                reqURL("/Web/WebLogin.aspx", makeSign(postData), showBusy, cb, target);
            }
            else {
                var postData = args.nm + ':' + args.channel + ':' + args.agentId;
                reqURL("/Web/WebLogin2.aspx", makeSign(postData), showBusy, cb, target);
            }
        }
        HttpUtil.accLogin = accLogin;
        function serverList(args, showBusy, cb, target) {
            var postData = makeSign(args.nm);
            reqURL("/Web/ServerList.aspx", postData, showBusy, cb, target);
        }
        HttpUtil.serverList = serverList;
        function checkCode(args, showBusy, cb, target) {
            var postData = args.phone + ':' + args.agentId;
            reqURL("/Web/WebCode.aspx", makeSign(postData), showBusy, cb, target);
        }
        HttpUtil.checkCode = checkCode;
        function regAcc(args, showBusy, cb, target) {
            var signedPsw = md5(args.pwd + "NANA1314");
            var data = args.phone + ':' + args.checkcode + ':' + signedPsw + ':' + args.channel + ':' + args.agentId + ':' + args.hardwareId;
            ;
            reqURL("/Web/WebRegAccount.aspx", makeSign(data), showBusy, cb, target);
        }
        HttpUtil.regAcc = regAcc;
        function loginAcc(args, showBusy, cb, target) {
            var signedPsw = md5(args.pwd + "NANA1314");
            var data = args.phone + ':' + signedPsw + ':' + args.channel + ':' + args.agentId + ':' + args.hardwareId;
            ;
            reqURL("/Web/WebPhoneLogin.aspx", makeSign(data), showBusy, cb, target);
        }
        HttpUtil.loginAcc = loginAcc;
        function bindAcc(args, showBusy, cb, target) {
            var signedPsw = md5(args.pwd + "NANA1314");
            var data = args.nm + ':' + args.phone + ':' + args.checkcode + ':' + signedPsw + ':' + args.agentId + ':' + args.hardwareId;
            ;
            reqURL("/Web/WebBindAccount.aspx", makeSign(data), showBusy, cb, target);
        }
        HttpUtil.bindAcc = bindAcc;
        function CheckNotice(args, showBusy, cb, target) {
            var data = "agentId=" + args.agentId;
            reqURL("/Server/CheckNotice.aspx", data, showBusy, cb, target);
        }
        HttpUtil.CheckNotice = CheckNotice;
        function getIp(showBusy, cb, target) {
            reqURL("/Common/GetP.aspx", "", showBusy, cb, target);
        }
        HttpUtil.getIp = getIp;
        function gotoKeFu() {
            var uid = "";
            var uname = "游客";
            var token = "";
            //let avatar = StringUtil.printf(tempUrl, "static/img/female.a384e7e.jpg");
            var avatar = CONF.kefuUrl + "static/img/female.a384e7e.jpg";
            var agentId = 165;
            var data = game.dataMgr.accMo.getData();
            if (data != null) {
                uid = data.aid.toString();
                uname = data.nickname;
                token = data.cs_token;
            }
            //let tempSign = StringUtil.printf(uid, agentId, deviceID, encodeURI(uname), encodeURI(avatar), "3C3831AD16D3A32AD8E26CEB505DB57D");
            var urlCode1 = encodeURI(uname);
            var urlCode2 = encodeURI(avatar);
            var tempSign = uid + agentId + CONF.deviceId + urlCode1 + urlCode2 + "3C3831AD16D3A32AD8E26CEB505DB57D";
            var sign = md5(tempSign);
            var url = CONF.kefuUrl +
                "?uid=" + uid +
                "&uname=" + urlCode1 +
                "&agentid=" + agentId +
                "&avatar=" + urlCode2 +
                "&sign=" + sign +
                "&mac=" + CONF.deviceId +
                "&token=" + token;
            URLUtil.openURL(url);
        }
        HttpUtil.gotoKeFu = gotoKeFu;
        function askCreateImg(args, showBusy, cb, target) {
            var data = Base64.base64Encode(args.link);
            var postData = makeSign(data);
            reqURL("/QrCode/WebCreateQr.aspx", postData, showBusy, cb, target);
        }
        HttpUtil.askCreateImg = askCreateImg;
        function makeSign(data) {
            var sign = md5(data + "8DB1C7CE26C2A748FA3627410DB0FB0F");
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
        var _inConning = false;
        var _sockClose = false; //信息失效，需要重新取过token
        var _sock;
        var _tryCnt = 0;
        var _handles = {};
        function connect() {
            _tryCnt = 0;
            doConnect();
        }
        Net.connect = connect;
        function loginFin(succ) {
            if (_inConning) {
                if (Net.busyUI)
                    Net.busyUI.hideBusy();
                _inConning = false;
            }
            _sockClose = !succ;
            if (succ) {
                _tryCnt = 0;
            }
        }
        Net.loginFin = loginFin;
        function createSock() {
            if (_sock) {
                clearSock();
            }
            _sock = new egret.WebSocket();
            _sock.type = egret.WebSocket.TYPE_BINARY;
            _sock.once(egret.Event.CONNECT, onConnect, Net);
            //_sock.addEventListener(egret.IOErrorEvent.IO_ERROR, onErr, Net);
            _sock.once(egret.Event.CLOSE, onClose, Net);
            _sock.connectByUrl((URLUtil.isHttps() ? 'wss://' : 'ws://') + Net.ip);
        }
        function clearSock() {
            _sock.removeEventListener(egret.Event.CONNECT, onConnect, Net);
            //_sock.removeEventListener(egret.IOErrorEvent.IO_ERROR, onErr, Net);
            _sock.removeEventListener(egret.Event.CLOSE, onClose, Net);
            _sock.removeEventListener(egret.ProgressEvent.SOCKET_DATA, onData, Net);
            _sock.close();
            _sock = null;
        }
        function onConnect() {
            if (true)
                console.log("net connected");
            //_inConning = false;
            game.notifiCenter.postEvent("succ" /* CONN_SUCC */);
            _sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, onData, Net);
        }
        // function onErr(){
        //     if(DEBUG) console.log( "net io error tryCnt=" + _tryCnt );
        //     if( _inConning ){
        //         return;
        //     }
        //     TRain.core.addDelayDo( doConnect, Net, 1000+_tryCnt*500 );
        // }
        function onClose() {
            if (_sockClose)
                return;
            Net.isReCon = true;
            game.notifiCenter.postEvent("close" /* CONN_CLOSE */);
            TRain.core.addDelayDo(doConnect, Net, _tryCnt * 1000);
        }
        function doConnect() {
            _tryCnt++;
            if (_tryCnt > 5) {
                if (Net.busyUI && _inConning)
                    Net.busyUI.hideBusy();
                game.notifiCenter.postEvent("fail" /* CONN_FAIL */);
                return;
            }
            if (!_inConning) {
                if (Net.busyUI)
                    Net.busyUI.showBusy();
                _inConning = true;
            }
            _sockClose = false;
            if (true)
                console.log("net connect " + Net.ip);
            createSock();
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
            decodeMsg(msg.id, msg.len, buf);
        }
        function decodeMsg(msgId, len, buf) {
            if (true)
                console.log("receive id=" + msgId);
            var handle = _handles[msgId];
            if (handle) {
                var data = game.Protobuf.decode(msgId, buf.position + len, buf);
                handle.fun.call(handle.tar, data);
            }
            else if (true) {
                egret.log("msg not handle id=" + msgId);
            }
            if (Net.busyUI) {
                if (_waitMsg[msgId]) {
                    _waitMsg[msgId] = 0;
                    Net.busyUI.hideBusy();
                }
            }
        }
        Net.decodeMsg = decodeMsg;
        //----------------------------------------------------
        function _sendMsg(msgId, args) {
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
        function sendMsg(msgId, args) {
            if (!_sock.connected)
                return;
            _sendMsg(msgId, args);
        }
        Net.sendMsg = sendMsg;
        /**
         * 过滤掉 所有在间隔时间内发送的相同消息（即id一样）
         * intervalMaxTm 最长间隔时间
         * */
        var _sameMsgs = {};
        function sendMsgFilter(msgId, args, intervalMaxTm) {
            if (!_sock.connected)
                return;
            var curTm = egret.getTimer();
            var oldTm = _sameMsgs[msgId];
            if (oldTm) {
                if (curTm < oldTm) {
                    return;
                }
            }
            _sameMsgs[msgId] = curTm + intervalMaxTm;
            _sendMsg(msgId, args);
        }
        Net.sendMsgFilter = sendMsgFilter;
        /**
         * 发送消息后进入等待，直到结果消息返回
         * resultMsgId 结果消息
         * */
        var _waitMsg = {};
        function sendMsgWait(msgId, args, resultMsgId) {
            if (!_sock.connected)
                return;
            if (Net.busyUI) {
                _waitMsg[resultMsgId] = 1;
                Net.busyUI.showBusy();
            }
            _sendMsg(msgId, args);
        }
        Net.sendMsgWait = sendMsgWait;
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
            Encoder.add(routeProtos, typeProtos);
        }
        Protobuf.addEncodeProtos = addEncodeProtos;
        function rmvEncodeProtos(routeProtos, typeProtos) {
            Encoder.rmv(routeProtos, typeProtos);
        }
        Protobuf.rmvEncodeProtos = rmvEncodeProtos;
        function addDecodeProtos(routeProtos, typeProtos) {
            Decoder.add(routeProtos, typeProtos);
        }
        Protobuf.addDecodeProtos = addDecodeProtos;
        function rmvDecodeProtos(routeProtos, typeProtos) {
            Decoder.rmv(routeProtos, typeProtos);
        }
        Protobuf.rmvDecodeProtos = rmvDecodeProtos;
        function encode(msgId, data, buff) {
            return Encoder.encode(msgId, data, buff);
        }
        Protobuf.encode = encode;
        function decode(msgId, len, data) {
            return Decoder.decode(msgId, len, data);
        }
        Protobuf.decode = decode;
        function getProto(protoList, id) {
            for (var i = protoList.length - 1; i >= 0; i--) {
                var tyProtos = protoList[i][id];
                if (tyProtos)
                    return tyProtos;
            }
            return null;
        }
        //--------------------------------------------------------
        var Encoder;
        (function (Encoder) {
            var _routeProtos = [];
            var _tpProtos = [];
            var _tmpProtos = {};
            function add(routeProtos, typeProtos) {
                _routeProtos.push(routeProtos);
                if (typeProtos) {
                    if (true && _tpProtos.length > 0) {
                        for (var key in typeProtos) {
                            if (parseInt(key) < 30) {
                                egret.error("协议错误：请检查协议批处理(.bat)文件中的 游戏ID 是否设置");
                            }
                            break;
                        }
                    }
                    _tpProtos.push(typeProtos);
                }
            }
            Encoder.add = add;
            function rmv(routeProtos, typeProtos) {
                var idx = _routeProtos.indexOf(routeProtos);
                if (idx >= 0)
                    _routeProtos.splice(idx, 1);
                if (typeProtos) {
                    idx = _tpProtos.indexOf(typeProtos);
                    if (idx >= 0) {
                        _tpProtos.splice(idx, 1);
                        _tmpProtos = {};
                    }
                }
            }
            Encoder.rmv = rmv;
            function encode(route, msg, buff) {
                // Get protos from protos map use the route as key
                var protos = getProto(_routeProtos, route);
                if (!protos) {
                    console.error("error: route=" + route + "  protos not exist");
                    return;
                }
                encodeMsg(buff, protos, msg);
                return buff;
            }
            Encoder.encode = encode;
            function encodeMsg(buff, protos, msg) {
                for (var name_2 in msg) {
                    var proto = protos[name_2];
                    if (proto) {
                        var protoTp = proto[1 /* type */];
                        var tag = makeTag(protoTp, proto[0 /* tag */]);
                        var val = msg[name_2];
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
                    case 3 /* int64 */:
                        Coder.writeInt64(buff, value);
                        break;
                    case 5 /* string */:
                        var byteLen = utf8.length(value);
                        Coder.writeUInt32(buff, byteLen);
                        utf8.write(value, buff);
                        break;
                    default:
                        var tmpProtos = getTpProto(protoTp);
                        var subBuff = new egret.ByteArray();
                        encodeMsg(subBuff, tmpProtos, value);
                        Coder.writeUInt32(buff, subBuff.length);
                        buff.writeBytes(subBuff);
                        break;
                }
            }
            function getTpProto(protoTp) {
                var tmpProtos = _tmpProtos[protoTp];
                if (!tmpProtos) {
                    var tpProtos = getProto(_tpProtos, protoTp);
                    tmpProtos = {};
                    for (var key in tpProtos) {
                        var protoInfo = tpProtos[key].slice(0);
                        var protoKey = protoInfo[0];
                        protoInfo[0] = parseInt(key);
                        tmpProtos[protoKey] = protoInfo;
                    }
                    _tmpProtos[protoTp] = tmpProtos;
                }
                return tmpProtos;
            }
            function encodeArray(buff, protoTp, valArr, tag) {
                var i = 0, arrLen = valArr.length;
                //if( protoTp<ProtoType.msgstart ){
                // Coder.writeUInt32(buff, tag);
                // Coder.writeUInt32(buff, arrLen );
                switch (protoTp) {
                    case 0 /* uint32 */:
                        for (; i < arrLen; ++i) {
                            Coder.writeUInt32(buff, tag);
                            Coder.writeUInt32(buff, valArr[i]);
                        }
                        break;
                    case 1 /* int32 */:
                        for (; i < arrLen; ++i) {
                            Coder.writeUInt32(buff, tag);
                            Coder.writeInt32(buff, valArr[i]);
                        }
                        break;
                    case 2 /* bool */:
                        for (; i < arrLen; ++i) {
                            Coder.writeUInt32(buff, tag);
                            Coder.writeBool(buff, valArr[i]);
                        }
                        break;
                    case 3 /* int64 */:
                        for (; i < arrLen; ++i) {
                            Coder.writeUInt32(buff, tag);
                            Coder.writeInt64(buff, valArr[i]);
                        }
                        break;
                    case 5 /* string */:
                        for (; i < arrLen; ++i) {
                            Coder.writeUInt32(buff, tag);
                            var str = valArr[i];
                            var byteLen = utf8.length(str);
                            Coder.writeUInt32(buff, byteLen);
                            utf8.write(str, buff);
                        }
                        break;
                    default:
                        var tmpProtos = getTpProto(protoTp);
                        for (; i < arrLen; ++i) {
                            Coder.writeUInt32(buff, tag);
                            var subBuff = new egret.ByteArray();
                            encodeMsg(subBuff, tmpProtos, valArr[i]);
                            Coder.writeUInt32(buff, subBuff.length);
                            buff.writeBytes(subBuff);
                        }
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
                    case 3 /* int64 */:
                        wireTp = 0;
                        break;
                }
                return (tag << 3) | wireTp;
            }
        })(Encoder || (Encoder = {}));
        //----------------------------------------------------------------
        var Decoder;
        (function (Decoder) {
            var _routeProtos = [];
            var _tpProtos = [];
            function add(routeProtos, typeProtos) {
                _routeProtos.push(routeProtos);
                if (typeProtos) {
                    if (true && _tpProtos.length > 0) {
                        for (var key in typeProtos) {
                            if (parseInt(key) < 30) {
                                egret.error("协议错误：请检查协议批处理(.bat)文件中的 游戏ID 是否设置");
                            }
                            break;
                        }
                    }
                    _tpProtos.push(typeProtos);
                }
            }
            Decoder.add = add;
            function rmv(routeProtos, typeProtos) {
                var idx = _routeProtos.indexOf(routeProtos);
                if (idx >= 0)
                    _routeProtos.splice(idx, 1);
                if (typeProtos) {
                    idx = _tpProtos.indexOf(typeProtos);
                    if (idx >= 0)
                        _tpProtos.splice(idx, 1);
                }
            }
            Decoder.rmv = rmv;
            function decode(route, len, buff) {
                var protos = getProto(_routeProtos, route);
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
                        decodeArr(buff, protoTp, /*head&7*/ 0, arr);
                    }
                    else {
                        msg[protoKey] = decodeProp(buff, protoTp);
                    }
                }
                if (buff.position > len) {
                    buff.position = len;
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
                    case 3:
                        do {
                            if ((wireType = Coder.readUInt32(buff) & 7) === 4)
                                break;
                            skipType(buff, validLen, wireType);
                        } while (true);
                        len = -1;
                        break;
                    case 5:
                        len = 4;
                        break;
                    default:
                        throw Error("invalid wire type " + wireType + " at offset " + buff.position);
                }
                if (len > 0) {
                    var tmpPos = buff.position + len;
                    if (tmpPos > validLen)
                        tmpPos = validLen;
                    buff.position = tmpPos;
                }
                else if (len == 0) {
                    while (buff.position < validLen) {
                        if (buff.readUnsignedByte() < 128)
                            break;
                    }
                }
            }
            ;
            function decodeProp(buff, tp) {
                var strLen;
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
                        strLen = Coder.readUInt32(buff);
                        return utf8.read(buff, strLen);
                    case 6 /* bytes */:
                        strLen = Coder.readUInt32(buff);
                        var subBuff = new egret.ByteArray();
                        subBuff.endian = egret.Endian.LITTLE_ENDIAN;
                        buff.readBytes(subBuff, 0, strLen);
                        return subBuff;
                    default:
                        var tyProtos = getProto(_tpProtos, tp);
                        var msgLen = Coder.readUInt32(buff);
                        return decodeMsg(buff, buff.position + msgLen, tyProtos);
                }
            }
            function decodeArr(buff, tp, wireTp, ret) {
                var i = 0, tmpVal;
                if (tp < 10 /* msgstart */) {
                    //if( wireTp!=2 ){
                    ret.push(decodeProp(buff, tp));
                    // }
                    // else{
                    //     let arrLen = Coder.readUInt32( buff );
                    //     switch ( tp ) {
                    //         case ProtoType.uint32:
                    //         case ProtoType.int32:
                    //             for( ;i<arrLen;++i){
                    //                 tmpVal = Coder.readUInt32( buff );
                    //                 ret.push( tmpVal );
                    //             }
                    //             break;
                    //         case ProtoType.int64:
                    //             break;
                    //         case ProtoType.bool:
                    //             for( ;i<arrLen;++i){
                    //                 tmpVal = !!buff.readUnsignedByte();
                    //                 ret.push( tmpVal );
                    //             }
                    //             break;
                    //         case ProtoType.string:
                    //             for( ; i<arrLen; ++i ){
                    //                 let strLen = Coder.readUInt32( buff );
                    //                 tmpVal = utf8.read( buff, strLen );
                    //                 ret.push( tmpVal );
                    //             }
                    //             break;
                    //         }
                    // }
                }
                else {
                    var tyProtos = getProto(_tpProtos, tp);
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
            if (val < 0) {
                var longBit = num2LongBits(val);
                writeVarint64(buf, longBit);
            }
            else {
                writeVarint32(buf, val);
            }
        }
        Coder.writeInt32 = writeInt32;
        function writeInt64(buf, val) {
            var longBit = num2LongBits(val);
            writeVarint64(buf, longBit);
        }
        Coder.writeInt64 = writeInt64;
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
        function writeVarint64(buf, longBit) {
            while (longBit.hi) {
                buf.writeByte(longBit.lo & 127 | 128);
                longBit.lo = (longBit.lo >>> 7 | longBit.hi << 25) >>> 0;
                longBit.hi >>>= 7;
            }
            while (longBit.lo > 127) {
                buf.writeByte(longBit.lo & 127 | 128);
                longBit.lo = longBit.lo >>> 7;
            }
            buf.writeByte(longBit.lo);
        }
        function readVarint32(buf) {
            // let n = 0, m=0, bit=0;
            // while( 1 ){
            //     m = buf.readUnsignedByte();
            //     n = n + ((m&127)<<bit);
            //     if (m < 128) break;
            //     bit += 7;
            // }
            var tmp = buf.readUnsignedByte();
            var value = tmp & 127;
            if (tmp < 128)
                return value;
            tmp = buf.readUnsignedByte();
            value = (value | (tmp & 127) << 7) >>> 0;
            if (tmp < 128)
                return value;
            tmp = buf.readUnsignedByte();
            value = (value | (tmp & 127) << 14) >>> 0;
            if (tmp < 128)
                return value;
            tmp = buf.readUnsignedByte();
            value = (value | (tmp & 127) << 21) >>> 0;
            if (tmp < 128)
                return value;
            tmp = buf.readUnsignedByte();
            value = (value | (tmp & 15) << 28) >>> 0;
            if (tmp < 128)
                return value;
            buf.position += 5;
            return value;
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
            if (buf.length - buf.position > 4) {
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
        function num2LongBits(value) {
            if (value === 0)
                return { hi: 0, lo: 0 };
            var sign = value < 0;
            if (sign)
                value = -value;
            var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
            if (sign) {
                hi = ~hi >>> 0;
                lo = ~lo >>> 0;
                if (++lo > 4294967295) {
                    lo = 0;
                    if (++hi > 4294967295)
                        hi = 0;
                }
            }
            return { hi: hi, lo: lo };
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
    NET_CONF.c2sEncode = { "301": { "packet_id": [1, 0, 1] }, "5001": { "packet_id": [1, 0, 1], "account": [2, 5, 1], "token": [3, 5, 1], "sign": [4, 5, 1], "platform": [5, 5, 1], "login_platform": [6, 5, 1], "machine_code": [7, 5, 1], "machine_type": [8, 5, 1], "channelid": [9, 1, 1] }, "5003": { "packet_id": [1, 0, 1], "channelid": [2, 5, 1] }, "5004": { "packet_id": [1, 0, 1], "gameid": [2, 1, 1], "gamever": [3, 1, 1], "roomid": [4, 1, 1] }, "5005": { "packet_id": [1, 0, 1], "command": [2, 5, 1] }, "5006": { "packet_id": [1, 0, 1], "orderid": [2, 5, 1] }, "5007": { "packet_id": [1, 0, 1], "pay_type": [2, 1, 1], "pay_value": [3, 1, 1] }, "5008": { "packet_id": [1, 0, 1] }, "5010": { "packet_id": [1, 0, 1], "headStr": [2, 5, 1] }, "5011": { "packet_id": [1, 0, 1], "nickName": [2, 5, 1] }, "5012": { "packet_id": [1, 0, 1], "sex": [2, 1, 1] }, "5037": { "packet_id": [1, 0, 1] }, "5058": { "packet_id": [1, 0, 1] }, "5059": { "packet_id": [1, 0, 1], "questid": [2, 1, 1] }, "5080": { "packet_id": [1, 0, 1] }, "5081": { "packet_id": [1, 0, 1], "delete_list": [2, 5, 0, 1] }, "5082": { "packet_id": [1, 0, 1], "id": [2, 5, 1] }, "5091": { "packet_id": [1, 0, 1] }, "5092": { "packet_id": [1, 0, 1] }, "5093": { "packet_id": [1, 0, 1], "index": [2, 1, 1] }, "5094": { "packet_id": [1, 0, 1] }, "5097": { "packet_id": [1, 0, 1], "text": [2, 5, 1] }, "5098": { "packet_id": [1, 0, 1] }, "5100": { "packet_id": [1, 0, 1] }, "5120": { "packet_id": [1, 0, 1] }, "5121": { "packet_id": [1, 0, 1] }, "5122": { "packet_id": [1, 0, 1], "player_id": [2, 1, 1] }, "5123": { "packet_id": [1, 0, 1] }, "5124": { "packet_id": [1, 0, 1], "count": [2, 1, 1], "nick_name": [3, 5, 1] }, "5125": { "packet_id": [1, 0, 1] }, "5126": { "packet_id": [1, 0, 1], "team_id": [3, 1, 1] }, "5127": { "packet_id": [1, 0, 1], "optype": [2, 1, 1], "team_id": [3, 1, 1], "limit": [4, 1, 1], "nick_name": [5, 5, 1] }, "5128": { "packet_id": [1, 0, 1] }, "5129": { "packet_id": [1, 0, 1] }, "5130": { "packet_id": [1, 0, 1] }, "5131": { "packet_id": [1, 0, 1] }, "5132": { "packet_id": [1, 0, 1] }, "5143": { "packet_id": [1, 0, 1] }, "5150": { "packet_id": [1, 0, 1] }, "5155": { "packet_id": [1, 0, 1] }, "5156": { "packet_id": [1, 0, 1] }, "5157": { "packet_id": [1, 0, 1] }, "5158": { "packet_id": [1, 0, 1] }, "5159": { "packet_id": [1, 0, 1] }, "5160": { "packet_id": [1, 0, 1] }, "30001": { "packet_id": [1, 0, 1], "playerid": [2, 1, 1], "gameid": [3, 1, 1] }, "30002": { "packet_id": [1, 0, 1], "playerid": [2, 1, 1] }, "30003": { "packet_id": [1, 0, 1], "gameid": [2, 1, 1] } };
    NET_CONF.s2cDecode = { "401": { "1": ["packet_id", 0, 1], "3": ["msgpaks", 10, 0, 1] }, "404": { "1": ["packet_id", 0, 1] }, "444": { "1": ["packet_id", 0, 1] }, "7501": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["servertime", 1, 1], "4": ["gaming", 1, 1], "5": ["ver", 5, 1] }, "7503": { "1": ["packet_id", 0, 1], "2": ["account_info", 12, 1], "3": ["game_list", 11, 0, 1], "4": ["gaming", 1, 1] }, "7504": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7505": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7506": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["pay_type", 1, 1], "4": ["pay_value", 1, 1], "5": ["vip_exp", 1, 1], "6": ["orderid", 5, 1] }, "7507": { "1": ["packet_id", 0, 1], "2": ["shutdown", 2, 1] }, "7509": { "1": ["packet_id", 0, 1], "2": ["headstr", 5, 1], "3": ["result", 1, 1] }, "7510": { "1": ["packet_id", 0, 1], "2": ["nickName", 5, 1], "3": ["result", 1, 1] }, "7511": { "1": ["packet_id", 0, 1], "2": ["sex", 1, 1], "3": ["result", 1, 1] }, "7523": { "1": ["packet_id", 0, 1], "2": ["content", 5, 1], "3": ["notifyType", 1, 1], "4": ["talkerNickName", 5, 1], "5": ["playerId", 1, 1], "6": ["talkerVIPLevel", 1, 1], "7": ["hasMonthCard", 2, 1], "8": ["repCount", 1, 1], "9": ["interval", 1, 1], "10": ["moneyNum", 1, 1] }, "7539": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7561": { "1": ["packet_id", 0, 1], "2": ["questlist", 13, 0, 1], "3": ["is_new", 2, 1] }, "7562": { "1": ["packet_id", 0, 1], "2": ["questid", 1, 1], "3": ["result", 1, 1] }, "7563": { "1": ["packet_id", 0, 1], "3": ["qinfo", 13, 1] }, "7586": { "1": ["packet_id", 0, 1], "2": ["result", 2, 1], "3": ["msg_list", 14, 0, 1] }, "7587": { "1": ["packet_id", 0, 1], "2": ["result", 2, 1] }, "7588": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["id", 5, 1] }, "7589": { "1": ["packet_id", 0, 1], "2": ["reward_gold", 1, 1] }, "7599": { "1": ["packet_id", 0, 1], "2": ["game_id", 1, 1], "3": ["room_id", 1, 1], "4": ["win_gold", 3, 1], "5": ["share_reward", 1, 1] }, "7600": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["reward", 3, 1] }, "7601": { "1": ["packet_id", 0, 1], "2": ["faq_list", 16, 0, 1] }, "7602": { "1": ["packet_id", 0, 1], "2": ["faq", 16, 1] }, "7603": { "1": ["packet_id", 0, 1], "2": ["qq", 5, 1] }, "7606": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["suggest", 17, 1] }, "7607": { "1": ["packet_id", 0, 1], "2": ["list", 17, 0, 1] }, "7609": { "1": ["packet_id", 0, 1] }, "7631": { "1": ["packet_id", 0, 1], "2": ["info", 18, 0, 1] }, "7632": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["gain", 3, 1] }, "7633": { "1": ["packet_id", 0, 1], "2": ["info", 18, 1] }, "7634": { "1": ["packet_id", 0, 1], "2": ["gain", 3, 1] }, "7635": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["team_id", 1, 1], "4": ["count", 1, 1], "5": ["nick_name", 5, 1], "6": ["code_tag", 1, 1] }, "7636": { "1": ["packet_id", 0, 1], "2": ["teams", 19, 0, 1] }, "7637": { "1": ["packet_id", 0, 1], "2": ["team", 19, 0, 1] }, "7638": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["optype", 1, 1], "4": ["team_id", 1, 1], "5": ["code_tag", 1, 1] }, "7639": { "1": ["packet_id", 0, 1], "2": ["commission_today_team", 3, 1], "3": ["commission_today_self", 3, 1], "4": ["commission_today_agent", 3, 1], "5": ["commission_yesterday_team", 3, 1], "6": ["commission_yesterday_self", 3, 1], "7": ["commission_yesterday_agent", 3, 1], "8": ["per_today_team", 3, 1], "9": ["per_today_self", 3, 1], "10": ["per_today_agent", 3, 1], "11": ["per_yesterday_team", 3, 1], "12": ["per_yesterday_self", 3, 1], "13": ["per_yesterday_agent", 3, 1], "14": ["per_today", 3, 1], "15": ["per_this_week", 3, 1], "16": ["rebate_today", 3, 1], "17": ["rebate_this_week", 3, 1], "18": ["per_b_self_today", 3, 1], "19": ["per_b_child_today", 3, 1], "20": ["per_b_self_yesterday", 3, 1], "21": ["per_b_child_yesterday", 3, 1], "22": ["ac", 1, 1], "23": ["ac_inc", 1, 1], "24": ["ac_inc_yd", 1, 1], "25": ["ac_inc_tw", 1, 1], "26": ["ac_inc_lw", 1, 1], "27": ["ac_inc_tm", 1, 1], "28": ["ac_inc_lm", 1, 1] }, "7640": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7641": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7642": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7643": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7649": { "1": ["packet_id", 0, 1], "2": ["ac_bind", 2, 1], "3": ["ac_recharge", 2, 1], "4": ["ac_recharge_award", 2, 1], "5": ["ac_chest", 2, 1], "6": ["ac_chest_new", 2, 1], "7": ["yun_isshow", 2, 1], "8": ["yun_rebate", 1, 1], "9": ["month_card", 2, 1], "10": ["activities", 1, 0, 1] }, "7660": { "1": ["packet_id", 0, 1], "2": ["viplv", 1, 1], "3": ["vipexp", 3, 1] }, "7665": { "1": ["packet_id", 0, 1], "2": ["bound", 2, 1], "3": ["applied", 2, 1], "4": ["accumulation", 3, 1], "5": ["index", 1, 1], "6": ["index_reward", 1, 1], "7": ["ts_ready", 1, 1], "8": ["ts_begin", 1, 1], "9": ["ts_end", 1, 1], "10": ["ts_off", 1, 1] }, "7666": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7667": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["reward", 3, 1], "4": ["index", 1, 1] }, "7668": { "1": ["packet_id", 0, 1], "2": ["bound", 2, 1], "3": ["applied", 2, 1], "4": ["accumulation", 3, 1], "5": ["index", 1, 1], "6": ["index_reward", 1, 1], "7": ["ts_ready", 1, 1], "8": ["ts_begin", 1, 1], "9": ["ts_end", 1, 1], "10": ["ts_off", 1, 1] }, "7669": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "7670": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1], "3": ["reward", 3, 1], "4": ["index", 1, 1] }, "31001": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] }, "31002": { "1": ["packet_id", 0, 1], "2": ["result", 1, 1] } };
    NET_CONF.typeDecode = { "10": { "1": ["msgid", 1, 1], "2": ["msginfo", 6, 1] }, "11": { "1": ["gameid", 1, 1], "2": ["gamever", 1, 1], "3": ["curOnlineNum", 1, 1], "4": ["isHot", 2, 1], "5": ["sort", 1, 1] }, "12": { "1": ["aid", 1, 1], "2": ["channelId", 5, 1], "3": ["nickname", 5, 1], "4": ["gold", 3, 1], "5": ["viplvl", 1, 1], "6": ["vipexp", 1, 1], "8": ["icon_custom", 5, 1], "9": ["sex", 1, 1], "14": ["Ticket", 1, 1], "16": ["curPhotoFrameId", 1, 1], "19": ["payids", 1, 0, 1], "20": ["isSafeDepositBoxPwdEmpty", 2, 1], "21": ["safeBoxGold", 3, 1], "22": ["collected", 1, 1], "26": ["updateNicknameCount", 1, 1], "27": ["isBindMobilePhone", 2, 1], "36": ["create_time", 1, 1], "44": ["Privilege", 1, 1], "46": ["lastGameId", 1, 1], "47": ["isFormal", 2, 1], "48": ["BindInfo", 5, 1], "49": ["RealName", 5, 1], "52": ["Recharged", 1, 1], "53": ["inviter_id", 1, 1], "54": ["water", 1, 1], "55": ["inviter_reward_count", 1, 1], "56": ["withdraw", 1, 1], "57": ["sevenday_done", 2, 1], "58": ["quest_list", 1, 0, 1], "59": ["limit_time_photo", 1, 1], "60": ["ipinfo", 5, 1], "61": ["inviter_reward", 3, 1], "62": ["performance", 3, 1], "63": ["ts_ac_bind", 1, 1], "64": ["can_bind_alipay", 2, 1], "65": ["cs_token", 5, 1] }, "13": { "1": ["questid", 1, 1], "2": ["count", 1, 1], "3": ["received", 2, 1] }, "14": { "1": ["id", 5, 1], "2": ["userId", 1, 1], "3": ["timeValue", 3, 1], "4": ["msgInfo", 5, 1], "5": ["read", 1, 1], "6": ["items", 15, 0, 1] }, "15": { "1": ["id", 1, 1], "2": ["count", 1, 1] }, "16": { "1": ["index", 1, 1], "2": ["text", 5, 1] }, "17": { "1": ["text", 5, 1], "2": ["time", 3, 1] }, "18": { "1": ["player_id", 1, 1], "2": ["photo_frame", 1, 1], "3": ["nick_name", 5, 1], "4": ["parent", 1, 1], "5": ["per_today", 3, 1], "6": ["per_yesterday", 3, 1], "7": ["per_sub_today", 3, 1], "8": ["per_sub_yesterday", 3, 1], "9": ["per_tw", 3, 1], "10": ["per_lw", 3, 1], "11": ["per_sub_tw", 3, 1], "12": ["per_sub_lw", 3, 1], "13": ["ts_create", 1, 1], "14": ["ac", 1, 1], "15": ["ac_inc", 1, 1], "16": ["ac_inc_yd", 1, 1], "17": ["ac_inc_tw", 1, 1], "18": ["ac_inc_lw", 1, 1], "19": ["ac_inc_tm", 1, 1], "20": ["ac_inc_lm", 1, 1], "21": ["gain_yd", 3, 1], "22": ["gain_tw", 3, 1], "23": ["gain_lw", 3, 1], "24": ["gain", 3, 1] }, "19": { "1": ["id", 1, 1], "2": ["name", 5, 1], "3": ["count", 1, 1], "4": ["count_limit", 1, 1], "5": ["code_tag", 1, 1], "6": ["ac_inc", 1, 1], "7": ["member_infos", 18, 0, 1] } };
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
    function base64Encode(str) {
        var utf8 = utf16TpUtf8(str); // 转成UTF8
        var i = 0; // 遍历索引
        var len = utf8.length;
        var res = [];
        var table = base64Tab;
        while (i < len) {
            var c1 = utf8.charCodeAt(i++) & 0xFF;
            res.push(table[c1 >> 2]);
            // 需要补2个=
            if (i == len) {
                res.push(table[(c1 & 0x3) << 4]);
                res.push('==');
                break;
            }
            var c2 = utf8.charCodeAt(i++);
            // 需要补1个=
            if (i == len) {
                res.push(table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
                res.push(table[(c2 & 0x0F) << 2]);
                res.push('=');
                break;
            }
            var c3 = utf8.charCodeAt(i++);
            res.push(table[((c1 & 0x3) << 4) | ((c2 >> 4) & 0x0F)]);
            res.push(table[((c2 & 0x0F) << 2) | ((c3 & 0xC0) >> 6)]);
            res.push(table[c3 & 0x3F]);
        }
        return res.join('');
    }
    Base64.base64Encode = base64Encode;
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
    function utf16TpUtf8(str) {
        var res = [], len = str.length;
        for (var i = 0; i < len; i++) {
            var code = str.charCodeAt(i);
            if (code > 0x0000 && code <= 0x007F) {
                // 单字节，这里并不考虑0x0000，因为它是空字节
                // U+00000000 – U+0000007F  0xxxxxxx
                res.push(str.charAt(i));
            }
            else if (code >= 0x0080 && code <= 0x07FF) {
                // 双字节
                // U+00000080 – U+000007FF  110xxxxx 10xxxxxx
                // 110xxxxx
                var byte1 = 0xC0 | ((code >> 6) & 0x1F);
                // 10xxxxxx
                var byte2 = 0x80 | (code & 0x3F);
                res.push(String.fromCharCode(byte1), String.fromCharCode(byte2));
            }
            else if (code >= 0x0800 && code <= 0xFFFF) {
                // 三字节
                // U+00000800 – U+0000FFFF  1110xxxx 10xxxxxx 10xxxxxx
                // 1110xxxx
                var byte1 = 0xE0 | ((code >> 12) & 0x0F);
                // 10xxxxxx
                var byte2 = 0x80 | ((code >> 6) & 0x3F);
                // 10xxxxxx
                var byte3 = 0x80 | (code & 0x3F);
                res.push(String.fromCharCode(byte1), String.fromCharCode(byte2), String.fromCharCode(byte3));
            }
            else if (code >= 0x00010000 && code <= 0x001FFFFF) {
                // 四字节
                // U+00010000 – U+001FFFFF  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
            else if (code >= 0x00200000 && code <= 0x03FFFFFF) {
                // 五字节
                // U+00200000 – U+03FFFFFF  111110xx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
            else {
                // 六字节
                // U+04000000 – U+7FFFFFFF  1111110x 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx 10xxxxxx
            }
        }
        return res.join('');
    }
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
var CacheUtil;
(function (CacheUtil) {
    var _arrs = [];
    function getArr() {
        return _arrs.length > 0 ? _arrs.pop() : [];
    }
    CacheUtil.getArr = getArr;
    function freeArr(arr) {
        arr.length = 0;
        if (_arrs.length < 100) {
            _arrs.push(arr);
        }
    }
    CacheUtil.freeArr = freeArr;
})(CacheUtil || (CacheUtil = {}));
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
        _svrTm = svrTm * 1000;
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
    /**
     * 本期结束还有几天几时几分几秒 周一 和周五零点结束
     */
    function formatTm() {
        var svrTm = getSvrMS();
        var tm = new Date(svrTm);
        //获取今天0点的时间戳
        var todayZeroTm = getRefreshTm(svrTm) * 1000;
        //获取今天周几
        var weekDay = tm.getDay();
        if (weekDay == 0)
            weekDay = 7;
        var finTm = 0; //单位毫秒
        if (weekDay > 0 && weekDay < 5) {
            finTm = todayZeroTm + 86400000 /* MILLIS_PER_DAY */ * (5 - weekDay);
        }
        else {
            finTm = todayZeroTm + 86400000 /* MILLIS_PER_DAY */ * (8 - weekDay);
        }
        //获取现在时间到结束时间的差值 
        var offTm = finTm - svrTm;
        return getHourMinSec(offTm);
    }
    TimeUtil.formatTm = formatTm;
    /**
     *
     * @param tm 毫秒
     */
    function getHourMinSec(offTm) {
        var date = {};
        var day = 0;
        var hour = 0;
        var min = 0;
        var sec = 0;
        day = offTm >= 86400000 /* MILLIS_PER_DAY */ ? Math.floor(offTm / 86400000 /* MILLIS_PER_DAY */) : 0;
        date.day = day;
        offTm -= day * 86400000 /* MILLIS_PER_DAY */;
        hour = offTm >= 3600000 /* MILLIS_PER_HOUR */ ? Math.floor(offTm / 3600000 /* MILLIS_PER_HOUR */) : 0;
        date.hour = hour;
        offTm -= hour * 3600000 /* MILLIS_PER_HOUR */;
        min = offTm >= 60000 /* MILLIS_PER_MINUTE */ ? Math.floor(offTm / 60000 /* MILLIS_PER_MINUTE */) : 0;
        date.min = min;
        offTm -= min * 60000 /* MILLIS_PER_MINUTE */;
        sec = offTm >= 1000 /* MILLIS_PER_SECOND */ ? Math.floor(offTm / 1000 /* MILLIS_PER_SECOND */) : 0;
        date.sec = sec;
        offTm -= sec * 1000 /* MILLIS_PER_SECOND */;
        return date;
    }
    TimeUtil.getHourMinSec = getHourMinSec;
})(TimeUtil || (TimeUtil = {}));
var game;
(function (game) {
    var ExtensionPop = (function (_super) {
        __extends(ExtensionPop, _super);
        function ExtensionPop() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.skinName = "ExtendPopSkin";
            self.hideBg = false;
            self.vCenter = 0;
            self.hCenter = 0;
            return _this;
        }
        ExtensionPop.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var self = this;
            self.skclose.setTarget(function () {
                self.close();
                game.dataMgr.generalMo.postEvent("close" /* Close */);
            }, self);
            self.skTG.setTarget(function () {
                self.close();
                game.gameScene.showHallUI(5 /* extension */);
            }, self);
        };
        return ExtensionPop;
    }(game.UIPopup));
    game.ExtensionPop = ExtensionPop;
    __reflect(ExtensionPop.prototype, "game.ExtensionPop");
})(game || (game = {}));
