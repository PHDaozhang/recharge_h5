-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
module('msg_info_def_pb')


MSG_ACCOUNT_INFO = protobuf.Descriptor();
local MSG_ACCOUNT_INFO_AID_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_CHANNELID_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_NICKNAME_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_GOLD_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_VIPLVL_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_VIPEXP_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_SEX_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_TICKET_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_PAYIDS_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_COLLECTED_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_CREATE_TIME_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_PRIVILEGE_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_LASTGAMEID_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_ISFORMAL_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_BINDINFO_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_REALNAME_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_RECHARGED_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_INVITER_ID_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_WATER_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_WITHDRAW_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_QUEST_LIST_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_IPINFO_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_PERFORMANCE_FIELD = protobuf.FieldDescriptor();
MSG_ACCOUNT_INFO_EX = protobuf.Descriptor();
local MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD = protobuf.FieldDescriptor();
local MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD = protobuf.FieldDescriptor();
MSG_ITEM = protobuf.Descriptor();
local MSG_ITEM_ID_FIELD = protobuf.FieldDescriptor();
local MSG_ITEM_COUNT_FIELD = protobuf.FieldDescriptor();
MSG_QUEST_INFO = protobuf.Descriptor();
local MSG_QUEST_INFO_QUESTID_FIELD = protobuf.FieldDescriptor();
local MSG_QUEST_INFO_COUNT_FIELD = protobuf.FieldDescriptor();
local MSG_QUEST_INFO_RECEIVED_FIELD = protobuf.FieldDescriptor();

MSG_ACCOUNT_INFO_AID_FIELD.name = "aid"
MSG_ACCOUNT_INFO_AID_FIELD.full_name = ".msg_info_def.msg_account_info.aid"
MSG_ACCOUNT_INFO_AID_FIELD.number = 1
MSG_ACCOUNT_INFO_AID_FIELD.index = 0
MSG_ACCOUNT_INFO_AID_FIELD.label = 1
MSG_ACCOUNT_INFO_AID_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_AID_FIELD.default_value = 0
MSG_ACCOUNT_INFO_AID_FIELD.type = 5
MSG_ACCOUNT_INFO_AID_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_CHANNELID_FIELD.name = "channelId"
MSG_ACCOUNT_INFO_CHANNELID_FIELD.full_name = ".msg_info_def.msg_account_info.channelId"
MSG_ACCOUNT_INFO_CHANNELID_FIELD.number = 2
MSG_ACCOUNT_INFO_CHANNELID_FIELD.index = 1
MSG_ACCOUNT_INFO_CHANNELID_FIELD.label = 1
MSG_ACCOUNT_INFO_CHANNELID_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_CHANNELID_FIELD.default_value = ""
MSG_ACCOUNT_INFO_CHANNELID_FIELD.type = 9
MSG_ACCOUNT_INFO_CHANNELID_FIELD.cpp_type = 9

MSG_ACCOUNT_INFO_NICKNAME_FIELD.name = "nickname"
MSG_ACCOUNT_INFO_NICKNAME_FIELD.full_name = ".msg_info_def.msg_account_info.nickname"
MSG_ACCOUNT_INFO_NICKNAME_FIELD.number = 3
MSG_ACCOUNT_INFO_NICKNAME_FIELD.index = 2
MSG_ACCOUNT_INFO_NICKNAME_FIELD.label = 1
MSG_ACCOUNT_INFO_NICKNAME_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_NICKNAME_FIELD.default_value = ""
MSG_ACCOUNT_INFO_NICKNAME_FIELD.type = 9
MSG_ACCOUNT_INFO_NICKNAME_FIELD.cpp_type = 9

