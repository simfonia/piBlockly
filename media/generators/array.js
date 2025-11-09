// =============================================================================
// ARRAY BLOCKS
// =============================================================================

Blockly.Arduino.forBlock['array_declare_global'] = function(block) {
  var type = block.getFieldValue('TYPE');
  var varName = block.getFieldValue('VAR');
  var size = Blockly.Arduino.valueToCode(block, 'SIZE', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var code = type + ' ' + varName + '[' + size + '];';
  Blockly.Arduino.global_vars_['array_declare_global_' + varName] = code + '\n';
  return '';
};

Blockly.Arduino.forBlock['array_declare_local'] = function(block) {
  var type = block.getFieldValue('TYPE');
  var varName = block.getFieldValue('VAR');
  var size = Blockly.Arduino.valueToCode(block, 'SIZE', Blockly.Arduino.ORDER_ATOMIC) || '1';
  var code = type + ' ' + varName + '[' + size + '];';
  return code + '\n';
};

Blockly.Arduino.forBlock['array_get'] = function(block) {
  var varName = block.getFieldValue('VAR');
  var index = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = varName + '[' + index + ']';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['array_set'] = function(block) {
  var varName = block.getFieldValue('VAR');
  var index = Blockly.Arduino.valueToCode(block, 'INDEX', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = varName + '[' + index + '] = ' + value + ';\n';
  return code;
};

Blockly.Arduino.forBlock['array_length'] = function(block) {
  var varName = block.getFieldValue('VAR');
  var code = 'sizeof(' + varName + ') / sizeof(' + varName + '[0])';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
