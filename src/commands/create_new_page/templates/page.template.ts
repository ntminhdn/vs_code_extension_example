import * as changeCase from "change-case";

export function getPageTemplate(feature: string): string {
  const pascalCaseFeature = changeCase.pascalCase(feature.toLowerCase());
  const camelCaseFeature = changeCase.camelCase(feature.toLowerCase());
  const snakeCaseFeature = changeCase.snakeCase(feature.toLowerCase());
  return `import 'package:auto_route/auto_route.dart';
import 'package:flutter/material.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
  
import '../../../app.dart';
import 'view_model/${snakeCaseFeature}_state.dart';
import 'view_model/${snakeCaseFeature}_view_model.dart';

@RoutePage()
class ${pascalCaseFeature}Page extends BasePage<${pascalCaseFeature}State,
    AutoDisposeStateNotifierProvider<${pascalCaseFeature}ViewModel, CommonState<${pascalCaseFeature}State>>> {
  ${pascalCaseFeature}Page({super.key});
  
  @override
  AutoDisposeStateNotifierProvider<${pascalCaseFeature}ViewModel, CommonState<${pascalCaseFeature}State>> get provider =>
      ${camelCaseFeature}ViewModelProvider;
  
  @override
  Widget buildPage(BuildContext context, WidgetRef ref) {
    return const CommonScaffold(
      body: SizedBox.shrink(),
    );
  }
}   
`;
}