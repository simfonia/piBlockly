import { loadModule } from './module_loader.js';

/**
 * @fileoverview This is the main script for the piBlockly webview. It handles:
 * 1.  Defining and managing Blockly themes (Engineer and Angel).
 * 2.  Initializing the Blockly workspace.
 * 3.  Handling communication with the VS Code extension backend (e.g., loading/saving files).
 * 4.  Managing UI elements like the theme switcher and toolbar buttons.
 * 5.  Implementing application logic like code generation and orphan block detection.
 */

// Register Blockly field plugins if they exist on the window object.
// These are custom fields used by some blocks.
const FieldColour = window.FieldColour || window.Blockly.FieldColour;
const FieldMultilineInput = window.FieldMultilineInput || window.Blockly.FieldMultilineInput;

if (FieldColour) {
    Blockly.registry.register('field', 'field_colour', FieldColour);
}
if (FieldMultilineInput) {
    Blockly.registry.register('field', 'field_multilineinput', FieldMultilineInput);
}

// Register standard FieldTextInput for jsonInit compatibility
const FieldTextInput = window.FieldTextInput || window.Blockly.FieldTextInput;
if (FieldTextInput) {
    Blockly.registry.register('field', 'field_textinput', FieldTextInput);
}

// =============================================================================
// --- THEME DEFINITIONS ---
// =============================================================================
// Defines the visual styles for categories and blocks. All colors are referenced
// from language files (e.g., en.js) via `Blockly.Msg` to allow for easy customization.
// NOTE: Themes are now defined inside DOMContentLoaded after language files are loaded.
let engineerTheme;
let angelTheme;

/**
 * A map that defines which language file keys to use for block text in each theme.
 * This allows the text on blocks (e.g., "if", "do", "set") to change when the theme changes.
 * The key is the generic Blockly.Msg key, and the value is the theme-specific key.
 */
