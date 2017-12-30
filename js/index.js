var red = "red";
var lred = "#ff5c5c";
var blue = "blue";
var lblue = "#4a74a6";
var green = "green";
var lgreen = "#60ff60";
var yellow = "yellow";
var lyellow = "#e0de66";
var colors = ["#4a74a6", "#e0de66", "#60ff60", "#FF5c5c", "blue", "yellow", "green", "red"];

var sounds = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];

var simon = [];
var player = [];
var playerTurn = false;
var score = 0;
var strictMode = false;

var CENTERX = 125;
var CENTERY = 125;
var GAME_RADIUS = 80;
var BORDER_RADIUS = 5;
var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var rect = canvas.getBoundingClientRect();
ctx.strokeStyle = "blue";
ctx.fillStyle = "blue";
drawCircle(CENTERX, CENTERY, GAME_RADIUS + BORDER_RADIUS,0,Math.PI * 2, "grey");
drawCircle(CENTERX, CENTERY, GAME_RADIUS ,0,Math.PI / 2, lblue);
drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI / 2,Math.PI, lyellow);
drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI,Math.PI * 3/2, lgreen);
drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI * 3/2,Math.PI * 2, lred);


window.addEventListener('mousedown', function (e){
  if (playerTurn == true) {
    var x = e.clientX - rect.left - 10;
    var y = e.clientY - rect.top - 10; 
    var dist = Math.sqrt((x-125)*(x-125) + (y-125)*(y-125));
    if (dist <= GAME_RADIUS){
      var up = (y < 125);
      var left = (x < 125);
      if (up && left){
        drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI,Math.PI * 3/2, green);
        clicked(2);
      }else if (up && !left){
        drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI * 3/2,Math.PI * 2, red);
        clicked(3);
      }else if (!up && left){
        drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI / 2,Math.PI, yellow);
        clicked(1);
      }else if (!up && !left){
        drawCircle(CENTERX, CENTERY, GAME_RADIUS ,0,Math.PI / 2, blue);
        clicked(0);
      }
    }
  }
});


window.addEventListener('mouseup', function(e){
  drawCircle(CENTERX, CENTERY, GAME_RADIUS ,0,Math.PI / 2, lblue);
  drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI / 2,Math.PI, lyellow);
  drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI,Math.PI * 3/2, lgreen);
  drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI * 3/2,Math.PI * 2, lred);
});

function drawCircle (x,y,rad,start,end, color){
  ctx.fillStyle = color;
  ctx.beginPath()
  ctx.arc(x,y,rad,start,end);
  ctx.lineTo(x,y);
  ctx.fill();
}

function startGame(){
  document.getElementById("score").innerHTML = "Score: 0";
  simon = [];
  player = [];
  score = 0;
  playerTurn = false;
  simonSays();
  
}

function simonSays(){
  simon.push(Math.floor(Math.random() * 4));
  player = [];
  blink(0);
}

function blink(count){
  setTimeout(function (){
    drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI /2 * simon[count],Math.PI /2 * (simon[count] + 1), colors[simon[count] + 4]);
    var audio = new Audio(sounds[simon[count]]);
    audio.play();
  }, 500);
  setTimeout(function (){
    drawCircle(CENTERX, CENTERY, GAME_RADIUS ,Math.PI /2 * simon[count],Math.PI /2 * (simon[count] + 1), colors[simon[count]] );
    if(count + 1 < simon.length){
      blink(count + 1);
    }else{
      playerTurn = true;
    }
  }, 1000);
}

function clicked (num){
  if (playerTurn == true){
    if (simon[player.length] == num){
      var audio = new Audio(sounds[num]);
    audio.play();
      player.push(num);
      document.getElementById("score").innerHTML = "Score: " + score;
      if(simon.length == player.length){
        score ++;
        document.getElementById("score").innerHTML = "Score: " + score;
        if (score >= 20){
          document.getElementById("score").innerHTML = "You Win! Score: " + score + " Can you keep going?";
        }
        playerTurn = false;
        simonSays();
      }
    }else{
      if(strictMode){
        document.getElementById("score").innerHTML = "Game Over. Score: " + score;
        simon = [];
        player = [];
        score = 0;
        playerTurn = false;
      }else{
        playerTurn = false;
        player = [];
        document.getElementById("score").innerHTML = "Try Again. Score: " + score;
        blink(0);
      }
    }
  }
}

function strict (){
  strictMode = !strictMode;
  if(strictMode){
    document.getElementById("strict").innerHTML = "Strict Mode: ON";
  }else{
    document.getElementById("strict").innerHTML = "Strict Mode: OFF";
  }
}