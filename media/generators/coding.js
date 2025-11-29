export function registerGenerators(Blockly) {
// =============================================================================
// CODING BLOCK GENERATORS
// =============================================================================

Blockly.Arduino.forBlock['coding_comment'] = function(block) {
  const comment = block.getFieldValue('COMMENT');
  const lines = comment.split('\n');
  const commentCode = lines.map(line => '// ' + line).join('\n');

  const prevBlock = block.getPreviousBlock();
  const isTopLevel = (block.getParent() === null);

  // Determine if this block is in a global definition context.
  // It's global if:
  // 1. Its previous block is a global definition block (e.g., global variable, raw definition).
  // 2. It's a top-level block AND its type is in scopeDefiningRootBlocks (exposed from main.js).
  const isInGlobalStack =
      (prevBlock && Blockly.Arduino.DEFINITION_BLOCK_TYPES &&
       Blockly.Arduino.DEFINITION_BLOCK_TYPES.includes(prevBlock.type));

  const isTopLevelGlobalRoot =
      (isTopLevel && Blockly.Arduino.scopeDefiningRootBlocks &&
       Blockly.Arduino.scopeDefiningRootBlocks.includes(block.type));

  if (isInGlobalStack || isTopLevelGlobalRoot) {
    // Add to global_vars_ to place in the global scope.
    Blockly.Arduino.global_vars_['comment_' + block.id] = commentCode + '\n';
    return ''; // Return empty string as code is added to global definitions.
  } else {
    // Otherwise, generate as a regular statement for local scope.
    return commentCode + '\n';
  }
};

Blockly.Arduino.forBlock['coding_include'] = function(block) {
  const includePath = block.getFieldValue('PATH');
  Blockly.Arduino.includes_['include_' + block.id] = `#include ${includePath}`;
  return ''; // Return empty string as the code is handled by the includes bucket.
};

Blockly.Arduino.forBlock['coding_raw_statement'] = function(block) {
  var code = block.getFieldValue('CODE') + '\n';
  return code;
};


Blockly.Arduino.forBlock['coding_raw_input'] = function(block) {
  var code = block.getFieldValue('CODE');
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['coding_raw_wrapper'] = function(block) {
  var codeTop = block.getFieldValue('CODE_TOP');
  var doCode = Blockly.Arduino.statementToCode(block, 'DO');
  var codeBottom = block.getFieldValue('CODE_BOTTOM');

  var code = codeTop + '\n' + doCode + codeBottom + '\n';
  return code;
};

// Assign the stack processor (defined in _lib.js) to the raw definition block.
Blockly.Arduino.forBlock['coding_raw_definition'] = processDefinitionStack;
}
