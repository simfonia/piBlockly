# πBlockly

## 適用於 Visual Studio Code / Arduino IDE 2 的 Blockly 延伸套件

πBlockly 是一個 Visual Studio Code 擴充功能，它將 Blockly（一個基於網頁的視覺化程式設計編輯器）直接整合到您的 Arduino 開發流程中。它允許您使用直觀的拖放積木來編程您的 Arduino 開發板，這些積木隨後會被轉換為標準的 Arduino C++ 程式碼。

此擴充功能旨在與 Arduino IDE 2 無縫協作，利用其基於 VS Code 的核心提供統一的開發體驗。視覺化地生成您的 Arduino C++ 程式碼，然後利用 Arduino IDE 2 的全部功能進行編譯、上傳和其他進階功能。

## 功能特色

-   **Blockly 視覺化編輯器：** 完整整合的 Blockly 工作區，用於視覺化程式設計。
-   **C++風格的積木：** 讓剛進入 C++ 世界的新手有個平順的過渡期。
-   **Arduino C++ 程式碼生成：** 自動將 Blockly 積木轉換為簡潔且功能完善的 Arduino C++ 程式碼。
-   **自訂積木支援：** 包含用於特定硬體（piCar）和進階程式設計結構的自訂積木 (Coding)。
-   **陣列積木：** 用於 C++ 陣列操作的完整積木集：
    -   **宣告陣列：** 宣告具有指定資料類型（int、float、String、bool）和大小的陣列。支援全域和局部範圍宣告。
    -   **獲取陣列元素：** 使用索引存取陣列的元素。
    -   **設定陣列元素：** 為陣列中指定索引的元素賦值。
    -   **陣列長度：** 獲取陣列中的元素數量。
-   **全域/局部範圍控制：** 對於陣列宣告，可以輕鬆切換全域和局部範圍，並在工作區中提供適當的視覺回饋。
-   **同步面板關閉：** 關閉 piBlockly webview 面板會自動關閉其關聯的 `.ino` 檔案，確保工作區整潔。
-   **增強的 Webview 安全性：** 實作帶有 nonce 的內容安全策略 (CSP)，以緩解 XSS 漏洞並限制資源載入。
-   **互動式工具列圖示：** 用於常用操作（儲存、另存為、關閉）的工具列圖示，具有視覺懸停效果。

## 安裝

儘管這是一個 VS Code 擴充功能，但也可以在 Arduino IDE 2.3.6 中執行。

**Arduino IDE 2 的安裝步驟（以 Windows 11 為例）：**

1.  關閉 Arduino IDE 2。
2.  **移除舊版本：**
    *   進入 `C:\Users\[user name]\.arduinoIDE\deployedPlugins` 並刪除所有 `piblockly-x.x.x` 資料夾。
    *   進入 `C:\Users\[user name]\.arduinoIDE\plugins`（如果此資料夾不存在，請建立它，注意 'plugins' 中的 's'）並刪除所有 `piblockly-x.x.x.vsix` 檔案。
3.  **下載最新的 `piblockly-x.x.x.vsix` 檔案。**
    *   將下載的 `.vsix` 檔案放入 `C:\Users\[user name]\.arduinoIDE\plugins`（如果此資料夾不存在，請建立它，注意 'plugins' 中的 's'）。
4.  啟動 Arduino IDE 2。您應該會在右上角看到一個粉紅色的 π 圖示。點擊它即可啟動 piBlockly 編輯器。

## 使用方式

1.  在 Arduino IDE 2 中打開一個 Arduino `.ino` 檔案。
2.  點擊編輯器右上角的「π」按鈕以啟動 piBlockly 編輯器。若無「π」按鈕，可按Shift + Ctrl + P 在命令面板輸入 piBlockly: Start piBlockly Editor 即可。
3.  選擇創建新專案或打開現有的 `.xml` Blockly 專案檔案。
4.  從工具箱中拖放積木以構建您的程式。
5.  生成的 Arduino C++ 程式碼將顯示在左側關聯的 `.ino` 編輯器中。
6.  使用右方積木編輯區上方的工具列按鈕儲存您的 Blockly 專案（`.xml`）或關閉編輯器。

## 開發狀態

simfonia不是專業程式設計師，因此開發進度可能比較慢，對此感到抱歉。
已實作的主要功能包括：

-   核心 Blockly 整合和 Arduino C++ 程式碼生成。
-   用於作者目前教學用的自製輪型機器人 piCar 和通用程式設計工具的自訂積木。
-   積木外觀儘可能維持原始的C++風味，並提供 Coding 分類下的積木讓使用者自由撰寫，遇到沒有積木的情況，您完全可以即興發揮。
-   Webview 生命週期和安全性的處理。

未來的計畫包括從網頁動態載入第三方積木、主題切換和進一步的安全增強。


## 問題

-   在積木編輯區與程式碼編輯區之間，因有許多尚未克服的技術問題，使用者介面可能有些無法正常運作。
-   積木編輯區右上方的關閉按鈕，在 VS Code 運作正常，可以提醒存檔並關閉積木編輯區，但在 Arduino IDE 2 則無法運作。若要在 Arduino IDE 2 中使用，目前最好的方式是自己按積木編輯區上方的"存檔"或"另存新檔"按鈕，然後再按標題頁籤上的"X"來關閉整個面板。
-   積木編輯區的標題頁籤有"X"可以關閉整個面板，但不會檢查積木檔案是否有被修改而而直接關閉，請小心使用。
-   本延伸套件只在 Windows 11 + VS Code 1.105 + Arduino IDE 2.3.6 測試過。

## 許可證

此專案根據 [MIT 許可證](LICENSE) 授權。