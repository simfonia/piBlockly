import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

let panelCounter = 0;

export function activate(context: vscode.ExtensionContext) {

    vscode.commands.executeCommand('setContext', 'piblockly.panelOpen', false);

    console.log('恭喜，您的擴充功能 "piblockly" 現已啟用！');

    const panels = new Map<string, vscode.WebviewPanel>();

    const startCommand = vscode.commands.registerCommand('piblockly.start', async () => {

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('請先開啟一個 Arduino (.ino) 檔案，然後再啟動 piBlockly。');
            return;
        }

        const languageId = editor.document.languageId;
        if (languageId !== 'arduino' && languageId !== 'cpp') {
            vscode.window.showErrorMessage(`目前的檔案類型是 '${languageId}'，不是 'arduino' 或 'cpp'。請開啟一個 .ino 檔案。`);
            return;
        }

        // --- New logic for handling existing code ---
        const currentContent = editor.document.getText();
        if (currentContent.trim().length > 0) { // Check if file is not empty
            const overwriteChoice = await vscode.window.showWarningMessage(
                '偵測到當前檔案包含程式碼。您希望如何處理？',
                { modal: true },
                '覆蓋現有程式碼'
            );

            if (overwriteChoice !== '覆蓋現有程式碼') {
                // User chose '取消' or closed the dialog
                return;
            }
            // If user chose '覆蓋現有程式碼', continue to the next step
        }
        // --- End of new logic ---

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

        createAndShowPanel(context, panels, ++panelCounter, xmlContent, xmlName);
    });

    const onDidCloseDocumentSubscription = vscode.workspace.onDidCloseTextDocument(async (document) => {
        const closedUriString = document.uri.toString();
        let panelToClose: vscode.WebviewPanel | null = null;

        for (const [id, panel] of panels.entries()) {
            if (((panel as any).associatedUriString === closedUriString) || ((panel as any).xmlName === closedUriString)) {
                panelToClose = panel;
                break;
            }
        }

        if (panelToClose) {
            if ((panelToClose as any).isDisposed) {
                return;
            }
            closePanel(panelToClose, false);
        }
    });

    const onDidChangeVisibleEditorsSubscription = vscode.window.onDidChangeVisibleTextEditors(editors => {
        for (const panel of panels.values()) {
            const associatedUri = (panel as any).associatedUriString;
            const isAssociatedEditorVisible = editors.some(editor => editor.document.uri.toString() === associatedUri);

            if (isAssociatedEditorVisible) {
                panel.webview.postMessage({ command: 'panelActive' });
            } else {
                panel.webview.postMessage({ command: 'panelInactive' });
            }
        }
    });

    context.subscriptions.push(startCommand, onDidCloseDocumentSubscription, onDidChangeVisibleEditorsSubscription);
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
            localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')],
            enableForms: true,
            retainContextWhenHidden: true
        }
    );

    (panel as any).panelId = panelKey;
    (panel as any).associatedUriString = associatedUriString;
    (panel as any).xmlName = xmlName;
    (panel as any).isDirty = false;
    (panel as any).isDisposed = false;
    (panel as any).lastGeneratedCodeHash = ''; // Initialize hash
    panels.set(panelKey, panel);
    vscode.commands.executeCommand('setContext', 'piblockly.panelOpen', true);

    panel.onDidDispose(() => {
        const associatedUriString = (panel as any).associatedUriString;

        panels.delete(panelKey);
        if (panels.size === 0) {
            vscode.commands.executeCommand('setContext', 'piblockly.panelOpen', false);
        }
    }, null, context.subscriptions);



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
                            const currentContent = doc.getText();
                            const currentHash = crypto.createHash('sha256').update(currentContent).digest('hex');
                            const lastGeneratedCodeHash = (panel as any).lastGeneratedCodeHash;

                            if (lastGeneratedCodeHash && currentHash !== lastGeneratedCodeHash) {
                                const overwriteChoice = await vscode.window.showWarningMessage(
                                    '偵測到程式碼已被手動修改。繼續生成將會覆蓋您的修改。是否繼續？',
                                    { modal: true },
                                    '繼續覆蓋'
                                );
                                if (overwriteChoice !== '繼續覆蓋') {
                                    return; // User cancelled
                                }
                            }

                            const edit = new vscode.WorkspaceEdit();
                            const fullRange = new vscode.Range(doc.positionAt(0), doc.positionAt(doc.getText().length));
                            edit.replace(doc.uri, fullRange, code);
                            await vscode.workspace.applyEdit(edit);

                            // Update the last generated code hash
                            (panel as any).lastGeneratedCodeHash = crypto.createHash('sha256').update(code).digest('hex');

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
                case 'dirtyStateChanged':
                    (panel as any).isDirty = message.isDirty;
                    return;
                case 'saveProject':
                    {
                        const currentXmlName = (panel as any).xmlName;
                        if (currentXmlName) {
                            try {
                                fs.writeFileSync(currentXmlName, message.xml);
                                vscode.window.showInformationMessage(`專案已儲存至 ${path.basename(currentXmlName)}`);
                                panel.webview.postMessage({ command: 'saveComplete' });
                            } catch (error: any) {
                                vscode.window.showErrorMessage(`儲存專案失敗：${String(error)}`);
                            }
                        } else {
                            // If there is no xmlName, treat it as a "Save As"
                            const options: vscode.SaveDialogOptions = {
                                filters: { 'Blockly XML': ['xml'] }
                            };
                            if (associatedEditor) {
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
                    }
                    return;
                case 'saveProjectAs':
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
                case 'closeEditor':
                    closePanel(panel, true);
                    return;
            }
        },
        undefined,
        context.subscriptions
    );
}

