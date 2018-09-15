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
var Personality = require('./app/personality');
var Stories = require('./app/stories');

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
  var userPromise = User.find(req);
  userPromise.then(
    function(result) {
      var message = req.body.Body;

      // If not user, make user
      if (result.status == 'NEW') {
        // Check for keywords
        
        Greetings.disclaimer(req, res);
        
        var keyword = Utils.getKeyword(message);
        if(keyword != false) {
          switch(keyword) {
            case 'hello':
              Greetings.hello(req, res);
            case 'ahoy':
              Greetings.ahoy(req, res);
            case 'ciao':
              Greetings.ciao(req, res);
            default:
              Greetings.help(req, res);
          }
        } else {
          Greetings.help(req, res);
        }
        // Send salutation
        // Send disclaimer
        // Send personality sequence
        // Send weather sequence
      }
      // If user, determine place in timeline
      else {
        var keyword = Utils.getKeyword(message);
        if(keyword != false) {
          switch(keyword) {
            case 'hello':
              Greetings.hello(req, res);
            case 'ahoy':
              Greetings.ahoy(req, res);
            case 'ciao':
              Greetings.ciao(req, res);
            default:
              Greetings.help(req, res);
          }
        } else {
          Greetings.help(req, res);
        }
        // Check for keywords
        // Update check-ins in timeline
        // Follow story sequences
        // If end of timeline
          // Send valediction
          // Send colophon    
      }
      return;
    },
    function(result) {
      return;
    }
  );
});

// Test Endpoints
// Use ?phone=+19287133945
app.get('/help', function(req, res) {    
  var userPromise = User.find(false);
  userPromise.then(function(results){
    Personality.setZodiac('INFJ', results.user);
    Greetings.help(req, res);
  },
  function(error){
    console.log('/help: Could not get/create user.');
  });
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