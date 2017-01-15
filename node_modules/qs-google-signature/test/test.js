//-- this should work
// URL: https://maps.googleapis.com/maps/api/geocode/json?address=New+York&client=clientID
// Private Key: vNIXE0xscrmjlyV-12Nj_BvUPaw=
// URL Portion to Sign: /maps/api/geocode/json?address=New+York&client=clientID
// Signature: chaRF2hTJKOScPr-RQCEhZbSzIE=
// Full Signed URL: https://maps.googleapis.com/maps/api/geocode/json?address=New+York&client=clientID&signature=Qq5Gl6GE-7nkFMlDfx0TACxSKEw=


//Note as we encode url, we have a slightly different result than the google example ( "+" becoming "%2B"). It has been validated against the official tester https://m4b-url-signer.appspot.com/

var qs = require('..');
var should = require('chai').should();

describe('When using an "options" object with a signature', function() {
  //var url = "https://maps.googleapis.com/maps/api/geocode/json?address=New+York&client=clientID";

  //will be modified, so don't forget to clone it for re-use
  var query = {
    address: "New+York",
    client: "clientID",
    signature: "vNIXE0xscrmjlyV-12Nj_BvUPaw="
  };

  var expectedQS = 'address=New%2BYork&client=clientID&signature=WrTAou0zgXHjKwUPdsITPZeMXew=';

  describe('and a partial url', function() {

    var url = "/maps/api/geocode/json";

    it('it should match Google example', function() {
      var queryString = qs.stringify(clone(query), url);

      queryString.should.be.a('string');

      queryString.should.equal(expectedQS);

    });
  });

  describe('and a full url', function() {

    var url = "https://maps.googleapis.com/maps/api/geocode/json";

    it('it should match Google example', function() {
      var queryString = qs.stringify(clone(query), url);

      queryString.should.be.a('string');

      queryString.should.equal(expectedQS);


    });
  });

  describe('and an url taken in real life', function() {

    var url =
      "https://maps.googleapis.com/maps/api/distancematrix/json?origins=45.779633%2C4.7951756%7C45.779507%2C4.7954993%7C45.767522962149876%2C4.875612258911133%7C45.77998%2C4.882435&destinations=45.779632568359375%2C4.795175552368164&mode=driving&units=metric&language=fr&avoid=&client=gme-foobar";

    var query = {
      origins: "45.779633,4.7951756|45.779507,4.7954993|45.767522962149876,4.875612258911133|45.77998,4.882435",
      destinations: "45.779632568359375,4.795175552368164",
      mode: "driving",
      units: "metric",
      language: "fr",
      avoid: "",
      client: "gme-foobar",
      signature: "vNIXE0xscrmjlyV-12Nj_BvUPaw="
    };

    var expectedQS =
      "origins=45.779633%2C4.7951756%7C45.779507%2C4.7954993%7C45.767522962149876%2C4.875612258911133%7C45.77998%2C4.882435&destinations=45.779632568359375%2C4.795175552368164&mode=driving&units=metric&language=fr&avoid=&client=gme-foobar&signature=m8HRPtb6lEfcBnYvEQrLmm-_AO4=";

    it('it should match the verifier result', function() {
      var queryString = qs.stringify(clone(query), url);

      queryString.should.be.a('string');

      queryString.should.equal(expectedQS);


    });
  });

});



function clone(a) {
  return JSON.parse(JSON.stringify(a));
}
