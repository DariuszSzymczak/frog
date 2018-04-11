var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/img',express.static(__dirname + '/img'));

mongoose.connect('mongodb://mo7636_frog:Lewatywa1!@127.0.0.1:27017/mo7636_frog', function (err) {
 
  if (err) throw err;

  console.log('Successfully connected');

});
var userSchema = mongoose.Schema({name: String});
var Modeldo = mongoose.model('tests',userSchema);
// var judasz = new Modeldo({_id: new mongoose.Types.ObjectId(),name:'JUDASssZ'});
// judasz.save(function(err) {if (err) throw err;   
//   console.log('Author successfully saved.');   
//   });
app.post('/send', function(req, res) {
  res.sendFile('generator.html', { root: __dirname });
  Modeldo.find().exec(function(err, names) {
   if (err) throw err;   
   res.send(names);
 });
 });  

app.get('/', function(req, res) {
 res.sendFile('generator.html', { root: __dirname });
});

app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0' );