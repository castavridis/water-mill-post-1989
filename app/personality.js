var request = require('request');
var rp = require('request-promise');
var btoa = require('btoa');
var moment = require('moment-timezone');

var User = require('./user');
var Utils = require('./utils');

var MBTI_ZODIAC = {
  INFP: 'Aquarius',
  ISFP: 'Pisces',
  ESTJ: 'Aries',
  ENTJ: 'Aries',
  ISFJ: 'Taurus',
  ISTP: 'Taurus',
  ESFP: 'Gemini',
  INFJ: 'Cancer',
  ENFJ: 'Leo',
  INTJ: 'Virgo',
  ISTP: 'Virgo',
  ESFJ: 'Libra',
  ESTP: 'Libra',
  ENFP: 'Scorpio',
  ENTP: 'Sagittarius',
  ISTJ: 'Capricorn',
  INTP: 'Capricorn'
};
var MBTI_DICHOTOMIES = ['IE', 'NS', 'FT', 'JP'];

// Tone analyzer: anger, fear, joy, sadness, analytical, confident, tentative

module.exports = {
  fetchHoroscope: function (zodiac, user) {
    var date = moment.tz(new Date(), 'America/New_York');
    var options = {
      date: date.day(),
      month: date.month(),
      year: date.year(),
      hour: date.hour(),
      minute: date.minute(),
      latitude: 40.8972787,
      longitude: -72.3603127,
      timezone: 4
    };
    var horoscope = rp.post({
      url: process.env.ASTRO_URL + zodiac,
      headers: {
        'authorization': process.env.ASTRO_SUBSCRIPTION + ' ' + btoa(process.env.ASTRO_ID + ':' + process.env.ASTRO_KEY),
        'Content-Type': 'application/json'
      },
      data: options
    }).then(function(results){
      var data = JSON.parse(results);
      if (data.status) {
        User.setHoroscope(data.prediction, user);
      } else {
        console.log('AstrologyAPI: ', data.msg);
      }
    }, function(error){
      console.log('AstrologyAPI: ', error);
    });
    return horoscope;
  },
  setZodiac: function (mbti, user) {
    var zodiac = MBTI_ZODIAC[mbti.toUpperCase()];
    User.setZodiac(zodiac, user);
    this.fetchHoroscope(zodiac, user);
  },
  ieQuestion: function (req) {
    var message = 'There will be about 50 people there, are you excited about the show?';
    var result = Utils.flipCoin() ? 'I' : 'E';
    User.setDichotomy(req, 'IE', result, 'IE Test');
  },
  nsQuestion: function (req) {
    var result = Utils.flipCoin() ? 'N' : 'S';
    var message = 'Hm. How is the weather where you are?';
    User.setDichotomy(req, 'NS', result, 'NS Test');
  },
  ftQuestion: function (req) {
    var result = Utils.flipCoin() ? 'F' : 'T';
    var message = 'Does it make you feel anything?';
    User.setDichotomy(req, 'FT', result, 'FT Test');
  },
  jpQuestion: function (req) {
    var result = Utils.flipCoin() ? 'J' : 'P';
    var message = 'Why?';
    User.setDichotomy(req, 'JP', result, 'JP Test');
  }
};