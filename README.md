# πBlockly

[English](README.md) | [繁體中文](README_zh-TW.md)

## Blockly Extension for Arduino IDE 2

πBlockly is a Visual Studio Code extension that integrates Blockly, a web-based visual programming editor, directly into your Arduino development workflow. It allows you to program your Arduino boards using intuitive drag-and-drop blocks, which are then translated into standard Arduino C++ code.

This extension is designed to work seamlessly within Arduino IDE 2, leveraging its VS Code-based core to provide a unified development experience. Visually generate your Arduino C++ code and then utilize the full power of Arduino IDE 2 for compilation, uploading, and other advanced features.

## Features

-   **Blockly Visual Editor:** A fully integrated Blockly workspace for visual programming.
-   **Arduino C++ Code Generation:** Automatically translates Blockly blocks into clean and functional Arduino C++ code.
-   **Custom Blocks Support:** Includes custom blocks for the author's current teaching robot piCar and general coding utilities, as well as advanced programming structures.
-   **Array Blocks:** Comprehensive set of blocks for array manipulation in C++:
    -   **Declare Array:** Declare arrays with specified data types (int, float, String, bool) and sizes. Supports both global and local scope declarations.
    -   **Get Array Element:** Access elements of an array using an index.
    -   **Set Array Element:** Assign values to specific elements in an array.
    -   **Array Length:** Get the number of elements in an array.
-   **Global/Local Scope Control:** For array declarations, easily switch between global and local scope, with appropriate visual feedback in the workspace.
-   **Synchronized Panel Closure:** Closing the piBlockly webview panel automatically closes its associated `.ino` file, ensuring a clean workspace.
-   **Enhanced Webview Security:** Implements Content Security Policy (CSP) with nonces to mitigate XSS vulnerabilities and restrict resource loading.
-   **Interactive Toolbar Icons:** Toolbar icons for common actions (Save, Save As, Close) with visual hover effects.

## Installation

While this is a VS Code extension, it is primarily recommended to run it within Arduino IDE 2.3 or higher.

**Installation steps for Arduino IDE 2 (Windows 11 example):**

1.  Close Arduino IDE 2.
2.  **Remove old versions:**
    *   Go to `C:\Users\[user name]\.arduinoIDE\deployedPlugins` and delete all `piblockly-x.x.x` folders.
    *   Go to `C:\Users\[user name]\.arduinoIDE\plugins` (create this folder if it doesn't exist, note the 's' in 'plugins') and delete all `piblockly-x.x.x.vsix` files.
3.  **Download the latest `piblockly-x.x.x.vsix` file.**
    *   Place the downloaded `.vsix` file into `C:\Users\[user name]\.arduinoIDE\plugins` (create this folder if it doesn't exist, note the 's' in 'plugins').
4.  Start Arduino IDE 2. You should see a pink π icon in the top right corner. Click it to launch the piBlockly editor.

## Usage

1.  Open an Arduino `.ino` file in Arduino IDE 2.
2.  Click the "π" button in the top right corner of the editor to launch the piBlockly editor.
3.  Choose to create a new project or open an existing `.xml` Blockly project file.
4.  Drag and drop blocks from the toolbox to build your program.
5.  The generated Arduino C++ code will appear in the left-hand associated `.ino` editor.
6.  Use the toolbar buttons above the right-hand block editing area to save your Blockly project (`.xml`) or close the editor.

## Development Status

This project is actively under development. Key features implemented include:

-   Core Blockly integration and Arduino C++ code generation.
-   Custom blocks for the author's current teaching robot piCar and general coding utilities.
-   Efforts are made to retain the original C++ flavor as much as possible, and the Coding category provides blocks for users to write free-form code.
-   Robust handling of webview lifecycle and security.

Future plans include dynamic loading of third-party blocks from web pages, theme switching, and further security enhancements.

## License

This project is licensed under the [MIT License](LICENSE).