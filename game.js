
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false;
var level = 0;

$(document).keypress(function(){
    if (start === false) {
        start = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

$(document).click(function(){
    if (start === false) {
        start = true;
        $("#level-title").text("Level " + level);
        nextSequence();
    }
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level += 1;
    $("#level-title").text("Level " + level);
    console.log(gamePattern);
}

$(".btn").click(function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function playSound(colour) {
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {
       $("." + currentColour).removeClass("pressed");
   }, 100);
    console.log(currentColour);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (currentLevel + 1 === level) {
            console.log("complete");
            setTimeout(function() {
               nextSequence();
           }, 1000);
           userClickedPattern = [];
        }
    }   else {
        console.log("wrong");
        startOver();
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
           $("body").removeClass("game-over");
       }, 200);
       $("#level-title").text("Game Over, Press Any Key to Restart");
    }
    // console.log("user: " + userClickedPattern);
    // console.log("game: " + gamePattern);
    // console.log((userClickedPattern.toString() == gamePattern.toString()));
    // if (userClickedPattern.toString() == gamePattern.toString()) {
    //     console.log("success");
    // }   else {
    //     console.log("wrong");
    // }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    start = false;
}
