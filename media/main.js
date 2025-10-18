// Register Blockly field plugins
// Try to get the field classes from window.
const FieldColour = window.FieldColour || window.Blockly.FieldColour;
const FieldMultilineInput = window.FieldMultilineInput || window.Blockly.FieldMultilineInput;

// Register the fields using Blockly.registry.register
if (FieldColour) {
    Blockly.registry.register('field', 'field_colour', FieldColour);
}
if (FieldMultilineInput) {
    Blockly.registry.register('field', 'field_multilineinput', FieldMultilineInput);
}

// Initializing a basic Blockly workspace
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: window.initialToolboxXml, // Pass the XML string directly
    media: '',      // 不載入外部媒體
    sounds: false,  // 關閉音效模組
});

// Register the button callback for creating a variable
workspace.registerButtonCallback('CREATE_VARIABLE', function(button) {
    Blockly.Variables.createVariableButtonHandler(workspace);
});

// --- State and Communication ---
const vscode = acquireVsCodeApi();
let debounceTimer;
window.shouldConfirmOverwrite = false; // Global flag to control overwrite confirmation
window.promptCallback = null; // Store callback for prompt response

// --- Functions ---
function updateCode(event) {
    // Don't generate code for UI events.
    if (event && event.isUiEvent) {
        return;
    }
    // NEW: Don't generate code if a drag gesture is in progress.
    if (workspace.isDragging()) {
        return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const code = Blockly.Arduino.workspaceToCode(workspace);
        vscode.postMessage({
            command: 'updateCode',
            code: code,
            shouldConfirmOverwrite: window.shouldConfirmOverwrite
        });
    }, 250);
}

// --- Event Listeners ---

// Listen for changes in the workspace
workspace.addChangeListener(updateCode);

// Listen for messages from the extension
window.addEventListener('message', event => {
    const message = event.data;
    switch (message.command) {
        case 'initializeWorkspace':
            Blockly.Events.disable();
            try {
                const xml = Blockly.utils.xml.textToDom(message.xml);
                Blockly.Xml.domToWorkspace(xml, workspace);
                window.shouldConfirmOverwrite = message.shouldConfirmOverwrite; // Store the flag
            } finally {
                Blockly.Events.enable();
            }
            // Hide the loading overlay
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
            break;
        case 'overwriteConfirmed':
            // The extension has confirmed the overwrite, so we don't need to ask again.
            window.shouldConfirmOverwrite = false;
            break;
        case 'undo':
            Blockly.Events.disable();
            try {
                workspace.undo(false);
            } finally {
                Blockly.Events.enable();
            }
            break;
        case 'firstUpdateDone':
            isFirstModification = false;
            break;
        case 'promptResponse':
            if (window.promptCallback) {
                window.promptCallback(message.value);
                window.promptCallback = null; // Clear the callback
            }
            break;
    }
});

// --- Initial Load ---
// Signal to the extension that the webview is ready to be initialized.
vscode.postMessage({ command: 'webviewReady' });

// Override Blockly's default prompt to use VS Code's input box via the extension.
Blockly.dialog.setPrompt(function(message, defaultValue, callback) {
    vscode.postMessage({
        command: 'prompt',
        message: message,
        defaultValue: defaultValue
    });
    window.promptCallback = callback;
});