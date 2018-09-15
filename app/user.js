module.exports = {
  init: function ( ) {
    return false;
  },
  find: function (req) {
    /*
      assumes req.body
      
      id: From
      
      basic:
        phoneZip: FromZip
        associates: DEFAULT_ASSOCIATES
      
      assumes req.body.AddOns.results.whitepages_pro_caller_id.result
      
      enhanced:
        firstName: belongs_to[0].firstname
        lastName: belongs_to[0].lastname
        zip: current_addresses[0].postal_code || historical_addresses[0].postal_code
        associates: associated_people[i].firstname
      
      personality:
        ie:
        ns:
        ft:
        jp:
        zodiac:
      
      story_progress:
        creep:
        swim:
        shed:
        sleep:
        hide:
      
      horoscope:
        health:
        personal_life:
        travel:
        profession:
        luck:
        emotions:
      
      weather:
      
    */
    return false;
  }
};