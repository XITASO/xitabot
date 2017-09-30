var credentials = {};

credentials.twitter = {
    consumer_key: process.env.TWITTER_consumer_key,
    consumer_secret: process.env.TWITTER_consumer_secret,
    access_token_key: process.env.TWITTER_access_token_key,
    access_token_secret: process.env.TWITTER_access_token_secret
  };

credentials.facebook = {
    client_id: process.env.FACEBOOK_client_id,
    client_secret: process.env.FACEBOOK_client_secret
};

module.exports = credentials;