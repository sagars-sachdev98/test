import 'package:dsa_rd_flutter/models/addtocart.model.dart';
import 'package:dsa_rd_flutter/models/user.model.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class OrdersModel extends Object with _$OrdersModelSerializerMixin {
  int id;
  bool enabled;
  int userId;
  List<int> addToCartIds;
  int status;
  List<AddToCartModel> addToCart;
  UserModel user;
  DateTime createdTimestamp;
  int createdBy;
  DateTime updatedTimestamp;
  int updatedBy;

  OrdersModel({
    this.id,
    this.enabled,
    this.userId,
    this.status,
    this.user,
    this.addToCart,
    this.createdTimestamp,
    this.createdBy,
    this.updatedTimestamp,
    this.updatedBy,
  });

  factory OrdersModel.fromJson(Map<String, dynamic> json) =>
      _$OrdersModelFromJson(json);
}

OrdersModel _$OrdersModelFromJson(Map<String, dynamic> json) {
  return new OrdersModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..userId = json['userId'] as int
    ..status = json['status'] as int
    ..addToCartIds = json['addToCartIds'].cast<int>()
    // ..addToCart = json.containsKey('addToCart')
    //     ? AddToCartModel.fromJson(json['addToCart']) as List<AddToCartModel>
    //     : null
    ..createdTimestamp = DateTime.parse(json['createdTimestamp'])
    ..createdBy = json['createdBy'] as int
    ..updatedTimestamp = DateTime.parse(json['updatedTimestamp'])
    ..updatedBy = json['updatedBy'] as int;
}

abstract class _$OrdersModelSerializerMixin {
  List<int> get addToCartIds;
  int get status;
  int userId;

  Map<String, dynamic> toJson() => <String, dynamic>{
        "userId": userId,
        "status": status,
        "addToCartIds": addToCartIds
      };
}
