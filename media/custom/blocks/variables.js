
(function(Blockly) {
// Variables Blocks
Blockly.Blocks['variables_declare_global'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_VARIABLES_DECLARE_GLOBAL_MESSAGE}",
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
      "tooltip": "%{BKY_VARIABLES_DECLARE_GLOBAL_TOOLTIP}",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['variables_declare_local'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_VARIABLES_DECLARE_LOCAL_MESSAGE}",
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
      "tooltip": "%{BKY_VARIABLES_DECLARE_LOCAL_TOOLTIP}",
      "helpUrl": ""
    });
  }
};

Blockly.Blocks['variables_get'] = {
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
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_VARIABLES_SET_MESSAGE}",
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
