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

// --- Code Generation and Communication ---
const vscode = acquireVsCodeApi();

let debounceTimer;

function updateCode() {
    // Clear any existing timer.
    clearTimeout(debounceTimer);

    // Set a new timer to run the code generation after a short delay.
    debounceTimer = setTimeout(() => {
        const code = Blockly.MyArduino.workspaceToCode(workspace);
        
        vscode.postMessage({
            command: 'updateCode', 
            code: code
        });
    }, 250); // 250ms delay
}

// Add a change listener to the workspace to automatically update the code.
workspace.addChangeListener(updateCode);