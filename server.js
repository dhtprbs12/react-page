/*
  Author: Sekyun Oh
  This is a backend script.
*/

var multer = require('multer');
var path = require('path');
const express = require('express');
const app = express();
var mysql = require('mysql');
const moment = require('moment');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'client/build')))
// middleware setup
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
  Connect mysql using its module
*/
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Dhtp123rbs.',
  database : 'react'
});

conn.connect();

/*
  Set path direction to store an image
*/
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, req.headers.url+'.jpg');
  }
})

var upload = multer({ storage: storage })

/*
  This get called when default URL get entered.
*/
app.get('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.send('API is working properly');
});

/*
  This gets called when body.js is being loaded in frontend.
  Basically, this gets all elements that have been uploaded.
*/
app.get('/get-elements', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  let query = 'select e.*,count(c.id) AS count from elements e LEFT JOIN comments c on e.id = c.element_id GROUP BY e.id ORDER BY e.id DESC';
  conn.query(query, function(error,result){
      if(error) {throw error;}
      let object = {'result':result};
      res.send(object);
  });
});

/*
  This gets called when body.js is being loaded and needed to attach an image.
  This send the image back to front.
*/
app.get('/get-images', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  var filename = req.query.name
  fs.readFile('public/images/'+filename+'.jpg', function(err, data) {
    if (err) throw err; // Fail if the file can't be read.
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    res.end(data); // Send the file data to the browser.
  });
});

/*
  This gets called when user click an element.
  The comments that are related to the element.
*/
app.get('/get-comments', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  var id = req.query.element_id
  let query = 'select * from comments where element_id = ?';
  conn.query(query, [id], function(error,result){
      if(error) throw error;
      let object = {'result':result};
      res.send(object);
  });
});

/*
  This gets called when user uploads an element.
  This is responsible for uploading the image.
*/
app.post('/image-upload', upload.single('photo'), function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  res.status(200).end()
});

/*
  This gets called when user uploads an element.
  This is responsible for uploading title and description.
*/
app.post('/info-upload', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  const time = moment().format('YYYY-MM-DD kk:mm:ss');
  conn.query('insert into elements (image, title, description, created) values (?,?,?,?)',[req.body.imageUrl, req.body.title, req.body.description, time], function (err, result, fields) {
    if (err) {throw err};
  });
  res.status(200).end()
});

/*
  This gets called when user is about to upload a comment on an element.
*/
app.post('/comment-upload', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");

  const info = req.body;
  const time = moment().format('YYYY-MM-DD kk:mm:ss');
  conn.query('insert into comments (element_id, nickname, comment, created) values (?,?,?,?)',[info.element_id, info.nickname, info.comment, time], function (err, result, fields) {
    if (err) {throw err};
    res.status(200);
    res.send(result);
  });
});

/*
  This gets called when user try to login.
  This needs to more implementation including sql.
*/
app.post('/validation', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  const body = req.body;

});

// Listening
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server Running on port ${port}`));
