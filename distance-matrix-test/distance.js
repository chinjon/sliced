var fs = require('fs');
var distance = require('google-distance-matrix');
// AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM

var GOOGLE_CLIENT_KEY = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';


var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM'
});


var origins = ['Yonkers, NY '];
var destinations = [
    'New York NY', 
    '40.7644882,-73.98246'
    
    ];

distance.matrix(origins, destinations, function (err, data) {
  if (!err)

    var locationOne = data.rows[0].elements[0];
    var locationTwo = data.rows[0].elements[1];
    console.log("Distance to location one: " + JSON.stringify(locationOne.distance.text));
    console.log("Travel time to location one: "+ JSON.stringify(locationOne.duration.value));
    console.log("Distance to location two: " + JSON.stringify(locationTwo.distance.text));
    console.log("Travel time to location two: "+ JSON.stringify(locationTwo.duration.value));
    //fs.writeFile('distance-test.json', JSON.stringify(data));
});