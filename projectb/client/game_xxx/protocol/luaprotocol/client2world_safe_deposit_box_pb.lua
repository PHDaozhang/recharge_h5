-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
local client2world_msg_type_pb = require("client2world_msg_type_pb")
local msg_type_def_pb = require("msg_type_def_pb")
local msg_info_def_pb = require("msg_info_def_pb")
module('client2world_safe_deposit_box_pb')


PACKETC2W_SET_PASSWORD = protobuf.Descriptor();
local PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_SET_PASSWORD_PWD1_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_SET_PASSWORD_PWD2_FIELD = protobuf.FieldDescriptor();
PACKETW2C_SET_PASSWORD_RESULT = protobuf.Descriptor();
local PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
PACKETC2W_MODIFY_PASSWORD = protobuf.Descriptor();
local PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD = protobuf.FieldDescriptor();
PACKETW2C_MODIFY_PASSWORD_RESULT = protobuf.Descriptor();
local PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
PACKETC2W_RESET_PASSWORD = protobuf.Descriptor();
local PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_RESET_PASSWORD_PWD1_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_RESET_PASSWORD_PWD2_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD = protobuf.FieldDescriptor();
PACKETW2C_RESET_PASSWORD_RESULT = protobuf.Descriptor();
local PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
PACKETC2W_DEPOSIT_GOLD = protobuf.Descriptor();
local PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_DEPOSIT_GOLD_PWD_FIELD = protobuf.FieldDescriptor();
PACKETW2C_DEPOSIT_GOLD_RESULT = protobuf.Descriptor();
local PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
PACKETC2W_DRAW_GOLD = protobuf.Descriptor();
local PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_DRAW_GOLD_GOLD_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_DRAW_GOLD_PWD_FIELD = protobuf.FieldDescriptor();
PACKETW2C_DRAW_GOLD_RESULT = protobuf.Descriptor();
local PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE = protobuf.Descriptor();
local PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD = protobuf.FieldDescriptor();
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT = protobuf.Descriptor();
local PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();
PACKETC2W_CHECK_PASSWORD = protobuf.Descriptor();
local PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_CHECK_PASSWORD_PWD_FIELD = protobuf.FieldDescriptor();
local PACKETC2W_CHECK_PASSWORD_NPWD_FIELD = protobuf.FieldDescriptor();
PACKETW2C_CHECK_PASSWORD_RESULT = protobuf.Descriptor();
local PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD = protobuf.FieldDescriptor();
local PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD = protobuf.FieldDescriptor();

PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_set_password.packet_id"
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.number = 1
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.index = 0
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.label = 1
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_set_password
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.type = 14
PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_SET_PASSWORD_PWD1_FIELD.name = "pwd1"
PACKETC2W_SET_PASSWORD_PWD1_FIELD.full_name = ".client2world_protocols.packetc2w_set_password.pwd1"
PACKETC2W_SET_PASSWORD_PWD1_FIELD.number = 2
PACKETC2W_SET_PASSWORD_PWD1_FIELD.index = 1
PACKETC2W_SET_PASSWORD_PWD1_FIELD.label = 1
PACKETC2W_SET_PASSWORD_PWD1_FIELD.has_default_value = false
PACKETC2W_SET_PASSWORD_PWD1_FIELD.default_value = ""
PACKETC2W_SET_PASSWORD_PWD1_FIELD.type = 9
PACKETC2W_SET_PASSWORD_PWD1_FIELD.cpp_type = 9

PACKETC2W_SET_PASSWORD_PWD2_FIELD.name = "pwd2"
PACKETC2W_SET_PASSWORD_PWD2_FIELD.full_name = ".client2world_protocols.packetc2w_set_password.pwd2"
PACKETC2W_SET_PASSWORD_PWD2_FIELD.number = 3
PACKETC2W_SET_PASSWORD_PWD2_FIELD.index = 2
PACKETC2W_SET_PASSWORD_PWD2_FIELD.label = 1
PACKETC2W_SET_PASSWORD_PWD2_FIELD.has_default_value = false
PACKETC2W_SET_PASSWORD_PWD2_FIELD.default_value = ""
PACKETC2W_SET_PASSWORD_PWD2_FIELD.type = 9
PACKETC2W_SET_PASSWORD_PWD2_FIELD.cpp_type = 9

