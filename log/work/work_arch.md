工作日誌 (piblockly/work.log)


  日期： 2025年10月18日

  孤兒積木處理與系統優化

  已完成事項：
   * 實現孤兒積木失效邏輯：
       * 在 main.js 中建立了 updateOrphanBlocks 函式，用於處理未連接到根積木（如 setup, loop）的孤兒積木。
       * 經歷多次迭代，最終的邏輯為：在工作區發生變動時，先啟用所有積木，再找出真正的孤兒積木（不被允許的頂層
         積木），並明確地將其本身及其所有子積木都設為停用狀態。

   * 修正 `variables_declare` 積木的根積木規則：
       * 更新了 updateOrphanBlocks 函式，增加了對 variables_declare 積木的特殊判斷。
       * 現在只有當其 SCOPE 欄位為 GLOBAL 時，它才能作為一個合法的根積木存在；若為
         LOCAL，則會被視為孤兒積木而失效。

   * 修正「定義型」積木的連接點問題：
       * 為了解決全域定義積木下方可拼接陳述句積木的邏輯問題，修改了 blocks.js 中的積木定義。
       * `variables_declare`：改為動態形狀，當 SCOPE 為 GLOBAL 時，透過 onchange 事件監聽，以程式碼
         setNextStatement(false) 移除下方接點。
       * `coding_raw_definition`：發現 jsonInit 中使用 "nextStatement": null 無法移除接點，最終透過完全刪除
         `nextStatement` 屬性的方式成功解決了問題。

   * 修正 `coding` 積木的根積木規則：
       * 根據您的最終決策，將 coding_raw_statement 與 coding_raw_wrapper
         從允許的根積木清單中移除，它們現在必須依附於其他積木才能生效。

  解決的重大問題：
   * 修正了無限迴圈導致的系統崩潰：
       * 問題原因：updateOrphanBlocks
         函式會回應「積木改變」事件，但其自身的「停用/啟用」操作又會觸發此事件，導致無限迴圈。
       * 解決方案：修改了 main.js 中的事件監聽器，讓它明確忽略由 disabled
         狀態改變所觸發的事件，從而斬斷了迴圈。

   * 診斷並解決了 `blocks.js` 修改不生效的頑固快取問題：
       * 透過將檔案重新命名 (blocks.js -> blocks_new.js)，確認了問題並非 Webpack 打包或 nonce
         快取清除失敗，而是與檔案本身有關。
       * 在重新命名過程中發現了全形/半形底線的打字錯誤，修正後成功載入新檔案。
       * 最終確認 replace 工具的修改是成功的，但 Blockly 對 jsonInit 中 nextStatement: null
         的解析行為不如預期，必須直接刪除該屬性才能解決問題。


  日期：2025年10月18日

  已完成事項：
   * 修正 Functions 積木的程式碼產生器： 解決了 custom_procedures_defnoreturn 和 custom_procedures_defreturn
     積木在 custom_generator.js 中因換行符逸出問題導致的「Unterminated string literal」錯誤。
   * 新增手動呼叫函式積木： 根據使用者需求，在 toolbox.xml 中新增了 custom_procedures_callnoreturn_manual 和
     custom_procedures_callreturn_manual 積木。
   * 定義手動呼叫函式積木的外觀與行為： 在 media/custom/blocks.js 中定義了
     custom_procedures_callnoreturn_manual 和 custom_procedures_callreturn_manual
     積木，包括函數名稱輸入欄位和參數變異器。
   * 定義手動呼叫函式積木的程式碼產生器： 在 media/custom/custom_generator.js 中定義了
     custom_procedures_callnoreturn_manual 和 custom_procedures_callreturn_manual
     積木的程式碼產生器，使其能正確生成 C++ 函數呼叫。

  討論與解決方案：
   * Functions 積木呼叫問題： 由於 Blockly 預設的 Blockly.Procedures.flyoutCategory
     可能與自訂程序積木不完全相容，且動態生成呼叫積木較為複雜，因此改為提供手動輸入函數名稱的呼叫積木。
   * VSIX 版本更新問題： 說明了 VSIX 版本號碼由 package.json 控制，並提供了更新 VSIX
     的正確步驟（解除安裝舊版、重啟 IDE、安裝新版、再次重啟 IDE）。
   * Blockly 數學函數與 Arduino 相容性： 解釋了 Blockly 的數學函數積木在 Arduino (C++)
     環境中大多可以直接使用，但需注意資料型別和資源限制。


