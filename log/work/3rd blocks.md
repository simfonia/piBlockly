## 動態載入第三方積木功能開發日誌 (Dynamic Loading of Third-Party Blocks Development Log)

本節記錄了在開發動態載入第三方積木功能時遇到的問題及其解決方案。

### 1. `Uncaught SyntaxError: Cannot use import statement outside a module`

*   **問題描述:** `main.js` 中使用了 `import` 語句，但瀏覽器未將其視為 JavaScript 模組，導致語法錯誤。
*   **解決方案:** 在 `piblockly/src/extension.ts` 的 `getWebviewContent` 函數中，為載入 `main.js` 的 `<script>` 標籤新增 `type="module"` 屬性。

### 2. CSP 錯誤: `The source list for the Content Security Policy directive 'script-src' contains an invalid source: ''blob:''. It will be ignored.`

*   **問題描述:** 內容安全策略 (CSP) 的 `script-src` 指令未能正確允許 `blob:` URL，導致瀏覽器忽略該來源。
*   **解決方案:** 在 `piblockly/src/extension.ts` 的 `getWebviewContent` 函數中，將 CSP `script-src` 指令中的 `'blob:'` 更改為 `blob:` (不帶引號)。

### 3. `Uncaught TypeError: Cannot read properties of undefined (reading 'addChangeListener')`

*   **問題描述:** 在 `piblockly/media/main.js` 中，`workspace.addChangeListener` 等依賴 `workspace` 物件的呼叫發生在 `workspace` 初始化之前，導致 `workspace` 為 `undefined`。
*   **解決方案:** 將所有 `workspace.addChangeListener` 呼叫以及其他依賴 `workspace` 的邏輯，從 `piblockly/media/main.js` 的全域範圍移至 `DOMContentLoaded` 監聽器內部，確保在這些呼叫執行時 `workspace` 已被 `Blockly.inject` 初始化。

### 4. `GET vscode-webview://.../user_modules/manifest.json 403 (Forbidden)`

*   **問題描述:** Webview 嘗試透過 `fetch` 擷取 `manifest.json` 時，被 CSP 阻止，因為 `default-src 'none'` 且 `connect-src` 未明確設定。
*   **解決方案:** 在 `piblockly/src/extension.ts` 的 `getWebviewContent` 函數中，為 CSP 新增 `connect-src ${webview.cspSource} vscode-webview-resource:` 指令，允許 Webview 連接到 `vscode-webview-resource:` 來源。

### 5. `GET vscode-webview://.../user_modules/simfonia_sensors.js 403 (Forbidden)`

*   **問題描述:** 即使 `connect-src` 已更新，Webview 仍被禁止擷取 `manifest.json` 中列出的個別模組檔案 (`simfonia_sensors.js`)。這是因為 `fetch` 的 URL 是一個相對路徑，未經 VS Code Webview 資源處理器正確授權。
*   **解決方案:**
    1.  在 `piblockly/src/extension.ts` 的 `getWebviewContent` 函數中，使用 `webview.asWebviewUri` 生成 `manifest.json` 的完整 Webview URI (`manifestUri`)，並透過 `window.manifestUri` 將其注入到 Webview 的 HTML 中。
    2.  在 `piblockly/media/main.js` 的 `loadExternalModules` 函數中，使用 `window.manifestUri` 擷取 manifest，然後利用 `new URL(modConfig.url, baseManifestUrl).toString()` 根據 `manifest.json` 的 URL 相對地建構每個模組的 `moduleUrl`。

### 6. `Error: DOMParser was unable to parse: <category name="%{BKY_SIMFONIA_CATEGORY_COMMON}" ...>`

*   **問題描述:** `simfonia_sensors.js` 中 `toolbox` XML 字串缺少根 `<xml>` 標籤，導致 `DOMParser` 無法正確解析。
*   **解決方案:** 在 `piblockly/media/user_modules/simfonia_sensors.js` 中，將 `toolbox` XML 字串用根 `<xml>` 標籤包裝起來。

### 7. `Unable to find [xml][toolboxitem] in the registry.`

*   **問題描述:** 在 `piblockly/media/main.js` 的 `loadExternalModules` 函數中，當動態新增類別時，`baseToolbox.appendChild(catXml)` 錯誤地將整個 `<xml>` 元素（來自 `module.toolbox`）附加到主 `baseToolbox` 的 `<xml>` 元素內部，導致工具箱 XML 結構無效。
*   **解決方案:** 修改 `piblockly/media/main.js` 的 `loadExternalModules` 函數，使其迭代解析後的 `module.toolbox` XML 的子元素，並僅將 `<category>` 元素（或其他直接工具箱項目）附加到 `baseToolbox`。

