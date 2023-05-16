// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed
// export function activate(context: vscode.ExtensionContext) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "nals" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	let disposable = vscode.commands.registerCommand('nals.helloWorld', () => {
// 		// The code you place here will be executed every time your command is executed
// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from nals!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// export function deactivate() {}


import * as vscode from 'vscode';
import { helloNals } from './commands/success_of_error_messsage';
import { readWriteFile } from './commands/read_write_file';
import { genFolder } from './commands/gen_code/gen_code';
import { convertCode } from './commands/convert_code';
import { wrapWithBlocBuilder } from './code_actions/wrap_with_bloc_builder';
import { autoExport } from './commands/settings/auto_export';
import { configChanges, documentSave } from './commands/settings/listeners';
import { BlocCodeActionProvider } from './code_actions/bloc_code_action_provider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
	  vscode.commands.registerCommand("nals.helloWorld", helloNals),
	  vscode.commands.registerCommand("nals.readWriteFile", readWriteFile),
	  vscode.commands.registerCommand("nals.genFolder", genFolder),
	  vscode.commands.registerCommand("nals.convertCode", convertCode),
	  vscode.commands.registerCommand("nals.wrapWithBlocBuilder", wrapWithBlocBuilder),
	  vscode.languages.registerCodeActionsProvider(
		{ language: "dart", scheme: "file" },
		new BlocCodeActionProvider()
	  ),
	  vscode.commands.registerCommand("nals.autoExport", autoExport),
	  configChanges, documentSave
	);
  }
  
// this method is called when your extension is deactivated
export function deactivate() { }
  