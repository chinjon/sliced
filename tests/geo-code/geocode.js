// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY

var key = 'AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';


$('button').on('click', function(e){
    e.preventDefault();
    var input = $('#address').val().trim();
    var userLocation = input;

    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&key=' + key,
        method: 'GET'
    }).done(function(data)  {
        
        var inputLong = data.results[0].geometry.location.lng;
        var inputLat = data.results[0].geometry.location.lat;
        console.log("User lat: " + inputLat + " User long: " + inputLong);
    })
});

