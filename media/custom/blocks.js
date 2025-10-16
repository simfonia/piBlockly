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
      "nextStatement": null,
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
      "previousStatement": null,
      "colour": "%{BKY_ARDUINO_STRUCTURE_HUE}",
      "tooltip": "%{BKY_INITIALIZES_LOOP_TOOLTIP}",
      "helpUrl": "%{BKY_INITIALIZES_LOOP_HELPURL}"
    });
  }
};


Blockly.Blocks['variables_declare'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1 %2 %3 = %4",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "SCOPE",
          "options": [
            ["Global", "GLOBAL"],
            ["Local", "LOCAL"]
          ]
        },
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
      "previousStatement": null,
      "nextStatement": null,
      "colour": "%{BKY_VARIABLES_HUE}",
      "tooltip": "Declare a variable with a type and scope.",
      "helpUrl": ""
    });
  }
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


}(Blockly));
