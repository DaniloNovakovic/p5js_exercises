var video;
var vScale = 16;
var particles = [];
var alphaSlider;
var amtSlider;
var greyscaleCheck;
var pleaseConnectCameraP;

function setup() {
    createCanvas(640, 480);
    pixelDensity(1);

    pleaseConnectCameraP = select('#connectCameraMsg');
    
    video = createCapture(VIDEO, gotVideo);
    video.size(width / vScale, height / vScale);

    for (let i = 0; i < 30; ++i) {
        particles.push(new Particle(random(width), random(height)));
    }
    createP('');
    greyscaleCheck = createCheckbox('Greyscale');
    
    let para = createP('Alpha value: ');
    alphaSlider = createSlider(0, 255, 127);
    alphaSlider.parent(para);

    para = createP('Interpolate amount: ');
    amtSlider = createSlider(0, 100, 50);
    amtSlider.parent(para);
}

function gotVideo(data) {
    console.log(data);
    pleaseConnectCameraP.html('Camera connected!');
}

function draw() {
    video.loadPixels();
    for (let particle of particles) {
        particle.show();
        particle.update();
    }
}