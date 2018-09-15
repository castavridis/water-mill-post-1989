var request = require('request');
var Parse = require('parse/node');

var Visitor = Parse.Object.extend("Visitor");
var Utils = require('./utils');

var development = true;
var testUser = {
  body:{
   ToCountry:'US',
   ToState:'NY',
   SmsMessageSid:'SM99d0240ccb71b6a7cf045d60fdac89ce',
   NumMedia:'0',
   ToCity:'',
   FromZip:'86305',
   SmsSid:'SM99d0240ccb71b6a7cf045d60fdac89ce',
   FromState:'AZ',
   SmsStatus:'received',
   FromCity:'PRESCOTT',
   Body:'👋🏽',
   FromCountry:'US',
   To:'+16312121989',
   ToZip:'',
   AddOns:{
      "status":"successful",
      "message":null,
      "code":null,
      "results":{
         "whitepages_pro_caller_id":{
            "request_sid":"XR24e1f1bc2634d285f5a1d6b760051eaa",
            "status":"successful",
            "message":null,
            "code":null,
            "result":{
               "id":"Phone.d5f36fef-a2e2-4b08-cfe3-bc7128b4531c",
               "phone_number":"9287133945",
               "is_valid":true,
               "country_calling_code":"1",
               "line_type":"Mobile",
               "carrier":"Verizon Wireless",
               "is_prepaid":null,
               "is_commercial":false,
               "belongs_to":[
                  {
                     "id":"Person.94995bc8-8f72-4ecc-933e-9bd78a657d53",
                     "name":"Christine A Stavridis",
                     "firstname":"Christine",
                     "middlename":"A",
                     "lastname":"Stavridis",
                     "alternate_names":[

                     ],
                     "age_range":"25-29",
                     "gender":"Female",
                     "type":"Person",
                     "link_to_phone_start_date":"2017-12-08",
                     "industry":null
                  }
               ],
               "current_addresses":[
                  {
                     "id":"Location.a54ec023-338c-4c5d-b401-1945e9842129",
                     "location_type":"Address",
                     "street_line_1":"3949a Botanical Ave",
                     "street_line_2":null,
                     "city":"Saint Louis",
                     "postal_code":"63110",
                     "zip4":"4005",
                     "state_code":"MO",
                     "country_code":"US",
                     "lat_long":{
                        "latitude":38.609345,
                        "longitude":-90.247585,
                        "accuracy":"RoofTop"
                     },
                     "is_active":true,
                     "delivery_point":"SingleUnit",
                     "link_to_person_start_date":"2014-08-01"
                  },
                  {
                     "id":"Location.a1f05a35-5a51-4c75-a49f-795c8ff928ba",
                     "location_type":"Address",
                     "street_line_1":"1804 Boardwalk Ave",
                     "street_line_2":null,
                     "city":"Prescott",
                     "postal_code":"86301",
                     "zip4":"5519",
                     "state_code":"AZ",
                     "country_code":"US",
                     "lat_long":{
                        "latitude":34.57346,
                        "longitude":-112.441551,
                        "accuracy":"RoofTop"
                     },
                     "is_active":true,
                     "delivery_point":"SingleUnit",
                     "link_to_person_start_date":"1994-03-01"
                  }
               ],
               "historical_addresses":[

               ],
               "associated_people":[
                  {
                     "id":"Person.4bf16e01-2f99-49c1-9e5e-6e36bdf1ebe1",
                     "name":"Jonathan E King",
                     "firstname":"Jonathan",
                     "middlename":"E",
                     "lastname":"King",
                     "relation":"Household"
                  },
                  {
                     "id":"Person.83e56b33-51d9-4466-af4f-545bc6f7f8c2",
                     "name":"Christine J Stavridis",
                     "firstname":"Christine",
                     "middlename":"J",
                     "lastname":"Stavridis",
                     "relation":"Household"
                  },
                  {
                     "id":"Person.c847607e-43b3-4086-8a92-86e3e5c11db1",
                     "name":"Mr. Thomas John Stavridis III",
                     "firstname":"Thomas",
                     "middlename":"John",
                     "lastname":"Stavridis",
                     "relation":null
                  },
                  {
                     "id":"Person.f1c725d1-2d62-4bab-b3f9-70c4a08fb28c",
                     "name":"Howard W Weaver",
                     "firstname":"Howard",
                     "middlename":"W",
                     "lastname":"Weaver",
                     "relation":"Household"
                  },
                  {
                     "id":"Person.fb10261d-034d-41af-840f-a1497662309e",
                     "name":"Melodee Samba Stavridis",
                     "firstname":"Melodee",
                     "middlename":"Samba",
                     "lastname":"Stavridis",
                     "relation":null
                  }
               ],
               "alternate_phones":[
                  "9287711012",
                  "2107828743"
               ],
               "error":null,
               "warnings":[

               ]
            }
         }
      }
   },
   NumSegments:'1',
   MessageSid:'SM99d0240ccb71b6a7cf045d60fdac89ce',
   AccountSid:'ACbc48fbf993978bcefc70cd31e3a3e8e3',
   From:'+19287133945',
   ApiVersion:'2010-04-01'
  }
};

/*
  assumes req.body

  id: From

  // basic:
  phoneZip: FromZip
  associates: DEFAULT_ASSOCIATES

  assumes req.body.AddOns.results.whitepages_pro_caller_id.result

  // enhanced
  firstName: belongs_to[0].firstname
  lastName: belongs_to[0].lastname
  zip: current_addresses[0].postal_code || historical_addresses[0].postal_code
  associates: associated_people[i].firstname

  // personality
  ie:
  ns:
  ft:
  jp:
  zodiac:

  // story_progress
  creep:
  swim:
  shed:
  sleep:
  hide:

  // horoscope
  health:
  personal_life:
  travel:
  profession:
  luck:
  emotions:

  // weather
  home:
  waterMill:

*/

var VISITOR_PRIMARY_KEY = 'visitor_id';

function init_user(visitor, data) {
  visitor.set(VISITOR_PRIMARY_KEY, data.From);
  visitor.set('basic', {
    'phone': data.From,
    'phoneZip': data.FromZip || null
  });
  visitor.set('associates', Utils.getAssociates(data));
  visitor.save();
  return visitor;
}

function findUser(data, hasPhone) {
  var phone = hasPhone ? data : data.From;
  var visitor = new Visitor();
  var query = new Parse.Query(visitor);
  query.equalTo(VISITOR_PRIMARY_KEY, phone);
  return query.first()
    .then(function (result) {
        if (result) {
          return {
            status: 'OLD',
            user: result
          };
        } else {
          if (!hasPhone) {
            return {
              status: 'NEW',
              user: init_user(visitor, data)
            };
          } else {
            console.log('User.find(): Could not find by phone number.');
            return false;
          }
        }
      }, function(error){
        console.log('User.find(): ', error);
      });
}

module.exports = {
  init: function ( ) {
    return false;
  },
  edit: function (req) {
    var data = (!req) ? testUser.body : req.body;
    var phone = data.From;
    var visitor = new Visitor();
    var query = new Parse.Query(visitor);
    query.equalTo(VISITOR_PRIMARY_KEY, phone);
  },
  setDichotomy: function (dichotomy, value, user) {
    console.log(user);
  },
  setZodiac: function (zodiac, user) {
    // get dichotomies
    // associate to personality
  },
  setHoroscope: function (horoscope, user) {
    if (user != false) {
      user.set('horoscope', horoscope);
      user.save();
    }
    return user; //user.save();
  },
  find: function (req) {
    var data = (!req) ? testUser.body : req.body;
    return findUser(data, false);
  }
};