const blockMessageStylesMap = {
    'engineer': {
        // Arduino Structure
        'INITIALIZES_SETUP_APPENDTEXT': 'BKY_INITIALIZES_SETUP_MSG_ENGINEER',
        'INITIALIZES_LOOP_APPENDTEXT': 'BKY_INITIALIZES_LOOP_MSG_ENGINEER',
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
        'CODING_COMMENT_MESSAGE': 'BKY_CODING_COMMENT_MSG_ENGINEER',
        'CODING_INCLUDE_MESSAGE': 'BKY_CODING_INCLUDE_MSG_ENGINEER',
        'CODING_RAW_STATEMENT_MESSAGE': 'BKY_CODING_RAW_STATEMENT_ENGINEER',
        'CODING_RAW_INPUT_MESSAGE': 'BKY_CODING_RAW_INPUT_ENGINEER',
        'CODING_RAW_DEFINITION_MESSAGE': 'BKY_CODING_RAW_DEFINITION_ENGINEER',
        'CODING_RAW_WRAPPER_TOP_MESSAGE': 'BKY_CODING_RAW_WRAPPER_TOP_ENGINEER',
        'CODING_RAW_WRAPPER_BOTTOM_MESSAGE': 'BKY_CODING_RAW_WRAPPER_BOTTOM_ENGINEER',

        // Logic
        'CONTROLS_IF_MSG_IF': 'BKY_CONTROLS_IF_MSG_IF_ENGINEER',
        'CONTROLS_IF_MSG_THEN': 'BKY_CONTROLS_IF_MSG_THEN_ENGINEER',
        'CONTROLS_IF_MSG_ELSEIF': 'BKY_CONTROLS_IF_MSG_ELSEIF_ENGINEER',
        'CONTROLS_IF_MSG_ELSE': 'BKY_CONTROLS_IF_MSG_ELSE_ENGINEER',
        'LOGIC_COMPARE_MESSAGE': 'BKY_LOGIC_COMPARE_MSG_ENGINEER',
        'LOGIC_OPERATION_MESSAGE': 'BKY_LOGIC_OPERATION_MSG_ENGINEER',
        'LOGIC_NEGATE_MESSAGE': 'BKY_LOGIC_NEGATE_MSG_ENGINEER',
        'LOGIC_OPERATION_AND': 'BKY_LOGIC_OPERATION_AND_ENGINEER',
        'LOGIC_OPERATION_OR': 'BKY_LOGIC_OPERATION_OR_ENGINEER',
        'LOGIC_BOOLEAN_TRUE': 'BKY_LOGIC_BOOLEAN_TRUE_ENGINEER',
        'LOGIC_BOOLEAN_FALSE': 'BKY_LOGIC_BOOLEAN_FALSE_ENGINEER',

        // Loops
        'CONTROLS_FOR_MESSAGE': 'BKY_CONTROLS_FOR_MSG_ENGINEER',
        'CONTROLS_WHILE_MESSAGE': 'BKY_CONTROLS_WHILE_MSG_ENGINEER',
        'CONTROLS_FLOW_STATEMENTS_MESSAGE': 'BKY_CONTROLS_FLOW_STATEMENTS_MSG_ENGINEER',

        // Math
        'ARDUINO_CONSTRAIN_MSG': 'BKY_ARDUINO_CONSTRAIN_MSG_ENGINEER',
        'ARDUINO_MAP_MSG': 'BKY_ARDUINO_MAP_MSG_ENGINEER',
        'ARDUINO_MATH_RANDOM_SEED_MSG': 'BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ENGINEER',
        'ARDUINO_MATH_RANDOM_INT_MSG': 'BKY_ARDUINO_MATH_RANDOM_INT_MSG_ENGINEER',

        // Text
        'TEXT_APPEND_MESSAGE': 'BKY_TEXT_APPEND_MSG_ENGINEER',
        'TEXT_LENGTH_MESSAGE': 'BKY_TEXT_LENGTH_MESSAGE_ENGINEER',

        // Variables
        'VARIABLES_DECLARE_GLOBAL_MESSAGE': 'BKY_VARIABLES_DECLARE_GLOBAL_MSG_ENGINEER',
        'VARIABLES_DECLARE_LOCAL_MESSAGE': 'BKY_VARIABLES_DECLARE_LOCAL_MSG_ENGINEER',
        'VARIABLES_SET_MESSAGE': 'BKY_VARIABLES_SET_MSG_ENGINEER',

        // Array
        'ARRAY_DECLARE_GLOBAL_TITLE': 'BKY_ARRAY_DECLARE_GLOBAL_TITLE_ENGINEER',
        'ARRAY_DECLARE_LOCAL_TITLE': 'BKY_ARRAY_DECLARE_LOCAL_TITLE_ENGINEER',
        'ARRAY_GET_BRACKET_OPEN': 'BKY_ARRAY_GET_BRACKET_OPEN_ENGINEER',
        'ARRAY_GET_BRACKET_CLOSE': 'BKY_ARRAY_GET_BRACKET_CLOSE_ENGINEER',
        'ARRAY_SET_BRACKET_OPEN': 'BKY_ARRAY_SET_BRACKET_OPEN_ENGINEER',
        'ARRAY_SET_BRACKET_CLOSE_EQUALS': 'BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ENGINEER',
        'ARRAY_LENGTH_TITLE': 'BKY_ARRAY_LENGTH_TITLE_ENGINEER',

        // Functions
        'CUSTOM_FUNCTIONS_DEFNORETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_DEFNORETURN_MSG_ENGINEER',
        'CUSTOM_FUNCTIONS_DEFRETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_DEFRETURN_MSG_ENGINEER',
        'CUSTOM_FUNCTIONS_CALLNORETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_CALLNORETURN_MSG_ENGINEER',
        'CUSTOM_FUNCTIONS_CALLRETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_CALLRETURN_MSG_ENGINEER',
        'CUSTOM_FUNCTIONS_MUTATORCONTAINER_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_MUTATORCONTAINER_MSG_ENGINEER',
        'CUSTOM_FUNCTIONS_MUTATORARG_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_MUTATORARG_MSG_ENGINEER',
        'CUSTOM_FUNCTIONS_RETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_RETURN_MSG_ENGINEER',
    },
    'angel': {
        // Arduino Structure
        'INITIALIZES_SETUP_APPENDTEXT': 'BKY_INITIALIZES_SETUP_MSG_ANGEL',
        'INITIALIZES_LOOP_APPENDTEXT': 'BKY_INITIALIZES_LOOP_MSG_ANGEL',
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
        'CODING_COMMENT_MESSAGE': 'BKY_CODING_COMMENT_MSG_ANGEL',
        'CODING_INCLUDE_MESSAGE': 'BKY_CODING_INCLUDE_MSG_ANGEL',
        'CODING_RAW_STATEMENT_MESSAGE': 'BKY_CODING_RAW_STATEMENT_ANGEL',
        'CODING_RAW_INPUT_MESSAGE': 'BKY_CODING_RAW_INPUT_ANGEL',
        'CODING_RAW_DEFINITION_MESSAGE': 'BKY_CODING_RAW_DEFINITION_ANGEL',
        'CODING_RAW_WRAPPER_TOP_MESSAGE': 'BKY_CODING_RAW_WRAPPER_TOP_ANGEL',
        'CODING_RAW_WRAPPER_BOTTOM_MESSAGE': 'BKY_CODING_RAW_WRAPPER_BOTTOM_ANGEL',

        // Logic
        'CONTROLS_IF_MSG_IF': 'BKY_CONTROLS_IF_MSG_IF_ANGEL',
        'CONTROLS_IF_MSG_THEN': 'BKY_CONTROLS_IF_MSG_THEN_ANGEL',
        'CONTROLS_IF_MSG_ELSEIF': 'BKY_CONTROLS_IF_MSG_ELSEIF_ANGEL',
        'CONTROLS_IF_MSG_ELSE': 'BKY_CONTROLS_IF_MSG_ELSE_ANGEL',
        'LOGIC_COMPARE_MESSAGE': 'BKY_LOGIC_COMPARE_MSG_ANGEL',
        'LOGIC_OPERATION_MESSAGE': 'BKY_LOGIC_OPERATION_MSG_ANGEL',
        'LOGIC_NEGATE_MESSAGE': 'BKY_LOGIC_NEGATE_MSG_ANGEL',
        'LOGIC_OPERATION_AND': 'BKY_LOGIC_OPERATION_AND_ANGEL',
        'LOGIC_OPERATION_OR': 'BKY_LOGIC_OPERATION_OR_ANGEL',
        'LOGIC_BOOLEAN_TRUE': 'BKY_LOGIC_BOOLEAN_TRUE_ANGEL',
        'LOGIC_BOOLEAN_FALSE': 'BKY_LOGIC_BOOLEAN_FALSE_ANGEL',

        // Loops
        'CONTROLS_FOR_MESSAGE': 'BKY_CONTROLS_FOR_MSG_ANGEL',
        'CONTROLS_WHILE_MESSAGE': 'BKY_CONTROLS_WHILE_MSG_ANGEL',
        'CONTROLS_FLOW_STATEMENTS_MESSAGE': 'BKY_CONTROLS_FLOW_STATEMENTS_MSG_ANGEL',

        // Math
        'ARDUINO_CONSTRAIN_MSG': 'BKY_ARDUINO_CONSTRAIN_MSG_ANGEL',
        'ARDUINO_MAP_MSG': 'BKY_ARDUINO_MAP_MSG_ANGEL',
        'ARDUINO_MATH_RANDOM_SEED_MSG': 'BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ANGEL',
        'ARDUINO_MATH_RANDOM_INT_MSG': 'BKY_ARDUINO_MATH_RANDOM_INT_MSG_ANGEL',

        // Text
        'TEXT_APPEND_MESSAGE': 'BKY_TEXT_APPEND_MSG_ANGEL',
        'TEXT_LENGTH_MESSAGE': 'BKY_TEXT_LENGTH_MESSAGE_ANGEL',

        // Variables
        'VARIABLES_DECLARE_GLOBAL_MESSAGE': 'BKY_VARIABLES_DECLARE_GLOBAL_MSG_ANGEL',
        'VARIABLES_DECLARE_LOCAL_MESSAGE': 'BKY_VARIABLES_DECLARE_LOCAL_MSG_ANGEL',
        'VARIABLES_SET_MESSAGE': 'BKY_VARIABLES_SET_MSG_ANGEL',

        // Array
        'ARRAY_DECLARE_GLOBAL_TITLE': 'BKY_ARRAY_DECLARE_GLOBAL_TITLE_ANGEL',
        'ARRAY_DECLARE_LOCAL_TITLE': 'BKY_ARRAY_DECLARE_LOCAL_TITLE_ANGEL',
        'ARRAY_GET_BRACKET_OPEN': 'BKY_ARRAY_GET_BRACKET_OPEN_ANGEL',
        'ARRAY_GET_BRACKET_CLOSE': 'BKY_ARRAY_GET_BRACKET_CLOSE_ANGEL',
        'ARRAY_SET_BRACKET_OPEN': 'BKY_ARRAY_SET_BRACKET_OPEN_ANGEL',
        'ARRAY_SET_BRACKET_CLOSE_EQUALS': 'BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ANGEL',
        'ARRAY_LENGTH_TITLE': 'BKY_ARRAY_LENGTH_TITLE_ANGEL',

        // Functions
        'CUSTOM_FUNCTIONS_DEFNORETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_DEFNORETURN_MSG_ANGEL',
        'CUSTOM_FUNCTIONS_DEFRETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_DEFRETURN_MSG_ANGEL',
        'CUSTOM_FUNCTIONS_CALLNORETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_CALLNORETURN_MSG_ANGEL',
        'CUSTOM_FUNCTIONS_CALLRETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_CALLRETURN_MSG_ANGEL',
        'CUSTOM_FUNCTIONS_MUTATORCONTAINER_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_MUTATORCONTAINER_MSG_ANGEL',
        'CUSTOM_FUNCTIONS_MUTATORARG_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_MUTATORARG_MSG_ANGEL',
        'CUSTOM_FUNCTIONS_RETURN_MESSAGE': 'BKY_CUSTOM_FUNCTIONS_RETURN_MSG_ANGEL',
    }
};

