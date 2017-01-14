// https://www.yelp.com/developers/documentation/v3/business_search

$.ajax({
  url: "test.html",
  context: document.body
}).done(function() {
  $( this ).addClass( "done" );
});
