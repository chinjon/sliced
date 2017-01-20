var config = {
  apiKey: "AIzaSyC7IuiZeD4Fk_Z5VUp4Y3Rq_U1LTVbSw8s",
  authDomain: "sliced-8f528.firebaseapp.com",
  databaseURL: "https://sliced-8f528.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "9404531697"
};

firebase.initializeApp(config);

var ip;

// $.get("http://ipinfo.io", function(response) {
//   ip = response.ip;
//   // console.log(ip)
// }, "jsonp");

$.ajax({
  url: 'http://ipinfo.io',
  method: 'GET',
  dataType: 'jsonp',
  async: false
}).done(function(response){
  ip = response;
  console.log('inside ajax: ',ip.ip);
  console.log('inside ajax: ', ip.loc);
  latLngArray = ip.loc.split(",");
  console.log(ip.loc.split(","));
  // var marker = new google.maps.Marker({
  //   position: ,
  //   map: map,
  //   shopName: 'You'
  // });
})

var db = firebase.database();
var map = $('#map');
// var marker;
var data;
var pizza_locations = [];

db.ref().on('value',function(snap){
  data = snap.val().pizza_shops;

  for(let prop in data){
    pizza_locations.push(data[prop]);
    addMarker(data[prop]);
  }

  console.log(pizza_locations)

  // addMarker(pizza_locations)

  // pizza_locations.forEach(function(object){
  //   console.log(object.shop.position);
  //   var marker = new google.maps.Marker({
  //     position: object.shop.position,
  //     map: map,
  //     shopName: object.shop.name
  //   });

  //   var infowindow = new google.maps.InfoWindow({
  //     content: object.shop.name,
  //     text: object.shop.snippet_text
  //   });

  //   marker.addListener('click', function() {
  //     infowindow.open(map, marker);
  //   });

  // })

})

// function initMap() {
//   map = new google.maps.Map(map[0], {
//     center: {
//       lat: 40.7265884,
//       lng: -73.9716457
//     },
//     zoom: 13
//   });
// }
var mapOptions = {
    center: {lat: 40.7265884, lng: -73.9716457},
    zoom: 13
}

function initMap() {
  map = new google.maps.Map(map[0], mapOptions);

}

function addMarker(feature) {
  marker = new google.maps.Marker({
  position: feature.shop.position,
  icon: {
        url:'assets/img/pizza_icon.png',
        scaledSize: new google.maps.Size(30, 30)
        },
  map: map
});
console.log(feature)
}
console.log(pizza_locations.length)