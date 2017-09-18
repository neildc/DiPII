import {PLATFORM_WIDTH, PLATFORM_HEIGHT, LEVEL_SPEED_MULTIPLIER} from './constants';
import {getCanvas, collision, randomXInCanvasWidth} from './util.js';

import {PLAYER_WIDTH, PLAYER_HEIGHT} from './player.js';

import {sPressed, aPressed, dPressed} from './keyboard.js';

const BASE_FALLING_RATE = 3;
const PLATFORM_SIDE_SPEED = 2;
const FALL_SPEED_UP = 2;

export default class FallingPlatform {

    constructor() {
        this.x = getCanvas().width / 2;
        this.y = 0;

        /* TODO: Figure out why this isn't working
         *
         *       - works fine with the bandaid below
         */
        //this.speed = this.updateSpeed(1);
        this.speed = Math.round(BASE_FALLING_RATE * (LEVEL_SPEED_MULTIPLIER * 1));
    }

    updateSpeed(level) {
        this.speed = Math.round(BASE_FALLING_RATE * (LEVEL_SPEED_MULTIPLIER * level));
    }

    draw(ctx, textures) {
        ctx.drawImage(textures.fallingPlatform, this.x, this.y);
    }

    rect() {
        return {
            x: this.x, y: this.y, width: PLATFORM_WIDTH, height: PLATFORM_HEIGHT
        };
    }

    resetToTop() {
        this.y = 0;
        this.x = randomXInCanvasWidth(PLATFORM_WIDTH);
    }

    crashedIntoTheGround() {
        return this.y >= getCanvas().height;
    }

    collidedWithPlayer(player) {
        var playerRect = { x: player.x, y: player.y,
            width: PLAYER_WIDTH, height: PLAYER_HEIGHT };

        return collision(playerRect, this.rect());
    }

    collidedWithPlacedPlatform(pp) {
        var playerRect = { x: pp.x, y: pp.y,
            width: PLATFORM_WIDTH, height: PLATFORM_HEIGHT };

        return collision(playerRect, this.rect());
    }

    moveLeft() {
        var leftBound = 0;
        if (this.x > leftBound) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        var rightBound = getCanvas().width - PLATFORM_WIDTH;
        if (this.x < rightBound) {
            this.x += this.speed;
        }
    }

    detectKeys() {
        // Allow the user speed up the falling speed of the block
        if (sPressed) {
            this.y += this.speed * FALL_SPEED_UP;
        } else {
            this.y += this.speed;
        }

        if (aPressed) {
            this.moveLeft();
        }

        if (dPressed) {
            this.moveRight();
        }
    }

    update() {

        if (this.crashedIntoTheGround()) {
            this.resetToTop();
        }

    }
}
