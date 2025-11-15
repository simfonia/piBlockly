// piblockly/media/user_modules/_core_hw_lib/generators.js

export function registerGenerators(Blockly) {
  // HC-SR04 Ultrasonic Distance Sensor Generator
  Blockly.Arduino.forBlock['simfonia_ultrasonic_distance'] = function(block) {
    const trigPin = Blockly.Arduino.valueToCode(block, 'TRIG_PIN', Blockly.Arduino.ORDER_ATOMIC);
    const echoPin = Blockly.Arduino.valueToCode(block, 'ECHO_PIN', Blockly.Arduino.ORDER_ATOMIC);

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
    const code = `${functionName}(${trigPin}, ${echoPin})`;
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  // DHT Sensor Generator
  Blockly.Arduino.forBlock['simfonia_dht_read'] = function(block) {
    const readingType = block.getFieldValue('READING_TYPE');
    const pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
    const dhtType = block.getFieldValue('DHT_TYPE');
    const dhtVarName = `dht_${pin}`;
    Blockly.Arduino.includes_['dht'] = '#include <DHT.h> // Library: "DHT sensor library" by Adafruit';
    Blockly.Arduino.global_vars_[`dht_${pin}`] = `DHT ${dhtVarName}(${pin}, ${dhtType});`;
    Blockly.Arduino.setups_[`dht_${pin}`] = `${dhtVarName}.begin();`;
    let code;
    if (readingType === 'TEMP') {
      code = `${dhtVarName}.readTemperature()`;
    } else if (readingType === 'HUMID') {
      code = `${dhtVarName}.readHumidity()`;
    }
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };

  // --- HUSKYLENS GENERATORS ---

  Blockly.Arduino.forBlock['huskylens_init'] = function(block) {
    Blockly.Arduino.includes_['huskylens'] = '#include "HUSKYLENS.h" // Library: "HUSKYLENS" by DFRobot';
    Blockly.Arduino.global_vars_['huskylens'] = 'HUSKYLENS huskylens;';
    Blockly.Arduino.setups_['huskylens_begin'] = 'huskylens.begin(Wire);';
    return '';
  };

  Blockly.Arduino.forBlock['huskylens_set_algorithm'] = function(block) {
    const algorithm = block.getFieldValue('ALGORITHM');
    return `huskylens.writeAlgorithm(${algorithm});\n`;
  };

  Blockly.Arduino.forBlock['huskylens_request_and_check'] = function(block) {
    const branch = Blockly.Arduino.statementToCode(block, 'DO');
    const code = `if (huskylens.request()) {\n  while (huskylens.available()) {\n    HUSKYLENSResult result = huskylens.read();\n${branch}  }\n}\n`;
    return code;
  };

  Blockly.Arduino.forBlock['huskylens_get_result_property'] = function(block) {
    const property = block.getFieldValue('PROPERTY');
    const code = `result.${property}`;
    return [code, Blockly.Arduino.ORDER_MEMBER];
  };
}
