-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
module('pump_type_pb')


PROPERTYREASONTYPE = protobuf.EnumDescriptor();
PROPERTYREASONTYPE_TYPE_DEFAULT_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_DIAL_LOTTERY_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_ONLINE_REWARD_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_DEPOSIT_SAFEBOX_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_DRAW_SAFEBOX_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_SEND_GIFT_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_ACCEPT_GIFT_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_PLAYER_NOTIFY_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_EXCHANGE_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_GAIN_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ALMS_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_SINGLE_ROUND_BALANCE_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_EXPEND_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHLEVEL_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHITEM_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_FISH_UPLEVEL_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_NEW_GUILD_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_UPDATE_ICON_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_MODIFY_NICKNAME_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_SEND_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_SEND_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_MONTH_CARD_DAILY_RECV_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_GIFT_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_DAILY_SIGN_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_DAILY_BOX_LOTTERY_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_THANK_YOU_EXCHANGE_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_CONTINUOUS_SEND_SPEAKER_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_MAIL_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_FISHLORD_DROP_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_CREATE_ACCOUNT_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ACTIVITY_REWARD_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_ROB_BANKER_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_LEAVE_BANKER_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_USE_SKILL_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_DOUBLE_GAME_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_DRAGONS_LV_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_STAR_AWARD_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_STAR_LOTTERY_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_NEW_PLAYER_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_DAILY_TASK_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_ACHIEVEMENT_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_MISSILE_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_LOTTERY_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_SHOPPING_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_CDK_EXCHANGE_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_RETURN_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_BIND_REWARD_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_SHARE_REWARD_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_SEVENDAY_REWARD_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_INVITER_REWARD_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_INVITER_RANKLIST_ENUM = protobuf.EnumValueDescriptor();
PROPERTYREASONTYPE_TYPE_REASON_BANKER_SETTLE_ENUM = protobuf.EnumValueDescriptor();

