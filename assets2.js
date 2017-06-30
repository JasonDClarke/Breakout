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
var block = Object.create(blockProto);

var ball = Object.create(ballProto);
var ball2 = Object.create(ballProto);
ball2.dx =-2;
var ball3 = Object.create(ballProto);
ball3.X = 0;
var balls = [ball, ball2, ball3];