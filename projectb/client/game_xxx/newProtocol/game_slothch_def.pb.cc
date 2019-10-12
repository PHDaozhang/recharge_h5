// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: game_slothch_def.proto

#define INTERNAL_SUPPRESS_PROTOBUF_FIELD_DEPRECATION
#include "game_slothch_def.pb.h"

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

namespace game_slothch_protocols {

namespace {

const ::google::protobuf::Descriptor* msg_player_info_descriptor_ = NULL;
const ::google::protobuf::internal::GeneratedMessageReflection*
  msg_player_info_reflection_ = NULL;
const ::google::protobuf::EnumDescriptor* e_server_msg_type_descriptor_ = NULL;

}  // namespace


void protobuf_AssignDesc_game_5fslothch_5fdef_2eproto() {
  protobuf_AddDesc_game_5fslothch_5fdef_2eproto();
  const ::google::protobuf::FileDescriptor* file =
    ::google::protobuf::DescriptorPool::generated_pool()->FindFileByName(
      "game_slothch_def.proto");
  GOOGLE_CHECK(file != NULL);
  msg_player_info_descriptor_ = file->message_type(0);
  static const int msg_player_info_offsets_[9] = {
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, player_id_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, player_nickname_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, player_head_frame_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, player_head_custom_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, player_gold_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, player_sex_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, player_vip_lv_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, seat_),
    GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, free_count_),
  };
  msg_player_info_reflection_ =
    new ::google::protobuf::internal::GeneratedMessageReflection(
      msg_player_info_descriptor_,
      msg_player_info::default_instance_,
      msg_player_info_offsets_,
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, _has_bits_[0]),
      GOOGLE_PROTOBUF_GENERATED_MESSAGE_FIELD_OFFSET(msg_player_info, _unknown_fields_),
      -1,
      ::google::protobuf::DescriptorPool::generated_pool(),
      ::google::protobuf::MessageFactory::generated_factory(),
      sizeof(msg_player_info));
  e_server_msg_type_descriptor_ = file->enum_type(0);
}

namespace {

GOOGLE_PROTOBUF_DECLARE_ONCE(protobuf_AssignDescriptors_once_);
inline void protobuf_AssignDescriptorsOnce() {
  ::google::protobuf::GoogleOnceInit(&protobuf_AssignDescriptors_once_,
                 &protobuf_AssignDesc_game_5fslothch_5fdef_2eproto);
}

void protobuf_RegisterTypes(const ::std::string&) {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedMessage(
    msg_player_info_descriptor_, &msg_player_info::default_instance());
}

}  // namespace

void protobuf_ShutdownFile_game_5fslothch_5fdef_2eproto() {
  delete msg_player_info::default_instance_;
  delete msg_player_info_reflection_;
}

