var col = {
    r: 255,
    g: 255,
    b: 255
};

var ball = {
    x: 0,
    y: 0,
    diameter: 50,
    xspeed: 4,
    yspeed: 4,
    moveLeft: true,
    moveUp: true
};

var xSpeedMin = 2,
    xSpeedMax = 7,
    ySpeedMin = 2,
    ySpeedMax = 7;

function setup() {
    createCanvas(400, 300);
    ball.x = width / 2;
    ball.y = height / 2;
}

function draw() {
    background(0);
    display(ball, col);
    bounce(ball, col);
    move(ball);
}

function display(argBall, argCol) {
    stroke(argCol.r, argCol.g, argCol.b);
    strokeWeight(4);
    noFill();
    ellipse(argBall.x, argBall.y, argBall.diameter);
}

function bounce(argBall, argCol) {
    // Bounce left/right
    if (argBall.x + argBall.diameter / 2 >= width) {
        argBall.moveLeft = true;
        argBall.xspeed = random(xSpeedMin, xSpeedMax);
        setRandCol(argCol);
    } else if (ball.x - ball.diameter / 2 <= 0) {
        argBall.moveLeft = false;
        argBall.xspeed = random(xSpeedMin, xSpeedMax);
        setRandCol(argCol);
    }

    // Bounce up/down
    if (argBall.y + argBall.diameter / 2 >= height) {
        argBall.moveUp = true;
        argBall.yspeed = random(ySpeedMin, ySpeedMax);
        setRandCol(argCol);
    } else if (ball.y - ball.diameter / 2 <= 0) {
        argBall.moveUp = false;
        argBall.yspeed = random(ySpeedMin, ySpeedMax);
        setRandCol(argCol);
    }
}

function setRandCol(argCol) {
    argCol.r = random(0, 255);
    argCol.g = random(0, 255);
    argCol.b = random(0, 255);
}

function move(argBall) {
    if (argBall.moveLeft) {
        argBall.x -= argBall.xspeed;
    } else {
        argBall.x += argBall.xspeed;
    }

    if (argBall.moveUp) {
        argBall.y -= argBall.yspeed;
    } else {
        argBall.y += argBall.yspeed;
    }
}
