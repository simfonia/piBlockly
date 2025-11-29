// =============================================================================
// SHARED LIBRARY FUNCTIONS
// =============================================================================

/**
 * An array of block types that are considered part of a definition stack.
 * Used by processDefinitionStack to identify which blocks to process together.
 */
const DEFINITION_BLOCK_TYPES = ['variables_declare_global', 'coding_raw_definition'];
Blockly.Arduino.DEFINITION_BLOCK_TYPES = DEFINITION_BLOCK_TYPES; // Expose to Blockly.Arduino

/**
 * Processes a stack of connected definition blocks (e.g., global variables, raw definitions).
 * This function is designed to be the generator for the top-most block in a potential stack.
 * It iterates through all subsequent connected blocks of a similar definition type,
 * generates their code, and places the entire collection into a single 'global_vars_' bucket entry.
 * This ensures that all connected global definitions are treated as a single, contiguous block
 * in the final generated code.
 *
 * @param {Blockly.Block} block The block that triggered the generator.
 * @returns {string} An empty string, as the code is placed directly into the definitions bucket.
 */
function processDefinitionStack(block) {
  // If the previous block is also a definition type, this block has already been processed
  // as part of a previous stack. Return empty string to avoid duplicate code generation.
  const prevBlock = block.getPreviousBlock();
  if (prevBlock && DEFINITION_BLOCK_TYPES.includes(prevBlock.type)) {
    return '';
  }

  let codes = [];
  let currentBlock = block;

  // Iterate down the stack of connected definition blocks.
  while (currentBlock && DEFINITION_BLOCK_TYPES.includes(currentBlock.type)) {
    let blockCode = '';
    if (currentBlock.type === 'variables_declare_global') {
        const type = currentBlock.getFieldValue('TYPE');
        const varId = currentBlock.getFieldValue('VAR');
        const variable = currentBlock.workspace.getVariableMap().getVariableById(varId);
        const varName = variable ? variable.name : 'UNKNOWN_VAR';
        const value = Blockly.Arduino.valueToCode(currentBlock, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
        const defaultValue = (type === 'String') ? '""' : (type === 'bool') ? 'false' : '0';
        const finalValue = value || defaultValue;
        blockCode = type + ' ' + varName + ' = ' + finalValue + ';';
        if (!blockCode.endsWith(';')) {
            blockCode += ';';
        }
    } else if (currentBlock.type === 'coding_raw_definition') {
        blockCode = currentBlock.getFieldValue('CODE');
    }
    
    if (blockCode) {
        codes.push(blockCode);
    }
    
    // Move to the next block in the stack.
    currentBlock = currentBlock.getNextBlock();
  }

  if (codes.length > 0) {
    // Place the entire stack of definitions into a single entry in the global_vars_ bucket.
    // Using the top block's ID ensures a unique key for this stack.
    Blockly.Arduino.global_vars_['stack_' + block.id] = codes.join('\n') + '\n';
  }

  // Return empty string because the code is handled via the definitions bucket.
  return '';
}