### 8. `simfonia_ultrasonic_distance` 積木沒有程式碼生成。

*   **問題描述:** `simfonia_ultrasonic_distance` 積木的程式碼生成器錯誤地直接註冊到 `Blockly.Arduino['block_type']`，而不是專案約定的 `Blockly.Arduino.forBlock['block_type']`。
*   **解決方案:** 修改 `piblockly/media/user_modules/simfonia_sensors.js`，將程式碼生成器註冊到 `Blockly.Arduino.forBlock['simfonia_ultrasonic_distance']`。

### 9. 顏色未使用十六進位值。

*   **問題描述:** `toolbox` XML 中的 `colour` 屬性或積木定義中的 `setColour` 呼叫使用了十進位色相值，而不是十六進位顏色代碼。
*   **解決方案:** 更新 `piblockly/media/user_modules/simfonia_sensors.js`，將 `toolbox` XML `colour` 屬性和積木的 `setColour` 方法中的顏色值更改為十六進位值。

### 10. 模組中沒有 `zh-hant` 的 key。

*   **問題描述:** 動態載入的模組 (`simfonia_sensors.js`) 缺少繁體中文 (zh-hant) 的語言鍵，導致在中文環境下顯示不正確。
*   **解決方案:**
    1.  在 `piblockly/media/user_modules/simfonia_sensors.js` 中，定義 `MSG_SIMFONIA_EN` 和 `MSG_SIMFONIA_ZH_HANT` 兩個語言物件，並將其匯出。
    2.  在 `piblockly/src/extension.ts` 的 `getWebviewContent` 函數中，將當前語言環境 (`locale`) 作為全域變數 `window.currentLocale` 注入到 Webview 的 HTML 中。
    3.  在 `piblockly/media/main.js` 的 `loadExternalModules` 函數中，在載入模組後，根據 `window.currentLocale` 判斷當前語言，然後將模組中對應語言的訊息物件 (`MSG_SIMFONIA_EN` 或 `MSG_SIMFONIA_ZH_HANT`) 合併到全域 `Blockly.Msg` 物件中。
===============================================================
任務：
讓 piBlockly extension 具有以下功能：

✅ 讀取原本的 toolbox.xml
✅ 可讓使用者自己新增積木模組（放在 user_modules/）並自動載入
✅ 將模組的 <category> 合併進 toolbox
✅ 符合 CSP（無 eval）

先寫一個測試模組規畫如下:
  1.考慮命名空間，檔名為 user_package.js, 如 simfonia_sensors.js
  2.類別名稱即為檔名
  3.本模組提供兩個子分類:Common, AI, 在 Common下提供一個HC-SR04超音波測距積木
  4.因為要模組化，所有語言或顏色的key應寫在自己的模組檔裏面，有關key的處理，請參考:
  https://chatgpt.com/share/691494d1-c330-8006-a76a-aea40ac7c759
  5.最後要動態的加入到原本的toolbox的後面。 
🧱 專案結構
piBlockly/
├── package.json
├── src/
│   └── extension.ts
├── media/
│   ├── blocks (積木外觀)
│   ├── generators (程式產生器)
│   ├── index.html
│   ├── main.js
│   ├── blockly.js (blockly核心)
│   ├── module_loader.js
│   ├── toolbox.xml (積木選單)
│   └── en.js, zh-hant.js (語言檔)
│ 
├── user_modules/
│   ├── user1_sensors.js
│   └── user2_xxxxx.js
└── manifest.json   ← 可放線上或本地測試

🧩 src/extension.ts
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('blocklyExtension.start', async () => {
      const panel = vscode.window.createWebviewPanel(
        'blocklyWebview',
        'Blockly Workspace',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, 'media'),
            vscode.Uri.joinPath(context.extensionUri, 'user_modules')
          ]
        }
      );

      const nonce = getNonce();
      const html = getWebviewContent(context, panel.webview, nonce);
      panel.webview.html = html;

      // 傳送使用者模組清單給前端
      const userDir = path.join(context.extensionPath, 'user_modules');
      const userFiles = fs.readdirSync(userDir).filter(f => f.endsWith('.js') || f.endsWith('.json'));
      panel.webview.postMessage({ type: 'userModules', files: userFiles });
    })
  );
}

