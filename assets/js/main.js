$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

$(".submit-button, .findLocation").click(function() {
    $('html,body').animate({
        scrollTop: $("#section2").offset().top},
        'slow');
});

var config = {
  apiKey: "AIzaSyC7IuiZeD4Fk_Z5VUp4Y3Rq_U1LTVbSw8s",
  authDomain: "sliced-8f528.firebaseapp.com",
  databaseURL: "https://sliced-8f528.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "9404531697"
};

firebase.initializeApp(config);

var ip;

$.ajax({
  url: 'http://ipinfo.io',
  method: 'GET',
  dataType: 'jsonp',
  async: false
}).done(function (response) {
  ip = response;
  // console.log('inside ajax: ', ip.ip);
  // console.log('inside ajax: ', ip.loc);
  latLngArray = ip.loc.split(",");
  // console.log(ip.loc.split(","));
})

var db = firebase.database();
var map = $('#map');
var marker;
var data;
var pizza_locations = [];
var bar_locations = [];

var userLocation = '40.7265884, -73.9716457';

db.ref().on('value', function (snap) {
  data = snap.val().pizza_shops;
  var pizza_locations = [];

  for (let prop in data) {
    pizza_locations.push(data[prop]);
  }

})



// obtain new long and lat and shift map view

function moveToLocation(lat, lng) {
  var center = new google.maps.LatLng(lat, lng);

  map.panTo(center);
  map.setZoom(15);
}

// creates global to store locations in array to push to distance matrix
var stores;

$('#user-location-search').on('click', function (e) {
  e.preventDefault();
  var input = $('#userLocationInput').val().trim();
  var userLocation = input;
  var key = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';

  stores = [];

  for (let i = 0; i < pizza_locations.length; i++) {
    stores.push(pizza_locations[i].shop.position.lat + ',' + pizza_locations[i].shop.position.lng);
  };

  console.log(stores)



  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&key=' + key,
    method: 'GET'
  }).done(function (data) {



    function calcDistance(origin, destination) {
      var distanceService = new google.maps.DistanceMatrixService();
      distanceService.getDistanceMatrix({
          // pulls location from global variable
          // not dynamically updating
          // use filter function to sort out distance
          origins: [userLocation],
          destinations: stores,
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          // need to rework or change parameters to reflect walking times and routes  
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

    var inputLong = data.results[0].geometry.location.lng;
    var inputLat = data.results[0].geometry.location.lat;
    moveToLocation(inputLat, inputLong);
    var origin = inputLat + "," + inputLong;

    // sets userLocation (global variable) to what user entered
    userLocation = origin;
    console.log(userLocation);
    calcDistance();

  })
});

db.ref().on('value', function (snap) {
  shopData = snap.val().pizza_shops;
  barData = snap.val().bars;

  for (let place in shopData) {
    pizza_locations.push(shopData[place]); //push object with location data from database to local array
    addShopMarker(shopData[place].shop);
    addInfo(shopData[place].shop)
  }
  for (let place in barData) {
    bar_locations.push(barData[place]); //push object with location data from database to local array
    addBarMarker(barData[place].bar);
    addInfo(barData[place].bar)
  }
  console.log(pizza_locations)
})

// display options for map
var mapOptions = {
  center: {
    lat: 40.7265884,
    lng: -73.9716457
  },
  zoom: 13
}

//initializes and adds map to page
function initMap() {
  map = new google.maps.Map(map[0], mapOptions);
}

//adds marker at location of each establishment
function addShopMarker(place) {
  marker = new google.maps.Marker({
    position: place.position,
    icon: {
      url: 'assets/img/pizza_icon.png',
      scaledSize: new google.maps.Size(35, 35)
    },
    map: map
  });
  // console.log(place)
}

function addBarMarker(place) {
  marker = new google.maps.Marker({
    position: place.position,
    icon: {
      url: 'assets/img/bar_icon.png',
      scaledSize: new google.maps.Size(35, 35)
    },
    map: map
  });
  // console.log(place)
}

//adds info window to marker
function addInfo(place) {
  var infowindow = new google.maps.InfoWindow({
    content: '<h5>' + place.name + '</h5>' + '<p>' + place.snippet_text + '</p>',
    maxWidth: 200
  });

  marker.addListener('click', function () {
    infowindow.open(map, this);
  });
}