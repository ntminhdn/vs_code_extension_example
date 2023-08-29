import * as vscode from "vscode";
import * as lo from "lodash";
import * as changeCase from "change-case";
import { writeFile, showPrompt } from "../../utils/utils";
import * as fs from "fs";
import { getPageTemplate } from "./templates/page.template";
import { getViewModelTemplate } from "./templates/view_model.template";
import { getStateTemplate } from "./templates/state.template";

export const createNewPage = async (uri: vscode.Uri) => {
  if (
    lo.isNil(lo.get(uri, "fsPath")) ||
    !fs.lstatSync(uri.fsPath).isDirectory()
  ) {
    vscode.window.showErrorMessage("Please select a valid directory");
    return;
  }

  let targetDirectory = uri.fsPath;
  let featureName = await showPrompt("Enter your feature", "register_user");

  if (lo.isNil(featureName)) {
    vscode.window.showErrorMessage("Please enter a feature name");
    return;
  }

  let featureFolderName = changeCase.snakeCase(featureName);
  let featureFolderPath = `${targetDirectory}/${featureFolderName}`;
  let viewModelFolderPath = `${featureFolderPath}/view_model`;

  await Promise.all([
    genFile(featureFolderPath, `${featureFolderName}_page.dart`, getPageTemplate(featureName)),
    genFile(viewModelFolderPath, `${featureFolderName}_view_model.dart`, getViewModelTemplate(featureName)),
    genFile(viewModelFolderPath, `${featureFolderName}_state.dart`, getStateTemplate(featureName)),
  ]);

  vscode.window.showInformationMessage("Done!");
};

function genFile(
  folder: string,
  filename: string,
  content: string
): Promise<void> {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  return writeFile(`${folder}/${filename}`, content);
}
