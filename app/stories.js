var Utils = require('./utils');

module.exports = {
  creep: function(user) {
    var horoscope = user.get('horoscope');
    var associates = user.get('associates');
    var associate = associates[0];
    var messages = ["📰 March 9th, 1993:\n" + associate + " put forth a motion on expanding the Water Mill Historic District (Boundary Increase) (Water Mill MRA), Roughly, along Rogers St., Lewis St. and The Dollhouse on E side of existing district, Water Mill 93000239.",
      '🔮: ' + horoscope.profession];
    return Utils.formatMessages(messages);
  },
  swim: function(user) {
    var horoscope = user.get('horoscope');
    var associates = user.get('associates');
    var associateA = associates[1];
    var associateB = associates[0];
    var messages = ["📰 August 6, 2012:\nThe police responded to The Dollhouse at noon on Sunday to find a Water Mill man being kept afloat by children who were at the house.",
    	"The children, " + associateA + " and " + associateB + ", were unable to pull the man, who was drowning, from the pool, according to the village's emergency service department. The man began to drown after he hit his head; he is believed to be the children's nanny.",
      '🔮: ' + horoscope.personal_life];
    return Utils.formatMessages(messages);
  },
  shed: function(user) {
    var horoscope = user.get('horoscope');
    var associates = user.get('associates');
    var associate = associates[2];
    var messages = ["📰 Nov 13, 2017:\nSaugeen Shores Police say a resident of a Winchfield Road home in Water Mill awoke around 2:15 a.m. Nov. 10 to find their backyard shed engulfed in flames.",
    	"Police say the shed and contents were completely destroyed. Saugeen Shores Fire and Police attended at the scene -- and fire department personnel deemed the shed fire was started intentionally.",
    	"The victim, " + associate + ", also discovered their house and vehicle had been damaged. Police say all four sides of the home were spray painted extensively with vulgar language.",
    	"The vehicle was also spray painted and scratched, and foam insulation sprayed into the gas tank.",
      '🔮: ' + horoscope.travel];
    return Utils.formatMessages(messages);
  },
  sleep: function(user) {
    var horoscope = user.get('horoscope');
    var associates = user.get('associates');
    var associate = associates[3];
    var messages = ["📰 Sept 19, 1994:\nVitas Gerulaitis, the garrulous New Yorker who rose from the public courts of Brooklyn and Queens to become the third-ranked men's tennis player in the world, was found dead yesterday at " + associate + "'s home in Water Mill. He was 40 years old and lived in Turnburry, Fla.",
    	"The Water Mill police said that Gerulaitis's body was found at the home shortly after 3 P.M.",
      '🔮: ' + horoscope.health];
    return Utils.formatMessages(messages);
  },
  hide: function(user) {
    var horoscope = user.get('horoscope');
    var associates = user.get('associates');
    var associate = associates[4];
    var messages = ["📰 Oct 17, 2009:\nA Water Mill local was arrested over the weekend when police said they broke into their ex-girlfriend’s home, attacked her and then later attempted to hide from police.",
    	"Water Mill Town Police said " + associate + ", 24, attacked the woman, who lives on Stephen Halsey Path, at about 12:12 a.m. on Saturday and then fled the house before police arrived. Officers attempted to search the property with the New York State Police Department K-9 unit but were unable to find him.",
    	associate + " then entered the house again at around 2:30 a.m., but that time the woman was able to escape. She then called police, who surrounded " + associate + " in the house. Police then entered the home and found " + associate + " hiding in a bedroom closet.",
      "After a brief struggle, " + associate + " was arrested and transported to police headquarters in Hampton Bays for processing.",
      '🔮: ' + horoscope.emotions];
    return Utils.formatMessages(messages);
  }
};