var mongoose = require('mongoose');
mongoose.connect('mongodb://mo7636_frog:Lewatywa1!@127.0.0.1:27017/mo7636_frog', function (err) {
  if (err) throw err;
  console.log('Successfully connected');
});
var userSchema = mongoose.Schema({
    name: String,
    content: String,
    main: Boolean
});
var PageScheme = mongoose.model('pages', userSchema);

module.exports = PageScheme;