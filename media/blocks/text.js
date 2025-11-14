export function registerBlocks(Blockly) {
// Text Blocks
Blockly.Blocks['text_append'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_TEXT_APPEND_MESSAGE}",
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "myString"
        },
        {
          "type": "input_value",
          "name": "TEXT",
          "check": ["String", "Number"]
        }
      ],
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "colour": Blockly.Msg.TEXT_HUE,
      "tooltip": Blockly.Msg.TEXT_APPEND_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_APPEND_HELPURL
    });
  }
};

Blockly.Blocks['text_length'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_TEXT_LENGTH_MESSAGE}",
      "args0": [
        {
          "type": "input_value",
          "name": "VALUE",
          "check": ["String", "Array"]
        }
      ],
      "inputsInline": true,
      "output": "Number",
      "colour": Blockly.Msg.TEXT_HUE,
      "tooltip": Blockly.Msg.TEXT_LENGTH_TOOLTIP,
      "helpUrl": Blockly.Msg.TEXT_LENGTH_HELPURL
    });
  }
};
}
