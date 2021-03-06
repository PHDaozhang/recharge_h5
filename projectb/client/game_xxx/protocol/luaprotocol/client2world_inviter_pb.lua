-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
local client2world_msg_type_pb = require("client2world_msg_type_pb")
local msg_type_def_pb = require("msg_type_def_pb")
local msg_info_def_pb = require("msg_info_def_pb")
module('client2world_inviter_pb')


MSG_INVITER_INFO = protobuf.Descriptor();
local MSG_INVITER_INFO_PHOTO_FRAME_FIELD = protobuf.FieldDescriptor();
local MSG_INVITER_INFO_NICK_NAME_FIELD = protobuf.FieldDescriptor();
local MSG_INVITER_INFO_TOTAL_REWARD_FIELD = protobuf.FieldDescriptor();
local MSG_INVITER_INFO_PLAYER_ID_FIELD = protobuf.FieldDescriptor();
local MSG_INVITER_INFO_TODAY_REWARD_FIELD = protobuf.FieldDescriptor();
local MSG_INVITER_INFO_ICON_CUSTOM_FIELD = protobuf.FieldDescriptor();
local MSG_INVITER_INFO_VIPLVL_FIELD = protobuf.FieldDescriptor();
PACKETC2W_BIND_INVITER = protobuf.Descriptor();
local PACKETC2W_BIND_INVITER_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_BIND_INVITER_INVITER_FIELD = protobuf.FieldDescriptor();
PACKETW2C_BIND_INVITER_RESULT = protobuf.Descriptor();
local PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD = protobuf.FieldDescriptor();
PACKETC2W_REWARD_LIST = protobuf.Descriptor();
local PACKETC2W_REWARD_LIST_PACKET_ID_FIELD = protobuf.FieldDescriptor();
PACKETW2C_REWARD_LIST_RESULT = protobuf.Descriptor();
local PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD = protobuf.FieldDescriptor();
PACKETC2W_RECEIVE_REWARD = protobuf.Descriptor();
local PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD = protobuf.FieldDescriptor();
PACKETW2C_RECEIVE_REWARD_RESULT = protobuf.Descriptor();
local PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD = protobuf.FieldDescriptor();
PACKETC2W_ASK_INCOME_HISTORY = protobuf.Descriptor();
local PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD = protobuf.FieldDescriptor();
PACKETW2C_INCOME_HISTORY_RESULT = protobuf.Descriptor();
local PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD = protobuf.FieldDescriptor();
PACKETW2C_INCOME_NEW_RESULT = protobuf.Descriptor();
local PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD = protobuf.FieldDescriptor();

MSG_INVITER_INFO_PHOTO_FRAME_FIELD.name = "photo_frame"
MSG_INVITER_INFO_PHOTO_FRAME_FIELD.full_name = ".client2world_protocols.msg_inviter_info.photo_frame"
MSG_INVITER_INFO_PHOTO_FRAME_FIELD.number = 1
MSG_INVITER_INFO_PHOTO_FRAME_FIELD.index = 0
MSG_INVITER_INFO_PHOTO_FRAME_FIELD.label = 1
MSG_INVITER_INFO_PHOTO_FRAME_FIELD.has_default_value = false
MSG_INVITER_INFO_PHOTO_FRAME_FIELD.default_value = 0
MSG_INVITER_INFO_PHOTO_FRAME_FIELD.type = 5
MSG_INVITER_INFO_PHOTO_FRAME_FIELD.cpp_type = 1

MSG_INVITER_INFO_NICK_NAME_FIELD.name = "nick_name"
MSG_INVITER_INFO_NICK_NAME_FIELD.full_name = ".client2world_protocols.msg_inviter_info.nick_name"
MSG_INVITER_INFO_NICK_NAME_FIELD.number = 2
MSG_INVITER_INFO_NICK_NAME_FIELD.index = 1
MSG_INVITER_INFO_NICK_NAME_FIELD.label = 1
MSG_INVITER_INFO_NICK_NAME_FIELD.has_default_value = false
MSG_INVITER_INFO_NICK_NAME_FIELD.default_value = ""
MSG_INVITER_INFO_NICK_NAME_FIELD.type = 9
MSG_INVITER_INFO_NICK_NAME_FIELD.cpp_type = 9

