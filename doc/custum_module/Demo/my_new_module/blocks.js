export function registerBlocks(Blockly) {
  // 範例積木: Hello World
  Blockly.Blocks['my_new_module_hello_world'] = {
    init: function() {
      this.jsonInit({
        "message0": "%{BKY_MY_NEW_MODULE_HELLO_WORLD_MESSAGE}",
        "args0": [
          {
            "type": "input_value",
            "name": "NAME",
            "check": "String",
            "shadow": {
              "type": "text",
              "fields": {
                "TEXT": "World"
              }
            }
          }
        ],
        "previousStatement": true, // 作為陳述式積木
        "nextStatement": true,     // 作為陳述式積木
        "colour": 160,             // 積木顏色 (色相值)
        "tooltip": "%{BKY_MY_NEW_MODULE_HELLO_WORLD_TOOLTIP}",
        "helpUrl": ""
      });
    }
  };

  // 範例積木: Get Current Time (返回值的積木)
  Blockly.Blocks['my_new_module_get_time'] = {
    init: function() {
      this.jsonInit({
        "message0": "%{BKY_MY_NEW_MODULE_GET_TIME_MESSAGE}",
        "output": "Number",       // 作為值積木，輸出一個數字
        "colour": 210,
        "tooltip": "%{BKY_MY_NEW_MODULE_GET_TIME_TOOLTIP}",
        "helpUrl": ""
      });
    }
  };
}