/**
 * Applies the selected theme (colors and text) to the Blockly workspace.
 * @param {string} themeName The name of the theme to apply ('engineer' or 'angel').
 * @param {boolean} isInitialLoad True if this is the first load, to prevent unnecessary workspace reloads.
 */
function applyStyle(themeName, isInitialLoad = false) {
    // Set a global variable that block definitions can use to know the current style.
    Blockly.Msg.STYLE_MODE = themeName;
    let currentXml;
    // If this is not the initial load, we need to save the current workspace state
    // because changing block messages requires a full reload of the workspace.
    if (!isInitialLoad) {
        currentXml = Blockly.Xml.workspaceToDom(workspace);
    }

    // 1. Apply the color theme. This changes category and block colors.
    const themeToApply = themeName === 'angel' ? angelTheme : engineerTheme;
    workspace.setTheme(themeToApply);

    // 2. Apply the text messages. This dynamically overwrites generic Blockly.Msg keys
    //    with the values from our theme-specific keys.
    const currentMessageMap = blockMessageStylesMap[themeName];
    if (currentMessageMap) {
        for (const genericBlocklyMsgKey in currentMessageMap) {
            if (Object.prototype.hasOwnProperty.call(currentMessageMap, genericBlocklyMsgKey)) {
                const valueToAssign = Blockly.Msg[currentMessageMap[genericBlocklyMsgKey]];
                if (valueToAssign !== undefined && valueToAssign !== null) {
                    Blockly.Msg[genericBlocklyMsgKey] = valueToAssign;
                }
            }
        }
    }

    // 3. Handle special cases for built-in blocks that don't use the standard message keys.
    if (themeName === 'angel') {
        Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH = Blockly.Msg.BKY_TEXT_JOIN_MSG_ANGEL;
    } else { // engineer
        Blockly.Msg.TEXT_JOIN_TITLE_CREATEWITH = Blockly.Msg.BKY_TEXT_JOIN_MSG_ENGINEER;
    }

    // 4. Create a new toolbox DOM with theme-specific category names.
    const newToolbox = baseToolbox.cloneNode(true);
    const categories = newToolbox.querySelectorAll('category');
    const styleSuffix = `_${themeName.toUpperCase()}`; // e.g., _ENGINEER or _ANGEL

    categories.forEach(category => {
        const nameAttr = category.getAttribute('name');
        if (nameAttr && nameAttr.startsWith('%{BKY_') && nameAttr.endsWith('}')) {
            const baseKey = nameAttr.substring(6, nameAttr.length - 1); // e.g., "LOGIC_CATEGORY"
            const styledKey = baseKey + styleSuffix; // e.g., "LOGIC_CATEGORY_ANGEL"

            if (Blockly.Msg[styledKey]) {
                category.setAttribute('name', Blockly.Msg[styledKey]);
            } else if (Blockly.Msg[baseKey]) {
                category.setAttribute('name', Blockly.Msg[baseKey]);
            }
        }
    });

    // 5. Update the toolbox.
    workspace.updateToolbox(newToolbox);


    // 6. Reload the workspace to make the text changes take effect.
    //    This is a destructive operation, which is why we saved the XML state earlier.
    if (!isInitialLoad) {
        // We MUST clear the workspace before loading the XML,
        // otherwise it will just append the blocks and create duplicates.
        workspace.clear(); // Explicitly clear the workspace to prevent duplication
        Blockly.Xml.domToWorkspace(currentXml, workspace);
    }

    // 7. Save the user's theme preference for future sessions.
    localStorage.setItem('blocklyTheme', themeName);
}

