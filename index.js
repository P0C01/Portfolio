$("document").ready(function(){
//arrays
let level="Level 0"
let levelNumber=0;

 let gamePattern=[];
 let userClickPattern=[];
 const buttonColors=["red","blue","green","yellow"];

 let started=false;
 

 $(document).keypress(function(){
  
   if(started===false){
   nextSequence();
   started=true;
   }
 })
  
//user button click handler
  $(".btn").click(function(){
   let userChosenColor=$(this).attr("id");
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    pressed(userChosenColor);
  checkSequence(userClickPattern.length-1);

  });

  function checkSequence(index){
    if(userClickPattern[index] === gamePattern[index]){
      if(userClickPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
        
      },1000);
     
    }
  }
    else{
      $("#level-title").text("you Lose press any key to play again");
      lose();
      startOver();
    }
  }

//sequence function
  function nextSequence(){
    userClickPattern=[];
//set Level
levelNumber++;
level="Level "+levelNumber;

$("#level-title").text(level);
 //generating random number
 let randomNumber=Math.random()*4;
 randomNumber=Math.floor(randomNumber);
 
  //creating a random color and push it to game pattern
 randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
 $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
 //play sound and pressed animation
    playSound(randomChosenColor);
    pressed(randomChosenColor);
  }


  //sound function
  function playSound(sound){
    var audio=new Audio("sounds/"+sound+".mp3");
 audio.play();
  }

//press animation function
  function pressed(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
      $("#"+color).removeClass("pressed");
    },100);
  }

  //Lost animation

  function lose(){
    $("body").addClass("game-over");
    let gameoverAudio=new Audio("sounds/wrong.mp3");
    gameoverAudio.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
  }

 
  //startover function
function startOver(){
  started=false;
  levelNumber=0;

  gamePattern=[];
  userClickPattern=[];
}

})
