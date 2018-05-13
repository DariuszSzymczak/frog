var express = require('express');
var router = express.Router();
var PageScheme = require('../lib/PageScheme');
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies from requests
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies from requests

//add reference to directory and next resolve all names of directory to send static files
app.use(express.static(path.resolve(__dirname, 'public'))); 
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));

router.post('/pages/main', function (req, res) {
  
    PageScheme.findOne({'main' : true},function (err, pages) {
    if (err) {
      return handleError(err);
      res.status(500).send();
    }
    if(!pages) res.status(404).send();
    res.status(200).json(pages);
    });
  });

  module.exports = router;