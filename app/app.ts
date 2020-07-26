// app/app.ts
import express = require('express');
import fs from 'fs';

// Create a new express application instance
const app: express.Application = express();
const hostname = 'localhost';
const port = 3000;

app.get('/', function (req, res) {
  fs.readFile('html/home.html', function (err, fileContents) {
    if (err) {
        return console.error(err);
    }
    //res.setHeader('Content-Type', 'application/json');
    //res.send(JSON.stringify({ a: 1 }));
    res.send(fileContents.toString());
  });
});

app.get('/book/:bookId/chapter/:chapterId/verses/:fromV-:toV', function (req, res) {
  // http://localhost:3000/book/01/chapter/02/verses/1-2
  // {"bookId":"01","chapterId":"02","fromV":"1","toV":"2"}
  /*
  res.send(req.params)
  res.send(req.params.bookId)
  res.send(req.params.chapterId)
  res.send(req.params.fromV)
  res.send(req.params.toV)
  */

  fs.readFile('txt/pg80'+req.params.bookId+'.txt', function (err, fileContents) {
    if (err) {
        return console.error(err);
    }
    res.send(fileContents.toString());
  });

})

app.listen(port, hostname, function () {
  console.log(`kjv-bible-server running at http://${hostname}:${port}/`);
});