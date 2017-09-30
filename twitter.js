module.exports = {

  getNewTweets: function (name) {
    var that = this;
    return this.getTweets('xitasogmbh').then(function (tweets) {
      tweets = that.sortByDate(tweets);

      var latestTweetDate = that.getLatestTweetDate();
      that.saveLatestTweetDate(Math.max(new Date(tweets[0].created_at), latestTweetDate));

      var newTweets = tweets.filter(function (tweet) { return new Date(tweet.created_at) > latestTweetDate });
      return newTweets;
    });
  },

  getLatestTweetDate: function () {
    var fs = require('fs');
    var fileContent = fs.readFileSync('tweet.json');
    return new Date(JSON.parse(fileContent).latestTweetDate);
  },

  saveLatestTweetDate: function (tweetDate) {
    var json = JSON.stringify({
      latestTweetDate: tweetDate
    });
    var fs = require('fs');
    return fs.writeFile('tweet.json', json);
  },

  getTweets: function (name) {
    var Twitter = require('twitter');
    var credentials = require('./credentials.js');
    var client = new Twitter(credentials.twitter);
    return client.get('statuses/user_timeline', { screen_name: name });
  },

  sortByDate: function (tweets) {
    return tweets.sort(function sortByCreatedAt(first, second) {
      return new Date(second.created_at) - new Date(first.created_at);
    });
  }
};
