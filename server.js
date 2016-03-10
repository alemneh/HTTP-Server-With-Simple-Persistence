'use strict';

const http = require('http');
const fs = require('fs');

var data;

http.createServer((res, req) {
  if(req.url === '/message' && req.method === 'POST') {
    req.on('data', (data) {
      console.log(data);
    });
  }
  
}).listen(3000, () {
  console.log('Server running on port 3000');
});
