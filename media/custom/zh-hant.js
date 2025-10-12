// Traditional Chinese language file
// Category Keys
Blockly.Msg["SIMFONIA_CATEGORY"] = "simfonia";
Blockly.Msg["PICAR_CATEGORY"] = "πCar";
Blockly.Msg["ARDUINO_CATEGORY"] = "Arduino";
Blockly.Msg["CODING_CATEGORY"] = "Coding";

// simfonia Blocks
Blockly.Msg["SIMFONIA_HUE"] = "#5b33a5"; // for simfonia


// Arduino Blocks
Blockly.Msg["ARDUINO_HUE"] = "#016c8d"; // for Arduino
Blockly.Msg["ARDUINO_CONTROL_HUE"] = "#016c8d"; // for Arduino I/O
Blockly.Msg["ARDUINO_DIGITAL_IO_HUE"] = "#0f960a"; // for Arduino Digital I/O
Blockly.Msg["ARDUINO_ANALOG_IO_HUE"] = "#FF9800"; // for Arduino Analog I/O
Blockly.Msg["ARDUINO_MATH_HUE"] = "#b13333"; // for Arduino math blocks (red-ish)


Blockly.Msg["ARDUINO_PIN_LABEL"] = "pin:";
Blockly.Msg["ARDUINO_MODE_LABEL"] = "mode:";

Blockly.Msg["ARDUINO_PIN_MODE"] = "pinMode";
Blockly.Msg["ARDUINO_PIN_MODE_TOOLTIP"] = "將指定的腳位設定為輸入或輸出模式。";
Blockly.Msg["ARDUINO_PIN_MODE_INPUT"] = "INPUT";
Blockly.Msg["ARDUINO_PIN_MODE_OUTPUT"] = "OUTPUT";
Blockly.Msg["ARDUINO_PIN_MODE_INPUT_PULLUP"] = "INPUT_PULLUP";

Blockly.Msg["ARDUINO_DIGITAL_READ"] = "digitalRead";
Blockly.Msg["ARDUINO_DIGITAL_READ_TOOLTIP"] = "讀入指定數位腳位的狀態，HIGH 或 LOW。";
Blockly.Msg["ARDUINO_DIGITAL_WRITE"] = "digitalWrite(%1, 值: %2)";
Blockly.Msg["ARDUINO_DIGITAL_WRITE_TOOLTIP"] = "將 HIGH 或 LOW 值寫出數位腳位。";
Blockly.Msg["ARDUINO_HIGH"] = "HIGH";
Blockly.Msg["ARDUINO_LOW"] = "LOW";

Blockly.Msg["ARDUINO_ANALOG_READ"] = "analogRead(%1)";
Blockly.Msg["ARDUINO_ANALOG_READ_TOOLTIP"] = "讀入指定類比腳位(analog in / ADC)的狀態(0-1023 for 10-bit)。";
Blockly.Msg["ARDUINO_ANALOG_WRITE"] = "analogWrite(%1, 值: %2)";
Blockly.Msg["ARDUINO_ANALOG_WRITE_TOOLTIP"] = "將類比值 (PWM, 0-255 for 8-bit) 寫出腳位(~)。";

Blockly.Msg["ARDUINO_CONSTRAIN_VALUE"] = "constrain ";
Blockly.Msg["ARDUINO_CONSTRAIN_LOW"] = "介於";
Blockly.Msg["ARDUINO_CONSTRAIN_HIGH"] = "與";
Blockly.Msg["ARDUINO_CONSTRAIN_TOOLTIP"] = "將數字限制在指定範圍內。";

Blockly.Msg["ARDUINO_MAP_VALUE"] = "map ";
Blockly.Msg["ARDUINO_MAP_FROMLOW"] = "從下限";
Blockly.Msg["ARDUINO_MAP_FROMHIGH"] = "上限";
Blockly.Msg["ARDUINO_MAP_TOLOW"] = "到下限";
Blockly.Msg["ARDUINO_MAP_TOHIGH"] = "上限";
Blockly.Msg["ARDUINO_MAP_TOOLTIP"] = "將數字從一個範圍重新映射到另一個範圍。";


// piCar Blocks
Blockly.Msg["PICAR_HUE"] = "#ee5b56"; // for piCar movement
Blockly.Msg["PICAR_SETUP_HUE"] = "#016c8d"; // for initialization
Blockly.Msg["PICAR_SENSOR_HUE"] = "#b1b100"; // for sensor
Blockly.Msg["PICAR_SERVO_HUE"] = "#07a91d"; // for servo
Blockly.Msg["PICAR_MEDIA_HUE"] = "#de57ad"; // for multimedia