MSG_ACCOUNT_INFO_GOLD_FIELD.name = "gold"
MSG_ACCOUNT_INFO_GOLD_FIELD.full_name = ".msg_info_def.msg_account_info.gold"
MSG_ACCOUNT_INFO_GOLD_FIELD.number = 4
MSG_ACCOUNT_INFO_GOLD_FIELD.index = 3
MSG_ACCOUNT_INFO_GOLD_FIELD.label = 1
MSG_ACCOUNT_INFO_GOLD_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_GOLD_FIELD.default_value = 0
MSG_ACCOUNT_INFO_GOLD_FIELD.type = 3
MSG_ACCOUNT_INFO_GOLD_FIELD.cpp_type = 2

MSG_ACCOUNT_INFO_VIPLVL_FIELD.name = "viplvl"
MSG_ACCOUNT_INFO_VIPLVL_FIELD.full_name = ".msg_info_def.msg_account_info.viplvl"
MSG_ACCOUNT_INFO_VIPLVL_FIELD.number = 5
MSG_ACCOUNT_INFO_VIPLVL_FIELD.index = 4
MSG_ACCOUNT_INFO_VIPLVL_FIELD.label = 1
MSG_ACCOUNT_INFO_VIPLVL_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_VIPLVL_FIELD.default_value = 0
MSG_ACCOUNT_INFO_VIPLVL_FIELD.type = 5
MSG_ACCOUNT_INFO_VIPLVL_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_VIPEXP_FIELD.name = "vipexp"
MSG_ACCOUNT_INFO_VIPEXP_FIELD.full_name = ".msg_info_def.msg_account_info.vipexp"
MSG_ACCOUNT_INFO_VIPEXP_FIELD.number = 6
MSG_ACCOUNT_INFO_VIPEXP_FIELD.index = 5
MSG_ACCOUNT_INFO_VIPEXP_FIELD.label = 1
MSG_ACCOUNT_INFO_VIPEXP_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_VIPEXP_FIELD.default_value = 0
MSG_ACCOUNT_INFO_VIPEXP_FIELD.type = 5
MSG_ACCOUNT_INFO_VIPEXP_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.name = "icon_custom"
MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.full_name = ".msg_info_def.msg_account_info.icon_custom"
MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.number = 8
MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.index = 6
MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.label = 1
MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.default_value = ""
MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.type = 9
MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD.cpp_type = 9

MSG_ACCOUNT_INFO_SEX_FIELD.name = "sex"
MSG_ACCOUNT_INFO_SEX_FIELD.full_name = ".msg_info_def.msg_account_info.sex"
MSG_ACCOUNT_INFO_SEX_FIELD.number = 9
MSG_ACCOUNT_INFO_SEX_FIELD.index = 7
MSG_ACCOUNT_INFO_SEX_FIELD.label = 1
MSG_ACCOUNT_INFO_SEX_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_SEX_FIELD.default_value = 0
MSG_ACCOUNT_INFO_SEX_FIELD.type = 5
MSG_ACCOUNT_INFO_SEX_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_TICKET_FIELD.name = "Ticket"
MSG_ACCOUNT_INFO_TICKET_FIELD.full_name = ".msg_info_def.msg_account_info.Ticket"
MSG_ACCOUNT_INFO_TICKET_FIELD.number = 14
MSG_ACCOUNT_INFO_TICKET_FIELD.index = 8
MSG_ACCOUNT_INFO_TICKET_FIELD.label = 1
MSG_ACCOUNT_INFO_TICKET_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_TICKET_FIELD.default_value = 0
MSG_ACCOUNT_INFO_TICKET_FIELD.type = 5
MSG_ACCOUNT_INFO_TICKET_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.name = "curPhotoFrameId"
MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.full_name = ".msg_info_def.msg_account_info.curPhotoFrameId"
MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.number = 16
MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.index = 9
MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.label = 1
MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.default_value = 0
MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.type = 5
MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_PAYIDS_FIELD.name = "payids"
MSG_ACCOUNT_INFO_PAYIDS_FIELD.full_name = ".msg_info_def.msg_account_info.payids"
MSG_ACCOUNT_INFO_PAYIDS_FIELD.number = 19
MSG_ACCOUNT_INFO_PAYIDS_FIELD.index = 10
MSG_ACCOUNT_INFO_PAYIDS_FIELD.label = 3
MSG_ACCOUNT_INFO_PAYIDS_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_PAYIDS_FIELD.default_value = {}
MSG_ACCOUNT_INFO_PAYIDS_FIELD.type = 5
MSG_ACCOUNT_INFO_PAYIDS_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.name = "isSafeDepositBoxPwdEmpty"
MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.full_name = ".msg_info_def.msg_account_info.isSafeDepositBoxPwdEmpty"
MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.number = 20
MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.index = 11
MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.label = 1
MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.default_value = false
MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.type = 8
MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD.cpp_type = 7

MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.name = "safeBoxGold"
MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.full_name = ".msg_info_def.msg_account_info.safeBoxGold"
MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.number = 21
MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.index = 12
MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.label = 1
MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.default_value = 0
MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.type = 3
MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD.cpp_type = 2

MSG_ACCOUNT_INFO_COLLECTED_FIELD.name = "collected"
MSG_ACCOUNT_INFO_COLLECTED_FIELD.full_name = ".msg_info_def.msg_account_info.collected"
MSG_ACCOUNT_INFO_COLLECTED_FIELD.number = 22
MSG_ACCOUNT_INFO_COLLECTED_FIELD.index = 13
MSG_ACCOUNT_INFO_COLLECTED_FIELD.label = 1
MSG_ACCOUNT_INFO_COLLECTED_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_COLLECTED_FIELD.default_value = 0
MSG_ACCOUNT_INFO_COLLECTED_FIELD.type = 5
MSG_ACCOUNT_INFO_COLLECTED_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.name = "updateNicknameCount"
MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.full_name = ".msg_info_def.msg_account_info.updateNicknameCount"
MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.number = 26
MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.index = 14
MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.label = 1
MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.default_value = 0
MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.type = 5
MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.name = "isBindMobilePhone"
MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.full_name = ".msg_info_def.msg_account_info.isBindMobilePhone"
MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.number = 27
MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.index = 15
MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.label = 1
MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.default_value = false
MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.type = 8
MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD.cpp_type = 7

MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.name = "create_time"
MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.full_name = ".msg_info_def.msg_account_info.create_time"
MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.number = 36
MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.index = 16
MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.label = 1
MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.default_value = 0
MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.type = 5
MSG_ACCOUNT_INFO_CREATE_TIME_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.name = "Privilege"
MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.full_name = ".msg_info_def.msg_account_info.Privilege"
MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.number = 44
MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.index = 17
MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.label = 1
MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.default_value = 0
MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.type = 5
MSG_ACCOUNT_INFO_PRIVILEGE_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.name = "lastGameId"
MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.full_name = ".msg_info_def.msg_account_info.lastGameId"
MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.number = 46
MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.index = 18
MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.label = 1
MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.default_value = 0
MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.type = 5
MSG_ACCOUNT_INFO_LASTGAMEID_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_ISFORMAL_FIELD.name = "isFormal"
MSG_ACCOUNT_INFO_ISFORMAL_FIELD.full_name = ".msg_info_def.msg_account_info.isFormal"
MSG_ACCOUNT_INFO_ISFORMAL_FIELD.number = 47
MSG_ACCOUNT_INFO_ISFORMAL_FIELD.index = 19
MSG_ACCOUNT_INFO_ISFORMAL_FIELD.label = 1
MSG_ACCOUNT_INFO_ISFORMAL_FIELD.has_default_value = true
MSG_ACCOUNT_INFO_ISFORMAL_FIELD.default_value = false
MSG_ACCOUNT_INFO_ISFORMAL_FIELD.type = 8
MSG_ACCOUNT_INFO_ISFORMAL_FIELD.cpp_type = 7

