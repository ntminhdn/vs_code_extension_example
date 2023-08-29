import * as vscode from 'vscode';
import * as fs from 'fs';

export const currentFile = () => vscode.window.activeTextEditor!.document.uri;
export const currentPath = () => currentFile().path;
export const currentFileName = () => currentPath().substring(currentPath().lastIndexOf('/') + 1, currentPath().lastIndexOf('.'));
export const selectedText = () => vscode.window.activeTextEditor!.document.getText(vscode.window.activeTextEditor!.selection);

export function editSelection(newText: string) {
    vscode.window.activeTextEditor?.edit((builder) => {
        builder.replace(vscode.window.activeTextEditor!.selection, newText)
    });
}

export function showPrompt(title: string, placeholder: string): Thenable<string | undefined> {
    const inputText: vscode.InputBoxOptions = {
      prompt: title,
      placeHolder: placeholder,
    };

    return vscode.window.showInputBox(inputText);
}

export function readFile(path: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(new Error(`Couldn't read file due to error: ${err}`));
            } else {
                resolve(data);
            }
        });
    });
}

export function writeFile(path: string, data: string) {
    return new Promise<void>((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', (err) => {
            if (err) {
                reject(new Error(`Couldn't write file due to error: ${err}`));
            } else {
                resolve();
            }
        });
    });
}
