/**
 * Created by neil on 24/11/16.
 */


const STARTING_FUEL = 100;
const STARTING_SPEED = 10;
const PLAYER_HEIGHT = 75;
const PLAYER_WIDTH = 20;
const ROCKET_SPEED = 20;
const GRAVITY = 10;

function Player(spawnX, spawnY, lives) {
    this.lives = lives;
    this.fuel = STARTING_FUEL;
    this.x = spawnX;
    this.y = spawnY;
    this.dx = STARTING_SPEED;
    this.dy = STARTING_SPEED;

    this.draw = drawPlayer;
    this.update = updatePlayer;
    this.moveLeft = movePlayerLeft;
    this.moveRight = movePlayerRight;

    this.feelTheGravity = playerGravity;

    this.fireRockets = movePlayerUp;
}

function updatePlayer() {

    this.feelTheGravity();

    if (leftPressed) { 
        console.log("LEFT");
        this.moveLeft();
    }

    if (rightPressed) { 
        console.log("RIGHT");
        this.moveRight();
    }

    if (upPressed) {
        console.log("UP");
        this.fireRockets();
    }
}

function playerGravity () {
    if (playerAboveFloor(this.y)) {
        this.y += GRAVITY;
    }
}

function playerAboveFloor(playerY) {
    console.log(playerY, canvas.height - PLAYER_HEIGHT);
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

function movePlayerUp() {
    // Negative since we want to move closer to origin Y (or top)
    // But don't let him/her break through the 
    // atmosphere (don't want themto die due to lack of oxygen) 
    if (this.y > 0) {
        this.y -= ROCKET_SPEED;
    }
}
