import * as vscode from 'vscode';

export class MyConfig {
    excludeExt: Array<string>;
    autoExportOnSave: boolean;

    constructor() {
        const config = vscode.workspace.getConfiguration('nals') as vscode.WorkspaceConfiguration;

        this.excludeExt = config.get('excludeFilesWhenAutoExport') || [];
        this.autoExportOnSave = config.get('autoExportOnSave') || false;
    }
}
