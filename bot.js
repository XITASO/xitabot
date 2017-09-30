var fb = require("./facebook.js");
var api = fb.getApi();
fb.authenticate(api).then(function() { return fb.getPosts(api); }).then(function(data) { console.log(data); });