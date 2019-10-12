-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
local fish_def_pb = require("fish_def_pb")
local msg_type_def_pb = require("msg_type_def_pb")
module('fish_protocol_pb')


MSG_ITEM = protobuf.Descriptor();
local MSG_ITEM_ITEM_ID_FIELD = protobuf.FieldDescriptor();
local MSG_ITEM_ITEM_COUNT_FIELD = protobuf.FieldDescriptor();
local MSG_ITEM_END_TIME_FIELD = protobuf.FieldDescriptor();
PACKETC2L_LEAVE_TABLE = protobuf.Descriptor();
local PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD = protobuf.FieldDescriptor();
PACKETL2C_LEAVE_TABLE_RESULT = protobuf.Descriptor();
local PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD = protobuf.FieldDescriptor();
PACKETC2L_CHECK_STATE = protobuf.Descriptor();
local PACKETC2L_CHECK_STATE_PACKET_ID_FIELD = protobuf.FieldDescriptor();
PACKETL2C_CHECK_STATE_RESULT = protobuf.Descriptor();
local PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD = protobuf.FieldDescriptor();
PACKETC2L_USE_ITEM = protobuf.Descriptor();
local PACKETC2L_USE_ITEM_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2L_USE_ITEM_ITEM_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2L_USE_ITEM_POS_X_FIELD = protobuf.FieldDescriptor();
local PACKETC2L_USE_ITEM_POS_Y_FIELD = protobuf.FieldDescriptor();
PACKETL2C_USE_ITEM_RESULT = protobuf.Descriptor();
local PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD = protobuf.FieldDescriptor();

MSG_ITEM_ITEM_ID_FIELD.name = "item_id"
MSG_ITEM_ITEM_ID_FIELD.full_name = ".fish_protocols.msg_item.item_id"
MSG_ITEM_ITEM_ID_FIELD.number = 1
MSG_ITEM_ITEM_ID_FIELD.index = 0
MSG_ITEM_ITEM_ID_FIELD.label = 1
MSG_ITEM_ITEM_ID_FIELD.has_default_value = false
MSG_ITEM_ITEM_ID_FIELD.default_value = 0
MSG_ITEM_ITEM_ID_FIELD.type = 5
MSG_ITEM_ITEM_ID_FIELD.cpp_type = 1

MSG_ITEM_ITEM_COUNT_FIELD.name = "item_count"
MSG_ITEM_ITEM_COUNT_FIELD.full_name = ".fish_protocols.msg_item.item_count"
MSG_ITEM_ITEM_COUNT_FIELD.number = 2
MSG_ITEM_ITEM_COUNT_FIELD.index = 1
MSG_ITEM_ITEM_COUNT_FIELD.label = 1
MSG_ITEM_ITEM_COUNT_FIELD.has_default_value = false
MSG_ITEM_ITEM_COUNT_FIELD.default_value = 0
MSG_ITEM_ITEM_COUNT_FIELD.type = 5
MSG_ITEM_ITEM_COUNT_FIELD.cpp_type = 1

MSG_ITEM_END_TIME_FIELD.name = "end_time"
MSG_ITEM_END_TIME_FIELD.full_name = ".fish_protocols.msg_item.end_time"
MSG_ITEM_END_TIME_FIELD.number = 3
MSG_ITEM_END_TIME_FIELD.index = 2
MSG_ITEM_END_TIME_FIELD.label = 1
MSG_ITEM_END_TIME_FIELD.has_default_value = false
MSG_ITEM_END_TIME_FIELD.default_value = 0
MSG_ITEM_END_TIME_FIELD.type = 5
MSG_ITEM_END_TIME_FIELD.cpp_type = 1

MSG_ITEM.name = "msg_item"
MSG_ITEM.full_name = ".fish_protocols.msg_item"
MSG_ITEM.nested_types = {}
MSG_ITEM.enum_types = {}
MSG_ITEM.fields = {MSG_ITEM_ITEM_ID_FIELD, MSG_ITEM_ITEM_COUNT_FIELD, MSG_ITEM_END_TIME_FIELD}
MSG_ITEM.is_extendable = false
MSG_ITEM.extensions = {}
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.name = "packet_id"
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.full_name = ".fish_protocols.packetc2l_leave_table.packet_id"
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.number = 1
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.index = 0
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.label = 1
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.enum_type = fish_def_pb.E_SERVER_MSG_TYPE
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.has_default_value = true
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.default_value = fish_def_pb.e_mst_c2l_leave_table
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.type = 14
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.cpp_type = 8

