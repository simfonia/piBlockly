// piblockly/media/user_modules/simfonia_sensors.js

// Define language strings for this module, separated by language
export const MSG_SIMFONIA_EN = {
  // Category Keys
  "SIMFONIA_CATEGORY_COMMON": "Common Sensors",
  "SIMFONIA_CATEGORY_AI": "AI Sensors",

  // Ultrasonic Distance Block
  "SIMFONIA_ULTRASONIC_DISTANCE_TITLE": "HC-SR04 Ultrasonic Distance",
  "SIMFONIA_ULTRASONIC_DISTANCE_TOOLTIP": "Reads distance from HC-SR04 ultrasonic sensor",
  "SIMFONIA_ULTRASONIC_DISTANCE_HELPURL": "https://www.example.com/hcsr04",
  "SIMFONIA_ULTRASONIC_DISTANCE_TRIG_PIN": "Trig Pin",
  "SIMFONIA_ULTRASONIC_DISTANCE_ECHO_PIN": "Echo Pin",
};

export const MSG_SIMFONIA_ZH_HANT = {
  // Category Keys
  "SIMFONIA_CATEGORY_COMMON": "常用感測器",
  "SIMFONIA_CATEGORY_AI": "人工智慧感測器",

  // Ultrasonic Distance Block
  "SIMFONIA_ULTRASONIC_DISTANCE_TITLE": "HC-SR04 超音波測距",
  "SIMFONIA_ULTRASONIC_DISTANCE_TOOLTIP": "讀取 HC-SR04 超音波感測器距離",
  "SIMFONIA_ULTRASONIC_DISTANCE_HELPURL": "https://www.example.com/hcsr04",
  "SIMFONIA_ULTRASONIC_DISTANCE_TRIG_PIN": "觸發腳位",
  "SIMFONIA_ULTRASONIC_DISTANCE_ECHO_PIN": "回聲腳位",
};

export function registerBlocks(Blockly) {
  // HC-SR04 Ultrasonic Distance Sensor Block
  Blockly.Blocks['simfonia_ultrasonic_distance'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg['SIMFONIA_ULTRASONIC_DISTANCE_TITLE']);
      this.appendValueInput('TRIG_PIN')
          .setCheck('Number')
          .appendField(Blockly.Msg['SIMFONIA_ULTRASONIC_DISTANCE_TRIG_PIN']);
      this.appendValueInput('ECHO_PIN')
          .setCheck('Number')
          .appendField(Blockly.Msg['SIMFONIA_ULTRASONIC_DISTANCE_ECHO_PIN']);
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour("#70A8FF"); // Hexadecimal color
      this.setTooltip(Blockly.Msg['SIMFONIA_ULTRASONIC_DISTANCE_TOOLTIP']);
      this.setHelpUrl(Blockly.Msg['SIMFONIA_ULTRASONIC_DISTANCE_HELPURL']);
    }
  };

  // HC-SR04 Ultrasonic Distance Sensor Generator
  Blockly.Arduino.forBlock['simfonia_ultrasonic_distance'] = function(block) {
    const trigPin = Blockly.Arduino.valueToCode(block, 'TRIG_PIN', Blockly.Arduino.ORDER_ATOMIC);
    const echoPin = Blockly.Arduino.valueToCode(block, 'ECHO_PIN', Blockly.Arduino.ORDER_ATOMIC);

    // Define the custom function for ultrasonic distance reading
    const functionName = Blockly.Arduino.variableDB_.getDistinctName(
        'readUltrasonicDistance', Blockly.NAME_TYPE);
    Blockly.Arduino.function_definitions_[functionName] = `
long ${functionName}(int triggerPin, int echoPin) {
  pinMode(triggerPin, OUTPUT);
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  pinMode(echoPin, INPUT);
  return pulseIn(echoPin, HIGH) * 0.034 / 2;
}`;
    // Use the custom function in the code
    const code = `${functionName}(${trigPin}, ${echoPin})`;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
}

export const toolbox = `
<xml>
<category name="Simfonia Sensors" colour="#70A8FF">
  <category name="Common" colour="#70A8FF">
    <block type="simfonia_ultrasonic_distance"></block>
  </category>
  <category name="AI" colour="#8BC34A">
  </category>
</category>
</xml>
`;