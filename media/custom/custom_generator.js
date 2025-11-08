// Generator Functions for custom blocks

const ensurePiCarMotorDependencies = () => {
  Blockly.Arduino.macros_['define_picar_motor_pins'] = 
    '// Motor Pins\n' +
    '#define pinM1A 8\n' +
    '#define pinM1B 9\n' +
    '#define pinM2A 10\n' +
    '#define pinM2B 11\n';
  Blockly.Arduino.setups_['setup_motors'] = 'pinMode(pinM1A, OUTPUT);\n  pinMode(pinM1B, OUTPUT);\n  pinMode(pinM2A, OUTPUT);\n  pinMode(pinM2B, OUTPUT);\n';
};

const ensurePiCarUltrasonicDependencies = () => {
  Blockly.Arduino.macros_['define_picar_ultrasonic_pins'] = 
    '#define pinTrig 28\n' +
    '#define pinEcho 7\n';
  Blockly.Arduino.setups_['setup_ultrasonic'] = 'pinMode(pinTrig, OUTPUT);\n  pinMode(pinEcho, INPUT);\n';
};

const ensurePiCarIRDependencies = () => {
  Blockly.Arduino.macros_['define_picar_ir_pins'] = 
    '#define pinIR_D 26\n' +
    '#define pinIR_A 27\n';
  Blockly.Arduino.setups_['setup_ir'] = 'pinMode(pinIR_D, INPUT);\n  pinMode(pinIR_A, INPUT);\n';
};

const ensurePiCarLEDDependencies = () => {
  Blockly.Arduino.includes_['define_neopixel_header'] = '#include <Adafruit_NeoPixel.h>\n';
  Blockly.Arduino.macros_['define_picar_led_pins'] = '#define pinRGB 18\n';
  Blockly.Arduino.definitions_['define_picar_led_object'] = 'Adafruit_NeoPixel strip(2, pinRGB, NEO_GRB + NEO_KHZ800);\n';
  Blockly.Arduino.setups_['setup_rgb_led'] = 'strip.begin();\n  strip.setBrightness(10);\n';
};

const ensurePiCarBuzzerDependencies = () => {
  Blockly.Arduino.macros_['define_picar_buzzer_pins'] = '#define pinBuzzer 22\n';
  Blockly.Arduino.setups_['setup_buzzer'] = 'pinMode(pinBuzzer, OUTPUT);\n';
};

const ensurePiCarButtonDependencies = () => {
  Blockly.Arduino.macros_['define_picar_button_pins'] = '#define pinBtnStart 20\n';
  Blockly.Arduino.setups_['setup_button'] = 'pinMode(pinBtnStart, INPUT_PULLUP);\n';
};

const ensurePiCarServoDependencies = () => {
  Blockly.Arduino.includes_['define_servo_header'] = '#include <Servo.h>\n';
  Blockly.Arduino.macros_['define_picar_servo_pins'] = 
    '#define pinServoL 12\n' +
    '#define pinServoR 13\n';
  Blockly.Arduino.definitions_['define_picar_servo_objects'] = 
    'Servo handL;\n' +
    'Servo handR;\n';
  Blockly.Arduino.definitions_['define_picar_servo_globals'] = 
    'int g_hand_range = 180;\n' +
    'int g_s_angle_L = 180;\n' +
    'int g_s_angle_R = 0;\n';
  Blockly.Arduino.setups_['setup_servos'] = 'handL.attach(pinServoL, 460, 2400);\n  handR.attach(pinServoR, 460, 2400);\n';
};

const ensureMusicDependencies = () => {
  Blockly.Arduino.definitions_['define_g_tempo_bpm'] = 'int g_tempo_bpm = 120; // Default tempo in BPM';
  Blockly.Arduino.definitions_['define_g_quarter_note_ms'] = 'int g_quarter_note_ms = 500; // Default quarter note duration in ms (120 BPM)';
  Blockly.Arduino.definitions_['define_playNote'] =
    'void playNote(int pin, int frequency, int duration_ms, int pause_ms) {\n' +
    '  if (frequency == 0) { // Rest\n' +
    '    noTone(pin);\n' +
    '    delay(duration_ms);\n' +
    '  } else {\n' +
    '    tone(pin, frequency, duration_ms);\n' +
    '    delay(pause_ms); // Pause after playing the note\n' +
    '  }\n' +
    '  noTone(pin); // Ensure tone stops\n' +
    '}\n';
};


// =============================================================================
// BLOCK GENERATORS
// =============================================================================

