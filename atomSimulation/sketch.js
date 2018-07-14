let angle = 0;
let shellDistance = 100;
let atomsPerShell = [0, 0, 0, 0, 0, 0, 0];
let scaleByN = 1;
let maxNumElectrons;
let atom;

function setup() {
    createCanvas(600, 400);
    angleMode(DEGREES);
    maxNumElectrons = calcMaxNumElectrons();

    let para = createP('Number of electrons: ');
    nBallsInput = createInput('1', 'number');
    nBallsInput.parent(para);
    nBallsInput.size(40);
    nBallsInput.input(resetAtomNum);
    atom = new Atom(width / 2, height / 2, 1);
}

function keyPressed() {
    if (keyCode == UP_ARROW && keyIsDown(CONTROL)) {
        scaleByN += 0.15;
    } else if (keyCode == DOWN_ARROW && keyIsDown(CONTROL)) {
        scaleByN -= 0.15;
    }
}

function resetAtomNum() {
    let n = this.value();
    if (n >= maxNumElectrons) {
        n = maxNumElectrons;
    }
    atom.electrons.length = 0;
    atom = new Atom(width / 2, height / 2, n);
}

function calcMaxNumElectrons() {
    let result = 0;
    for (let i = 1; i <= atomsPerShell.length; ++i) {
        atomsPerShell[i - 1] = 2 * i * i;
        result += atomsPerShell[i - 1];
    }
    return result;
}

function draw() {
    background(0);
    scale(1, 1);
    atom.show();

}

class Circle {
    constructor(x, y, r = 5, angle = 0, speed = 1) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.angle = angle;
        this.speed = speed;
    }
}
class Atom {
    constructor(x, y, nElectrons = 1) {
        this.x = x;
        this.y = y;
        this.electrons = [];
        this.r = 50;

        let currShell = 0;
        let currNumInShell = 0;
        let newAngle = 0;
        let divisor = atomsPerShell[currShell];
        for (let i = 0; i < nElectrons; ++i) {
            if (currNumInShell >= atomsPerShell[currShell]) {
                ++currShell;
                currNumInShell = 0;
                if ((nElectrons - i + 1) >= atomsPerShell[currShell]) {
                    divisor = atomsPerShell[currShell];
                } else {
                    divisor = nElectrons - i;
                }

            }
            let newX = this.r + shellDistance * (currShell + 1);
            newX /= 2;
            newAngle = (360 / divisor) * currNumInShell;
            let currElectron = new Circle(newX, 0, 20, newAngle);
            this.electrons.push(currElectron);
            ++currNumInShell;
        }
    }
    show() {
        push();
        noFill();
        stroke(255);

        translate(this.x, this.y);
        scale(scaleByN);
        for (let i = 1; i <= atomsPerShell.length; ++i) {
            ellipse(0, 0, this.r + shellDistance * i);
        }

        noStroke();
        fill(255, 0, 0);
        ellipse(0, 0, this.r);
        fill(0, 0, 255);

        for (let electron of this.electrons) {
            rotate(electron.angle);
            ellipse(electron.x, electron.y, electron.r);
            rotate(-electron.angle);
            electron.angle += electron.speed;
        }
        pop();
    }
}
