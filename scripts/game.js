/**
 * Created by neil on 24/11/16.
 */

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Spawn a new player at the bottom middle of the screen
p1 = new Player(
                canvas.width/2,
                canvas.height - PLAYER_HEIGHT,
                5);

fallingPlatform = new FallingPlatform();

placedPlatforms.push(new PlacedPlatform(400,500));
placedPlatforms.push(new PlacedPlatform(80,550));

console.log(p1);

function drawStatus() {

    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Fuel: "+p1.fuel, 8, 20);
    ctx.fillText("Lives: "+p1.lives, 8, 40);
    ctx.fillText("Platforms: "+p1.platforms, 8, 60);
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

    placedPlatforms.forEach(function(pp) {
        if (fallingPlatform.collidedWithPlacedPlatform(pp)) {
            placedPlatforms.splice(placedPlatforms.indexOf(pp) , 1);
            p1.platforms++;
        }
    })
}

function update() {
    p1.update();
    fallingPlatform.update();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlacedPlatforms();
    p1.draw();
    fallingPlatform.draw();
    drawStatus();
}

function loop() {

    detectCollisions();
    update();
    draw();

}

