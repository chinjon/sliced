
$(document).ready(function () {
  // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});

$(".submit-button, .findLocation").click(function () {
  $('html,body').animate({
      scrollTop: $("#section2").offset().top
    },
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
var bars;

$('#user-location-search').on('click', function (e) {
  e.preventDefault();
  var input = $('#userLocationInput').val().trim();
  var userLocation = input;
  var key = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';

  stores = [];
  bars = [];

  for (let i = 0; i < pizza_locations.length; i++) {
    stores.push(pizza_locations[i].shop.position.lat + ',' + pizza_locations[i].shop.position.lng);
  };

  for (let i = 0; i < bar_locations.length; i++) {
    bars.push(bar_locations[i].bar.position.lat + ',' + bar_locations[i].bar.position.lng);
  }



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
          origins: [origin],
          destinations: destination,
          travelMode: google.maps.TravelMode.WALKING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          // need to rework or change parameters to reflect walking times and routes
          durationInTraffic: true,
          avoidHighways: true,
          avoidTolls: true
        },
        function (response, status) {
          if (status !== google.maps.DistanceMatrixStatus.OK) {
            console.log('Error:', status);
          } else {

            // store distances
            var distArr = [];
            var barDistArr = [];
            // 1 meter = 0.000621 miles
            // iterates through data and returns the distances calculated for each location against current location
            // distances are converted from meters to miles and pushed to distArr
           
           
           function grabDistancePizza(){
             for (let i = 0; i < response.rows[0].elements.length; i++) {
              // creates a new object with distance and store name and pushes to array
              distArr.push({
                storeName: pizza_locations[i].shop.name,
                location: pizza_locations[i].shop.position.lat + "," + pizza_locations[i].shop.position.lng,
                distance: (response.rows[0].elements[i].distance.value * 0.000621).toFixed(1),
                rating: pizza_locations[i].shop.rating

              });
            }
           }
           grabDistancePizza();

           function grabDistanceBars(){
             for (let i = 0; i < response.rows[0].elements.length; i++) {
              // creates a new object with distance and store name and pushes to array
              barDistArr.push({
                storeName: bar_locations[i].bar.name,
                location: bar_locations[i].bar.position.lat + "," + bar_locations[i].bar.position.lng,
                distance: (response.rows[0].elements[i].distance.value * 0.000621).toFixed(1),
                rating: bar_locations[i].bar.rating

              });
            }
           }
           grabDistanceBars();
           
           // function to sort array of objects based on the value of each distance object
            function sortArrDistance(arr) {
              arr.sort(function (a, b) {
                return a.distance - b.distance;
              })
            };

            sortArrDistance(distArr);
            sortArrDistance(barDistArr);

            

            $("#location-list-module").empty();
            // iterate to list module and pushes the 5 closest to the list module

            function displayResults(arr){
              for (let j = 0; j < 5; j++) {
              var newListItem = $('<li>');
              newListItem.attr("data-location", arr[j].location);
              var newCollapseHeader = $('<div>');
              newCollapseHeader.attr("class", "collapsible-header ")
              var locName = $('<span>');
              locName.attr("class", "location-name");
              var locDistance = $('<span>');
              locDistance.attr("class", "list-distance");

              var newCollapseBody = $('<div>');
              newCollapseBody.attr("class", "collapsible-body");

              var newLocationAddress = $('<p>');

              locName.html(arr[j].storeName);
              locDistance.html(arr[j].distance);
              newCollapseHeader.append(locName);
              newCollapseHeader.append(locDistance);

              newListItem.append(newCollapseHeader);
              newListItem.append(newCollapseBody);

              $('#location-list-module').append(newListItem);
            }
            }

            displayResults(distArr);
            displayResults(barDistArr);

            // for (let j = 0; j < 5; j++) {
            //   var newListItem = $('<li>');
            //   newListItem.attr("data-location", distArr[j].location);
            //   var newCollapseHeader = $('<div>');
            //   newCollapseHeader.attr("class", "collapsible-header ")
            //   var locName = $('<span>');
            //   locName.attr("class", "location-name");
            //   var locDistance = $('<span>');
            //   locDistance.attr("class", "list-distance");

            //   var newCollapseBody = $('<div>');
            //   newCollapseBody.attr("class", "collapsible-body");
              
            //   var newLocationAddress = $('<p>');

            //   locName.html(distArr[j].storeName);
            //   locDistance.html(distArr[j].distance);
            //   newCollapseHeader.append(locName);
            //   newCollapseHeader.append(locDistance);

            //   newListItem.append(newCollapseHeader);
            //   newListItem.append(newCollapseBody);

            //   $('#location-list-module').append(newListItem);
            // }

            // TESTING DIRECTIONS
            var directionsDisplay;
            var directionsService;
            var stepDisplay;

            $('li').on("click", function () {
              directionsService = new google.maps.DirectionsService();

              var selectedDiv = $(this);
              $('.collapsible-body').empty();
              selectedLocation = selectedDiv.data('location');


              function displayRoute() {

                var directionsDisplay = new google.maps.DirectionsRenderer(); // also, constructor can get "DirectionsRendererOptions" object
                directionsDisplay.setMap(map); // map should be already initialized.

                var request = {
                  origin: userLocation,
                  destination: selectedLocation,
                  travelMode: google.maps.TravelMode.WALKING
                };
                var directionsService = new google.maps.DirectionsService();
                directionsService.route(request, function (response, status) {
                  if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    var stepsJSONLength = response.routes[0].legs[0].steps.length;
                    var steps = (response.routes[0].legs[0].steps);

                    for(let i = 0; i < stepsJSONLength; i++) {
                        // console.log(steps[i].instructions);

                        var directionStep = $('<p>');
                        directionStep.attr('class', 'turnByTurn');
                        directionStep.html(steps[i].instructions);
                        var thisCollapse = $(selectedDiv).find(".collapsible-body");
                        thisCollapse.append(directionStep);
                    }

                  }
                });
              }

              displayRoute();
            });
          }

        });
    }

    var inputLong = data.results[0].geometry.location.lng;
    var inputLat = data.results[0].geometry.location.lat;

    var userLatLngObj = {
      position: {
        lat: inputLat,
        lng: inputLong
      }
    }
    moveToLocation(inputLat, inputLong);
    var origin = inputLat + "," + inputLong;
    addUserMarker(userLatLngObj)
    // sets userLocation (global variable) to what user entered
    userLocation = origin;
    //console.log(userLocation);
    calcDistance(userLocation, stores);
    calcDistance(userLocation, bars);

  })
});

$('#location-list-module').on('click', function(e){
  e.preventDefault()
  marker.setMap(null)
})

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
  // console.log(pizza_locations)
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

function addUserMarker(place) {
  marker = new google.maps.Marker({
    position: place.position,
    icon: {
      url: 'assets/img/user_icon.png',
      scaledSize: new google.maps.Size(40, 40)
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
