export function registerBlocks(Blockly) {
// Loops Blocks
Blockly.Blocks['controls_whileUntil'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_CONTROLS_WHILEUNTIL_MESSAGE}",
      "args0": [
        {
          "type": "input_value",
          "name": "BOOL",
          "check": "Boolean"
        }
      ],
      "message1": "  %1",
      "args1": [
        {
          "type": "input_statement",
          "name": "DO"
        }
      ],
      "message2": "}",
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "style": "loop_blocks",
      "tooltip": Blockly.Msg.CONTROLS_WHILEUNTIL_TOOLTIP,
      "helpUrl": Blockly.Msg.CONTROLS_WHILEUNTIL_HELPURL
    });
  }
};

Blockly.Blocks['controls_for'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_CONTROLS_FOR_MESSAGE}",
      "args0": [
        {
          "type": "field_variable",
          "name": "VAR",
          "variable": "i"
        },
        {
          "type": "input_value",
          "name": "FROM",
          "check": "Number"
        },
        {
          "type": "field_label",
          "name": "VAR_LABEL_1",
          "text": "i"
        },
        {
          "type": "field_label",
          "name": "COMPARE_OP",
          "text": " <= "
        },
        {
          "type": "input_value",
          "name": "TO",
          "check": "Number"
        },
        {
          "type": "field_label",
          "name": "VAR_LABEL_2",
          "text": "i"
        },
        {
          "type": "field_label",
          "name": "STEP_OP",
          "text": " += "
        },
        {
          "type": "input_value",
          "name": "BY",
          "check": "Number"
        }
      ],
      "message1": "%1",
      "args1": [
        {
          "type": "input_statement",
          "name": "DO"
        }
      ],
      "message2": "}",
      "inputsInline": true,
      "previousStatement": true,
      "nextStatement": true,
      "style": "loop_blocks",
      "tooltip": Blockly.Msg.CONTROLS_FOR_TOOLTIP,
      "helpUrl": Blockly.Msg.CONTROLS_FOR_HELPURL
    });
    const updateLabels = (block) => {
      const varName = block.getField('VAR').getText();
      block.setFieldValue(varName, 'VAR_LABEL_1');
      block.setFieldValue(varName, 'VAR_LABEL_2');
    };
    // 變數重新命名時同步更新 Label（不延遲、不落後、不亂碼）
    this.getField('VAR').setValidator(function(newVarId) {
      const block = this.getSourceBlock();
      setTimeout(() => {
        updateLabels(block);
        block.render();
      }, 0);
      return newVarId; // *必須回傳 ID*
    });
    // 初始顯示變數 i
    setTimeout(() => {
      updateLabels(this);
      this.render();
    }, 0);
  },
  // 自動切換 <= / >= 與 += / -=
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout || !event.recordUndo) {
      return;
    }
    if (event.type === Blockly.Events.BLOCK_CHANGE &&
        (event.blockId === this.getInputTargetBlock('FROM')?.id ||
         event.blockId === this.getInputTargetBlock('TO')?.id)) {
      const fromBlock = this.getInputTargetBlock('FROM');
      const toBlock = this.getInputTargetBlock('TO');
      let fromValue = NaN;
      let toValue = NaN;
      if (fromBlock && fromBlock.type === 'math_number') {
        fromValue = parseFloat(fromBlock.getFieldValue('NUM'));
      }
      if (toBlock && toBlock.type === 'math_number') {
        toValue = parseFloat(toBlock.getFieldValue('NUM'));
      }
      if (!isNaN(fromValue) && !isNaN(toValue)) {
        if (fromValue < toValue) {
          this.setFieldValue(' <= ', 'COMPARE_OP');
          this.setFieldValue(' += ', 'STEP_OP');
        } else if (fromValue > toValue) {
          this.setFieldValue(' >= ', 'COMPARE_OP');
          this.setFieldValue(' -= ', 'STEP_OP');
        } else {
          this.setFieldValue(' <= ', 'COMPARE_OP');
          this.setFieldValue(' += ', 'STEP_OP');
        }
      }
      this.render();
    }
  }
};

Blockly.Blocks['controls_flow_statements'] = {
  init: function() {
    this.jsonInit({
      "message0": "%{BKY_CONTROLS_FLOW_STATEMENTS_MESSAGE}",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "FLOW",
          "options": [
            ["break", "BREAK"],
            ["continue", "CONTINUE"]
          ]
        }
      ],
      "previousStatement": true,
      "nextStatement": true,
      "style": "loop_blocks",
      "tooltip": Blockly.Msg.CONTROLS_FLOW_STATEMENTS_TOOLTIP,
      "helpUrl": Blockly.Msg.CONTROLS_FLOW_STATEMENTS_HELPURL
    });
  }
};
}