/**
 * Loads external Blockly modules defined in manifest.json.
 * This function supports two types of modules:
 * 1. Single-file modules (legacy): A single JS file exporting all parts.
 * 2. Directory modules: A directory containing separate files for blocks, generators, etc.
 */
async function loadExternalModules() {
    let allModules = [];

    // Load local core extension modules from core_extension_manifest.json
    try {
        const coreManifestResponse = await fetch(window.coreExtensionManifestUri);
        if (coreManifestResponse.ok) {
            const manifest = await coreManifestResponse.json();
            const baseManifestUrl = new URL(window.coreExtensionManifestUri).origin + new URL(window.coreExtensionManifestUri).pathname.substring(0, new URL(window.coreExtensionManifestUri).pathname.lastIndexOf('/') + 1);
            allModules.push({ type: 'core', modules: manifest.modules, baseUrl: baseManifestUrl });
        } else {
            console.warn('No core_extension_manifest.json found or failed to fetch:', coreManifestResponse.statusText);
        }
    } catch (e) {
        console.error('Error loading core extension manifest:', e);
    }

    // Load remote modules from remote manifest.json (e.g., GitHub Pages)
    // Only attempt to load if remoteModulesManifestUri is defined and not empty
    if (window.remoteModulesManifestUri) {
        try {
            const remoteManifestResponse = await fetch(window.remoteModulesManifestUri);
            if (remoteManifestResponse.ok) {
                const manifest = await remoteManifestResponse.json();
                const baseManifestUrl = new URL(window.remoteModulesManifestUri).origin + new URL(window.remoteModulesManifestUri).pathname.substring(0, new URL(window.remoteModulesManifestUri).pathname.lastIndexOf('/') + 1);
                allModules.push({ type: 'remote', modules: manifest.modules, baseUrl: baseManifestUrl });
            } else {
                console.warn('No remote manifest.json found or failed to fetch:', remoteManifestResponse.statusText);
            }
        } catch (e) {
            console.error('Error loading remote modules manifest:', e);
        }
    }

    // Load user modules from user_modules_config.json
    try {
        const userModulesConfigResponse = await fetch(window.userModulesConfigUri);
        if (userModulesConfigResponse.ok) {
            const userModulesConfig = await userModulesConfigResponse.json();
            const baseUserModulesUrl = new URL(window.userModulesConfigUri).origin + new URL(window.userModulesConfigUri).pathname.substring(0, new URL(window.userModulesConfigUri).pathname.lastIndexOf('/') + 1);
            allModules.push({ type: 'user', modules: userModulesConfig.modules, baseUrl: baseUserModulesUrl });
        } else {
            console.warn('No user_modules_config.json found or failed to fetch:', userModulesConfigResponse.statusText);
        }
    } catch (e) {
        console.error('Error loading user_modules_config.json:', e);
    }

    const loadedModules = [];

    for (const source of allModules) {
        const loadPromises = source.modules.map(async (modConfig) => {
            const currentBaseUrl = source.baseUrl;

            if (modConfig.url.endsWith('/')) {
                // --- It's a DIRECTORY module ---
                const module = {};
                const path = new URL(modConfig.url, currentBaseUrl).toString();

                // Load blocks, toolbox, and language files concurrently
                const [
                    blocksModule,
                    toolboxXml,
                    enModule,
                    zhModule
                ] = await Promise.all([
                    loadModule(path + 'blocks.js').catch(() => null),
                    fetch(path + 'toolbox.xml').then(res => res.ok ? res.text() : null).catch(() => null),
                    loadModule(path + 'en.js').catch(() => null),
                    loadModule(path + 'zh-hant.js').catch(() => null)
                ]);

                // Load generators
                let finalGeneratorsModule = await loadModule(path + 'generators.js').catch(() => null);

                // Aggregate the parts into a single module object
                if (blocksModule && blocksModule.registerBlocks) {
                    module.registerBlocks = blocksModule.registerBlocks;
                }

                if (finalGeneratorsModule && finalGeneratorsModule.registerGenerators) {
                    module.registerGenerators = finalGeneratorsModule.registerGenerators;
                }

                if (toolboxXml) {
                    module.toolbox = toolboxXml;
                }
                if (enModule) {
                    Object.assign(module, enModule);
                }
                if (zhModule) {
                    Object.assign(module, zhModule);
                }
                return module;

            } else {
                // --- It's a SINGLE FILE module (legacy) ---
                const moduleUrl = new URL(modConfig.url, currentBaseUrl).toString();
                return loadModule(moduleUrl).catch(() => null);
            }
        });

        loadedModules.push(...(await Promise.all(loadPromises)).filter(m => m && Object.keys(m).length > 0));
    }


    // Pass 2: Populate Blockly.Msg with all messages from all modules
    const allModuleMessages = {};
    const isChinese = window.currentLocale && window.currentLocale.startsWith('zh');
    for (const module of loadedModules) {
        for (const key in module) {
            if (key.startsWith('MSG_')) {
                if (isChinese && key.endsWith('_ZH_HANT')) {
                    Object.assign(allModuleMessages, module[key]);
                } else if (!isChinese && key.endsWith('_EN')) {
                    Object.assign(allModuleMessages, module[key]);
                }
            }
        }
    }
    Object.assign(Blockly.Msg, allModuleMessages);

    // Pass 3: Register all blocks and generators
    for (const module of loadedModules) {
        if (module.registerBlocks) {
            module.registerBlocks(Blockly);
        }
        if (module.registerGenerators) {
            module.registerGenerators(Blockly);
        }
    }

    // Pass 4: Process all toolboxes
    for (const module of loadedModules) {
        if (module.toolbox) {
            const cleanXml = module.toolbox.replace(/>\s+</g, '><').trim();
            const tempDom = Blockly.utils.xml.textToDom(cleanXml);

            // tempDom.children is a collection of the top-level nodes from the module's toolbox XML
            // (e.g., the <category> elements).
            const moduleNodes = tempDom.children;

            if (moduleNodes) {
                // Append each node from the module's toolbox directly to the baseToolbox fragment.
                // This makes them siblings of the existing base categories.
                // We iterate over a static copy as appendChild modifies the live HTMLCollection.
                Array.from(moduleNodes).forEach(node => {
                    baseToolbox.appendChild(node.cloneNode(true));
                });
            }
        }
    }

    // Pass 5: Update the workspace toolbox
    if (workspace) {
        workspace.updateToolbox(baseToolbox);
    }
}


