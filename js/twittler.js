//TODO: FIX TIME
$(document).ready(function() {
var initialTime = moment().subtract('s', 1); // create new moment Date of now() minus one second so first tweets show up correctly.
var tweetIndex = 0; //Keeps track of how many tweets are currently in the list, when unfiltered
var isFiltered = false;
var intervalId;

var setUser = function(username) {
  window.visitor = username; // TODO: add additional functionality later. maybe additional text box for author.
  if (streams.users[username] === undefined) { streams.users[username] = [] };
};

var getTweets = function(user) {
  return isFiltered ? streams.users[user] : streams.home;
}

var showTweets = function(filter) {
  var tweetList = getTweets(filter);
  var tweetCount = tweetList.length - 1;  // Pulls new tweet length
  while (tweetCount >= tweetIndex) {
    var tweet = tweetList[tweetIndex];
    var $tweet = $("<div></div>").addClass("tweet");

    // Concatenate tweet
    $tweet.append('<a href="#" class="user">@' + tweet.user + '</a>: ' + tweet.message + '<time class="time"> - ' + initialTime.from(moment(tweet.created_at)) + '</time>');
    $tweet.prependTo($(".tweets"));

    // Increment tweet counter
    tweetIndex++;
  }
};

var activate = function(filter) {
  // Initialize body
  $(".tweets").text(""); //Is there a cleaner way to do this?
  clearInterval(intervalId); //Cancels previous setInterval
  tweetIndex = 0;

  // Repeat showTweets
  intervalId = setInterval(function() { return showTweets(filter) }, 500);
};

showTweets();
activate();

// Filter tweets when you click on a usernmae
$(".tweets").on("click", "a", function(e) { // Have to delegate event since users are added dynamically
	e.preventDefault();
	var filter = this.text.slice(1); // Remove @ from username
	$(".show-all").show();
	isFiltered = true;
	activate(filter);
});

// Removes Shows all tweets 
$(".show-all").on("click", "a", function(e) {
	e.preventDefault();  
	$(".show-all").hide();
	isFiltered = false;
	activate();
});

// Submit tweet on button click
$(".send").on("click", function(e) {
	e.preventDefault();

  // Pulls text values
  var username = $(".username").val();
  console.log(username);
  var message = $(".user-input").val();
  
  // Defines default username and removes @ from username if entered
  if (username === "") {
    username = "AverageJoe";
  } else if (username.charAt(0) === "@") {
    username = username.slice(1);
  }
  
  // Throws alert if message is empty, else sends tweet
  if (message === "") {
    alert("You can't just chirp nothing. Chirp your mind!");
  } else {
  setUser(username);
	writeTweet(message);
  $(".user-input").val("");
  }
});

// Allow user to send tweets by pressing 'Enter'
$(".user-input").on("keydown", function(e) {
  if (e.keyCode === 13) $(".send").click();
});

});















