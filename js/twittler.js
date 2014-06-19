$(document).ready(function() {
var initialTime = moment().subtract('s', 1); //create new moment Date of now() minus one second so first tweets show up correctly.
var tweetIndex = 0; //Keeps track of how many tweets are currently in the list, when unfiltered
var isFiltered = false;
var intervalId;

var showAllTweets = function() {
	var tweetCount = streams.home.length - 1;  //Pulls new tweet length
	while (tweetCount >= tweetIndex) {
	  var tweet = streams.home[tweetIndex];
	  var $tweet = $("<div></div>").addClass("tweet");

	  //Concatenate tweet
	  $tweet.append('<a href="#" class="user">@' + tweet.user + '</a>: ' + tweet.message + '<time class="time"> - ' + initialTime.from(moment(tweet.created_at))+ '</time>');
		$tweet.prependTo($(".tweets"));

	  //Increment tweet counter
	  tweetIndex++;
	}
};

var showFilteredTweets = function (user) {
	var userArray = streams.users[user];
	var tweetCount = userArray.length - 1;
	while (tweetCount >= tweetIndex) {
	  var tweet = userArray[tweetIndex];
	  var $tweet = $("<div></div>").addClass("tweet");

	  //Concatenate tweet
	  $tweet.append('<a href="#" class="user">@' + tweet.user + '</a>: ' + tweet.message + '<time class="time"> - ' + initialTime.from(moment(tweet.created_at))+ '</time>');
		$tweet.prependTo($(".tweets"));

	  //Increment tweet counter
	  tweetIndex++;
	}
};

var activate = function(filter) {
	//Initialize body
	$(".tweets").text("");
	clearInterval(intervalId); //Remove previous id
	tweetIndex = 0;

	intervalId = isFiltered ? setInterval(function() { return showFilteredTweets(filter) }, 500) : setInterval(showAllTweets, 500);
};

showAllTweets();
activate();

$(".tweets").on("click", "a", function(e) { //Have to delegate event since users are added dynamically
	e.preventDefault();
	var filter = this.text.slice(1); //Remove @ from username
	isFiltered = true;
	activate(filter);
});

$(".logo").on("click", function(e) { //Have to delegate event since users are added dynamically
	e.preventDefault();
	isFiltered = false;
	activate();
});

});















