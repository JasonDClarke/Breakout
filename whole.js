var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var wallProto = {
    Left: 0,
    Right: canvas.width,
    Top: 0,
    Bottom: canvas.height
}

var ballProto = {
    Radius: 10,
    X: canvas.width / 2,
    Y: canvas.height - 30, //start point of ball
    dx: 2,
    dy: -2 // motion of ball per frame
};

var paddleProto = {
    Speed: 3, //max keyboard speed
    Height: 40,
    Width: 40,
    X: (canvas.width - 40) / 2,
    Y: (canvas.height - 40) / 2//starting point of paddle
}

var blockInfo = {
    RowCount: 4,
    ColumnCount: 4,
    Padding: 10,
    OffsetTop: 30,
    OffsetLeft: 30,        
    };

var bricks = [];
    for (var c = 0; c < blockInfo.ColumnCount; c++) {
        bricks[c] = [];
        for (var r = 0; r < blockInfo.RowCount; r++) {
                bricks[c][r] = {
                X: 0,
                Y: 0,
                status: 1
        };
    }
}

var blockProto = { 
        Width: ((canvas.width - 2 * blockInfo.OffsetLeft) / blockInfo.RowCount) - blockInfo.Padding,
        Height: ((canvas.height - 2 * blockInfo.OffsetTop) / blockInfo.ColumnCount / 3) - blockInfo.Padding
};


var wall = Object.create(wallProto);
var ball = Object.create(ballProto);
// var ball2 = Object.create(ballProto);
// ball2.dx =-2;
var paddle = Object.create(paddleProto);
var block = Object.create(blockProto);
alert(paddle.X);
 ///////////////////////////////////////////////////
 //////////////////////////////////////////////////

var playerProto = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  rightPressed: false,
  upPressed: false,
  leftPressed: false,
  downPressed: false
}

var player1 = Object.create(playerProto);
// object.create(player2);
// player2.left = 65;
// player2.up = 87;
// player2.right = 83;
// player2.down = 68;




function keyDownHandler(e) { //p is player
  if (e.keyCode == player1.left) {
    player1.leftPressed = true;
  }
  if (e.keyCode == player1.up) {
    player1.upPressed = true;
  }
  if (e.keyCode == player1.right) {
    player1.rightPressed = true;
  }
  if (e.keyCode == player1.down) {
    player1.downPressed = true;
  }
}

function keyUpHandler(e) { 
  if (e.keyCode == player1.left) {
    player1.leftPressed = false;
  }
  if (e.keyCode == player1.up) {
    player1.upPressed = false;
  } 
  if (e.keyCode == player1.right) {
    player1.rightPressed = false;
  }
  if (e.keyCode == player1.down) {
    player1.downPressed = false;
  }
}


