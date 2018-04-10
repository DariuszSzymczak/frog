var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

// var dbConn = mongodb.MongoClient.connect('mongodb://136.243.156.104:27017');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/send', function (req, res) {
//     dbConn.then(function(db) {
//         delete req.body._id; // for safety reasons
//         db.collection('test').insertOne(req.body);
//     });    
    res.send('Data received' );
    //+ JSON.stringify(req.body)
});
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/img',express.static(__dirname + '/img'));
app.get('/', function(req, res) {
  res.sendFile('generator.html', { root: __dirname });
});

app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0' );