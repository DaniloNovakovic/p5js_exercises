function setup() {
    createCanvas(600, 400);
    background(0);
    stroke(255);
}

function draw() {

}
var drawEnabled = false;

var ellipseWidth = 20,
    ellipseHeight = 20;

var lastPosX = 0,
    lastPosY = 0;

function mousePressed() {
    drawEnabled = true;
    lastPosX = mouseX;
    lastPosY = mouseY;
}

function mouseDragged() {
    if (drawEnabled) {
        stroke(random(0, 255), random(0, 255), random(0, 255));
        line(lastPosX, lastPosY, mouseX, mouseY);
        lastPosX = mouseX;
        lastPosY = mouseY;

        fill(random(0, 255), random(0, 255), random(0, 255));
        ellipse(mouseX, mouseY, ellipseWidth, ellipseHeight);
    }
}

function mouseClicked() {
    fill(random(0, 255), random(0, 255), random(0, 255));
    ellipse(mouseX, mouseY, ellipseWidth, ellipseHeight);
}

function mouseReleased() {
    drawEnabled = false;
}
