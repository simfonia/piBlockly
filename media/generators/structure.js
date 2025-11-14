export function registerGenerators(Blockly) {
// =============================================================================
// STRUCTURE & CORE BLOCKS
// =============================================================================

Blockly.Arduino.forBlock['initializes_setup'] = function(block) {
  var statements_content = Blockly.Arduino.statementToCode(block, 'CONTENT');
  Blockly.Arduino.setups_['user_code'] = statements_content;
  return '';
};

Blockly.Arduino.forBlock['initializes_loop'] = function(block) {
  return Blockly.Arduino.statementToCode(block, 'CONTENT');
};
}
