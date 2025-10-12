// English language file
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
Blockly.Msg["ARDUINO_PIN_MODE_TOOLTIP"] = "Configures the specified pin to behave either as an input or an output.";
Blockly.Msg["ARDUINO_PIN_MODE_INPUT"] = "INPUT";
Blockly.Msg["ARDUINO_PIN_MODE_OUTPUT"] = "OUTPUT";
Blockly.Msg["ARDUINO_PIN_MODE_INPUT_PULLUP"] = "INPUT_PULLUP";

Blockly.Msg["ARDUINO_DIGITAL_READ"] = "digitalRead";
Blockly.Msg["ARDUINO_DIGITAL_READ_TOOLTIP"] = "Reads the value from a specified digital pin, either HIGH or LOW.";
Blockly.Msg["ARDUINO_DIGITAL_WRITE"] = "digitalWrite(%1, value: %2)";
Blockly.Msg["ARDUINO_DIGITAL_WRITE_TOOLTIP"] = "Writes a HIGH or LOW value to a digital pin.";
Blockly.Msg["ARDUINO_HIGH"] = "HIGH";
Blockly.Msg["ARDUINO_LOW"] = "LOW";

Blockly.Msg["ARDUINO_ANALOG_READ"] = "analogRead(%1)";
Blockly.Msg["ARDUINO_ANALOG_READ_TOOLTIP"] = "Reads the value from the specified analog pin (analog in / ADC) (0-1023 for 10-bit).";
Blockly.Msg["ARDUINO_ANALOG_WRITE"] = "analogWrite(%1, value: %2)";
Blockly.Msg["ARDUINO_ANALOG_WRITE_TOOLTIP"] = "Writes an analog value (PWM, 0-255 for 8-bit) to a pin (~).";

Blockly.Msg["ARDUINO_CONSTRAIN_VALUE"] = "constrain ";
Blockly.Msg["ARDUINO_CONSTRAIN_LOW"] = "between";
Blockly.Msg["ARDUINO_CONSTRAIN_HIGH"] = "and";
Blockly.Msg["ARDUINO_CONSTRAIN_TOOLTIP"] = "Constrains a number to be within a range.";

Blockly.Msg["ARDUINO_MAP_VALUE"] = "map ";
Blockly.Msg["ARDUINO_MAP_FROMLOW"] = "from low";
Blockly.Msg["ARDUINO_MAP_FROMHIGH"] = "high";
Blockly.Msg["ARDUINO_MAP_TOLOW"] = "to low";
Blockly.Msg["ARDUINO_MAP_TOHIGH"] = "high";
Blockly.Msg["ARDUINO_MAP_TOOLTIP"] = "Re-maps a number from one range to another.";


// piCar Blocks
Blockly.Msg["PICAR_HUE"] = "#ee5b56"; // for piCar movement
Blockly.Msg["PICAR_SETUP_HUE"] = "#016c8d"; // for initialization
Blockly.Msg["PICAR_SENSOR_HUE"] = "#b1b100"; // for sensor
Blockly.Msg["PICAR_SERVO_HUE"] = "#07a91d"; // for servo
Blockly.Msg["PICAR_MEDIA_HUE"] = "#de57ad"; // for multimedia


Blockly.Msg["PICAR_INIT"] = "Initialize piCar";
Blockly.Msg["PICAR_INIT_TOOLTIP"] = "Initializes the required pins and variables for piCar.";
Blockly.Msg["PICAR_SET_HAND_RANGE"] = "Set Hand Opening Range (0~180)";
Blockly.Msg["PICAR_SET_HAND_RANGE_TOOLTIP"] = "Sets the angle range for hand opening, default is 170°";
Blockly.Msg["PICAR_RESET"] = "Restart piCar";
Blockly.Msg["PICAR_RESET_TOOLTIP"] = "Restarts the piCar.";
Blockly.Msg["PICAR_DRIVE_LEFT"] = "DC Motor Power (-255 ~ 255) Left:";
Blockly.Msg["PICAR_DRIVE_RIGHT"] = "Right:";
Blockly.Msg["PICAR_DRIVE_TOOLTIP"] = "Controls the power of the left and right wheels (-255 ~ 255).";
Blockly.Msg["PICAR_STOP"] = "Stop";
Blockly.Msg["PICAR_STOP_COAST"] = "Coast";
Blockly.Msg["PICAR_STOP_BRAKE"] = "Brake";
Blockly.Msg["PICAR_STOP_TOOLTIP"] = "Choose stop method: brake or coast.";
Blockly.Msg["PICAR_CHECK_DISTANCE"] = "Check Distance (cm)";
Blockly.Msg["PICAR_CHECK_DISTANCE_TOOLTIP"] = "Uses ultrasonic sensor to detect the distance of an obstacle in front (cm).";
Blockly.Msg["PICAR_CHECK_COLOR"] = "Check Color (Black 0/White 1)";
Blockly.Msg["PICAR_CHECK_COLOR_TOOLTIP"] = "Uses infrared sensor to detect ground color. Returns 0 for black, 1 for white.";
Blockly.Msg["PICAR_CHECK_GRAY"] = "Check Grayscale (0-1023, 1023 for white, 0 for black)";
Blockly.Msg["PICAR_CHECK_GRAY_TOOLTIP"] = "Uses the infrared sensor to detect the ground grayscale value. Returns a value between 0-1023. 1023 for white, 0 for black.";
Blockly.Msg["PICAR_IN_POSITION"] = "Home Arms";
Blockly.Msg["PICAR_IN_POSITION_TOOLTIP"] = "Returns the arm servos to their home position.";
Blockly.Msg["PICAR_SET_LEFT_HAND_ANGLE"] = "Set Left Hand Angle to (180->0 Clockwise)";
Blockly.Msg["PICAR_SET_LEFT_HAND_ANGLE_TOOLTIP"] = "Sets the left hand servo angle (0-180). Initial position is 180.";
Blockly.Msg["PICAR_SET_RIGHT_HAND_ANGLE"] = "Set Right Hand Angle to (0->180 Anti-Clockwise)";
Blockly.Msg["PICAR_SET_RIGHT_HAND_ANGLE_TOOLTIP"] = "Sets the right hand servo angle (0-180). Initial position is 0.";
Blockly.Msg["PICAR_CLOSE_HANDS"] = "Close Hands";
Blockly.Msg["PICAR_CLOSE_HANDS_TOOLTIP"] = "Closes the hands.";
Blockly.Msg["PICAR_OPEN_HANDS"] = "Open Hands";
Blockly.Msg["PICAR_OPEN_HANDS_TOOLTIP"] = "Opens the hands.";