function getWebviewContent(context: vscode.ExtensionContext, webview: vscode.Webview, nonce: string) {
  const mainScript = webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'media', 'main.js'));
  const csp = `
    default-src 'none';
    img-src ${webview.cspSource} https:;
    script-src 'nonce-${nonce}';
    style-src 'unsafe-inline' ${webview.cspSource};
  `;

  return /*html*/ `
    <html>
      <head>
        <meta http-equiv="Content-Security-Policy" content="${csp}">
      </head>
      <body>
        <div id="blocklyDiv" style="height:100vh;width:100%;"></div>
        <script nonce="${nonce}" type="module" src="${mainScript}"></script>
      </body>
    </html>`;
}

function getNonce() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 32 }, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
}

🧠 media/main.js
import './blockly.min.js';
import { loadModule } from './module_loader.js';

let workspace;
let baseToolbox;

async function initBlockly() {
  // 讀取原本的 toolbox.xml
  const toolboxXmlText = await fetch('./toolbox.xml').then(r => r.text());
  baseToolbox = Blockly.utils.xml.textToDom(toolboxXmlText);

  workspace = Blockly.inject('blocklyDiv', { toolbox: baseToolbox });

  // 載入內建 blocks
  import('./block_core/base_blocks.js').then(m => m.registerBlocks(Blockly));

  // 檢查線上模組（manifest.json）
  await loadManifestModules('./manifest.json');

  // 等 extension.ts 傳送使用者模組清單
  window.addEventListener('message', async (event) => {
    const msg = event.data;
    if (msg.type === 'userModules') {
      for (const file of msg.files) {
        const mod = await loadModule(`../user_modules/${file}`, Blockly);
        if (mod?.toolbox) {
          const catXml = Blockly.utils.xml.textToDom(mod.toolbox);
          baseToolbox.appendChild(catXml);
        }
      }
      workspace.updateToolbox(baseToolbox);
    }
  });
}

async function loadManifestModules(url) {
  try {
    const manifest = await fetch(url).then(r => r.json());
    for (const mod of manifest.modules) {
      const loaded = await loadModule(mod.url, Blockly);
      if (loaded?.toolbox) {
        const catXml = Blockly.utils.xml.textToDom(loaded.toolbox);
        baseToolbox.appendChild(catXml);
      }
    }
    workspace.updateToolbox(baseToolbox);
  } catch (e) {
    console.warn('No manifest found or invalid:', e);
  }
}

initBlockly();

🧩 media/module_loader.js
export async function loadModule(url, Blockly) {
  if (url.endsWith('.json')) {
    const blocks = await fetch(url).then(r => r.json());
    Blockly.defineBlocksWithJsonArray(blocks);
    console.log('✅ JSON blocks loaded:', url);
    return null;
  } else if (url.endsWith('.js')) {
    const code = await fetch(url).then(r => r.text());
    const blob = new Blob([code], { type: 'text/javascript' });
    const moduleUrl = URL.createObjectURL(blob);
    const module = await import(moduleUrl);
    if (module.registerBlocks) module.registerBlocks(Blockly);
    console.log('✅ JS module loaded:', url);
    return module;
  }
}

🧩 user_modules/custom_block.js
export function registerBlocks(Blockly) {
  Blockly.Blocks['print_text'] = {
    init() {
      this.appendValueInput('TEXT').appendField('print');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(200);
    }
  };

  Blockly.JavaScript['print_text'] = (block) => {
    const txt = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC) || '""';
    return `console.log(${txt});\n`;
  };
}

export const toolbox = `
<category name="Custom Print" colour="200">
  <block type="print_text"></block>
</category>
`;

🧩 manifest.json（支援線上/本地測試）
{
  "version": "1.0.0",
  "modules": [
    {
      "name": "Hello Block",
      "url": "./user_modules/hello_block.json"
    },
    {
      "name": "Custom Print",
      "url": "./user_modules/custom_block.js"
    }
  ]
}

🔁 運作流程簡圖
extension.ts
   ↓
webview.html (index.html)
   ↓
main.js → 載入 toolbox.xml
   ↓
loadManifestModules()  → manifest.json → 每個 module
   ↓
loadModule() → Blob import (安全)
   ↓
module.registerBlocks(Blockly)
   ↓
baseToolbox.appendChild(categoryXml)
   ↓
workspace.updateToolbox(baseToolbox)

✅ 優點總結
功能	狀態
保留原本積木 + 工具箱	✅
匯入外部模組（線上或本地）	✅
自動合併 toolbox	✅
支援使用者自訂模組	✅
CSP 安全（無 eval）	✅
支援 manifest 版本控制	✅

