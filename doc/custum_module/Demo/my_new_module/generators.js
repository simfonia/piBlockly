export function registerGenerators(Blockly) {
  // Hello World 積木的程式碼產生器
  Blockly.Arduino.forBlock['my_new_module_hello_world'] = function(block) {
    const name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '""';
    // 引入 Serial 依賴
    Blockly.Arduino.setups_['setup_serial'] = 'Serial.begin(9600);';
    // 產生程式碼
    const code = `Serial.println("Hello, " + ${name} + "!")\n`;
    return code;
  };

  // Get Current Time 積木的程式碼產生器
  Blockly.Arduino.forBlock['my_new_module_get_time'] = function(block) {
    // 引入 millis() 函數的依賴 (如果需要，通常在 Arduino 核心中已有)
    // 產生程式碼
    const code = `millis()`
    return [code, Blockly.Arduino.ORDER_ATOMIC]; // 返回值和運算優先級
  };
}