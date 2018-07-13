let balls = [];
let copyOnHit = false;
let resizeCopy = false;
let colorsOn = false;
let maxBalls = 500;
let maxBallSize = 35;
let minBallSize = 1;
let xSpeedMin = 2;
let xSpeedMax = 7;
let ySpeedMin = 2;
let ySpeedMax = 7;

let nBallsInput;
let maxBallsInput;

function setup() {
    createCanvas(600, 400);
    let nBalls = 1;
    createBalls(nBalls);

    let para = createP('Number of balls: ');
    nBallsInput = createInput('1', 'number');
    nBallsInput.parent(para);
    nBallsInput.size(40);

    let para2 = createP('Max number of balls: ');
    para2.parent(para);
    maxBallsInput = createInput(maxBalls, 'number');
    maxBallsInput.parent(para2);
    maxBallsInput.size(40);

    let resetBtn = createButton('Reset');
    resetBtn.parent(para);
    resetBtn.style('margin-left', '10px');
    resetBtn.mouseClicked(resetBtnClicked);

    let checkbox = createCheckbox('Enable colors ', false);
    checkbox.changed(checkboxColorsEnabled);
    checkbox = createCheckbox('Copy on hit', false);
    checkbox.changed(checkboxCopyOnHitEnabled);
    checkbox = createCheckbox('Resize copy', false);
    checkbox.changed(checkboxResizeCopy);
}

function checkboxResizeCopy() {
    resizeCopy = this.checked();
}

function checkboxCopyOnHitEnabled() {
    copyOnHit = this.checked();
}

function checkboxColorsEnabled() {
    colorsOn = this.checked();
}

function resetBtnClicked() {
    maxBalls = maxBallsInput.value();
    if (maxBalls < 0) {
        maxBalls = 0;
    }
    let nBalls = nBallsInput.value();
    if (nBalls < 0) {
        nBalls = 0;
    } else if (nBalls > maxBalls) {
        nBalls = maxBalls;
    }
    createBalls(nBalls);
}

function draw() {
    background(0);
    let n = balls.length;
    for (let i = 0; i < n; ++i) {
        balls[i].show();
        balls[i].bounce();
        balls[i].move();
    }
}

function createBalls(nBalls) {
    balls.length = 0;
    for (let i = 0; i < nBalls; ++i) {
        balls.push(new Ball(width / 2, height / 2, random(minBallSize, maxBallSize)));
    }
}
class Color {
    constructor(r = 255, g = 255, b = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    setRandCol() {
        if (colorsOn == false) {
            let val = random(150, 255);
            this.r = val;
            this.g = val;
            this.b = val;
        } else {
            this.r = random(0, 255);
            this.g = random(0, 255);
            this.b = random(0, 255);
        }
    }
}

class Ball {
    constructor(x = 0, y = 0, diameter = 20, col = new Color(255, 255, 255)) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.col = col;
        this.xspeed = 4;
        this.yspeed = 4;
        this.setRandTransparency();
        this.isWallHit = false;
    }

    show() {
        noStroke();
        fill(this.col.r, this.col.g, this.col.b, this.transparency);
        ellipse(this.x, this.y, this.diameter);
    }
    bounce() {
        if (this.y + this.diameter / 2 >= height || this.y - this.diameter / 2 <= 0 ||
            this.x + this.diameter / 2 >= width || this.x - this.diameter / 2 <= 0) {

            // Update current ball direction according to the which wall it hit
            if (this.y + this.diameter / 2 >= height) {
                this.yspeed = Math.abs(random(ySpeedMin, ySpeedMax)) * -1;
            } else if (this.y - this.diameter / 2 <= 0) {
                this.yspeed = Math.abs(random(ySpeedMin, ySpeedMax));
            }

            if (this.x + this.diameter / 2 >= width) {
                this.xspeed = Math.abs(random(xSpeedMin, xSpeedMax)) * -1;
            } else if (this.x - this.diameter / 2 <= 0) {
                this.xspeed = Math.abs(random(xSpeedMin, xSpeedMax));
            }

            if (this.isWallHit == false) {
                this.isWallHit = true;

                // Make a new copy of the ball and move it away from the edge
                if (copyOnHit && balls.length < maxBalls) {
                    let currBall = this.copy();
                    currBall.col.setRandCol();
                    let xval = this.xspeed > 0 ? 1 : -1;
                    let yval = this.yspeed > 0 ? 1 : -1;
                    currBall.x += currBall.diameter / 2 * xval;
                    currBall.y += currBall.diameter / 2 * yval;
                    balls.push(currBall);
                }
                this.col.setRandCol();
                this.setRandTransparency();
            }
        } else {
            this.isWallHit = false;
        }
    }
    move() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
    setRandTransparency() {
        this.transparency = random(20, 255);
    }
    copy() {
        let col = new Color(this.col.r, this.col.g, this.col.b);
        let value = resizeCopy == true ? random(minBallSize, maxBallSize) : this.diameter;
        let retBall = new Ball(this.x, this.y, value, col, this.moveLeft, this.moveUp);
        retBall.xspeed = this.xspeed;
        retBall.yspeed = this.yspeed;
        retBall.xSpeedM = this.xSpeedM;
        retBall.xSpeedM = this.xSpeedM;
        retBall.ySpeedM = this.ySpeedM;
        retBall.ySpeedM = this.ySpeedM;
        retBall.isWallHit = this.isWallHit;
        retBall.setRandTransparency();
        return retBall;
    }
}
