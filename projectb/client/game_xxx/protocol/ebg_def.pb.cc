// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: ebg_def.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "ebg_def.pb.h"

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

namespace ebg_protocols {

namespace {

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_ebg_5fdef_2eproto() {
  protobuf_AddDesc_ebg_5fdef_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "ebg_def.proto");
  GOOGLE_CHECK(file != NULL);
  e_server_msg_type_descriptor_ = file->enum_type(0);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_ebg_5fdef_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
}

}  // namespace

void protobuf_ShutdownFile_ebg_5fdef_2eproto() {
}

void protobuf_AddDesc_ebg_5fdef_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\rebg_def.proto\022\rebg_protocols*\272\013\n\021e_ser"
    "ver_msg_type\022\024\n\017e_mst_start_c2l\020\220N\022\034\n\027e_"
    "mst_c2l_get_room_info\020\221N\022\032\n\025e_mst_c2l_en"
    "ter_table\020\222N\022\032\n\025e_mst_c2l_leave_table\020\223N"
    "\022\032\n\025e_mst_c2l_check_state\020\224N\022\035\n\030e_mst_c2"
    "l_get_scene_info\020\232N\022\033\n\026e_mst_c2l_ask_bet"
    "_info\020\233N\022\037\n\032e_mst_c2l_ask_apply_banker\020\234"
    "N\022\037\n\032e_mst_c2l_ask_leave_banker\020\235N\022\035\n\030e_"
    "mst_c2l_ask_bankerlist\020\236N\022\037\n\032e_mst_c2l_a"
    "sk_history_info\020\237N\022\037\n\032e_mst_c2l_ask_cont"
    "inue_bet\020\240N\022\034\n\027e_mst_c2l_ask_clear_bet\020\241"
    "N\022\035\n\030e_mst_c2l_ask_playerlist\020\242N\022 \n\033e_ms"
    "t_c2l_ask_snatch_banker\020\243N\022 \n\033e_mst_c2l_"
    "leave_list_banker\020\244N\022\024\n\017e_mst_c2l_debug\020"
    "\364N\022\024\n\017e_mst_start_l2c\020\230u\022#\n\036e_mst_l2c_ge"
    "t_room_info_result\020\231u\022!\n\034e_mst_l2c_enter"
    "_table_result\020\232u\022!\n\034e_mst_l2c_leave_tabl"
    "e_result\020\233u\022!\n\034e_mst_l2c_check_state_res"
    "ult\020\234u\022$\n\037e_mst_l2c_get_scene_info_resul"
    "t\020\242u\022\036\n\031e_mst_l2c_bet_info_result\020\243u\022\"\n\035"
    "e_mst_l2c_apply_banker_result\020\244u\022\"\n\035e_ms"
    "t_l2c_leave_banker_result\020\245u\022 \n\033e_mst_l2"
    "c_bankerlist_result\020\246u\022\033\n\026e_mst_l2c_hist"
    "ory_info\020\247u\022\032\n\025e_mst_l2c_banker_info\020\250u\022"
    "\"\n\035e_mst_l2c_continue_bet_result\020\251u\022\037\n\032e"
    "_mst_l2c_clear_bet_result\020\252u\022 \n\033e_mst_l2"
    "c_playerlist_result\020\253u\022#\n\036e_mst_l2c_snat"
    "ch_banker_result\020\254u\022\035\n\030e_mst_l2c_banker_"
    "success\020\255u\022$\n\037e_mst_l2c_bc_scene_prepare"
    "_into\020\312u\022 \n\033e_mst_l2c_bc_scene_bet_into\020"
    "\313u\022%\n e_mst_l2c_bc_sync_scene_bet_into\020\314"
    "u\022!\n\034e_mst_l2c_bc_scene_deal_into\020\315u\022#\n\036"
    "e_mst_l2c_bc_scene_result_into\020\316u\022\037\n\032e_m"
    "st_l2c_bc_snatch_banker\020\317u\022\037\n\032e_mst_l2c_"
    "notify_sceneinfo\020\375u\022\033\n\026e_mst_l2c_debug_r"
    "esult\020\376u\022 \n\033e_mst_l2c_leave_list_banker\020"
    "\377u\022\036\n\031e_mst_attention_needLeave\020\200v\022\027\n\021e_"
    "mst_clend_index\020\240\234\001", 1499);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "ebg_def.proto", &protobuf_RegisterTypes);
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_ebg_5fdef_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_ebg_5fdef_2eproto {
  StaticDescriptorInitializer_ebg_5fdef_2eproto() {
    protobuf_AddDesc_ebg_5fdef_2eproto();
  }
} static_descriptor_initializer_ebg_5fdef_2eproto_;
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
    case 10010:
    case 10011:
    case 10012:
    case 10013:
    case 10014:
    case 10015:
    case 10016:
    case 10017:
    case 10018:
    case 10019:
    case 10020:
    case 10100:
    case 15000:
    case 15001:
    case 15002:
    case 15003:
    case 15004:
    case 15010:
    case 15011:
    case 15012:
    case 15013:
    case 15014:
    case 15015:
    case 15016:
    case 15017:
    case 15018:
    case 15019:
    case 15020:
    case 15021:
    case 15050:
    case 15051:
    case 15052:
    case 15053:
    case 15054:
    case 15055:
    case 15101:
    case 15102:
    case 15103:
    case 15104:
    case 20000:
      return true;
    default:
      return false;
  }
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace ebg_protocols

// @@protoc_insertion_point(global_scope)
