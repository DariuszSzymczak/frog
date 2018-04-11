var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;



var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/send', function (req, res) {
  var respond = "";
  MongoClient.connect('mo7636_frog:Lewatywa1!@mongodb://136.243.156.104:27017/mo7636_frog', function (err, db) {
    if (err) {
      respond = " failed connected to the database";
    } else {
       respond = "successfully connected to the database";
    }
    db.close();
});
   res.send(respond);

});
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/img',express.static(__dirname + '/img'));
app.get('/', function(req, res) {
  res.sendFile('generator.html', { root: __dirname });
});

app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0' );