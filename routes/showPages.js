var express = require('express');
var router = express.Router();
var PageScheme = require('../lib/PageScheme');

router.post('/', function (req, res) {
  
    PageScheme.find({},function (err, pages) {
    if (err) return handleError(err);
    res.json(pages);
    });
  });

  module.exports = router;