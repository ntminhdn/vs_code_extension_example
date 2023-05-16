import * as changeCase from "change-case";

export function getBlocTemplate(blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  const blocState = `${pascalCaseBlocName}State`;
  const blocEvent = `${pascalCaseBlocName}Event`;
  return `import 'dart:async';

import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:injectable/injectable.dart';

import '../../../app.dart';
import '${snakeCaseBlocName}.dart';
  
@Injectable()
class ${pascalCaseBlocName}Bloc extends BaseBloc<${blocEvent}, ${blocState}> {
  ${pascalCaseBlocName}Bloc() : super(const ${pascalCaseBlocName}State()) {
    on<${pascalCaseBlocName}PageInitiated>(
      _on${pascalCaseBlocName}PageInitiated,
      transformer: log(),
    );
  }


  FutureOr<void> _on${pascalCaseBlocName}PageInitiated(
    ${pascalCaseBlocName}PageInitiated event,
    Emitter<${blocState}> emit,
  ) async {
    
  }
}
`;
}
