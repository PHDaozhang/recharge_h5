// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: client2gstate_msg_type.proto

#ifndef PROTOBUF_client2gstate_5fmsg_5ftype_2eproto__INCLUDED
#define PROTOBUF_client2gstate_5fmsg_5ftype_2eproto__INCLUDED

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

namespace client2gstate_protocols {

// Internal implementation detail -- do not call these.
void  protobuf_AddDesc_client2gstate_5fmsg_5ftype_2eproto();
void protobuf_AssignDesc_client2gstate_5fmsg_5ftype_2eproto();
void protobuf_ShutdownFile_client2gstate_5fmsg_5ftype_2eproto();


enum e_server_msg_type {
  e_mst_gs_start_c2gs = 30000,
  e_mst_c2gs_player_connect = 30001,
  e_mst_c2gs_player_disconnect = 30002,
  e_mst_c2gs_game_history = 30003,
  e_mst_start_gs2c = 31000,
  e_mst_gs2c_player_connect_result = 31001,
  e_mst_gs2c_player_disconnect_result = 31002,
  e_mst_gs2c_shcd_history_result = 31004,
  e_mst_gs2c_cows_history_result = 31005,
  e_mst_gs2c_baccarat_history_result = 31006,
  e_mst_gs2c_goldshark_history_result = 31007,
  e_mst_gs2c_lhd_history_result = 31008,
  e_mst_gs2c_benzbmw_history_result = 31009,
  e_mst_gs2c_multiredblack_history_result = 31010,
  e_mst_gs2c_ebg_history_result = 31011,
  e_mst_gs2c_dice_history_result = 31012,
  e_mst_gs2c_qznn_history_result = 31013,
  e_mst_gs2c_carsmagnate_history_result = 31014,
  e_mst_gs2c_multitexas_history_result = 31015,
  e_mst_gs2c_fruits_history_result = 31016,
  e_mst_gs2c_forest_history_result = 31017,
  e_mst_gs2c_fourcolorball_history_result = 31018,
  e_mst_gs2c_happySupremacy_history_result = 31019,
  e_mst_gs2c_tbnn_history_result = 31020,
  e_mst_gs2c_ttz_history_result = 31021,
  e_mst_gs_end_index = 32000
};
bool e_server_msg_type_IsValid(int value);
const e_server_msg_type e_server_msg_type_MIN = e_mst_gs_start_c2gs;
const e_server_msg_type e_server_msg_type_MAX = e_mst_gs_end_index;
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

}  // namespace client2gstate_protocols

#ifndef SWIG
namespace google {
namespace protobuf {

template <>
inline const EnumDescriptor* GetEnumDescriptor< ::client2gstate_protocols::e_server_msg_type>() {
  return ::client2gstate_protocols::e_server_msg_type_descriptor();
}

}  // namespace google
}  // namespace protobuf
#endif  // SWIG

// @@protoc_insertion_point(global_scope)

#endif  // PROTOBUF_client2gstate_5fmsg_5ftype_2eproto__INCLUDED
