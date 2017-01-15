Introduction
------------

This is a wrapper around [qs](https://github.com/hapijs/qs) package, made in order to create a querystring conforming to [Google Digital Signature ](https://developers.google.com/maps/documentation/business/webservices/auth#digital_signatures), by simply adding your signature key as the `signature` parameter, see Usage below.

It's especially intended as an almost drop'in replacement for [qs](https://github.com/hapijs/qs) package or [querystring](http://nodejs.org/api/querystring.html) node API in packages such as :

-	[google-distance-matrix](https://github.com/ecteodoro/google-distance-matrix)

-	[google-distance](https://github.com/edwlook/node-google-distance)

-	[googleMapsUtil](https://github.com/yupitel/googleMapsUtil)

Install
-------

```
$> npm install qs-google-signature
```

Usage
-----

```js
var qs = require('qs-google-signature');

var query = {
  address: "New+York",
  client: "clientID",
  signature: "vNIXE0xscrmjlyV-12Nj_BvUPaw=" //this is the signature key provided by Google
}

var queryString = qs.stringify(query, url);
//=> address=New%2BYork&client=clientID&signature=WrTAou0zgXHjKwUPdsITPZeMXew=
```

Debug
-----

To display logs, thanks to [debug](https://github.com/visionmedia/debug) use the environment variable "DEBUG" to set that you want to display "qs:signature" logs, e.g. :

```
$> DEBUG="qs:signature" node myProgram.js
```

It can also be listed among other things to debug:

```
$> DEBUG="http,qs:signature,worker" node myProgram.js
```

License
-------

MIT
