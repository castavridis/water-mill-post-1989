// salutation.js

module.exports = {
  hello: function (req, res) {
    console.log('hello!!');
    res.send('<Response><Message>Hello!!</Message></Response>');
  },
  ahoy: function(req, res) {
    console.log('ahoy!!');
    return 'Ahoy!!';
  }
};