/**
 * Created by neil on 24/11/16.
 */

var canvas = document.getElementById("gameCanvas");
canvas.tabIndex = 1;

var ctx = canvas.getContext("2d");
resetGame();

console.log(p1);

function drawStatus() {

    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Fuel: "+p1.fuel, 8, 20);
    ctx.fillText("Lives: "+p1.lives, 8, 40);
    ctx.fillText("Platforms: "+p1.platforms, 8, 60);
    ctx.fillText("Level: "+goal.currentLevel, 8, 80);
}

function drawPlacedPlatforms() {
    placedPlatforms.forEach(function(pp) {
        pp.draw();
    })

}

function detectCollisions() {

    if (fallingPlatform.collidedWithPlayer(p1)) {
        p1.respawn();
        fallingPlatform.resetToTop();
    }

    if (goal.collidedWithPlayer(p1)) {
        levelUp();
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
    drawPlacedPlatforms();
    p1.draw();
    goal.draw();
    fallingPlatform.draw();
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
    resetPlayerToBottom();
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

}

function gameover () {
   resetGame();
}

