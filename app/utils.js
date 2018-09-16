var moment = require('moment-timezone');

// TODO: Add emoji support.

var DEFAULT_ASSOCIATES_LENGTH = 5;
var DEFAULT_ASSOCIATES = ['The Gadget Gurls','Adare','Anna','Charlie','Chloe','Christine','Claire','Clement','Clio','Devra','Edo','Elana','Elizabeth','Emma','Emmy','Free','Geige','Hailey','Hamzat','Jack','Jim','Jordan','Katie','Lydia','Mariana','Marina','Megan','MJ','Moriah','Neena','Neil','Nicole','Rachel','Rebecca','Sarah','Sean','Shane','Shannon','So','Stephanie','Tom','Tyler','Xinyi','Zoe'];  

module.exports = {
  CIAO_KEYWORDS: ['👋','👋🏻','👋🏼','👋🏽','👋🏾','👋🏿'],
  HELLO_KEYWORDS: ['hi', 'hey', 'heya', 'heyyy', 'ayo', 'hello', 'hay', 'sup', 'hallo'],
  SPECIFIC_KEYWORDS: ['ahoy', 'creep', 'swim', 'shed', 'sleep', 'hide'],
  BYE_KEYWORDS: ['bye', 'goodbye', 'bai', 'byebye', 'bye bye', 'byeee'],
  flipCoin: function () {
    return (Math.random() >= 0.5);
  },
  getAssociates: function (data) {
    var associates = DEFAULT_ASSOCIATES.slice();
    var _associates = [];
    var associateLength = DEFAULT_ASSOCIATES_LENGTH;
    try {
      var addOns = JSON.parse(data.AddOns);
      if (addOns) {
        var whitePages = addOns.results.whitepages_pro_caller_id.result;
        if (whitePages) {
          var associatedPeople = whitePages.associated_people;
          for(var i = 0; i < associatedPeople.length && i < DEFAULT_ASSOCIATES_LENGTH; i++) {
            _associates.push(associatedPeople[i].firstname);
          }
          associateLength -= _associates.length;
        }
        else {throw 'No White Pages.';}
      }
      else {throw 'No AddOn.';}
      
    }
    catch(err) {
      // do nothing.
    }
    for (var i = 0; i < associateLength; i++) {
      var associate = Math.floor(Math.random() * associates.length);
      _associates.push(associates[associate]);
      // NOTE: Probably should remove already used associate. Causes a race condition in loop.
    }
    return _associates;
  },
  getKeyword: function (text) {
    var _text = text.trim().replace(/[\W\d_]+/g, "").toLowerCase();
    if (_text == 'test') {
      return 'test';
    } else if (this.SPECIFIC_KEYWORDS.indexOf(_text) > -1) {
      return _text;
    } else if (this.HELLO_KEYWORDS.indexOf(_text) > -1) {
      return 'hello';
    } else if (this.BYE_KEYWORDS.indexOf(_text) >  -1) {
      return 'bye';
    } else if (this.CIAO_KEYWORDS.indexOf(text.trim()) > -1) {
      return 'ciao';
    }
    return false;
  },
  // Greeting based on part of day in Water Mill.
  getGreeting: function () {
    var hour = moment.tz(new Date(), "America/New_York").hour();
    var greeting = '';
    if (hour >= 0 && hour < 5) {
      greeting = 'It\'s so late here.';
    } else if (hour >= 5 && hour < 12) {
      greeting = 'Good morning.';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'Good afternoon.';
    } else if (hour >= 18 && hour <= 20) {
      greeting = 'Good evening.';
    } else if (hour >= 20 && hour <= 23) {
      greeting = 'Hm, it\'s late here.';
    }
    return greeting;
  },
  getSpecificPartOfDay: function () {
    var hour = moment.tz(new Date(), "America/New_York").hour();
    var greeting = '';
    if (hour >= 0 && hour < 5) {
      greeting = 'tonight';
    } else if (hour >= 5 && hour < 12) {
      greeting = 'this morning';
    } else if (hour >= 12 && hour < 18) {
      greeting = 'this afternoon';
    } else if (hour >= 18 && hour <= 20) {
      greeting = 'this evening';
    } else if (hour >= 20 && hour <= 23) {
      greeting = 'tonight';
    }
    return greeting;
  },
  getTime: function () {
    var timeShift = Math.ceil(Math.random() * 15);
    timeShift = (this.flipCoin()) ? -timeShift : timeShift;
    return moment.tz(new Date(), "America/New_York").add(timeShift, 'minutes').format('LT');
  },
  sendMessage: function (res, message) {
    res.send('<Response><Message>' + message + '</Message></Response>');
    res.end();
    return res;
  },
  formatMessage: function(message) {
    return '<Message>' + message + '</Message>';
  },
  formatMessages: function(messages) {
    var _messages = "";
    for (var i = 0; i < messages.length; i++) {
      _messages += '<Message>' + messages[i] + '</Message>';
    }
    return _messages;
  }
};