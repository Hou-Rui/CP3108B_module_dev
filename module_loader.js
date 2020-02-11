'use strict';

const ModuleLoader = (function() {
  function stringFromFile(path) { // private
    let request = new XMLHttpRequest();
    request.open('GET', path, false);
    request.send(null);
    return request.responseText;
  }

  function getModuleDirList() {
    let data = stringFromFile('modules/modules.json');
    let obj = JSON.parse(data);
    if (obj['module_dirs'] === undefined) {
      throw 'Invalid modules.json: key "module_dirs" is missing';
    }
    return obj['module_dirs'];
  }

  function loadModule(moduleDirList, moduleName, usedSymbols = []) {
    let dirname = moduleDirList[moduleName];
    if (dirname === undefined) {
      throw 'Unknown module: ' + moduleName;
    }
    let modulePath = 'modules/' + dirname;
    let moduleObj = JSON.parse(stringFromFile(modulePath + '/module_config.json'));
    let sourceFileNames = moduleObj['module_source_files'];
    let allSymbols = moduleObj['module_symbols'];
    for (let url of sourceFileNames) {
      dynamicallyLoadScript(modulePath + '/' + url);
      blockUnusedSymbols(allSymbols, usedSymbols);
    }
  }

  function dynamicallyLoadScript(url) { // private
    let script = document.createElement('script');
    script.src = url;
    script.async = false;
    script.defer = true;
    document.body.appendChild(script);
  }

  function blockUnusedSymbols(allSymbols, usedSymbols) {
    let unusedSymbols = allSymbols.filter(x => !usedSymbols.includes(x));
    let scriptText = '';
    for (let symbol of unusedSymbols) {
      scriptText += `${symbol} = undefined;\n`
    }
    let script = document.createElement('script');
    script.text = script;
    script.async = false;
    document.body.appendChild(script);
  }

  return {
    loadModule: loadModule,
    getModuleDirList: getModuleDirList
  };
})();
