
var buttonColours = ["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var gameStart = 0;

var level = 0;

// Start Game when user presses "A"
$(this).keypress(function(event) {
  if (gameStart === 0 && event.key.toUpperCase() == "A") {
    gameStart = 1;
    $("h1").text("Level "+level);
    nextSequence();
  } else if (gameStart === 2) {
    gameStart = 1;
    $("h1").text("Level "+level);
    nextSequence();
  }
});

// Button Click event listener
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(parseInt(userClickedPattern.indexOf(userChosenColour)));
});


function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Button Flash Effect
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // Play sound
  playSound(randomChosenColour);

  // level ++
  level ++;
  $("h1").text("Level "+level);

  // reset userClickedPattern
  userClickedPattern = [];
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour) {

    // $("."+currentColour).addClass("pressed").delay(100).queue(function(next){
    //   $(this).removeClass("pressed");
    //   next();
    // });

    $("#"+currentColour).addClass("pressed");

    setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    if (userClickedPattern.length === gamePattern.length) {
      console.log("complete!");
      setTimeout(function() {
        nextSequence();
      },1000);
    }

  } else {
    playSound("wrong");

    $("body").addClass("game-over");

    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = 2;
}
