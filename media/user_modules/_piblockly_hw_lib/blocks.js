// piblockly/media/user_modules/_core_hw_lib/blocks.js

export function registerBlocks(Blockly) {
  // HC-SR04 Ultrasonic Distance Sensor Block
  Blockly.Blocks['piblockly_hw_ultrasonic_distance'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_TITLE']);
      this.appendValueInput('TRIG_PIN')
          .setCheck('Number')
          .appendField(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_TRIG_PIN']);
      this.appendValueInput('ECHO_PIN')
          .setCheck('Number')
          .appendField(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_ECHO_PIN']);
      this.setInputsInline(true);
      this.setOutput(true, 'Number');
      this.setColour("#70A8FF");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_TOOLTIP']);
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_ULTRASONIC_DISTANCE_HELPURL']);
    }
  };

  // DHT Sensor Block
  Blockly.Blocks['piblockly_hw_dht_read'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_DHT_READ_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.PIBLOCKLY_HW_DHT_TYPE_11, "DHT11"],
              [Blockly.Msg.PIBLOCKLY_HW_DHT_TYPE_22, "DHT22"]
          ]), "DHT_TYPE");
      this.appendValueInput("PIN")
          .setCheck("Number")
          .appendField(Blockly.Msg.PIBLOCKLY_HW_DHT_ON_PIN);
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_DHT_READING)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.PIBLOCKLY_HW_DHT_READING_TEMP, "TEMP"],
              [Blockly.Msg.PIBLOCKLY_HW_DHT_READING_HUMIDITY, "HUMID"]
          ]), "READING_TYPE");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setColour("#70A8FF");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_DHT_READ_TOOLTIP);
    }
  };

  // --- HUSKYLENS BLOCKS ---

  // Init Block
  Blockly.Blocks['huskylens_init'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_INIT_TITLE);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_INIT_TOOLTIP);
    }
  };

  // Set Algorithm Block
  Blockly.Blocks['huskylens_set_algorithm'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SET_ALGORITHM_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_FACE_RECOGNITION, "ALGORITHM_FACE_RECOGNITION"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_OBJECT_TRACKING, "ALGORITHM_OBJECT_TRACKING"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_OBJECT_RECOGNITION, "ALGORITHM_OBJECT_RECOGNITION"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_LINE_TRACKING, "ALGORITHM_LINE_TRACKING"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_COLOR_RECOGNITION, "ALGORITHM_COLOR_RECOGNITION"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_ALGORITHM_TAG_RECOGNITION, "ALGORITHM_TAG_RECOGNITION"]
          ]), "ALGORITHM");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_SET_ALGORITHM_TOOLTIP);
    }
  };

  // Request and Check Block (Wrapper)
  Blockly.Blocks['huskylens_request_and_check'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_REQUEST_AND_CHECK_TITLE);
      this.appendStatementInput("DO")
          .setCheck(null);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_REQUEST_AND_CHECK_TOOLTIP);
    }
  };

  // Get Result Property Block
  Blockly.Blocks['huskylens_get_result_property'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_RESULT_PROPERTY_TITLE)
          .appendField(new Blockly.FieldDropdown([
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_X_CENTER, "xCenter"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_Y_CENTER, "yCenter"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_WIDTH, "width"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_HEIGHT, "height"],
              [Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_PROPERTY_ID, "ID"]
          ]), "PROPERTY")
          .appendField(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_PROPERTY_OF_RESULT);
      this.setOutput(true, "Number");
      this.setColour("#8BC34A");
      this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_HUSKYLENS_GET_RESULT_PROPERTY_TOOLTIP);
    }
  };

  Blockly.Blocks['piblockly_hw_l293d_motor_run'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_L293D_HELPURL']);
      this.setColour("#FFCC00");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_MOTOR_RUN_TITLE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_MOTOR_TITLE'])
          .appendField(new Blockly.FieldDropdown([["M1","1"],["M2","2"],["M3","3"],["M4","4"]]),"MOTOR");
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PIBLOCKLY_HW_L293D_DIRECTION_FORWARD,"FORWARD"],[Blockly.Msg.PIBLOCKLY_HW_L293D_DIRECTION_BACKWARD,"BACKWARD"]]),"DIR");
      this.appendValueInput("SPEED")
          .setCheck("Number")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_LIOU_ROBOT_MOVE_SPEED']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_L293D_MOTOR_RUN_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_l293d_motor_stop'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_L293D_HELPURL']);
      this.setColour("#FFCC00");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_MOTOR_STOP_TITLE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_MOTOR_TITLE'])
          .appendField(new Blockly.FieldDropdown([["M1","1"],["M2","2"],["M3","3"],["M4","4"]]),"MOTOR")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_LIOU_ROBOT_STOP']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_L293D_MOTOR_STOP_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_l293d_stepper_init'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_L293D_HELPURL']);
      this.setColour("#FFCC00");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_STEPPER_INIT_TITLE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TITLE'])
          .appendField(new Blockly.FieldDropdown([["S1","1"],["S2","2"]]),"MOTOR");
      this.appendValueInput("STEPS")
          .setCheck("Number")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_STEPS_PER_REV']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_L293D_STEPPER_INIT_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_l293d_stepper_speed'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_L293D_HELPURL']);
      this.setColour("#FFCC00");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_STEPPER_SPEED_TITLE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TITLE'])
          .appendField(new Blockly.FieldDropdown([["S1","1"],["S2","2"]]),"MOTOR");
      this.appendValueInput("SPEED")
          .setCheck("Number")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_SET_SPEED']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_L293D_STEPPER_SPEED_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_l293d_stepper_run'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_L293D_HELPURL']);
      this.setColour("#FFCC00");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_STEPPER_RUN_TITLE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TITLE'])
          .appendField(new Blockly.FieldDropdown([["S1","1"],["S2","2"]]),"MOTOR");
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PIBLOCKLY_HW_L293D_DIRECTION_FORWARD,"FORWARD"],[Blockly.Msg.PIBLOCKLY_HW_L293D_DIRECTION_BACKWARD,"BACKWARD"]]),"DIR");
      this.appendValueInput("STEPS")
          .setCheck("Number")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_MOVE_STEPS']);
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PIBLOCKLY_HW_L293D_STEPPER_METHOD_SINGLE,"SINGLE"],[Blockly.Msg.PIBLOCKLY_HW_L293D_STEPPER_METHOD_DOUBLE,"DOUBLE"],[Blockly.Msg.PIBLOCKLY_HW_L293D_STEPPER_METHOD_INTERLEAVE,"INTERLEAVE"],[Blockly.Msg.PIBLOCKLY_HW_L293D_STEPPER_METHOD_MICROSTEP,"MICROSTEP"]]),"METHOD");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_L293D_STEPPER_RUN_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_l293d_stepper_stop'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_L293D_HELPURL']);
      this.setColour("#FFCC00");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_STEPPER_STOP_TITLE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TITLE'])
          .appendField(new Blockly.FieldDropdown([["S1","1"],["S2","2"]]),"MOTOR")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_LIOU_ROBOT_STOP']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_L293D_STEPPER_STOP_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_l293d_servo_run'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_L293D_HELPURL']);
      this.setColour("#FFCC00");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_SERVO_RUN_TITLE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_LIOU_ROBOT_SERVO_TITLE'])
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PIBLOCKLY_HW_L293D_SERVO_CHANNEL_1,"9"],[Blockly.Msg.PIBLOCKLY_HW_L293D_SERVO_CHANNEL_2,"10"]]),"MOTOR");
      this.appendValueInput("ANGLE")
          .setCheck("Number")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_LIOU_ROBOT_ANGLE']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_L293D_SERVO_RUN_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_l293d_servo_detach'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_L293D_HELPURL']);
      this.setColour("#FFCC00");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_L293D_SERVO_DETACH_TITLE']);
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_LIOU_ROBOT_SERVO_TITLE'])
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PIBLOCKLY_HW_L293D_SERVO_CHANNEL_1,"9"],[Blockly.Msg.PIBLOCKLY_HW_L293D_SERVO_CHANNEL_2,"10"]]),"MOTOR");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_L293D_SERVO_DETACH_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_pca9685_init'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_PCA9685_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_INIT']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_PCA9685_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_pca9685_pwm_write'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_PCA9685_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_PWM_CHANNEL']);
      this.appendValueInput("Channel")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_PWM_VALUE']);
      this.appendValueInput("Value")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField("(0~4095)");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_PCA9685_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_pca9685_servo_init'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_PCA9685_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_SERVO_PULSE_MIN']);
      this.appendValueInput("pulse_min")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_SERVO_PULSE_MAX']);
      this.appendValueInput("pulse_max")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_PCA9685_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_pca9685_servo_write'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_PCA9685_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_SERVO_CHANNEL']);
      this.appendValueInput("Channel")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_SERVO_DEGREE']);
      this.appendValueInput("Degree")
          .setCheck("Number");
      this.appendDummyInput()
          .appendField("(0~180)");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_PCA9685_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_stepper_init'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_STEPPER_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_INIT']);
      this.appendDummyInput()
          .appendField("motor")
          .appendField(new Blockly.FieldDropdown([["1","1"],["2","2"]]),"MOTOR");
      this.appendDummyInput()
          .appendField("interface")
          .appendField(new Blockly.FieldDropdown([["DRIVER","DRIVER"],["FULL2WIRE","FULL2WIRE"],["FULL4WIRE","FULL4WIRE"],["HALF4WIRE","HALF4WIRE"]]),"INTERFACE");
      this.appendValueInput("STEPS")
          .setCheck("Number")
          .appendField("steps");
      this.appendValueInput("P1")
          .setCheck("Number")
          .appendField("pin1");
      this.appendValueInput("P2")
          .setCheck("Number")
          .appendField("pin2");
      this.appendValueInput("P3")
          .setCheck("Number")
          .appendField("pin3");
      this.appendValueInput("P4")
          .setCheck("Number")
          .appendField("pin4");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_stepper_set_speed'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_STEPPER_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_SET_SPEED']);
      this.appendValueInput("SPEED")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_stepper_set_accel'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_STEPPER_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_SET_ACCEL']);
      this.appendValueInput("ACCEL")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_stepper_move_to'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_STEPPER_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_MOVE_TO']);
      this.appendValueInput("POSITION")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_stepper_move'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_STEPPER_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_MOVE']);
      this.appendValueInput("STEPS")
          .setCheck("Number");
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_stepper_run'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_STEPPER_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_RUN']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_stepper_stop'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_STEPPER_HELPURL']);
      this.setColour("#B58463");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_STEPPER_STOP']);
      this.setInputsInline(true);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_STEPPER_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_accel_begin'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_ACCEL_BEGIN'])
          .appendField(new Blockly.FieldDropdown([["2G","2"],["4G","4"],["8G","8"],["16G","16"]]), "RANGE");
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_accel_fetch'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_ACCEL_FETCH']);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_accel_3axis'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_ACCEL_3AXIS'])
          .appendField(new Blockly.FieldDropdown([["x","0"],["y","1"],["z","2"]]), "AXIS")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX']);
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_gyro_begin'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_GYRO_BEGIN'])
          .appendField(new Blockly.FieldDropdown([["250","250"],["500","500"],["1000","1000"],["2000","2000"]]), "RANGE");
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_gyro_fetch'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_GYRO_FETCH']);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_gyro_3axis'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_GYRO_3AXIS'])
          .appendField(new Blockly.FieldDropdown([["x","0"],["y","1"],["z","2"]]), "AXIS")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX_UNIT']);
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_mag_begin'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_MAG_BEGIN']);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_mag_fetch'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_MAG_FETCH']);
      this.setPreviousStatement(true,null);
      this.setNextStatement(true,null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_mag_3axis'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_MAG_3AXIS'])
          .appendField(new Blockly.FieldDropdown([["x","0"],["y","1"],["z","2"]]), "AXIS")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX']);
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  Blockly.Blocks['piblockly_hw_mpu9250_accel_pitch_roll'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_ACCEL_PITCH_ROLL'])
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PIBLOCKLY_HW_MPU9250_PITCH_ROLL_PITCH,"0"],[Blockly.Msg.PIBLOCKLY_HW_MPU9250_PITCH_ROLL_ROLL,"1"]]), "PITCH_ROLL");
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };
 

  
Blockly.Blocks.pca9685={}; Blockly.Blocks.pca9685.HUE1=240;
Blockly.Blocks.pca9685.HUE2=270;
Blockly.Blocks.pca9685.HUE3=300;
Blockly.Blocks.pca9685_init={
  init:function(){
    this.setHelpUrl(Blockly.Msg.PCA9685_HELPURL);
    this.setColour(Blockly.Blocks.pca9685.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_init']);
    this.setInputsInline(true);
    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_PCA9685_TOOLTIP']);
  }
}; Blockly.Blocks.pca9685_pwm_write={
  init:function(){
    this.setHelpUrl(Blockly.Msg.PCA9685_HELPURL);
    this.setColour(Blockly.Blocks.pca9685.HUE2);
    this.appendDummyInput()
        .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_PWM_CHANNEL']);
    this.appendValueInput("Channel")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_PWM_VALUE']);
    this.appendValueInput("Value")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("(0~4095)");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_PCA9685_TOOLTIP']);
  }
}; Blockly.Blocks.pca9685_servo_init={
  init:function(){
    this.setHelpUrl(Blockly.Msg.PCA9685_HELPURL);
    this.setColour(Blockly.Blocks.pca9685.HUE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_SERVO_PULSE_MIN']);
    this.appendValueInput("pulse_min")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_SERVO_PULSE_MAX']);
    this.appendValueInput("pulse_max")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_PCA9685_TOOLTIP']);
  }
}; Blockly.Blocks.pca9685_servo_write={
  init:function(){
    this.setHelpUrl(Blockly.Msg.PCA9685_HELPURL);
    this.setColour(Blockly.Blocks.pca9685.HUE3);
    this.appendDummyInput()
        .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_SERVO_CHANNEL']);
    this.appendValueInput("Channel")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField(Blockly.Msg['PIBLOCKLY_HW_PCA9685_SERVO_DEGREE']);
    this.appendValueInput("Degree")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("(0~180)");
    this.setInputsInline(true);
    this.setPreviousStatement(true,null);
    this.setNextStatement(true,null);
    this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_PCA9685_TOOLTIP']);
  }
};


  Blockly.Blocks['piblockly_hw_mpu9250_accel_begin'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_ACCEL_BEGIN'])
          .appendField(new Blockly.FieldDropdown([["16G","0x18"],["8G","0x10"],["4G","0x08"],["2G","0x00"]]), "RANGE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_accel_fetch'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_ACCEL_FETCH']);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_accel_3axis'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_ACCEL_3AXIS'])
          .appendField(new Blockly.FieldDropdown([["X","accelX()"],["Y","accelY()"],["Z","accelZ()"]]), "AXIS")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX']);
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_accel_pitch_roll'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_ACCEL_PITCH_ROLL'])
          .appendField(new Blockly.FieldDropdown([[Blockly.Msg.PIBLOCKLY_HW_MPU9250_PITCH_ROLL_PITCH,"PITCH"],[Blockly.Msg.PIBLOCKLY_HW_MPU9250_PITCH_ROLL_ROLL,"ROLL"]]),"PITCH_ROLL");
      this.setInputsInline(true);
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_mag_begin'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_MAG_BEGIN']);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_mag_fetch'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_MAG_FETCH']);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_mag_3axis'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_MAG_3AXIS'])
          .appendField(new Blockly.FieldDropdown([["X","magX()"],["Y","magY()"],["Z","magZ()"]]), "AXIS")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX']);
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_gyro_begin'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_GYRO_BEGIN'])
          .appendField(new Blockly.FieldDropdown([["2000DPS","0x18"],["1000DPS","0x10"],["500DPS","0x08"],["250DPS","0x00"]]), "RANGE");
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_gyro_fetch'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_GYRO_FETCH']);
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };  Blockly.Blocks['piblockly_hw_mpu9250_gyro_3axis'] = {
    init: function() {
      this.setHelpUrl(Blockly.Msg['PIBLOCKLY_HW_MPU9250_HELPURL']);
      this.setColour("#70A8FF");
      this.appendDummyInput()
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_GYRO_3AXIS'])
          .appendField(new Blockly.FieldDropdown([["X","gyroX()"],["Y","gyroY()"],["Z","gyroZ()"]]), "AXIS")
          .appendField(Blockly.Msg['PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX']+" "+Blockly.Msg['PIBLOCKLY_HW_MPU9250_3AXIS_POST_FIX_UNIT']);
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg['PIBLOCKLY_HW_MPU9250_TOOLTIP']);
    }
  };

  //MAX30105
  Blockly.Blocks['PIBLOCKLY_HW_max30105_init']={init:function(){
    this.setHelpUrl(Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL);
    this.setColour(97);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE)
        .appendField(Blockly.Msg.PIBLOCKLY_HW_PROBBIE_INIT);
    this.appendValueInput("LED_RED")
        .setCheck("Number")
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_LED);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0,null);
    this.setNextStatement(!0,null);
    this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TOOLTIP);
  }
  };
  Blockly.Blocks['PIBLOCKLY_HW_max30105_check']={init:function(){
    this.setHelpUrl(Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL);
    this.setColour(97);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE)
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_CHECK)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.PIBLOCKLY_HW_MAX30105_CHECK_LIST),"CHECK_TYPE")
        .appendField("?");
    this.setInputsInline(!0);
    this.setOutput(!0,"Boolean");
    this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TOOLTIP);
  }
  };
  Blockly.Blocks['PIBLOCKLY_HW_max30105_get_beat_rate']={init:function(){
    this.setHelpUrl(Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL);
    this.setColour(97);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE)
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_BEATRATE);
    this.appendValueInput("AVG")
        .setCheck("Number")
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_AVG);
    this.setInputsInline(!0);
    this.setOutput(!0,"Number");
    this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TOOLTIP);
  }
  };
  Blockly.Blocks['PIBLOCKLY_HW_max30105_get_spo2']={init:function(){
    this.setHelpUrl(Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL);
    this.setColour(97);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE)
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_SPO2);
    this.setInputsInline(!0);
    this.setOutput(!0,"Number");
    this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TOOLTIP);
  }
  };
  Blockly.Blocks['PIBLOCKLY_HW_max30105_get_temperature']={init:function(){
    this.setHelpUrl(Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL);
    this.setColour(97);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE)
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TEMPERATURE)
        .appendField(new Blockly.FieldDropdown(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TEMP_LIST),"TEMP_TYPE");
    this.setInputsInline(!0);
    this.setOutput(!0,"Number");
    this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TOOLTIP);
  }
  };
  Blockly.Blocks['PIBLOCKLY_HW_max30105_set_beat_range']={init:function(){
    this.setHelpUrl(Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL);
    this.setColour(97);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE)
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_BEAT_RANGE);
    this.appendValueInput("MIN")
        .setCheck("Number");
    this.appendValueInput("MAX")
        .setCheck("Number")
        .appendField("~");
    this.setInputsInline(!0);
    this.setPreviousStatement(!0,null);
    this.setNextStatement(!0,null);
    this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TOOLTIP);}
  };
  Blockly.Blocks['PIBLOCKLY_HW_max30105_set_spo2_clear']={init:function(){
    this.setHelpUrl(Blockly.Msg.PIBLOCKLY_HW_MAX30105_HELPURL);
    this.setColour(97);
    this.appendDummyInput()
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TITLE)
        .appendField(Blockly.Msg.PIBLOCKLY_HW_MAX30105_SPO2_CLEAR);
    this.setInputsInline(!0);
    this.setPreviousStatement(!0,null);
    this.setNextStatement(!0,null);
    this.setTooltip(Blockly.Msg.PIBLOCKLY_HW_MAX30105_TOOLTIP);}
  };
  // PS2
  Blockly.Blocks['PIBLOCKLY_HW_ps2_initial'] = {
	init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"])
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_INITIAL"]);		
	this.appendValueInput("CLK")
		.setCheck("Number")
		.appendField("CLK");
	this.appendValueInput("CMD")
		.setCheck("Number")
		.appendField("CMD");		
	this.appendValueInput("CS")
		.setCheck("Number")
		.appendField("CS");  
	this.appendValueInput("DAT")
		.setCheck("Number")
		.appendField("DAT");
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_PRESSURES"])
	    .appendField(new Blockly.FieldDropdown([
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_DISABLED"],"false"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_ENABLED"],"true"]
	      ]), "pressures");
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_RUMBLE"])
	    .appendField(new Blockly.FieldDropdown([
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_DISABLED"],"false"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_ENABLED"],"true"]
	      ]), "rumble");			  
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setColour(280);
	}
};
Blockly.Blocks['PIBLOCKLY_HW_ps2_read'] = {
	init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"])
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_READ_CONTROLLER"]);			
	this.appendDummyInput()
	    .appendField(new Blockly.FieldDropdown([
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_VIBRATE_N"],"false"],
		  [Blockly.Msg["PIBLOCKLY_HW_PS2_VIBRATE_Y"],"true"]
	      ], this.validate), "vibrate");
	this.appendValueInput("val")
		.setCheck("Number")
		.appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_VIBRATE_VALUE"]+"[0-255]");
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setColour(280);
	this.getInput("val").setVisible(false);	
	}
	,validate: function(newValue) {
		const block = this.sourceBlock_;
		if (!block) {return;}
		if (newValue==="false"){
			block.getInput("val").setVisible(false);	
    }
		else {
			block.getInput("val").setVisible(true);
    }	
  }
};
var PIBLOCKLY_HW_ps2_button = [
	      ["START","PSB_START"],
	      ["SELECT","PSB_SELECT"],
	      ["▲","PSB_PAD_UP"],
	      ["▶","PSB_PAD_RIGHT"],
	      ["◀","PSB_PAD_LEFT"],
	      ["▼","PSB_PAD_DOWN"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_GREEN"],"PSB_TRIANGLE"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_RED"],"PSB_CIRCLE"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_BLUE"],"PSB_CROSS"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PINK"],"PSB_SQUARE"],
	      ["L1","PSB_L1"],
	      ["L2","PSB_L2"],
	      ["L3","PSB_L3"],
	      ["R1","PSB_R1"],
	      ["R2","PSB_R2"],			  
	      ["R3","PSB_R3"] 	  
];
Blockly.Blocks['PIBLOCKLY_HW_ps2_button_event'] = {
	init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"]);
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON"])
	    .appendField(new Blockly.FieldDropdown(PIBLOCKLY_HW_ps2_button), "button");
	this.appendDummyInput()
	    .appendField(new Blockly.FieldDropdown([
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PRESS_JUST"],"press_just"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_RELEASE_JUST"],"release_just"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PRESS"],"press"],		  
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PRESS_NEW"],"press_new"]		  
	      ]), "event");	  
	this.setInputsInline(true);
	this.setOutput(true, null); 
	this.setColour(280);
	}
};
Blockly.Blocks['PIBLOCKLY_HW_ps2_initial_func'] = {
	init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"])
		.appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_ENABLED"]);		
	this.appendDummyInput()
	    .appendField(new Blockly.FieldDropdown([
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_PRESSURES"],"PRESSURES"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_RUMBLE"],"RUMBLE"]
	      ]), "func");			  
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setColour(280);
	}
};
var PIBLOCKLY_HW_direction8 = [
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_UP"],"u"],		
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_UPRIGHT"],"ur"],
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_RIGHT"],"r"],		
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_DOWNRIGHT"],"dr"],
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_DOWN"],"d"],		
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_DOWNLEFT"],"dl"],
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_LEFT"],"l"],		
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_LEFTUP"],"ul"],
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_CENTER"],"x"],
		];
		