PACKETC2W_SET_PASSWORD.name = "packetc2w_set_password"
PACKETC2W_SET_PASSWORD.full_name = ".client2world_protocols.packetc2w_set_password"
PACKETC2W_SET_PASSWORD.nested_types = {}
PACKETC2W_SET_PASSWORD.enum_types = {}
PACKETC2W_SET_PASSWORD.fields = {PACKETC2W_SET_PASSWORD_PACKET_ID_FIELD, PACKETC2W_SET_PASSWORD_PWD1_FIELD, PACKETC2W_SET_PASSWORD_PWD2_FIELD}
PACKETC2W_SET_PASSWORD.is_extendable = false
PACKETC2W_SET_PASSWORD.extensions = {}
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_set_password_result.packet_id"
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_set_password_result
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_set_password_result.result"
PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.number = 2
PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.index = 1
PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.label = 1
PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.has_default_value = false
PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.default_value = 0
PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.type = 5
PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD.cpp_type = 1

PACKETW2C_SET_PASSWORD_RESULT.name = "packetw2c_set_password_result"
PACKETW2C_SET_PASSWORD_RESULT.full_name = ".client2world_protocols.packetw2c_set_password_result"
PACKETW2C_SET_PASSWORD_RESULT.nested_types = {}
PACKETW2C_SET_PASSWORD_RESULT.enum_types = {}
PACKETW2C_SET_PASSWORD_RESULT.fields = {PACKETW2C_SET_PASSWORD_RESULT_PACKET_ID_FIELD, PACKETW2C_SET_PASSWORD_RESULT_RESULT_FIELD}
PACKETW2C_SET_PASSWORD_RESULT.is_extendable = false
PACKETW2C_SET_PASSWORD_RESULT.extensions = {}
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_modify_password.packet_id"
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.number = 1
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.index = 0
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.label = 1
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_modify_password
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.type = 14
PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.name = "old_pwd"
PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.full_name = ".client2world_protocols.packetc2w_modify_password.old_pwd"
PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.number = 2
PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.index = 1
PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.label = 1
PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.has_default_value = false
PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.default_value = ""
PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.type = 9
PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD.cpp_type = 9

PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.name = "new_pwd1"
PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.full_name = ".client2world_protocols.packetc2w_modify_password.new_pwd1"
PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.number = 3
PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.index = 2
PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.label = 1
PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.has_default_value = false
PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.default_value = ""
PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.type = 9
PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD.cpp_type = 9

PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.name = "new_pwd2"
PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.full_name = ".client2world_protocols.packetc2w_modify_password.new_pwd2"
PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.number = 4
PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.index = 3
PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.label = 1
PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.has_default_value = false
PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.default_value = ""
PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.type = 9
PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD.cpp_type = 9

PACKETC2W_MODIFY_PASSWORD.name = "packetc2w_modify_password"
PACKETC2W_MODIFY_PASSWORD.full_name = ".client2world_protocols.packetc2w_modify_password"
PACKETC2W_MODIFY_PASSWORD.nested_types = {}
PACKETC2W_MODIFY_PASSWORD.enum_types = {}
PACKETC2W_MODIFY_PASSWORD.fields = {PACKETC2W_MODIFY_PASSWORD_PACKET_ID_FIELD, PACKETC2W_MODIFY_PASSWORD_OLD_PWD_FIELD, PACKETC2W_MODIFY_PASSWORD_NEW_PWD1_FIELD, PACKETC2W_MODIFY_PASSWORD_NEW_PWD2_FIELD}
PACKETC2W_MODIFY_PASSWORD.is_extendable = false
PACKETC2W_MODIFY_PASSWORD.extensions = {}
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_modify_password_result.packet_id"
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_modify_password_result
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_modify_password_result.result"
PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.number = 2
PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.index = 1
PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.label = 1
PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.has_default_value = false
PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.default_value = 0
PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.type = 5
PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD.cpp_type = 1

