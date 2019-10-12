module game {
	export interface IBtnHanderTeamList {
		btnClick(item: ExtensionPerformTeamList, num)
	}

	let yjIndex: number = 0;
	export class ExtensionView extends UIFullFW {
		public skBack: cui.ScaleButton;

		private skdiGrp: cui.Group;
		private skdiYJGrp: cui.Group;
		private skdlXian: cui.Group;
		private skYJxian: cui.Group;
		private skdiTeam: cui.Group;

		public skBtnGrp: cui.MenuGroup;
		public skYeJiGrp: cui.MenuGroup;
		public skteamGrp: cui.MenuGroup;
		public skChaxun: cui.MenuGroup;

		public skdaili0: cui.Group;
		public skGet: cui.ScaleButton;
		public skPay: cui.Label;					//从服务器获取数据
		public skVip: cui.Label;					//从配置读取
		public skYeji: cui.Label;					//从配置读取
		public skList: cui.DataGroup;


		public skdaili1: cui.Group;
		public skteamNum: cui.BitmapLabel;
		public skyesNew: cui.BitmapLabel;
		public skmonthNew: cui.BitmapLabel;
		public skteamtoday: cui.Label;
		public skselftoday: cui.Label;
		public skdltoday: cui.Label;
		public skteamtodaygold: cui.Label;
		public skselftodaygold: cui.Label;
		public skdltodaygold: cui.Label;
		public skteamyes: cui.Label;
		public skselfyes: cui.Label;
		public skdlyes: cui.Label;
		public skteamyesgold: cui.Label;
		public skselfyesgold: cui.Label;
		public skdlyesgold: cui.Label;
		public skmyyj: cui.Label;
		public sktodayyj: cui.Label;
		public skmyweek: cui.Label;
		public skweekyj: cui.Label;
		public skmyZY: cui.Label;
		public skmyZYyes: cui.Label;
		public skZS: cui.Label;
		public skZSyes: cui.Label;


		public skdaili2: cui.Group;
		public skDLList: cui.DataGroup;
		public skLast: cui.ScaleButton;
		public skNext: cui.ScaleButton;
		public skFirst: cui.ScaleButton;
		public skEnd: cui.ScaleButton;
		public skFind: cui.ScaleButton;
		public skCancle: cui.ScaleButton;
		public skX: cui.ScaleButton;
		public skName: cui.EditableText;
		public skGLPage0: cui.BitmapLabel;
		public skGLPage1: cui.BitmapLabel;


		public skdaili3: cui.Group;
		public skplayerId: cui.EditableText;
		public skSearch: cui.ScaleButton;
		public skSearchGrp: cui.Group;
		public skupId: cui.Label;
		public skteamnum: cui.Label;
		public sktodaygold: cui.Label;
		public skweekgold: cui.Label;
		public sktime: cui.Label;

		public skdaili4: cui.Group;
		public skCopy: cui.ScaleButton;
		public skNet: cui.Label;
		public skerwei: cui.Base64Img;
		public skQQ: cui.ScaleButton;
		public skWX: cui.ScaleButton;


		public skdaili5: cui.Group;
		public skGrp: cui.Group;
		public skInGrp: cui.Group;


		public skdaili6: cui.Group;
		public skteamName: cui.EditableText;
		public skCreateTeam: cui.ScaleButton;
		public skSearchTeam: cui.ScaleButton;
		public skclean: cui.ScaleButton;
		public skTeamList: cui.DataGroup;

		public skTeam: cui.Group;
		public skTeamBack: cui.ScaleButton;
		public skScerchName: cui.EditableText;
		public skteamScerch: cui.ScaleButton;
		public skTeamX: cui.ScaleButton;
		public skTeamCancle: cui.ScaleButton;
		public skteamList: cui.DataGroup;
		public skTeamLast: cui.ScaleButton;
		public skTeamNext: cui.ScaleButton;
		public skTeamFirst: cui.ScaleButton;
		public skTeamEnd: cui.ScaleButton;
		public skpaixianNum: cui.BitmapLabel;
		public skpaixianNew: cui.BitmapLabel;
		public skTeamPage0: cui.BitmapLabel;
		public skTeamPage1: cui.BitmapLabel;


		public skyejiGrp: cui.Group;
		public skYejiBack: cui.ScaleButton;
		public skYJLast: cui.ScaleButton;
		public skYJNext: cui.ScaleButton;
		public skYJFirst: cui.ScaleButton;
		public skYJEnd: cui.ScaleButton;
		public skyejiBG: cui.Image;
		public skyejiPic: cui.Image;
		public skDLYJlist: cui.DataGroup;
		public skYJPage0: cui.BitmapLabel;
		public skYJPage1: cui.BitmapLabel;

		//private _notifyUI: NotifyUI;
		private _itemPro: cui.ArrayCollection;
		private _itemProPerformance: cui.ArrayCollection;
		private _itemProTeam: cui.ArrayCollection;
		private _itemProTeamList: cui.ArrayCollection;
		private _itemExtendList: cui.ArrayCollection;
		private _dailiPage: number = 1;
		private _yejiPage: number = 1;
		private _teamPage: number = 1;
		private _openId: number = 0;
		public constructor(openid = 0) {
			super();
			let self = this;
			self.skinName = "gameExtendSkin";
			//self._notifyUI = new NotifyUI();
			self._openId = openid;
		}

		public childrenCreated() {
			super.childrenCreated();
			let self = this;
			let generalMo = dataMgr.generalMo;
			generalMo.sendPerformanceInfo();
			generalMo.addListener(<any>General_EVT_Dai.Gain_result, self.showGain, self);
			generalMo.addListener(<any>General_EVT_Dai.GetGain, self.showGain, self);
			generalMo.addListener(<any>General_EVT_Dai.Perform, self.showPerforms, self);
			generalMo.addListener(<any>General_EVT_Dai.PerformList, self.showPerformsList, self);
			generalMo.addListener(<any>General_EVT_Dai.PerformChild, self.showPerformsChild, self);
			generalMo.addListener(<any>General_EVT_Dai.PerformTeamlist, self.showPerformsTeamlist, self);
			generalMo.addListener(<any>General_EVT_Dai.PerformTeaminfo, self.showTeamInfo, self);
			self.skdaili0.visible = true;

			self.skdiGrp.visible = true;
			self.skdiYJGrp.visible = false;
			self.skdlXian.visible = true;
			self.skYJxian.visible = false;
			self.skdiTeam.visible = false;

			let list0 = self.skList;
			list0.itemRender = extensionWuXian;
			list0.dataProvider = self._itemPro = new cui.ArrayCollection();

			let list1 = self.skDLList;
			list1.itemRender = ExtensionPerformList;
			list1.dataProvider = self._itemProPerformance = new cui.ArrayCollection();

			let list2 = self.skteamList;
			list2.itemRender = ExtensionPerformTeamMemberList;
			list2.dataProvider = self._itemProTeamList = new cui.ArrayCollection();

			let list3 = self.skTeamList;
			list3.itemRender = ExtensionPerformTeamList;
			list3.dataProvider = self._itemProTeam = new cui.ArrayCollection();

			let list4 = self.skDLYJlist;
			list4.itemRender = ExtensionDLList;
			list4.dataProvider = self._itemExtendList = new cui.ArrayCollection();

			for (let i = 1; i < 7; i++) {
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
				} else {
					MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.ContentIsNull);
				}
			}, self);
			self.skX.setTarget(function () {
				self.skName.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.inPlayerId);
				self.skName.text = "";
				self.skX.visible = false;
				self.skCancle.visible = false;
				self.skFind.visible = true;
				self.updateView(2);
			}, self);
			self.skCancle.setTarget(function () {
				self.skName.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.inPlayerId);
				self.skName.text = "";
				self.skX.visible = false;
				self.skCancle.visible = false;
				self.skFind.visible = true;
			}, self);
			self.skCopy.setTarget(function () {
				MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.copynet);
				URLUtil.copyText(self.skNet.text);
			}, self);

			self.skNext.setTarget(function () {
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				if (PerformList.length / 7 > self._dailiPage) {
					self._dailiPage += 1;
					self.updateView(2);
				}
			}, self);
			self.skLast.setTarget(function () {
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				if (self._dailiPage > 1) {
					self._dailiPage -= 1;
					self.updateView(2);
				}
			}, self);
			self.skFirst.setTarget(function () {
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				if (PerformList.length / 7 > self._dailiPage) {
					self._dailiPage = Math.ceil(PerformList.length / 7);
					self.updateView(2);
				}
			}, self);
			self.skEnd.setTarget(function () {
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				if (self._dailiPage > 1) {
					self._dailiPage = 1;
					self.updateView(2);
				}
			}, self);

			self.skclean.setTarget(function () {
				self.skteamName.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.teamname);
				self.skteamName.text = "";
				self.skclean.visible = false;
				self.updateView(6);
			}, self);
			self.skSearchTeam.setTarget(function () {
				if (self.skteamName.text.length > 0) {
					self.teamSearchResult();
				} else {
					MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.cannotnoTeam);
				}
			}, self);
			self.skCreateTeam.setTarget(function () {
				let view = new ExtensionNoticeView(0);
				gameScene.openPopup(view);
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
				TRain.soundMgr.playSFX(<any>confConsts.SoundTp.click);
				gameScene.goHome();
				self.close();
			}, self);

			self.skTeamNext.setTarget(function () {
				let teamInfo = dataMgr.generalMo.getPerformanceTeamInfo();
				if (!teamInfo) return;
				let member_infos = teamInfo.member_infos;
				if (member_infos.length / 7 > self._teamPage) {
					self._teamPage += 1;
					self.showTeamInfo();
				}
			}, self);
			self.skTeamLast.setTarget(function () {
				let teamInfo = dataMgr.generalMo.getPerformanceTeamInfo();
				if (!teamInfo) return;
				if (self._dailiPage > 1) {
					self._dailiPage -= 1;
					self.showTeamInfo();
				}
			}, self);
			self.skTeamFirst.setTarget(function () {
				let teamInfo = dataMgr.generalMo.getPerformanceTeamInfo();
				if (!teamInfo) return;
				if (self._teamPage > 1) {
					self._teamPage = 1;
					self.showTeamInfo();
				}
			}, self);
			self.skTeamEnd.setTarget(function () {
				let teamInfo = dataMgr.generalMo.getPerformanceTeamInfo();
				if (!teamInfo) return;
				let member_infos = teamInfo.member_infos;
				if (member_infos.length / 7 > self._teamPage) {
					self._teamPage = Math.ceil(member_infos.length / 7);
					self.showTeamInfo();
				}
			}, self);
			self.skteamScerch.setTarget(function () {
				if (self.skScerchName.text.length > 0) {
					self.memberSearchResult();
				} else {
					MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.ContentIsNull);
				}
			}, self);

			self.skYJNext.setTarget(function () {
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				if (PerformList.length / 7 > self._yejiPage) {
					self._yejiPage += 1;
					self.updateDLView(yjIndex);
				}
			}, self);
			self.skYJLast.setTarget(function () {
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				if (self._yejiPage > 1) {
					self._yejiPage -= 1;
					self.updateDLView(yjIndex);
				}
			}, self);
			self.skYJEnd.setTarget(function () {
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				if (PerformList.length / 7 > self._yejiPage) {
					self._yejiPage = Math.ceil(PerformList.length / 7);
					self.updateDLView(yjIndex);
				}
			}, self);
			self.skYJFirst.setTarget(function () {
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				if (self._yejiPage > 1) {
					self._yejiPage = 1;
					self.showTeamInfo();
				}
			}, self);
		}

		public btnClickExtend(item: cui.MenuItemImage) {
			TRain.soundMgr.playSFX(<any>confConsts.SoundTp.click);
			let self = this;
			self.showExtendResult(item.tag);
		}
		public showExtendResult(num) {
			let self = this;
			for (let i = 0; i < 7; i++) {
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
			for (let i = 0; i < 8; i++) {
				// if (i == num) {
				// 	self.skdiYJGrp.getChildAt(i).visible = true;
				// 	continue;
				// }
				self.skdiYJGrp.getChildAt(i).visible = i == num;
			}
			self.updateDLView(num);
		}

		public btnClickYeji(item: cui.MenuItemImage) {
			let self = this;
			TRain.soundMgr.playSFX(<any>confConsts.SoundTp.click);
			for (let i = 0; i < 8; i++) {
				// if (i == item.tag) {
				// 	self.skdiYJGrp.getChildAt(i).visible = true;
				// 	continue;
				// }
				self.skdiYJGrp.getChildAt(i).visible = i == item.tag;
			}
			self._yejiPage = 1;
			yjIndex = item.tag;
			self.updateDLView(item.tag);
		}

		public updateDLView(num) {
			let self = this;
			let generalMo = dataMgr.generalMo;
			self.skyejiPic.source = "extend@txt_yeji" + num;
			if (num % 2 == 0) {
				self.skyejiBG.source = "txt_yejiBiao";
			} else {
				self.skyejiBG.source = "txt_yejizhishu";
			}
			let PerformList = generalMo.getPerformanceList();
			if (!PerformList) return;
			let listArr: Array<PerformYJShowData> = [];
			let lenght = 0;
			if (PerformList.length > 7) lenght = 7;
			else lenght = PerformList.length;
			let i = 0;
			if (self._yejiPage == 1) i = 0;
			else i = (self._yejiPage - 1) * 7;
			self.skYJPage0.text = String(self._dailiPage - 1);
			self.skYJPage1.text = String(Math.ceil(PerformList.length / 7));
			if (num == 0) {
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let YJinfo: PerformYJShowData = {
						isself: true,
						rank: (i + 1),
						name: temp.nick_name,
						player_id: temp.player_id,
						yej: temp.per_today,
					}
					listArr.push(YJinfo);
				}
				self._itemExtendList.source = listArr;
			} else if (num == 1) {
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let YJinfo: PerformYJShowData = {
						isself: false,
						rank: (i + 1),
						name: temp.nick_name,
						player_id: temp.player_id,
						yej: temp.per_sub_today,
						yongj: temp.gain,
					}
					listArr.push(YJinfo);
				}
				self._itemExtendList.source = listArr;
			} else if (num == 2) {
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let YJinfo: PerformYJShowData = {
						isself: true,
						rank: (i + 1),
						name: temp.nick_name,
						player_id: temp.player_id,
						yej: temp.per_sub_yesterday,
					}
					listArr.push(YJinfo);
				}
				self._itemExtendList.source = listArr;
			} else if (num == 3) {
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let YJinfo: PerformYJShowData = {
						isself: false,
						rank: (i + 1),
						name: temp.nick_name,
						player_id: temp.player_id,
						yej: temp.per_sub_yesterday,
						yongj: temp.gain_yd,
					}
					listArr.push(YJinfo);
				}
				self._itemExtendList.source = listArr;
			} else if (num == 4) {
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let YJinfo: PerformYJShowData = {
						isself: true,
						rank: (i + 1),
						name: temp.nick_name,
						player_id: temp.player_id,
						yej: temp.per_sub_tw,
					}
					listArr.push(YJinfo);
				}
				self._itemExtendList.source = listArr;
			} else if (num == 5) {
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let YJinfo: PerformYJShowData = {
						isself: false,
						rank: (i + 1),
						name: temp.nick_name,
						player_id: temp.player_id,
						yej: temp.per_sub_tw,
						yongj: temp.gain_tw,
					}
					listArr.push(YJinfo);
				}
				self._itemExtendList.source = listArr;
			} else if (num == 6) {
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let YJinfo: PerformYJShowData = {
						isself: true,
						rank: (i + 1),
						name: temp.nick_name,
						player_id: temp.player_id,
						yej: temp.per_sub_lw,
					}
					listArr.push(YJinfo);
				}
				self._itemExtendList.source = listArr;
			} else if (num == 7) {
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let YJinfo: PerformYJShowData = {
						isself: false,
						rank: (i + 1),
						name: temp.nick_name,
						player_id: temp.player_id,
						yej: temp.per_sub_lw,
						yongj: temp.gain_tw,
					}
					listArr.push(YJinfo);
				}
				self._itemExtendList.source = listArr;
			}
		}

		public btnClickChip(item: cui.MenuItemImage) {
			TRain.soundMgr.playSFX(<any>confConsts.SoundTp.click);
			let self = this;
			for (let i = 0; i < self.skdiGrp.numChildren; i++) {
				// if (i == item.tag) {
				// 	self.skdiGrp.getChildAt(i).visible = true;
				// 	continue;
				// }
				self.skdiGrp.getChildAt(i).visible = i == item.tag;
			}
			self.showResult(item.tag);
			self.showDate(item.tag);
		}

		public showDate(num) {
			let self = this;
			let generalMo = dataMgr.generalMo;
			if (num == 0) {
				generalMo.sendGetGain();
				let gain = generalMo.getGain();
				if (gain > 0) {
					self.skGet.icon = "extend@txt_canGet";
					self.skGet.touchEnabled = true;
					self.skGet.setTarget(function () {
						generalMo.sendAskForGain();
					}, self);
				} else {
					self.skGet.touchEnabled = false;
					self.skGet.icon = "extend@txt_noGet";
				}
				self.skVip.text = TRain.langMgr.getTxt(<any>LangGrp.mainLang, (langConsts.mainLang.backGain));
				self.skYeji.text = TRain.langMgr.getTxt(<any>LangGrp.mainLang, (langConsts.mainLang.yeji));
				self.skPay.text = "当前佣金：" + String(gain / 100) + "元";
				self.updateView(num);
			} else if (num == 1) {
				generalMo.sendPerformanceInfo();
			} else if (num == 2) {
				self._dailiPage = 1;
				generalMo.sendPerformList();
				self.skName.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.inPlayerId);
				self.skName.promptColor = 0xC4904D;
				self.skName.addEventListener(egret.Event.CHANGE, self.OnAccount, self);
				self.skName.addEventListener(egret.Event.FOCUS_IN, self.onFocus1, self);
			} else if (num == 3) {
				self.skSearchGrp.visible = false;
				self.skplayerId.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.inPlayerId);
				self.skplayerId.promptColor = 0xC4904D;
				self.skplayerId.addEventListener(egret.Event.CHANGE, self.OnAccount2, self);
				self.skplayerId.addEventListener(egret.Event.FOCUS_IN, self.onFocus2, self);
				self.skSearch.setTarget(function () {
					let playerid = parseInt(self.skplayerId.text);
					generalMo.sendPerformanceChild(playerid);
				}, self);
			} else if (num == 4) {
				let linkUrl = self.getQRLinkUrl();
				self.skNet.text = linkUrl;
				self.updatePic();
			} else if (num == 5) {
				self.updateView(num);
			} else if (num == 6) {
				self.skteamName.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.teamname);
				self.skteamName.promptColor = 0xC4904D;
				self.skteamName.addEventListener(egret.Event.CHANGE, self.OnAccount3, self);
				self.skteamName.addEventListener(egret.Event.FOCUS_IN, self.onFocus3, self);
				generalMo.sendPerformTeamList();
			}
		}

		private updatePic() {
			let self = this;
			game.UIUtils.getQRCodePly(function (data) {
				self.skerwei.source = data;
			});
		}

		private getQRLinkUrl() {
			let myID = game.dataMgr.accMo.getData().aid;
			let playerID = "";
			playerID = 1 + "|" + String(myID);
			let signKey = Base64.base64Encode(playerID);
			let channelID = CONF.shareId;
			let info = StringUtil.printf(TRain.langMgr.getTxt(<any>game.LangGrp.mainLang, langConsts.mainLang.ShareGameIp), channelID, channelID, signKey);
			return info;
		}

		public teamSearchResult() {
			let self = this;
			let teamList = dataMgr.generalMo.getPerformanceTeamlist();

			if (!teamList) {
				self.skclean.visible = true;
				MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.noTeam);
				return;
			}

			let hasTeam: boolean = false;
			let number = -1;
			let searchName = self.skteamName.text;

			for (let i = 0; i < teamList.length; i++) {
				if (searchName == teamList[i].name) {
					hasTeam = true;
					number = i;
				}
			}
			self.skclean.visible = true;
			if (hasTeam) {
				let listArr: Array<PerformTeamlistShowData> = [];
				let id = 0;
				let temp = teamList[number];
				let tempinfos = temp.member_infos;
				if (tempinfos) {
					id = tempinfos[tempinfos.length - 1].player_id;
				}
				let PerformTeamlist: PerformTeamlistShowData = {
					handle: self,
					name: temp.name,
					count: temp.count,
					count_limit: temp.count_limit,
					player_id: id,
					id: temp.id,
					code_tag: temp.code_tag,
				}
				listArr.push(PerformTeamlist);
				self._itemProTeam.source = listArr;
			} else {
				MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.noTeam);
			}
		}

		public searchResult() {
			let self = this;
			let PerformList = dataMgr.generalMo.getPerformanceList();
			self.skFind.visible = false;
			if (!PerformList) {
				self.skCancle.visible = true;
				self.skX.visible = true;
				MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.noplayer);
				return;
			}
			let hasPlayer: boolean = false;
			let number = -1;
			let searchId = parseInt(self.skName.text);
			for (let i = 0; i < PerformList.length; i++) {
				if (searchId == PerformList[i].player_id) {
					hasPlayer = true;
					number = i;
				}
			}
			self.skCancle.visible = true;
			self.skX.visible = true;
			if (hasPlayer) {
				let temp = PerformList[number];
				let listArr: Array<PerformListShowData> = [];
				let PerformInfo: PerformListShowData = {
					rank: (number + 1),
					player_id: temp.player_id,
					nick_name: temp.nick_name,
					per_tw: temp.per_tw,
					ac: temp.ac,
					bd: 0,
				}
				listArr.push(PerformInfo);
				self._itemProPerformance.source = listArr;
			} else {
				MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.noplayer);
			}
		}

		public memberSearchResult() {
			let self = this;
			let teamInfo = dataMgr.generalMo.getPerformanceTeamInfo();
			if (!teamInfo) {
				self.skTeamX.visible = true;
				self.skTeamCancle.visible = true;
				MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.noplayer);
				return;
			};
			let member_infos = teamInfo.member_infos;
			self.skteamScerch.visible = false;
			let hasPlayer: boolean = false;
			let number = -1;
			let searchId = parseInt(self.skScerchName.text);
			for (let i = 0; i < member_infos.length; i++) {
				if (searchId == member_infos[i].player_id) {
					hasPlayer = true;
					number = i;
				}
			}
			self.skTeamX.visible = true;
			self.skTeamCancle.visible = true;
			if (hasPlayer) {
				let temp = member_infos[number];
				let listArr: Array<PerformTeamMemberShowData> = [];
				let memberInfo: PerformTeamMemberShowData = {
					rank: (number + 1),
					name: temp.nick_name,
					player_id: temp.player_id,
					ts_create: temp.ts_create,
					per_sub_tw: temp.per_sub_tw,
					ac: temp.ac,
				}
				listArr.push(memberInfo);
				self._itemProTeamList.source = listArr;
			} else {
				MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.noplayer);
			}
		}

		public updateView(num) {
			let self = this;
			let generalMo = dataMgr.generalMo;
			if (num == 0) {
				let listArr: Array<WuXianShowData> = [];
				let info = generalMo.getPerform();
				let id = 0;
				for (let i in info) {
					id += 1;
					let temp = info[i];
					let WuXianinfo: WuXianShowData = {
						id: id,
						Level: temp.Level,
						PButton: temp.PButton,
						PTop: temp.PTop,
						Rate: temp.Rate,
						Describe: temp.Describe,
					}
					listArr.push(WuXianinfo);
				}
				self._itemPro.source = listArr;
			} else if (num == 1) {
				let performInfo = generalMo.getPerformanceInfo();
				if (performInfo.commission_today_team) self.skteamtoday.text = String(performInfo.commission_today_team / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skteamtoday.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.commission_today_self) self.skselftoday.text = String(performInfo.commission_today_self / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skselftoday.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.commission_today_agent) self.skdltoday.text = String(performInfo.commission_today_agent / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skdltoday.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.commission_yesterday_team) self.skteamyes.text = String(performInfo.commission_yesterday_team / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skteamyes.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.commission_yesterday_self) self.skselfyes.text = String(performInfo.commission_yesterday_self / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skselfyes.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.commission_yesterday_agent) self.skdlyes.text = String(performInfo.commission_yesterday_agent / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skdlyes.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_today_team) self.skteamtodaygold.text = String(performInfo.per_today_team / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skteamtodaygold.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_today_self) self.skselftodaygold.text = String(performInfo.per_today_self / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skselftodaygold.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_today_agent) self.skdltodaygold.text = String(performInfo.per_today_agent / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skdltodaygold.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_yesterday_team) self.skteamyesgold.text = String(performInfo.per_yesterday_team / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skteamyesgold.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_yesterday_self) self.skselfyesgold.text = String(performInfo.per_yesterday_self / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skselfyesgold.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_yesterday_agent) self.skdlyesgold.text = String(performInfo.per_yesterday_agent / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skdlyesgold.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_today) self.skmyyj.text = String(performInfo.per_today / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skmyyj.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_this_week) self.skmyweek.text = String(performInfo.per_this_week / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skmyweek.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.rebate_today) self.sktodayyj.text = String(performInfo.rebate_today / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.sktodayyj.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.rebate_this_week) self.skweekyj.text = String(performInfo.rebate_this_week / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skweekyj.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_b_self_today) self.skmyZY.text = String(performInfo.per_b_self_today / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skmyZY.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_b_child_today) self.skZS.text = String(performInfo.per_b_child_today / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skZS.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_b_self_yesterday) self.skmyZYyes.text = String(performInfo.per_b_self_yesterday / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skmyZYyes.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.per_b_child_yesterday) self.skZSyes.text = String(performInfo.per_b_child_yesterday / 100) + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);
				else self.skZSyes.text = 0 + TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.RMBText);

				if (performInfo.ac) self.skteamNum.text = String(performInfo.ac);
				else self.skteamNum.text = "0";

				if (performInfo.ac_inc_yd) self.skyesNew.text = String(performInfo.ac_inc_yd);
				else self.skyesNew.text = "0";

				if (performInfo.ac_inc_tm) self.skmonthNew.text = String(performInfo.ac_inc_tm);
				else self.skmonthNew.text = "0";
			} else if (num == 2) {
				let listArr: Array<PerformListShowData> = [];
				let PerformList = generalMo.getPerformanceList();
				if (!PerformList) return;
				let lenght = 0;
				if (PerformList.length > 7) lenght = 7;
				else lenght = PerformList.length;
				let i = 0;
				self.skGLPage0.text = String(self._dailiPage - 1);
				self.skGLPage1.text = String(Math.ceil(PerformList.length / 7));
				if (self._dailiPage == 1) i = 0;
				else i = (self._dailiPage - 1) * 7;
				for (; i < lenght; i++) {
					let temp = PerformList[i];
					let PerformInfo: PerformListShowData = {
						rank: (i + 1),
						player_id: temp.player_id,
						nick_name: temp.nick_name,
						per_tw: temp.per_tw,
						ac: temp.ac,
						bd: 0,
					}
					listArr.push(PerformInfo);
				}
				self._itemProPerformance.source = listArr;
			} else if (num == 3) {
				let performChild = generalMo.getPerformanceChild();
				if (performChild.player_id) {
					self.skSearchGrp.visible = true;
					self.skupId.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.preId), performChild.parent));
					self.skteamnum.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.teamnum), performChild.ac));
					self.sktodaygold.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.todaygold), performChild.per_sub_today / 100));
					self.skweekgold.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.weekgold), performChild.per_sub_tw / 100));
					let time = self.GMTToStr(performChild.ts_create);
					self.sktime.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.createTime), time));
				} else {
					MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.noresult);
				}
			} else if (num == 5) {
				if (self.skInGrp.numChildren > 0) {
					for (let i = 0; i < self.skInGrp.numChildren; i++) {
						let temp = self.skInGrp.getChildAt(i) as any;
						temp.dispose();
					}
				}
				self.skInGrp.removeChildren();
				let maxHeight: number = 0;
				let faq = generalMo.getExtend();
				for (let key in faq) {
					let faqConf = faq[key];
					if (faqConf.isImg) {
						let img = new cui.Image();
						img.source = faqConf.text;
						img.x = faqConf.x;
						img.y = faqConf.y;
						self.skInGrp.addChild(img);
						if (maxHeight < img.y) maxHeight = img.y;
					} else {
						let lab = new cui.Label();
						lab.textFlow = cui.htmlParser.parser(faqConf.text);
						lab.x = faqConf.x;
						lab.y = faqConf.y;
						self.skInGrp.addChild(lab);
						if (maxHeight < lab.y) maxHeight = lab.y;
					}
				}
				self.skInGrp.width = self.skGrp.width;
				self.skInGrp.height = maxHeight + 120;
				self.skGrp.setContentSize(self.skGrp.width, maxHeight + 120);
			} else if (num == 6) {
				let listArr: Array<PerformTeamlistShowData> = [];
				let teamList = generalMo.getPerformanceTeamlist();
				if (!teamList) return;
				for (let i = 0; i < teamList.length; i++) {
					let id = 0;
					let temp = teamList[i];
					let tempinfo = temp.member_infos;
					if (tempinfo) {
						id = tempinfo[tempinfo.length - 1].player_id;
					}
					let PerformTeamlist: PerformTeamlistShowData = {
						handle: self,
						name: temp.name,
						count: temp.count,
						count_limit: temp.count_limit,
						player_id: id,
						id: temp.id,
						code_tag: temp.code_tag,
					}
					listArr.push(PerformTeamlist);
				}
				self._itemProTeam.source = listArr;
			}
		}

		private GMTToStr(time) {
			let date = new Date(time);
			let Str = date.getFullYear() + '年' +
				(date.getMonth() + 1) + '月' +
				date.getDate() + '日' +
				date.getHours() + '时' +
				date.getMinutes() + '分' +
				date.getSeconds() + "秒";
			return Str;
		}

		private onFocus1(e: egret.Event): void {
			this.skName.text = "";
		}
		private OnAccount(e: egret.Event): void {
			let self = this;
			let inputText = e.target.text;
			if (DEBUG) console.log("inputText ==", inputText);
			let str = game.DataFormat.CheckStringLength(inputText);
			let len = str[0];
			let chaLen = str[1] > 8 ? 8 : str[1];
			if (len > 16) {
				let firstIdx: number = 16 - chaLen;
				inputText = inputText.substring(0, firstIdx);
			}
			self.skName.text = inputText;
			self.skName.textColor = 0xeddF36;
		}

		private onFocus2(e: egret.Event): void {
			this.skplayerId.text = "";
		}
		private OnAccount2(e: egret.Event): void {
			let self = this;
			let inputText = e.target.text;
			let str = game.DataFormat.CheckStringLength(inputText);
			let len = str[0];
			let chaLen = str[1] > 8 ? 8 : str[1];
			if (len > 16) {
				let firstIdx: number = 16 - chaLen;
				inputText = inputText.substring(0, firstIdx);
			}
			self.skplayerId.text = inputText;
			self.skplayerId.textColor = 0xeddF36;
		}

		private onFocus3(e: egret.Event): void {
			this.skteamName.text = "";
		}
		private OnAccount3(e: egret.Event): void {
			let self = this;
			let inputText = e.target.text;
			let str = game.DataFormat.CheckStringLength(inputText);
			let len = str[0];
			let chaLen = str[1] > 8 ? 8 : str[1];
			if (len > 16) {
				let firstIdx: number = 16 - chaLen;
				inputText = inputText.substring(0, firstIdx);
			}
			self.skteamName.text = inputText;
			self.skteamName.textColor = 0xeddF36;
		}

		private onFocus4(e: egret.Event): void {
			this.skScerchName.text = "";
		}
		private OnAccount4(e: egret.Event): void {
			let self = this;
			let inputText = e.target.text;
			let str = game.DataFormat.CheckStringLength(inputText);
			let len = str[0];
			let chaLen = str[1] > 8 ? 8 : str[1];
			if (len > 16) {
				let firstIdx: number = 16 - chaLen;
				inputText = inputText.substring(0, firstIdx);
			}
			self.skScerchName.text = inputText;
			self.skScerchName.textColor = 0xeddF36;
		}

		public showResult(num) {
			let self = this;
			for (let i = 0; i < 7; i++) {
				// if (num == i) {
				// 	self["skdaili" + i].visible = true;
				// 	continue;
				// }
				self["skdaili" + i].visible = num == i;
			}
		}

		public showGain() {
			let self = this;
			self.showDate(0);
		}

		public showPerforms() {
			let self = this;
			self.updateView(1);
		}

		public showPerformsList() {
			let self = this;
			self.updateView(2);
		}

		public showPerformsChild() {
			let self = this;
			self.updateView(3);
		}

		public showPerformsTeamlist() {
			let self = this;
			self.updateView(6);
		}

		public showTeamInfo() {
			let self = this;
			let teamInfo = dataMgr.generalMo.getPerformanceTeamInfo();
			let listArr: Array<PerformTeamMemberShowData> = [];
			if (!teamInfo) return;
			self.skpaixianNum.text = String(teamInfo.count);
			self.skpaixianNew.text = String(teamInfo.ac_inc);
			let member_infos = teamInfo.member_infos;
			if (member_infos.length == 0) return;
			let length = 0;
			if (member_infos.length > 7) length = 7;
			else length = member_infos.length;
			let i = 0;
			if (self._teamPage == 1) i = 0;
			else i = (self._teamPage - 1) * 7;
			self.skTeamPage0.text = String(self._teamPage - 1);
			self.skTeamPage1.text = String(Math.ceil(member_infos.length / 7));
			for (; i < length; i++) {
				let temp = member_infos[i];
				let PerformTeamlist: PerformTeamMemberShowData = {
					rank: (i + 1),
					name: temp.nick_name,
					player_id: temp.player_id,
					ts_create: temp.ts_create,
					per_sub_tw: temp.per_sub_tw,
					ac: temp.ac,
				}
				listArr.push(PerformTeamlist);
			}
			self._itemProTeamList.source = listArr;
		}

		public btnClick(item: ExtensionPerformTeamList, num): void {
			let self = this;
			TRain.soundMgr.playSFX(<any>confConsts.SoundTp.click);
			let data: PerformTeamlistShowData = <PerformTeamlistShowData>item.data;
			if (num == 1) {
				let view = new ExtensionNoticeView(1, data);
				gameScene.openPopup(view);
			} else if (num == 2) {
				gameScene.showHallUI(UITag.code, data);
			} else if (num == 3) {
				let view = new ExtensionNoticeView(2, data);
				gameScene.openPopup(view);
			} else if (num == 4) {
				self.showTeamGrp(data);
			}
		}

		public showTeamGrp(data) {
			let self = this;
			self.skBtnGrp.visible = false;
			self.skBack.visible = false;
			self.skdlXian.visible = false;
			self.skYJxian.visible = false;
			self.skdiGrp.visible = false;
			self.skdiYJGrp.visible = false;
			self.skdiTeam.visible = true;
			for (let i = 0; i < 7; i++) {
				self["skdaili" + i].visible = false;
			}
			self.skTeam.visible = true;
			self.skteamGrp.visible = true;
			self.skTeamBack.visible = true;
			self.skScerchName.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.inPlayerId);
			self.skScerchName.promptColor = 0xC4904D;
			self.skScerchName.addEventListener(egret.Event.CHANGE, self.OnAccount4, self);
			self.skScerchName.addEventListener(egret.Event.FOCUS_IN, self.onFocus4, self);
			dataMgr.generalMo.sendSearchTeam(data.id);
		}

		protected onShow(stage: egret.Stage) {
			super.onShow(stage);
			//let self = this;
		}

		protected onHide() {
			super.onHide();
			//let self = this;
		}

		public dispose() {
			let self = this;
			let generalMo = dataMgr.generalMo;
			generalMo.rmvListener(<any>General_EVT_Dai.Gain_result, self.showGain);
			generalMo.rmvListener(<any>General_EVT_Dai.GetGain, self.showGain);
			generalMo.rmvListener(<any>General_EVT_Dai.Perform, self.showPerforms);
			generalMo.rmvListener(<any>General_EVT_Dai.PerformList, self.showPerformsList);
			generalMo.rmvListener(<any>General_EVT_Dai.PerformChild, self.showPerformsChild);
			generalMo.rmvListener(<any>General_EVT_Dai.PerformTeamlist, self.showPerformsTeamlist);
			generalMo.rmvListener(<any>General_EVT_Dai.PerformTeaminfo, self.showTeamInfo);
			super.dispose();
		}
	}

	export interface WuXianShowData extends cui.IItemData {
		id: number,
		Level: number,  //推广员等级
		PButton: number,  //收益下限
		PTop: number,  //收益上限
		Rate: number,  //返利（万分率）
		Describe: string,  //等级描述
	}

	export class extensionWuXian extends cui.DataItem {
		public skWXgold: cui.Label;			//业绩额度
		public skWXlv: cui.Label;			//代理级别
		public skWXget: cui.Label;			//日结佣金
		private skXian: cui.Image;
		constructor() {
			super();
			this.skinName = "gameWuxianListSkin";
		}

		protected dataChanged() {
			super.dataChanged();
			let self = this;
			let data: WuXianShowData = <WuXianShowData>self.data;
			if (data.id == 1) {
				self.skXian.visible = true;
			} else {
				self.skXian.visible = false;
			}
			if (data.PButton == 0) {
				self.skWXgold.text = game.DataFormat.convertYuanString2(data.PTop, true) + "以下";
			} else if (data.PTop == 0) {
				self.skWXgold.text = game.DataFormat.convertYuanString2(data.PButton, true) + "以上";
			} else {
				self.skWXgold.text = game.DataFormat.convertYuanString2(data.PButton, true) + "～" + game.DataFormat.convertYuanString2(data.PTop, true);
			}
			self.skWXlv.text = data.Describe;
			self.skWXget.text = "每万" + data.Rate + "元";
		}
	}

	//代理管理
	export interface PerformListShowData extends cui.IItemData {
		rank: number,  //排名
		player_id: number,  //昵称
		nick_name: string,  //id
		per_tw: number,  //本周业绩
		ac: number,  //团队人数
		bd: number,//保底设置
	}
	export class ExtensionPerformList extends cui.DataItem {
		public skRank: cui.Label;				//排名
		public skNickname: cui.Label;			//昵称
		public skId: cui.Label;					//id
		public skyj: cui.Label;					//本周业绩
		public skTeamNum: cui.Label;			//团队人数
		public skBaodi: cui.Label;				//保底设置
		constructor() {
			super();
			this.skinName = "gameDLListSkin";
		}

		protected dataChanged() {
			super.dataChanged();
			let self = this;
			let data: PerformListShowData = <PerformListShowData>self.data;
			self.skRank.text = String(data.rank);
			self.skNickname.text = formatString(data.nick_name);
			self.skId.text = String(data.player_id);
			self.skyj.text = String(data.per_tw / 100);
			self.skTeamNum.text = String(data.ac);
			self.skBaodi.text = String(data.bd);
		}
	}

	export function formatString(str: string): string {
		if (str.length > 5) {
			return str.substr(0, 5) + "...";
		} else {
			return str;
		}
	}

	////////////////////////////////////////////////////////////////////////////////////////
	//自己的所有团队信息
	export interface PerformTeamlistShowData extends cui.IItemData {
		handle: IBtnHanderTeamList,
		name: string,
		count: number,
		count_limit: number,
		player_id: number,
		id: number,
		code_tag: number,//唯一标识吗
	}

	export class ExtensionPerformTeamList extends cui.DataItem {
		public skChange: cui.ScaleButton;
		public skTeam: cui.ScaleButton;
		public skerweima: cui.ScaleButton;
		public skshare: cui.ScaleButton;
		public skteamName: cui.Label;
		public sknumber: cui.Label;
		public skpaixian: cui.Label;
		public sknewId: cui.Label;
		constructor() {
			super();
			this.skinName = "gameTeamListSkin";
			let self = this;
			self.skChange.setTarget(function () {
				<PerformTeamlistShowData>self.data.handle.btnClick(self, 1);
			}, self);
			self.skshare.setTarget(function () {
				<PerformTeamlistShowData>self.data.handle.btnClick(self, 2);
			}, self);
			self.skerweima.setTarget(function () {
				<PerformTeamlistShowData>self.data.handle.btnClick(self, 3);
			}, self);
			self.skTeam.setTarget(function () {
				<PerformTeamlistShowData>self.data.handle.btnClick(self, 4);
			}, self);
		}

		protected dataChanged() {
			super.dataChanged();
			let self = this;
			let data: PerformTeamlistShowData = <PerformTeamlistShowData>self.data;
			self.skteamName.text = data.name;
			self.sknumber.text = String(data.count);
			self.skpaixian.text = String(data.count) + "/" + String(data.count_limit);
			if (data.player_id != 0) self.sknewId.text = String(data.player_id);
			else self.sknewId.text = "--";
		}
	}
	////////////////////////////////////////////////////////////////////////////////////////

	//具体团队列表中的
	export interface PerformTeamMemberShowData extends cui.IItemData {
		rank: number,	//排线
		name: string,	//玩家昵称
		player_id: number,	//id
		ts_create: number,	//创建时间
		per_sub_tw: number,	//本周业绩
		ac: number,		//团队人数
		//code_tag:number,//唯一标识吗
	}

	export class ExtensionPerformTeamMemberList extends cui.DataItem {
		public skRank: cui.Label;
		public skNickname: cui.Label;
		public skId: cui.Label;
		public sktime: cui.Label;
		public skyj: cui.Label;
		public skTeamNum: cui.Label;
		constructor() {
			super();
			this.skinName = "gamePXListSkin";
			let self = this;
			self.showdata();
		}

		private showdata() {
			let self = this;
			let data: PerformTeamMemberShowData = <PerformTeamMemberShowData>self.data;

			self.skRank.text = String(data.rank);
			self.skNickname.text = String(data.name);
			self.skId.text = String(data.player_id);
			self.sktime.text = String(data.ts_create);
			self.skyj.text = String(data.per_sub_tw / 100);
			self.skTeamNum.text = String(data.ac);
		}
	}

	////////////////////////////////////////////////////////////////////////////  
	//查询业绩的内容
	export interface PerformYJShowData extends cui.IItemData {
		isself: boolean,//是自己的还是直属的
		rank: number,	//排名
		name: string,	//玩家昵称
		player_id: number,	//id
		yej: number,	//业绩
		yongj?: number,	//佣金
	}

	export class ExtensionDLList extends cui.DataItem {
		public skself: cui.Group;
		public skmyRank: cui.Label;
		public skmyname: cui.Label;
		public skmyid: cui.Label;
		public skmygold: cui.Label;

		public skother: cui.Group;
		public skotherRank: cui.Label;
		public skothername: cui.Label;
		public skotherid: cui.Label;
		public skothergold: cui.Label;
		public skotheryj: cui.Label;
		constructor() {
			super();
			this.skinName = "gameSelfYejiListSkin";
		}

		protected dataChanged() {
			super.dataChanged();
			let self = this;
			let data: PerformYJShowData = <PerformYJShowData>self.data;
			if (data) {
				if (data.isself) {
					self.skself.visible = true;
					self.skother.visible = false;
					self.skmyRank.text = String(data.rank);
					self.skmyname.text = formatString(data.name);
					self.skmyid.text = String(data.player_id);
					self.skmygold.text = String(data.yej / 100);
				} else {
					self.skself.visible = false;
					self.skother.visible = true;
					self.skotherRank.text = String(data.rank);
					self.skothername.text = formatString(data.name);
					self.skotherid.text = String(data.player_id);
					self.skothergold.text = String(data.yej / 100);
					self.skotheryj.text = String(data.yongj / 100);
				}
			}
		}
	}
}