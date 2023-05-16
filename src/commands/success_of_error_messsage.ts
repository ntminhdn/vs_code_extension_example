import * as vscode from 'vscode';
import { currentPath, currentFileName } from '../utils/utils';

export const helloNals = () => {
    console.log(`Congratulations, Hello NALS! ${currentPath()} - ${currentFileName()}`);
    vscode.window.showInformationMessage('Hello World from NALS!');
    vscode.window.showErrorMessage('your error');
};