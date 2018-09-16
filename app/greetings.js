var Utils = require('./utils');
var Weather = require('./weather');

module.exports = {
  disclaimer: function (user) {
    var messages = ['Welcome to Water Mill (post-1989), a texting experience. Standard message and data rates apply. Reply STOP to end messages.', 'This is a work in progress. Thanks for your patience 🙏! Enjoy the show.'];
    return Utils.formatMessages(messages);
  },
  help: function (user) {
    var messages = ['Hey! Text in one of the prompts you saw or were given to get started.'];
    return Utils.formatMessages(messages);
  },
  hello: function (user) {
    var messages = [Utils.getGreeting() + ' Right now, it is ' + Utils.getTime() + ' at the Dollhouse...or is it ' + Utils.getTime() + '?\n\nAnyway, welcome. If you are on the shuttle, the trip will take about two hours. After you arrive there will be prompts to follow on location.'];
    return Utils.formatMessages(messages);
  },
  ahoy: function(user) {
    var messages = ['If you are at, or on your way to the Dollhouse, follow the prompts there. Otherwise,you can use the keywords CREEP, SWIM, SHED, SLEEP, or HIDE.'];
    return Utils.formatMessages(messages);
  },
  ciao: function(user) {
    var messages = ['👋! Are you saying HELLO, AHOY, or BYE? 🤔'];
    return Utils.formatMessages(messages);
  },
  bye: function(user) {
    var messages = [];
    var horoscope = user.get('horoscope');
    if (horoscope != undefined) {
      messages.push('🔮: ' + horoscope.luck);
    }
    var firstName = user.get('firstname');
    var goodbye = 'Goodbye.';
    if (firstName != undefined) {
      messages.push('Goodbye, ' + firstName + ', and good luck.');
    }
    return Utils.formatMessages(messages);
  }
};