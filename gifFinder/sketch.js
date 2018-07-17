var api = "http://api.giphy.com/v1/gifs/search?q=";
var name = "";
var api_key = '&api_key=5bqp72P9orXVJcOyiRvXsdKTzFdql5il';
var limit = "&limit=5";
var inputBox;
var submitBtn;
var images = [];

function setup() {
    noCanvas();
    inputBox = select('#giphySearchBox');
    submitBtn = select('#submitBtn');
    submitBtn.mousePressed(askGiphy);
}

function askGiphy() {
    var url = api + inputBox.value() + api_key;
    loadJSON(url, gotData);
}

function gotData(giphy) {
    eraseImages();
    for(let val of giphy.data) {
        console.log(val.images.original.url);
        images.push(createImg(val.images.original.url));
    }
}
function eraseImages() {
    for(var img of images) {
        img.remove();
    }
    images.length = 0;
}

