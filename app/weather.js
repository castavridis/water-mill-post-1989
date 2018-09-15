var request = require('request');

module.exports = {
  getWeather: function (ZIP) {
    var owmURL = process.env.OWM_URL + '?zip=11976,us&appid=' + process.env.OWM_ID;
    if (ZIP) {
      var owmURL = process.env.OWM_URL + ZIP + '&appid=' + process.env.OWM_ID;
    }
    request.post(owmURL, function (req, res) {
      // console.log(req, res);
    });
  }
};