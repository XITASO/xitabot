module.exports = {
    getLatestPostDate: function (channel) {
        var fs = require('fs');
        try{
            var fileContent = fs.readFileSync(channel + '.json');
            return new Date(JSON.parse(fileContent).latestPostDate);
        }
        catch (e) {
            this.saveLatestPostDate(channel, null);
            return null;
        }
    },

    saveLatestPostDate: function (channel, postDate) {
        var json = JSON.stringify({
            latestPostDate: postDate
        });
        var fs = require('fs');
        return fs.writeFile(channel + '.json', json);
    },

    sortByDate: function (posts, date_field) {
        return posts.sort(function sortByCreatedAt(first, second) {
            return new Date(second[date_field]) - new Date(first[date_field]);
        });
    },

    getNewPosts: function (posts, latestPostDate, date_field) {
        return posts.filter(function (post) { return new Date(post[date_field]) > latestPostDate });
    }
}