void protobuf_AddDesc_game_5fslothch_5fdef_2eproto() {
  static bool already_here = false;
  if (already_here) return;
  already_here = true;
  GOOGLE_PROTOBUF_VERIFY_VERSION;

  ::google::protobuf::DescriptorPool::InternalAddGeneratedFile(
    "\n\026game_slothch_def.proto\022\026game_slothch_p"
    "rotocols\"\326\001\n\017msg_player_info\022\021\n\tplayer_i"
    "d\030\001 \001(\005\022\027\n\017player_nickname\030\002 \001(\t\022\031\n\021play"
    "er_head_frame\030\003 \001(\005\022\032\n\022player_head_custo"
    "m\030\004 \001(\t\022\023\n\013player_gold\030\005 \001(\003\022\022\n\nplayer_s"
    "ex\030\006 \001(\005\022\025\n\rplayer_vip_lv\030\007 \001(\005\022\014\n\004seat\030"
    "\010 \001(\005\022\022\n\nfree_count\030\t \001(\005*\306\n\n\021e_server_m"
    "sg_type\022\024\n\017e_mst_start_c2l\020\220N\022\032\n\025e_mst_c"
    "2l_check_state\020\221N\022\031\n\024e_mst_c2l_enter_gam"
    "e\020\222N\022\031\n\024e_mst_c2l_leave_game\020\223N\022\030\n\023e_mst"
    "_c2l_star_game\020\224N\022\035\n\030e_mst_c2l_req_bonus"
    "_game\020\225N\022\036\n\031e_mst_c2l_req_double_game\020\226N"
    "\022\034\n\027e_mst_c2l_get_room_info\020\227N\022\037\n\032e_mst_"
    "c2l_req_game_lottery\020\230N\022%\n e_mst_c2l_req"
    "_game_lottery_count\020\231N\022\032\n\025e_mst_c2l_supp"
    "ly_chip\020\245N\022\"\n\035e_mst_c2l_get_room_scene_i"
    "nfo\020\246N\022\031\n\024e_mst_c2l_settlement\020\247N\022\032\n\025e_m"
    "st_c2l_replay_list\020\250N\022\034\n\027e_mst_c2l_repla"
    "y_detail\020\251N\022\037\n\032e_mst_c2l_gm_get_room_inf"
    "o\020\365N\022\031\n\024e_mst_c2l_gm_do_kill\020\366N\022\024\n\017e_mst"
    "_start_l2c\020\230u\022!\n\034e_mst_l2c_check_state_r"
    "esult\020\231u\022 \n\033e_mst_l2c_enter_game_result\020"
    "\232u\022 \n\033e_mst_l2c_leave_game_result\020\233u\022\037\n\032"
    "e_mst_l2c_star_game_result\020\234u\022$\n\037e_mst_l"
    "2c_req_bonus_game_result\020\235u\022%\n e_mst_l2c"
    "_req_double_game_result\020\236u\022#\n\036e_mst_l2c_"
    "get_room_info_result\020\237u\022 \n\033e_mst_l2c_ent"
    "er_player_info\020\240u\022 \n\033e_mst_l2c_leave_pla"
    "yer_info\020\241u\022\"\n\035e_mst_l2c_player_change_m"
    "oney\020\242u\022\035\n\030e_mst_l2c_bc_change_attr\020\243u\022&"
    "\n!e_mst_l2c_req_game_lottery_result\020\244u\022,"
    "\n\'e_mst_l2c_req_game_lottery_count_resul"
    "t\020\245u\022!\n\034e_mst_l2c_supply_chip_result\020\255u\022"
    "\"\n\035e_mst_l2c_get_room_scene_info\020\256u\022 \n\033e"
    "_mst_l2c_settlement_result\020\257u\022!\n\034e_mst_l"
    "2c_replay_list_result\020\260u\022#\n\036e_mst_l2c_re"
    "play_detail_result\020\261u\022\035\n\030e_mst_l2c_lotte"
    "ry_update\020\262u\022\031\n\024e_mst_l2c_scene_sync\020\263u\022"
    "&\n!e_mst_l2c_gm_get_room_info_result\020\375u\022"
    " \n\033e_mst_l2c_gm_do_kill_result\020\376u\022\027\n\021e_m"
    "st_clend_index\020\240\234\001", 1618);
  ::google::protobuf::MessageFactory::InternalRegisterGeneratedFile(
    "game_slothch_def.proto", &protobuf_RegisterTypes);
  msg_player_info::default_instance_ = new msg_player_info();
  msg_player_info::default_instance_->InitAsDefaultInstance();
  ::google::protobuf::internal::OnShutdown(&protobuf_ShutdownFile_game_5fslothch_5fdef_2eproto);
}

// Force AddDescriptors() to be called at static initialization time.
struct StaticDescriptorInitializer_game_5fslothch_5fdef_2eproto {
  StaticDescriptorInitializer_game_5fslothch_5fdef_2eproto() {
    protobuf_AddDesc_game_5fslothch_5fdef_2eproto();
  }
} static_descriptor_initializer_game_5fslothch_5fdef_2eproto_;
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
    case 10021:
    case 10022:
    case 10023:
    case 10024:
    case 10025:
    case 10101:
    case 10102:
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
    case 15011:
    case 15012:
    case 15013:
    case 15021:
    case 15022:
    case 15023:
    case 15024:
    case 15025:
    case 15026:
    case 15027:
    case 15101:
    case 15102:
    case 20000:
      return true;
    default:
      return false;
  }
}


