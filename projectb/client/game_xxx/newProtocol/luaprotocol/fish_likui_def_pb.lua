-- Generated By protoc-gen-lua Do not Edit
local protobuf = require "protobuf"
module('fish_likui_def_pb')


E_SERVER_MSG_TYPE = protobuf.EnumDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_TABLE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_TABLE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_ENTER_TABLE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GET_SCENE_INFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_SEAT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_RATE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_MANUAL_FIRE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISH_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_BUY_ITEM_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_USE_ITEM_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_GET_SHOPLIST_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISHS_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_LOCK_FISH_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_PLAYER_LEVELUP_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_USETICK_LEVELUP_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_TABLE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_STATE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_USE_TURRET_POWER_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_TURRET_ROTATE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_MISSILE_FIRE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_SYNC_GOLD_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_TABLE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_TABLE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_ENTER_TABLE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GET_SCENE_INFO_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_SEAT_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_LEVELUP_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_USETICK_LEVELUP_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_TABLE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_STATE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_USE_TURRET_POWER_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GIVE_ITEM_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_AUTO_LEVELUP_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_RATE_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_MANUAL_FIRE_FAIL_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_ENTER_SEAT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_LEAVE_SEAT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_RATE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_FISH_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_MANUAL_FIRE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISH_DIE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_GENERATOR_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BUY_ITEM_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_USE_ITEM_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_GET_SHOPLIST_RESULT_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_ADDBUFF_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_REMOVEBUFF_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGETURRET_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_LOCK_FISH_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FREEZE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISHS_DIE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SPECIALFISH_DIE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_BG_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SCENE_TIME_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_HIT_FISHS_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_TURRET_ROTATE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_MAX_POWER_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_MISSILE_FIRE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_C2L_ROBOT_ENTER_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_L2C_ROBOT_LEAVE_ENUM = protobuf.EnumValueDescriptor();
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM = protobuf.EnumValueDescriptor();