// picar
// 初始化 - This block provides the basic hardware definitions and setup sequence.
Blockly.Arduino.forBlock['picar_init'] = function(block) {
  // Ensure all hardware modules are defined
  ensurePiCarMotorDependencies();
  ensurePiCarServoDependencies();
  ensurePiCarUltrasonicDependencies();
  ensurePiCarIRDependencies();
  ensurePiCarLEDDependencies();
  ensurePiCarBuzzerDependencies();
  ensurePiCarButtonDependencies();

  // Define the boot sequence function
  Blockly.Arduino.definitions_['define_inPosition'] =
    'void inPosition(){  // Servo motor initial positioning\n' + 
    '  handL.write(180);\n' + 
    '  handR.write(0);\n' + 
    '  delay(1000);\n' + 
    '}\n';

  // Add the boot sequence to the setup
  Blockly.Arduino.setups_['setup_serial'] = 'Serial.begin(9600);\n'; // Also ensure serial is ready
  Blockly.Arduino.setups_['setup_flow_inposition'] = 'inPosition(); // Servo homing\n';
  Blockly.Arduino.setups_['setup_flow_beep'] = 'tone(pinBuzzer, 440, 200); // Ready beep\n';
  Blockly.Arduino.setups_['setup_flow_wait_button'] = 'while (digitalRead(pinBtnStart)) { /* wait for button press */ }\n  delay(500);\n';

  return '// PiCar Initialized and ready.\n';
};

// 手臂開合角度最大範圍
Blockly.Arduino.forBlock['picar_set_hand_range'] = function(block) {
  var range = Blockly.Arduino.valueToCode(block, 'RANGE', Blockly.Arduino.ORDER_ATOMIC) || '170';
  // Assign the value to the globally declared g_hand_range
  return 'g_hand_range = ' + range + ';\n';
};

// 重置
Blockly.Arduino.forBlock['picar_resetPiCar'] = function(block) {
  Blockly.Arduino.definitions_['define_resetPiCar'] =
    'void resetPiCar() {\n' + 
    '  watchdog_reboot(0, 0, 0);\n' + 
    '}\n';
  return 'resetPiCar();\n';
};