async function closePanel(panel: vscode.WebviewPanel, canCancel: boolean) {
    const isDirty = (panel as any).isDirty;

    if (isDirty) {
        const message = '您在 piBlockly 中有未儲存的變更。是否要儲存？';
        const options: vscode.MessageOptions = { modal: true };
        const items = canCancel ? ['儲存', '不儲存', '取消'] : ['儲存', '不儲存'];

        const choice = await vscode.window.showWarningMessage(message, options, ...items);

        if (choice === '儲存') {
            await new Promise<void>(resolve => {
                const sub = panel.webview.onDidReceiveMessage(async (message) => {
                    if (message.command === 'saveProject') {
                        const currentXmlName = (panel as any).xmlName;
                        if (currentXmlName) {
                            try {
                                fs.writeFileSync(currentXmlName, message.xml);
                                vscode.window.showInformationMessage(`專案已儲存至 ${path.basename(currentXmlName)}`);
                                panel.webview.postMessage({ command: 'saveComplete' });
                                panel.dispose();
                            } catch (error: any) {
                                vscode.window.showErrorMessage(`儲存專案失敗：${String(error)}`);
                            }
                        } else {
                            const options: vscode.SaveDialogOptions = {
                                filters: { 'Blockly XML': ['xml'] }
                            };
                            const fileUriToSave = await vscode.window.showSaveDialog(options);
                            if (fileUriToSave) {
                                try {
                                    fs.writeFileSync(fileUriToSave.fsPath, message.xml);
                                    (panel as any).xmlName = fileUriToSave.fsPath;
                                    panel.title = `piBlockly: ${path.basename(fileUriToSave.fsPath)}`;
                                    vscode.window.showInformationMessage(`專案已儲存至 ${path.basename(fileUriToSave.fsPath)}`);
                                    panel.webview.postMessage({ command: 'saveComplete' });
                                    panel.dispose();
                                } catch (error: any) {
                                    vscode.window.showErrorMessage(`儲存專案失敗：${String(error)}`);
                                }
                            }
                        }
                        sub.dispose();
                        resolve();
                    }
                });
                panel.webview.postMessage({ command: 'requestSave' });
            });
        } else if (choice === '不儲存') {
            panel.dispose();
        } else if (choice === '取消') {
            // Do nothing, user cancelled. This is only possible if canCancel is true.
        } else { // undefined (dialog closed)
            // If cancellation is not an option, we must close. Treat as "Don't Save".
            if (!canCancel) {
                panel.dispose();
            }
            // Otherwise, do nothing (same as "Cancel").
        }
    } else { // Clean state
        panel.dispose();
    }
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
    const saveIconUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'icons', 'save_24dp_1F1F1F.svg'));
    const saveAsIconUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'icons', 'save_as_24dp_1F1F1F.svg'));
    const dangerousIconUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'icons', 'dangerous_24dp_1F1F1F.svg'));
    const saveIconHoverUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'icons', 'save_24dp_FE2F89.svg'));
    const saveAsIconHoverUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'icons', 'save_as_24dp_FE2F89.svg'));
    const dangerousIconHoverUri = webview.asWebviewUri(vscode.Uri.joinPath(mediaPath, 'icons', 'dangerous_24dp_FE2F89.svg'));

    const toolboxPath = path.join(extensionPath, 'media', 'toolbox.xml');
    const toolboxXml = fs.readFileSync(toolboxPath, 'utf8');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; media-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; img-src ${webview.cspSource} data: https: vscode-webview-resource:; script-src 'nonce-${nonce}' ${webview.cspSource} vscode-webview-resource:;">

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
        #inactive-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            color: white;
            display: none; /* Initially hidden */
            justify-content: center;
            align-items: center;
            font-size: 2em;
            z-index: 1000;
        }
        #toolbar {
            padding: 5px;
            background-color: #f0f0f0;
            border-bottom: 1px solid #ccc;
            display: flex;
            align-items: center;
        }
        #toolbar img {
            cursor: pointer;
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
        #closeButton {
            margin-left: auto; /* Pushes the button to the right */
        }
    </style>
    <link href="${styleUri}" rel="stylesheet">