E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.name = "e_mst_start_c2l"
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.index = 0
E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM.number = 10000
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM.name = "e_mst_c2l_get_room_info"
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM.index = 1
E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM.number = 10001
E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_TABLE_ENUM.name = "e_mst_c2l_enter_table"
E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_TABLE_ENUM.index = 2
E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_TABLE_ENUM.number = 10002
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_TABLE_ENUM.name = "e_mst_c2l_leave_table"
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_TABLE_ENUM.index = 3
E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_TABLE_ENUM.number = 10003
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.name = "e_mst_c2l_check_state"
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.index = 4
E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM.number = 10004
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_ENTER_TABLE_ENUM.name = "e_mst_c2l_try_enter_table"
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_ENTER_TABLE_ENUM.index = 5
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_ENTER_TABLE_ENUM.number = 10005
E_SERVER_MSG_TYPE_E_MST_C2L_GET_SCENE_INFO_ENUM.name = "e_mst_c2l_get_scene_info"
E_SERVER_MSG_TYPE_E_MST_C2L_GET_SCENE_INFO_ENUM.index = 6
E_SERVER_MSG_TYPE_E_MST_C2L_GET_SCENE_INFO_ENUM.number = 10100
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_SEAT_ENUM.name = "e_mst_c2l_change_seat"
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_SEAT_ENUM.index = 7
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_SEAT_ENUM.number = 10101
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_RATE_ENUM.name = "e_mst_c2l_change_rate"
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_RATE_ENUM.index = 8
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_RATE_ENUM.number = 10102
E_SERVER_MSG_TYPE_E_MST_C2L_MANUAL_FIRE_ENUM.name = "e_mst_c2l_manual_fire"
E_SERVER_MSG_TYPE_E_MST_C2L_MANUAL_FIRE_ENUM.index = 9
E_SERVER_MSG_TYPE_E_MST_C2L_MANUAL_FIRE_ENUM.number = 10103
E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISH_ENUM.name = "e_mst_c2l_hit_fish"
E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISH_ENUM.index = 10
E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISH_ENUM.number = 10104
E_SERVER_MSG_TYPE_E_MST_C2L_BUY_ITEM_ENUM.name = "e_mst_c2l_buy_item"
E_SERVER_MSG_TYPE_E_MST_C2L_BUY_ITEM_ENUM.index = 11
E_SERVER_MSG_TYPE_E_MST_C2L_BUY_ITEM_ENUM.number = 10105
E_SERVER_MSG_TYPE_E_MST_C2L_USE_ITEM_ENUM.name = "e_mst_c2l_use_item"
E_SERVER_MSG_TYPE_E_MST_C2L_USE_ITEM_ENUM.index = 12
E_SERVER_MSG_TYPE_E_MST_C2L_USE_ITEM_ENUM.number = 10106
E_SERVER_MSG_TYPE_E_MST_C2L_GET_SHOPLIST_ENUM.name = "e_mst_c2l_get_shoplist"
E_SERVER_MSG_TYPE_E_MST_C2L_GET_SHOPLIST_ENUM.index = 13
E_SERVER_MSG_TYPE_E_MST_C2L_GET_SHOPLIST_ENUM.number = 10107
E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISHS_ENUM.name = "e_mst_c2l_hit_fishs"
E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISHS_ENUM.index = 14
E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISHS_ENUM.number = 10108
E_SERVER_MSG_TYPE_E_MST_C2L_LOCK_FISH_ENUM.name = "e_mst_c2l_lock_fish"
E_SERVER_MSG_TYPE_E_MST_C2L_LOCK_FISH_ENUM.index = 15
E_SERVER_MSG_TYPE_E_MST_C2L_LOCK_FISH_ENUM.number = 10109
E_SERVER_MSG_TYPE_E_MST_C2L_PLAYER_LEVELUP_ENUM.name = "e_mst_c2l_player_levelup"
E_SERVER_MSG_TYPE_E_MST_C2L_PLAYER_LEVELUP_ENUM.index = 16
E_SERVER_MSG_TYPE_E_MST_C2L_PLAYER_LEVELUP_ENUM.number = 10110
E_SERVER_MSG_TYPE_E_MST_C2L_USETICK_LEVELUP_ENUM.name = "e_mst_c2l_usetick_levelup"
E_SERVER_MSG_TYPE_E_MST_C2L_USETICK_LEVELUP_ENUM.index = 17
E_SERVER_MSG_TYPE_E_MST_C2L_USETICK_LEVELUP_ENUM.number = 10111
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_TABLE_ENUM.name = "e_mst_c2l_change_table"
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_TABLE_ENUM.index = 18
E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_TABLE_ENUM.number = 10112
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_ENUM.name = "e_mst_c2l_try_turret"
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_ENUM.index = 19
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_ENUM.number = 10113
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_STATE_ENUM.name = "e_mst_c2l_try_turret_state"
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_STATE_ENUM.index = 20
E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_STATE_ENUM.number = 10114
E_SERVER_MSG_TYPE_E_MST_C2L_USE_TURRET_POWER_ENUM.name = "e_mst_c2l_use_turret_power"
E_SERVER_MSG_TYPE_E_MST_C2L_USE_TURRET_POWER_ENUM.index = 21
E_SERVER_MSG_TYPE_E_MST_C2L_USE_TURRET_POWER_ENUM.number = 10115
E_SERVER_MSG_TYPE_E_MST_C2L_TURRET_ROTATE_ENUM.name = "e_mst_c2l_turret_rotate"
E_SERVER_MSG_TYPE_E_MST_C2L_TURRET_ROTATE_ENUM.index = 22
E_SERVER_MSG_TYPE_E_MST_C2L_TURRET_ROTATE_ENUM.number = 10116
E_SERVER_MSG_TYPE_E_MST_C2L_MISSILE_FIRE_ENUM.name = "e_mst_c2l_missile_fire"
E_SERVER_MSG_TYPE_E_MST_C2L_MISSILE_FIRE_ENUM.index = 23
E_SERVER_MSG_TYPE_E_MST_C2L_MISSILE_FIRE_ENUM.number = 10117
E_SERVER_MSG_TYPE_E_MST_C2L_SYNC_GOLD_ENUM.name = "e_mst_c2l_sync_gold"
E_SERVER_MSG_TYPE_E_MST_C2L_SYNC_GOLD_ENUM.index = 24
E_SERVER_MSG_TYPE_E_MST_C2L_SYNC_GOLD_ENUM.number = 10118
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.name = "e_mst_start_l2c"
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.index = 25
E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM.number = 15000
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM.name = "e_mst_l2c_get_room_info_result"
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM.index = 26
E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM.number = 15001
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_TABLE_RESULT_ENUM.name = "e_mst_l2c_enter_table_result"
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_TABLE_RESULT_ENUM.index = 27
E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_TABLE_RESULT_ENUM.number = 15002
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_TABLE_RESULT_ENUM.name = "e_mst_l2c_leave_table_result"
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_TABLE_RESULT_ENUM.index = 28
E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_TABLE_RESULT_ENUM.number = 15003
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.name = "e_mst_l2c_check_state_result"
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.index = 29
E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM.number = 15004
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_ENTER_TABLE_RESULT_ENUM.name = "e_mst_l2c_try_enter_table_result"
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_ENTER_TABLE_RESULT_ENUM.index = 30
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_ENTER_TABLE_RESULT_ENUM.number = 15005
E_SERVER_MSG_TYPE_E_MST_L2C_GET_SCENE_INFO_RESULT_ENUM.name = "e_mst_l2c_get_scene_info_result"
E_SERVER_MSG_TYPE_E_MST_L2C_GET_SCENE_INFO_RESULT_ENUM.index = 31
E_SERVER_MSG_TYPE_E_MST_L2C_GET_SCENE_INFO_RESULT_ENUM.number = 15100
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_SEAT_RESULT_ENUM.name = "e_mst_l2c_change_seat_result"
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_SEAT_RESULT_ENUM.index = 32
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_SEAT_RESULT_ENUM.number = 15101
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_LEVELUP_RESULT_ENUM.name = "e_mst_l2c_player_levelup_result"
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_LEVELUP_RESULT_ENUM.index = 33
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_LEVELUP_RESULT_ENUM.number = 15102
E_SERVER_MSG_TYPE_E_MST_L2C_USETICK_LEVELUP_RESULT_ENUM.name = "e_mst_l2c_usetick_levelup_result"
E_SERVER_MSG_TYPE_E_MST_L2C_USETICK_LEVELUP_RESULT_ENUM.index = 34
E_SERVER_MSG_TYPE_E_MST_L2C_USETICK_LEVELUP_RESULT_ENUM.number = 15103
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_TABLE_RESULT_ENUM.name = "e_mst_l2c_change_table_result"
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_TABLE_RESULT_ENUM.index = 35
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_TABLE_RESULT_ENUM.number = 15104
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_RESULT_ENUM.name = "e_mst_l2c_try_turret_result"
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_RESULT_ENUM.index = 36
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_RESULT_ENUM.number = 15105
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_STATE_RESULT_ENUM.name = "e_mst_l2c_try_turret_state_result"
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_STATE_RESULT_ENUM.index = 37
E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_STATE_RESULT_ENUM.number = 15106
E_SERVER_MSG_TYPE_E_MST_L2C_USE_TURRET_POWER_RESULT_ENUM.name = "e_mst_l2c_use_turret_power_result"
E_SERVER_MSG_TYPE_E_MST_L2C_USE_TURRET_POWER_RESULT_ENUM.index = 38
E_SERVER_MSG_TYPE_E_MST_L2C_USE_TURRET_POWER_RESULT_ENUM.number = 15107
E_SERVER_MSG_TYPE_E_MST_L2C_GIVE_ITEM_RESULT_ENUM.name = "e_mst_l2c_give_item_result"
E_SERVER_MSG_TYPE_E_MST_L2C_GIVE_ITEM_RESULT_ENUM.index = 39
E_SERVER_MSG_TYPE_E_MST_L2C_GIVE_ITEM_RESULT_ENUM.number = 15108
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_AUTO_LEVELUP_ENUM.name = "e_mst_l2c_player_auto_levelup"
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_AUTO_LEVELUP_ENUM.index = 40
E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_AUTO_LEVELUP_ENUM.number = 15109
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_RATE_RESULT_ENUM.name = "e_mst_l2c_change_rate_result"
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_RATE_RESULT_ENUM.index = 41
E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_RATE_RESULT_ENUM.number = 15110
E_SERVER_MSG_TYPE_E_MST_L2C_MANUAL_FIRE_FAIL_ENUM.name = "e_mst_l2c_manual_fire_fail"
E_SERVER_MSG_TYPE_E_MST_L2C_MANUAL_FIRE_FAIL_ENUM.index = 42
E_SERVER_MSG_TYPE_E_MST_L2C_MANUAL_FIRE_FAIL_ENUM.number = 15111
E_SERVER_MSG_TYPE_E_MST_L2C_BC_ENTER_SEAT_ENUM.name = "e_mst_l2c_bc_enter_seat"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_ENTER_SEAT_ENUM.index = 43
E_SERVER_MSG_TYPE_E_MST_L2C_BC_ENTER_SEAT_ENUM.number = 15201
E_SERVER_MSG_TYPE_E_MST_L2C_BC_LEAVE_SEAT_ENUM.name = "e_mst_l2c_bc_leave_seat"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_LEAVE_SEAT_ENUM.index = 44
E_SERVER_MSG_TYPE_E_MST_L2C_BC_LEAVE_SEAT_ENUM.number = 15202
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_RATE_ENUM.name = "e_mst_l2c_bc_change_rate"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_RATE_ENUM.index = 45
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_RATE_ENUM.number = 15203
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_FISH_ENUM.name = "e_mst_l2c_bc_create_fish"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_FISH_ENUM.index = 46
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_FISH_ENUM.number = 15204
E_SERVER_MSG_TYPE_E_MST_L2C_BC_MANUAL_FIRE_ENUM.name = "e_mst_l2c_bc_manual_fire"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_MANUAL_FIRE_ENUM.index = 47
E_SERVER_MSG_TYPE_E_MST_L2C_BC_MANUAL_FIRE_ENUM.number = 15205
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISH_DIE_ENUM.name = "e_mst_l2c_bc_fish_die"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISH_DIE_ENUM.index = 48
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISH_DIE_ENUM.number = 15206
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM.name = "e_mst_l2c_bc_change_attr"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM.index = 49
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM.number = 15207
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_GENERATOR_ENUM.name = "e_mst_l2c_bc_create_generator"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_GENERATOR_ENUM.index = 50
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_GENERATOR_ENUM.number = 15208
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_ENUM.name = "e_mst_l2c_bc_change_scene"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_ENUM.index = 51
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_ENUM.number = 15209
E_SERVER_MSG_TYPE_E_MST_L2C_BUY_ITEM_RESULT_ENUM.name = "e_mst_l2c_buy_item_result"
E_SERVER_MSG_TYPE_E_MST_L2C_BUY_ITEM_RESULT_ENUM.index = 52
E_SERVER_MSG_TYPE_E_MST_L2C_BUY_ITEM_RESULT_ENUM.number = 15210
E_SERVER_MSG_TYPE_E_MST_L2C_USE_ITEM_RESULT_ENUM.name = "e_mst_l2c_use_item_result"
E_SERVER_MSG_TYPE_E_MST_L2C_USE_ITEM_RESULT_ENUM.index = 53
E_SERVER_MSG_TYPE_E_MST_L2C_USE_ITEM_RESULT_ENUM.number = 15211
E_SERVER_MSG_TYPE_E_MST_L2C_GET_SHOPLIST_RESULT_ENUM.name = "e_mst_l2c_get_shoplist_result"
E_SERVER_MSG_TYPE_E_MST_L2C_GET_SHOPLIST_RESULT_ENUM.index = 54
E_SERVER_MSG_TYPE_E_MST_L2C_GET_SHOPLIST_RESULT_ENUM.number = 15212
E_SERVER_MSG_TYPE_E_MST_L2C_BC_ADDBUFF_ENUM.name = "e_mst_l2c_bc_addbuff"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_ADDBUFF_ENUM.index = 55
E_SERVER_MSG_TYPE_E_MST_L2C_BC_ADDBUFF_ENUM.number = 15213
E_SERVER_MSG_TYPE_E_MST_L2C_BC_REMOVEBUFF_ENUM.name = "e_mst_l2c_bc_removebuff"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_REMOVEBUFF_ENUM.index = 56
E_SERVER_MSG_TYPE_E_MST_L2C_BC_REMOVEBUFF_ENUM.number = 15214
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGETURRET_ENUM.name = "e_mst_l2c_bc_changeturret"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGETURRET_ENUM.index = 57
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGETURRET_ENUM.number = 15215
E_SERVER_MSG_TYPE_E_MST_L2C_BC_LOCK_FISH_ENUM.name = "e_mst_l2c_bc_lock_fish"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_LOCK_FISH_ENUM.index = 58
E_SERVER_MSG_TYPE_E_MST_L2C_BC_LOCK_FISH_ENUM.number = 15216
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FREEZE_ENUM.name = "e_mst_l2c_bc_freeze"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FREEZE_ENUM.index = 59
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FREEZE_ENUM.number = 15217
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISHS_DIE_ENUM.name = "e_mst_l2c_bc_fishs_die"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISHS_DIE_ENUM.index = 60
E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISHS_DIE_ENUM.number = 15218
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SPECIALFISH_DIE_ENUM.name = "e_mst_l2c_bc_specialfish_die"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SPECIALFISH_DIE_ENUM.index = 61
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SPECIALFISH_DIE_ENUM.number = 15219
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_BG_ENUM.name = "e_mst_l2c_bc_change_scene_bg"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_BG_ENUM.index = 62
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_BG_ENUM.number = 15220
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SCENE_TIME_ENUM.name = "e_mst_l2c_bc_scene_time"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SCENE_TIME_ENUM.index = 63
E_SERVER_MSG_TYPE_E_MST_L2C_BC_SCENE_TIME_ENUM.number = 15221
E_SERVER_MSG_TYPE_E_MST_L2C_BC_HIT_FISHS_ENUM.name = "e_mst_l2c_bc_hit_fishs"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_HIT_FISHS_ENUM.index = 64
E_SERVER_MSG_TYPE_E_MST_L2C_BC_HIT_FISHS_ENUM.number = 15223
E_SERVER_MSG_TYPE_E_MST_L2C_BC_TURRET_ROTATE_ENUM.name = "e_mst_l2c_bc_turret_rotate"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_TURRET_ROTATE_ENUM.index = 65
E_SERVER_MSG_TYPE_E_MST_L2C_BC_TURRET_ROTATE_ENUM.number = 15224
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_MAX_POWER_ENUM.name = "e_mst_l2c_bc_change_max_power"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_MAX_POWER_ENUM.index = 66
E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_MAX_POWER_ENUM.number = 15225
E_SERVER_MSG_TYPE_E_MST_L2C_BC_MISSILE_FIRE_ENUM.name = "e_mst_l2c_bc_missile_fire"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_MISSILE_FIRE_ENUM.index = 67
E_SERVER_MSG_TYPE_E_MST_L2C_BC_MISSILE_FIRE_ENUM.number = 15226
E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM.name = "e_mst_l2c_bc_debuginfo"
E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM.index = 68
E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM.number = 15227
E_SERVER_MSG_TYPE_E_MST_C2L_ROBOT_ENTER_ENUM.name = "e_mst_c2l_robot_enter"
E_SERVER_MSG_TYPE_E_MST_C2L_ROBOT_ENTER_ENUM.index = 69
E_SERVER_MSG_TYPE_E_MST_C2L_ROBOT_ENTER_ENUM.number = 16000
E_SERVER_MSG_TYPE_E_MST_L2C_ROBOT_LEAVE_ENUM.name = "e_mst_l2c_robot_leave"
E_SERVER_MSG_TYPE_E_MST_L2C_ROBOT_LEAVE_ENUM.index = 70
E_SERVER_MSG_TYPE_E_MST_L2C_ROBOT_LEAVE_ENUM.number = 16100
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.name = "e_mst_clend_index"
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.index = 71
E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM.number = 20000
E_SERVER_MSG_TYPE.name = "e_server_msg_type"
E_SERVER_MSG_TYPE.full_name = ".fish_protocols.e_server_msg_type"
E_SERVER_MSG_TYPE.values = {E_SERVER_MSG_TYPE_E_MST_START_C2L_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GET_ROOM_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_ENTER_TABLE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_LEAVE_TABLE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_CHECK_STATE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_TRY_ENTER_TABLE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GET_SCENE_INFO_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_SEAT_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_RATE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_MANUAL_FIRE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISH_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_BUY_ITEM_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_USE_ITEM_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_GET_SHOPLIST_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_HIT_FISHS_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_LOCK_FISH_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_PLAYER_LEVELUP_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_USETICK_LEVELUP_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_CHANGE_TABLE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_TRY_TURRET_STATE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_USE_TURRET_POWER_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_TURRET_ROTATE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_MISSILE_FIRE_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_SYNC_GOLD_ENUM,E_SERVER_MSG_TYPE_E_MST_START_L2C_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GET_ROOM_INFO_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_ENTER_TABLE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_LEAVE_TABLE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_CHECK_STATE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_TRY_ENTER_TABLE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GET_SCENE_INFO_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_SEAT_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_LEVELUP_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_USETICK_LEVELUP_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_TABLE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_TRY_TURRET_STATE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_USE_TURRET_POWER_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GIVE_ITEM_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_PLAYER_AUTO_LEVELUP_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_CHANGE_RATE_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_MANUAL_FIRE_FAIL_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_ENTER_SEAT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_LEAVE_SEAT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_RATE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_FISH_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_MANUAL_FIRE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISH_DIE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_ATTR_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CREATE_GENERATOR_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BUY_ITEM_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_USE_ITEM_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_GET_SHOPLIST_RESULT_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_ADDBUFF_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_REMOVEBUFF_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGETURRET_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_LOCK_FISH_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_FREEZE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_FISHS_DIE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_SPECIALFISH_DIE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_SCENE_BG_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_SCENE_TIME_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_HIT_FISHS_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_TURRET_ROTATE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_CHANGE_MAX_POWER_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_MISSILE_FIRE_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_BC_DEBUGINFO_ENUM,E_SERVER_MSG_TYPE_E_MST_C2L_ROBOT_ENTER_ENUM,E_SERVER_MSG_TYPE_E_MST_L2C_ROBOT_LEAVE_ENUM,E_SERVER_MSG_TYPE_E_MST_CLEND_INDEX_ENUM}

