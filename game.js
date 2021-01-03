var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
$('.start').click(function(e) {
  if (!started) {
    $('h1').text("Level " + level);
    nextSequence();
    started = true;
    $(".start").addClass('desabled');
  }
})

$('.btn').click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})

var answer;

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  level++;
  $('h1').text("Level " + level);
    setTimeout(function() {
      nextSequence();
    }, 1000)
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Your Level was "+level);
    $(".start").text("Restart");
    $(".start").removeClass("desabled");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100)
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
