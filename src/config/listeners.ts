import * as vscode from 'vscode';
import { MyConfig } from './my_config'
import { addDynamicCopyright } from '../commands/add_dynamic_copyright';

export let myConfig = new MyConfig();

export const configChanges = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration('myconfig')) {
        myConfig = new MyConfig();
    }
});

export const documentSave = vscode.workspace.onDidSaveTextDocument(
    async (e: vscode.TextDocument) => {
        if (myConfig.addCopyRightOnSave) {
            addDynamicCopyright();
        }
    },
);
