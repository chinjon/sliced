// https://www.yelp.com/developers/documentation/v3/business_search
var Yelp = require('yelp');
var config = require('./assets/js/config');
var fs = require('fs');
var bigData = require('./dollar_pizza_spots');

var yelp = new Yelp({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  token: config.TOKEN,
  token_secret: config.TOKEN_SECRET
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'dollar pizza', location: 'New york city' })
.then(function (data) {
  // console.log(data);
  // fs.writeFile('dollar_pizza_spots.json',JSON.stringify(data), function(error){
  //   if(error){
  //     console.log(error)
  //   } else {
  //     console.log('Data Saved!');
  //   }
  // })
})
.catch(function (err) {
  console.error(err);
});

var pizza_locations = [];

bigData.businesses.forEach(function(item){
  console.log(item.name)
  console.log(item.location.coordinate.latitude)
  console.log(item.location.coordinate.longitude)
  pizza_locations.push({
    name: item.name,
    latitude: item.location.coordinate.latitude,
    longitude: item.location.coordinate.longitude
  })
});

console.log(pizza_locations[0])
