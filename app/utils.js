var moment = require('moment-timezone');

// TODO: Add emoji support.

module.exports = {
  CIAO_KEYWORDS: ['👋','👋🏻','👋🏼','👋🏽','👋🏾','👋🏿'],
  HELLO_KEYWORDS: ['hi', 'hey', 'heya', 'heyyy', 'ayo', 'hello', 'hay', 'sup', 'hallo'],
  SPECIFIC_KEYWORDS: ['ahoy', 'creep', 'swim', 'shed', 'sleep', 'hide'],
  BYE_KEYWORDS: ['bye', 'goodbye', 'bai', 'byebye', 'bye bye', 'byeee'],
  DEFAULT_ASSOCIATES: ['The Gadget Gurls', 'Adare','Anna','Charlie','Chloe','Christine','Claire','Clement','Clio','Devra','Edo','Elana','Elizabeth','Emma','Emmy','Free','Geige','Hailey','Hamzat','Jack','Jim','Jordan','Katie','Lydia','Mariana','Marina','Megan','MJ','Moriah','Neena','neil','Nicole','Rachel','Rebecca','Sarah','Sean','Shane','Shannon','So','Stephanie','Tom','Tyler','Xinyi','Zoe'],
  getKeyword: function (text) {
    var _text = text.trim().replace(/[\W\d_]+/g, "").toLowerCase();
    if (this.SPECIFIC_KEYWORDS.indexOf(_text) > -1) {
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
  getTime: function () {
    var timeShift = Math.ceil(Math.random() * 15);
    timeShift = (Math.random() >= 0.5) ? -timeShift : timeShift;
    return moment.tz(new Date(), "America/New_York").add(timeShift, 'minutes').format('LT');
  },
  sendMessage: function (res, message) {
    res.send('<Response><Message>' + message + '</Message></Response>');
  }
};