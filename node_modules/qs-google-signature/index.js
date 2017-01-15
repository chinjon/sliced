var qs = require("qs");
var qsWithSignature = require("./lib");

exports.parse = qs.parse;

exports.stringify = qsWithSignature.stringify;
