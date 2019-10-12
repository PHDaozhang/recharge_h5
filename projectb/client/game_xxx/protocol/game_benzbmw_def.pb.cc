// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_benzbmw_def.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "game_benzbmw_def.pb.h"

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

namespace game_benzbmw_protocols {

namespace {

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;
const ::google::protobuf::EnumDescriptor* e_game_state_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_game_5fbenzbmw_5fdef_2eproto() {
  protobuf_AddDesc_game_5fbenzbmw_5fdef_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "game_benzbmw_def.proto");
  GOOGLE_CHECK(file != NULL);
  e_server_msg_type_descriptor_ = file->enum_type(0);
  e_game_state_descriptor_ = file->enum_type(1);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_game_5fbenzbmw_5fdef_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
}

}  // namespace

void protobuf_ShutdownFile_game_5fbenzbmw_5fdef_2eproto() {
}

void protobuf_AddDesc_game_5fbenzbmw_5fdef_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\026game_benzbmw_def.proto\022\026game_benzbmw_p"
    "rotocols*\275\n\n\021e_server_msg_type\022\024\n\017e_mst_"
    "start_c2l\020\220N\022\034\n\027e_mst_c2l_get_room_info\020"
    "\221N\022\031\n\024e_mst_c2l_enter_room\020\222N\022\031\n\024e_mst_c"
    "2l_leave_room\020\223N\022\026\n\021e_mst_c2l_add_bet\020\224N"
    "\022\031\n\024e_mst_c2l_repeat_bet\020\225N\022\030\n\023e_mst_c2l"
    "_clear_bet\020\226N\022\"\n\035e_mst_c2l_get_room_scen"
    "e_info\020\227N\022\032\n\025e_mst_c2l_check_state\020\230N\022\021\n"
    "\014e_mst_c2l_gm\020\231N\022\035\n\030e_mst_c2l_ask_for_ba"
    "nker\020\232N\022\033\n\026e_mst_c2l_leave_banker\020\233N\022#\n\036"
    "e_mst_c2l_ask_first_for_banker\020\234N\022\036\n\031e_m"
    "st_c2l_ask_player_list\020\235N\022\036\n\031e_mst_c2l_a"
    "sk_banker_list\020\236N\022\037\n\032e_mst_c2l_ask_histo"
    "ry_list\020\237N\022$\n\037e_mst_c2l_control_change_r"
    "esult\020\240N\022\024\n\017e_mst_start_l2c\020\230u\022#\n\036e_mst_"
    "l2c_get_room_info_result\020\231u\022 \n\033e_mst_l2c"
    "_enter_room_result\020\232u\022 \n\033e_mst_l2c_leave"
    "_room_result\020\233u\022\026\n\021e_mst_l2c_add_bet\020\234u\022"
    "\031\n\024e_mst_l2c_repeat_bet\020\235u\022\030\n\023e_mst_l2c_"
    "clear_bet\020\236u\022\033\n\026e_mst_l2c_bc_begin_bet\020\237"
    "u\022\035\n\030e_mst_l2c_bc_begin_award\020\240u\022 \n\033e_ms"
    "t_l2c_bc_total_bet_info\020\241u\022\"\n\035e_mst_l2c_"
    "get_room_scene_info\020\242u\022!\n\034e_mst_l2c_chec"
    "k_state_result\020\245u\022\035\n\030e_mst_l2c_bc_accept"
    "_gift\020\247u\022\035\n\030e_mst_l2c_ask_for_banker\020\250u\022"
    "\033\n\026e_mst_l2c_leave_banker\020\251u\022#\n\036e_mst_l2"
    "c_ask_first_for_banker\020\252u\022\037\n\032e_mst_l2c_b"
    "c_change_banker\020\253u\022\036\n\031e_mst_l2c_ask_play"
    "er_list\020\254u\022\036\n\031e_mst_l2c_ask_banker_list\020"
    "\255u\022\037\n\032e_mst_l2c_ask_history_list\020\256u\022!\n\034e"
    "_mst_l2c_bc_rob_banker_info\020\257u\022 \n\033e_mst_"
    "l2c_bc_every_bet_info\020\214y\022$\n\037e_mst_l2c_co"
    "ntrol_change_result\020\216y\022\033\n\026e_mst_l2c_bc_d"
    "ebuginfo\020\221y\022\"\n\035e_mst_l2c_notice_gm_bank_"
    "info\020\222y\022\027\n\021e_mst_clend_index\020\240\234\001*T\n\014e_ga"
    "me_state\022\026\n\022e_state_game_begin\020\000\022\024\n\020e_st"
    "ate_game_bet\020\001\022\026\n\022e_state_game_award\020\002", 1478);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "game_benzbmw_def.proto", &protobuf_RegisterTypes);
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_game_5fbenzbmw_5fdef_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_game_5fbenzbmw_5fdef_2eproto {
  StaticDescriptorInitializer_game_5fbenzbmw_5fdef_2eproto() {
    protobuf_AddDesc_game_5fbenzbmw_5fdef_2eproto();
  }
} static_descriptor_initializer_game_5fbenzbmw_5fdef_2eproto_;
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
    case 10009:
    case 10010:
    case 10011:
    case 10012:
    case 10013:
    case 10014:
    case 10015:
    case 10016:
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
    case 15010:
    case 15013:
    case 15015:
    case 15016:
    case 15017:
    case 15018:
    case 15019:
    case 15020:
    case 15021:
    case 15022:
    case 15023:
    case 15500:
    case 15502:
    case 15505:
    case 15506:
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

}  // namespace game_benzbmw_protocols

// @@protoc_insertion_point(global_scope)
