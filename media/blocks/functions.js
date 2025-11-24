// Function Blocks
const CUSTOM_PROCEDURES_CALL_MANUAL_COMMON = {
  /**
   * Create XML to represent the (un)typed arguments.
   * @return {!Element} XML storage element.
   * @this {Blockly.Block}
   */
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('name', this.getFieldValue('NAME'));
    for (let i = 0; i < this.arguments_.length; i++) {
      const parameter = Blockly.utils.xml.createElement('arg');
      parameter.setAttribute('name', this.arguments_[i]);
      parameter.setAttribute('type', this.argTypes_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  /**
   * Parse XML to restore the (un)typed arguments.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.argTypes_ = [];
    for (const childNode of xmlElement.childNodes) {
      if (childNode.nodeName.toLowerCase() === 'arg') {
        this.arguments_.push(childNode.getAttribute('name'));
        this.argTypes_.push(childNode.getAttribute('type'));
      }
    }
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this {Blockly.Block}
   */
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('custom_procedures_mutatorcontainer');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.arguments_.length; i++) {
      const argBlock = workspace.newBlock('custom_procedures_mutatorarg');
      argBlock.initSvg();
      argBlock.setFieldValue(this.arguments_[i], 'NAME');
      argBlock.setFieldValue(this.argTypes_[i], 'TYPE');
      connection.connect(argBlock.previousConnection);
      connection = argBlock.nextConnection;
    }
    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this {Blockly.Block}
   */
  compose: function(containerBlock) {
    // Store connections before arguments are changed
    const connections = {};
    for (let i = 0; i < this.arguments_.length; i++) {
      const argName = this.arguments_[i];
      const input = this.getInput('ARG' + i);
      if (input && input.connection && input.connection.targetConnection) {
        connections[argName] = input.connection.targetConnection;
      }
    }
    // Get new arguments
    this.arguments_ = [];
    this.argTypes_ = [];
    let block = containerBlock.getInputTargetBlock('STACK');
    while (block) {
      this.arguments_.push(block.getFieldValue('NAME'));
      this.argTypes_.push(block.getFieldValue('TYPE'));
      block = block.nextConnection && block.nextConnection.targetBlock();
    }
    // Update shape and reconnect
    this.updateShape_(connections);
  },
  /**
   * Modify this block to have the correct number of arguments.
   * @private
   * @this {Blockly.Block}
   */
  updateShape_: function(connections) {
    // Clean up old argument inputs and parentheses
    let i = 0;
    while (this.getInput('ARG' + i)) {
      this.removeInput('ARG' + i);
      i++;
    }
    if (this.getInput('END_ROW')) {
        this.removeInput('END_ROW');
    }

    // Rebuild inputs and reconnect for Engineer style (now always)
    for (i = 0; i < this.arguments_.length; i++) {
      const argName = this.arguments_[i];
      const input = this.appendValueInput('ARG' + i)
          .setAlign(Blockly.ALIGN_RIGHT);
      if (i === 0) {
        input.appendField('(');
      } else {
        input.appendField(',');
      }
      // Reconnect the old block if it exists
      if (connections && connections[argName]) {
        input.connection.connect(connections[argName]);
      }
    }
    // Add closing parenthesis
    const endRow = this.appendDummyInput('END_ROW');
    if (this.arguments_.length === 0) {
      endRow.appendField('()');
    } else {
      endRow.appendField(')');
    }
    this.setInputsInline(true);
  }
};

Blockly.Blocks['custom_procedures_callnoreturn_manual'] = Object.assign({}, CUSTOM_PROCEDURES_CALL_MANUAL_COMMON, {
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(Blockly.Msg.PROCEDURES_CALLNORETURN_TITLE || 'Call ')
        .appendField(new Blockly.FieldTextInput('myFunction'), 'NAME');
    this.setColour('%{BKY_FUNCTIONS_HUE}');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP']);
    this.setHelpUrl('');
    this.arguments_ = [];
    this.argTypes_ = [];
    this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
    this.updateShape_();
  }
});

Blockly.Blocks['custom_procedures_callreturn_manual'] = Object.assign({}, CUSTOM_PROCEDURES_CALL_MANUAL_COMMON, {
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField(Blockly.Msg.PROCEDURES_CALLRETURN_TITLE || 'Get Value from ')
        .appendField(new Blockly.FieldTextInput('myFunction'), 'NAME');
    this.setColour('%{BKY_FUNCTIONS_HUE}');
    this.setOutput(true, null);
    this.setTooltip(Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP']);
    this.setHelpUrl('');
    this.arguments_ = [];
    this.argTypes_ = [];
    this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
    this.updateShape_();
  }
});

