var buttonColours = ['red', 'blue', 'green', 'yellow'];

var userClickedPattern = [];
var gamePattern = [];

var button = $('div').attr('button');

let level = 0;
let started = false;

$(document).keypress(function() {
   if(!started){
      $('#level-title').text(`level ${level}`);
      nextSequence();
      started = true
   }
});


$('.btn').click(function() {

   var userChosenColour = $(this).attr('id');
   userClickedPattern.push(userChosenColour);

   playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length - 1);
})


function checkAnswer(currentLevel){

   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

      console.log('success');

      if(userClickedPattern.length === gamePattern.length){

         setTimeout(function () {
            nextSequence();
          }, 1000);

      }

   } else {

      console.log('wrong');
      var audio = new Audio(`sounds/wrong.mp3`);
      audio.play();

      $('body').addClass('game-over');

      setTimeout(function () {
         $('body').removeClass('game-over');
      }, 200);


      $('#level-title').text('Game Over, Press Any Key to Restart');
      startOver();

   }

}


function nextSequence() {

   userClickedPattern = [];

   level++;
   $('#level-title').text(`level ${level}`);

   var randomNumber = Math.floor(Math.random() * 4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   flash(randomChosenColour);
   playSound(randomChosenColour);

}


function flash(e){
   $(`#${e}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
} 


function playSound(name) {
   var audio = new Audio(`sounds/${name}.mp3`);
   audio.play();
}


function animatePress(currentColour){
   $(`#${currentColour}`).addClass('pressed');
   setTimeout(function() {
      $(`#${currentColour}`).removeClass('pressed');
   }, 100);
}

function startOver() {
   gamePattern = [];
   level = 0
   started = false;
}