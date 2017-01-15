var firebase = require('firebase');
var info = require('./info.json');
var dbConfig = {
  apiKey: "AIzaSyC7IuiZeD4Fk_Z5VUp4Y3Rq_U1LTVbSw8s",
  authDomain: "sliced-8f528.firebaseapp.com",
  databaseURL: "https://sliced-8f528.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "9404531697"
};

firebase.initializeApp(dbConfig);

var db = firebase.database();
info.businesses.forEach(function(item){
  db.ref().push({
    name: item.name,
    position: {
      lat: item.location.coordinate.latitude,
      lng: item.location.coordinate.longitude
    }
  });
});
