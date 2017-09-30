module.exports = {
    channel: "facebook",
    date_field: "created_time",

    getApi: function () {
        var FB = require("facebook-node");
        FB.setApiVersion("v2.2");
        return FB;
    },

    authenticate: function (api) {
        credentials = require("./credentials.js");
        return new Promise(function (resolve, reject) {
            api.api('oauth/access_token', {
                client_id: credentials.facebook.client_id,
                client_secret: credentials.facebook.client_secret,
                grant_type: 'client_credentials'
            }, function (res) {
                if (!res || res.error) {
                    reject(!res ? 'error occurred' : res.error);
                    return;
                }

                api.setAccessToken(res.access_token);
                resolve();
            })
        });
    },

    getPosts: function (api) {
        return new Promise(function (resolve, reject) {
            api.api('/XitasoGmbH/feed', function (res) {
                if (!res || res.error) {
                    reject(!res ? 'error occurred' : res.error);
                    return;
                }

                resolve(res.data);
            });
        });
    },

    getNewPosts: function (api) {
        var self = this;

        var posthelper = require("./posthelper.js");
        return this.getPosts(api).then(function (posts) {
            posts = posthelper.sortByDate(posts, self.date_field);

            var latestPostDate = posthelper.getLatestPostDate(self.channel);
            posthelper.saveLatestTweetDate(Math.max(new Date(posts[0][self.date_field]), latestPostDate));

            var newPosts = posthelper.getNewPosts(posts, latestPostDate, self.date_field);
            
            return newPosts;
        });
    }
}