var Yelp = require('yelp');
var config = require('./config');
var firebase = require('firebase')
var fs = require('fs');
var MapMarker = require("google-map-marker");
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

yelp.search({ term: 'dollar pizza', location: 'New york city' })
.then(function (data) {
  fs.writeFile('info.json', JSON.stringify(data), function(error){
    console.log(error)
  })
})
.catch(function (err) {
  console.error(err);
});
