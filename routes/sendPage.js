var express = require('express');
var router = express.Router();
var PageScheme = require('../lib/PageScheme');
var app = express(); //use express.js as an framework in application
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//switch on all features to work with the requests
app.use(bodyParser.json()); // support json encoded bodies from requests
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies from requests

   // let data_to_save = new PageScheme({
    //   _id: new mongoose.Types.ObjectId(),
    //   name: req.body.name,
    //   content: req.body.content,
    //   main: req.body.main
    // });


    // data_to_save.save(function (err) {
    //   if (err) throw err;
    // });
    
    // PageScheme.find({},'name',function (err, pages) {
    // if (err) return handleError(err);
    // res.json(pages);
    // });


router.post('/', function (req, res) {
  
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