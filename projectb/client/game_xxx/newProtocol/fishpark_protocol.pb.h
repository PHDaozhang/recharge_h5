// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: fishpark_protocol.proto

#ifndef PROTOBUF_fishpark_5fprotocol_2eproto__INCLUDED
#define PROTOBUF_fishpark_5fprotocol_2eproto__INCLUDED

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
#include <google/protobuf/message.h>
#include <google/protobuf/repeated_field.h>
#include <google/protobuf/extension_set.h>
#include <google/protobuf/unknown_field_set.h>
#include "fishpark_def.pb.h"
#include "msg_type_def.pb.h"
// @@protoc_insertion_point(includes)

namespace fishpark_protocols {

// Internal implementation detail -- do not call these.
void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

class packetc2l_enter_table;
class packetl2c_enter_table_result;
class packetc2l_change_table;
class packetl2c_change_table_result;
class packetc2l_leave_table;
class packetl2c_leave_table_result;
class packetc2l_check_state;
class packetl2c_check_state_result;

// ===================================================================

class packetc2l_enter_table : public ::google::protobuf::Message {
 public:
  packetc2l_enter_table();
  virtual ~packetc2l_enter_table();

  packetc2l_enter_table(const packetc2l_enter_table& from);

  inline packetc2l_enter_table& operator=(const packetc2l_enter_table& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const packetc2l_enter_table& default_instance();

  void Swap(packetc2l_enter_table* other);

  // implements Message ----------------------------------------------

  packetc2l_enter_table* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const packetc2l_enter_table& from);
  void MergeFrom(const packetc2l_enter_table& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_c2l_enter_table];
  inline bool has_packet_id() const;
  inline void clear_packet_id();
  static const int kPacketIdFieldNumber = 1;
  inline ::fishpark_protocols::e_server_msg_type packet_id() const;
  inline void set_packet_id(::fishpark_protocols::e_server_msg_type value);

  // optional int32 roomid = 2 [default = 0];
  inline bool has_roomid() const;
  inline void clear_roomid();
  static const int kRoomidFieldNumber = 2;
  inline ::google::protobuf::int32 roomid() const;
  inline void set_roomid(::google::protobuf::int32 value);

  // @@protoc_insertion_point(class_scope:fishpark_protocols.packetc2l_enter_table)
 private:
  inline void set_has_packet_id();
  inline void clear_has_packet_id();
  inline void set_has_roomid();
  inline void clear_has_roomid();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  int packet_id_;
  ::google::protobuf::int32 roomid_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(2 + 31) / 32];

  friend void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

  void InitAsDefaultInstance();
  static packetc2l_enter_table* default_instance_;
};
// -------------------------------------------------------------------

class packetl2c_enter_table_result : public ::google::protobuf::Message {
 public:
  packetl2c_enter_table_result();
  virtual ~packetl2c_enter_table_result();

  packetl2c_enter_table_result(const packetl2c_enter_table_result& from);

  inline packetl2c_enter_table_result& operator=(const packetl2c_enter_table_result& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const packetl2c_enter_table_result& default_instance();

  void Swap(packetl2c_enter_table_result* other);

  // implements Message ----------------------------------------------

  packetl2c_enter_table_result* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const packetl2c_enter_table_result& from);
  void MergeFrom(const packetl2c_enter_table_result& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_l2c_enter_table_result];
  inline bool has_packet_id() const;
  inline void clear_packet_id();
  static const int kPacketIdFieldNumber = 1;
  inline ::fishpark_protocols::e_server_msg_type packet_id() const;
  inline void set_packet_id(::fishpark_protocols::e_server_msg_type value);

  // optional .msg_type_def.e_msg_result_def result = 2 [default = e_rmt_fail];
  inline bool has_result() const;
  inline void clear_result();
  static const int kResultFieldNumber = 2;
  inline ::msg_type_def::e_msg_result_def result() const;
  inline void set_result(::msg_type_def::e_msg_result_def value);

  // @@protoc_insertion_point(class_scope:fishpark_protocols.packetl2c_enter_table_result)
 private:
  inline void set_has_packet_id();
  inline void clear_has_packet_id();
  inline void set_has_result();
  inline void clear_has_result();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  int packet_id_;
  int result_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(2 + 31) / 32];

  friend void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

  void InitAsDefaultInstance();
  static packetl2c_enter_table_result* default_instance_;
};
// -------------------------------------------------------------------

class packetc2l_change_table : public ::google::protobuf::Message {
 public:
  packetc2l_change_table();
  virtual ~packetc2l_change_table();