PACKETW2C_MODIFY_PASSWORD_RESULT.name = "packetw2c_modify_password_result"
PACKETW2C_MODIFY_PASSWORD_RESULT.full_name = ".client2world_protocols.packetw2c_modify_password_result"
PACKETW2C_MODIFY_PASSWORD_RESULT.nested_types = {}
PACKETW2C_MODIFY_PASSWORD_RESULT.enum_types = {}
PACKETW2C_MODIFY_PASSWORD_RESULT.fields = {PACKETW2C_MODIFY_PASSWORD_RESULT_PACKET_ID_FIELD, PACKETW2C_MODIFY_PASSWORD_RESULT_RESULT_FIELD}
PACKETW2C_MODIFY_PASSWORD_RESULT.is_extendable = false
PACKETW2C_MODIFY_PASSWORD_RESULT.extensions = {}
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_reset_password.packet_id"
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.number = 1
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.index = 0
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.label = 1
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_reset_password
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.type = 14
PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_RESET_PASSWORD_PWD1_FIELD.name = "pwd1"
PACKETC2W_RESET_PASSWORD_PWD1_FIELD.full_name = ".client2world_protocols.packetc2w_reset_password.pwd1"
PACKETC2W_RESET_PASSWORD_PWD1_FIELD.number = 2
PACKETC2W_RESET_PASSWORD_PWD1_FIELD.index = 1
PACKETC2W_RESET_PASSWORD_PWD1_FIELD.label = 1
PACKETC2W_RESET_PASSWORD_PWD1_FIELD.has_default_value = false
PACKETC2W_RESET_PASSWORD_PWD1_FIELD.default_value = ""
PACKETC2W_RESET_PASSWORD_PWD1_FIELD.type = 9
PACKETC2W_RESET_PASSWORD_PWD1_FIELD.cpp_type = 9

PACKETC2W_RESET_PASSWORD_PWD2_FIELD.name = "pwd2"
PACKETC2W_RESET_PASSWORD_PWD2_FIELD.full_name = ".client2world_protocols.packetc2w_reset_password.pwd2"
PACKETC2W_RESET_PASSWORD_PWD2_FIELD.number = 3
PACKETC2W_RESET_PASSWORD_PWD2_FIELD.index = 2
PACKETC2W_RESET_PASSWORD_PWD2_FIELD.label = 1
PACKETC2W_RESET_PASSWORD_PWD2_FIELD.has_default_value = false
PACKETC2W_RESET_PASSWORD_PWD2_FIELD.default_value = ""
PACKETC2W_RESET_PASSWORD_PWD2_FIELD.type = 9
PACKETC2W_RESET_PASSWORD_PWD2_FIELD.cpp_type = 9

PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.name = "safeCode"
PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.full_name = ".client2world_protocols.packetc2w_reset_password.safeCode"
PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.number = 4
PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.index = 3
PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.label = 1
PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.has_default_value = false
PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.default_value = ""
PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.type = 9
PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD.cpp_type = 9

PACKETC2W_RESET_PASSWORD.name = "packetc2w_reset_password"
PACKETC2W_RESET_PASSWORD.full_name = ".client2world_protocols.packetc2w_reset_password"
PACKETC2W_RESET_PASSWORD.nested_types = {}
PACKETC2W_RESET_PASSWORD.enum_types = {}
PACKETC2W_RESET_PASSWORD.fields = {PACKETC2W_RESET_PASSWORD_PACKET_ID_FIELD, PACKETC2W_RESET_PASSWORD_PWD1_FIELD, PACKETC2W_RESET_PASSWORD_PWD2_FIELD, PACKETC2W_RESET_PASSWORD_SAFECODE_FIELD}
PACKETC2W_RESET_PASSWORD.is_extendable = false
PACKETC2W_RESET_PASSWORD.extensions = {}
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_reset_password_result.packet_id"
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_reset_password_result
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_reset_password_result.result"
PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.number = 2
PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.index = 1
PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.label = 1
PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.has_default_value = false
PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.default_value = 0
PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.type = 5
PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD.cpp_type = 1

PACKETW2C_RESET_PASSWORD_RESULT.name = "packetw2c_reset_password_result"
PACKETW2C_RESET_PASSWORD_RESULT.full_name = ".client2world_protocols.packetw2c_reset_password_result"
PACKETW2C_RESET_PASSWORD_RESULT.nested_types = {}
PACKETW2C_RESET_PASSWORD_RESULT.enum_types = {}
PACKETW2C_RESET_PASSWORD_RESULT.fields = {PACKETW2C_RESET_PASSWORD_RESULT_PACKET_ID_FIELD, PACKETW2C_RESET_PASSWORD_RESULT_RESULT_FIELD}
PACKETW2C_RESET_PASSWORD_RESULT.is_extendable = false
PACKETW2C_RESET_PASSWORD_RESULT.extensions = {}
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_deposit_gold.packet_id"
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.number = 1
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.index = 0
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.label = 1
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_deposit_gold
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.type = 14
PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.name = "gold"
PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.full_name = ".client2world_protocols.packetc2w_deposit_gold.gold"
PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.number = 2
PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.index = 1
PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.label = 1
PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.has_default_value = false
PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.default_value = 0
PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.type = 3
PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD.cpp_type = 2

PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.name = "pwd"
PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.full_name = ".client2world_protocols.packetc2w_deposit_gold.pwd"
PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.number = 3
PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.index = 2
PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.label = 1
PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.has_default_value = false
PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.default_value = ""
PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.type = 9
PACKETC2W_DEPOSIT_GOLD_PWD_FIELD.cpp_type = 9

PACKETC2W_DEPOSIT_GOLD.name = "packetc2w_deposit_gold"
PACKETC2W_DEPOSIT_GOLD.full_name = ".client2world_protocols.packetc2w_deposit_gold"
PACKETC2W_DEPOSIT_GOLD.nested_types = {}
PACKETC2W_DEPOSIT_GOLD.enum_types = {}
PACKETC2W_DEPOSIT_GOLD.fields = {PACKETC2W_DEPOSIT_GOLD_PACKET_ID_FIELD, PACKETC2W_DEPOSIT_GOLD_GOLD_FIELD, PACKETC2W_DEPOSIT_GOLD_PWD_FIELD}
PACKETC2W_DEPOSIT_GOLD.is_extendable = false
PACKETC2W_DEPOSIT_GOLD.extensions = {}
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_deposit_gold_result.packet_id"
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_deposit_gold_result
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.name = "gold"
PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.full_name = ".client2world_protocols.packetw2c_deposit_gold_result.gold"
PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.number = 2
PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.index = 1
PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.label = 1
PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.has_default_value = false
PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.default_value = 0
PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.type = 3
PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD.cpp_type = 2

PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_deposit_gold_result.result"
PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.number = 3
PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.index = 2
PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.label = 1
PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.has_default_value = false
PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.default_value = 0
PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.type = 5
PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD.cpp_type = 1

PACKETW2C_DEPOSIT_GOLD_RESULT.name = "packetw2c_deposit_gold_result"
PACKETW2C_DEPOSIT_GOLD_RESULT.full_name = ".client2world_protocols.packetw2c_deposit_gold_result"
PACKETW2C_DEPOSIT_GOLD_RESULT.nested_types = {}
PACKETW2C_DEPOSIT_GOLD_RESULT.enum_types = {}
PACKETW2C_DEPOSIT_GOLD_RESULT.fields = {PACKETW2C_DEPOSIT_GOLD_RESULT_PACKET_ID_FIELD, PACKETW2C_DEPOSIT_GOLD_RESULT_GOLD_FIELD, PACKETW2C_DEPOSIT_GOLD_RESULT_RESULT_FIELD}
PACKETW2C_DEPOSIT_GOLD_RESULT.is_extendable = false
PACKETW2C_DEPOSIT_GOLD_RESULT.extensions = {}
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_draw_gold.packet_id"
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.number = 1
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.index = 0
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.label = 1
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_draw_gold
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.type = 14
PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_DRAW_GOLD_GOLD_FIELD.name = "gold"
PACKETC2W_DRAW_GOLD_GOLD_FIELD.full_name = ".client2world_protocols.packetc2w_draw_gold.gold"
PACKETC2W_DRAW_GOLD_GOLD_FIELD.number = 2
PACKETC2W_DRAW_GOLD_GOLD_FIELD.index = 1
PACKETC2W_DRAW_GOLD_GOLD_FIELD.label = 1
PACKETC2W_DRAW_GOLD_GOLD_FIELD.has_default_value = false
PACKETC2W_DRAW_GOLD_GOLD_FIELD.default_value = 0
PACKETC2W_DRAW_GOLD_GOLD_FIELD.type = 3
PACKETC2W_DRAW_GOLD_GOLD_FIELD.cpp_type = 2

PACKETC2W_DRAW_GOLD_PWD_FIELD.name = "pwd"
PACKETC2W_DRAW_GOLD_PWD_FIELD.full_name = ".client2world_protocols.packetc2w_draw_gold.pwd"
PACKETC2W_DRAW_GOLD_PWD_FIELD.number = 3
PACKETC2W_DRAW_GOLD_PWD_FIELD.index = 2
PACKETC2W_DRAW_GOLD_PWD_FIELD.label = 1
PACKETC2W_DRAW_GOLD_PWD_FIELD.has_default_value = false
PACKETC2W_DRAW_GOLD_PWD_FIELD.default_value = ""
PACKETC2W_DRAW_GOLD_PWD_FIELD.type = 9
PACKETC2W_DRAW_GOLD_PWD_FIELD.cpp_type = 9

