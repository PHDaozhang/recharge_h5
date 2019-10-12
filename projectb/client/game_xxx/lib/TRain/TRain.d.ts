declare module cui {
    const enum UILayoutKeys {
        left = 0,
        top = 1,
        right = 2,
        bottom = 3,
        hCenter = 4,
        vCenter = 5,
        perWidth = 6,
        perHeight = 7,
        needPLayout = 8,
        openLayout = 9,
        max = 10,
    }
    class UILayout {
        protected $BC: any[];
        protected $parent: BaseContainer;
        constructor();
        left: number;
        /**
         * 距父级容器右边距离
         */
        right: number;
        top: number;
        /**
         * 距父级容器底部距离
         */
        bottom: number;
        /**
         * 在父级容器中距水平中心位置的距离
         */
        hCenter: number;
        /**
         * 在父级容器中距竖直中心位置的距离
         */
        vCenter: number;
        perWidth: number;
        perHeight: number;
        readonly needPLayout: boolean;
        protected setNeedPLayout(): void;
    }
    function implLayout(target: any): void;
}
declare module cui {
    const enum BaseUIKeys {
        width = 10,
        height = 11,
        filterNm = 12,
    }
    class BaseContainer extends egret.DisplayObjectContainer implements IBaseContainer {
        tag: number;
        ud: any;
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
        hitCheckBound: boolean;
        touchThrough: boolean;
        disposed: boolean;
        protected _anthorPerX: number;
        protected _anthorPerY: number;
        protected _inited: boolean;
        protected _invalidProps: number;
        protected _invalidPropsFlag: boolean;
        protected _invalidDL: boolean;
        protected _invalidDLFlag: boolean;
        protected $BC: any[];
        constructor();
        dispose(): void;
        $onAddToStage(stage: any, nestLevel: any): void;
        protected childrenCreated(): void;
        /**
         * float
         */
        /**
         * float
         */
        anthorPerX: number;
        /**
         * float
         */
        /**
         * float
         */
        anthorPerY: number;
        width: number;
        $getExplicitWidth(): number;
        $setWidth(value: number): void;
        height: number;
        $getExplicitHeight(): number;
        $setHeight(value: number): void;
        filterNm: string;
        $childAdded(child: egret.DisplayObject, index: number): void;
        $childRemoved(child: egret.DisplayObject, index: number): void;
        getChildAt(index: number): egret.DisplayObject;
        addChild(child: egret.DisplayObject): egret.DisplayObject;
        addChildAt(child: egret.DisplayObject, index: number): egret.DisplayObject;
        removeChild(child: egret.DisplayObject): egret.DisplayObject;
        removeChildAt(index: number): egret.DisplayObject;
        protected setNeedPLayout(): void;
        readonly isOpenLayout: boolean;
        openLayout(): void;
        readonly nestLevel: number;
        getPreferredBounds(bounds: egret.Rectangle): void;
        protected applyMatrix(bounds: egret.Rectangle, w: number, h: number): void;
        protected isDeltaIdentity(m: egret.Matrix): boolean;
        protected invalidateProps(tp: PropertyType): void;
        validateProps(): void;
        protected commitProps(): void;
        invalidateDL(): void;
        validateDL(): void;
        validateChildDL(child: IBaseCtrl): void;
        protected updateDL(): void;
        private adjChildDL(layoutElement, unscaledWidth, unscaledHeight);
        $hitTest(stageX: number, stageY: number): egret.DisplayObject;
        $measureChildBounds(): void;
        $measureContentBounds(bounds: egret.Rectangle): void;
    }
}
/**
 * Created by wjdeng on 2016/3/31.
 */
declare module cui {
    class Component extends BaseContainer {
        hitCheckBound: boolean;
        protected _needRess: string[];
        protected _skinName: string;
        protected _skin: Skin;
        protected _disabled: boolean;
        skinName: any;
        protected parseSkinName(): void;
        protected setSkin(newSkin: Skin): void;
        protected onPartAdded(): void;
        enabled: boolean;
        protected getState(): string;
        protected commitProps(): void;
    }
}
/**
 * Created by wjdeng on 2015/10/23.
 */
declare module cui {
    class SimpleButton extends Component {
        trigTm: number;
        protected _cb: {
            fun: (ctrl: SimpleButton) => void;
            tar: any;
        };
        protected _touchCaptured: boolean;
        protected _sound: string;
        protected _tmTag: number;
        protected _longTriged: boolean;
        constructor();
        dispose(): void;
        setTarget(fun: (ctrl: SimpleButton) => void, tar: any): void;
        $hitTest(stageX: number, stageY: number): egret.DisplayObject;
        protected _tempStage: egret.Stage;
        protected onTouchBegin(event: egret.TouchEvent): void;
        private onTouchEnd(event);
        protected onTouchFinish(): void;
        protected longTigger(): void;
        protected clearTouchTm(): void;
        protected getState(): string;
        sound: string;
        protected buttonReleased(): void;
    }
}
/**
 * Created by wjdeng on 2016/4/1.
 */
declare module cui {
    class Group extends BaseContainer implements IViewport {
        protected $Group: any[];
        protected _layout: LayoutBase;
        constructor();
        layout: LayoutBase;
        readonly isOpenLayout: boolean;
        elementsContent: egret.DisplayObject[];
        readonly contentWidth: number;
        readonly contentHeight: number;
        setContentSize(width: number, height: number): void;
        getElementRect(idx: number): IRectData;
        getElementSize(idx: number): ISizeData;
        getElementIdxByPos(x: number, y: number): number;
        readonly numElements: number;
        getElementAt(index: number): egret.DisplayObject;
        getVirtualElementAt(index: number): egret.DisplayObject;
        setIndicesInView(startIndex: number, endIndex: number): void;
        isElementInView(idx: number): boolean;
        scrollEnabled: boolean;
        scrollH: number;
        scrollV: number;
        private updateScrollRect();
        validateChildDL(child: IBaseCtrl): void;
        validateDL(): void;
    }
}
/**
 * Created by wjdeng on 2015/11/4.
 */
declare module TRain {
    class TexData extends egret.Texture {
        name: string;
        pname: string;
        conf: any;
        private _refCnt;
        $hasRef(): boolean;
        $addRef(): void;
        $subRef(): void;
        dispose(): void;
    }
    interface TexCallBack {
        (data: TexData, source: string): void;
    }
    interface FontCallBack {
        (data: egret.BitmapFont, source: string): void;
    }
    const enum RES_TYPE {
        JSON = "json",
        IMAGE = "image",
        SHEET = "st",
        FONT = "fnt",
        MC = "mc",
    }
    class AssetManager {
        static texTps: string[];
        private _imgsetList;
        private _texList;
        private _waitGCs;
        constructor();
        releaseTex(texData: TexData): void;
        private onTexLoadFin(data, source);
        getTex(source: string, cb: TexCallBack, thisObj: any, tp?: string): void;
        doGC(): void;
        getFont(name: string, cb: FontCallBack, thisObject: any): void;
        getMultiRes(srcs: string[], finFunc: (succ: boolean, datas: any[], userData?: any) => void, thisObject: any, userData?: any): void;
        getUrlRes(tp: string, url: string): any;
        destroyRes(name: string): any;
        getAsset(source: string, finFunc: (data: any, source: string) => void, thisObject: any): void;
        getUrlAsset(source: string, finFunc: (data: any, source: string) => void, thisObject: any, tp?: string): void;
        getUrlAssets(srcs: string[], tps: string[], finFunc: (succ: boolean, datas: any[], userData?: any) => void, thisObject: any, userData?: any): void;
    }
    let assetMgr: AssetManager;
}
/**
 * Created by wjdeng on 2015/10/29.
 */
