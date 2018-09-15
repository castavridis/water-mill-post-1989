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
  fetchHoroscope: function () {},
  getZodiac: function () {},
  setDichotomy: function(dichotomy, value) {},
  ieQuestion: function () {
    var result = '';
    this.setDichotomy('', result);
  },
  nsQuestion: function () {
    var result = '';
    this.setDichotomy('', result);
  },
  ftQuestion: function () {
    var result = '';
    this.setDichotomy('', result);
  },
  jpQuestion: function () {
    var result = '';
    this.setDichotomy('', result);
  }
};