import 'package:dsa_rd_flutter/models/categories.model.dart';
import 'package:dsa_rd_flutter/models/productOptionValues.model.dart';
import 'package:dsa_rd_flutter/models/unit.model.dart';
import 'package:dsa_rd_flutter/utilities/utility.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class ProductModel extends Object with _$ProductModelSerializerMixin {
  int id;
  bool enabled;
  String name;
  String image;
  int rating;
  List productImages = [];
  int priority;
  String description;
  String video;
  int categoriesId;
  int qtymultiplier;
  List productOptions;
  String modelNumber;

  DateTime createdTimestamp;
  int createdBy;
  DateTime updatedTimestamp;
  int updatedBy;
  CategoriesModel categories;
  UnitModel unit;
  bool isLoading = false;

  ProductModel({
    this.id,
    this.enabled,
    this.image,
    this.name,
    this.productImages,
    this.rating,
    this.unit,
    // bool new;
    this.priority,
    this.modelNumber,
    this.qtymultiplier,
    this.description,
    this.video,
    this.categoriesId,
    this.categories,
    this.createdTimestamp,
    this.createdBy,
    this.updatedTimestamp,
    this.updatedBy,
    this.productOptions,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) =>
      _$ProductModelFromJson(json);

  static List<ProductOptionValuesModel> fromJsonList(List list) {
    if (list == null) return null;
    return list
        .map((item) => ProductOptionValuesModel.fromJson(item["optionValue"]))
        .toList();
  }
}

ProductModel _$ProductModelFromJson(Map<String, dynamic> json) {
  return new ProductModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..name = json['name'] as String
    ..image = json['image'] as String
    ..productImages = json["productImages"]
    ..priority = json['priority'] as int
    ..qtymultiplier = json['qtymultiplier'] as int
    ..rating = json['rating'] as int
    ..description = json['description'] as String
    ..video = json['video'] as String
    ..categoriesId = json['categoriesId'] as int
    ..modelNumber = json['modelNumber'] as String
    ..categories = json.containsKey('categories')
        ? CategoriesModel.fromJson(json['categories'])
        : null
    ..unit = json.containsKey('unit')
        ? Utility.isNotNullEmptyOrFalse(json['unit'])
            ? UnitModel.fromJson(json['unit'])
            : null
        : null
    ..productOptions = json['productOptions']
    ..createdTimestamp = DateTime.parse(json['createdTimestamp'])
    ..createdBy = json['createdBy'] as int
    ..updatedTimestamp = DateTime.parse(json['updatedTimestamp'])
    ..updatedBy = json['updatedBy'] as int;
}

abstract class _$ProductModelSerializerMixin {
  int get id;
  bool get enabled;
  String get name;
  String get image;
  int get priority;
  UnitModel get unit;
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
