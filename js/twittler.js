$(document).ready(function() {
var initialTime = moment().subtract('s', 1); //create new moment Date of now() minus one second so first tweets show up correctly.
var tweetIndex = 0; //Keeps track of how many tweets are currently in the list

var showTweets = function() {
	var tweetCount = streams.home.length - 1;  //Pulls new tweet length
	while (tweetCount >= tweetIndex) {
	  var tweet = streams.home[tweetIndex];
	  var time = initialTime.from(moment(tweet.created_at));
	  var $tweet = $("<div></div>").addClass("tweet");
	  var $time = $("<time></time>").addClass("time");
	  var $user = $("<a href=\"#\"></a>").addClass("user");
	  
	  //Set text for each variable
	  $time.text(" - " + time);
	  $user.text("@" + tweet.user);
	  $tweet.text(": " + tweet.message);

	  //Concatenate tweet
	  $tweet.prependTo($(".tweets"));
	  $time.appendTo($tweet);
	  $user.prependTo($tweet);

	  //Increment tweet counter
	  tweetIndex++;
	}
};

showTweets();
setInterval(showTweets, 500);

$(".user").on("click", function(e) {
	e.preventDefault();
	console.log(this.text);
});

});