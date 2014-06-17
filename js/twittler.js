$(document).ready(function(){
var $button = $('.new-tweets');
var tweetIndex = 0; //Keeps track of how many tweets are currently in the list

showTweets();

function showTweets() {
	var tweetCount = streams.home.length -1;  //Pulls new tweet length
	while(tweetCount >= tweetIndex){
	  var tweet = streams.home[tweetIndex];
	  var time = tweet.created_at;  //TODO: use moment.js lib to make dates more user friendly
	  var $tweet = $('<div></div>');
	  $tweet.text(time + " " + '@' + tweet.user + ': ' + tweet.message);
	  $tweet.prependTo($(".tweets"));
	  tweetIndex++;
	}
}

$button.on('click', showTweets);


});