var PIBLOCKLY_HW_direction4 = [
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_UP"],"u"],
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_RIGHT"],"r"],
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_DOWN"],"d"],
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_LEFT"],"l"],
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION_CENTER"],"x"],
		];	
Blockly.Blocks['PIBLOCKLY_HW_ps2_stick_direction'] = {
  init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"]);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT) 
        .appendField(new Blockly.FieldDropdown([
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_LEFT"],"true"],		
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_RIGHT"],"false"]
		]), "position");
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT) 
        .appendField(new Blockly.FieldDropdown([
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION8"],"8"],		
			[Blockly.Msg["PIBLOCKLY_HW_PS2_STICK_DIRECTION4"],"4"]
		], this.validate), "type");			
    this.appendDummyInput("opt")
        .setAlign(Blockly.ALIGN_RIGHT) 
        .appendField(new Blockly.FieldDropdown(PIBLOCKLY_HW_direction8), "direction");
	this.setInputsInline(true);
	this.setOutput(true, null); 
    this.setColour(280);
  }
  ,validate: function(newValue) {
		const block = this.sourceBlock_;
		if (!block) {return;}
		block.getInput("opt").removeField("direction");
		if (newValue==="8"){
			block.getInput("opt").appendField(new Blockly.FieldDropdown(PIBLOCKLY_HW_direction8),"direction");	
    }
  else {
			block.getInput("opt").appendField(new Blockly.FieldDropdown(PIBLOCKLY_HW_direction4),"direction");
  }
  }
};
Blockly.Blocks['PIBLOCKLY_HW_ps2_receiver_state'] = {
  init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"])
		.appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_RECEIVER_STATE"]);
	this.setInputsInline(true);
	this.setOutput(true, null); 
    this.setColour(280);
  }
};
Blockly.Blocks['PIBLOCKLY_HW_ps2_state'] = {
  init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"])
		.appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_STATE"]);
	this.setInputsInline(true);
	this.setOutput(true, null); 
    this.setColour(280);
  }
};
Blockly.Blocks['PIBLOCKLY_HW_ps2_analog_max'] = {
	init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"])
		.appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_MAX"]);		
	this.appendValueInput("val")
		.setCheck("Number");
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setColour(280);
	}
};
Blockly.Blocks['PIBLOCKLY_HW_ps2_analog_read'] = {
  init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"]);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT) 
        .appendField(new Blockly.FieldDropdown([
			[Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_LX"],"PSS_LX"],		
			[Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_LY"],"PSS_LY"],	
			[Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_RX"],"PSS_RX"],		
			[Blockly.Msg["PIBLOCKLY_HW_PS2_ANALOG_READ_RY"],"PSS_RY"]		
		]), "analog");	
	this.setInputsInline(true);
	this.setOutput(true, null); 
    this.setColour(280);
  }
};
var PIBLOCKLY_HW_ps2_pressure_button = [
	      ["START","PSAB_START"],
	      ["SELECT","PSAB_SELECT"],
	      ["▲","PSB_PAD_UP"],
	      ["▶","PSB_PAD_RIGHT"],
	      ["◀","PSB_PAD_LEFT"],
	      ["▼","PSB_PAD_DOWN"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_GREEN"],"PSB_TRIANGLE"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_RED"],"PSB_CIRCLE"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_BLUE"],"PSB_CROSS"],
	      [Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON_PINK"],"PSB_SQUARE"],
	      ["L1","PSAB_L1"],
	      ["L2","PSAB_L2"],
	      ["R1","PSAB_R1"],
	      ["R2","PSAB_R2"]  
];
Blockly.Blocks['PIBLOCKLY_HW_ps2_pressures_read'] = {
  init: function() {
	this.appendDummyInput()
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2"])
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_BUTTON"]);	
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT) 
        .appendField(new Blockly.FieldDropdown(PIBLOCKLY_HW_ps2_pressure_button), "analog");	
	this.appendDummyInput()		
	    .appendField(Blockly.Msg["PIBLOCKLY_HW_PS2_PRESSURES_ANALOG"]);			
	this.setInputsInline(true);
	this.setOutput(true, null); 
    this.setColour(280);
  }
};
}
