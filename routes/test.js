var express = require('express');
var router = express.Router();

// Home page route.
router.post('http://frog.ct8.pl/test/', function (req, res) {
  res.send('Wiki home page');
})
module.exports = router;