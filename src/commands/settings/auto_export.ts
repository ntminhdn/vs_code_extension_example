import * as vscode from 'vscode';
import * as path from 'path';
import { currentFile, writeFile } from '../../utils/utils';
import { myConfig } from './listeners';

export const autoExport = async () => {
    let excludeExt = myConfig.excludeExt;

    const modulePath = await getModulePathOfActiveFile(currentFile());
    if (!modulePath) {
        vscode.window.showErrorMessage(
            'Failed to initialize extension. Is this a valid Dart/Flutter project?',
        );
        return;
    }
    
    const moduleName = modulePath.substring(modulePath.lastIndexOf('/') + 1)
    const filesUris = await vscode.workspace.findFiles(`${moduleName}/lib/**/*.dart`, `${moduleName}/lib/**/*.{${excludeExt}}`);
    
    const libFolder = `${modulePath}/lib`;
    const indexFilePath = `${libFolder}/${moduleName}.dart`;
    if (filesUris.length === 0) {
        vscode.window.showInformationMessage(`Modude ${moduleName}: No dart files were found`);
        return;
    }

    await writeFile(indexFilePath, `library ${moduleName};\n\n` + filesUris.map((e) => `export '${e.path.substring(e.path.indexOf(`/${moduleName}/lib/`) + `/${moduleName}/lib/`.length)}';`).sort().join("\n") + '\n')

    vscode.window.showInformationMessage(`Auto export completed!`);
};

const getModulePathOfActiveFile = async (activeDocumentUri: vscode.Uri) => {
    const allPubspecUris = await vscode.workspace.findFiles('**/*/pubspec.yaml');
    
    for (let pubspecUri of allPubspecUris) {
        let modulePath = path.dirname(pubspecUri.path); // trả về folder chứa file pubspec.yaml
        if (activeDocumentUri.path.startsWith(modulePath)) {
            return modulePath;
        }
    }

    return null;
}