import 'package:dsa_rd_flutter/models/productOptions.model.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class ProductOptionValuesModel extends Object
    with _$ProductOptionValuesModelSerializerMixin {
  int id;
  bool enabled;
  String name;
  String image;

  int optionsId;
  ProductOptionsModel option;
  int priority;
  DateTime createdTimestamp;
  int createdBy;
  DateTime updatedTimestamp;
  int updatedBy;

  ProductOptionValuesModel({
    this.id,
    this.enabled,
    this.image,
    this.name,
    this.priority,
    this.option,
    this.optionsId,
    this.createdTimestamp,
    this.createdBy,
    this.updatedTimestamp,
    this.updatedBy,
  });

  factory ProductOptionValuesModel.fromJson(Map<String, dynamic> json) =>
      _$ProductOptionValuesModelFromJson(json);
}

ProductOptionValuesModel _$ProductOptionValuesModelFromJson(
    Map<String, dynamic> json) {
  return new ProductOptionValuesModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..name = json['name'] as String
    //..image = json['image'] as String
    // ..priority = json['priority'] as int
    ..optionsId = json['optionsId'] as int
    // ..option = json.containsKey('option')
    //     ? ProductOptionsModel.fromJson(json['option'])
    //     : null
    ..createdTimestamp = DateTime.parse(json['createdTimestamp'])
    ..createdBy = json['createdBy'] as int
    ..updatedTimestamp = DateTime.parse(json['updatedTimestamp'])
    ..updatedBy = json['updatedBy'] as int;
}

abstract class _$ProductOptionValuesModelSerializerMixin {
  int get id;
  bool get enabled;
  String get name;
  String get image;
  int get priority;

  int get optionsId;
  ProductOptionsModel get option;
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
        'option': option,
        'optionsId': optionsId,
        'createdTimestamp': createdTimestamp,
        'createdBy': createdBy,
        'updatedTimestamp': updatedTimestamp,
        'updatedBy': updatedBy,
      };
}