</head>
<body>
    <div id="loading-overlay">載入中...</div>
    <div id="inactive-overlay" style="display: none; justify-content: center; align-items: center; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); color: white; font-size: 2em; z-index: 1000; text-align: center; padding: 20px;"></div>
    <div id="toolbar">
        <img id="saveButton" src="${saveIconUri}" data-src="${saveIconUri}" data-hover-src="${saveIconHoverUri}" alt="儲存積木" title="儲存積木">
        <img id="saveAsButton" src="${saveAsIconUri}" data-src="${saveAsIconUri}" data-hover-src="${saveAsIconHoverUri}" alt="另存積木" title="另存積木">
        <img id="closeButton" src="${dangerousIconUri}" data-src="${dangerousIconUri}" data-hover-src="${dangerousIconHoverUri}" alt="關閉" title="關閉">
    </div>
    <div id="blocklyDiv" style="height: calc(100vh - 40px); width: 100vw;"></div>

    <script id="toolbox-xml" type="text/xml" style="display: none;">${`<xml>${toolboxXml}</xml>`}</script>

    <script nonce="${nonce}" src="${blocklyUri}"></script>
    <script nonce="${nonce}" src="${enUri}"></script>
    <script nonce="${nonce}" src="${customEnUri}"></script>
    <script nonce="${nonce}" src="${customZhHantUri}"></script>
    <script nonce="${nonce}" src="${fieldColourUri}"></script>
    <script nonce="${nonce}" src="${fieldMultilineInputUri}"></script>
    <script nonce="${nonce}" src="${customBlocksUri}"></script>
    <script nonce="${nonce}" src="${arduinoGeneratorUri}"></script>
    <script nonce="${nonce}" src="${customGeneratorUri}"></script>

    <script nonce="${nonce}" src="${mainUri}"></script>
</body>
</html>`;
}

export function deactivate() {}
