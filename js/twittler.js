$(document).ready(function(){
var initialTime = moment();
var $button = $('.new-tweets');
var tweetIndex = 0; //Keeps track of how many tweets are currently in the list


function showTweets() {
	var tweetCount = streams.home.length - 1;  //Pulls new tweet length
	while(tweetCount >= tweetIndex){
	  var tweet = streams.home[tweetIndex];
	  var time = initialTime.from(moment(tweet.created_at));
	  var $tweet = $('<div></div>');
	  $tweet.text(time + " " + '@' + tweet.user + ': ' + tweet.message);
	  $tweet.prependTo($(".tweets"));
	  tweetIndex++;
	}
}

showTweets();
setInterval(showTweets, 500);

$button.on('click', showTweets);

});