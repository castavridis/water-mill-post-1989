var request = require('request');
var rp = require('request-promise');

/*
  {  
     "coord":{  
        "lon":-72.35,
        "lat":40.93
     },
     "weather":[  
        {  
           "id":800,
           "main":"Clear",
           "description":"clear sky",
           "icon":"01d"
        }
     ],
     "base":"stations",
     "main":{  
        "temp":296.84,
        "pressure":1022,
        "humidity":65,
        "temp_min":295.95,
        "temp_max":298.15
     },
     "visibility":16093,
     "wind":{  
        "speed":3.6,
        "deg":120
     },
     "clouds":{  
        "all":1
     },
     "dt":1537037760,
     "sys":{  
        "type":1,
        "id":2097,
        "message":0.0042,
        "country":"US",
        "sunrise":1537007445,
        "sunset":1537052227
     },
     "id":420027859,
     "name":"New Haven",
     "cod":200
  }
*/

module.exports = {
  fetchWeather: function (ZIP) {
    var owmURL = process.env.OWM_URL + '?zip=11976,us&appid=' + process.env.OWM_ID + '&units=imperial';
    if (ZIP) {
      var owmURL = process.env.OWM_URL + ZIP + '&appid=' + process.env.OWM_ID + '&units=imperial';
    }
    rp.post(owmURL).then(function(results){
      console.log(results);
    }, function(error){
      console.log('Weather: Error fetching weather.');
    });
  }
};