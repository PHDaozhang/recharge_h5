module game {

	export class HomeView extends UIFullFW {
		public skRoleTalk: cui.Label;
		public skHeadImg: cui.Image;
		public skName: cui.Label;
		public skId: cui.Label;
		public skHeadFrame: cui.Image;
		public skGold: cui.BitmapLabel;
		public skBHead: cui.SimpleButton;
		public skBSet: cui.ScaleButton;
		public skGames: cui.DataGroup;
		public skNotify: cui.Group;
		public skMail: cui.ScaleButton;
		public skGirlImg: cui.Image;
		public skBFull: cui.ScaleButton;
		public skBLang: cui.ScaleButton;
		// public skCopyHttp: cui.SimpleButton;
		public skExtension: cui.SimpleButton;
		public skAgent: cui.SimpleButton;
		public skBinding: cui.SimpleButton;
		public skAniBinding: cui.UIMovieClip;
		public skReward: cui.SimpleButton;
		public skTask: cui.SimpleButton;
		public skLeftGrp: cui.Group;
		public skTipBtn: cui.SimpleButton;
		public skTipBtn1: cui.SimpleButton;
		public skNotice: cui.SimpleButton;
		//救济金
		public skAniRelief: cui.UIMovieClip;
		public skRelief: cui.SimpleButton;
		//首充
		public skFirstRecharge: cui.SimpleButton;
		public skService: cui.ScaleButton;
		public skClass: cui.ScaleButton;
		public skClassGrp: cui.MenuGroup;
		public skGameName: cui.Label;
		public skLeft: cui.SimpleButton;
		public skRight: cui.SimpleButton;
		public skGameSc: cui.Scroller;
		public skClassGroup: cui.Group;
		public skLastGmBtn: cui.SimpleButton;
		public skLast: cui.Image;
		public skAniTask: cui.UIMovieClip; //限时悬赏
		public skAniReward: cui.UIMovieClip; //七日奖励
		public skProfit: cui.ScaleButton;
		// public skAniLeft:cui.UIMovieClip;
		// public skAniRight:cui.UIMovieClip;
		public _classFlag = 0;
		public skImgDone: cui.Image;
		public _loginCount: number;
		public skGrp: cui.Group;

		private _notifyUI: NotifyUI;
		private _actionLoop: TRain.ActionLoop;
		private _gamesBeginX: number;
		// public _tipNum:number;
		private _tempGameId: number;

		public constructor() {
			super();

			let self = this;
			self.skinName = "gameHallSkin";
			self._notifyUI = new NotifyUI();
			self._loginCount = 0;
			// self._tipNum = 0;
		}

		public childrenCreated() {
			super.childrenCreated();

			let self = this;


			self.skTipBtn1.setTarget(function () {
				TRain.core.rmvDelayDoByFlag(self._tempGameId);
				TRain.core.rmvFrameDo(self, self.frameFunClose);
				TRain.core.rmvFrameDo(self, self.frameFunOpen);
				if (self.skGrp.scaleX == 1 && self.skGrp.scaleY == 1) {
					//打开状态
					self.randomTxt();
					TRain.core.addFrameDo(self.frameFunClose, self, true, 5000);
					TRain.core.addFrameDo(self.frameFunOpen, self, true, 30000);
				} else if (self.skGrp.scaleX == 0 && self.skGrp.scaleY == 0) {
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
			let accMo = dataMgr.accMo;
			let accData = dataMgr.accMo.getData();
			let sevenDay_Done: boolean = accData.sevenday_done;
			self.skTask.visible = (!!sevenDay_Done && dataMgr.gameMo.getData().length > 7) ? true : false;
			self.skReward.visible = (!sevenDay_Done && dataMgr.gameMo.getData().length > 7) ? true : false;
			self._gamesBeginX = self.skGameSc.x;
			self.skBHead.setTarget(function () {
				gameScene.openPopup(new PersonCenter());
			}, self);
			self.skBSet.setTarget(function () {
				//打开设置界面
				TRain.soundMgr.playSFX(confConsts.SoundTp.click);
				// self.skBSet.sound ="click";
				// self.skBSet.sound = confConsts.SoundTp.click;
				let view = new SettingView();
				gameScene.openPopup(view);
			}, self);
			self.skMail.setTarget(function () {
				//打开邮件界面
				TRain.soundMgr.playSFX(confConsts.SoundTp.click);
				// self.skMail.sound ="click";
				let view = new MailView();
				gameScene.openPopup(view);
			}, self);
			self.skService.setTarget(HttpUtil.gotoKeFu, HttpUtil);
			self.skClass.setTarget(function () {
				if (self._classFlag == 0) {
					self.skClassGroup.addChildAt(self.skClassGrp, 4);
					self.skClassGrp.visible = true;
					self._classFlag = 1;
				} else {
					self.skClassGroup.removeChildAt(4);
					self._classFlag = 0;
				}
			}, self);
			self.skProfit.setTarget(function(){
				TRain.soundMgr.playSFX(confConsts.SoundTp.click);
			},self);
			self.skLeft.setTarget(function () {
				// if(self.skGames.scrollH == 0){
				// 	self.skLeft.visible = false;
				// 	self.skRight.visible = true;
				// }else 
				if (self.skGames.scrollH < 700) {
					self.skGameSc.setScrollLeft(0, 500);
					// self.skLeft.visible = false;
					// self.skRight.visible = true;
				} else {
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
			let list = self.skGames;
			list.itemRender = GameTile;
			list.itemSkinName = "gameTileSkin";
			list.dataProvider = new cui.ArrayCollection();
			list.addEventListener(cui.UI_EVENT.ITEM_TAP, function (e: egret.Event) {
				TRain.soundMgr.playSFX(confConsts.SoundTp.click);
				// self.skBSet.sound ="click";
				gameScene.startGame(e.data.tag);
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
				gameScene.showHallUI(UITag.extension);
			}, self);
			self.skAgent.setTarget(function () {
				gameScene.showHallUI(UITag.extension);
			}, self);
			// self.skBinding.setTarget(self.bindGift, self);
			// self.skReward.setTarget(function () {
			// 	dataMgr.generalMo.sendGetQuestlist(false);
			// }, self);
			self.skTask.setTarget(function () {
				//打开限时悬赏界面
				TRain.soundMgr.playSFX(confConsts.SoundTp.click);
				gameScene.openPopup(new LimitReward2());
				//generalMo.sendGetQuestlist();
			}, self);
			self.skReward.setTarget(function () {
				//七日奖励
				TRain.soundMgr.playSFX(confConsts.SoundTp.click);
				GameUtil.playClickSound();
				generalMo.sendGetQuestlist();
				// gameScene.openPopup(new AchieveShareDialog());
			}, self);
			self.setNotifyParent(null);
			//刚登陆游戏，需要弹出某个窗口
			//也需要判断是游客还是用户
			let generalMo = dataMgr.generalMo;
			if (accMo.gameId == 0) {
				if (accMo.havePopNotice()) gameScene.openPopup(new NoticeView(noticeState.hallPop),null,true);
			}
			// if (accMo.gameId == 0) {
			// 	self.bindGift();
			// }
			generalMo.addListener(General_EVT.Quest_List_Result, function () {
				// if (!sevenDay_Done && generalMo.isOpen) {
				//七日奖励
				// let view = new SevenRewardView();
				// view.open(gameScene.homeUI);
				gameScene.showHallUI(UITag.sevenReward);
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
			generalMo.addListener(General_EVT.ShowGameClass, function (tag) {
				// self.showGameClass(tag);
				self.skClassGrp.selectTag = tag;
			}, self);
			accMo.addListener(AccountMo_EVT.bin_phone_fin, self.setBindOrSave, self);
			generalMo.addListener(General_EVT.IsDone, function (data) {
				self.skImgDone.visible = (data && dataMgr.gameMo.getData().length > 7) ? true : false;
			}, self);
			self.skImgDone.visible = (generalMo.isDone && dataMgr.gameMo.getData().length > 7) ? true : false;
			// self._tipNum = 0;
			// TRain.core.addFrameDo(self.randomTxt, self, true, 2000);
			self.skNotice.setTarget(function () {
				TRain.soundMgr.playSFX(confConsts.SoundTp.click);
				gameScene.openPopup(new NoticeView(noticeState.hall));
				//gameScene.openPopup(new ActMainView());
			}, self);

			//注册游戏后首次登陆游戏，调用定位，该功能用于玩家发展下线用
			if (accMo.isNew) {
				let request = new egret.HttpRequest();
				request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				request.responseType = egret.HttpResponseType.TEXT;
				request.open("https://www.ccatv.pro/channel/location?PlayerId=%s" + game.dataMgr.accMo.getData().aid + "&PackageChannelId=%s" + CONF.shareId, egret.HttpMethod.POST);
				request.send();
				request.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
					let req = <egret.HttpRequest>e.currentTarget;
					let data = JSON.parse(req.response);
					if (DEBUG) console.log("data  ==  ", data);
				}, this);
				request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (e) {
					if (DEBUG) console.log("get error : " + e);
				}, this);
			}

			self.showNoticeNum();
			generalMo.addListener(General_EVT_POP.backInfo,self.openFunPop,self);
			dataMgr.generalMo.sendPerformList(true);
		}

		public showNoticeNum() {
			let self = this;
			let noticeNum = dataMgr.accMo.getNoReadNum();
			let inGrp = self.skNotice.getChildAt(1) as cui.Group;
			inGrp.visible = noticeNum > 0;
			(inGrp.getChildAt(1) as cui.BitmapLabel).text = String(noticeNum);
		}
		private updateSevenDayBtn() {
			let self = this;
			let accMo = dataMgr.accMo;
			let sevenDay_Done: boolean = accMo.getData().sevenday_done;
			let isOpen = dataMgr.gameMo.getData().length > 7;
			self.skTask.visible = (!!sevenDay_Done && isOpen) ? true : false;
			self.skReward.visible = (!sevenDay_Done && isOpen) ? true : false;
			//弹出系统解锁
			if (!!sevenDay_Done && dataMgr.accMo.gameId == 0 && isOpen) {
				let view = new LimitRwOpen();
				gameScene.openPopup(view);
			}
		}
		private setBindOrSave() {
			let self = this;
			self.skBinding.visible = dataMgr.accMo.getData().isFormal ? false : true;
			self.skRelief.visible = dataMgr.accMo.getData().isFormal ? true : false;
		}

		public menuClick(item: cui.MenuItemImage): void {
			let self = this;
			let tag = item.tag;
			self.showGameClass(tag);
			// let index = self.getChildIndex(self.skLeft);
			// if (index > 0) self.removeChild(self.skLeft);
		}

		private bindGift(): void {
			TRain.soundMgr.playSFX(confConsts.SoundTp.click);
			let view = dataMgr.accMo.getData().isFormal ? new SaveMoneyDialog() : new BindGiftDialog();
			gameScene.openPopup(view);
		}

		public setNotifyParent(p: cui.BaseContainer, maskWidth?: number) {
			this._notifyUI.setParent(p || this.skNotify, maskWidth);
		}
		//移除时 使用
		public rmvNotifyParent(p: cui.BaseContainer) {
			this._notifyUI.rmvParent(p);
		}

		private frameFunClose() {
			let self = this;
			self.outOrIn(false);
		}

		private frameFunOpen() {
			let self = this;
			self.outOrIn(true);
			self.randomTxt();
		}

		protected onShow(stage: egret.Stage) {
			super.onShow(stage);



			let self = this;
			self.skGrp.scaleX = self.skGrp.scaleY = 0;
			self._tempGameId = TRain.actionMgr.getUnitTag();
			let num = TRain.core.addDelayDo(function () {
				self.outOrIn(true);
				self.randomTxt();

				TRain.core.addFrameDo(self.frameFunClose, self, true, 5000);
				TRain.core.addFrameDo(self.frameFunOpen, self, true, 30000);
				TRain.core.rmvDelayDoByID(num);
			}, self, 2000, self._tempGameId);



			// TRain.core.addFrameDo(self.randomTxt, self, true, 5000);
			if (TRain.soundMgr.musicState) TRain.soundMgr.playMusic(confConsts.SoundTp.BG309);

			let gameModel = dataMgr.gameMo;
			let lastGmId = GameUtil.getLocal(GameUtil.LocalKey.LAST_GAME);
			let gameConf = gameModel.getGmdConf(lastGmId);
			if (gameConf != null) {
				self.skLast.source = "hall@txt_lastPlay";
				self.skGameName.text = gameConf.nm;
				self.skLastGmBtn.setTarget(function () {
					TRain.soundMgr.playSFX(confConsts.SoundTp.click);
					gameScene.startGame(lastGmId);
				}, self);
			} else {
				self.skLast.source = "hall@txt_popular";
				self.skGameName.text = gameModel.getGmdConf(confConsts.GameTp.doudizhu).nm;
				self.skLastGmBtn.setTarget(function () {
					TRain.soundMgr.playSFX(confConsts.SoundTp.click);
					gameScene.startGame(confConsts.GameTp.doudizhu);
				}, self);
			}
			TRain.actionMgr.addAction(self._actionLoop, self.skGirlImg, false);
			TRain.core.stage.addEventListener(egret.TouchEvent.TOUCH_END, self.showArrow, self);
		}

		protected onHide() {
			super.onHide();
			let self = this;


			TRain.actionMgr.rmvActsByTag(self._tempGameId);
			TRain.core.rmvDelayDoByFlag(self._tempGameId);
			TRain.core.rmvFrameDo(self, self.frameFunClose);
			TRain.core.rmvFrameDo(self, self.frameFunOpen);


			// TRain.core.rmvFrameDo(self, self.randomTxt);
			self._actionLoop.stop();
			TRain.core.stage.removeEventListener(egret.TouchEvent.TOUCH_END, self.showArrow, self);
		}
		private flipGirlGrp(): void {
			let self = this;
			let action = new TRain.ActionPropTween(3000, 1, { vCenter: { b: 60, r: -10 } });
			action.setEaseFun(UIUtils.sin);
			let actionLoop = self._actionLoop = new TRain.ActionLoop(action);
		}

		private updateHead(): void {
			let self = this;
			let accModel = dataMgr.accMo;
			let accData = accModel.getData();
			//获取当前头像
			self.skHeadImg.source = DataFormat.getHeadIcon(accData.icon_custom);
			self.skHeadFrame.source = confConsts.ComResTp.oldFrame + accData.viplvl;
			//当前玩家名字
			// if(accData.nickname.length > 12){
			// 	self.skName.text = accData.nickname.substr(0,12) + "...";
			// }else{
			// 	self.skName.text = accData.nickname;
			// }
			self.skName.text = DataFormat.formatName(accData.nickname, 12, 12);
			//当前玩家id
			self.skId.text = "ID：" + accData.aid;
			self.skGold.text = String(DataFormat.convertYuanString2(accData.gold, false));
		}

		//美女说话框弹出和收回动画
		private outOrIn(isOut: boolean, cb?: Function) {
			let self = this;
			let duration = 200;
			let temp = isOut ? 1 : 0;
			UIUtils.move(self.skGrp, { scaleX: temp, scaleY: temp }, EaseUtil.quadOut, duration, undefined, cb, self._tempGameId);
		}

		// public _flag:number;
		//随机显示美女讲的话
		private randomTxt(): void {
			let self = this;
			let temp = dataMgr.generalMo.tipConf;
			let len = temp.length;
			// temp.push(langConsts.mainLang.LobbyUITips0);
			// temp.push(langConsts.mainLang.LobbyUITips1);
			// temp.push(langConsts.mainLang.LobbyUITips2);
			// temp.push(langConsts.mainLang.LobbyUITips3);
			// temp.push(langConsts.mainLang.LobbyUITips4);
			// temp.push(langConsts.mainLang.LobbyUITips5);
			// temp.push(langConsts.mainLang.LobbyUITips6);
			let num = Math.ceil(Math.random() * len - 1);
			// if(self._tipNum > 5)self._tipNum = 0;
			//self.skRoleTalk.text = TRain.langMgr.getTxt(LangGrp.mainLang, temp[num]);
			self.skRoleTalk.text = temp[num].txt;
			// self._tipNum++;
			// self._flag = TRain.core.addFrameDo(function(){
			// 	self.skRoleTalk.text = "";
			// 	TRain.core.rmvDelayDoByID(self._flag);
			// },self, false, 5000);
		}

		//游戏分类显示
		private showGameClass(tag?: number): void {
			let self = this;
			let gameModel = dataMgr.gameMo;
			let beginX = self._gamesBeginX;
			let gameSc = self.skGameSc;
			let curSvrList = gameModel.getData();
			let showGames = [];
			for (let i = 0; i < curSvrList.length; i++) {
				let info: NET_CONF.msg_game_info = curSvrList[i];
				let gameId = info.gameid;
				let gameConf = gameModel.getGmdConf(gameId);
				if (gameConf && !!gameConf.isOpen) {
					if (!tag || gameConf.class == tag || tag == 5) {
						showGames.push({ ani: gameConf.file, tag: gameId, ud: gameConf });
					}
				}
			}
			showGames.sort(function (a: any, b: any) {
				return a.ud.wg - b.ud.wg;
			});
			let scW = gameSc.width;
			let maxNum = Math.ceil(scW / 175) +2;
			if(maxNum % 2 != 0) maxNum++; // 计算显示的个数 偶数个
			for (let i = 0, len = showGames.length; i < len; i++) {
				let data = showGames[i];
				let idx = i > maxNum-1 ? i - maxNum : i;
				let isLook = i < maxNum;
				data.state = { alpha: 1, tm: idx, isClick: isLook };
			}
			TRain.actionMgr.rmvActsByTar(gameSc);
			self.skGames.dataProvider.source = showGames;
			gameSc.x = beginX + 200;
			UIUtils.move(gameSc, { x: beginX }, EaseUtil.quadInOut, 300);
			gameSc.setScrollLeft(0, 500); //第一个是坐标，滚动到哪个位置
		}

		private showArrow(e: Event): void {
			let self = this;
			//if( !(e && e.target instanceof cui.DataGroup &&  e.target instanceof cui.SimpleButton) ) return;
			if (!e && self._loginCount < 1) {
				self._loginCount++;
				return;
			}
			let isShow1 = true;
			let isShow2 = true;
			if (self.skGames.scrollH + self.skGames.width + 100 >= self.skGames.contentWidth) {
				isShow2 = false;
			}
			if (self.skGames.scrollH <= 10) {
				isShow1 = false;
			}
			if (isShow1) {
				self.addChild(self.skLeft);
			} else {
				let index = self.getChildIndex(self.skLeft);
				if (index > 0) self.removeChild(self.skLeft);
			}
			if (isShow2) {
				self.addChild(self.skRight);
			} else {
				let index = self.getChildIndex(self.skRight);
				if (index > 0) self.removeChild(self.skRight);
			}
			// self.skLeft.visible = isShow1;
			// self.skRight.visible = isShow2;
		}

		//在大厅中打开相关的弹出框
		public openFunPop(isNotEvt?:boolean){
			let self = this;
			//首先判断哪些是在这次里面是需要弹出的
			let gameMo = dataMgr.generalMo;
			let hallFunPopConfs = gameMo.getFunPopInfos();
			let i = 0,len = hallFunPopConfs.length;
			let accData = dataMgr.accMo.getData();
			let showArr:HallFunPopConf[] = [];
			for(;i<len;i++){
				let hallFunPopConf = hallFunPopConfs[i];
				let proBVal = self.getIsPopProB(hallFunPopConf.Probability);
				switch(hallFunPopConf.ID){
					case confConsts.hallFunTp.limitReward:
						if(!!hallFunPopConf.IsShow && gameMo.isOpenLimitRw && proBVal){
							showArr.push(hallFunPopConf);
						}
						break;
					case confConsts.hallFunTp.bindReward:
						if(!!hallFunPopConf.IsShow && proBVal && isNotEvt){
							//获取今天是否弹出过
							let svrMsTm = TimeUtil.getSvrMS();
							let localSvrTm = parseInt(GameUtil.getLocal(GameUtil.LocalKey.ISOVERPOP_BINDREWARD)) ;
							let isPop = TimeUtil.equalsDay(localSvrTm,svrMsTm);
							if(!accData.isFormal && !isPop){
								//gameScene.openPopup(new BindGiftDialog());
								GameUtil.setLocal(GameUtil.LocalKey.ISOVERPOP_BINDREWARD,String(svrMsTm));
								showArr.push(hallFunPopConf);
							}
						}
						break;	
					case confConsts.hallFunTp.firstRechange:
						if(!!hallFunPopConf.IsShow && proBVal){
							//获取今天是否弹出过
							let svrMsTm = TimeUtil.getSvrMS();
							let localSvrTm = parseInt(GameUtil.getLocal(GameUtil.LocalKey.ISOVERPOP_FIRSTRECHANGE)) ;
							let isPop = TimeUtil.equalsDay(localSvrTm,svrMsTm);
							if((accData.Recharged > 0) && !isPop){
								//gameScene.openPopup(new BindGiftDialog());
								//打开首充界面
								GameUtil.setLocal(GameUtil.LocalKey.ISOVERPOP_FIRSTRECHANGE,String(svrMsTm));
								showArr.push(hallFunPopConf);
							}
						}
						break;
					case confConsts.hallFunTp.allAgent:
						if(!!hallFunPopConf.IsShow && proBVal){
							let createTm = accData.create_time;
							let svrMsTm = TimeUtil.getSvrMS();
							let isEqDay = TimeUtil.equalsDay(createTm * 1000,svrMsTm);
							let list = gameMo.getPerformanceList();
							if(!!hallFunPopConf.IsShow && list && list.length > 0 && !isEqDay){
								showArr.push(hallFunPopConf);
							}
						}
						
						break;
					case confConsts.hallFunTp.sevenDay:
						if(!!hallFunPopConf.IsShow && proBVal){
							let day= dataMgr.generalMo.curDay;
							let list = dataMgr.generalMo.getTaskByDay(day);
							if(list && list.length >0){
								let count:number = 0;
								for(let i = 0 ;i<list.length;i++){
									let sevenDayData = list[i];
									if(sevenDayData.count >= sevenDayData.cfg.completeCount && !sevenDayData.received){
										count ++;
									}
								}
								if(count == list.length)showArr.push(hallFunPopConf);
							}
						}
						break;	
					case confConsts.hallFunTp.runWater:
						break;
				}
			}
			showArr.sort(function(a:HallFunPopConf,b:HallFunPopConf){
				if(a.Sort == b.Sort){
					return a.ID - b.ID;
				}else{
					return a.Sort - b.Sort;
				}
			});
			let val:number = 500;
			for(i=0,len = showArr.length;i<len;i++){
				let hallFunPopConf = showArr[i];
				let openView:UIPopup; 
				if(hallFunPopConf.ID != confConsts.hallFunTp.sevenDay){
					switch(hallFunPopConf.ID){
						case confConsts.hallFunTp.limitReward:
							openView = new LimitReward();
							break;
						case confConsts.hallFunTp.bindReward:
							openView = new BindGiftDialog();
							break;
						case confConsts.hallFunTp.firstRechange:
							break;
						case confConsts.hallFunTp.allAgent:
							openView = new ExtensionPop();
							break;
						case confConsts.hallFunTp.runWater:
							break;
					}
					openView.pri = val;
					val -=10;
					gameScene.openPopup( openView);
				}else{
					if(i == 0){
						gameScene.showHallUI(UITag.sevenReward);
					}else{
						gameMo.addListener(General_EVT_POP.Close,function(){
							gameScene.showHallUI(UITag.sevenReward);
						},self);
					}
				}
			}

		}
		//根据弹出概率判断是否弹出
		private getIsPopProB(proBVal:number){
			let self = this;
			let len = 100/proBVal;
			let temProB:number[] = [];
			for(let i = 0 ;i<len;i++){
				temProB.push(i);
			}
			//
			let val = Math.floor(Math.random() * len);
			return val == temProB[0];
		}
	}
}