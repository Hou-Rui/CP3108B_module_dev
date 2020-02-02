'use strict';

const CodeRunner = (() => {
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
  return {execute: execute};
})();