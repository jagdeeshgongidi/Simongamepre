var array=["red","blue","green","yellow"];
var game_pattern= [] ;
var userClickedPattern = [] ;
var level = 0;
var started = false;
$(document).keypress(function(){
  if (!started){
    $("#level-title").text("level "+level);
    nextSequence();
    started=true;
  }
});
$(".start1").click(function(){
  if(!started){
    $("#level-title").text("level"+level);
    nextSequence();
    started=true;
  }
});
/* detecting button clicks */
$(".btn").click(function(){
  var user_choosencolor = $(this).attr('id');
  userClickedPattern.push(user_choosencolor);
  playsound(user_choosencolor);
  animatepress(user_choosencolor);
  checkanswer(userClickedPattern.length-1);
});
function checkanswer(currentlevel){
  if (game_pattern[currentlevel] === userClickedPattern[currentlevel]){
    console.log("success!");
    if (userClickedPattern.length === game_pattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
     console.log("wrong!"); 
     var audio = new Audio("sounds/wrong.mp3");
     audio.play();
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over");
      }, 200);
    $("h1").text("game over press any key to restart!")
    startover();

  }
}
function nextSequence(){
    
    userClickedPattern =[];
    level++;
    $("#level-title").text("level "+level);
  	var random_number=(Math.random()*4);
  	random_number= Math.floor(random_number);
  	var random_choosencolor=array[random_number];
  	var audio=new Audio("sounds/"+random_choosencolor+".mp3");
  	audio.play();
  	game_pattern.push(random_choosencolor);
  	useranime(random_choosencolor);
};
function playsound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
};
$("h1").click(function(){
  $("h1").css("color","pink");
});

function useranime
(user_choosencolor){
  $("."+user_choosencolor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
};
function animatepress(currentcolor){
  $("#" + currentcolor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentcolor).removeClass("pressed");
  }, 100);
}
function startover(){
  level=0;
  game_pattern=[];
  started=false;
}
