// Following: https://www.twilio.com/blog/2017/04/playing-a-twitter-adventure-game-using-sms-and-twilio-on-glitch.html

// Dependencies
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var path = require('path');

// Back-end
var Parse = require('parse/node');
var ParseServer = require('parse-server').ParseServer;

// Modules
// TODO: Move to app.js
var Utils = require('./app/utils');
var User = require('./app/user');
var Greetings = require('./app/greetings');

// Start app
var app = express();

// Set up Parse Server
var databaseUri = process.env.DATABASE_URI;
if (!databaseUri) {
  console.error('DATABASE_URI not specified');
}
var api = new ParseServer({
  databaseURI: databaseUri,
  cloud: __dirname + '/cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL
});
// Serve Parse API
app.use('/parse', api);
app.use('/parse/1', api);

Parse.initialize(process.env.APP_ID);
Parse.serverURL = process.env.SERVER_URL;

var listener = app.listen(process.env.PORT, function() {
  console.log(process.env.HELLO + ' Your app is listening on port ' + listener.address().port);
});

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/views/index.html');
});

app.post('/handshake', function(req, res) {
  console.log(req);
  var user = User.find(req);
  var message = req.body.Body;
  // If not user, make user
  if (!user) {
    // Check for keywords
    if(Utils.getKeyword(message) != false) {
    }
    // Send salutation
    // Send disclaimer
    // Send personality sequence
    // Send weather sequence
  }
  // If user, determine place in timeline
  else {
    // Check for keywords
    // Update check-ins in timeline
    // Follow story sequences
    // If end of timeline
      // Send valediction
      // Send colophon    
  }
});

// Test Endpoints
// Use ?phone=+19287133945
app.get('/help', function(req, res) {
  console.log(req.query);
  Greetings.help(req, res);
});

app.get('/hello', function(req, res) {
  Greetings.hello(req, res);
});

app.get('/ahoy', function(req, res) {
  Greetings.ahoy(req, res);
});

app.post('/creep', function(req, res) {
});

app.post('/swim', function(req, res) {});

app.post('/shed', function(req, res) {});

app.post('/sleep', function(req, res) {});

app.post('/hide', function(req, res) {});

app.post('/goodbye', function(req, res) {});