var fs = require('fs');
var distance = require('google-distance-matrix');
// AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM


var GOOGLE_CLIENT_KEY = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';


var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM'
});


var origins = ['Yonkers, NY '];
var destinations = ['New York NY', '40.7644882,-73.98246'];

distance.matrix(origins, destinations, function (err, distances) {
    if (!err)
        fs.appendFileSync('distance-test.json', JSON.stringify(distances));
});
