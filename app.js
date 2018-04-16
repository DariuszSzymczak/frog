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
var userSchema = mongoose.Schema({name: String,content: String});
var Modeldo = mongoose.model('pages',userSchema);
// var judasz = new Modeldo({_id: new mongoose.Types.ObjectId(),name:'JUDASssZ'});
// judasz.save(function(err) {if (err) throw err;   
//   console.log('Author successfully saved.');   
//   });
app.post('/send', function(req, res) {
    let data_to_save = new Modeldo({_id: new mongoose.Types.ObjectId(),name:req.body.name,content:req.body.content});
    data_to_save.save(function(err) {if (err) throw err;   
      res.send(Modeldo.find());   
    });
        

 });  

app.get('/', function(req, res) {
 res.sendFile('generator.html', { root: __dirname });
});

app.listen(process.env.PORT || 9000, process.env.IP || '0.0.0.0' );