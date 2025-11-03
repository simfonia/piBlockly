(function(Blockly) {
  Blockly.Msg = Blockly.Msg || {};
  Object.assign(Blockly.Msg, {
    // Traditional Chinese language file
    // Category Keys
    "ARDUINO_CATEGORY": "Arduino",
    "ARDUINO_STRUCTURE_CATEGORY": "結構",
    "ARDUINO_IO_CATEGORY": "輸出/輸入",
    "ARDUINO_TIME_CATEGORY": "時間",
    "ARDUINO_SERIAL_CATEGORY": "序列埠",
    "PICAR_CATEGORY": "πCar",
    "CODING_CATEGORY": "程式碼",

    // Arduino Blocks
    "ARDUINO_HUE": "#016c8d", // for Arduino
    "ARDUINO_CONTROL_HUE": "#016c8d", // for Arduino I/O
    "ARDUINO_STRUCTURE_HUE": "#585858", // for Arduino Structure
    "ARDUINO_DIGITAL_IO_HUE": "#0f960a", // for Arduino Digital I/O
    "ARDUINO_ANALOG_IO_HUE": "#FF9800", // for Arduino Analog I/O
    "ARDUINO_TIME_HUE": "#1f039b", // for Arduino time
    "ARDUINO_SERIAL_HUE": "#359AFF", // for Arduino Serial
    "ARDUINO_MATH_HUE": "#b13333", // for Arduino math blocks (red-ish)

    // Arduino Structure
    "INITIALIZES_SETUP_APPENDTEXT": "設定",
    "INITIALIZES_SETUP_TOOLTIP": "setup() 在程式開始時呼叫。用它來初始化變數、腳位模式、開始使用函式庫等。setup 函式只會在每次 Arduino 板上電或重置後執行一次。",
    "INITIALIZES_SETUP_HELPURL": "",
    "INITIALIZES_LOOP_APPENDTEXT": "主程式",
    "INITIALIZES_LOOP_TOOLTIP": "loop() 會不斷地重複執行，讓您的程式可以改變和回應。使用它來主動控制 Arduino 板。",
    "INITIALIZES_LOOP_HELPURL": "",

    // Arduino I/O
    "ARDUINO_PIN_LABEL": "腳位:",
    "ARDUINO_MODE_LABEL": "模式:",
    "ARDUINO_PIN_MODE": "pinMode",
    "ARDUINO_PIN_MODE_TOOLTIP": "將指定的腳位設定為輸入或輸出模式。",
    "ARDUINO_PIN_MODE_INPUT": "INPUT (輸入)",
    "ARDUINO_PIN_MODE_OUTPUT": "OUTPUT (輸出)",
    "ARDUINO_PIN_MODE_INPUT_PULLUP": "INPUT_PULLUP (上拉輸入)",
    "ARDUINO_DIGITAL_READ": "digitalRead",
    "ARDUINO_DIGITAL_READ_TOOLTIP": "讀入指定數位腳位的狀態，HIGH 或 LOW。",
    "ARDUINO_DIGITAL_WRITE": "digitalWrite(%1, %2)",
    "ARDUINO_DIGITAL_WRITE_TOOLTIP": "將 HIGH 或 LOW 值寫出數位腳位。",
    "ARDUINO_HIGH": "HIGH (高電位)",
    "ARDUINO_LOW": "LOW (低電位)",
    "ARDUINO_ANALOG_READ": "analogRead(%1)",
    "ARDUINO_ANALOG_READ_TOOLTIP": "讀入指定類比腳位(analog in / ADC)的狀態(0-1023 for 10-bit)。",
    "ARDUINO_ANALOG_WRITE": "analogWrite(%1, %2)",
    "ARDUINO_ANALOG_WRITE_TOOLTIP": "將類比值 (PWM, 0-255 for 8-bit) 寫出~腳位。",

    // Arduino Time
    "ARDUINO_DELAY_TOOLTIP": "暫停指定的毫秒數。",
    "ARDUINO_DELAY_MICROSECONDS_TOOLTIP": "暫停指定的微秒數。",
    "ARDUINO_MILLIS_TOOLTIP": "回傳從 Arduino 開機到現在的毫秒數。",
    "ARDUINO_MICROS_TOOLTIP": "回傳從 Arduino 開機到現在的微秒數。",

    // Arduino Serial
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

    // Arduino Math
    "ARDUINO_CONSTRAIN_TITLE": "constrain( %1, %2, %3 )",
    "ARDUINO_CONSTRAIN_TOOLTIP": "將一個數字限制在一個範圍內。參數：(要限制的值, 範圍下限, 範圍上限)。",
    "ARDUINO_MAP_TITLE": "map( %1, %2, %3, %4, %5 )",
    "ARDUINO_MAP_TOOLTIP": "將一個數字從一個範圍重新對應到另一個範圍。參數：(要對應的值, 原始範圍下限, 原始範圍上限, 目標範圍下限, 目標範圍上限)。",
    "ARDUINO_MATH_RANDOM_SEED_TITLE": "randomSeed( %1 );",
    "ARDUINO_MATH_RANDOM_SEED_TOOLTIP": "初始化偽亂數生成器。建議使用一個未連接的類比腳位作為種子。",
    "ARDUINO_MATH_RANDOM_INT_TITLE": "random( %1, %2 )",
    "ARDUINO_MATH_RANDOM_INT_TOOLTIP": "產生一個介於 min (包含) 和 max (不包含) 之間的偽亂數。",

    // piCar Blocks
    "PICAR_HUE": "#ee5b56", // for piCar movement
    "PICAR_SETUP_HUE": "#016c8d", // for initialization
    "PICAR_SENSOR_HUE": "#b1b100", // for sensor
    "PICAR_SERVO_HUE": "#07a91d", // for servo
    "PICAR_MEDIA_HUE": "#de57ad", // for multimedia

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
    "PICAR_EASTER_EGG": "播放彩蛋旋律 全音符的時間 (ms)",
    "PICAR_EASTER_EGG_TOOLTIP": "播放一段旋律，數值愈大愈慢",
    "PICAR_TONE": "在腳位 %1 上播放音調，頻率 %2，持續時間 (ms) %3 (不等待播完)",
    "PICAR_TONE_TOOLTIP": "在指定腳位上產生音調。預設蜂鳴器位於腳位 22。",
    "PICAR_NO_TONE": "停止在腳位 %1 上的音調",
    "PICAR_NO_TONE_TOOLTIP": "停止在指定腳位上播放的音調。預設蜂鳴器位於腳位 22。",

    // Coding Blocks
    "CODING_HUE": "#585858", // for coding
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
    "TEXT_HUE": "#6a8871",  // for Text

    // Array Blocks
    "ARRAY_HUE": "#d1972b",  // for Arrays
    "ARRAY_DECLARE_TITLE": "宣告陣列",
    "ARRAY_DECLARE_TOOLTIP": "宣告一個指定類型和大小的陣列。",
    "ARRAY_GET_TOOLTIP": "從陣列中獲取指定索引的元素。",
    "ARRAY_SET_TOOLTIP": "設定陣列中指定索引的元素值。",
    "ARRAY_LENGTH_TOOLTIP": "獲取陣列的元素數量。",

    // Custom Variables
    "VARIABLES_DECLARE_GLOBAL_TOOLTIP": "宣告一個全域變數。",
    "VARIABLES_DECLARE_LOCAL_TOOLTIP": "宣告一個區域變數。",

    // Functions Blocks
    "PROCEDURES_HUE": "#d22f73", // for Functions

    // --- Blockly Built-in Tooltip Overrides ---
    // Logic
    "CONTROLS_IF_TOOLTIP_1": "如果一個值為真，則執行一些語句。",
    "CONTROLS_IF_TOOLTIP_2": "如果一個值為真，則執行第一塊語句。否則，執行第二塊語句。",
    "CONTROLS_IF_TOOLTIP_3": "如果第一個值為真，則執行第一塊語句。否則，如果第二個值為真，則執行第二塊語句。",
    "CONTROLS_IF_TOOLTIP_4": "如果第一個值為真，則執行第一塊語句。否則，如果第二個值為真，則執行第二塊語句。如果所有值都為假，則執行最後一塊語句。",
    "CONTROLS_IF_ELSEIF_TOOLTIP": "為「如果」積木添加一個「否則如果」條件。",
    "CONTROLS_IF_ELSE_TOOLTIP": "為「如果」積木添加一個「否則」條件。",
    "CONTROLS_IF_IF_TOOLTIP": "添加、移除或重新排序區塊來重設此「如果」積木。",
    "LOGIC_NEGATE_TOOLTIP": "如果輸入為假，則傳回真。如果輸入為真，則傳回假。",
    "LOGIC_BOOLEAN_TOOLTIP": "傳回「真」或「假」。",
    // Loops
    "CONTROLS_WHILEUNTIL_TOOLTIP_WHILE": "當一個值為真時，重複執行一些語句。",
    "CONTROLS_FOR_TOOLTIP": "讓變數 '%1' 從開始數到結束數，按照指定的間隔計數，並執行指定的積木。",
    "CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK": "跳出包含的迴圈。",
    "CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE": "跳過此迴圈的其餘部分，並繼續下一次迭代。",
    // Math
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
    // Text
    "TEXT_TEXT_TOOLTIP": "一個字母、單字或一行文字。",
    "TEXT_JOIN_TOOLTIP": "透過連接任意數量的項目來建立一段文字。",
    "TEXT_APPEND_TOOLTIP": "將一些文字附加到變數 '%1'。",
    "TEXT_LENGTH_TOOLTIP": "傳回所提供文字中的字元數（包含空格）。",
    "LISTS_CREATE_WITH_ITEM_TOOLTIP": "添加一個項目到列表或文字中。",
    // Variables
    "VARIABLES_GET_TOOLTIP": "傳回此變數的值。",
    "VARIABLES_SET_TOOLTIP": "將此變數設定為等於輸入值。",
    // Functions
    "PROCEDURES_DEFNORETURN_TOOLTIP": "建立一個沒有輸出的函式。",
    "PROCEDURES_DEFRETURN_TOOLTIP": "建立一個有輸出的函式。",
    "PROCEDURES_CALLNORETURN_TOOLTIP": "執行使用者定義的函式 '%1'。",
    "PROCEDURES_CALLRETURN_TOOLTIP": "執行使用者定義的函式 '%1' 並使用其輸出。",
    "PROCEDURES_IFRETURN_TOOLTIP": "從函式傳回一個值。",
    "PROCEDURES_MUTATORARG_TOOLTIP": "為函式添加一個輸入參數。",
    "PROCEDURES_RETURN_TOOLTIP": "從函式傳回一個值。"
  });
})(Blockly);

