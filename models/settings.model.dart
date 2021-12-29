import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class SettingsModel extends Object {
  int id;
  bool enabled;
  String version;
  String appName;
  String shareAppMessage;
  String contactNumber;
  String playstoreLink;
  String appstoreLink;
  String aboutUsLink;
  String contactUsLink;
  String termsAndConditionsLink;
  String privacyPolicyLink;

  SettingsModel({
    this.id,
    this.enabled,
    this.appName,
    this.version,
    this.shareAppMessage,
    this.aboutUsLink,
    this.appstoreLink,
    this.contactNumber,
    this.contactUsLink,
    this.playstoreLink,
    this.privacyPolicyLink,
    this.termsAndConditionsLink,
  });

  factory SettingsModel.fromJson(Map<String, dynamic> json) =>
      _$SettingsModelFromJson(json);
}

SettingsModel _$SettingsModelFromJson(Map<String, dynamic> json) {
  return new SettingsModel()
    ..id = json['id'] as int
    ..enabled = json['enabled'] as bool
    ..appName = json['appName'] as String
    ..version = json['version'] as String
    ..shareAppMessage = json['shareAppMessage'] as String
    ..aboutUsLink = json['aboutUsLink'] as String
    ..appstoreLink = json['appstoreLink'] as String
    ..contactNumber = json['contactNumber'] as String
    ..contactUsLink = json['contactUsLink'] as String
    ..playstoreLink = json['playstoreLink'] as String
    ..privacyPolicyLink = json['privacyPolicyLink'] as String
    ..termsAndConditionsLink = json['termsAndConditionsLink'] as String;
}