// ===================================================================

#ifndef _MSC_VER
const int msg_player_info::kPlayerIdFieldNumber;
const int msg_player_info::kPlayerNicknameFieldNumber;
const int msg_player_info::kPlayerHeadFrameFieldNumber;
const int msg_player_info::kPlayerHeadCustomFieldNumber;
const int msg_player_info::kPlayerGoldFieldNumber;
const int msg_player_info::kPlayerSexFieldNumber;
const int msg_player_info::kPlayerVipLvFieldNumber;
const int msg_player_info::kSeatFieldNumber;
const int msg_player_info::kFreeCountFieldNumber;
#endif  // !_MSC_VER

msg_player_info::msg_player_info()
  : ::google::protobuf::Message() {
  SharedCtor();
}

void msg_player_info::InitAsDefaultInstance() {
}

msg_player_info::msg_player_info(const msg_player_info& from)
  : ::google::protobuf::Message() {
  SharedCtor();
  MergeFrom(from);
}

void msg_player_info::SharedCtor() {
  _cached_size_ = 0;
  player_id_ = 0;
  player_nickname_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
  player_head_frame_ = 0;
  player_head_custom_ = const_cast< ::std::string*>(&::google::protobuf::internal::kEmptyString);
  player_gold_ = GOOGLE_LONGLONG(0);
  player_sex_ = 0;
  player_vip_lv_ = 0;
  seat_ = 0;
  free_count_ = 0;
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
}

msg_player_info::~msg_player_info() {
  SharedDtor();
}

void msg_player_info::SharedDtor() {
  if (player_nickname_ != &::google::protobuf::internal::kEmptyString) {
    delete player_nickname_;
  }
  if (player_head_custom_ != &::google::protobuf::internal::kEmptyString) {
    delete player_head_custom_;
  }
  if (this != default_instance_) {
  }
}

void msg_player_info::SetCachedSize(int size) const {
  GOOGLE_SAFE_CONCURRENT_WRITES_BEGIN();
  _cached_size_ = size;
  GOOGLE_SAFE_CONCURRENT_WRITES_END();
}
const ::google::protobuf::Descriptor* msg_player_info::descriptor() {
  protobuf_AssignDescriptorsOnce();
  return msg_player_info_descriptor_;
}

const msg_player_info& msg_player_info::default_instance() {
  if (default_instance_ == NULL) protobuf_AddDesc_game_5fslothch_5fdef_2eproto();
  return *default_instance_;
}

msg_player_info* msg_player_info::default_instance_ = NULL;

msg_player_info* msg_player_info::New() const {
  return new msg_player_info;
}

void msg_player_info::Clear() {
  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    player_id_ = 0;
    if (has_player_nickname()) {
      if (player_nickname_ != &::google::protobuf::internal::kEmptyString) {
        player_nickname_->clear();
      }
    }
    player_head_frame_ = 0;
    if (has_player_head_custom()) {
      if (player_head_custom_ != &::google::protobuf::internal::kEmptyString) {
        player_head_custom_->clear();
      }
    }
    player_gold_ = GOOGLE_LONGLONG(0);
    player_sex_ = 0;
    player_vip_lv_ = 0;
    seat_ = 0;
  }
  if (_has_bits_[8 / 32] & (0xffu << (8 % 32))) {
    free_count_ = 0;
  }
  ::memset(_has_bits_, 0, sizeof(_has_bits_));
  mutable_unknown_fields()->Clear();
}