declare module cui {
    class Image extends egret.Bitmap implements IBaseCtrl {
        tag: number;
        ud: any;
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
        protected _disposed: boolean;
        protected _anthorPerX: number;
        protected _anthorPerY: number;
        protected _invalidProps: number;
        protected _invalidPropsFlag: boolean;
        protected _source: string;
        protected _sourceChanged: boolean;
        protected $BC: any[];
        constructor(source?: string);
        anthorPerX: number;
        anthorPerY: number;
        filterNm: string;
        source: string;
        protected handleSourceChange(): void;
        $setTexture(value: TRain.TexData): boolean;
        protected resetBitmapData(): void;
        protected contentChanged(data: TRain.TexData, source: string): void;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        dispose(): void;
        $setWidth(value: number): boolean;
        $setHeight(value: number): boolean;
        protected invalidateProps(tp: PropertyType): void;
        validateProps(): void;
    }
}
/**
 * Created by wjdeng on 2015/10/24.
 */
declare class CMap<K, V> {
    private _keys;
    private _values;
    constructor();
    set(key: K, value: V): CMap<K, V>;
    get(key: K): V;
    readonly size: number;
    readonly keys: Array<K>;
    readonly values: Array<V>;
    forEach(callbackfn: (value: V, key: K, map: CMap<K, V>) => void, thisArg?: any): void;
    clear(): void;
    has(key: K): boolean;
    delete(key: K): boolean;
}
declare module cui {
    class Button extends cui.SimpleButton {
        skIcon: cui.Image;
        skLabel: cui.Label;
        protected _label: string;
        protected _txtKey: string;
        protected _icon: string;
        label: string;
        txtKey: string;
        icon: string;
        protected onPartAdded(): void;
    }
}
/**
 * Created by wjdeng on 2015/12/22.
 */