PROPERTYREASONTYPE_TYPE_DEFAULT_ENUM.name = "type_default"
PROPERTYREASONTYPE_TYPE_DEFAULT_ENUM.index = 0
PROPERTYREASONTYPE_TYPE_DEFAULT_ENUM.number = -1
PROPERTYREASONTYPE_TYPE_REASON_DIAL_LOTTERY_ENUM.name = "type_reason_dial_lottery"
PROPERTYREASONTYPE_TYPE_REASON_DIAL_LOTTERY_ENUM.index = 1
PROPERTYREASONTYPE_TYPE_REASON_DIAL_LOTTERY_ENUM.number = 1
PROPERTYREASONTYPE_TYPE_REASON_ONLINE_REWARD_ENUM.name = "type_reason_online_reward"
PROPERTYREASONTYPE_TYPE_REASON_ONLINE_REWARD_ENUM.index = 2
PROPERTYREASONTYPE_TYPE_REASON_ONLINE_REWARD_ENUM.number = 2
PROPERTYREASONTYPE_TYPE_REASON_DEPOSIT_SAFEBOX_ENUM.name = "type_reason_deposit_safebox"
PROPERTYREASONTYPE_TYPE_REASON_DEPOSIT_SAFEBOX_ENUM.index = 3
PROPERTYREASONTYPE_TYPE_REASON_DEPOSIT_SAFEBOX_ENUM.number = 3
PROPERTYREASONTYPE_TYPE_REASON_DRAW_SAFEBOX_ENUM.name = "type_reason_draw_safebox"
PROPERTYREASONTYPE_TYPE_REASON_DRAW_SAFEBOX_ENUM.index = 4
PROPERTYREASONTYPE_TYPE_REASON_DRAW_SAFEBOX_ENUM.number = 4
PROPERTYREASONTYPE_TYPE_REASON_SEND_GIFT_ENUM.name = "type_reason_send_gift"
PROPERTYREASONTYPE_TYPE_REASON_SEND_GIFT_ENUM.index = 5
PROPERTYREASONTYPE_TYPE_REASON_SEND_GIFT_ENUM.number = 5
PROPERTYREASONTYPE_TYPE_REASON_ACCEPT_GIFT_ENUM.name = "type_reason_accept_gift"
PROPERTYREASONTYPE_TYPE_REASON_ACCEPT_GIFT_ENUM.index = 6
PROPERTYREASONTYPE_TYPE_REASON_ACCEPT_GIFT_ENUM.number = 6
PROPERTYREASONTYPE_TYPE_REASON_PLAYER_NOTIFY_ENUM.name = "type_reason_player_notify"
PROPERTYREASONTYPE_TYPE_REASON_PLAYER_NOTIFY_ENUM.index = 7
PROPERTYREASONTYPE_TYPE_REASON_PLAYER_NOTIFY_ENUM.number = 7
PROPERTYREASONTYPE_TYPE_REASON_EXCHANGE_ENUM.name = "type_reason_exchange"
PROPERTYREASONTYPE_TYPE_REASON_EXCHANGE_ENUM.index = 8
PROPERTYREASONTYPE_TYPE_REASON_EXCHANGE_ENUM.number = 8
PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_GAIN_ENUM.name = "type_reason_buy_commodity_gain"
PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_GAIN_ENUM.index = 9
PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_GAIN_ENUM.number = 9
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ALMS_ENUM.name = "type_reason_receive_alms"
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ALMS_ENUM.index = 10
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ALMS_ENUM.number = 10
PROPERTYREASONTYPE_TYPE_REASON_SINGLE_ROUND_BALANCE_ENUM.name = "type_reason_single_round_balance"
PROPERTYREASONTYPE_TYPE_REASON_SINGLE_ROUND_BALANCE_ENUM.index = 11
PROPERTYREASONTYPE_TYPE_REASON_SINGLE_ROUND_BALANCE_ENUM.number = 11
PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_EXPEND_ENUM.name = "type_reason_buy_commodity_expend"
PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_EXPEND_ENUM.index = 12
PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_EXPEND_ENUM.number = 12
PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHLEVEL_ENUM.name = "type_reason_buy_fishlevel"
PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHLEVEL_ENUM.index = 13
PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHLEVEL_ENUM.number = 13
PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHITEM_ENUM.name = "type_reason_buy_fishitem"
PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHITEM_ENUM.index = 14
PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHITEM_ENUM.number = 14
PROPERTYREASONTYPE_TYPE_REASON_FISH_UPLEVEL_ENUM.name = "type_reason_fish_uplevel"
PROPERTYREASONTYPE_TYPE_REASON_FISH_UPLEVEL_ENUM.index = 15
PROPERTYREASONTYPE_TYPE_REASON_FISH_UPLEVEL_ENUM.number = 15
PROPERTYREASONTYPE_TYPE_REASON_NEW_GUILD_ENUM.name = "type_reason_new_guild"
PROPERTYREASONTYPE_TYPE_REASON_NEW_GUILD_ENUM.index = 16
PROPERTYREASONTYPE_TYPE_REASON_NEW_GUILD_ENUM.number = 16
PROPERTYREASONTYPE_TYPE_REASON_UPDATE_ICON_ENUM.name = "type_reason_update_icon"
PROPERTYREASONTYPE_TYPE_REASON_UPDATE_ICON_ENUM.index = 17
PROPERTYREASONTYPE_TYPE_REASON_UPDATE_ICON_ENUM.number = 17
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_ENUM.name = "type_reason_recharge"
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_ENUM.index = 18
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_ENUM.number = 18
PROPERTYREASONTYPE_TYPE_REASON_MODIFY_NICKNAME_ENUM.name = "type_reason_modify_nickname"
PROPERTYREASONTYPE_TYPE_REASON_MODIFY_NICKNAME_ENUM.index = 19
PROPERTYREASONTYPE_TYPE_REASON_MODIFY_NICKNAME_ENUM.number = 19
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_SEND_ENUM.name = "type_reason_recharge_send"
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_SEND_ENUM.index = 20
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_SEND_ENUM.number = 20
PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_ENUM.name = "type_reason_gm_recharge"
PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_ENUM.index = 21
PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_ENUM.number = 21
PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_SEND_ENUM.name = "type_reason_gm_recharge_send"
PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_SEND_ENUM.index = 22
PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_SEND_ENUM.number = 22
PROPERTYREASONTYPE_TYPE_REASON_MONTH_CARD_DAILY_RECV_ENUM.name = "type_reason_month_card_daily_recv"
PROPERTYREASONTYPE_TYPE_REASON_MONTH_CARD_DAILY_RECV_ENUM.index = 23
PROPERTYREASONTYPE_TYPE_REASON_MONTH_CARD_DAILY_RECV_ENUM.number = 23
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_GIFT_ENUM.name = "type_reason_recharge_gift"
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_GIFT_ENUM.index = 24
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_GIFT_ENUM.number = 24
PROPERTYREASONTYPE_TYPE_REASON_DAILY_SIGN_ENUM.name = "type_reason_daily_sign"
PROPERTYREASONTYPE_TYPE_REASON_DAILY_SIGN_ENUM.index = 25
PROPERTYREASONTYPE_TYPE_REASON_DAILY_SIGN_ENUM.number = 25
PROPERTYREASONTYPE_TYPE_REASON_DAILY_BOX_LOTTERY_ENUM.name = "type_reason_daily_box_lottery"
PROPERTYREASONTYPE_TYPE_REASON_DAILY_BOX_LOTTERY_ENUM.index = 26
PROPERTYREASONTYPE_TYPE_REASON_DAILY_BOX_LOTTERY_ENUM.number = 26
PROPERTYREASONTYPE_TYPE_REASON_THANK_YOU_EXCHANGE_ENUM.name = "type_reason_thank_you_exchange"
PROPERTYREASONTYPE_TYPE_REASON_THANK_YOU_EXCHANGE_ENUM.index = 27
PROPERTYREASONTYPE_TYPE_REASON_THANK_YOU_EXCHANGE_ENUM.number = 27
PROPERTYREASONTYPE_TYPE_REASON_CONTINUOUS_SEND_SPEAKER_ENUM.name = "type_reason_continuous_send_speaker"
PROPERTYREASONTYPE_TYPE_REASON_CONTINUOUS_SEND_SPEAKER_ENUM.index = 28
PROPERTYREASONTYPE_TYPE_REASON_CONTINUOUS_SEND_SPEAKER_ENUM.number = 28
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_MAIL_ENUM.name = "type_reason_receive_mail"
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_MAIL_ENUM.index = 29
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_MAIL_ENUM.number = 29
PROPERTYREASONTYPE_TYPE_REASON_FISHLORD_DROP_ENUM.name = "type_reason_fishlord_drop"
PROPERTYREASONTYPE_TYPE_REASON_FISHLORD_DROP_ENUM.index = 30
PROPERTYREASONTYPE_TYPE_REASON_FISHLORD_DROP_ENUM.number = 30
PROPERTYREASONTYPE_TYPE_REASON_CREATE_ACCOUNT_ENUM.name = "type_reason_create_account"
PROPERTYREASONTYPE_TYPE_REASON_CREATE_ACCOUNT_ENUM.index = 31
PROPERTYREASONTYPE_TYPE_REASON_CREATE_ACCOUNT_ENUM.number = 31
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ACTIVITY_REWARD_ENUM.name = "type_reason_receive_activity_reward"
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ACTIVITY_REWARD_ENUM.index = 32
PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ACTIVITY_REWARD_ENUM.number = 32
PROPERTYREASONTYPE_TYPE_REASON_ROB_BANKER_ENUM.name = "type_reason_rob_banker"
PROPERTYREASONTYPE_TYPE_REASON_ROB_BANKER_ENUM.index = 33
PROPERTYREASONTYPE_TYPE_REASON_ROB_BANKER_ENUM.number = 33
PROPERTYREASONTYPE_TYPE_REASON_LEAVE_BANKER_ENUM.name = "type_reason_leave_banker"
PROPERTYREASONTYPE_TYPE_REASON_LEAVE_BANKER_ENUM.index = 34
PROPERTYREASONTYPE_TYPE_REASON_LEAVE_BANKER_ENUM.number = 34
PROPERTYREASONTYPE_TYPE_REASON_USE_SKILL_ENUM.name = "type_reason_use_skill"
PROPERTYREASONTYPE_TYPE_REASON_USE_SKILL_ENUM.index = 35
PROPERTYREASONTYPE_TYPE_REASON_USE_SKILL_ENUM.number = 35
PROPERTYREASONTYPE_TYPE_REASON_DOUBLE_GAME_ENUM.name = "type_reason_double_game"
PROPERTYREASONTYPE_TYPE_REASON_DOUBLE_GAME_ENUM.index = 36
PROPERTYREASONTYPE_TYPE_REASON_DOUBLE_GAME_ENUM.number = 36
PROPERTYREASONTYPE_TYPE_REASON_DRAGONS_LV_ENUM.name = "type_reason_dragons_lv"
PROPERTYREASONTYPE_TYPE_REASON_DRAGONS_LV_ENUM.index = 37
PROPERTYREASONTYPE_TYPE_REASON_DRAGONS_LV_ENUM.number = 37
PROPERTYREASONTYPE_TYPE_REASON_STAR_AWARD_ENUM.name = "type_reason_star_award"
PROPERTYREASONTYPE_TYPE_REASON_STAR_AWARD_ENUM.index = 38
PROPERTYREASONTYPE_TYPE_REASON_STAR_AWARD_ENUM.number = 38
PROPERTYREASONTYPE_TYPE_REASON_STAR_LOTTERY_ENUM.name = "type_reason_star_lottery"
PROPERTYREASONTYPE_TYPE_REASON_STAR_LOTTERY_ENUM.index = 39
PROPERTYREASONTYPE_TYPE_REASON_STAR_LOTTERY_ENUM.number = 39
PROPERTYREASONTYPE_TYPE_REASON_NEW_PLAYER_ENUM.name = "type_reason_new_player"
PROPERTYREASONTYPE_TYPE_REASON_NEW_PLAYER_ENUM.index = 40
PROPERTYREASONTYPE_TYPE_REASON_NEW_PLAYER_ENUM.number = 40
PROPERTYREASONTYPE_TYPE_REASON_DAILY_TASK_ENUM.name = "type_reason_daily_task"
PROPERTYREASONTYPE_TYPE_REASON_DAILY_TASK_ENUM.index = 41
PROPERTYREASONTYPE_TYPE_REASON_DAILY_TASK_ENUM.number = 41
PROPERTYREASONTYPE_TYPE_REASON_ACHIEVEMENT_ENUM.name = "type_reason_achievement"
PROPERTYREASONTYPE_TYPE_REASON_ACHIEVEMENT_ENUM.index = 42
PROPERTYREASONTYPE_TYPE_REASON_ACHIEVEMENT_ENUM.number = 42
PROPERTYREASONTYPE_TYPE_REASON_MISSILE_ENUM.name = "type_reason_missile"
PROPERTYREASONTYPE_TYPE_REASON_MISSILE_ENUM.index = 43
PROPERTYREASONTYPE_TYPE_REASON_MISSILE_ENUM.number = 43
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_LOTTERY_ENUM.name = "type_reason_recharge_lottery"
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_LOTTERY_ENUM.index = 44
PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_LOTTERY_ENUM.number = 44
PROPERTYREASONTYPE_TYPE_REASON_SHOPPING_ENUM.name = "type_reason_shopping"
PROPERTYREASONTYPE_TYPE_REASON_SHOPPING_ENUM.index = 45
PROPERTYREASONTYPE_TYPE_REASON_SHOPPING_ENUM.number = 45
PROPERTYREASONTYPE_CDK_EXCHANGE_ENUM.name = "cdk_exchange"
PROPERTYREASONTYPE_CDK_EXCHANGE_ENUM.index = 46
PROPERTYREASONTYPE_CDK_EXCHANGE_ENUM.number = 46
PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_ENUM.name = "type_reason_alipay_transfer"
PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_ENUM.index = 47
PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_ENUM.number = 47
PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_RETURN_ENUM.name = "type_reason_alipay_transfer_return"
PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_RETURN_ENUM.index = 48
PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_RETURN_ENUM.number = 48
PROPERTYREASONTYPE_TYPE_REASON_BIND_REWARD_ENUM.name = "type_reason_bind_reward"
PROPERTYREASONTYPE_TYPE_REASON_BIND_REWARD_ENUM.index = 49
PROPERTYREASONTYPE_TYPE_REASON_BIND_REWARD_ENUM.number = 49
PROPERTYREASONTYPE_TYPE_REASON_SHARE_REWARD_ENUM.name = "type_reason_share_reward"
PROPERTYREASONTYPE_TYPE_REASON_SHARE_REWARD_ENUM.index = 50
PROPERTYREASONTYPE_TYPE_REASON_SHARE_REWARD_ENUM.number = 50
PROPERTYREASONTYPE_TYPE_REASON_SEVENDAY_REWARD_ENUM.name = "type_reason_sevenday_reward"
PROPERTYREASONTYPE_TYPE_REASON_SEVENDAY_REWARD_ENUM.index = 51
PROPERTYREASONTYPE_TYPE_REASON_SEVENDAY_REWARD_ENUM.number = 51
PROPERTYREASONTYPE_TYPE_REASON_INVITER_REWARD_ENUM.name = "type_reason_inviter_reward"
PROPERTYREASONTYPE_TYPE_REASON_INVITER_REWARD_ENUM.index = 52
PROPERTYREASONTYPE_TYPE_REASON_INVITER_REWARD_ENUM.number = 52
PROPERTYREASONTYPE_TYPE_REASON_INVITER_RANKLIST_ENUM.name = "type_reason_inviter_ranklist"
PROPERTYREASONTYPE_TYPE_REASON_INVITER_RANKLIST_ENUM.index = 53
PROPERTYREASONTYPE_TYPE_REASON_INVITER_RANKLIST_ENUM.number = 53
PROPERTYREASONTYPE_TYPE_REASON_BANKER_SETTLE_ENUM.name = "type_reason_banker_settle"
PROPERTYREASONTYPE_TYPE_REASON_BANKER_SETTLE_ENUM.index = 54
PROPERTYREASONTYPE_TYPE_REASON_BANKER_SETTLE_ENUM.number = 54
PROPERTYREASONTYPE.name = "PropertyReasonType"
PROPERTYREASONTYPE.full_name = ".PropertyReasonType"
PROPERTYREASONTYPE.values = {PROPERTYREASONTYPE_TYPE_DEFAULT_ENUM,PROPERTYREASONTYPE_TYPE_REASON_DIAL_LOTTERY_ENUM,PROPERTYREASONTYPE_TYPE_REASON_ONLINE_REWARD_ENUM,PROPERTYREASONTYPE_TYPE_REASON_DEPOSIT_SAFEBOX_ENUM,PROPERTYREASONTYPE_TYPE_REASON_DRAW_SAFEBOX_ENUM,PROPERTYREASONTYPE_TYPE_REASON_SEND_GIFT_ENUM,PROPERTYREASONTYPE_TYPE_REASON_ACCEPT_GIFT_ENUM,PROPERTYREASONTYPE_TYPE_REASON_PLAYER_NOTIFY_ENUM,PROPERTYREASONTYPE_TYPE_REASON_EXCHANGE_ENUM,PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_GAIN_ENUM,PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ALMS_ENUM,PROPERTYREASONTYPE_TYPE_REASON_SINGLE_ROUND_BALANCE_ENUM,PROPERTYREASONTYPE_TYPE_REASON_BUY_COMMODITY_EXPEND_ENUM,PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHLEVEL_ENUM,PROPERTYREASONTYPE_TYPE_REASON_BUY_FISHITEM_ENUM,PROPERTYREASONTYPE_TYPE_REASON_FISH_UPLEVEL_ENUM,PROPERTYREASONTYPE_TYPE_REASON_NEW_GUILD_ENUM,PROPERTYREASONTYPE_TYPE_REASON_UPDATE_ICON_ENUM,PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_ENUM,PROPERTYREASONTYPE_TYPE_REASON_MODIFY_NICKNAME_ENUM,PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_SEND_ENUM,PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_ENUM,PROPERTYREASONTYPE_TYPE_REASON_GM_RECHARGE_SEND_ENUM,PROPERTYREASONTYPE_TYPE_REASON_MONTH_CARD_DAILY_RECV_ENUM,PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_GIFT_ENUM,PROPERTYREASONTYPE_TYPE_REASON_DAILY_SIGN_ENUM,PROPERTYREASONTYPE_TYPE_REASON_DAILY_BOX_LOTTERY_ENUM,PROPERTYREASONTYPE_TYPE_REASON_THANK_YOU_EXCHANGE_ENUM,PROPERTYREASONTYPE_TYPE_REASON_CONTINUOUS_SEND_SPEAKER_ENUM,PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_MAIL_ENUM,PROPERTYREASONTYPE_TYPE_REASON_FISHLORD_DROP_ENUM,PROPERTYREASONTYPE_TYPE_REASON_CREATE_ACCOUNT_ENUM,PROPERTYREASONTYPE_TYPE_REASON_RECEIVE_ACTIVITY_REWARD_ENUM,PROPERTYREASONTYPE_TYPE_REASON_ROB_BANKER_ENUM,PROPERTYREASONTYPE_TYPE_REASON_LEAVE_BANKER_ENUM,PROPERTYREASONTYPE_TYPE_REASON_USE_SKILL_ENUM,PROPERTYREASONTYPE_TYPE_REASON_DOUBLE_GAME_ENUM,PROPERTYREASONTYPE_TYPE_REASON_DRAGONS_LV_ENUM,PROPERTYREASONTYPE_TYPE_REASON_STAR_AWARD_ENUM,PROPERTYREASONTYPE_TYPE_REASON_STAR_LOTTERY_ENUM,PROPERTYREASONTYPE_TYPE_REASON_NEW_PLAYER_ENUM,PROPERTYREASONTYPE_TYPE_REASON_DAILY_TASK_ENUM,PROPERTYREASONTYPE_TYPE_REASON_ACHIEVEMENT_ENUM,PROPERTYREASONTYPE_TYPE_REASON_MISSILE_ENUM,PROPERTYREASONTYPE_TYPE_REASON_RECHARGE_LOTTERY_ENUM,PROPERTYREASONTYPE_TYPE_REASON_SHOPPING_ENUM,PROPERTYREASONTYPE_CDK_EXCHANGE_ENUM,PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_ENUM,PROPERTYREASONTYPE_TYPE_REASON_ALIPAY_TRANSFER_RETURN_ENUM,PROPERTYREASONTYPE_TYPE_REASON_BIND_REWARD_ENUM,PROPERTYREASONTYPE_TYPE_REASON_SHARE_REWARD_ENUM,PROPERTYREASONTYPE_TYPE_REASON_SEVENDAY_REWARD_ENUM,PROPERTYREASONTYPE_TYPE_REASON_INVITER_REWARD_ENUM,PROPERTYREASONTYPE_TYPE_REASON_INVITER_RANKLIST_ENUM,PROPERTYREASONTYPE_TYPE_REASON_BANKER_SETTLE_ENUM}