日期： 2025年10月17日
  錯誤訊息：
  第一個積木拉進時，在覆寫警告視窗按yes確定覆蓋時:
  Tried to start the same gesture twice.

  問題分析：
  這個錯誤的根源在於：
   1. 當您拖曳積木時，Blockly 內部會啟動一個「手勢 (gesture)」。
   2. 拖曳積木的動作觸發了 updateCode 事件，進而彈出了「覆寫確認」對話框。
   3. 這個對話框是模態的，它會暫停所有 UI 互動。
   4. 當您點擊「是」關閉對話框後，Blockly
      的手勢系統可能因為被中斷而混亂，導致它嘗試重新啟動一個已經在進行中的手勢，從而拋出錯誤。

  解決方案：
  最直接的解決方法是，在拖曳積木的過程中，不要觸發 `updateCode` 事件。

  Blockly 提供了 workspace.isDragging() 這個方法來判斷目前是否有拖曳手勢正在進行。我將修改 main.js 中的
  updateCode 函式，在發送 updateCode 訊息之前，先檢查 workspace.isDragging()。如果正在拖曳，就暫時不發送更新
  訊息。這樣可以避免對話框在不恰當的時機彈出，干擾手勢。

  
   * 問題描述：Tried to start the same gesture twice 錯誤及積木跳移現象。
   * 根本原因：
       1. Blockly API 變更 (Blockly.Mutator -> Blockly.icons.MutatorIcon)。
       2. validateName_ 函式過早觸發 Blockly.Procedures.rename 導致事件衝突。
       3. domToMutation 函式中錯誤呼叫 Blockly.Procedures.mutateCallers。
       4. Webview 初始化流程與使用者操作之間的競爭條件。
   * 解決方案：
       1. 更新 Blockly.Mutator 的使用方式。
       2. 從 domToMutation 中移除 Blockly.Procedures.mutateCallers 呼叫。
       3. 在 updateCode 函式中加入 workspace.isDragging() 檢查。
       4. 重新設計 Webview 初始化流程，確保 shouldConfirmOverwrite 旗標的正確傳遞與使用。
   * 其他修正：
       * TypeError: Blockly.Xml.textToDom is not a function 的修正。
       * ReferenceError: Cannot access 'shouldConfirmOverwrite' before initialization 的修正。
       * 「無回傳值」函式積木外觀問題的修正。


日期： 2025年10月16日

已完成事項：
*   **實現有型別變數系統**：為了解決 C++ 強型別語言的需求，建立了全新的變數宣告與管理機制。
*   **新增 `variables_declare` 積木**：建立了一個新的積木，允許使用者定義變數的型別（如 `int`, `String`）和作用域（全域/區域）。
*   **修改工具箱**：將「變數」類別改為靜態，移除了 Blockly 原生的「建立變數」按鈕，並整合了新的 `variables_declare` 積木以及標準的 `get`/`set` 積木。
*   **修正程式碼產生器**：
    *   重構了 `arduino_generator.js` 和 `custom_generator.js`，將程式碼產生器物件統一為 `Blockly.Arduino`，解決了因物件覆寫導致的產生器遺失問題。
    *   修正了 `variables_set` 產生器，使其能正確產生賦值程式碼。
    *   修正了 `variables_declare` 產生器，使其能正確抓取使用者定義的變數名稱，而不是產生亂碼。
*   **修復多個 Bug**：解決了在重構過程中出現的 `SyntaxError` 和 `TypeError`。
*   **解決變數建立問題**：
    *   由於靜態工具箱移除了 Blockly 原生的「新增變數」下拉選單選項，導致使用者無法建立新變數。
    *   為解決此問題，在「變數」類別中新增了一個專門的「建立變數」按鈕。
    *   透過在 `toolbox.xml` 中加入 `<button>` 標籤，並在 `main.js` 中註冊 `CREATE_VARIABLE`回呼函式來實現此功能。
*   **釐清變數操作流程**：
    *   向使用者說明，除了使用新的按鈕，也可以透過「重新命名」現有變數的方式來建立新變數，此為 Blockly的標準操作之一。


未解決事項：
*   無。

---

日期： 2025年10月15日

