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

placedPlatforms.push(new PlacedPlatform(400,500));
placedPlatforms.push(new PlacedPlatform(80,550));

console.log(p1);

function drawPlacedPlatforms() {
    placedPlatforms.forEach(function(pp) {
        pp.draw();
    })

}

function update() {
    p1.update();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlacedPlatforms();
    p1.draw();
    // drawBall();
}

function loop() {

    update();
    draw();

}

