import * as vscode from 'vscode';
import { editSelection, selectedText } from '../utils/utils';

export const convertToTemplateString = async () => {
    // get selected text
    const text = selectedText().trim();

    // If the text is empty, show error
    if (text === "") {
        vscode.window.showErrorMessage(`Selected text is empty. Please select the text`);
        return;
    }

    // If the text is already a template string, do nothing
    if (text.startsWith("`") && text.endsWith("`")) {
        vscode.window.showInformationMessage('Done!');
        return;
    }

    // If the text is not a string, show error
    const pattern = /^(['"])(.+)\1$/g;
    const match = RegExp(pattern).exec(text);
    if (!match) {
        vscode.window.showErrorMessage(`Selected text is not a string. Please select the text`);
        return;
    }

    // convert selected text to template string
    editSelection(`\`${match[2]}\``);
    
    vscode.window.showInformationMessage('Done!');
};
