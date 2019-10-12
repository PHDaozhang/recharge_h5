// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_5dragons_def.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "game_5dragons_def.pb.h"

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

namespace game_5dragons_protocols {

namespace {

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;
const ::google::protobuf::EnumDescriptor* e_dragons_type_descriptor_ = NULL;
const ::google::protobuf::EnumDescriptor* e_double_tag_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_game_5f5dragons_5fdef_2eproto() {
  protobuf_AddDesc_game_5f5dragons_5fdef_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "game_5dragons_def.proto");
  GOOGLE_CHECK(file != NULL);
  e_server_msg_type_descriptor_ = file->enum_type(0);
  e_dragons_type_descriptor_ = file->enum_type(1);
  e_double_tag_descriptor_ = file->enum_type(2);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_game_5f5dragons_5fdef_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
}

}  // namespace

void protobuf_ShutdownFile_game_5f5dragons_5fdef_2eproto() {
}

void protobuf_AddDesc_game_5f5dragons_5fdef_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\027game_5dragons_def.proto\022\027game_5dragons"
    "_protocols*\336\004\n\021e_server_msg_type\022\024\n\017e_ms"
    "t_start_c2l\020\220N\022\032\n\025e_mst_c2l_check_state\020"
    "\221N\022\031\n\024e_mst_c2l_enter_game\020\222N\022\031\n\024e_mst_c"
    "2l_leave_game\020\223N\022\030\n\023e_mst_c2l_star_game\020"
    "\224N\022\025\n\020e_mst_c2l_buy_lv\020\225N\022\032\n\025e_mst_c2l_d"
    "ouble_game\020\226N\022\037\n\032e_mst_c2l_buy_double_ti"
    "mes\020\227N\022\030\n\023e_mst_c2l_test_game\020\230N\022\024\n\017e_ms"
    "t_start_l2c\020\230u\022!\n\034e_mst_l2c_check_state_"
    "result\020\231u\022 \n\033e_mst_l2c_enter_game_result"
    "\020\232u\022 \n\033e_mst_l2c_leave_game_result\020\233u\022\037\n"
    "\032e_mst_l2c_star_game_result\020\234u\022\034\n\027e_mst_"
    "l2c_buy_lv_result\020\235u\022!\n\034e_mst_l2c_double"
    "_game_result\020\236u\022&\n!e_mst_l2c_buy_double_"
    "times_result\020\237u\022\037\n\032e_mst_l2c_test_game_r"
    "esult\020\240u\022\030\n\023e_mst_l2c_debuginfo\020\241u\022\027\n\021e_"
    "mst_clend_index\020\240\234\001*`\n\016e_dragons_type\022\020\n"
    "\014big_paradise\020\001\022\022\n\016small_paradise\020\002\022\n\n\006n"
    "ormal\020\003\022\014\n\010big_hell\020\004\022\016\n\nsmall_hell\020\005*\221\001"
    "\n\014e_double_tag\022\016\n\ne_save_tag\020\000\022\020\n\014e_spad"
    "es_tag\020\001\022\020\n\014e_hearts_tag\020\002\022\025\n\021e_plum_flo"
    "wer_tag\020\003\022\026\n\022e_square_piece_tag\020\004\022\r\n\te_r"
    "ed_tag\020\005\022\017\n\013e_black_tag\020\006", 905);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "game_5dragons_def.proto", &protobuf_RegisterTypes);
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_game_5f5dragons_5fdef_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_game_5f5dragons_5fdef_2eproto {
  StaticDescriptorInitializer_game_5f5dragons_5fdef_2eproto() {
    protobuf_AddDesc_game_5f5dragons_5fdef_2eproto();
  }
} static_descriptor_initializer_game_5f5dragons_5fdef_2eproto_;
const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_server_msg_type_descriptor_;
}
bool e_server_msg_type_IsValid(int value) {
  switch(value) {
    case 10000:
    case 10001:
    case 10002:
    case 10003:
    case 10004:
    case 10005:
    case 10006:
    case 10007:
    case 10008:
    case 15000:
    case 15001:
    case 15002:
    case 15003:
    case 15004:
    case 15005:
    case 15006:
    case 15007:
    case 15008:
    case 15009:
    case 20000:
      return true;
    default:
      return false;
  }
}

const ::google::protobuf::EnumDescriptor* e_dragons_type_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_dragons_type_descriptor_;
}
bool e_dragons_type_IsValid(int value) {
  switch(value) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
      return true;
    default:
      return false;
  }
}

const ::google::protobuf::EnumDescriptor* e_double_tag_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_double_tag_descriptor_;
}
bool e_double_tag_IsValid(int value) {
  switch(value) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
      return true;
    default:
      return false;
  }
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace game_5dragons_protocols

// @@protoc_insertion_point(global_scope)
