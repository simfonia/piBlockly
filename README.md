# πBlockly

[English](README.md) | [繁體中文](README_zh-TW.md)

## A Blockly Extension for Visual Studio Code / Arduino IDE 2

πBlockly is a Visual Studio Code extension that integrates Blockly, a web-based visual programming editor, directly into your Arduino development workflow. It allows you to program your Arduino board using intuitive drag-and-drop blocks, which are then converted into standard Arduino C++ code.

This extension is designed to work seamlessly with Arduino IDE 2, leveraging its VS Code-based core to provide a unified development experience. Visually generate your Arduino C++ code, then use the full power of Arduino IDE 2 for compiling, uploading, and other advanced features.

## Features

-   **Blockly Visual Editor:** A fully integrated Blockly workspace for visual programming.
-   **C++-style Blocks:** Provides a smooth transition for beginners entering the world of C++.
-   **Arduino C++ Code Generation:** Automatically converts Blockly blocks into clean and functional Arduino C++ code.
-   **Custom Block Support:** Includes custom blocks for specific hardware (piCar) and advanced programming structures (Coding).
-   **Array Blocks:** A complete set of blocks for C++ array manipulation:
    -   **Declare Array:** Declare an array with a specified data type (int, float, String, bool) and size. Supports both global and local scope declaration.
    -   **Get Array Element:** Access an element of an array using an index.
    -   **Set Array Element:** Assign a value to an element at a specified index in an array.
    -   **Array Length:** Get the number of elements in an array.
-   **Global/Local Scope Control:** For array declarations, easily switch between global and local scope with appropriate visual feedback in the workspace.
-   **Synchronized Panel Closing:** Closing the piBlockly webview panel automatically closes its associated `.ino` file, ensuring a clean workspace.
-   **Enhanced Webview Security:** Implements a Content Security Policy (CSP) with a nonce to mitigate XSS vulnerabilities and restrict resource loading.
-   **Interactive Toolbar Icons:** Toolbar icons for common actions (Save, Save As, Close) with visual hover effects.

## Installation

Although this is a VS Code extension, it can also be run in Arduino IDE 2.3.6.

**Installation steps for Arduino IDE 2 (using Windows 11 as an example):**

1.  Close Arduino IDE 2.
2.  **Remove old versions:**
    *   Go to `C:\Users\[user name]\.arduinoIDE\deployedPlugins` and delete all `piblockly-x.x.x` folders.
    *   Go to `C:\Users\[user name]\.arduinoIDE\plugins` (if this folder does not exist, create it, paying attention to the 's' in 'plugins') and delete all `piblockly-x.x.x.vsix` files.
3.  **Download the latest `piblockly-x.x.x.vsix` file.**
    *   Place the downloaded `.vsix` file into `C:\Users\[user name]\.arduinoIDE\plugins` (if this folder does not exist, create it, paying attention to the 's' in 'plugins').
4.  Start Arduino IDE 2. You should see a pink π icon in the upper right corner. Click it to launch the piBlockly editor.

## Usage

1.  Open an Arduino `.ino` file in Arduino IDE 2.
2.  Click the "π" button in the upper right corner of the editor to launch the piBlockly editor. If there is no "π" button, you can press Shift + Ctrl + P and enter `piBlockly: Start piBlockly Editor` in the command palette.
3.  Choose to create a new project or open an existing `.xml` Blockly project file.
4.  Drag and drop blocks from the toolbox to build your program.
5.  The generated Arduino C++ code will be displayed in the associated `.ino` editor on the left.
6.  Use the toolbar buttons above the block editing area on the right to save your Blockly project (`.xml`) or close the editor.

## Development Status

simfonia is not a professional programmer, so development progress may be slow. I apologize for this.
The main implemented features include:

-   Core Blockly integration and Arduino C++ code generation.
-   Custom blocks for the author's current teaching-purpose wheeled robot, piCar, and general programming tools.
-   The appearance of the blocks maintains the original C++ flavor as much as possible, and blocks under the "Coding" category are provided for users to write freely. If you encounter a situation where there is no block, you can improvise.
-   Handling of webview lifecycle and security.

Future plans include dynamically loading third-party blocks from the web, theme switching, and further security enhancements.


## Issues

-   Between the block editing area and the code editing area, there may be some user interface malfunctions due to many unresolved technical issues.
-   The close button in the upper right corner of the block editing area works normally in VS Code, reminding to save and closing the block editing area, but it does not work in Arduino IDE 2. To use it in Arduino IDE 2, the best way is to press the "Save" or "Save As" button above the block editing area, and then press the "X" on the title tab to close the entire panel.
-   The title tab of the block editing area has an "X" to close the entire panel, but it will close directly without checking if the block file has been modified. Please use it with caution.
-   This extension has only been tested on Windows 11 + VS Code 1.105 + Arduino IDE 2.3.6.

## License

This project is licensed under the [MIT License](LICENSE).
