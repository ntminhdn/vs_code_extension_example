import * as vscode from "vscode";
import {
  currentPath,
  currentFileName,
  readFile,
  writeFile,
} from "../../utils/utils";
import { myConfig } from "./listeners";

export const addDynamicCopyright = async () => {
  let copyRightContent = myConfig.copyRightContent;
  let currentText = await readFile(currentPath());
  await writeFile(
    currentPath(),
    `// ${currentFileName()} - ${copyRightContent}\n${currentText}`
  );
  vscode.window.showInformationMessage(`Adding copyright completed!`);
};
