// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_roulette_def.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "game_roulette_def.pb.h"

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

namespace game_roulette_protocols {

namespace {

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_game_5froulette_5fdef_2eproto() {
  protobuf_AddDesc_game_5froulette_5fdef_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "game_roulette_def.proto");
  GOOGLE_CHECK(file != NULL);
  e_server_msg_type_descriptor_ = file->enum_type(0);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_game_5froulette_5fdef_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
}

}  // namespace

void protobuf_ShutdownFile_game_5froulette_5fdef_2eproto() {
}

void protobuf_AddDesc_game_5froulette_5fdef_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\027game_roulette_def.proto\022\027game_roulette"
    "_protocols*\270\013\n\021e_server_msg_type\022\024\n\017e_ms"
    "t_start_c2l\020\220N\022\035\n\030e_mst_c2l_get_scene_in"
    "fo\020\221N\022\033\n\026e_mst_c2l_ask_bet_info\020\233N\022\033\n\026e_"
    "mst_c2l_continue_bet\020\234N\022\033\n\026e_mst_c2l_gam"
    "e_control\020\235N\022\034\n\027e_mst_c2l_get_room_info\020"
    "\236N\022\031\n\024e_mst_c2l_enter_room\020\237N\022\031\n\024e_mst_c"
    "2l_leave_room\020\240N\022 \n\033e_mst_c2l_room_histo"
    "ry_list\020\241N\022\027\n\022e_mst_c2l_req_seat\020\242N\022\036\n\031e"
    "_mst_c2l_ask_player_list\020\243N\022\032\n\025e_mst_c2l"
    "_supply_chip\020\244N\022\032\n\025e_mst_c2l_check_state"
    "\020\245N\022\031\n\024e_mst_c2l_cancel_bet\020\246N\022\037\n\032e_mst_"
    "c2l_gm_get_room_info\020\365N\022\032\n\025e_mst_c2l_gm_"
    "set_bead\020\366N\022\024\n\017e_mst_start_l2c\020\230u\022$\n\037e_m"
    "st_l2c_get_scene_info_result\020\231u\022\036\n\031e_mst"
    "_l2c_bet_info_result\020\243u\022\"\n\035e_mst_l2c_con"
    "tinue_bet_result\020\244u\022\033\n\026e_mst_l2c_bc_debu"
    "ginfo\020\245u\022%\n e_mst_l2c_notice_gm_all_bet_"
    "info\020\246u\022$\n\037e_mst_l2c_bc_scene_prepare_in"
    "to\020\312u\022 \n\033e_mst_l2c_bc_scene_bet_into\020\313u\022"
    "%\n e_mst_l2c_bc_sync_scene_bet_into\020\314u\022!"
    "\n\034e_mst_l2c_bc_scene_deal_into\020\315u\022#\n\036e_m"
    "st_l2c_bc_scene_result_into\020\316u\022 \n\033e_mst_"
    "l2c_enter_player_info\020\317u\022 \n\033e_mst_l2c_le"
    "ave_player_info\020\320u\022\"\n\035e_mst_l2c_game_con"
    "trol_result\020\321u\022#\n\036e_mst_l2c_get_room_inf"
    "o_result\020\322u\022 \n\033e_mst_l2c_enter_room_resu"
    "lt\020\323u\022 \n\033e_mst_l2c_leave_room_result\020\324u\022"
    "\'\n\"e_mst_l2c_room_history_list_result\020\325u"
    "\022\035\n\030e_mst_l2c_notify_history\020\326u\022\036\n\031e_mst"
    "_l2c_req_seat_result\020\327u\022\031\n\024e_mst_l2c_lea"
    "ve_seat\020\330u\022\036\n\031e_mst_l2c_ask_player_list\020"
    "\331u\022\035\n\030e_mst_l2c_bc_change_attr\020\332u\022!\n\034e_m"
    "st_l2c_supply_chip_result\020\333u\022!\n\034e_mst_l2"
    "c_check_state_result\020\334u\022 \n\033e_mst_l2c_can"
    "cel_bet_result\020\335u\022&\n!e_mst_l2c_gm_get_ro"
    "om_info_result\020\375u\022!\n\034e_mst_l2c_gm_set_be"
    "ad_result\020\376u\022\027\n\021e_mst_clend_index\020\240\234\001", 1517);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "game_roulette_def.proto", &protobuf_RegisterTypes);
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_game_5froulette_5fdef_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_game_5froulette_5fdef_2eproto {
  StaticDescriptorInitializer_game_5froulette_5fdef_2eproto() {
    protobuf_AddDesc_game_5froulette_5fdef_2eproto();
  }
} static_descriptor_initializer_game_5froulette_5fdef_2eproto_;
const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor() {
  protobuf_AssignDescriptorsOnce();
  return e_server_msg_type_descriptor_;
}
bool e_server_msg_type_IsValid(int value) {
  switch(value) {
    case 10000:
    case 10001:
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
    case 10021:
    case 10022:
    case 10101:
    case 10102:
    case 15000:
    case 15001:
    case 15011:
    case 15012:
    case 15013:
    case 15014:
    case 15050:
    case 15051:
    case 15052:
    case 15053:
    case 15054:
    case 15055:
    case 15056:
    case 15057:
    case 15058:
    case 15059:
    case 15060:
    case 15061:
    case 15062:
    case 15063:
    case 15064:
    case 15065:
    case 15066:
    case 15067:
    case 15068:
    case 15069:
    case 15101:
    case 15102:
    case 20000:
      return true;
    default:
      return false;
  }
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace game_roulette_protocols

// @@protoc_insertion_point(global_scope)