  packetc2l_change_table(const packetc2l_change_table& from);

  inline packetc2l_change_table& operator=(const packetc2l_change_table& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const packetc2l_change_table& default_instance();

  void Swap(packetc2l_change_table* other);

  // implements Message ----------------------------------------------

  packetc2l_change_table* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const packetc2l_change_table& from);
  void MergeFrom(const packetc2l_change_table& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_c2l_change_table];
  inline bool has_packet_id() const;
  inline void clear_packet_id();
  static const int kPacketIdFieldNumber = 1;
  inline ::fishpark_protocols::e_server_msg_type packet_id() const;
  inline void set_packet_id(::fishpark_protocols::e_server_msg_type value);

  // @@protoc_insertion_point(class_scope:fishpark_protocols.packetc2l_change_table)
 private:
  inline void set_has_packet_id();
  inline void clear_has_packet_id();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  int packet_id_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(1 + 31) / 32];

  friend void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

  void InitAsDefaultInstance();
  static packetc2l_change_table* default_instance_;
};
// -------------------------------------------------------------------

class packetl2c_change_table_result : public ::google::protobuf::Message {
 public:
  packetl2c_change_table_result();
  virtual ~packetl2c_change_table_result();

  packetl2c_change_table_result(const packetl2c_change_table_result& from);

  inline packetl2c_change_table_result& operator=(const packetl2c_change_table_result& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const packetl2c_change_table_result& default_instance();

  void Swap(packetl2c_change_table_result* other);

  // implements Message ----------------------------------------------

  packetl2c_change_table_result* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const packetl2c_change_table_result& from);
  void MergeFrom(const packetl2c_change_table_result& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_l2c_change_table_result];
  inline bool has_packet_id() const;
  inline void clear_packet_id();
  static const int kPacketIdFieldNumber = 1;
  inline ::fishpark_protocols::e_server_msg_type packet_id() const;
  inline void set_packet_id(::fishpark_protocols::e_server_msg_type value);

  // optional .msg_type_def.e_msg_result_def result = 2 [default = e_rmt_fail];
  inline bool has_result() const;
  inline void clear_result();
  static const int kResultFieldNumber = 2;
  inline ::msg_type_def::e_msg_result_def result() const;
  inline void set_result(::msg_type_def::e_msg_result_def value);

  // @@protoc_insertion_point(class_scope:fishpark_protocols.packetl2c_change_table_result)
 private:
  inline void set_has_packet_id();
  inline void clear_has_packet_id();
  inline void set_has_result();
  inline void clear_has_result();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  int packet_id_;
  int result_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(2 + 31) / 32];

  friend void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

  void InitAsDefaultInstance();
  static packetl2c_change_table_result* default_instance_;
};
// -------------------------------------------------------------------

class packetc2l_leave_table : public ::google::protobuf::Message {
 public:
  packetc2l_leave_table();
  virtual ~packetc2l_leave_table();

  packetc2l_leave_table(const packetc2l_leave_table& from);

  inline packetc2l_leave_table& operator=(const packetc2l_leave_table& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const packetc2l_leave_table& default_instance();

  void Swap(packetc2l_leave_table* other);

  // implements Message ----------------------------------------------

  packetc2l_leave_table* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const packetc2l_leave_table& from);
  void MergeFrom(const packetc2l_leave_table& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_c2l_leave_table];
  inline bool has_packet_id() const;
  inline void clear_packet_id();
  static const int kPacketIdFieldNumber = 1;
  inline ::fishpark_protocols::e_server_msg_type packet_id() const;
  inline void set_packet_id(::fishpark_protocols::e_server_msg_type value);

  // @@protoc_insertion_point(class_scope:fishpark_protocols.packetc2l_leave_table)
 private:
  inline void set_has_packet_id();
  inline void clear_has_packet_id();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  int packet_id_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(1 + 31) / 32];

  friend void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

  void InitAsDefaultInstance();
  static packetc2l_leave_table* default_instance_;
};
// -------------------------------------------------------------------

class packetl2c_leave_table_result : public ::google::protobuf::Message {
 public:
  packetl2c_leave_table_result();
  virtual ~packetl2c_leave_table_result();

  packetl2c_leave_table_result(const packetl2c_leave_table_result& from);

