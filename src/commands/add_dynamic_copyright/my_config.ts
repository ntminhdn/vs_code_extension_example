import * as vscode from 'vscode';

export class MyConfig {
    copyRightContent: string;
    addCopyRightOnSave: boolean;

    constructor() {
        const config = vscode.workspace.getConfiguration('myconfig') as vscode.WorkspaceConfiguration;

        this.copyRightContent = config.get('copyRightContent') || '';
        this.addCopyRightOnSave = config.get('addCopyRightOnSave') || false;
    }
}
