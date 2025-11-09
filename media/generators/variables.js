// =============================================================================
// VARIABLE BLOCKS
// =============================================================================

// The stack processor for global variables is defined in _lib.js
Blockly.Arduino.forBlock['variables_declare_global'] = processDefinitionStack;

Blockly.Arduino.forBlock['variables_declare_local'] = function(block) {
  var type = block.getFieldValue('TYPE');
  var varId = block.getFieldValue('VAR');
  var variable = block.workspace.getVariableById(varId);
  var varName = variable ? variable.name : 'UNKNOWN_VAR';
  var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);

  var defaultValue = '0';
  if (type === 'String') {
    defaultValue = '""';
  } else if (type === 'bool') {
    defaultValue = 'false';
  }
  
  var finalValue = value || defaultValue;
  var code = type + ' ' + varName + ' = ' + finalValue + ';';

  return code + '\n'; // Return as a statement.
};

Blockly.Arduino.forBlock['variables_get'] = function(block) {
  // Variable getter.
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), 'VARIABLE');
  return [varName, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Arduino.valueToCode(block, 'VALUE',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var varId = block.getFieldValue('VAR');
  var variable = block.workspace.getVariableById(varId);
  var varName = variable.name;
  return varName + ' = ' + argument0 + ';\n';
};
