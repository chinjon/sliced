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
}).done(function(response){
  ip = response;
  console.log('inside ajax: ',ip.ip);
  console.log('inside ajax: ', ip.loc);
  latLngArray = ip.loc.split(",");
  console.log(ip.loc.split(","));
})

var db = firebase.database();
var map = $('#map');
var marker;
var data;
var pizza_locations = [];

db.ref().on('value',function(snap){
  console.log(snap.val());
  data = snap.val().pizza_shops;


  for(let place in data){
    pizza_locations.push(data[place]); //push object with location data from database to local array
    addMarker(data[place]);
    addInfo(data[place])
  }

  console.log(pizza_locations)
})

// display options for map
var mapOptions = {
    center: {lat: 40.7265884, lng: -73.9716457},
    zoom: 13
}

//initializes and adds map to page
function initMap() {
  map = new google.maps.Map(map[0], mapOptions);

}

//adds marker at location of each establishment
function addMarker(place) {
  marker = new google.maps.Marker({
    position: place.shop.position,
    icon: {
      url:'assets/img/pizza_icon.png',
      scaledSize: new google.maps.Size(35, 35)
    },
    map: map
  });
  console.log(place)
}

//adds info window to marker
function addInfo(place) {
  var infowindow = new google.maps.InfoWindow({
    content: '<h4>' + place.shop.name + '</h4>' + '</br>' + '<p>' + place.shop.snippet_text + '</p>'
  });

  marker.addListener('click', function() {
    infowindow.open(map, this);
  });
}