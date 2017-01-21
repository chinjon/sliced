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
}).done(function (response) {
  ip = response;
  console.log('inside ajax: ', ip.ip);
  console.log('inside ajax: ', ip.loc);
  latLngArray = ip.loc.split(",");
  console.log(ip.loc.split(","));
  var marker = new google.maps.Marker({
    position: {
      lat: parseFloat(latLngArray[0]),
      lng: parseFloat(latLngArray[1])
    },
    map: map,
    shopName: 'You'
  });
})

var db = firebase.database();
var map = $('#map');
var data;

db.ref().on('value', function (snap) {
  data = snap.val().pizza_shops;

  var pizza_locations = [];

  for (let prop in data) {
    pizza_locations.push(data[prop]);
  }

  pizza_locations.forEach(function (object) {

    var marker = new google.maps.Marker({
      position: object.shop.position,
      map: map,
      shopName: object.shop.name
    });

    var infowindow = new google.maps.InfoWindow({
      content: object.shop.name,
      text: object.shop.snippet_text
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

  })
})


// obtain new long and lat and shift map view

function moveToLocation(lat, lng){
    var center = new google.maps.LatLng(lat, lng);

    map.panTo(center);
    map.setZoom(15);
}

$('button').on('click', function (e) {
  e.preventDefault();
  var input = $('#address').val().trim();
  var userLocation = input;
  var key = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';

  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&key=' + key,
    method: 'GET'
  }).done(function (data) {

    var inputLong = data.results[0].geometry.location.lng;
    var inputLat = data.results[0].geometry.location.lat;
    moveToLocation(inputLat, inputLong);
    calcDistance('Istanbul, Turkey', 'Ankara, Turkey');
    // console.log("User lat: " + inputLat + " User long: " + inputLong);
  })
});

function initMap() {

  map = new google.maps.Map(map[0], {
    center: {
      lat: 40.7265884,
      lng: -73.9716457
    },
    zoom: 13
  });
}

function calcDistance(origin, destination) {
var distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix({
        origins: ['Istanbul, Turkey'],
        destinations: ['Ankara, Turkey'],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        durationInTraffic: true,
        avoidHighways: false,
        avoidTolls: false
    },
    function (response, status) {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
        } else {
            console.log(response);
        }
    });
}