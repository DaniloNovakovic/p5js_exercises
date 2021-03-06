var video;

var cols = 40;
var rows = 30;

const defaultChar = '▉';
var selectedChar = defaultChar;
var boxes = [];
var pleaseConnectCameraP;
var cameraConnected = false;
var inputBoxChar;

function preload() {
    pleaseConnectCameraP = select('#connectCameraMsg');
    try {
        video = createCapture(VIDEO, gotVideo);
        video.size(cols, rows);
        video.hide();
    } catch(err) {
        console.log(err.message);
        pleaseConnectCameraP.html(err.message);
    }
}
function setup() {
    noCanvas();
    pixelDensity(1);

    try {
        for (var y = 0; y < rows; ++y) {
            for (var x = 0; x < cols; ++x) {
                var box = createInput(selectedChar); // unicode block char U+2588
                box.parent('#mirror');
                box.style('width', '15px');
                box.style('background-color', 'black');
                box.style('border', '1px  black');
                boxes.push(box);
            }
            var linebreak = createSpan('<br>');
            linebreak.parent('#mirror');
        }
    } catch(err) {
        console.log(err.message);
    }
}
function gotVideo(data) {
    if(data) {
        try {
            console.log(data);
            cameraConnected = true;
            pleaseConnectCameraP.html('Camera connected!');
            var para = createP(`Select char to fill input boxes with (default - ${defaultChar}): `);
            inputBoxChar = createInput('');
            inputBoxChar.parent(para);
            inputBoxChar.style('width', '15px');
            inputBoxChar.input(updateSelectedChar);
        } catch(err) {
            console.log(err.message);
        }
    }
}
function updateSelectedChar() {
    var chars = this.value();
    if(chars.length > 0) {
        selectedChar = chars[0]; 
    } else {
        selectedChar = defaultChar;
    }
}
function draw() {
    if(video && cameraConnected) {
        try {
            video.loadPixels();
            for (let y = 0; y < video.height; ++y) {
                for (let x = 0; x < video.width; ++x) {
                    let index = (video.width - x + 1 + y * video.width) * 4;
                    let r = video.pixels[index + 0];
                    let g = video.pixels[index + 1];
                    let b = video.pixels[index + 2];

                    var ci = x + y * cols;
                    boxes[ci].value(selectedChar);
                    boxes[ci].style('color',`rgb(${r}, ${g}, ${b})`);
                }
            }
        } catch(err) {
            console.log(err.message);
            video = null;
        }
    } else if(cameraConnected){
        pleaseConnectCameraP.html('Camera disconnected, please connect your camera and refresh page...');
        cameraConnected = false;
    }

}
