import 'package:dsa_rd_flutter/models/user.contact.model.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class UserModel extends Object with _$UserModelSerializerMixin {
  int id;
  bool enabled;
  String fullName;
  String email;
  String contactNumber;
  DateTime createdTimestamp;
  DateTime lastLogin;
  int createdBy;
  UserContactModel userContactModel;

  UserModel(
      {this.id,
      this.enabled,
      this.fullName,
      this.email,
      this.contactNumber,
      this.createdTimestamp,
      this.lastLogin,
      this.createdBy,
      this.userContactModel});

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}

UserModel _$UserModelFromJson(Map<String, dynamic> json) {
  return new UserModel()
    ..id = json["user"]['id'] as int
    ..enabled = json["user"]['enabled'] as bool
    ..fullName = json["user"]['fullName'] as String
    ..email = json["user"]['email'] as String
    ..contactNumber = json["user"]['contactNumber'] as String
    ..createdTimestamp = json["user"]['createdTimeStamp'] as DateTime
    ..lastLogin = json["user"]['lastLogin'] as DateTime
    ..userContactModel = json.containsKey('id')
        ? UserContactModel.fromJson(json["user"]['id'])
        : null
    ..createdBy = json['createdBy'] as int;
}

abstract class _$UserModelSerializerMixin {
  int get id;
  bool get enabled;
  String get fullName;
  String get email;
  String get contactNumber;
  UserContactModel get userContactModel;
  DateTime get createdTimestamp;
  DateTime get lastLogin;

  int get createdBy;

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'fullName': fullName,
        'email': email,
        'contactNumber': contactNumber,
        'userContactModel': userContactModel,
        'lastLogin': lastLogin,
      };
}

class UserResponseModel {
  String token;
  UserModel user;
}

class UserSessionId {
  String sessionid;
}
