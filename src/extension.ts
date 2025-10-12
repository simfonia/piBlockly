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

        panel.webview.html = getWebviewContent(panel.webview, context.extensionUri, context.extensionPath);
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

    // Create URIs for all assets
    const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'style.css'));
    const blocklyUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'blockly.js'));
    const blocksUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'blocks.js'));
    const enUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'msg', 'en.js'));
    const customBlocksUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'custom', 'blocks.js'));
    const customEnUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'custom', 'en.js'));
    const customZhHantUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'custom', 'zh-hant.js'));
    const fieldColourUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'field-colour.js'));
    const fieldMultilineInputUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'field-multilineinput.js'));
    const mainUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'main.js'));

    // Read toolbox.xml content
    const toolboxPath = path.join(extensionPath, '..', 'BlocklyDuino_simfonia', 'toolbox.xml');
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
    
    <script>
        window.initialToolboxXml = "${escapedToolboxXml}";
    </script>

    <script src="${mainUri}"></script>
    <script src="${customBlocksUri}"></script>
</body>
</html>`;
}

export function deactivate() {}
