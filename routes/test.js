var express = require('express');
var router = express.Router();

// Home page route.
router.post('/', function (req, res) {
  res.send('Wiki home page');
});
module.exports = router;