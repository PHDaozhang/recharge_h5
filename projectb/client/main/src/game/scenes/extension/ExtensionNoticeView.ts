module game {
	export class ExtensionNoticeView extends UIPopup {
		public sknoticeName: cui.Image;
		public skclose: cui.ScaleButton;

		public skCreateGrp: cui.Group;
		public skCreate: cui.ScaleButton;
		public skTname: cui.EditableText;
		public skTnum: cui.EditableText;
		public sksetname: cui.Label;
		public sksetnum: cui.Label;

		public skChangeGrp: cui.Group;
		public skTchange: cui.EditableText;
		public skTishi: cui.Label;
		public skchange: cui.ScaleButton;
		public skcancle: cui.ScaleButton;

		public skresetGrp: cui.Group;
		public skReset: cui.Label;
		public skSure: cui.ScaleButton;
		public sknoSure: cui.ScaleButton;
		private _isCreate: number = -1;
		private _data: any;
		public constructor(isCreate: number, data?: any) {
			super();
			let self = this;
			self._isCreate = isCreate;
			self._data = data;
			self.skinName = "TeamNoticeSkin";
			self.hideBg = false;
			self.vCenter = 0;
			self.hCenter = 0;
		}

		public childrenCreated() {
			super.childrenCreated();
			let self = this;
			dataMgr.generalMo.addListener(<any>General_EVT_Dai.PerformTeamcreate, self.showResult, self);
			dataMgr.generalMo.addListener(<any>General_EVT_Dai.PerformTeamupdate, self.showResult2, self);
			self.skclose.setTarget(function () {
				dataMgr.generalMo.rmvListener(<any>General_EVT_Dai.PerformTeamcreate, self.showResult);
				dataMgr.generalMo.rmvListener(<any>General_EVT_Dai.PerformTeamupdate, self.showResult2);
				self.close();
			}, self);
			let CreateGrp = self.skCreateGrp;
			let ChangeGrp = self.skChangeGrp;
			let resetGrp = self.skresetGrp;
			if (self._isCreate == 0) {
				self.sknoticeName.source = "extend@txt_createTeam";
				CreateGrp.visible = true;
				ChangeGrp.visible = false;
				resetGrp.visible = false;
			} else if (self._isCreate == 1) {
				self.sknoticeName.source = "extend@txt_changeTeamN";
				CreateGrp.visible = false;
				ChangeGrp.visible = true;
				resetGrp.visible = false;
			} else if (self._isCreate == 2) {
				self.sknoticeName.source = "extend@txt_tishi";
				CreateGrp.visible = false;
				ChangeGrp.visible = false;
				resetGrp.visible = true;
			}
			self.sksetname.text = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.setteamname);
			self.sksetnum.text = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.setPaixian);
			self.skTname.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.teamname);
			self.skTname.promptColor = 0x988293;
			self.skTname.addEventListener(egret.Event.CHANGE, self.OnAccount, self);
			self.skTname.addEventListener(egret.Event.FOCUS_IN, self.onFocus1, self);
			self.skTnum.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.teamsNum);
			self.skTnum.promptColor = 0x988293;
			self.skTnum.addEventListener(egret.Event.CHANGE, self.OnAccount1, self);
			self.skTnum.addEventListener(egret.Event.FOCUS_IN, self.onFocus2, self);

			self.skCreate.setTarget(function () {
				if (self.skTname.text.length > 0) {
					let isNumber = self.getIsAllNumber(self.skTname.text);
					let limitNumber = self.getIsAllNumber(self.skTnum.text);
					if (isNumber) {
						MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.notAllNumber);
					} else {
						let teamNum = parseInt(self.skTnum.text);
						if (teamNum < 1 || teamNum > 50 || self.skTnum.text.length == 0) {
							MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.wrongNumber);
						} else {
							if (limitNumber) {
								if (DEBUG) console.log("创建团队的名字是：   ", self.skTname.text);
								dataMgr.generalMo.setCreateTeamName(self.skTname.text);
								dataMgr.generalMo.sendCreateTeam(teamNum, self.skTname.text);
							} else {
								MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.inputNum);
							}
						}
					}
				} else {
					MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.cannotnoTeam);
				}
			}, self);

			self.skTishi.text = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.notices);
			self.skTchange.prompt = TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.teamsName);
			self.skTchange.promptColor = 0x988293;
			self.skTchange.addEventListener(egret.Event.CHANGE, self.OnAccount2, self);
			self.skTchange.addEventListener(egret.Event.FOCUS_IN, self.onFocus3, self);

			self.skcancle.setTarget(self.close, self);
			self.skchange.setTarget(function () {
				if (self.skTchange.text.length > 0) {
					let isNumber = self.getIsAllNumber(self.skTchange.text);
					if (isNumber) {
						MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.notAllNumber);
					} else {
						let data = self._data;
						if (DEBUG) console.log("修改团队的名字是：   ", self.skTchange.text);
						dataMgr.generalMo.setChangeTeamName(self.skTchange.text);
						dataMgr.generalMo.sendChangeTeamName(2, data.id, data.count_limit, self.skTchange.text);
					}
				} else {
					MsgBox.showTxt(<any>LangGrp.mainLang, langConsts.mainLang.cannotnoTeam);
				}
			}, self);


			self.skReset.textFlow = cui.htmlParser.parser(StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.resetMa)));
			self.sknoSure.setTarget(self.close, self);
			self.skSure.setTarget(function () {
				let data = self._data;
				dataMgr.generalMo.sendChangeTeamName(0, data.id, data.count_limit, data.name);
			}, self);
		}

		private getIsAllNumber(val) {
			var regPos = /^\d+(\.\d+)?$/; //非负浮点数
			var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
			if (regPos.test(val) || regNeg.test(val)) {
				return true;
			} else {
				return false;
			}
		}

		private onFocus1(e: egret.Event): void {
			this.skTname.text = "";
		}
		private OnAccount(e: egret.Event): void {
			let self = this;
			let inputText = e.target.text;
			let str = game.DataFormat.CheckStringLength(inputText);
			let len = str[0];
			let chaLen = str[1] > 8 ? 8 : str[1];
			if (len > 16) {
				let firstIdx: number = 16 - chaLen;
				inputText = inputText.substring(0, firstIdx);
			}
			self.skTname.text = inputText;
			self.skTname.textColor = 0xe9e9e9;
		}

		private onFocus2(e: egret.Event): void {
			this.skTnum.text = "";
		}
		private OnAccount1(e: egret.Event): void {
			let self = this;
			let inputText = e.target.text;
			let str = game.DataFormat.CheckStringLength(inputText);
			let len = str[0];
			let chaLen = str[1] > 8 ? 8 : str[1];
			if (len > 16) {
				let firstIdx: number = 16 - chaLen;
				inputText = inputText.substring(0, firstIdx);
			}
			self.skTnum.text = inputText;
			self.skTnum.textColor = 0xe9e9e9;
		}

		private onFocus3(e: egret.Event): void {
			this.skTchange.text = "";
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
			self.skTchange.text = inputText;
			self.skTchange.textColor = 0xe9e9e9;
		}

		private showResult() {
			let self = this;
			dataMgr.generalMo.sendPerformTeamList();
			let teamname = dataMgr.generalMo.getCreateTeamName();
			if (DEBUG) console.log("teamname  ==  ", teamname);
			let info = StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.teamSuccess), teamname);
			BoxMgr.showBox(info);
			self.close();
		}

		private showResult2(optype, data) {
			let self = this;
			dataMgr.generalMo.sendPerformTeamList();
			let teamList = dataMgr.generalMo.getPerformanceTeamlist();
			let name;
			for (let i = 0; i < teamList.length; i++) {
				let temp = teamList[i];
				if (temp.id == data.team_id) {
					name = temp.name;
				}
			}
			let info;
			if (optype == 0) {
				info = StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.resetMaName), name);
			} else if (optype == 2) {
				let changename = dataMgr.generalMo.getChangeTeamName();
				if (DEBUG) console.log("changename  ==  ", changename);
				info = StringUtil.printf(TRain.langMgr.getTxt(<any>LangGrp.mainLang, langConsts.mainLang.teamChange), changename);
			}
			BoxMgr.showBox(info);
			self.close();
		}

		protected onShow(stage: egret.Stage) {
			super.onShow(stage);
			let self = this;
		}

		protected onHide() {
			super.onHide();
			let self = this;
		}
	}
}