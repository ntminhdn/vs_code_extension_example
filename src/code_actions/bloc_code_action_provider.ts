import { window, CodeAction, CodeActionProvider, CodeActionKind } from "vscode";
import { getWidgetAtSelection } from "../utils/utils";

export class BlocCodeActionProvider implements CodeActionProvider {
  public provideCodeActions(): CodeAction[] {
    const editor = window.activeTextEditor;
    if (!editor) return [];

    const selectedText = editor.document.getText(getWidgetAtSelection(editor));
    if (selectedText === "") return [];

    return [
      {
        command: "nals.wrapWithBlocBuilder",
        title: "nals:Wrap Code",
      },
    ].map((c) => {
      let action = new CodeAction(c.title, CodeActionKind.Refactor);
      action.command = {
        command: c.command,
        title: c.title,
      };
      return action;
    });
  }
}
