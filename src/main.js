import {enableNormalKeyEventListeners} from './keyboard.js';

import State from './state.js';
import {getCanvas} from './util.js';
import {gameLoop, resetGame} from './game.js';

import {loadImages, texturePaths} from './textures.js';


enableNormalKeyEventListeners();

// Loads images then run the following callback once that is complete
loadImages(texturePaths, function(images) {
    let canvas = document.getElementById("gameCanvas");
    let ctx = canvas.getContext("2d");
    let state = new State();
    let textures = {};

    textures.goal = images.goal;
    textures.fallingPlatform = images.fallingPlatform;
    textures.invertBlock = images.invertBlock;
    textures.placedPlatform = images.placedPlatform;
    textures.dude = images.dude;
    textures.fire = images.fire;
    textures.background = images.background;

    document.getElementById('spinner').style.display = 'none';
    document.getElementById('game').style.display = 'block';

    resetGame(state);

    // Run the game loop every 10ms
    setInterval(() => {gameLoop(ctx, textures, state);}, 10);
});
