# πBlockly專案任務說明

## 概述
  - 本專案是在VS Code上開發一個Blockly延伸套件:πBlockly，以做為Arduino程式開發:
  - 本專案有二個子專案：
    * piBlockly (核心，在 @piblockly/ 資料夾)
    * piBlockly-modules (雲端擴充積木模組，在 @piBlockly-modules/ 資料夾)
  - 開發環境
      * Windows 11
      * VS Code v1.107.1
      * node.js v24.12.0
      * Blockly v12.3.1
      * Arduino IDE v2.3


## 技術規範
  - 若要加入 `arduino_pin_shadow`，請務必遵循以下流程：
    arduino_pin_shadow 作為 Blockly 的陰影積木，其運作方式是：
    * 它為需要腳位輸入的積木（如 arduino_pin_mode、arduino_digital_read等）提供一個預設的、可編輯的文字輸入欄位。
    * 使用者可以直接在陰影積木的欄位中輸入腳位名稱或數字（例如 A0, 2, ~ 等）。
    * 如果使用者需要更複雜的腳位來源（例如變數、運算結果等），他們可以直接拖曳其他積木到陰影積木的位置，陰影積木就會被替換掉。
    * 在 arduino.js 中定義的 arduino_pin_shadow 積木本身，其 setOutput(true, ["Number", "String"]) 與toolbox.xml 中使用它的父積木（例如 arduino_pin_mode 的 check: ["Number", "String"]）的輸入檢查類型相符，確保了相容性。

  - 註冊 generator 要使用 Blockly.Arduino.forBlock[]

## 任務清單:
[x] 1. 建立專案架構
[x] 2. 完成介面並可以正常產生程式碼
  [x] 2-1 將piBlockly顯示在右半部
  [x] 2-2 toolbox中列出基本積木
  [x] 2-3 產生程式碼到左方編輯區的動作可以正常運作
[x] 3. 排列toolbox中積木的順序
        Arduino
          Structure: setup, loop
          IO: pin, mode, digitalRead, digitalWrite, analogRead, analogWrite
          Time: delay, delayMicroseconds, millis, micros, 
          Serial: begin, println, print, available, read
        πCar
        Coding
        ----
        Logic
        Loops
        Math
        Text
        ---
        Variables
        Array
        Functions
[x] 4. 建立piBlockly的啟動按鈕      
[x] 5. 完成所有積木語法產生，工作清單: porting_checklist.md
  [x] 5-1. 完成 constrain, map, tone 積木的實作
[x] 6. 處理孤兒積木
[x] 7. 完善工作流：堅守「.xml 是源頭，.ino 只是產物」的核心原則。
    * 啟動與開檔：
      [x] 啟動piBlockly：偵測以現有的ino檔當程式產生視窗，點擊ino頁籤上的 πBlockly 按鈕(以下稱pi鈕)，先詢問是否覆蓋原ino檔，再對話框詢問開檔方式及檔名，開新檔或舊檔都是指xml積木檔。
      [x] 檔案開啟後，將現有的ino檔置於左方面板，右方面板是積木編輯區，左右面板綁定，編輯積木會反應到綁定的ino上。
      [x] 此時pi鈕變暗(或隱藏)失效，不讓使用者開第二個積木編輯視窗，同時只能處理一個積木檔。 
    * 儲存：
      [x] 當使用者在 積木面板 中點擊「儲存積木」時，積木會被自動儲存到指定的 xml 檔案中。
      [x] 當使用者在 積木面板 中點擊「另存積木」時，積木會被另命名存到指定的 xml 檔案中。
      [x] 不要主動對 ino 存檔，由使用者自行決定。
    * 關閉：
      [x] 若偵測到綁定的ino頁被使用者關閉，但此時積木編輯窗未關閉，則一起關閉
        [x] 若積木為髒，對話框詢問存檔，存檔或不存檔都沒問題，但取消時ino已消失，所以留下的積木被遮罩也無法編輯，此bug尚未解決。
      * 若偵測到綁定的積木檔要被關閉：
        [x] 若積木檔不為髒，直接關閉積木面板，此時若畫面有pi鈕，則回到生效狀態，流程重頭來。
        [x] 若積木檔為髒，提醒使用者存檔、不存檔或取消：
          [x] 存檔：存檔後關閉積木面板及綁定的 ino 面板，此時若畫面有pi鈕，則回到生效狀態，流程重頭來。
          [x] 不存檔：關閉積木面板及綁定的 ino 面板，此時若畫面有pi鈕，則回到生效狀態，流程重頭來。
          [x] 取消：取消關閉動作。
    * 面板切換：
      [x] 當被綁定的 `.ino` 程式碼編輯器在畫面上看不見時(例如被其他分頁蓋住，或使用者切換到其他編輯器群組)，piBlockly 的積木編輯區需要加上遮罩。
