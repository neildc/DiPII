var stanLogo;
var amazonLogo;
var netflixLogo;
var dollarBill;
var dude;
var fire;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

var sources = {
    stanLogo: 'res/stansmall.png',
    amazonLogo: 'res/amazon_logo.png',
    netflixLogo: 'res/netflix_logo.png',
    dollarBill: 'res/dollar.png',
    dude: 'res/dude.png',
    fire: 'res/fire.png'
};

loadImages(sources, function(images) {

    stanLogo = images.stanLogo;
    amazonLogo = images.amazonLogo;
    netflixLogo = images.netflixLogo;
    dollarBill = images.dollarBill;
    dude = images.dollarBill;
    fire = images.fire;
});

//
// var stanLogo = new Image();
// stanLogo.src = 'res/stansmall.png';
//
// var amazonLogo = new Image();
// amazonLogo.src = 'res/amazon_logo.png';
//
// var netflixLogo = new Image();
// netflixLogo.src = 'res/netflix_logo.png';
//
// var dollarBill = new Image();
// dollarBill.src = 'res/dollar.png';
//
// var dude = new Image();
// dude.src = 'res/dude.png';
//
// var fire = new Image();
// fire.src = 'res/fire.png';