MSG_ACCOUNT_INFO_BINDINFO_FIELD.name = "BindInfo"
MSG_ACCOUNT_INFO_BINDINFO_FIELD.full_name = ".msg_info_def.msg_account_info.BindInfo"
MSG_ACCOUNT_INFO_BINDINFO_FIELD.number = 48
MSG_ACCOUNT_INFO_BINDINFO_FIELD.index = 20
MSG_ACCOUNT_INFO_BINDINFO_FIELD.label = 1
MSG_ACCOUNT_INFO_BINDINFO_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_BINDINFO_FIELD.default_value = ""
MSG_ACCOUNT_INFO_BINDINFO_FIELD.type = 9
MSG_ACCOUNT_INFO_BINDINFO_FIELD.cpp_type = 9

MSG_ACCOUNT_INFO_REALNAME_FIELD.name = "RealName"
MSG_ACCOUNT_INFO_REALNAME_FIELD.full_name = ".msg_info_def.msg_account_info.RealName"
MSG_ACCOUNT_INFO_REALNAME_FIELD.number = 49
MSG_ACCOUNT_INFO_REALNAME_FIELD.index = 21
MSG_ACCOUNT_INFO_REALNAME_FIELD.label = 1
MSG_ACCOUNT_INFO_REALNAME_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_REALNAME_FIELD.default_value = ""
MSG_ACCOUNT_INFO_REALNAME_FIELD.type = 9
MSG_ACCOUNT_INFO_REALNAME_FIELD.cpp_type = 9

MSG_ACCOUNT_INFO_RECHARGED_FIELD.name = "Recharged"
MSG_ACCOUNT_INFO_RECHARGED_FIELD.full_name = ".msg_info_def.msg_account_info.Recharged"
MSG_ACCOUNT_INFO_RECHARGED_FIELD.number = 52
MSG_ACCOUNT_INFO_RECHARGED_FIELD.index = 22
MSG_ACCOUNT_INFO_RECHARGED_FIELD.label = 1
MSG_ACCOUNT_INFO_RECHARGED_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_RECHARGED_FIELD.default_value = 0
MSG_ACCOUNT_INFO_RECHARGED_FIELD.type = 5
MSG_ACCOUNT_INFO_RECHARGED_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_INVITER_ID_FIELD.name = "inviter_id"
MSG_ACCOUNT_INFO_INVITER_ID_FIELD.full_name = ".msg_info_def.msg_account_info.inviter_id"
MSG_ACCOUNT_INFO_INVITER_ID_FIELD.number = 53
MSG_ACCOUNT_INFO_INVITER_ID_FIELD.index = 23
MSG_ACCOUNT_INFO_INVITER_ID_FIELD.label = 1
MSG_ACCOUNT_INFO_INVITER_ID_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_INVITER_ID_FIELD.default_value = 0
MSG_ACCOUNT_INFO_INVITER_ID_FIELD.type = 5
MSG_ACCOUNT_INFO_INVITER_ID_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_WATER_FIELD.name = "water"
MSG_ACCOUNT_INFO_WATER_FIELD.full_name = ".msg_info_def.msg_account_info.water"
MSG_ACCOUNT_INFO_WATER_FIELD.number = 54
MSG_ACCOUNT_INFO_WATER_FIELD.index = 24
MSG_ACCOUNT_INFO_WATER_FIELD.label = 1
MSG_ACCOUNT_INFO_WATER_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_WATER_FIELD.default_value = 0
MSG_ACCOUNT_INFO_WATER_FIELD.type = 5
MSG_ACCOUNT_INFO_WATER_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.name = "inviter_reward_count"
MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.full_name = ".msg_info_def.msg_account_info.inviter_reward_count"
MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.number = 55
MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.index = 25
MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.label = 1
MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.default_value = 0
MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.type = 5
MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_WITHDRAW_FIELD.name = "withdraw"
MSG_ACCOUNT_INFO_WITHDRAW_FIELD.full_name = ".msg_info_def.msg_account_info.withdraw"
MSG_ACCOUNT_INFO_WITHDRAW_FIELD.number = 56
MSG_ACCOUNT_INFO_WITHDRAW_FIELD.index = 26
MSG_ACCOUNT_INFO_WITHDRAW_FIELD.label = 1
MSG_ACCOUNT_INFO_WITHDRAW_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_WITHDRAW_FIELD.default_value = 0
MSG_ACCOUNT_INFO_WITHDRAW_FIELD.type = 5
MSG_ACCOUNT_INFO_WITHDRAW_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.name = "sevenday_done"
MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.full_name = ".msg_info_def.msg_account_info.sevenday_done"
MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.number = 57
MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.index = 27
MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.label = 1
MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.default_value = false
MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.type = 8
MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD.cpp_type = 7

MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.name = "quest_list"
MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.full_name = ".msg_info_def.msg_account_info.quest_list"
MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.number = 58
MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.index = 28
MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.label = 3
MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.default_value = {}
MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.type = 5
MSG_ACCOUNT_INFO_QUEST_LIST_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.name = "limit_time_photo"
MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.full_name = ".msg_info_def.msg_account_info.limit_time_photo"
MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.number = 59
MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.index = 29
MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.label = 1
MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.default_value = 0
MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.type = 5
MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD.cpp_type = 1

MSG_ACCOUNT_INFO_IPINFO_FIELD.name = "ipinfo"
MSG_ACCOUNT_INFO_IPINFO_FIELD.full_name = ".msg_info_def.msg_account_info.ipinfo"
MSG_ACCOUNT_INFO_IPINFO_FIELD.number = 60
MSG_ACCOUNT_INFO_IPINFO_FIELD.index = 30
MSG_ACCOUNT_INFO_IPINFO_FIELD.label = 1
MSG_ACCOUNT_INFO_IPINFO_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_IPINFO_FIELD.default_value = ""
MSG_ACCOUNT_INFO_IPINFO_FIELD.type = 9
MSG_ACCOUNT_INFO_IPINFO_FIELD.cpp_type = 9

MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.name = "inviter_reward"
MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.full_name = ".msg_info_def.msg_account_info.inviter_reward"
MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.number = 61
MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.index = 31
MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.label = 1
MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.default_value = 0
MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.type = 3
MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD.cpp_type = 2

MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.name = "performance"
MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.full_name = ".msg_info_def.msg_account_info.performance"
MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.number = 62
MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.index = 32
MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.label = 1
MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.default_value = 0
MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.type = 3
MSG_ACCOUNT_INFO_PERFORMANCE_FIELD.cpp_type = 2