cdk_exchange = 46
type_default = -1
type_reason_accept_gift = 6
type_reason_achievement = 42
type_reason_alipay_transfer = 47
type_reason_alipay_transfer_return = 48
type_reason_banker_settle = 54
type_reason_bind_reward = 49
type_reason_buy_commodity_expend = 12
type_reason_buy_commodity_gain = 9
type_reason_buy_fishitem = 14
type_reason_buy_fishlevel = 13
type_reason_continuous_send_speaker = 28
type_reason_create_account = 31
type_reason_daily_box_lottery = 26
type_reason_daily_sign = 25
type_reason_daily_task = 41
type_reason_deposit_safebox = 3
type_reason_dial_lottery = 1
type_reason_double_game = 36
type_reason_dragons_lv = 37
type_reason_draw_safebox = 4
type_reason_exchange = 8
type_reason_fish_uplevel = 15
type_reason_fishlord_drop = 30
type_reason_gm_recharge = 21
type_reason_gm_recharge_send = 22
type_reason_inviter_ranklist = 53
type_reason_inviter_reward = 52
type_reason_leave_banker = 34
type_reason_missile = 43
type_reason_modify_nickname = 19
type_reason_month_card_daily_recv = 23
type_reason_new_guild = 16
type_reason_new_player = 40
type_reason_online_reward = 2
type_reason_player_notify = 7
type_reason_receive_activity_reward = 32
type_reason_receive_alms = 10
type_reason_receive_mail = 29
type_reason_recharge = 18
type_reason_recharge_gift = 24
type_reason_recharge_lottery = 44
type_reason_recharge_send = 20
type_reason_rob_banker = 33
type_reason_send_gift = 5
type_reason_sevenday_reward = 51
type_reason_share_reward = 50
type_reason_shopping = 45
type_reason_single_round_balance = 11
type_reason_star_award = 38
type_reason_star_lottery = 39
type_reason_thank_you_exchange = 27
type_reason_update_icon = 17
type_reason_use_skill = 35