PACKETC2L_LEAVE_TABLE.name = "packetc2l_leave_table"
PACKETC2L_LEAVE_TABLE.full_name = ".fish_protocols.packetc2l_leave_table"
PACKETC2L_LEAVE_TABLE.nested_types = {}
PACKETC2L_LEAVE_TABLE.enum_types = {}
PACKETC2L_LEAVE_TABLE.fields = {PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD}
PACKETC2L_LEAVE_TABLE.is_extendable = false
PACKETC2L_LEAVE_TABLE.extensions = {}
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.full_name = ".fish_protocols.packetl2c_leave_table_result.packet_id"
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.number = 1
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.index = 0
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.label = 1
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.enum_type = fish_def_pb.E_SERVER_MSG_TYPE
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.default_value = fish_def_pb.e_mst_l2c_leave_table_result
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.type = 14
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.name = "sync_gold"
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.full_name = ".fish_protocols.packetl2c_leave_table_result.sync_gold"
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.number = 2
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.index = 1
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.label = 1
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.has_default_value = false
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.default_value = 0
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.type = 3
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.cpp_type = 2

PACKETL2C_LEAVE_TABLE_RESULT.name = "packetl2c_leave_table_result"
PACKETL2C_LEAVE_TABLE_RESULT.full_name = ".fish_protocols.packetl2c_leave_table_result"
PACKETL2C_LEAVE_TABLE_RESULT.nested_types = {}
PACKETL2C_LEAVE_TABLE_RESULT.enum_types = {}
PACKETL2C_LEAVE_TABLE_RESULT.fields = {PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD, PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD}
PACKETL2C_LEAVE_TABLE_RESULT.is_extendable = false
PACKETL2C_LEAVE_TABLE_RESULT.extensions = {}
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.name = "packet_id"
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.full_name = ".fish_protocols.packetc2l_check_state.packet_id"
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.number = 1
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.index = 0
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.label = 1
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.enum_type = fish_def_pb.E_SERVER_MSG_TYPE
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.has_default_value = true
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.default_value = fish_def_pb.e_mst_c2l_check_state
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.type = 14
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.cpp_type = 8

PACKETC2L_CHECK_STATE.name = "packetc2l_check_state"
PACKETC2L_CHECK_STATE.full_name = ".fish_protocols.packetc2l_check_state"
PACKETC2L_CHECK_STATE.nested_types = {}
PACKETC2L_CHECK_STATE.enum_types = {}
PACKETC2L_CHECK_STATE.fields = {PACKETC2L_CHECK_STATE_PACKET_ID_FIELD}
PACKETC2L_CHECK_STATE.is_extendable = false
PACKETC2L_CHECK_STATE.extensions = {}
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.full_name = ".fish_protocols.packetl2c_check_state_result.packet_id"
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.number = 1
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.index = 0
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.label = 1
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.enum_type = fish_def_pb.E_SERVER_MSG_TYPE
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.default_value = fish_def_pb.e_mst_l2c_check_state_result
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.type = 14
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.name = "is_intable"
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.full_name = ".fish_protocols.packetl2c_check_state_result.is_intable"
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.number = 2
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.index = 1
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.label = 1
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.has_default_value = true
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.default_value = false
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.type = 8
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.cpp_type = 7

PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.name = "itemlist"
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.full_name = ".fish_protocols.packetl2c_check_state_result.itemlist"
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.number = 3
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.index = 2
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.label = 3
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.message_type = MSG_ITEM
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.has_default_value = false
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.default_value = {}
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.type = 11
PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD.cpp_type = 10

PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.name = "turret_id"
PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.full_name = ".fish_protocols.packetl2c_check_state_result.turret_id"
PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.number = 4
PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.index = 3
PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.label = 1
PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.has_default_value = false
PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.default_value = 0
PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.type = 5
PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD.cpp_type = 1

PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.name = "gamelvl"
PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.full_name = ".fish_protocols.packetl2c_check_state_result.gamelvl"
PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.number = 5
PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.index = 4
PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.label = 1
PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.has_default_value = false
PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.default_value = 0
PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.type = 5
PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD.cpp_type = 1

PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.name = "gameexp"
PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.full_name = ".fish_protocols.packetl2c_check_state_result.gameexp"
PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.number = 6
PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.index = 5
PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.label = 1
PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.has_default_value = false
PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.default_value = 0
PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.type = 5
PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD.cpp_type = 1

PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.name = "getgift"
PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.full_name = ".fish_protocols.packetl2c_check_state_result.getgift"
PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.number = 7
PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.index = 6
PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.label = 1
PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.has_default_value = false
PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.default_value = 0
PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.type = 5
PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD.cpp_type = 1

PACKETL2C_CHECK_STATE_RESULT.name = "packetl2c_check_state_result"
PACKETL2C_CHECK_STATE_RESULT.full_name = ".fish_protocols.packetl2c_check_state_result"
PACKETL2C_CHECK_STATE_RESULT.nested_types = {}
PACKETL2C_CHECK_STATE_RESULT.enum_types = {}
PACKETL2C_CHECK_STATE_RESULT.fields = {PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD, PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD, PACKETL2C_CHECK_STATE_RESULT_ITEMLIST_FIELD, PACKETL2C_CHECK_STATE_RESULT_TURRET_ID_FIELD, PACKETL2C_CHECK_STATE_RESULT_GAMELVL_FIELD, PACKETL2C_CHECK_STATE_RESULT_GAMEEXP_FIELD, PACKETL2C_CHECK_STATE_RESULT_GETGIFT_FIELD}
PACKETL2C_CHECK_STATE_RESULT.is_extendable = false
PACKETL2C_CHECK_STATE_RESULT.extensions = {}
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.name = "packet_id"
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.full_name = ".fish_protocols.packetc2l_use_item.packet_id"
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.number = 1
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.index = 0
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.label = 1
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.enum_type = fish_def_pb.E_SERVER_MSG_TYPE
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.has_default_value = true
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.default_value = fish_def_pb.e_mst_c2l_use_item
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.type = 14
PACKETC2L_USE_ITEM_PACKET_ID_FIELD.cpp_type = 8

PACKETC2L_USE_ITEM_ITEM_ID_FIELD.name = "item_id"
PACKETC2L_USE_ITEM_ITEM_ID_FIELD.full_name = ".fish_protocols.packetc2l_use_item.item_id"
PACKETC2L_USE_ITEM_ITEM_ID_FIELD.number = 2
PACKETC2L_USE_ITEM_ITEM_ID_FIELD.index = 1
PACKETC2L_USE_ITEM_ITEM_ID_FIELD.label = 1
PACKETC2L_USE_ITEM_ITEM_ID_FIELD.has_default_value = false
PACKETC2L_USE_ITEM_ITEM_ID_FIELD.default_value = 0
PACKETC2L_USE_ITEM_ITEM_ID_FIELD.type = 5
PACKETC2L_USE_ITEM_ITEM_ID_FIELD.cpp_type = 1

PACKETC2L_USE_ITEM_POS_X_FIELD.name = "pos_x"
PACKETC2L_USE_ITEM_POS_X_FIELD.full_name = ".fish_protocols.packetc2l_use_item.pos_x"
PACKETC2L_USE_ITEM_POS_X_FIELD.number = 3
PACKETC2L_USE_ITEM_POS_X_FIELD.index = 2
PACKETC2L_USE_ITEM_POS_X_FIELD.label = 1
PACKETC2L_USE_ITEM_POS_X_FIELD.has_default_value = false
PACKETC2L_USE_ITEM_POS_X_FIELD.default_value = 0
PACKETC2L_USE_ITEM_POS_X_FIELD.type = 5
PACKETC2L_USE_ITEM_POS_X_FIELD.cpp_type = 1

