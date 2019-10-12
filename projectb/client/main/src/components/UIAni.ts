module game {
    export class OpenFWAni extends TRain.AniBase {
        private static props = {
            scaleX: { b: 0.9, r: 0.1 },
            scaleY: { b: 0.9, r: 0.1 },
            alpha: { b: 0.3, r: 0.7 }
        };

        constructor(tar: cui.BaseContainer) {
            super(tar);

            let self = this;
            let action = new TRain.ActionPropTween(100);
            action.setProps(OpenFWAni.props);
            self.action = action;
            self._props = { touchEnabled: false, x: 0, y: 0, anchorOffsetX: 0, anchorOffsetY: 0, alpha: 1 };
        }

        public beforeAni(): void {
            super.beforeAni();

            let props: any = this._props;
            let tar = this.tar;
            let hw = Math.floor(tar.width / 2);
            let hh = Math.floor(tar.height / 2);

            tar.anchorOffsetX = hw;
            tar.anchorOffsetY = hh;

            tar.x = props.x + hw;
            tar.y = props.y + hh;
            tar.touchEnabled = false;
        }
    }

    export class CloseFWAni extends TRain.AniBase {
        private static props = {
            scaleX: { b: 1, r: -0.1 },
            scaleY: { b: 1, r: -0.1 },
            alpha: { b: 1, r: -0.7 }
        };

        constructor(tar: cui.BaseContainer) {
            super(tar);

            let self = this;
            let action = new TRain.ActionPropTween(100);
            action.setProps(CloseFWAni.props);
            self.action = action;
            self._props = { touchEnabled: false, x: 0, y: 0, anchorOffsetX: 0, anchorOffsetY: 0, alpha: 1 };
        }

        public beforeAni(): void {
            super.beforeAni();

            let props: any = this._props;
            let tar = this.tar;

            let hw = Math.floor(tar.width / 2);
            let hh = Math.floor(tar.height / 2);
            tar.anchorOffsetX = hw;
            tar.anchorOffsetY = hh;

            tar.x = props.x + hw;
            tar.y = props.y + hh;
            tar.touchEnabled = false;
        }
    }

    export class MoveXFWAni extends TRain.AniBase {
        private _isHori: boolean;

        constructor(tar: egret.DisplayObject, pent: number, isOut: boolean, isHorizontal?: boolean) {
            super(tar);

            let self = this;
            self._props = { touchEnabled: false, x: 0, y: 0 };

            let w = tar.width * (pent / 100);
            let h = tar.height * (pent / 100);
            let x = tar.x;
            let y = tar.y;
            self._isHori = isHorizontal;
            let action = new TRain.ActionPropTween(200);
            action.setEaseFun(EaseUtil.quadOut);
            let b = 0, r = 0;
            if (isHorizontal) {
                if (isOut) {
                    b = x - w;
                    r = w;
                } else {
                    b = x;
                    r = -w;
                }
                action.setProps({ x: { b: b, r: r } });
            } else {
                if (isOut) {
                    b = y - h;
                    r = h;
                } else {
                    b = y;
                    r = -h;
                }
                action.setProps({ y: { b: b, r: r } });
            }
            self.action = action;
        }

        public endAni(): void {
            let self = this;
            let props: any = self._props;
            let tar = self.tar;
            tar.touchEnabled = props.touchEnabled;
            if (self._isHori) {
                tar.x = props.x;
            } else {
                tar.y = props.y;
            }
        }
    }
    export class CloseDoorAni extends TRain.AniBase {
        private _leftTar: egret.DisplayObject;
        private _rightTar: egret.DisplayObject;
        private _leftBeginX: number;//左边的初始位置
        private _rightBeginX: number;//右边的初始位置
        private _leftEndX: number;
        private _rightEndX: number;
        private _LEndAlpha: number;//左边的alpha值
        private _REndAlpha: number;//右边的alpha值
        private _LHaveAlpha: boolean;
        private _RHaveAlpha: boolean;
        constructor(leftTar: egret.DisplayObject, rightTar: egret.DisplayObject, aniTm: number,data?:ICloseDoorData, LHaveAlpha?: boolean, RHaveAlpha?: boolean) {
            super(CloseDoorAni);
            let self = this;
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
            let action = new TRain.ActionTweenCall(aniTm);
            action.setEaseFun(EaseUtil.quadOut);
            action.setCall(self.update, self);
            self.action = action;
        }
        public beforeAni(): void {
            super.beforeAni();

            this.update(0);
        }
        protected update(v: number) {
            let self = this;
            self._leftTar.x = - self._leftBeginX + v * self._leftEndX;
            self._rightTar.x = self._rightBeginX - v * (self._rightBeginX - self._rightEndX);
            if (self._LHaveAlpha) self._leftTar.alpha = v * self._LEndAlpha;
            if (self._RHaveAlpha) self._rightTar.alpha = v * self._REndAlpha;
        }

    }
    export class ScrollAni extends TRain.AniBase {
        private _mask: egret.Rectangle;
        private _isHori: boolean;
        private _isOut: boolean;

        constructor(tar: cui.BaseContainer, aniTm: number, isHorizontal?: boolean, isOut?: boolean) {
            super(tar);

            let self = this;
            self._props = { touchEnabled: false, scrollRect: null };

            self._isHori = isHorizontal;
            self._isOut = isOut;

            self._mask = new egret.Rectangle(0, 0, tar.width, tar.height);
            let action = new TRain.ActionTweenCall(aniTm);
            action.setEaseFun(EaseUtil.quadOut);
            action.setCall(self.update, self);
            self.action = action;
        }

        protected update(v: number) {
            let self = this;
            let mask = self._mask;
            if (self._isOut) v = 1 - v;
            if (self._isHori) {
                mask.x = Math.floor(mask.width * v);
            }
            else {
                mask.y = Math.floor(mask.height * v);
            }
            self.tar.scrollRect = mask;
        }

        public beforeAni(): void {
            super.beforeAni();

            this.update(0);
        }
    }

    export class CircleMaskAni extends TRain.AniBase {
        public centerX: number;//圆心 x 相对tar的坐标
        public centerY: number;//圆心 y 相对tar的坐标

        private mask: egret.Shape;

        private _isOut: boolean;
        private _isBeginMask: boolean;

        private _endAngle: number;
        private _radius: number;
        private _beginTm: number;
        private _aniTm: number;

        constructor(tar: egret.DisplayObject, aniTm: number, isOut?: boolean, beginTm?: number, isBeginMask?: boolean) {
            super(tar);

            beginTm = beginTm || 0;
            aniTm -= beginTm;
            let self = this;
            self._isOut = isOut;
            self._beginTm = beginTm;
            self._aniTm = aniTm;
            self._isBeginMask = isBeginMask;
            self.centerX = Math.floor(tar.width / 2 + 0.5);
            self.centerY = Math.floor(tar.height / 2 + 0.5);

            self.mask = new egret.Shape();

            let action = new TRain.ActionTweenCall(aniTm);
            action.once = false;
            action.setCall(self.update, self);
            self.action = action;
        }
        public resetBeginTm(beTm?: number) {
            this._beginTm = beTm || 0;
        }
        protected update(tm: number) {
            let self = this;
            //从某一个位置开始转
            if (self._beginTm) tm = (self._beginTm + self._aniTm * tm) / self._aniTm;
            self._endAngle = self._isOut ? (-90 + tm * 360) : (270 - tm * 360);
            self.drawFan();
        }

        public beforeAni() {
            let self = this;
            let tar = self.tar;
            let mask = self.mask;
            self._radius = Math.ceil(Math.sqrt(self.centerX * self.centerX + self.centerY * self.centerY));
            mask.x = tar.x;
            mask.y = tar.y;
            tar.parent.addChild(mask);
            tar.mask = mask;
            self.update(0);
        }

        public endAni(): void {
            let self = this;
            let tar = self.tar;
            tar.parent.removeChild(self.mask);
            tar.mask = null;
        }

        private drawFan() {
            let self = this;
            let shape = self.mask;
            let g: egret.Graphics = shape.graphics;
            g.clear();

            let startAngle = -90;
            let endAngle = self._endAngle;
            if (startAngle == endAngle) return;
            if (self._isBeginMask) {
                startAngle = endAngle;
                endAngle = -90;
            }
            let centerX = self.centerX;
            let centerY = self.centerY;
            let radius = self._radius;

            g.beginFill(0xff0000);

            g.moveTo(centerX, centerY);

            let radians = startAngle / 180 * Math.PI;
            let tx = radius * (1 + Math.cos(radians));
            let ty = radius * (1 + Math.sin(radians));
            g.lineTo(tx, ty);
            g.drawArc(centerX, centerY, radius, radians, endAngle / 180 * Math.PI);

            g.lineTo(centerX, centerY);
            g.endFill();
        }
    }

    export class QuakeAni extends TRain.AniBase {
        constructor(tar: cui.BaseContainer, aniTm?: number, xRange?: number, yRange?: number) {
            super(tar);

            let self = this;
            self._props = { x: 0, y: 0 }
            aniTm = aniTm || 400;
            xRange = xRange || 2;
            yRange = yRange || 8;

            let action1 = new TRain.ActionPropTween(aniTm, 1, { x: { b: tar.x, r: xRange } });
            action1.setEaseFun(EaseUtil.waveRandFun);

            let action2 = new TRain.ActionPropTween(aniTm, 1, { y: { b: tar.y, r: yRange } });
            action2.setEaseFun(UIUtils.quakeFun);

            self.action = new TRain.ActionSpawn([action1, action2]);
        }
    }

    const enum StarParticleConst {
        bomEmitTm = 200,
        bomTm = 1000,
    }
    export class StarParticleAni extends TRain.AniBase {
        public parent: egret.DisplayObjectContainer;
        private _movsys: cui.ParticleSys;
        // private _bomsys: cui.ParticleSys;
        private _bomClip: cui.UIMovieClip;

        private _movActs: TRain.Action[];
        private _spawnAct: TRain.ActionSpawn;
        private _movTm: number;
        private _bomName: string = "Bomb";

        constructor(parent: egret.DisplayObjectContainer) {
            super();

            let self = this;
            self.parent = parent;
            let star = new cui.Image();
            star.anthorPerX = star.anthorPerY = 0.5;
            star.source = confConsts.ComResTp.xing;

            let movConf = {
                einte: 16.7,
                emax: -1,
                oneMin: 1,
                oneMax: 0,
                src: confConsts.ComResTp.star,
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

            let sys = self._movsys = new cui.ParticleSys(movConf);
            sys.particleCls = cui.GlobalParticle;
            // sys = self._bomsys = new cui.ParticleSys(bomConf);
            // sys.particleCls = cui.MovParticle;
            let clip = self._bomClip = new cui.UIMovieClip();
            clip.aniName = self._bomName;

            let gp = self.tar = new cui.Group();
            gp.addChild(self._movsys);
            gp.addChild(star);

            let movTm = self._movTm = 1000;
            let movxAct = new TRain.ActionPropTween(movTm, 1, { x: { b: 0, r: 0 } });
            let movyAct = new TRain.ActionPropTween(movTm, 1, { y: { b: 0, r: 0 } });
            movyAct.setEaseFun(EaseUtil.quadIn);
            let step1FinAct = new TRain.ActionCallDo(movTm);
            step1FinAct.once = false;
            step1FinAct.setCall(function () {
                // let bomsys = self._bomsys;
                // self.tar.addChild(bomsys);
                // bomsys.start(StarParticleConst.bomEmitTm);
                let bomClip = self._bomClip;
                self.tar.addChild(bomClip);
                bomClip.gotoAndPlay(0, 1);
            }, self);

            self._movActs = [movxAct, movyAct, step1FinAct];

            let tmAct = new TRain.Action(StarParticleConst.bomTm);
            let spawnAct = self._spawnAct = new TRain.ActionSpawn(self._movActs);
            self.action = new TRain.ActionSequence([spawnAct, tmAct]);
        }

        public clear() {
            let tar = this.tar;
            if (tar.parent) tar.parent.removeChild(tar);
            tar.dispose();
            super.clear();
        }

        public setData(from: cui.IPointData, to: cui.IPointData) {
            let self = this;
            let offx = from.x - to.x;
            let offy = from.y - to.y;
            let dist = Math.sqrt(offx * offx + offy * offy);
            let movTm = self._movTm = Math.floor(dist * 1.3);

            let acts = self._movActs;
            let movAct = acts[0] as TRain.ActionPropTween;
            movAct.addProp("x", from.x, to.x);
            movAct.duration = movTm;

            movAct = acts[1] as TRain.ActionPropTween;
            movAct.addProp("y", from.y, to.y);
            movAct.duration = movTm;

            acts[2].duration = movTm;
            self._spawnAct.duration = movTm;
            self.action.duration = movTm + StarParticleConst.bomTm;
        }

        public beforeAni() {
            let self = this;
            // let bomsys = self._bomsys;
            // if (bomsys.parent) bomsys.parent.removeChild(bomsys);
            let bomClip = self._bomClip;
            if (bomClip.parent) bomClip.parent.removeChild(bomClip);

            self.parent.addChild(self.tar);
            self._movsys.start(self._movTm);
        }

        public endAni(): void {
            let self = this;
            let tar = self.tar;
            if (tar.parent) tar.parent.removeChild(tar);

            self._movsys.stop(true);
            // self._bomsys.stop(true);
            self._bomClip.stop();
            super.endAni();
        }
    }
}