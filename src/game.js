/**
 * Created by neil on 24/11/16.
 */


let canvas = document.getElementById("gameCanvas");
tabIndex = 1;

let ctx = canvas.getContext("2d");
enableNormalKeyEventListeners();
resetGame();

console.log(p1);

function drawStatus() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Fuel: " + p1.fuel, 8, 20);
    ctx.fillText("Lives: " + p1.lives, 8, 40);
    ctx.fillText("Platforms: " + p1.platforms, 8, 60);
    ctx.fillText("Level: " + goal.currentLevel, 8, 80);
}

function drawPlacedPlatforms() {
    placedPlatforms.forEach((pp) => pp.draw());
}

function drawBackground() {
    ctx.drawImage(textures.background, 0, 0);
}

function detectCollisions() {

    if (fallingPlatform.collidedWithPlayer(p1)) {
        p1.respawn();
        fallingPlatform.resetToTop();
    }

    if (goal.collidedWithPlayer(p1)) {
        levelUp();
    }

    if (invertBlock != null) {
        if (invertBlock.collidedWithPlayer(p1)) {
            invertBlock = null;
            invertKeys();
        }
    }

    placedPlatforms.forEach(function(pp) {
        if (fallingPlatform.collidedWithPlacedPlatform(pp)) {
            placedPlatforms.splice(placedPlatforms.indexOf(pp) , 1);
            p1.platforms++;
        }
    })
}

function update() {
    if (p1.lives == 0) {
        gameover();
    } else {
        p1.update();
        fallingPlatform.update();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawPlacedPlatforms();
    p1.draw();
    goal.draw();
    fallingPlatform.draw();
    if (invertBlock != null) invertBlock.draw();
    drawStatus();
}

function loop() {

    detectCollisions();
    update();
    draw();

}

function levelUp() {
    goal.levelUp();
    fallingPlatform.speed = BASE_FALLING_RATE * goal.getSpeedMultiplier();
    console.log(fallingPlatform.speed);
    p1.resetPlayerToBottom();
}

function resetGame() {
    p1 = new Player(
                canvas.width/2,
                canvas.height - PLAYER_HEIGHT,
                5);
    console.log(p1);

    goal = new Goal();

    placedPlatforms = [];
    fallingPlatform = new FallingPlatform();
    invertBlock = null;

}

function gameover () {
   resetGame();
}

