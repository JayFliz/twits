// Import things
var twitter     = require('twitter');
var moment      = require('moment');

// Auth to Twitter
var client = new twitter({
    consumer_key: 'r4otwr0ZQMFa2MqV6O1c5phQZ',
    consumer_secret: 'DG90CgkxLQCb7xLS6uKamRhaDCPjiSb1VDHsgmUOSpyiqEu7WH',
    access_token_key: '14233500-VViSqxhIztrPfbNoeoW36mk8d9fmblNaNbbos3YCw',
    access_token_secret: '79Zuxxfb3Y6pIvbZXjI3mujFxnxdNHVXZWXucjgMImQj5'
});

// Do things!
function snapTweet () {

    // Let's get some tweets
    client.get('statuses/user_timeline', {trim_user: true, count: 20}, function(error, tweets, response){
      if(error) throw error;

      var i = 0;
      var len = tweets.length;

      // Loop through them
      for (i; i < len; i++) {

          var id = tweets[i].id_str;
          var favd = tweets[i].favorited;
          var tweetDate = new Date(Date.parse(tweets[i].created_at.replace(/( \+)/, ' UTC$1')));

          // Set an expiry date of 24 hours after a tweet has been published
          var expiryDate = moment(tweetDate).add(1440, 'minutes')._d;
          var now = moment();

          // If we find a tweet which is expired, call the function to delete it.
          // Unless it's favourited, in which case leave it alone.
          if ( favd === false) {
              deleteTweet(id);
          }

      }

    });

}

// Delete a specific tweet
function deleteTweet (e) {
    client.post('statuses/destroy', {id: e}, function(error, tweet, response){
        if(error) console.log(error);
    });
}

// Run every minute
setInterval(function(){
    snapTweet();
}, 60000);
