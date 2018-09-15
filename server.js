// Following: https://www.twilio.com/blog/2017/04/playing-a-twitter-adventure-game-using-sms-and-twilio-on-glitch.html

// Dependencies
var btoa = require('btoa');
var express = require('express');
var request = require('request');
var rp = require('request-promise');
var bodyParser = require('body-parser');
var moment = require('moment-timezone');
var path = require('path');

// Back-end
var Parse = require('parse/node');
var ParseServer = require('parse-server').ParseServer;

// Modules
var Utils = require('./app/utils');
var User = require('./app/user');
var Greetings = require('./app/greetings');
var Personality = require('./app/personality');
var Stories = require('./app/stories');
var Weather = require('./app/weather');

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

app.get('/weather', function() {
  Weather.fetchWeather();
});

function messageBuilder (req, res) {
	var userPromise = User.find(req);
  var message = req.body.Body;
	userPromise.then(
		function(result){
			var user = result.user;
			var isNew = result.status == 'NEW';
		  	var responseBody = '';
		  	var keyword = Utils.getKeyword(message);
		  	if (isNew) {
		  		responseBody += Greetings.disclaimer(user);
		  		Personality.setZodiac('INFJ', user);
		  	}
		  	switch(keyword) {
		  		case 'hello':
		  			responseBody += Greetings.hello(user);
		  		case 'ahoy':
		  			responseBody += Greetings.ahoy(user);
		  		case 'ciao':
		  			responseBody += Greetings.ciao(user);
		  		case 'creep':
		  			responseBody += Stories.creep(user);
		  		case 'swim':
		  			responseBody += Stories.swim(user);
		  		case 'shed':
		  			responseBody += Stories.shed(user);
		  		case 'sleep':
		  			responseBody += Stories.sleep(user);
		  		case 'hide':
		  			responseBody += Stories.hide(user);
		  		default:
		  			responseBody += Greetings.help(user);
		  	}
		  	res.send('<Response>' + responseBody + '</Response>');
		},
		function(err) {
			'Message Builder: Could not find or create user. ', err
		}
	);
}

app.post('/handshake', function(req, res) {
  var MessageLog = Parse.Object.extend("Message");
  var messageLog = new MessageLog();
  messageLog.set('phone', req.body.From);
  messageLog.set('message', req.body.Body);
  messageLog.save();
  
  var userPromise = User.find(req);
  userPromise.then(
    function(result) {
      var message = req.body.Body;

      // If not user, make user
      if (result.status == 'NEW') {
        // Check for keywords
        
        // Send disclaimer
        Greetings.disclaimer(req, res);
        
        // Send salutation
        var keyword = Utils.getKeyword(message);
        switch(keyword) {
          case 'test':
            res.send('<Response><Message>One</Message><Message>Two</Message><Say>Three</Say></Response>');
          case 'hello':
            Greetings.hello(req, res);
          case 'ahoy':
            Greetings.ahoy(req, res);
          case 'ciao':
            Greetings.ciao(req, res);
          case 'creep':
            Stories.creep(req, res);
          case 'swim':
            Stories.swim(req, res);
          case 'shed':
            Stories.shed(req, res);
          case 'sleep':
            Stories.sleep(req, res);
          case 'hide':
            Stories.hide(req, res);
          default:
            Greetings.help(req, res);
        }
        
        // Send personality sequence
        Personality.setZodiac('INFJ', result.user);
        
        // Send weather sequence
        
        
      }
      // If user, determine place in timeline
      else {
        var keyword = Utils.getKeyword(message);
        // Check for keywords
        // Update check-ins in timeline
        // Follow story sequences
        switch(keyword) {
          case 'test':
            res.send('<Response><Message>One</Message><Pause length="20"></Pause><Message>Two</Message><Say>Three</Say></Response>');
          case 'hello':
            Greetings.hello(req, res);
          case 'ahoy':
            Greetings.ahoy(req, res);
          case 'ciao':
            Greetings.ciao(req, res);
          case 'creep':
            Stories.creep(req, res);
          case 'swim':
            Stories.swim(req, res);
          case 'shed':
            Stories.shed(req, res);
          case 'sleep':
            Stories.sleep(req, res);
          case 'hide':
            Stories.hide(req, res);
          case 'bye':
            // If end of timeline
              // Send valediction
              // Send colophon    
            Greetings.bye(req, res);
          default:
            Greetings.help(req, res);
        }
      }
      return;
    },
    function(result) {
      return;
    }
  );
});