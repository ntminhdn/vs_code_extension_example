import * as vscode from 'vscode';

export const helloWorld = () => {
    console.log('Hello World');
    vscode.window.showInformationMessage('Hello World from NALS!');
    vscode.window.showErrorMessage('your error');
};