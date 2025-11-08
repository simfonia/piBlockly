
(function(Blockly) {
Blockly.Blocks['logic_compare'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_LOGIC_COMPARE_MESSAGE}",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
          "check": null
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options": [
            ["==", "EQ"],
            ["!=", "NEQ"],
            ["<", "LT"],
            ["<=", "LTE"],
            [">", "GT"],
            [">=", "GTE"]
          ]
        },
        {
          "type": "input_value",
          "name": "B",
          "check": null
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "style": "logic_blocks",
      "tooltip": Blockly.Msg.LOGIC_COMPARE_TOOLTIP,
      "helpUrl": Blockly.Msg.LOGIC_COMPARE_HELPURL
    });
  }
};

Blockly.Blocks['logic_operation'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_LOGIC_OPERATION_MESSAGE}",
      "args0": [
        {
          "type": "input_value",
          "name": "A",
          "check": "Boolean"
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options": [
            ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
            ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
          ]
        },
        {
          "type": "input_value",
          "name": "B",
          "check": "Boolean"
        }
      ],
      "inputsInline": true,
      "output": "Boolean",
      "style": "logic_blocks",
      "tooltip": Blockly.Msg.LOGIC_OPERATION_TOOLTIP,
      "helpUrl": Blockly.Msg.LOGIC_OPERATION_HELPURL
    });
  }
};

Blockly.Blocks['logic_negate'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_LOGIC_NEGATE_MESSAGE}",
      "args0": [
        {
          "type": "input_value",
          "name": "BOOL",
          "check": "Boolean"
        }
      ],
      "output": "Boolean",
      "style": "logic_blocks",
      "tooltip": Blockly.Msg.LOGIC_NEGATE_TOOLTIP,
      "helpUrl": Blockly.Msg.LOGIC_NEGATE_HELPURL
    });
  }
};

Blockly.Blocks['logic_boolean'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BOOL",
          "options": [
            ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
            ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
          ]
        }
      ],
      "output": "Boolean",
      "style": "logic_blocks",
      "tooltip": Blockly.Msg.LOGIC_BOOLEAN_TOOLTIP,
      "helpUrl": Blockly.Msg.LOGIC_BOOLEAN_HELPURL
    });
  }
};
}(Blockly));
