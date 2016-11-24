var leftPressed = false;
var rightPressed = false;
var downPressed = false;
var upPressed = false;
var aPressed = false;
var dPressed = false;
var spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 37: leftPressed = true; break;
        case 38: upPressed = true; break;
        case 39: rightPressed = true; break;
        case 40: downPressed = true; break;
        case 65: aPressed = true; break;
        case 68: dPressed = true; break;
        case 83: sPressed = true; break;
        case 32: spacePressed = true; break;
    }
}

function keyUpHandler(e) {
    switch(e.keyCode) {
        case 37: leftPressed = false; break;
        case 38: upPressed = false; break;
        case 39: rightPressed = false; break;
        case 40: downPressed = false; break;
        case 65: aPressed = false; break;
        case 68: dPressed = false; break;
        case 83: sPressed = false; break;
        case 32: spacePressed = false; break;
    }
}
