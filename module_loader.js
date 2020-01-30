'use strict';

const ModuleLoader = (function() {
  function stringFromFile(path) {
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

  function loadModule(moduleDirList, moduleName) {
    let dirname = moduleDirList[moduleName];
    if (dirname === undefined) {
      throw 'Unknown module: ' + moduleName;
    }
    let modulePath = stringFromFile('modules/' + dirname);
    let moduleObj = JSON.parse(modulePath);
    let sourceFileNames = moduleObj['module_source_files'];
    for (let url of sourceFileNames) {
      dynamicallyLoadScript(url);
    }
  }

  function dynamicallyLoadScript(url) {
    let script = document.createElement('script');
    script.src = sourceFileName;
    script.async = false;
    script.defer = true;
    document.head.appendChild(script);
  }

  // main code
  let moduleDirList = getModuleDirList();
  loadModule(moduleDirList, 'RUNES');
  return {
    loadModule: loadModule
  };
})();
