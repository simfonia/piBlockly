# 如何在 piBlockly 中建立自訂積木模組

本教學將引導您如何在 `piblockly/media/user_modules/` 目錄下建立一個自訂的 Blockly 積木模組。這將允許您擴展 piBlockly 的功能，添加自己的積木和程式碼產生器。

## 1. 簡介

piBlockly 支援透過模組化的方式擴展其積木庫。您可以將相關的積木、其程式碼產生邏輯、工具箱配置和多語言翻譯組織成一個獨立的模組。本教學將建立一個名為 `my_new_module` 的範例模組。

## 2. 先決條件

*   對 JavaScript 語言有基本了解。
*   對 XML 結構有基本了解。
*   對 Blockly 的積木概念（例如，陳述式積木、值積木、輸入、欄位）有基本了解。

## 3. 模組檔案結構

每個自訂模組都應有自己的資料夾，並置於 `piblockly/media/user_modules/` 底下，其中包含以下核心檔案。

本教學提供的範例模組位於 `piblockly/doc/custum_module/Demo/my_new_module/`。您可以複製此範例模組到您自己的 `piblockly/media/user_modules/` 資料夾下，並加以修改。

一個範例模組資料夾 `my_new_module/` 的結構如下：

```
my_new_module/
    ├── blocks.js       # 定義積木的外觀和行為
    ├── generators.js   # 定義積木如何產生程式碼
    ├── toolbox.xml     # 定義此模組積木在工具箱中的顯示
    ├── en.js           # 英文語言檔
    └── zh-hant.js      # 繁體中文語言檔
```

## 4. 逐步指南

### 步驟 1: 建立您的模組資料夾

首先，在 `piblockly/media/user_modules/` 路徑下建立一個新的資料夾，例如 `my_new_module`。

### 步驟 2: 定義積木 (`blocks.js`)

`blocks.js` 用於定義積木在 Blockly 工作區中的外觀、輸入和基本行為。

在 `piblockly/media/user_modules/my_new_module/blocks.js` 中填入以下內容：

```javascript
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
```

*   `export function registerBlocks(Blockly)`: 這是模組的入口點，Blockly 會呼叫此函數來註冊您的積木。
*   `Blockly.Blocks['your_block_type']`: 定義一個新積木，`your_block_type` 應該是唯一的識別碼，建議使用模組資料夾名稱當命名空間，然後作為前綴詞。
*   `init: function()`: 每個積木的初始化函數。
*   `this.jsonInit({...})`: 使用 JSON 物件來配置積木。
    *   `message0`: 定義積木的顯示文字和輸入。`%{BKY_...}` 是語言檔中的鍵。
    *   `args0`: 定義積木的輸入欄位。
        *   `type: "input_value"`: 連接其他積木的輸入。
        *   `name: "NAME"`: 輸入的內部名稱。
        *   `check: "String"`: 接受的資料類型。
        *   `shadow`: 預設的陰影積木。
    *   `previousStatement`/`nextStatement`: 如果是陳述式積木（可以串接多個動作），則設為 `true`。
    *   `output`: 如果是值積木（會回傳一個值），則指定回傳的類型。
    *   `colour`: 積木的顏色，使用 HSL 色相值 (0-360)。
    *   `tooltip`: 積木的提示文字。
    *   `helpUrl`: 幫助文件的 URL。

### 步驟 3: 定義產生器 (`generators.js`)

`generators.js` 用於定義積木如何被轉換為目標程式碼（例如 Arduino C++）。

在 `piblockly/media/user_modules/my_new_module/generators.js` 中填入以下內容：

```javascript
export function registerGenerators(Blockly) {
  // Hello World 積木的程式碼產生器
  Blockly.Arduino.forBlock['my_new_module_hello_world'] = function(block) {
    const name = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '""';
    // 引入 Serial 依賴
    Blockly.Arduino.setups_['setup_serial'] = 'Serial.begin(9600);';
    // 產生程式碼
    const code = `Serial.println("Hello, " + ${name} + "!");\n`;
    return code;
  };

  // Get Current Time 積木的程式碼產生器
  Blockly.Arduino.forBlock['my_new_module_get_time'] = function(block) {
    // 引入 millis() 函數的依賴 (如果需要，通常在 Arduino 核心中已有)
    // 產生程式碼
    const code = `millis()`;
    return [code, Blockly.Arduino.ORDER_ATOMIC]; // 返回值和運算優先級
  };
}
```

*   `export function registerGenerators(Blockly)`: 這是模組程式碼產生器的入口點。
*   `Blockly.Arduino.forBlock['your_block_type']`: 定義特定積木的程式碼產生邏輯。
*   `Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC)`: 從輸入連線獲取值，並將其轉換為程式碼。
*   `Blockly.Arduino.setups_['setup_serial'] = 'Serial.begin(9600);';`: 將設定程式碼添加到 Arduino `setup()` 函數中。
*   `return code;`: 對於陳述式積木，直接返回產生的程式碼。
*   `return [code, Blockly.Arduino.ORDER_ATOMIC];`: 對於值積木，返回一個陣列，包含程式碼和其運算優先級。

