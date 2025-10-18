Blockly.Arduino = new Blockly.Generator('Arduino');

Blockly.Arduino.addReservedWords(
    'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger,constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static,volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
);

Blockly.Arduino.ORDER_ATOMIC = 0;
Blockly.Arduino.ORDER_NEW = 1.1;
Blockly.Arduino.ORDER_MEMBER = 1.2;
Blockly.Arduino.ORDER_FUNCTION_CALL = 2;
Blockly.Arduino.ORDER_INCREMENT = 3;
Blockly.Arduino.ORDER_DECREMENT = 3;
Blockly.Arduino.ORDER_BITWISE_NOT = 4.1;
Blockly.Arduino.ORDER_UNARY_PLUS = 4.2;
Blockly.Arduino.ORDER_UNARY_NEGATION = 4.3;
Blockly.Arduino.ORDER_LOGICAL_NOT = 4.4;
Blockly.Arduino.ORDER_TYPEOF = 4.5;
Blockly.Arduino.ORDER_VOID = 4.6;
Blockly.Arduino.ORDER_DELETE = 4.7;
Blockly.Arduino.ORDER_AWAIT = 4.8;
Blockly.Arduino.ORDER_EXPONENTIATION = 5;
Blockly.Arduino.ORDER_MULTIPLICATION = 5.1;
Blockly.Arduino.ORDER_DIVISION = 5.2;
Blockly.Arduino.ORDER_MODULUS = 5.3;
Blockly.Arduino.ORDER_SUBTRACTION = 6.1;
Blockly.Arduino.ORDER_ADDITION = 6.2;
Blockly.Arduino.ORDER_BITWISE_SHIFT = 7;
Blockly.Arduino.ORDER_RELATIONAL = 8;
Blockly.Arduino.ORDER_IN = 8;
Blockly.Arduino.ORDER_INSTANCEOF = 8;
Blockly.Arduino.ORDER_EQUALITY = 9;
Blockly.Arduino.ORDER_BITWISE_AND = 10;
Blockly.Arduino.ORDER_BITWISE_XOR = 11;
Blockly.Arduino.ORDER_BITWISE_OR = 12;
Blockly.Arduino.ORDER_LOGICAL_AND = 13;
Blockly.Arduino.ORDER_LOGICAL_OR = 14;
Blockly.Arduino.ORDER_CONDITIONAL = 15;
Blockly.Arduino.ORDER_ASSIGNMENT = 16;
Blockly.Arduino.ORDER_YIELD = 17;
Blockly.Arduino.ORDER_COMMA = 18;
Blockly.Arduino.ORDER_NONE = 99;
Blockly.Arduino.ORDER_NONE = 99;

Blockly.Arduino.init = function(workspace) {
  Blockly.Arduino.definitions_ = Object.create(null);
  Blockly.Arduino.setups_ = Object.create(null);
  if (!Blockly.Arduino.variableDB_) {
    Blockly.Arduino.variableDB_ = new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.variableDB_.reset();
  }
  Blockly.Arduino.variableDB_.setVariableMap(workspace.getVariableMap());
};

Blockly.Arduino.finish = function(code) {
  var definitions = Object.values(Blockly.Arduino.definitions_);
  var setups = Object.values(Blockly.Arduino.setups_);
  var loop = 'void loop() {\n  ' + code.replace(/\n/g, '\n  ') + '\n}\n';
  var setup = 'void setup() {\n  ' + setups.join('\n  ') + '\n}\n';
  var finalCode = definitions.join('\n\n') + '\n\n' + setup + '\n' + loop;
  delete Blockly.Arduino.definitions_;
  delete Blockly.Arduino.setups_;
  Blockly.Arduino.variableDB_.reset();
  return finalCode;
};

Blockly.Arduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

