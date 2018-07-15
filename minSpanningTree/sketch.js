var globalVertices = [];
var resetBtn;

function setup() {
    createCanvas(600, 400);
    background(0);
    createP('');
    resetBtn = createButton('Reset');
    resetBtn.mousePressed(resetBtnClicked);
}

function resetBtnClicked() {
    background(0);
    globalVertices.length = 0;
}

function mousePressed() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        var v = createVector(mouseX, mouseY);
        globalVertices.push(v);
        background(0);
        drawShortestTree(globalVertices);
    }
}

function drawShortestTree(vertices) {
    drawVertices(vertices);
    let edges = connectVertices(vertices);
    drawEdges(edges);
}

function drawVertices(vertices) {
    fill(255);
    stroke(255);
    for (let i = 0; i < vertices.length; ++i) {
        ellipse(vertices[i].x, vertices[i].y, 15);
    }
}

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

function drawEdges(edges) {
    stroke(255);
    for (let edge of edges) {
        var from = edge.from;
        var to = edge.to;
        line(from.x, from.y, to.x, to.y);
    }
}