// =============================================================================
// --- WORKSPACE INITIALIZATION ---
// =============================================================================




// =============================================================================
// --- VSCODE COMMUNICATION & STATE MANAGEMENT ---
// =============================================================================

// Acquire the VS Code API object to post messages back to the extension.
const vscode = acquireVsCodeApi();

// --- Global State Variables ---
let debounceTimer; // Timer for debouncing code generation.
let isDirty = false; // Tracks if the workspace has unsaved changes.
let isPanelActive = true; // Tracks if the webview panel is currently active/visible.
window.promptCallback = null; // Stores the callback for prompt dialogs.
let baseToolbox; // Stores the base toolbox XML DOM object.
let workspace; // Declare workspace globally

// Define which block types are allowed to be at the root of the workspace and define a scope.
const scopeDefiningRootBlocks = [
    'initializes_setup',
    'initializes_loop',
    'coding_include',
    'coding_comment',
    'coding_raw_definition',
    'array_declare_global',
    'variables_declare_global',
    'custom_functions_defreturn',
    'custom_functions_defnoreturn'
];
Blockly.Arduino.scopeDefiningRootBlocks = scopeDefiningRootBlocks; // Expose to Blockly.Arduino

// Define which block types create a new scope (function, setup, loop).
// These are the blocks we want to find when determining where a block is located.
const scopeContainerBlocks = [
    'initializes_setup',
    'initializes_loop',
    'custom_functions_defreturn',
    'custom_functions_defnoreturn'
];

/**
 * Generates Arduino code from the workspace and sends it to the extension.
 * This function is debounced to prevent excessive updates during rapid block changes.
 * @param {Blockly.Event} event The Blockly event that triggered the update.
 * @param {boolean} suppressDirty If true, this update will not mark the workspace as dirty.
 */
function updateCode(event, suppressDirty = false) {
    // Don't generate code for UI events (e.g., scrolling, selecting a block).
    if (event && event.isUiEvent) {
        return;
    }
    // Don't generate code if a drag gesture is in progress.
    if (workspace.isDragging()) {
        return;
    }

    // Only send updateCode messages if the panel is active.
    if (!isPanelActive) {
        return;
    }

    // If this change is not suppressed and the workspace is not already dirty,
    // mark it as dirty and notify the extension.
    if (!suppressDirty && !isDirty) {
        isDirty = true;
        vscode.postMessage({ command: 'dirtyStateChanged', isDirty: true });
    }

    // Debounce the code generation and auto-save.
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        const code = Blockly.Arduino.workspaceToCode(workspace);
        const xmlDom = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToText(xmlDom);

        vscode.postMessage({
            command: 'updateCode',
            code: code,
            xml: xmlText, // Add the XML for auto-saving
            inoUri: window.currentInoUri
        });
    }, 250);
}





/**
 * Determines the scope of a given block (e.g., 'setup', 'loop', 'function:myFunc', 'global').
 * @param {Blockly.Block} block The block to analyze.
 * @returns {string} A string identifying the block's scope.
 */
function getBlockScopeIdentifier(block) {
    let currentBlock = block;
    let parentBlock = block.getParent();

    // Traverse up the parent chain until we find a scope-defining container block
    // or we reach a block with no parent (meaning it's a top-level block itself).
    while (parentBlock) {
        if (scopeContainerBlocks.includes(parentBlock.type)) {
            currentBlock = parentBlock; // This is the scope container.
            break; // Stop traversing.
        }
        currentBlock = parentBlock;
        parentBlock = currentBlock.getParent();
    }

    // Now currentBlock is either the original block (if it's a root),
    // or the scope container we found.

    const blockType = currentBlock.type;

    const functionDefiningBlocks = {
        'initializes_setup': 'setup',
        'initializes_loop': 'loop',
        'custom_functions_defreturn': 'function',
        'custom_functions_defnoreturn': 'function',
    };

    if (functionDefiningBlocks[blockType]) {
        if (blockType === 'custom_functions_defreturn' || blockType === 'custom_functions_defnoreturn') {
            const functionName = currentBlock.getFieldValue('NAME');
            return `function:${functionName}`;
        }
        return functionDefiningBlocks[blockType];
    }

    // If it's a top-level block but not a known function/structure, treat as global.
    return 'global';
}

/**
 * Main message handler for events sent from the VS Code extension backend.
 */
