// Initializing a basic Blockly workspace
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: {
        'kind': 'flyoutToolbox',
        'contents': [
            {
                'kind': 'block',
                'type': 'controls_if'
            },
            {
                'kind': 'block',
                'type': 'logic_compare'
            },
            {
                'kind': 'block',
                'type': 'math_number'
            }
        ]
    }
});