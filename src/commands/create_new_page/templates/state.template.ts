import * as changeCase from "change-case";

export function getStateTemplate(feature: string): string {
  const pascalCaseFeature = changeCase.pascalCase(feature.toLowerCase());
  const snakeCaseFeature = changeCase.snakeCase(feature.toLowerCase());
  return `import 'package:freezed_annotation/freezed_annotation.dart';

  import '../../../../app.dart';
  
  part '${snakeCaseFeature}_state.freezed.dart';
  
  @freezed
  class ${pascalCaseFeature}State extends BaseState with _$${pascalCaseFeature}State {
    const factory ${pascalCaseFeature}State({
      @Default('') String id,
    }) = _${pascalCaseFeature}State;
  }
`;
}
