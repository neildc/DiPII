/**
 * Created by neil on 24/11/16.
 */


const FUEL_FULL_TANK = 100;
const FUEL_REFILL_RATE = 2;
const FUEL_BURN_RATE = 6;

const STARTING_SPEED = 10;
const PLAYER_HEIGHT = 75;
const PLAYER_WIDTH = 20;
const ROCKET_SPEED = 20;
const GRAVITY = 10;
const MAX_PLATFORMS = 10;

function Player(spawnX, spawnY, lives) {
    this.lives = lives;
    this.fuel = FUEL_FULL_TANK;
    this.platforms = MAX_PLATFORMS;
    this.x = spawnX;
    this.y = spawnY;
    this.dx = STARTING_SPEED;
    this.dy = STARTING_SPEED;
    this.draw = drawPlayer;
    this.update = updatePlayer;
    this.moveLeft = movePlayerLeft;
    this.moveRight = movePlayerRight;

    this.feelTheGravity = playerGravity;

    this.fireRockets = fireRockets;
    this.respawn = playerRespawn;
    this.placePlatform = placePlatform;
    this.resetToBottom = resetPlayerToBottom;
}

function updatePlayer() {

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
        this.placePlatform();
    }
}

function playerGravity () {
    if (playerAboveFloor(this.y) &&
        !playerIsOnAPlacedPlatforms(this)) {

        this.y += GRAVITY;
    }
}

function playerIsOnAPlacedPlatforms(player) {
    var ret = false;
    placedPlatforms.forEach(function(pp) {
        if (pp.playerIsOnPlatform(player)) {
            ret = true;
        }
    })
    return ret;
}

function playerAboveFloor(playerY) {
    // console.log(playerY, canvas.height - PLAYER_HEIGHT);
    return (playerY < (canvas.height - PLAYER_HEIGHT));
}


function drawPlayer() {

    ctx.beginPath();
    ctx.rect(this.x, this.y, PLAYER_WIDTH, PLAYER_HEIGHT);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();

}

function movePlayerLeft() {
    // Make sure it doesn't exceed left boundary
    if (this.x > 0) {
        this.x -= this.dx;
    }
}

function movePlayerRight() {
    // Don't exceed right boundary
    if (this.x < (canvas.width - PLAYER_WIDTH)) {
        this.x += this.dx;
    }
}

function fireRockets() {
    // Negative since we want to move closer to origin Y (or top)
    // But don't let him/her break through the 
    // atmosphere (don't want themto die due to lack of oxygen) 
    if (this.fuel > 0) {
        if (this.y > 0) {
            this.y -= ROCKET_SPEED;
            // Adding on FUEL_REFILL_RATE to disable refilling
            // while rockets are firing
            //
            //      Makes traversing side to side too easy
            this.fuel -= FUEL_BURN_RATE + FUEL_REFILL_RATE; 
        }
    }
}

function placePlatform() {
    if (this.platforms > 0 && fallingPlatform.y > 40) {
        placedPlatforms.push(new PlacedPlatform(
                fallingPlatform.x,
                fallingPlatform.y
            ));
        this.platforms--;
        fallingPlatform.resetToTop();
    }
}

function resetPlayerToBottom() {
    this.y = canvas.height - PLAYER_HEIGHT;
}

/**
 * Move the player back to the bottom at a random position
 */
function playerRespawn() {
    this.lives--;
    this.resetToBottom();
    // TODO: move them to a random x
}
