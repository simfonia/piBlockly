(function(Blockly) {
  Blockly.Msg = Blockly.Msg || {};
  Object.assign(Blockly.Msg, {
    // Traditional Chinese language file
    // Category Keys
    "ARDUINO_CATEGORY": "Arduino",
    "ARDUINO_STRUCTURE_CATEGORY": "Structure",
    "ARDUINO_IO_CATEGORY": "I/O",
    "ARDUINO_TIME_CATEGORY": "Time",
    "ARDUINO_SERIAL_CATEGORY": "Serial",
    "PICAR_CATEGORY": "πCar",
    "CODING_CATEGORY": "Coding",

    // Engineer Theme Hues (Original)
    "ARDUINO_HUE": "#016c8d",
    "ARDUINO_STRUCTURE_HUE": "#585858",
    "ARDUINO_CONTROL_HUE": "#016c8d",
    "ARDUINO_DIGITAL_IO_HUE": "#0f960a",
    "ARDUINO_ANALOG_IO_HUE": "#FF9800",
    "ARDUINO_TIME_HUE": "#1f039b",
    "ARDUINO_SERIAL_HUE": "#359AFF",
    "ARDUINO_MATH_HUE": "#b13333",
    "LOGIC_HUE": "#5C81A6",
    "LOOPS_HUE": "#5CA65C",
    "MATH_HUE": "#5C68A6",
    "TEXT_HUE": "#6a8871",
    "VARIABLES_HUE": "#A65C81",
    "FUNCTIONS_HUE": "#d22f73",

    // Angel Theme Hues
    "ANGEL_ARDUINO_HUE": 175,
    "ANGEL_LOGIC_HUE": 290,
    "ANGEL_LOOPS_HUE": 205,
    "ANGEL_MATH_HUE": 60,
    "ANGEL_TEXT_HUE": "#6a8871", // Set to match TEXT_HUE
    "ANGEL_VARIABLES_HUE": 185,
    "ANGEL_FUNCTIONS_HUE": 330,
    "ANGEL_CODING_HUE": 140,

    // --- Dual-Style Messages ---
    // Structure
    "BKY_INITIALIZES_SETUP_MSG_ENGINEER": "void setup()",
    "BKY_INITIALIZES_SETUP_MSG_ANGEL": "當程式啟動時",
    "BKY_INITIALIZES_LOOP_MSG_ENGINEER": "void loop()",
    "BKY_INITIALIZES_LOOP_MSG_ANGEL": "無限重複",

    // Logic
    "BKY_LOGIC_COMPARE_MSG_ENGINEER": "%1 %2 %3",
    "BKY_LOGIC_COMPARE_MSG_ANGEL": "%1 %2 %3",
    "BKY_LOGIC_OPERATION_MSG_ENGINEER": "%1 %2 %3",
    "BKY_LOGIC_OPERATION_MSG_ANGEL": "%1 %2 %3",
    "BKY_LOGIC_NEGATE_MSG_ENGINEER": "! %1",
    "BKY_LOGIC_NEGATE_MSG_ANGEL": "非 %1",

    // Logic Operation Operators
    "BKY_LOGIC_OPERATION_AND_ENGINEER": "&&",
    "BKY_LOGIC_OPERATION_AND_ANGEL": "且",
    "BKY_LOGIC_OPERATION_OR_ENGINEER": "||",
    "BKY_LOGIC_OPERATION_OR_ANGEL": "或",

    // Logic Boolean
    "BKY_LOGIC_BOOLEAN_TRUE_ENGINEER": "true",
    "BKY_LOGIC_BOOLEAN_TRUE_ANGEL": "真",
    "BKY_LOGIC_BOOLEAN_FALSE_ENGINEER": "false",
    "BKY_LOGIC_BOOLEAN_FALSE_ANGEL": "假",

    // Toolbar Tooltips
    "BKY_TOOLBAR_SAVE_TOOLTIP": "儲存積木",
    "BKY_TOOLBAR_SAVE_AS_TOOLTIP": "另存積木",
    "BKY_TOOLBAR_CLOSE_TOOLTIP": "關閉",
    // Toolbar Theme Labels
    "BKY_TOOLBAR_ENGINEER_LABEL": "Engineer",
    "BKY_TOOLBAR_ANGEL_LABEL": "Angel",

    // Loops
    "BKY_CONTROLS_FOR_MSG_ENGINEER": "for (int %1 = %2; %3 %4 %5; %6 %7 %8) {",
    "BKY_CONTROLS_FOR_MSG_ANGEL": "計數，變數 %1 從 %2 到 %5，間隔 %8 (%3%4%6%7)",
    "BKY_CONTROLS_WHILEUNTIL_MSG_ENGINEER": "while (%1) {",
    "BKY_CONTROLS_WHILEUNTIL_MSG_ANGEL": "當 %1",
    "BKY_CONTROLS_FLOW_STATEMENTS_MSG_ENGINEER": "%1",
    "BKY_CONTROLS_FLOW_STATEMENTS_MSG_ANGEL": "%1 迴圈",

    // Variables
    "BKY_VARIABLES_DECLARE_GLOBAL_MSG_ENGINEER": "Global %1 %2 = %3",
    "BKY_VARIABLES_DECLARE_GLOBAL_MSG_ANGEL": "建立全域變數 %2 型別為 %1 初始值為 %3",
    "BKY_VARIABLES_DECLARE_LOCAL_MSG_ENGINEER": "Local %1 %2 = %3",
    "BKY_VARIABLES_DECLARE_LOCAL_MSG_ANGEL": "建立區域變數 %2 型別為 %1 初始值為 %3",
    "BKY_VARIABLES_SET_MSG_ENGINEER": "%1 = %2",
    "BKY_VARIABLES_SET_MSG_ANGEL": "設定 %1 為 %2",

    // Functions
    "BKY_CUSTOM_PROCEDURES_DEFNORETURN_MSG_ENGINEER": "void %1 (%2) {",
    "BKY_CUSTOM_PROCEDURES_DEFNORETURN_MSG_ANGEL": "建立函式 %1 (%2)",
    "BKY_CUSTOM_PROCEDURES_DEFRETURN_MSG_ENGINEER": "%1 %2 (%3) {",
    "BKY_CUSTOM_PROCEDURES_DEFRETURN_MSG_ANGEL": "建立函式 %2 (%3) 並傳回 %1",
    "BKY_CUSTOM_PROCEDURES_CALLNORETURN_MSG_ENGINEER": "%1()",
    "BKY_CUSTOM_PROCEDURES_CALLNORETURN_MSG_ANGEL": "執行函式 %1 (%2)",
    "BKY_CUSTOM_PROCEDURES_CALLRETURN_MSG_ENGINEER": "%1()",
    "BKY_CUSTOM_PROCEDURES_CALLRETURN_MSG_ANGEL": "從函式 %1 (%2)取得結果 ",
    "BKY_CUSTOM_PROCEDURES_MUTATORCONTAINER_MSG_ENGINEER": "函式輸入",
    "BKY_CUSTOM_PROCEDURES_MUTATORCONTAINER_MSG_ANGEL": "函式輸入",
    "BKY_CUSTOM_PROCEDURES_MUTATORARG_MSG_ENGINEER": "參數",
    "BKY_CUSTOM_PROCEDURES_MUTATORARG_MSG_ANGEL": "參數",
    "BKY_CUSTOM_PROCEDURES_RETURN_MSG_ENGINEER": "return %1",
    "BKY_CUSTOM_PROCEDURES_RETURN_MSG_ANGEL": "傳回 %1",

    // Text
    "BKY_TEXT_APPEND_MSG_ENGINEER": "%1 += %2",
    "BKY_TEXT_APPEND_MSG_ANGEL": "將文字 %2 加到 %1 後面",

    // Text Join
    "BKY_TEXT_JOIN_MSG_ENGINEER": "join",
    "BKY_TEXT_JOIN_MSG_ANGEL": "組合文字",

    // Text Length
    "BKY_TEXT_LENGTH_MESSAGE_ENGINEER": "%1.length()",
    "BKY_TEXT_LENGTH_MESSAGE_ANGEL": "文字 %1 的長度",

    // Arduino IO
    "BKY_ARDUINO_PIN_MODE_MSG_ENGINEER": "pinMode(%1, %2)",
    "BKY_ARDUINO_PIN_MODE_MSG_ANGEL": "設定腳位 %1 為 %2 模式",
    "BKY_ARDUINO_DIGITAL_READ_MSG_ENGINEER": "digitalRead(%1)",
    "BKY_ARDUINO_DIGITAL_READ_MSG_ANGEL": "讀入數位腳位 %1",
    "BKY_ARDUINO_DIGITAL_WRITE_MSG_ENGINEER": "digitalWrite(%1, %2)",
    "BKY_ARDUINO_DIGITAL_WRITE_MSG_ANGEL": "寫出數位腳位 %1 為 %2",
    "BKY_ARDUINO_ANALOG_READ_MSG_ENGINEER": "analogRead(%1)",
    "BKY_ARDUINO_ANALOG_READ_MSG_ANGEL": "讀入類比腳位 %1",
    "BKY_ARDUINO_ANALOG_WRITE_MSG_ENGINEER": "analogWrite(%1, %2)",
    "BKY_ARDUINO_ANALOG_WRITE_MSG_ANGEL": "寫出類比腳位 %1 為 %2",

    // Arduino Time
    "BKY_ARDUINO_DELAY_MSG_ENGINEER": "delay(%1)",
    "BKY_ARDUINO_DELAY_MSG_ANGEL": "等待 %1 毫秒",
    "BKY_ARDUINO_DELAY_MICROSECONDS_MSG_ENGINEER": "delayMicroseconds(%1)",
    "BKY_ARDUINO_DELAY_MICROSECONDS_MSG_ANGEL": "等待 %1 微秒",
    "BKY_ARDUINO_MILLIS_MSG_ENGINEER": "millis()",
    "BKY_ARDUINO_MILLIS_MSG_ANGEL": "運行時間 (毫秒)",
    "BKY_ARDUINO_MICROS_MSG_ENGINEER": "micros()",
    "BKY_ARDUINO_MICROS_MSG_ANGEL": "運行時間 (微秒)",

    // Arduino Serial
    "BKY_ARDUINO_SERIAL_BEGIN_MSG_ENGINEER": "Serial.begin(speed: %1)",
    "BKY_ARDUINO_SERIAL_BEGIN_MSG_ANGEL": "開啟序列埠，速度 %1",
    "BKY_ARDUINO_SERIAL_PRINT_MSG_ENGINEER": "Serial.print(%1)",
    "BKY_ARDUINO_SERIAL_PRINT_MSG_ANGEL": "序列埠印出 %1",
    "BKY_ARDUINO_SERIAL_PRINTLN_MSG_ENGINEER": "Serial.println(%1)",
    "BKY_ARDUINO_SERIAL_PRINTLN_MSG_ANGEL": "序列埠印出 %1 並換行",
    "BKY_ARDUINO_SERIAL_AVAILABLE_MSG_ENGINEER": "Serial.available()",
    "BKY_ARDUINO_SERIAL_AVAILABLE_MSG_ANGEL": "序列埠可讀取位元組",
    "BKY_ARDUINO_SERIAL_READ_MSG_ENGINEER": "Serial.read()",
    "BKY_ARDUINO_SERIAL_READ_MSG_ANGEL": "從序列埠讀取",

    // Coding
    "BKY_CODING_RAW_STATEMENT_ENGINEER": "code: %1",
    "BKY_CODING_RAW_STATEMENT_ANGEL": "執行程式碼 %1",
    "BKY_CODING_RAW_INPUT_ENGINEER": "expression: %1",
    "BKY_CODING_RAW_INPUT_ANGEL": "取得數值 %1",
    "BKY_CODING_RAW_DEFINITION_ENGINEER": "global code %1",
    "BKY_CODING_RAW_DEFINITION_ANGEL": "在全域區定義 %1",
    "BKY_CODING_RAW_WRAPPER_ENGINEER": "block %1",
    "BKY_CODING_RAW_WRAPPER_ANGEL": "程式碼區塊 %1",
    "BKY_CODING_RAW_WRAPPER_TOP_ENGINEER": "begin: %1",
    "BKY_CODING_RAW_WRAPPER_TOP_ANGEL": "開始: %1",
    "BKY_CODING_RAW_WRAPPER_BOTTOM_ENGINEER": "end: %1",
    "BKY_CODING_RAW_WRAPPER_BOTTOM_ANGEL": "結束: %1",

    // Arduino Math
    "BKY_ARDUINO_CONSTRAIN_MSG_ENGINEER": "constrain( %1, %2, %3 )",
    "BKY_ARDUINO_CONSTRAIN_MSG_ANGEL": "限制 %1 在 %2 和 %3 之間",
    "BKY_ARDUINO_MAP_MSG_ENGINEER": "map( %1, %2, %3, %4, %5 )",
    "BKY_ARDUINO_MAP_MSG_ANGEL": "將 %1 從 %2 - %3 範圍重新對應到 %4 - %5",
    "BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ENGINEER": "randomSeed( %1 )",
    "BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ANGEL": "設定隨機種子為 %1",
    "BKY_ARDUINO_MATH_RANDOM_INT_MSG_ENGINEER": "random( %1, %2 )",
    "BKY_ARDUINO_MATH_RANDOM_INT_MSG_ANGEL": "隨機數，介於 %1 和 %2 之間",

    // Controls If
    "BKY_CONTROLS_IF_MSG_IF_ENGINEER": "if",
    "BKY_CONTROLS_IF_MSG_IF_ANGEL": "假如",
    "BKY_CONTROLS_IF_MSG_THEN_ENGINEER": "",
    "BKY_CONTROLS_IF_MSG_THEN_ANGEL": "",
    "BKY_CONTROLS_IF_MSG_ELSEIF_ENGINEER": "else if",
    "BKY_CONTROLS_IF_MSG_ELSEIF_ANGEL": "否則假如",
    "BKY_CONTROLS_IF_MSG_ELSE_ENGINEER": "else",
    "BKY_CONTROLS_IF_MSG_ELSE_ANGEL": "其他情況",

    // Arduino Blocks
    "INITIALIZES_SETUP_TOOLTIP": "setup() 在程式開始時呼叫。用它來初始化變數、腳位模式、開始使用函式庫等。setup 函式只會在每次 Arduino 板上電或重置後執行一次。",
    "INITIALIZES_SETUP_HELPURL": "",
    "INITIALIZES_LOOP_TOOLTIP": "loop() 會不斷地重複執行，讓您的程式可以改變和回應。使用它來主動控制 Arduino 板。",
    "INITIALIZES_LOOP_HELPURL": "",
    "ARDUINO_PIN_LABEL": "pin:",
    "ARDUINO_MODE_LABEL": "mode:",
    "ARDUINO_PIN_MODE": "pinMode",
    "ARDUINO_PIN_MODE_TOOLTIP": "將指定的腳位設定為輸入或輸出模式。",
    "ARDUINO_PIN_MODE_INPUT": "INPUT",
    "ARDUINO_PIN_MODE_OUTPUT": "OUTPUT",
    "ARDUINO_PIN_MODE_INPUT_PULLUP": "INPUT_PULLUP",
    "ARDUINO_DIGITAL_READ": "digitalRead",
    "ARDUINO_DIGITAL_READ_TOOLTIP": "讀入指定數位腳位的狀態，HIGH 或 LOW。",
    "ARDUINO_DIGITAL_WRITE": "digitalWrite(%1, %2)",
    "ARDUINO_DIGITAL_WRITE_TOOLTIP": "將 HIGH 或 LOW 值寫出數位腳位。",
    "ARDUINO_HIGH": "HIGH",
    "ARDUINO_LOW": "LOW",
    "ARDUINO_ANALOG_READ": "analogRead(%1)",
    "ARDUINO_ANALOG_READ_TOOLTIP": "讀入指定類比腳位(analog in / ADC)的狀態(0-1023 for 10-bit)。",
    "ARDUINO_ANALOG_WRITE": "analogWrite(%1, %2)",
    "ARDUINO_ANALOG_WRITE_TOOLTIP": "將類比值 (PWM, 0-255 for 8-bit) 寫出~腳位。",
    "ARDUINO_DELAY_TOOLTIP": "暫停指定的毫秒數。",
    "ARDUINO_DELAY_MICROSECONDS_TOOLTIP": "暫停指定的微秒數。",
    "ARDUINO_MILLIS_TOOLTIP": "回傳從 Arduino 開機到現在的毫秒數。",
    "ARDUINO_MICROS_TOOLTIP": "回傳從 Arduino 開機到現在的微秒數。",
    "ARDUINO_SERIAL_BEGIN": "Serial.begin(speed: %1)",
    "ARDUINO_SERIAL_BEGIN_TOOLTIP": "設定序列埠通訊的傳輸速率（鮑率）。",
    "ARDUINO_SERIAL_PRINT": "Serial.print(%1)",
    "ARDUINO_SERIAL_PRINT_TOOLTIP": "將資料傳送到序列埠。",
    "ARDUINO_SERIAL_PRINTLN": "Serial.println(%1)",
    "ARDUINO_SERIAL_PRINTLN_TOOLTIP": "將資料傳送到序列埠，並在結尾換行。",
    "ARDUINO_SERIAL_AVAILABLE": "Serial.available()",
    "ARDUINO_SERIAL_AVAILABLE_TOOLTIP": "獲取序列埠緩衝區中可讀取的位元組數，傳回整數。",
    "ARDUINO_SERIAL_READ": "Serial.read()",
    "ARDUINO_SERIAL_READ_TOOLTIP": "讀取一個位元組的序列埠資料, 傳回整數。",
    "ARDUINO_CONSTRAIN_TITLE": "constrain( %1, %2, %3 )",
    "ARDUINO_CONSTRAIN_TOOLTIP": "將一個數字限制在一個範圍內。參數：(要限制的值, 範圍下限, 範圍上限)。",
    "ARDUINO_MAP_TITLE": "map( %1, %2, %3, %4, %5 )",
    "ARDUINO_MAP_TOOLTIP": "將一個數字從一個範圍重新對應到另一個範圍。參數：(要對應的值, 原始範圍下限, 原始範圍上限, 目標範圍下限, 目標範圍上限)。",
    "ARDUINO_MATH_RANDOM_SEED_TITLE": "randomSeed( %1 );",
    "ARDUINO_MATH_RANDOM_SEED_TOOLTIP": "初始化偽亂數生成器。建議使用一個未連接的類比腳位作為種子。",
    "ARDUINO_MATH_RANDOM_INT_TITLE": "random( %1, %2 )",
    "ARDUINO_MATH_RANDOM_INT_TOOLTIP": "產生一個介於 min (包含) 和 max (不包含) 之間的偽亂數。",

    // piCar Blocks
    "PICAR_HUE": "#ee5b56",
    "PICAR_SETUP_HUE": "#016c8d",
    "PICAR_SENSOR_HUE": "#b1b100",
    "PICAR_SERVO_HUE": "#07a91d",
    "PICAR_MEDIA_HUE": "#de57ad",
    "PICAR_INIT": "初始化 piCar",
    "PICAR_INIT_TOOLTIP": "初始化 piCar 並進入待機狀態",
    "PICAR_SET_HAND_RANGE": "設定手臂開合範圍(0~180)",
    "PICAR_SET_HAND_RANGE_TOOLTIP": "設定手臂開合的角度範圍，預設 170°",
    "PICAR_RESET": "重新啟動 piCar",
    "PICAR_RESET_TOOLTIP": "重新啟動 piCar",
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

    // Coding Blocks
    "CODING_HUE": "#585858",
    "CODING_RAW_STATEMENT": "Coding ",
    "CODING_RAW_STATEMENT_TOOLTIP": "可填入任意程式碼作為一個指令",
    "CODING_RAW_INPUT": "Coding ",
    "CODING_RAW_INPUT_TOOLTIP": "可填入任意回傳值 (如：數字、文字、布林) 的程式碼",
    "CODING_RAW_DEFINITION": "Coding (global)",
    "CODING_RAW_DEFINITION_TOOLTIP": "可填入全域定義、函式庫引用或自訂函式等程式碼",
    "CODING_RAW_WRAPPER": "Coding (wrapper)",
    "CODING_RAW_WRAPPER_TOOLTIP": "可使用自訂程式碼包覆其他積木 (例如：自訂迴圈或條件判斷)",
    "CODING_RAW_WRAPPER_TOP": "Coding ",
    "CODING_RAW_WRAPPER_BOTTOM": "Coding ",

    // Text Blocks
    "TEXT_HUE": "#6a8871",

    // Array Blocks
    "ARRAY_HUE": "#d1972b",
    "ARRAY_DECLARE_TITLE": "宣告陣列",
    "ARRAY_DECLARE_TOOLTIP": "宣告一個指定類型和大小的陣列。",
    "ARRAY_GET_TOOLTIP": "從陣列中獲取指定索引的元素。",
    "ARRAY_SET_TOOLTIP": "設定陣列中指定索引的元素值。",
    "ARRAY_LENGTH_TOOLTIP": "獲取陣列的元素數量。",
    "BKY_ARRAY_DECLARE_GLOBAL_TITLE": "Global Array",
    "BKY_ARRAY_DECLARE_GLOBAL_TOOLTIP": "宣告一個指定類型和大小的全域陣列。",
    "BKY_ARRAY_DECLARE_LOCAL_TITLE": "Local Array",
    "BKY_ARRAY_DECLARE_LOCAL_TOOLTIP": "宣告一個指定類型和大小的區域陣列。",

    // --- Array Dual-Style Messages (Generic Keys) ---
    // Titles/Labels
    "ARRAY_DECLARE_GLOBAL_TITLE_GENERIC": "全域陣列",
    "ARRAY_DECLARE_LOCAL_TITLE_GENERIC": "區域陣列",
    "ARRAY_LENGTH_TITLE_GENERIC": "陣列長度",

    // Tooltips
    "ARRAY_DECLARE_GLOBAL_TOOLTIP_GENERIC": "宣告一個指定類型和大小的全域陣列。",
    "ARRAY_DECLARE_LOCAL_TOOLTIP_GENERIC": "宣告一個指定類型和大小的區域陣列。",
    "ARRAY_GET_TOOLTIP_GENERIC": "從陣列中獲取指定索引的元素。",
    "ARRAY_SET_TOOLTIP_GENERIC": "設定陣列中指定索引的元素值。",
    "ARRAY_LENGTH_TOOLTIP_GENERIC": "獲取陣列的元素數量。",

    // Other text elements
    "ARRAY_GET_BRACKET_OPEN_GENERIC": "[",
    "ARRAY_GET_BRACKET_CLOSE_GENERIC": "]",
    "ARRAY_SET_BRACKET_OPEN_GENERIC": "[",
    "ARRAY_SET_BRACKET_CLOSE_EQUALS_GENERIC": "] = ",

    // --- Array Dual-Style Messages (Engineer Versions) ---
    // Titles/Labels
    "BKY_ARRAY_DECLARE_GLOBAL_TITLE_ENGINEER": "Global Array",
    "BKY_ARRAY_DECLARE_LOCAL_TITLE_ENGINEER": "Local Array",
    "BKY_ARRAY_LENGTH_TITLE_ENGINEER": "length of Array",

    // Tooltips
    "BKY_ARRAY_DECLARE_GLOBAL_TOOLTIP_ENGINEER": "宣告一個指定類型和大小的全域陣列。",
    "BKY_ARRAY_DECLARE_LOCAL_TOOLTIP_ENGINEER": "宣告一個指定類型和大小的區域陣列。",
    "BKY_ARRAY_GET_TOOLTIP_ENGINEER": "從陣列中獲取指定索引的元素。",
    "BKY_ARRAY_SET_TOOLTIP_ENGINEER": "設定陣列中指定索引的元素值。",
    "BKY_ARRAY_LENGTH_TOOLTIP_ENGINEER": "獲取陣列的元素數量。",

    // Other text elements
    "BKY_ARRAY_GET_BRACKET_OPEN_ENGINEER": "[",
    "BKY_ARRAY_GET_BRACKET_CLOSE_ENGINEER": "]",
    "BKY_ARRAY_SET_BRACKET_OPEN_ENGINEER": "[",
    "BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ENGINEER": "] = ",

    // --- Array Dual-Style Messages (Angel Versions) ---
    // Titles/Labels
    "BKY_ARRAY_DECLARE_GLOBAL_TITLE_ANGEL": "建立全域陣列",
    "BKY_ARRAY_DECLARE_LOCAL_TITLE_ANGEL": "建立區域陣列",
    "BKY_ARRAY_LENGTH_TITLE_ANGEL": "陣列長度",

    // Tooltips
    "BKY_ARRAY_DECLARE_GLOBAL_TOOLTIP_ANGEL": "建立一個指定類型和大小的全域陣列。",
    "BKY_ARRAY_DECLARE_LOCAL_TOOLTIP_ANGEL": "建立一個指定類型和大小的區域陣列。",
    "BKY_ARRAY_GET_TOOLTIP_ANGEL": "從陣列中獲取指定索引的項目。",
    "BKY_ARRAY_SET_TOOLTIP_ANGEL": "設定陣列中指定索引的項目值。",
    "BKY_ARRAY_LENGTH_TOOLTIP_ANGEL": "獲取陣列的項目數量。",

    // Other text elements
    "BKY_ARRAY_GET_BRACKET_OPEN_ANGEL": "項目 #",
    "BKY_ARRAY_GET_BRACKET_CLOSE_ANGEL": "",
    "BKY_ARRAY_SET_BRACKET_OPEN_ANGEL": "項目 #",
    "BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ANGEL": " 設為 ",


    // Custom Variables
    "VARIABLES_DECLARE_GLOBAL_TOOLTIP": "宣告一個全域變數。",
    "VARIABLES_DECLARE_LOCAL_TOOLTIP": "宣告一個區域變數。",

    // Override default variable name
    "VARIABLES_DEFAULT_NAME": "var",

    // Override math function display names
    "MATH_SINGLE_OP_ABSOLUTE": "abs",
    "MATH_SINGLE_OP_ROOT": "sqrt",

    // Functions Blocks
    "PROCEDURES_HUE": "#d22f73",

    // --- Blockly Built-in Tooltip Overrides ---
    "CONTROLS_IF_TOOLTIP_1": "如果一個值為真，則執行一些語句。",
    "CONTROLS_IF_TOOLTIP_2": "如果一個值為真，則執行第一塊語句。否則，執行第二塊語句。",
    "CONTROLS_IF_TOOLTIP_3": "如果第一個值為真，則執行第一塊語句。否則，如果第二個值為真，則執行第二塊語句。",
    "CONTROLS_IF_TOOLTIP_4": "如果第一個值為真，則執行第一塊語句。否則，如果第二個值為真，則執行第二塊語句。如果所有值都為假，則執行最後一塊語句。",
    "CONTROLS_IF_ELSEIF_TOOLTIP": "為「如果」積木添加一個「否則如果」條件。",
    "CONTROLS_IF_ELSE_TOOLTIP": "為「如果」積木添加一個「否則」條件。",
    "CONTROLS_IF_IF_TOOLTIP": "添加、移除或重新排序區塊來重設此「如果」積木。",
    "LOGIC_NEGATE_TOOLTIP": "如果輸入為假，則傳回真。如果輸入為真，則傳回假。",
    "LOGIC_BOOLEAN_TOOLTIP": "傳回「真」或「假」。",
    "CONTROLS_WHILEUNTIL_TOOLTIP_WHILE": "當一個值為真時，重複執行一些語句。",
    "CONTROLS_FOR_TOOLTIP": "讓變數 '%1' 從開始數到結束數，按照指定的間隔計數，並執行指定的積木。",
    "CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK": "跳出包含的迴圈。",
    "CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE": "跳過此迴圈的其餘部分，並繼續下一次迭代。",
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
    "TEXT_TEXT_TOOLTIP": "一個字母、單字或一行文字。",
    "TEXT_JOIN_TOOLTIP": "透過連接任意數量的項目來建立一段文字。",
    "TEXT_APPEND_TOOLTIP": "將一些文字附加到變數 '%1'。",
    "TEXT_LENGTH_TOOLTIP": "傳回所提供文字中的字元數（包含空格）。",
    "LISTS_CREATE_WITH_ITEM_TOOLTIP": "添加一個項目到列表或文字中。",
    "VARIABLES_GET_TOOLTIP": "傳回此變數的值。",
    "VARIABLES_SET_TOOLTIP": "將此變數設定為等於輸入值。",
    "PROCEDURES_DEFNORETURN_TOOLTIP": "建立一個沒有輸出的函式。",
    "PROCEDURES_DEFRETURN_TOOLTIP": "建立一個有輸出的函式。",
    "PROCEDURES_CALLNORETURN_TOOLTIP": "執行使用者定義的函式 '%1'。",
    "PROCEDURES_CALLRETURN_TOOLTIP": "執行使用者定義的函式 '%1' 並使用其輸出。",
    "PROCEDURES_IFRETURN_TOOLTIP": "從函式傳回一個值。",
    "PROCEDURES_MUTATORARG_TOOLTIP": "為函式添加一個輸入參數。",
    "PROCEDURES_RETURN_TOOLTIP": "從函式傳回一個值。"
  });
})(Blockly);

