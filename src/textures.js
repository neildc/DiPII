import BACKGROUND from  '../res/textures/background.jpg';
import GOAL from '../res/textures/goal.png';
import FALLING_PLATFORM from '../res/textures/fallingPlatform.png';
import INVERT_BLOCK from '../res/textures/invertBlock.png';
import PLACED_PLATFORM from '../res/textures/placedPlatformSpikes.png';
import DUDE from '../res/textures/dude.png';
import FIRE from '../res/textures/fire.png';

export function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = './output/' + sources[src];
    }
}

export const texturePaths = {
    goal: GOAL,
    fallingPlatform:FALLING_PLATFORM,
    invertBlock:INVERT_BLOCK,
    placedPlatform:PLACED_PLATFORM,
    dude:DUDE,
    fire:FIRE,
    background:BACKGROUND
};
