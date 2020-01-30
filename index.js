'use strict'

const http = require('http')
const fs = require('fs')

fs.readFile('./index.html', (err, data) => {
  if (err) {
    throw err;
  }
  http.createServer((_, response) => {
    response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(data);  
    response.end();  
  }).listen(11111)
})