MSG_INVITER_INFO_TOTAL_REWARD_FIELD.name = "total_reward"
MSG_INVITER_INFO_TOTAL_REWARD_FIELD.full_name = ".client2world_protocols.msg_inviter_info.total_reward"
MSG_INVITER_INFO_TOTAL_REWARD_FIELD.number = 3
MSG_INVITER_INFO_TOTAL_REWARD_FIELD.index = 2
MSG_INVITER_INFO_TOTAL_REWARD_FIELD.label = 1
MSG_INVITER_INFO_TOTAL_REWARD_FIELD.has_default_value = false
MSG_INVITER_INFO_TOTAL_REWARD_FIELD.default_value = 0
MSG_INVITER_INFO_TOTAL_REWARD_FIELD.type = 3
MSG_INVITER_INFO_TOTAL_REWARD_FIELD.cpp_type = 2

MSG_INVITER_INFO_PLAYER_ID_FIELD.name = "player_id"
MSG_INVITER_INFO_PLAYER_ID_FIELD.full_name = ".client2world_protocols.msg_inviter_info.player_id"
MSG_INVITER_INFO_PLAYER_ID_FIELD.number = 4
MSG_INVITER_INFO_PLAYER_ID_FIELD.index = 3
MSG_INVITER_INFO_PLAYER_ID_FIELD.label = 1
MSG_INVITER_INFO_PLAYER_ID_FIELD.has_default_value = false
MSG_INVITER_INFO_PLAYER_ID_FIELD.default_value = 0
MSG_INVITER_INFO_PLAYER_ID_FIELD.type = 5
MSG_INVITER_INFO_PLAYER_ID_FIELD.cpp_type = 1

MSG_INVITER_INFO_TODAY_REWARD_FIELD.name = "today_reward"
MSG_INVITER_INFO_TODAY_REWARD_FIELD.full_name = ".client2world_protocols.msg_inviter_info.today_reward"
MSG_INVITER_INFO_TODAY_REWARD_FIELD.number = 5
MSG_INVITER_INFO_TODAY_REWARD_FIELD.index = 4
MSG_INVITER_INFO_TODAY_REWARD_FIELD.label = 1
MSG_INVITER_INFO_TODAY_REWARD_FIELD.has_default_value = false
MSG_INVITER_INFO_TODAY_REWARD_FIELD.default_value = 0
MSG_INVITER_INFO_TODAY_REWARD_FIELD.type = 3
MSG_INVITER_INFO_TODAY_REWARD_FIELD.cpp_type = 2

MSG_INVITER_INFO_ICON_CUSTOM_FIELD.name = "icon_custom"
MSG_INVITER_INFO_ICON_CUSTOM_FIELD.full_name = ".client2world_protocols.msg_inviter_info.icon_custom"
MSG_INVITER_INFO_ICON_CUSTOM_FIELD.number = 6
MSG_INVITER_INFO_ICON_CUSTOM_FIELD.index = 5
MSG_INVITER_INFO_ICON_CUSTOM_FIELD.label = 1
MSG_INVITER_INFO_ICON_CUSTOM_FIELD.has_default_value = false
MSG_INVITER_INFO_ICON_CUSTOM_FIELD.default_value = ""
MSG_INVITER_INFO_ICON_CUSTOM_FIELD.type = 9
MSG_INVITER_INFO_ICON_CUSTOM_FIELD.cpp_type = 9

