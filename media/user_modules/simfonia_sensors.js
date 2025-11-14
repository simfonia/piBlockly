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

  // DHT Sensor Block
  "SIMFONIA_DHT_READ_TITLE": "Read DHT",
  "SIMFONIA_DHT_ON_PIN": "on pin",
  "SIMFONIA_DHT_READING": "Reading:",
  "SIMFONIA_DHT_READ_TOOLTIP": "Reads Temperature or Humidity from a DHT sensor. Requires the 'DHT sensor library' by Adafruit.",
  "SIMFONIA_DHT_TYPE_11": "DHT11",
  "SIMFONIA_DHT_TYPE_22": "DHT22",
  "SIMFONIA_DHT_READING_TEMP": "Temperature (°C)",
  "SIMFONIA_DHT_READING_HUMIDITY": "Humidity (%)",

  // Huskylens Blocks
  "SIMFONIA_HUSKYLENS_CATEGORY": "Huskylens",
  "SIMFONIA_HUSKYLENS_INIT_TITLE": "Initialize HuskyLens via I2C",
  "SIMFONIA_HUSKYLENS_INIT_TOOLTIP": "Initializes the HuskyLens sensor. Must be placed in setup. Requires 'HUSKYLENS' library by DFRobot.",
  "SIMFONIA_HUSKYLENS_SET_ALGORITHM_TITLE": "Set HuskyLens algorithm to %1",
  "SIMFONIA_HUSKYLENS_SET_ALGORITHM_TOOLTIP": "Switches the active algorithm on the HuskyLens.",
  "SIMFONIA_HUSKYLENS_ALGORITHM_FACE_RECOGNITION": "Face Recognition",
  "SIMFONIA_HUSKYLENS_ALGORITHM_OBJECT_TRACKING": "Object Tracking",
  "SIMFONIA_HUSKYLENS_ALGORITHM_OBJECT_RECOGNITION": "Object Recognition",
  "SIMFONIA_HUSKYLENS_ALGORITHM_LINE_TRACKING": "Line Tracking",
  "SIMFONIA_HUSKYLENS_ALGORITHM_COLOR_RECOGNITION": "Color Recognition",
  "SIMFONIA_HUSKYLENS_ALGORITHM_TAG_RECOGNITION": "Tag Recognition",
  "SIMFONIA_HUSKYLENS_REQUEST_AND_CHECK_TITLE": "When HuskyLens has results",
  "SIMFONIA_HUSKYLENS_REQUEST_AND_CHECK_TOOLTIP": "Requests data from HuskyLens and loops through each detected result.",
  "SIMFONIA_HUSKYLENS_GET_RESULT_PROPERTY_TITLE": "Get %1 of current result",
  "SIMFONIA_HUSKYLENS_GET_RESULT_PROPERTY_TOOLTIP": "Gets a specific property of the current result within the loop.",
  "SIMFONIA_HUSKYLENS_PROPERTY_X_CENTER": "X Center",
  "SIMFONIA_HUSKYLENS_PROPERTY_Y_CENTER": "Y Center",
  "SIMFONIA_HUSKYLENS_PROPERTY_WIDTH": "Width",
  "SIMFONIA_HUSKYLENS_PROPERTY_HEIGHT": "Height",
  "SIMFONIA_HUSKYLENS_PROPERTY_ID": "ID",
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

  // DHT Sensor Block
  "SIMFONIA_DHT_READ_TITLE": "讀取 DHT",
  "SIMFONIA_DHT_ON_PIN": "於腳位",
  "SIMFONIA_DHT_READING": "讀取:",
  "SIMFONIA_DHT_READ_TOOLTIP": "從 DHT 感測器讀取溫度或濕度。需要安裝 Adafruit 的 'DHT sensor library' 函式庫。",
  "SIMFONIA_DHT_TYPE_11": "DHT11",
  "SIMFONIA_DHT_TYPE_22": "DHT22",
  "SIMFONIA_DHT_READING_TEMP": "溫度 (°C)",
  "SIMFONIA_DHT_READING_HUMIDITY": "濕度 (%)",

  // Huskylens Blocks
  "SIMFONIA_HUSKYLENS_CATEGORY": "Huskylens",
  "SIMFONIA_HUSKYLENS_INIT_TITLE": "初始化 HuskyLens (I2C)",
  "SIMFONIA_HUSKYLENS_INIT_TOOLTIP": "初始化 HuskyLens 感測器。必須放在 setup 中。需要安裝 DFRobot 的 'HUSKYLENS' 函式庫。",
  "SIMFONIA_HUSKYLENS_SET_ALGORITHM_TITLE": "設定 HuskyLens 演算法為 %1",
  "SIMFONIA_HUSKYLENS_SET_ALGORITHM_TOOLTIP": "切換 HuskyLens 當前運行的演算法。",
  "SIMFONIA_HUSKYLENS_ALGORITHM_FACE_RECOGNITION": "人臉辨識",
  "SIMFONIA_HUSKYLENS_ALGORITHM_OBJECT_TRACKING": "物體追蹤",
  "SIMFONIA_HUSKYLENS_ALGORITHM_OBJECT_RECOGNITION": "物體辨識",
  "SIMFONIA_HUSKYLENS_ALGORITHM_LINE_TRACKING": "巡線",
  "SIMFONIA_HUSKYLENS_ALGORITHM_COLOR_RECOGNITION": "顏色辨識",
  "SIMFONIA_HUSKYLENS_ALGORITHM_TAG_RECOGNITION": "標籤辨識",
  "SIMFONIA_HUSKYLENS_REQUEST_AND_CHECK_TITLE": "當 HuskyLens 偵測到結果時",
  "SIMFONIA_HUSKYLENS_REQUEST_AND_CHECK_TOOLTIP": "向 HuskyLens 請求數據，並遍歷所有偵測到的結果。",
  "SIMFONIA_HUSKYLENS_GET_RESULT_PROPERTY_TITLE": "取得當前結果的 %1",
  "SIMFONIA_HUSKYLENS_GET_RESULT_PROPERTY_TOOLTIP": "在迴圈中取得當前結果的指定屬性。",
  "SIMFONIA_HUSKYLENS_PROPERTY_X_CENTER": "X 中心點",
  "SIMFONIA_HUSKYLENS_PROPERTY_Y_CENTER": "Y 中心點",
  "SIMFONIA_HUSKYLENS_PROPERTY_WIDTH": "寬度",
  "SIMFONIA_HUSKYLENS_PROPERTY_HEIGHT": "高度",
  "SIMFONIA_HUSKYLENS_PROPERTY_ID": "ID",
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

  // DHT Sensor Block
  Blockly.Blocks['simfonia_dht_read'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.SIMFONIA_DHT_READ_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.SIMFONIA_DHT_TYPE_11, "DHT11"],
              [Blockly.Msg.SIMFONIA_DHT_TYPE_22, "DHT22"]
          ]), "DHT_TYPE");
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(Blockly.Msg.SIMFONIA_DHT_ON_PIN);
      this.appendDummyInput()
          .appendField(Blockly.Msg.SIMFONIA_DHT_READING)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.SIMFONIA_DHT_READING_TEMP, "TEMP"],
              [Blockly.Msg.SIMFONIA_DHT_READING_HUMIDITY, "HUMID"]
          ]), "READING_TYPE");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour("#70A8FF");
      this.setTooltip(Blockly.Msg.SIMFONIA_DHT_READ_TOOLTIP);
    }
  };

  // DHT Sensor Generator
  Blockly.Arduino.forBlock['simfonia_dht_read'] = function(block) {
    const readingType = block.getFieldValue('READING_TYPE');
    const pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    const dhtType = block.getFieldValue('DHT_TYPE');

    const dhtVarName = `dht_${pin}`;

    // Add include with comment
    Blockly.Arduino.includes_['dht'] = '#include <DHT.h> // Library: "DHT sensor library" by Adafruit';
    
    // Add global object definition
    Blockly.Arduino.global_vars_[`dht_${pin}`] = `DHT ${dhtVarName}(${pin}, ${dhtType});`;

    // Add setup code
    Blockly.Arduino.setups_[`dht_${pin}`] = `${dhtVarName}.begin();`;

    let code;
    if (readingType === 'TEMP') {
      code = `${dhtVarName}.readTemperature()`;
    } else if (readingType === 'HUMID') {
      code = `${dhtVarName}.readHumidity()`;
    }

    // Return the code and order
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  // --- HUSKYLENS BLOCKS ---

  // Init Block
  Blockly.Blocks['huskylens_init'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.SIMFONIA_HUSKYLENS_INIT_TITLE);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.SIMFONIA_HUSKYLENS_INIT_TOOLTIP);
    }
  };

  Blockly.Arduino.forBlock['huskylens_init'] = function(block) {
    Blockly.Arduino.includes_['huskylens'] = '#include "HUSKYLENS.h" // Library: "HUSKYLENS" by DFRobot';
    Blockly.Arduino.global_vars_['huskylens'] = 'HUSKYLENS huskylens;';
    Blockly.Arduino.setups_['huskylens_begin'] = 'huskylens.begin(Wire);';
    return '';
  };

  // Set Algorithm Block
  Blockly.Blocks['huskylens_set_algorithm'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.SIMFONIA_HUSKYLENS_SET_ALGORITHM_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.SIMFONIA_HUSKYLENS_ALGORITHM_FACE_RECOGNITION, "ALGORITHM_FACE_RECOGNITION"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_ALGORITHM_OBJECT_TRACKING, "ALGORITHM_OBJECT_TRACKING"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_ALGORITHM_OBJECT_RECOGNITION, "ALGORITHM_OBJECT_RECOGNITION"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_ALGORITHM_LINE_TRACKING, "ALGORITHM_LINE_TRACKING"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_ALGORITHM_COLOR_RECOGNITION, "ALGORITHM_COLOR_RECOGNITION"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_ALGORITHM_TAG_RECOGNITION, "ALGORITHM_TAG_RECOGNITION"]
          ]), "ALGORITHM");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.SIMFONIA_HUSKYLENS_SET_ALGORITHM_TOOLTIP);
    }
  };

  Blockly.Arduino.forBlock['huskylens_set_algorithm'] = function(block) {
    const algorithm = block.getFieldValue('ALGORITHM');
    return `huskylens.writeAlgorithm(${algorithm});\n`;
  };

  // Request and Check Block (Wrapper)
  Blockly.Blocks['huskylens_request_and_check'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.SIMFONIA_HUSKYLENS_REQUEST_AND_CHECK_TITLE);
      this.appendStatementInput("DO")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.SIMFONIA_HUSKYLENS_REQUEST_AND_CHECK_TOOLTIP);
    }
  };

  Blockly.Arduino.forBlock['huskylens_request_and_check'] = function(block) {
    const branch = Blockly.Arduino.statementToCode(block, 'DO');
    const code = `if (huskylens.request()) {\n  while (huskylens.available()) {\n    HUSKYLENSResult result = huskylens.read();\n${branch}  }\n}\n`;
    return code;
  };

  // Get Result Property Block
  Blockly.Blocks['huskylens_get_result_property'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.SIMFONIA_HUSKYLENS_GET_RESULT_PROPERTY_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.SIMFONIA_HUSKYLENS_PROPERTY_X_CENTER, "xCenter"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_PROPERTY_Y_CENTER, "yCenter"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_PROPERTY_WIDTH, "width"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_PROPERTY_HEIGHT, "height"],
              [Blockly.Msg.SIMFONIA_HUSKYLENS_PROPERTY_ID, "ID"]
          ]), "PROPERTY");
      this.setOutput(true, "Number");
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.SIMFONIA_HUSKYLENS_GET_RESULT_PROPERTY_TOOLTIP);
    }
  };

  Blockly.Arduino.forBlock['huskylens_get_result_property'] = function(block) {
    const property = block.getFieldValue('PROPERTY');
    const code = `result.${property}`;
    return [code, Blockly.Arduino.ORDER_MEMBER];
  };
}

export const toolbox = `
<xml>
<category name="Simfonia Sensors" colour="#70A8FF">
  <category name="Common" colour="#70A8FF">
    <block type="simfonia_ultrasonic_distance"></block>
    <block type="simfonia_dht_read"></block>
  </category>
  <category name="AI" colour="#8BC34A">
    <category name="Huskylens" colour="#8BC34A">
        <block type="huskylens_init"></block>
        <block type="huskylens_set_algorithm"></block>
        <block type="huskylens_request_and_check"></block>
        <block type="huskylens_get_result_property"></block>
    </category>
  </category>
</category>
</xml>
`;