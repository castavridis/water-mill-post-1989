var Utils = require('./utils');

module.exports = {
  disclaimer: function (req, res) {
    var message = 'Welcome to Water Mill (post-1989), a texting experience. Reply STOP to end messages. This is a work in progress. Thanks for your patience 🙏! Enjoy the show.';
    return Utils.sendMessage(res, message);
  },
  help: function (req, res) {
    var message = 'Hey! Text in one of the prompts you saw or were given to get started.';
    return Utils.sendMessage(res, message);
  },
  hello: function (req, res) {
    var message = Utils.getGreeting() + ' Right now, it is ' + Utils.getTime() + ' at the Dollhouse...or is it ' + Utils.getTime() + '?\n\nAnyway, welcome. The trip on the shuttle will be about two hours.';
    return Utils.sendMessage(res, message);
  },
  ahoy: function(req, res) {
    var message = 'If you are at, or on your way to the Dollhouse, follow the prompts there. Otherwise, welcome! Your keywords are CREEP, SWIM, SHED, SLEEP, or HIDE.';
    return Utils.sendMessage(res, message);
  },
  ciao: function(req, res) {
    var message = '👋! Are you saying HELLO, AHOY, or BYE? 🤔';
    return Utils.sendMessage(res, message);
  },
  bye: function(req, res) {
    var message = 'Goodbye.';
    return Utils.sendMessage(res, message);
  }
};