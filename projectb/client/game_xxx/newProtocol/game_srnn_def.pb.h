// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_srnn_def.proto

#ifndef PROTOBUF_game_5fsrnn_5fdef_2eproto__INCLUDED
#define PROTOBUF_game_5fsrnn_5fdef_2eproto__INCLUDED

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

namespace game_srnn_protocols {

// Internal implementation detail -- do not call these.
void  protobuf_AddDesc_game_5fsrnn_5fdef_2eproto();
void protobuf_AssignDesc_game_5fsrnn_5fdef_2eproto();
void protobuf_ShutdownFile_game_5fsrnn_5fdef_2eproto();


enum e_server_msg_type {
  e_mst_start_c2l = 10000,
  e_mst_c2l_check_state = 10001,
  e_mst_c2l_get_scene_info = 10002,
  e_mst_c2l_enter_room = 10009,
  e_mst_c2l_leave_room = 10010,
  e_mst_c2l_ready = 10011,
  e_mst_c2l_banker_req = 10012,
  e_mst_c2l_bet_req = 10013,
  e_mst_c2l_open_card = 10014,
  e_mst_c2l_gm_list = 10015,
  e_mst_c2l_gm_kill = 10016,
  e_mst_c2l_user_trustee = 10007,
  e_mst_start_l2c = 15000,
  e_mst_l2c_check_state_result = 15001,
  e_mst_l2c_scene_info_result = 15002,
  e_mst_l2c_user_trustee = 15008,
  e_mst_l2c_enter_room_result = 15009,
  e_mst_l2c_leave_room_result = 15010,
  e_mst_l2c_bet_notify = 15014,
  e_mst_l2c_game_end = 15016,
  e_mst_l2c_game_start = 15017,
  e_mst_l2c_game_notify = 15018,
  e_mst_l2c_open_card_notify = 15019,
  e_mst_l2c_send_card = 15020,
  e_mst_l2c_banker_notify = 15021,
  e_mst_l2c_table_enter_player_info = 15022,
  e_mst_l2c_gm_list = 15024,
  e_mst_l2c_table_status_notify = 15029,
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
enum e_notify_type {
  e_nt_table_dismiss = 1,
  e_nt_gold_not_enough = 2,
  e_nt_shutdown = 3,
  e_nt_listen = 4,
  e_nt_assembling = 5,
  e_nt_player_leave = 6,
  e_nt_kill_ok = 7
};
bool e_notify_type_IsValid(int value);
const e_notify_type e_notify_type_MIN = e_nt_table_dismiss;
const e_notify_type e_notify_type_MAX = e_nt_kill_ok;
const int e_notify_type_ARRAYSIZE = e_notify_type_MAX + 1;

const ::google::protobuf::EnumDescriptor* e_notify_type_descriptor();
inline const ::std::string& e_notify_type_Name(e_notify_type value) {
  return ::google::protobuf::internal::NameOfEnum(
    e_notify_type_descriptor(), value);
}
inline bool e_notify_type_Parse(
    const ::std::string& name, e_notify_type* value) {
  return ::google::protobuf::internal::ParseNamedEnum<e_notify_type>(
    e_notify_type_descriptor(), name, value);
}
enum e_table_status {
  e_ts_free = 0,
  e_ts_reset = 1,
  e_ts_banker = 2,
  e_ts_bets = 3,
  e_ts_open_cards = 4,
  e_ts_result = 5,
  e_ts_release = 6
};
bool e_table_status_IsValid(int value);
const e_table_status e_table_status_MIN = e_ts_free;
const e_table_status e_table_status_MAX = e_ts_release;
const int e_table_status_ARRAYSIZE = e_table_status_MAX + 1;

const ::google::protobuf::EnumDescriptor* e_table_status_descriptor();
inline const ::std::string& e_table_status_Name(e_table_status value) {
  return ::google::protobuf::internal::NameOfEnum(
    e_table_status_descriptor(), value);
}
inline bool e_table_status_Parse(
    const ::std::string& name, e_table_status* value) {
  return ::google::protobuf::internal::ParseNamedEnum<e_table_status>(
    e_table_status_descriptor(), name, value);
}
// ===================================================================


// ===================================================================


// ===================================================================


// @@protoc_insertion_point(namespace_scope)

}  // namespace game_srnn_protocols

#ifndef SWIG
namespace google {
namespace protobuf {

template <>
inline const EnumDescriptor* GetEnumDescriptor< ::game_srnn_protocols::e_server_msg_type>() {
  return ::game_srnn_protocols::e_server_msg_type_descriptor();
}
template <>
inline const EnumDescriptor* GetEnumDescriptor< ::game_srnn_protocols::e_notify_type>() {
  return ::game_srnn_protocols::e_notify_type_descriptor();
}
template <>
inline const EnumDescriptor* GetEnumDescriptor< ::game_srnn_protocols::e_table_status>() {
  return ::game_srnn_protocols::e_table_status_descriptor();
}

}  // namespace google
}  // namespace protobuf
#endif  // SWIG

// @@protoc_insertion_point(global_scope)

#endif  // PROTOBUF_game_5fsrnn_5fdef_2eproto__INCLUDED
