// Following: https://www.twilio.com/blog/2017/04/playing-a-twitter-adventure-game-using-sms-and-twilio-on-glitch.html

// Dependencies
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var firebase = require('firebase');

// Modules
var salutations = require('./salutations');

var app = express();

// process.env access environment variables?
var listener = app.listen(process.env.PORT, function() {
  console.log(process.env.HELLO + ' Your app is listening on port ' + listener.address().port);
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/views/index.html');
});

app.post('/hello', function(req, res) {
  console.log(req.body);
  res.send('<Response><Message>' + salutations.hello() + '</Message></Response>');
});

app.post('/ahoy', function(req, res) {});
app.post('/creep', function(req, res) {});
app.post('/swim', function(req, res) {});
app.post('/shed', function(req, res) {});
app.post('/sleep', function(req, res) {});
app.post('/hide', function(req, res) {});
app.post('/goodbye', function(req, res) {});