# πBlockly 檔案結構規格

本文件旨在說明 πBlockly VS Code 擴充功能的檔案與目錄結構。

## 根目錄 (`piblockly/`)

擴充功能的根目錄。

```
piblockly/
├── src/
│   └── extension.ts (後端)
├── doc/
│   └── custum_module/
│       ├── create_custom_block_module_tutorial.md (自訂積木模組教學文件)
│       └── Demo/ (自訂積木模組範本)
│           └── my_new_module/ (範例模組資料夾)
│               ├── blocks.js
│               ├── generators.js
│               ├── toolbox.xml
│               ├── en.js
│               └── zh-hant.js
└── media/
    ├── blockly/
    │   ├── core/
    │   │   └── blockly.js  (Blockly核心)
    │   └── plugins/
    │       ├── field-colour.js  (Blockly第三方模組，提供顏色選單)
    │       └── field-multilineinput.js  (Blockly第三方模組，提供多行文字編輯)
    ├── blocks/ (本地核心積木描述)
    │   ├── arduino.js
    │   ├── array.js
    │   ├── coding.js
    │   ├── functions.js
    │   └── ...
    ├── generators/ (本地核心程式產生器)
    │   ├── _core.js
    │   ├── _lib.js
    │   ├── array.js
    │   └── ...
    ├── icons/
    │   └── ... (圖示檔案)
    ├── user_modules/  (使用者自訂積木模組)
    │   └── user_modules_config.json (使用者自訂積木模組的載入設定檔)
    ├── core_extension_manifest.json (本地核心模組的載入設定檔)
    ├── en.js (英文語言檔)
    ├── index.html (只是模板，本專案不直接採用)
    ├── main.js (Webview前端)
    ├── module_loader.js (載入模組)
    ├── style.css
    ├── toolbox.xml (核心積木選單)
    └── zh-hant.js (正體中文語言檔)
```

- **`src/`**: 存放擴充功能的 TypeScript 原始碼。
    - `extension.ts`: 擴充功能的主要進入點。負責處理 VS Code 的啟動事件、註冊指令、建立和管理 Webview 面板，並設定本地與遠端模組的載入路徑。

- **`doc/`**: 存放專案文件與自訂模組範例。
    - `custum_module/`: 包含自訂積木模組的教學文件和範例模組。
        - `create_custom_block_module_tutorial.md`: 如何建立自訂積木模組的教學文件。
        - `Demo/`: 存放自訂積木模組的範本，供使用者複製和修改。
            - `my_new_module/`: 包含範例積木定義、產生器、工具箱配置和語言檔案。

- **`media/`**: 存放所有用於 Blockly Webview 的前端資源。
    - `blockly/`: 存放所有 Blockly 相關的 JavaScript 檔案。
        - `core/`: 存放 Blockly 核心函式庫。
            - `blockly.js`: Blockly 核心函式庫。
        - `plugins/`: 存放 Blockly 的第三方擴充或自訂欄位。
            - `field-colour.js`: Blockly 第三方模組，提供顏色選單。
            - `field-multilineinput.js`: Blockly 第三方模組，提供多行文字編輯。
    - **`core_extension_manifest.json`**: **本地核心模組**的載入設定檔。它定義了擴充功能啟動時從本地 `media` 資料夾載入的基礎積木模組（例如 Arduino 核心、邏輯、迴圈等）。
    - **遠端硬體模組 (Remote Hardware Modules)**: 硬體相關的積木模組 (例如 `piblockly_hw_blocks`) 置於**雲端** 進行管理與載入。其載入路徑由 `src/extension.ts` 中的 `REMOTE_MODULES_BASE_URL` 設定，實現了硬體定義與核心擴充功能的解耦，允許獨立更新。
    - `user_modules/`: 存放使用者自訂的積木模組，以及其載入設定檔。
        - `user_modules_config.json`: 用於載入使用者自訂積木模組的設定檔，與系統核心模組的設定分離，以增強安全性。
    - `blocks/`: 存放模組化的積木**定義** (積木的外觀與結構)。這些是構成 πBlockly 核心功能的基礎積木。
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
        - `array.js`, `coding.js`, `functions.js`, `io.js`, `logic.js`, `loops.js`, `math.js`, `picar.js`, `serial.js`, `structure.js`, `text.js`, `time.js`, `variables.js`
    - `icons/`: 存放 Webview 中使用的圖示。
    - `en.js`, `zh-hant.js`: 用於國際化 (i18n) 的語言檔案，包含積木文字、UI 介面翻譯字串以及主題顏色定義。
    - `index.html`: Webview 的基礎 HTML 結構。(只是模板，本專案不直接採用)
    - `main.js`: Webview 的主要 JavaScript 檔案，負責初始化 Blockly 工作區、定義主題、處理模組載入、註冊事件監聽器等。
    - `module_loader.js`: 負責動態載入**個別** JavaScript 模組檔案，供 `main.js` 根據模組清單 (`manifest`) 的記載來使用。
    - `style.css`: Webview 的主要樣式表。
    - `toolbox.xml`: 定義 Blockly 工具箱中的核心積木分類與顯示的積木。

- **`package.json`**: Node.js 的專案設定檔。定義了擴充功能的名稱、版本、依賴套件、發布內容以及向 VS Code 註冊的指令 (Commands) 和 UI 貢獻點 (Contribution Points)。

- **`tsconfig.json`**: TypeScript 編譯器的設定檔，指導 `tsc` 如何將 `.ts` 檔案編譯成 `.js` 檔案。

- **`webpack.config.js`**: Webpack 的設定檔，用於打包擴充功能的 JavaScript 程式碼。
