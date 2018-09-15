var Utils = require('./utils');

module.exports = {
  creep: function(req, res) {
    var message = "March 9th, 1993: Water Mill Historic District (Boundary Increase) (Water Mill MRA), Roughly, along Rogers St., Lewis St. and The Dollhouse on E side of existing district, Water Mill 93000239.";
    Utils.sendMessage(res, message);
  },
  swim: function(req, res) {
    var message = "August 6, 2012:\nThe police responded to The Dollhouse at noon on Sunday to find a woman being kept afloat by children who were at the house.";
    message += "\n\nThe children were unable to pull the woman, who was drowning, from the pool, according to the village's emergency service department."
    message += "\n\nBrenner said the woman began to drown after she hit her head. She is believed to be the children's nanny.";
    Utils.sendMessage(res, message);
  },
  shed: function(req, res) {
    var message = "Saugeen Shores Police say a resident of a Winchfield Road home in Water Mill awoke around 2:15 a.m. Nov. 10 to find her backyard shed engulfed in flames."
    message+="/n/nPolice say the shed and contents were completely destroyed.";
    message+="/n/nSaugeen Shores Fire and Police attended at the scene -- and fire department personnel deemed the shed fire was started intentionally.";
    message+="/n/nThe victim also discovered her house and vehicle had been damaged.";
    message+="/n/nPolice say all four sides of the home were spray painted extensively with vulgar language.";
    message+="/n/nThe vehicle was also spray painted and scratched, and foam insulation sprayed into the gas tank.";
    Utils.sendMessage(res, message);
  },
  sleep: function(req, res) {
    var message = "Vitas Gerulaitis, the garrulous New Yorker who rose from the public courts of Brooklyn and Queens to become the third-ranked men's tennis player in the world, was found dead yesterday at a friend's home in Southampton, L.I. He was 40 years old and lived in Turnburry, Fla.";
    message += "/n/nThe Water Mill police said that Gerulaitis's body was found at a home on (Meadow Lane) shortly after 3 P.M.";
    Utils.sendMessage(res, message);
  },
  hide: function(req, res) {
    var message = "/n/nOct 17, 2009";
    message += "/n/nA Water Mill man was arrested over the weekend when police said he broke into his ex-girlfriend’s home, attacked her and then later attempted to hide from police in a (closet).";
    message += "/n/nWater Mill Town Police said Miguel Lopez, 24, attacked the woman, who lives on (Fanning Avenue), at about 12:12 a.m. on Saturday and then fled the house before police arrived. Officers attempted to search the property with the New York State Police Department K-9 unit but were unable to find him.";
    message += "/n/nMr. Lopez then entered the house again at around 2:30 a.m., but that time the woman was able to escape. She then called police, who surrounded Mr. Lopez in the house. Police then entered the home and found Mr. Lopez hiding in a bedroom closet. After a brief struggle, Mr. Lopez was arrested and transported to police headquarters in Hampton Bays for processing.";
    Utils.sendMessage(res, message);
  }
};