============================================================

參考資料:
https://chatgpt.com/share/691494d1-c330-8006-a76a-aea40ac7c759

不想把第三方積木打包在 extension 裡，但又想讓使用者方便更新、擴充、甚至自己加，有什麼辨法?

下面我幫你整理出 三種實務可行方案，分別針對：
🔒 安全性（符合 VS Code CSP）
🧩 擴充彈性（支援動態載入與更新）
🔄 更新便利性（不需要重新打包 extension）

🧭 總覽對照表
方案	優點	缺點	適合誰
🗂️ 方案 1：使用者本地積木資料夾 + import()	安全、靈活、可熱更新	要手動下載更新	想保留 CSP 安全又允許外掛
🌐 方案 2：從網路 fetch + Blob + import()	自動更新、可線上擴充	需注意安全性與信任來源	模組由你維護並定期更新
☁️ 方案 3：你提供更新 API + JSON 模組列表	使用者一鍵更新所有模組	要建伺服器或 GitHub JSON	想做完整模組生態系

🗂️ 方案 1：本地積木資料夾 + import()
📦 想法：
讓使用者把自己的積木模組 .js 放在一個資料夾（例如 ~/BlocklyModules/），
VS Code extension 掃描該資料夾並載入。
🧰 實作步驟：
1️⃣ 使用者放模組：
~/BlocklyModules/
 ├── math_blocks.js
 ├── music_blocks.js
 └── my_custom_blocks.js

2️⃣ extension 偵測這些檔案（後端）
const userBlocksPath = path.join(os.homedir(), "BlocklyModules");
const blockFiles = fs.readdirSync(userBlocksPath).filter(f => f.endsWith(".js"));
panel.webview.postMessage({ type: 'loadModules', files: blockFiles });


3️⃣ webview 前端動態 import
async function loadLocalModules(baseUri, fileList) {
  for (const file of fileList) {
    const moduleUrl = vscodeResourceUri(baseUri, file);
    const module = await import(moduleUrl);
    module.registerBlocks(Blockly);
  }
}


✅ 優點：
可讓使用者自己放新檔案，即時更新。
不用打 extension 版本。
CSP 安全。

🚫 缺點：
使用者要「下載」或「放檔」到特定資料夾。
沒有自動線上更新。

🌐 方案 2：從網路 fetch + Blob + import()（安全線上更新）
這是許多 Blockly 外掛系統最靈活的做法。
📦 想法：
你的 extension 只負責顯示 Blockly。
你的伺服器（或 GitHub Pages）放最新版積木模組。
Webview 透過 fetch 下載並快取。
📘 實作示例：
async function loadRemoteModule(url) {
  const code = await fetch(url).then(r => r.text());
  const blob = new Blob([code], { type: 'text/javascript' });
  const moduleUrl = URL.createObjectURL(blob);
  const module = await import(moduleUrl);
  module.registerBlocks(Blockly);
  console.log("Remote module loaded:", url);
}


📦 例如使用：
await loadRemoteModule("https://your.github.io/blockly-modules/math_blocks.js");

✅ 優點：
可線上更新。
只需改伺服器內容，使用者不用更新 extension。
支援多人共用。

⚠️ 缺點：
要確保來源可信（防惡意代碼）。
若要支援模組之間相依，要額外處理載入順序。
👉 解法：
你可以在伺服器上提供一個 manifest.json：
{
  "version": "1.3.2",
  "modules": [
    "math_blocks.js",
    "music_blocks.js",
    "logic_extras.js"
  ]
}

然後你的 extension 每次開啟時自動檢查更新。


☁️ 方案 3：你提供更新 API + JSON 模組列表（最專業）
這是「像 VSCode Marketplace 一樣」的結構。
例如你的 extension 有一個設定選項「更新積木模組」。
伺服器端：
提供一個簡單的 JSON：
{
  "latestVersion": "2.4.1",
  "modules": [
    {"name": "Math Tools", "url": "https://.../math.js"},
    {"name": "Audio Blocks", "url": "https://.../audio.js"}
  ]
}

Extension 側：
開啟時檢查版本差異
若新版，顯示提示：「有新的積木可更新」
一鍵下載並快取到本地，再 import() 使用

這種方式可以做到：
✅ 使用者不用動手
✅ 你可發佈更新或擴充
✅ 維持 CSP 安全（因為最終仍是以本地檔執行）