MSG_INVITER_INFO_VIPLVL_FIELD.name = "viplvl"
MSG_INVITER_INFO_VIPLVL_FIELD.full_name = ".client2world_protocols.msg_inviter_info.viplvl"
MSG_INVITER_INFO_VIPLVL_FIELD.number = 7
MSG_INVITER_INFO_VIPLVL_FIELD.index = 6
MSG_INVITER_INFO_VIPLVL_FIELD.label = 1
MSG_INVITER_INFO_VIPLVL_FIELD.has_default_value = false
MSG_INVITER_INFO_VIPLVL_FIELD.default_value = 0
MSG_INVITER_INFO_VIPLVL_FIELD.type = 5
MSG_INVITER_INFO_VIPLVL_FIELD.cpp_type = 1

MSG_INVITER_INFO.name = "msg_inviter_info"
MSG_INVITER_INFO.full_name = ".client2world_protocols.msg_inviter_info"
MSG_INVITER_INFO.nested_types = {}
MSG_INVITER_INFO.enum_types = {}
MSG_INVITER_INFO.fields = {MSG_INVITER_INFO_PHOTO_FRAME_FIELD, MSG_INVITER_INFO_NICK_NAME_FIELD, MSG_INVITER_INFO_TOTAL_REWARD_FIELD, MSG_INVITER_INFO_PLAYER_ID_FIELD, MSG_INVITER_INFO_TODAY_REWARD_FIELD, MSG_INVITER_INFO_ICON_CUSTOM_FIELD, MSG_INVITER_INFO_VIPLVL_FIELD}
MSG_INVITER_INFO.is_extendable = false
MSG_INVITER_INFO.extensions = {}
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_bind_inviter.packet_id"
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.number = 1
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.index = 0
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.label = 1
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_bind_inviter
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.type = 14
PACKETC2W_BIND_INVITER_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_BIND_INVITER_INVITER_FIELD.name = "inviter"
PACKETC2W_BIND_INVITER_INVITER_FIELD.full_name = ".client2world_protocols.packetc2w_bind_inviter.inviter"
PACKETC2W_BIND_INVITER_INVITER_FIELD.number = 2
PACKETC2W_BIND_INVITER_INVITER_FIELD.index = 1
PACKETC2W_BIND_INVITER_INVITER_FIELD.label = 1
PACKETC2W_BIND_INVITER_INVITER_FIELD.has_default_value = false
PACKETC2W_BIND_INVITER_INVITER_FIELD.default_value = 0
PACKETC2W_BIND_INVITER_INVITER_FIELD.type = 5
PACKETC2W_BIND_INVITER_INVITER_FIELD.cpp_type = 1

PACKETC2W_BIND_INVITER.name = "packetc2w_bind_inviter"
PACKETC2W_BIND_INVITER.full_name = ".client2world_protocols.packetc2w_bind_inviter"
PACKETC2W_BIND_INVITER.nested_types = {}
PACKETC2W_BIND_INVITER.enum_types = {}
PACKETC2W_BIND_INVITER.fields = {PACKETC2W_BIND_INVITER_PACKET_ID_FIELD, PACKETC2W_BIND_INVITER_INVITER_FIELD}
PACKETC2W_BIND_INVITER.is_extendable = false
PACKETC2W_BIND_INVITER.extensions = {}
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_bind_inviter_result.packet_id"
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_bind_inviter_result
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_bind_inviter_result.result"
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.number = 2
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.index = 1
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.label = 1
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.enum_type = msg_type_def_pb.E_MSG_RESULT_DEF
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.has_default_value = true
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.default_value = msg_type_def_pb.e_rmt_fail
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.type = 14
PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD.cpp_type = 8

PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.name = "inviter"
PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.full_name = ".client2world_protocols.packetw2c_bind_inviter_result.inviter"
PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.number = 3
PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.index = 2
PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.label = 1
PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.has_default_value = false
PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.default_value = 0
PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.type = 5
PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD.cpp_type = 1

PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.name = "channelid"
PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.full_name = ".client2world_protocols.packetw2c_bind_inviter_result.channelid"
PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.number = 4
PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.index = 3
PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.label = 1
PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.has_default_value = false
PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.default_value = ""
PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.type = 9
PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD.cpp_type = 9

