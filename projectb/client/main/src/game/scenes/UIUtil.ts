module game {
	export const enum MCType {
		ui = 0
	}


    /**
     * 界面有关常量
     *
     * */
	export const enum UIConsts {

	}

	export const enum UIColor {
		white = 0xffffff,
		green = 0x0fe60f,
		blue = 0x54b6e5,
		orange = 0xeec643,
		gray = 0x777777,
		red = 0xee4545,
		yellow = 0xffcc00,
		purple = 0xd200ff,
		txt = 0xdecf8a,
		link = 0x0EC769,
		greeng = 0x12ff00,
		COLOR_1 = 0X000000,//黑色
		COLOR_2 = 0XFFFFFF,//白色
		COLOR_3 = 0XFF0000,//红色
		COLOR_4 = 0XFF7F00,//橙色
		COLOR_5 = 0XFFFF00,//黄色
		COLOR_6 = 0X00FF00,//绿色
		COLOR_7 = 0X0000FF,//蓝色
		COLOR_8 = 0X871F78,//深紫色
		COLOR_9 = 0XA8A8A8,//浅灰色
		COLOR_10 = 0XC0C0C0,//灰色
		COLOR_11 = 0XE6E8FA,//银色
		COLOR_12 = 0XFFE50B,//暗黄色
		COLOR_13 = 0X12FF00,//亮绿色
		COLOR_14 = 0xBABABA,//深灰色
		COLOR_15 = 0xFFEE7F,//浅黄
		COLOR_16 = 0XFF7E00,//深橘
		COLOR_17 = 0XB4EEB4,//浅绿
	}

	export const enum ImgPrefix {

	}

	export const enum LangGrp {
		mainLang = "mainLang",
	}
	export const enum moneyTp {
		y = "y",
		w = "w",
		q = "q",
		b = "b",
		by = "by",
		wy = "wy",
	}
	export const enum soundEnum {
		nn = "sound_brnn_type_"
	}
	export const enum gamePoker {
		poker = "poker",
		ddzPoker = "card@ddzPoker",
	}
	export const enum HallImg {
		hall = "hall@",
	}
	export const enum moment {
		scene = "txt_scene",
	}
	export const enum HeadImg {
		head = "head@",
		headFrame = "headFrame@",//旧的
	}
	export const enum UIFilerNm {
		grayCF = "grayCF",
	}

	export const enum UIEvent {
		CHAT_CLOSE = "chat_cls",
	}
	export module UIUtils {
		export var quakeFun = EaseUtil.getQuakeFun(5, 5);

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
		export function move(display: egret.DisplayObject, targetPos: any, speed: Function, dur: number = 1000, times: number = 1, cb?: Function, flag?: number) {
			let action: TRain.Action = new TRain.ActionPropTo(dur, times, targetPos);
			(action as TRain.ActionPropTo).setEaseFun(speed);
			if (cb) {
				let actionCall = new TRain.ActionCallDo();
				actionCall.setCall(cb, self);
				action = new TRain.ActionSequence([action, actionCall]);
			}
			TRain.actionMgr.addAction(action, display, false, flag);
		}
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
		export function startActCB(display: egret.DisplayObject, actions: Array<TRain.Action>, cb?: Function, flag?: number) {
			let actionSeq = new TRain.ActionSequence();
			actionSeq.setActions(actions);
			if (cb) {
				let actionCall = new TRain.ActionCallDo();
				actionCall.setCall(cb, self);
				actionSeq.addAction(actionCall);
			}
			TRain.actionMgr.addAction(actionSeq, display, false, flag);
		}
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
		export function flipCardCB(display: cui.Image, scr: string, scaleX: number, closeTm?: number, openTm?: number, cb?: Function, flag?: number) {
			let self = this;
			let action = new TRain.ActionPropTo(closeTm || 250, 1, { scaleX: 0 });
			action.setEaseFun(EaseUtil.quadIn);
			let action1 = new TRain.ActionPropDo(0, { source: scr });
			let action2 = new TRain.ActionPropTo(openTm || 150, 1, { scaleX: scaleX });
			action2.setEaseFun(EaseUtil.quadOut);
			display.anthorPerX = 0.5;
			self.startActCB(display, [action, action1, action2], cb, flag);
		}
		/**
		 * @param missTm:什么时间消失
		 * 
		 * @param LookTm:什么时间出现
		 */
		export function flashAni(display: egret.DisplayObject, missTm: number, endTm: number, cb?: Function, flag?: number) {
			let action = new TRain.ActionPropDo(missTm, { visible: false });
			let action2 = new TRain.ActionPropDo(endTm, { visible: true });
			startActCB(display, [action, action2], cb, flag);
		}
		//来回缓动
		export function sin(t: number) {
			return Math.sin(t * Math.PI);
		}
		export function secToStr(sec: number): string {
			let min = Math.floor(sec / 60);//分
			sec = sec - min * 60;//秒
			let minStr = min > 9 ? min : ("0" + min);
			let secStr = sec > 9 ? sec : ("0" + sec);
			return minStr + ":" + secStr;
		}
		/**
		 * 
		 * @param parent 存放星星的容器
		 * @param form 初始位置
		 * @param to 结束位置
		 * @param flyTm 飞行时间
		 * @param flag 标记
		 * @param cb 返回函数
		 */
		export function flyStarAni(parent: cui.Group, form: { x: number, y: number }, to: { x: number, y: number }, flyTm?: number, flag?: number, cb?: Function) {
			let self = this;
			form.y -= 80;
			TRain.soundMgr.playSFX(confConsts.SoundTp.jiesuan2);
			flyTm = flyTm || 1000;
			for (let i = 0; i < 5; i++) {
				let imgstar = new cui.Image(); //todo 粒子效果
				imgstar.source = i == 0 ? confConsts.ComResTp.xing : confConsts.ComResTp.star;
				imgstar.anthorPerX = 0.5;
				imgstar.anthorPerY = 0.5;
				imgstar.scaleX = imgstar.scaleY = 1 - i * 0.1;

				let changeTm: number = i * 55;
				let actionDelay = new TRain.ActionCallDo(changeTm);
				actionDelay.setCall(function () {
					parent.addChild(imgstar);
				}, self);
				let actionX: TRain.ActionPropTween = new TRain.ActionPropTween(
					flyTm,
					1,
					{
						x: { b: form.x, r: to.x - form.x }
					})
				let actionSeqX = new TRain.ActionSequence([actionDelay, actionX]);
				TRain.actionMgr.addAction(actionSeqX, imgstar, false, flag);
				let actionY: TRain.ActionPropTween = new TRain.ActionPropTween(
					flyTm + changeTm,
					1,
					{
						y: { b: form.y, r: to.y - form.y }
					})
				actionY.setEaseFun(EaseUtil.quintIn);
				let actionCall = new TRain.ActionCallDo();
				actionCall.setCall(function () {
					let index = parent.getChildIndex(imgstar);
					if (index != -1) parent.removeChild(imgstar);
					if (cb) cb();
				}, self);
				let actionSeqY = new TRain.ActionSequence([actionY, actionCall]);
				TRain.actionMgr.addAction(actionSeqY, imgstar, false, flag);
			}
		}
		/**
		 * 
		 * @param parent 父容器
		 * @param gold 金币
		 * @param form 出发点
		 * @param to 结束点
		 * @param flag 标记
		 */
		export function showGold(parent: cui.BaseContainer, gold: number, form: { x: number, y: number }, to: { y: number }, flag?: number) {
			let self = this;
			let winGold = new cui.BitmapLabel();
			winGold.font = confConsts.ComFontTp.winMoney;
			winGold.text = "+" + DataFormat.convertYuanString3(gold);
			winGold.x = form.x;
			winGold.y = form.y;
			winGold.alpha = 0;
			parent.addChild(winGold);
			let action: TRain.ActionPropTo = new TRain.ActionPropTo(300, 1, { alpha: 1 });
			let action1: TRain.ActionPropTo = new TRain.ActionPropTo(500, 1, { y: to.y });
			let action2: TRain.Action = new TRain.Action(1000);
			let action3: TRain.ActionPropTo = new TRain.ActionPropTo(800, 1, { alpha: 0 });
			let actionCall: TRain.ActionCallDo = new TRain.ActionCallDo();
			actionCall.setCall(function () {
				if (winGold.parent) parent.removeChild(winGold);
			}, self);
			let actionSeq = new TRain.ActionSequence([action, action1, action2, action3, actionCall]);
			TRain.actionMgr.addAction(actionSeq, winGold, false, flag);
		}

		export function createParticle(nm: string) {
			let conf = dataMgr.generalMo.partConf[nm];

			let sys = new cui.ParticleSys(conf);
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

		/**
		 * 金币显示滚动增加
		 * @param fromGold   初始金币
		 * @param fromGold   最终金币
		 * @param fromGold   你的label或者bitmaplabel
		 * @param fromGold   是否是bitmaplabel  是就true不是false
		 * @param fromGold   就是self
		 * @param fromGold   游戏id
		 */
		export function showRollGold(fromGold: number, toGold: number, target: any, isBit: boolean, thisObj: any, flag: number, hasYuan: boolean = true) {
			//每次变化间隔时间
			let duration = 5;
			//变化次数
			let count = 1;
			//金币差
			let lerp = toGold - fromGold;
			let gold: number;
			//每次变化数量
			let num = ~~(lerp / count);
			let temp = !isBit ? TRain.langMgr.getTxt(LangGrp.mainLang, langConsts.mainLang.RMBText) : moneyTp.y
			for (let i = 1; i <= count; i++) {
				let n = TRain.core.addDelayDo(function () {
					gold = Math.floor(DataFormat.convertGold((fromGold + i * num)));
					target.text = hasYuan ? (~~DataFormat.convertGold(fromGold + i * num) + temp) : gold;
					// target.text = hasYuan ? DataFormat.convertYuanString((fromGold + i * num), !isBit) : gold;
					TRain.core.rmvDelayDoByID(n);
				}, thisObj, duration * (i - 1), flag);
			}
			if ((fromGold + count * num) != toGold) {
				let n2 = TRain.core.addDelayDo(function () {
					gold = Math.floor(DataFormat.convertGold(toGold));
					target.text = hasYuan ? (~~DataFormat.convertGold(toGold) + temp) : gold;
					// target.text = hasYuan ? DataFormat.convertYuanString(toGold, !isBit) : gold;
					TRain.core.rmvDelayDoByID(n2);
				}, thisObj, duration * count, flag);
			}
		}

		export function getQRCodeTeam(id: number, codeTag: number, cb: Function) {
			let key = "QRteamId" + id + "_" + codeTag;
			let val = egret.localStorage.getItem(key);
			if (val) {
				cb(val);
			} else {
				let LinkUrl = getQRLinkUrl(id, codeTag);
				let args = { playerid: String(id), link: LinkUrl };
				HttpUtil.askCreateImg(args, false, function (data: any) {
					let base64 = "";
					if (data) {
						if (data.info) {
							base64 = data.info
						}
						egret.localStorage.setItem(key, base64);
						cb(base64);
					}
				}, self);
			}
		}

		export function getQRCodePly(cb: Function) {
			let myID = game.dataMgr.accMo.getData().aid;
			let key = "QRPlyId" + myID;
			let val = egret.localStorage.getItem(key);
			if (val) {
				cb(val);
			} else {
				let LinkUrl = getQRLinkUrl(myID);
				let args = { playerid: String(myID), link: LinkUrl };
				HttpUtil.askCreateImg(args, false, function (data: any) {
					let base64 = "";
					if (data) {
						if (data.info) {
							base64 = data.info
						}
						egret.localStorage.setItem(key, base64);
						cb(base64);
					}
				}, self);
			}
		}

		export function getQRLinkUrl(id: number, codeTag?: number, type: number = 1) {
			let ID = id;
			let tag = codeTag;
			let playerID = "";
			if (type == 1) {
				playerID = type + "|" + String(ID);
			} else if (type == 2) {
				playerID = type + "|" + String(ID) + ":" + tag;
			}
			let signKey = Base64.base64Encode(playerID);
			let channelID = CONF.shareId;
			let url = CONF.erweima + channelID + "/?channelId=" + channelID + "&recommendId=" + signKey;
			return url;
		}
	}
}
