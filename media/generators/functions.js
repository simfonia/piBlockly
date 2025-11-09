// =============================================================================
// FUNCTION BLOCKS
// =============================================================================

Blockly.Arduino.forBlock['custom_procedures_defnoreturn'] = function(block) {
  var funcName = block.getFieldValue('NAME');
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = block.argTypes_[i] + ' ' + block.arguments_[i];
  }
  var argsStr = args.join(', ');
  
  // Create prototype and definition
  var prototype = 'void ' + funcName + '(' + argsStr + ');';
  var definition = 'void ' + funcName + '(' + argsStr + ') {\n' + branch + '}\n';
  
  // Place in respective buckets
  Blockly.Arduino.function_prototypes_['proto_' + funcName] = prototype;
  Blockly.Arduino.function_definitions_['def_' + funcName] = definition;
  
  return null;
};

Blockly.Arduino.forBlock['custom_procedures_defreturn'] = function(block) {
  var funcName = block.getFieldValue('NAME');
  var returnType = block.getFieldValue('TYPE');
  var branch = Blockly.Arduino.statementToCode(block, 'STACK');
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = block.argTypes_[i] + ' ' + block.arguments_[i];
  }
  var argsStr = args.join(', ');

  // Create prototype and definition
  var prototype = returnType + ' ' + funcName + '(' + argsStr + ');';
  var definition = returnType + ' ' + funcName + '(' + argsStr + ') {\n' + branch + '}\n';

  // Place in respective buckets
  Blockly.Arduino.function_prototypes_['proto_' + funcName] = prototype;
  Blockly.Arduino.function_definitions_['def_' + funcName] = definition;

  return null;
};

Blockly.Arduino.forBlock['custom_procedures_return'] = function(block) {
  var value_return = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '';
  return '  return ' + value_return + ';\n';
};

Blockly.Arduino.forBlock['custom_procedures_callnoreturn_manual'] = function(block) {
  var funcName = block.getFieldValue('NAME');
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Arduino.valueToCode(block, 'ARG' + i, Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var argsStr = args.join(', ');
  var code = funcName + '(' + argsStr + ');\n';
  return code;
};

Blockly.Arduino.forBlock['custom_procedures_callreturn_manual'] = function(block) {
  var funcName = block.getFieldValue('NAME');
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Arduino.valueToCode(block, 'ARG' + i, Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var argsStr = args.join(', ');
  var code = funcName + '(' + argsStr + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
