var origins = '40.7644882,-73.98246';
var destinations = '40.72866,-73.988487';
var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ origins+'&destinations=' + destinations + '&key=AIzaSyAhVCu_gr8RKRpyAtvWqbtRb-DFyCvgqUM';   
console.log(url);
$.ajax({
    url: url,
    method: 'GET'

    
}).done(function(response){
    console.log(JSON.stringify(response));
});