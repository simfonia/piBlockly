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

// --- Theme Definitions ---
const engineerTheme = Blockly.Theme.defineTheme('engineer', {
  'base': Blockly.Themes.Classic,
  'categoryStyles': {
    'arduino_category': { 'colour': Blockly.Msg.ARDUINO_HUE },
    'arduino_structure_category': { 'colour': Blockly.Msg.ARDUINO_STRUCTURE_HUE },
    'arduino_io_category': { 'colour': Blockly.Msg.ARDUINO_HUE },
    'arduino_time_category': { 'colour': Blockly.Msg.ARDUINO_TIME_HUE },
    'arduino_serial_category': { 'colour': Blockly.Msg.ARDUINO_SERIAL_HUE },
    'logic_category': { 'colour': Blockly.Msg.LOGIC_HUE },
    'loop_category': { 'colour': Blockly.Msg.LOOPS_HUE },
    'math_category': { 'colour': Blockly.Msg.MATH_HUE },
    'text_category': { 'colour': Blockly.Msg.TEXT_HUE },
    'variable_category': { 'colour': Blockly.Msg.VARIABLES_HUE },
    'procedure_category': { 'colour': Blockly.Msg.FUNCTIONS_HUE },
    'picar_category': { 'colour': Blockly.Msg.PICAR_HUE },
    'coding_category': { 'colour': Blockly.Msg.CODING_HUE },
    'array_category': { 'colour': Blockly.Msg.ARRAY_HUE },
  },
  'blockStyles': {
    'initializes_block': { 'colourPrimary': Blockly.Msg.ARDUINO_STRUCTURE_HUE }, // Placeholder for actual block, will be removed if not directly used
    'arduino_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_CONTROL_HUE },
    'digital_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_DIGITAL_IO_HUE },
    'analog_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_ANALOG_IO_HUE },
    'arduino_time_block': { 'colourPrimary': Blockly.Msg.ARDUINO_TIME_HUE },
    'arduino_serial_block': { 'colourPrimary': Blockly.Msg.ARDUINO_SERIAL_HUE },
    'arduino_math_block': { 'colourPrimary': Blockly.Msg.ARDUINO_MATH_HUE },
    'logic_blocks': { 'colourPrimary': Blockly.Msg.LOGIC_HUE },
    'loop_blocks': { 'colourPrimary': Blockly.Msg.LOOPS_HUE },
    'math_blocks': { 'colourPrimary': Blockly.Msg.MATH_HUE },
    'text_blocks': { 'colourPrimary': Blockly.Msg.TEXT_HUE },
    'variable_blocks': { 'colourPrimary': Blockly.Msg.VARIABLES_HUE },
    'procedure_blocks': { 'colourPrimary': Blockly.Msg.FUNCTIONS_HUE },

    'picar_block': { 'colourPrimary': Blockly.Msg.PICAR_HUE },
    'coding_block': { 'colourPrimary': Blockly.Msg.CODING_HUE },
    'array_block': { 'colourPrimary': Blockly.Msg.ARRAY_HUE },
  },
});

const angelTheme = Blockly.Theme.defineTheme('angel', {
  'base': Blockly.Themes.Classic,
  'categoryStyles': {
    'arduino_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_HUE },
    'arduino_structure_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_HUE },
    'arduino_io_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_HUE },
    'arduino_time_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_HUE },
    'arduino_serial_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_HUE },
    'logic_category': { 'colour': Blockly.Msg.LOGIC_HUE },
    'loop_category': { 'colour': Blockly.Msg.LOOPS_HUE },
    'math_category': { 'colour': Blockly.Msg.MATH_HUE },
    // ...
    'math_blocks': { 'colourPrimary': Blockly.Msg.MATH_HUE },
    'text_category': { 'colour': Blockly.Msg.TEXT_HUE },
    // ...
    'text_blocks': { 'colourPrimary': Blockly.Msg.TEXT_HUE },
    'variable_blocks': { 'colourPrimary': Blockly.Msg.ANGEL_VARIABLES_HUE },
    'procedure_blocks': { 'colourPrimary': Blockly.Msg.ANGEL_FUNCTIONS_HUE },
    'coding_blocks': { 'colourPrimary': 140 },
    
    'picar_block': { 'colourPrimary': Blockly.Msg.PICAR_HUE },
    'coding_block': { 'colourPrimary': Blockly.Msg.CODING_HUE },
    'array_block': { 'colourPrimary': Blockly.Msg.ARRAY_HUE },
  },
});

