var fb = require("./facebook.js");
var api = fb.getApi();
fb.authenticate(api).then(function() { return fb.getNewPosts(api); }).then(function(data) { console.log(data); });