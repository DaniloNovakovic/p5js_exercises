function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.r = vScale;
    this.prevCol = color(255);

    this.update = function () {
        // modify this is you want for shapes to move in different way
        this.y += random(-5, 10);
        this.x += random(-5, 10);

        if (this.x < 0) {
            this.x = width - 1;
        } else if (this.x >= width) {
            this.x = 1;
        }

        if (this.y < 0) {
            this.y = height - 1;
        } else if (this.y >= height) {
            this.y = 1;
        }
    }

    this.show = function () {
        noStroke();
        var px = floor(this.x / vScale);
        var py = floor(this.y / vScale);
        var c = video.get(px, py);
        var col = this.createNewColor(c);
        fill(col);

        
        // modify this if you wanna draw different shapes
        var idShape = 1;
        switch (idShape) {
            case 1:
                let x2 = this.x - random(this.r)*random(2);
                let y2 = this.y + random(this.r)*random(4);
                let x3 = this.x + random(this.r)*random(2);
                let y3 = this.y + random(this.r)*random(4);
                
                triangle(this.x, this.y, x2, y2, x3, y3);
                break;
            case 2:
                rect(this.x, this.y, this.r, this.r);
                break;
            default:
                ellipse(this.x, this.y, this.r, this.r);
                break;
        }

    }

    // mofify this function if you want different color effects
    this.createNewColor = function (c) {
        var currCol = color(c[0], c[1], c[2], c[3]);
        var newCol = lerpColor(this.prevCol, currCol, amtSlider.value() / 100);
        this.prevCol = currCol;

        let r = newCol.levels[0];
        let g = newCol.levels[1];
        let b = newCol.levels[2];
        let a = alphaSlider.value();

        if (greyscaleCheck.checked()) {
            let effect = (r + g + b) / 3;
            newCol = color(effect, effect, effect, a);
        } else {
            newCol = color(r, g, b, a);
        }

        return newCol;
    }
}