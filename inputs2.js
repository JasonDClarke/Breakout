var canvas = document.getElementById("myCanvas");

var paddleProto = {
    Speed: 3, //max keyboard speed
    Height: 40,
    Width: 40,
    X: (canvas.width - 40) / 2,
    Y: (canvas.height - 40) / 2//starting point of paddle
}
var paddle = Object.create(paddleProto);

var playerProto = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  rightPressed: false,
  upPressed: false,
  leftPressed: false,
  downPressed: false,
  paddle: paddle
}

var player1 = Object.create(playerProto);
var player2 = Object.create(playerProto);
player2.left = 74;
player2.up = 73;
player2.right = 76;
player2.down = 75;
player2.paddle = Object.create(paddleProto);
var player3 = Object.create(playerProto);
player3.left = 65;
player3.up = 87;
player3.right = 68;
player3.down = 83;
player3.paddle = Object.create(paddleProto);
var player4 = Object.create(playerProto);
player4.left = 100;
player4.up = 104;
player4.right = 102;
player4.down = 101;

var players = [player1, player2, player3, player4];



function playerKeyDownHandler(p) {
  var keyDownFn = function keyDownHandler(e) { 
    if (e.keyCode == p.left) {
      p.leftPressed = true;
    }
    if (e.keyCode == p.up) {
      p.upPressed = true;
    }
    if (e.keyCode == p.right) {
      p.rightPressed = true;
    }
    if (e.keyCode == p.down) {
      p.downPressed = true;
    }
  };
  return keyDownFn;
}

function playerKeyUpHandler(p) {
  var keyUpFn = function keyUpHandler(e) { 
    if (e.keyCode == p.left) {
      p.leftPressed = false;
    }
    if (e.keyCode == p.up) {
      p.upPressed = false;
    } 
    if (e.keyCode == p.right) {
      p.rightPressed = false;
    }
    if (e.keyCode == p.down) {
      p.downPressed = false;
    }
  }
  return keyUpFn;
}

function keyboardPaddleControl(p, paddle) {
  if (p.rightPressed && paddle.X < canvas.width - paddle.Width) {
    paddle.X += paddle.Speed;
  }
  if (p.leftPressed && paddle.X > 0) {
    paddle.X -= paddle.Speed;
  }
  if (p.upPressed && paddle.Y > 0) {
    paddle.Y -= paddle.Speed;
  }
  if (p.downPressed && paddle.Y < canvas.height - paddle.Height) {
    paddle.Y += paddle.Speed;
  }
}

players.forEach(function(player) {
document.addEventListener("keydown", playerKeyDownHandler(player), false);
document.addEventListener("keyup", playerKeyUpHandler(player), false);
});
// document.addEventListener("keydown", playerKeyDownHandler(player2), false);
// document.addEventListener("keyup", playerKeyUpHandler(player2), false);