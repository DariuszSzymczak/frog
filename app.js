// include all modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//libraries
var PageScheme = require('./lib/PageScheme');

//include routes
var sendPage = require('./routes/sendPage');
var serveMain = require('./routes/serveMain');
var showPages = require('./routes/showPages');
// var getIndex = require('./routes/getIndex');

var app = express(); //use express.js as an framework in application

//switch on all features to work with the requests
app.use(bodyParser.json()); // support json encoded bodies from requests
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies from requests

//add reference to directory and next resolve all names of directory to send static files
app.use(express.static(path.resolve(__dirname, 'public'))); 
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));

//use included routes
app.use('/send',sendPage);
app.use('/pages/main',serveMain);
app.use('/pages',showPages);

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
}); 

app.get('/', function (req, res) {
  res.sendFile('main.html', {
    root: __dirname
  });
});

app.get('/admin', function (req, res) {
  res.sendFile('generator.html', {
    root: __dirname
  });
});
app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0');