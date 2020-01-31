'use strict';

const CodeRunner = (() => {
  function execute() {
    let textarea = document.getElementById('code-textarea');
    let data = textarea.value;
    eval(data);
  }
  return {execute: execute};
})();