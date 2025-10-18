# Generator Porting Checklist

This file tracks the porting status of block generators from the old format to the new `arduino_generator.js`.

## Standard Blocks
- [x] `controls_if`
- [x] `logic_compare`
- [x] `logic_operation`
- [x] `logic_negate`
- [x] `logic_boolean`
- [x] `controls_repeat_ext`
- [x] `controls_whileUntil`
- [x] `controls_for`
- [x] `controls_flow_statements`
- [x] `math_number`
- [x] `math_arithmetic`
- [x] `math_single`
- [x] `text`
- [x] `text_join`
- [x] `text_append`
- [x] `lists_create_with`
- [ ] `lists_repeat`
- [ ] `lists_length`
- [ ] `lists_isEmpty`
- [ ] `lists_indexOf`
- [ ] `lists_getIndex`
- [ ] `lists_setIndex`

- [x] `Variables`
- [ ] `Functions`


## Custom Blocks

### Arduino Category
- [x] `initializes_setup`
- [x] `initializes_loop`
- [x] `arduino_pin_mode`
- [x] `arduino_pin_shadow`
- [x] `arduino_pin_mode_mode_shadow`
- [x] `arduino_digital_read`
- [x] `arduino_digital_write`
- [x] `arduino_analog_read`
- [x] `arduino_analog_write`
- [x] `arduino_constrain`
- [x] `arduino_map`

### PiCar Category
- [x] `picar_init`
- [x] `picar_resetPiCar`
- [x] `picar_drive`
- [x] `picar_stop`
- [x] `picar_checkDistance`
- [x] `picar_checkColor`
- [x] `picar_checkGray`
- [x] `picar_inPosition`
- [x] `picar_set_hand_range`
- [x] `picar_move_hands`
- [x] `picar_set_led_color`
- [x] `picar_flashingLight`
- [x] `picar_easterEgg`
- [x] `picar_tone`
- [x] `picar_no_tone`

### Coding Category
- [x] `coding_raw_statement`
- [x] `coding_raw_input`
- [x] `coding_raw_definition`
- [x] `coding_raw_wrapper`
