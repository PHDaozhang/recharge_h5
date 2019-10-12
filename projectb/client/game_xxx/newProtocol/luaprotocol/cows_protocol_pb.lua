-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
local cows_def_pb = require("cows_def_pb")
local msg_type_def_pb = require("msg_type_def_pb")
module('cows_protocol_pb')


PACKETC2L_GET_ROOM_INFO = protobuf.Descriptor();
local PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD = protobuf.FieldDescriptor();
MSG_ROOM_INFO = protobuf.Descriptor();
local MSG_ROOM_INFO_ROOMID_FIELD = protobuf.FieldDescriptor();
PACKETL2C_GET_ROOM_INFO_RESULT = protobuf.Descriptor();
local PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD = protobuf.FieldDescriptor();
PACKETC2L_ENTER_TABLE = protobuf.Descriptor();
local PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2L_ENTER_TABLE_ROOMID_FIELD = protobuf.FieldDescriptor();
PACKETL2C_ENTER_TABLE_RESULT = protobuf.Descriptor();
local PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
PACKETC2L_LEAVE_TABLE = protobuf.Descriptor();
local PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD = protobuf.FieldDescriptor();
PACKETL2C_LEAVE_TABLE_RESULT = protobuf.Descriptor();
local PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD = protobuf.FieldDescriptor();
PACKETC2L_CHECK_STATE = protobuf.Descriptor();
local PACKETC2L_CHECK_STATE_PACKET_ID_FIELD = protobuf.FieldDescriptor();
PACKETL2C_CHECK_STATE_RESULT = protobuf.Descriptor();
local PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD = protobuf.FieldDescriptor();

PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.name = "packet_id"
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.full_name = ".cows_protocols.packetc2l_get_room_info.packet_id"
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.number = 1
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.index = 0
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.label = 1
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.enum_type = cows_def_pb.E_SERVER_MSG_TYPE
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.has_default_value = true
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.default_value = cows_def_pb.e_mst_c2l_get_room_info
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.type = 14
PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD.cpp_type = 8

PACKETC2L_GET_ROOM_INFO.name = "packetc2l_get_room_info"
PACKETC2L_GET_ROOM_INFO.full_name = ".cows_protocols.packetc2l_get_room_info"
PACKETC2L_GET_ROOM_INFO.nested_types = {}
PACKETC2L_GET_ROOM_INFO.enum_types = {}
PACKETC2L_GET_ROOM_INFO.fields = {PACKETC2L_GET_ROOM_INFO_PACKET_ID_FIELD}
PACKETC2L_GET_ROOM_INFO.is_extendable = false
PACKETC2L_GET_ROOM_INFO.extensions = {}
MSG_ROOM_INFO_ROOMID_FIELD.name = "roomid"
MSG_ROOM_INFO_ROOMID_FIELD.full_name = ".cows_protocols.msg_room_info.roomid"
MSG_ROOM_INFO_ROOMID_FIELD.number = 1
MSG_ROOM_INFO_ROOMID_FIELD.index = 0
MSG_ROOM_INFO_ROOMID_FIELD.label = 1
MSG_ROOM_INFO_ROOMID_FIELD.has_default_value = false
MSG_ROOM_INFO_ROOMID_FIELD.default_value = 0
MSG_ROOM_INFO_ROOMID_FIELD.type = 5
MSG_ROOM_INFO_ROOMID_FIELD.cpp_type = 1

MSG_ROOM_INFO.name = "msg_room_info"
MSG_ROOM_INFO.full_name = ".cows_protocols.msg_room_info"
MSG_ROOM_INFO.nested_types = {}
MSG_ROOM_INFO.enum_types = {}
MSG_ROOM_INFO.fields = {MSG_ROOM_INFO_ROOMID_FIELD}
MSG_ROOM_INFO.is_extendable = false
MSG_ROOM_INFO.extensions = {}
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.full_name = ".cows_protocols.packetl2c_get_room_info_result.packet_id"
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.number = 1
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.index = 0
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.label = 1
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.enum_type = cows_def_pb.E_SERVER_MSG_TYPE
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.default_value = cows_def_pb.e_mst_l2c_get_room_info_result
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.type = 14
PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.name = "rooms"
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.full_name = ".cows_protocols.packetl2c_get_room_info_result.rooms"
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.number = 2
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.index = 1
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.label = 3
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.message_type = MSG_ROOM_INFO
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.has_default_value = false
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.default_value = {}
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.type = 11
PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD.cpp_type = 10