bool msg_player_info::MergePartialFromCodedStream(
    ::google::protobuf::io::CodedInputStream* input) {
#define DO_(EXPRESSION) if (!(EXPRESSION)) return false
  ::google::protobuf::uint32 tag;
  while ((tag = input->ReadTag()) != 0) {
    switch (::google::protobuf::internal::WireFormatLite::GetTagFieldNumber(tag)) {
      // optional int32 player_id = 1;
      case 1: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &player_id_)));
          set_has_player_id();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(18)) goto parse_player_nickname;
        break;
      }

      // optional string player_nickname = 2;
      case 2: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_LENGTH_DELIMITED) {
         parse_player_nickname:
          DO_(::google::protobuf::internal::WireFormatLite::ReadString(
                input, this->mutable_player_nickname()));
          ::google::protobuf::internal::WireFormat::VerifyUTF8String(
            this->player_nickname().data(), this->player_nickname().length(),
            ::google::protobuf::internal::WireFormat::PARSE);
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(24)) goto parse_player_head_frame;
        break;
      }

      // optional int32 player_head_frame = 3;
      case 3: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_player_head_frame:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &player_head_frame_)));
          set_has_player_head_frame();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(34)) goto parse_player_head_custom;
        break;
      }

      // optional string player_head_custom = 4;
      case 4: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_LENGTH_DELIMITED) {
         parse_player_head_custom:
          DO_(::google::protobuf::internal::WireFormatLite::ReadString(
                input, this->mutable_player_head_custom()));
          ::google::protobuf::internal::WireFormat::VerifyUTF8String(
            this->player_head_custom().data(), this->player_head_custom().length(),
            ::google::protobuf::internal::WireFormat::PARSE);
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(40)) goto parse_player_gold;
        break;
      }

      // optional int64 player_gold = 5;
      case 5: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_player_gold:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int64, ::google::protobuf::internal::WireFormatLite::TYPE_INT64>(
                 input, &player_gold_)));
          set_has_player_gold();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(48)) goto parse_player_sex;
        break;
      }

      // optional int32 player_sex = 6;
      case 6: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_player_sex:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &player_sex_)));
          set_has_player_sex();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(56)) goto parse_player_vip_lv;
        break;
      }

      // optional int32 player_vip_lv = 7;
      case 7: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_player_vip_lv:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &player_vip_lv_)));
          set_has_player_vip_lv();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(64)) goto parse_seat;
        break;
      }

      // optional int32 seat = 8;
      case 8: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_seat:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &seat_)));
          set_has_seat();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectTag(72)) goto parse_free_count;
        break;
      }

      // optional int32 free_count = 9;
      case 9: {
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_VARINT) {
         parse_free_count:
          DO_((::google::protobuf::internal::WireFormatLite::ReadPrimitive<
                   ::google::protobuf::int32, ::google::protobuf::internal::WireFormatLite::TYPE_INT32>(
                 input, &free_count_)));
          set_has_free_count();
        } else {
          goto handle_uninterpreted;
        }
        if (input->ExpectAtEnd()) return true;
        break;
      }

      default: {
      handle_uninterpreted:
        if (::google::protobuf::internal::WireFormatLite::GetTagWireType(tag) ==
            ::google::protobuf::internal::WireFormatLite::WIRETYPE_END_GROUP) {
          return true;
        }
        DO_(::google::protobuf::internal::WireFormat::SkipField(
              input, tag, mutable_unknown_fields()));
        break;
      }
    }
  }
  return true;
#undef DO_
}

