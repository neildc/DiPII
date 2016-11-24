/**
 * Created by neil on 24/11/16.
 */

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

setInterval(draw, 10);
