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
      handleBrickBallCollision(brick, ball, brickBallCollisionOutcome);
    }
  }
}

	function handleBrickBallCollision(brick, ball, outcome) {
  if (brick.status == 1) {
    if (ball.X > brick.X && ball.X < brick.X + block.Width && ball.Y > brick.Y && ball.Y < brick.Y + block.Height) {
      outcome(brick, ball);
    }
  }
}

	function brickBallCollisionOutcome(brick, ball) {
  brick.status = 0;
  ball.dy = -ball.dy;
  score++;
  checkWin();
}

	function checkWin() {
  if (score == blockInfo.RowCount * blockInfo.ColumnCount) {
    //alert("YOU WIN, CONGRATS!");
    for (c = 0; c < blockInfo.ColumnCount; c++) {
      for (r = 0; r < blockInfo.RowCount; r++) {
        bricks[c][r].status = 1;
      }
    }
  }
}

function ballWallCollisionDetection(ball, wall) {
  if (ball.X + ball.dx > wall.Right - ball.Radius) {
    ball.dx = -Math.abs(ball.dx);
    ball.X -= shift;
  }
  if (ball.X + ball.dx < wall.Left + ball.Radius) {
    ball.dx = Math.abs(ball.dx);
    ball.X += shift;
  }
  if (ball.Y + ball.dy < wall.Top + ball.Radius) {
    ball.dy = -ball.dy;
    ball.Y += shift;
  }
  if (ball.Y + ball.dy > wall.Bottom - ball.Radius) {
    ball.dy = -ball.dy;
    ball.Y -= shift; //for testing
//handlelost lifes
  }
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
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  
  players.forEach(function(player) {
    balls.forEach(function(ball) {
  ballPaddleCollisionDetection(ball, player.paddle);
    });
  keyboardPaddleControl(player, player.paddle);
  drawPaddle(player.paddle);
  });

  balls.forEach(function(ball) {
  ball.X += ball.dx;
  ball.Y += ball.dy;
  drawBall(ball);
  bricksBallCollisionDetection(bricks, ball);
  ballWallCollisionDetection(ball, wall);
  });

  
  drawBricks(bricks);

  drawScore(score);
  drawLives(lives);

    

  requestAnimationFrame(step);
}());


