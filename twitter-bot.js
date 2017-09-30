var twitter = require('./twitter.js');

twitter.getNewTweets('xitasogmbh').then(function(tweets){
    console.log(tweets.length + " new tweet(s)!");
    tweets.forEach(function (tweet) {
        //console.log(tweet);
    });
});
