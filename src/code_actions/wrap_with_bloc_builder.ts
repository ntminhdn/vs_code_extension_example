import { wrapWith } from "../utils/utils";

const blocBuilderSnippet = (widget: string) => {
    return `BlocBuilder<\${1:\${TM_FILENAME_BASE/(.*)_page/\${1:/pascalcase}/}}Bloc, $1State>(
      buildWhen: (previous, current) => previous.\${2:name} != current.$2,
      builder: (context, state) {
      return ${widget};
    },
  )`;
};

export const wrapWithBlocBuilder = async () => wrapWith(blocBuilderSnippet);