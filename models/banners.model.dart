import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class BannerModel extends Object with _$BannerModelSerializerMixin {
  int id;
  bool enabled;

  String image;
  int order;

  int redirectTo;

  DateTime createdTimestamp;
  int createdBy;
  DateTime updatedTimestamp;
  int updatedBy;

  BannerModel({
    this.id,
    this.enabled,
    this.image,
    this.order,
    this.redirectTo,
    this.createdTimestamp,
    this.createdBy,
    this.updatedTimestamp,
    this.updatedBy,
  });

  factory BannerModel.fromJson(Map<String, dynamic> json) =>
      _$BannerModelFromJson(json);
}

BannerModel _$BannerModelFromJson(Map<String, dynamic> json) {
  return new BannerModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool

    //  ..mallIds = json['mallIds'] as int
    ..image = json['image'] as String
    ..order = json['order'] as int
    ..redirectTo = json['redirectTo'] as int
    ..createdTimestamp = DateTime.parse(json['createdTimestamp'])
    ..createdBy = json['createdBy'] as int
    ..updatedTimestamp = DateTime.parse(json['updatedTimestamp'])
    ..updatedBy = json['updatedBy'] as int;
}

abstract class _$BannerModelSerializerMixin {
  int get id;
  bool get enabled;

  String get image;
  int get order;

  DateTime get createdTimestamp;
  int get createdBy;
  DateTime get updatedTimestamp;
  int get updatedBy;

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'enabled': enabled,
        'image': image,
        'order': order,
        'createdTimestamp': createdTimestamp,
        'createdBy': createdBy,
        'updatedTimestamp': updatedTimestamp,
        'updatedBy': updatedBy,
      };
}
