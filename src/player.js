/**
 * Created by neil on 24/11/16.
 */


const FUEL_FULL_TANK = 75;
const FUEL_REFILL_RATE = 2;
const FUEL_BURN_RATE = 6;

const STARTING_SPEED = 10;
const PLAYER_HEIGHT = 75;
const PLAYER_WIDTH = 20;
const ROCKET_SPEED = 20;
const GRAVITY = 10;
const MAX_PLATFORMS = 10;

class Player {

    constructor(spawnX, spawnY, lives) {
        this.lives = lives;
        this.fuel = FUEL_FULL_TANK;
        this.platforms = MAX_PLATFORMS;
        this.x = spawnX;
        this.y = spawnY;
        this.dx = STARTING_SPEED;
        this.dy = STARTING_SPEED;
    }

    update() {

        this.feelTheGravity();

        if (this.fuel < FUEL_FULL_TANK) {
            this.fuel += FUEL_REFILL_RATE;
        }

        if (leftPressed) { 
            this.moveLeft();
        }

        if (rightPressed) { 
            this.moveRight();
        }

        if (upPressed) {
            this.fireRockets();
        }
        if (spacePressed) {

            // TODO: proper debounce/single press
            if (fallingPlatform.y > 50) {
                // 10% chance of placing an invert block instead
                // of a normal block
                if ((Math.floor((Math.random() * 10) + 0)) == 0) {
                    this.placeInvertBlock();
                } else {
                    this.placePlatform();
                }
            }

        }
    }

    feelTheGravity () {
        if (this.playerAboveFloor(this.y) &&
            !this.playerIsOnAPlacedPlatforms(this)) {

            this.y += GRAVITY;
        }
    }

    playerIsOnAPlacedPlatforms(player) {
        var ret = false;
        placedPlatforms.forEach(function(pp) {
            if (pp.playerIsOnPlatform(player)) {
                ret = true;
            }
        })
        return ret;
    }

    playerAboveFloor(playerY) {
        // console.log(playerY, canvas.height - PLAYER_HEIGHT);
        return (playerY < (canvas.height - PLAYER_HEIGHT));
    }


    draw() {

        ctx.beginPath();
        ctx.rect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.closePath();

    }

    moveLeft() {
        // Make sure it doesn't exceed left boundary
        if (this.x > 0) {
            this.x -= this.dx;
        }
    }

    moveRight() {
        // Don't exceed right boundary
        if (this.x < (canvas.width - PLAYER_WIDTH)) {
            this.x += this.dx;
        }
    }

    fireRockets() {
        if (this.fuel > 0) {
            // Don't let him/her break through the 
            // atmosphere (don't want themto die due to lack of oxygen) 
            if (this.y > 0) {
                // Negative since we want to move closer to origin Y (or top)
                this.y -= ROCKET_SPEED;

                // Adding on FUEL_REFILL_RATE to disable refilling
                // while rockets are firing
                //
                //      Makes traversing side to side too easy
                this.fuel -= (FUEL_BURN_RATE + FUEL_REFILL_RATE);
            }
        }
    }

    placePlatform() {
        if (this.platforms > 0) {
            placedPlatforms.push(new PlacedPlatform(
                    fallingPlatform.x,
                    fallingPlatform.y
                ));
            this.platforms--;
            fallingPlatform.resetToTop();
        }
    }

    placeInvertBlock() {

        // Overwrite the existing invertblock if its there
        // We only want a single invertblock at any time
        invertBlock = new InvertBlock(
            fallingPlatform.x,
            fallingPlatform.y
        );
        fallingPlatform.resetToTop();

    }

    resetPlayerToBottom() {
        this.y = canvas.height - PLAYER_HEIGHT;
    }

    /**
     * Move the player back to the bottom at a random position
     */
    respawn() {
        this.lives--;
        this.resetPlayerToBottom();
        // TODO: move them to a random x
    }
}

