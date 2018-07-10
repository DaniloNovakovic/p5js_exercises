function setup() {
    createCanvas(500, 400);
    background(200, 200, 0);
    stroke(255);
}

function draw() {

}
var drawEnabled = false;

var ellipseWidth = 1,
    ellipseHeight = 1;

var lastPosX = 0,
    lastPosY = 0;

function mousePressed() {
    drawEnabled = true;
    lastPosX = mouseX;
    lastPosY = mouseY;
}

function mouseDragged() {
    if (drawEnabled) {
        line(lastPosX, lastPosY, mouseX, mouseY);
        lastPosX = mouseX;
        lastPosY = mouseY;
    }
}

function mouseClicked() {
    ellipse(mouseX, mouseY, ellipseWidth, ellipseHeight);
}

function mouseReleased() {
    drawEnabled = false;
}