window.addEventListener('message', event => {
    const message = event.data;
    switch (message.command) {
        // Initializes the workspace with XML content from the extension.
        case 'initializeWorkspace': {
            Blockly.Events.disable(); // Disable events to prevent firing changes during load.
            try {
                // const savedTheme = localStorage.getItem('blocklyTheme') || 'engineer';
                // applyStyle(savedTheme, true); // `true` prevents a workspace reload.

                workspace.clear();
                const xml = Blockly.utils.xml.textToDom(message.xml);
                Blockly.Xml.domToWorkspace(xml, workspace);                // Store metadata from the extension.
                window.currentInoUri = message.inoUri;
                window.currentXmlName = message.xmlName ? message.xmlName.split(/[\\/]/).pop() : '未命名專案';

                // Reset the dirty state.
                isDirty = false;
                vscode.postMessage({ command: 'dirtyStateChanged', isDirty: false });
            } finally {
                Blockly.Events.enable(); // Re-enable events.
            }
            // Trigger an initial code generation without marking the workspace as dirty.
            updateCode(undefined, true);
            // Hide the loading overlay.
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
            break;
        }
        // The extension has confirmed that the save is complete.
        case 'saveComplete':
            isDirty = false;
            vscode.postMessage({ command: 'dirtyStateChanged', isDirty: false });
            break;
        // The extension is requesting the current workspace XML for saving.
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
        // The extension has sent the result of a confirmation dialog.
        case 'confirmResponse':
            if (window.confirmCallback) {
                window.confirmCallback(message.value);
                window.confirmCallback = null;
            }
            break;
        // The extension has sent the result of a prompt dialog.
        case 'promptResponse':
            if (window.promptCallback) {
                window.promptCallback(message.value);
                window.promptCallback = null;
            }
            break;
        // The webview panel has become active.
        case 'panelActive':
            document.getElementById('inactive-overlay').style.display = 'none';
            isPanelActive = true;
            break;
        // The webview panel has become inactive.
        case 'panelInactive': {
            const overlay = document.getElementById('inactive-overlay');
            overlay.textContent = `請切換至與 [piBlockly: ${window.currentXmlName}] 對應的程式碼頁面以啟用編輯`;
            overlay.style.display = 'flex';
            isPanelActive = false;
            break;
        }
    }
});

// Add a blur event listener to handle cases where a drag is released outside the webview.
window.addEventListener('blur', () => {
    if (workspace && workspace.isDragging()) {
        Blockly.Gesture.clearForced();
    }
});

// =============================================================================
// --- ORPHAN BLOCK HANDLING ---
// =============================================================================

function updateOrphanBlocks(event) {
    // If the workspace is in the middle of a drag, do nothing.
    // The logic will run once the drag is complete.
    if (workspace.isDragging()) {
        return;
    }

    // Ignore UI events or changes to the 'disabled' state that this function itself causes.
    if (event.isUiEvent || (event.type === 'change' && event.element === 'disabled')) {
        return;
    }

    // Start a new, separate event group for our reaction.
    // This ensures the entire orphan-checking logic is one atomic undo step,
    // separate from the user's initial action.
    Blockly.Events.setGroup(true);
    try {
        const allBlocks = workspace.getAllBlocks(true);

        // First, unconditionally enable all blocks to reset their state.
        // The event grouping will prevent this from polluting the undo stack.
        allBlocks.forEach(block => {
            block.setDisabledReason(false, 'orphan');
        });

        // Then, find any top-level blocks that are not valid roots and disable them.
        const topBlocks = workspace.getTopBlocks(true);

        topBlocks.forEach(topBlock => {
            if (!scopeDefiningRootBlocks.includes(topBlock.type)) {
                // This is an INVALID root. Disable it and its children.
                topBlock.getDescendants(false).forEach(desc => {
                    desc.setDisabledReason(true, 'orphan');
                });
            }
        });
    } finally {
        // Always close the group to ensure subsequent actions are separate.
        Blockly.Events.setGroup(false);
    }
}

// =============================================================================
// --- UPDATE CHECKER ---
// =============================================================================

/**
 * Compares two semantic version strings (e.g., "1.10.0" vs "1.9.0").
 * @param {string} newVersion The version to check.
 * @param {string} oldVersion The current version.
 * @returns {boolean} True if newVersion is greater than oldVersion.
 */
function isNewerVersion(newVersion, oldVersion) {
    if (!newVersion || !oldVersion) {
        return false;
    }
    const newParts = newVersion.split('.').map(Number);
    const oldParts = oldVersion.split('.').map(Number);

    for (let i = 0; i < Math.max(newParts.length, oldParts.length); i++) {
        const newPart = newParts[i] || 0;
        const oldPart = oldParts[i] || 0;
        if (newPart > oldPart) { return true; }
        if (newPart < oldPart) { return false; }
    }
    return false;
}

/**
 * Checks for a new version of the extension on GitHub.
 */