Blockly.Arduino.quote_ = function(string) {
  return '"' + string.replace(/\\/g, '\\\\').replace(/"/g, '\"') + '"';
};

Blockly.Arduino.scrub_ = function(block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Arduino.blockToCode(nextBlock);
  return code + nextCode;
};

// CATEGORY: ARDUINO

Blockly.Arduino.forBlock['initializes_setup'] = function(block) {
  var statements_content = Blockly.Arduino.statementToCode(block, 'CONTENT');
  Blockly.Arduino.setups_['user_code'] = statements_content;
  return '';
};

Blockly.Arduino.forBlock['initializes_loop'] = function(block) {
  return Blockly.Arduino.statementToCode(block, 'CONTENT');
};

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

Blockly.Arduino.forBlock['arduino_constrain'] = function(block) {
  var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var low = Blockly.Arduino.valueToCode(block, 'LOW', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var high = Blockly.Arduino.valueToCode(block, 'HIGH', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = 'constrain(' + value + ', ' + low + ', ' + high + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['arduino_map'] = function(block) {
  var value = Blockly.Arduino.valueToCode(block, 'VALUE', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var fromLow = Blockly.Arduino.valueToCode(block, 'FROMLOW', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var fromHigh = Blockly.Arduino.valueToCode(block, 'FROMHIGH', Blockly.Arduino.ORDER_ATOMIC) || '1023';
  var toLow = Blockly.Arduino.valueToCode(block, 'TOLOW', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var toHigh = Blockly.Arduino.valueToCode(block, 'TOHIGH', Blockly.Arduino.ORDER_ATOMIC) || '255';
  var code = 'map(' + value + ', ' + fromLow + ', ' + fromHigh + ', ' + toLow + ', ' + toHigh + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// CATEGORY: MATH

Blockly.Arduino.forBlock['math_number'] = function(block) {
  var number = String(parseFloat(block.getFieldValue('NUM')));
  return [number, Blockly.Arduino.ORDER_ATOMIC];
};


Blockly.Arduino.forBlock['math_arithmetic'] = function(block) {
  var OPERATORS = {
    'ADD': [' + ', Blockly.Arduino.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.Arduino.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.Arduino.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.Arduino.ORDER_DIVISION],
    'POWER': [null, Blockly.Arduino.ORDER_COMMA] // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var result_code;
  // Power superscript is not supported in C++.
  if (!operator) {
    result_code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [result_code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
  result_code = argument0 + operator + argument1;
  return [result_code, order];
};

Blockly.Arduino.forBlock['math_single'] = function(block) {
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator === 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] === '-') {
      // '--x' should be 'x'.
      arg = arg.substring(1);
    } else {
      arg = '-' + arg;
    }
    code = arg;
    return [code, Blockly.Arduino.ORDER_UNARY_NEGATION];
  }
  if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_DIVISION) || '0';
  } else {
    arg = Blockly.Arduino.valueToCode(block, 'NUM',
        Blockly.Arduino.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping them.
  switch (operator) {
    case 'ABS':
      code = 'abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'log(' + arg + ')';
      break;
    case 'LOG10':
      code = 'log10(' + arg + ')';
      break;
    case 'EXP':
      code = 'exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'pow(10, ' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'sin(' + arg + ' / 180.0 * PI)';
      break;
    case 'COS':
      code = 'cos(' + arg + ' / 180.0 * PI)';
      break;
    case 'TAN':
      code = 'tan(' + arg + ' / 180.0 * PI)';
      break;
  }
  if (code) {
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses
  // wrapping them.
  switch (operator) {
    case 'ASIN':
      code = 'asin(' + arg + ') / PI * 180';
      break;
    case 'ACOS':
      code = 'acos(' + arg + ') / PI * 180';
      break;
    case 'ATAN':
      code = 'atan(' + arg + ') / PI * 180';
      break;
    default:
      throw new Error('Unknown math operator: ' + operator); 
  }
  return [code, Blockly.Arduino.ORDER_DIVISION];
};

// CATEGORY: LOGIC

Blockly.Arduino.forBlock['logic_compare'] = function(block) {
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator === '==' || operator === '!=') ?
      Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino.forBlock['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') === 'AND') ? '&&' : '||';
  var order = (operator === '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND : Blockly.Arduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Arduino.valueToCode(block, 'A', order);
  var argument1 = Blockly.Arduino.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator === '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.Arduino.forBlock['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.Arduino.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.Arduino.valueToCode(block, 'BOOL', order) || 'true';
  var result_code = '!' + argument0;
  return [result_code, order];
};

Blockly.Arduino.forBlock['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// CATEGORY: CONTROLS

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


// CATEGORY: TEXT
Blockly.Arduino.forBlock['text'] = function(block) {
  // Text value.
  var code = Blockly.Arduino.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  if (block.itemCount_ === 0) {
    return ['""', Blockly.Arduino.ORDER_ATOMIC];
  } else if (block.itemCount_ === 1) {
    var element = Blockly.Arduino.valueToCode(block, 'ADD0',
        Blockly.Arduino.ORDER_NONE) || '""';
    var code = 'String(' + element + ')';
    return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
  } else {
    var elements = new Array(block.itemCount_);
    for (var i = 0; i < block.itemCount_; i++) {
      elements[i] = 'String(' + (Blockly.Arduino.valueToCode(block, 'ADD' + i,
          Blockly.Arduino.ORDER_NONE) || '""') + ')';
    }
    var code = elements.join(' + ');
    return [code, Blockly.Arduino.ORDER_ADDITION];
  }
};

Blockly.Arduino.forBlock['text_append'] = function(block) {
  // Append to a variable in place.
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), 'VARIABLE');
  var text = Blockly.Arduino.valueToCode(block, 'TEXT',
      Blockly.Arduino.ORDER_NONE) || '""';
  return varName + ' += ' + text + ';\n';
};

// CATEGORY: LISTS
Blockly.Arduino.forBlock['lists_create_with'] = function(block) {
  var elements = new Array(block.itemCount_);
  for (var i = 0; i < block.itemCount_; i++) {
    elements[i] = Blockly.Arduino.valueToCode(block, 'ADD' + i,
        Blockly.Arduino.ORDER_NONE) || 'null';
  }
  var code = '{' + elements.join(', ') + '}';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


// CATEGORY: VARIABLES
Blockly.Arduino.forBlock['variables_get'] = function(block) {
  // Variable getter.
  var varName = Blockly.Arduino.variableDB_.getName(
      block.getFieldValue('VAR'), 'VARIABLE'); // 使用 'VARIABLE' 作為類型
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