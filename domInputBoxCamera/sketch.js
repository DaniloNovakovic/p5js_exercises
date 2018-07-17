var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

var boxes = [];

function setup() {
    noCanvas();
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.size(cols, rows);
    video.hide();

    for (var y = 0; y < rows; ++y) {
        for (var x = 0; x < cols; ++x) {
            var box = createInput('▉'); // unicode block char U+2588
            box.parent('#mirror');
            box.style('width', '10pt');
            box.style('background-color', 'black');
            box.style('border', '1px  black');
            boxes.push(box);
        }
        var linebreak = createSpan('<br>');
        linebreak.parent('#mirror');
    }

}
function draw() {
    video.loadPixels();
    for (let y = 0; y < video.height; ++y) {
        for (let x = 0; x < video.width; ++x) {
            let index = (video.width - x + 1 + y * video.width) * 4;
            let r = video.pixels[index + 0];
            let g = video.pixels[index + 1];
            let b = video.pixels[index + 2];

            var ci = x + y * cols;
            
            boxes[ci].style('color', color(r,g,b));
        }
    }

}