PACKETW2C_BIND_INVITER_RESULT.name = "packetw2c_bind_inviter_result"
PACKETW2C_BIND_INVITER_RESULT.full_name = ".client2world_protocols.packetw2c_bind_inviter_result"
PACKETW2C_BIND_INVITER_RESULT.nested_types = {}
PACKETW2C_BIND_INVITER_RESULT.enum_types = {}
PACKETW2C_BIND_INVITER_RESULT.fields = {PACKETW2C_BIND_INVITER_RESULT_PACKET_ID_FIELD, PACKETW2C_BIND_INVITER_RESULT_RESULT_FIELD, PACKETW2C_BIND_INVITER_RESULT_INVITER_FIELD, PACKETW2C_BIND_INVITER_RESULT_CHANNELID_FIELD}
PACKETW2C_BIND_INVITER_RESULT.is_extendable = false
PACKETW2C_BIND_INVITER_RESULT.extensions = {}
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_reward_list.packet_id"
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.number = 1
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.index = 0
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.label = 1
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_reward_list
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.type = 14
PACKETC2W_REWARD_LIST_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_REWARD_LIST.name = "packetc2w_reward_list"
PACKETC2W_REWARD_LIST.full_name = ".client2world_protocols.packetc2w_reward_list"
PACKETC2W_REWARD_LIST.nested_types = {}
PACKETC2W_REWARD_LIST.enum_types = {}
PACKETC2W_REWARD_LIST.fields = {PACKETC2W_REWARD_LIST_PACKET_ID_FIELD}
PACKETC2W_REWARD_LIST.is_extendable = false
PACKETC2W_REWARD_LIST.extensions = {}
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_reward_list_result.packet_id"
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_reward_list_result
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.name = "inviter_list"
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.full_name = ".client2world_protocols.packetw2c_reward_list_result.inviter_list"
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.number = 2
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.index = 1
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.label = 3
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.message_type = MSG_INVITER_INFO
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.has_default_value = false
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.default_value = {}
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.type = 11
PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD.cpp_type = 10

PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.name = "water_reward"
PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.full_name = ".client2world_protocols.packetw2c_reward_list_result.water_reward"
PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.number = 3
PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.index = 2
PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.label = 1
PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.has_default_value = false
PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.default_value = 0
PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.type = 5
PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD.cpp_type = 1

PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.name = "can_receive"
PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.full_name = ".client2world_protocols.packetw2c_reward_list_result.can_receive"
PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.number = 4
PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.index = 3
PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.label = 1
PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.has_default_value = false
PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.default_value = 0
PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.type = 3
PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD.cpp_type = 2

PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.name = "total_reward"
PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.full_name = ".client2world_protocols.packetw2c_reward_list_result.total_reward"
PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.number = 5
PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.index = 4
PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.label = 1
PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.has_default_value = false
PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.default_value = 0
PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.type = 3
PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD.cpp_type = 2

PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.name = "inviter_info"
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.full_name = ".client2world_protocols.packetw2c_reward_list_result.inviter_info"
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.number = 6
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.index = 5
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.label = 1
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.message_type = MSG_INVITER_INFO
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.has_default_value = false
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.default_value = nil
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.type = 11
PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD.cpp_type = 10

PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.name = "inviter_reward_count"
PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.full_name = ".client2world_protocols.packetw2c_reward_list_result.inviter_reward_count"
PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.number = 7
PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.index = 6
PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.label = 1
PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.has_default_value = false
PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.default_value = 0
PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.type = 5
PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD.cpp_type = 1

PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.name = "invite_count"
PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.full_name = ".client2world_protocols.packetw2c_reward_list_result.invite_count"
PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.number = 8
PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.index = 7
PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.label = 1
PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.has_default_value = false
PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.default_value = 0
PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.type = 5
PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD.cpp_type = 1

