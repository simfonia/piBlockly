// =============================================================================
// PICAR DEPENDENCY MANAGEMENT
// =============================================================================

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
  // Declare global variables for tempo and quarter note duration
  // Default values will be handled by the picar_set_tempo block if not explicitly set elsewhere.
  Blockly.Arduino.definitions_['define_g_tempo_bpm'] = 'int g_tempo_bpm = 120; // Tempo in BPM';
  Blockly.Arduino.definitions_['define_g_quarter_note_ms'] = 'float g_quarter_note_ms = 500.0; // Quarter note duration in ms (120 BPM)';
  Blockly.Arduino.definitions_['define_playNote'] =
    'void playNote(int pin, int frequency, int total_duration_ms) {\n' +
    '  if (frequency == 0) { // Rest\n' +
    '    noTone(pin);\n' +
    '    delay(total_duration_ms);\n' +
    '  } else {\n' +
    '    int tone_duration = total_duration_ms * 0.9; // Play tone for 90% of duration for a slight staccato effect\n' +
    '    tone(pin, frequency, tone_duration);\n' +
    '    delay(total_duration_ms); // Wait for the full note duration\n' +
    '  }\n' +
    '  noTone(pin); // Ensure tone stops after each note/rest\n' +
    '}\n';
};

export function registerGenerators(Blockly) {

// =============================================================================
// PICAR BLOCK GENERATORS
// =============================================================================

const PICAR_DRIVE_FUNC = `
void drive(int powerL, int powerR) {  // left and right motor control
  // powerL: Left motor direction and power.
  // powerR: Right motor direction and power.

  powerL = constrain(powerL, -255, 255);  // -255<= powerL <= 255
  powerR = constrain(powerR, -255, 255);  // -255<= powerR <= 255

  if (powerL > 0) {
    analogWrite(pinM1A, powerL);
    analogWrite(pinM1B, 0);
  } else {
    analogWrite(pinM1A, 0);
    analogWrite(pinM1B, -powerL);
  }
  if (powerR > 0) {
    analogWrite(pinM2A, powerR);
    analogWrite(pinM2B, 0);
  } else {
    analogWrite(pinM2A, 0);
    analogWrite(pinM2B, -powerR);
  }
}
`;

const PICAR_COAST_FUNC = `
void coast() {  // stop the car and coast
  analogWrite(pinM1A, 255);
  analogWrite(pinM1B, 255);
  analogWrite(pinM2A, 255);
  analogWrite(pinM2B, 255);
  delay(1000);
}
`;
const PICAR_BRAKE_FUNC = `
void brake() {  // stop the car and brake
  analogWrite(pinM1A, 0);
  analogWrite(pinM1B, 0);
  analogWrite(pinM2A, 0);
  analogWrite(pinM2B, 0);
  delay(500);
}
`;

const PICAR_CHECK_DISTANCE_FUNC = `
float checkDistance() {  // detection distance
  // Use ultrasonic to detect the distance of obstacles in centimeters.
  digitalWrite(pinTrig, LOW);
  delayMicroseconds(2);
  digitalWrite(pinTrig, HIGH);
  delayMicroseconds(10);
  digitalWrite(pinTrig, LOW);

  // Measure the response from the HC-SR04P Echo Pin.
  int duration = pulseIn(pinEcho, HIGH);

  // Determine distance from duration
  // Use 340 meters per second as speed of sound
  float distance = duration * 0.034 / 2;
  delay(20);  // Pause to prevent frequent reading
  return distance;
}
`;

const PICAR_CHECK_COLOR_FUNC = `
int checkColor() {  // detection black and white
  // Use digital signals from infrared reflective sensor to detect black and white.
  // Returns 0 for black and 1 for white.
  int IR_D = digitalRead(pinIR_D);  // 0:white  1:black
  delay(1);  // Pause to prevent noise caused by frequent reads.
  return !IR_D;  // Invert, 0:black  1:white
}
`;

const PICAR_CHECK_GRAY_FUNC = `
int checkGray() {  // detection grayscale
  // Use analog signals from infrared reflective sensor to detect grayscale.
  // Returns a value between 0 and 1023.
  int IR_A = analogRead(pinIR_A);
  delay(1);  // Pause to prevent noise caused by frequent reads.
  return (1023 - IR_A);  // Invert, 0:black  1023:white
}
`;

const PICAR_MOVE_HANDS_STATEFUL_FUNC = `
void moveHandsStateful(int hand_selector, int percent, int speed) {
  /* hand_selector: 0=LEFT, 1=RIGHT, 2=BOTH */

  percent = constrain(percent, 0, 100);
  float percentage = percent / 100.0;
  int target_L = 180 - (percentage * g_hand_range);
  int target_R = percentage * g_hand_range;

  long step_delay_us;
  if (speed == 11) {
    step_delay_us = 1; // Full speed
  } else {
    speed = constrain(speed, 1, 10);
    step_delay_us = map(speed, 1, 10, 20000, 100);
  }

  bool move_L = (hand_selector == 0 || hand_selector == 2);
  bool move_R = (hand_selector == 1 || hand_selector == 2);

  while (true) {
    bool done_L = true;
    bool done_R = true;

    if (move_L) {
      if (g_s_angle_L < target_L) g_s_angle_L++;
      else if (g_s_angle_L > target_L) g_s_angle_L--;
      handL.write(g_s_angle_L);
      if (g_s_angle_L != target_L) done_L = false;
    }

    if (move_R) {
      if (g_s_angle_R < target_R) g_s_angle_R++;
      else if (g_s_angle_R > target_R) g_s_angle_R--;
      handR.write(g_s_angle_R);
      if (g_s_angle_R != target_R) done_R = false;
    }

    if (done_L && done_R) {
      break;
    }

    delayMicroseconds(step_delay_us);
  }
  delay(500);
}
`;

const PICAR_FLASHING_LIGHT_FUNC = `
void flashingLight(){
  strip.setPixelColor(0, strip.Color(255, 0, 0));
  strip.setPixelColor(1, strip.Color(0, 0, 255));
  strip.show();
  delay(500);
  strip.setPixelColor(0, strip.Color(0, 0, 0));
  strip.setPixelColor(1, strip.Color(0, 0, 0));
  strip.show();
  delay(500);
}
`;

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

Blockly.Arduino.forBlock['picar_set_hand_range'] = function(block) {
  var range = Blockly.Arduino.valueToCode(block, 'RANGE', Blockly.Arduino.ORDER_ATOMIC) || '170';
  // Assign the value to the globally declared g_hand_range
  return 'g_hand_range = ' + range + ';\n';
};

Blockly.Arduino.forBlock['picar_resetPiCar'] = function(block) {
  Blockly.Arduino.definitions_['define_resetPiCar'] =
    'void resetPiCar() {\n' +
    '  watchdog_reboot(0, 0, 0);\n' +
    '}\n';
  return 'resetPiCar();\n';
};

Blockly.Arduino.forBlock['picar_drive'] = function(block) {
  ensurePiCarMotorDependencies();
  Blockly.Arduino.definitions_['define_drive'] = PICAR_DRIVE_FUNC;
  var value_power_l = Blockly.Arduino.valueToCode(block, 'POWER_L', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var value_power_r = Blockly.Arduino.valueToCode(block, 'POWER_R', Blockly.Arduino.ORDER_ATOMIC) || '0';
  return 'drive(' + value_power_l + ', ' + value_power_r + ');\n';
};

Blockly.Arduino.forBlock['picar_stop'] = function(block) {
  ensurePiCarMotorDependencies();
  Blockly.Arduino.definitions_['define_coast'] = PICAR_COAST_FUNC;
  Blockly.Arduino.definitions_['define_brake'] = PICAR_BRAKE_FUNC;
  var dropdown_mode = block.getFieldValue('MODE');
  var code = '';
  if (dropdown_mode === 'COAST') {
    code = 'coast();\n';
  } else if (dropdown_mode === 'BRAKE') {
    code = 'brake();\n';
  }
  return code;
};

Blockly.Arduino.forBlock['picar_checkDistance'] = function(block) {
  ensurePiCarUltrasonicDependencies();
  Blockly.Arduino.definitions_['define_checkDistance'] = PICAR_CHECK_DISTANCE_FUNC;
  return ['checkDistance()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['picar_checkColor'] = function(block) {
  ensurePiCarIRDependencies();
  Blockly.Arduino.definitions_['define_checkColor'] = PICAR_CHECK_COLOR_FUNC;
  return ['checkColor()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['picar_checkGray'] = function(block) {
  ensurePiCarIRDependencies();
  Blockly.Arduino.definitions_['define_checkGray'] = PICAR_CHECK_GRAY_FUNC;
  return ['checkGray()', Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.forBlock['picar_inPosition'] = function(block) {
  // The function is defined in picar_init, this block just calls it.
  return 'inPosition();\n';
};

Blockly.Arduino.forBlock['picar_move_hands'] = function(block) {
  ensurePiCarServoDependencies();
  Blockly.Arduino.definitions_['define_moveHandsStateful'] = PICAR_MOVE_HANDS_STATEFUL_FUNC;
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

Blockly.Arduino.forBlock['picar_flashingLight'] = function(block) {
  ensurePiCarLEDDependencies();
  Blockly.Arduino.definitions_['define_flashingLight'] = PICAR_FLASHING_LIGHT_FUNC;
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

  // Now, duration_ms_code represents the total duration for the note
  var code = 'playNote(' + pin + ', ' + frequency + ', (int)(' + duration_ms_code + '));\n';
  return code;
};

// =============================================================================
// HELPER FUNCTIONS FOR MELODY PARSING
// =============================================================================

// Converts pitch string (C, C#, Db, etc.) and octave to frequency (Hz)
const getFrequencyFromPitchOctave = (pitchStr, octave) => {
    const C0_FREQ = 16.35; // Frequency of C0
    let semitonesFromC = 0;
    let effectivePitch = pitchStr;

    // Handle flats and sharps consistently
    if (pitchStr.length > 1 && (pitchStr.endsWith('#') || pitchStr.endsWith('b'))) {
        effectivePitch = pitchStr.substring(0, pitchStr.length - 1);
        const accidental = pitchStr.endsWith('#') ? 1 : -1;
        switch (effectivePitch) {
            case 'C': semitonesFromC = 0 + accidental; break;
            case 'D': semitonesFromC = 2 + accidental; break;
            case 'E': semitonesFromC = 4 + accidental; break;
            case 'F': semitonesFromC = 5 + accidental; break;
            case 'G': semitonesFromC = 7 + accidental; break;
            case 'A': semitonesFromC = 9 + accidental; break;
            case 'B': semitonesFromC = 11 + accidental; break;
            default: return 0; // Invalid pitch
        }
    } else {
        switch (pitchStr) {
            case 'C': semitonesFromC = 0; break;
            case 'D': semitonesFromC = 2; break;
            case 'E': semitonesFromC = 4; break;
            case 'F': semitonesFromC = 5; break;
            case 'G': semitonesFromC = 7; break;
            case 'A': semitonesFromC = 9; break;
            case 'B': semitonesFromC = 11; break;
            default: return 0; // Invalid pitch
        }
    }
    
    // Adjust for negative semitones (e.g., Db is C#)
    if (semitonesFromC < 0) {semitonesFromC += 12;}
    if (semitonesFromC >= 12) {semitonesFromC -= 12;}

    return C0_FREQ * Math.pow(2, octave + (semitonesFromC / 12.0));
};

// Converts duration char (W, H, Q, E, S, T) to a ratio of a quarter note
const getNoteValueRatio = (durationChar) => {
    switch (durationChar) {
        case 'W': return 4.0;   // Whole note
        case 'H': return 2.0;   // Half note
        case 'Q': return 1.0;   // Quarter note
        case 'E': return 0.5;   // Eighth note
        case 'S': return 0.25;  // Sixteenth note
        case 'T': return 0.125; // Thirty-second note
        default: return 1.0;    // Default to quarter note if unknown
    }
};

// =============================================================================
// PICAR_PLAY_MELODY_STRING GENERATOR
// =============================================================================

Blockly.Arduino.forBlock['picar_play_melody_string'] = function(block) {
  ensurePiCarBuzzerDependencies();
  ensureMusicDependencies(); // Ensure g_tempo_bpm, g_quarter_note_ms, and playNote() are defined

  let code = '';
  code += `// Melody String Syntax:\n`;
  code += `// Format: [Note/Rest][Octave][Duration][. (Dotted)][_T (Triplet)]\n`;
  code += `// Each note/rest is separated by a comma (e.g., "C4Q,D4Q,E4H").\n`;
  code += `//\n`;
  code += `// Pitches: C, D, E, F, G, A, B. Can include sharps (#) or flats (b) e.g., C#, Eb.\n`;
  code += `// Octaves: Numbers 0-8. (e.g., C4 is middle C)\n`;
  code += `// Durations: W (Whole), H (Half), Q (Quarter), E (Eighth), S (Sixteenth), T (Thirty-second).\n`;
  code += `// Dotted: Add '.' after duration for dotted notes (e.g., Q. for dotted quarter).\n`;
  code += `// Triplet: Add '_T' after duration (and optional dot) for triplets. Each note in a triplet group should have _T (e.g., E_T, E_T, F_T).\n`;
  code += `// Rests: Start with 'R' followed by duration (e.g., RQ for quarter rest). Can be dotted or triplet (e.g., RE._T).\n`;
  code += `// Examples: "C4Q, D4Q, E4H", "C#5E., RQH, D3S_T, E3S_T, F3S_T"\n\n`;

  const melodyString = block.getFieldValue('MELODY_STRING');
  const pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || 'pinBuzzer'; // Get PIN from input, default to 'pinBuzzer'

  const notes = melodyString.split(',').map(s => s.trim()).filter(s => s.length > 0);

  // Sanitize melodyString for multi-line comments in C++
  const sanitizedMelodyString = melodyString.replace(/\n/g, '\n// ');

  code += `// Generated melody from: ${sanitizedMelodyString}\n`; // Use sanitized string
  code += `{\n`;
  code += `  float current_quarter_note_ms = g_quarter_note_ms; // Use float for precision\n`;

  notes.forEach(noteStr => {
    let match;
    // Regex to capture: (Optional: Pitch + Accidental) (Optional: Octave) (Duration) (Optional: Dotted) (Optional: Triplet)
    // Examples: C4Q, C#5E., RQH, D3S_T
    const noteRegex = /^([A-G][#b]?)?([0-8])?([WHQEST])(\.)?(_T)?$/i;
    
    // Handle Rest explicitly first
    if (noteStr.toUpperCase().startsWith('R')) {
        const restPart = noteStr.substring(1); // Get duration part after 'R'
        // For rest, the regex for duration/dotted/triplet is just match[1], match[2], match[3]
        match = restPart.match(/^([WHQEST])(\.)?(_T)?$/i); 
        if (match) {
            let durationChar = match[1].toUpperCase();
            let isDotted = !!match[2]; // Index 2 for '.'
            let isTriplet = !!match[3]; // Index 3 for '_T'
            
            let durationRatio = getNoteValueRatio(durationChar);
            if (isDotted) {durationRatio *= 1.5;}
            if (isTriplet) {durationRatio *= (2.0 / 3.0);}
            
            code += `  playNote(${pin}, 0, (int)(current_quarter_note_ms * ${durationRatio})); // Rest\n`;
        } else {
            code += `  // WARNING: Invalid rest format: ${noteStr}\n`;
            code += `  delay(250); // Default short rest\n`;
        }
        return; // Move to next note
    }

    // Handle actual notes
    match = noteStr.match(noteRegex);

    if (match) {
        let pitch = match[1] ? match[1].toUpperCase() : 'C'; // Default pitch
        let octave = match[2] ? parseInt(match[2], 10) : 4; // Default octave
        let durationChar = match[3].toUpperCase();
        let isDotted = !!match[4]; // Correct index for '.'
        let isTriplet = !!match[5]; // Correct index for '_T'

        let frequency = getFrequencyFromPitchOctave(pitch, octave);
        let durationRatio = getNoteValueRatio(durationChar);
        if (isDotted) {durationRatio *= 1.5;}
        if (isTriplet) {durationRatio *= (2.0 / 3.0);}
        
        // Ensure frequency is not 0 for notes
        if (frequency === 0) { // Fallback for unhandled pitch cases
            code += `  // WARNING: Invalid pitch or octave for note: ${noteStr}\n`;
            frequency = 440; // Default to A4
        }
        
        code += `  playNote(${pin}, (int)${frequency.toFixed(0)}, (int)(current_quarter_note_ms * ${durationRatio}));\n`;
    } else {
        code += `  // WARNING: Invalid note format: ${noteStr}\n`;
        code += `  playNote(${pin}, 440, (int)(current_quarter_note_ms)); // Play a default note for error\n`;
    }
  });
  code += `}\n`; // End of melody block
  return code;
};



Blockly.Arduino.forBlock['picar_note_to_frequency'] = function(block) {
  var noteName = block.getFieldValue('NOTE_NAME');
  var octave = parseInt(block.getFieldValue('OCTAVE'), 10);

  if (noteName === "REST_INDICATOR") {
    return [0, Blockly.Arduino.ORDER_ATOMIC]; // Return 0 for rest
  }

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

Blockly.Arduino.forBlock['picar_tone'] = function(block) {
  ensurePiCarBuzzerDependencies();
  ensureMusicDependencies();
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || 'pinBuzzer';
  var frequency = Blockly.Arduino.valueToCode(block, 'FREQUENCY', Blockly.Arduino.ORDER_ATOMIC) || '440';
  var duration = Blockly.Arduino.valueToCode(block, 'DURATION', Blockly.Arduino.ORDER_ATOMIC) || '200';
  var code = 'tone(' + pin + ', ' + frequency + ', ' + duration + ');\n';
  return code;
};

Blockly.Arduino.forBlock['picar_no_tone'] = function(block) {
  ensurePiCarBuzzerDependencies();
  ensureMusicDependencies();
  var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || 'pinBuzzer';
  var code = 'noTone(' + pin + ');\n';
  return code;
};
}
