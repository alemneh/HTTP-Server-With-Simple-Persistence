'use strict';

const http = require('http');
const fs = require('fs');

var data;

http.createServer((req, res) => {
  if(req.url === '/messages' && req.method === 'GET') {
    res.writeHead(200, {'content-type': 'text/html'});
    fs.readdir('data', (err, files) => {
      console.log(files);
      if(err) throw err;
      files.forEach( (file) => {
        console.log('In forEach '+file);
        console.log(typeof file);
        fs.readFile('data/' + file, 'utf8', (err, data) => {
          if(err) throw err;
          console.log(JSON.parse(data).message);
          res.write(JSON.parse(data).message);

        });

      });
      res.end();
    });

  }
  if(req.url === '/messages' && req.method === 'POST') {
    req.on('data', (data) => {
      console.log(JSON.parse(data));
      fs.readdir('files', (err, files) => {
        if(err) throw err;
        console.log(files);
        var num = files.length;
        fs.writeFile('data/message' + num + '.json', data, (err) => {
          if(err) throw err;
          console.log('File message'+num+'.json was saved!');
        });
      });
      res.writeHead(200, {'content-type': 'text/html'});
      return res.end();
    });
  }

}).listen(3000, () => {
  console.log('Server running on port 3000');
});