  inline packetl2c_leave_table_result& operator=(const packetl2c_leave_table_result& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const packetl2c_leave_table_result& default_instance();

  void Swap(packetl2c_leave_table_result* other);

  // implements Message ----------------------------------------------

  packetl2c_leave_table_result* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const packetl2c_leave_table_result& from);
  void MergeFrom(const packetl2c_leave_table_result& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_l2c_leave_table_result];
  inline bool has_packet_id() const;
  inline void clear_packet_id();
  static const int kPacketIdFieldNumber = 1;
  inline ::fishpark_protocols::e_server_msg_type packet_id() const;
  inline void set_packet_id(::fishpark_protocols::e_server_msg_type value);

  // optional int32 sync_gold = 2;
  inline bool has_sync_gold() const;
  inline void clear_sync_gold();
  static const int kSyncGoldFieldNumber = 2;
  inline ::google::protobuf::int32 sync_gold() const;
  inline void set_sync_gold(::google::protobuf::int32 value);

  // @@protoc_insertion_point(class_scope:fishpark_protocols.packetl2c_leave_table_result)
 private:
  inline void set_has_packet_id();
  inline void clear_has_packet_id();
  inline void set_has_sync_gold();
  inline void clear_has_sync_gold();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  int packet_id_;
  ::google::protobuf::int32 sync_gold_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(2 + 31) / 32];

  friend void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

  void InitAsDefaultInstance();
  static packetl2c_leave_table_result* default_instance_;
};
// -------------------------------------------------------------------

class packetc2l_check_state : public ::google::protobuf::Message {
 public:
  packetc2l_check_state();
  virtual ~packetc2l_check_state();

  packetc2l_check_state(const packetc2l_check_state& from);

  inline packetc2l_check_state& operator=(const packetc2l_check_state& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const packetc2l_check_state& default_instance();

  void Swap(packetc2l_check_state* other);

  // implements Message ----------------------------------------------

  packetc2l_check_state* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const packetc2l_check_state& from);
  void MergeFrom(const packetc2l_check_state& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_c2l_check_state];
  inline bool has_packet_id() const;
  inline void clear_packet_id();
  static const int kPacketIdFieldNumber = 1;
  inline ::fishpark_protocols::e_server_msg_type packet_id() const;
  inline void set_packet_id(::fishpark_protocols::e_server_msg_type value);

  // @@protoc_insertion_point(class_scope:fishpark_protocols.packetc2l_check_state)
 private:
  inline void set_has_packet_id();
  inline void clear_has_packet_id();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  int packet_id_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(1 + 31) / 32];

  friend void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

  void InitAsDefaultInstance();
  static packetc2l_check_state* default_instance_;
};
// -------------------------------------------------------------------

class packetl2c_check_state_result : public ::google::protobuf::Message {
 public:
  packetl2c_check_state_result();
  virtual ~packetl2c_check_state_result();

  packetl2c_check_state_result(const packetl2c_check_state_result& from);

  inline packetl2c_check_state_result& operator=(const packetl2c_check_state_result& from) {
    CopyFrom(from);
    return *this;
  }

  inline const ::google::protobuf::UnknownFieldSet& unknown_fields() const {
    return _unknown_fields_;
  }

  inline ::google::protobuf::UnknownFieldSet* mutable_unknown_fields() {
    return &_unknown_fields_;
  }

  static const ::google::protobuf::Descriptor* descriptor();
  static const packetl2c_check_state_result& default_instance();

  void Swap(packetl2c_check_state_result* other);

  // implements Message ----------------------------------------------

  packetl2c_check_state_result* New() const;
  void CopyFrom(const ::google::protobuf::Message& from);
  void MergeFrom(const ::google::protobuf::Message& from);
  void CopyFrom(const packetl2c_check_state_result& from);
  void MergeFrom(const packetl2c_check_state_result& from);
  void Clear();
  bool IsInitialized() const;

  int ByteSize() const;
  bool MergePartialFromCodedStream(
      ::google::protobuf::io::CodedInputStream* input);
  void SerializeWithCachedSizes(
      ::google::protobuf::io::CodedOutputStream* output) const;
  ::google::protobuf::uint8* SerializeWithCachedSizesToArray(::google::protobuf::uint8* output) const;
  int GetCachedSize() const { return _cached_size_; }
  private:
  void SharedCtor();
  void SharedDtor();
  void SetCachedSize(int size) const;
  public:

  ::google::protobuf::Metadata GetMetadata() const;

  // nested types ----------------------------------------------------

  // accessors -------------------------------------------------------

  // optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_l2c_check_state_result];
  inline bool has_packet_id() const;
  inline void clear_packet_id();
  static const int kPacketIdFieldNumber = 1;
  inline ::fishpark_protocols::e_server_msg_type packet_id() const;
  inline void set_packet_id(::fishpark_protocols::e_server_msg_type value);

  // optional bool is_intable = 2 [default = false];
  inline bool has_is_intable() const;
  inline void clear_is_intable();
  static const int kIsIntableFieldNumber = 2;
  inline bool is_intable() const;
  inline void set_is_intable(bool value);

  // @@protoc_insertion_point(class_scope:fishpark_protocols.packetl2c_check_state_result)
 private:
  inline void set_has_packet_id();
  inline void clear_has_packet_id();
  inline void set_has_is_intable();
  inline void clear_has_is_intable();

  ::google::protobuf::UnknownFieldSet _unknown_fields_;

  int packet_id_;
  bool is_intable_;

  mutable int _cached_size_;
  ::google::protobuf::uint32 _has_bits_[(2 + 31) / 32];

  friend void  protobuf_AddDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_AssignDesc_fishpark_5fprotocol_2eproto();
  friend void protobuf_ShutdownFile_fishpark_5fprotocol_2eproto();

  void InitAsDefaultInstance();
  static packetl2c_check_state_result* default_instance_;
};
// ===================================================================


// ===================================================================

// packetc2l_enter_table

// optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_c2l_enter_table];
inline bool packetc2l_enter_table::has_packet_id() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void packetc2l_enter_table::set_has_packet_id() {
  _has_bits_[0] |= 0x00000001u;
}
inline void packetc2l_enter_table::clear_has_packet_id() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void packetc2l_enter_table::clear_packet_id() {
  packet_id_ = 10002;
  clear_has_packet_id();
}
inline ::fishpark_protocols::e_server_msg_type packetc2l_enter_table::packet_id() const {
  return static_cast< ::fishpark_protocols::e_server_msg_type >(packet_id_);
}
inline void packetc2l_enter_table::set_packet_id(::fishpark_protocols::e_server_msg_type value) {
  assert(::fishpark_protocols::e_server_msg_type_IsValid(value));
  set_has_packet_id();
  packet_id_ = value;
}

// optional int32 roomid = 2 [default = 0];
inline bool packetc2l_enter_table::has_roomid() const {
  return (_has_bits_[0] & 0x00000002u) != 0;
}
inline void packetc2l_enter_table::set_has_roomid() {
  _has_bits_[0] |= 0x00000002u;
}
inline void packetc2l_enter_table::clear_has_roomid() {
  _has_bits_[0] &= ~0x00000002u;
}
inline void packetc2l_enter_table::clear_roomid() {
  roomid_ = 0;
  clear_has_roomid();
}
inline ::google::protobuf::int32 packetc2l_enter_table::roomid() const {
  return roomid_;
}
inline void packetc2l_enter_table::set_roomid(::google::protobuf::int32 value) {
  set_has_roomid();
  roomid_ = value;
}

// -------------------------------------------------------------------

// packetl2c_enter_table_result

// optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_l2c_enter_table_result];
inline bool packetl2c_enter_table_result::has_packet_id() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void packetl2c_enter_table_result::set_has_packet_id() {
  _has_bits_[0] |= 0x00000001u;
}
inline void packetl2c_enter_table_result::clear_has_packet_id() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void packetl2c_enter_table_result::clear_packet_id() {
  packet_id_ = 15002;
  clear_has_packet_id();
}
inline ::fishpark_protocols::e_server_msg_type packetl2c_enter_table_result::packet_id() const {
  return static_cast< ::fishpark_protocols::e_server_msg_type >(packet_id_);
}
inline void packetl2c_enter_table_result::set_packet_id(::fishpark_protocols::e_server_msg_type value) {
  assert(::fishpark_protocols::e_server_msg_type_IsValid(value));
  set_has_packet_id();
  packet_id_ = value;
}

// optional .msg_type_def.e_msg_result_def result = 2 [default = e_rmt_fail];
inline bool packetl2c_enter_table_result::has_result() const {
  return (_has_bits_[0] & 0x00000002u) != 0;
}
inline void packetl2c_enter_table_result::set_has_result() {
  _has_bits_[0] |= 0x00000002u;
}
inline void packetl2c_enter_table_result::clear_has_result() {
  _has_bits_[0] &= ~0x00000002u;
}
inline void packetl2c_enter_table_result::clear_result() {
  result_ = 2;
  clear_has_result();
}
inline ::msg_type_def::e_msg_result_def packetl2c_enter_table_result::result() const {
  return static_cast< ::msg_type_def::e_msg_result_def >(result_);
}
inline void packetl2c_enter_table_result::set_result(::msg_type_def::e_msg_result_def value) {
  assert(::msg_type_def::e_msg_result_def_IsValid(value));
  set_has_result();
  result_ = value;
}