MSG_ACCOUNT_INFO.name = "msg_account_info"
MSG_ACCOUNT_INFO.full_name = ".msg_info_def.msg_account_info"
MSG_ACCOUNT_INFO.nested_types = {}
MSG_ACCOUNT_INFO.enum_types = {}
MSG_ACCOUNT_INFO.fields = {MSG_ACCOUNT_INFO_AID_FIELD, MSG_ACCOUNT_INFO_CHANNELID_FIELD, MSG_ACCOUNT_INFO_NICKNAME_FIELD, MSG_ACCOUNT_INFO_GOLD_FIELD, MSG_ACCOUNT_INFO_VIPLVL_FIELD, MSG_ACCOUNT_INFO_VIPEXP_FIELD, MSG_ACCOUNT_INFO_ICON_CUSTOM_FIELD, MSG_ACCOUNT_INFO_SEX_FIELD, MSG_ACCOUNT_INFO_TICKET_FIELD, MSG_ACCOUNT_INFO_CURPHOTOFRAMEID_FIELD, MSG_ACCOUNT_INFO_PAYIDS_FIELD, MSG_ACCOUNT_INFO_ISSAFEDEPOSITBOXPWDEMPTY_FIELD, MSG_ACCOUNT_INFO_SAFEBOXGOLD_FIELD, MSG_ACCOUNT_INFO_COLLECTED_FIELD, MSG_ACCOUNT_INFO_UPDATENICKNAMECOUNT_FIELD, MSG_ACCOUNT_INFO_ISBINDMOBILEPHONE_FIELD, MSG_ACCOUNT_INFO_CREATE_TIME_FIELD, MSG_ACCOUNT_INFO_PRIVILEGE_FIELD, MSG_ACCOUNT_INFO_LASTGAMEID_FIELD, MSG_ACCOUNT_INFO_ISFORMAL_FIELD, MSG_ACCOUNT_INFO_BINDINFO_FIELD, MSG_ACCOUNT_INFO_REALNAME_FIELD, MSG_ACCOUNT_INFO_RECHARGED_FIELD, MSG_ACCOUNT_INFO_INVITER_ID_FIELD, MSG_ACCOUNT_INFO_WATER_FIELD, MSG_ACCOUNT_INFO_INVITER_REWARD_COUNT_FIELD, MSG_ACCOUNT_INFO_WITHDRAW_FIELD, MSG_ACCOUNT_INFO_SEVENDAY_DONE_FIELD, MSG_ACCOUNT_INFO_QUEST_LIST_FIELD, MSG_ACCOUNT_INFO_LIMIT_TIME_PHOTO_FIELD, MSG_ACCOUNT_INFO_IPINFO_FIELD, MSG_ACCOUNT_INFO_INVITER_REWARD_FIELD, MSG_ACCOUNT_INFO_PERFORMANCE_FIELD}
MSG_ACCOUNT_INFO.is_extendable = false
MSG_ACCOUNT_INFO.extensions = {}
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.name = "is_robot"
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.full_name = ".msg_info_def.msg_account_info_ex.is_robot"
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.number = 1
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.index = 0
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.label = 1
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.has_default_value = true
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.default_value = false
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.type = 8
MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD.cpp_type = 7

MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.name = "free_gold"
MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.full_name = ".msg_info_def.msg_account_info_ex.free_gold"
MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.number = 2
MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.index = 1
MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.label = 1
MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.has_default_value = false
MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.default_value = 0
MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.type = 3
MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD.cpp_type = 2

MSG_ACCOUNT_INFO_EX.name = "msg_account_info_ex"
MSG_ACCOUNT_INFO_EX.full_name = ".msg_info_def.msg_account_info_ex"
MSG_ACCOUNT_INFO_EX.nested_types = {}
MSG_ACCOUNT_INFO_EX.enum_types = {}
MSG_ACCOUNT_INFO_EX.fields = {MSG_ACCOUNT_INFO_EX_IS_ROBOT_FIELD, MSG_ACCOUNT_INFO_EX_FREE_GOLD_FIELD}
MSG_ACCOUNT_INFO_EX.is_extendable = false
MSG_ACCOUNT_INFO_EX.extensions = {}
MSG_ITEM_ID_FIELD.name = "id"
MSG_ITEM_ID_FIELD.full_name = ".msg_info_def.msg_item.id"
MSG_ITEM_ID_FIELD.number = 1
MSG_ITEM_ID_FIELD.index = 0
MSG_ITEM_ID_FIELD.label = 1
MSG_ITEM_ID_FIELD.has_default_value = false
MSG_ITEM_ID_FIELD.default_value = 0
MSG_ITEM_ID_FIELD.type = 5
MSG_ITEM_ID_FIELD.cpp_type = 1

