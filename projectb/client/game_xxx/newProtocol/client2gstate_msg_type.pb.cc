// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: client2gstate_msg_type.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "client2gstate_msg_type.pb.h"

#include <algorithm>

#include <google/protobuf/stubs/common.h>
#include <google/protobuf/stubs/once.h>
#include <google/protobuf/io/coded_stream.h>
#include <google/protobuf/wire_format_lite_inl.h>
#include <google/protobuf/descriptor.h>
#include <google/protobuf/generated_message_reflection.h>
#include <google/protobuf/reflection_ops.h>
#include <google/protobuf/wire_format.h>
// @@protoc_insertion_point(includes)

namespace client2gstate_protocols {

namespace {

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_client2gstate_5fmsg_5ftype_2eproto() {
  protobuf_AddDesc_client2gstate_5fmsg_5ftype_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "client2gstate_msg_type.proto");
  GOOGLE_CHECK(file != NULL);
  e_server_msg_type_descriptor_ = file->enum_type(0);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_client2gstate_5fmsg_5ftype_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
}

}  // namespace

void protobuf_ShutdownFile_client2gstate_5fmsg_5ftype_2eproto() {
}

void protobuf_AddDesc_client2gstate_5fmsg_5ftype_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\034client2gstate_msg_type.proto\022\027client2g"
    "state_protocols*\371\007\n\021e_server_msg_type\022\031\n"
    "\023e_mst_gs_start_c2gs\020\260\352\001\022\037\n\031e_mst_c2gs_p"
    "layer_connect\020\261\352\001\022\"\n\034e_mst_c2gs_player_d"
    "isconnect\020\262\352\001\022\035\n\027e_mst_c2gs_game_history"
    "\020\263\352\001\022\026\n\020e_mst_start_gs2c\020\230\362\001\022&\n e_mst_gs"
    "2c_player_connect_result\020\231\362\001\022)\n#e_mst_gs"
    "2c_player_disconnect_result\020\232\362\001\022$\n\036e_mst"
    "_gs2c_shcd_history_result\020\234\362\001\022$\n\036e_mst_g"
    "s2c_cows_history_result\020\235\362\001\022(\n\"e_mst_gs2"
    "c_baccarat_history_result\020\236\362\001\022)\n#e_mst_g"
    "s2c_goldshark_history_result\020\237\362\001\022#\n\035e_ms"
    "t_gs2c_lhd_history_result\020\240\362\001\022\'\n!e_mst_g"
    "s2c_benzbmw_history_result\020\241\362\001\022-\n\'e_mst_"
    "gs2c_multiredblack_history_result\020\242\362\001\022#\n"
    "\035e_mst_gs2c_ebg_history_result\020\243\362\001\022$\n\036e_"
    "mst_gs2c_dice_history_result\020\244\362\001\022$\n\036e_ms"
    "t_gs2c_qznn_history_result\020\245\362\001\022+\n%e_mst_"
    "gs2c_carsmagnate_history_result\020\246\362\001\022*\n$e"
    "_mst_gs2c_multitexas_history_result\020\247\362\001\022"
    "&\n e_mst_gs2c_fruits_history_result\020\250\362\001\022"
    "&\n e_mst_gs2c_forest_history_result\020\251\362\001\022"
    "-\n\'e_mst_gs2c_fourcolorball_history_resu"
    "lt\020\252\362\001\022.\n(e_mst_gs2c_happySupremacy_hist"
    "ory_result\020\253\362\001\022$\n\036e_mst_gs2c_tbnn_histor"
    "y_result\020\254\362\001\022#\n\035e_mst_gs2c_ttz_history_r"
    "esult\020\255\362\001\022\030\n\022e_mst_gs_end_index\020\200\372\001", 1075);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "client2gstate_msg_type.proto", &protobuf_RegisterTypes);
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_client2gstate_5fmsg_5ftype_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_client2gstate_5fmsg_5ftype_2eproto {
  StaticDescriptorInitializer_client2gstate_5fmsg_5ftype_2eproto() {
    protobuf_AddDesc_client2gstate_5fmsg_5ftype_2eproto();
  }
} static_descriptor_initializer_client2gstate_5fmsg_5ftype_2eproto_;
const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_server_msg_type_descriptor_;
}
bool e_server_msg_type_IsValid(int value) {
  switch(value) {
    case 30000:
    case 30001:
    case 30002:
    case 30003:
    case 31000:
    case 31001:
    case 31002:
    case 31004:
    case 31005:
    case 31006:
    case 31007:
    case 31008:
    case 31009:
    case 31010:
    case 31011:
    case 31012:
    case 31013:
    case 31014:
    case 31015:
    case 31016:
    case 31017:
    case 31018:
    case 31019:
    case 31020:
    case 31021:
    case 32000:
      return true;
    default:
      return false;
  }
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace client2gstate_protocols

// @@protoc_insertion_point(global_scope)
