// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: fish_crazy_def.proto

#ifndef PROTOBUF_fish_5fcrazy_5fdef_2eproto__INCLUDED
#define PROTOBUF_fish_5fcrazy_5fdef_2eproto__INCLUDED

#include <string>

#include <google/protobuf/stubs/common.h>

#if GOOGLE_PROTOBUF_VERSION < 2005000
#error This file was generated by a newer version of protoc which is
#error incompatible with your Protocol Buffer headers.  Please update
#error your headers.
#endif
#if 2005000 < GOOGLE_PROTOBUF_MIN_PROTOC_VERSION
#error This file was generated by an older version of protoc which is
#error incompatible with your Protocol Buffer headers.  Please
#error regenerate this file with a newer version of protoc.
#endif

#include <google/protobuf/generated_message_util.h>
#include <google/protobuf/repeated_field.h>
#include <google/protobuf/extension_set.h>
#include <google/protobuf/generated_enum_reflection.h>
// @@protoc_insertion_point(includes)

namespace fish_protocols {

// Internal implementation detail -- do not call these.
void  protobuf_AddDesc_fish_5fcrazy_5fdef_2eproto();
void protobuf_AssignDesc_fish_5fcrazy_5fdef_2eproto();
void protobuf_ShutdownFile_fish_5fcrazy_5fdef_2eproto();


enum e_server_msg_type {
  e_mst_start_c2l = 10000,
  e_mst_c2l_get_room_info = 10001,
  e_mst_c2l_enter_table = 10002,
  e_mst_c2l_leave_table = 10003,
  e_mst_c2l_check_state = 10004,
  e_mst_c2l_try_enter_table = 10005,
  e_mst_c2l_get_scene_info = 10100,
  e_mst_c2l_change_seat = 10101,
  e_mst_c2l_change_rate = 10102,
  e_mst_c2l_manual_fire = 10103,
  e_mst_c2l_hit_fish = 10104,
  e_mst_c2l_buy_item = 10105,
  e_mst_c2l_use_item = 10106,
  e_mst_c2l_get_shoplist = 10107,
  e_mst_c2l_hit_fishs = 10108,
  e_mst_c2l_lock_fish = 10109,
  e_mst_c2l_player_levelup = 10110,
  e_mst_c2l_usetick_levelup = 10111,
  e_mst_c2l_change_table = 10112,
  e_mst_c2l_try_turret = 10113,
  e_mst_c2l_try_turret_state = 10114,
  e_mst_c2l_use_turret_power = 10115,
  e_mst_c2l_turret_rotate = 10116,
  e_mst_c2l_missile_fire = 10117,
  e_mst_c2l_sync_gold = 10118,
  e_mst_start_l2c = 15000,
  e_mst_l2c_get_room_info_result = 15001,
  e_mst_l2c_enter_table_result = 15002,
  e_mst_l2c_leave_table_result = 15003,
  e_mst_l2c_check_state_result = 15004,
  e_mst_l2c_try_enter_table_result = 15005,
  e_mst_l2c_get_scene_info_result = 15100,
  e_mst_l2c_change_seat_result = 15101,
  e_mst_l2c_player_levelup_result = 15102,
  e_mst_l2c_usetick_levelup_result = 15103,
  e_mst_l2c_change_table_result = 15104,
  e_mst_l2c_try_turret_result = 15105,
  e_mst_l2c_try_turret_state_result = 15106,
  e_mst_l2c_use_turret_power_result = 15107,
  e_mst_l2c_give_item_result = 15108,
  e_mst_l2c_player_auto_levelup = 15109,
  e_mst_l2c_change_rate_result = 15110,
  e_mst_l2c_manual_fire_fail = 15111,
  e_mst_l2c_bc_enter_seat = 15201,
  e_mst_l2c_bc_leave_seat = 15202,
  e_mst_l2c_bc_change_rate = 15203,
  e_mst_l2c_bc_create_fish = 15204,
  e_mst_l2c_bc_manual_fire = 15205,
  e_mst_l2c_bc_fish_die = 15206,
  e_mst_l2c_bc_change_attr = 15207,
  e_mst_l2c_bc_create_generator = 15208,
  e_mst_l2c_bc_change_scene = 15209,
  e_mst_l2c_buy_item_result = 15210,
  e_mst_l2c_use_item_result = 15211,
  e_mst_l2c_get_shoplist_result = 15212,
  e_mst_l2c_bc_addbuff = 15213,
  e_mst_l2c_bc_removebuff = 15214,
  e_mst_l2c_bc_changeturret = 15215,
  e_mst_l2c_bc_lock_fish = 15216,
  e_mst_l2c_bc_freeze = 15217,
  e_mst_l2c_bc_fishs_die = 15218,
  e_mst_l2c_bc_specialfish_die = 15219,
  e_mst_l2c_bc_change_scene_bg = 15220,
  e_mst_l2c_bc_scene_time = 15221,
  e_mst_l2c_bc_hit_fishs = 15223,
  e_mst_l2c_bc_turret_rotate = 15224,
  e_mst_l2c_bc_change_max_power = 15225,
  e_mst_l2c_bc_missile_fire = 15226,
  e_mst_l2c_bc_debuginfo = 15227,
  e_mst_c2l_robot_enter = 16000,
  e_mst_l2c_robot_leave = 16100,
  e_mst_clend_index = 20000
};
bool e_server_msg_type_IsValid(int value);
const e_server_msg_type e_server_msg_type_MIN = e_mst_start_c2l;
const e_server_msg_type e_server_msg_type_MAX = e_mst_clend_index;
const int e_server_msg_type_ARRAYSIZE = e_server_msg_type_MAX + 1;

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor();
inline const ::std::string& e_server_msg_type_Name(e_server_msg_type value) {
  return ::google::protobuf::internal::NameOfEnum(
    e_server_msg_type_descriptor(), value);
}
inline bool e_server_msg_type_Parse(
    const ::std::string& name, e_server_msg_type* value) {
  return ::google::protobuf::internal::ParseNamedEnum<e_server_msg_type>(
    e_server_msg_type_descriptor(), name, value);
}
// ===================================================================


// ===================================================================


// ===================================================================


// @@protoc_insertion_point(namespace_scope)

}  // namespace fish_protocols

#ifndef SWIG
namespace google {
namespace protobuf {

template <>
inline const EnumDescriptor* GetEnumDescriptor< ::fish_protocols::e_server_msg_type>() {
  return ::fish_protocols::e_server_msg_type_descriptor();
}

}  // namespace google
}  // namespace protobuf
#endif  // SWIG

// @@protoc_insertion_point(global_scope)

#endif  // PROTOBUF_fish_5fcrazy_5fdef_2eproto__INCLUDED
