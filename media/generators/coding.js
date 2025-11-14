export function registerGenerators(Blockly) {
// =============================================================================
// CODING BLOCK GENERATORS
// =============================================================================

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
