export function registerGenerators(Blockly) {
// =============================================================================
// SERIAL BLOCKS
// =============================================================================

Blockly.Arduino.forBlock['arduino_serial_begin'] = function(block) {
  var speed = block.getFieldValue('SPEED');
  return 'Serial.begin(' + speed + ');\n';
};

Blockly.Arduino.forBlock['arduino_serial_print'] = function(block) {
  var content = Blockly.Arduino.valueToCode(block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '""';
  return 'Serial.print(' + content + ');\n';
};

Blockly.Arduino.forBlock['arduino_serial_println'] = function(block) {
  var content = Blockly.Arduino.valueToCode(block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '""';
  return 'Serial.println(' + content + ');\n';
};

Blockly.Arduino.forBlock['arduino_serial_available'] = function(block) {
  return ['Serial.available()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['arduino_serial_read'] = function(block) {
  return ['Serial.read()', Blockly.Arduino.ORDER_ATOMIC];
};
}