void msg_player_info::SerializeWithCachedSizes(
    ::google::protobuf::io::CodedOutputStream* output) const {
  // optional int32 player_id = 1;
  if (has_player_id()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(1, this->player_id(), output);
  }

  // optional string player_nickname = 2;
  if (has_player_nickname()) {
    ::google::protobuf::internal::WireFormat::VerifyUTF8String(
      this->player_nickname().data(), this->player_nickname().length(),
      ::google::protobuf::internal::WireFormat::SERIALIZE);
    ::google::protobuf::internal::WireFormatLite::WriteString(
      2, this->player_nickname(), output);
  }

  // optional int32 player_head_frame = 3;
  if (has_player_head_frame()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(3, this->player_head_frame(), output);
  }

  // optional string player_head_custom = 4;
  if (has_player_head_custom()) {
    ::google::protobuf::internal::WireFormat::VerifyUTF8String(
      this->player_head_custom().data(), this->player_head_custom().length(),
      ::google::protobuf::internal::WireFormat::SERIALIZE);
    ::google::protobuf::internal::WireFormatLite::WriteString(
      4, this->player_head_custom(), output);
  }

  // optional int64 player_gold = 5;
  if (has_player_gold()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt64(5, this->player_gold(), output);
  }

  // optional int32 player_sex = 6;
  if (has_player_sex()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(6, this->player_sex(), output);
  }

  // optional int32 player_vip_lv = 7;
  if (has_player_vip_lv()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(7, this->player_vip_lv(), output);
  }

  // optional int32 seat = 8;
  if (has_seat()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(8, this->seat(), output);
  }

  // optional int32 free_count = 9;
  if (has_free_count()) {
    ::google::protobuf::internal::WireFormatLite::WriteInt32(9, this->free_count(), output);
  }

  if (!unknown_fields().empty()) {
    ::google::protobuf::internal::WireFormat::SerializeUnknownFields(
        unknown_fields(), output);
  }
}

::google::protobuf::uint8* msg_player_info::SerializeWithCachedSizesToArray(
    ::google::protobuf::uint8* target) const {
  // optional int32 player_id = 1;
  if (has_player_id()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(1, this->player_id(), target);
  }

  // optional string player_nickname = 2;
  if (has_player_nickname()) {
    ::google::protobuf::internal::WireFormat::VerifyUTF8String(
      this->player_nickname().data(), this->player_nickname().length(),
      ::google::protobuf::internal::WireFormat::SERIALIZE);
    target =
      ::google::protobuf::internal::WireFormatLite::WriteStringToArray(
        2, this->player_nickname(), target);
  }

  // optional int32 player_head_frame = 3;
  if (has_player_head_frame()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(3, this->player_head_frame(), target);
  }

  // optional string player_head_custom = 4;
  if (has_player_head_custom()) {
    ::google::protobuf::internal::WireFormat::VerifyUTF8String(
      this->player_head_custom().data(), this->player_head_custom().length(),
      ::google::protobuf::internal::WireFormat::SERIALIZE);
    target =
      ::google::protobuf::internal::WireFormatLite::WriteStringToArray(
        4, this->player_head_custom(), target);
  }

  // optional int64 player_gold = 5;
  if (has_player_gold()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt64ToArray(5, this->player_gold(), target);
  }

  // optional int32 player_sex = 6;
  if (has_player_sex()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(6, this->player_sex(), target);
  }

  // optional int32 player_vip_lv = 7;
  if (has_player_vip_lv()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(7, this->player_vip_lv(), target);
  }

  // optional int32 seat = 8;
  if (has_seat()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(8, this->seat(), target);
  }

  // optional int32 free_count = 9;
  if (has_free_count()) {
    target = ::google::protobuf::internal::WireFormatLite::WriteInt32ToArray(9, this->free_count(), target);
  }

  if (!unknown_fields().empty()) {
    target = ::google::protobuf::internal::WireFormat::SerializeUnknownFieldsToArray(
        unknown_fields(), target);
  }
  return target;
}

