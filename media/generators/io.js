export function registerGenerators(Blockly) {
// =============================================================================
// I/O BLOCKS
// =============================================================================

Blockly.Arduino.forBlock['arduino_pin_mode'] = function(block) {
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var mode = Blockly.Arduino.valueToCode(block, 'MODE', Blockly.Arduino.ORDER_ATOMIC) || 'OUTPUT';
  Blockly.Arduino.setups_['pin_mode_' + pin] = 'pinMode(' + pin + ', ' + mode + ');';
  return '';
};

Blockly.Arduino.forBlock['arduino_pin_mode_mode_shadow'] = function(block) {
  var mode = block.getFieldValue('MODE');
  return [mode, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['arduino_pin_shadow'] = function(block) {
  var pin = block.getFieldValue('PIN');
  return [pin, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['arduino_digital_read'] = function(block) {
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'digitalRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['arduino_digital_write'] = function(block) {
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value = block.getFieldValue('VALUE');
  var code = 'digitalWrite(' + pin + ', ' + value + ');\n';
  return code;
};

Blockly.Arduino.forBlock['arduino_analog_read'] = function(block) {
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || 'A0';
  var code = 'analogRead(' + pin + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['arduino_analog_write'] = function(block) {
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '3';
  var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'analogWrite(' + pin + ', ' + value + ');\n';
  return code;
};
}
