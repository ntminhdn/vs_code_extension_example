import * as vscode from 'vscode';
import { editSelection, selectedText } from '../utils/utils';

export const convertCode = async () => {
    if (selectedText().trim() === "") {
        vscode.window.showErrorMessage(`Selected text is empty. Please select the text`);
        return;
    }

    let alias = selectedText().substring(0, 2);
    editSelection(`import * as ${alias} from '${selectedText()}';`);
    
    vscode.window.showInformationMessage('Done!');
};
