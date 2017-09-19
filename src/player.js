/**
 * Created by neil on 24/11/16.
 */

import {getCanvas, collision, getRandomInt} from './util.js';
import {leftPressed, rightPressed, upPressed} from './keyboard.js';

const FUEL_FULL_TANK = 100;
const FUEL_REFILL_RATE = 4;
const FUEL_BURN_RATE = 2;

const STARTING_SPEED = 5;
export const PLAYER_HEIGHT = 30;
export const PLAYER_WIDTH = 18;
const ROCKET_SPEED = 15;
const GRAVITY = 10;

export default class Player {

    constructor(spawnX, spawnY, lives) {
        this.lives = lives;
        this.fuel = FUEL_FULL_TANK;
        this.x = spawnX;
        this.y = spawnY;
        this.dx = STARTING_SPEED;
        this.dy = STARTING_SPEED;
        this.assOnFire = false;
    }

    detectKeys() {
        if (leftPressed) {
            this.moveLeft();
        }

        if (rightPressed) {
            this.moveRight();
        }

        if (upPressed) {
            this.fireRockets();
        }
    }

    update(state) {
        this.feelTheGravity(state);

        if (this.fuel < FUEL_FULL_TANK) {
            this.fuel += FUEL_REFILL_RATE;
        }
    }

    feelTheGravity(state) {
        if (this.playerAboveFloor(this.y)
        && !this.playerIsOnAPlacedPlatforms(state)) {

            this.y += GRAVITY;
        }
    }

    // TODO : Broken
    //        2. Player sometimes stands "inside" the block
    playerIsOnAPlacedPlatforms(state) {
        var ret = false;
        state.placedPlatforms.forEach(function (pp) {
            if (pp.playerIsOnPlatform(state.p1)) {
                ret = true;
            }
        });
        return ret;
    }

    playerAboveFloor(playerY) {
        return (playerY < (getCanvas().height - PLAYER_HEIGHT));
    }

    draw(ctx, textures) {
        ctx.drawImage(textures.dude, this.x, this.y);
        if (this.assOnFire) {
            ctx.drawImage(textures.fire, this.x, this.y);

            /* TODO: move this out of here,
             *       Not ideal, but we'll have to leave this here
             *       until we find a better spot to put it
             */
            this.assOnFire = false;
        }
    }

    moveLeft() {
        // Make sure it doesn't exceed left boundary
        if (this.x > 0) {
            this.x -= this.dx;
        }
    }

    moveRight() {
        // Don't exceed right boundary
        if (this.x < (getCanvas().width - PLAYER_WIDTH)) {
            this.x += this.dx;
        }
    }

    fireRockets() {
        if (this.fuel > 0) {

            if (this.fuel < 20) {
                this.fuel -= FUEL_REFILL_RATE;
            } else {
                // Don't let him/her break through the
                // atmosphere (don't want themto die due to lack of oxygen)
                if (this.y > 0) {
                    // Negative since we want to move closer to origin Y (or top)
                    this.y -= ROCKET_SPEED;

                    // Adding on FUEL_REFILL_RATE to disable refilling
                    // while rockets are firing
                    //
                    //      Makes traversing side to side too easy
                    this.fuel -= FUEL_BURN_RATE + FUEL_REFILL_RATE;
                    this.assOnFire = true;
                }
            }
        }
    }


    resetPlayerToRandomXAtBottom() {
        this.y = getCanvas().height - PLAYER_HEIGHT;

        let halfOfPlayerWidth = Math.ceil(PLAYER_WIDTH/2);
        this.x = getRandomInt(halfOfPlayerWidth,
                              getCanvas().width - halfOfPlayerWidth);
    }

    respawn() {
        this.lives--;
        this.resetPlayerToRandomXAtBottom();
    }
}