MSG_ITEM_COUNT_FIELD.name = "count"
MSG_ITEM_COUNT_FIELD.full_name = ".msg_info_def.msg_item.count"
MSG_ITEM_COUNT_FIELD.number = 2
MSG_ITEM_COUNT_FIELD.index = 1
MSG_ITEM_COUNT_FIELD.label = 1
MSG_ITEM_COUNT_FIELD.has_default_value = false
MSG_ITEM_COUNT_FIELD.default_value = 0
MSG_ITEM_COUNT_FIELD.type = 5
MSG_ITEM_COUNT_FIELD.cpp_type = 1

MSG_ITEM.name = "msg_item"
MSG_ITEM.full_name = ".msg_info_def.msg_item"
MSG_ITEM.nested_types = {}
MSG_ITEM.enum_types = {}
MSG_ITEM.fields = {MSG_ITEM_ID_FIELD, MSG_ITEM_COUNT_FIELD}
MSG_ITEM.is_extendable = false
MSG_ITEM.extensions = {}
MSG_QUEST_INFO_QUESTID_FIELD.name = "questid"
MSG_QUEST_INFO_QUESTID_FIELD.full_name = ".msg_info_def.msg_quest_info.questid"
MSG_QUEST_INFO_QUESTID_FIELD.number = 1
MSG_QUEST_INFO_QUESTID_FIELD.index = 0
MSG_QUEST_INFO_QUESTID_FIELD.label = 1
MSG_QUEST_INFO_QUESTID_FIELD.has_default_value = false
MSG_QUEST_INFO_QUESTID_FIELD.default_value = 0
MSG_QUEST_INFO_QUESTID_FIELD.type = 5
MSG_QUEST_INFO_QUESTID_FIELD.cpp_type = 1

MSG_QUEST_INFO_COUNT_FIELD.name = "count"
MSG_QUEST_INFO_COUNT_FIELD.full_name = ".msg_info_def.msg_quest_info.count"
MSG_QUEST_INFO_COUNT_FIELD.number = 2
MSG_QUEST_INFO_COUNT_FIELD.index = 1
MSG_QUEST_INFO_COUNT_FIELD.label = 1
MSG_QUEST_INFO_COUNT_FIELD.has_default_value = false
MSG_QUEST_INFO_COUNT_FIELD.default_value = 0
MSG_QUEST_INFO_COUNT_FIELD.type = 5
MSG_QUEST_INFO_COUNT_FIELD.cpp_type = 1

MSG_QUEST_INFO_RECEIVED_FIELD.name = "received"
MSG_QUEST_INFO_RECEIVED_FIELD.full_name = ".msg_info_def.msg_quest_info.received"
MSG_QUEST_INFO_RECEIVED_FIELD.number = 3
MSG_QUEST_INFO_RECEIVED_FIELD.index = 2
MSG_QUEST_INFO_RECEIVED_FIELD.label = 1
MSG_QUEST_INFO_RECEIVED_FIELD.has_default_value = false
MSG_QUEST_INFO_RECEIVED_FIELD.default_value = false
MSG_QUEST_INFO_RECEIVED_FIELD.type = 8
MSG_QUEST_INFO_RECEIVED_FIELD.cpp_type = 7

MSG_QUEST_INFO.name = "msg_quest_info"
MSG_QUEST_INFO.full_name = ".msg_info_def.msg_quest_info"
MSG_QUEST_INFO.nested_types = {}
MSG_QUEST_INFO.enum_types = {}
MSG_QUEST_INFO.fields = {MSG_QUEST_INFO_QUESTID_FIELD, MSG_QUEST_INFO_COUNT_FIELD, MSG_QUEST_INFO_RECEIVED_FIELD}
MSG_QUEST_INFO.is_extendable = false
MSG_QUEST_INFO.extensions = {}

msg_account_info = protobuf.Message(MSG_ACCOUNT_INFO)
msg_account_info_ex = protobuf.Message(MSG_ACCOUNT_INFO_EX)
msg_item = protobuf.Message(MSG_ITEM)
msg_quest_info = protobuf.Message(MSG_QUEST_INFO)

