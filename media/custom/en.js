(function(Blockly) {
  Blockly.Msg = Blockly.Msg || {};
  Object.assign(Blockly.Msg, {
    // English language file
    // Category Keys
    "ARDUINO_CATEGORY": "Arduino",
    "ARDUINO_STRUCTURE_CATEGORY": "Structure",
    "ARDUINO_IO_CATEGORY": "I/O",
    "ARDUINO_TIME_CATEGORY": "Time",
    "ARDUINO_SERIAL_CATEGORY": "Serial",
    "PICAR_CATEGORY": "πCar",
    "CODING_CATEGORY": "Coding",

    // Arduino Blocks
    "ARDUINO_HUE": "#016c8d", // for Arduino
    "ARDUINO_STRUCTURE_HUE": "#585858", // for Arduino I/O
    "ARDUINO_CONTROL_HUE": "#016c8d", // for Arduino I/O
    "ARDUINO_DIGITAL_IO_HUE": "#0f960a", // for Arduino Digital I/O
    "ARDUINO_ANALOG_IO_HUE": "#FF9800", // for Arduino Analog I/O
    "ARDUINO_TIME_HUE": "#1f039b", // for Arduino time
    "ARDUINO_SERIAL_HUE": "#359AFF", // for Arduino Serial
    "ARDUINO_MATH_HUE": "#b13333", // for Arduino math blocks (red-ish)

    // Arduino Structure
    "INITIALIZES_SETUP_APPENDTEXT": "setup",
    "INITIALIZES_SETUP_TOOLTIP": "The setup() is called when a sketch starts. Use it to initialize variables, pin modes, start using libraries, etc. The setup function will only run once, after each powerup or reset of the Arduino board.",
    "INITIALIZES_SETUP_HELPURL": "",
    "INITIALIZES_LOOP_APPENDTEXT": "loop",
    "INITIALIZES_LOOP_TOOLTIP": "The loop() does precisely what its name suggests, and loops consecutively, allowing your program to change and respond. Use it to actively control the Arduino board.",
    "INITIALIZES_LOOP_HELPURL": "",

    // Arduino I/O
    "ARDUINO_PIN_LABEL": "pin:",
    "ARDUINO_MODE_LABEL": "mode:",
    "ARDUINO_PIN_MODE": "pinMode",
    "ARDUINO_PIN_MODE_TOOLTIP": "Configures the specified pin to behave either as an input or an output.",
    "ARDUINO_PIN_MODE_INPUT": "INPUT",
    "ARDUINO_PIN_MODE_OUTPUT": "OUTPUT",
    "ARDUINO_PIN_MODE_INPUT_PULLUP": "INPUT_PULLUP",
    "ARDUINO_DIGITAL_READ": "digitalRead",
    "ARDUINO_DIGITAL_READ_TOOLTIP": "Reads the value from a specified digital pin, either HIGH or LOW.",
    "ARDUINO_DIGITAL_WRITE": "digitalWrite(%1, %2)",
    "ARDUINO_DIGITAL_WRITE_TOOLTIP": "Writes a HIGH or LOW value to a digital pin.",
    "ARDUINO_HIGH": "HIGH",
    "ARDUINO_LOW": "LOW",
    "ARDUINO_ANALOG_READ": "analogRead(%1)",
    "ARDUINO_ANALOG_READ_TOOLTIP": "Reads the value from the specified analog pin (analog in / ADC) (0-1023 for 10-bit).",
    "ARDUINO_ANALOG_WRITE": "analogWrite(%1, %2)",
    "ARDUINO_ANALOG_WRITE_TOOLTIP": "Writes an analog value (PWM, 0-255 for 8-bit) to a pin (~).",

    // Arduino Time
    "ARDUINO_DELAY_TOOLTIP": "Waits for the specified number of milliseconds.",
    "ARDUINO_DELAY_MICROSECONDS_TOOLTIP": "Waits for the specified number of microseconds.",
    "ARDUINO_MILLIS_TOOLTIP": "Returns the number of milliseconds since the Arduino board began running the current program.",
    "ARDUINO_MICROS_TOOLTIP": "Returns the number of microseconds since the Arduino board began running the current program.",

    // Arduino Serial
    "ARDUINO_SERIAL_BEGIN": "Serial.begin(speed: %1)",
    "ARDUINO_SERIAL_BEGIN_TOOLTIP": "Sets the data rate in bits per second (baud) for serial data transmission.",
    "ARDUINO_SERIAL_PRINT": "Serial.print(%1)",
    "ARDUINO_SERIAL_PRINT_TOOLTIP": "Prints data to the serial port.",
    "ARDUINO_SERIAL_PRINTLN": "Serial.println(%1)",
    "ARDUINO_SERIAL_PRINTLN_TOOLTIP": "Prints data to the serial port, followed by a carriage return and newline.",
    "ARDUINO_SERIAL_AVAILABLE": "Serial.available()",
    "ARDUINO_SERIAL_AVAILABLE_TOOLTIP": "Get the number of bytes (characters) available for reading from the serial port.",
    "ARDUINO_SERIAL_READ": "Serial.read()",
    "ARDUINO_SERIAL_READ_TOOLTIP": "Reads incoming serial data (one byte).",

    // Arduino Math
    "ARDUINO_CONSTRAIN_TITLE": "constrain( %1, %2, %3 )",
    "ARDUINO_CONSTRAIN_TOOLTIP": "Constrains a number to be within a range. Parameters: (value, min, max).",
    "ARDUINO_MAP_TITLE": "map( %1, %2, %3, %4, %5 )",
    "ARDUINO_MAP_TOOLTIP": "Re-maps a number from one range to another. Parameters: (value, fromLow, fromHigh, toLow, toHigh).",
    "ARDUINO_MATH_RANDOM_SEED_TITLE": "randomSeed( %1 );",
    "ARDUINO_MATH_RANDOM_SEED_TOOLTIP": "Initializes the pseudo-random number generator. Using an unconnected analog pin as a seed is recommended.",
    "ARDUINO_MATH_RANDOM_INT_TITLE": "random( %1, %2 )",
    "ARDUINO_MATH_RANDOM_INT_TOOLTIP": "Generates a pseudo-random number between min (inclusive) and max (exclusive).",

    // piCar Blocks
    "PICAR_HUE": "#ee5b56", // for piCar movement
    "PICAR_SETUP_HUE": "#016c8d", // for initialization
    "PICAR_SENSOR_HUE": "#b1b100", // for sensor
    "PICAR_SERVO_HUE": "#07a91d", // for servo
    "PICAR_MEDIA_HUE": "#de57ad", // for multimedia

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
    "PICAR_EASTER_EGG": "Play Easter Egg Melody (whole note time in ms)",
    "PICAR_EASTER_EGG_TOOLTIP": "Plays a melody. The larger the value, the slower it plays.",
    "PICAR_TONE": "Play tone on pin %1 with frequency %2 for duration (ms) %3 (non-blocking)",
    "PICAR_TONE_TOOLTIP": "Generates a tone on the specified pin. The default buzzer is on pin 22.",
    "PICAR_NO_TONE": "Stop tone on pin %1",
    "PICAR_NO_TONE_TOOLTIP": "Stops the tone playing on the specified pin. The default buzzer is on pin 22.",

    // Coding Blocks
    "CODING_HUE": "#585858", // for coding
    "CODING_RAW_STATEMENT": "Raw Statement",
    "CODING_RAW_STATEMENT_TOOLTIP": "Allows entering any code as a statement.",
    "CODING_RAW_INPUT": "Raw Input",
    "CODING_RAW_INPUT_TOOLTIP": "Allows entering code that returns any value (e.g., Number, String, Boolean).",
    "CODING_RAW_DEFINITION": "Raw Definition",
    "CODING_RAW_DEFINITION_TOOLTIP": "Allows entering global definitions, includes, or custom functions.",
    "CODING_RAW_WRAPPER": "Raw Wrapper",
    "CODING_RAW_WRAPPER_TOOLTIP": "Allows wrapping other blocks with custom code (e.g., custom loops or conditionals).",
    "CODING_RAW_WRAPPER_TOP": "Top Code:",
    "CODING_RAW_WRAPPER_BOTTOM": "Bottom Code:",

    // Text Blocks
    "TEXT_HUE": "#6a8871",  // for Text

    // Array Blocks
    "ARRAY_HUE": "#d1972b",  // for Arrays
    "ARRAY_DECLARE_TITLE": "Declare Array",
    "ARRAY_DECLARE_TOOLTIP": "Declares an array of a specified type and size.",
    "ARRAY_GET_TOOLTIP": "Gets an element from an array at a specified index.",
    "ARRAY_SET_TOOLTIP": "Sets the value of an element in an array at a specified index.",
    "ARRAY_LENGTH_TOOLTIP": "Gets the number of elements in an array.",

    // Custom Variables
    "VARIABLES_DECLARE_GLOBAL_TOOLTIP": "Declare a global variable.",
    "VARIABLES_DECLARE_LOCAL_TOOLTIP": "Declare a local variable.",

    // Functions Blocks
    "PROCEDURES_IFRETURN_TOOLTIP": "If a value is true, then return a second value.",
    "PROCEDURES_MUTATORARG_TOOLTIP": "Add an input to the function.",
    "PROCEDURES_RETURN_TOOLTIP": "Returns a value from a function."
  });
})(Blockly);



