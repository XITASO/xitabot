module.exports = {
  channel: "facebook",
  date_field: "created_time",

  getNewTweets: function (name) {
    var that = this;
    var posthelper = require("./posthelper.js");
    return this.getTweets(name).then(function (tweets) {
      tweets = posthelper.sortByDate(tweets, that.date_field);

      var latestTweetDate = posthelper.getLatestPostDate(that.channel);
      posthelper.saveLatestPostDate(Math.max(new Date(tweets[0][that.date_field]), latestTweetDate));

      var newTweets = posthelper.getNewPosts(tweets, latestTweetDate, that.date_field);
      return newTweets;
    });
  },

  getTweets: function (name) {
    var Twitter = require('twitter');
    var credentials = require('./credentials.js');
    var client = new Twitter(credentials.twitter);
    return client.get('statuses/user_timeline', { screen_name: name });
  }
};
