-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
module('client2logic_msg_type_pb')


E_SERVER_MSG_TYPE = protobuf.EnumDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM = protobuf.EnumValueDescriptor();

E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.name = "e_mst_start_c2l"
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.index = 0
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.number = 10000
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.name = "e_mst_start_l2c"
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.index = 1
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.number = 15000
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.name = "e_mst_clend_index"
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.index = 2
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.number = 20000
E_SERVER_MSG_TYPE.name = "e_server_msg_type"
E_SERVER_MSG_TYPE.full_name = ".client2logic_protocols.e_server_msg_type"
E_SERVER_MSG_TYPE.values = {E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM,E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM,E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM}

e_mst_clend_index = 20000
e_mst_start_c2l = 10000
e_mst_start_l2c = 15000

