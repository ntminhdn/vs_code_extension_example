import * as vscode from "vscode";
import * as lo from "lodash";
import * as changeCase from "change-case";
import { writeFile, showPrompt } from "../../utils/utils";
import * as fs from "fs";
import { getPageTemplate } from "./templates/page.template";
import { getBlocTemplate } from "./templates/bloc.template";
import { getBlocEventTemplate } from "./templates/bloc-event.template";
import { getBlocStateTemplate } from "./templates/bloc-state.template";
import { getExportBlocTemplate } from "./templates/export-bloc.template";

export const genFolder = async (uri: vscode.Uri) => {
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
  let blocFolderPath = `${featureFolderPath}/bloc`;

  await Promise.all([
    genFile(featureFolderPath, `${featureFolderName}_page.dart`, getPageTemplate(featureName)),
    genFile(blocFolderPath, `${featureFolderName}_bloc.dart`, getBlocTemplate(featureName)),
    genFile(blocFolderPath, `${featureFolderName}_event.dart`, getBlocEventTemplate(featureName)),
    genFile(blocFolderPath, `${featureFolderName}_state.dart`, getBlocStateTemplate(featureName)),
    genFile(blocFolderPath, `${featureFolderName}.dart`, getExportBlocTemplate(featureName)),
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
