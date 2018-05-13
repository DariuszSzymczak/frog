// include all modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PageScheme = require('./lib/PageScheme');

var app = express(); //use express.js as an framework in application

//switch on all features to work with the requests
app.use(bodyParser.json()); // support json encoded bodies from requests
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies from requests

//add reference to directory and next resolve all names of directory to send static files
app.use(express.static(path.resolve(__dirname, 'public'))); 
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));

var sendPages = require('./routes/sendPage');
app.use('/send',sendPages);



app.post('/pages', function (req, res) {
  
  PageScheme.find({},function (err, pages) {
  if (err) return handleError(err);
  res.json(pages);
  });
});

app.post('/pages/main', function (req, res) {
  
  PageScheme.findOne({'main' : true},function (err, pages) {
  if (err) {
    return handleError(err);
    res.status(500).send();
  }
  if(!pages) res.status(404).send();
  res.status(200).json(pages);
  });
});

app.get('/', function (req, res) {
  res.sendFile('generator.html', {
    root: __dirname
  });
});

app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0');