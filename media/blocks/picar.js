export function registerBlocks(Blockly) {
  // piCar Blocks
  Blockly.Blocks['picar_init'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_INIT"],
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_SETUP_HUE"],
        "tooltip": Blockly.Msg["PICAR_INIT_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_resetPiCar'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_RESET"],
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_SETUP_HUE"],
        "tooltip": Blockly.Msg["PICAR_RESET_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_drive'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_DRIVE_LEFT"] + " %1 " + Blockly.Msg["PICAR_DRIVE_RIGHT"] + " %2",
        "args0": [
          {
            "type": "input_value",
            "name": "POWER_L",
            "check": "Number"
          },
          {
            "type": "input_value",
            "name": "POWER_R",
            "check": "Number"
          }
        ],
        "inputsInline": true,
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_HUE"],
        "tooltip": Blockly.Msg["PICAR_DRIVE_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_stop'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_STOP"] + " %1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "MODE",
            "options": [
              [Blockly.Msg["PICAR_STOP_BRAKE"], "BRAKE"],
              [Blockly.Msg["PICAR_STOP_COAST"], "COAST"]
            ]
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_HUE"],
        "tooltip": Blockly.Msg["PICAR_STOP_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_checkDistance'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_CHECK_DISTANCE"],
        "output": "Number",
        "colour": Blockly.Msg["PICAR_SENSOR_HUE"],
        "tooltip": Blockly.Msg["PICAR_CHECK_DISTANCE_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_checkColor'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_CHECK_COLOR"],
        "output": "Number",
        "colour": Blockly.Msg["PICAR_SENSOR_HUE"],
        "tooltip": Blockly.Msg["PICAR_CHECK_COLOR_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_checkGray'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_CHECK_GRAY"],
        "output": "Number",
        "colour": Blockly.Msg["PICAR_SENSOR_HUE"],
        "tooltip": Blockly.Msg["PICAR_CHECK_GRAY_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_inPosition'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_IN_POSITION"],
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_SERVO_HUE"],
        "tooltip": Blockly.Msg["PICAR_IN_POSITION_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_set_hand_range'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_SET_HAND_RANGE"] + " %1",
        "args0": [
          {
            "type": "input_value",
            "name": "RANGE",
            "check": "Number"
          }
        ],
        "inputsInline": true,
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_SERVO_HUE"],
        "tooltip": Blockly.Msg["PICAR_SET_HAND_RANGE_TOOLTIP"],
        "helpUrl": ""
      });
    },
    onchange: function (event) {
      var rangeBlock = this.getInputTargetBlock('RANGE');
      if (rangeBlock && rangeBlock.type === 'math_number') {
        var numberValue = parseFloat(rangeBlock.getFieldValue('NUM'));
        if (!isNaN(numberValue)) {
          if (numberValue < 0) {
            rangeBlock.setFieldValue('0', 'NUM');
          } else if (numberValue > 180) {
            rangeBlock.setFieldValue('180', 'NUM');
          }
        }
      }
    }
  };

  Blockly.Blocks['picar_move_hands'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.PICAR_MOVE_HANDS,
        "args0": [
          {
            "type": "field_dropdown",
            "name": "HAND",
            "options": [
              [Blockly.Msg.PICAR_HAND_BOTH, "BOTH"],
              [Blockly.Msg.PICAR_HAND_LEFT, "LEFT"],
              [Blockly.Msg.PICAR_HAND_RIGHT, "RIGHT"]
            ]
          },
          {
            "type": "input_value",
            "name": "PERCENT",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 50 }
            }
          },
          {
            "type": "input_value",
            "name": "SPEED",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 8 }
            }
          }
        ],
        "inputsInline": true,
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg.PICAR_SERVO_HUE,
        "tooltip": Blockly.Msg.PICAR_MOVE_HANDS_TOOLTIP,
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_set_led_color'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_SET_LED_COLOR"] + " %1 " + Blockly.Msg["PICAR_COLOR"] + " %2",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "LED_INDEX",
            "options": [
              [Blockly.Msg["PICAR_LED_LEFT"], "0"],
              [Blockly.Msg["PICAR_LED_RIGHT"], "1"],
              [Blockly.Msg["PICAR_LED_ALL"], "ALL"]
            ]
          },
          {
            "type": "field_colour",
            "name": "COLOR",
            "colour": "#ff0000"
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_MEDIA_HUE"],
        "tooltip": Blockly.Msg["PICAR_SET_LED_COLOR_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_flashingLight'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_FLASHING_LIGHT"],
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_MEDIA_HUE"],
        "tooltip": Blockly.Msg["PICAR_FLASHING_LIGHT_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_set_tempo'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_SET_TEMPO"] + " %1 " + Blockly.Msg["PICAR_BPM"],
        "args0": [
          {
            "type": "input_value",
            "name": "BPM",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 120 }
            }
          }
        ],
        "inputsInline": true,
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_MEDIA_HUE"],
        "tooltip": Blockly.Msg["PICAR_SET_TEMPO_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_play_note'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_PLAY_NOTE"] + " " + Blockly.Msg["PICAR_PIN"] + " %1 " + Blockly.Msg["PICAR_FREQUENCY"] + " %2",
        "args0": [
          {
            "type": "input_value",
            "name": "PIN",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 22 } // Default to pinBuzzer
            }
          },
          {
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 440 } // Default to A4
            }
          }
        ],
        "message1": Blockly.Msg["PICAR_NOTE_DURATION"] + " %1 " + Blockly.Msg["PICAR_DOTTED"] + " %2 " + Blockly.Msg["PICAR_TRIPLET"] + " %3",
        "args1": [
          {
            "type": "field_dropdown",
            "name": "NOTE_VALUE",
            "options": [
              [Blockly.Msg["PICAR_WHOLE_NOTE"], "4.0"],   // Whole note is 4 quarter notes
              [Blockly.Msg["PICAR_HALF_NOTE"], "2.0"],   // Half note is 2 quarter notes
              [Blockly.Msg["PICAR_QUARTER_NOTE"], "1.0"],  // Quarter note is 1 quarter note
              [Blockly.Msg["PICAR_EIGHTH_NOTE"], "0.5"],   // Eighth note is 0.5 quarter notes
              [Blockly.Msg["PICAR_SIXTEENTH_NOTE"], "0.25"], // Sixteenth note is 0.25 quarter notes
              [Blockly.Msg["PICAR_THIRTYSECOND_NOTE"], "0.125"] // Thirty-second note is 0.125 quarter notes
            ]
          },
          {
            "type": "field_checkbox",
            "name": "DOTTED",
            "checked": false
          },
          {
            "type": "field_checkbox",
            "name": "TRIPLET",
            "checked": false
          }
        ],
        "inputsInline": true,
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg["PICAR_MEDIA_HUE"],
        "tooltip": Blockly.Msg["PICAR_PLAY_NOTE_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_play_melody_string'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.PICAR_PLAY_MELODY_STRING_MESSAGE_PIN + " %1 " + Blockly.Msg.PICAR_PLAY_MELODY_STRING_MESSAGE_MELODY + " %2",
        "args0": [
          {
            "type": "input_value",
            "name": "PIN",
            "check": "Number",
            "shadow": {
              "type": "arduino_pin_shadow",
              "fields": { "PIN": "22" } // Default to pin 22
            }
          },
          {
            "type": "field_multilineinput", // Using field_multilineinput as confirmed
            "name": "MELODY_STRING",
            "text": "C4Q,D4Q,E4H" // Example melody
          }
        ],
        "inputsInline": false, // False for better readability of multiline text
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg.PICAR_MEDIA_HUE,
        "tooltip": Blockly.Msg.PICAR_PLAY_MELODY_STRING_TOOLTIP,
        "helpUrl": ""
      });
    }
  };


  Blockly.Blocks['picar_note_to_frequency'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg["PICAR_NOTE_TO_FREQUENCY"] + " %1 %2",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "NOTE_NAME",
            "options": [
              [Blockly.Msg["PICAR_NOTE_NAME_REST"], "REST_INDICATOR"],
              ["C", "C"],
              ["C#", "CS"],
              ["D", "D"],
              ["D#", "DS"],
              ["E", "E"],
              ["F", "F"],
              ["F#", "FS"],
              ["G", "G"],
              ["G#", "GS"],
              ["A", "A"],
              ["A#", "AS"],
              ["B", "B"]
            ]
          },
          {
            "type": "field_dropdown",
            "name": "OCTAVE",
            "options": [
              ["0", "0"],
              ["1", "1"],
              ["2", "2"],
              ["3", "3"],
              ["4", "4"],
              ["5", "5"],
              ["6", "6"],
              ["7", "7"],
              ["8", "8"]
            ]
          }
        ],
        "output": "Number",
        "inputsInline": true,
        "colour": Blockly.Msg["PICAR_MEDIA_HUE"],
        "tooltip": Blockly.Msg["PICAR_NOTE_TO_FREQUENCY_TOOLTIP"],
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_tone'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.PICAR_TONE,
        "args0": [
          {
            "type": "input_value",
            "name": "PIN",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 22 }
            }
          },
          {
            "type": "input_value",
            "name": "FREQUENCY",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 440 }
            }
          },
          {
            "type": "input_value",
            "name": "DURATION",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 200 }
            }
          }
        ],
        "inputsInline": true,
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg.PICAR_MEDIA_HUE,
        "tooltip": Blockly.Msg.PICAR_TONE_TOOLTIP,
        "helpUrl": ""
      });
    }
  };

  Blockly.Blocks['picar_no_tone'] = {
    init: function () {
      this.jsonInit({
        "message0": Blockly.Msg.PICAR_NO_TONE,
        "args0": [
          {
            "type": "input_value",
            "name": "PIN",
            "check": "Number",
            "shadow": {
              "type": "math_number",
              "fields": { "NUM": 22 }
            }
          }
        ],
        "inputsInline": true,
        "previousStatement": true,
        "nextStatement": true,
        "colour": Blockly.Msg.PICAR_MEDIA_HUE,
        "tooltip": Blockly.Msg.PICAR_NO_TONE_TOOLTIP,
        "helpUrl": ""
      });
    }
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
    if (semitonesFromC < 0) { semitonesFromC += 12; }
    if (semitonesFromC >= 12) { semitonesFromC -= 12; }

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

  Blockly.Arduino.forBlock['picar_play_melody_string'] = function (block) {
    ensurePiCarBuzzerDependencies();
    ensureMusicDependencies(); // Ensure g_tempo_bpm, g_quarter_note_ms, and playNote() are defined

    const melodyString = block.getFieldValue('MELODY_STRING');
    const pin = 'pinBuzzer'; // Assuming a default buzzer pin from ensurePiCarBuzzerDependencies

    let code = '';
    const notes = melodyString.split(',').map(s => s.trim()).filter(s => s.length > 0);

    code += `// Generated melody from: ${melodyString}\n`;
    code += `{\n`;
    code += `  float current_quarter_note_ms = g_quarter_note_ms; // Use float for precision\n`;

    notes.forEach(noteStr => {
      let match;
      // Regex to capture: (Optional: Pitch + Accidental) (Optional: Octave) (Duration) (Optional: Dotted) (Optional: Triplet)
      // Examples: C4Q, C#5E., RQH, D3S_T
      const noteRegex = /^([A-G][#b]?)?([0-8])?([WHQEST])(\\.?|_T)?$/i;

      // Handle Rest explicitly first
      if (noteStr.toUpperCase().startsWith('R')) {
        const restPart = noteStr.substring(1); // Get duration part after 'R'
        match = restPart.match(/^([WHQEST])(\\.?|_T)?$/i);
        if (match) {
          let durationChar = match[1].toUpperCase();
          let isDotted = !!match[2];
          let isTriplet = !!match[3];

          let durationRatio = getNoteValueRatio(durationChar);
          if (isDotted) { durationRatio *= 1.5; }
          if (isTriplet) { durationRatio *= (2.0 / 3.0); }

          code += `  playNote(${pin}, 0, (int)(current_quarter_note_ms * ${durationRatio}), (int)(current_quarter_note_ms * ${durationRatio} * 0.1)); // Rest\n`;
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
        let isDotted = !!match[4];
        let isTriplet = !!match[5];

        let frequency = getFrequencyFromPitchOctave(pitch, octave);
        let durationRatio = getNoteValueRatio(durationChar);
        if (isDotted) { durationRatio *= 1.5; }
        if (isTriplet) { durationRatio *= (2.0 / 3.0); }

        // Ensure frequency is not 0 for notes
        if (frequency === 0) { // Fallback for unhandled pitch cases
          code += `  // WARNING: Invalid pitch or octave for note: ${noteStr}\n`;
          frequency = 440; // Default to A4
        }

        code += `  playNote(${pin}, (int)${frequency.toFixed(0)}, (int)(current_quarter_note_ms * ${durationRatio}), (int)(current_quarter_note_ms * ${durationRatio} * 0.1));\n`;
      } else {
        code += `  // WARNING: Invalid note format: ${noteStr}\n`;
        code += `  playNote(${pin}, 440, (int)(current_quarter_note_ms), (int)(current_quarter_note_ms * 0.1)); // Play a default note for error\n`;
      }
    });
    code += `}\n`; // End of melody block
    return code;
  };

}
