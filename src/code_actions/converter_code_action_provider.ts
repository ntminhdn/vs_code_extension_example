import * as vscode from "vscode";
import { selectedText } from "../utils/utils";

export class ConverterCodeActionProvider implements vscode.CodeActionProvider {
  public provideCodeActions(): vscode.CodeAction[] {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return [];

    // If the selected text is empty, don't show the code action in quick fix menu
    if (selectedText() === "") return [];

    // show the code action in quick fix menu
    return [
      {
        command: "helloworld.convertToTemplateString",
        title: "MyTool: Convert To Template String",
      },
    ].map((c) => {
      let action = new vscode.CodeAction(
        c.title,
        vscode.CodeActionKind.Refactor
      );
      action.command = {
        command: c.command,
        title: c.title,
      };
      return action;
    });
  }
}
