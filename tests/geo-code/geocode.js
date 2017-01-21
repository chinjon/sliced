// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

var key = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';

var userLong,
    userLat;

$('button').on('click', function (e) {
    e.preventDefault();
    var input = $('#address').val().trim();
    var userLocation = input;

    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&key=' + key,
        method: 'GET'
    }).done(function (data) {

        var inputLong = data.results[0].geometry.location.lng;
        var inputLat = data.results[0].geometry.location.lat;
        userLong = inputLong;
        userLat = inputLat;

        console.log("User lat: " + inputLat + " User long: " + inputLong);

    })
});

var origin1 = new google.maps.LatLng(55.930385, -3.118425);
var origin2 = 'Greenwich, England';
var destinationA = 'Stockholm, Sweden';
var destinationB = new google.maps.LatLng(50.087692, 14.421150);

var service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [origin1, origin2],
    destinations: [destinationA, destinationB],
    travelMode: 'DRIVING',
    transitOptions: TransitOptions,
    drivingOptions: DrivingOptions,
    unitSystem: UnitSystem,
    avoidHighways: Boolean,
    avoidTolls: Boolean,
  }, callback);

function callback(response, status) {
  if (status == 'OK') {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    console.log(origins)

    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        var element = results[j];
        var distance = element.distance.text;
        var duration = element.duration.text;
        var from = origins[i];
        var to = destinations[j];
      }
    }
  }
}