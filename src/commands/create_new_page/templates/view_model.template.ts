import * as changeCase from "change-case";

export function getViewModelTemplate(feature: string): string {
  const pascalCaseFeature = changeCase.pascalCase(feature.toLowerCase());
  const snakeCaseFeature = changeCase.snakeCase(feature.toLowerCase());
  const camelCaseFeature = changeCase.camelCase(feature.toLowerCase());
  return `import 'package:get_it/get_it.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:injectable/injectable.dart';

import '../../../../app.dart';
import '${snakeCaseFeature}_state.dart';

final ${camelCaseFeature}ViewModelProvider =
    StateNotifierProvider.autoDispose<${pascalCaseFeature}ViewModel, CommonState<${pascalCaseFeature}State>>(
  (ref) => GetIt.instance.get<${pascalCaseFeature}ViewModel>(),
);

@Injectable()
class ${pascalCaseFeature}ViewModel extends BaseViewModel<${pascalCaseFeature}State> {
  ${pascalCaseFeature}ViewModel() : super(const CommonState(data: ${pascalCaseFeature}State())) {
    fetchInitialData();
  }
  
  Future<void> fetchInitialData() async {}
}  
`;
}
