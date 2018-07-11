let bubbles = [];

function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 100; ++i) {
        let x = random(width);
        let y = random(height);
        let r = random(5, 50);
        bubbles[i] = new Bubble(x, y, r);
        bubbles[i].changeColor(0x98, 0xdb, 0xc6, 200);
    }
}

function draw() {
    background(0x5b, 0xc8, 0xac);
    let n = bubbles.length;
    for (let i = 0, j = 0; i < n; ++i) {
        let doesIntersect = false;
        for (j = 0; j < n; ++j) {
            if (i != j && bubbles[j].intersects(bubbles[i])) {
                doesIntersect = true;
                break;
            }
        }
        if (bubbles[i].contains(mouseX, mouseY)) {
            bubbles[i].changeColor(0xf1, 0x8d, 0x9e, 220);
        } else if (doesIntersect) {
            bubbles[i].changeColor(255, 255, 255, 190);
        } else {
            bubbles[i].changeColor(0x98, 0xdb, 0xc6, 200);
        }
        bubbles[i].show();
        bubbles[i].move();
    }
}

function mousePressed() {
    for (let i = bubbles.length - 1; i >= 0; --i) {
        if (bubbles[i].contains(mouseX, mouseY)) {
            bubbles.splice(i, 1);
        }
    }
}

class Color {
    constructor(r = 255, g = 255, b = 255, brightness = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.brightness = brightness;
    }
    setRandColor() {
        this.r = random(0, 255);
        this.g = random(0, 255);
        this.b = random(0, 255);
    }
}
class Bubble {
    constructor(x = 0, y = 0, r = 0) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.col = new Color();
    }
    show() {
        noStroke();
        fill(this.col.r, this.col.g, this.col.b, this.col.brightness);
        ellipse(this.x, this.y, this.r);
    }
    changeColor(r, g, b, brightness = 255) {
        this.col.r = r;
        this.col.g = g;
        this.col.b = b;
        this.col.brightness = brightness;
    }
    intersects(argBubble) {
        let d = dist(this.x, this.y, argBubble.x, argBubble.y);
        return d < (this.r + argBubble.r) / 2;
    }
    contains(x, y) {
        return (dist(x, y, this.x, this.y) < this.r / 2);
    }
    move() {
        this.x += random(-3, 5);
        this.y += random(-5, 1);
        if (this.x < 0) {
            this.x = width;
        } else {
            this.x %= width;
        }
        if (this.y < 0) {
            this.y = height;
        } else {
            this.y %= height;
        }
    }
}
