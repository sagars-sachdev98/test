import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class CategoriesModel extends Object with _$CategoriesModelSerializerMixin {
  int id;
  bool enabled;
  String name;
  String image;
  int priority;
  DateTime createdTimestamp;
  int createdBy;
  DateTime updatedTimestamp;
  int updatedBy;
  bool isLoading = false;

  CategoriesModel({
    this.id,
    this.enabled,
    this.image,
    this.name,
    this.priority,
    this.createdTimestamp,
    this.createdBy,
    this.updatedTimestamp,
    this.updatedBy,
  });

  factory CategoriesModel.fromJson(Map<String, dynamic> json) =>
      _$CategoriesModelFromJson(json);
}

CategoriesModel _$CategoriesModelFromJson(Map<String, dynamic> json) {
  return new CategoriesModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..name = json['name'] as String
    ..image = json['image'] as String
    ..priority = json['priority'] as int
    ..createdTimestamp = DateTime.parse(json['createdTimestamp'])
    ..createdBy = json['createdBy'] as int
    ..updatedTimestamp = DateTime.parse(json['updatedTimestamp'])
    ..updatedBy = json['updatedBy'] as int;
}

abstract class _$CategoriesModelSerializerMixin {
  int get id;
  bool get enabled;
  String get name;
  String get image;
  int get priority;
  DateTime get createdTimestamp;
  int get createdBy;
  DateTime get updatedTimestamp;
  int get updatedBy;

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'enabled': enabled,
        'image': image,
        'name': name,
        'priority': priority,
        'createdTimestamp': createdTimestamp,
        'createdBy': createdBy,
        'updatedTimestamp': updatedTimestamp,
        'updatedBy': updatedBy,
      };
}
