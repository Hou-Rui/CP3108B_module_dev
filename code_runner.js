'use strict';

const CodeRunner = (() => {
  const loadedModules = [];
  function loadInputModules() {
    let moduleDirList;
    try {
      moduleDirList = ModuleLoader.getModuleDirList();
    } catch (errorMessage) {
      output(errorMessage, true);
      return;
    }
    let moduleInput = document.getElementById('module-input');
    let moduleNameList = moduleInput.value.trim().split(' ');
    for (let name of moduleNameList) {
      if (!loadedModules.includes(name)) {
        try {
          ModuleLoader.loadModule(moduleDirList, name);
          output('Module ' + name + ' is loaded. ', false);
        } catch (errorMessage) {
          output(errorMessage, true);
        }
        loadedModules.push(name);
      }
    }
  }

  function output(message, isError) { // private
    let outputDiv = document.getElementById('output-div');
    let element = document.createElement('p');
    if (isError) {
      element.style.color = 'red';
    }
    element.appendChild(document.createTextNode(message));
    outputDiv.appendChild(element);
  }

  function execute() {
    let codeTextarea = document.getElementById('code-textarea');
    let outputDiv = document.getElementById('output-div');
    let data = codeTextarea.value;
    let outputValue;
    try {
      outputValue = eval(data);
    } catch (errorMessage) {
      outputError(errorMessage);
      return;
    }
    if (outputValue.$canvas !== undefined) {
      outputDiv.innerHTML = "";
      outputDiv.appendChild(outputValue.$canvas);
    } else if (outputValue !== undefined) {
      let element = document.createElement("p");
      element.appendChild(document.createTextNode(outputValue));
      outputDiv.appendChild(element);
    }
  }

  return {
    loadInputModules: loadInputModules,
    execute: execute
  };
})();