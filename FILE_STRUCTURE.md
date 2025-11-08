# πBlockly 檔案結構規格

本文件旨在說明 πBlockly VS Code 擴充功能的檔案與目錄結構。

## 根目錄 (`piblockly/`)

擴充功能的根目錄。

- **`src/`**: 存放擴充功能的 TypeScript 原始碼。
    - `extension.ts`: 擴充功能的主要進入點。負責處理 VS Code 的啟動事件、註冊指令、建立和管理 Webview 面板，以及協調 Webview 與 VS Code 後端之間的通訊。

- **`media/`**: 存放所有用於 Blockly Webview 的前端資源。
    - `index.html`: Webview 的基礎 HTML 結構。實際內容由 `extension.ts` 在執行時期動態生成。
    - `main.js`: Webview 的主要 JavaScript 檔案，負責初始化 Blockly 工作區、註冊事件監聽器等。
    - `style.css`: Webview 的主要樣式表。
    - `toolbox.xml`: 定義 Blockly 工具箱中的積木分類與顯示的積木。
    - `blockly.js`: 核心 Blockly 函式庫。
    - `arduino_generator.js`: 標準 Arduino 積木的程式碼產生器，定義如何將積木轉換為 Arduino C++ 程式碼。
    - **`custom/`**: 存放所有 πBlockly 的自訂資源。
        - `custom_generator.js`: 所有自訂積木的程式碼產生器。
        - `en.js`, `zh-hant.js`: 用於國際化 (i18n) 的語言檔案，包含自訂積木和 UI 介面的翻譯字串。
        - **`blocks/`**: 存放模組化的自訂積木**定義** (積木的外觀與結構)。
            - `arduino.js`: 定義 Arduino 相關積木 (結構、I/O、時間、序列埠、數學等)。
            - `picar.js`: 定義 PiCar 小車專用積木。
            - `coding.js`: 定義原生程式碼嵌入積木。
            - `logic.js`: 定義邏輯判斷積木。
            - `loops.js`: 定義迴圈控制積木。
            - `text.js`: 定義文字處理積木。
            - `variables.js`: 定義變數相關積木。
            - `array.js`: 定義陣列相關積木。
            - `functions.js`: 定義函式相關積木。

- **`package.json`**: Node.js 的專案設定檔。定義了擴充功能的名稱、版本、依賴套件、發布內容以及向 VS Code 註冊的指令 (Commands) 和 UI 貢獻點 (Contribution Points)。

- **`tsconfig.json`**: TypeScript 編譯器的設定檔，指導 `tsc` 如何將 `.ts` 檔案編譯成 `.js` 檔案。

- **`webpack.config.js`**: Webpack 的設定檔，用於打包擴充功能的 JavaScript 程式碼。
