var tree = {
    vertices: [],
    edges: []
};
var resetBtn;
var flashColBtn;
var flashingColors = false;
var interval;

function setup() {
    createCanvas(600, 400);
    background(0);
    changeColor();

    createP('');
    resetBtn = createButton('Reset');
    resetBtn.mousePressed(resetBtnPressed);

    flashColBtn = createButton('Turn On Flashing Colors');
    flashColBtn.style('marginLeft', '10px');
    flashColBtn.mousePressed(flashColBtnPressed);
}

function flashColBtnPressed() {
    flashingColors = !flashingColors;
    if (flashingColors) {
        interval = setInterval(changeColor, 2000);
        this.html('Turn Off Flashing Colors');
    } else {
        clearInterval(interval);
        this.html('Turn On Flashing Colors');
    }
    changeColor();
}

function resetBtnPressed() {
    background(0);
    tree.vertices.length = 0;
    tree.edges.length = 0;
}

function mousePressed() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        var v = createVector(mouseX, mouseY);
        tree.vertices.push(v);
        tree.edges = connectVertices(tree.vertices);
    }
}

function changeColor() {
    if (flashingColors) {
        fill(random(0, 255), random(0, 255), random(0, 255));
        stroke(random(0, 255), random(0, 255), random(0, 255));
    } else {
        fill(255);
        stroke(255);
    }
}

function draw() {
    background(0);
    drawTree(tree);
}

function drawTree(argTree) {
    drawEdges(argTree.edges);
    drawVertices(argTree.vertices);
}

function drawVertices(vertices) {
    for (let i = 0; i < vertices.length; ++i) {
        ellipse(vertices[i].x, vertices[i].y, 15);
    }
}

function drawEdges(edges) {
    for (let edge of edges) {
        var from = edge.from;
        var to = edge.to;
        line(from.x, from.y, to.x, to.y);
    }
}

// Connects vertices by Prim's algorithm (Min Spanning Tree)
function connectVertices(vertices) {
    let edges = [];
    let idReached = [];

    idReached.push(Math.floor(random(vertices.length)));

    while (idReached.length < vertices.length) {
        let minDist = Infinity;
        let idFrom = -1;
        let idTo = -1;

        for (let idCurrReached of idReached) {
            for (let i = 0; i < vertices.length; ++i) {
                if (idReached.includes(i)) {
                    continue;
                }
                let from = vertices[idCurrReached];
                let to = vertices[i];
                let d = dist(from.x, from.y, to.x, to.y);
                if (d < minDist) {
                    minDist = d;
                    idFrom = idCurrReached;
                    idTo = i;
                }
            }
        }

        edges.push({
            from: vertices[idFrom],
            to: vertices[idTo]
        });

        idReached.push(idTo);
    }

    return edges;
}
