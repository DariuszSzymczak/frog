var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const f = require('util').format;
const assert = require('assert');

const user = encodeURIComponent('mo7636_frog');
const password = encodeURIComponent('Lewatywa1!');
const authMechanism = 'DEFAULT';

// Connection URL
const url = f('mongodb://%s:%s@136.243.156.104:27017/?authMechanism=%s&authSource=mo7636_frog',
  user, password, authMechanism);

var dbConn = MongoClient.connect(url);

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
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons
        db.collection('test').insert(syn);
        res.send('poszlo w chuj xd');
    });    
   //  res.send(JSON.stringify(req.body));

});
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/img',express.static(__dirname + '/img'));
app.get('/', function(req, res) {
  res.sendFile('generator.html', { root: __dirname });
});

app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0' );