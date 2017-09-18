import {getCanvas} from './util.js';
import Player from './player.js';
import {PLAYER_HEIGHT} from './player.js';
import Goal from './goal.js';
import FallingPlatform from './fallingPlatform.js';

export default class State {

    constructor() {
        this.reset();
    }

    reset () {
        let canvas = getCanvas();
        this.p1 = new Player(canvas.width / 2, canvas.height - PLAYER_HEIGHT, 5);
        this.goal = new Goal();
        this.placedPlatforms = [];
        this.fallingPlatform = new FallingPlatform();
        this.invertBlock = null;
    }
}