PACKETL2C_GET_ROOM_INFO_RESULT.name = "packetl2c_get_room_info_result"
PACKETL2C_GET_ROOM_INFO_RESULT.full_name = ".cows_protocols.packetl2c_get_room_info_result"
PACKETL2C_GET_ROOM_INFO_RESULT.nested_types = {}
PACKETL2C_GET_ROOM_INFO_RESULT.enum_types = {}
PACKETL2C_GET_ROOM_INFO_RESULT.fields = {PACKETL2C_GET_ROOM_INFO_RESULT_PACKET_ID_FIELD, PACKETL2C_GET_ROOM_INFO_RESULT_ROOMS_FIELD}
PACKETL2C_GET_ROOM_INFO_RESULT.is_extendable = false
PACKETL2C_GET_ROOM_INFO_RESULT.extensions = {}
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.name = "packet_id"
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.full_name = ".cows_protocols.packetc2l_enter_table.packet_id"
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.number = 1
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.index = 0
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.label = 1
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.enum_type = cows_def_pb.E_SERVER_MSG_TYPE
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.has_default_value = true
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.default_value = cows_def_pb.e_mst_c2l_enter_table
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.type = 14
PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD.cpp_type = 8

PACKETC2L_ENTER_TABLE_ROOMID_FIELD.name = "roomid"
PACKETC2L_ENTER_TABLE_ROOMID_FIELD.full_name = ".cows_protocols.packetc2l_enter_table.roomid"
PACKETC2L_ENTER_TABLE_ROOMID_FIELD.number = 2
PACKETC2L_ENTER_TABLE_ROOMID_FIELD.index = 1
PACKETC2L_ENTER_TABLE_ROOMID_FIELD.label = 1
PACKETC2L_ENTER_TABLE_ROOMID_FIELD.has_default_value = true
PACKETC2L_ENTER_TABLE_ROOMID_FIELD.default_value = 0
PACKETC2L_ENTER_TABLE_ROOMID_FIELD.type = 5
PACKETC2L_ENTER_TABLE_ROOMID_FIELD.cpp_type = 1

PACKETC2L_ENTER_TABLE.name = "packetc2l_enter_table"
PACKETC2L_ENTER_TABLE.full_name = ".cows_protocols.packetc2l_enter_table"
PACKETC2L_ENTER_TABLE.nested_types = {}
PACKETC2L_ENTER_TABLE.enum_types = {}
PACKETC2L_ENTER_TABLE.fields = {PACKETC2L_ENTER_TABLE_PACKET_ID_FIELD, PACKETC2L_ENTER_TABLE_ROOMID_FIELD}
PACKETC2L_ENTER_TABLE.is_extendable = false
PACKETC2L_ENTER_TABLE.extensions = {}
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.full_name = ".cows_protocols.packetl2c_enter_table_result.packet_id"
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.number = 1
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.index = 0
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.label = 1
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.enum_type = cows_def_pb.E_SERVER_MSG_TYPE
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.default_value = cows_def_pb.e_mst_l2c_enter_table_result
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.type = 14
PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.name = "result"
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.full_name = ".cows_protocols.packetl2c_enter_table_result.result"
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.number = 2
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.index = 1
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.label = 1
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.enum_type = msg_type_def_pb.E_MSG_RESULT_DEF
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.has_default_value = true
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.default_value = msg_type_def_pb.e_rmt_fail
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.type = 14
PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD.cpp_type = 8

PACKETL2C_ENTER_TABLE_RESULT.name = "packetl2c_enter_table_result"
PACKETL2C_ENTER_TABLE_RESULT.full_name = ".cows_protocols.packetl2c_enter_table_result"
PACKETL2C_ENTER_TABLE_RESULT.nested_types = {}
PACKETL2C_ENTER_TABLE_RESULT.enum_types = {}
PACKETL2C_ENTER_TABLE_RESULT.fields = {PACKETL2C_ENTER_TABLE_RESULT_PACKET_ID_FIELD, PACKETL2C_ENTER_TABLE_RESULT_RESULT_FIELD}
PACKETL2C_ENTER_TABLE_RESULT.is_extendable = false
PACKETL2C_ENTER_TABLE_RESULT.extensions = {}
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.name = "packet_id"
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.full_name = ".cows_protocols.packetc2l_leave_table.packet_id"
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.number = 1
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.index = 0
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.label = 1
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.enum_type = cows_def_pb.E_SERVER_MSG_TYPE
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.has_default_value = true
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.default_value = cows_def_pb.e_mst_c2l_leave_table
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.type = 14
PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD.cpp_type = 8

PACKETC2L_LEAVE_TABLE.name = "packetc2l_leave_table"
PACKETC2L_LEAVE_TABLE.full_name = ".cows_protocols.packetc2l_leave_table"
PACKETC2L_LEAVE_TABLE.nested_types = {}
PACKETC2L_LEAVE_TABLE.enum_types = {}
PACKETC2L_LEAVE_TABLE.fields = {PACKETC2L_LEAVE_TABLE_PACKET_ID_FIELD}
PACKETC2L_LEAVE_TABLE.is_extendable = false
PACKETC2L_LEAVE_TABLE.extensions = {}
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.full_name = ".cows_protocols.packetl2c_leave_table_result.packet_id"
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.number = 1
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.index = 0
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.label = 1
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.enum_type = cows_def_pb.E_SERVER_MSG_TYPE
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.default_value = cows_def_pb.e_mst_l2c_leave_table_result
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.type = 14
PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.name = "result"
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.full_name = ".cows_protocols.packetl2c_leave_table_result.result"
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.number = 2
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.index = 1
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.label = 1
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.enum_type = msg_type_def_pb.E_MSG_RESULT_DEF
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.has_default_value = true
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.default_value = msg_type_def_pb.e_rmt_fail
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.type = 14
PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD.cpp_type = 8

PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.name = "sync_gold"
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.full_name = ".cows_protocols.packetl2c_leave_table_result.sync_gold"
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.number = 3
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.index = 2
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.label = 1
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.has_default_value = false
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.default_value = 0
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.type = 3
PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD.cpp_type = 2

PACKETL2C_LEAVE_TABLE_RESULT.name = "packetl2c_leave_table_result"
PACKETL2C_LEAVE_TABLE_RESULT.full_name = ".cows_protocols.packetl2c_leave_table_result"
PACKETL2C_LEAVE_TABLE_RESULT.nested_types = {}
PACKETL2C_LEAVE_TABLE_RESULT.enum_types = {}
PACKETL2C_LEAVE_TABLE_RESULT.fields = {PACKETL2C_LEAVE_TABLE_RESULT_PACKET_ID_FIELD, PACKETL2C_LEAVE_TABLE_RESULT_RESULT_FIELD, PACKETL2C_LEAVE_TABLE_RESULT_SYNC_GOLD_FIELD}
PACKETL2C_LEAVE_TABLE_RESULT.is_extendable = false
PACKETL2C_LEAVE_TABLE_RESULT.extensions = {}
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.name = "packet_id"
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.full_name = ".cows_protocols.packetc2l_check_state.packet_id"
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.number = 1
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.index = 0
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.label = 1
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.enum_type = cows_def_pb.E_SERVER_MSG_TYPE
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.has_default_value = true
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.default_value = cows_def_pb.e_mst_c2l_check_state
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.type = 14
PACKETC2L_CHECK_STATE_PACKET_ID_FIELD.cpp_type = 8

PACKETC2L_CHECK_STATE.name = "packetc2l_check_state"
PACKETC2L_CHECK_STATE.full_name = ".cows_protocols.packetc2l_check_state"
PACKETC2L_CHECK_STATE.nested_types = {}
PACKETC2L_CHECK_STATE.enum_types = {}
PACKETC2L_CHECK_STATE.fields = {PACKETC2L_CHECK_STATE_PACKET_ID_FIELD}
PACKETC2L_CHECK_STATE.is_extendable = false
PACKETC2L_CHECK_STATE.extensions = {}
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.full_name = ".cows_protocols.packetl2c_check_state_result.packet_id"
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.number = 1
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.index = 0
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.label = 1
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.enum_type = cows_def_pb.E_SERVER_MSG_TYPE
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.default_value = cows_def_pb.e_mst_l2c_check_state_result
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.type = 14
PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.name = "is_intable"
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.full_name = ".cows_protocols.packetl2c_check_state_result.is_intable"
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.number = 2
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.index = 1
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.label = 1
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.has_default_value = true
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.default_value = false
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.type = 8
PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD.cpp_type = 7

PACKETL2C_CHECK_STATE_RESULT.name = "packetl2c_check_state_result"
PACKETL2C_CHECK_STATE_RESULT.full_name = ".cows_protocols.packetl2c_check_state_result"
PACKETL2C_CHECK_STATE_RESULT.nested_types = {}
PACKETL2C_CHECK_STATE_RESULT.enum_types = {}
PACKETL2C_CHECK_STATE_RESULT.fields = {PACKETL2C_CHECK_STATE_RESULT_PACKET_ID_FIELD, PACKETL2C_CHECK_STATE_RESULT_IS_INTABLE_FIELD}
PACKETL2C_CHECK_STATE_RESULT.is_extendable = false
PACKETL2C_CHECK_STATE_RESULT.extensions = {}

msg_room_info = protobuf.Message(MSG_ROOM_INFO)
packetc2l_check_state = protobuf.Message(PACKETC2L_CHECK_STATE)
packetc2l_enter_table = protobuf.Message(PACKETC2L_ENTER_TABLE)
packetc2l_get_room_info = protobuf.Message(PACKETC2L_GET_ROOM_INFO)
packetc2l_leave_table = protobuf.Message(PACKETC2L_LEAVE_TABLE)
packetl2c_check_state_result = protobuf.Message(PACKETL2C_CHECK_STATE_RESULT)
packetl2c_enter_table_result = protobuf.Message(PACKETL2C_ENTER_TABLE_RESULT)
packetl2c_get_room_info_result = protobuf.Message(PACKETL2C_GET_ROOM_INFO_RESULT)
packetl2c_leave_table_result = protobuf.Message(PACKETL2C_LEAVE_TABLE_RESULT)

