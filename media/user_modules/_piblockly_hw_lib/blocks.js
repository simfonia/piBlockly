// piblockly/media/user_modules/_core_hw_lib/blocks.js

export function registerBlocks(Blockly) {
  // HC-SR04 Ultrasonic Distance Sensor Block
  Blockly.Blocks['simfonia_ultrasonic_distance'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_TITLE']);
      this.appendValueInput('TRIG_PIN')
          .setCheck('Number')
          .appendField(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_TRIG_PIN']);
      this.appendValueInput('ECHO_PIN')
          .setCheck('Number')
          .appendField(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_ECHO_PIN']);
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour("#70A8FF");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_TOOLTIP']);
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_HELPURL']);
    }
  };

  // DHT Sensor Block
  Blockly.Blocks['simfonia_dht_read'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_DHT_READ_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.PIBLOCKLY_HW_DHT_TYPE_11, "DHT11"],
              [Blockly.Msg.PIBLOCKLY_HW_DHT_TYPE_22, "DHT22"]
          ]), "DHT_TYPE");
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(Blockly.Msg.PIBLOCKLY_HW_DHT_ON_PIN);
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_DHT_READING)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.PIBLOCKLY_HW_DHT_READING_TEMP, "TEMP"],
              [Blockly.Msg.PIBLOCKLY_HW_DHT_READING_HUMIDITY, "HUMID"]
          ]), "READING_TYPE");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour("#70A8FF");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_DHT_READ_TOOLTIP);
    }
  };

  // --- HUSKYLENS BLOCKS ---

  // Init Block
  Blockly.Blocks['huskylens_init'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_INIT_TITLE);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_INIT_TOOLTIP);
    }
  };

  // Set Algorithm Block
  Blockly.Blocks['huskylens_set_algorithm'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SET_ALGORITHM_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_FACE_RECOGNITION, "ALGORITHM_FACE_RECOGNITION"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_OBJECT_TRACKING, "ALGORITHM_OBJECT_TRACKING"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_OBJECT_RECOGNITION, "ALGORITHM_OBJECT_RECOGNITION"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_LINE_TRACKING, "ALGORITHM_LINE_TRACKING"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_COLOR_RECOGNITION, "ALGORITHM_COLOR_RECOGNITION"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_TAG_RECOGNITION, "ALGORITHM_TAG_RECOGNITION"]
          ]), "ALGORITHM");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SET_ALGORITHM_TOOLTIP);
    }
  };

  // Request and Check Block (Wrapper)
  Blockly.Blocks['huskylens_request_and_check'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_REQUEST_AND_CHECK_TITLE);
      this.appendStatementInput("DO")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_REQUEST_AND_CHECK_TOOLTIP);
    }
  };

  // Get Result Property Block
  Blockly.Blocks['huskylens_get_result_property'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_RESULT_PROPERTY_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_X_CENTER, "xCenter"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_Y_CENTER, "yCenter"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_WIDTH, "width"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_HEIGHT, "height"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_ID, "ID"]
          ]), "PROPERTY")
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_PROPERTY_OF_RESULT);
      this.setOutput(true, "Number");
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_RESULT_PROPERTY_TOOLTIP);
    }
  };
}
