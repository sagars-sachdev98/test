import 'package:dsa_rd_flutter/models/user.model.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class UserContactModel extends Object with _$UserContactModelSerializerMixin {
  int id;
  bool enabled;
  String userId;
  String contactNumber;
  UserModel userModel;

  UserContactModel(
      {this.id, this.enabled, this.contactNumber, this.userId, this.userModel});

  factory UserContactModel.fromJson(Map<String, dynamic> json) =>
      _$UserContactModelFromJson(json);
}

UserContactModel _$UserContactModelFromJson(Map<String, dynamic> json) {
  return new UserContactModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..userId = json['userId'] as String
    ..contactNumber = json['contactNumber'] as String
    ..userModel =
        json.containsKey('userId') ? UserModel.fromJson(json['userId']) : null;
}

abstract class _$UserContactModelSerializerMixin {
  int get id;
  bool get enabled;

  String get contactNumber;
  String get userId;
  UserModel get userModel;

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'contactNumber': contactNumber,
        'userId': userId,
        'userModel': userModel,
      };
}

class UserResponseModel {
  String token;
  UserContactModel userContactModel;
}

class UserSessionId {
  String sessionid;
}
