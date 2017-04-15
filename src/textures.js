
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
    background: 'res/textures/background.jpg',
    goal: 'res/textures/goal.png',
    fallingPlatform: 'res/textures/fallingPlatform.png',
    invertBlock: 'res/textures/invertBlock.png',
    placedPlatform: 'res/textures/placedPlatformSpikes.png',
    dude: 'res/textures/dude.png',
    fire: 'res/textures/fire.png'
};

