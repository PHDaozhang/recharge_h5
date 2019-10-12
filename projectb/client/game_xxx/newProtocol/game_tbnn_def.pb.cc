// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_tbnn_def.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "game_tbnn_def.pb.h"

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

namespace game_tbnn_protocols {

namespace {

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;
const ::google::protobuf::EnumDescriptor* e_notify_type_descriptor_ = NULL;
const ::google::protobuf::EnumDescriptor* e_table_status_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_game_5ftbnn_5fdef_2eproto() {
  protobuf_AddDesc_game_5ftbnn_5fdef_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "game_tbnn_def.proto");
  GOOGLE_CHECK(file != NULL);
  e_server_msg_type_descriptor_ = file->enum_type(0);
  e_notify_type_descriptor_ = file->enum_type(1);
  e_table_status_descriptor_ = file->enum_type(2);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_game_5ftbnn_5fdef_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
}

}  // namespace

void protobuf_ShutdownFile_game_5ftbnn_5fdef_2eproto() {
}

void protobuf_AddDesc_game_5ftbnn_5fdef_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\023game_tbnn_def.proto\022\023game_tbnn_protoco"
    "ls*\346\006\n\021e_server_msg_type\022\024\n\017e_mst_start_"
    "c2l\020\220N\022\032\n\025e_mst_c2l_check_state\020\221N\022\035\n\030e_"
    "mst_c2l_get_scene_info\020\222N\022\034\n\027e_mst_c2l_g"
    "et_room_info\020\232N\022\032\n\025e_mst_c2l_enter_table"
    "\020\235N\022\032\n\025e_mst_c2l_leave_table\020\236N\022\033\n\026e_mst"
    "_c2l_user_trustee\020\237N\022\024\n\017e_mst_c2l_ready\020"
    "\240N\022\034\n\027e_mst_c2l_open_card_req\020\241N\022\033\n\026e_ms"
    "t_c2l_change_table\020\242N\022\024\n\017e_mst_start_l2c"
    "\020\230u\022!\n\034e_mst_l2c_check_state_result\020\231u\022 "
    "\n\033e_mst_l2c_scene_info_result\020\232u\022\037\n\032e_ms"
    "t_l2c_room_info_result\020\242u\022!\n\034e_mst_l2c_e"
    "nter_table_result\020\254u\022!\n\034e_mst_l2c_leave_"
    "table_result\020\255u\022&\n!e_mst_l2c_table_enter"
    "_player_info\020\256u\022&\n!e_mst_l2c_table_leave"
    "_player_info\020\257u\022\033\n\026e_mst_l2c_user_truste"
    "e\020\260u\022\031\n\024e_mst_l2c_game_start\020\262u\022\037\n\032e_mst"
    "_l2c_open_card_notify\020\263u\022\027\n\022e_mst_l2c_ga"
    "me_end\020\264u\022\"\n\035e_mst_l2c_table_status_noti"
    "fy\020\265u\022\036\n\031e_mst_l2c_room_award_list\020\266u\022\037\n"
    "\032e_mst_l2c_room_total_award\020\267u\022\036\n\031e_mst_"
    "l2c_room_award_item\020\270u\022\032\n\025e_mst_l2c_game"
    "_notify\020\271u\022\027\n\021e_mst_clend_index\020\240\234\001*T\n\re"
    "_notify_type\022\026\n\022e_nt_table_dismiss\020\001\022\030\n\024"
    "e_nt_gold_not_enough\020\002\022\021\n\re_nt_shutdown\020"
    "\003*T\n\016e_table_status\022\r\n\te_ts_free\020\000\022\016\n\ne_"
    "ts_reset\020\001\022\022\n\016e_ts_open_card\020\002\022\017\n\013e_ts_r"
    "esult\020\003", 1087);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "game_tbnn_def.proto", &protobuf_RegisterTypes);
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_game_5ftbnn_5fdef_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_game_5ftbnn_5fdef_2eproto {
  StaticDescriptorInitializer_game_5ftbnn_5fdef_2eproto() {
    protobuf_AddDesc_game_5ftbnn_5fdef_2eproto();
  }
} static_descriptor_initializer_game_5ftbnn_5fdef_2eproto_;
const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_server_msg_type_descriptor_;
}
bool e_server_msg_type_IsValid(int value) {
  switch(value) {
    case 10000:
    case 10001:
    case 10002:
    case 10010:
    case 10013:
    case 10014:
    case 10015:
    case 10016:
    case 10017:
    case 10018:
    case 15000:
    case 15001:
    case 15002:
    case 15010:
    case 15020:
    case 15021:
    case 15022:
    case 15023:
    case 15024:
    case 15026:
    case 15027:
    case 15028:
    case 15029:
    case 15030:
    case 15031:
    case 15032:
    case 15033:
    case 20000:
      return true;
    default:
      return false;
  }
}

const ::google::protobuf::EnumDescriptor* e_notify_type_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_notify_type_descriptor_;
}
bool e_notify_type_IsValid(int value) {
  switch(value) {
    case 1:
    case 2:
    case 3:
      return true;
    default:
      return false;
  }
}

const ::google::protobuf::EnumDescriptor* e_table_status_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_table_status_descriptor_;
}
bool e_table_status_IsValid(int value) {
  switch(value) {
    case 0:
    case 1:
    case 2:
    case 3:
      return true;
    default:
      return false;
  }
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace game_tbnn_protocols

// @@protoc_insertion_point(global_scope)