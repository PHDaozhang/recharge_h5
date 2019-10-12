// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: client2gate_msg_type.proto

#ifndef PROTOBUF_client2gate_5fmsg_5ftype_2eproto__INCLUDED
#define PROTOBUF_client2gate_5fmsg_5ftype_2eproto__INCLUDED

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

namespace client2gate_protocols {

// Internal implementation detail -- do not call these.
void  protobuf_AddDesc_client2gate_5fmsg_5ftype_2eproto();
void protobuf_AssignDesc_client2gate_5fmsg_5ftype_2eproto();
void protobuf_ShutdownFile_client2gate_5fmsg_5ftype_2eproto();


enum e_server_msg_type {
  e_mst_start_c2g = 300,
  e_mst_c2g_heartbeat = 301,
  e_mst_c2g_net_param = 302,
  e_mst_start_g2c = 400,
  e_mst_g2c_send_msglist = 401,
  e_mst_g2c_net_param = 402,
  e_mst_g2c_shutdown = 403,
  e_mst_g2c_heartbeat = 404,
  e_mst_g2c_error_packet = 405,
  e_mst_cg2cg_start = 444,
  e_mst_cgend_index = 500
};
bool e_server_msg_type_IsValid(int value);
const e_server_msg_type e_server_msg_type_MIN = e_mst_start_c2g;
const e_server_msg_type e_server_msg_type_MAX = e_mst_cgend_index;
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

}  // namespace client2gate_protocols

#ifndef SWIG
namespace google {
namespace protobuf {

template <>
inline const EnumDescriptor* GetEnumDescriptor< ::client2gate_protocols::e_server_msg_type>() {
  return ::client2gate_protocols::e_server_msg_type_descriptor();
}

}  // namespace google
}  // namespace protobuf
#endif  // SWIG

// @@protoc_insertion_point(global_scope)

#endif  // PROTOBUF_client2gate_5fmsg_5ftype_2eproto__INCLUDED