async function checkForUpdates() {
    const updateButton = document.getElementById('updateButton');
    const localVersion = document.body.dataset.extensionVersion;

    // Hardcoded repository info
    const repoOwner = 'simfonia';
    const repoName = 'piBlockly';

    const releasesUrl = `https://github.com/${repoOwner}/${repoName}/releases`;
    const packageJsonUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/master/package.json`;

    if (!updateButton || !localVersion) {
        console.error('Update check could not run. Missing button or version attribute.');
        return;
    }

    // Always set the link to the releases page
    updateButton.href = releasesUrl;

    try {
        const response = await fetch(packageJsonUrl, { cache: 'no-store' }); // Use no-store to always get the latest
        if (!response.ok) {
            throw new Error(`Failed to fetch package.json: ${response.statusText}`);
        }
        const remotePackage = await response.json();
        const latestVersion = remotePackage.version;

        if (isNewerVersion(latestVersion, localVersion)) {
            updateButton.classList.add('is-update-available');
            updateButton.title = window.localization.updateAvailable
                .replace('%1', latestVersion)
                .replace('%2', localVersion);
        } else {
            updateButton.classList.remove('is-update-available');
            updateButton.title = window.localization.updateLatest
                .replace('%1', localVersion);
        }

    } catch (error) {
        console.error('Error checking for updates:', error);
        updateButton.title = window.localization.updateFailed;
    }
}


// =============================================================================
// --- INITIALIZATION & UI BINDING ---
// =============================================================================

// Set up UI event listeners once the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', async () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Set the initial state of the toggle based on the saved theme.
        const savedTheme = localStorage.getItem('blocklyTheme') || 'engineer';
        themeToggle.checked = (savedTheme === 'angel');

        // Add a listener to apply the style when the toggle is changed.
        themeToggle.addEventListener('change', (event) => {
            const newTheme = event.target.checked ? 'angel' : 'engineer';
            applyStyle(newTheme);
        });
    }

    // Initialize baseToolbox
    const toolboxXmlText = document.getElementById('toolbox-xml').textContent;
    baseToolbox = Blockly.utils.xml.textToDom(toolboxXmlText);

    // Load external modules BEFORE Blockly is injected
    await loadExternalModules();

    engineerTheme = Blockly.Theme.defineTheme('engineer', {
        'base': Blockly.Themes.Classic,
        'categoryStyles': {
            'arduino_category': { 'colour': Blockly.Msg.ARDUINO_HUE },
            'arduino_structure_category': { 'colour': Blockly.Msg.ARDUINO_STRUCTURE_HUE },
            'arduino_io_category': { 'colour': Blockly.Msg.ARDUINO_HUE },
            'arduino_time_category': { 'colour': Blockly.Msg.ARDUINO_TIME_HUE },
            'arduino_serial_category': { 'colour': Blockly.Msg.ARDUINO_SERIAL_HUE },
            'picar_category': { 'colour': Blockly.Msg.PICAR_HUE },
            'coding_category': { 'colour': Blockly.Msg.CODING_HUE },
            'logic_category': { 'colour': Blockly.Msg.LOGIC_HUE },
            'loop_category': { 'colour': Blockly.Msg.LOOPS_HUE },
            'math_category': { 'colour': Blockly.Msg.MATH_HUE },
            'text_category': { 'colour': Blockly.Msg.TEXT_HUE },
            'variable_category': { 'colour': Blockly.Msg.VARIABLES_HUE },
            'array_category': { 'colour': Blockly.Msg.ARRAY_HUE },
            'procedure_category': { 'colour': Blockly.Msg.FUNCTIONS_HUE },
        },
        'blockStyles': {
            'initializes_block': { 'colourPrimary': Blockly.Msg.ARDUINO_STRUCTURE_HUE },
            'arduino_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_CONTROL_HUE },
            'digital_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_DIGITAL_IO_HUE },
            'analog_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_ANALOG_IO_HUE },
            'arduino_time_block': { 'colourPrimary': Blockly.Msg.ARDUINO_TIME_HUE },
            'arduino_serial_block': { 'colourPrimary': Blockly.Msg.ARDUINO_SERIAL_HUE },
            'picar_block': { 'colourPrimary': Blockly.Msg.PICAR_HUE },
            'coding_block': { 'colourPrimary': Blockly.Msg.CODING_HUE },
            'logic_blocks': { 'colourPrimary': Blockly.Msg.LOGIC_HUE },
            'loop_blocks': { 'colourPrimary': Blockly.Msg.LOOPS_HUE },
            'math_blocks': { 'colourPrimary': Blockly.Msg.MATH_HUE },
            'text_blocks': { 'colourPrimary': Blockly.Msg.TEXT_HUE },
            'variable_blocks': { 'colourPrimary': Blockly.Msg.VARIABLES_HUE },
            'array_block': { 'colourPrimary': Blockly.Msg.ARRAY_HUE },
            'procedure_blocks': { 'colourPrimary': Blockly.Msg.FUNCTIONS_HUE },
        },
    });

    angelTheme = Blockly.Theme.defineTheme('angel', {
        'base': Blockly.Themes.Classic,
        'categoryStyles': {
            'arduino_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_HUE },
            'arduino_structure_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_STRUCTURE_HUE },
            'arduino_io_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_IO_HUE },
            'arduino_time_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_TIME_HUE },
            'arduino_serial_category': { 'colour': Blockly.Msg.ANGEL_ARDUINO_SERIAL_HUE },
            'picar_category': { 'colour': Blockly.Msg.ANGEL_PICAR_HUE },
            'coding_category': { 'colour': Blockly.Msg.ANGEL_CODING_HUE },
            'logic_category': { 'colour': Blockly.Msg.ANGEL_LOGIC_HUE },
            'loop_category': { 'colour': Blockly.Msg.ANGEL_LOOPS_HUE },
            'math_category': { 'colour': Blockly.Msg.ANGEL_MATH_HUE },
            'text_category': { 'colour': Blockly.Msg.ANGEL_TEXT_HUE },
            'variable_category': { 'colour': Blockly.Msg.ANGEL_VARIABLES_HUE },
            'array_category': { 'colour': Blockly.Msg.ANGEL_ARRAY_HUE },
            'procedure_category': { 'colour': Blockly.Msg.ANGEL_FUNCTIONS_HUE },
        },
        'blockStyles': {
            // Add missing styles from engineerTheme, adapted for Angel theme
            'initializes_block': { 'colourPrimary': Blockly.Msg.ANGEL_ARDUINO_STRUCTURE_HUE },
            'arduino_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_CONTROL_HUE }, // Using common HUE
            'digital_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_DIGITAL_IO_HUE }, // Using common HUE
            'analog_io_block': { 'colourPrimary': Blockly.Msg.ARDUINO_ANALOG_IO_HUE },   // Using common HUE
            'arduino_time_block': { 'colourPrimary': Blockly.Msg.ANGEL_ARDUINO_TIME_HUE },
            'arduino_serial_block': { 'colourPrimary': Blockly.Msg.ANGEL_ARDUINO_SERIAL_HUE },
            'logic_blocks': { 'colourPrimary': Blockly.Msg.ANGEL_LOGIC_HUE },
            'loop_blocks': { 'colourPrimary': Blockly.Msg.ANGEL_LOOPS_HUE },

            // Keep existing Angel styles, including user-specified exceptions
            'picar_block': { 'colourPrimary': Blockly.Msg.PICAR_HUE }, // Exception: Keep engineer color
            'coding_block': { 'colourPrimary': Blockly.Msg.ANGEL_CODING_HUE },
            'text_blocks': { 'colourPrimary': Blockly.Msg.ANGEL_TEXT_HUE },
            'math_blocks': { 'colourPrimary': Blockly.Msg.ANGEL_MATH_HUE },
            'variable_blocks': { 'colourPrimary': Blockly.Msg.ANGEL_VARIABLES_HUE },
            'array_block': { 'colourPrimary': Blockly.Msg.ARRAY_HUE }, // Exception: Keep engineer color
            'procedure_blocks': { 'colourPrimary': Blockly.Msg.ANGEL_FUNCTIONS_HUE },
        },
    });

    workspace = Blockly.inject('blocklyDiv', {
        toolbox: baseToolbox, // Use the DOM object
        theme: engineerTheme, // Set a default theme on injection to avoid style flashes.
        media: '',      // Don't load external media assets.
        sounds: false,  // Disable sound effects.
        zoom: {
            controls: true,
            wheel: false,    // Disable zooming with the mouse wheel.
            startScale: 1.0,
            maxScale: 3,
            minScale: 0.3,
            scaleSpeed: 1.2
        },
        move: {
            scrollbars: {
                vertical: true,
                horizontal: true,
            },
            drag: true,      // Allow dragging the workspace canvas.
            wheel: true      // Allow scrolling the workspace with the mouse wheel.
        }
    });

    // Register the button callback for the "Create Variable" button in the toolbox.
    workspace.registerButtonCallback('CREATE_VARIABLE', function (button) {
        Blockly.Variables.createVariableButtonHandler(workspace);
    });

    // Apply the saved theme after workspace is initialized
    const savedTheme = localStorage.getItem('blocklyTheme') || 'engineer';
    applyStyle(savedTheme, true); // Call applyStyle here

    // Listen for any change in the workspace to trigger code generation.
    workspace.addChangeListener(updateCode);

    // Listen for block selection events and send the selected block's scope to the extension.
    workspace.addChangeListener((event) => {
        if (event.type === Blockly.Events.SELECTED && event.newElementId) {
            const selectedBlock = workspace.getBlockById(event.newElementId);
            if (selectedBlock) {
                const scopeIdentifier = getBlockScopeIdentifier(selectedBlock);
                vscode.postMessage({
                    command: 'selectBlock',
                    blockId: event.newElementId, // blockId is still useful for debugging/future enhancements
                    scope: scopeIdentifier
                });
            }
        }
    });

    workspace.addChangeListener(updateOrphanBlocks);

    // Check for updates when the webview is loaded
    checkForUpdates();

    // Signal to the extension that the webview is ready to be initialized.
    vscode.postMessage({ command: 'webviewReady' });

    /**
     * Helper function to save the current workspace.
     */
    function saveWorkspace() {
        if (!workspace) return;
        const xml = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToText(xml);
        vscode.postMessage({
            command: 'saveProject',
            xml: xmlText,
            inoUri: window.currentInoUri
        });
    }

    // Handle Undo/Redo/Save keyboard shortcuts within the webview.
    window.addEventListener('keydown', (event) => {
        // Use event.code for cross-layout compatibility
        const isCtrl = event.ctrlKey || event.metaKey;
        const isShift = event.shiftKey;

        // Ctrl + Z (Undo)
        if (isCtrl && event.code === 'KeyZ' && !isShift) {
            if (workspace) {
                workspace.undo(false);
                event.preventDefault();
                event.stopPropagation();
            }
        } 
        // Ctrl + Y or Ctrl + Shift + Z (Redo)
        else if (isCtrl && (event.code === 'KeyY' || (event.code === 'KeyZ' && isShift))) {
            if (workspace) {
                workspace.undo(true);
                event.preventDefault();
                event.stopPropagation();
            }
        }
        // Ctrl + S (Save)
        else if (isCtrl && event.code === 'KeyS') {
            event.preventDefault();
            event.stopPropagation();
            saveWorkspace();
        }
    }, true); // Use capture phase to intercept before Blockly if needed
});

// Bind toolbar button click events to post messages to the extension.
document.getElementById('newButton').addEventListener('click', () => {
    vscode.postMessage({ command: 'newProject' });
});

document.getElementById('openButton').addEventListener('click', () => {
    vscode.postMessage({ command: 'openProject' });
});

document.getElementById('saveButton').addEventListener('click', () => {
    // Logic moved to a helper function if needed, but keeping it direct for now or using the helper
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

/**
 * Sets up hover effects for a toolbar button.
 * @param {string} buttonId The ID of the button element.
 */
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

setupHoverEffects('newButton');
setupHoverEffects('openButton');
setupHoverEffects('saveButton');
setupHoverEffects('saveAsButton');
setupHoverEffects('closeButton');


// Override Blockly's default dialogs to use VS Code's native UI.
// This provides a more integrated user experience.
Blockly.dialog.setPrompt(function (message, defaultValue, callback) {
    vscode.postMessage({
        command: 'prompt',
        message: message,
        defaultValue: defaultValue
    });
    window.promptCallback = callback; // Store the callback to be invoked later.
});

Blockly.dialog.setConfirm(function (message, callback) {
    vscode.postMessage({
        command: 'confirm',
        message: message
    });
    window.confirmCallback = callback; // Store the callback to be invoked later.
});