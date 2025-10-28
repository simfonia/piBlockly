@echo off
setlocal

:: Define paths
set "PROJECT_DIR=%~dp0"
set "ARDUINO_PLUGINS_DIR=C:\Users\simfonia\.arduinoIDE\plugins"
set "OLD_DEPLOYED_PLUGIN_DIR=C:\Users\simfonia\.arduinoIDE\deployedPlugins\piblockly-0.6.1"
set "VSIX_NAME_PATTERN=piblockly-*.vsix"

:: Navigate to the project directory
cd /d "%PROJECT_DIR%"

:: --- Step 1: Package the extension ---
echo [1/4] Packaging the extension...
call npx vsce package
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to package the extension. Please check vsce logs.
    goto :eof
)
echo     ... Done.
echo.

:: --- Step 2: Find the new .vsix file ---
echo [2/4] Searching for the new .vsix file...
for /f "delims=" %%f in ('dir /b /o-d "%VSIX_NAME_PATTERN%"') do (
    set "VSIX_FILE=%%f"
    goto :found_vsix
)

:not_found_vsix
echo.
echo ERROR: Could not find the generated .vsix file.
goto :eof

:found_vsix
echo     ... Found: %VSIX_FILE%
echo.

:: --- Step 3: Copy the .vsix file ---
echo [3/4] Copying %VSIX_FILE% to Arduino plugins directory...
copy /y "%VSIX_FILE%" "%ARDUINO_PLUGINS_DIR%\"
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to copy the .vsix file.
    goto :eof
)
echo     ... Done.
echo.

:: --- Step 4: Remove the old deployed plugin directory ---
echo [4/4] Removing the old deployed plugin directory...
if exist "%OLD_DEPLOYED_PLUGIN_DIR%" (
    rmdir /s /q "%OLD_DEPLOYED_PLUGIN_DIR%"
    echo     ... Done.
) else (
    echo     ... Directory not found, skipping.
)
echo.

echo ---
echo Deployment script finished successfully!
echo ---

endlocal