// A map to store the different message style prefixes (for switching block text)
const blockMessageStylesMap = {
    'engineer': {
        'INITIALIZES_SETUP_APPENDTEXT': 'BKY_INITIALIZES_SETUP_MSG_ENGINEER', // This is the Msg key that changes
        'INITIALIZES_LOOP_APPENDTEXT': 'BKY_INITIALIZES_LOOP_MSG_ENGINEER',
        // Logic
        'LOGIC_COMPARE_MESSAGE': 'BKY_LOGIC_COMPARE_MSG_ENGINEER',
        'LOGIC_OPERATION_MESSAGE': 'BKY_LOGIC_OPERATION_MSG_ENGINEER',
        'LOGIC_NEGATE_MESSAGE': 'BKY_LOGIC_NEGATE_MSG_ENGINEER',
        // Logic Operation Operators
        'LOGIC_OPERATION_AND': 'BKY_LOGIC_OPERATION_AND_ENGINEER',
        'LOGIC_OPERATION_OR': 'BKY_LOGIC_OPERATION_OR_ENGINEER',
        // Logic Boolean
        'LOGIC_BOOLEAN_TRUE': 'BKY_LOGIC_BOOLEAN_TRUE_ENGINEER',
        'LOGIC_BOOLEAN_FALSE': 'BKY_LOGIC_BOOLEAN_FALSE_ENGINEER',
        // Loops
        'CONTROLS_FOR_MESSAGE': 'BKY_CONTROLS_FOR_MSG_ENGINEER',
        'CONTROLS_WHILEUNTIL_MESSAGE': 'BKY_CONTROLS_WHILEUNTIL_MSG_ENGINEER',
        'CONTROLS_FLOW_STATEMENTS_MESSAGE': 'BKY_CONTROLS_FLOW_STATEMENTS_MSG_ENGINEER',
        // Variables
        'VARIABLES_DECLARE_GLOBAL_MESSAGE': 'BKY_VARIABLES_DECLARE_GLOBAL_MSG_ENGINEER',
        'VARIABLES_DECLARE_LOCAL_MESSAGE': 'BKY_VARIABLES_DECLARE_LOCAL_MSG_ENGINEER',
        'VARIABLES_SET_MESSAGE': 'BKY_VARIABLES_SET_MSG_ENGINEER',
        // Text
        'TEXT_APPEND_MESSAGE': 'BKY_TEXT_APPEND_MSG_ENGINEER',
        'TEXT_LENGTH_MESSAGE': 'BKY_TEXT_LENGTH_MESSAGE_ENGINEER',
        // Functions (these are complex, but we need generic keys for them)
        'CUSTOM_PROCEDURES_DEFNORETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_DEFNORETURN_MSG_ENGINEER',
        'CUSTOM_PROCEDURES_DEFRETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_DEFRETURN_MSG_ENGINEER',
        'CUSTOM_PROCEDURES_CALLNORETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_CALLNORETURN_MSG_ENGINEER',
        'CUSTOM_PROCEDURES_CALLRETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_CALLRETURN_MSG_ENGINEER',
        'CUSTOM_PROCEDURES_MUTATORCONTAINER_MESSAGE': 'BKY_CUSTOM_PROCEDURES_MUTATORCONTAINER_MSG_ENGINEER',
        'CUSTOM_PROCEDURES_MUTATORARG_MESSAGE': 'BKY_CUSTOM_PROCEDURES_MUTATORARG_MSG_ENGINEER',
        'CUSTOM_PROCEDURES_RETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_RETURN_MSG_ENGINEER',
        // Arduino IO
        'ARDUINO_PIN_MODE_MSG': 'BKY_ARDUINO_PIN_MODE_MSG_ENGINEER',
        'ARDUINO_DIGITAL_READ_MSG': 'BKY_ARDUINO_DIGITAL_READ_MSG_ENGINEER',
        'ARDUINO_DIGITAL_WRITE_MSG': 'BKY_ARDUINO_DIGITAL_WRITE_MSG_ENGINEER',
        'ARDUINO_ANALOG_READ_MSG': 'BKY_ARDUINO_ANALOG_READ_MSG_ENGINEER',
        'ARDUINO_ANALOG_WRITE_MSG': 'BKY_ARDUINO_ANALOG_WRITE_MSG_ENGINEER',
        // Arduino Time
        'ARDUINO_DELAY_MSG': 'BKY_ARDUINO_DELAY_MSG_ENGINEER',
        'ARDUINO_DELAY_MICROSECONDS_MSG': 'BKY_ARDUINO_DELAY_MICROSECONDS_MSG_ENGINEER',
        'ARDUINO_MILLIS_MSG': 'BKY_ARDUINO_MILLIS_MSG_ENGINEER',
        'ARDUINO_MICROS_MSG': 'BKY_ARDUINO_MICROS_MSG_ENGINEER',
        // Arduino Serial
        'ARDUINO_SERIAL_BEGIN_MSG': 'BKY_ARDUINO_SERIAL_BEGIN_MSG_ENGINEER',
        'ARDUINO_SERIAL_PRINT_MSG': 'BKY_ARDUINO_SERIAL_PRINT_MSG_ENGINEER',
        'ARDUINO_SERIAL_PRINTLN_MSG': 'BKY_ARDUINO_SERIAL_PRINTLN_MSG_ENGINEER',
        'ARDUINO_SERIAL_AVAILABLE_MSG': 'BKY_ARDUINO_SERIAL_AVAILABLE_MSG_ENGINEER',
        'ARDUINO_SERIAL_READ_MSG': 'BKY_ARDUINO_SERIAL_READ_MSG_ENGINEER',
        // Coding
        'CODING_RAW_STATEMENT_MESSAGE': 'BKY_CODING_RAW_STATEMENT_ENGINEER',
        'CODING_RAW_INPUT_MESSAGE': 'BKY_CODING_RAW_INPUT_ENGINEER',
        'CODING_RAW_DEFINITION_MESSAGE': 'BKY_CODING_RAW_DEFINITION_ENGINEER',
        'CODING_RAW_WRAPPER_TOP_MESSAGE': 'BKY_CODING_RAW_WRAPPER_TOP_ENGINEER',
        'CODING_RAW_WRAPPER_BOTTOM_MESSAGE': 'BKY_CODING_RAW_WRAPPER_BOTTOM_ENGINEER',
        // Arduino Math
        'ARDUINO_CONSTRAIN_MSG': 'BKY_ARDUINO_CONSTRAIN_MSG_ENGINEER',
        'ARDUINO_MAP_MSG': 'BKY_ARDUINO_MAP_MSG_ENGINEER',
        'ARDUINO_MATH_RANDOM_SEED_MSG': 'BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ENGINEER',
        'ARDUINO_MATH_RANDOM_INT_MSG': 'BKY_ARDUINO_MATH_RANDOM_INT_MSG_ENGINEER',
        // Controls If
        'CONTROLS_IF_MSG_IF': 'BKY_CONTROLS_IF_MSG_IF_ENGINEER',
        'CONTROLS_IF_MSG_THEN': 'BKY_CONTROLS_IF_MSG_THEN_ENGINEER',
        'CONTROLS_IF_MSG_ELSEIF': 'BKY_CONTROLS_IF_MSG_ELSEIF_ENGINEER',
        'CONTROLS_IF_MSG_ELSE': 'BKY_CONTROLS_IF_MSG_ELSE_ENGINEER',
        // Array Blocks
        'ARRAY_DECLARE_GLOBAL_TITLE_GENERIC': 'BKY_ARRAY_DECLARE_GLOBAL_TITLE_ENGINEER',
        'ARRAY_DECLARE_GLOBAL_TOOLTIP_GENERIC': 'BKY_ARRAY_DECLARE_GLOBAL_TOOLTIP_ENGINEER',
        'ARRAY_DECLARE_LOCAL_TITLE_GENERIC': 'BKY_ARRAY_DECLARE_LOCAL_TITLE_ENGINEER',
        'ARRAY_DECLARE_LOCAL_TOOLTIP_GENERIC': 'BKY_ARRAY_DECLARE_LOCAL_TOOLTIP_ENGINEER',
        'ARRAY_GET_BRACKET_OPEN_GENERIC': 'BKY_ARRAY_GET_BRACKET_OPEN_ENGINEER',
        'ARRAY_GET_BRACKET_CLOSE_GENERIC': 'BKY_ARRAY_GET_BRACKET_CLOSE_ENGINEER',
        'ARRAY_GET_TOOLTIP_GENERIC': 'BKY_ARRAY_GET_TOOLTIP_ENGINEER',
        'ARRAY_SET_BRACKET_OPEN_GENERIC': 'BKY_ARRAY_SET_BRACKET_OPEN_ENGINEER',
        'ARRAY_SET_BRACKET_CLOSE_EQUALS_GENERIC': 'BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ENGINEER',
        'ARRAY_SET_TOOLTIP_GENERIC': 'BKY_ARRAY_SET_TOOLTIP_ENGINEER',
        'ARRAY_LENGTH_TITLE_GENERIC': 'BKY_ARRAY_LENGTH_TITLE_ENGINEER',
        'ARRAY_LENGTH_TOOLTIP_GENERIC': 'BKY_ARRAY_LENGTH_TOOLTIP_ENGINEER',
    },
    'angel': {
        'ARRAY_DECLARE_GLOBAL_TITLE_GENERIC': 'BKY_ARRAY_DECLARE_GLOBAL_TITLE_ANGEL',
        'ARRAY_DECLARE_GLOBAL_TOOLTIP_GENERIC': 'BKY_ARRAY_DECLARE_GLOBAL_TOOLTIP_ANGEL',
        'ARRAY_DECLARE_LOCAL_TITLE_GENERIC': 'BKY_ARRAY_DECLARE_LOCAL_TITLE_ANGEL',
        'ARRAY_DECLARE_LOCAL_TOOLTIP_GENERIC': 'BKY_ARRAY_DECLARE_LOCAL_TOOLTIP_ANGEL',
        'ARRAY_GET_BRACKET_OPEN_GENERIC': 'BKY_ARRAY_GET_BRACKET_OPEN_ANGEL',
        'ARRAY_GET_BRACKET_CLOSE_GENERIC': 'BKY_ARRAY_GET_BRACKET_CLOSE_ANGEL',
        'ARRAY_GET_TOOLTIP_GENERIC': 'BKY_ARRAY_GET_TOOLTIP_ANGEL',
        'ARRAY_SET_BRACKET_OPEN_GENERIC': 'BKY_ARRAY_SET_BRACKET_OPEN_ANGEL',
        'ARRAY_SET_BRACKET_CLOSE_EQUALS_GENERIC': 'BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ANGEL',
        'ARRAY_SET_TOOLTIP_GENERIC': 'BKY_ARRAY_SET_TOOLTIP_ANGEL',
        'ARRAY_LENGTH_TITLE_GENERIC': 'BKY_ARRAY_LENGTH_TITLE_ANGEL',
        'ARRAY_LENGTH_TOOLTIP_GENERIC': 'BKY_ARRAY_LENGTH_TOOLTIP_ANGEL',

        'INITIALIZES_SETUP_APPENDTEXT': 'BKY_INITIALIZES_SETUP_MSG_ANGEL',
        'INITIALIZES_LOOP_APPENDTEXT': 'BKY_INITIALIZES_LOOP_MSG_ANGEL',
        // Logic
        'LOGIC_COMPARE_MESSAGE': 'BKY_LOGIC_COMPARE_MSG_ANGEL',
        'LOGIC_OPERATION_MESSAGE': 'BKY_LOGIC_OPERATION_MSG_ANGEL',
        'LOGIC_NEGATE_MESSAGE': 'BKY_LOGIC_NEGATE_MSG_ANGEL',
        // Logic Operation Operators
        'LOGIC_OPERATION_AND': 'BKY_LOGIC_OPERATION_AND_ANGEL',
        'LOGIC_OPERATION_OR': 'BKY_LOGIC_OPERATION_OR_ANGEL',
        // Logic Boolean
        'LOGIC_BOOLEAN_TRUE': 'BKY_LOGIC_BOOLEAN_TRUE_ANGEL',
        'LOGIC_BOOLEAN_FALSE': 'BKY_LOGIC_BOOLEAN_FALSE_ANGEL',
        // Loops
        'CONTROLS_FOR_MESSAGE': 'BKY_CONTROLS_FOR_MSG_ANGEL',
        'CONTROLS_WHILEUNTIL_MESSAGE': 'BKY_CONTROLS_WHILEUNTIL_MSG_ANGEL',
        'CONTROLS_FLOW_STATEMENTS_MESSAGE': 'BKY_CONTROLS_FLOW_STATEMENTS_MSG_ANGEL',
        // Variables
        'VARIABLES_DECLARE_GLOBAL_MESSAGE': 'BKY_VARIABLES_DECLARE_GLOBAL_MSG_ANGEL',
        'VARIABLES_DECLARE_LOCAL_MESSAGE': 'BKY_VARIABLES_DECLARE_LOCAL_MSG_ANGEL',
        'VARIABLES_SET_MESSAGE': 'BKY_VARIABLES_SET_MSG_ANGEL',
        // Text
        'TEXT_APPEND_MESSAGE': 'BKY_TEXT_APPEND_MSG_ANGEL',
        'TEXT_LENGTH_MESSAGE': 'BKY_TEXT_LENGTH_MESSAGE_ANGEL',
        // Functions
        'CUSTOM_PROCEDURES_DEFNORETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_DEFNORETURN_MSG_ANGEL',
        'CUSTOM_PROCEDURES_DEFRETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_DEFRETURN_MSG_ANGEL',
        'CUSTOM_PROCEDURES_CALLNORETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_CALLNORETURN_MSG_ANGEL',
        'CUSTOM_PROCEDURES_CALLRETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_CALLRETURN_MSG_ANGEL',
        'CUSTOM_PROCEDURES_MUTATORCONTAINER_MESSAGE': 'BKY_CUSTOM_PROCEDURES_MUTATORCONTAINER_MSG_ANGEL',
        'CUSTOM_PROCEDURES_MUTATORARG_MESSAGE': 'BKY_CUSTOM_PROCEDURES_MUTATORARG_MSG_ANGEL',
        'CUSTOM_PROCEDURES_RETURN_MESSAGE': 'BKY_CUSTOM_PROCEDURES_RETURN_MSG_ANGEL',
        // Arduino IO
        'ARDUINO_PIN_MODE_MSG': 'BKY_ARDUINO_PIN_MODE_MSG_ANGEL',
        'ARDUINO_DIGITAL_READ_MSG': 'BKY_ARDUINO_DIGITAL_READ_MSG_ANGEL',
        'ARDUINO_DIGITAL_WRITE_MSG': 'BKY_ARDUINO_DIGITAL_WRITE_MSG_ANGEL',
        'ARDUINO_ANALOG_READ_MSG': 'BKY_ARDUINO_ANALOG_READ_MSG_ANGEL',
        'ARDUINO_ANALOG_WRITE_MSG': 'BKY_ARDUINO_ANALOG_WRITE_MSG_ANGEL',
        // Arduino Time
        'ARDUINO_DELAY_MSG': 'BKY_ARDUINO_DELAY_MSG_ANGEL',
        'ARDUINO_DELAY_MICROSECONDS_MSG': 'BKY_ARDUINO_DELAY_MICROSECONDS_MSG_ANGEL',
        'ARDUINO_MILLIS_MSG': 'BKY_ARDUINO_MILLIS_MSG_ANGEL',
        'ARDUINO_MICROS_MSG': 'BKY_ARDUINO_MICROS_MSG_ANGEL',
        // Arduino Serial
        'ARDUINO_SERIAL_BEGIN_MSG': 'BKY_ARDUINO_SERIAL_BEGIN_MSG_ANGEL',
        'ARDUINO_SERIAL_PRINT_MSG': 'BKY_ARDUINO_SERIAL_PRINT_MSG_ANGEL',
        'ARDUINO_SERIAL_PRINTLN_MSG': 'BKY_ARDUINO_SERIAL_PRINTLN_MSG_ANGEL',
        'ARDUINO_SERIAL_AVAILABLE_MSG': 'BKY_ARDUINO_SERIAL_AVAILABLE_MSG_ANGEL',
        'ARDUINO_SERIAL_READ_MSG': 'BKY_ARDUINO_SERIAL_READ_MSG_ANGEL',
        // Coding
        'CODING_RAW_STATEMENT_MESSAGE': 'BKY_CODING_RAW_STATEMENT_ANGEL',
        'CODING_RAW_INPUT_MESSAGE': 'BKY_CODING_RAW_INPUT_ANGEL',
        'CODING_RAW_DEFINITION_MESSAGE': 'BKY_CODING_RAW_DEFINITION_ANGEL',
        'CODING_RAW_WRAPPER_TOP_MESSAGE': 'BKY_CODING_RAW_WRAPPER_TOP_ANGEL',
        'CODING_RAW_WRAPPER_BOTTOM_MESSAGE': 'BKY_CODING_RAW_WRAPPER_BOTTOM_ANGEL',
        // Arduino Math
        'ARDUINO_CONSTRAIN_MSG': 'BKY_ARDUINO_CONSTRAIN_MSG_ANGEL',
        'ARDUINO_MAP_MSG': 'BKY_ARDUINO_MAP_MSG_ANGEL',
        'ARDUINO_MATH_RANDOM_SEED_MSG': 'BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ANGEL',
        'ARDUINO_MATH_RANDOM_INT_MSG': 'BKY_ARDUINO_MATH_RANDOM_INT_MSG_ANGEL',
        // Controls If
        'CONTROLS_IF_MSG_IF': 'BKY_CONTROLS_IF_MSG_IF_ANGEL',
        'CONTROLS_IF_MSG_THEN': 'BKY_CONTROLS_IF_MSG_THEN_ANGEL',
        'CONTROLS_IF_MSG_ELSEIF': 'BKY_CONTROLS_IF_MSG_ELSEIF_ANGEL',
        'CONTROLS_IF_MSG_ELSE': 'BKY_CONTROLS_IF_MSG_ELSE_ANGEL',
    }
};

