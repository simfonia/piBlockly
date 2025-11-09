(function(Blockly) {
  Blockly.Msg = Blockly.Msg || {};
  Object.assign(Blockly.Msg, {
    // English language file
    // Toolbar Tooltips
    "BKY_TOOLBAR_SAVE_TOOLTIP": "Save Blocks",
    "BKY_TOOLBAR_SAVE_AS_TOOLTIP": "Save Blocks As",
    "BKY_TOOLBAR_CLOSE_TOOLTIP": "Close",

    // Toolbar Theme Labels
    "BKY_TOOLBAR_ENGINEER_LABEL": "Engineer",
    "BKY_TOOLBAR_ANGEL_LABEL": "Angel",

    // Category Keys
    "ARDUINO_CATEGORY": "Arduino",
    "ARDUINO_STRUCTURE_CATEGORY": "Structure",
    "ARDUINO_IO_CATEGORY": "I/O",
    "ARDUINO_TIME_CATEGORY": "Time",
    "ARDUINO_SERIAL_CATEGORY": "Serial",
    "PICAR_CATEGORY": "πCar",
    "CODING_CATEGORY": "Coding",
    "LOGIC_CATEGORY": "Logic",
    "LOOPS_CATEGORY": "Loops",
    "MATH_CATEGORY": "Math",
    "TEXT_CATEGORY": "Text",
    "VARIABLES_CATEGORY": "Variables",
    "ARRAY_CATEGORY": "Array",
    "FUNCTIONS_CATEGORY": "Functions",

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
    "BKY_INITIALIZES_SETUP_MSG_ANGEL": "On Start",
    "BKY_INITIALIZES_LOOP_MSG_ANGEL": "Repeat Forever",
    // Tooltips
    "INITIALIZES_SETUP_TOOLTIP": "The setup() is called when a sketch starts. Use it to initialize variables, pin modes, start using libraries, etc. The setup function will only run once, after each powerup or reset of the Arduino board.",
    "INITIALIZES_LOOP_TOOLTIP": "The loop() does precisely what its name suggests, and loops consecutively, allowing your program to change and respond. Use it to actively control the Arduino board.",

    // Arduino IO
    // Engineer
    "BKY_ARDUINO_PIN_MODE_MSG_ENGINEER": "pinMode(%1, %2)",
    "BKY_ARDUINO_DIGITAL_READ_MSG_ENGINEER": "digitalRead(%1)",
    "BKY_ARDUINO_DIGITAL_WRITE_MSG_ENGINEER": "digitalWrite(%1, %2)",
    "BKY_ARDUINO_ANALOG_READ_MSG_ENGINEER": "analogRead(%1)",
    "BKY_ARDUINO_ANALOG_WRITE_MSG_ENGINEER": "analogWrite(%1, %2)",
    // Angel
    "BKY_ARDUINO_PIN_MODE_MSG_ANGEL": "set pin %1 to mode %2",
    "BKY_ARDUINO_DIGITAL_READ_MSG_ANGEL": "read digital pin %1",
    "BKY_ARDUINO_DIGITAL_WRITE_MSG_ANGEL": "write digital pin %1 as %2",
    "BKY_ARDUINO_ANALOG_READ_MSG_ANGEL": "read analog pin %1",
    "BKY_ARDUINO_ANALOG_WRITE_MSG_ANGEL": "write analog pin %1 as %2",
    // Tooltips
    "ARDUINO_PIN_MODE_TOOLTIP": "Configures the specified pin to behave either as an input or an output.",
    "ARDUINO_DIGITAL_READ_TOOLTIP": "Reads the value from a specified digital pin, either HIGH or LOW.",
    "ARDUINO_DIGITAL_WRITE_TOOLTIP": "Writes a HIGH or LOW value to a digital pin.",
    "ARDUINO_ANALOG_READ_TOOLTIP": "Reads the value from the specified analog pin (analog in / ADC) (0-1023 for 10-bit).",
    "ARDUINO_ANALOG_WRITE_TOOLTIP": "Writes an analog value (PWM, 0-255 for 8-bit) to a pin (~).",

    // Arduino Time
    // Engineer
    "BKY_ARDUINO_DELAY_MSG_ENGINEER": "delay(%1)",
    "BKY_ARDUINO_DELAY_MICROSECONDS_MSG_ENGINEER": "delayMicroseconds(%1)",
    "BKY_ARDUINO_MILLIS_MSG_ENGINEER": "millis()",
    "BKY_ARDUINO_MICROS_MSG_ENGINEER": "micros()",
    // Angel
    "BKY_ARDUINO_DELAY_MSG_ANGEL": "wait for %1 ms",
    "BKY_ARDUINO_DELAY_MICROSECONDS_MSG_ANGEL": "wait for %1 μs",
    "BKY_ARDUINO_MILLIS_MSG_ANGEL": "running time (ms)",
    "BKY_ARDUINO_MICROS_MSG_ANGEL": "running time (μs)",
    // Tooltips
    "ARDUINO_DELAY_TOOLTIP": "Waits for the specified number of milliseconds.",
    "ARDUINO_DELAY_MICROSECONDS_TOOLTIP": "Waits for the specified number of microseconds.",
    "ARDUINO_MILLIS_TOOLTIP": "Returns the number of milliseconds since the Arduino board began running the current program.",
    "ARDUINO_MICROS_TOOLTIP": "Returns the number of microseconds since the Arduino board began running the current program.",

    // Arduino Serial
    // Engineer
    "BKY_ARDUINO_SERIAL_BEGIN_MSG_ENGINEER": "Serial.begin(speed: %1)",
    "BKY_ARDUINO_SERIAL_PRINT_MSG_ENGINEER": "Serial.print(%1)",
    "BKY_ARDUINO_SERIAL_PRINTLN_MSG_ENGINEER": "Serial.println(%1)",
    "BKY_ARDUINO_SERIAL_AVAILABLE_MSG_ENGINEER": "Serial.available()",
    "BKY_ARDUINO_SERIAL_READ_MSG_ENGINEER": "Serial.read()",
    // Angel
    "BKY_ARDUINO_SERIAL_BEGIN_MSG_ANGEL": "start serial at speed %1",
    "BKY_ARDUINO_SERIAL_PRINT_MSG_ANGEL": "serial print %1",
    "BKY_ARDUINO_SERIAL_PRINTLN_MSG_ANGEL": "serial print %1 on a new line",
    "BKY_ARDUINO_SERIAL_AVAILABLE_MSG_ANGEL": "bytes available from serial",
    "BKY_ARDUINO_SERIAL_READ_MSG_ANGEL": "read from serial",
    // Tooltips
    "ARDUINO_SERIAL_BEGIN_TOOLTIP": "Sets the data rate in bits per second (baud) for serial data transmission.",
    "ARDUINO_SERIAL_PRINT_TOOLTIP": "Prints data to the serial port.",
    "ARDUINO_SERIAL_PRINTLN_TOOLTIP": "Prints data to the serial port, followed by a carriage return and newline.",
    "ARDUINO_SERIAL_AVAILABLE_TOOLTIP": "Get the number of bytes (characters) available for reading from the serial port.",
    "ARDUINO_SERIAL_READ_TOOLTIP": "Reads incoming serial data (one byte).",

    // *********************************************************
    // piCar
    // *********************************************************
    "PICAR_HUE": "#ee5b56",
    "PICAR_SETUP_HUE": "#016c8d",
    "PICAR_SENSOR_HUE": "#b1b100",
    "PICAR_SERVO_HUE": "#07a91d",
    "PICAR_MEDIA_HUE": "#de57ad",
    "PICAR_INIT": "Initialize piCar",
    "PICAR_INIT_TOOLTIP": "Initializes the required pins and variables for piCar, and starts the piCar in standby mode.",
    "PICAR_SET_HAND_RANGE": "Set Hand Opening Range (0~180)",
    "PICAR_SET_HAND_RANGE_TOOLTIP": "Sets the angle range for hand opening, default is 170°",
    "PICAR_RESET": "Restart piCar",
    "PICAR_RESET_TOOLTIP": "Restarts the piCar.",
    "PICAR_DRIVE_LEFT": "DC Motor Power (-255 ~ 255) Left:",
    "PICAR_DRIVE_RIGHT": "Right:",
    "PICAR_DRIVE_TOOLTIP": "Controls the power of the left and right wheels (-255 ~ 255).",
    "PICAR_STOP": "Stop",
    "PICAR_STOP_COAST": "Coast",
    "PICAR_STOP_BRAKE": "Brake",
    "PICAR_STOP_TOOLTIP": "Choose stop method: brake or coast.",
    "PICAR_CHECK_DISTANCE": "Check Distance (cm)",
    "PICAR_CHECK_DISTANCE_TOOLTIP": "Uses ultrasonic sensor to detect the distance of an obstacle in front (cm).",
    "PICAR_CHECK_COLOR": "Check Color (Black 0/White 1)",
    "PICAR_CHECK_COLOR_TOOLTIP": "Uses infrared sensor to detect ground color. Returns 0 for black, 1 for white.",
    "PICAR_CHECK_GRAY": "Check Grayscale (0-1023, 1023 for white, 0 for black)",
    "PICAR_CHECK_GRAY_TOOLTIP": "Uses the infrared sensor to detect the ground grayscale value. Returns a value between 0-1023. 1023 for white, 0 for black.",
    "PICAR_IN_POSITION": "Home Arms",
    "PICAR_IN_POSITION_TOOLTIP": "Returns the arm servos to their home position.",
    "PICAR_SET_LEFT_HAND_ANGLE": "Set Left Hand Angle to (180->0 Clockwise)",
    "PICAR_SET_LEFT_HAND_ANGLE_TOOLTIP": "Sets the left hand servo angle (0-180). Initial position is 180.",
    "PICAR_SET_RIGHT_HAND_ANGLE": "Set Right Hand Angle to (0->180 Anti-Clockwise)",
    "PICAR_SET_RIGHT_HAND_ANGLE_TOOLTIP": "Sets the right hand servo angle (0-180). Initial position is 0.",
    "PICAR_CLOSE_HANDS": "Close Hands",
    "PICAR_CLOSE_HANDS_TOOLTIP": "Closes the hands.",
    "PICAR_OPEN_HANDS": "Open Hands",
    "PICAR_OPEN_HANDS_TOOLTIP": "Opens the hands.",
    "PICAR_MOVE_HANDS": "Move %1 to %2 %% open at speed %3 (1-10)",
    "PICAR_HAND_LEFT": "Left Hand",
    "PICAR_HAND_RIGHT": "Right Hand",
    "PICAR_HAND_BOTH": "Both Hands",
    "PICAR_MOVE_HANDS_TOOLTIP": "Controls one or both hands to a specific opening percentage with speed control. This is a blocking function; it will wait for the action to complete. For asynchronous behavior, place it in a separate loop/core (e.g., loop1).",
    "PICAR_FLASHING_LIGHT": "Flash RGB Light",
    "PICAR_FLASHING_LIGHT_TOOLTIP": "Flashes the RGB light.",
    "PICAR_SET_LED_COLOR": "Set RGB LED",
    "PICAR_SET_LED_COLOR_TOOLTIP": "Sets the color of a specified RGB LED.",
    "PICAR_LED_LEFT": "Rear LED",
    "PICAR_LED_RIGHT": "Front LED",
    "PICAR_LED_ALL": "All LEDs",
    "PICAR_COLOR": "color to",
    "PICAR_SET_TEMPO": "Set Music Tempo",
    "PICAR_BPM": "BPM",
    "PICAR_SET_TEMPO_TOOLTIP": "Sets the global tempo in Beats Per Minute (BPM) for music blocks.",
    "PICAR_PLAY_NOTE": "Play Note",
    "PICAR_PIN": "Pin",
    "PICAR_FREQUENCY": "Frequency (Hz)",
    "PICAR_NOTE_DURATION": "Duration:",
    "PICAR_WHOLE_NOTE": "Whole Note",
    "PICAR_HALF_NOTE": "Half Note",
    "PICAR_QUARTER_NOTE": "Quarter Note",
    "PICAR_EIGHTH_NOTE": "Eighth Note",
    "PICAR_SIXTEENTH_NOTE": "Sixteenth Note",
    "PICAR_THIRTYSECOND_NOTE": "Thirty-second Note",
    "PICAR_PLAY_NOTE_TOOLTIP": "Plays a musical note on the specified pin with given frequency and duration. Can be dotted or triplet.",
    "PICAR_DOTTED": "Dotted",
    "PICAR_TRIPLET": "Triplet",
    "PICAR_NOTE_TO_FREQUENCY": "Note to Frequency",
    "PICAR_NOTE_TO_FREQUENCY_TOOLTIP": "Converts a musical note (e.g., C4, A#5) to its corresponding frequency in Hz.",
    "PICAR_TONE": "Play tone on pin %1 with frequency %2 for duration (ms) %3 (non-blocking)",
    "PICAR_TONE_TOOLTIP": "Generates a tone on the specified pin. The default buzzer is on pin 22.",
    "PICAR_NO_TONE": "Stop tone on pin %1",
    "PICAR_NO_TONE_TOOLTIP": "Stops the tone playing on the specified pin. The default buzzer is on pin 22.",

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
    "BKY_CODING_RAW_STATEMENT_ANGEL": "Do Code %1",
    "BKY_CODING_RAW_INPUT_ANGEL": "Get Value %1",
    "BKY_CODING_RAW_DEFINITION_ANGEL": "Define Global %1",
    "BKY_CODING_RAW_WRAPPER_ANGEL": "Code Around %1",
    "BKY_CODING_RAW_WRAPPER_TOP_ANGEL": "Start: %1",
    "BKY_CODING_RAW_WRAPPER_BOTTOM_ANGEL": "End: %1",
    // Tooltip
    "CODING_RAW_STATEMENT_TOOLTIP": "Allows entering any code as a statement.",
    "CODING_RAW_INPUT_TOOLTIP": "Allows entering code that returns any value (e.g., Number, String, Boolean).",
    "CODING_RAW_DEFINITION_TOOLTIP": "Allows entering global definitions, includes, or custom functions.",
    "CODING_RAW_WRAPPER_TOOLTIP": "Allows wrapping other blocks with custom code (e.g., custom loops or conditionals).",


    // *********************************************************
    // Logic
    // *********************************************************
    // Tooltip
    "CONTROLS_IF_TOOLTIP_1": "If a value is true, then do some statements.",
    "CONTROLS_IF_TOOLTIP_2": "If a value is true, then do the first block of statements. Otherwise, do the second block of statements.",
    "CONTROLS_IF_TOOLTIP_3": "If the first value is true, then do the first block of statements. Otherwise, if the second value is true, then do the second block of statements.",
    "CONTROLS_IF_TOOLTIP_4": "If the first value is true, then do the first block of statements. Otherwise, if the second value is true, then do the second block of statements. If all values are false, then do the last block of statements.",
    "CONTROLS_IF_ELSEIF_TOOLTIP": "Add an 'else if' condition to the 'if' block.",
    "CONTROLS_IF_ELSE_TOOLTIP": "Add an 'else' condition to the 'if' block.",
    "CONTROLS_IF_IF_TOOLTIP": "Add, remove, or reorder sections to reconfigure this 'if' block.",
    "LOGIC_NEGATE_TOOLTIP": "If the input is false, returns true. If the input is true, returns false.",
    "LOGIC_BOOLEAN_TOOLTIP": "Returns true or false.",


    // Logic Controls If
    "BKY_CONTROLS_IF_MSG_IF_ENGINEER": "if",
    "BKY_CONTROLS_IF_MSG_THEN_ENGINEER": "",
    "BKY_CONTROLS_IF_MSG_ELSEIF_ENGINEER": "else if",
    "BKY_CONTROLS_IF_MSG_ELSE_ENGINEER": "else",
    // Angel
    "BKY_CONTROLS_IF_MSG_IF_ANGEL": "If",
    "BKY_CONTROLS_IF_MSG_THEN_ANGEL": "",
    "BKY_CONTROLS_IF_MSG_ELSEIF_ANGEL": "else if",
    "BKY_CONTROLS_IF_MSG_ELSE_ANGEL": "otherwise",

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
    "BKY_LOGIC_OPERATION_AND_ANGEL": "and",
    "BKY_LOGIC_OPERATION_OR_ANGEL": "or",
    "BKY_LOGIC_NEGATE_MSG_ANGEL": "not %1",

    // Logic Boolean
    // Engineer
    "BKY_LOGIC_BOOLEAN_TRUE_ENGINEER": "true",
    "BKY_LOGIC_BOOLEAN_FALSE_ENGINEER": "false",
    // Angel
    "BKY_LOGIC_BOOLEAN_TRUE_ANGEL": "true",
    "BKY_LOGIC_BOOLEAN_FALSE_ANGEL": "false",

    // *********************************************************
    // Loops
    // *********************************************************
    // Engineer
    "BKY_CONTROLS_WHILEUNTIL_MSG_ENGINEER": "while (%1) {",
    "BKY_CONTROLS_FOR_MSG_ENGINEER": "for (int %1 = %2; %3 %4 %5; %6 %7 %8) {",
    "BKY_CONTROLS_FLOW_STATEMENTS_MSG_ENGINEER": "%1",
    // Angel
    "BKY_CONTROLS_WHILEUNTIL_MSG_ANGEL": "while %1",
    "BKY_CONTROLS_FOR_MSG_ANGEL": "count with %1 from %2 to %5 by %8 (%3%4%6%7)",
    "BKY_CONTROLS_FLOW_STATEMENTS_MSG_ANGEL": "%1 loop",
    // Tooltip
    "CONTROLS_WHILEUNTIL_TOOLTIP": "While a condition is true, then do some statements.",
    "CONTROLS_FOR_TOOLTIP": "Loop with %1 from %2 to %3 by %4.",
    "CONTROLS_FLOW_STATEMENTS_TOOLTIP": "Break out of the inner loop or continue with the next iteration.",

    // *********************************************************
    // Math
    // *********************************************************
    // Tooltip
    "MATH_NUMBER_TOOLTIP": "A number.",
    "MATH_ARITHMETIC_TOOLTIP_ADD": "Returns the sum of two numbers.",
    "MATH_ARITHMETIC_TOOLTIP_MINUS": "Returns the difference of two numbers.",
    "MATH_ARITHMETIC_TOOLTIP_MULTIPLY": "Returns the product of two numbers.",
    "MATH_ARITHMETIC_TOOLTIP_DIVIDE": "Returns the quotient of two numbers.",
    "MATH_ARITHMETIC_TOOLTIP_POWER": "Returns the first number raised to the power of the second number.",
    "MATH_SINGLE_TOOLTIP_ROOT": "Returns the square root of a number.",
    "MATH_SINGLE_TOOLTIP_ABS": "Returns the absolute value of a number.",
    "MATH_SINGLE_TOOLTIP_NEG": "Returns the negation of a number.",
    "MATH_SINGLE_TOOLTIP_LN": "Returns the natural logarithm of a number.",
    "MATH_SINGLE_TOOLTIP_LOG10": "Returns the base 10 logarithm of a number.",
    "MATH_SINGLE_TOOLTIP_EXP": "Returns e to the power of the specified number.",
    "MATH_SINGLE_TOOLTIP_POW10": "Returns 10 to the power of the specified number.",
    // Override math function display names
    "MATH_SINGLE_OP_ABSOLUTE": "abs",
    "MATH_SINGLE_OP_ROOT": "sqrt",

    // Engineer
    "BKY_ARDUINO_CONSTRAIN_MSG_ENGINEER": "constrain( %1, %2, %3 )",
    "BKY_ARDUINO_MAP_MSG_ENGINEER": "map( %1, %2, %3, %4, %5 )",
    "BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ENGINEER": "randomSeed( %1 )",
    "BKY_ARDUINO_MATH_RANDOM_INT_MSG_ENGINEER": "random( %1, %2 )",
    // Angel
    "BKY_ARDUINO_CONSTRAIN_MSG_ANGEL": "limit %1 between %2 and %3",
    "BKY_ARDUINO_MAP_MSG_ANGEL": "remap %1 from range %2 - %3 to %4 - %5",
    "BKY_ARDUINO_MATH_RANDOM_SEED_MSG_ANGEL": "set random seed to %1",
    "BKY_ARDUINO_MATH_RANDOM_INT_MSG_ANGEL": "random number between %1 and %2",
    // Tooltip
    "ARDUINO_CONSTRAIN_TOOLTIP": "Constrains a number to be within a range. Parameters: (value, min, max).",
    "ARDUINO_MAP_TOOLTIP": "Re-maps a number from one range to another. Parameters: (value, fromLow, fromHigh, toLow, toHigh).",
    "ARDUINO_MATH_RANDOM_SEED_TOOLTIP": "Initializes the pseudo-random number generator. Using an unconnected analog pin as a seed is recommended.",
    "ARDUINO_MATH_RANDOM_INT_TOOLTIP": "Generates a pseudo-random number between min (inclusive) and max (exclusive).",


    // *********************************************************
    // Text
    // *********************************************************
    // Tooltip
    "TEXT_TEXT_TOOLTIP": "A letter, word, or line of text.",
    "TEXT_JOIN_TOOLTIP": "Create a piece of text by joining any number of items.",
    "TEXT_APPEND_TOOLTIP": "Append some text to a variable.",
    "TEXT_LENGTH_TOOLTIP": "Returns the number of characters (including spaces) in the provided text.",

    // Text Append
    "BKY_TEXT_APPEND_MSG_ENGINEER": "%1 += %2",
    "BKY_TEXT_APPEND_MSG_ANGEL": "to %1 append text %2",

    // Text Join
    "BKY_TEXT_JOIN_MSG_ENGINEER": "join",
    "BKY_TEXT_JOIN_MSG_ANGEL": "join text",

    // Text Length
    "BKY_TEXT_LENGTH_MESSAGE_ENGINEER": "%1.length()",
    "BKY_TEXT_LENGTH_MESSAGE_ANGEL": "length of %1",

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
    "BKY_VARIABLES_DECLARE_GLOBAL_MSG_ANGEL": "create global variable %2 of type %1 with value %3",
    "BKY_VARIABLES_DECLARE_LOCAL_MSG_ANGEL": "create local variable %2 of type %1 with value %3",
    "BKY_VARIABLES_SET_MSG_ANGEL": "set %1 to %2",
    // Tooltip
    "VARIABLES_DECLARE_GLOBAL_TOOLTIP": "Declare a global variable.",
    "VARIABLES_DECLARE_LOCAL_TOOLTIP": "Declare a local variable.",
    "VARIABLES_GET_TOOLTIP": "Returns the value of this variable.",
    "VARIABLES_SET_TOOLTIP": "Sets this variable to be equal to the input value.",


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
    "BKY_ARRAY_DECLARE_GLOBAL_TITLE_ANGEL": "Create Global Array",
    "BKY_ARRAY_DECLARE_LOCAL_TITLE_ANGEL": "Create Local Array",
    "BKY_ARRAY_GET_BRACKET_OPEN_ANGEL": "item #",
    "BKY_ARRAY_GET_BRACKET_CLOSE_ANGEL": "",
    "BKY_ARRAY_SET_BRACKET_OPEN_ANGEL": "item #",
    "BKY_ARRAY_SET_BRACKET_CLOSE_EQUALS_ANGEL": " to ",
    "BKY_ARRAY_LENGTH_TITLE_ANGEL": "length of Array",
    // Tooltip
    "ARRAY_DECLARE_GLOBAL_TOOLTIP": "Declares a global array of a specified type and size.",
    "ARRAY_DECLARE_LOCAL_TOOLTIP": "Declares a local array of a specified type and size.",
    "ARRAY_GET_TOOLTIP": "Gets an element from an array at a specified index.",
    "ARRAY_SET_TOOLTIP": "Sets the value of an element in an array at a specified index.",
    "ARRAY_LENGTH_TOOLTIP": "Gets the number of elements in an array.",


    // *********************************************************
    // Functions
    // *********************************************************
    // Engineer
    "BKY_CUSTOM_PROCEDURES_DEFNORETURN_MSG_ENGINEER": "void %1 (%2) {",
    "BKY_CUSTOM_PROCEDURES_DEFRETURN_MSG_ENGINEER": "%1 %2 (%3) {",
    "BKY_CUSTOM_PROCEDURES_CALLNORETURN_MSG_ENGINEER": "%1()",
    "BKY_CUSTOM_PROCEDURES_CALLRETURN_MSG_ENGINEER": "%1()",
    "BKY_CUSTOM_PROCEDURES_MUTATORCONTAINER_MSG_ENGINEER": "function inputs",
    "BKY_CUSTOM_PROCEDURES_MUTATORARG_MSG_ENGINEER": "parameter",
    "BKY_CUSTOM_PROCEDURES_RETURN_MSG_ENGINEER": "return %1",
    // Angel
    "BKY_CUSTOM_PROCEDURES_DEFNORETURN_MSG_ANGEL": "do task %1 (%2)",
    "BKY_CUSTOM_PROCEDURES_DEFRETURN_MSG_ANGEL": "do task %2 (%3) and report back %1",
    "BKY_CUSTOM_PROCEDURES_CALLNORETURN_MSG_ANGEL": "do task %1 (%2)",
    "BKY_CUSTOM_PROCEDURES_CALLRETURN_MSG_ANGEL": "get report from task %1 (%2)",
    "BKY_CUSTOM_PROCEDURES_MUTATORCONTAINER_MSG_ANGEL": "function inputs",
    "BKY_CUSTOM_PROCEDURES_MUTATORARG_MSG_ANGEL": "parameter",
    "BKY_CUSTOM_PROCEDURES_RETURN_MSG_ANGEL": "report back %1",
    // Tooltip
    "PROCEDURES_DEFNORETURN_TOOLTIP": "Creates a function with no output.",
    "PROCEDURES_DEFRETURN_TOOLTIP": "Creates a function with an output.",
    "PROCEDURES_CALLNORETURN_TOOLTIP": "Execute the user-defined function.",
    "PROCEDURES_CALLRETURN_TOOLTIP": "Execute the user-defined function and use its output.",
    "PROCEDURES_IFRETURN_TOOLTIP": "Returns a value from a function if a value is true.",
    "PROCEDURES_MUTATORARG_TOOLTIP": "Add an input to the function.",
    "PROCEDURES_RETURN_TOOLTIP": "Returns a value from a function.",

  });
})(Blockly);