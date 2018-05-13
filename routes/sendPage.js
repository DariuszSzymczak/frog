var express = require('express');
var router = express.Router();
var PageScheme = require('../lib/PageScheme');

router.post('/send', function (req, res) {
  
    let data_to_save = new PageScheme({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      content: req.body.content,
      main: req.body.main
    });
  
    data_to_save.save(function (err) {
      if (err) throw err;
    });
  
    PageScheme.find({},'name',function (err, pages) {
    if (err) return handleError(err);
    res.json(pages);
    });
  });

  module.exports = router;