已完成事項：
*   **修正多個 Blockly 編輯器問題**：解決了每次點擊按鈕都會開啟新編輯器的問題，現在一個 `.ino` 檔案只對應一個編輯器。
*   **初始積木載入**：確保 piBlockly 啟動時，`setup` 和 `loop` 積木會自動載入並連接。
*   **防止意外覆寫**：實作了首次修改時的確認對話框，並加入了「取消操作時自動復原」的功能，避免使用者不小心清空原有程式碼。
*   **`controls_repeat_ext` 產生器**：完成了「重複次數」積木的程式碼產生器。
*   **`controls_whileUntil` 產生器**：完成了「重複直到/當...時」積木的程式碼產生器。
*   **`controls_for` 產生器**：改進了「計數迴圈」積木的程式碼產生器，使其在處理數字時能產生更簡潔的語法。
*   **`controls_flow_statements` 產生器**：完成了「迴圈中斷/繼續」積木的程式碼產生器。
*   **`math_number` 產生器**：修正了數字積木回傳類型問題，確保與 `text_join` 等積木的相容性。
*   **`text` 產生器**：完成了「文字」積木的程式碼產生器。
*   **`text_join` 產生器**：完成了「建立字串」積木的程式碼產生器。
*   **`text_append` 產生器**：完成了「文字附加」積木的程式碼產生器。
*   **「建立變數」按鈕功能**：解決了 Webview 沙盒限制導致無法彈出輸入框的問題，現在可以正常建立變數。
*   **`variables_get` 產生器**：完成了「獲取變數」積木的程式碼產生器。

未解決事項：
*   **`variables_set` 積木未顯示**：即使已加入積木定義並嘗試在 `toolbox.xml` 中明確引用，`variables_set` 積木仍未出現在工具箱中。這可能指向 Blockly 核心載入或積木定義方式的深層問題。

### 2025-10-11 進度記錄

**已完成事項:**
- [x] 建立 VS Code 擴充功能專案 (`piblockly`)。
- [x] 解決 VS Code 版本相容性問題。
- [x] 建立 Webview 面板作為 Blockly 的容器。
- [x] 成功載入 Blockly 核心函式庫。
- [x] 解決內容安全策略 (CSP) 問題，允許載入本地腳本。
- [x] 已將 `simfonia` 專案的自訂積木檔案 (`blocks.js`, `javascript.js` (renamed to`generator.js`), `en.js`, `zh-hant.js`) 複製到 `media/custom/` 目錄下。
- [x] 已將 `toolbox.xml` 的內容整合到 Webview 中。


**過程中可能會遇到的問題:**
1.官方的 `blockly` 套件預設不包含 Arduino 的程式碼產生器。
解決方案：
[x] copy @package.nw/js/arduino_compressed.js 到 @piblockly/media 來使用

2. 目前使用的Blockly版本(V12.3.1)已把FieldColour 和FieldMultilineInput欄位移出核心，改用plugin方式使用
解決方案：
[x] 安裝npm install @blockly/field-colour @blockly/field-multilineinput
[x] 後續修改(已完成)
    - 確保 `node_modules` 清潔且插件已安裝。
    - 替換 `blockly_compressed.js` 和 `blocks_compressed.js` 為 cdnjs 的標準版本 (`blockly.js`和 `blocks.js`)。
    - 修改 `extension.ts` 以正確順序載入插件腳本 (`field-colour/dist/index.js`,`field-multilineinput/dist/index.js`) 和自訂語言檔案 (`custom/en.js`, `custom/zh-hant.js`)。
    - 修改 `main.js`，使用 `Blockly.registry.register` 正確註冊 `field_colour` 和`field_multilineinput`，並從 `window.FieldColour` 和 `window.Blockly.FieldColour`（或`window.Blockly.FieldColour` 和 `window.Blockly.FieldMultilineInput`）獲取欄位類別。
    - 修改 `blocks.js`，將包含 `FieldColour` 和 `FieldMultilineInput` 的區塊（例如`picar_set_led_color`，`coding_raw_statement` 等）轉換為使用 `jsonInit` 方法。


**其他已解決問題:**
- **問題:** `Refused to load media from
\'https://blockly-demo.appspot.com/static/media/click.mp3\'` (CSP error for media).\n  **
解決方案:** 在 `main.js` 的 `Blockly.inject` 配置中添加 `media: \'\' ` 和 `sounds: false` 以禁用Blockly 音效。

- **問題:** `Uncaught TypeError: Toolbox should be an <xml> document.`\n  **解決方案:** 在
`extension.ts` 中將 `toolbox.xml` 內容用 `<xml>` 標籤包裹。

