-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
module('game_prizeClaw_def_pb')


E_SERVER_MSG_TYPE = protobuf.EnumDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GET_PLAYER_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_START_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_LEAVE_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BEGIN_PASS_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_CLAW_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_MISS_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GET_PLAYER_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_START_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_LEAVE_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BEGIN_PASS_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_CLAW_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_12C_MISS_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM = protobuf.EnumValueDescriptor();

E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.name = "e_mst_start_c2l"
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.index = 0
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.number = 10000
E_SERVER_MSG_TYPE_E_MST_C2L_GET_PLAYER_INFO_ENUM.name = "e_mst_c2l_get_player_info"
E_SERVER_MSG_TYPE_E_MST_C2L_GET_PLAYER_INFO_ENUM.index = 1
E_SERVER_MSG_TYPE_E_MST_C2L_GET_PLAYER_INFO_ENUM.number = 10001
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_START_GAME_ENUM.name = "e_mst_c2l_req_start_game"
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_START_GAME_ENUM.index = 2
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_START_GAME_ENUM.number = 10002
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_LEAVE_GAME_ENUM.name = "e_mst_c2l_req_leave_game"
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_LEAVE_GAME_ENUM.index = 3
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_LEAVE_GAME_ENUM.number = 10003
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BEGIN_PASS_ENUM.name = "e_mst_c2l_req_begin_pass"
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BEGIN_PASS_ENUM.index = 4
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BEGIN_PASS_ENUM.number = 10004
E_SERVER_MSG_TYPE_E_MST_C2L_CLAW_ENUM.name = "e_mst_c2l_claw"
E_SERVER_MSG_TYPE_E_MST_C2L_CLAW_ENUM.index = 5
E_SERVER_MSG_TYPE_E_MST_C2L_CLAW_ENUM.number = 10005
E_SERVER_MSG_TYPE_E_MST_C2L_MISS_ENUM.name = "e_mst_c2l_miss"
E_SERVER_MSG_TYPE_E_MST_C2L_MISS_ENUM.index = 6
E_SERVER_MSG_TYPE_E_MST_C2L_MISS_ENUM.number = 10006
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.name = "e_mst_start_l2c"
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.index = 7
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.number = 15000
E_SERVER_MSG_TYPE_E_MST_L2C_GET_PLAYER_INFO_ENUM.name = "e_mst_l2c_get_player_info"
E_SERVER_MSG_TYPE_E_MST_L2C_GET_PLAYER_INFO_ENUM.index = 8
E_SERVER_MSG_TYPE_E_MST_L2C_GET_PLAYER_INFO_ENUM.number = 15001
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_START_GAME_ENUM.name = "e_mst_l2c_req_start_game"
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_START_GAME_ENUM.index = 9
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_START_GAME_ENUM.number = 15002
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_LEAVE_GAME_ENUM.name = "e_mst_l2c_req_leave_game"
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_LEAVE_GAME_ENUM.index = 10
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_LEAVE_GAME_ENUM.number = 15003
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BEGIN_PASS_ENUM.name = "e_mst_l2c_req_begin_pass"
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BEGIN_PASS_ENUM.index = 11
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BEGIN_PASS_ENUM.number = 15004
E_SERVER_MSG_TYPE_E_MST_L2C_CLAW_ENUM.name = "e_mst_l2c_claw"
E_SERVER_MSG_TYPE_E_MST_L2C_CLAW_ENUM.index = 12
E_SERVER_MSG_TYPE_E_MST_L2C_CLAW_ENUM.number = 15005
E_SERVER_MSG_TYPE_E_MST_12C_MISS_ENUM.name = "e_mst_12c_miss"
E_SERVER_MSG_TYPE_E_MST_12C_MISS_ENUM.index = 13
E_SERVER_MSG_TYPE_E_MST_12C_MISS_ENUM.number = 15006
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.name = "e_mst_clend_index"
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.index = 14
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.number = 20000
E_SERVER_MSG_TYPE.name = "e_server_msg_type"
E_SERVER_MSG_TYPE.full_name = ".game_prizeClaw_protocols.e_server_msg_type"
E_SERVER_MSG_TYPE.values = {E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GET_PLAYER_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_REQ_START_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_REQ_LEAVE_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BEGIN_PASS_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_CLAW_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_MISS_ENUM,E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GET_PLAYER_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_REQ_START_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_REQ_LEAVE_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BEGIN_PASS_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_CLAW_ENUM,E_SERVER_MSG_TYPE_E_MST_12C_MISS_ENUM,E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM}

e_mst_12c_miss = 15006
e_mst_c2l_claw = 10005
e_mst_c2l_get_player_info = 10001
e_mst_c2l_miss = 10006
e_mst_c2l_req_begin_pass = 10004
e_mst_c2l_req_leave_game = 10003
e_mst_c2l_req_start_game = 10002
e_mst_clend_index = 20000
e_mst_l2c_claw = 15005
e_mst_l2c_get_player_info = 15001
e_mst_l2c_req_begin_pass = 15004
e_mst_l2c_req_leave_game = 15003
e_mst_l2c_req_start_game = 15002
e_mst_start_c2l = 10000
e_mst_start_l2c = 15000