[x] 8. 重構picar_init:
      * picar_init是我為了要控制一個客製化的小車子所需的全域變數及函式，當時沒想太多就偷懶全部包在一起來使用。
      * 如果要重構，在picar中的所有自訂積木要統一考量，讓這些積木要用到時，才去生成全域變數與相關函式
[x] 9. 清理、整理程式碼、排序、註解
[x] 10. 更新程式碼生成架構說明 (Code Generation Architecture Update)
    *   **目的**：解決全域變數、函式定義與函式原型之間宣告順序問題，確保生成的 C++ 程式碼永遠符合編譯要求，且與積木在工作區的擺放順序無關。
    *   **核心概念**：引入多個專用「程式碼籃子 (Code Buckets)」，並在最終組合時嚴格按照 C++ 語法結構輸出。
    *   **新的程式碼籃子 (Blockly.Arduino.xxx_)**：
        *   `includes_`：存放 `#include <...> ` 語句。
        *   `macros_`：存放 `#define` 等預處理器宏。
        *   `global_vars_`：存放所有全域變數和 `const` 常數宣告。
        *   `definitions_`：通用定義區，用於存放無法自動分類的內容 (例如 `coding_raw_definition` 積木生成的完整 class 定義)。
        *   `function_prototypes_`：存放函式原型 (e.g., `void myFunction(int arg);`)。
        *   `function_definitions_`：存放函式的完整實作 (e.g., `void myFunction(int arg) { ... }`)。
        *   `setups_`：存放 `void setup() { ... }` 內的程式碼。
    *   **最終程式碼組合順序 (由 `Blockly.Arduino.finish` 函數控制)**：
        1.  `includes_`
        2.  `macros_`
        3.  `global_vars_`
        4.  `definitions_`
        5.  `function_prototypes_`
        6.  `function_definitions_`
        7.  `void setup() { ... }`
        8.  `void loop() { ... }`
    *   **積木生成器調整**：
        *   `variables_declare_global` 積木：將其生成的程式碼放入 `global_vars_` 籃子。
        *   `custom_functions_def...` (函式定義) 積木：將其輸出拆分為函式原型 (放入 `function_prototypes_`) 和函式實作 (放入 `function_definitions_`)。
        *   piBot 相關積木：所有 `#include` 語句現在都應放入 `includes_` 籃子。
    *   **建議**：對於簡單的全域變數或常數，應優先使用「宣告全域變數」積木，以確保其在正確位置生成。`coding_raw_definition` 積木應保留給更複雜、自包含的定義。
[X] 11. 動態載入與風格切換的整合實作
    *   **問題分析**：「動態載入積木」與「切換積木風格」兩個功能存在架構上的衝突。若獨立開發，會導致外部載入的積木無法適應風格切換（包含文字與顏色），造成 UI 不一致。
    *   **解決方案**：必須先建立一套支援多風格的擴充積木規範。外部積木包 (`.js` 檔) 必須提供不同風格的文字資源，並使用語意化的樣式名稱（而非寫死的顏色代碼）。
    *   **實作順序**：建議優先實作「切換積木風格」功能，並在過程中建立好這套規範。然後再基於此規範開發「動態載入積木」功能，以確保兩者完美相容。
  [X] * 切換積木風格(engineer <-> Angel)
  [X] * 第三方擴充積木可以由網頁動態載入 (參考 piblockly/work/3rd blocks.log)

