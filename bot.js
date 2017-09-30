var fb = require("./facebook.js");
var api = fb.getApi();
fb.authenticate(api).then(function() { return fb.getTweets(api); }).then(function(data) { console.log(data); });