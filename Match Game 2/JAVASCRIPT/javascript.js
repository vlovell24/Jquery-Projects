const gameColors = ['primary', 'success', 'danger', 'warning'];
let gameClicks = [];
let userClicks = [];
let inPlay = false;
let playNum = 1;
//runs the player function when the button is clicked.
$("button").on("click", function() {
    if (!inPlay) {
        player();
    }
});
//Adds an on click event handler to the four 'colored' boxes
$(".box").on("click",function(e){
    checkAnswer(e);
});
//hides the button, changes the message, clears gameClicks and userClicks, and runs the
//runSequence function.
function player() {
    $("button").hide();
    $("h4").text('Match the Pattern');
    gameClicks = [];
    userClicks = [];
    runSequence(playNum);
}
//pushes a random color into the empty gameClicks array. That random color is displayed to the player via a
//timeout function that sets the opacity from .5 to 1; for half a second. Another timeout is used to create
//a tenth of a second delay between the colors being shown. The 'computer' will randomly choose numbers based on
//the value of playNum. Once playNum reaches zero, the turn will shift to the player.
function runSequence(playNum) {
    let squares = $("div").find(".box");
    playNum--;
    if (playNum < 0) {
        inPlay = true;
        return;
    }else {

        let randomNum = Math.floor(Math.random() * gameColors.length);
        gameClicks.push(gameColors[randomNum]);
        squares[randomNum].style.opacity = "1";
        setTimeout(function () {
            squares[randomNum].style.opacity = "0.5";
            setTimeout(function () {
                runSequence(playNum);
            }, 100)
        }, 500);
    }
}
//stores the player clicks (on each colored box) into an array called userClicks. Sets the opacity to 1, when the
//player clicks on a square, for a half of a second. Continues to allow the player to click on squares, until
//playerClicks length is equal to gameClicks length. Once they are equal, inPlay is changed to false, and the
//endGame function is ran.
function checkAnswer(e) {
    if (inPlay) {
        let el = e.target.id;
        let newEl = e.target;
        userClicks.push(el);
        newEl.style.opacity = "1";
        setTimeout(function() {
            newEl.style.opacity = "0.5";
        }, 500);
        if (userClicks.length == gameClicks.length) {
            inPlay = false;
            endGame();
        }
    }
}
//compares the string values of the userClicks array to the gameClicks array. If they are equal, playNum is increased
//by one (allowing the rounds to get progressively harder), and updates the message to 'correct'. If the player and
//game arrays are not equal, the message is changed to 'not correct' and playNum is not updated by one. This allows
//the player to try the round again.
function endGame() {
    $("button").show();
    if (userClicks.toString() == gameClicks.toString()) {
        playNum++;
        $("h4").text('Correct');
    }else {
        $("h4").text('Not Correct; try again!');
    }
}
