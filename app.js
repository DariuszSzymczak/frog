var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.resolve(__dirname, 'public')));

app.post('/send', function (req, res) {  
   res.send('ff');
});
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/img',express.static(__dirname + '/img'));

mongoose.connect('mongodb://localhost/mo7636_frog');
mongoose.model('test',{name: String});

app.get('/', function(req, res) {
 // res.sendFile('generator.html', { root: __dirname });
 mongoose.model('test').find(function(err,names)
 {
    res.send(names);
 });
});

app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0' );