### 步驟 4: 建立工具箱 XML (`toolbox.xml`)

`toolbox.xml` 定義了您的積木將如何在 Blockly 工具箱中顯示。

在 `piblockly/media/user_modules/my_new_module/toolbox.xml` 中填入以下內容：

```xml
<xml>
  <category name="%{BKY_MY_NEW_MODULE_CATEGORY}" colour="160">
    <block type="my_new_module_hello_world"></block>
    <block type="my_new_module_get_time"></block>
  </category>
</xml>
```

*   `<category name="%{BKY_MY_NEW_MODULE_CATEGORY}" colour="160">`: 定義一個新的積木類別。`name` 屬性也使用語言鍵，`colour` 應該與 `blocks.js` 中積木的顏色保持一致。
*   `<block type="your_block_type"></block>`: 在此類別中添加一個積木。

### 步驟 5: 添加語言支援 (`en.js`, `zh-hant.js`)

這些檔案為您的積木提供多語言文字和工具提示。

在 `piblockly/media/user_modules/my_new_module/en.js` 中填入以下內容：

```javascript
export const MSG_MY_NEW_MODULE_EN = {
  // Category Name
  "MY_NEW_MODULE_CATEGORY": "My New Module",

  // Hello World Block
  "MY_NEW_MODULE_HELLO_WORLD_MESSAGE": "Hello, %1 !",
  "MY_NEW_MODULE_HELLO_WORLD_TOOLTIP": "Prints a 'Hello, [Name]!' message to Serial.",

  // Get Current Time Block
  "MY_NEW_MODULE_GET_TIME_MESSAGE": "get current uptime (ms)",
  "MY_NEW_MODULE_GET_TIME_TOOLTIP": "Returns the number of milliseconds since the board began running the current program.",
};
```

在 `piblockly/media/user_modules/my_new_module/zh-hant.js` 中填入以下內容：

```javascript
export const MSG_MY_NEW_MODULE_ZH_HANT = {
  // 類別名稱
  "MY_NEW_MODULE_CATEGORY": "我的新模組",

  // Hello World 積木
  "MY_NEW_MODULE_HELLO_WORLD_MESSAGE": "哈囉，%1 !",
  "MY_NEW_MODULE_HELLO_WORLD_TOOLTIP": "向序列埠印出 '哈囉，[名稱]!' 訊息。",

  // Get Current Time 積木
  "MY_NEW_MODULE_GET_TIME_MESSAGE": "取得目前運行時間 (毫秒)",
  "MY_NEW_MODULE_GET_TIME_TOOLTIP": "回傳板子自程式啟動以來的毫秒數。",
};
```

*   `export const MSG_YOURMODULE_EN = { ... };`: 定義一個常數物件來包含所有語言鍵值對。
*   `MY_NEW_MODULE_CATEGORY`: 工具箱類別名稱。
*   `MY_NEW_MODULE_HELLO_WORLD_MESSAGE`: 積木的顯示文字。
*   `MY_NEW_MODULE_HELLO_WORLD_TOOLTIP`: 積木的提示文字。

### 步驟 6: 註冊您的模組 (`user_modules_config.json`)

當您在 `piblockly/media/user_modules/` 下建立好自己的模組資料夾後，您需要編輯 `piblockly/media/user_modules/user_modules_config.json` 檔案來註冊它，讓 piBlockly 能夠載入您的模組。

例如，如果您複製了範例模組並命名為 `my_custom_block_set/`，則 `user_modules_config.json` 會看起來像這樣：

```json
{
  "modules": [
    {
      "name": "我的自訂積木組",
      "url": "./my_custom_block_set/"
    }
  ]
}
```

*   `name`: 模組的顯示名稱。
*   `url`: 模組資料夾的路徑，**相對於 `piblockly/media/user_modules/` 資料夾**。請務必在路徑末尾加上 `/`。

## 5. 重要注意事項

*   **重新載入 VS Code 視窗：** 在您對任何模組檔案進行更改後，請務必重新載入 VS Code 視窗（透過命令面板 `Ctrl+Shift+P` 並輸入 `Reload Window`），以使更改生效。
*   **偵錯：** 如果您的積木沒有出現或行為不正確，請檢查 VS Code 的開發者工具控制台（Help -> Toggle Developer Tools）是否有錯誤訊息。
*   **命名慣例：** 建議使用模組名稱作為積木類型的前綴（例如 `my_new_module_hello_world`），以避免與其他模組的積木發生衝突。
*   **語言鍵：** `blocks.js` 中的 `message0` 和 `tooltip` 屬性中的 `%{BKY_...}` 鍵必須與您的語言檔中的定義完全匹配。

按照這些步驟，您應該能夠成功建立並載入您的第一個自訂 Blockly 積木模組！
