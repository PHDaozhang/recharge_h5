module NET_CONF{
	export const enum C2S_ROUTE_TP {
		c2g_heartbeat = 301,
		c2s_connect = 5001,
		c2s_asklogin = 5003,
		c2s_enter_game = 5004,
		c2s_command = 5005,
		c2s_ask_check_payment = 5006,
		c2s_ask_test_payment = 5007,
		c2s_leave_game = 5008,
		c2s_update_playerhead = 5010,
		c2s_update_nickname = 5011,
		c2s_update_sex = 5012,
		c2s_beneifts = 5037,
		c2s_get_questlist = 5058,
		c2s_receive_questreward = 5059,
		c2s_ask_message = 5080,
		c2s_delete_message = 5081,
		c2s_read_message = 5082,
		c2s_receive_share_reward = 5091,
		c2s_req_faq = 5092,
		c2s_req_faq_detail = 5093,
		c2s_req_cs_contact = 5094,
		c2s_suggestion = 5097,
		c2s_req_suggest = 5098,
		c2s_wechat_share_task = 5100,
		c2s_performance_list = 5120,
		c2s_performance_gain = 5121,
		c2s_performance_child = 5122,
		c2s_performance_check_gain = 5123,
		c2s_performance_team_create = 5124,
		c2s_performance_team_list = 5125,
		c2s_performance_team_info = 5126,
		c2s_performance_team_update = 5127,
		c2s_performance_info = 5128,
		c2s_performance_info_self_today = 5129,
		c2s_performance_info_self_yesterday = 5130,
		c2s_performance_info_agent_today = 5131,
		c2s_performance_info_agent_yesterday = 5132,
		c2s_req_vip_info = 5150,
		c2gs_player_connect = 30001,
		c2gs_player_disconnect = 30002,
		c2gs_game_history = 30003,
		c2gs_activity_accumulate_rmb_info = 5155,
		c2gs_activity_accumulate_rmb_apply = 5156,
		c2gs_activity_accumulate_rmb_reward = 5157,
		c2gs_activity_check = 5143,
		c2gs_activity_accumulate_per_info = 5158,
		c2gs_activity_accumulate_per_apply = 5159,
		c2gs_activity_accumulate_per_reward = 5160,
	}
	export const enum S2C_ROUTE_TP {
		s2c_send_msglist = 401,
		g2c_heartbeat = 404,
		msg_t2t_start = 444,
		s2c_connect_result = 7501,
		s2c_asklogin_result = 7503,
		s2c_enter_game_result = 7504,
		s2c_command_result = 7505,
		s2c_ask_check_payment_result = 7506,
		s2c_leave_game_result = 7507,
		s2c_update_playerhead_result = 7509,
		s2c_update_nickname_result = 7510,
		s2c_update_sex_result = 7511,
		s2c_w2c_notify = 7523,
		s2c_benefits_result = 7539,
		s2c_get_questlist_result = 7561,
		s2c_receive_questreward_result = 7562,
		s2c_change_quest = 7563,
		s2c_ask_message_result = 7586,
		s2c_delete_message_result = 7587,
		s2c_read_message_result = 7588,
		s2c_bind_reward = 7589,
		s2c_notify_share = 7599,
		s2c_receive_share_reward_result = 7600,
		s2c_req_faq_result = 7601,
		s2c_req_faq_detail_result = 7602,
		s2c_req_cs_contact_result = 7603,
		s2c_suggestion_result = 7606,
		s2c_req_suggest_result = 7607,
		s2c_notify_task_reflush = 7609,
		s2c_performance_list_result = 7631,
		s2c_performance_gain_result = 7632,
		s2c_performance_child_result = 7633,
		s2c_performance_check_gain_result = 7634,
		s2c_performance_team_create_result = 7635,
		s2c_performance_team_list_result = 7636,
		s2c_performance_team_info_result = 7637,
		s2c_performance_team_update_result = 7638,
		s2c_performance_info_result = 7639,
		s2c_performance_info_self_today_result = 7640,
		s2c_performance_info_self_yesterday_result = 7641,
		s2c_performance_info_agent_today_result = 7642,
		s2c_performance_info_agent_yesterday_result = 7643,
		s2c_req_vip_info_result = 7660,
		gs2c_player_connect_result = 31001,
		gs2c_player_disconnect_result = 31002,
		gs2c_activity_accumulate_rmb_info_result = 7665,
		gs2c_activity_accumulate_rmb_apply_result = 7666,
		gs2c_activity_accumulate_rmb_reward_result = 7667,
		gs2c_activity_check_result = 7649,
		gs2c_activity_accumulate_per_info_result = 7668,
		gs2c_activity_accumulate_per_apply_result = 7669,
		gs2c_activity_accumulate_per_reward_result = 7670,
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
		channelid?:string;
	}
	export type c2s_enter_game = {
		packet_id?:number;//uint32   default=5004
		gameid?:number;//int32
		gamever?:number;//int32
		roomid?:number;//int32   default=-1
	}
	export type c2s_command = {
		packet_id?:number;//uint32   default=5005
		command?:string;
	}
	export type c2s_ask_check_payment = {
		packet_id?:number;//uint32   default=5006
		orderid?:string;
	}
	export type c2s_ask_test_payment = {
		packet_id?:number;//uint32   default=5007
		pay_type?:number;//int32
		pay_value?:number;//int32
	}
	export type c2s_leave_game = {
		packet_id?:number;//uint32   default=5008
	}
	export type c2s_update_playerhead = {
		packet_id?:number;//uint32   default=5010
		headStr?:string;
	}
	export type c2s_update_nickname = {
		packet_id?:number;//uint32   default=5011
		nickName?:string;
	}
	export type c2s_update_sex = {
		packet_id?:number;//uint32   default=5012
		sex?:number;//int32
	}
	export type c2s_beneifts = {
		packet_id?:number;//uint32   default=5037
	}
	export type c2s_get_questlist = {
		packet_id?:number;//uint32   default=5058
	}
	export type c2s_receive_questreward = {
		packet_id?:number;//uint32   default=5059
		questid?:number;//int32
	}
	export type c2s_ask_message = {
		packet_id?:number;//uint32   default=5080
	}
	export type c2s_delete_message = {
		packet_id?:number;//uint32   default=5081
		delete_list:string[];
	}
	export type c2s_read_message = {
		packet_id?:number;//uint32   default=5082
		id?:string;
	}
	export type c2s_receive_share_reward = {
		packet_id?:number;//uint32   default=5091
	}
	export type c2s_req_faq = {
		packet_id?:number;//uint32   default=5092
	}
	export type c2s_req_faq_detail = {
		packet_id?:number;//uint32   default=5093
		index?:number;//int32
	}
	export type c2s_req_cs_contact = {
		packet_id?:number;//uint32   default=5094
	}
	export type c2s_suggestion = {
		packet_id?:number;//uint32   default=5097
		text?:string;
	}
	export type c2s_req_suggest = {
		packet_id?:number;//uint32   default=5098
	}
	export type c2s_wechat_share_task = {
		packet_id?:number;//uint32   default=5100
	}
	export type c2s_performance_list = {
		packet_id?:number;//uint32   default=5120
	}
	export type c2s_performance_gain = {
		packet_id?:number;//uint32   default=5121
	}
	export type c2s_performance_child = {
		packet_id?:number;//uint32   default=5122
		player_id?:number;//int32
	}
	export type c2s_performance_check_gain = {
		packet_id?:number;//uint32   default=5123
	}
	export type c2s_performance_team_create = {
		packet_id?:number;//uint32   default=5124
		count?:number;//int32
		nick_name?:string;
	}
	export type c2s_performance_team_list = {
		packet_id?:number;//uint32   default=5125
	}
	export type c2s_performance_team_info = {
		packet_id?:number;//uint32   default=5126
		team_id?:number;//int32
	}
	export type c2s_performance_team_update = {
		packet_id?:number;//uint32   default=5127
		optype?:number;//int32
		team_id?:number;//int32
		limit?:number;//int32
		nick_name?:string;
	}
	export type c2s_performance_info = {
		packet_id?:number;//uint32   default=5128
	}
	export type c2s_performance_info_self_today = {
		packet_id?:number;//uint32   default=5129
	}
	export type c2s_performance_info_self_yesterday = {
		packet_id?:number;//uint32   default=5130
	}
	export type c2s_performance_info_agent_today = {
		packet_id?:number;//uint32   default=5131
	}
	export type c2s_performance_info_agent_yesterday = {
		packet_id?:number;//uint32   default=5132
	}
	export type c2s_req_vip_info = {
		packet_id?:number;//uint32   default=5150
	}
	export type c2gs_player_connect = {
		packet_id?:number;//uint32   default=30001
		playerid?:number;//int32
		gameid?:number;//int32
	}
	export type c2gs_player_disconnect = {
		packet_id?:number;//uint32   default=30002
		playerid?:number;//int32
	}
	export type c2gs_game_history = {
		packet_id?:number;//uint32   default=30003
		gameid?:number;//int32
	}
	export type c2gs_activity_accumulate_rmb_info = {
		packet_id?:number;//uint32   default=5155
	}
	export type c2gs_activity_accumulate_rmb_apply = {
		packet_id?:number;//uint32   default=5156
	}
	export type c2gs_activity_accumulate_rmb_reward = {
		packet_id?:number;//uint32   default=5157
	}
	export type c2gs_activity_check = {
		packet_id?:number;//uint32   default=5143
	}
	export type c2gs_activity_accumulate_per_info = {
		packet_id?:number;//uint32   default=5158
	}
	export type c2gs_activity_accumulate_per_apply = {
		packet_id?:number;//uint32   default=5159
	}
	export type c2gs_activity_accumulate_per_reward = {
		packet_id?:number;//uint32   default=5160
	}

	export type s2c_send_msglist = {
		packet_id?:number;//uint32   default=401
		msgpaks:msg_list[];
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
	export type s2c_enter_game_result = {
		packet_id?:number;//uint32   default=7504
		result?:number;//int32   default=2
	}
	export type s2c_command_result = {
		packet_id?:number;//uint32   default=7505
		result?:number;//int32   default=2
	}
	export type s2c_ask_check_payment_result = {
		packet_id?:number;//uint32   default=7506
		result?:number;//int32   default=2
		pay_type?:number;//int32
		pay_value?:number;//int32
		vip_exp?:number;//int32
		orderid?:string;
	}
	export type s2c_leave_game_result = {
		packet_id?:number;//uint32   default=7507
		shutdown?:boolean;
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
	export type s2c_update_sex_result = {
		packet_id?:number;//uint32   default=7511
		sex?:number;//int32
		result?:number;//int32
	}
	export type s2c_w2c_notify = {
		packet_id?:number;//uint32   default=7523
		content?:string;
		notifyType?:number;//int32
		talkerNickName?:string;
		playerId?:number;//int32
		talkerVIPLevel?:number;//int32
		hasMonthCard?:boolean;
		repCount?:number;//int32   default=1   重复次数，本条消息从左到右共滚动次数
		interval?:number;//int32   重复间隔，条条消息2次滚动之间间隔
		moneyNum?:number;//int32
	}
	export type s2c_benefits_result = {
		packet_id?:number;//uint32   default=7539
		result?:number;//int32
	}
	export type s2c_get_questlist_result = {
		packet_id?:number;//uint32   default=7561
		questlist:msg_quest_info[];
		is_new?:boolean;
	}
	export type s2c_receive_questreward_result = {
		packet_id?:number;//uint32   default=7562
		questid?:number;//int32
		result?:number;//int32
	}
	export type s2c_change_quest = {
		packet_id?:number;//uint32   default=7563
		qinfo?:msg_quest_info;
	}
	export type s2c_ask_message_result = {
		packet_id?:number;//uint32   default=7586
		result?:boolean;
		msg_list:msg_some_info[];
	}
	export type s2c_delete_message_result = {
		packet_id?:number;//uint32   default=7587
		result?:boolean;
	}
	export type s2c_read_message_result = {
		packet_id?:number;//uint32   default=7588
		result?:number;//int32
		id?:string;
	}
	export type s2c_bind_reward = {
		packet_id?:number;//uint32   default=7589
		reward_gold?:number;//int32
	}
	export type s2c_notify_share = {
		packet_id?:number;//uint32   default=7599
		game_id?:number;//int32
		room_id?:number;//int32
		win_gold?:number;//int64
		share_reward?:number;//int32
	}
	export type s2c_receive_share_reward_result = {
		packet_id?:number;//uint32   default=7600
		result?:number;//int32
		reward?:number;//int64
	}
	export type s2c_req_faq_result = {
		packet_id?:number;//uint32   default=7601
		faq_list:msg_faq_def[];
	}
	export type s2c_req_faq_detail_result = {
		packet_id?:number;//uint32   default=7602
		faq?:msg_faq_def;
	}
	export type s2c_req_cs_contact_result = {
		packet_id?:number;//uint32   default=7603
		qq?:string;
	}
	export type s2c_suggestion_result = {
		packet_id?:number;//uint32   default=7606
		result?:number;//int32
		suggest?:msg_suggest;
	}
	export type s2c_req_suggest_result = {
		packet_id?:number;//uint32   default=7607
		list:msg_suggest[];
	}
	export type s2c_notify_task_reflush = {
		packet_id?:number;//uint32   default=7609
	}
	export type s2c_performance_list_result = {
		packet_id?:number;//uint32   default=7631
		info:msg_performance_info[];
	}
	export type s2c_performance_gain_result = {
		packet_id?:number;//uint32   default=7632
		result?:number;//int32
		gain?:number;//int64
	}
	export type s2c_performance_child_result = {
		packet_id?:number;//uint32   default=7633
		info?:msg_performance_info;
	}
	export type s2c_performance_check_gain_result = {
		packet_id?:number;//uint32   default=7634
		gain?:number;//int64
	}
	export type s2c_performance_team_create_result = {
		packet_id?:number;//uint32   default=7635
		result?:number;//int32
		team_id?:number;//int32
		count?:number;//int32
		nick_name?:string;
		code_tag?:number;//int32
	}
	export type s2c_performance_team_list_result = {
		packet_id?:number;//uint32   default=7636
		teams:msg_performance_team[];
	}
	export type s2c_performance_team_info_result = {
		packet_id?:number;//uint32   default=7637
		team:msg_performance_team[];
	}
	export type s2c_performance_team_update_result = {
		packet_id?:number;//uint32   default=7638
		result?:number;//int32
		optype?:number;//int32
		team_id?:number;//int32
		limit?:number;//int32
		nick_name?:string;
		code_tag?:number;//int32
	}
	export type s2c_performance_info_result = {
		packet_id?:number;//uint32   default=7639
		commission_today_team?:number;//int64
		commission_today_self?:number;//int64
		commission_today_agent?:number;//int64
		commission_yesterday_team?:number;//int64
		commission_yesterday_self?:number;//int64
		commission_yesterday_agent?:number;//int64
		per_today_team?:number;//int64
		per_today_self?:number;//int64
		per_today_agent?:number;//int64
		per_yesterday_team?:number;//int64
		per_yesterday_self?:number;//int64
		per_yesterday_agent?:number;//int64
		per_today?:number;//int64
		per_this_week?:number;//int64
		rebate_today?:number;//int64
		rebate_this_week?:number;//int64
		per_b_self_today?:number;//int64
		per_b_child_today?:number;//int64
		per_b_self_yesterday?:number;//int64
		per_b_child_yesterday?:number;//int64
		ac?:number;//int32
		ac_inc?:number;//int32
		ac_inc_yd?:number;//int32
		ac_inc_tw?:number;//int32
		ac_inc_lw?:number;//int32
		ac_inc_tm?:number;//int32
		ac_inc_lm?:number;//int32
	}
	export type s2c_performance_info_self_today_result = {
		packet_id?:number;//uint32   default=7640
		result?:number;//int32
	}
	export type s2c_performance_info_self_yesterday_result = {
		packet_id?:number;//uint32   default=7641
		result?:number;//int32
	}
	export type s2c_performance_info_agent_today_result = {
		packet_id?:number;//uint32   default=7642
		result?:number;//int32
	}
	export type s2c_performance_info_agent_yesterday_result = {
		packet_id?:number;//uint32   default=7643
		result?:number;//int32
	}
	export type s2c_req_vip_info_result = {
		packet_id?:number;//uint32   default=7660
		viplv?:number;//int32
		vipexp?:number;//int64
	}
	export type gs2c_player_connect_result = {
		packet_id?:number;//uint32   default=31001
		result?:number;//int32
	}
	export type gs2c_player_disconnect_result = {
		packet_id?:number;//uint32   default=31002
		result?:number;//int32
	}
	export type gs2c_activity_accumulate_rmb_info_result = {
		packet_id?:number;//uint32   default=7665
		bound?:boolean;//   default=false
		applied?:boolean;//   default=false
		accumulation?:number;//int64
		index?:number;//int32
		index_reward?:number;//int32
		ts_ready?:number;//int32
		ts_begin?:number;//int32
		ts_end?:number;//int32
		ts_off?:number;//int32
	}
	export type gs2c_activity_accumulate_rmb_apply_result = {
		packet_id?:number;//uint32   default=7666
		result?:number;//int32
	}
	export type gs2c_activity_accumulate_rmb_reward_result = {
		packet_id?:number;//uint32   default=7667
		result?:number;//int32
		reward?:number;//int64
		index?:number;//int32
	}
	export type gs2c_activity_check_result = {
		packet_id?:number;//uint32   default=7649
		ac_bind?:boolean;//   default=false
		ac_recharge?:boolean;//   default=false
		ac_recharge_award?:boolean;//   default=false
		ac_chest?:boolean;//   default=false
		ac_chest_new?:boolean;//   default=false
		yun_isshow?:boolean;//   default=false
		yun_rebate?:number;//int32
		month_card?:boolean;//   default=false
		activities:number[];//int32
	}
	export type gs2c_activity_accumulate_per_info_result = {
		packet_id?:number;//uint32   default=7668
		bound?:boolean;//   default=false
		applied?:boolean;//   default=false
		accumulation?:number;//int64
		index?:number;//int32
		index_reward?:number;//int32
		ts_ready?:number;//int32
		ts_begin?:number;//int32
		ts_end?:number;//int32
		ts_off?:number;//int32
	}
	export type gs2c_activity_accumulate_per_apply_result = {
		packet_id?:number;//uint32   default=7669
		result?:number;//int32
	}
	export type gs2c_activity_accumulate_per_reward_result = {
		packet_id?:number;//uint32   default=7670
		result?:number;//int32
		reward?:number;//int64
		index?:number;//int32
	}

	export type msg_list = {
		msgid?:number;//int32
		msginfo?:egret.ByteArray;
	}
	export type msg_game_info = {
		gameid?:number;//int32
		gamever?:number;//int32
		curOnlineNum?:number;//int32
		isHot?:boolean;
		sort?:number;//int32
	}
	export type msg_account_info = {
		aid?:number;//int32
		channelId?:string;
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
		performance?:number;//int64
		ts_ac_bind?:number;//int32
		can_bind_alipay?:boolean;
		cs_token?:string;
	}
	export type msg_quest_info = {
		questid?:number;//int32
		count?:number;//int32
		received?:boolean;
	}
	export type msg_some_info = {
		id?:string;
		userId?:number;//int32
		timeValue?:number;//int64
		msgInfo?:string;
		read?:number;//int32
		items:msg_item[];
	}
	export type msg_item = {
		id?:number;//int32
		count?:number;//int32
	}
	export type msg_faq_def = {
		index?:number;//int32
		text?:string;
	}
	export type msg_suggest = {
		text?:string;
		time?:number;//int64
	}
	export type msg_performance_info = {
		player_id?:number;//int32
		photo_frame?:number;//int32
		nick_name?:string;
		parent?:number;//int32
		per_today?:number;//int64
		per_yesterday?:number;//int64
		per_sub_today?:number;//int64
		per_sub_yesterday?:number;//int64
		per_tw?:number;//int64
		per_lw?:number;//int64
		per_sub_tw?:number;//int64
		per_sub_lw?:number;//int64
		ts_create?:number;//int32
		ac?:number;//int32
		ac_inc?:number;//int32
		ac_inc_yd?:number;//int32
		ac_inc_tw?:number;//int32
		ac_inc_lw?:number;//int32
		ac_inc_tm?:number;//int32
		ac_inc_lm?:number;//int32
		gain_yd?:number;//int64
		gain_tw?:number;//int64
		gain_lw?:number;//int64
		gain?:number;//int64
	}
	export type msg_performance_team = {
		id?:number;//int32
		name?:string;
		count?:number;//int32
		count_limit?:number;//int32
		code_tag?:number;//int32
		ac_inc?:number;//int32
		member_infos:msg_performance_info[];
	}

	export let c2sEncode={"301":{"packet_id":[1,0,1]},"5001":{"packet_id":[1,0,1],"account":[2,5,1],"token":[3,5,1],"sign":[4,5,1],"platform":[5,5,1],"login_platform":[6,5,1],"machine_code":[7,5,1],"machine_type":[8,5,1],"channelid":[9,1,1]},"5003":{"packet_id":[1,0,1],"channelid":[2,5,1]},"5004":{"packet_id":[1,0,1],"gameid":[2,1,1],"gamever":[3,1,1],"roomid":[4,1,1]},"5005":{"packet_id":[1,0,1],"command":[2,5,1]},"5006":{"packet_id":[1,0,1],"orderid":[2,5,1]},"5007":{"packet_id":[1,0,1],"pay_type":[2,1,1],"pay_value":[3,1,1]},"5008":{"packet_id":[1,0,1]},"5010":{"packet_id":[1,0,1],"headStr":[2,5,1]},"5011":{"packet_id":[1,0,1],"nickName":[2,5,1]},"5012":{"packet_id":[1,0,1],"sex":[2,1,1]},"5037":{"packet_id":[1,0,1]},"5058":{"packet_id":[1,0,1]},"5059":{"packet_id":[1,0,1],"questid":[2,1,1]},"5080":{"packet_id":[1,0,1]},"5081":{"packet_id":[1,0,1],"delete_list":[2,5,0,1]},"5082":{"packet_id":[1,0,1],"id":[2,5,1]},"5091":{"packet_id":[1,0,1]},"5092":{"packet_id":[1,0,1]},"5093":{"packet_id":[1,0,1],"index":[2,1,1]},"5094":{"packet_id":[1,0,1]},"5097":{"packet_id":[1,0,1],"text":[2,5,1]},"5098":{"packet_id":[1,0,1]},"5100":{"packet_id":[1,0,1]},"5120":{"packet_id":[1,0,1]},"5121":{"packet_id":[1,0,1]},"5122":{"packet_id":[1,0,1],"player_id":[2,1,1]},"5123":{"packet_id":[1,0,1]},"5124":{"packet_id":[1,0,1],"count":[2,1,1],"nick_name":[3,5,1]},"5125":{"packet_id":[1,0,1]},"5126":{"packet_id":[1,0,1],"team_id":[3,1,1]},"5127":{"packet_id":[1,0,1],"optype":[2,1,1],"team_id":[3,1,1],"limit":[4,1,1],"nick_name":[5,5,1]},"5128":{"packet_id":[1,0,1]},"5129":{"packet_id":[1,0,1]},"5130":{"packet_id":[1,0,1]},"5131":{"packet_id":[1,0,1]},"5132":{"packet_id":[1,0,1]},"5143":{"packet_id":[1,0,1]},"5150":{"packet_id":[1,0,1]},"5155":{"packet_id":[1,0,1]},"5156":{"packet_id":[1,0,1]},"5157":{"packet_id":[1,0,1]},"5158":{"packet_id":[1,0,1]},"5159":{"packet_id":[1,0,1]},"5160":{"packet_id":[1,0,1]},"30001":{"packet_id":[1,0,1],"playerid":[2,1,1],"gameid":[3,1,1]},"30002":{"packet_id":[1,0,1],"playerid":[2,1,1]},"30003":{"packet_id":[1,0,1],"gameid":[2,1,1]}};
	export let s2cDecode={"401":{"1":["packet_id",0,1],"3":["msgpaks",10,0,1]},"404":{"1":["packet_id",0,1]},"444":{"1":["packet_id",0,1]},"7501":{"1":["packet_id",0,1],"2":["result",1,1],"3":["servertime",1,1],"4":["gaming",1,1],"5":["ver",5,1]},"7503":{"1":["packet_id",0,1],"2":["account_info",12,1],"3":["game_list",11,0,1],"4":["gaming",1,1]},"7504":{"1":["packet_id",0,1],"2":["result",1,1]},"7505":{"1":["packet_id",0,1],"2":["result",1,1]},"7506":{"1":["packet_id",0,1],"2":["result",1,1],"3":["pay_type",1,1],"4":["pay_value",1,1],"5":["vip_exp",1,1],"6":["orderid",5,1]},"7507":{"1":["packet_id",0,1],"2":["shutdown",2,1]},"7509":{"1":["packet_id",0,1],"2":["headstr",5,1],"3":["result",1,1]},"7510":{"1":["packet_id",0,1],"2":["nickName",5,1],"3":["result",1,1]},"7511":{"1":["packet_id",0,1],"2":["sex",1,1],"3":["result",1,1]},"7523":{"1":["packet_id",0,1],"2":["content",5,1],"3":["notifyType",1,1],"4":["talkerNickName",5,1],"5":["playerId",1,1],"6":["talkerVIPLevel",1,1],"7":["hasMonthCard",2,1],"8":["repCount",1,1],"9":["interval",1,1],"10":["moneyNum",1,1]},"7539":{"1":["packet_id",0,1],"2":["result",1,1]},"7561":{"1":["packet_id",0,1],"2":["questlist",13,0,1],"3":["is_new",2,1]},"7562":{"1":["packet_id",0,1],"2":["questid",1,1],"3":["result",1,1]},"7563":{"1":["packet_id",0,1],"3":["qinfo",13,1]},"7586":{"1":["packet_id",0,1],"2":["result",2,1],"3":["msg_list",14,0,1]},"7587":{"1":["packet_id",0,1],"2":["result",2,1]},"7588":{"1":["packet_id",0,1],"2":["result",1,1],"3":["id",5,1]},"7589":{"1":["packet_id",0,1],"2":["reward_gold",1,1]},"7599":{"1":["packet_id",0,1],"2":["game_id",1,1],"3":["room_id",1,1],"4":["win_gold",3,1],"5":["share_reward",1,1]},"7600":{"1":["packet_id",0,1],"2":["result",1,1],"3":["reward",3,1]},"7601":{"1":["packet_id",0,1],"2":["faq_list",16,0,1]},"7602":{"1":["packet_id",0,1],"2":["faq",16,1]},"7603":{"1":["packet_id",0,1],"2":["qq",5,1]},"7606":{"1":["packet_id",0,1],"2":["result",1,1],"3":["suggest",17,1]},"7607":{"1":["packet_id",0,1],"2":["list",17,0,1]},"7609":{"1":["packet_id",0,1]},"7631":{"1":["packet_id",0,1],"2":["info",18,0,1]},"7632":{"1":["packet_id",0,1],"2":["result",1,1],"3":["gain",3,1]},"7633":{"1":["packet_id",0,1],"2":["info",18,1]},"7634":{"1":["packet_id",0,1],"2":["gain",3,1]},"7635":{"1":["packet_id",0,1],"2":["result",1,1],"3":["team_id",1,1],"4":["count",1,1],"5":["nick_name",5,1],"6":["code_tag",1,1]},"7636":{"1":["packet_id",0,1],"2":["teams",19,0,1]},"7637":{"1":["packet_id",0,1],"2":["team",19,0,1]},"7638":{"1":["packet_id",0,1],"2":["result",1,1],"3":["optype",1,1],"4":["team_id",1,1],"5":["code_tag",1,1]},"7639":{"1":["packet_id",0,1],"2":["commission_today_team",3,1],"3":["commission_today_self",3,1],"4":["commission_today_agent",3,1],"5":["commission_yesterday_team",3,1],"6":["commission_yesterday_self",3,1],"7":["commission_yesterday_agent",3,1],"8":["per_today_team",3,1],"9":["per_today_self",3,1],"10":["per_today_agent",3,1],"11":["per_yesterday_team",3,1],"12":["per_yesterday_self",3,1],"13":["per_yesterday_agent",3,1],"14":["per_today",3,1],"15":["per_this_week",3,1],"16":["rebate_today",3,1],"17":["rebate_this_week",3,1],"18":["per_b_self_today",3,1],"19":["per_b_child_today",3,1],"20":["per_b_self_yesterday",3,1],"21":["per_b_child_yesterday",3,1],"22":["ac",1,1],"23":["ac_inc",1,1],"24":["ac_inc_yd",1,1],"25":["ac_inc_tw",1,1],"26":["ac_inc_lw",1,1],"27":["ac_inc_tm",1,1],"28":["ac_inc_lm",1,1]},"7640":{"1":["packet_id",0,1],"2":["result",1,1]},"7641":{"1":["packet_id",0,1],"2":["result",1,1]},"7642":{"1":["packet_id",0,1],"2":["result",1,1]},"7643":{"1":["packet_id",0,1],"2":["result",1,1]},"7649":{"1":["packet_id",0,1],"2":["ac_bind",2,1],"3":["ac_recharge",2,1],"4":["ac_recharge_award",2,1],"5":["ac_chest",2,1],"6":["ac_chest_new",2,1],"7":["yun_isshow",2,1],"8":["yun_rebate",1,1],"9":["month_card",2,1],"10":["activities",1,0,1]},"7660":{"1":["packet_id",0,1],"2":["viplv",1,1],"3":["vipexp",3,1]},"7665":{"1":["packet_id",0,1],"2":["bound",2,1],"3":["applied",2,1],"4":["accumulation",3,1],"5":["index",1,1],"6":["index_reward",1,1],"7":["ts_ready",1,1],"8":["ts_begin",1,1],"9":["ts_end",1,1],"10":["ts_off",1,1]},"7666":{"1":["packet_id",0,1],"2":["result",1,1]},"7667":{"1":["packet_id",0,1],"2":["result",1,1],"3":["reward",3,1],"4":["index",1,1]},"7668":{"1":["packet_id",0,1],"2":["bound",2,1],"3":["applied",2,1],"4":["accumulation",3,1],"5":["index",1,1],"6":["index_reward",1,1],"7":["ts_ready",1,1],"8":["ts_begin",1,1],"9":["ts_end",1,1],"10":["ts_off",1,1]},"7669":{"1":["packet_id",0,1],"2":["result",1,1]},"7670":{"1":["packet_id",0,1],"2":["result",1,1],"3":["reward",3,1],"4":["index",1,1]},"31001":{"1":["packet_id",0,1],"2":["result",1,1]},"31002":{"1":["packet_id",0,1],"2":["result",1,1]}};
	export let typeDecode={"10":{"1":["msgid",1,1],"2":["msginfo",6,1]},"11":{"1":["gameid",1,1],"2":["gamever",1,1],"3":["curOnlineNum",1,1],"4":["isHot",2,1],"5":["sort",1,1]},"12":{"1":["aid",1,1],"2":["channelId",5,1],"3":["nickname",5,1],"4":["gold",3,1],"5":["viplvl",1,1],"6":["vipexp",1,1],"8":["icon_custom",5,1],"9":["sex",1,1],"14":["Ticket",1,1],"16":["curPhotoFrameId",1,1],"19":["payids",1,0,1],"20":["isSafeDepositBoxPwdEmpty",2,1],"21":["safeBoxGold",3,1],"22":["collected",1,1],"26":["updateNicknameCount",1,1],"27":["isBindMobilePhone",2,1],"36":["create_time",1,1],"44":["Privilege",1,1],"46":["lastGameId",1,1],"47":["isFormal",2,1],"48":["BindInfo",5,1],"49":["RealName",5,1],"52":["Recharged",1,1],"53":["inviter_id",1,1],"54":["water",1,1],"55":["inviter_reward_count",1,1],"56":["withdraw",1,1],"57":["sevenday_done",2,1],"58":["quest_list",1,0,1],"59":["limit_time_photo",1,1],"60":["ipinfo",5,1],"61":["inviter_reward",3,1],"62":["performance",3,1],"63":["ts_ac_bind",1,1],"64":["can_bind_alipay",2,1],"65":["cs_token",5,1]},"13":{"1":["questid",1,1],"2":["count",1,1],"3":["received",2,1]},"14":{"1":["id",5,1],"2":["userId",1,1],"3":["timeValue",3,1],"4":["msgInfo",5,1],"5":["read",1,1],"6":["items",15,0,1]},"15":{"1":["id",1,1],"2":["count",1,1]},"16":{"1":["index",1,1],"2":["text",5,1]},"17":{"1":["text",5,1],"2":["time",3,1]},"18":{"1":["player_id",1,1],"2":["photo_frame",1,1],"3":["nick_name",5,1],"4":["parent",1,1],"5":["per_today",3,1],"6":["per_yesterday",3,1],"7":["per_sub_today",3,1],"8":["per_sub_yesterday",3,1],"9":["per_tw",3,1],"10":["per_lw",3,1],"11":["per_sub_tw",3,1],"12":["per_sub_lw",3,1],"13":["ts_create",1,1],"14":["ac",1,1],"15":["ac_inc",1,1],"16":["ac_inc_yd",1,1],"17":["ac_inc_tw",1,1],"18":["ac_inc_lw",1,1],"19":["ac_inc_tm",1,1],"20":["ac_inc_lm",1,1],"21":["gain_yd",3,1],"22":["gain_tw",3,1],"23":["gain_lw",3,1],"24":["gain",3,1]},"19":{"1":["id",1,1],"2":["name",5,1],"3":["count",1,1],"4":["count_limit",1,1],"5":["code_tag",1,1],"6":["ac_inc",1,1],"7":["member_infos",18,0,1]}};
}