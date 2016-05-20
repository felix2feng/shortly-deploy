var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We\'re connected!');
});

db.UrlSchema = mongoose.Schema({
  url: String, 
  baseUrl: String, 
  code: String, 
  title: String, 
  visits: Number
});
db.UserSchema = mongoose.Schema({
  username: String, 
  password: String
});


module.exports = db;
