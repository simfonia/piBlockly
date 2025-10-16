import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "piblockly" is now active!');

    const panels = new Map<string, vscode.WebviewPanel>();

    const disposable = vscode.commands.registerCommand('piblockly.start', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || !editor.document.fileName.endsWith('.ino')) {
            vscode.window.showInformationMessage('Please open an Arduino (.ino) file to use piBlockly.');
            return;
        }

        const fileUri = editor.document.uri.toString();

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

        // When the panel is closed, remove it from our map
        panel.onDidDispose(() => {
            panels.delete(fileUri);
        }, null, context.subscriptions);


        panel.webview.html = getWebviewContent(panel.webview, context.extensionUri, context.extensionPath);

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            async message => {
                switch (message.command) {
                    case 'updateCode':
                        const code = message.code;
                        const isFirstUpdate = message.isFirstUpdate;

                        const overwriteFile = async () => {
                            try {
                                const doc = await vscode.workspace.openTextDocument(editor.document.uri);
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

                        if (isFirstUpdate) {
                            const choice = await vscode.window.showWarningMessage(
                                'This will overwrite the existing content of your .ino file. Are you sure you want to continue?',
                                { modal: true },
                                'Yes'
                            );
                            if (choice === 'Yes') {
                                await overwriteFile();
                                panel.webview.postMessage({ command: 'firstUpdateDone' });
                            } else {
                                panel.webview.postMessage({ command: 'undo' });
                            }
                        } else {
                            await overwriteFile();
                        }
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
    <link href="${styleUri}" rel="stylesheet">
</head>
<body>
    <div id="blocklyDiv" style="height: 100vh; width: 100vw;"></div>

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