// 左右直流馬達動力
Blockly.Arduino.forBlock['picar_drive'] = function(block) {
  ensurePiCarMotorDependencies();
  Blockly.Arduino.definitions_['define_drive'] =
    'void drive(int powerL, int powerR) {  // left and right motor control\n' + 
    '  // powerL: Left motor direction and power.\n' + 
    '  // powerR: Right motor direction and power.\n\n' + 
    '  powerL = constrain(powerL, -255, 255);  // -255<= powerL <= 255\n' + 
    '  powerR = constrain(powerR, -255, 255);  // -255<= powerR <= 255\n\n' + 
    '  if (powerL > 0) {\n' + 
    '    analogWrite(pinM1A, powerL);\n' + 
    '    analogWrite(pinM1B, 0);\n' + 
    '  } else {\n' + 
    '    analogWrite(pinM1A, 0);\n' + 
    '    analogWrite(pinM1B, -powerL);\n' + 
    '  }\n' + 
    '  if (powerR > 0) {\n' + 
    '    analogWrite(pinM2A, powerR);\n' + 
    '    analogWrite(pinM2B, 0);\n' + 
    '  } else {\n' + 
    '    analogWrite(pinM2A, 0);\n' + 
    '    analogWrite(pinM2B, -powerR);\n' + 
    '  }\n' + 
    '}\n';
  var value_power_l = Blockly.Arduino.valueToCode(block, 'POWER_L', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_power_r = Blockly.Arduino.valueToCode(block, 'POWER_R', Blockly.Arduino.ORDER_ATOMIC) || '0';
  return 'drive(' + value_power_l + ', ' + value_power_r + ');\n';
};

// 停車
Blockly.Arduino.forBlock['picar_stop'] = function(block) {
  ensurePiCarMotorDependencies();
  Blockly.Arduino.definitions_['define_coast'] =
    'void coast() {  // stop the car and coast\n' + 
    '  analogWrite(pinM1A, 255);\n' + 
    '  analogWrite(pinM1B, 255);\n' + 
    '  analogWrite(pinM2A, 255);\n' + 
    '  analogWrite(pinM2B, 255);\n' + 
    '  delay(1000);\n' + 
    '}\n';
  Blockly.Arduino.definitions_['define_brake'] =
    'void brake() {  // stop the car and brake\n' + 
    '  analogWrite(pinM1A, 0);\n' + 
    '  analogWrite(pinM1B, 0);\n' + 
    '  analogWrite(pinM2A, 0);\n' + 
    '  analogWrite(pinM2B, 0);\n' + 
    '  delay(500);\n' + 
    '}\n';
  var dropdown_mode = block.getFieldValue('MODE');
  var code = '';
  if (dropdown_mode === 'COAST') {
    code = 'coast();\n';
  } else if (dropdown_mode === 'BRAKE') {
    code = 'brake();\n';
  }
  return code;
};

// 超音波測距
Blockly.Arduino.forBlock['picar_checkDistance'] = function(block) {
  ensurePiCarUltrasonicDependencies();
  Blockly.Arduino.definitions_['define_checkDistance'] =
    'float checkDistance() {  // detection distance\n' + 
    '  // Use ultrasonic to detect the distance of obstacles in centimeters.\n' + 
    '  digitalWrite(pinTrig, LOW);\n' + 
    '  delayMicroseconds(2);\n' + 
    '  digitalWrite(pinTrig, HIGH);\n' + 
    '  delayMicroseconds(10);\n' + 
    '  digitalWrite(pinTrig, LOW);\n\n' + 
    '  // Measure the response from the HC-SR04P Echo Pin.\n' + 
    '  int duration = pulseIn(pinEcho, HIGH);\n\n' + 
    '  // Determine distance from duration\n' + 
    '  // Use 340 meters per second as speed of sound\n' + 
    '  float distance = duration * 0.034 / 2;\n' + 
    '  delay(20);  // Pause to prevent frequent reading\n' + 
    '  return distance;\n' + 
    '}\n';
  return ['checkDistance()', Blockly.Arduino.ORDER_ATOMIC];
};

// 紅外線反射(數位)
Blockly.Arduino.forBlock['picar_checkColor'] = function(block) {
  ensurePiCarIRDependencies();
  Blockly.Arduino.definitions_['define_checkColor'] =
    'int checkColor() {  // detection black and white\n' + 
    '  // Use digital signals from infrared reflective sensor to detect black and white.\n' + 
    '  // Returns 0 for black and 1 for white.\n' + 
    '  int IR_D = digitalRead(pinIR_D);  // 0:white  1:black\n' + 
    '  delay(1);  // Pause to prevent noise caused by frequent reads.\n' + 
    '  return !IR_D;  // Invert, 0:black  1:white\n' + 
    '}\n';
  return ['checkColor()', Blockly.Arduino.ORDER_ATOMIC];
};

// 紅外線反射(類比)
Blockly.Arduino.forBlock['picar_checkGray'] = function(block) {
  ensurePiCarIRDependencies();
  Blockly.Arduino.definitions_['define_checkGray'] =
    'int checkGray() {  // detection grayscale\n' + 
    '  // Use analog signals from infrared reflective sensor to detect grayscale.\n' + 
    '  // Returns a value between 0 and 1023.\n' + 
    '  int IR_A = analogRead(pinIR_A);\n' + 
    '  delay(1);  // Pause to prevent noise caused by frequent reads.\n' + 
    '  return (1023 - IR_A);  // Invert, 0:black  1023:white \n' + 
    '}\n';
  return ['checkGray()', Blockly.Arduino.ORDER_ATOMIC];
};

// 手臂初始位置
Blockly.Arduino.forBlock['picar_inPosition'] = function(block) {
  // The function is defined in picar_init, this block just calls it.
  return 'inPosition();\n';
};

// 萬用手臂控制
Blockly.Arduino.forBlock['picar_move_hands'] = function(block) {
  ensurePiCarServoDependencies();
  Blockly.Arduino.definitions_['define_moveHandsStateful'] =
    'void moveHandsStateful(int hand_selector, int percent, int speed) {\n' + 
    '  /* hand_selector: 0=LEFT, 1=RIGHT, 2=BOTH */\n\n' + 
    '  percent = constrain(percent, 0, 100);\n' + 
    '  float percentage = percent / 100.0;\n' + 
    '  int target_L = 180 - (percentage * g_hand_range);\n' + 
    '  int target_R = percentage * g_hand_range;\n\n' + 
    '  long step_delay_us;\n' + 
    '  if (speed == 11) {\n' + 
    '    step_delay_us = 1; // Full speed\n' + 
    '  } else {\n' + 
    '    speed = constrain(speed, 1, 10);\n' + 
    '    step_delay_us = map(speed, 1, 10, 20000, 100);\n' + 
    '  }\n\n' + 
    '  bool move_L = (hand_selector == 0 || hand_selector == 2);\n' + 
    '  bool move_R = (hand_selector == 1 || hand_selector == 2);\n\n' + 
    '  while (true) {\n' + 
    '    bool done_L = true;\n' + 
    '    bool done_R = true;\n\n' + 
    '    if (move_L) {\n' + 
    '      if (g_s_angle_L < target_L) g_s_angle_L++;\n' + 
    '      else if (g_s_angle_L > target_L) g_s_angle_L--;\n' + 
    '      handL.write(g_s_angle_L);\n' + 
    '      if (g_s_angle_L != target_L) done_L = false;\n' + 
    '    }\n\n' + 
    '    if (move_R) {\n' + 
    '      if (g_s_angle_R < target_R) g_s_angle_R++;\n' + 
    '      else if (g_s_angle_R > target_R) g_s_angle_R--;\n' + 
    '      handR.write(g_s_angle_R);\n' + 
    '      if (g_s_angle_R != target_R) done_R = false;\n' + 
    '    }\n\n' + 
    '    if (done_L && done_R) {\n' + 
    '      break;\n' + 
    '    }\n' + 
    '\n' + 
    '    delayMicroseconds(step_delay_us);\n' + 
    '  }\n' + 
    '  delay(500);\n' + 
    '}\n'; // Global angles for the stateful move block
  var hand = block.getFieldValue('HAND');
  var percent = Blockly.Arduino.valueToCode(block, 'PERCENT', Blockly.Arduino.ORDER_ATOMIC) || '50';
  var speed = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '8';
  var hand_selector = 2; /* Default to BOTH */
  if (hand === 'LEFT') {
    hand_selector = 0;
  } else if (hand === 'RIGHT') {
    hand_selector = 1;
  }
  var code = 'moveHandsStateful(' + hand_selector + ', ' + percent + ', ' + speed + ');\n';
  return code;
};

// 設定RGB燈顏色
Blockly.Arduino.forBlock['picar_set_led_color'] = function(block) {
  ensurePiCarLEDDependencies();
  var ledIndex = block.getFieldValue('LED_INDEX');
  var color = block.getFieldValue('COLOR');
  var r = parseInt(color.substring(1, 3), 16);
  var g = parseInt(color.substring(3, 5), 16);
  var b = parseInt(color.substring(5, 7), 16);

  var code = '';
  if (ledIndex === 'ALL') {
    code += 'strip.setPixelColor(0, strip.Color(' + r + ', ' + g + ', ' + b + '));\n';
    code += 'strip.setPixelColor(1, strip.Color(' + r + ', ' + g + ', ' + b + '));\n';
  } else {
    code += 'strip.setPixelColor(' + ledIndex + ', strip.Color(' + r + ', ' + g + ', ' + b + '));\n';
  }
  code += 'strip.show();\n';
  return code;
};

// 燈光閃爍
Blockly.Arduino.forBlock['picar_flashingLight'] = function(block) {
  ensurePiCarLEDDependencies();
  Blockly.Arduino.definitions_['define_flashingLight'] =
      'void flashingLight(){\n' + 
      '  strip.setPixelColor(0, strip.Color(255, 0, 0));\n' + 
      '  strip.setPixelColor(1, strip.Color(0, 0, 255));\n' + 
      '  strip.show();\n' +
      '  delay(500);\n' + 
      '  strip.setPixelColor(0, strip.Color(0, 0, 0));\n' + 
      '  strip.setPixelColor(1, strip.Color(0, 0, 0));\n' + 
      '  strip.show();\n' + 
      '  delay(500);\n' + 
      '}\n';
  return 'flashingLight();\n';
};

Blockly.Arduino.forBlock['picar_set_tempo'] = function(block) {
  ensurePiCarBuzzerDependencies();
  ensureMusicDependencies();
  var bpm = Blockly.Arduino.valueToCode(block, 'BPM', Blockly.Arduino.ORDER_ATOMIC) || '120';
  var code = '';
  code += 'g_tempo_bpm = ' + bpm + ';\n';
  code += 'g_quarter_note_ms = 60000 / g_tempo_bpm; // Calculate quarter note duration in ms\n';
  return code;
};

Blockly.Arduino.forBlock['picar_play_note'] = function(block) {
  ensurePiCarBuzzerDependencies();
  ensureMusicDependencies();
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || 'pinBuzzer';
  var frequency = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC) || '440';
  var noteValueRatio = parseFloat(block.getFieldValue('NOTE_VALUE'));
  var isDotted = block.getFieldValue('DOTTED') === 'TRUE';
  var isTriplet = block.getFieldValue('TRIPLET') === 'TRUE';

  // Calculate base duration in milliseconds based on quarter note duration
  var duration_ms_code = 'g_quarter_note_ms * ' + noteValueRatio;

  if (isDotted) {
    duration_ms_code += ' * 1.5';
  }
  if (isTriplet) {
    duration_ms_code += ' * (2.0 / 3.0)'; // Triplet reduces duration to 2/3 of its normal value
  }

  // Pause between notes (e.g., 1.3 times the note duration)
  var pause_ms_code = '(' + duration_ms_code + ') * 1.30';

  var code = 'playNote(' + pin + ', ' + frequency + ', (int)(' + duration_ms_code + '), (int)(' + pause_ms_code + '));\n';
  return code;
};

