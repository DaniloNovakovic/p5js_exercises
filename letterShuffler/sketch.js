var textbox;
var randChars = [];
var toDelete = [];

function setup() {
    noCanvas();
    textbox = createInput('');
    textbox.input(updateText);
    textbox.style("margin-left", "45px");
}

function addElement(str) {
    let element = createP(str);
    element.position(random(45, window.innerWidth - 64), random(10, window.innerHeight - 170));
    element.style("font-size", random(8, 64) + "pt");
    let r = random(0, 255);
    let g = random(0, 255);
    let b = random(0, 255);
    element.style("color", color(r, g, b));
    randChars.push(element);
}

function deleteElements(toDelete) {
    while (toDelete.length > 0) {
        let element = toDelete.pop();
        element.remove();
    }
}

function updateText() {
    var currTxt = textbox.value();

    console.log("");
    // if user only edits 1 letter (withouth deleting it first) that letter will be updated withouth reshuffling
    // if user deleted 1 or more letter then that letter will be added into toDelete and placed in back of the
    // randChars array
    for (var i = 0, j = 0; i < currTxt.length; ++i, ++j) {
        for (; j < randChars.length; ++j) {
            if (currTxt[i] != randChars[j].html()) {
                if (currTxt.length != randChars.length) {
                    toDelete.push(randChars[j])
                } else {
                    randChars[j].html(currTxt[i]);
                    break;
                }
            } else {
                randChars[i] = randChars[j];
                break;
            }
        }
        if (j >= randChars.length) {
            break;
        }
    }
    if (toDelete.length > 0) {
        console.log(`randChars.splice(${i}, ${toDelete.length})`);
        randChars.splice(i, toDelete.length);
        deleteElements(toDelete);
    }
    for (; i < currTxt.length; ++i) {
        console.log(`addElement(${currTxt[i]})`);
        addElement(currTxt[i]);
    }

    if (currTxt.length < randChars.length) {
        console.log(`randChars.splice(${currTxt.length}, ${randChars.length - currTxt.length})`);

        toDelete = randChars.splice(currTxt.length, randChars.length - currTxt.length);
        deleteElements(toDelete);
    }
}
