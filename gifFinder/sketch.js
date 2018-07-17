var api = "https://api.giphy.com/v1/gifs/search?q=";
var name = '';
var api_key = '&api_key=5bqp72P9orXVJcOyiRvXsdKTzFdql5il';
var limit = "&limit=5";
var inputBox;
var btnSubmit;
var images = [];

function setup() {
    noCanvas();
    inputBox = select('#giphySearchBox');
    btnSubmit = select('#submitBtn');
    btnSubmit.mousePressed(askGiphy);
}

function keyPressed() {
    if (keyCode == ENTER) {
        askGiphy();
    }
}

function askGiphy() {
    if (name != inputBox.value()) {
        name = inputBox.value();
        var url = api + name + api_key;
        loadJSON(url, gotData);
    }
}

function gotData(giphy) {
    console.log(name);
    eraseImages();
    for (let val of giphy.data) {
        images.push(createImg(val.images.original.url));
    }
}

function eraseImages() {
    for (var img of images) {
        img.remove();
    }
    images.length = 0;
}