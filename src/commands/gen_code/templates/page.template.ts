import * as changeCase from "change-case";

export function getPageTemplate(blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  return `import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
  
import '../../app.dart';
import 'bloc/${snakeCaseBlocName}.dart';
  
class ${pascalCaseBlocName}Page extends StatefulWidget {
  const ${pascalCaseBlocName}Page({Key? key}) : super(key: key);
  
  @override
  State<StatefulWidget> createState() {
    return _${pascalCaseBlocName}PageState();
  }
}

class _${pascalCaseBlocName}PageState extends BasePageState<${pascalCaseBlocName}Page, ${pascalCaseBlocName}Bloc> {
  @override
  void initState() {
    super.initState();
    bloc.add(const ${pascalCaseBlocName}PageInitiated());
  }

  @override
  Widget buildPage(BuildContext context) {
    return CommonScaffold(
      body: SafeArea(
        child: BlocBuilder<${pascalCaseBlocName}Bloc, ${pascalCaseBlocName}State>(
          builder: (context, state) {
            return Text('${pascalCaseBlocName}');
          },
        ),
      ),
    );
  }
}
`;
}