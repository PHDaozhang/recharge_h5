module XXX_NET_CONF{
	export const enum C2S_ROUTE_TP {
		c2g_heartbeat = 301,
		c2s_connect = 5001,
		c2s_asklogin = 5003,
		c2s_update_playerhead = 5010,
		c2s_update_nickname = 5011,
	}
	export const enum S2C_ROUTE_TP {
		g2c_heartbeat = 404,
		msg_t2t_start = 444,
		s2c_connect_result = 7501,
		s2c_asklogin_result = 7503,
		s2c_update_playerhead_result = 7509,
		s2c_update_nickname_result = 7510,
	}
	export type c2g_heartbeat = {
		packet_id?:number;//uint32   default=301
	}
	export type c2s_connect = {
		packet_id?:number;//uint32   default=5001
		account?:string;
		token?:string;
		sign?:string;
		platform?:string;
		login_platform?:string;
		machine_code?:string;
		machine_type?:string;
		channelid?:number;//int32
	}
	export type c2s_asklogin = {
		packet_id?:number;//uint32   default=5003
	}
	export type c2s_update_playerhead = {
		packet_id?:number;//uint32   default=5010
		headStr?:string;
	}
	export type c2s_update_nickname = {
		packet_id?:number;//uint32   default=5011
		nickName?:string;
	}

	export type g2c_heartbeat = {
		packet_id?:number;//uint32   default=404
	}
	export type msg_t2t_start = {
		packet_id?:number;//uint32   default=444
	}
	export type s2c_connect_result = {
		packet_id?:number;//uint32   default=5001
		result?:number;//int32
		servertime?:number;//int32
		gaming?:number;//int32
		ver?:string;
	}
	export type s2c_asklogin_result = {
		packet_id?:number;//uint32   default=7503
		account_info?:msg_account_info;
		game_list:msg_game_info[];
		gaming?:number;//int32
	}
	export type s2c_update_playerhead_result = {
		packet_id?:number;//uint32   default=7509
		headstr?:string;
		result?:number;//int32
	}
	export type s2c_update_nickname_result = {
		packet_id?:number;//uint32   default=7510
		nickName?:string;
		result?:number;//int32
	}

	export type msg_game_info = {
		gameid?:number;//int32
		gamever?:number;//int32
		curOnlineNum?:number;//int32
		isHot?:boolean;
	}
	export type msg_account_info = {
		aid?:number;//int32
		channelId?:number;//int32
		nickname?:string;
		gold?:number;//int64
		viplvl?:number;//int32
		vipexp?:number;//int32
		icon_custom?:string;
		sex?:number;//int32
		Ticket?:number;//int32
		curPhotoFrameId?:number;//int32
		payids:number[];//int32
		isSafeDepositBoxPwdEmpty?:boolean;
		safeBoxGold?:number;//int64
		collected?:number;//int32
		updateNicknameCount?:number;//int32
		isBindMobilePhone?:boolean;
		create_time?:number;//int32
		Privilege?:number;//int32
		lastGameId?:number;//int32
		isFormal?:boolean;//   default=1
		BindInfo?:string;
		RealName?:string;
		Recharged?:number;//int32
		inviter_id?:number;//int32
		water?:number;//int32
		inviter_reward_count?:number;//int32
		withdraw?:number;//int32
		sevenday_done?:boolean;
		quest_list:number[];//int32
		limit_time_photo?:number;//int32
		ipinfo?:string;
		inviter_reward?:number;//int64
	}

	export let c2sEncode={"301":{"packet_id":[1,0,1,0,301]},"5001":{"packet_id":[1,0,1,0,5001],"account":[2,5,1,0],"token":[3,5,1,0],"sign":[4,5,1,0],"platform":[5,5,1,0],"login_platform":[6,5,1,0],"machine_code":[7,5,1,0],"machine_type":[8,5,1,0],"channelid":[9,1,1,0]},"5003":{"packet_id":[1,0,1,0,5003]},"5010":{"packet_id":[1,0,1,0,5010],"headStr":[2,5,1,0]},"5011":{"packet_id":[1,0,1,0,5011],"nickName":[2,5,1,0]}};
	export let s2cDecode={"404":{"1":["packet_id",0,1,0,404]},"444":{"1":["packet_id",0,1,0,444]},"7501":{"1":["packet_id",0,1,0,5001],"2":["result",1,1,0],"3":["servertime",1,1,0],"4":["gaming",1,1,0],"5":["ver",5,1,0]},"7503":{"1":["packet_id",0,1,0,7503],"2":["account_info",11,1,0],"3":["game_list",10,0,1],"4":["gaming",1,1,0]},"7509":{"1":["packet_id",0,1,0,7509],"2":["headstr",5,1,0],"3":["result",1,1,0]},"7510":{"1":["packet_id",0,1,0,7510],"2":["nickName",5,1,0],"3":["result",1,1,0]}};
	export let typeDecode={"10":{"1":["gameid",1,1,0],"2":["gamever",1,1,0],"3":["curOnlineNum",1,1,0],"4":["isHot",2,1,0]},"11":{"1":["aid",1,1,0],"2":["channelId",1,1,0],"3":["nickname",5,1,0],"4":["gold",3,1,0],"5":["viplvl",1,1,0],"6":["vipexp",1,1,0],"8":["icon_custom",5,1,0],"9":["sex",1,1,0],"14":["Ticket",1,1,0],"16":["curPhotoFrameId",1,1,0],"19":["payids",1,0,1],"20":["isSafeDepositBoxPwdEmpty",2,1,0],"21":["safeBoxGold",3,1,0],"22":["collected",1,1,0],"26":["updateNicknameCount",1,1,0],"27":["isBindMobilePhone",2,1,0],"36":["create_time",1,1,0],"44":["Privilege",1,1,0],"46":["lastGameId",1,1,0],"47":["isFormal",2,1,0,1],"48":["BindInfo",5,1,0],"49":["RealName",5,1,0],"52":["Recharged",1,1,0],"53":["inviter_id",1,1,0],"54":["water",1,1,0],"55":["inviter_reward_count",1,1,0],"56":["withdraw",1,1,0],"57":["sevenday_done",2,1,0],"58":["quest_list",1,0,1],"59":["limit_time_photo",1,1,0],"60":["ipinfo",5,1,0],"61":["inviter_reward",3,1,0]}};
}