# πBlockly 檔案結構規格

本文件旨在說明 πBlockly VS Code 擴充功能的檔案與目錄結構。

## 根目錄 (`piblockly/`)

擴充功能的根目錄。

```
piblockly/
├── src/
│   └── extension.ts (後端)
└── media/
    ├── blocks/ (積木描述)
    │   ├── arduino.js
    │   ├── array.js
    │   ├── coding.js
    │   ├── functions.js
    │   ├── logic.js
    │   ├── loops.js
    │   ├── picar.js
    │   ├── text.js
    │   └── variables.js
    ├── generators/ (程式產生器)
    │   ├── _core.js
    │   ├── _lib.js
    │   ├── array.js
    │   ├── coding.js
    │   ├── functions.js
    │   ├── io.js
    │   ├── logic.js
    │   ├── loops.js
    │   ├── math.js
    │   ├── picar.js
    │   ├── serial.js
    │   ├── structure.js
    │   ├── text.js
    │   ├── time.js
    │   └── variables.js
    ├── icons/
    │   └── ... (圖示檔案)
    ├── user_modules/  (自訂積木模組)
    │   ├── _piblockly_hw_lib (核心提供的硬體積木模組)
    │   │   ├── en.js, zh-hant.js (語言檔)
    │   │   ├── blocks.js (積木描述檔)
    │   │   ├── generators.js (程式產生器檔)
    │   │   └── toolbox.xml (本模組積木工具箱選單)
    │   └── manifest.json (載入模組URL)
    ├── blockly.js (Blockly核心)
    ├── en.js (語言檔)
    ├── field-colour.js (Blockly第三方模組，提供顏色選單)
    ├── field-multilineinput.js (Blockly第三方模組，提供多行文字編輯)
    ├── index.html (只是模板，本專案不直接採用)
    ├── main.js (Webview前端)
    ├── style.css
    ├── toolbox.xml (核心積木選單)
    └── zh-hant.js (語言檔)
```

- **`src/`**: 存放擴充功能的 TypeScript 原始碼。
    - `extension.ts`: 擴充功能的主要進入點。負責處理 VS Code 的啟動事件、註冊指令、建立和管理 Webview 面板，以及協調 Webview 與 VS Code 後端之間的通訊。

- **`media/`**: 存放所有用於 Blockly Webview 的前端資源。
    - `index.html`: Webview 的基礎 HTML 結構。實際內容由 `extension.ts` 在執行時期動態生成。
    - `main.js`: Webview 的主要 JavaScript 檔案，負責初始化 Blockly 工作區、定義主題、註冊事件監聽器等。
    - `style.css`: Webview 的主要樣式表。
    - `toolbox.xml`: 定義 Blockly 工具箱中的積木分類與顯示的積木。
    - `blockly.js`: 核心 Blockly 函式庫。
    - `en.js`, `zh-hant.js`: 用於國際化 (i18n) 的語言檔案，包含積木文字、UI 介面翻譯字串以及主題顏色定義。
    - `field-colour.js`, `field-multilineinput.js`: Blockly 的自訂欄位插件。
    - `blocks/`: 存放模組化的積木**定義** (積木的外觀與結構)。
        - `arduino.js`: 定義 Arduino 相關積木 (結構、I/O、時間、序列埠、數學等)。
        - `picar.js`: 定義 PiCar 小車專用積木。
        - `coding.js`: 定義原生程式碼嵌入積木。
        - `logic.js`: 定義邏輯判斷積木。
        - `loops.js`: 定義迴圈控制積木。
        - `text.js`: 定義文字處理積木。
        - `variables.js`: 定義變數相關積木。
        - `array.js`: 定義陣列相關積木。
        - `functions.js`: 定義函式相關積木。
    - `generators/`: 存放模組化的積木**程式碼產生器** (定義如何將積木轉換為 Arduino C++ 程式碼)。
        - `_core.js`: 產生器核心，包含 `init` 和 `finish` 函式，必須最先載入。
        - `_lib.js`: 共享函式庫，存放多個產生器模組共用的輔助函式。
        - `array.js`
        - `coding.js`
        - `functions.js`
        - `io.js`
        - `logic.js`
        - `loops.js`
        - `math.js`
        - `picar.js`
        - `serial.js`
        - `structure.js`
        - `text.js`
        - `time.js`
        - `variables.js`
    - `icons/`: 存放 Webview 中使用的圖示。

- **`package.json`**: Node.js 的專案設定檔。定義了擴充功能的名稱、版本、依賴套件、發布內容以及向 VS Code 註冊的指令 (Commands) 和 UI 貢獻點 (Contribution Points)。

- **`tsconfig.json`**: TypeScript 編譯器的設定檔，指導 `tsc` 如何將 `.ts` 檔案編譯成 `.js` 檔案。

- **`webpack.config.js`**: Webpack 的設定檔，用於打包擴充功能的 JavaScript 程式碼。