- **問題:** `Uncaught SyntaxError: Unexpected identifier \'category_simfonia\'` 和 `Uncaught
SyntaxError: Invalid or unexpected token`。\n  **解決方案:** 在 `extension.ts` 中正確轉義
`toolboxXml` 內容中的雙引號 (`"`) 和換行符（`\n`、`\r`）。

- **問題:** `Uncaught TypeError: Blockly.Field.get is not a function` 和 `Unable to find
[field_multilineinput][field] in the registry.`\n  **解決方案:** 這些錯誤是由於
`blockly_compressed.js` 版本問題導致的。解決方案是替換為標準的 `blockly.js` 和 `blocks.js`
，並使用 `Blockly.registry.register` 註冊欄位。

- **問題:** "積木選單無法出現" (Block menu cannot appear) 和
"積木有出現，但切換子類別後，就會消失" (Blocks appear, but disappear after switching
subcategories)。\n  **解決方案:** 這些問題是上述錯誤的症狀，已隨上述解決方案一併解決。\n-

**問題:** `blocks.js:4 Uncaught ReferenceError: module is not defined`。\n  **解決方案:**
這是由於 `blocks.js` 檔案的 CommonJS 格式與瀏覽器直接載入不兼容。解決方案是將 `blocks.js`
替換為標準的 `blocks_compressed.js` (從 cdnjs 下載並重新命名為 `blocks.js`)。

 


---

### 2025-10-13 進度記錄

**已完成事項:**
- 根據使用者建議，建立了更穩健的、循序漸進的移植計畫 (`porting_checklist.md`)。
- 解決了程式碼產生器 (`arduino_generator.js`) 的一系列核心問題，包括：
  - **語法錯誤**：修正了因檔案合併、字串換行等問題導致的語法錯誤。
  - **快取問題**：透過為腳本 URL 添加 nonce，強制 Webview 載入最新檔案。
  - **命名衝突**：將產生器從 `Blockly.Arduino` 更名為 `Blockly.MyArduino`，避免與 Blockly 核心物件衝突。
  - **產生器/積木定義不匹配**：修正了 `arduino_digital_write` 產生器，使其能正確讀取積木的欄位值 (`getFieldValue`) 而非輸入值 (`valueToCode`)。
- 解決了因事件監聽器觸發過於頻繁，導致 VS Code 編輯器更新衝突的競爭條件問題 (透過在 `main.js` 中加入 debounce 機制)。
- **成功移植並驗證了第一批積木 (`Arduino` 分類)，實現了從積木到編輯器的穩定程式碼生成。**

**結論：**
- 專案的核心功能「從積木生成程式碼到編輯器」已經可以穩定運作。
- 我們現在有了一個可靠的、循序漸進的開發流程，可以繼續移植剩下的積木。

---

### 2025-10-12 進度記錄

**已完成事項:**
- [x] 將 `toolbox.xml` 移入 `piblockly/media` 目錄，使專案獨立。
- [x] 設定 Webview 預設在右側分欄 (`ViewColumn.Two`) 開啟。
- [x] 在 Arduino 工具箱中成功加入 `setup` 和 `loop` 積木。
- [x] 將標準積木類別 (邏輯、迴圈、數學等) 加入工具箱。

**解決的問題 & 學習到的經驗:**
- **問題:** 為 `setup`/`loop` 積木新增 `toolbox.xml` 項目後，出現 `Invalid block definition` 錯誤。
  - **原因分析:**
    1.  積木的 JavaScript 定義 (`Blockly.Blocks[...]`) 沒有被載入。
    2.  積木外觀定義的 JSON 格式不正確，使用了 JS 變數而非訊息鍵 (`%{BKY_...}`)
    3.  語言檔案 (`en.js`, `zh-hant.js`) 中缺少對應的訊息鍵。
  - **解決方案:**
    1.  在 `media/custom/blocks.js` 中使用現代 JSON 格式重新定義 `initializes_setup` 和 `initializes_loop` 積木。
    2.  在 `media/custom/en.js` 和 `media/custom/zh-hant.js` 中補全缺失的語言鍵。

- **問題:** 加入標準積木後，出現 `Extension ... is already registered` 和 `Block definition ... overwrites` 錯誤。
  - **原因分析:** 專案中使用的 `blockly.js` 是一個已包含標準積木定義的整合包。此時若再從 `node_modules` 複製並載入一份標準的 `blocks.js`，就會導致重複定義的衝突。
  - **經驗學習:** 確認了此專案的 `blockly.js` 是獨立且完整的。解決方案是**移除**額外載入的 `media/blocks.js` 檔案及其 `<script>` 標籤，僅依靠 `blockly.js` 提供標準積木，並由 `media/custom/blocks.js` 提供我們自己的積木即可。


