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

export const wrapWith = async (snippet: (widget: string) => string) => {
    let editor = vscode.window.activeTextEditor!;
    const selection = getWidgetAtSelection(editor);
    console.log(`selected text: ${editor.document.getText(selection)}`);
    
    const widget = editor.document.getText(selection).replace("$", "\\$"); // vì snippet cần
    editor.insertSnippet(new vscode.SnippetString(snippet(widget)), selection);
    await vscode.commands.executeCommand("editor.action.formatDocument");
};

const openBracket = "(";
const closeBracket = ")";

export const getWidgetAtSelection = (editor: vscode.TextEditor): vscode.Selection => {
  const emptySelection = new vscode.Selection(
    editor.document.positionAt(0),
    editor.document.positionAt(0)
  );
  const language = editor.document.languageId;
  if (language != "dart") return emptySelection;

  const line = editor.document.lineAt(editor.selection.start);
  const lineText = line.text;
  const openBracketIndex = line.text.indexOf(
    openBracket,
    editor.selection.anchor.character
  );

  let widgetStartIndex =
    openBracketIndex > 1
      ? openBracketIndex - 1
      : editor.selection.anchor.character;
  for (widgetStartIndex; widgetStartIndex > 0; widgetStartIndex--) {
    const currentChar = lineText.charAt(widgetStartIndex);
    const isBeginningOfWidget =
      currentChar === openBracket ||
      (currentChar === " " && lineText.charAt(widgetStartIndex - 1) !== ",");
    if (isBeginningOfWidget) break;
  }
  widgetStartIndex++;

  if (openBracketIndex < 0) {
    const commaIndex = lineText.indexOf(",", widgetStartIndex);
    const bracketIndex = lineText.indexOf(closeBracket, widgetStartIndex);
    const endIndex =
      commaIndex >= 0
        ? commaIndex
        : bracketIndex >= 0
        ? bracketIndex
        : lineText.length;

    return new vscode.Selection(
      new vscode.Position(line.lineNumber, widgetStartIndex),
      new vscode.Position(line.lineNumber, endIndex)
    );
  }

  let bracketCount = 1;
  for (let l = line.lineNumber; l < editor.document.lineCount; l++) {
    const currentLine = editor.document.lineAt(l);
    let c = l === line.lineNumber ? openBracketIndex + 1 : 0;
    for (c; c < currentLine.text.length; c++) {
      const currentChar = currentLine.text.charAt(c);
      if (currentChar === openBracket) bracketCount++;
      if (currentChar === closeBracket) bracketCount--;
      if (bracketCount === 0) {
        return new vscode.Selection(
          new vscode.Position(line.lineNumber, widgetStartIndex),
          new vscode.Position(l, c + 1)
        );
      }
    }
  }

  return emptySelection;
};