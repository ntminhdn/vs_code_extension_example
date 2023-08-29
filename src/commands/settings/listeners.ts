import * as vscode from 'vscode';
import { MyConfig } from '../settings/my_config'
import { addDynamicCopyright } from './add_dynamic_copyright';

export let myConfig = new MyConfig();

export const configChanges = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration('nals')) {
        console.log('config changed');
        myConfig = new MyConfig();
    }
});

export const documentSave = vscode.workspace.onDidSaveTextDocument(
    async (e: vscode.TextDocument) => {
        console.log('onDidSaveTextDocument');
        if (myConfig.addCopyRightOnSave) {
            addDynamicCopyright();
        }
    },
);