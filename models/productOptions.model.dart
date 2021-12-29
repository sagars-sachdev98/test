import 'package:dsa_rd_flutter/models/product.model.dart';
import 'package:dsa_rd_flutter/models/productOptionValues.model.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class ProductOptionsModel extends Object
    with _$ProductOptionsModelSerializerMixin {
  int id;
  bool enabled;
  String name;
  String image;
  String modelNumber;
  int productId;
  ProductModel product;
  int priority;
  List<ProductOptionValuesModel> productOptionValues;
  DateTime createdTimestamp;
  int createdBy;
  DateTime updatedTimestamp;
  int updatedBy;
  Map<String, String> options;

  ProductOptionsModel({
    this.id,
    this.enabled,
    this.image,
    this.name,
    this.priority,
    this.modelNumber,
    this.product,
    this.productId,
    this.createdTimestamp,
    this.createdBy,
    this.updatedTimestamp,
    this.updatedBy,
    this.options,
  });

  factory ProductOptionsModel.fromJson(Map<String, dynamic> json) =>
      _$ProductOptionsModelFromJson(json);
}

ProductOptionsModel _$ProductOptionsModelFromJson(Map<String, dynamic> json) {
  List values = json['productOptionValues'];
  List<ProductOptionValuesModel> productOptionValues = [];
  values.forEach((value) {
    productOptionValues.add(ProductOptionValuesModel.fromJson(value));
  });
  return new ProductOptionsModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..name = json['name'] as String
    ..image = json['image'] as String
    ..priority = json['priority'] as int
    ..modelNumber = json['modelNumber'] as String
    ..productId = json['productId'] as int
    ..productOptionValues = productOptionValues
    ..product = json.containsKey('product')
        ? ProductModel.fromJson(json['product'])
        : null
    ..createdTimestamp = DateTime.parse(json['createdTimestamp'])
    ..createdBy = json['createdBy'] as int
    ..updatedTimestamp = DateTime.parse(json['updatedTimestamp'])
    ..updatedBy = json['updatedBy'] as int;
}

abstract class _$ProductOptionsModelSerializerMixin {
  int get id;
  bool get enabled;
  String get name;
  String get image;
  int get priority;
  String get modelNumber;
  int get productId;
  ProductModel get product;
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
        'product': product,
        'productId': productId,
        'modelNumber': modelNumber,
        'createdTimestamp': createdTimestamp,
        'createdBy': createdBy,
        'updatedTimestamp': updatedTimestamp,
        'updatedBy': updatedBy,
      };
}
