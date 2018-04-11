var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;

MongoClient.connect('mongodb://127.0.0.1:27017/test', function (err, db) {
    if (err) {
      console.log(" failed connected to the database");
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/send', function (req, res) {
  var syn ={
    "dupa" : "24",
    "chujn" : "Missoula, MT",
    "gender" : "male"
  }
   
   res.send(req.body);

});
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/img',express.static(__dirname + '/img'));
app.get('/', function(req, res) {
  res.sendFile('generator.html', { root: __dirname });
});

app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0' );