// Custom, typed procedure blocks

Blockly.Blocks['custom_procedures_mutatorcontainer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.BKY_CUSTOM_PROCEDURES_MUTATORCONTAINER_MSG_ENGINEER);
    this.appendStatementInput('STACK');
    this.setColour('%{BKY_FUNCTIONS_HUE}');
    this.setTooltip(Blockly.Msg['PROCEDURES_MUTATORCONTAINER_TOOLTIP']);
    this.contextMenu = false;
  },
};

Blockly.Blocks['custom_procedures_mutatorarg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.BKY_CUSTOM_PROCEDURES_MUTATORARG_MSG_ENGINEER)
        .appendField(new Blockly.FieldDropdown([
            ['int', 'int'],
            ['float', 'float'],
            ['String', 'String'],
            ['bool', 'bool']
        ]), 'TYPE')
        .appendField(new Blockly.FieldTextInput('x'), 'NAME');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('%{BKY_FUNCTIONS_HUE}');
    this.setTooltip(Blockly.Msg['PROCEDURES_MUTATORARG_TOOLTIP']);
    this.contextMenu = false;
  },
};

const CUSTOM_PROCEDURES_DEF_COMMON = {
  init: function() {
    this.nameField_ = new Blockly.FieldTextInput('', this.validateName_.bind(this));
    this.appendDummyInput('TOPROW')
        .appendField(this.defType_)
        .appendField(this.nameField_, 'NAME')
        .appendField('', 'PARAMS');
    this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
    if ((this.workspace.options.comments ||
         (this.workspace.options.parentWorkspace &&
          this.workspace.options.parentWorkspace.options.comments)) &&
        Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']) {
      this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
    }
    this.setColour('%{BKY_FUNCTIONS_HUE}');
    this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
    this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
    this.arguments_ = [];
    this.argTypes_ = []; // Custom: store types
    this.argumentVarModels_ = [];
    this.setStatements_(true);
    this.statementConnection_ = null;
  },
  setStatements_: function(hasStatements) {
    if (this.hasStatements_ === hasStatements) {
      return;
    }
    if (hasStatements) {
      this.appendStatementInput('STACK')
          .appendField(Blockly.Msg['PROCEDURES_DEFNORETURN_DO']);
      if (this.getInput('RETURN')) {
        this.moveInputBefore('STACK', 'RETURN');
      }
    } else {
      this.removeInput('STACK', true);
    }
    this.hasStatements_ = hasStatements;
  },
  validateName_: function(name) {
    // Temporary fix: Disable rename to avoid gesture conflicts.
    name = name.replace(/[^\w\s]/g, '').replace(/\s/g, ' ');
    return name;
  },
  mutationToDom: function() {
    const container = document.createElement('mutation');
    if (this.hasStatements_) {
      container.setAttribute('statements', this.hasStatements_);
    }
    for (let i = 0; i < this.argumentVarModels_.length; i++) {
      const parameter = document.createElement('arg');
      const varModel = this.argumentVarModels_[i];
      parameter.setAttribute('name', varModel.name);
      parameter.setAttribute('varid', varModel.getId());
      parameter.setAttribute('type', this.argTypes_[i]);
      container.appendChild(parameter);
    }
    return container;
  },
  domToMutation: function(xmlElement) {
    this.arguments_ = [];
    this.argTypes_ = [];
    this.argumentVarModels_ = [];
    for (const node of xmlElement.childNodes) {
      if (node.nodeName.toLowerCase() === 'arg') {
        const varName = node.getAttribute('name');
        const varId = node.getAttribute('varid') || node.getAttribute('variableid');
        const varType = node.getAttribute('type');
        this.arguments_.push(varName);
        this.argTypes_.push(varType);
        const variable = Blockly.Variables.getOrCreateVariablePackage(
            this.workspace, varId, varName, varType);
        this.argumentVarModels_.push(variable);
      }
    }
    this.updateParams_();
    this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },
  updateParams_: function() {
    let params = [];
    if (this.arguments_.length) {
      params.push('with:');
      for (let i = 0; i < this.arguments_.length; i++) {
        params.push(this.argTypes_[i] + ' ' + this.arguments_[i]);
      }
    }
    const paramString = params.join(' ');
    this.setFieldValue(paramString, 'PARAMS');
  },
  mutatorRebuild_: function(containerBlock) {
    const oldVarModels = this.argumentVarModels_; // Keep a reference to the old variables
    this.arguments_ = [];
    this.argTypes_ = [];
    this.argumentVarModels_ = [];
    let block = containerBlock.getInputTargetBlock('STACK');
    while (block) {
      this.arguments_.push(block.getFieldValue('NAME'));
      this.argTypes_.push(block.getFieldValue('TYPE'));
      this.argumentVarModels_.push(Blockly.Variables.getOrCreateVariablePackage(
          this.workspace, null, block.getFieldValue('NAME'), block.getFieldValue('TYPE')));
      block = block.nextConnection && block.nextConnection.targetBlock();
    }
    this.updateParams_();
    Blockly.Procedures.mutateCallers(this);
    // Now, find which variables from the old list are no longer present in the new list
    // (either because they were removed or their type changed, resulting in a new variable/ID).
    for (const oldVar of oldVarModels) {
      const isStillPresent = this.argumentVarModels_.some(
        newVar => newVar.getId() === oldVar.getId()
      );
      if (!isStillPresent) {
        this.workspace.getVariableMap().deleteVariableById(oldVar.getId());
      }
    }
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('custom_procedures_mutatorcontainer');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    for (let i = 0; i < this.arguments_.length; i++) {
      const argBlock = workspace.newBlock('custom_procedures_mutatorarg');
      argBlock.initSvg();
      argBlock.setFieldValue(this.arguments_[i], 'NAME');
      argBlock.setFieldValue(this.argTypes_[i], 'TYPE');
      connection.connect(argBlock.previousConnection);
      connection = argBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    this.mutatorRebuild_(containerBlock);
  },
  getProcedureDef: function() {
    return [this.getFieldValue('NAME'), this.arguments_, this.defType_ === 'procedures_defreturn'];
  },
  getVars: function() {
    return this.arguments_;
  },
  getVarModels: function() {
    return this.argumentVarModels_;
  },
  renameVarById: function(oldId, newId) {
    const oldVar = this.workspace.getVariableMap().getVariableById(oldId);
    if (Blockly.Names.equals(oldVar.name, this.getFieldValue('NAME'))) {
      return; // Can't rename procedure name.
    }
    for (let i = 0; i < this.argumentVarModels_.length; i++) {
      if (this.argumentVarModels_[i].getId() === oldId) {
        this.argumentVarModels_[i] = this.workspace.getVariableMap().getVariableById(newId);
      }
    }
    this.mutatorRebuild_(this.mutator.getWorkspace().getTopBlocks(false)[0]);
  },
  displayRenamedVar_: function(oldName, newName) {
    this.updateParams_();
  },
  customContextMenu: function(options) {
    if (this.isInFlyout) {
      return;
    }
    const option = {enabled: true};
    const name = this.getFieldValue('NAME');
    option.text = Blockly.Msg['PROCEDURES_CREATE_DO'].replace('%1', name);
    const xmlMutation = document.createElement('mutation');
    xmlMutation.setAttribute('name', name);
    for (let i = 0; i < this.arguments_.length; i++) {
      const xmlArg = document.createElement('arg');
      xmlArg.setAttribute('name', this.arguments_[i]);
      xmlArg.setAttribute('type', this.argTypes_[i]); // Custom
      xmlMutation.appendChild(xmlArg);
    }
    const xmlBlock = document.createElement('block');
    xmlBlock.setAttribute('type', this.callType_);
    xmlBlock.appendChild(xmlMutation);
    option.callback = Blockly.ContextMenu.callbackFactory(this, xmlBlock);
    options.push(option);

    if (!this.isCollapsed()) {
      for (let i = 0; i < this.argumentVarModels_.length; i++) {
        const argOption = {enabled: true};
        const argVar = this.argumentVarModels_[i];
        const argName = argVar.name;
        argOption.text = Blockly.Msg['VARIABLES_SET_CREATE_GET'].replace('%1', argName);

        const argXmlField = Blockly.Variables.generateVariableFieldDom(argVar);
        const argXmlBlock = document.createElement('block');
        argXmlBlock.setAttribute('type', 'variables_get');
        argXmlBlock.appendChild(argXmlField);
        argOption.callback = Blockly.ContextMenu.callbackFactory(this, argXmlBlock);
        options.push(argOption);
      }
    }
  },
  callType_: 'procedures_callnoreturn',
};

Blockly.Blocks['custom_procedures_defnoreturn'] =
    Object.assign({}, CUSTOM_PROCEDURES_DEF_COMMON, {
        defType_: 'procedures_defnoreturn',
        init: function() {
            this.nameField_ = new Blockly.FieldTextInput('myFunction', this.validateName_.bind(this));

            this.appendDummyInput('TOPROW')
                .appendField('void')
                .appendField(this.nameField_, 'NAME')
                .appendField('(')
                .appendField('', 'PARAMS')
                .appendField(') {');
            this.setColour('%{BKY_FUNCTIONS_HUE}');

            this.setInputsInline(true);
            this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
            if ((this.workspace.options.comments ||
                 (this.workspace.options.parentWorkspace &&
                  this.workspace.options.parentWorkspace.options.comments)) &&
                Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']) {
              this.setCommentText(Blockly.Msg['PROCEDURES_DEFNORETURN_COMMENT']);
            }
            this.setTooltip(Blockly.Msg['PROCEDURES_DEFNORETURN_TOOLTIP']);
            this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFNORETURN_HELPURL']);
            this.arguments_ = [];
            this.argTypes_ = [];
            this.argumentVarModels_ = [];
            this.setStatements_(true);
            this.statementConnection_ = null;
            this.appendDummyInput('BOTTOMROW').appendField('}');
        },
        setStatements_: function(hasStatements) {
            if (this.hasStatements_ === hasStatements) {
              return;
            }
            if (hasStatements) {
              this.appendStatementInput('STACK'); // No "do"
              if (this.getInput('RETURN')) {
                this.moveInputBefore('STACK', 'RETURN');
              }
            } else {
              this.removeInput('STACK', true);
            }
            this.hasStatements_ = hasStatements;
        },
        updateParams_: function() {
            let params = [];
            for (let i = 0; i < this.arguments_.length; i++) {
                params.push(this.argTypes_[i] + ' ' + this.arguments_[i]);
            }
            const paramString = params.join(', ');
            if (this.getField('PARAMS')) {
                this.setFieldValue(paramString, 'PARAMS');
            }
        },
    });

Blockly.Blocks['custom_procedures_defreturn'] =
    Object.assign({}, CUSTOM_PROCEDURES_DEF_COMMON, {
        defType_: 'procedures_defreturn',
        init: function() {
            this.nameField_ = new Blockly.FieldTextInput('myFunction', this.validateName_.bind(this));

            this.appendDummyInput('TOPROW')
                .appendField(new Blockly.FieldDropdown([
                    ['int', 'int'],
                    ['float', 'float'],
                    ['String', 'String'],
                    ['bool', 'bool']
                ]), 'TYPE')
                .appendField(' ')
                .appendField(this.nameField_, 'NAME')
                .appendField('(')
                .appendField('', 'PARAMS')
                .appendField(') {');
            this.setColour('%{BKY_FUNCTIONS_HUE}');

            this.setInputsInline(true);
            this.setMutator(new Blockly.icons.MutatorIcon(['custom_procedures_mutatorarg'], this));
            if ((this.workspace.options.comments ||
                (this.workspace.options.parentWorkspace &&
                 this.workspace.options.parentWorkspace.options.comments)) &&
                Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']) {
              this.setCommentText(Blockly.Msg['PROCEDURES_DEFRETURN_COMMENT']);
            }
            this.setTooltip(Blockly.Msg['PROCEDURES_DEFRETURN_TOOLTIP']);
            this.setHelpUrl(Blockly.Msg['PROCEDURES_DEFRETURN_HELPURL']);
            this.arguments_ = [];
            this.argTypes_ = [];
            this.argumentVarModels_ = [];
            this.setStatements_(true);
            this.statementConnection_ = null;
            this.appendDummyInput('BOTTOMROW').appendField('}');
        },
        setStatements_: function(hasStatements) {
            if (this.hasStatements_ === hasStatements) {
              return;
            }
            if (hasStatements) {
              this.appendStatementInput('STACK');
            } else {
              this.removeInput('STACK', true);
            }
            this.hasStatements_ = hasStatements;
        },
        updateParams_: function() {
            let params = [];
            for (let i = 0; i < this.arguments_.length; i++) {
                params.push(this.argTypes_[i] + ' ' + this.arguments_[i]);
            }
            const paramString = params.join(', ');
            if (this.getField('PARAMS')) {
                this.setFieldValue(paramString, 'PARAMS');
            }
        },
        mutationToDom: function() {
            const container = CUSTOM_PROCEDURES_DEF_COMMON.mutationToDom.call(this);
            container.setAttribute('returntype', this.getFieldValue('TYPE'));
            return container;
        },
        domToMutation: function(xmlElement) {
            CUSTOM_PROCEDURES_DEF_COMMON.domToMutation.call(this, xmlElement);
            const returnType = xmlElement.getAttribute('returntype');
            if (returnType) {
                this.setFieldValue(returnType, 'TYPE');
            }
        }
    });

const CUSTOM_PROCEDURES_CALL_COMMON = {
  init: function() {
    this.appendDummyInput('TOPROW')
        .appendField('', 'NAME');
    this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
    this.setColour('%{BKY_FUNCTIONS_HUE}');
    this.arguments_ = [];
    this.argVarModels_ = [];
    this.quarkConnections_ = {};
    this.quarkIds_ = null;
    this.previousDisabled_ = false;
  },
  getProcedureCall: function() {
    return this.getFieldValue('NAME');
  },
  renameProcedure: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('NAME'))) {
      this.setFieldValue(newName, 'NAME');
      const baseMsg = this.outputConnection ?
          Blockly.Msg['PROCEDURES_CALLRETURN_TOOLTIP'] :
          Blockly.Msg['PROCEDURES_CALLNORETURN_TOOLTIP'];
      this.setTooltip(baseMsg.replace('%1', newName));
    }
  },
  setProcedureParameters_: function(paramNames, paramIds, paramTypes) {
    const defBlock = Blockly.Procedures.getDefinition(this.getProcedureCall(),
        this.workspace);
    const mutatorOpen = defBlock && defBlock.mutator &&
        defBlock.mutator.isVisible();
    if (!mutatorOpen) {
      this.quarkConnections_ = {};
      this.quarkIds_ = null;
    }
    if (!paramIds) {
      return;
    }
    if (paramIds.length !== paramNames.length) {
      throw RangeError('Number of IDs does not match number of names.');
    }
    const paramChanges = [];
    const fieldLabels = this.getFieldValue('PARAMS');
    if (fieldLabels) {
      const oldLabels = JSON.parse(fieldLabels);
      if (oldLabels.join('\n') === paramNames.join('\n')) {
        return; // No change.
      }
    }
    this.setFieldValue(JSON.stringify(paramNames), 'PARAMS');
    this.quarkIds_ = paramIds;
    for (let i = 0; i < this.arguments_.length; i++) {
      const connection = this.getInput('ARG' + i).connection.targetConnection;
      paramChanges.push({
        connection: connection,
        paramId: this.quarkIds_[i],
      });
      if (mutatorOpen && connection &&
          paramIds.indexOf(this.quarkIds_[i]) === -1) {
        connection.disconnect();
        connection.getSourceBlock().bumpNeighbours();
      }
    }
    this.arguments_ = [].concat(paramNames);
    this.argVarModels_ = [];
    for (let i = 0; i < this.arguments_.length; i++) {
      const variable = Blockly.Variables.getVariable(this.workspace, paramIds[i]);
      this.argVarModels_.push(variable);
    }
    this.updateShape_();
    if (mutatorOpen) {
      for (let i = 0; i < paramChanges.length; i++) {
        const data = paramChanges[i];
        const newParamId = data.paramId;
        const newConnection = this.quarkConnections_[newParamId];
        if (data.connection && newConnection) {
          data.connection.connect(newConnection);
        }
      }
    }
  },
  updateShape_: function() {
    for (let i = 0; i < this.arguments_.length; i++) {
      let input = this.getInput('ARG' + i);
      if (!input) {
        input = this.appendValueInput('ARG' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(this.arguments_[i]);
        input.init();
      }
    }
    for (let i = this.arguments_.length; this.getInput('ARG' + i); i++) {
      this.removeInput('ARG' + i);
    }
    if (this.arguments_.length) {
      if (!this.getInput('TOPROW').fieldRow.length) {
        this.moveInputBefore('TOPROW', 'ARG0');
      }
    } else {
      if (this.getInput('TOPROW').fieldRow.length) {
        this.moveInputBefore('TOPROW', null);
      }
    }
  },
  onchange: function(event) {
    if (!this.workspace || this.workspace.isFlyout) {
      return;
    }
    if (event.type === Blockly.Events.BLOCK_CREATE &&
        event.ids.indexOf(this.id) !== -1) {
      const name = this.getProcedureCall();
      const def = Blockly.Procedures.getDefinition(name, this.workspace);
      if (def) {
        const argNames = def.getVars();
        const argIds = argNames.map(
            (name) => def.workspace.getVariableMap().getVariable(name).getId());
        this.setProcedureParameters_(argNames, argIds);
      }
    } else if (event.type === Blockly.Events.BLOCK_DELETE) {
      const name = this.getProcedureCall();
      if (Blockly.Procedures.getDefinition(name, this.workspace)) {
        return; // Definition still exists, so don't disable.
      }
      if (event.ids.indexOf(this.id) !== -1) {
        // If this block is being deleted, don't change its appearance.
        return;
      }
      if (this.previousDisabled_) {
        return; // Already disabled.
      }
      this.setDisabled(true);
      this.previousDisabled_ = true;
    } else if (event.type === Blockly.Events.CHANGE &&
        event.element === 'disabled') {
      if (event.blockId !== this.id) {
        return;
      }
      if (this.disabled) {
        this.previousDisabled_ = true;
      } else {
        this.previousDisabled_ = false;
      }
    }
  },
  customContextMenu: function(options) {
    const option = {
      enabled: true,
      text: Blockly.Msg['PROCEDURES_HIGHLIGHT_DEF'],
    };
    const name = this.getProcedureCall();
    const workspace = this.workspace;
    option.callback = function() {
      const def = Blockly.Procedures.getDefinition(name, workspace);
      if (def) {
        workspace.centerOnBlock(def.id);
        def.select();
      }
    };
    options.push(option);
  },
  defType_: 'procedures_defreturn',
};

