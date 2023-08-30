import * as vscode from "vscode";
import {
  currentPath,
  currentFileName,
  writeFile,
  readFile,
} from "../utils/utils";

export const addCopyRight = async () => {
  let currentText = await readFile(currentPath()); // Read current file content
  let copyrightContent = `// ${currentFileName()} - Copyright © 2023 — NAL Solutions. All Rights Reserved`;

  // if copyright content is not already added, add it
  if (!currentText.startsWith(copyrightContent)) {
    await writeFile(currentPath(), `${copyrightContent}\n${currentText}`);
    vscode.window.showInformationMessage("Done!");
  } else {
    vscode.window.showInformationMessage("copyright already added!");
  }
};
