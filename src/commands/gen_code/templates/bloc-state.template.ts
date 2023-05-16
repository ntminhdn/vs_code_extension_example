import * as changeCase from "change-case";

export function getBlocStateTemplate(blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  return `import 'package:freezed_annotation/freezed_annotation.dart';

import '../../../app.dart';

@freezed
class ${pascalCaseBlocName}State extends BaseBlocState {
  const ${pascalCaseBlocName}State();
}
`;
}