export function registerBlocks(Blockly) {

Blockly.Blocks['custom_procedures_callnoreturn'] =
    Object.assign({}, CUSTOM_PROCEDURES_CALL_COMMON, {
      init: function() {
        this.appendDummyInput('TOPROW')
            .appendField('', 'NAME');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour('%{BKY_FUNCTIONS_HUE}');
        this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLNORETURN_HELPURL']);
        this.arguments_ = [];
        this.argVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousDisabled_ = false;
      },
      defType_: 'procedures_defnoreturn',
    });

Blockly.Blocks['custom_procedures_callreturn'] =
    Object.assign({}, CUSTOM_PROCEDURES_CALL_COMMON, {
      init: function() {
        this.appendDummyInput('TOPROW')
            .appendField('', 'NAME');
        this.setOutput(true);
        this.setColour('%{BKY_FUNCTIONS_HUE}');
        this.setHelpUrl(Blockly.Msg['PROCEDURES_CALLRETURN_HELPURL']);
        this.arguments_ = [];
        this.argVarModels_ = [];
        this.quarkConnections_ = {};
        this.quarkIds_ = null;
        this.previousDisabled_ = false;
      },
      defType_: 'procedures_defreturn',
    });

Blockly.Blocks['custom_procedures_return'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .appendField(Blockly.Msg.BKY_CUSTOM_PROCEDURES_RETURN_MSG_ENGINEER.split('%1')[0]);
    this.setColour('%{BKY_FUNCTIONS_HUE}');

    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    // No next statement because return terminates the function.
    this.setTooltip(Blockly.Msg['PROCEDURES_RETURN_TOOLTIP']);
    this.setHelpUrl('');
    this.setOnChange(function(event) {
      if (!this.workspace || this.isInFlyout) {
        return;
      }
      var legal = false;
      var block = this;
      do {
        if (this.FUNCTION_TYPES.indexOf(block.type) !== -1) {
          legal = true;
          break;
        }
        block = block.getSurroundParent();
      } while (block);
      if (legal) {
        if (block.type === 'custom_procedures_defnoreturn') {
            this.setWarningText('Return blocks cannot be used in a function with no return value (void).');
        } else {
            this.setWarningText(null);
        }
      } else {
        this.setWarningText('This block may only be used within a function.');
      }
    });
  },
          FUNCTION_TYPES: ['custom_procedures_defreturn', 'custom_procedures_defnoreturn'],
        };
}