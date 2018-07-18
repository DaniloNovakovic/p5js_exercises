var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

var boxes = [];
var pleaseConnectCameraP;
var cameraConnected = false;

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

    for (var y = 0; y < rows; ++y) {
        for (var x = 0; x < cols; ++x) {
            var box = createInput('▉'); // unicode block char U+2588
            box.parent('#mirror');
            box.style('width', '15px');
            box.style('background-color', 'black');
            box.style('border', '1px  black');
            boxes.push(box);
        }
        var linebreak = createSpan('<br>');
        linebreak.parent('#mirror');
    }
}
function gotVideo(data) {
    if(data) {
        try {
            console.log(data.active);
            cameraConnected = true;
            pleaseConnectCameraP.html('Camera connected!');
            createP('This camera is made using array of DOM input elements filled with unicode block char U+2588 ');
        } catch(err) {
            console.log(err.message);
        }
    }
}

function draw() {
    if(video) {
        try {
            video.loadPixels();
            for (let y = 0; y < video.height; ++y) {
                for (let x = 0; x < video.width; ++x) {
                    let index = (video.width - x + 1 + y * video.width) * 4;
                    let r = video.pixels[index + 0];
                    let g = video.pixels[index + 1];
                    let b = video.pixels[index + 2];

                    var ci = x + y * cols;

                    boxes[ci].style('color',`rgb(${r}, ${g}, ${b})`);
                }
            }
        } catch(err) {
            console.log(err.message);
            cameraConnected = false;
            video = null;
        }
    } else {
        if(cameraConnected && pleaseConnectCameraP) {
            pleaseConnectCameraP.html('Camera disconnected, please connect your camera and refresh page...');
            cameraConnected = false;
        }
    }

}
