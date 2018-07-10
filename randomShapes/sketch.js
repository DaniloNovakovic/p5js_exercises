var spot = {
    x: 0,
    y: 0
};
var col = {
    red: 0,
    green: 0,
    blue: 0
}

function setup() {
    createCanvas(400, 300);
    background(col.red, col.green, col.blue);
}

function draw() {
    col.red = map(mouseX, 0, width, 0, 255, true);
    col.green = map(mouseY, 0, height, 0, 255, true);
    col.blue = map(col.red + col.green, 0, 255 + 255, 255, 0, true);

    spot.x = random(0, width);
    spot.y = random(0, height);

    noStroke();
    fill(col.red, col.green, col.blue);
    var idShape = Math.round(random(0, 3));
    switch (idShape) {
        case 1:
            triangle(spot.x, spot.y, spot.x - 10, spot.y + 20, spot.x + 10, spot.y + 20);
            break;
        case 2:
            rect(spot.x, spot.y, 20, 20);
            break;
        default:
            ellipse(spot.x, spot.y, 20, 20);
            break;
    }
}

function mouseClicked() {
    background(col.red, col.green, col.blue);
}