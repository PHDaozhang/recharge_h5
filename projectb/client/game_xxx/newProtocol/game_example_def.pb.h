// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_example_def.proto

#ifndef PROTOBUF_game_5fexample_5fdef_2eproto__INCLUDED
#define PROTOBUF_game_5fexample_5fdef_2eproto__INCLUDED

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

namespace game_example_protocols {

// Internal implementation detail -- do not call these.
void  protobuf_AddDesc_game_5fexample_5fdef_2eproto();
void protobuf_AssignDesc_game_5fexample_5fdef_2eproto();
void protobuf_ShutdownFile_game_5fexample_5fdef_2eproto();


enum e_server_msg_type {
  e_mst_start_c2l = 10000,
  e_mst_c2l_game_play = 10001,
  e_mst_start_l2c = 15000,
  e_mst_l2c_game_play_result = 15001,
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

}  // namespace game_example_protocols

#ifndef SWIG
namespace google {
namespace protobuf {

template <>
inline const EnumDescriptor* GetEnumDescriptor< ::game_example_protocols::e_server_msg_type>() {
  return ::game_example_protocols::e_server_msg_type_descriptor();
}

}  // namespace google
}  // namespace protobuf
#endif  // SWIG

// @@protoc_insertion_point(global_scope)

#endif  // PROTOBUF_game_5fexample_5fdef_2eproto__INCLUDED