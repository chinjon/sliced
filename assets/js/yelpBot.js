  var Yelp = require('yelp');
var config = require('./config');
var firebase = require('firebase');
var fs = require('fs');

var dbConfig = {
  apiKey: "AIzaSyC7IuiZeD4Fk_Z5VUp4Y3Rq_U1LTVbSw8s",
  authDomain: "sliced-8f528.firebaseapp.com",
  databaseURL: "https://sliced-8f528.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "9404531697"
};

firebase.initializeApp(dbConfig);

var db = firebase.database();

var yelp = new Yelp({
  consumer_key: config.CONSUMER_KEY,
  consumer_secret: config.CONSUMER_SECRET,
  token: config.TOKEN,
  token_secret: config.TOKEN_SECRET
});
var businessArray = [];
var shop_info = []
var yelpApiCall = function(){
  yelp.search({ term: 'dollar pizza', location: 'New york city' })
  .then(function (data) {
    businesses = data.businesses;
    for(let prop in businesses) {
      shop_info.push({
        name: businesses[prop].name,
        rating: businesses[prop].rating,
        snippet_text: businesses[prop].snippet_text,
        position: {
          lat: businesses[prop].location.coordinate.latitude,
          lng: businesses[prop].location.coordinate.longitude
        }
      })
    }
    shop_info.forEach(function(shop){
      db.ref('/pizza_shops').push({
        shop
      })
    })
  })
  .catch(function (err) {
    console.error(err);
  });
}

yelpApiCall()
