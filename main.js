let tweetsAreRendering = true;
let tweetsAreRefreshing = true;

$(document).ready(function () {
  refreshTweets();
  applyOnClickEffects()
  window.setInterval(function () {
    refreshTweets();
  }, 5000);
});

function refreshTweets() {
  if (tweetsAreRefreshing) {
    $("div.tweets").remove();
    for (tweet in streams.home) {
      renderTweet(streams.home[tweet]);
    }
    applyOnClickEffects()
  }
}

function applyOnClickEffects() {
  $("div.users").on("click", function (e) {
    var user = $(e.target).text();
    loadTimeline(user.slice(1));
  });

  $("div.header").on("click", function (e) {
    tweetsAreRefreshing = true;
    refreshTweets();
  });
}

function loadTimeline(user) {
  tweetsAreRefreshing = false;
  $("div.tweets").remove();
  for (tweet in streams.home) {
    if (streams.home[tweet].user === user) {
      renderTweet(streams.home[tweet]);
    }
  }
}

function renderTweet(tweet) {
  if (tweetsAreRendering) {
    var $tweet = $("<div class='tweets'></div>");
    var $user = $("<div class='users'></div>");
    $user.text("@" + tweet.user);
    $tweet.text(
      " twitted '" +
      tweet.message +
      "' " +
      moment(tweet.created_at).fromNow()
    );
    $user.prependTo($tweet);
    return $tweet.prependTo($(".tweetsWrapper"));
  }
}