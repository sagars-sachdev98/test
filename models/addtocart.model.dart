import 'package:dsa_rd_flutter/models/product.model.dart';
import 'package:dsa_rd_flutter/models/user.model.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class AddToCartModel extends Object with _$AddToCartModelSerializerMixin {
  int id;
  bool enabled;
  int userId;
  int productId;
  int quantity;
  int status;
  ProductModel product;
  UserModel user;

  DateTime createdTimestamp;
  int createdBy;
  DateTime updatedTimestamp;
  int updatedBy;
  Map<String, dynamic> options = {};

  AddToCartModel(
      {this.id,
      this.enabled,
      this.userId,
      this.product,
      this.productId,
      // productOptionValuesIds
      this.quantity,
      this.status,
      this.user,
      this.createdTimestamp,
      this.createdBy,
      this.updatedTimestamp,
      this.updatedBy,
      this.options});

  factory AddToCartModel.fromJson(Map<String, dynamic> json) =>
      _$AddToCartModelFromJson(json);
}

AddToCartModel _$AddToCartModelFromJson(Map<String, dynamic> json) {
  return new AddToCartModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..userId = json['userId'] as int
    ..quantity = json['quantity'] as int
    ..productId = json['priority'] as int
    ..status = json['status'] as int
    ..options = json['options'] as Map<String, dynamic>
    // ..user = json.containsKey('user') ? UserModel.fromJson(json['user']) : null
    ..product = json.containsKey('product')
        ? ProductModel.fromJson(json['product'])
        : null
    ..createdTimestamp = DateTime.parse(json['createdTimestamp'])
    ..createdBy = json['createdBy'] as int
    ..updatedTimestamp = DateTime.parse(json['updatedTimestamp'])
    ..updatedBy = json['updatedBy'] as int;
}

abstract class _$AddToCartModelSerializerMixin {
  int get id;
  int get userId;
  int get productId;
  int get quantity;
  UserModel get user;

  Map<String, dynamic> get options;

  Map<String, dynamic> toJson() => <String, dynamic>{
        'id': id,
        'userId': userId,
        'productId': productId,
        'quantity': quantity,
        'options': options,
      };
}
