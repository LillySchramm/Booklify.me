java -jar openapi-generator-cli.jar generate -i ../../backend/swagger-spec.json -g dart-dio -c open-generator-config.yaml
sleep 10
flutter pub run build_runner build
dart format .