Blockly.Msg["PICAR_MOVE_HANDS"] = "Move %1 to %2 %% open at speed %3 (1-10)";
Blockly.Msg["PICAR_HAND_LEFT"] = "Left Hand";
Blockly.Msg["PICAR_HAND_RIGHT"] = "Right Hand";
Blockly.Msg["PICAR_HAND_BOTH"] = "Both Hands";
Blockly.Msg["PICAR_MOVE_HANDS_TOOLTIP"] = "Controls one or both hands to a specific opening percentage with speed control. This is a blocking function; it will wait for the action to complete. For asynchronous behavior, place it in a separate loop/core (e.g., loop1).";

Blockly.Msg["PICAR_FLASHING_LIGHT"] = "Flash RGB Light";
Blockly.Msg["PICAR_FLASHING_LIGHT_TOOLTIP"] = "Flashes the RGB light.";

Blockly.Msg["PICAR_SET_LED_COLOR"] = "Set RGB LED";
Blockly.Msg["PICAR_SET_LED_COLOR_TOOLTIP"] = "Sets the color of a specified RGB LED.";
Blockly.Msg["PICAR_LED_LEFT"] = "Rear LED";
Blockly.Msg["PICAR_LED_RIGHT"] = "Front LED";
Blockly.Msg["PICAR_LED_ALL"] = "All LEDs";
Blockly.Msg["PICAR_COLOR"] = "color to";

Blockly.Msg["PICAR_EASTER_EGG"] = "Play Easter Egg Melody (whole note time in ms)";
Blockly.Msg["PICAR_EASTER_EGG_TOOLTIP"] = "Plays a melody. The larger the value, the slower it plays.";

Blockly.Msg["PICAR_TONE"] = "Play tone on pin %1 with frequency %2 for duration (ms) %3 (non-blocking)";
Blockly.Msg["PICAR_TONE_TOOLTIP"] = "Generates a tone on the specified pin. The default buzzer is on pin 22.";
Blockly.Msg["PICAR_NO_TONE"] = "Stop tone on pin %1";
Blockly.Msg["PICAR_NO_TONE_TOOLTIP"] = "Stops the tone playing on the specified pin. The default buzzer is on pin 22.";

// Coding Blocks
Blockly.Msg["CODING_HUE"] = "#585858"; // for coding

Blockly.Msg["CODING_RAW_STATEMENT"] = "Raw Statement";
Blockly.Msg["CODING_RAW_STATEMENT_TOOLTIP"] = "Allows entering any code as a statement.";

Blockly.Msg["CODING_RAW_INPUT"] = "Raw Input";
Blockly.Msg["CODING_RAW_INPUT_TOOLTIP"] = "Allows entering code that returns any value (e.g., Number, String, Boolean).";

Blockly.Msg["CODING_RAW_DEFINITION"] = "Raw Definition";
Blockly.Msg["CODING_RAW_DEFINITION_TOOLTIP"] = "Allows entering global definitions, includes, or custom functions.";

Blockly.Msg["CODING_RAW_WRAPPER"] = "Raw Wrapper";
Blockly.Msg["CODING_RAW_WRAPPER_TOOLTIP"] = "Allows wrapping other blocks with custom code (e.g., custom loops or conditionals).";
Blockly.Msg["CODING_RAW_WRAPPER_TOP"] = "Top Code:";
Blockly.Msg["CODING_RAW_WRAPPER_BOTTOM"] = "Bottom Code:";