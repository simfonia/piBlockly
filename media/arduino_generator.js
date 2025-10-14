Blockly.MyArduino = new Blockly.Generator('Arduino');

Blockly.MyArduino.addReservedWords(
    'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger,constants,floating,point,void,bookean,char,unsigned,byte,int,word,long,float,double,string,String,array,static,volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts'
);

Blockly.MyArduino.ORDER_ATOMIC = 0;
Blockly.MyArduino.ORDER_NEW = 1.1;
Blockly.MyArduino.ORDER_MEMBER = 1.2;
Blockly.MyArduino.ORDER_FUNCTION_CALL = 2;
Blockly.MyArduino.ORDER_INCREMENT = 3;
Blockly.MyArduino.ORDER_DECREMENT = 3;
Blockly.MyArduino.ORDER_BITWISE_NOT = 4.1;
Blockly.MyArduino.ORDER_UNARY_PLUS = 4.2;
Blockly.MyArduino.ORDER_UNARY_NEGATION = 4.3;
Blockly.MyArduino.ORDER_LOGICAL_NOT = 4.4;
Blockly.MyArduino.ORDER_TYPEOF = 4.5;
Blockly.MyArduino.ORDER_VOID = 4.6;
Blockly.MyArduino.ORDER_DELETE = 4.7;
Blockly.MyArduino.ORDER_AWAIT = 4.8;
Blockly.MyArduino.ORDER_EXPONENTIATION = 5;
Blockly.MyArduino.ORDER_MULTIPLICATION = 5.1;
Blockly.MyArduino.ORDER_DIVISION = 5.2;
Blockly.MyArduino.ORDER_MODULUS = 5.3;
Blockly.MyArduino.ORDER_SUBTRACTION = 6.1;
Blockly.MyArduino.ORDER_ADDITION = 6.2;
Blockly.MyArduino.ORDER_BITWISE_SHIFT = 7;
Blockly.MyArduino.ORDER_RELATIONAL = 8;
Blockly.MyArduino.ORDER_IN = 8;
Blockly.MyArduino.ORDER_INSTANCEOF = 8;
Blockly.MyArduino.ORDER_EQUALITY = 9;
Blockly.MyArduino.ORDER_BITWISE_AND = 10;
Blockly.MyArduino.ORDER_BITWISE_XOR = 11;
Blockly.MyArduino.ORDER_BITWISE_OR = 12;
Blockly.MyArduino.ORDER_LOGICAL_AND = 13;
Blockly.MyArduino.ORDER_LOGICAL_OR = 14;
Blockly.MyArduino.ORDER_CONDITIONAL = 15;
Blockly.MyArduino.ORDER_ASSIGNMENT = 16;
Blockly.MyArduino.ORDER_YIELD = 17;
Blockly.MyArduino.ORDER_COMMA = 18;
Blockly.MyArduino.ORDER_NONE = 99;
Blockly.MyArduino.ORDER_NONE = 99;

Blockly.MyArduino.init = function(workspace) {
  Blockly.MyArduino.definitions_ = Object.create(null);
  Blockly.MyArduino.setups_ = Object.create(null);
  if (!Blockly.MyArduino.variableDB_) {
    Blockly.MyArduino.variableDB_ = new Blockly.Names(Blockly.MyArduino.RESERVED_WORDS_);
  } else {
    Blockly.MyArduino.variableDB_.reset();
  }
  Blockly.MyArduino.variableDB_.setVariableMap(workspace.getVariableMap());
};

Blockly.MyArduino.finish = function(code) {
  var definitions = Object.values(Blockly.MyArduino.definitions_);
  var setups = Object.values(Blockly.MyArduino.setups_);
  var loop = 'void loop() {\n  ' + code.replace(/\n/g, '\n  ') + '\n}\n';
  var setup = 'void setup() {\n  ' + setups.join('\n  ') + '\n}\n';
  var finalCode = definitions.join('\n\n') + '\n\n' + setup + '\n' + loop;
  delete Blockly.MyArduino.definitions_;
  delete Blockly.MyArduino.setups_;
  Blockly.MyArduino.variableDB_.reset();
  return finalCode;
};

