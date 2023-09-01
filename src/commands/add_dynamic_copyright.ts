import * as vscode from "vscode";
import {
  currentPath,
  readFile,
  writeFile,
} from "../utils/utils";
import { myConfig } from "../config/listeners";

export const addDynamicCopyright = async () => {
  const language = vscode.window.activeTextEditor?.document.languageId;
  if (language != "dart") {
    return;
  }

  let copyrightContent = myConfig.copyRightContent;
  let currentText = await readFile(currentPath());

  // if copyright content is not already added, add it
  if (!currentText.startsWith(copyrightContent)) {
    await writeFile(currentPath(), `${copyrightContent}\n${currentText}`);
    vscode.window.showInformationMessage("Done!");
  }
};
