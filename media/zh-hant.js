(function (Blockly) {
  Blockly.Msg = Blockly.Msg || {};
  Object.assign(Blockly.Msg, {
    // Traditional Chinese language file
    // Toolbar Tooltips
    "BKY_TOOLBAR_SAVE_TOOLTIP": "儲存專案",
    "BKY_TOOLBAR_SAVE_AS_TOOLTIP": "另存專案",
    "BKY_TOOLBAR_CLOSE_TOOLTIP": "關閉",
    "BKY_TOOLBAR_NEW_TOOLTIP": "新增專案",
    "BKY_TOOLBAR_OPEN_TOOLTIP": "開啟專案",

    // Update Button Tooltips
    "BKY_TOOLBAR_UPDATE_AVAILABLE_TOOLTIP": "發現新版本 v%1！(您目前為 v%2) 點此前往下載頁面",
    "BKY_TOOLBAR_UPDATE_LATEST_TOOLTIP": "目前為最新版 (v%1)",
    "BKY_TOOLBAR_UPDATE_CHECK_FAILED_TOOLTIP": "檢查更新失敗",

    // Toolbar Theme Labels
    "BKY_TOOLBAR_ENGINEER_LABEL": "Engineer",
    "BKY_TOOLBAR_ANGEL_LABEL": "Angel",

    // Category Keys (Engineer Style)
    "ARDUINO_CATEGORY_ENGINEER": "Arduino",
    "ARDUINO_STRUCTURE_CATEGORY_ENGINEER": "Structure",
    "ARDUINO_IO_CATEGORY_ENGINEER": "I/O",
    "ARDUINO_TIME_CATEGORY_ENGINEER": "Time",
    "ARDUINO_SERIAL_CATEGORY_ENGINEER": "Serial",
    "PICAR_CATEGORY_ENGINEER": "πCar",
    "CODING_CATEGORY_ENGINEER": "Coding",
    "LOGIC_CATEGORY_ENGINEER": "Logic",
    "LOOPS_CATEGORY_ENGINEER": "Loops",
    "MATH_CATEGORY_ENGINEER": "Math",
    "TEXT_CATEGORY_ENGINEER": "Text",
    "VARIABLES_CATEGORY_ENGINEER": "Variables",
    "ARRAY_CATEGORY_ENGINEER": "Array",
    "FUNCTIONS_CATEGORY_ENGINEER": "Functions",

    // Category Keys (Angel Style)
    "ARDUINO_CATEGORY_ANGEL": "Arduino",
    "ARDUINO_STRUCTURE_CATEGORY_ANGEL": "結構",
    "ARDUINO_IO_CATEGORY_ANGEL": "輸入/輸出",
    "ARDUINO_TIME_CATEGORY_ANGEL": "時間",
    "ARDUINO_SERIAL_CATEGORY_ANGEL": "序列埠",
    "PICAR_CATEGORY_ANGEL": "πCar",
    "CODING_CATEGORY_ANGEL": "程式碼",
    "LOGIC_CATEGORY_ANGEL": "邏輯",
    "LOOPS_CATEGORY_ANGEL": "迴圈",
    "MATH_CATEGORY_ANGEL": "數學",
    "TEXT_CATEGORY_ANGEL": "文字",
    "VARIABLES_CATEGORY_ANGEL": "變數",
    "ARRAY_CATEGORY_ANGEL": "陣列",
    "FUNCTIONS_CATEGORY_ANGEL": "函式",

    // Engineer Theme Hues
    "ARDUINO_HUE": "#016c8d",
    "ARDUINO_STRUCTURE_HUE": "#585858",
    "ARDUINO_CONTROL_HUE": "#016c8d",
    "ARDUINO_DIGITAL_IO_HUE": "#0f960a",
    "ARDUINO_ANALOG_IO_HUE": "#FF9800",
    "ARDUINO_TIME_HUE": "#1f039b",
    "ARDUINO_SERIAL_HUE": "#359AFF",
    "CODING_HUE": "#585858",
    "LOGIC_HUE": "#b198de",
    "LOOPS_HUE": "#7fcd81",
    "MATH_HUE": "#5C68A6",
    "TEXT_HUE": "#6a8871",
    "VARIABLES_HUE": "#ef9a9a",
    "ARRAY_HUE": "#d1972b",
    "FUNCTIONS_HUE": "#d22f73",

    // Angel Theme Hues
    "ANGEL_ARDUINO_HUE": "#016c8d",
    "ANGEL_ARDUINO_STRUCTURE_HUE": "#585858",
    "ANGEL_ARDUINO_IO_HUE": "#016c8d",
    "ANGEL_ARDUINO_TIME_HUE": "#1f039b",
    "ANGEL_ARDUINO_SERIAL_HUE": "#359AFF",
    "ANGEL_PICAR_HUE": "#ee5b56",
    "ANGEL_CODING_HUE": "#585858",
    "ANGEL_LOGIC_HUE": "#b198de",
    "ANGEL_LOOPS_HUE": "#7fcd81",
    "ANGEL_MATH_HUE": "#5C68A6",
    "ANGEL_TEXT_HUE": "#6a8871",
    "ANGEL_VARIABLES_HUE": "#ef9a9a",
    "ANGEL_ARRAY_HUE": "#d1972b",
    "ANGEL_FUNCTIONS_HUE": "#d22f73",

    // *********************************************************
    // Arduino
    // *********************************************************
    "INITIALIZES_SETUP_HELPURL": "",
    "INITIALIZES_LOOP_HELPURL": "",
    "ARDUINO_PIN_LABEL": "pin:",
    "ARDUINO_MODE_LABEL": "mode:",
    "ARDUINO_PIN_MODE": "pinMode",
    "ARDUINO_PIN_MODE_INPUT": "INPUT",
    "ARDUINO_PIN_MODE_OUTPUT": "OUTPUT",
    "ARDUINO_PIN_MODE_INPUT_PULLUP": "INPUT_PULLUP",
    "ARDUINO_HIGH": "HIGH",
    "ARDUINO_LOW": "LOW",


    // Arduino Structure
    // Engineer
    "BKY_INITIALIZES_SETUP_MSG_ENGINEER": "void setup()",
    "BKY_INITIALIZES_LOOP_MSG_ENGINEER": "void loop()",
    // Angel
    "BKY_INITIALIZES_SETUP_MSG_ANGEL": "當程式啟動時",
    "BKY_INITIALIZES_LOOP_MSG_ANGEL": "無限重複",
    // Tooltips
    "INITIALIZES_SETUP_TOOLTIP": "setup() 在程式開始時呼叫。用它來初始化變數、腳位模式、開始使用函式庫等。setup 函式只會在每次 Arduino 板上電或重置後執行一次。",
    "INITIALIZES_LOOP_TOOLTIP": "loop() 會不斷地重複執行，讓您的程式可以改變和回應。使用它來主動控制 Arduino 板。",

    // Arduino IO
    // Engineer
    "BKY_ARDUINO_PIN_MODE_MSG_ENGINEER": "pinMode(%1, %2)",
    "BKY_ARDUINO_DIGITAL_READ_MSG_ENGINEER": "digitalRead(%1)",
    "BKY_ARDUINO_DIGITAL_WRITE_MSG_ENGINEER": "digitalWrite(%1, %2)",
    "BKY_ARDUINO_ANALOG_READ_MSG_ENGINEER": "analogRead(%1)",
    "BKY_ARDUINO_ANALOG_WRITE_MSG_ENGINEER": "analogWrite(%1, %2)",
    // Angel
    "BKY_ARDUINO_PIN_MODE_MSG_ANGEL": "設定腳位 %1 為 %2 模式",
    "BKY_ARDUINO_DIGITAL_READ_MSG_ANGEL": "讀入數位腳位 %1",
    "BKY_ARDUINO_DIGITAL_WRITE_MSG_ANGEL": "寫出數位腳位 %1 為 %2",
    "BKY_ARDUINO_ANALOG_READ_MSG_ANGEL": "讀入類比腳位 %1",
    "BKY_ARDUINO_ANALOG_WRITE_MSG_ANGEL": "寫出類比腳位 %1 為 %2",
    // Tooltips
    "ARDUINO_PIN_MODE_TOOLTIP": "將指定的腳位設定為輸入或輸出模式。",
    "ARDUINO_DIGITAL_READ_TOOLTIP": "讀入指定數位腳位的狀態，HIGH 或 LOW。",
    "ARDUINO_DIGITAL_WRITE_TOOLTIP": "將 HIGH 或 LOW 值寫出數位腳位。",
    "ARDUINO_ANALOG_READ_TOOLTIP": "讀入指定類比腳位(analog in / ADC)的狀態(0-1023 for 10-bit)。",
    "ARDUINO_ANALOG_WRITE_TOOLTIP": "將類比值 (PWM, 0-255 for 8-bit) 寫出~腳位。",

    // Arduino Time
    // Engineer
    "BKY_ARDUINO_DELAY_MSG_ENGINEER": "delay(%1)",
    "BKY_ARDUINO_DELAY_MICROSECONDS_MSG_ENGINEER": "delayMicroseconds(%1)",
    "BKY_ARDUINO_MILLIS_MSG_ENGINEER": "millis()",
    "BKY_ARDUINO_MICROS_MSG_ENGINEER": "micros()",
    // Angel
    "BKY_ARDUINO_DELAY_MSG_ANGEL": "等待 %1 毫秒，再往下執行",
    "BKY_ARDUINO_DELAY_MICROSECONDS_MSG_ANGEL": "等待 %1 微秒，再往下執行",
    "BKY_ARDUINO_MILLIS_MSG_ANGEL": "從開機到現在的運行時間 (毫秒)",
    "BKY_ARDUINO_MICROS_MSG_ANGEL": "從開機到現在的運行時間 (微秒)",
    // Tooltips
    "ARDUINO_DELAY_TOOLTIP": "暫停程式往下執行，直到指定的毫秒數。",
    "ARDUINO_DELAY_MICROSECONDS_TOOLTIP": "暫停程式往下執行，直到指定的微秒數。",
    "ARDUINO_MILLIS_TOOLTIP": "回傳從 Arduino 開機到現在的毫秒數。",
    "ARDUINO_MICROS_TOOLTIP": "回傳從 Arduino 開機到現在的微秒數。",

    // Arduino Serial
    // Engineer
    "BKY_ARDUINO_SERIAL_BEGIN_MSG_ENGINEER": "Serial.begin(speed: %1)",
    "BKY_ARDUINO_SERIAL_PRINT_MSG_ENGINEER": "Serial.print(%1)",
    "BKY_ARDUINO_SERIAL_PRINTLN_MSG_ENGINEER": "Serial.println(%1)",
    "BKY_ARDUINO_SERIAL_AVAILABLE_MSG_ENGINEER": "Serial.available()",
    "BKY_ARDUINO_SERIAL_READ_MSG_ENGINEER": "Serial.read()",
    // Angel
    "BKY_ARDUINO_SERIAL_BEGIN_MSG_ANGEL": "開啟序列埠，速度 %1",
    "BKY_ARDUINO_SERIAL_PRINT_MSG_ANGEL": "序列埠印出 %1",
    "BKY_ARDUINO_SERIAL_PRINTLN_MSG_ANGEL": "序列埠印出 %1 並換行",
    "BKY_ARDUINO_SERIAL_AVAILABLE_MSG_ANGEL": "序列埠可讀取位元組",
    "BKY_ARDUINO_SERIAL_READ_MSG_ANGEL": "從序列埠讀取",
    // Tooltips
    "ARDUINO_SERIAL_BEGIN_TOOLTIP": "設定序列埠通訊的傳輸速率（鮑率）。",
    "ARDUINO_SERIAL_PRINT_TOOLTIP": "將資料傳送到序列埠。",
    "ARDUINO_SERIAL_PRINTLN_TOOLTIP": "將資料傳送到序列埠，並在結尾換行。",
    "ARDUINO_SERIAL_AVAILABLE_TOOLTIP": "獲取序列埠緩衝區中可讀取的位元組數，傳回整數。",
    "ARDUINO_SERIAL_READ_TOOLTIP": "讀取一個位元組的序列埠資料, 傳回整數。",

    // *********************************************************
    // piCar
    // *********************************************************
    "PICAR_HUE": "#ee5b56",
    "PICAR_SETUP_HUE": "#016c8d",
    "PICAR_SENSOR_HUE": "#b1b100",
    "PICAR_SERVO_HUE": "#07a91d",
    "PICAR_MEDIA_HUE": "#de57ad",
    "PICAR_INIT": "初始化 πCar",
    "PICAR_INIT_TOOLTIP": "初始化 πCar 並進入待機狀態",
    "PICAR_SET_HAND_RANGE": "設定手臂開合範圍(0~180)",
    "PICAR_SET_HAND_RANGE_TOOLTIP": "設定手臂開合的角度範圍，預設 170°",
    "PICAR_RESET": "重新啟動 πCar",
    "PICAR_RESET_TOOLTIP": "重新啟動 πCar",
    "PICAR_DRIVE_LEFT": "直流馬達動力(-255 ~ 255) 左:",
    "PICAR_DRIVE_RIGHT": "右:",
    "PICAR_DRIVE_TOOLTIP": "控制左右輪動力 (-255 ~ 255)",
    "PICAR_STOP": "停車",
    "PICAR_STOP_COAST": "滑行",
    "PICAR_STOP_BRAKE": "煞車",
    "PICAR_STOP_TOOLTIP": "選擇停車方式：煞車或滑行",
    "PICAR_CHECK_DISTANCE": "偵測距離 (cm)",
    "PICAR_CHECK_DISTANCE_TOOLTIP": "使用超音波偵測前方障礙物距離 (cm)",
    "PICAR_CHECK_COLOR": "偵測顏色 (黑0/白1)",
    "PICAR_CHECK_COLOR_TOOLTIP": "使用紅外線偵測地面顏色，回傳 0 為黑色，1 為白色",
    "PICAR_CHECK_GRAY": "偵測灰階 (0~1023，愈小愈黑)",
    "PICAR_CHECK_GRAY_TOOLTIP": "使用紅外線偵測地面灰階值，回傳 0~1023 之間的數值，愈小愈黑。",
    "PICAR_IN_POSITION": "手臂歸位",
    "PICAR_IN_POSITION_TOOLTIP": "手臂伺服馬達歸位",
    "PICAR_SET_LEFT_HAND_ANGLE": "設定左手角度為(180->0 順時針)",
    "PICAR_SET_LEFT_HAND_ANGLE_TOOLTIP": "設定左手臂伺服馬達角度 (0-180)。初始位置在 180 度。",
    "PICAR_SET_RIGHT_HAND_ANGLE": "設定右手角度為(0->180 逆時針)",
    "PICAR_SET_RIGHT_HAND_ANGLE_TOOLTIP": "設定右手臂伺服馬達角度 (0-180)。初始位置在 0 度。",
    "PICAR_CLOSE_HANDS": "手臂合起",
    "PICAR_CLOSE_HANDS_TOOLTIP": "手臂合起",
    "PICAR_OPEN_HANDS": "手臂張開",
    "PICAR_OPEN_HANDS_TOOLTIP": "手臂張開",
    "PICAR_MOVE_HANDS": "移動 %1 到 %2 % 開合，速度為 %3 (1-10)",
    "PICAR_HAND_LEFT": "左手",
    "PICAR_HAND_RIGHT": "右手",
    "PICAR_HAND_BOTH": "雙手",
    "PICAR_MOVE_HANDS_TOOLTIP": "以指定速度控制單手或雙手移動到特定開合度。此積木會等待動作完成(阻塞式)，建議放在 loop1 中執行以達成非同步效果。",
    "PICAR_FLASHING_LIGHT": "閃爍 RGB 燈",
    "PICAR_FLASHING_LIGHT_TOOLTIP": "閃爍 RGB 燈",
    "PICAR_SET_LED_COLOR": "設定 RGB 燈",
    "PICAR_SET_LED_COLOR_TOOLTIP": "設定指定 RGB 燈的顏色",
    "PICAR_LED_LEFT": "後燈",
    "PICAR_LED_RIGHT": "前燈",
    "PICAR_LED_ALL": "所有燈",
    "PICAR_COLOR": "顏色為",
    "PICAR_SET_TEMPO": "設定音樂速度",
    "PICAR_BPM": "BPM",
    "PICAR_SET_TEMPO_TOOLTIP": "設定音樂積木的全域每分鐘節拍數 (BPM)。",
    "PICAR_PLAY_NOTE": "播放音符",
    "PICAR_PIN": "腳位",
    "PICAR_FREQUENCY": "頻率 (Hz)",
    "PICAR_NOTE_DURATION": "時值:",
    "PICAR_WHOLE_NOTE": "全音符",
    "PICAR_HALF_NOTE": "二分音符",
    "PICAR_QUARTER_NOTE": "四分音符",
    "PICAR_EIGHTH_NOTE": "八分音符",
    "PICAR_SIXTEENTH_NOTE": "十六分音符",
    "PICAR_THIRTYSECOND_NOTE": "三十二分音符",
    "PICAR_PLAY_NOTE_TOOLTIP": "在指定腳位上以給定頻率和時值播放音符。可以是附點或三連音。",
    "PICAR_DOTTED": "附點",
    "PICAR_TRIPLET": "三連音",
    "PICAR_NOTE_TO_FREQUENCY": "音符轉頻率",
    "PICAR_NOTE_TO_FREQUENCY_TOOLTIP": "將音符 (例如 C4, A#5) 轉換為對應的頻率 (Hz)。",
    "PICAR_TONE": "在腳位 %1 上播放音調，頻率 %2，持續時間 (ms) %3 (不等待播完)",
    "PICAR_TONE_TOOLTIP": "在指定腳位上產生音調。預設蜂鳴器位於腳位 22。",
    "PICAR_NO_TONE": "停止在腳位 %1 上的音調",
    "PICAR_NO_TONE_TOOLTIP": "停止在指定腳位上播放的音調。預設蜂鳴器位於腳位 22。",
    "PICAR_NOTE_NAME_REST": "休止符",

    // *********************************************************
    // Coding
    // *********************************************************
    // Engineer
    "BKY_CODING_RAW_STATEMENT_ENGINEER": "code: %1",
    "BKY_CODING_RAW_INPUT_ENGINEER": "expression: %1",
    "BKY_CODING_RAW_DEFINITION_ENGINEER": "global code %1",
    "BKY_CODING_RAW_WRAPPER_ENGINEER": "block %1",
    "BKY_CODING_RAW_WRAPPER_TOP_ENGINEER": "begin: %1",
    "BKY_CODING_RAW_WRAPPER_BOTTOM_ENGINEER": "end: %1",
    // Angel
    "BKY_CODING_RAW_STATEMENT_ANGEL": "執行程式碼 %1",
    "BKY_CODING_RAW_INPUT_ANGEL": "取得數值 %1",
    "BKY_CODING_RAW_DEFINITION_ANGEL": "在全域區定義 %1",
    "BKY_CODING_RAW_WRAPPER_ANGEL": "程式碼區塊 %1",
    "BKY_CODING_RAW_WRAPPER_TOP_ANGEL": "開始: %1",
    "BKY_CODING_RAW_WRAPPER_BOTTOM_ANGEL": "結束: %1",
    // Tooltip
    "CODING_RAW_STATEMENT_TOOLTIP": "可填入任意程式碼作為一個指令",
    "CODING_RAW_INPUT_TOOLTIP": "可填入任意回傳值 (如：數字、文字、布林) 的程式碼",
    "CODING_RAW_DEFINITION_TOOLTIP": "可填入全域定義、函式庫引用或自訂函式等程式碼",
    "CODING_RAW_WRAPPER_TOOLTIP": "可使用自訂程式碼包覆其他積木 (例如：自訂迴圈或條件判斷)",


    // *********************************************************
    // Logic
    // *********************************************************
    // Tooltip
    "CONTROLS_IF_TOOLTIP_1": "如果一個值為真，則執行一些語句。",
    "CONTROLS_IF_TOOLTIP_2": "如果一個值為真，則執行第一塊語句。否則，執行第二塊語句。",
    "CONTROLS_IF_TOOLTIP_3": "如果第一個值為真，則執行第一塊語句。否則，如果第二個值為真，則執行第二塊語句。",
    "CONTROLS_IF_TOOLTIP_4": "如果第一個值為真，則執行第一塊語句。否則，如果第二個值為真，則執行第二塊語句。如果所有值都為假，則執行最後一塊語句。",
    "CONTROLS_IF_ELSEIF_TOOLTIP": "為「如果」積木添加一個「否則如果」條件。",
    "CONTROLS_IF_ELSE_TOOLTIP": "為「如果」積木添加一個「否則」條件。",
    "CONTROLS_IF_IF_TOOLTIP": "添加、移除或重新排序區塊來重設此「如果」積木。",
    "LOGIC_NEGATE_TOOLTIP": "如果輸入為假，則傳回真。如果輸入為真，則傳回假。",
    "LOGIC_BOOLEAN_TOOLTIP": "傳回「真」或「假」。",


    // Logic Controls If
    "BKY_CONTROLS_IF_MSG_IF_ENGINEER": "if",
    "BKY_CONTROLS_IF_MSG_THEN_ENGINEER": "",
    "BKY_CONTROLS_IF_MSG_ELSEIF_ENGINEER": "else if",
    "BKY_CONTROLS_IF_MSG_ELSE_ENGINEER": "else",
    // Angel
    "BKY_CONTROLS_IF_MSG_IF_ANGEL": "假如",
    "BKY_CONTROLS_IF_MSG_THEN_ANGEL": "",
    "BKY_CONTROLS_IF_MSG_ELSEIF_ANGEL": "否則假如",
    "BKY_CONTROLS_IF_MSG_ELSE_ANGEL": "其他情況",

    // Logic Compare
    "BKY_LOGIC_COMPARE_MSG_ENGINEER": "%1 %2 %3",
    "BKY_LOGIC_COMPARE_MSG_ANGEL": "%1 %2 %3",

    // Logic Operation Operators
    // Engineer
    "BKY_LOGIC_OPERATION_MSG_ENGINEER": "%1 %2 %3",
    "BKY_LOGIC_OPERATION_AND_ENGINEER": "&&",
    "BKY_LOGIC_OPERATION_OR_ENGINEER": "||",
    "BKY_LOGIC_NEGATE_MSG_ENGINEER": "! %1",
    // Angel
    "BKY_LOGIC_OPERATION_MSG_ANGEL": "%1 %2 %3",
    "BKY_LOGIC_OPERATION_AND_ANGEL": "且",
    "BKY_LOGIC_OPERATION_OR_ANGEL": "或",
    "BKY_LOGIC_NEGATE_MSG_ANGEL": "非 %1",

    // Logic Boolean
    // Engineer
    "BKY_LOGIC_BOOLEAN_TRUE_ENGINEER": "true",
    "BKY_LOGIC_BOOLEAN_FALSE_ENGINEER": "false",
    // Angel
    "BKY_LOGIC_BOOLEAN_TRUE_ANGEL": "真",
    "BKY_LOGIC_BOOLEAN_FALSE_ANGEL": "假",

    // *********************************************************
    // Loops
    // *********************************************************
    // Engineer
    "BKY_CONTROLS_WHILE_MSG_ENGINEER": "while (%1) {",
    "BKY_CONTROLS_FOR_MSG_ENGINEER": "for (int %1 = %2; %3 %4 %5; %6 %7 %8) {",
    "BKY_CONTROLS_FLOW_STATEMENTS_MSG_ENGINEER": "%1",
    // Angel
    "BKY_CONTROLS_WHILE_MSG_ANGEL": "當 %1",
    "BKY_CONTROLS_FOR_MSG_ANGEL": "計數，變數%1 = %2 ; %3%4%5 ; 每次變動(%6%7 %8) ",
    "BKY_CONTROLS_FLOW_STATEMENTS_MSG_ANGEL": "%1 迴圈",
    // Tooltip
    "CONTROLS_WHILE_TOOLTIP": "當條件為真時，重複執行一些語句。",
    "CONTROLS_FOR_TOOLTIP": "讓變數 從開始值到結束值，按照指定的間隔計數，並執行指定的積木。",
    "CONTROLS_FLOW_STATEMENTS_TOOLTIP": "跳出(break)一層迴圈或繼續(continue)下一次迭代。",

    // *********************************************************
    // Math
    // *********************************************************
    // Tooltip
    "MATH_NUMBER_TOOLTIP": "一個數字。",
    "MATH_ARITHMETIC_TOOLTIP_ADD": "傳回兩個數字的總和。",
    "MATH_ARITHMETIC_TOOLTIP_MINUS": "傳回兩個數字的差。",
    "MATH_ARITHMETIC_TOOLTIP_MULTIPLY": "傳回兩個數字的乘積。",
    "MATH_ARITHMETIC_TOOLTIP_DIVIDE": "傳回兩個數字的商。",
    "MATH_ARITHMETIC_TOOLTIP_POWER": "傳回第一個數字的第二個數字次方。",
    "MATH_SINGLE_TOOLTIP_ROOT": "傳回一個數字的平方根。",
    "MATH_SINGLE_TOOLTIP_ABS": "傳回一個數字的絕對值。",
    "MATH_SINGLE_TOOLTIP_NEG": "傳回一個數字的負數。",
    "MATH_SINGLE_TOOLTIP_LN": "傳回一個數字的自然對數。",
    "MATH_SINGLE_TOOLTIP_LOG10": "傳回一個數字的以 10 為底的對數。",
    "MATH_SINGLE_TOOLTIP_EXP": "傳回 e 的指定數次方。",
    "MATH_SINGLE_TOOLTIP_POW10": "傳回 10 的指定數次方。",
    // Override math function display names
    "MATH_SINGLE_OP_ABSOLUTE": "abs",
    "MATH_SINGLE_OP_ROOT": "sqrt",

    // Engineer
    "BKY_ARDUINO_CONSTRAIN_MSG_ENGINEER": "constrain( %1, %2, %3 )",
    "BKY_ARDUINO_MAP_MSG_ENGINEER": "map( %1, %2, %3, %4, %5 )",
    "BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ENGINEER": "randomSeed( %1 )",
    "BKY_ARDUINO_MATH_RANDOM_INT_MSG_ENGINEER": "random( %1, %2 )",
    // Angel
    "BKY_ARDUINO_CONSTRAIN_MSG_ANGEL": "限制 %1 在 %2 和 %3 之間",
    "BKY_ARDUINO_MAP_MSG_ANGEL": "將 %1 從 %2 - %3 範圍重新對應到 %4 - %5",
    "BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ANGEL": "設定隨機種子為 %1",
    "BKY_ARDUINO_MATH_RANDOM_INT_MSG_ANGEL": "隨機數，介於 %1 和 %2 之間",
    // Tooltip
    "ARDUINO_CONSTRAIN_TOOLTIP": "將一個數字限制在一個範圍內。參數：(要限制的值, 範圍下限, 範圍上限)。",
    "ARDUINO_MAP_TOOLTIP": "將一個數字從一個範圍重新對應到另一個範圍。參數：(要對應的值, 原始範圍下限, 原始範圍上限, 目標範圍下限, 目標範圍上限)。",
    "ARDUINO_MATH_RANDOM_SEED_TOOLTIP": "初始化偽亂數生成器。建議使用一個未連接的類比腳位作為種子。",
    "ARDUINO_MATH_RANDOM_INT_TOOLTIP": "產生一個介於 min (包含) 和 max (不包含) 之間的偽亂數。",


    // *********************************************************
    // Text
    // *********************************************************
    // Tooltip
    "TEXT_TEXT_TOOLTIP": "一個字母、單字或一行文字。",
    "TEXT_JOIN_TOOLTIP": "透過連接任意數量的項目來建立一段文字。",
    "TEXT_APPEND_TOOLTIP": "將一些文字附加到變數。",
    "TEXT_LENGTH_TOOLTIP": "傳回所提供文字中的字元數（包含空格）。",

    // Text Append
    "BKY_TEXT_APPEND_MSG_ENGINEER": "%1 += %2",
    "BKY_TEXT_APPEND_MSG_ANGEL": "將文字 %2 加到 %1 後面",

    // Text Join
    "BKY_TEXT_JOIN_MSG_ENGINEER": "join",
    "BKY_TEXT_JOIN_MSG_ANGEL": "組合文字",

    // Text Length
    "BKY_TEXT_LENGTH_MESSAGE_ENGINEER": "%1.length()",
    "BKY_TEXT_LENGTH_MESSAGE_ANGEL": "文字 %1 的長度",

    // *********************************************************
    // Variables
    // *********************************************************
    // Override default variable name
    "VARIABLES_DEFAULT_NAME": "var",

    // Engineer
    "BKY_VARIABLES_DECLARE_GLOBAL_MSG_ENGINEER": "Global %1 %2 = %3",
    "BKY_VARIABLES_DECLARE_LOCAL_MSG_ENGINEER": "Local %1 %2 = %3",
    "BKY_VARIABLES_SET_MSG_ENGINEER": "%1 = %2",
    // Angel
    "BKY_VARIABLES_DECLARE_GLOBAL_MSG_ANGEL": "建立全域變數 %2 型別為 %1 初始值為 %3",
    "BKY_VARIABLES_DECLARE_LOCAL_MSG_ANGEL": "建立區域變數 %2 型別為 %1 初始值為 %3",
    "BKY_VARIABLES_SET_MSG_ANGEL": "設定 %1 為 %2",
    // Tooltip
    "VARIABLES_DECLARE_GLOBAL_TOOLTIP": "宣告一個全域變數。",
    "VARIABLES_DECLARE_LOCAL_TOOLTIP": "宣告一個區域變數。",
    "VARIABLES_GET_TOOLTIP": "傳回此變數的值。",
    "VARIABLES_SET_TOOLTIP": "將此變數設定為等於輸入值。",


    // *********************************************************
    // Array
    // *********************************************************
    // Engineer
    "BKY_ARRAY_DECLARE_GLOBAL_TITLE_ENGINEER": "Global Array",
    "BKY_ARRAY_DECLARE_LOCAL_TITLE_ENGINEER": "Local Array",
    "BKY_ARRAY_GET_BRACKET_OPEN_ENGINEER": "[",
    "BKY_ARRAY_GET_BRACKET_CLOSE_ENGINEER": "]",
    "BKY_ARRAY_SET_BRACKET_OPEN_ENGINEER": "[",
    "BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ENGINEER": "] = ",
    "BKY_ARRAY_LENGTH_TITLE_ENGINEER": "length of Array",
    // Angel
    "BKY_ARRAY_DECLARE_GLOBAL_TITLE_ANGEL": "建立全域陣列",
    "BKY_ARRAY_DECLARE_LOCAL_TITLE_ANGEL": "建立區域陣列",
    "BKY_ARRAY_GET_BRACKET_OPEN_ANGEL": "項目 #",
    "BKY_ARRAY_GET_BRACKET_CLOSE_ANGEL": "",
    "BKY_ARRAY_SET_BRACKET_OPEN_ANGEL": "項目 #",
    "BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ANGEL": " 設為 ",
    "BKY_ARRAY_LENGTH_TITLE_ANGEL": "陣列長度",
    // Tooltip
    "ARRAY_DECLARE_GLOBAL_TOOLTIP": "宣告一個指定類型和大小的全域陣列。",
    "ARRAY_DECLARE_LOCAL_TOOLTIP": "宣告一個指定類型和大小的區域陣列。",
    "ARRAY_GET_TOOLTIP": "從陣列中獲取指定索引的元素。",
    "ARRAY_SET_TOOLTIP": "設定陣列中指定索引的元素值。",
    "ARRAY_LENGTH_TOOLTIP": "獲取陣列的元素數量。",


    // *********************************************************
    // Functions
    // *********************************************************
    // Engineer
    "BKY_CUSTOM_FUNCTIONS_DEFNORETURN_MSG_ENGINEER": "void %1 (%2) {",
    "BKY_CUSTOM_FUNCTIONS_DEFRETURN_MSG_ENGINEER": "%1 %2 (%3) {",
    "BKY_CUSTOM_FUNCTIONS_CALLNORETURN_MSG_ENGINEER": "%1()",
    "BKY_CUSTOM_FUNCTIONS_CALLRETURN_MSG_ENGINEER": "%1()",
    "BKY_CUSTOM_FUNCTIONS_MUTATORCONTAINER_MSG_ENGINEER": "函式輸入",
    "BKY_CUSTOM_FUNCTIONS_MUTATORARG_MSG_ENGINEER": "參數",
    "BKY_CUSTOM_FUNCTIONS_RETURN_MSG_ENGINEER": "return %1",
    // Angel
    "BKY_CUSTOM_FUNCTIONS_DEFNORETURN_MSG_ANGEL": "建立函式 %1 (%2)",
    "BKY_CUSTOM_FUNCTIONS_DEFRETURN_MSG_ANGEL": "建立函式 %2 (%3) 並傳回 %1",
    "BKY_CUSTOM_FUNCTIONS_CALLNORETURN_MSG_ANGEL": "執行函式 %1 (%2)",
    "BKY_CUSTOM_FUNCTIONS_CALLRETURN_MSG_ANGEL": "從函式 %1 (%2)取得結果 ",
    "BKY_CUSTOM_FUNCTIONS_MUTATORCONTAINER_MSG_ANGEL": "函式輸入",
    "BKY_CUSTOM_FUNCTIONS_MUTATORARG_MSG_ANGEL": "參數",
    "BKY_CUSTOM_FUNCTIONS_RETURN_MSG_ANGEL": "傳回 %1",
    // Tooltip
    "FUNCTIONS_DEFNORETURN_TOOLTIP": "建立一個沒有輸出的函式。",
    "FUNCTIONS_DEFRETURN_TOOLTIP": "建立一個有輸出的函式。",
    "FUNCTIONS_CALLNORETURN_TOOLTIP": "執行使用者定義的函式。",
    "FUNCTIONS_CALLRETURN_TOOLTIP": "執行使用者定義的函式，並使用其輸出。",
    "FUNCTIONS_IFRETURN_TOOLTIP": "從函式傳回一個值。",
    "FUNCTIONS_MUTATORARG_TOOLTIP": "為函式添加一個輸入參數。",
    "FUNCTIONS_CALLNORETURN_TITLE": "呼叫 ",
    "FUNCTIONS_CALLRETURN_TITLE": "取得函式回傳值 ",
    "FUNCTIONS_RETURN_TOOLTIP": "從函式傳回一個值。",

  });
})(Blockly);

