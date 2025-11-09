// =============================================================================
// LOOP BLOCKS
// =============================================================================
Blockly.Arduino.forBlock['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Arduino.valueToCode(block, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
    branchCode = Blockly.Arduino.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Arduino.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.Arduino.forBlock['controls_repeat_ext'] = function(block) {
  // Repeat n times.
  var repeats = Blockly.Arduino.valueToCode(block, 'TIMES',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = '';
  var loopVar = Blockly.Arduino.variableDB_.getDistinctName(
      'count', 'Variables');
  var endVar = repeats;
  // If repeats is not a legal variable name or a number, cache it in a variable.
  if (!repeats.match(/^\w+$/) && !/^\d+(\.\d+)?$/.test(repeats)) {
    endVar = Blockly.Arduino.variableDB_.getDistinctName(
        'repeat_end', 'Variables');
    code += 'int ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (int ' + loopVar + ' = 0; ' + loopVar + ' < ' + endVar + '; ' +
          loopVar + '++) {\n' + branch + '}\n';
  return code;
};

Blockly.Arduino.forBlock['controls_whileUntil'] = function(block) {
  // While/until loop.
  var until = block.getFieldValue('MODE') === 'UNTIL';
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL',
      until ? Blockly.Arduino.ORDER_LOGICAL_NOT :
      Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  if (until) {
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Arduino.forBlock['controls_for'] = function(block) {
  var variable0 = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), 'VARIABLE');
  var argument0 = Blockly.Arduino.valueToCode(block, 'FROM',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'TO',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var increment = Blockly.Arduino.valueToCode(block, 'BY',
      Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.Arduino.statementToCode(block, 'DO');
  var code = '';
  
  var isNumber = function(str) {
    return /^-?\d+(\.\d+)?$/.test(str);
  };

  // If all inputs are number literals, generate a simple loop
  if (isNumber(argument0) && isNumber(argument1) && isNumber(increment)) {
    var fromNum = parseFloat(argument0);
    var toNum = parseFloat(argument1);
    var byNum = Math.abs(parseFloat(increment));

    var up = fromNum <= toNum;
    code = 'for (int ' + variable0 + ' = ' + fromNum + '; ' +
           variable0 + (up ? ' <= ' : ' >= ') + toNum + '; ' +
           variable0;
    
    if (byNum === 1) {
        code += (up ? '++' : '--');
    } else {
        code += (up ? ' += ' : ' -= ') + byNum;
    }
    code += ') {\n' + branch + '}\n';

  } else {
    // Generic case with variables
    var startVar = argument0;
    if (!argument0.match(/^\w+$/)) {
      startVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_start', 'VARIABLE');
      code += 'int ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/)) {
      endVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_end', 'VARIABLE');
      code += 'int ' + endVar + ' = ' + argument1 + ';\n';
    }
    var incVar = increment;
    if (!increment.match(/^\w+$/)) {
      incVar = Blockly.Arduino.variableDB_.getDistinctName(
          variable0 + '_inc', 'VARIABLE');
      code += 'int ' + incVar + ' = ' + increment + ';\n';
    }

    code += 'for (int ' + variable0 + ' = ' + startVar + '; ';
    code += '(' + incVar + ' > 0) ? ' +
            variable0 + ' <= ' + endVar + ' : ' +
            variable0 + ' >= ' + endVar + '; ';
    code += variable0 + ' += ' + incVar + ') {\n' +
            branch + '}\n';
  }

  return code;
};

Blockly.Arduino.forBlock['controls_flow_statements'] = function(block) {
  // Flow statements: break, continue.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw new Error('Unknown flow statement.');
};
