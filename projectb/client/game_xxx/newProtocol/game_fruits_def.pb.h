// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_fruits_def.proto

#ifndef PROTOBUF_game_5ffruits_5fdef_2eproto__INCLUDED
#define PROTOBUF_game_5ffruits_5fdef_2eproto__INCLUDED

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

namespace game_fruits_protocols {

// Internal implementation detail -- do not call these.
void  protobuf_AddDesc_game_5ffruits_5fdef_2eproto();
void protobuf_AssignDesc_game_5ffruits_5fdef_2eproto();
void protobuf_ShutdownFile_game_5ffruits_5fdef_2eproto();


enum e_server_msg_type {
  e_mst_start_c2l = 10000,
  e_mst_c2l_leave_room = 10002,
  e_mst_c2l_get_room_scene_info = 10003,
  e_mst_c2l_check_state = 10004,
  e_mst_c2l_add_bet = 10005,
  e_mst_c2l_repeat_bet = 10006,
  e_mst_c2l_ask_player_list = 10007,
  e_mst_c2l_game_control = 10022,
  e_mst_start_l2c = 15000,
  e_mst_l2c_leave_room_result = 15002,
  e_mst_l2c_get_room_scene_info = 15003,
  e_mst_l2c_check_state_result = 15004,
  e_mst_l2c_add_bet = 15005,
  e_mst_l2c_repeat_bet = 15006,
  e_mst_l2c_bc_begin_bet = 15011,
  e_mst_l2c_bc_sync_bets = 15012,
  e_mst_l2c_bc_begin_award = 15013,
  e_mst_l2c_ask_player_list = 15014,
  e_mst_l2c_notice_gm_all_bet_info = 15021,
  e_mst_l2c_game_control = 15022,
  e_mst_l2c_bc_debuginfo = 15023,
  e_mst_attention_needLeave = 15029,
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
enum e_game_state {
  e_state_game_begin = 0,
  e_state_game_bet = 1,
  e_state_game_award = 2
};
bool e_game_state_IsValid(int value);
const e_game_state e_game_state_MIN = e_state_game_begin;
const e_game_state e_game_state_MAX = e_state_game_award;
const int e_game_state_ARRAYSIZE = e_game_state_MAX + 1;

const ::google::protobuf::EnumDescriptor* e_game_state_descriptor();
inline const ::std::string& e_game_state_Name(e_game_state value) {
  return ::google::protobuf::internal::NameOfEnum(
    e_game_state_descriptor(), value);
}
inline bool e_game_state_Parse(
    const ::std::string& name, e_game_state* value) {
  return ::google::protobuf::internal::ParseNamedEnum<e_game_state>(
    e_game_state_descriptor(), name, value);
}
// ===================================================================


// ===================================================================


// ===================================================================


// @@protoc_insertion_point(namespace_scope)

}  // namespace game_fruits_protocols

#ifndef SWIG
namespace google {
namespace protobuf {

template <>
inline const EnumDescriptor* GetEnumDescriptor< ::game_fruits_protocols::e_server_msg_type>() {
  return ::game_fruits_protocols::e_server_msg_type_descriptor();
}
template <>
inline const EnumDescriptor* GetEnumDescriptor< ::game_fruits_protocols::e_game_state>() {
  return ::game_fruits_protocols::e_game_state_descriptor();
}

}  // namespace google
}  // namespace protobuf
#endif  // SWIG

// @@protoc_insertion_point(global_scope)

#endif  // PROTOBUF_game_5ffruits_5fdef_2eproto__INCLUDED