int msg_player_info::ByteSize() const {
  int total_size = 0;

  if (_has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    // optional int32 player_id = 1;
    if (has_player_id()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->player_id());
    }

    // optional string player_nickname = 2;
    if (has_player_nickname()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::StringSize(
          this->player_nickname());
    }

    // optional int32 player_head_frame = 3;
    if (has_player_head_frame()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->player_head_frame());
    }

    // optional string player_head_custom = 4;
    if (has_player_head_custom()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::StringSize(
          this->player_head_custom());
    }

    // optional int64 player_gold = 5;
    if (has_player_gold()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int64Size(
          this->player_gold());
    }

    // optional int32 player_sex = 6;
    if (has_player_sex()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->player_sex());
    }

    // optional int32 player_vip_lv = 7;
    if (has_player_vip_lv()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->player_vip_lv());
    }

    // optional int32 seat = 8;
    if (has_seat()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->seat());
    }

  }
  if (_has_bits_[8 / 32] & (0xffu << (8 % 32))) {
    // optional int32 free_count = 9;
    if (has_free_count()) {
      total_size += 1 +
        ::google::protobuf::internal::WireFormatLite::Int32Size(
          this->free_count());
    }

  }
  if (!unknown_fields().empty()) {
    total_size +=
      ::google::protobuf::internal::WireFormat::ComputeUnknownFieldsSize(
        unknown_fields());
  }
  GOOGLE_SAFE_CONCURRENT_WRITES_BEGIN();
  _cached_size_ = total_size;
  GOOGLE_SAFE_CONCURRENT_WRITES_END();
  return total_size;
}

void msg_player_info::MergeFrom(const ::google::protobuf::Message& from) {
  GOOGLE_CHECK_NE(&from, this);
  const msg_player_info* source =
    ::google::protobuf::internal::dynamic_cast_if_available<const msg_player_info*>(
      &from);
  if (source == NULL) {
    ::google::protobuf::internal::ReflectionOps::Merge(from, this);
  } else {
    MergeFrom(*source);
  }
}

void msg_player_info::MergeFrom(const msg_player_info& from) {
  GOOGLE_CHECK_NE(&from, this);
  if (from._has_bits_[0 / 32] & (0xffu << (0 % 32))) {
    if (from.has_player_id()) {
      set_player_id(from.player_id());
    }
    if (from.has_player_nickname()) {
      set_player_nickname(from.player_nickname());
    }
    if (from.has_player_head_frame()) {
      set_player_head_frame(from.player_head_frame());
    }
    if (from.has_player_head_custom()) {
      set_player_head_custom(from.player_head_custom());
    }
    if (from.has_player_gold()) {
      set_player_gold(from.player_gold());
    }
    if (from.has_player_sex()) {
      set_player_sex(from.player_sex());
    }
    if (from.has_player_vip_lv()) {
      set_player_vip_lv(from.player_vip_lv());
    }
    if (from.has_seat()) {
      set_seat(from.seat());
    }
  }
  if (from._has_bits_[8 / 32] & (0xffu << (8 % 32))) {
    if (from.has_free_count()) {
      set_free_count(from.free_count());
    }
  }
  mutable_unknown_fields()->MergeFrom(from.unknown_fields());
}

void msg_player_info::CopyFrom(const ::google::protobuf::Message& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

void msg_player_info::CopyFrom(const msg_player_info& from) {
  if (&from == this) return;
  Clear();
  MergeFrom(from);
}

bool msg_player_info::IsInitialized() const {

  return true;
}

void msg_player_info::Swap(msg_player_info* other) {
  if (other != this) {
    std::swap(player_id_, other->player_id_);
    std::swap(player_nickname_, other->player_nickname_);
    std::swap(player_head_frame_, other->player_head_frame_);
    std::swap(player_head_custom_, other->player_head_custom_);
    std::swap(player_gold_, other->player_gold_);
    std::swap(player_sex_, other->player_sex_);
    std::swap(player_vip_lv_, other->player_vip_lv_);
    std::swap(seat_, other->seat_);
    std::swap(free_count_, other->free_count_);
    std::swap(_has_bits_[0], other->_has_bits_[0]);
    _unknown_fields_.Swap(&other->_unknown_fields_);
    std::swap(_cached_size_, other->_cached_size_);
  }
}

::google::protobuf::Metadata msg_player_info::GetMetadata() const {
  protobuf_AssignDescriptorsOnce();
  ::google::protobuf::Metadata metadata;
  metadata.descriptor = msg_player_info_descriptor_;
  metadata.reflection = msg_player_info_reflection_;
  return metadata;
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace game_slothch_protocols

// @@protoc_insertion_point(global_scope)