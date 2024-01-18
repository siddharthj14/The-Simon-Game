var arr1 = [];
var arr2 = [];
var i = 0;
var started = false;

$(document).click(function () {
  if (!started) {
    $(".start").text("Level " + i);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  arr2 = [];
  i++;
  $(".start").text("Level " + i);
  var randomNumber = Math.floor(Math.random() * 4) + 1;
  arr1.push(randomNumber);
  $("#b" + randomNumber)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomNumber);
  bindButtonClick();
  checkAnswer(arr2.length - 1);
}

function checkAnswer(currentLevel) {
  if (arr1[currentLevel] === arr2[currentLevel]) {
    if (arr2.length === arr1.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $(".start").text("Game Over. Tap anywhere to Restart!");

    setTimeout(function () {
      $("body").removeClass("game-over");
      startOver();
    }, 200);
  }
}

function bindButtonClick() {
  $(".box")
    .off()
    .click(function () {
      var userChosenColour = $(this).attr("id")[1];
      arr2.push(parseInt(userChosenColour));
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(arr2.length - 1);
    });
}

function animatePress(x) {
  $("#b" + x).addClass("pressed");
  setTimeout(function () {
    $("#b" + x).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  arr1 = [];
  started = false;
  i = 0;
}