=====================================================================
参考指南：
一、在 Webview 裡使用 Blockly 的正確方式
✅ Step 1：在 extension 裡建立一個 Webview

假設你的 extension.js 有以下內容：

const vscode = require('vscode');
const path = require('path');
const fs = require('fs');

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('myblockly.show', () => {
      const panel = vscode.window.createWebviewPanel(
        'myBlocklyView',
        'Blockly Playground',
        vscode.ViewColumn.One,
        {
          enableScripts: true,   // ✅ 允許 Webview 執行 JS
        }
      );

      const htmlPath = path.join(context.extensionPath, 'media', 'index.html');
      const htmlContent = fs.readFileSync(htmlPath, 'utf8');

      // ✅ 替換本地資源路徑成 webview 可存取的 URI
      const webviewUri = panel.webview.asWebviewUri(
        vscode.Uri.file(path.join(context.extensionPath, 'media'))
      );

      panel.webview.html = htmlContent.replace(/{{baseUri}}/g, webviewUri.toString());
    })
  );
}

exports.activate = activate;

✅ Step 2：在 media/index.html 裡放 Blockly
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Blockly in VSCode</title>

  <!-- Blockly 資源：改用 Webview URI -->
  <script src="{{baseUri}}/blockly_compressed.js"></script>
  <script src="{{baseUri}}/blocks_compressed.js"></script>
  <script src="{{baseUri}}/javascript_compressed.js"></script>
  <script src="{{baseUri}}/msg/js/en.js"></script>
</head>
<body>
  <div id="blocklyDiv" style="height: 90vh; width: 100%;"></div>

  <xml id="toolbox" style="display: none">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="text"></block>
  </xml>

  <script>
    const workspace = Blockly.inject('blocklyDiv', {
      toolbox: document.getElementById('toolbox'),
      media: '', // 不用外部音效
      sounds: false,
    });

    // ✅ Webview 與 Extension 通訊
    const vscode = acquireVsCodeApi();

    // 例如傳送 Blockly 程式碼給 extension
    function sendCode() {
      const code = Blockly.JavaScript.workspaceToCode(workspace);
      vscode.postMessage({ type: 'code', code });
    }
  </script>
</body>
</html>

⚠️ 二、重點注意事項

所有資源必須是本地檔案 (media 資料夾)，不能載外部 CDN。

VS Code Webview 的 CSP 預設禁止外部連線。

所以像這種：

<script src="https://unpkg.com/blockly/blockly.min.js"></script>


❌ 不可用。

路徑要透過 webview.asWebviewUri() 轉換。
因為 Webview 不允許直接使用 file:///。

不能用 require() 或 Node 模組語法。
Webview 裡沒有 Node.js，只能用純前端 JS。
→ 所以你的 Blockly block 定義應該是純瀏覽器版本（全域 Blockly）。

傳遞資料要用 postMessage()。

Webview → Extension: vscode.postMessage({ ... })

Extension → Webview: panel.webview.postMessage({ ... })

若需要 Plugin（例如 field-multilineinput）
也要放在 media 資料夾裡，並用相對路徑載入：

<script src="{{baseUri}}/@blockly/field-multilineinput/dist/index.js"></script>
<script>
  Blockly.registry.register('field', 'field_multilineinput', window.FieldMultilineInput);
</script>

🧠 三、小結
項目	在瀏覽器中	在 VS Code Webview 中
資源載入	可用 CDN / file://	只能用 webview.asWebviewUri()
模組語法	可用 ESM 或全域	只能全域（無 Node 模組）
聲音 / 外部 URL	可載入	禁止（CSP 限制）
通訊方式	無	用 postMessage()
Plugin 使用	直接 <script>	同樣放本地、手動註冊
🚀 四、你可以這樣測試

在你的 extension 專案下建立：

/media
  ├─ blockly_compressed.js
  ├─ blocks_compressed.js
  ├─ javascript_compressed.js
  ├─ msg/js/en.js
  ├─ index.html


在 package.json 裡加上命令：

"activationEvents": ["onCommand:myblockly.show"],
"contributes": {
  "commands": [
    {
      "command": "myblockly.show",
      "title": "Show Blockly"
    }
  ]
}


在 VS Code 裡按 F5 啟動「開發者模式」，執行命令 "Show Blockly"。
→ 你應該會看到 Blockly 正常出現在 Webview 裡 🎉