// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

var key = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';


$('button').on('click', function(e){
    e.preventDefault();
    console.log("clicked");
    var input = $('#address').val().trim();
var userLocation = input;

$.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&key=' + key,
    method: 'GET'
}).done(function(data)  {
    
    console.log(data.results[0].geometry.location)
})
});