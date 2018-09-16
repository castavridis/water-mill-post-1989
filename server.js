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
          break;
        case 'ahoy':
          responseBody += Greetings.ahoy(user);
          break;
        case 'ciao':
          responseBody += Greetings.ciao(user);
          break;
        case 'bye':
          responseBody += Greetings.bye(user);
          break;
        case 'creep':
          responseBody += Stories.creep(user);
          break;
        case 'swim':
          responseBody += Stories.swim(user);
          break;
        case 'shed':
          responseBody += Stories.shed(user);
          break;
        case 'sleep':
          responseBody += Stories.sleep(user);
          break;
        case 'hide':
          responseBody += Stories.hide(user);
          break;
        default:
          responseBody += Greetings.help(user);
          break;
      }
      res.send('<Response>' + responseBody + '</Response>');
      res.end();
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
  
  messageBuilder(req, res);
});