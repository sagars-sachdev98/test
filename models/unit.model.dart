import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class UnitModel extends Object with _$UnitModelSerializerMixin {
  int id;
  bool enabled;
  String name;
  int multiplier;
  String finalunits;
  DateTime createdTimestamp;
  int createdBy;
  DateTime updatedTimestamp;
  int updatedBy;

  UnitModel({
    this.id,
    this.enabled,
    this.multiplier,
    this.name,
    this.finalunits,
    this.createdTimestamp,
    this.createdBy,
    this.updatedTimestamp,
    this.updatedBy,
  });

  factory UnitModel.fromJson(Map<String, dynamic> json) =>
      _$UnitModelFromJson(json);
}

UnitModel _$UnitModelFromJson(Map<String, dynamic> json) {
  return new UnitModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..name = json['name'] as String
    ..multiplier = json['multiplier'] as int
    ..finalunits = json['finalunits'] as String
    ..createdTimestamp = DateTime.parse(json['createdTimestamp'])
    ..createdBy = json['createdBy'] as int
    ..updatedTimestamp = DateTime.parse(json['updatedTimestamp'])
    ..updatedBy = json['updatedBy'] as int;
}

abstract class _$UnitModelSerializerMixin {
  int get id;
  bool get enabled;
  String get name;
  int get multiplier;
  String get finalunits;
  DateTime get createdTimestamp;
  int get createdBy;
  DateTime get updatedTimestamp;
  int get updatedBy;

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'enabled': enabled,
        'multiplier': multiplier,
        'name': name,
        'finalunits': finalunits,
        'createdTimestamp': createdTimestamp,
        'createdBy': createdBy,
        'updatedTimestamp': updatedTimestamp,
        'updatedBy': updatedBy,
      };
}
