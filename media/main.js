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
const toolboxXml = document.getElementById('toolbox-xml').textContent;
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolboxXml,
    media: '',      // 不載入外部媒體
    sounds: false,  // 關閉音效模組
    zoom: {
        controls: true, // 顯示 +/- 按鈕
        wheel: false,    // 關閉滾輪縮放
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
    },
    move: {
        scrollbars: {
            vertical: true,
            horizontal: true,  // 啟用水平滾動
        },
        drag: true,      // 可用滑鼠拖動整個畫面
        wheel: true      // 啟用滾輪可滾動畫面
    }
});

// Register the button callback for creating a variable
workspace.registerButtonCallback('CREATE_VARIABLE', function(button) {
    Blockly.Variables.createVariableButtonHandler(workspace);
});

// --- State and Communication ---
const vscode = acquireVsCodeApi();
let debounceTimer;
let isDirty = false;
window.promptCallback = null; // Store callback for prompt response

// --- Functions ---
function updateCode(event, suppressDirty = false) {
    // Don't generate code for UI events.
    if (event && event.isUiEvent) {
        return;
    }
    // NEW: Don't generate code if a drag gesture is in progress.
    if (workspace.isDragging()) {
        return;
    }

    if (!suppressDirty && !isDirty) { // Only mark dirty if not suppressed and state changes
        isDirty = true;
        vscode.postMessage({ command: 'dirtyStateChanged', isDirty: true });
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const code = Blockly.Arduino.workspaceToCode(workspace);
        vscode.postMessage({
            command: 'updateCode',
            code: code,
            inoUri: window.currentInoUri // Include the current .ino URI
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
        case 'initializeWorkspace': {
            Blockly.Events.disable();
            try {
                workspace.clear();
                const xml = Blockly.utils.xml.textToDom(message.xml);
                Blockly.Xml.domToWorkspace(xml, workspace);
                window.currentInoUri = message.inoUri; // Store the current .ino URI
                window.currentXmlName = message.xmlName ? message.xmlName.split(/[\\/]/).pop() : '未命名專案';
                isDirty = false; // Initial state is clean
                vscode.postMessage({ command: 'dirtyStateChanged', isDirty: false });
            } finally {
                Blockly.Events.enable();
            }
            updateCode(undefined, true);
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
            break;
        }
        case 'saveComplete':
            isDirty = false;
            vscode.postMessage({ command: 'dirtyStateChanged', isDirty: false });
            break;
        case 'requestSave': {
            const xml = Blockly.Xml.workspaceToDom(workspace);
            const xmlText = Blockly.Xml.domToText(xml);
            vscode.postMessage({
                command: 'saveProject',
                xml: xmlText,
                inoUri: window.currentInoUri
            });
            break;
        }
        case 'confirmResponse':
            if (window.confirmCallback) {
                window.confirmCallback(message.value);
                window.confirmCallback = null;
            }
            break;
        case 'promptResponse':
            if (window.promptCallback) {
                window.promptCallback(message.value);
                window.promptCallback = null;
            }
            break;
        case 'panelActive':
            document.getElementById('inactive-overlay').style.display = 'none';
            break;
        case 'panelInactive': {
            const overlay = document.getElementById('inactive-overlay');
            overlay.textContent = `請切換至與 [piBlockly: ${window.currentXmlName}] 對應的程式碼頁面以啟用編輯`;
            overlay.style.display = 'flex';
            break;
        }
    }
});

// Add a blur event listener to handle mouse-up events outside the webview
window.addEventListener('blur', () => {
  if (workspace && workspace.isDragging()) {
    Blockly.Touch.terminate();
  }
});

// --- Orphan Block Handling ---
function updateOrphanBlocks(event) {
    // If the event is a change to a block's disabled state, ignore it to prevent infinite loops.
    if (event.type === 'change' && event.element === 'disabled') {
        return;
    }

    // We are interested in events that change the block layout or field values.
    if (event.type !== 'move' &&
        event.type !== 'create' &&
        event.type !== 'delete' &&
        event.type !== 'change') {
        return;
    }

    const allBlocks = workspace.getAllBlocks(true);

    // First, enable all blocks by removing the 'orphan' reason.
    allBlocks.forEach(block => {
        block.setDisabledReason(false, 'orphan');
    });

    const allowedRootBlocks = [
        'initializes_setup',
        'initializes_loop',
        'custom_procedures_defreturn',
        'custom_procedures_defnoreturn',
        'coding_raw_definition', // This is for global raw code, so it can be a root.
        'array_declare', // Allow global array declarations as root blocks.
        'variables_declare_global' // Allow global variable declarations as root blocks.
    ];

    const topBlocks = workspace.getTopBlocks(true);

    topBlocks.forEach(topBlock => {
        let isAllowedRoot = false;

        if (allowedRootBlocks.includes(topBlock.type)) {
            // For array_declare, only allow as root if scope is GLOBAL
            if (topBlock.type === 'array_declare' && topBlock.getFieldValue('SCOPE') === 'LOCAL') {
                isAllowedRoot = false;
            } else {
                isAllowedRoot = true;
            }
        }

        if (!isAllowedRoot) {
            // This is a true orphan, disable it and its descendants.
            const descendants = topBlock.getDescendants(false);
            descendants.forEach(descendant => {
                descendant.setDisabledReason(true, 'orphan');
            });
        }
    });
}

workspace.addChangeListener(updateOrphanBlocks);

// --- Initial Load ---
// Signal to the extension that the webview is ready to be initialized.
vscode.postMessage({ command: 'webviewReady' });

document.getElementById('saveButton').addEventListener('click', () => {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    vscode.postMessage({
        command: 'saveProject',
        xml: xmlText,
        inoUri: window.currentInoUri
    });
});

document.getElementById('saveAsButton').addEventListener('click', () => {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    vscode.postMessage({
        command: 'saveProjectAs',
        xml: xmlText,
    });
});

document.getElementById('closeButton').addEventListener('click', () => {
    vscode.postMessage({ command: 'closeEditor' });
});

function setupHoverEffects(buttonId) {
    const button = document.getElementById(buttonId);
    const defaultSrc = button.getAttribute('data-src');
    const hoverSrc = button.getAttribute('data-hover-src');

    button.addEventListener('mouseover', () => {
        button.src = hoverSrc;
    });

    button.addEventListener('mouseout', () => {
        button.src = defaultSrc;
    });
}

setupHoverEffects('saveButton');
setupHoverEffects('saveAsButton');
setupHoverEffects('closeButton');



// Override Blockly's default prompt to use VS Code's input box via the extension.
Blockly.dialog.setPrompt(function(message, defaultValue, callback) {
    vscode.postMessage({
        command: 'prompt',
        message: message,
        defaultValue: defaultValue
    });
    window.promptCallback = callback;
});

Blockly.dialog.setConfirm(function(message, callback) {
    vscode.postMessage({
        command: 'confirm',
        message: message
    });
    window.confirmCallback = callback;
});