# πBlockly 專案指南 (Cline AGENTS.md)

## 專案概述
πBlockly 是一個 VS Code 擴充功能，為 Arduino IDE 2 提供 Blockly 視覺化積木編輯器。它允許使用者透過拖拉積木的方式產生 Arduino C++ 程式碼，並與左側的程式碼編輯器實現雙向綁定。

## 技術規範

### 核心架構
- **目標平台**：VS Code Extension (VSIX)
- **目標語言**：Arduino C++ (.ino)
- **前端框架**：Blockly v12.3.1 + ES6 JavaScript
- **後端框架**：TypeScript + VS Code Extension API

### 影子積木規範 (Shadow Block Standards)
- **arduino_pin_shadow** 作為 Blockly 的陰影積木，其運作方式是：
  - 它為需要腳位輸入的積木（如 `arduino_pin_mode`、`arduino_digital_read` 等）提供預設、可編輯的文字輸入欄位。
  - 使用者可以直接在陰影積木的欄位中輸入腳位名稱或數字（例如 A0, 2, ~ 等）。
  - 如果使用者需要更複雜的腳位來源（例如變數、運算結果等），他們可以直接拖曳其他積木到陰影積木的位置，陰影積木就會被替換掉。
  - 在 `arduino.js` 中定義時，其 `setOutput(true, ["Number", "String"])` 與 toolbox.xml 中使用它的父積木（例如 `arduino_pin_mode` 的 `check: ["Number", "String"]`）的輸入檢查類型相符，確保了相容性。

### 產生器註冊規範 (Generator Registration)
- 註冊 generator 要使用 `Blockly.Arduino.forBlock[]`
- 範例：
  ```javascript
  Blockly.Arduino.forBlock['arduino_pin_mode'] = function(block) {
    var pin = Blockly.Arduino.valueToCode(block, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var mode = Blockly.Arduino.valueToCode(block, 'MODE', Blockly.Arduino.ORDER_ATOMIC) || 'OUTPUT';
    Blockly.Arduino.setups_['pin_mode_' + pin] = 'pinMode(' + pin + ', ' + mode + ');';
    return '';
  };
  ```

### 程式碼籃子架構 (Code Buckets Architecture)
- 採用多個專用「程式碼籃子」，確保生成的 C++ 程式碼永遠符合編譯要求，且與積木在工作區的擺放順序無關。
- 程式碼籃子定義於 `media/generators/_core.js`：
  - `includes_`：存放 `#include <...>` 語句
  - `macros_`：存放 `#define` 等預處理器宏
  - `global_vars_`：存放所有全域變數和 `const` 常數宣告
  - `definitions_`：通用定義區，用於存放無法自動分類的內容
  - `function_prototypes_`：存放函式原型 (e.g., `void myFunction(int arg);`)
  - `function_definitions_`：存放函式的完整實作
  - `setups_`：存放 `void setup() { ... }` 內的程式碼
- 最終程式碼組合順序由 `Blockly.Arduino.finish` 函數控制

### 轉義字元與換行處理規範 (Critical)
當處理 Blockly 產生器 (.js) 與產出的 Arduino 程式碼 (.ino) 時，必須嚴格遵守以下規範：

1. **產生器 JS 中的字串與換行**：
   - **實體換行禁止**：在單引號 `'` 或雙引號 `"` 定義的字串中，絕對禁止出現實體換行。若需換行，必須寫成 `\\n` (透過工具寫入時) 或 `\n` (執行時)。
   - **模板字串**：在 JS 中使用反引號 `` ` `` (Template Literals) 時，可以使用實體換行，這在注入長篇類別與函式時最為安全。

2. **程式碼產出規範**：
   - **程式碼換行**：產生器 `return` 的字串中，若要讓生成的 `.ino` 檔案換行，請在字串結尾加上 `\n`。
   - **正規表達式**：在程式碼中使用的反斜線（如 `split("\\+")`），在產生器 JS 中必須寫成 `\\` (雙重轉義)。

3. **三層字串意識**：
   - 第一層：Cline AI Prompt。
   - 第二層：磁碟上的 `.js` 檔案。
   - 第三層：`.js` 執行後 `return` 給 Blockly 的字串（最終變為 `.ino`）。
   - 確保 `\n` 符號能在第二層保持為字面量，直到第三層才變為真正的換行符。

## 開發慣例

### 積木與產生器模組化
- 積木定義位於 `media/blocks/` 目錄
- 程式碼產生器位於 `media/generators/` 目錄
- 每個模組獨立檔案，並透過 `core_extension_manifest.json` 進行載入管理

### 代碼風格
- **Extension**: TypeScript (嚿 strict 模式)
- **Webview**: ES6 JavaScript (使用模組化 import/export)

### 雙風格主題系統
- **Engineer 風格**：技術專業風格，顯示 C/C++ 語法
- **Angel 風格**：友好教學風格，使用中文描述
- 主題切換由 `main.js` 中的 `applyStyle()` 函式處理
- 語言檔案 (`zh-hant.js`, `en.js`) 包含兩種風格的鍵值

### 動態模組載入
- 支援三種模組來源：
  1. 本地核心模組 (`core_extension_manifest.json`)
  2. 遠端硬體模組 (GitHub Pages: `https://simfonia.github.io/piBlockly-modules/`)
  3. 使用者自訂模組 (`user_modules_config.json`)
- 模組可為單檔或目錄形式
- 目錄模組需包含 `blocks.js`, `generators.js`, `toolbox.xml`, `en.js`, `zh-hant.js`

## 重要路徑
- **模組載入清單**：`media/core_extension_manifest.json`
- **使用者模組配置**：`media/user_modules/user_modules_config.json`
- **工具箱配置**：`media/toolbox.xml`
- **語言檔案**：`media/zh-hant.js`, `media/en.js`
- **前端主程式**：`media/main.js`
- **後端主程式**：`src/extension.ts`

## 日誌與備份保護原則
- **日誌追加保護 (Append-Only)**：異動需記錄於 `log/work/yyyy-mm-dd.md` 與 `log/todo.md`。處理 `log/` 下的檔案時，**嚴禁**使用覆寫，必須先讀取全文，將新內容串接在舊內容之後再寫入，不得刪除歷史紀錄。
- **覆寫前置備份**：如果因結構重整必須使用 `write_file` 覆寫任何檔案，**必須先備份**原檔到 `backup/` 資料夾，檔名加入時間戳記 (yyyyMMdd_HHmmss)。

## 工作流規範
1. **啟動 piBlockly**：偵測現有的 .ino 檔當程式產生視窗，點擊 .ino 頁籤上的 πBlockly 按鈕，先詢問是否覆蓋原 .ino 檔，再對話框詢問開檔方式及檔名，開新檔或舊檔都是指 .xml 積木檔。
2. **檔案開啟後**：將現有的 .ino 檔置於左方面板，右方面板是積木編輯區，左右面板綁定，編輯積木會反應到綁定的 .ino 上。
3. **儲存**：當使用者在積木面板中點擊「儲存積木」時，積木會被自動儲存到指定的 .xml 檔案中。不要主動對 .ino 存檔，由使用者自行決定。
4. **關閉**：若偵測到綁定的 .ino 頁被使用者關閉，但此時積木編輯窗未關閉，則一起關閉。若積木為髒，對話框詢問存檔。