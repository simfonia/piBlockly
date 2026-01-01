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

}
