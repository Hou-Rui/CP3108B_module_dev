'use strict';

const CodeRunner = (() => {
  const loadedModules = [];
  function loadInputModules() {
    let moduleDirList = ModuleLoader.getModuleDirList();
    let moduleInput = document.getElementById('module-input');
    let moduleNameList = moduleInput.value.trim().split(' ');
    for (let name of moduleNameList) {
      if (!loadedModules.includes(name)) {
        ModuleLoader.loadModule(moduleDirList, name);
        loadedModules.push(name);
      }
    }
  }

  function execute() {
    let codeTextarea = document.getElementById('code-textarea');
    let outputDiv = document.getElementById('output-div');
    let data = codeTextarea.value;
    let outputValue = eval(data);
    if (outputValue.$canvas !== undefined) {
      outputDiv.innerHTML = "";
      outputDiv.appendChild(outputValue.$canvas);
    } else {
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