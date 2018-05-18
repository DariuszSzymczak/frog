var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.sendFile('MainSite.html', {
      root: __dirname
    });
  });

  router.get('/admin', function (req, res) {
    res.sendFile('generator.html', {
      root: __dirname
    });
  });
  module.exports = router;