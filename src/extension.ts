import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let panelCounter = 0;

export function activate(context: vscode.ExtensionContext) {

    console.log('恭喜，您的擴充功能 "piblockly" 現已啟用！');

    const panels = new Map<string, vscode.WebviewPanel>();

    const startCommand = vscode.commands.registerCommand('piblockly.start', async () => {

        const choice = await vscode.window.showQuickPick([
            { label: '新增專案', description: '建立一個新專案並儲存 .xml 檔案' },
            { label: '開啟專案', description: '開啟一個現有的 .xml 專案檔' }
        ], {
            placeHolder: '要建立新專案還是開啟現有專案？'
        });

        if (!choice) { return; }

        let xmlContent: string;
        let xmlName: string | undefined;

        if (choice.label === '新增專案') {
            const saveOptions: vscode.SaveDialogOptions = {
                filters: { 'Blockly XML': ['xml'] }
            };
            const xmlUri = await vscode.window.showSaveDialog(saveOptions);
            if (!xmlUri) { return; }

            xmlContent = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="initializes_setup" id="setup_block" x="100" y="50">
    <next>
      <block type="initializes_loop" id="loop_block"></block>
    </next>
  </block>
</xml>
`;
            fs.writeFileSync(xmlUri.fsPath, xmlContent);
            xmlName = xmlUri.fsPath;
        } else { // 開啟專案
            const openOptions: vscode.OpenDialogOptions = {
                canSelectMany: false,
                openLabel: '開啟 Blockly XML',
                filters: { 'Blockly XML 檔案': ['xml'] }
            };
            const selectedFiles = await vscode.window.showOpenDialog(openOptions);
            if (!selectedFiles || selectedFiles.length === 0) { return; }

            try {
                xmlName = selectedFiles[0].fsPath;
                xmlContent = fs.readFileSync(xmlName, 'utf8');
            } catch (error: any) {
                vscode.window.showErrorMessage(`載入專案檔失敗：${String(error)}`);
                return;
            }
        }

        launchNewSession(context, panels, xmlContent, xmlName);
    });

    const onDidCloseDocumentSubscription = vscode.workspace.onDidCloseTextDocument(async (document) => {
        const closedUriString = document.uri.toString();
        let panelIdToDelete: string | null = null;
        let panelToDelete: vscode.WebviewPanel | null = null;

        for (const [id, panel] of panels.entries()) {
            if ((panel as any).associatedUriString === closedUriString) {
                panelIdToDelete = id;
                panelToDelete = panel;
                break;
            }
        }

        if (panelIdToDelete && panelToDelete) {
            const panel = panelToDelete;
            const getDirtyState = (): Promise<boolean> => {
                return new Promise(resolve => {
                    const sub = panel.webview.onDidReceiveMessage(message => {
                        if (message.command === 'dirtyStateResponse') {
                            sub.dispose();
                            resolve(message.isDirty);
                        }
                    });
                    panel.webview.postMessage({ command: 'requestDirtyState' });
                });
            };

            const isDirty = await getDirtyState();
            if (isDirty) {
                const choice = await vscode.window.showWarningMessage(
                    '您在 piBlockly 中有未儲存的變更。是否要儲存？',
                    { modal: true },
                    '儲存', '不儲存', '取消'
                );

                if (choice === '取消' || choice === undefined || choice === '儲存') {
                    const doc = await vscode.workspace.openTextDocument(document.uri);
                    await vscode.window.showTextDocument(doc, { preview: false });
                    await vscode.commands.executeCommand('workbench.action.moveEditorToLeftGroup');
                }

                if (choice === '儲存') {
                    const savePromise = new Promise<void>(resolve => {
                        const sub = panel.webview.onDidReceiveMessage(async msg => {
                            if (msg.command === 'saveProject') {
                                const options: vscode.SaveDialogOptions = {
                                    filters: { 'Blockly XML': ['xml'] },
                                    defaultUri: (panel as any).xmlName ? vscode.Uri.file((panel as any).xmlName) : undefined
                                };
                                const uri = await vscode.window.showSaveDialog(options);
                                if (uri) {
                                    fs.writeFileSync(uri.fsPath, msg.xml);
                                    vscode.window.showInformationMessage(`專案已儲存至 ${path.basename(uri.fsPath)}`);
                                    panel.webview.postMessage({ command: 'saveComplete' });
                                }
                                sub.dispose();
                                resolve();
                            }
                        });
                        panel.webview.postMessage({ command: 'requestSave' });
                    });
                    await savePromise;
                    await vscode.commands.executeCommand('workbench.action.closeActiveEditor');
                } else if (choice === '不儲存') {
                    panel.dispose();
                }
            } else {
                panel.dispose();
            }
        }
    });

    context.subscriptions.push(startCommand, onDidCloseDocumentSubscription);
}

async function launchNewSession(context: vscode.ExtensionContext, panels: Map<string, vscode.WebviewPanel>, xmlContent: string, xmlName: string | undefined) {
    const newDoc = await vscode.workspace.openTextDocument({ content: '', language: 'arduino' });
    await vscode.window.showTextDocument(newDoc, vscode.ViewColumn.One);
    createAndShowPanel(context, panels, ++panelCounter, xmlContent, xmlName);
}

function createAndShowPanel(context: vscode.ExtensionContext, panels: Map<string, vscode.WebviewPanel>, panelId: number, xmlContent: string, xmlName: string | undefined) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showErrorMessage('沒有作用中的文字編輯器，無法建立 piBlockly 面板。');
        return;
    }

    const panelKey = panelId.toString();
    const associatedUriString = editor.document.uri.toString();

    const panel = vscode.window.createWebviewPanel(
        'piblocklyEditor',
        `piBlockly: ${xmlName ? path.basename(xmlName) : path.basename(editor.document.fileName)}`,
        vscode.ViewColumn.Two,
        {
            enableScripts: true,
            localResourceRoots: [context.extensionUri],
            enableForms: true,
            retainContextWhenHidden: true
        }
    );

    (panel as any).panelId = panelKey;
    (panel as any).associatedUriString = associatedUriString;
    (panel as any).xmlName = xmlName;
    panels.set(panelKey, panel);

    panel.onDidDispose(() => {
        panels.delete(panelKey);
    }, null, context.subscriptions);

    panel.onDidChangeViewState(async e => {
        if (e.webviewPanel.active) {
            const currentAssociatedUri = (e.webviewPanel as any).associatedUriString;
            const editorIsVisible = vscode.window.visibleTextEditors.some(editor => editor.document.uri.toString() === currentAssociatedUri);

            if (!editorIsVisible) {
                const choice = await vscode.window.showInformationMessage(
                    '此面板關聯的程式碼編輯器已關閉。將會建立一個新的未命名編輯器作為輸出目標。',
                    { modal: true },
                    '確定'
                );
                if (choice === '確定') {
                    const newDoc = await vscode.workspace.openTextDocument({ content: '', language: 'arduino' });
                    const newEditor = await vscode.window.showTextDocument(newDoc, vscode.ViewColumn.One);
                    
                    (e.webviewPanel as any).associatedUriString = newEditor.document.uri.toString();
                    e.webviewPanel.title = `piBlockly: ${path.basename(newEditor.document.fileName)}`;

                    e.webviewPanel.webview.postMessage({ command: 'requestUpdate' });
                }
            }
        }
    });

    panel.webview.html = getWebviewContent(panel.webview, context.extensionUri, context.extensionPath);

    panel.webview.onDidReceiveMessage(
        async message => {
            const currentAssociatedUri = (panel as any).associatedUriString;
            const associatedEditor = vscode.window.visibleTextEditors.find(e => e.document.uri.toString() === currentAssociatedUri);

            switch (message.command) {
                case 'webviewReady':
                    panel.webview.postMessage({ command: 'initializeWorkspace', xml: xmlContent, inoUri: currentAssociatedUri, xmlName: (panel as any).xmlName });
                    return;
                case 'updateCode':
                    if (associatedEditor) {
                        const code = message.code;
                        try {
                            const doc = associatedEditor.document;
                            const edit = new vscode.WorkspaceEdit();
                            const fullRange = new vscode.Range(doc.positionAt(0), doc.positionAt(doc.getText().length));
                            edit.replace(doc.uri, fullRange, code);
                            await vscode.workspace.applyEdit(edit);
                        } catch (error) {
                            vscode.window.showErrorMessage(`更新程式碼失敗：${String(error)}`);
                        }
                    }
                    return;
                case 'prompt':
                    const input = await vscode.window.showInputBox({ prompt: message.message, value: message.defaultValue });
                    panel.webview.postMessage({ command: 'promptResponse', value: input });
                    return;
                case 'confirm':
                    const choice = await vscode.window.showWarningMessage(message.message, { modal: true }, '是', '否');
                    panel.webview.postMessage({ command: 'confirmResponse', value: choice === '是' });
                    return;
                case 'saveProject':
                    {
                        const options: vscode.SaveDialogOptions = {
                            filters: { 'Blockly XML': ['xml'] }
                        };
                        const currentXmlName = (panel as any).xmlName;
                        if (currentXmlName) {
                            options.defaultUri = vscode.Uri.file(currentXmlName);
                        } else if (associatedEditor) {
                            options.defaultUri = associatedEditor.document.uri.with({ path: associatedEditor.document.uri.path.replace(/(\.[^/.]+)?$/, '.xml') });
                        }

                        const fileUriToSave = await vscode.window.showSaveDialog(options);
                        if (fileUriToSave) {
                            try {
                                fs.writeFileSync(fileUriToSave.fsPath, message.xml);
                                (panel as any).xmlName = fileUriToSave.fsPath;
                                panel.title = `piBlockly: ${path.basename(fileUriToSave.fsPath)}`;
                                vscode.window.showInformationMessage(`專案已儲存至 ${path.basename(fileUriToSave.fsPath)}`);
                                panel.webview.postMessage({ command: 'saveComplete' });
                            } catch (error: any) {
                                vscode.window.showErrorMessage(`儲存專案失敗：${String(error)}`);
                            }
                        }
                    }
                    return;
            }
        },
        undefined,
        context.subscriptions
    );
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

    const toolboxPath = path.join(extensionPath, 'media', 'toolbox.xml');
    const toolboxXml = fs.readFileSync(toolboxPath, 'utf8');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; media-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; img-src * data:; script-src 'unsafe-inline' ${webview.cspSource} vscode-webview-resource:;">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>piBlockly 編輯器</title>
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
    <div id="loading-overlay">載入中...</div>
    <div id="toolbar">
        <button id="saveButton">儲存專案</button>
    </div>
    <div id="blocklyDiv" style="height: calc(100vh - 40px); width: 100vw;"></div>

    <script id="toolbox-xml" type="text/xml" style="display: none;">${`<xml>${toolboxXml}</xml>`}</script>

    <script src="${blocklyUri}"></script>
    <script src="${enUri}"></script>
    <script src="${customEnUri}"></script>
    <script src="${customZhHantUri}"></script>
    <script src="${fieldColourUri}"></script>
    <script src="${fieldMultilineInputUri}"></script>
    <script src="${customBlocksUri}"></script>
    <script src="${arduinoGeneratorUri}"></script>
    <script src="${customGeneratorUri}"></script>

    <script src="${mainUri}"></script>
</body>
</html>`;
}

export function deactivate() {}
