
(function(Blockly) {
// Arduino Blocks
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

Blockly.Blocks['arduino_pin_mode'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_PIN_MODE_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "PIN",
          "check": ["Number", "String"],
          "shadow": {
            "type": "arduino_pin_shadow"
          }
        },
        {
          "type": "input_value",
          "name": "MODE",
          "check": "String",
          "shadow": {
            "type": "arduino_pin_mode_mode_shadow"
          }
        }
      ],
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "colour": Blockly.Msg.ARDUINO_CONTROL_HUE,
      "tooltip": Blockly.Msg.ARDUINO_PIN_MODE_TOOLTIP,
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['arduino_pin_shadow'] = {
  init: function() {
    // Kept in imperative style due to jsonInit issues with FieldTextInput in shadow blocks.
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARDUINO_PIN_LABEL)
        .appendField(new Blockly.FieldTextInput(""), "PIN");
    this.setOutput(true, ["Number", "String"]);
    this.setColour(Blockly.Msg.ARDUINO_CONTROL_HUE);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['arduino_pin_mode_mode_shadow'] = {
  init: function() {
    // Kept in imperative style due to jsonInit issues with FieldDropdown in shadow blocks.
    this.jsonInit({
      "message0": Blockly.Msg.ARDUINO_MODE_LABEL + " %1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "MODE",
          "options": [
            [Blockly.Msg.ARDUINO_PIN_MODE_OUTPUT, "OUTPUT"],
            [Blockly.Msg.ARDUINO_PIN_MODE_INPUT, "INPUT"],
            [Blockly.Msg.ARDUINO_PIN_MODE_INPUT_PULLUP, "INPUT_PULLUP"]
          ]
        }
      ],
      "output": "String",
      "colour": Blockly.Msg.ARDUINO_CONTROL_HUE,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['arduino_digital_read'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_DIGITAL_READ_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "PIN",
          "check": ["Number", "String"]
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": Blockly.Msg.ARDUINO_DIGITAL_IO_HUE,
      "tooltip": Blockly.Msg.ARDUINO_DIGITAL_READ_TOOLTIP,
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['arduino_digital_write'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_DIGITAL_WRITE_MSG}",
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
      "message0": "%{BKY_ARDUINO_ANALOG_READ_MSG}",
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
      "message0": "%{BKY_ARDUINO_ANALOG_WRITE_MSG}",
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
      "tooltip": "%{BKY_ARDUINO_ANALOG_WRITE_TOOLTIP}",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['arduino_delay'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_DELAY_MSG}",
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
      "message0": "%{BKY_ARDUINO_DELAY_MICROSECONDS_MSG}",
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
      "message0": "%{BKY_ARDUINO_MILLIS_MSG}",
      "output": "Number",
      "colour": "%{BKY_ARDUINO_TIME_HUE}",
      "tooltip": "%{BKY_ARDUINO_MILLIS_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_micros'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_MICROS_MSG}",
      "output": "Number",
      "colour": "%{BKY_ARDUINO_TIME_HUE}",
      "tooltip": "%{BKY_ARDUINO_MICROS_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_serial_begin'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_SERIAL_BEGIN_MSG}",
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
      "message0": "%{BKY_ARDUINO_SERIAL_PRINT_MSG}",
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
      "message0": "%{BKY_ARDUINO_SERIAL_PRINTLN_MSG}",
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
      "message0": "%{BKY_ARDUINO_SERIAL_AVAILABLE_MSG}",
      "output": "Number",
      "colour": "%{BKY_ARDUINO_SERIAL_HUE}",
      "tooltip": "%{BKY_ARDUINO_SERIAL_AVAILABLE_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_serial_read'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_SERIAL_READ_MSG}",
      "output": "Number",
      "colour": "%{BKY_ARDUINO_SERIAL_HUE}",
      "tooltip": "%{BKY_ARDUINO_SERIAL_READ_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_constrain'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_CONSTRAIN_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": ["Number", "String"]
        },
        {
          "type": "input_value",
          "name": "LOW",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "HIGH",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "style": "math_blocks",
      "tooltip": "%{BKY_ARDUINO_CONSTRAIN_TOOLTIP}"
    });
  }
};

Blockly.Blocks['arduino_map'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_MAP_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": ["Number", "String"]
        },
        {
          "type": "input_value",
          "name": "FROMLOW",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "FROMHIGH",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "TOLOW",
          "check": "Number"
        },
        {
          "type": "input_value",
          "name": "TOHIGH",
          "check": "Number"
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "style": "math_blocks",
      "tooltip": "%{BKY_ARDUINO_MAP_TOOLTIP}"
    });
  }
};

Blockly.Blocks['math_random_seed'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_MATH_RANDOM_SEED_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "SEED",
          "check": "Number",
          "shadow": {
            "type": "arduino_analog_read",
            "inputs": {
                "PIN": {
                    "shadow": {
                        "type": "arduino_pin_shadow",
                        "fields": {
                            "PIN": "A0"
                        }
                    }
                }
            }
          }
        }
      ],
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "style": "math_blocks",
      "tooltip": "%{BKY_ARDUINO_MATH_RANDOM_SEED_TOOLTIP}"
    });
  }
};

Blockly.Blocks['math_random_int'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_ARDUINO_MATH_RANDOM_INT_MSG}",
      "args0": [
        {
          "type": "input_value",
          "name": "MIN",
          "check": "Number",
          "shadow": {
            "type": "math_number",
            "fields": { "NUM": 0 }
          }
        },
        {
          "type": "input_value",
          "name": "MAX",
          "check": "Number",
          "shadow": {
            "type": "math_number",
            "fields": { "NUM": 100 }
          }
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "style": "math_blocks",
      "tooltip": "%{BKY_ARDUINO_MATH_RANDOM_INT_TOOLTIP}"
    });
  }
};
}(Blockly));
