-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
module('game_forestball_def_pb')


E_SERVER_MSG_TYPE = protobuf.EnumDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_ROOM_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_ADD_BET_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_REPEAT_BET_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GAME_CONTROL_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_ROOM_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_ADD_BET_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_REPEAT_BET_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_BET_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SYNC_BETS_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_AWARD_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_NOTICE_GM_ALL_BET_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GAME_CONTROL_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_ATTENTION_NEEDLEAVE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM = protobuf.EnumValueDescriptor();
E_GAME_STATE = protobuf.EnumDescriptor();
E_GAME_STATE_E_STATE_GAME_BEGIN_ENUM = protobuf.EnumValueDescriptor();
E_GAME_STATE_E_STATE_GAME_BET_ENUM = protobuf.EnumValueDescriptor();
E_GAME_STATE_E_STATE_GAME_AWARD_ENUM = protobuf.EnumValueDescriptor();

E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.name = "e_mst_start_c2l"
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.index = 0
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.number = 10000
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_ROOM_ENUM.name = "e_mst_c2l_leave_room"
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_ROOM_ENUM.index = 1
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_ROOM_ENUM.number = 10002
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM.name = "e_mst_c2l_get_room_scene_info"
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM.index = 2
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM.number = 10003
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.name = "e_mst_c2l_check_state"
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.index = 3
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.number = 10004
E_SERVER_MSG_TYPE_E_MST_C2L_ADD_BET_ENUM.name = "e_mst_c2l_add_bet"
E_SERVER_MSG_TYPE_E_MST_C2L_ADD_BET_ENUM.index = 4
E_SERVER_MSG_TYPE_E_MST_C2L_ADD_BET_ENUM.number = 10005
E_SERVER_MSG_TYPE_E_MST_C2L_REPEAT_BET_ENUM.name = "e_mst_c2l_repeat_bet"
E_SERVER_MSG_TYPE_E_MST_C2L_REPEAT_BET_ENUM.index = 5
E_SERVER_MSG_TYPE_E_MST_C2L_REPEAT_BET_ENUM.number = 10006
E_SERVER_MSG_TYPE_E_MST_C2L_GAME_CONTROL_ENUM.name = "e_mst_c2l_game_control"
E_SERVER_MSG_TYPE_E_MST_C2L_GAME_CONTROL_ENUM.index = 6
E_SERVER_MSG_TYPE_E_MST_C2L_GAME_CONTROL_ENUM.number = 10022
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.name = "e_mst_start_l2c"
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.index = 7
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.number = 15000
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_ROOM_RESULT_ENUM.name = "e_mst_l2c_leave_room_result"
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_ROOM_RESULT_ENUM.index = 8
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_ROOM_RESULT_ENUM.number = 15002
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM.name = "e_mst_l2c_get_room_scene_info"
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM.index = 9
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM.number = 15003
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.name = "e_mst_l2c_check_state_result"
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.index = 10
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.number = 15004
E_SERVER_MSG_TYPE_E_MST_L2C_ADD_BET_ENUM.name = "e_mst_l2c_add_bet"
E_SERVER_MSG_TYPE_E_MST_L2C_ADD_BET_ENUM.index = 11
E_SERVER_MSG_TYPE_E_MST_L2C_ADD_BET_ENUM.number = 15005
E_SERVER_MSG_TYPE_E_MST_L2C_REPEAT_BET_ENUM.name = "e_mst_l2c_repeat_bet"
E_SERVER_MSG_TYPE_E_MST_L2C_REPEAT_BET_ENUM.index = 12
E_SERVER_MSG_TYPE_E_MST_L2C_REPEAT_BET_ENUM.number = 15006
E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_BET_ENUM.name = "e_mst_l2c_bc_begin_bet"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_BET_ENUM.index = 13
E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_BET_ENUM.number = 15011
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SYNC_BETS_ENUM.name = "e_mst_l2c_bc_sync_bets"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SYNC_BETS_ENUM.index = 14
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SYNC_BETS_ENUM.number = 15012
E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_AWARD_ENUM.name = "e_mst_l2c_bc_begin_award"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_AWARD_ENUM.index = 15
E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_AWARD_ENUM.number = 15013
E_SERVER_MSG_TYPE_E_MST_L2C_NOTICE_GM_ALL_BET_INFO_ENUM.name = "e_mst_l2c_notice_gm_all_bet_info"
E_SERVER_MSG_TYPE_E_MST_L2C_NOTICE_GM_ALL_BET_INFO_ENUM.index = 16
E_SERVER_MSG_TYPE_E_MST_L2C_NOTICE_GM_ALL_BET_INFO_ENUM.number = 15021
E_SERVER_MSG_TYPE_E_MST_L2C_GAME_CONTROL_ENUM.name = "e_mst_l2c_game_control"
E_SERVER_MSG_TYPE_E_MST_L2C_GAME_CONTROL_ENUM.index = 17
E_SERVER_MSG_TYPE_E_MST_L2C_GAME_CONTROL_ENUM.number = 15022
E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM.name = "e_mst_l2c_bc_debuginfo"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM.index = 18
E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM.number = 15023
E_SERVER_MSG_TYPE_E_MST_ATTENTION_NEEDLEAVE_ENUM.name = "e_mst_attention_needLeave"
E_SERVER_MSG_TYPE_E_MST_ATTENTION_NEEDLEAVE_ENUM.index = 19
E_SERVER_MSG_TYPE_E_MST_ATTENTION_NEEDLEAVE_ENUM.number = 15029
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.name = "e_mst_clend_index"
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.index = 20
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.number = 20000
E_SERVER_MSG_TYPE.name = "e_server_msg_type"
E_SERVER_MSG_TYPE.full_name = ".game_forestball_protocols.e_server_msg_type"
E_SERVER_MSG_TYPE.values = {E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_ROOM_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_ADD_BET_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_REPEAT_BET_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GAME_CONTROL_ENUM,E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_ROOM_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_ADD_BET_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_REPEAT_BET_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_BET_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_SYNC_BETS_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_BEGIN_AWARD_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_NOTICE_GM_ALL_BET_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GAME_CONTROL_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM,E_SERVER_MSG_TYPE_E_MST_ATTENTION_NEEDLEAVE_ENUM,E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM}
E_GAME_STATE_E_STATE_GAME_BEGIN_ENUM.name = "e_state_game_begin"
E_GAME_STATE_E_STATE_GAME_BEGIN_ENUM.index = 0
E_GAME_STATE_E_STATE_GAME_BEGIN_ENUM.number = 0
E_GAME_STATE_E_STATE_GAME_BET_ENUM.name = "e_state_game_bet"
E_GAME_STATE_E_STATE_GAME_BET_ENUM.index = 1
E_GAME_STATE_E_STATE_GAME_BET_ENUM.number = 1
E_GAME_STATE_E_STATE_GAME_AWARD_ENUM.name = "e_state_game_award"
E_GAME_STATE_E_STATE_GAME_AWARD_ENUM.index = 2
E_GAME_STATE_E_STATE_GAME_AWARD_ENUM.number = 2
E_GAME_STATE.name = "e_game_state"
E_GAME_STATE.full_name = ".game_forestball_protocols.e_game_state"
E_GAME_STATE.values = {E_GAME_STATE_E_STATE_GAME_BEGIN_ENUM,E_GAME_STATE_E_STATE_GAME_BET_ENUM,E_GAME_STATE_E_STATE_GAME_AWARD_ENUM}

e_mst_attention_needLeave = 15029
e_mst_c2l_add_bet = 10005
e_mst_c2l_check_state = 10004
e_mst_c2l_game_control = 10022
e_mst_c2l_get_room_scene_info = 10003
e_mst_c2l_leave_room = 10002
e_mst_c2l_repeat_bet = 10006
e_mst_clend_index = 20000
e_mst_l2c_add_bet = 15005
e_mst_l2c_bc_begin_award = 15013
e_mst_l2c_bc_begin_bet = 15011
e_mst_l2c_bc_debuginfo = 15023
e_mst_l2c_bc_sync_bets = 15012
e_mst_l2c_check_state_result = 15004
e_mst_l2c_game_control = 15022
e_mst_l2c_get_room_scene_info = 15003
e_mst_l2c_leave_room_result = 15002
e_mst_l2c_notice_gm_all_bet_info = 15021
e_mst_l2c_repeat_bet = 15006
e_mst_start_c2l = 10000
e_mst_start_l2c = 15000
e_state_game_award = 2
e_state_game_begin = 0
e_state_game_bet = 1

