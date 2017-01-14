// https://www.yelp.com/developers/documentation/v3/business_search
var Yelp = require('yelp');
var fs = require('fs');

var yelp = new Yelp({
  consumer_key: 'HEM6lUBvoJlKsi1i80Sh9g',
  consumer_secret: 'EBPbGQQUz6lDF9yvwYUMkANTsyY',
  token: 'kqi678gE7kkYklgWkOXv1zM47xEYiDbZ',
  token_secret: 'dd836EO3YLS8QvvBbpEnzRRZR5k',
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
