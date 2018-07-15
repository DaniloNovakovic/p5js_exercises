var globalVertices = [];
var resetBtn;

function setup() {
    createCanvas(600, 400);
    background(0);
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
    connectVertices(vertices);
}

function drawVertices(vertices) {
    fill(255);
    stroke(255);
    for (let i = 0; i < vertices.length; ++i) {
        ellipse(vertices[i].x, vertices[i].y, 15);
    }
}

function connectVertices(vertices) {
    let idReached = [];

    idReached.push(Math.floor(random(vertices.length)));

    while (idReached.length < vertices.length) {
        let minDistances = [];
        let idMinVerts = [];

        for (let idCurrReached of idReached) {
            let minDist = Infinity;
            let idMinVert = -1;
            let from = vertices[idCurrReached];

            for (let i = 0; i < vertices.length; ++i) {
                if (idReached.includes(i)) {
                    continue;
                }
                let to = vertices[i];
                let d = dist(from.x, from.y, to.x, to.y);
                if (d < minDist) {
                    minDist = d;
                    idMinVert = i;
                }

            }
            idMinVerts.push(idMinVert);
            minDistances.push(minDist);
        }

        let idMinDist = findShortestId(minDistances);
        let idMinVert = idMinVerts[idMinDist];

        let from = vertices[idReached[idMinDist]];
        let to = vertices[idMinVert];

        stroke(255);
        line(from.x, from.y, to.x, to.y);
        idReached.push(idMinVert);
    }
}

function findShortestId(argArray) {
    let idShortest = 0;
    for (let i = 1; i < argArray.length; ++i) {
        if (argArray[i] < argArray[idShortest]) {
            idShortest = i;
        }
    }
    return idShortest;
}
