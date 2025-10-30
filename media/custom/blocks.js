(function(Blockly) {

// 積木的外觀

// Arduino Blocks
Blockly.Blocks['arduino_pin_mode'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("pinMode(");
    this.appendValueInput("PIN")
        .setCheck(["Number", "String"]);
    this.appendDummyInput()
        .appendField(",");
    this.appendValueInput("MODE")
        .setCheck("String");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.ARDUINO_CONTROL_HUE);
    this.setTooltip(Blockly.Msg.ARDUINO_PIN_MODE_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['arduino_pin_mode_mode_shadow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_MODE_LABEL)
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.ARDUINO_PIN_MODE_OUTPUT, "OUTPUT"],
          [Blockly.Msg.ARDUINO_PIN_MODE_INPUT, "INPUT"],
          [Blockly.Msg.ARDUINO_PIN_MODE_INPUT_PULLUP, "INPUT_PULLUP"]
        ]), "MODE");
    this.setOutput(true, "String");
    this.setColour(Blockly.Msg.ARDUINO_CONTROL_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['arduino_pin_shadow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_PIN_LABEL)
        .appendField(new Blockly.FieldTextInput(""), "PIN");
    this.setOutput(true, ["Number", "String"]);
    this.setColour(Blockly.Msg.ARDUINO_CONTROL_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['arduino_digital_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_DIGITAL_READ + "(");
    this.appendValueInput("PIN")
        .setCheck(["Number", "String"]);
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg.ARDUINO_DIGITAL_IO_HUE);
    this.setTooltip(Blockly.Msg.ARDUINO_DIGITAL_READ_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['arduino_digital_write'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_DIGITAL_WRITE,
      "args0": [
        {
          "type": "input_value",
          "name": "PIN",
          "check": ["Number", "String"]
        },
        {
          "type": "field_dropdown",
          "name": "VALUE",
          "options": [
            [Blockly.Msg.ARDUINO_HIGH, "HIGH"],
            [Blockly.Msg.ARDUINO_LOW, "LOW"]
          ]
        }
      ],
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "colour": Blockly.Msg.ARDUINO_DIGITAL_IO_HUE,
      "tooltip": Blockly.Msg.ARDUINO_DIGITAL_WRITE_TOOLTIP,
      "helpUrl": ""
    });
  }
};


Blockly.Blocks['arduino_analog_read'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_ANALOG_READ,
      "args0": [
        {
          "type": "input_value",
          "name": "PIN",
          "check": ["Number", "String"]
        }
      ],
      "inputsInline": true,
      "output": "Number", // analogRead returns an int (0-1023)
      "colour": Blockly.Msg.ARDUINO_ANALOG_IO_HUE,
      "tooltip": Blockly.Msg.ARDUINO_ANALOG_READ_TOOLTIP,
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['arduino_analog_write'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_ANALOG_WRITE,
      "args0": [
        {
          "type": "input_value",
          "name": "PIN",
          "check": ["Number", "String"]
        },
        {
          "type": "input_value",
          "name": "VALUE",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "colour": Blockly.Msg.ARDUINO_ANALOG_IO_HUE,
      "tooltip": Blockly.Msg.ARDUINO_ANALOG_WRITE_TOOLTIP,
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['arduino_constrain'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["Number", "String"])
        .appendField(Blockly.Msg.ARDUINO_CONSTRAIN_VALUE);
    this.appendValueInput("LOW")
        .setCheck("Number")
        .appendField(Blockly.Msg.ARDUINO_CONSTRAIN_LOW);
    this.appendValueInput("HIGH")
        .setCheck("Number")
        .appendField(Blockly.Msg.ARDUINO_CONSTRAIN_HIGH);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg.ARDUINO_MATH_HUE);
    this.setTooltip(Blockly.Msg.ARDUINO_CONSTRAIN_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['arduino_map'] = {
  init: function() {
    this.appendValueInput("VALUE")
        .setCheck(["Number", "String"])
        .appendField(Blockly.Msg.ARDUINO_MAP_VALUE);
    this.appendValueInput("FROMLOW")
        .setCheck("Number")
        .appendField(Blockly.Msg.ARDUINO_MAP_FROMLOW);
    this.appendValueInput("FROMHIGH")
        .setCheck("Number")
        .appendField(Blockly.Msg.ARDUINO_MAP_FROMHIGH);
    this.appendValueInput("TOLOW")
        .setCheck("Number")
        .appendField(Blockly.Msg.ARDUINO_MAP_TOLOW);
    this.appendValueInput("TOHIGH")
        .setCheck("Number")
        .appendField(Blockly.Msg.ARDUINO_MAP_TOHIGH);
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg.ARDUINO_MATH_HUE);
    this.setTooltip(Blockly.Msg.ARDUINO_MAP_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['arduino_delay'] = {
  init: function() {
    this.jsonInit({
      "message0": "delay(%1)",
      "args0": [
        {
          "type": "input_value",
          "name": "DELAY_TIME",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "colour": "%{BKY_ARDUINO_TIME_HUE}",
      "tooltip": "%{BKY_ARDUINO_DELAY_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_delay_microseconds'] = {
  init: function() {
    this.jsonInit({
      "message0": "delayMicroseconds(%1)",
      "args0": [
        {
          "type": "input_value",
          "name": "DELAY_TIME",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "colour": "%{BKY_ARDUINO_TIME_HUE}",
      "tooltip": "%{BKY_ARDUINO_DELAY_MICROSECONDS_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_millis'] = {
  init: function() {
    this.jsonInit({
      "message0": "millis()",
      "output": "Number",
      "colour": "%{BKY_ARDUINO_TIME_HUE}",
      "tooltip": "%{BKY_ARDUINO_MILLIS_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_micros'] = {
  init: function() {
    this.jsonInit({
      "message0": "micros()",
      "output": "Number",
      "colour": "%{BKY_ARDUINO_TIME_HUE}",
      "tooltip": "%{BKY_ARDUINO_MICROS_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_serial_begin'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_SERIAL_BEGIN}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SPEED",
          "options": [
            ["9600", "9600"],
            ["300", "300"],
            ["600", "600"],
            ["1200", "1200"],
            ["2400", "2400"],
            ["4800", "4800"],
            ["14400", "14400"],
            ["19200", "19200"],
            ["28800", "28800"],
            ["38400", "38400"],
            ["57600", "57600"],
            ["115200", "115200"]
          ]
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "colour": "%{BKY_ARDUINO_SERIAL_HUE}",
      "tooltip": "%{BKY_ARDUINO_SERIAL_BEGIN_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_serial_print'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_SERIAL_PRINT}",
      "args0": [
        {
          "type": "input_value",
          "name": "CONTENT"
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "colour": "%{BKY_ARDUINO_SERIAL_HUE}",
      "tooltip": "%{BKY_ARDUINO_SERIAL_PRINT_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_serial_println'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_SERIAL_PRINTLN}",
      "args0": [
        {
          "type": "input_value",
          "name": "CONTENT"
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "colour": "%{BKY_ARDUINO_SERIAL_HUE}",
      "tooltip": "%{BKY_ARDUINO_SERIAL_PRINTLN_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_serial_available'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_SERIAL_AVAILABLE}",
      "output": "Number",
      "colour": "%{BKY_ARDUINO_SERIAL_HUE}",
      "tooltip": "%{BKY_ARDUINO_SERIAL_AVAILABLE_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_serial_read'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_SERIAL_READ}",
      "output": "Number",
      "colour": "%{BKY_ARDUINO_SERIAL_HUE}",
      "tooltip": "%{BKY_ARDUINO_SERIAL_READ_TOOLTIP}"
    });
  }
};


// piCar Blocks
Blockly.Blocks['picar_init'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["PICAR_INIT"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PICAR_SETUP_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_INIT_TOOLTIP"]);
    this.setHelpUrl("");
  }
};




Blockly.Blocks['picar_resetPiCar'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["PICAR_RESET"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PICAR_SETUP_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_RESET_TOOLTIP"]);
    this.setHelpUrl("");
  }
};


Blockly.Blocks['picar_drive'] = {
  init: function() {
    this.appendValueInput("POWER_L")
        .setCheck("Number")
        .appendField(Blockly.Msg["PICAR_DRIVE_LEFT"]);
    this.appendValueInput("POWER_R")
        .setCheck("Number")
        .appendField(Blockly.Msg["PICAR_DRIVE_RIGHT"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PICAR_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_DRIVE_TOOLTIP"]);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['picar_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["PICAR_STOP"])
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg["PICAR_STOP_BRAKE"], "BRAKE"],
          [Blockly.Msg["PICAR_STOP_COAST"], "COAST"]
        ]), "MODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PICAR_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_STOP_TOOLTIP"]);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['picar_checkDistance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["PICAR_CHECK_DISTANCE"]);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg["PICAR_SENSOR_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_CHECK_DISTANCE_TOOLTIP"]);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['picar_checkColor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["PICAR_CHECK_COLOR"]);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg["PICAR_SENSOR_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_CHECK_COLOR_TOOLTIP"]);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['picar_checkGray'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["PICAR_CHECK_GRAY"]);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg["PICAR_SENSOR_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_CHECK_GRAY_TOOLTIP"]);
    this.setHelpUrl("");
  }
};


Blockly.Blocks['picar_inPosition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["PICAR_IN_POSITION"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PICAR_SERVO_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_IN_POSITION_TOOLTIP"]);
    this.setHelpUrl("");
  }
};


// Blockly.Blocks['picar_set_left_hand_angle'] = {
//   init: function() {
//     this.appendValueInput("ANGLE")
//         .setCheck("Number")
//         .appendField(Blockly.Msg["PICAR_SET_LEFT_HAND_ANGLE"]);
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(Blockly.Msg["PICAR_SERVO_HUE"]);
//     this.setTooltip(Blockly.Msg["PICAR_SET_LEFT_HAND_ANGLE_TOOLTIP"]);
//     this.setHelpUrl("");
//   }
// };

// Blockly.Blocks['picar_set_right_hand_angle'] = {
//   init: function() {
//     this.appendValueInput("ANGLE")
//         .setCheck("Number")
//         .appendField(Blockly.Msg["PICAR_SET_RIGHT_HAND_ANGLE"]);
//     this.setInputsInline(true);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(Blockly.Msg["PICAR_SERVO_HUE"]);
//     this.setTooltip(Blockly.Msg["PICAR_SET_RIGHT_HAND_ANGLE_TOOLTIP"]);
//     this.setHelpUrl("");
//   }
// };


// Blockly.Blocks['picar_closeHands'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField(Blockly.Msg["PICAR_CLOSE_HANDS"]);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(Blockly.Msg["PICAR_SERVO_HUE"]);
//     this.setTooltip(Blockly.Msg["PICAR_CLOSE_HANDS_TOOLTIP"]);
//     this.setHelpUrl("");
//   }
// };

// Blockly.Blocks['picar_openHands'] = {
//   init: function() {
//     this.appendDummyInput()
//         .appendField(Blockly.Msg["PICAR_OPEN_HANDS"]);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(Blockly.Msg["PICAR_SERVO_HUE"]);
//     this.setTooltip(Blockly.Msg["PICAR_OPEN_HANDS_TOOLTIP"]);
//     this.setHelpUrl("");
//   }
// };


Blockly.Blocks['picar_set_hand_range'] = {
  init: function() {
    this.appendValueInput("RANGE")
        .setCheck("Number")
        .appendField(Blockly.Msg["PICAR_SET_HAND_RANGE"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PICAR_SERVO_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_SET_HAND_RANGE_TOOLTIP"]);
    this.setHelpUrl("");
  },
  onchange: function(event) {
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
  init: function() {
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
  init: function() {
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
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg["PICAR_FLASHING_LIGHT"]);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PICAR_MEDIA_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_FLASHING_LIGHT_TOOLTIP"]);
    this.setHelpUrl("");
  }
};


Blockly.Blocks['picar_easterEgg'] = {
  init: function() {
    this.appendValueInput("TEMPO")
        .setCheck("Number")
        .appendField(Blockly.Msg["PICAR_EASTER_EGG"]);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg["PICAR_MEDIA_HUE"]);
    this.setTooltip(Blockly.Msg["PICAR_EASTER_EGG_TOOLTIP"]);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['picar_tone'] = {
  init: function() {
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
  init: function() {
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


// Coding Blocks
Blockly.Blocks['coding_raw_statement'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg["CODING_RAW_STATEMENT"] + " %1",
      "args0": [
        {
          "type": "field_multilineinput",
          "name": "CODE",
          "text": ""
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "colour": Blockly.Msg["CODING_HUE"],
      "tooltip": Blockly.Msg["CODING_RAW_STATEMENT_TOOLTIP"],
      "helpUrl": "",
      "inputsInline": false
    });
  }
};


Blockly.Blocks['coding_raw_input'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg["CODING_RAW_INPUT"] + " %1",
      "args0": [
        {
          "type": "field_multilineinput",
          "name": "CODE",
          "text": ""
        }
      ],
      "output": null,
      "colour": Blockly.Msg["CODING_HUE"],
      "tooltip": Blockly.Msg["CODING_RAW_INPUT_TOOLTIP"],
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['coding_raw_definition'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg["CODING_RAW_DEFINITION"] + " %1",
      "args0": [
        {
          "type": "field_multilineinput",
          "name": "CODE",
          "text": ""
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "colour": Blockly.Msg["CODING_HUE"],
      "tooltip": Blockly.Msg["CODING_RAW_DEFINITION_TOOLTIP"],
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['coding_raw_wrapper'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg["CODING_RAW_WRAPPER_TOP"] + " %1",
      "args0": [
        {
          "type": "field_multilineinput",
          "name": "CODE_TOP",
          "text": ""
        }
      ],
      "message1": "%1",
      "args1": [
        {
          "type": "input_statement",
          "name": "DO"
        }
      ],
      "message2": Blockly.Msg["CODING_RAW_WRAPPER_BOTTOM"] + " %1",
      "args2": [
        {
          "type": "field_multilineinput",
          "name": "CODE_BOTTOM",
          "text": ""
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "colour": Blockly.Msg["CODING_HUE"],
      "tooltip": Blockly.Msg["CODING_RAW_WRAPPER_TOOLTIP"],
      "helpUrl": ""
    });
  }
};

// Add modern definitions for setup and loop blocks
Blockly.Blocks['initializes_setup'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_INITIALIZES_SETUP_APPENDTEXT}",
      "message1": "%1",
      "args1": [
        {
          "type": "input_statement",
          "name": "CONTENT"
        }
      ],
      "nextStatement": true,
      "colour": "%{BKY_ARDUINO_STRUCTURE_HUE}",
      "tooltip": "%{BKY_INITIALIZES_SETUP_TOOLTIP}",
      "helpUrl": "%{BKY_INITIALIZES_SETUP_HELPURL}"
    });
  }
};

Blockly.Blocks['initializes_loop'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_INITIALIZES_LOOP_APPENDTEXT}",
      "message1": "%1",
      "args1": [
        {
          "type": "input_statement",
          "name": "CONTENT"
        }
      ],
      "previousStatement": true,
      "colour": "%{BKY_ARDUINO_STRUCTURE_HUE}",
      "tooltip": "%{BKY_INITIALIZES_LOOP_TOOLTIP}",
      "helpUrl": "%{BKY_INITIALIZES_LOOP_HELPURL}"
    });
  }
};


Blockly.Blocks['variables_declare_global'] = {
  init: function() {
    this.jsonInit({
      "message0": "global %1 %2 = %3",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TYPE",
          "options": [
            ["int", "int"],
            ["float", "float"],
            ["String", "String"],
            ["bool", "bool"]
          ]
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "colour": "%{BKY_VARIABLES_HUE}",
      "tooltip": "Declare a global variable.",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['variables_declare_local'] = {
  init: function() {
    this.jsonInit({
      "message0": "local %1 %2 = %3",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TYPE",
          "options": [
            ["int", "int"],
            ["float", "float"],
            ["String", "String"],
            ["bool", "bool"]
          ]
        },
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "colour": "%{BKY_VARIABLES_HUE}",
      "tooltip": "Declare a local variable.",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['variables_get'] = {
  /**
   * Block for variable getter.
   * @this {Blockly.Block}
   */
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
        }
      ],
      "output": null,
      "colour": "%{BKY_VARIABLES_HUE}",
      "tooltip": "%{BKY_VARIABLES_GET_TOOLTIP}",
      "helpUrl": "%{BKY_VARIABLES_GET_HELPURL}"
    });
    this.contextMenuMsg_ = Blockly.Msg['VARIABLES_GET_CREATE_SET'];
  },
  contextMenuType_: 'variables_set'
};

Blockly.Blocks['variables_set'] = {
  /**
   * Block for setting the value of a variable.
   * @this {Blockly.Block}
   */
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_VARIABLES_SET}",
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "%{BKY_VARIABLES_DEFAULT_NAME}"
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": "%{BKY_VARIABLES_HUE}",
      "tooltip": "%{BKY_VARIABLES_SET_TOOLTIP}",
      "helpUrl": "%{BKY_VARIABLES_SET_HELPURL}"
    });
    this.contextMenuMsg_ = Blockly.Msg['VARIABLES_SET_CREATE_GET'];
  },
  contextMenuType_: 'variables_get'
};

const CUSTOM_PROCEDURES_CALL_MANUAL_COMMON = {
  /**
   * Create XML to represent the (un)typed arguments.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('name', this.getFieldValue('NAME'));
    for (let i = 0; i < this.arguments_.length; i++) {
      const parameter = Blockly.utils.xml.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      parameter.setAttribute('type', this.argTypes_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (un)typed arguments.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.argTypes_ = [];
    for (const childNode of xmlElement.childNodes) {
      if (childNode.nodeName.toLowerCase() === 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
        this.argTypes_.push(childNode.getAttribute('type'));
      }
    }
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('custom_procedures_mutatorcontainer');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.arguments_.length; i++) {
      const argBlock = workspace.newBlock('custom_procedures_mutatorarg');
      argBlock.initSvg();
      argBlock.setFieldValue(this.arguments_[i], 'NAME');
      argBlock.setFieldValue(this.argTypes_[i], 'TYPE');
      connection.connect(argBlock.previousConnection);
      connection = argBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
    // Store connections before arguments are changed
    const connections = {};
    for (let i = 0; i < this.arguments_.length; i++) {
      const argName = this.arguments_[i];
      const input = this.getInput('ARG' + i);
      if (input && input.connection && input.connection.targetConnection) {
        connections[argName] = input.connection.targetConnection;
      }
    }
    // Get new arguments
    this.arguments_ = [];
    this.argTypes_ = [];
    let block = containerBlock.getInputTargetBlock('STACK');
    while (block) {
      this.arguments_.push(block.getFieldValue('NAME'));
      this.argTypes_.push(block.getFieldValue('TYPE'));
      block = block.nextConnection && block.nextConnection.targetBlock();
    }
    // Update shape and reconnect
    this.updateShape_(connections);
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function(connections) {
    // Clean up old argument inputs and parentheses
    let i = 0;
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    if (this.getInput('END_ROW')) {
        this.removeInput('END_ROW');
    }
    // Rebuild inputs and reconnect
    for (i = 0; i < this.arguments_.length; i++) {
      const argName = this.arguments_[i];
      const input = this.appendValueInput('ARG' + i)
          .setAlign(Blockly.ALIGN_RIGHT);
      if (i === 0) {
        input.appendField('(');
      } else {
        input.appendField(',');
      }
      // Reconnect the old block if it exists
      if (connections && connections[argName]) {
        input.connection.connect(connections[argName]);
      }
    }
    // Add closing parenthesis
    const endRow = this.appendDummyInput('END_ROW');
    if (this.arguments_.length === 0) {
      endRow.appendField('()');
    } else {
      endRow.appendField(')');
    }
    // Add semicolon for noreturn version
    if (!this.outputConnection) {
      endRow.appendField(';');
    }
    this.setInputsInline(true);
  }
};

Blockly.Blocks['custom_procedures_callnoreturn_manual'] = Object.assign({}, CUSTOM_PROCEDURES_CALL_MANUAL_COMMON, {
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(new Blockly.FieldTextInput('myFunction'), 'NAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour('%{BKY_PROCEDURES_HUE}');
    this.setTooltip('Calls a procedure with no return value.');
    this.setHelpUrl('');
    this.arguments_ = [];
    this.argTypes_ = [];
    this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
    this.updateShape_();
  }
});

Blockly.Blocks['custom_procedures_callreturn_manual'] = Object.assign({}, CUSTOM_PROCEDURES_CALL_MANUAL_COMMON, {
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(new Blockly.FieldTextInput('myFunction'), 'NAME');
    this.setOutput(true, null);
    this.setColour('%{BKY_PROCEDURES_HUE}');
    this.setTooltip('Calls a procedure with a return value.');
    this.setHelpUrl('');
    this.arguments_ = [];
    this.argTypes_ = [];
    this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
    this.updateShape_();
  }
});

// Custom, typed procedure blocks

Blockly.Blocks['custom_procedures_mutatorcontainer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('function inputs');
    this.appendStatementInput('STACK');
    this.setColour('%{BKY_PROCEDURES_HUE}');
    this.setTooltip('A container for function arguments.');
    this.contextMenu = false;
  },
};

Blockly.Blocks['custom_procedures_mutatorarg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('input')
        .appendField(new Blockly.FieldDropdown([
            ['int', 'int'],
            ['float', 'float'],
            ['String', 'String'],
            ['bool', 'bool']
        ]), 'TYPE')
        .appendField(new Blockly.FieldTextInput('x'), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('%{BKY_PROCEDURES_HUE}');
    this.setTooltip('A function argument.');
    this.contextMenu = false;
  },
};

const CUSTOM_PROCEDURES_DEF_COMMON = {
  init: function() {
    this.nameField_ = new Blockly.FieldTextInput('', this.validateName_.bind(this));
    this.appendDummyInput('TOPROW')
        .appendField(this.defType_)
        .appendField(this.nameField_, 'NAME')
        .appendField('', 'PARAMS');
    this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
    if ((this.workspace.options.comments ||
         (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
        Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']) {
      this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
    }
    this.setColour('%{BKY_PROCEDURES_HUE}');
    this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
    this.arguments_ = [];
    this.argTypes_ = []; // Custom: store types
    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK')
          .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_DO']);
      if (this.getInput('RETURN')) {
        this.moveInputBefore('STACK', 'RETURN');
      }
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  validateName_: function(name) {
    // Temporary fix: Disable rename to avoid gesture conflicts.
    name = name.replace(/[^\w\s]/g, '').replace(/\s/g, ' ');
    // if (this.workspace && !this.workspace.isFlyout) {
    //   if (name !== this.getFieldValue('NAME')) {
    //       Blockly.Procedures.rename(this.getFieldValue('NAME'), name, this.workspace);
    //   }
    // }
    return name;
  },
  mutationToDom: function() {
    const container = document.createElement('mutation');
    if (this.hasStatements_) {
      container.setAttribute('statements', this.hasStatements_);
    }
    for (let i = 0; i < this.argumentVarModels_.length; i++) {
      const parameter = document.createElement('arg');
      const varModel = this.argumentVarModels_[i];
      parameter.setAttribute('name', varModel.name);
      parameter.setAttribute('varid', varModel.getId());
      parameter.setAttribute('type', this.argTypes_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.argTypes_ = [];
    this.argumentVarModels_ = [];
    for (const node of xmlElement.childNodes) {
      if (node.nodeName.toLowerCase() === 'arg') {
        const varName = node.getAttribute('name');
        const varId = node.getAttribute('varid') || node.getAttribute('variableid');
        const varType = node.getAttribute('type');
        this.arguments_.push(varName);
        this.argTypes_.push(varType);
        const variable = Blockly.Variables.getOrCreateVariablePackage(
            this.workspace, varId, varName, varType);
        this.argumentVarModels_.push(variable);
      }
    }
    this.updateParams_();
    this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },
  updateParams_: function() {
    let params = [];
    if (this.arguments_.length) {
      params.push('with:');
      for (let i = 0; i < this.arguments_.length; i++) {
        params.push(this.argTypes_[i] + ' ' + this.arguments_[i]);
      }
    }
    const paramString = params.join(' ');
    this.setFieldValue(paramString, 'PARAMS');
  },
  mutatorRebuild_: function(containerBlock) {
    const oldVarModels = this.argumentVarModels_; // Keep a reference to the old variables
    this.arguments_ = [];
    this.argTypes_ = [];
    this.argumentVarModels_ = [];
    let block = containerBlock.getInputTargetBlock('STACK');
    while (block) {
      this.arguments_.push(block.getFieldValue('NAME'));
      this.argTypes_.push(block.getFieldValue('TYPE'));
      this.argumentVarModels_.push(Blockly.Variables.getOrCreateVariablePackage(
          this.workspace, null, block.getFieldValue('NAME'), block.getFieldValue('TYPE')));
      block = block.nextConnection && block.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);
    // Now, find which variables from the old list are no longer present in the new list
    // (either because they were removed or their type changed, resulting in a new variable/ID).
    for (const oldVar of oldVarModels) {
      const isStillPresent = this.argumentVarModels_.some(
        newVar => newVar.getId() === oldVar.getId()
      );
      if (!isStillPresent) {
        this.workspace.deleteVariableById(oldVar.getId());
      }
    }
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('custom_procedures_mutatorcontainer');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.arguments_.length; i++) {
      const argBlock = workspace.newBlock('custom_procedures_mutatorarg');
      argBlock.initSvg();
      argBlock.setFieldValue(this.arguments_[i], 'NAME');
      argBlock.setFieldValue(this.argTypes_[i], 'TYPE');
      connection.connect(argBlock.previousConnection);
      connection = argBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    this.mutatorRebuild_(containerBlock);
  },
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, this.defType_ === 'procedures_defreturn'];
  },
  getVars: function() {
    return this.arguments_;
  },
  getVarModels: function() {
    return this.argumentVarModels_;
  },
  renameVarById: function(oldId, newId) {
    const oldVar = this.workspace.getVariableById(oldId);
    if (Blockly.Names.equals(oldVar.name, this.getFieldValue('NAME'))) {
      return; // Can't rename procedure name.
    }
    for (let i = 0; i < this.argumentVarModels_.length; i++) {
      if (this.argumentVarModels_[i].getId() === oldId) {
        this.argumentVarModels_[i] = this.workspace.getVariableById(newId);
      }
    }
    this.mutatorRebuild_(this.mutator.getWorkspace().getTopBlocks(false)[0]);
  },
  displayRenamedVar_: function(oldName, newName) {
    this.updateParams_();
  },
  customContextMenu: function(options) {
    if (this.isInFlyout) {
      return;
    }
    const option = {enabled: true};
    const name = this.getFieldValue('NAME');
    option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
    const xmlMutation = document.createElement('mutation');
    xmlMutation.setAttribute('name', name);
    for (let i = 0; i < this.arguments_.length; i++) {
      const xmlArg = document.createElement('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlArg.setAttribute('type', this.argTypes_[i]); // Custom
      xmlMutation.appendChild(xmlArg);
    }
    const xmlBlock = document.createElement('block');
    xmlBlock.setAttribute('type', this.callType_);
    xmlBlock.appendChild(xmlMutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    if (!this.isCollapsed()) {
      for (let i = 0; i < this.argumentVarModels_.length; i++) {
        const argOption = {enabled: true};
        const argVar = this.argumentVarModels_[i];
        const argName = argVar.name;
        argOption.text = Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1', argName);

        const argXmlField = Blockly.Variables.generateVariableFieldDom(argVar);
        const argXmlBlock = document.createElement('block');
        argXmlBlock.setAttribute('type', 'variables_get');
        argXmlBlock.appendChild(argXmlField);
        argOption.callback = Blockly.ContextMenu.callbackFactory(this, argXmlBlock);
        options.push(argOption);
      }
    }
  },
  callType_: 'procedures_callnoreturn',
};

Blockly.Blocks['custom_procedures_defnoreturn'] =
    Object.assign({}, CUSTOM_PROCEDURES_DEF_COMMON, {
        defType_: 'procedures_defnoreturn',
        init: function() {
            this.nameField_ = new Blockly.FieldTextInput('', this.validateName_.bind(this));
            this.appendDummyInput('TOPROW')
                .appendField('void')
                .appendField(this.nameField_, 'NAME')
                .appendField('(')
                .appendField('', 'PARAMS')
                .appendField(') {');
            this.setInputsInline(true);
            this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
            if ((this.workspace.options.comments ||
                 (this.workspace.options.parentWorkspace &&
                  this.workspace.options.parentWorkspace.options.comments)) &&
                Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']) {
              this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
            }
            this.setColour('%{BKY_PROCEDURES_HUE}');
            this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
            this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
            this.arguments_ = [];
            this.argTypes_ = [];
            this.argumentVarModels_ = [];
            this.setStatements_(true);
            this.statementConnection_ = null;
            this.appendDummyInput('BOTTOMROW').appendField('}');
        },
        setStatements_: function(hasStatements) {
            if (this.hasStatements_ === hasStatements) {
              return;
            }
            if (hasStatements) {
              this.appendStatementInput('STACK'); // No "do"
              if (this.getInput('RETURN')) {
                this.moveInputBefore('STACK', 'RETURN');
              }
            } else {
              this.removeInput('STACK', true);
            }
            this.hasStatements_ = hasStatements;
        },
        updateParams_: function() {
            let params = [];
            for (let i = 0; i < this.arguments_.length; i++) {
                params.push(this.argTypes_[i] + ' ' + this.arguments_[i]);
            }
            const paramString = params.join(', ');
            if (this.getField('PARAMS')) {
                this.setFieldValue(paramString, 'PARAMS');
            }
        },
    });

Blockly.Blocks['custom_procedures_defreturn'] =
    Object.assign({}, CUSTOM_PROCEDURES_DEF_COMMON, {
        defType_: 'procedures_defreturn',
        init: function() {
            this.nameField_ = new Blockly.FieldTextInput('', this.validateName_.bind(this));
            this.appendDummyInput('TOPROW')
                .appendField(new Blockly.FieldDropdown([
                    ['int', 'int'],
                    ['float', 'float'],
                    ['String', 'String'],
                    ['bool', 'bool']
                ]), 'TYPE')
                .appendField(' ')
                .appendField(this.nameField_, 'NAME')
                .appendField('(')
                .appendField('', 'PARAMS')
                .appendField(') {');
            this.setInputsInline(true);
            this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
            if ((this.workspace.options.comments ||
                (this.workspace.options.parentWorkspace &&
                 this.workspace.options.parentWorkspace.options.comments)) &&
                Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']) {
              this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
            }
            this.setColour('%{BKY_PROCEDURES_HUE}');
            this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
            this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
            this.arguments_ = [];
            this.argTypes_ = [];
            this.argumentVarModels_ = [];
            this.setStatements_(true);
            this.statementConnection_ = null;
            this.appendDummyInput('BOTTOMROW').appendField('}');
        },
        setStatements_: function(hasStatements) {
            if (this.hasStatements_ === hasStatements) {
              return;
            }
            if (hasStatements) {
              this.appendStatementInput('STACK');
            } else {
              this.removeInput('STACK', true);
            }
            this.hasStatements_ = hasStatements;
        },
        updateParams_: function() {
            let params = [];
            for (let i = 0; i < this.arguments_.length; i++) {
                params.push(this.argTypes_[i] + ' ' + this.arguments_[i]);
            }
            const paramString = params.join(', ');
            if (this.getField('PARAMS')) {
                this.setFieldValue(paramString, 'PARAMS');
            }
        },
        mutationToDom: function() {
            const container = CUSTOM_PROCEDURES_DEF_COMMON.mutationToDom.call(this);
            container.setAttribute('returntype', this.getFieldValue('TYPE'));
            return container;
        },
        domToMutation: function(xmlElement) {
            CUSTOM_PROCEDURES_DEF_COMMON.domToMutation.call(this, xmlElement);
            const returnType = xmlElement.getAttribute('returntype');
            if (returnType) {
                this.setFieldValue(returnType, 'TYPE');
            }
        }
    });

const CUSTOM_PROCEDURES_CALL_COMMON = {
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField('', 'NAME');
    this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
    this.setColour('%{BKY_PROCEDURES_HUE}');
    this.arguments_ = [];
    this.argVarModels_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    this.previousDisabled_ = false;
  },
  getProcedureCall: function() {
    return this.getFieldValue('NAME');
  },
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
      const baseMsg = this.outputConnection ?
          Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
          Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      this.setTooltip(baseMsg.replace('%1', newName));
    }
  },
  setProcedureParameters_: function(paramNames, paramIds, paramTypes) {
    const defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
        this.workspace);
    const mutatorOpen = defBlock && defBlock.mutator &&
        defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      return;
    }
    if (paramIds.length !== paramNames.length) {
      throw RangeError('Number of IDs does not match number of names.');
    }
    const paramChanges = [];
    const fieldLabels = this.getFieldValue('PARAMS');
    if (fieldLabels) {
      const oldLabels = JSON.parse(fieldLabels);
      if (oldLabels.join('\n') === paramNames.join('\n')) {
        return; // No change.
      }
    }
    this.setFieldValue(JSON.stringify(paramNames), 'PARAMS');
    this.quarkIds_ = paramIds;
    for (let i = 0; i < this.arguments_.length; i++) {
      const connection = this.getInput('ARG' + i).connection.targetConnection;
      paramChanges.push({
        connection: connection,
        paramId: this.quarkIds_[i],
      });
      if (mutatorOpen && connection &&
          paramIds.indexOf(this.quarkIds_[i]) === -1) {
        connection.disconnect();
        connection.getSourceBlock().bumpNeighbours();
      }
    }
    this.arguments_ = [].concat(paramNames);
    this.argVarModels_ = [];
    for (let i = 0; i < this.arguments_.length; i++) {
      const variable = Blockly.Variables.getVariable(this.workspace, paramIds[i]);
      this.argVarModels_.push(variable);
    }
    this.updateShape_();
    if (mutatorOpen) {
      for (let i = 0; i < paramChanges.length; i++) {
        const data = paramChanges[i];
        const newParamId = data.paramId;
        const newConnection = this.quarkConnections_[newParamId];
        if (data.connection && newConnection) {
          data.connection.connect(newConnection);
        }
      }
    }
  },
  updateShape_: function() {
    for (let i = 0; i < this.arguments_.length; i++) {
      let input = this.getInput('ARG' + i);
      if (!input) {
        input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(this.arguments_[i]);
        input.init();
      }
    }
    for (let i = this.arguments_.length; this.getInput('ARG' + i); i++) {
      this.removeInput('ARG' + i);
    }
    if (this.arguments_.length) {
      if (!this.getInput('TOPROW').fieldRow.length) {
        this.moveInputBefore('TOPROW', 'ARG0');
      }
    } else {
      if (this.getInput('TOPROW').fieldRow.length) {
        this.moveInputBefore('TOPROW', null);
      }
    }
  },
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      return;
    }
    if (event.type === Blockly.Events.BLOCK_CREATE &&
        event.ids.indexOf(this.id) !== -1) {
      const name = this.getProcedureCall();
      const def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (def) {
        const argNames = def.getVars();
        const argIds = argNames.map(
            (name) => def.workspace.getVariable(name).getId());
        this.setProcedureParameters_(argNames, argIds);
      }
    } else if (event.type === Blockly.Events.BLOCK_DELETE) {
      const name = this.getProcedureCall();
      if (Blockly.Procedures.getDefinition(name, this.workspace)) {
        return; // Definition still exists, so don't disable.
      }
      if (event.ids.indexOf(this.id) !== -1) {
        // If this block is being deleted, don't change its appearance.
        return;
      }
      if (this.previousDisabled_) {
        return; // Already disabled.
      }
      this.setDisabled(true);
      this.previousDisabled_ = true;
    } else if (event.type === Blockly.Events.CHANGE &&
        event.element === 'disabled') {
      if (event.blockId !== this.id) {
        return;
      }
      if (this.disabled) {
        this.previousDisabled_ = true;
      } else {
        this.previousDisabled_ = false;
      }
    }
  },
  customContextMenu: function(options) {
    const option = {
      enabled: true,
      text: Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'],
    };
    const name = this.getProcedureCall();
    const workspace = this.workspace;
    option.callback = function() {
      const def = Blockly.Procedures.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);
  },
  defType_: 'procedures_defreturn',
};

Blockly.Blocks['custom_procedures_callnoreturn'] = 
    Object.assign({}, CUSTOM_PROCEDURES_CALL_COMMON, {
      init: function() {
        this.appendDummyInput('TOPROW')
            .appendField('', 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour('%{BKY_PROCEDURES_HUE}');
        this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
        this.arguments_ = [];
        this.argVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousDisabled_ = false;
      },
      defType_: 'procedures_defnoreturn',
    });

Blockly.Blocks['custom_procedures_callreturn'] = 
    Object.assign({}, CUSTOM_PROCEDURES_CALL_COMMON, {
      init: function() {
        this.appendDummyInput('TOPROW')
            .appendField('', 'NAME');
        this.setOutput(true);
        this.setColour('%{BKY_PROCEDURES_HUE}');
        this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLRETURN_HELPURL']);
        this.arguments_ = [];
        this.argVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousDisabled_ = false;
      },
      defType_: 'procedures_defreturn',
    });



Blockly.Blocks['logic_compare'] = {
  init: function() {
    this.appendValueInput('A')
        .setCheck(null);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['==', 'EQ'],
          ['!=', 'NEQ'],
          ['<', 'LT'],
          ['<=', 'LTE'],
          ['>', 'GT'],
          ['>=', 'GTE']
        ]), 'OP');
    this.appendValueInput('B')
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setStyle('logic_blocks');
    this.setTooltip(Blockly.Msg.LOGIC_COMPARE_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.LOGIC_COMPARE_HELPURL);
  }
};

Blockly.Blocks['logic_operation'] = {
  init: function() {
    this.appendValueInput('A')
        .setCheck('Boolean');
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['&& (and)', 'AND'],
          ['|| (or)', 'OR']
        ]), 'OP');
    this.appendValueInput('B')
        .setCheck('Boolean');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setStyle('logic_blocks');
    this.setTooltip(Blockly.Msg.LOGIC_OPERATION_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.LOGIC_OPERATION_HELPURL);
  }
};

Blockly.Blocks['logic_negate'] = {
  init: function() {
    this.appendValueInput('BOOL')
        .setCheck('Boolean')
        .appendField('!(not)');
    this.setOutput(true, 'Boolean');
    this.setStyle('logic_blocks');
    this.setTooltip(Blockly.Msg.LOGIC_NEGATE_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.LOGIC_NEGATE_HELPURL);
  }
};

Blockly.Blocks['logic_boolean'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['true', 'TRUE'],
          ['false', 'FALSE']
        ]), 'BOOL');
    this.setOutput(true, 'Boolean');
    this.setStyle('logic_blocks');
    this.setTooltip(Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.LOGIC_BOOLEAN_HELPURL);
  }
};


// Loops

Blockly.Blocks['controls_whileUntil'] = {
  init: function() {
    this.appendDummyInput() // For "while ("
        .appendField('while (');
    this.appendValueInput('BOOL') // For the actual input slot
        .setCheck('Boolean');
    this.appendDummyInput() // For ") {"
        .appendField(') {');
    this.appendStatementInput('DO')
        .appendField('  '); // Indent for code feel
    this.appendDummyInput()
        .appendField('}');
    this.setInputsInline(true); // Crucial: allow inputs to be inline
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip(Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL);
  }
};


Blockly.Blocks['controls_for'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('for (int ')
        .appendField(new Blockly.FieldVariable('i'), 'VAR')
        .appendField(' = ');
    this.appendValueInput('FROM').setCheck('Number');
    this.appendDummyInput('COMPARE_INPUT')
        .appendField('; ')
        .appendField(new Blockly.FieldLabel('i'), 'VAR_LABEL_1')
        .appendField(' <= ', 'COMPARE_OP');
    this.appendValueInput('TO').setCheck('Number');
    this.appendDummyInput('STEP_INPUT')
        .appendField('; ')
        .appendField(new Blockly.FieldLabel('i'), 'VAR_LABEL_2')
        .appendField(' += ', 'STEP_OP');
    this.appendValueInput('BY').setCheck('Number');
    this.appendDummyInput().appendField(') {');
    this.appendStatementInput('DO');
    this.appendDummyInput().appendField('}');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    const updateLabels = (block) => {
      const varName = block.getField('VAR').getText();
      block.setFieldValue(varName, 'VAR_LABEL_1');
      block.setFieldValue(varName, 'VAR_LABEL_2');
    };
    // ✅ 變數重新命名時同步更新 Label（不延遲、不落後、不亂碼）
    this.getField('VAR').setValidator(function(newVarId) {
      const block = this.getSourceBlock();
      setTimeout(() => {
        updateLabels(block);
        block.render();
      }, 0);
      return newVarId; // *必須回傳 ID*
    });
    // ✅ 初始顯示變數 i（解決你最後遇到的問題）
    setTimeout(() => {
      updateLabels(this);
      this.render();
    }, 0);
  },
  // ✅ 自動切換 <= / >= 與 += / -=
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout || !event.recordUndo) {
      return;
    }
    if (event.type === Blockly.Events.BLOCK_CHANGE &&
        (event.blockId === this.getInputTargetBlock('FROM')?.id ||
         event.blockId === this.getInputTargetBlock('TO')?.id)) {
      const fromBlock = this.getInputTargetBlock('FROM');
      const toBlock = this.getInputTargetBlock('TO');
      let fromValue = NaN;
      let toValue = NaN;
      if (fromBlock && fromBlock.type === 'math_number') {
        fromValue = parseFloat(fromBlock.getFieldValue('NUM'));
      }
      if (toBlock && toBlock.type === 'math_number') {
        toValue = parseFloat(toBlock.getFieldValue('NUM'));
      }
      if (!isNaN(fromValue) && !isNaN(toValue)) {
        if (fromValue < toValue) {
          this.setFieldValue(' <= ', 'COMPARE_OP');
          this.setFieldValue(' += ', 'STEP_OP');
        } else if (fromValue > toValue) {
          this.setFieldValue(' >= ', 'COMPARE_OP');
          this.setFieldValue(' -= ', 'STEP_OP');
        } else {
          this.setFieldValue(' <= ', 'COMPARE_OP');
          this.setFieldValue(' += ', 'STEP_OP');
        }
      } else {
        this.setFieldValue(' <= ', 'COMPARE_OP');
        this.setFieldValue(' += ', 'STEP_OP');
      }
      this.render();
    }
  }
};




Blockly.Blocks['controls_flow_statements'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['break;', 'BREAK'],
          ['continue;', 'CONTINUE']
        ]), 'FLOW');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('loop_blocks');
    this.setTooltip(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL);
  }
};



// Text
// text_append
Blockly.Blocks['text_append'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck(['String', 'Number'])
        .appendField(new Blockly.FieldVariable('myString'), 'VAR') // Use FieldVariable
        .appendField(' += ');
    this.appendDummyInput()
        .appendField(';');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.TEXT_HUE);
    this.setTooltip(Blockly.Msg.TEXT_APPEND_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_APPEND_HELPURL);
  }
};

//text_length
Blockly.Blocks['text_length'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(['String', 'Array'])
        .appendField(''); // Empty field to allow input to be first
    this.appendDummyInput()
        .appendField('.length()');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(Blockly.Msg.TEXT_HUE);
    this.setTooltip(Blockly.Msg.TEXT_LENGTH_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_LENGTH_HELPURL);
  }
};



// Functions
Blockly.Blocks['custom_procedures_return'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .appendField('return');
    this.appendDummyInput()
        .appendField(';');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    // No next statement because return terminates the function.
    this.setColour('%{BKY_PROCEDURES_HUE}');
    this.setTooltip('Returns a value from a function.');
    this.setHelpUrl('');
    this.setOnChange(function(event) {
      if (!this.workspace || this.isInFlyout) {
        return;
      }
      var legal = false;
      var block = this;
      do {
        if (this.FUNCTION_TYPES.indexOf(block.type) !== -1) {
          legal = true;
          break;
        }
        block = block.getSurroundParent();
      } while (block);
      if (legal) {
        if (block.type === 'custom_procedures_defnoreturn') {
            this.setWarningText('Return blocks cannot be used in a function with no return value (void).');
        } else {
            this.setWarningText(null);
        }
      } else {
        this.setWarningText('This block may only be used within a function.');
      }
    });
  },
  FUNCTION_TYPES: ['custom_procedures_defreturn', 'custom_procedures_defnoreturn'],
};


Blockly.Blocks['array_declare'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ['Global', 'GLOBAL'],
          ['Local', 'LOCAL']
        ]), 'SCOPE')
        .appendField(Blockly.Msg.ARRAY_DECLARE_TITLE)
        .appendField(new Blockly.FieldDropdown([
          ['int', 'int'],
          ['float', 'float'],
          ['String', 'String'],
          ['bool', 'bool']
        ]), 'TYPE');
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('myArray'), 'VAR')
        .appendField('[');
    this.appendValueInput('SIZE')
        .setCheck('Number')
        .setShadowDom(Blockly.utils.xml.textToDom(
            '<shadow type="math_number"><field name="NUM">10</field></shadow>'
        ));
    this.appendDummyInput()
        .appendField('];');
    this.setInputsInline(true);
    this.setColour(Blockly.Msg.ARRAY_HUE); // 使用陣列的顏色
    this.setTooltip(Blockly.Msg.ARRAY_DECLARE_TOOLTIP);
    this.setHelpUrl(""); // 幫助連結留空
    // Set initial shape based on the default value
    this.updateShape_(this.getFieldValue('SCOPE'));
  },
  onchange: function(event) {
    if (event.type === 'change' && event.blockId === this.id && event.name === 'SCOPE') {
      this.updateShape_(event.newValue);
      // Ensure 'this' is a valid block and setDisabled is available
      if (this.setDisabled) {
        if (event.newValue === 'LOCAL' && !this.getParent()) {
          this.setDisabled(true);
        } else {
          this.setDisabled(false);
        }
      }
    }
  },
  updateShape_: function(scope) {
    if (scope === 'GLOBAL') {
      this.setPreviousStatement(false, null);
      this.setNextStatement(false, null);
    } else { // LOCAL
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    }
  }
};

Blockly.Blocks['array_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('myArray'), 'VAR')
        .appendField('[');
    this.appendValueInput('INDEX')
        .setCheck('Number')
        .setShadowDom(Blockly.utils.xml.textToDom(
            '<shadow type="math_number"><field name="NUM">0</field></shadow>'
        ));
    this.appendDummyInput()
        .appendField(']');
    this.setInputsInline(true);
    this.setOutput(true, null); // 可以返回任何類型的值
    this.setColour(Blockly.Msg.ARRAY_HUE); // 使用陣列的顏色
    this.setTooltip(Blockly.Msg.ARRAY_GET_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['array_set'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('myArray'), 'VAR')
        .appendField('[');
    this.appendValueInput('INDEX')
        .setCheck('Number')
        .setShadowDom(Blockly.utils.xml.textToDom(
            '<shadow type="math_number"><field name="NUM">0</field></shadow>'
        ));
    this.appendDummyInput()
        .appendField('] = ');
    this.appendValueInput('VALUE')
        .setCheck(null); // 可以接受任何類型的值
    this.appendDummyInput()
        .appendField(';');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.ARRAY_HUE); // 使用陣列的顏色
    this.setTooltip(Blockly.Msg.ARRAY_SET_TOOLTIP);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['array_length'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('length of Array')
        .appendField(new Blockly.FieldTextInput('myArray'), 'VAR');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(Blockly.Msg.ARRAY_HUE); // 使用陣列的顏色
    this.setTooltip(Blockly.Msg.ARRAY_LENGTH_TOOLTIP);
    this.setHelpUrl("");
  }
};

}(Blockly));