function keyboardPaddleControl(p) {
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
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

/////////////////////////////////////
////////////////////////////////////////
// need to replace with object values
var delta = 10; // mgin of error for collisions
var shift = 5; // how much ball shifts after collision
var score = 0;
var lives = 3;




function drawBricks(bricks) {
  for (var c = 0; c < blockInfo.ColumnCount; c++) {
    for (var r = 0; r < blockInfo.RowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (r * (block.Width + blockInfo.Padding)) + blockInfo.OffsetLeft;
        var brickY = (c * (block.Height + blockInfo.Padding)) + blockInfo.OffsetTop;
        bricks[c][r].X = brickX;
        bricks[c][r].Y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, block.Width, block.Height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall(ball) {
  ctx.beginPath();
  ctx.arc(ball.X, ball.Y, ball.Radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(paddle) {
  ctx.beginPath();
  ctx.rect(paddle.X, paddle.Y, paddle.Width, paddle.Height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawScore(score) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives(lives) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function bricksBallCollisionDetection(bricks, ball) {
  for (c = 0; c < blockInfo.ColumnCount; c++) {
    for (r = 0; r < blockInfo.RowCount; r++) {
      var brick = bricks[c][r];
      handleBrickCollision(brick, brickBallCollisionOutcome);
    }
  }
}

	function handleBrickCollision(brick, outcome) {
  if (brick.status == 1) {
    if (ball.X > brick.X && ball.X < brick.X + block.Width && ball.Y > brick.Y && ball.Y < brick.Y + block.Height) {
      outcome(brick);
    }
  }
}

	function brickBallCollisionOutcome(brick) {
  brick.status = 0;
  ball.dy = -ball.dy;
  score++;
  checkWin();
}

	function checkWin() {
  if (score == blockInfo.RowCount * blockInfo.ColumnCount) {
    //alert("YOU WIN, CONGRATS!");
    gameOver();
  }
}

function ballWallCollisionDetection(ball, wall) {
  if (ball.X + ball.dx > wall.Right - ball.Radius) {
    ball.dx = -Math.abs(ball.dx);
    ball.X = ball.X - shift;
  }
  if (ball.X + ball.dx < wall.Left + ball.Radius) {
    ball.dx = Math.abs(ball.dx);
    ball.X = ball.X + shift;
  }
  if (ball.Y + ball.dy < wall.Top + ball.Radius) {
    ball.dy = -ball.dy;
    ball.Y = ball.Y + shift;
  }
  if (ball.Y + ball.dy > wall.Bottom - ball.Radius) {
      lives--;
      handleLostLife(); 
  }
}

	function handleLostLife() {
  if (!lives) {
    //alert("You Lose!);
    gameOver();
  } else {
    newLife();
  }
}

	function gameOver() {
  newLife();
  lives = 3;
  score = 0;
  for (c = 0; c < blockInfo.ColumnCount; c++) {
    for (r = 0; r < blockInfo.RowCount; r++) {
      bricks[c][r].status = 1;
    }
  }
}

	function newLife() {
  ball.X = canvas.width / 2;
  ball.Y = canvas.height - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddle.X = (canvas.width - paddle.Width) / 2;
}

function ballPaddleCollisionDetection(ball, paddle) {
  topCollisionDetection(ball, paddle);
  bottomCollisionDetection(ball, paddle);
  leftCollisionDetection(ball, paddle);
  rightCollisionDetection(ball, paddle);
}

  function topCollisionDetection(ball, paddle) {
    if (ball.Y + ball.Radius > paddle.Y - delta && ball.Y + ball.Radius < paddle.Y && ball.X > paddle.X - delta && ball.X < paddle.X + paddle.Width + delta) {
      ball.dy = -Math.abs(ball.dy);
      ball.Y = ball.Y - shift;
    }
  }

  function bottomCollisionDetection(ball, paddle) {
    if (ball.Y - ball.Radius < paddle.Y + paddle.Height + delta && ball.Y - ball.Radius > paddle.Y + paddle.Height && ball.X > paddle.X - delta && ball.X < paddle.X + paddle.Width + delta) {
      ball.dy = Math.abs(ball.dy);
      ball.Y = ball.Y + shift;
    }
  }

  function leftCollisionDetection(ball, paddle) {
    if (ball.Y > paddle.Y - delta && ball.Y < paddle.Y + paddle.Height + delta && ball.X + ball.Radius > paddle.X - delta && ball.X + ball.Radius < paddle.X) {
      ball.dx = -Math.abs(ball.dx);
      ball.X = ball.X - shift;
    }
  }

  function rightCollisionDetection(ball, paddle) {
    if (ball.Y > paddle.Y - delta && ball.Y < paddle.Y + paddle.Height + delta && ball.X - ball.Radius > paddle.X + paddle.Width && ball.X - ball.Radius < paddle.X + paddle.Width + delta) {
      ball.dx = Math.abs(ball.dx);
      ball.X = ball.X + shift;
    }
  }

(function step() { //includes everything that happens every frame
  (function collisionDetection() {
  bricksBallCollisionDetection(bricks, ball);
  ballWallCollisionDetection(ball, wall);
  ballPaddleCollisionDetection(ball, paddle);
  }());

  (function objectUpdate() {
  ball.X += ball.dx;
  ball.Y += ball.dy;
  }());
    
  keyboardPaddleControl(player1);
    
  (function step() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks(bricks);
  drawBall(ball);
  drawPaddle(paddle);
  drawScore(score);
  drawLives(lives);
  }()); //look at how there is a new namespace!
    

  requestAnimationFrame(step);
}());



