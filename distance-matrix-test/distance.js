var fs = require('fs');
var distance = require('google-distance-matrix');
// AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM


var GOOGLE_CLIENT_KEY = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';


var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM'
});


var origins = ['San Francisco CA'];
var destinations = ['New York NY', '41.8337329,-87.7321554'];

distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
        console.log(JSON.stringify(distances));
});



// googleMapsClient.geocode({
//   address: '1600 Amphitheatre Parkway, Mountain View, CA'
// }, function(err, response) {
//   if (!err) {
//     console.log(response.json.results);
//     fs.writeFile(".json", JSON.stringify(data), function(err) {
//       if(err) {
//           return console.log(err);
//       }
//
//   })
//   }
// });
