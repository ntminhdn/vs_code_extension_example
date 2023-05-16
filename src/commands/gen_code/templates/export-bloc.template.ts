import * as changeCase from "change-case";

export function getExportBlocTemplate(blocName: string): string {
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  return `export '${snakeCaseBlocName}_bloc.dart';
export '${snakeCaseBlocName}_event.dart';
export '${snakeCaseBlocName}_state.dart';
`;
}
