// https://www.yelp.com/developers/documentation/v3/business_search
var Yelp = require('yelp');
var fs = require('fs');
var config = require('config');

var yelp = new Yelp({
  consumer_key: config.KEY,
  consumer_secret: config.CONSUME_SECRET,
  token: config.TOKEN,
  token_secret: config.TOKEN_SECRET,
});

yelp.search({ term: 'dollar pizza', location: 'New York City' })
.then(function (data) {
  console.log(data);
  fs.writeFile("file.json", JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }

})
})
.catch(function (err) {
  console.error(err);
});
