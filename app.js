var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PageScheme = require('./lib/PageScheme');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/img', express.static(__dirname + '/img'));

app.post('/send', function (req, res) {
  
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