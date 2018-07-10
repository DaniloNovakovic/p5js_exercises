var col = {
    r: 255,
    g: 255,
    b: 255
};

var ball = {
    x: 0,
    y: 0,
    diameter: 50,
    speed: 3,
    moveLeft: true,
    moveUp: true
};

function setup() {
    createCanvas(400, 300);
    ball.x = width / 2;
    ball.y = height / 2;
}

function draw() {
    background(0);
    stroke(col.r, col.g, col.b);
    strokeWeight(4);
    noFill();
    ellipse(ball.x, ball.y, ball.diameter);

    if (ball.x + ball.diameter / 2 >= width) {
        ball.moveLeft = true;
        col.r = random(0, 255);
        col.g = random(0, 255);
        col.b = random(0, 255);
    } else if (ball.x - ball.diameter / 2 <= 0) {
        ball.moveLeft = false;
        col.r = random(0, 255);
        col.g = random(0, 255);
        col.b = random(0, 255);
    }

    if (ball.y + ball.diameter / 2 >= height) {
        ball.moveUp = true;
        col.r = random(0, 255);
        col.g = random(0, 255);
        col.b = random(0, 255);
    } else if (ball.y - ball.diameter / 2 <= 0) {
        ball.moveUp = false;
        col.r = random(0, 255);
        col.g = random(0, 255);
        col.b = random(0, 255);
    }

    if (ball.moveLeft) {
        ball.x -= ball.speed;
    } else {
        ball.x += ball.speed;
    }

    if (ball.moveUp) {
        ball.y -= ball.speed;
    } else {
        ball.y += ball.speed;
    }
}