// -------------------------------------------------------------------

// packetc2l_change_table

// optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_c2l_change_table];
inline bool packetc2l_change_table::has_packet_id() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void packetc2l_change_table::set_has_packet_id() {
  _has_bits_[0] |= 0x00000001u;
}
inline void packetc2l_change_table::clear_has_packet_id() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void packetc2l_change_table::clear_packet_id() {
  packet_id_ = 10112;
  clear_has_packet_id();
}
inline ::fishpark_protocols::e_server_msg_type packetc2l_change_table::packet_id() const {
  return static_cast< ::fishpark_protocols::e_server_msg_type >(packet_id_);
}
inline void packetc2l_change_table::set_packet_id(::fishpark_protocols::e_server_msg_type value) {
  assert(::fishpark_protocols::e_server_msg_type_IsValid(value));
  set_has_packet_id();
  packet_id_ = value;
}

// -------------------------------------------------------------------

// packetl2c_change_table_result

// optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_l2c_change_table_result];
inline bool packetl2c_change_table_result::has_packet_id() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void packetl2c_change_table_result::set_has_packet_id() {
  _has_bits_[0] |= 0x00000001u;
}
inline void packetl2c_change_table_result::clear_has_packet_id() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void packetl2c_change_table_result::clear_packet_id() {
  packet_id_ = 15104;
  clear_has_packet_id();
}
inline ::fishpark_protocols::e_server_msg_type packetl2c_change_table_result::packet_id() const {
  return static_cast< ::fishpark_protocols::e_server_msg_type >(packet_id_);
}
inline void packetl2c_change_table_result::set_packet_id(::fishpark_protocols::e_server_msg_type value) {
  assert(::fishpark_protocols::e_server_msg_type_IsValid(value));
  set_has_packet_id();
  packet_id_ = value;
}

// optional .msg_type_def.e_msg_result_def result = 2 [default = e_rmt_fail];
inline bool packetl2c_change_table_result::has_result() const {
  return (_has_bits_[0] & 0x00000002u) != 0;
}
inline void packetl2c_change_table_result::set_has_result() {
  _has_bits_[0] |= 0x00000002u;
}
inline void packetl2c_change_table_result::clear_has_result() {
  _has_bits_[0] &= ~0x00000002u;
}
inline void packetl2c_change_table_result::clear_result() {
  result_ = 2;
  clear_has_result();
}
inline ::msg_type_def::e_msg_result_def packetl2c_change_table_result::result() const {
  return static_cast< ::msg_type_def::e_msg_result_def >(result_);
}
inline void packetl2c_change_table_result::set_result(::msg_type_def::e_msg_result_def value) {
  assert(::msg_type_def::e_msg_result_def_IsValid(value));
  set_has_result();
  result_ = value;
}

// -------------------------------------------------------------------

// packetc2l_leave_table

// optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_c2l_leave_table];
inline bool packetc2l_leave_table::has_packet_id() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void packetc2l_leave_table::set_has_packet_id() {
  _has_bits_[0] |= 0x00000001u;
}
inline void packetc2l_leave_table::clear_has_packet_id() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void packetc2l_leave_table::clear_packet_id() {
  packet_id_ = 10003;
  clear_has_packet_id();
}
inline ::fishpark_protocols::e_server_msg_type packetc2l_leave_table::packet_id() const {
  return static_cast< ::fishpark_protocols::e_server_msg_type >(packet_id_);
}
inline void packetc2l_leave_table::set_packet_id(::fishpark_protocols::e_server_msg_type value) {
  assert(::fishpark_protocols::e_server_msg_type_IsValid(value));
  set_has_packet_id();
  packet_id_ = value;
}

// -------------------------------------------------------------------

// packetl2c_leave_table_result

// optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_l2c_leave_table_result];
inline bool packetl2c_leave_table_result::has_packet_id() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void packetl2c_leave_table_result::set_has_packet_id() {
  _has_bits_[0] |= 0x00000001u;
}
inline void packetl2c_leave_table_result::clear_has_packet_id() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void packetl2c_leave_table_result::clear_packet_id() {
  packet_id_ = 15003;
  clear_has_packet_id();
}
inline ::fishpark_protocols::e_server_msg_type packetl2c_leave_table_result::packet_id() const {
  return static_cast< ::fishpark_protocols::e_server_msg_type >(packet_id_);
}
inline void packetl2c_leave_table_result::set_packet_id(::fishpark_protocols::e_server_msg_type value) {
  assert(::fishpark_protocols::e_server_msg_type_IsValid(value));
  set_has_packet_id();
  packet_id_ = value;
}

// optional int32 sync_gold = 2;
inline bool packetl2c_leave_table_result::has_sync_gold() const {
  return (_has_bits_[0] & 0x00000002u) != 0;
}
inline void packetl2c_leave_table_result::set_has_sync_gold() {
  _has_bits_[0] |= 0x00000002u;
}
inline void packetl2c_leave_table_result::clear_has_sync_gold() {
  _has_bits_[0] &= ~0x00000002u;
}
inline void packetl2c_leave_table_result::clear_sync_gold() {
  sync_gold_ = 0;
  clear_has_sync_gold();
}
inline ::google::protobuf::int32 packetl2c_leave_table_result::sync_gold() const {
  return sync_gold_;
}
inline void packetl2c_leave_table_result::set_sync_gold(::google::protobuf::int32 value) {
  set_has_sync_gold();
  sync_gold_ = value;
}

// -------------------------------------------------------------------

// packetc2l_check_state

// optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_c2l_check_state];
inline bool packetc2l_check_state::has_packet_id() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void packetc2l_check_state::set_has_packet_id() {
  _has_bits_[0] |= 0x00000001u;
}
inline void packetc2l_check_state::clear_has_packet_id() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void packetc2l_check_state::clear_packet_id() {
  packet_id_ = 10004;
  clear_has_packet_id();
}
inline ::fishpark_protocols::e_server_msg_type packetc2l_check_state::packet_id() const {
  return static_cast< ::fishpark_protocols::e_server_msg_type >(packet_id_);
}
inline void packetc2l_check_state::set_packet_id(::fishpark_protocols::e_server_msg_type value) {
  assert(::fishpark_protocols::e_server_msg_type_IsValid(value));
  set_has_packet_id();
  packet_id_ = value;
}

// -------------------------------------------------------------------

// packetl2c_check_state_result

// optional .fishpark_protocols.e_server_msg_type packet_id = 1 [default = e_mst_l2c_check_state_result];
inline bool packetl2c_check_state_result::has_packet_id() const {
  return (_has_bits_[0] & 0x00000001u) != 0;
}
inline void packetl2c_check_state_result::set_has_packet_id() {
  _has_bits_[0] |= 0x00000001u;
}
inline void packetl2c_check_state_result::clear_has_packet_id() {
  _has_bits_[0] &= ~0x00000001u;
}
inline void packetl2c_check_state_result::clear_packet_id() {
  packet_id_ = 15004;
  clear_has_packet_id();
}
inline ::fishpark_protocols::e_server_msg_type packetl2c_check_state_result::packet_id() const {
  return static_cast< ::fishpark_protocols::e_server_msg_type >(packet_id_);
}
inline void packetl2c_check_state_result::set_packet_id(::fishpark_protocols::e_server_msg_type value) {
  assert(::fishpark_protocols::e_server_msg_type_IsValid(value));
  set_has_packet_id();
  packet_id_ = value;
}

// optional bool is_intable = 2 [default = false];
inline bool packetl2c_check_state_result::has_is_intable() const {
  return (_has_bits_[0] & 0x00000002u) != 0;
}
inline void packetl2c_check_state_result::set_has_is_intable() {
  _has_bits_[0] |= 0x00000002u;
}
inline void packetl2c_check_state_result::clear_has_is_intable() {
  _has_bits_[0] &= ~0x00000002u;
}
inline void packetl2c_check_state_result::clear_is_intable() {
  is_intable_ = false;
  clear_has_is_intable();
}
inline bool packetl2c_check_state_result::is_intable() const {
  return is_intable_;
}
inline void packetl2c_check_state_result::set_is_intable(bool value) {
  set_has_is_intable();
  is_intable_ = value;
}


// @@protoc_insertion_point(namespace_scope)

}  // namespace fishpark_protocols

#ifndef SWIG
namespace google {
namespace protobuf {


}  // namespace google
}  // namespace protobuf
#endif  // SWIG

// @@protoc_insertion_point(global_scope)

#endif  // PROTOBUF_fishpark_5fprotocol_2eproto__INCLUDED
