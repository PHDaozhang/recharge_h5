// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: fish_monkey_def.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "fish_monkey_def.pb.h"

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

namespace fish_protocols {

namespace {

const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_fish_5fmonkey_5fdef_2eproto() {
  protobuf_AddDesc_fish_5fmonkey_5fdef_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "fish_monkey_def.proto");
  GOOGLE_CHECK(file != NULL);
  e_server_msg_type_descriptor_ = file->enum_type(0);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_fish_5fmonkey_5fdef_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
}

}  // namespace

void protobuf_ShutdownFile_fish_5fmonkey_5fdef_2eproto() {
}

void protobuf_AddDesc_fish_5fmonkey_5fdef_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\025fish_monkey_def.proto\022\016fish_protocols*"
    "\325\021\n\021e_server_msg_type\022\024\n\017e_mst_start_c2l"
    "\020\220N\022\034\n\027e_mst_c2l_get_room_info\020\221N\022\032\n\025e_m"
    "st_c2l_enter_table\020\222N\022\032\n\025e_mst_c2l_leave"
    "_table\020\223N\022\032\n\025e_mst_c2l_check_state\020\224N\022\036\n"
    "\031e_mst_c2l_try_enter_table\020\225N\022\035\n\030e_mst_c"
    "2l_get_scene_info\020\364N\022\032\n\025e_mst_c2l_change"
    "_seat\020\365N\022\032\n\025e_mst_c2l_change_rate\020\366N\022\032\n\025"
    "e_mst_c2l_manual_fire\020\367N\022\027\n\022e_mst_c2l_hi"
    "t_fish\020\370N\022\027\n\022e_mst_c2l_buy_item\020\371N\022\027\n\022e_"
    "mst_c2l_use_item\020\372N\022\033\n\026e_mst_c2l_get_sho"
    "plist\020\373N\022\030\n\023e_mst_c2l_hit_fishs\020\374N\022\030\n\023e_"
    "mst_c2l_lock_fish\020\375N\022\035\n\030e_mst_c2l_player"
    "_levelup\020\376N\022\036\n\031e_mst_c2l_usetick_levelup"
    "\020\377N\022\033\n\026e_mst_c2l_change_table\020\200O\022\031\n\024e_ms"
    "t_c2l_try_turret\020\201O\022\037\n\032e_mst_c2l_try_tur"
    "ret_state\020\202O\022\037\n\032e_mst_c2l_use_turret_pow"
    "er\020\203O\022\034\n\027e_mst_c2l_turret_rotate\020\204O\022\033\n\026e"
    "_mst_c2l_missile_fire\020\205O\022\030\n\023e_mst_c2l_sy"
    "nc_gold\020\206O\022\024\n\017e_mst_start_l2c\020\230u\022#\n\036e_ms"
    "t_l2c_get_room_info_result\020\231u\022!\n\034e_mst_l"
    "2c_enter_table_result\020\232u\022!\n\034e_mst_l2c_le"
    "ave_table_result\020\233u\022!\n\034e_mst_l2c_check_s"
    "tate_result\020\234u\022%\n e_mst_l2c_try_enter_ta"
    "ble_result\020\235u\022$\n\037e_mst_l2c_get_scene_inf"
    "o_result\020\374u\022!\n\034e_mst_l2c_change_seat_res"
    "ult\020\375u\022$\n\037e_mst_l2c_player_levelup_resul"
    "t\020\376u\022%\n e_mst_l2c_usetick_levelup_result"
    "\020\377u\022\"\n\035e_mst_l2c_change_table_result\020\200v\022"
    " \n\033e_mst_l2c_try_turret_result\020\201v\022&\n!e_m"
    "st_l2c_try_turret_state_result\020\202v\022&\n!e_m"
    "st_l2c_use_turret_power_result\020\203v\022\037\n\032e_m"
    "st_l2c_give_item_result\020\204v\022\"\n\035e_mst_l2c_"
    "player_auto_levelup\020\205v\022!\n\034e_mst_l2c_chan"
    "ge_rate_result\020\206v\022\037\n\032e_mst_l2c_manual_fi"
    "re_fail\020\207v\022\034\n\027e_mst_l2c_bc_enter_seat\020\341v"
    "\022\034\n\027e_mst_l2c_bc_leave_seat\020\342v\022\035\n\030e_mst_"
    "l2c_bc_change_rate\020\343v\022\035\n\030e_mst_l2c_bc_cr"
    "eate_fish\020\344v\022\035\n\030e_mst_l2c_bc_manual_fire"
    "\020\345v\022\032\n\025e_mst_l2c_bc_fish_die\020\346v\022\035\n\030e_mst"
    "_l2c_bc_change_attr\020\347v\022\"\n\035e_mst_l2c_bc_c"
    "reate_generator\020\350v\022\036\n\031e_mst_l2c_bc_chang"
    "e_scene\020\351v\022\036\n\031e_mst_l2c_buy_item_result\020"
    "\352v\022\036\n\031e_mst_l2c_use_item_result\020\353v\022\"\n\035e_"
    "mst_l2c_get_shoplist_result\020\354v\022\031\n\024e_mst_"
    "l2c_bc_addbuff\020\355v\022\034\n\027e_mst_l2c_bc_remove"
    "buff\020\356v\022\036\n\031e_mst_l2c_bc_changeturret\020\357v\022"
    "\033\n\026e_mst_l2c_bc_lock_fish\020\360v\022\030\n\023e_mst_l2"
    "c_bc_freeze\020\361v\022\033\n\026e_mst_l2c_bc_fishs_die"
    "\020\362v\022!\n\034e_mst_l2c_bc_specialfish_die\020\363v\022!"
    "\n\034e_mst_l2c_bc_change_scene_bg\020\364v\022\034\n\027e_m"
    "st_l2c_bc_scene_time\020\365v\022\033\n\026e_mst_l2c_bc_"
    "hit_fishs\020\367v\022\037\n\032e_mst_l2c_bc_turret_rota"
    "te\020\370v\022\"\n\035e_mst_l2c_bc_change_max_power\020\371"
    "v\022\036\n\031e_mst_l2c_bc_missile_fire\020\372v\022\033\n\026e_m"
    "st_l2c_bc_debuginfo\020\373v\022\032\n\025e_mst_c2l_robo"
    "t_enter\020\200}\022\032\n\025e_mst_l2c_robot_leave\020\344}\022\027"
    "\n\021e_mst_clend_index\020\240\234\001", 2303);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "fish_monkey_def.proto", &protobuf_RegisterTypes);
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_fish_5fmonkey_5fdef_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_fish_5fmonkey_5fdef_2eproto {
  StaticDescriptorInitializer_fish_5fmonkey_5fdef_2eproto() {
    protobuf_AddDesc_fish_5fmonkey_5fdef_2eproto();
  }
} static_descriptor_initializer_fish_5fmonkey_5fdef_2eproto_;
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
    case 10100:
    case 10101:
    case 10102:
    case 10103:
    case 10104:
    case 10105:
    case 10106:
    case 10107:
    case 10108:
    case 10109:
    case 10110:
    case 10111:
    case 10112:
    case 10113:
    case 10114:
    case 10115:
    case 10116:
    case 10117:
    case 10118:
    case 15000:
    case 15001:
    case 15002:
    case 15003:
    case 15004:
    case 15005:
    case 15100:
    case 15101:
    case 15102:
    case 15103:
    case 15104:
    case 15105:
    case 15106:
    case 15107:
    case 15108:
    case 15109:
    case 15110:
    case 15111:
    case 15201:
    case 15202:
    case 15203:
    case 15204:
    case 15205:
    case 15206:
    case 15207:
    case 15208:
    case 15209:
    case 15210:
    case 15211:
    case 15212:
    case 15213:
    case 15214:
    case 15215:
    case 15216:
    case 15217:
    case 15218:
    case 15219:
    case 15220:
    case 15221:
    case 15223:
    case 15224:
    case 15225:
    case 15226:
    case 15227:
    case 16000:
    case 16100:
    case 20000:
      return true;
    default:
      return false;
  }
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace fish_protocols

// @@protoc_insertion_point(global_scope)