Blockly.MyArduino.scrubNakedValue = function(line) {
  return line + ';\n';
};

Blockly.MyArduino.quote_ = function(string) {
  return '"' + string.replace(/\\/g, '\\\\').replace(/"/g, '\"') + '"';
};

Blockly.MyArduino.scrub_ = function(block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.MyArduino.blockToCode(nextBlock);
  return code + nextCode;
};

// CATEGORY: ARDUINO

Blockly.MyArduino.forBlock['initializes_setup'] = function(block) {
  var statements_content = Blockly.MyArduino.statementToCode(block, 'CONTENT');
  Blockly.MyArduino.setups_['user_code'] = statements_content;
  return '';
};

Blockly.MyArduino.forBlock['initializes_loop'] = function(block) {
  return Blockly.MyArduino.statementToCode(block, 'CONTENT');
};

Blockly.MyArduino.forBlock['arduino_pin_mode'] = function(block) {
  var pin = Blockly.MyArduino.valueToCode(block, 'PIN', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var mode = Blockly.MyArduino.valueToCode(block, 'MODE', Blockly.MyArduino.ORDER_ATOMIC) || 'OUTPUT';
  Blockly.MyArduino.setups_['pin_mode_' + pin] = 'pinMode(' + pin + ', ' + mode + ');';
  return '';
};

Blockly.MyArduino.forBlock['arduino_pin_mode_mode_shadow'] = function(block) {
  var mode = block.getFieldValue('MODE');
  return [mode, Blockly.MyArduino.ORDER_ATOMIC];
};

Blockly.MyArduino.forBlock['arduino_pin_shadow'] = function(block) {
  var pin = block.getFieldValue('PIN');
  return [pin, Blockly.MyArduino.ORDER_ATOMIC];
};

Blockly.MyArduino.forBlock['arduino_digital_read'] = function(block) {
  var pin = Blockly.MyArduino.valueToCode(block, 'PIN', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var code = 'digitalRead(' + pin + ')';
  return [code, Blockly.MyArduino.ORDER_ATOMIC];
};

Blockly.MyArduino.forBlock['arduino_digital_write'] = function(block) {
  var pin = Blockly.MyArduino.valueToCode(block, 'PIN', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var value = block.getFieldValue('VALUE');
  var code = 'digitalWrite(' + pin + ', ' + value + ');\n';
  return code;
};

Blockly.MyArduino.forBlock['arduino_analog_read'] = function(block) {
  var pin = Blockly.MyArduino.valueToCode(block, 'PIN', Blockly.MyArduino.ORDER_ATOMIC) || 'A0';
  var code = 'analogRead(' + pin + ')';
  return [code, Blockly.MyArduino.ORDER_ATOMIC];
};

Blockly.MyArduino.forBlock['arduino_analog_write'] = function(block) {
  var pin = Blockly.MyArduino.valueToCode(block, 'PIN', Blockly.MyArduino.ORDER_ATOMIC) || '3';
  var value = Blockly.MyArduino.valueToCode(block, 'VALUE', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var code = 'analogWrite(' + pin + ', ' + value + ');\n';
  return code;
};

Blockly.MyArduino.forBlock['arduino_constrain'] = function(block) {
  var value = Blockly.MyArduino.valueToCode(block, 'VALUE', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var low = Blockly.MyArduino.valueToCode(block, 'LOW', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var high = Blockly.MyArduino.valueToCode(block, 'HIGH', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var code = 'constrain(' + value + ', ' + low + ', ' + high + ')';
  return [code, Blockly.MyArduino.ORDER_ATOMIC];
};

Blockly.MyArduino.forBlock['arduino_map'] = function(block) {
  var value = Blockly.MyArduino.valueToCode(block, 'VALUE', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var fromLow = Blockly.MyArduino.valueToCode(block, 'FROMLOW', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var fromHigh = Blockly.MyArduino.valueToCode(block, 'FROMHIGH', Blockly.MyArduino.ORDER_ATOMIC) || '1023';
  var toLow = Blockly.MyArduino.valueToCode(block, 'TOLOW', Blockly.MyArduino.ORDER_ATOMIC) || '0';
  var toHigh = Blockly.MyArduino.valueToCode(block, 'TOHIGH', Blockly.MyArduino.ORDER_ATOMIC) || '255';
  var code = 'map(' + value + ', ' + fromLow + ', ' + fromHigh + ', ' + toLow + ', ' + toHigh + ')';
  return [code, Blockly.MyArduino.ORDER_ATOMIC];
};

// CATEGORY: MATH

Blockly.MyArduino.forBlock['math_number'] = function(block) {
  var number = parseFloat(block.getFieldValue('NUM'));
  return [number, Blockly.MyArduino.ORDER_ATOMIC];
};

Blockly.MyArduino.forBlock['math_arithmetic'] = function(block) {
  var OPERATORS = {
    'ADD': [' + ', Blockly.MyArduino.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.MyArduino.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.MyArduino.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.MyArduino.ORDER_DIVISION],
    'POWER': [null, Blockly.MyArduino.ORDER_COMMA] // Handle power separately.
  };
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.MyArduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.MyArduino.valueToCode(block, 'B', order) || '0';
  var result_code;
  // Power superscript is not supported in C++.
  if (!operator) {
    result_code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [result_code, Blockly.MyArduino.ORDER_FUNCTION_CALL];
  }
  result_code = argument0 + operator + argument1;
  return [result_code, order];
};

Blockly.MyArduino.forBlock['math_single'] = function(block) {
  var operator = block.getFieldValue('OP');
  var code;
  var arg;
  if (operator === 'NEG') {
    // Negation is a special case given its different operator precedence.
    arg = Blockly.MyArduino.valueToCode(block, 'NUM',
        Blockly.MyArduino.ORDER_UNARY_NEGATION) || '0';
    if (arg[0] === '-') {
      // '--x' should be 'x'.
      arg = arg.substring(1);
    } else {
      arg = '-' + arg;
    }
    code = arg;
    return [code, Blockly.MyArduino.ORDER_UNARY_NEGATION];
  }
  if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
    arg = Blockly.MyArduino.valueToCode(block, 'NUM',
        Blockly.MyArduino.ORDER_DIVISION) || '0';
  } else {
    arg = Blockly.MyArduino.valueToCode(block, 'NUM',
        Blockly.MyArduino.ORDER_NONE) || '0';
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
    return [code, Blockly.MyArduino.ORDER_FUNCTION_CALL];
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
  return [code, Blockly.MyArduino.ORDER_DIVISION];
};

// CATEGORY: LOGIC

Blockly.MyArduino.forBlock['logic_compare'] = function(block) {
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
      Blockly.MyArduino.ORDER_EQUALITY : Blockly.MyArduino.ORDER_RELATIONAL;
  var argument0 = Blockly.MyArduino.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.MyArduino.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.MyArduino.forBlock['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') === 'AND') ? '&&' : '||';
  var order = (operator === '&&') ? Blockly.MyArduino.ORDER_LOGICAL_AND : Blockly.MyArduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.MyArduino.valueToCode(block, 'A', order);
  var argument1 = Blockly.MyArduino.valueToCode(block, 'B', order);
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

Blockly.MyArduino.forBlock['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.MyArduino.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.MyArduino.valueToCode(block, 'BOOL', order) || 'true';
  var result_code = '!' + argument0;
  return [result_code, order];
};

Blockly.MyArduino.forBlock['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
  return [code, Blockly.MyArduino.ORDER_ATOMIC];
};

// CATEGORY: CONTROLS

Blockly.MyArduino.forBlock['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.MyArduino.valueToCode(block, 'IF' + n,
      Blockly.MyArduino.ORDER_NONE) || 'false';
    branchCode = Blockly.MyArduino.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.MyArduino.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};
