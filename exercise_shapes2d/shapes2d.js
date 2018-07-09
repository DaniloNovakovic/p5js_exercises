function setup() {
    createCanvas(340, 400);
}

const lineSize = 40;

function draw() {
    background(255, 255, 0);

    var x = 0.0,
        y = 0.0;

    stroke(255);
    line(x, y, x + lineSize, y + lineSize);
    x += lineSize;
    y += lineSize;
    stroke(0);

    fill(255, 200, 20);
    rect(x, y, 40, 60); // x, y, width, height
    x += 40, y += 60;

    stroke(200);
    line(x, y, x + lineSize, y + lineSize);
    x += lineSize;
    y += lineSize;
    stroke(0);

    fill(20, 255, 20);
    x += Math.sin(Math.PI / 4) * lineSize;
    y += Math.cos(Math.PI / 4) * lineSize;
    ellipse(x, y, lineSize * 2, lineSize * 2);
    x += Math.sin(Math.PI / 4) * lineSize;
    y += Math.cos(Math.PI / 4) * lineSize;

    stroke(100);
    line(x, y, x + lineSize, y + lineSize);
    x += lineSize;
    y += lineSize;
    stroke(0);

    fill(180);
    triangle(x, y,
        x - Math.sin(Math.PI / 6) * lineSize,
        y + Math.cos(Math.PI / 6) * lineSize,
        x + Math.sin(Math.PI / 6) * lineSize,
        y + Math.cos(Math.PI / 6) * lineSize);
    x += Math.sin(Math.PI / 6) * lineSize;
    y += Math.cos(Math.PI / 6) * lineSize;

    stroke(0);
    line(x, y, x + lineSize, y + lineSize);
    x += lineSize;
    y += lineSize;
    stroke(0);

    fill(100, 150, 11);
    arc(x, y, lineSize * 2, lineSize * 2, -Math.PI / 3, PI / 2 + PI / 3.1, PIE);

    fill(255, 150, 195);
    var quadLineSize = lineSize * 3;
    quad(0, height - 5,
        quadLineSize, height - 5,
        0, height - quadLineSize,
        quadLineSize, height - quadLineSize);
}