
(function(Blockly) {
// Array Blocks
Blockly.Blocks['array_declare_global'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARRAY_DECLARE_GLOBAL_TITLE_GENERIC)
        .appendField(new Blockly.FieldDropdown([
            ['int', 'int'],
            ['float', 'float'],
            ['String', 'String'],
            ['bool', 'bool']
        ]), 'TYPE')
        .appendField(new Blockly.FieldTextInput('myGlobalArray'), 'VAR')
        .appendField('[');
    this.appendValueInput('SIZE')
        .setCheck('Number')
        .setShadowDom(Blockly.utils.xml.textToDom(
            '<shadow type="math_number"><field name="NUM">10</field></shadow>'
        ));
    this.appendDummyInput()
        .appendField(']');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.ARRAY_HUE);
    this.setTooltip(Blockly.Msg.ARRAY_DECLARE_GLOBAL_TOOLTIP_GENERIC);
    this.setHelpUrl('');
  }
};

Blockly.Blocks['array_declare_local'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARRAY_DECLARE_LOCAL_TITLE_GENERIC)
        .appendField(new Blockly.FieldDropdown([
            ['int', 'int'],
            ['float', 'float'],
            ['String', 'String'],
            ['bool', 'bool']
        ]), 'TYPE')
        .appendField(new Blockly.FieldTextInput('myLocalArray'), 'VAR')
        .appendField('[');
    this.appendValueInput('SIZE')
        .setCheck('Number')
        .setShadowDom(Blockly.utils.xml.textToDom(
            '<shadow type="math_number"><field name="NUM">10</field></shadow>'
        ));
    this.appendDummyInput()
        .appendField(']');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.ARRAY_HUE);
    this.setTooltip(Blockly.Msg.ARRAY_DECLARE_LOCAL_TOOLTIP_GENERIC);
    this.setHelpUrl('');
  }
};

Blockly.Blocks['array_get'] = {
  init: function() {
    // Kept in imperative style due to jsonInit issues with FieldTextInput and shadow DOM for index.
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('myArray'), 'VAR')
        .appendField(Blockly.Msg.ARRAY_GET_BRACKET_OPEN_GENERIC);
    this.appendValueInput('INDEX')
        .setCheck('Number')
        .setShadowDom(Blockly.utils.xml.textToDom(
            '<shadow type="math_number"><field name="NUM">0</field></shadow>'
        ));
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARRAY_GET_BRACKET_CLOSE_GENERIC);
    this.setInputsInline(true);
    this.setOutput(true, null); // 可以返回任何類型的值
    this.setColour(Blockly.Msg.ARRAY_HUE);
    this.setTooltip(Blockly.Msg.ARRAY_GET_TOOLTIP_GENERIC);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['array_set'] = {
  init: function() {
    // Kept in imperative style due to jsonInit issues with FieldTextInput and shadow DOM for index.
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput('myArray'), 'VAR')
        .appendField(Blockly.Msg.ARRAY_SET_BRACKET_OPEN_GENERIC);
    this.appendValueInput('INDEX')
        .setCheck('Number')
        .setShadowDom(Blockly.utils.xml.textToDom(
            '<shadow type="math_number"><field name="NUM">0</field></shadow>'
        ));
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARRAY_SET_BRACKET_CLOSE_EQUALS_GENERIC);
    this.appendValueInput('VALUE')
        .setCheck(null); // 可以接受任何類型的值
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg.ARRAY_HUE); // 使用陣列的顏色
    this.setTooltip(Blockly.Msg.ARRAY_SET_TOOLTIP_GENERIC);
    this.setHelpUrl("");
  }
};

Blockly.Blocks['array_length'] = {
  init: function() {
    // Kept in imperative style due to jsonInit issues with FieldTextInput.
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARRAY_LENGTH_TITLE_GENERIC)
        .appendField(new Blockly.FieldTextInput('myArray'), 'VAR');
    this.setInputsInline(true);
    this.setOutput(true, 'Number');
    this.setColour(Blockly.Msg.ARRAY_HUE); // 使用陣列的顏色
    this.setTooltip(Blockly.Msg.ARRAY_LENGTH_TOOLTIP_GENERIC);
    this.setHelpUrl("");
  }
};
}(Blockly));
