import * as vscode from 'vscode';
import { currentPath, currentFileName, writeFile, readFile } from '../utils/utils';

export const readWriteFile = async () => {
    let currentText = await readFile(currentPath());
    await writeFile(currentPath(), `// ${currentFileName()} - Copyright © 2023 — NAL Solutions. All Rights Reserved\n${currentText}`)
    vscode.window.showInformationMessage('Done!');
};
