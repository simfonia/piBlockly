export function registerBlocks(Blockly) {
// Coding Blocks
Blockly.Blocks['coding_raw_statement'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_CODING_RAW_STATEMENT_MESSAGE}",
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
      "message0": "%{BKY_CODING_RAW_INPUT_MESSAGE}",
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
      "message0": "%{BKY_CODING_RAW_DEFINITION_MESSAGE}",
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
      "message0": "%{BKY_CODING_RAW_WRAPPER_TOP_MESSAGE}",
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
      "message2": "%{BKY_CODING_RAW_WRAPPER_BOTTOM_MESSAGE}",
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
}