PACKETC2W_DRAW_GOLD.name = "packetc2w_draw_gold"
PACKETC2W_DRAW_GOLD.full_name = ".client2world_protocols.packetc2w_draw_gold"
PACKETC2W_DRAW_GOLD.nested_types = {}
PACKETC2W_DRAW_GOLD.enum_types = {}
PACKETC2W_DRAW_GOLD.fields = {PACKETC2W_DRAW_GOLD_PACKET_ID_FIELD, PACKETC2W_DRAW_GOLD_GOLD_FIELD, PACKETC2W_DRAW_GOLD_PWD_FIELD}
PACKETC2W_DRAW_GOLD.is_extendable = false
PACKETC2W_DRAW_GOLD.extensions = {}
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_draw_gold_result.packet_id"
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_draw_gold_result
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.name = "gold"
PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.full_name = ".client2world_protocols.packetw2c_draw_gold_result.gold"
PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.number = 2
PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.index = 1
PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.label = 1
PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.has_default_value = false
PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.default_value = 0
PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.type = 3
PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD.cpp_type = 2

PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_draw_gold_result.result"
PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.number = 3
PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.index = 2
PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.label = 1
PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.has_default_value = false
PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.default_value = 0
PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.type = 5
PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD.cpp_type = 1

PACKETW2C_DRAW_GOLD_RESULT.name = "packetw2c_draw_gold_result"
PACKETW2C_DRAW_GOLD_RESULT.full_name = ".client2world_protocols.packetw2c_draw_gold_result"
PACKETW2C_DRAW_GOLD_RESULT.nested_types = {}
PACKETW2C_DRAW_GOLD_RESULT.enum_types = {}
PACKETW2C_DRAW_GOLD_RESULT.fields = {PACKETW2C_DRAW_GOLD_RESULT_PACKET_ID_FIELD, PACKETW2C_DRAW_GOLD_RESULT_GOLD_FIELD, PACKETW2C_DRAW_GOLD_RESULT_RESULT_FIELD}
PACKETW2C_DRAW_GOLD_RESULT.is_extendable = false
PACKETW2C_DRAW_GOLD_RESULT.extensions = {}
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_get_safe_box_security_code.packet_id"
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.number = 1
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.index = 0
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.label = 1
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_get_safe_box_security_code
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.type = 14
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_GET_SAFE_BOX_SECURITY_CODE.name = "packetc2w_get_safe_box_security_code"
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE.full_name = ".client2world_protocols.packetc2w_get_safe_box_security_code"
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE.nested_types = {}
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE.enum_types = {}
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE.fields = {PACKETC2W_GET_SAFE_BOX_SECURITY_CODE_PACKET_ID_FIELD}
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE.is_extendable = false
PACKETC2W_GET_SAFE_BOX_SECURITY_CODE.extensions = {}
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_get_safe_box_security_code_result.packet_id"
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_get_safe_box_security_code_result
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_get_safe_box_security_code_result.result"
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.number = 2
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.index = 1
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.label = 1
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.has_default_value = false
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.default_value = 0
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.type = 5
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD.cpp_type = 1

PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT.name = "packetw2c_get_safe_box_security_code_result"
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT.full_name = ".client2world_protocols.packetw2c_get_safe_box_security_code_result"
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT.nested_types = {}
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT.enum_types = {}
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT.fields = {PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_PACKET_ID_FIELD, PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT_RESULT_FIELD}
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT.is_extendable = false
PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT.extensions = {}
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.name = "packet_id"
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetc2w_check_password.packet_id"
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.number = 1
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.index = 0
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.label = 1
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.has_default_value = true
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_c2w_check_password
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.type = 14
PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD.cpp_type = 8

PACKETC2W_CHECK_PASSWORD_PWD_FIELD.name = "pwd"
PACKETC2W_CHECK_PASSWORD_PWD_FIELD.full_name = ".client2world_protocols.packetc2w_check_password.pwd"
PACKETC2W_CHECK_PASSWORD_PWD_FIELD.number = 2
PACKETC2W_CHECK_PASSWORD_PWD_FIELD.index = 1
PACKETC2W_CHECK_PASSWORD_PWD_FIELD.label = 1
PACKETC2W_CHECK_PASSWORD_PWD_FIELD.has_default_value = false
PACKETC2W_CHECK_PASSWORD_PWD_FIELD.default_value = ""
PACKETC2W_CHECK_PASSWORD_PWD_FIELD.type = 9
PACKETC2W_CHECK_PASSWORD_PWD_FIELD.cpp_type = 9

PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.name = "npwd"
PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.full_name = ".client2world_protocols.packetc2w_check_password.npwd"
PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.number = 4
PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.index = 2
PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.label = 1
PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.has_default_value = false
PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.default_value = ""
PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.type = 9
PACKETC2W_CHECK_PASSWORD_NPWD_FIELD.cpp_type = 9

PACKETC2W_CHECK_PASSWORD.name = "packetc2w_check_password"
PACKETC2W_CHECK_PASSWORD.full_name = ".client2world_protocols.packetc2w_check_password"
PACKETC2W_CHECK_PASSWORD.nested_types = {}
PACKETC2W_CHECK_PASSWORD.enum_types = {}
PACKETC2W_CHECK_PASSWORD.fields = {PACKETC2W_CHECK_PASSWORD_PACKET_ID_FIELD, PACKETC2W_CHECK_PASSWORD_PWD_FIELD, PACKETC2W_CHECK_PASSWORD_NPWD_FIELD}
PACKETC2W_CHECK_PASSWORD.is_extendable = false
PACKETC2W_CHECK_PASSWORD.extensions = {}
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.name = "packet_id"
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.full_name = ".client2world_protocols.packetw2c_check_password_result.packet_id"
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.number = 1
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.index = 0
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.label = 1
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.enum_type = client2world_msg_type_pb.E_SERVER_MSG_TYPE
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.has_default_value = true
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.default_value = client2world_msg_type_pb.e_mst_w2c_check_password_result
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.type = 14
PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD.cpp_type = 8

PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.name = "result"
PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.full_name = ".client2world_protocols.packetw2c_check_password_result.result"
PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.number = 2
PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.index = 1
PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.label = 1
PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.has_default_value = false
PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.default_value = 0
PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.type = 5
PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD.cpp_type = 1

PACKETW2C_CHECK_PASSWORD_RESULT.name = "packetw2c_check_password_result"
PACKETW2C_CHECK_PASSWORD_RESULT.full_name = ".client2world_protocols.packetw2c_check_password_result"
PACKETW2C_CHECK_PASSWORD_RESULT.nested_types = {}
PACKETW2C_CHECK_PASSWORD_RESULT.enum_types = {}
PACKETW2C_CHECK_PASSWORD_RESULT.fields = {PACKETW2C_CHECK_PASSWORD_RESULT_PACKET_ID_FIELD, PACKETW2C_CHECK_PASSWORD_RESULT_RESULT_FIELD}
PACKETW2C_CHECK_PASSWORD_RESULT.is_extendable = false
PACKETW2C_CHECK_PASSWORD_RESULT.extensions = {}

packetc2w_check_password = protobuf.Message(PACKETC2W_CHECK_PASSWORD)
packetc2w_deposit_gold = protobuf.Message(PACKETC2W_DEPOSIT_GOLD)
packetc2w_draw_gold = protobuf.Message(PACKETC2W_DRAW_GOLD)
packetc2w_get_safe_box_security_code = protobuf.Message(PACKETC2W_GET_SAFE_BOX_SECURITY_CODE)
packetc2w_modify_password = protobuf.Message(PACKETC2W_MODIFY_PASSWORD)
packetc2w_reset_password = protobuf.Message(PACKETC2W_RESET_PASSWORD)
packetc2w_set_password = protobuf.Message(PACKETC2W_SET_PASSWORD)
packetw2c_check_password_result = protobuf.Message(PACKETW2C_CHECK_PASSWORD_RESULT)
packetw2c_deposit_gold_result = protobuf.Message(PACKETW2C_DEPOSIT_GOLD_RESULT)
packetw2c_draw_gold_result = protobuf.Message(PACKETW2C_DRAW_GOLD_RESULT)
packetw2c_get_safe_box_security_code_result = protobuf.Message(PACKETW2C_GET_SAFE_BOX_SECURITY_CODE_RESULT)
packetw2c_modify_password_result = protobuf.Message(PACKETW2C_MODIFY_PASSWORD_RESULT)
packetw2c_reset_password_result = protobuf.Message(PACKETW2C_RESET_PASSWORD_RESULT)
packetw2c_set_password_result = protobuf.Message(PACKETW2C_SET_PASSWORD_RESULT)