[X] 12. 擴充硬體積木模組
        * 請讀取 @piblockly/media/user_modules/_piblockly_hw_lib/port.log
        * 所有積木訊息文字以%1佔位符的方式表達，如ultrasonic積木一般。這表示積木定義中的標籤和輸入欄位應該使用 jsonInit 中的 message0 和 args0屬性，並以 %1 格式的佔位符來代替直接的文字或 appendField。
        * 所有積木內的欄位在toolbox.xml中放入一個預設影子積木，若該影子積木與pin有關，核心 @piblockly/media/toolbox.xml中就有一個arduino_pin_shadow積木可以用。
[X] 13. 實作使用者自訂模組與非核心雲端模組
      [X] 本地端自訂積木模組(相關文件在 doc/custum_module)
      [X] 雲端模組，將piblockly_hw_blocks放到github pages上
[X] 14. 更新通知
[ ] 15. 允許使用者將其開發的 `user_modules` 部署到 GitHub Pages
[ ] 16. 快取雲端模組可離線使用
[ ] 17. 一些改進:
        [X] 1. piCar中的播放旋律積木不利於長旋律編輯，需提供一個更好的積木。
        [?] 2. 在 Hardware toolbox 中，提供 library 下載連結 (Webview不允許，可能比較複雜)
[ ] 18. 實作「自訂模組編輯器」UI (Custom Module Editor UI)
    *   **目標**：提供一個圖形化介面，讓使用者無需手動撰寫程式碼，即可建立、修改和管理包含多個積木的自訂模組。
    *   **階段一：模組編輯器 UI**
        *   **指令**：新增 VS Code 指令 `piBlockly: Create New Block Module`。
        *   **介面**：開啟一個新的 Webview 面板作為模組編輯器。
        *   **模組管理**：
            *   主面板用於定義模組名稱 (e.g., "My Grove Sensors")。
            *   提供列表顯示模組內所有積木，支援新增、移除、選擇積木進行編輯。
        *   **積木編輯**：
            *   表單顯示選定積木的詳細屬性：積木名稱、顏色、文字、輸入、欄位、連接點、程式碼生成邏輯等。
        *   **雙風格支援**：
            *   積木編輯表單包含「啟用 Angel 風格」核取方塊。
            *   若勾選，提供獨立的 Angel 風風格顏色和文字設定欄位。
            *   生成的語言檔案 (`en.js`, `zh-hant.js`) 將包含兩種風格的鍵值。
    *   **階段二：模組的修改與偵錯機制**
        *   **中繼資料檔案**：儲存模組時，額外產生 `module_meta.json` 檔案，儲存 UI 表單的所有設定。
        *   **編輯指令**：新增 `piBlockly: Edit Custom Block Module` 指令，讓使用者選擇現有模組進行編輯。
        *   **UI 還原**：編輯器讀取 `module_meta.json`，完美還原 UI 介面設定。
    *   **階段三：檔案產生與儲存**
        *   **檔案生成**：根據 UI 設定，生成 `blocks.js`, `generators.js`, `toolbox.xml`, `en.js`, `zh-hant.js` 的內容。
        *   **多積木處理**：`blocks.js` 和 `generators.js` 將包含模組內所有積木的定義。
        *   **工具箱結構**：`toolbox.xml` 將生成一個以模組命名的單一分類，包含所有積木。
        *   **後端儲存**：VS Code 延伸套件後端接收資料，建立模組資料夾，並儲存所有生成的檔案。
    *   **階段四：自動重新載入**
        *   **manifest 更新**：後端自動更新 `manifest.json`，加入新模組的資訊。
        *   **編輯器重載**：觸發 piBlockly 編輯器重新載入，使新模組或修改立即生效。
[*] 19. Webview安全性策略問題檢查(allow-scripts and allow-same-origin )
  [*] 立即從 img-src 中移除 https:，因為它的風險最高且可能非必要。
  [*] 考慮將所有內聯樣式移至 .css 檔案，並從 style-src 中移除 'unsafe-inline'。(Blockly需要，無法移除)
  [*] 移除 script-src 中的 blob。

未來規畫：
[X] * extension 對話框 i18n
[ ] * 使用VS Code Custom Editor API 打造 webview, 以處理面板關閉事件(https://vscode.com.tw/api/extension-guides/custom-editors)
[?] - 畫面分割成1:2 (VS code 目前不支援API，作罷。)