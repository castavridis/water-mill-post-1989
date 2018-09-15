var Utils = require('./utils');

module.exports = {
  disclaimer: function (req, res) {
    var message = 'Welcome to Water Mill (post-1989), a texting experience. Reply STOP to end messages.';
    Utils.sendMessage(res, message);
  },
  help: function (req, res) {
    var message = Utils.getGreeting() + ' Follow the prompt you were given or saw to get started. Stories will start around 5pm EST.';
    Utils.sendMessage(res, message);
  },
  hello: function (req, res) {
    var message = 'Hey!' + ' Right now, it is' + Utils.getTime() + ' at the Dollhouse...or is it ' + Utils.getTime() + '?\n\nAnyway, welcome. The trip on the shuttle will be about two hours. The stories will start around 5pm EST.';
    Utils.sendMessage(res, message);
  },
  ahoy: function(req, res) {
    var message = 'If you are at, or on your way to The Dollhouse, follow the prompts there. Otherwise, welcome! The stories will start around 5pm EST.';
    Utils.sendMessage(res, message);
  },
  ciao: function(req, res) {
    var message = '👋! Are you saying HELLO, AHOY, or BYE? 🤔';
    Utils.sendMessage(res, message);
  }
};