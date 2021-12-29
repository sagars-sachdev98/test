import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class NotificationModel extends Object {
  int id;
  bool enabled;
  String title;
  String message;
  String image;
  DateTime createdTimestamp;

  NotificationModel({
    this.id,
    this.enabled,
    this.title,
    this.message,
    this.image,
    this.createdTimestamp,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) =>
      _$NotificationModelFromJson(json);
}

NotificationModel _$NotificationModelFromJson(Map<String, dynamic> json) {
  return new NotificationModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..title = json['title'] as String
    ..message = json['message'] as String
    ..image = json['image'] as String
    ..createdTimestamp = DateTime.parse(json['createdTimestamp']);
}
