-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
module('game_shuihz_def_pb')


E_SERVER_MSG_TYPE = protobuf.EnumDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_STAR_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BONUS_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_DOUBLE_GAME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_SUPPLY_CHIP_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_SETTLEMENT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GM_GET_ROOM_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GM_DO_KILL_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_GAME_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_GAME_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_STAR_GAME_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BONUS_GAME_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_DOUBLE_GAME_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_PLAYER_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_PLAYER_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_CHANGE_MONEY_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_SUPPLY_CHIP_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_SETTLEMENT_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GM_GET_ROOM_INFO_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GM_DO_KILL_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM = protobuf.EnumValueDescriptor();
MSG_PLAYER_INFO = protobuf.Descriptor();
local MSG_PLAYER_INFO_PLAYER_ID_FIELD = protobuf.FieldDescriptor();
local MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD = protobuf.FieldDescriptor();
local MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD = protobuf.FieldDescriptor();
local MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD = protobuf.FieldDescriptor();
local MSG_PLAYER_INFO_PLAYER_GOLD_FIELD = protobuf.FieldDescriptor();
local MSG_PLAYER_INFO_PLAYER_SEX_FIELD = protobuf.FieldDescriptor();
local MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD = protobuf.FieldDescriptor();

E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.name = "e_mst_start_c2l"
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.index = 0
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.number = 10000
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.name = "e_mst_c2l_check_state"
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.index = 1
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.number = 10001
E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_GAME_ENUM.name = "e_mst_c2l_enter_game"
E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_GAME_ENUM.index = 2
E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_GAME_ENUM.number = 10002
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_GAME_ENUM.name = "e_mst_c2l_leave_game"
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_GAME_ENUM.index = 3
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_GAME_ENUM.number = 10003
E_SERVER_MSG_TYPE_E_MST_C2L_STAR_GAME_ENUM.name = "e_mst_c2l_star_game"
E_SERVER_MSG_TYPE_E_MST_C2L_STAR_GAME_ENUM.index = 4
E_SERVER_MSG_TYPE_E_MST_C2L_STAR_GAME_ENUM.number = 10004
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BONUS_GAME_ENUM.name = "e_mst_c2l_req_bonus_game"
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BONUS_GAME_ENUM.index = 5
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BONUS_GAME_ENUM.number = 10005
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_DOUBLE_GAME_ENUM.name = "e_mst_c2l_req_double_game"
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_DOUBLE_GAME_ENUM.index = 6
E_SERVER_MSG_TYPE_E_MST_C2L_REQ_DOUBLE_GAME_ENUM.number = 10006
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM.name = "e_mst_c2l_get_room_info"
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM.index = 7
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM.number = 10007
E_SERVER_MSG_TYPE_E_MST_C2L_SUPPLY_CHIP_ENUM.name = "e_mst_c2l_supply_chip"
E_SERVER_MSG_TYPE_E_MST_C2L_SUPPLY_CHIP_ENUM.index = 8
E_SERVER_MSG_TYPE_E_MST_C2L_SUPPLY_CHIP_ENUM.number = 10021
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM.name = "e_mst_c2l_get_room_scene_info"
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM.index = 9
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM.number = 10022
E_SERVER_MSG_TYPE_E_MST_C2L_SETTLEMENT_ENUM.name = "e_mst_c2l_settlement"
E_SERVER_MSG_TYPE_E_MST_C2L_SETTLEMENT_ENUM.index = 10
E_SERVER_MSG_TYPE_E_MST_C2L_SETTLEMENT_ENUM.number = 10023
E_SERVER_MSG_TYPE_E_MST_C2L_GM_GET_ROOM_INFO_ENUM.name = "e_mst_c2l_gm_get_room_info"
E_SERVER_MSG_TYPE_E_MST_C2L_GM_GET_ROOM_INFO_ENUM.index = 11
E_SERVER_MSG_TYPE_E_MST_C2L_GM_GET_ROOM_INFO_ENUM.number = 10101
E_SERVER_MSG_TYPE_E_MST_C2L_GM_DO_KILL_ENUM.name = "e_mst_c2l_gm_do_kill"
E_SERVER_MSG_TYPE_E_MST_C2L_GM_DO_KILL_ENUM.index = 12
E_SERVER_MSG_TYPE_E_MST_C2L_GM_DO_KILL_ENUM.number = 10102
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.name = "e_mst_start_l2c"
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.index = 13
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.number = 15000
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.name = "e_mst_l2c_check_state_result"
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.index = 14
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.number = 15001
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_GAME_RESULT_ENUM.name = "e_mst_l2c_enter_game_result"
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_GAME_RESULT_ENUM.index = 15
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_GAME_RESULT_ENUM.number = 15002
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_GAME_RESULT_ENUM.name = "e_mst_l2c_leave_game_result"
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_GAME_RESULT_ENUM.index = 16
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_GAME_RESULT_ENUM.number = 15003
E_SERVER_MSG_TYPE_E_MST_L2C_STAR_GAME_RESULT_ENUM.name = "e_mst_l2c_star_game_result"
E_SERVER_MSG_TYPE_E_MST_L2C_STAR_GAME_RESULT_ENUM.index = 17
E_SERVER_MSG_TYPE_E_MST_L2C_STAR_GAME_RESULT_ENUM.number = 15004
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BONUS_GAME_RESULT_ENUM.name = "e_mst_l2c_req_bonus_game_result"
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BONUS_GAME_RESULT_ENUM.index = 18
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BONUS_GAME_RESULT_ENUM.number = 15005
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_DOUBLE_GAME_RESULT_ENUM.name = "e_mst_l2c_req_double_game_result"
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_DOUBLE_GAME_RESULT_ENUM.index = 19
E_SERVER_MSG_TYPE_E_MST_L2C_REQ_DOUBLE_GAME_RESULT_ENUM.number = 15006
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM.name = "e_mst_l2c_get_room_info_result"
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM.index = 20
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM.number = 15007
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_PLAYER_INFO_ENUM.name = "e_mst_l2c_enter_player_info"
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_PLAYER_INFO_ENUM.index = 21
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_PLAYER_INFO_ENUM.number = 15008
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_PLAYER_INFO_ENUM.name = "e_mst_l2c_leave_player_info"
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_PLAYER_INFO_ENUM.index = 22
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_PLAYER_INFO_ENUM.number = 15009
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_CHANGE_MONEY_ENUM.name = "e_mst_l2c_player_change_money"
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_CHANGE_MONEY_ENUM.index = 23
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_CHANGE_MONEY_ENUM.number = 15010
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM.name = "e_mst_l2c_bc_change_attr"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM.index = 24
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM.number = 15011
E_SERVER_MSG_TYPE_E_MST_L2C_SUPPLY_CHIP_RESULT_ENUM.name = "e_mst_l2c_supply_chip_result"
E_SERVER_MSG_TYPE_E_MST_L2C_SUPPLY_CHIP_RESULT_ENUM.index = 25
E_SERVER_MSG_TYPE_E_MST_L2C_SUPPLY_CHIP_RESULT_ENUM.number = 15021
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM.name = "e_mst_l2c_get_room_scene_info"
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM.index = 26
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM.number = 15022
E_SERVER_MSG_TYPE_E_MST_L2C_SETTLEMENT_RESULT_ENUM.name = "e_mst_l2c_settlement_result"
E_SERVER_MSG_TYPE_E_MST_L2C_SETTLEMENT_RESULT_ENUM.index = 27
E_SERVER_MSG_TYPE_E_MST_L2C_SETTLEMENT_RESULT_ENUM.number = 15023
E_SERVER_MSG_TYPE_E_MST_L2C_GM_GET_ROOM_INFO_RESULT_ENUM.name = "e_mst_l2c_gm_get_room_info_result"
E_SERVER_MSG_TYPE_E_MST_L2C_GM_GET_ROOM_INFO_RESULT_ENUM.index = 28
E_SERVER_MSG_TYPE_E_MST_L2C_GM_GET_ROOM_INFO_RESULT_ENUM.number = 15101
E_SERVER_MSG_TYPE_E_MST_L2C_GM_DO_KILL_RESULT_ENUM.name = "e_mst_l2c_gm_do_kill_result"
E_SERVER_MSG_TYPE_E_MST_L2C_GM_DO_KILL_RESULT_ENUM.index = 29
E_SERVER_MSG_TYPE_E_MST_L2C_GM_DO_KILL_RESULT_ENUM.number = 15102
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.name = "e_mst_clend_index"
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.index = 30
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.number = 20000
E_SERVER_MSG_TYPE.name = "e_server_msg_type"
E_SERVER_MSG_TYPE.full_name = ".game_shuihz_protocols.e_server_msg_type"
E_SERVER_MSG_TYPE.values = {E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_STAR_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_REQ_BONUS_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_REQ_DOUBLE_GAME_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_SUPPLY_CHIP_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_SCENE_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_SETTLEMENT_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GM_GET_ROOM_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GM_DO_KILL_ENUM,E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_GAME_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_GAME_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_STAR_GAME_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_REQ_BONUS_GAME_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_REQ_DOUBLE_GAME_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_PLAYER_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_PLAYER_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_CHANGE_MONEY_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_SUPPLY_CHIP_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_SCENE_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_SETTLEMENT_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GM_GET_ROOM_INFO_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GM_DO_KILL_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM}
MSG_PLAYER_INFO_PLAYER_ID_FIELD.name = "player_id"
MSG_PLAYER_INFO_PLAYER_ID_FIELD.full_name = ".game_shuihz_protocols.msg_player_info.player_id"
MSG_PLAYER_INFO_PLAYER_ID_FIELD.number = 1
MSG_PLAYER_INFO_PLAYER_ID_FIELD.index = 0
MSG_PLAYER_INFO_PLAYER_ID_FIELD.label = 1
MSG_PLAYER_INFO_PLAYER_ID_FIELD.has_default_value = false
MSG_PLAYER_INFO_PLAYER_ID_FIELD.default_value = 0
MSG_PLAYER_INFO_PLAYER_ID_FIELD.type = 5
MSG_PLAYER_INFO_PLAYER_ID_FIELD.cpp_type = 1

MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.name = "player_nickname"
MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.full_name = ".game_shuihz_protocols.msg_player_info.player_nickname"
MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.number = 2
MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.index = 1
MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.label = 1
MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.has_default_value = false
MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.default_value = ""
MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.type = 9
MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD.cpp_type = 9

MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.name = "player_head_frame"
MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.full_name = ".game_shuihz_protocols.msg_player_info.player_head_frame"
MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.number = 3
MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.index = 2
MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.label = 1
MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.has_default_value = false
MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.default_value = 0
MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.type = 5
MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD.cpp_type = 1

MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.name = "player_head_custom"
MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.full_name = ".game_shuihz_protocols.msg_player_info.player_head_custom"
MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.number = 4
MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.index = 3
MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.label = 1
MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.has_default_value = false
MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.default_value = ""
MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.type = 9
MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD.cpp_type = 9

MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.name = "player_gold"
MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.full_name = ".game_shuihz_protocols.msg_player_info.player_gold"
MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.number = 5
MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.index = 4
MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.label = 1
MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.has_default_value = false
MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.default_value = 0
MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.type = 3
MSG_PLAYER_INFO_PLAYER_GOLD_FIELD.cpp_type = 2

MSG_PLAYER_INFO_PLAYER_SEX_FIELD.name = "player_sex"
MSG_PLAYER_INFO_PLAYER_SEX_FIELD.full_name = ".game_shuihz_protocols.msg_player_info.player_sex"
MSG_PLAYER_INFO_PLAYER_SEX_FIELD.number = 6
MSG_PLAYER_INFO_PLAYER_SEX_FIELD.index = 5
MSG_PLAYER_INFO_PLAYER_SEX_FIELD.label = 1
MSG_PLAYER_INFO_PLAYER_SEX_FIELD.has_default_value = false
MSG_PLAYER_INFO_PLAYER_SEX_FIELD.default_value = 0
MSG_PLAYER_INFO_PLAYER_SEX_FIELD.type = 5
MSG_PLAYER_INFO_PLAYER_SEX_FIELD.cpp_type = 1

MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.name = "player_vip_lv"
MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.full_name = ".game_shuihz_protocols.msg_player_info.player_vip_lv"
MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.number = 7
MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.index = 6
MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.label = 1
MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.has_default_value = false
MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.default_value = 0
MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.type = 5
MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD.cpp_type = 1

MSG_PLAYER_INFO.name = "msg_player_info"
MSG_PLAYER_INFO.full_name = ".game_shuihz_protocols.msg_player_info"
MSG_PLAYER_INFO.nested_types = {}
MSG_PLAYER_INFO.enum_types = {}
MSG_PLAYER_INFO.fields = {MSG_PLAYER_INFO_PLAYER_ID_FIELD, MSG_PLAYER_INFO_PLAYER_NICKNAME_FIELD, MSG_PLAYER_INFO_PLAYER_HEAD_FRAME_FIELD, MSG_PLAYER_INFO_PLAYER_HEAD_CUSTOM_FIELD, MSG_PLAYER_INFO_PLAYER_GOLD_FIELD, MSG_PLAYER_INFO_PLAYER_SEX_FIELD, MSG_PLAYER_INFO_PLAYER_VIP_LV_FIELD}
MSG_PLAYER_INFO.is_extendable = false
MSG_PLAYER_INFO.extensions = {}

e_mst_c2l_check_state = 10001
e_mst_c2l_enter_game = 10002
e_mst_c2l_get_room_info = 10007
e_mst_c2l_get_room_scene_info = 10022
e_mst_c2l_gm_do_kill = 10102
e_mst_c2l_gm_get_room_info = 10101
e_mst_c2l_leave_game = 10003
e_mst_c2l_req_bonus_game = 10005
e_mst_c2l_req_double_game = 10006
e_mst_c2l_settlement = 10023
e_mst_c2l_star_game = 10004
e_mst_c2l_supply_chip = 10021
e_mst_clend_index = 20000
e_mst_l2c_bc_change_attr = 15011
e_mst_l2c_check_state_result = 15001
e_mst_l2c_enter_game_result = 15002
e_mst_l2c_enter_player_info = 15008
e_mst_l2c_get_room_info_result = 15007
e_mst_l2c_get_room_scene_info = 15022
e_mst_l2c_gm_do_kill_result = 15102
e_mst_l2c_gm_get_room_info_result = 15101
e_mst_l2c_leave_game_result = 15003
e_mst_l2c_leave_player_info = 15009
e_mst_l2c_player_change_money = 15010
e_mst_l2c_req_bonus_game_result = 15005
e_mst_l2c_req_double_game_result = 15006
e_mst_l2c_settlement_result = 15023
e_mst_l2c_star_game_result = 15004
e_mst_l2c_supply_chip_result = 15021
e_mst_start_c2l = 10000
e_mst_start_l2c = 15000
msg_player_info = protobuf.Message(MSG_PLAYER_INFO)