PACKETC2L_USE_ITEM_POS_Y_FIELD.name = "pos_y"
PACKETC2L_USE_ITEM_POS_Y_FIELD.full_name = ".fish_protocols.packetc2l_use_item.pos_y"
PACKETC2L_USE_ITEM_POS_Y_FIELD.number = 4
PACKETC2L_USE_ITEM_POS_Y_FIELD.index = 3
PACKETC2L_USE_ITEM_POS_Y_FIELD.label = 1
PACKETC2L_USE_ITEM_POS_Y_FIELD.has_default_value = false
PACKETC2L_USE_ITEM_POS_Y_FIELD.default_value = 0
PACKETC2L_USE_ITEM_POS_Y_FIELD.type = 5
PACKETC2L_USE_ITEM_POS_Y_FIELD.cpp_type = 1

PACKETC2L_USE_ITEM.name = "packetc2l_use_item"
PACKETC2L_USE_ITEM.full_name = ".fish_protocols.packetc2l_use_item"
PACKETC2L_USE_ITEM.nested_types = {}
PACKETC2L_USE_ITEM.enum_types = {}
PACKETC2L_USE_ITEM.fields = {PACKETC2L_USE_ITEM_PACKET_ID_FIELD, PACKETC2L_USE_ITEM_ITEM_ID_FIELD, PACKETC2L_USE_ITEM_POS_X_FIELD, PACKETC2L_USE_ITEM_POS_Y_FIELD}
PACKETC2L_USE_ITEM.is_extendable = false
PACKETC2L_USE_ITEM.extensions = {}
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.full_name = ".fish_protocols.packetl2c_use_item_result.packet_id"
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.number = 1
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.index = 0
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.label = 1
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.enum_type = fish_def_pb.E_SERVER_MSG_TYPE
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.default_value = fish_def_pb.e_mst_l2c_use_item_result
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.type = 14
PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.name = "item_id"
PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.full_name = ".fish_protocols.packetl2c_use_item_result.item_id"
PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.number = 2
PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.index = 1
PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.label = 1
PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.has_default_value = false
PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.default_value = 0
PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.type = 5
PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD.cpp_type = 1

PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.name = "result"
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.full_name = ".fish_protocols.packetl2c_use_item_result.result"
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.number = 3
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.index = 2
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.label = 1
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.enum_type = msg_type_def_pb.E_MSG_RESULT_DEF
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.has_default_value = true
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.default_value = msg_type_def_pb.e_rmt_fail
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.type = 14
PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD.cpp_type = 8

PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.name = "item_count"
PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.full_name = ".fish_protocols.packetl2c_use_item_result.item_count"
PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.number = 4
PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.index = 3
PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.label = 1
PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.has_default_value = true
PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.default_value = 1
PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.type = 5
PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD.cpp_type = 1

PACKETL2C_USE_ITEM_RESULT.name = "packetl2c_use_item_result"
PACKETL2C_USE_ITEM_RESULT.full_name = ".fish_protocols.packetl2c_use_item_result"
PACKETL2C_USE_ITEM_RESULT.nested_types = {}
PACKETL2C_USE_ITEM_RESULT.enum_types = {}
PACKETL2C_USE_ITEM_RESULT.fields = {PACKETL2C_USE_ITEM_RESULT_PACKET_ID_FIELD, PACKETL2C_USE_ITEM_RESULT_ITEM_ID_FIELD, PACKETL2C_USE_ITEM_RESULT_RESULT_FIELD, PACKETL2C_USE_ITEM_RESULT_ITEM_COUNT_FIELD}
PACKETL2C_USE_ITEM_RESULT.is_extendable = false
PACKETL2C_USE_ITEM_RESULT.extensions = {}

msg_item = protobuf.Message(MSG_ITEM)
packetc2l_check_state = protobuf.Message(PACKETC2L_CHECK_STATE)
packetc2l_leave_table = protobuf.Message(PACKETC2L_LEAVE_TABLE)
packetc2l_use_item = protobuf.Message(PACKETC2L_USE_ITEM)
packetl2c_check_state_result = protobuf.Message(PACKETL2C_CHECK_STATE_RESULT)
packetl2c_leave_table_result = protobuf.Message(PACKETL2C_LEAVE_TABLE_RESULT)
packetl2c_use_item_result = protobuf.Message(PACKETL2C_USE_ITEM_RESULT)

