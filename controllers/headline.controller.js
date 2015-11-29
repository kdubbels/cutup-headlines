var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var Headline = mongoose.model('Headline');

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

var requestHeadlines = function(req, res) {
  var headlines_array = [];
  request('http://www.nytimes.com', function (error, response, html) {
      if (!error && response.statusCode == 200) {
         var $ = cheerio.load(html);
         $('h2.story-heading').each(function(i, element) {
             var headline = $(element).text();
             var trimmed = headline.trim();
             var goodQuotes = trimmed.replace(/[\u2018\u2019]/g, "'");
             var splitted = goodQuotes.split(" ");
             for (var i = 0; i < splitted.length; i++) {
              headlines_array.push(splitted[i]);
             }
         });
      }
      // TODO: might need to move shuffled, joined and return joined here???
  });
  var shuffled = shuffle(headlines_array);
  var joined = shuffled.join(' ');
  return joined;
};

module.exports.headlinesCreate = function(req, res) {
  Headline.create({
    headline: joined,
    date: Date.now(),
      }, function(err, headline) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(headline);
      sendJSONresponse(res, 201, headline);
    }
  });
};