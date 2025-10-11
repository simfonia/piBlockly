import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

    console.log('Congratulations, your extension "piblockly" is now active!');

    const disposable = vscode.commands.registerCommand('piblockly.start', () => {
        const panel = vscode.window.createWebviewPanel(
            'piblocklyEditor',
            'piBlockly Editor',
            vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [context.extensionUri]
            }
        );

        panel.webview.html = getWebviewContent(panel.webview, context.extensionUri);
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

function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
    const mediaPath = vscode.Uri.joinPath(extensionUri, 'media');

    // Create URIs for all assets
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'style.css'));
    const blocklyCompressedUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'blockly_compressed.js'));
    const blocksCompressedUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'blocks_compressed.js'));
    const enUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'msg', 'en.js'));
    const mainUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'main.js'));

    // Using a more permissive CSP for debugging purposes.
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; img-src * data:; script-src 'unsafe-inline' ${webview.cspSource} vscode-webview-resource:;">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>piBlockly Editor</title>
    <link href="${styleUri}" rel="stylesheet">
</head>
<body>
    <div id="blocklyDiv" style="height: 100vh; width: 100vw;"></div>

    <script src="${blocklyCompressedUri}"></script>
    <script src="${blocksCompressedUri}"></script>
    <script src="${enUri}"></script>
    
    <script src="${mainUri}"></script>
</body>
</html>`;
}

export function deactivate() {}