declare module cui {
    interface IItemData {
        width?: number;
        height?: number;
    }
    class DataItem extends Component {
        itemIndex: number;
        protected _data: IItemData | any;
        data: IItemData | any;
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
    class DataGroup extends Group {
        protected $DataGroup: any[];
        protected _range: number[];
        protected _idxToItm: CMap<number, DataItem>;
        constructor();
        dispose(): void;
        protected childrenCreated(): void;
        readonly numElements: number;
        getElementAt(index: number): DataItem;
        getVirtualElementAt(index: number): DataItem;
        setIndicesInView(startIndex: number, endIndex: number): void;
        isElementInView(idx: number): boolean;
        itemRender: any;
        itemSkinName: string;
        dataProvider: cui.ArrayCollection;
        protected onCollectionChange(event: CollectionEvent): void;
        protected itemAddedHandler(items: any, idx: number): void;
        protected itemRemovedHandler(item: any, idx: number): void;
        private resetRenderIdxs();
        private itemUpdatedHandler(item, idx);
        private idxsUpdatedHandler(idxs);
        private clearAllRenders();
        private freeAllRender();
        private doFreeRender(renderer);
        /**
         * @private
         * 为指定索引创建虚拟的项呈示器
         */
        private createRender();
        protected rendererAdded(renderer: DataItem, index: number, item: any): void;
        protected rendererRemoved(renderer: DataItem, index: number, item: any): void;
        protected _downRender: DataItem;
        protected _tempStage: egret.Stage;
        protected onRenderTouchBegin(event: egret.TouchEvent): void;
        protected onRenderTouchFinish(event: egret.TouchEvent): void;
        protected onRenderCaptureEnd(event: egret.TouchEvent): void;
        protected onRenderTouchEnd(event: egret.TouchEvent): void;
        protected commitProps(): void;
    }
}
/**
 * Created by wjdeng on 2016/4/1.
 */
declare module cui {
    class LayoutBase {
        protected _target: Group;
        paddingBottom: number;
        paddingTop: number;
        paddingRight: number;
        paddingLeft: number;
        itemH: number;
        itemW: number;
        protected _startIdx: number;
        protected _endIdx: number;
        protected _inViewCalc: boolean;
        constructor();
        target: Group;
        getElementIdxByPos(x: number, y: number): number;
        getElementRect(idx: number): IRectData;
        getElementSize(idx: number): ISizeData;
        protected isFixedSize(): boolean;
        protected checkTargetValid(target: Group): boolean;
        scrollPositionChanged(): void;
        protected adjustViewIndex(target: Group): boolean;
        updateDL(unscaledWidth: number, unscaledHeight: number): void;
        protected updateFixSizeDList(unscaledWidth: number, unscaledHeight: number): void;
        protected updateRealDList(unscaledWidth: number, unscaledHeight: number): void;
    }
}
declare module cui {
    const enum RAND_TP {
        rand = 0,
        average = 1,
        averRand = 2,
    }
    interface IPropConf {
        bb?: any;
        br?: number;
        bRand?: {
            tp: number;
            arg: any;
        };
        rb?: number;
        rr?: number;
        rRand?: {
            tp: number;
            arg: any;
        };
        eb?: number;
        er?: number;
        eRand?: {
            tp: number;
            arg: any;
        };
        ease?: string;
    }
    interface IChangeData {
        nm: string;
        b: number;
        r: number;
        ease: (t: number) => number;
    }
    interface ParticleCreator {
        new (sys: ParticleSys, initProps?: {
            [key: string]: any;
        }): Particle;
    }
    class Particle {
        fined: boolean;
        /**
         * 表示粒子当前存活时间，以毫秒为单位
         */
        ctm: number;
        /**
         * 表示粒子的存活总时间，以毫秒为单位
         * @default 1000
         */
        protected _ttm: number;
        protected _a: number;
        protected _x: number;
        protected _y: number;
        protected _rot: number;
        protected _scale: number;
        protected _sys: ParticleSys;
        protected _mxValid: boolean;
        protected _mx: egret.Matrix;
        protected _chProps: IChangeData[];
        protected _node: egret.sys.BitmapNode;
        protected _clrValid: boolean;
        protected _clrMx: number[];
        protected _color: egret.ColorMatrixFilter;
        constructor(sys: ParticleSys);
        protected hasProp(nm: string): boolean;
        ttm: number;
        x: number;
        y: number;
        alpha: number;
        rot: number;
        scale: number;
        protected randVal(b?: number, r?: number, rand?: {
            tp: number;
            arg: any;
        }): number;
        red: number;
        green: number;
        blue: number;
        reset(changeProps?: {
            [key: string]: IPropConf;
        }, colorProps?: {
            [key: string]: IPropConf;
        }): void;
        protected calcChangeProps(changeProps: {
            [key: string]: IPropConf;
        }): void;
        protected getMX(): egret.Matrix;
        rmvRenderNode(): void;
        adjustRenderNode(): void;
        updateRenderNode(): void;
        update(tmElapse: number): void;
        protected updateProps(rate: number, tmElapse: number): void;
    }
}
/**
 * Created by wjdeng on 2016/1/4.
 */
declare module TRain {
    class Action {
        $tag: number;
        protected _tar: any;
        protected _dur: number;
        protected _times: number;
        protected _tm: number;
        protected _doCnt: number;
        constructor(dur?: number, times?: number);
        duration: number;
        times: number;
        isDone(): boolean;
        getTar(): any;
        start(tar: any): void;
        stop(): void;
        stopToEnd(): void;
        clear(): void;
        step(dt: number): void;
        /**
         called once per frame. tm a value between 0 and 1

         For example:
         - 0 means that the action just started
         - 0.5 means that the action is in the middle
         - 1 means that the action is over
         */
        update(tm: number): void;
    }
    class ActionLoop extends Action {
        private _act;
        constructor(action: Action);
        isDone(): boolean;
        stop(): void;
        clear(): void;
        setAction(action: Action): void;
        start(tar: any): void;
        step(dt: number): void;
    }
}
declare module TRain {
    class SheetAnalyzer extends RES.BinAnalyzer {
        getRes(name: string): any;
        /**
         * 一项加载结束
         */
        onLoadFinish(event: egret.Event): void;
        protected parseSpriteSheet(texData: TexData, jsonStr: string, name: string, otherStr?: string): void;
        destroyRes(name: string): boolean;
    }
}
/**
 * Created by wjdeng on 2016/1/4.
 */
declare module TRain {
    const enum ACTIONSTATE {
        NONE = 0,
        PAUSE = 1,
        RMV = 2,
    }
    interface IActionData {
        actions: Array<Action>;
        tar: any;
        state: ACTIONSTATE;
    }
    class ActionManager {
        private _tarActs;
        private _tagActs;
        private _unitTag;
        constructor();
        getUnitTag(): number;
        addAction(act: Action, tar: any, paused: boolean, tag?: number): void;
        rmvAction(act: Action): void;
        rmvActsByTar(tar: any): void;
        rmvActsByTag(tag: number): void;
        private onActRmv(action);
        rmvAllActs(): void;
        pauseTar(tar: any): void;
        resumeTar(tar: any): void;
        pauseAll(): void;
        advanceTime(dt: number): void;
        private updateAction(actData, dt);
    }
    let actionMgr: ActionManager;
}
declare module cui {
    /**
     *
     */
    interface IDotLinePt {
        x: number;
        y: number;
        r?: number;
    }
    class DotLine extends egret.Shape implements IBaseCtrl {
        tag: number;
        ud: any;
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
        protected _disposed: boolean;
        protected _invalidProps: number;
        protected _invalidPropsFlag: boolean;
        protected $BC: any[];
        protected _dotRadius: number;
        protected _dotColor: number;
        protected _dotAlpha: number;
        protected _lineSize: number;
        protected _lineColor: number;
        protected _lineAlpha: number;
        protected _datas: IDotLinePt[];
        constructor();
        dispose(): void;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        lineColor: number;
        lineAlpha: number;
        lineSize: number;
        dotColor: number;
        dotAlpha: number;
        dotRadius: number;
        datas: IDotLinePt[];
        protected invalidateProps(tp: PropertyType): void;
        validateProps(): void;
        protected drawLine(): void;
    }
}
declare module cui {
    const enum EditableTextKeys {
        promptText = 0,
        textColorUser = 1,
        asPassword = 2,
    }
    class EditableText extends egret.TextField implements IDisplayText {
        tag: number;
        ud: any;
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
        protected _disposed: boolean;
        private _showPrompt;
        private _isFocusIn;
        private _promptColor;
        protected $EditableText: any[];
        protected _invalidProps: number;
        protected _invalidPropsFlag: boolean;
        protected $BC: any[];
        constructor();
        dispose(): void;
        filterNm: string;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        private onfocusOut();
        private onfocusIn();
        $getText(): string;
        $setText(value: string): boolean;
        prompt: string;
        promptColor: number;
        private showPromptText();
        $setTextColor(value: number): boolean;
        /**
         * @private
         */
        $setDisplayAsPassword(value: boolean): boolean;
        $setWidth(value: number): boolean;
        $setHeight(value: number): boolean;
        protected invalidateProps(tp: PropertyType): void;
        validateProps(): void;
    }
}
declare module cui {
    /**通过 width  表示直径
     * 顺时针
    */
    class FanShape extends egret.Shape implements IBaseCtrl {
        tag: number;
        ud: any;
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
        protected _disposed: boolean;
        protected _invalidProps: number;
        protected _invalidPropsFlag: boolean;
        protected $BC: any[];
        protected _stAngle: number;
        protected _endAngle: number;
        protected _color: number;
        constructor();
        dispose(): void;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $setWidth(value: number): void;
        stAngle: number;
        endAngle: number;
        color: number;
        protected invalidateProps(tp: PropertyType): void;
        validateProps(): void;
        protected drawFan(): void;
    }
}
declare module CONF {
    let resHome: string;
    let sheetUrl: string;
    let fontUrl: string;
    let mcUrl: string;
    let soundUrl: string;
    let imgUrl: string;
    let mcGCTm: number;
    let verFile: string;
}
/**
 * Created by wjdeng on 2016/4/6.
 */
declare module TRain {
    class Core {
        stage: egret.Stage;
        private _timeScale;
        private _uid;
        private _delayDos;
        private _freeDelayObjs;
        private _nextDos;
        private _frameDos;
        constructor();
        init(s: egret.Stage): void;
        setTimeScale(val: number): void;
        addNextDo(doFun: Function, target: any, ...args: any[]): void;
        addDelayDo(doFun: Function, target: any, delay: number, flag?: number, canScale?: boolean, ...args: any[]): number;
        private freeDelayObj(obj);
        rmvDelayDo(doFun: Function, target: any): void;
        rmvAllDelayDo(target: any): void;
        rmvDelayDoByFlag(flag: number): void;
        rmvDelayDoByID(id: number): void;
        adjustDelayTmByID(id: number, delay: number): void;
        addFrameDo(doFun: (tmElapse: number) => void, target: any, canScale?: boolean, interval?: number): number;
        rmvAllFrameDo(): void;
        rmvFrameDoById(id: number): void;
        rmvFrameDo(thisObj: any, doFun?: Function): void;
        private _lastTime;
        private update();
    }
    let core: Core;
}
/**
 * Created by wjdeng on 2016/4/6.
 */
declare module cui {
    class Label extends egret.TextField implements IBaseCtrl {
        tag: number;
        ud: any;
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
        protected _disposed: boolean;
        protected _invalidProps: number;
        protected _invalidPropsFlag: boolean;
        protected $BC: any[];
        constructor();
        dispose(): void;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $setWidth(value: number): boolean;
        $setHeight(value: number): boolean;
        txtKey: string;
        txtFlowKey: string;
        filterNm: string;
        protected invalidateProps(tp: PropertyType): void;
        validateProps(): void;
    }
}
/**
 * Created by wjdeng on 2016/4/1.
 */
declare module cui {
    class Skin {
        x: number;
        y: number;
        width: number;
        height: number;
        skinParts: string[];
        needRess: string[];
        elementsContent: egret.DisplayObject[];
        private states;
        private _host;
        constructor();
        hostComponent: Component;
        hasStates(): boolean;
        applyState(stateName: string): void;
    }
}
declare module cui {
    const enum CollectionEventKind {
        ADD = "add",
        REFRESH = "refresh",
        REMOVE = "remove",
        REMOVEALL = "removeAll",
        REPLACE = "replace",
        RESET = "reset",
        UPDATE = "update",
        UPDATE_idxs = "upidxs",
    }
    interface ICollection extends egret.IEventDispatcher {
        length: number;
        getItemAt(index: number): any;
        getItemIndex(item: any): number;
    }
    class ArrayCollection extends egret.EventDispatcher implements ICollection {
        constructor(source?: any[]);
        private _src;
        source: any[];
        refresh(): void;
        readonly length: number;
        addItem(item: any): void;
        addItemAt(item: any, index: number): void;
        getItemAt(index: number): any;
        getItemIndex(item: any): number;
        itemUpdated(item: any): void;
        updateItemAt(idx: number): void;
        updateItemAts(idxs: number[]): void;
        removeAll(): void;
        removeItem(item: any): void;
        removeItemAt(index: number): any;
        replaceItemAt(item: any, index: number): any;
    }
}
/**
 * Created by CV-PC359 on 2016/6/22.
 */
declare module cui {
    class CollectionEvent extends egret.Event {
        kind: string;
        item: any;
        oldItem: any;
        location: number;
        constructor(type: string, bubbles?: boolean, cancelable?: boolean);
        protected clean(): void;
        private initTo(kind?, location?, item?, oldItem?);
        static dispatchCoEvent(target: egret.IEventDispatcher, kind?: string, location?: number, item?: any, oldItem?: any): boolean;
    }
}
/**
 * Created by wjdeng on 2016/4/6.
 */
declare module cui {
    const enum PropertyType {
        position = 1,
        size = 2,
        state = 4,
        itemRender = 8,
        itemRenderSkinName = 16,
        dataProvider = 32,
        source = 64,
        text = 128,
    }
    const enum FilterType {
        GlowFilter = 1,
        ColorMatrixFilter = 2,
        DropShadowFilter = 3,
        CustomFilter = 4,
        BlurFilter = 5,
        BitmapFilterQuality = 6,
    }
    class UIManager {
        private _filters;
        private _invalidDL;
        private _invalidProps;
        constructor();
        invalidateDL(container: IBaseContainer): void;
        invalidateProperty(container: IBaseCtrl): void;
        createFilters(conf: any): void;
        getFilters(nm: string): egret.Filter[];
        update(): void;
    }
    let uiMgr: UIManager;
}
/**
 * Created by CV-PC359 on 2016/6/18.
 */
declare module cui {
    let htmlParser: egret.HtmlTextParser;
    interface IPointData {
        x: number;
        y: number;
    }
    interface ISizeData {
        w: number;
        h: number;
    }
    let tempPt: {
        x: number;
        y: number;
    };
    interface IRectData {
        x: number;
        y: number;
        w: number;
        h: number;
    }
    let tempRect: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    const enum UI_EVENT {
        VIEW_CLEAR = "view_clear",
        EVT_CREATED = "created",
        EVT_PLAY_FIN = "play_fin",
        FRAME_LABEL = "frame_label",
        ITEM_TAP = "item_tap",
        COLLECT_CHANGE = "collect_ch",
        RMV_CHILD = "rmv_child",
        TRIG = "trig",
    }
    const enum Direction {
        LTR = "ltr",
        RTL = "rtl",
        TTB = "ttb",
        BTT = "btt",
    }
    interface IItemRenderer extends Component {
        data: any;
        selected: boolean;
        itemIndex: number;
    }
    interface IViewport extends BaseContainer {
        contentWidth: number;
        contentHeight: number;
        scrollH: number;
        scrollV: number;
        scrollEnabled: boolean;
        numElements: number;
        getElementSize(idx: number): ISizeData;
        getElementRect(idx: number): IRectData;
        getElementIdxByPos(x: number, y: number): number;
        getElementAt(index: number): egret.DisplayObject;
        getVirtualElementAt(index: number): egret.DisplayObject;
        isElementInView(idx: number): boolean;
        setIndicesInView(startIndex: number, endIndex: number): void;
    }
    interface IDisplayText extends IBaseCtrl {
        text: string;
    }
    interface ILayout extends egret.DisplayObject {
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
    }
    interface IBaseCtrl extends ILayout {
        tag: number;
        ud: any;
        dispose(): any;
        validateProps(): void;
    }
    interface IBaseContainer extends IBaseCtrl {
        isOpenLayout: boolean;
        nestLevel: number;
        invalidateDL(): void;
        validateDL(): void;
    }
}
/**
 * Created by wjdeng on 2015/10/8.
 */
declare module cui {
    class MenuGroup extends Group {
        protected _selection: MenuItem;
        protected _highLightItem: MenuItem;
        protected _items: Array<MenuItem>;
        protected _cb: {
            fun: (tar: any) => void;
            tar: any;
        };
        keepSelect: boolean;
        activeCheckEnable: boolean;
        constructor();
        dispose(): void;
        selectItem: MenuItem;
        selectTag: number;
        private setSelectItem(item);
        readonly numItems: number;
        getMenuItemAt(index: number): MenuItem;
        getChildByTag(tag: number): MenuItem;
        getItemIndex(item: MenuItem): number;
        setTarget(fun: (item: MenuItem) => void, tar: any): void;
        protected activate(item: MenuItem): void;
        $childAdded(child: egret.DisplayObject, index: number): void;
        $childRemoved(child: egret.DisplayObject, index: number): void;
        $hitTest(stageX: number, stageY: number): egret.DisplayObject;
        protected _tempStage: egret.Stage;
        protected onTouchBegin(event: egret.TouchEvent): void;
        protected onTouchMove(event: egret.TouchEvent): void;
        protected onTouchEnd(event: egret.TouchEvent): void;
        protected onTouchFinish(): void;
        private _itemForTouch(localX, localY);
    }
    class MenuItem extends Component {
        protected _isSel: boolean;
        protected _enabled: boolean;
        protected _sound: string;
        constructor();
        selected: boolean;
        sound: string;
        onItemTap(): void;
        ptInRange(localX: number, localY: number): boolean;
    }
    class MenuItemImage extends MenuItem {
        skIcon: cui.Image;
        skLabel: cui.Label;
        protected _label: string;
        protected _txtKey: string;
        protected _icon: string;
        label: string;
        txtKey: string;
        icon: string;
        selected: boolean;
        getState(): string;
        protected onPartAdded(): void;
    }
}
declare module cui {
    class ProgressBar extends Component {
        protected _ani: Animation;
        protected _aniVal: number;
        protected _dir: string;
        protected _val: number;
        protected _thumbPos: IPointData;
        protected _valToLabel: (val: number) => string;
        private _thumb;
        skLabel: Label;
        openAni: boolean;
        constructor();
        dispose(): void;
        protected childrenCreated(): void;
        labelFunction: (val: number) => string;
        direction: string;
        thumb: Image;
        value: number;
        setProgressValue(val: number, dur: number): void;
        protected startAni(toValue: number, dur: number): void;
        protected aniUpdateHandler(ani: Animation): void;
        protected setCurValue(val: number): void;
        protected update(): void;
        protected updateLabel(val: number): void;
    }
}
declare module cui {
    /**
     * 缩放按钮
     *
     * 自动对显示对象进行放大缩小
     * 需要指定所有的宽高
     *
     * */
    class ScaleButton extends Button {
        skAniGp: Group;
        scaleTime: number;
        smallRatio: number;
        bigRatio: number;
        private _action;
        constructor();
        protected onPartAdded(): void;
        protected onTouchBegin(event: egret.TouchEvent): void;
        protected onTouchFinish(): void;
        protected scaleSmall(): void;
        protected scaleBig(): void;
        protected clearAction(): void;
        dispose(): void;
    }
}
/**
 * Created by wjdeng on 2016/1/5.
 */
declare module TRain {
    class ActionDo extends Action {
        update(tm: number): void;
        protected do(): void;
    }
    class ActionPropDo extends ActionDo {
        private _props;
        constructor(dur?: number, props?: {
            [key: string]: any;
        });
        setProps(props: any): void;
        addProp(name: string, val: any): void;
        protected do(): void;
    }
    class ActionCallDo extends ActionDo {
        once: boolean;
        private _cb;
        setCall(fun: Function, tar: any): void;
        clear(): void;
        stop(): void;
        stopToEnd(): void;
        protected do(): void;
    }
}
/**
 * Created by wjdeng on 2015/10/26.
 */
declare module cui {
    class StateImage extends Image {
        private _states;
        private _curState;
        constructor();
        stateStr: string;
        curState: string;
        addState(key: string, val: string): void;
    }
}
/**
 * Created by wjdeng on 2015/12/18.
 */
declare module cui {
    class TableScroller extends Group {
        static scrollThreshold: number;
        activeInView: boolean;
        canOutBound: boolean;
        repeatClk: boolean;
        protected $TableScroller: any[];
        protected _cb: {
            fun: (tar: any) => void;
            tar: any;
        };
        protected _lastActiveIdx: number;
        protected _showInfo: any;
        constructor();
        scrollPolicyV: string;
        scrollPolicyH: string;
        viewport: IViewport;
        dispose(): void;
        private installViewport(viewport);
        private uninstallViewport();
        private onViewClear();
        showTableInViewStart(idx: number, ani: boolean): void;
        private _showTable(idx, ani);
        protected activate(tableIdx: number): boolean;
        setTarget(fun: (tar: any) => void, tar: any): void;
        protected checkScrollPolicy(): boolean;
        protected _tempStage: egret.Stage;
        protected onTouchBegin(event: egret.TouchEvent): void;
        protected onTouchMove(event: egret.TouchEvent): void;
        protected onTouchCaptureEnd(event: egret.TouchEvent): void;
        protected onTouchEnd(event: egret.TouchEvent): void;
        protected onTouchFinish(event: egret.TouchEvent): void;
        private clearEvent();
        protected moveStart(): void;
        protected moveUpdate(stageX: number, stageY: number): void;
        protected getPointChange(from: IPointData, to: IPointData, ret?: IPointData): IPointData;
        protected moveEnd(stageX: number, stageY: number): void;
        protected setScrollPosition(top: number, left: number, isOffset?: boolean): void;
        private setScrollTop(scrollTop, duration?);
        private setScrollLeft(scrollLeft, duration?);
        protected getAnimationDuration(pixelsPerMS: number, curPos: number, endPos: number): number;
        validateDL(): void;
    }
}
/**
 * Created by wjdeng on 2015/12/27.
 */
declare module cui {
    class UIMovieClip extends BaseContainer {
        protected _runing: boolean;
        protected _clip: TRain.MovieClip;
        protected _clipData: TRain.MovieClipData;
        protected _reverseData: TRain.MovieClipData;
        protected _reverse: boolean;
        protected _playData: any;
        protected _stopFrame: number;
        protected _aniName: string;
        anitp: number;
        autoPlay: boolean;
        constructor();
        $hitTest(stageX: number, stageY: number): egret.DisplayObject;
        /**
         * 动画名
         * @param name 使用"."间隔。 格式为：mcName.aniName   文件名.动作名
         * 如果没有使用间隔。默认aniName = mcName
         *
         * */
        aniName: string;
        protected childrenCreated(): void;
        dispose(): void;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        protected loadMCData(): void;
        protected onLoadDataFinish(clipData: TRain.MovieClipData, anitp: number): void;
        protected reverseChanged(reverse: any): void;
        gotoAndPlay(frame?: number, playTimes?: number, reverse?: boolean): void;
        private play(frame?, loop?);
        gotoAndStop(frame: number, reverse?: boolean): void;
        stop(): void;
        protected onAniFin(e: Event): void;
        protected freeClipData(): void;
    }
}
/**
 * Created by wjdeng on 2016/5/3.
 */
declare module cui {
    class UITile extends DataItem {
        protected _data: any;
        protected _cb: {
            fun: (tile: UITile) => void;
            tar: any;
        };
        constructor();
        dispose(): void;
        hasProp(key: string): boolean;
        dataChanged(): void;
        setTarget(fun: (tile: UITile) => void, tar: any): void;
        protected _tempStage: egret.Stage;
        protected onTouchBegin(event: egret.TouchEvent): void;
        private onTouchEnd(event);
        private onTouchFinish();
        protected clkReleased(): void;
    }
}
declare module cui {
    class Base64Img extends cui.Image {
        protected handleSourceChange(): void;
        $setTexture(value: TRain.TexData): boolean;
        protected contentChanged(data: TRain.TexData, source: string): void;
        dispose(): void;
    }
}
/**
 * Created by wjdeng on 2015/12/24.
 */
declare module cui {
    class DataLineLayout extends LayoutBase {
        isHorizontal: boolean;
        gap: number;
        horizontalAlign: string;
        verticalAlign: string;
        getElementRect(idx: number): IRectData;
        getElementIdxByPos(x: number, y: number): number;
        getElementSize(idx: number): ISizeData;
        protected adjustViewIndex(target: Group): boolean;
        protected adjustViewIndexH(target: DataGroup, width: number, height: number): boolean;
        protected adjustViewIndexV(target: DataGroup, width: number, height: number): boolean;
        protected updateFixSizeDList(width: number, height: number): void;
        protected updateRealDList(width: number, height: number): void;
        protected updateFixSizeH(target: DataGroup): void;
        protected updateDLH(target: DataGroup): void;
        protected updateFixSizeV(target: DataGroup): void;
        protected updateDLV(target: DataGroup): void;
    }
}
declare module cui {
    class LineLayout extends LayoutBase {
        isHorizontal: boolean;
        gap: number;
        horizontalAlign: string;
        verticalAlign: string;
        getElementRect(idx: number): IRectData;
        getElementIdxByPos(x: number, y: number): number;
        protected adjustViewIndex(target: Group): boolean;
        protected adjustViewIndexH(target: Group, width: number, height: number): boolean;
        protected adjustViewIndexV(target: Group, width: number, height: number): boolean;
        protected updateFixSizeDList(width: number, height: number): void;
        protected updateRealDList(width: number, height: number): void;
        protected updateFixSizeH(target: Group): void;
        protected updateDLH(target: Group): void;
        protected updateFixSizeV(target: Group): void;
        protected updateDLV(target: Group): void;
    }
}
declare module cui {
    class TileLayout extends LayoutBase {
        isHorizontal: boolean;
        horizontalGap: number;
        verticalGap: number;
        protected _count: number;
        getElementRect(idx: number): IRectData;
        getElementIdxByPos(x: number, y: number): number;
        protected adjustViewIndex(target: Group): boolean;
        protected adjustViewIndexH(target: Group, width: number, height: number): boolean;
        protected adjustViewIndexV(target: Group, width: number, height: number): boolean;
        protected updateFixSizeDList(width: number, height: number): void;
        protected updateRealDList(width: number, height: number): void;
        protected updateFixSizeH(target: Group): void;
        protected updateFixSizeV(target: Group): void;
    }
}
declare module cui {
    class Animation {
        /**
         * @private
         */
        constructor(updateFunction: (animation: Animation) => void, thisObject: any);
        easerFunction: Function;
        /**
         * @private
         */
        private thisObject;
        /**
         * @private
         * 是否正在播放动画，不包括延迟等待和暂停的阶段
         */
        isPlaying: boolean;
        /**
         * @private
         * 动画持续时间,单位毫秒，默认值500
         */
        duration: number;
        /**
         * @private
         * 动画到当前时间对应的值。
         */
        currentValue: number;
        /**
         * @private
         * 起始值
         */
        from: number;
        /**
         * @private
         * 终点值。
         */
        to: number;
        /**
         * @private
         * 动画启动时刻
         */
        private startTime;
        /**
         * @private
         * 动画播放结束时的回调函数
         */
        endFunction: (animation: Animation) => void;
        /**
         * @private
         * 动画更新时的回调函数
         */
        updateFunction: Function;
        /**
         * @private
         * 开始正向播放动画,无论何时调用都重新从零时刻开始，若设置了延迟会首先进行等待。
         */
        play(): void;
        /**
         * @private
         * 开始播放动画
         */
        private start();
        /**
         * @private
         * 停止播放动画
         */
        stop(): void;
        dispose(): void;
        /**
         * @private
         * 计算当前值并返回动画是否结束
         */
        private doInterval(currentTime);
    }
}
declare module cui {
    class TouchScroll {
        /**
         * @private
         * 创建一个 TouchScroll 实例
         * @param updateFunction 滚动位置更新回调函数
         */
        constructor(updateFunction: (scrollPos: number) => void, endFunction: () => void, target: egret.IEventDispatcher);
        /**
         * @private
         * 当前容器滚动外界可调节的系列
         */
        $scrollFactor: number;
        /**
         * @private
         */
        private target;
        /**
         * @private
         */
        private updateFunction;
        /**
         * @private
         */
        private endFunction;
        /**
         * @private
         */
        private previousTime;
        /**
         * @private
         */
        private velocity;
        /**
         * @private
         */
        private previousVelocity;
        /**
         * @private
         */
        private currentPosition;
        /**
         * @private
         */
        private previousPosition;
        /**
         * @private
         */
        private currentScrollPos;
        /**
         * @private
         */
        private maxScrollPos;
        /**
         * @private
         * 触摸按下时的偏移量
         */
        private offsetPoint;
        /**
         * @private
         * 停止触摸时继续滚动的动画实例
         */
        private animation;
        $bounces: boolean;
        private disposed;
        /**
         * @private
         * 正在播放缓动动画的标志。
         */
        isPlaying(): boolean;
        /**
         * @private
         * 如果正在执行缓动滚屏，停止缓动。
         */
        stop(): void;
        dispose(): void;
        private started;
        /**
         * @private
         * true表示已经调用过start方法。
         */
        isStarted(): boolean;
        /**
         * @private
         * 开始记录位移变化。注意：当使用完毕后，必须调用 finish() 方法结束记录，否则该对象将无法被回收。
         * @param touchPoint 起始触摸位置，以像素为单位，通常是stageX或stageY。
         */
        start(touchPoint: number): void;
        /**
         * @private
         * 更新当前移动到的位置
         * @param touchPoint 当前触摸位置，以像素为单位，通常是stageX或stageY。
         */
        update(touchPoint: number, maxScrollValue: number, scrollValue: any): void;
        /**
         * @private
         * 停止记录位移变化，并计算出目标值和继续缓动的时间。
         * @param currentScrollPos 容器当前的滚动值。
         * @param maxScrollPos 容器可以滚动的最大值。当目标值不在 0~maxValue之间时，将会应用更大的摩擦力，从而影响缓动时间的长度。
         */
        finish(currentScrollPos: number, maxScrollPos: number): void;
        /**
         * @private
         *
         * @param timeStamp
         * @returns
         */
        private onTick(timeStamp);
        /**
         * @private
         *
         * @param animation
         */
        private finishScrolling(animation?);
        /**
         * @private
         * 缓动到水平滚动位置
         */
        private throwTo(hspTo, duration?);
        /**
         * @private
         * 更新水平滚动位置
         */
        private onScrollingUpdate(animation);
    }
}
declare module TRain {
    type LangGroup = {
        [key: string]: string;
    } | string[];
    class LangManager {
        private _gpList;
        private _errGp;
        getGp(gpName: string): LangGroup;
        getTxtByKey(key: string): string;
        getTxt(gpName: string, key: string | number): string;
        getErrText(errCode: number): string;
        addGps(gps: {
            [key: string]: LangGroup;
        }): void;
    }
    let langMgr: LangManager;
}
declare module TRain {
    interface IMCResData {
        conf: any;
        sheet: egret.SpriteSheet;
        clips: any;
    }
    interface IMCLoadInfo {
        resName: string;
        mcTp: number;
    }
    class MCManager {
        private _mcRess;
        private _armTps;
        private _usecnts;
        private _disposeTp;
        private _timeoutHandler;
        private _loadings;
        private _mcs;
        private _oneUrl;
        constructor();
        doGC(): void;
        stopGC(): void;
        init(mcTps: Array<string>, oneUrl: boolean): void;
        private getMCUrl(armtp, resName);
        getMCRess(armtp: number, resName: string, urls: string[], tps: string[]): void;
        private incUsecnt(armtp, resName);
        private decUsecnt(armtp, resName);
        getMCData(armtp: number, resName: string, aniName?: string): MovieClipData;
        hasMCRes(armtp: number, resName: string): boolean;
        private _getMCData(mcResData, armtp, resName, aniName);
        getMCDataAsync(armtp: number, resName: string, finBack: (clipData: MovieClipData, armtp: number) => void, thisObj: any, aniName?: string): void;
        loadMCs(loadInfos: Array<IMCLoadInfo>, callback?: (succ: boolean, args: any) => void, thisObj?: any, args?: any): void;
        loadMCRes(armtp: number, resName: string, callback?: (succ: boolean, armtp: number, resName: string) => void, thisObj?: any): void;
        private loadRessImpl(armtp, resName, callback?, thisObj?);
        private onLoadArmResFin(data, armtp, resName);
        freeMCData(armtp: number, clip: MovieClipData): void;
        private disposeRess();
        add(mc: MovieClip): void;
        remove(mc: MovieClip): void;
        advanceTime(tm: number): void;
    }
    let mcMgr: MCManager;
}
declare module TRain {
    const enum MovieClipKeys {
        bitmapData = 0,
        movieClipData = 1,
        smoothing = 2,
        isPlaying = 3,
        intervalTime = 4,
        playTimes = 5,
        startFrame = 6,
        totalFrames = 7,
        currFrame = 8,
        passedTime = 9,
    }
    class MovieClip extends egret.DisplayObject {
        userdata: any;
        protected $MovieClip: Object;
        constructor();
        dispose(): void;
        smoothing: boolean;
        readonly totalFrames: number;
        readonly currentFrame: number;
        frameRate: number;
        readonly duration: number;
        readonly curSchedule: number;
        /**
         * MovieClip 实例当前是否正在播放
         * @version Egret 2.4
         * @platform Web,Native
         */
        readonly isPlaying: boolean;
        /**
         * MovieClip数据源
         */
        movieClipData: MovieClipData;
        getFrameLabelByName(labelName: string): IFrameLabel;
        getFrameLabelByFrame(frame: number): IFrameLabel;
        getFrameLabelForFrame(frame: number): IFrameLabel;
        setPlayLabel(labelName: string): void;
        stop(): void;
        gotoAndPlay(frame?: number, playTimes?: number): void;
        gotoTmAndPlay(tm?: number, playTimes?: number): void;
        gotoAndStop(frame: number): void;
        private gotoFrame(frame);
        advanceTime(tm: number): void;
        protected updateDisplay(): void;
        /**
         * @private
         */
        $updateRenderNode(): void;
        /**
         * @private
         */
        $measureContentBounds(bounds: egret.Rectangle): void;
    }
}
declare module TRain {
    interface IFrameLabel {
        name: string;
        frame: number;
        end?: number;
    }
    class MovieClipData {
        private _texData;
        private _sheet;
        frameRate: number;
        loop: number;
        numFrames: number;
        intervalTime: number;
        duration: number;
        frames: any[];
        labels: any[];
        events: any;
        resName: string;
        aniName: string;
        constructor(mcData: any, texData: any, sheet: egret.SpriteSheet);
        clone(reverse: boolean): MovieClipData;
        getKeyFrame(frame: number): any;
        getFrameTex(frame: number): egret.Texture;
        private getTex(resName);
        private fillMCData(mcData);
        private fillFramesData(framesData);
        private fillFramesEvent(eventDatas);
    }
}
declare module cui {
    class GlobalParticle extends Particle {
        protected _iniPos: egret.Point;
        protected _offPos: egret.Point;
        x: number;
        y: number;
        reset(changeProps?: {
            [key: string]: IPropConf;
        }, colorProps?: {
            [key: string]: IPropConf;
        }): void;
        protected getMX(): egret.Matrix;
        protected updateProps(rate: number, tmElapse: number): void;
    }
}
declare module cui {
    class GravityParticle extends Particle {
        speed: number;
        angle: number;
        gx: number;
        gy: number;
        ra: number;
        ta: number;
        protected _sin: number;
        protected _cos: number;
        protected _vx: number;
        protected _vy: number;
        reset(changeProps?: {
            [key: string]: IPropConf;
        }, colorProps?: {
            [key: string]: IPropConf;
        }): void;
        protected hasProp(nm: string): boolean;
        protected updateProps(rate: number, tmElapse: number): void;
    }
}
declare module cui {
    class MovParticle extends Particle {
        dist: number;
        angle: number;
        xEase: string | string[];
        yEase: string | string[];
        protected _handle: boolean;
        reset(changeProps?: {
            [key: string]: IPropConf;
        }, colorProps?: {
            [key: string]: IPropConf;
        }): void;
        protected hasProp(nm: string): boolean;
        protected updateProps(rate: number, tmElapse: number): void;
    }
}
/**
 * Created by wjdeng on 2016/1/5.
 */
declare module TRain {
    class ActionTween extends Action {
        protected _easeFun: Function;
        setEaseFun(fun: Function): void;
        update(tm: number): void;
        protected doUpdate(tm: number): void;
    }
    class ActionTweenCall extends ActionTween {
        once: boolean;
        private _cb;
        setCall(fun: (tm: number) => void, tar: any): void;
        clear(): void;
        stop(): void;
        protected doUpdate(tm: number): void;
    }
    class ActionPropTween extends ActionTween {
        endProps: {
            [name: string]: any;
        };
        protected _props: {
            [name: string]: {
                b: number;
                r: number;
            };
        };
        constructor(dur?: number, times?: number, props?: {
            [name: string]: {
                b: number;
                r: number;
            };
        });
        setProps(props: {
            [name: string]: {
                b: number;
                r: number;
            };
        }): void;
        addProp(name: string, from: number, to: number): void;
        start(tar: any): void;
        protected doUpdate(tm: number): void;
    }
    class ActionPropTo extends ActionTween {
        endProps: {
            [name: string]: any;
        };
        protected _toProps: {
            [name: string]: number;
        };
        protected _props: {
            [name: string]: {
                b: number;
                r: number;
            };
        };
        constructor(dur?: number, times?: number, props?: {
            [name: string]: number;
        });
        setProps(props: {
            [name: string]: number;
        }): void;
        addProp(name: string, to: number): void;
        start(tar: any): void;
        protected doUpdate(tm: number): void;
    }
    class ActionSequence extends ActionTween {
        private _actions;
        private _lastSplit;
        private _curSplit;
        private _curIdx;
        constructor(actions?: Action[]);
        setActions(actions: Action[]): void;
        addAction(action: Action): void;
        stop(): void;
        stopToEnd(): void;
        clear(): void;
        start(tar: any): void;
        update(tm: number): void;
    }
    class ActionSpawn extends ActionTween {
        private _actions;
        constructor(actions?: Action[]);
        setActions(actions: Action[]): void;
        stop(): void;
        stopToEnd(): void;
        clear(): void;
        start(tar: any): void;
        update(tm: number): void;
    }
}
declare module cui {
    interface IParticleConf {
        dur?: number;
        emax?: number;
        oneMax?: number;
        oneMin?: number;
        einte?: number;
        src: string;
        anchor?: cui.IPointData;
        prop?: {
            [key: string]: IPropConf;
        };
        color?: {
            [key: string]: IPropConf;
        };
        blendMode?: number;
    }
    class ParticleSys extends egret.DisplayObject implements IBaseCtrl {
        tag: number;
        ud: any;
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
        particleCls: ParticleCreator;
        conf: IParticleConf;
        protected _disposed: boolean;
        protected _sourceChanged: boolean;
        protected _source: string;
        protected _tex: TRain.TexData;
        protected $BC: any[];
        private _updateTag;
        protected _particles: Particle[];
        protected _pool: Particle[];
        protected _maxCnt: number;
        protected _curCnt: number;
        protected _oneMax: number;
        protected _oneMin: number;
        protected _eInte: number;
        protected _nextTm: number;
        constructor(conf?: IParticleConf);
        dispose(): void;
        validateProps(): void;
        readonly curEmitCnt: number;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $onRemoveFromStage(): void;
        protected startUpdate(): void;
        protected stopUpdate(): void;
        readonly numParticle: number;
        filterNm: string;
        source: string;
        protected loadSource(): void;
        getTex(): TRain.TexData;
        protected setTex(data: TRain.TexData, source: string): void;
        $measureContentBounds(bounds: egret.Rectangle): void;
        $updateRenderNode(): void;
        /**
         * 开始创建粒子
         * @param duration {number} 粒子出现总时间 毫秒
         */
        start(duration?: number): void;
        /**
         * 停止创建粒子
         * @param clear {boolean} 是否清除掉现有粒子
         */
        stop(clear: boolean): void;
        resume(): void;
        protected update(tmElapse: number): void;
        private getParticle();
        private rmvParticle(particle);
        private rmvAllParticle();
    }
}
declare module Profile {
}
/**
 * Created by wjdeng on 2015/11/4.
 */
declare module TRain {
    interface ITexDataGetFun {
        comp: (data: TexData) => void;
        thisObj: any;
        name: string;
        subTexData?: TexData;
    }
    class ImageSet {
        name: string;
        private _texData;
        private _subTexs;
        private _refCnt;
        private _cbs;
        constructor(name: string);
        getTexture(subname: string, compFunc: (data: TexData) => void, thisObject: any): void;
        private _getTexture(subname);
        private loadImageSetFin(texData);
        releaseBubTex(texData: TexData): void;
    }
}
declare module TRain {
    module UITheme {
        function loadInitConf(configURL: string, initFin: Function, initTar: any): void;
        function setCurGp(gpNm: string): void;
        function addSkinConf(addConfs: any, gpNm?: string): void;
        function getSkin(name: string): any;
    }
}
declare module TRain {
    class WebVerController implements RES.VersionController {
        private _verInfo;
        private _cb;
        private _homeList;
        fetchVersion(callback: {
            onSuccess: (data: any) => any;
            onFail: (error: number, data: any) => any;
        }): void;
        private onLoadFinish(event);
        addWebVer(addVerList: any): void;
        addHome(key: string, home: string): void;
        getHome(key: string): string;
        /**
         * 获取所有有变化的文件
         * @returns {Array<any>}
         */
        getChangeList(): Array<{
            url: string;
            size: number;
        }>;
        getVirtualUrl(url: string): string;
    }
}
/**
 * Created by wjdeng on 2015/10/29.
 */
declare module cui {
    class BitmapLabel extends egret.BitmapText implements IBaseCtrl {
        tag: number;
        ud: any;
        needPLayout: boolean;
        top: number;
        left: number;
        right: number;
        bottom: number;
        hCenter: number;
        vCenter: number;
        perWidth: number;
        perHeight: number;
        protected _disposed: boolean;
        protected _fontChanged: boolean;
        protected _font: string;
        protected _invalidProps: number;
        protected _invalidPropsFlag: boolean;
        protected $BC: any[];
        constructor(text?: string);
        filterNm: string;
        $onAddToStage(stage: egret.Stage, nestLevel: number): void;
        $setText(value: string): boolean;
        $setFont(value: string): boolean;
        protected parseFont(): void;
        private onFontChanged(bitmapFont, font);
        $setFontData(value: egret.BitmapFont): boolean;
        dispose(): void;
        $setWidth(value: number): boolean;
        $setHeight(value: number): boolean;
        txtKey: string;
        protected invalidateProps(tp: PropertyType): void;
        validateProps(): void;
    }
}
declare module TRain {
    class FontAnalyzer extends SheetAnalyzer {
        protected parseSpriteSheet(texData: TexData, jsonStr: string, name: string, otherStr?: string): void;
        destroyRes(name: string): boolean;
    }
}
declare module TRain {
    class MCAnalyzer extends SheetAnalyzer {
        protected parseSpriteSheet(texData: TexData, dataStr: string, name: string): void;
    }
}
declare module TRain {
    class SoundManager {
        private static UUID;
        private _musicState;
        private _sfxState;
        private _active;
        private _curMusic;
        private _musicNm;
        private _sfxs;
        private _plays;
        constructor();
        musicState: boolean;
        sfxState: boolean;
        private getUrl(name);
        /**
         * 播放背景音乐
         * @param url:string 背景音乐路径
         * */
        playMusic(name: string, force?: boolean): void;
        /**
         * 关闭背景音乐
         * */
        stopMusic(): void;
        /**
         * 播放音效
         * @param url:string 音效路径
         * @param delay:number 延时多久后开始播放， 单位毫秒 默认为0
         * @param duration:number 持续时间。值若大于0，表示持续时间到了就关闭音效。0代表不做时间限制。单位毫秒。默认为0
         * @return number 当前音效序列id，可用于停止音效使用。
         * */
        playSFX(name: string, delay?: number, duration?: number): number;
        stopSFX(id: number): void;
        stopAllSFX(): void;
        private _playSfx(soundConf);
        private playImpl(playing, loops, uuid);
        private addChannel(playing, channel, uuid);
        private rmvChannelById(uuid);
        private onSoundComplete(event);
        gcRess(): void;
    }
    let soundMgr: SoundManager;
}
declare module EaseUtil {
    function getPowIn(pow: any): Function;
    function getPowOut(pow: any): Function;
    function getPowInOut(pow: any): Function;
    let quadIn: Function;
    let quadOut: Function;
    let quadInOut: Function;
    let cubicIn: Function;
    let cubicOut: Function;
    let cubicInOut: Function;
    let quartIn: Function;
    let quartOut: Function;
    let quartInOut: Function;
    let quintIn: Function;
    let quintOut: Function;
    let quintInOut: Function;
    function sineIn(t: any): number;
    function sineOut(t: any): number;
    function sineInOut(t: any): number;
    function getBackIn(amount: any): Function;
    let backIn: Function;
    function getBackOut(amount: any): Function;
    let backOut: Function;
    function getBackInOut(amount: any): Function;
    let backInOut: Function;
    function circIn(t: any): number;
    function circOut(t: any): number;
    function circInOut(t: any): number;
    function bounceIn(t: any): number;
    function bounceOut(t: any): number;
    function bounceInOut(t: any): number;
    function getElasticIn(amplitude: any, period: any): Function;
    let elasticIn: Function;
    function getElasticOut(amplitude: any, period: any): Function;
    let elasticOut: Function;
    function getElasticInOut(amplitude: any, period: any): Function;
    let elasticInOut: Function;
    function getQuakeFun(waveCnt: number, decayPer: number): Function;
    let waveRandFun: (t: number) => number;
}
/**
 * Created by wjdeng on 2016/1/22.
 */
declare module cui {
    class Scroller extends Group {
        static scrollThreshold: number;
        protected $Scroller: any[];
        protected _lastActive: egret.DisplayObject;
        protected _bounces: boolean;
        protected _hAnimation: Animation;
        protected _vAnimation: Animation;
        constructor();
        dispose(): void;
        bounces: boolean;
        scrollPolicyV: string;
        scrollPolicyH: string;
        throwSpeed: number;
        setScrollTop(scrollTop: number, duration?: number): void;
        setScrollLeft(scrollLeft: number, duration?: number): void;
        protected doScrollTo(): void;
        protected getTouchScrollV(): TouchScroll;
        protected getTouchScrollH(): TouchScroll;
        viewport: IViewport;
        private installViewport(viewport);
        private uninstallViewport();
        private onViewClear();
        validateDL(): void;
        private checkScrollPolicy();
        protected _tempStage: egret.Stage;
        protected onTouchBegin(event: egret.TouchEvent): void;
        protected onTouchMove(event: egret.TouchEvent): void;
        protected onTouchCaptureEnd(event: egret.TouchEvent): void;
        protected onTouchFinish(event?: egret.TouchEvent): void;
        private clearEvent();
        protected moveStart(stageX: number, stageY: number): void;
        protected moveUpdate(stageX: number, stageY: number): void;
        protected moveEnd(stageX: number, stageY: number): void;
        private horizontalUpdateHandler(scrollPos);
        private verticalUpdateHandler(scrollPos);
        private horizontalEndHandler();
        private verticalEndHanlder();
    }
}
