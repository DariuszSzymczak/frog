var express = require('express');
var router = express.Router();
var PageScheme = require('../lib/PageScheme');

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