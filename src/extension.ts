import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "piblockly" is now active!');

    const panels = new Map<string, vscode.WebviewPanel>();

    const disposable = vscode.commands.registerCommand('piblockly.start', () => {
        const initialXml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="initializes_setup" id="setup_block" x="100" y="50">
    <next>
      <block type="initializes_loop" id="loop_block"></block>
    </next>
  </block>
</xml>
`;
        const editor = vscode.window.activeTextEditor;
        if (!editor || !editor.document.fileName.endsWith('.ino')) {
            vscode.window.showInformationMessage('Please open an Arduino (.ino) file to use piBlockly.');
            return;
        }

        const fileUri: string = editor.document.uri.toString();
        const inoFilePath = editor.document.fileName;
        const inoFileContent = fs.readFileSync(inoFilePath, 'utf8');

        const shouldConfirmOverwrite = inoFileContent.trim().length > 0;

        // If we already have a panel for this file, show it.
        if (panels.has(fileUri)) {
            panels.get(fileUri)?.reveal(vscode.ViewColumn.Two);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            'piblocklyEditor',
            `piBlockly: ${path.basename(editor.document.fileName)}`,
            vscode.ViewColumn.Two,
            {
                enableScripts: true,
                localResourceRoots: [context.extensionUri],
                enableForms: true
            }
        );

        panels.set(fileUri, panel);
        (panel as any).shouldConfirmOverwrite = shouldConfirmOverwrite; // Store shouldConfirmOverwrite as a property of the panel
        (panel as any).currentInoUri = editor.document.uri; // Store the current .ino URI in the panel

        // When the panel is closed, remove it from our map
        panel.onDidDispose(() => {
            panels.delete(fileUri);
        }, null, context.subscriptions);


        panel.webview.html = getWebviewContent(panel.webview, context.extensionUri, context.extensionPath);

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            async message => {
                switch (message.command) {
                    case 'webviewReady':
                        // The webview is ready to receive the initial workspace state.
                        // initialXml is now declared in a higher scope.

                        panel.webview.postMessage({ command: 'initializeWorkspace', xml: initialXml, shouldConfirmOverwrite: (panel as any).shouldConfirmOverwrite, inoUri: (panel as any).currentInoUri.toString() });
                        return;
                    case 'updateCode':
                        const code = message.code;
                        const shouldConfirmOverwrite = message.shouldConfirmOverwrite; // Use the new flag

                        const overwriteFile = async () => {
                            try {
                                const doc = await vscode.workspace.openTextDocument(vscode.Uri.parse(message.inoUri)); // Use the URI from the message
                                const edit = new vscode.WorkspaceEdit();
                                const fullRange = new vscode.Range(
                                    doc.positionAt(0),
                                    doc.positionAt(doc.getText().length)
                                );
                                edit.replace(doc.uri, fullRange, code);
                                await vscode.workspace.applyEdit(edit);
                            } catch (error) {
                                vscode.window.showErrorMessage('Failed to update Arduino code: ' + error);
                            }
                        };

                        if (shouldConfirmOverwrite) { // Use the new flag
                            const choice = await vscode.window.showWarningMessage(
                                'This will overwrite the existing content of your .ino file. Are you sure you want to continue?',
                                { modal: true },
                                'Yes'
                            );
                            if (choice === 'Yes') {
                                await overwriteFile();
                                panel.webview.postMessage({ command: 'overwriteConfirmed' }); // Send new command
                            } else {
                                panel.webview.postMessage({ command: 'resetWorkspace', xml: initialXml });
                            }
                        } else {
                            await overwriteFile();
                        }
                        return;
                    case 'confirm':
                        const confirmChoice = await vscode.window.showWarningMessage(
                            message.message,
                            { modal: true },
                            'Yes', 'No'
                        );
                        panel.webview.postMessage({
                            command: 'confirmResponse',
                            value: confirmChoice === 'Yes'
                        });
                        return;
                    case 'prompt':
                        const input = await vscode.window.showInputBox({
                            prompt: message.message,
                            value: message.defaultValue
                        });
                        panel.webview.postMessage({
                            command: 'promptResponse',
                            value: input // input can be undefined if user cancels
                        });
                        return;

                    case 'saveProject':
                        const inoFilePath = editor.document.fileName; // Get the current .ino file path
                        const options: vscode.SaveDialogOptions = {
                            filters: {
                                'Arduino Files': ['ino'],
                                'All Files': ['*']
                            },
                            defaultUri: vscode.Uri.file(inoFilePath.replace(/\.ino$/, '')) // Suggest base name of current .ino
                        };
                        const fileUri = await vscode.window.showSaveDialog(options);

                        if (fileUri) {
                            const inoSavePath = fileUri.fsPath;
                            const xmlSavePath = inoSavePath.replace(/\.ino$/, '.xml'); // Derive .xml path

                            try {
                                fs.writeFileSync(inoSavePath, message.code);
                                fs.writeFileSync(xmlSavePath, message.xml);
                                vscode.window.showInformationMessage(`Project saved to ${path.basename(inoSavePath)} and ${path.basename(xmlSavePath)}`);
                            } catch (error: any) {
                                vscode.window.showErrorMessage(`Failed to save project: ${error.message}`);
                            }
                        }
                        return;
                    case 'loadProject':
                        const openOptions: vscode.OpenDialogOptions = {
                            canSelectMany: false,
                            openLabel: 'Open Blockly XML',
                            filters: {
                                'Blockly XML Files': ['xml'],
                                'All Files': ['*']
                            }
                        };
                        const selectedFiles = await vscode.window.showOpenDialog(openOptions);

                        if (selectedFiles && selectedFiles.length > 0) {
                            const xmlLoadPath = selectedFiles[0].fsPath;
                            try {
                                const xmlContent = fs.readFileSync(xmlLoadPath, 'utf8');
                                const inoPath = xmlLoadPath.replace(/\.xml$/, '.ino');

                                // Open the corresponding .ino file
                                const document = await vscode.workspace.openTextDocument(inoPath);
                                await vscode.window.showTextDocument(document, vscode.ViewColumn.One);

                                // Update the webview panel title
                                panel.title = `piBlockly: ${path.basename(inoPath)}`;
                                (panel as any).currentInoUri = document.uri; // Update currentInoUri

                                panel.webview.postMessage({ command: 'initializeWorkspace', xml: xmlContent, shouldConfirmOverwrite: false, inoUri: (panel as any).currentInoUri.toString() });
                                (panel as any).shouldConfirmOverwrite = false;
                            } catch (error: any) {
                                vscode.window.showErrorMessage(`Failed to load project: ${error.message}`);
                            }
                        }
                        return;
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri, extensionPath: string) {
    const mediaPath = vscode.Uri.joinPath(extensionUri, 'media');

    const nonce = getNonce();

    // Create cache-busting URIs for all assets
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'style.css')).with({ query: `nonce=${nonce}` });
    const blocklyUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'blockly.js')).with({ query: `nonce=${nonce}` });
    const enUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'msg', 'en.js')).with({ query: `nonce=${nonce}` });
    const customBlocksUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'custom', 'blocks.js')).with({ query: `nonce=${nonce}` });
    const customEnUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'custom', 'en.js')).with({ query: `nonce=${nonce}` });
    const customZhHantUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'custom', 'zh-hant.js')).with({ query: `nonce=${nonce}` });
    const fieldColourUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'field-colour.js')).with({ query: `nonce=${nonce}` });
    const fieldMultilineInputUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'field-multilineinput.js')).with({ query: `nonce=${nonce}` });
    const mainUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'main.js')).with({ query: `nonce=${nonce}` });
    const arduinoGeneratorUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'arduino_generator.js')).with({ query: `nonce=${nonce}` });
    const customGeneratorUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'custom', 'custom_generator.js')).with({ query: `nonce=${nonce}` });

    // Read toolbox.xml content
    const toolboxPath = path.join(extensionPath, 'media', 'toolbox.xml');
    let toolboxXml = fs.readFileSync(toolboxPath, 'utf8');
    // Wrap the toolbox XML content with an <xml> tag
    toolboxXml = `<xml>${toolboxXml}</xml>`;
    // Escape the XML content for embedding in a JavaScript string
    const escapedToolboxXml = toolboxXml.replace(/`/g, '\\`').replace(/\\/g, '\\\\').replace(/\$/g, '\\$').replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');

    // Using a more permissive CSP for debugging purposes.
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; media-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; img-src * data:; script-src 'unsafe-inline' ${webview.cspSource} vscode-webview-resource:;">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>piBlockly Editor</title>
    <style>
        #loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2em;
            z-index: 1000;
        }
        #toolbar {
            padding: 5px;
            background-color: #f0f0f0;
            border-bottom: 1px solid #ccc;
        }
        #toolbar button {
            margin-right: 5px;
            padding: 8px 12px;
            cursor: pointer;
        }
    </style>
    <link href="${styleUri}" rel="stylesheet">
</head>
<body>
    <div id="loading-overlay">Loading...</div>
    <div id="toolbar">
        <button id="saveButton">儲存專案</button>
        <button id="loadButton">開啟專案</button>
    </div>
    <div id="blocklyDiv" style="height: calc(100vh - 40px); width: 100vw;"></div>

    <script src="${blocklyUri}"></script>
    <script src="${enUri}"></script>
    <script src="${customEnUri}"></script>
    <script src="${customZhHantUri}"></script>
    <script src="${fieldColourUri}"></script>
    <script src="${fieldMultilineInputUri}"></script>
    <script src="${customBlocksUri}"></script>
    <script src="${arduinoGeneratorUri}"></script>
    <script src="${customGeneratorUri}"></script>
    
    <script>
        window.initialToolboxXml = "${escapedToolboxXml}";
    </script>

    <script src="${mainUri}"></script>
</body>
</html>`;
}

export function deactivate() {}