// Function to apply the chosen style
function applyStyle(themeName, isInitialLoad = false) {
    Blockly.Msg.STYLE_MODE = themeName; // Set global style mode
    let currentXml;
    if (!isInitialLoad) {
        currentXml = Blockly.Xml.workspaceToDom(workspace);
    }

    // Apply color theme
    const themeToApply = themeName === 'angel' ? angelTheme : engineerTheme;
    workspace.setTheme(themeToApply);

    // Apply text messages
    const currentMessageMap = blockMessageStylesMap[themeName];
    if (currentMessageMap) {
        for (const genericBlocklyMsgKey in currentMessageMap) {
            if (Object.prototype.hasOwnProperty.call(currentMessageMap, genericBlocklyMsgKey)) {
                Blockly.Msg[genericBlocklyMsgKey] = Blockly.Msg[currentMessageMap[genericBlocklyMsgKey]];
            }
        }
    }

    // Dynamically set the message for the built-in text_join block
    if (themeName === 'angel') {
        Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH = Blockly.Msg.BKY_TEXT_JOIN_MSG_ANGEL;
    } else { // engineer
        Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH = Blockly.Msg.BKY_TEXT_JOIN_MSG_ENGINEER;
    }

    // Reload workspace to apply changes, but only if it's not the initial load
    if (!isInitialLoad) {
        workspace.clear();
        Blockly.Xml.domToWorkspace(currentXml, workspace);
    }

    // Save preference
    localStorage.setItem('blocklyTheme', themeName);
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

// ... rest of main.js content


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
                // Apply theme before loading XML
                const savedTheme = localStorage.getItem('blocklyTheme') || 'engineer';
                applyStyle(savedTheme, true); // Apply style without reloading workspace

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
        'array_declare_global', // Allow global array declarations as root blocks.
        'variables_declare_global' // Allow global variable declarations as root blocks.
    ];

    const topBlocks = workspace.getTopBlocks(true);

    topBlocks.forEach(topBlock => {
        let isAllowedRoot = false;

        if (allowedRootBlocks.includes(topBlock.type)) {
            isAllowedRoot = true;
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

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Set initial state of toggle based on saved theme
        const savedTheme = localStorage.getItem('blocklyTheme') || 'engineer';
        themeToggle.checked = (savedTheme === 'angel');

        themeToggle.addEventListener('change', (event) => {
            const newTheme = event.target.checked ? 'angel' : 'engineer';
            applyStyle(newTheme);
        });
    }
});

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