PACKETW2C_REWARD_LIST_RESULT.name = "packetw2c_reward_list_result"
PACKETW2C_REWARD_LIST_RESULT.full_name = ".client2world_protocols.packetw2c_reward_list_result"
PACKETW2C_REWARD_LIST_RESULT.nested_types = {}
PACKETW2C_REWARD_LIST_RESULT.enum_types = {}
PACKETW2C_REWARD_LIST_RESULT.fields = {PACKETW2C_REWARD_LIST_RESULT_PACKET_ID_FIELD, PACKETW2C_REWARD_LIST_RESULT_INVITER_LIST_FIELD, PACKETW2C_REWARD_LIST_RESULT_WATER_REWARD_FIELD, PACKETW2C_REWARD_LIST_RESULT_CAN_RECEIVE_FIELD, PACKETW2C_REWARD_LIST_RESULT_TOTAL_REWARD_FIELD, PACKETW2C_REWARD_LIST_RESULT_INVITER_INFO_FIELD, PACKETW2C_REWARD_LIST_RESULT_INVITER_REWARD_COUNT_FIELD, PACKETW2C_REWARD_LIST_RESULT_INVITE_COUNT_FIELD}
PACKETW2C_REWARD_LIST_RESULT.is_extendable = false
PACKETW2C_REWARD_LIST_RESULT.extensions = {}
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_receive_reward.packet_id"
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.number = 1
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.index = 0
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.label = 1
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_receive_reward
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.type = 14
PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_RECEIVE_REWARD.name = "packetc2w_receive_reward"
PACKETC2W_RECEIVE_REWARD.full_name = ".client2world_protocols.packetc2w_receive_reward"
PACKETC2W_RECEIVE_REWARD.nested_types = {}
PACKETC2W_RECEIVE_REWARD.enum_types = {}
PACKETC2W_RECEIVE_REWARD.fields = {PACKETC2W_RECEIVE_REWARD_PACKET_ID_FIELD}
PACKETC2W_RECEIVE_REWARD.is_extendable = false
PACKETC2W_RECEIVE_REWARD.extensions = {}
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_receive_reward_result.packet_id"
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_receive_reward_result
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_receive_reward_result.result"
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.number = 2
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.index = 1
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.label = 1
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.enum_type = msg_type_def_pb.E_MSG_RESULT_DEF
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.has_default_value = true
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.default_value = msg_type_def_pb.e_rmt_fail
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.type = 14
PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD.cpp_type = 8

PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.name = "reward"
PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.full_name = ".client2world_protocols.packetw2c_receive_reward_result.reward"
PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.number = 3
PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.index = 2
PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.label = 1
PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.has_default_value = false
PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.default_value = 0
PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.type = 3
PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD.cpp_type = 2

PACKETW2C_RECEIVE_REWARD_RESULT.name = "packetw2c_receive_reward_result"
PACKETW2C_RECEIVE_REWARD_RESULT.full_name = ".client2world_protocols.packetw2c_receive_reward_result"
PACKETW2C_RECEIVE_REWARD_RESULT.nested_types = {}
PACKETW2C_RECEIVE_REWARD_RESULT.enum_types = {}
PACKETW2C_RECEIVE_REWARD_RESULT.fields = {PACKETW2C_RECEIVE_REWARD_RESULT_PACKET_ID_FIELD, PACKETW2C_RECEIVE_REWARD_RESULT_RESULT_FIELD, PACKETW2C_RECEIVE_REWARD_RESULT_REWARD_FIELD}
PACKETW2C_RECEIVE_REWARD_RESULT.is_extendable = false
PACKETW2C_RECEIVE_REWARD_RESULT.extensions = {}
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_ask_income_history.packet_id"
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.number = 1
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.index = 0
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.label = 1
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_ask_income_history
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.type = 14
PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_ASK_INCOME_HISTORY.name = "packetc2w_ask_income_history"
PACKETC2W_ASK_INCOME_HISTORY.full_name = ".client2world_protocols.packetc2w_ask_income_history"
PACKETC2W_ASK_INCOME_HISTORY.nested_types = {}
PACKETC2W_ASK_INCOME_HISTORY.enum_types = {}
PACKETC2W_ASK_INCOME_HISTORY.fields = {PACKETC2W_ASK_INCOME_HISTORY_PACKET_ID_FIELD}
PACKETC2W_ASK_INCOME_HISTORY.is_extendable = false
PACKETC2W_ASK_INCOME_HISTORY.extensions = {}
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_income_history_result.packet_id"
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_income_history_result
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.name = "history_infos"
PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.full_name = ".client2world_protocols.packetw2c_income_history_result.history_infos"
PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.number = 2
PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.index = 1
PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.label = 3
PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.has_default_value = false
PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.default_value = {}
PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.type = 9
PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD.cpp_type = 9

