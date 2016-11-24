/**
 * Created by neil on 24/11/16.
 */

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Spawn a new player at the bottom middle of the screen
var p1 = new Player(
                canvas.width/2,
                canvas.height - PLAYER_HEIGHT,
                5);

console.log(p1);

function drawBall() {
    ctx.beginPath();
    ctx.arc(40, 40, 20, 0, Math.PI*2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.closePath();
}

function update() {
    p1.update();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    p1.draw();
    // drawBall();
}

function loop() {
    
    update();
    draw();

}

