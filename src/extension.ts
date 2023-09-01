import * as vscode from "vscode";
import { ConverterCodeActionProvider } from "./code_actions/converter_code_action_provider";
import { addCopyRight } from "./commands/add_copyright";
import { addDynamicCopyright } from "./commands/add_dynamic_copyright";
import { convertToTemplateString } from "./commands/convert_to_template_string";
import { createNewPage } from "./commands/create_new_page/create_new_page";
import { helloWorld } from "./commands/hello_world";
import { configChanges, documentSave } from "./config/listeners";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("helloworld.helloWorld", helloWorld),
    vscode.commands.registerCommand("helloworld.addCopyRight", addCopyRight),
    vscode.commands.registerCommand("helloworld.createNewPage", createNewPage),
    vscode.commands.registerCommand(
      "helloworld.convertToTemplateString",
      convertToTemplateString
    ),
    vscode.commands.registerCommand(
      "helloworld.addDynamicCopyright",
      addDynamicCopyright
    ),
    vscode.languages.registerCodeActionsProvider(
      { language: "typescript", scheme: "file" },
      new ConverterCodeActionProvider()
    ),
    configChanges,
    documentSave
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