PACKETW2C_INCOME_HISTORY_RESULT.name = "packetw2c_income_history_result"
PACKETW2C_INCOME_HISTORY_RESULT.full_name = ".client2world_protocols.packetw2c_income_history_result"
PACKETW2C_INCOME_HISTORY_RESULT.nested_types = {}
PACKETW2C_INCOME_HISTORY_RESULT.enum_types = {}
PACKETW2C_INCOME_HISTORY_RESULT.fields = {PACKETW2C_INCOME_HISTORY_RESULT_PACKET_ID_FIELD, PACKETW2C_INCOME_HISTORY_RESULT_HISTORY_INFOS_FIELD}
PACKETW2C_INCOME_HISTORY_RESULT.is_extendable = false
PACKETW2C_INCOME_HISTORY_RESULT.extensions = {}
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_income_new_result.packet_id"
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_income_new_result
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.name = "new_infos"
PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.full_name = ".client2world_protocols.packetw2c_income_new_result.new_infos"
PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.number = 2
PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.index = 1
PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.label = 1
PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.has_default_value = false
PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.default_value = ""
PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.type = 9
PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD.cpp_type = 9

PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.name = "playerid"
PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.full_name = ".client2world_protocols.packetw2c_income_new_result.playerid"
PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.number = 3
PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.index = 2
PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.label = 1
PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.has_default_value = false
PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.default_value = 0
PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.type = 5
PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD.cpp_type = 1

PACKETW2C_INCOME_NEW_RESULT.name = "packetw2c_income_new_result"
PACKETW2C_INCOME_NEW_RESULT.full_name = ".client2world_protocols.packetw2c_income_new_result"
PACKETW2C_INCOME_NEW_RESULT.nested_types = {}
PACKETW2C_INCOME_NEW_RESULT.enum_types = {}
PACKETW2C_INCOME_NEW_RESULT.fields = {PACKETW2C_INCOME_NEW_RESULT_PACKET_ID_FIELD, PACKETW2C_INCOME_NEW_RESULT_NEW_INFOS_FIELD, PACKETW2C_INCOME_NEW_RESULT_PLAYERID_FIELD}
PACKETW2C_INCOME_NEW_RESULT.is_extendable = false
PACKETW2C_INCOME_NEW_RESULT.extensions = {}

msg_inviter_info = protobuf.Message(MSG_INVITER_INFO)
packetc2w_ask_income_history = protobuf.Message(PACKETC2W_ASK_INCOME_HISTORY)
packetc2w_bind_inviter = protobuf.Message(PACKETC2W_BIND_INVITER)
packetc2w_receive_reward = protobuf.Message(PACKETC2W_RECEIVE_REWARD)
packetc2w_reward_list = protobuf.Message(PACKETC2W_REWARD_LIST)
packetw2c_bind_inviter_result = protobuf.Message(PACKETW2C_BIND_INVITER_RESULT)
packetw2c_income_history_result = protobuf.Message(PACKETW2C_INCOME_HISTORY_RESULT)
packetw2c_income_new_result = protobuf.Message(PACKETW2C_INCOME_NEW_RESULT)
packetw2c_receive_reward_result = protobuf.Message(PACKETW2C_RECEIVE_REWARD_RESULT)
packetw2c_reward_list_result = protobuf.Message(PACKETW2C_REWARD_LIST_RESULT)