e_mst_c2l_buy_item = 10105
e_mst_c2l_change_rate = 10102
e_mst_c2l_change_seat = 10101
e_mst_c2l_change_table = 10112
e_mst_c2l_check_state = 10004
e_mst_c2l_enter_table = 10002
e_mst_c2l_get_room_info = 10001
e_mst_c2l_get_scene_info = 10100
e_mst_c2l_get_shoplist = 10107
e_mst_c2l_hit_fish = 10104
e_mst_c2l_hit_fishs = 10108
e_mst_c2l_leave_table = 10003
e_mst_c2l_lock_fish = 10109
e_mst_c2l_manual_fire = 10103
e_mst_c2l_missile_fire = 10117
e_mst_c2l_player_levelup = 10110
e_mst_c2l_robot_enter = 16000
e_mst_c2l_sync_gold = 10118
e_mst_c2l_try_enter_table = 10005
e_mst_c2l_try_turret = 10113
e_mst_c2l_try_turret_state = 10114
e_mst_c2l_turret_rotate = 10116
e_mst_c2l_use_item = 10106
e_mst_c2l_use_turret_power = 10115
e_mst_c2l_usetick_levelup = 10111
e_mst_clend_index = 20000
e_mst_l2c_bc_addbuff = 15213
e_mst_l2c_bc_change_attr = 15207
e_mst_l2c_bc_change_max_power = 15225
e_mst_l2c_bc_change_rate = 15203
e_mst_l2c_bc_change_scene = 15209
e_mst_l2c_bc_change_scene_bg = 15220
e_mst_l2c_bc_changeturret = 15215
e_mst_l2c_bc_create_fish = 15204
e_mst_l2c_bc_create_generator = 15208
e_mst_l2c_bc_debuginfo = 15227
e_mst_l2c_bc_enter_seat = 15201
e_mst_l2c_bc_fish_die = 15206
e_mst_l2c_bc_fishs_die = 15218
e_mst_l2c_bc_freeze = 15217
e_mst_l2c_bc_hit_fishs = 15223
e_mst_l2c_bc_leave_seat = 15202
e_mst_l2c_bc_lock_fish = 15216
e_mst_l2c_bc_manual_fire = 15205
e_mst_l2c_bc_missile_fire = 15226
e_mst_l2c_bc_removebuff = 15214
e_mst_l2c_bc_scene_time = 15221
e_mst_l2c_bc_specialfish_die = 15219
e_mst_l2c_bc_turret_rotate = 15224
e_mst_l2c_buy_item_result = 15210
e_mst_l2c_change_rate_result = 15110
e_mst_l2c_change_seat_result = 15101
e_mst_l2c_change_table_result = 15104
e_mst_l2c_check_state_result = 15004
e_mst_l2c_enter_table_result = 15002
e_mst_l2c_get_room_info_result = 15001
e_mst_l2c_get_scene_info_result = 15100
e_mst_l2c_get_shoplist_result = 15212
e_mst_l2c_give_item_result = 15108
e_mst_l2c_leave_table_result = 15003
e_mst_l2c_manual_fire_fail = 15111
e_mst_l2c_player_auto_levelup = 15109
e_mst_l2c_player_levelup_result = 15102
e_mst_l2c_robot_leave = 16100
e_mst_l2c_try_enter_table_result = 15005
e_mst_l2c_try_turret_result = 15105
e_mst_l2c_try_turret_state_result = 15106
e_mst_l2c_use_item_result = 15211
e_mst_l2c_use_turret_power_result = 15107
e_mst_l2c_usetick_levelup_result = 15103
e_mst_start_c2l = 10000
e_mst_start_l2c = 15000