Blockly.Arduino.forBlock['picar_note_to_frequency'] = function(block) {
  var noteName = block.getFieldValue('NOTE_NAME');
  var octave = parseInt(block.getFieldValue('OCTAVE'), 10);

  var semitonesFromC = 0;
  switch (noteName) {
    case 'C': semitonesFromC = 0; break;
    case 'CS': semitonesFromC = 1; break; // C#
    case 'D': semitonesFromC = 2; break;
    case 'DS': semitonesFromC = 3; break; // D#
    case 'E': semitonesFromC = 4; break;
    case 'F': semitonesFromC = 5; break;
    case 'FS': semitonesFromC = 6; break; // F#
    case 'G': semitonesFromC = 7; break;
    case 'GS': semitonesFromC = 8; break; // G#
    case 'A': semitonesFromC = 9; break;
    case 'AS': semitonesFromC = 10; break; // A#
    case 'B': semitonesFromC = 11; break;
  }

  const C0_FREQ = 16.35; // Frequency of C0
  var frequency = C0_FREQ * Math.pow(2, octave + (semitonesFromC / 12));

  return [frequency.toFixed(2), Blockly.Arduino.ORDER_ATOMIC];
};

// 播放音調
Blockly.Arduino.forBlock['picar_tone'] = function(block) {
  ensurePiCarBuzzerDependencies();
  ensureMusicDependencies();
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || 'pinBuzzer';
  var frequency = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC) || '440';
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC) || '200';
  var code = 'tone(' + pin + ', ' + frequency + ', ' + duration + ');\n';
  return code;
};

