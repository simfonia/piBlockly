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

// --- State and Communication ---
const vscode = acquireVsCodeApi();
let debounceTimer;
let isFirstModification = true; // Flag for first "real" change

// --- Functions ---
function updateCode(event) {
    // Don't generate code for UI events.
    if (event && event.isUiEvent) {
        return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const code = Blockly.MyArduino.workspaceToCode(workspace);
        vscode.postMessage({
            command: 'updateCode',
            code: code,
            isFirstUpdate: isFirstModification
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
    }
});

// --- Initial Load ---

// Load initial blocks without firing events
Blockly.Events.disable();
try {
    const initialXml = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <block type="initializes_setup" id="setup_block" x="100" y="50">
    <next>
      <block type="initializes_loop" id="loop_block"></block>
    </next>
  </block>
</xml>
`;
    const xmlDom = (Blockly.utils && Blockly.utils.xml) ? Blockly.utils.xml.textToDom(initialXml) : Blockly.Xml.textToDom(initialXml);
    Blockly.Xml.domToWorkspace(xmlDom, workspace);
} finally {
    Blockly.Events.enable();
}