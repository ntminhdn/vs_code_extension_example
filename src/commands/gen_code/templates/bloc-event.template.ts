import * as changeCase from "change-case";

export function getBlocEventTemplate(blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  return `import 'package:freezed_annotation/freezed_annotation.dart';

import '../../../app.dart';

abstract class ${pascalCaseBlocName}Event extends BaseBlocEvent {
  const ${pascalCaseBlocName}Event();
}

@freezed
class ${pascalCaseBlocName}PageInitiated extends ${pascalCaseBlocName}Event {
  const ${pascalCaseBlocName}PageInitiated();
}
`;
}