// 停止音調
Blockly.Arduino.forBlock['picar_no_tone'] = function(block) {
  ensurePiCarBuzzerDependencies();
  ensureMusicDependencies();
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || 'pinBuzzer';
  var code = 'noTone(' + pin + ');\n';
  return code;
};


// Coding
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

const DEFINITION_BLOCK_TYPES = ['variables_declare_global', 'coding_raw_definition'];

function processDefinitionStack(block) {
  const prevBlock = block.getPreviousBlock();
  if (prevBlock && DEFINITION_BLOCK_TYPES.includes(prevBlock.type)) {
    return '';
  }

  let codes = [];
  let currentBlock = block;

  while (currentBlock && DEFINITION_BLOCK_TYPES.includes(currentBlock.type)) {
    let blockCode = '';
    if (currentBlock.type === 'variables_declare_global') {
        const type = currentBlock.getFieldValue('TYPE');
        const varId = currentBlock.getFieldValue('VAR');
        const variable = currentBlock.workspace.getVariableById(varId);
        const varName = variable ? variable.name : 'UNKNOWN_VAR';
        const value = Blockly.Arduino.valueToCode(currentBlock, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
        const defaultValue = (type === 'String') ? '""' : (type === 'bool') ? 'false' : '0';
        const finalValue = value || defaultValue;
        blockCode = type + ' ' + varName + ' = ' + finalValue + ';';
        if (!blockCode.endsWith(';')) {
            blockCode += ';';
        }
    } else if (currentBlock.type === 'coding_raw_definition') {
        blockCode = currentBlock.getFieldValue('CODE');
    }
    
    if (blockCode) {
        codes.push(blockCode);
    }
    
    currentBlock = currentBlock.getNextBlock();
  }

  if (codes.length > 0) {
    // Place the collected definitions into the global variables bucket.
    Blockly.Arduino.global_vars_['stack_' + block.id] = codes.join('\n') + '\n';
  }

  return '';
}

Blockly.Arduino.forBlock['coding_raw_definition'] = processDefinitionStack;
Blockly.Arduino.forBlock['variables_declare_global'] = processDefinitionStack;


// Variables Blocks
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


// Array Blocks
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


// Function Blocks
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