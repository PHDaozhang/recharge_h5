// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_fruits_def.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "game_fruits_def.pb.h"

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

namespace game_fruits_protocols {

namespace {

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;
const ::google::protobuf::EnumDescriptor* e_game_state_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_game_5ffruits_5fdef_2eproto() {
  protobuf_AddDesc_game_5ffruits_5fdef_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "game_fruits_def.proto");
  GOOGLE_CHECK(file != NULL);
  e_server_msg_type_descriptor_ = file->enum_type(0);
  e_game_state_descriptor_ = file->enum_type(1);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_game_5ffruits_5fdef_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
}

}  // namespace

void protobuf_ShutdownFile_game_5ffruits_5fdef_2eproto() {
}

void protobuf_AddDesc_game_5ffruits_5fdef_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\025game_fruits_def.proto\022\025game_fruits_pro"
    "tocols*\271\005\n\021e_server_msg_type\022\024\n\017e_mst_st"
    "art_c2l\020\220N\022\031\n\024e_mst_c2l_leave_room\020\222N\022\"\n"
    "\035e_mst_c2l_get_room_scene_info\020\223N\022\032\n\025e_m"
    "st_c2l_check_state\020\224N\022\026\n\021e_mst_c2l_add_b"
    "et\020\225N\022\031\n\024e_mst_c2l_repeat_bet\020\226N\022\036\n\031e_ms"
    "t_c2l_ask_player_list\020\227N\022\033\n\026e_mst_c2l_ga"
    "me_control\020\246N\022\024\n\017e_mst_start_l2c\020\230u\022 \n\033e"
    "_mst_l2c_leave_room_result\020\232u\022\"\n\035e_mst_l"
    "2c_get_room_scene_info\020\233u\022!\n\034e_mst_l2c_c"
    "heck_state_result\020\234u\022\026\n\021e_mst_l2c_add_be"
    "t\020\235u\022\031\n\024e_mst_l2c_repeat_bet\020\236u\022\033\n\026e_mst"
    "_l2c_bc_begin_bet\020\243u\022\033\n\026e_mst_l2c_bc_syn"
    "c_bets\020\244u\022\035\n\030e_mst_l2c_bc_begin_award\020\245u"
    "\022\036\n\031e_mst_l2c_ask_player_list\020\246u\022%\n e_ms"
    "t_l2c_notice_gm_all_bet_info\020\255u\022\033\n\026e_mst"
    "_l2c_game_control\020\256u\022\033\n\026e_mst_l2c_bc_deb"
    "uginfo\020\257u\022\036\n\031e_mst_attention_needLeave\020\265"
    "u\022\027\n\021e_mst_clend_index\020\240\234\001*T\n\014e_game_sta"
    "te\022\026\n\022e_state_game_begin\020\000\022\024\n\020e_state_ga"
    "me_bet\020\001\022\026\n\022e_state_game_award\020\002", 832);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "game_fruits_def.proto", &protobuf_RegisterTypes);
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_game_5ffruits_5fdef_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_game_5ffruits_5fdef_2eproto {
  StaticDescriptorInitializer_game_5ffruits_5fdef_2eproto() {
    protobuf_AddDesc_game_5ffruits_5fdef_2eproto();
  }
} static_descriptor_initializer_game_5ffruits_5fdef_2eproto_;
const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_server_msg_type_descriptor_;
}
bool e_server_msg_type_IsValid(int value) {
  switch(value) {
    case 10000:
    case 10002:
    case 10003:
    case 10004:
    case 10005:
    case 10006:
    case 10007:
    case 10022:
    case 15000:
    case 15002:
    case 15003:
    case 15004:
    case 15005:
    case 15006:
    case 15011:
    case 15012:
    case 15013:
    case 15014:
    case 15021:
    case 15022:
    case 15023:
    case 15029:
    case 20000:
      return true;
    default:
      return false;
  }
}

const ::google::protobuf::EnumDescriptor* e_game_state_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_game_state_descriptor_;
}
bool e_game_state_IsValid(int value) {
  switch(value) {
    case 0:
    case 1:
    case 2:
      return true;
    default:
      return false;
  }
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace game_fruits_protocols

// @@protoc_insertion_point(global_scope)