Blockly.Msg["PICAR_INIT"] = "初始化 piCar";
Blockly.Msg["PICAR_INIT_TOOLTIP"] = "初始化 piCar 所需的腳位與變數";
Blockly.Msg["PICAR_SET_HAND_RANGE"] = "設定手臂開合範圍(0~180)";
Blockly.Msg["PICAR_SET_HAND_RANGE_TOOLTIP"] = "設定手臂開合的角度範圍，預設 170°";
Blockly.Msg["PICAR_RESET"] = "重新啟動 piCar";
Blockly.Msg["PICAR_RESET_TOOLTIP"] = "重新啟動 piCar";
Blockly.Msg["PICAR_DRIVE_LEFT"] = "直流馬達動力(-255 ~ 255) 左:";
Blockly.Msg["PICAR_DRIVE_RIGHT"] = "右:";
Blockly.Msg["PICAR_DRIVE_TOOLTIP"] = "控制左右輪動力 (-255 ~ 255)";
Blockly.Msg["PICAR_STOP"] = "停車";
Blockly.Msg["PICAR_STOP_COAST"] = "滑行";
Blockly.Msg["PICAR_STOP_BRAKE"] = "煞車";
Blockly.Msg["PICAR_STOP_TOOLTIP"] = "選擇停車方式：煞車或滑行";
Blockly.Msg["PICAR_CHECK_DISTANCE"] = "偵測距離 (cm)";
Blockly.Msg["PICAR_CHECK_DISTANCE_TOOLTIP"] = "使用超音波偵測前方障礙物距離 (cm)";
Blockly.Msg["PICAR_CHECK_COLOR"] = "偵測顏色 (黑0/白1)";
Blockly.Msg["PICAR_CHECK_COLOR_TOOLTIP"] = "使用紅外線偵測地面顏色，回傳 0 為黑色，1 為白色";
Blockly.Msg["PICAR_CHECK_GRAY"] = "偵測灰階 (0~1023，愈小愈黑)";
Blockly.Msg["PICAR_CHECK_GRAY_TOOLTIP"] = "使用紅外線偵測地面灰階值，回傳 0~1023 之間的數值，愈小愈黑。";
Blockly.Msg["PICAR_IN_POSITION"] = "手臂歸位";
Blockly.Msg["PICAR_IN_POSITION_TOOLTIP"] = "手臂伺服馬達歸位";
Blockly.Msg["PICAR_SET_LEFT_HAND_ANGLE"] = "設定左手角度為(180->0 順時針)";
Blockly.Msg["PICAR_SET_LEFT_HAND_ANGLE_TOOLTIP"] = "設定左手臂伺服馬達角度 (0-180)。初始位置在 180 度。";
Blockly.Msg["PICAR_SET_RIGHT_HAND_ANGLE"] = "設定右手角度為(0->180 逆時針)";
Blockly.Msg["PICAR_SET_RIGHT_HAND_ANGLE_TOOLTIP"] = "設定右手臂伺服馬達角度 (0-180)。初始位置在 0 度。";
Blockly.Msg["PICAR_CLOSE_HANDS"] = "手臂合起";
Blockly.Msg["PICAR_CLOSE_HANDS_TOOLTIP"] = "手臂合起";
Blockly.Msg["PICAR_OPEN_HANDS"] = "手臂張開";
Blockly.Msg["PICAR_OPEN_HANDS_TOOLTIP"] = "手臂張開";

Blockly.Msg["PICAR_MOVE_HANDS"] = "移動 %1 到 %2 % 開合，速度為 %3 (1-10)";
Blockly.Msg["PICAR_HAND_LEFT"] = "左手";
Blockly.Msg["PICAR_HAND_RIGHT"] = "右手";
Blockly.Msg["PICAR_HAND_BOTH"] = "雙手";
Blockly.Msg["PICAR_MOVE_HANDS_TOOLTIP"] = "以指定速度控制單手或雙手移動到特定開合度。此積木會等待動作完成(阻塞式)，建議放在 loop1 中執行以達成非同步效果。";

Blockly.Msg["PICAR_FLASHING_LIGHT"] = "閃爍 RGB 燈";
Blockly.Msg["PICAR_FLASHING_LIGHT_TOOLTIP"] = "閃爍 RGB 燈";

Blockly.Msg["PICAR_SET_LED_COLOR"] = "設定 RGB 燈";
Blockly.Msg["PICAR_SET_LED_COLOR_TOOLTIP"] = "設定指定 RGB 燈的顏色";
Blockly.Msg["PICAR_LED_LEFT"] = "後燈";
Blockly.Msg["PICAR_LED_RIGHT"] = "前燈";
Blockly.Msg["PICAR_LED_ALL"] = "所有燈";
Blockly.Msg["PICAR_COLOR"] = "顏色為";

Blockly.Msg["PICAR_EASTER_EGG"] = "播放彩蛋旋律 全音符的時間 (ms)";
Blockly.Msg["PICAR_EASTER_EGG_TOOLTIP"] = "播放一段旋律，數值愈大愈慢";

Blockly.Msg["PICAR_TONE"] = "在腳位 %1 上播放音調，頻率 %2，持續時間 (ms) %3 (不等待播完)";
Blockly.Msg["PICAR_TONE_TOOLTIP"] = "在指定腳位上產生音調。預設蜂鳴器位於腳位 22。";
Blockly.Msg["PICAR_NO_TONE"] = "停止在腳位 %1 上的音調";
Blockly.Msg["PICAR_NO_TONE_TOOLTIP"] = "停止在指定腳位上播放的音調。預設蜂鳴器位於腳位 22。";




// Coding Blocks
Blockly.Msg["CODING_HUE"] = "#585858"; // for coding

Blockly.Msg["CODING_RAW_STATEMENT"] = "自由寫 (指令)";
Blockly.Msg["CODING_RAW_STATEMENT_TOOLTIP"] = "可填入任意程式碼作為一個指令";

Blockly.Msg["CODING_RAW_INPUT"] = "自由寫 (嵌入)";
Blockly.Msg["CODING_RAW_INPUT_TOOLTIP"] = "可填入任意回傳值 (如：數字、文字、布林) 的程式碼";

Blockly.Msg["CODING_RAW_DEFINITION"] = "自由寫 (定義)";
Blockly.Msg["CODING_RAW_DEFINITION_TOOLTIP"] = "可填入全域定義、函式庫引用或自訂函式等程式碼";
Blockly.Msg["CODING_RAW_WRAPPER"] = "自由寫 (包覆)";
Blockly.Msg["CODING_RAW_WRAPPER_TOOLTIP"] = "可使用自訂程式碼包覆其他積木 (例如：自訂迴圈或條件判斷)";
Blockly.Msg["CODING_RAW_WRAPPER_TOP"] = "上方程式碼：";
Blockly.Msg["CODING_RAW_WRAPPER_BOTTOM"] = "下方程式碼：";

