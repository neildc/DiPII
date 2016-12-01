// keyboard.js

/**
 *  TODO: Test if this would be viable to move into a hashmap
 *         without much latency
 * 
 *
 *  This isn't great I could probably all these variables into a
 *  hashmap with the key of the KEY_CODE.
 *
 *  Sure it's an O(1) lookup, but I want to avoid that lookup
 *  altogether for the key detection
 * 
 * 
 */

var leftPressed = false;
var rightPressed = false;
var downPressed = false;
var upPressed = false;
var wPressed = false;
var aPressed = false;
var dPressed = false;
var sPressed = false;
var spacePressed = false;
var invertedKeys = false;

const LEFT_KEY = 37;
const UP_KEY = 38;
const RIGHT_KEY = 39;
const DOWN_KEY = 40;
const W_KEY = 87;
const A_KEY = 65;
const S_KEY = 83;
const D_KEY = 68;
const SPACE_KEY = 32;

function invertKeys() {
    if (invertedKeys) {
        // Disable inverted, return to normal
        disableInvertedKeyEventListeners();
        enableNormalKeyEventListeners();
    } else {
        // Turn on inverted
        disableNormalKeyEventListeners();
        enableInvertedKeyEventListeners();
    }
    resetKeyState();
}

function enableNormalKeyEventListeners() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

function disableNormalKeyEventListeners() {
    document.removeEventListener("keydown", keyDownHandler, false);
    document.removeEventListener("keyup", keyUpHandler, false);
}

function enableInvertedKeyEventListeners() {
    document.addEventListener("keydown", invertedKeyDownHandler, false);
    document.addEventListener("keyup", invertedKeyUpHandler, false);
}

function disableInvertedKeyEventListeners() {
    document.removeEventListener("keydown", invertedKeyDownHandler, false);
    document.removeEventListener("keyup", invertedKeyUpHandler ,false);
}

function keyDownHandler(e) {
    switch (e.keyCode) {
        case LEFT_KEY: leftPressed = true; break;
        case UP_KEY: upPressed = true; break;
        case RIGHT_KEY: rightPressed = true; break;
        case DOWN_KEY: downPressed = true; break;
        case W_KEY: wPressed = true; break;
        case A_KEY: aPressed = true; break;
        case D_KEY: dPressed = true; break;
        case S_KEY: sPressed = true; break;
        case SPACE_KEY: spacePressed = true; break;
    }
    e.preventDefault();

}

function keyUpHandler(e) {
    switch(e.keyCode) {
        case LEFT_KEY: leftPressed = false; break;
        case UP_KEY: upPressed = false; break;
        case RIGHT_KEY: rightPressed = false; break;
        case DOWN_KEY: downPressed = false; break;
        case W_KEY: wPressed = false; break;
        case A_KEY: aPressed = false; break;
        case D_KEY: dPressed = false; break;
        case S_KEY: sPressed = false; break;
        case SPACE_KEY: spacePressed = false; break;
    }
    e.preventDefault();

}

/**
 * Difference with these below is that instead of the normal
 *
 *      case LEFT_KEY: leftPressed ...
 *      
 *   we now have for the inverted mode
 *
 *      case LEFT_KEY: aPressed  ...
 *  
 */
function invertedKeyDownHandler(e) {
    //console.log(e.keyCode);
    switch (e.keyCode) {
        case LEFT_KEY: aPressed = true; break;
        case UP_KEY: wPressed = true; break;
        case RIGHT_KEY: dPressed = true; break;
        case DOWN_KEY: sPressed = true; break;
        case W_KEY: upPressed = true; break;
        case A_KEY: leftPressed = true; break;
        case D_KEY: rightPressed = true; break;
        case S_KEY: downPressed = true; break;
        case SPACE_KEY: spacePressed = true; break;
    }
    e.preventDefault();

}

function invertedKeyUpHandler(e) {
    switch(e.keyCode) {
        case LEFT_KEY: aPressed = false; break;
        case UP_KEY: wPressed = false; break;
        case RIGHT_KEY: dPressed = false; break;
        case DOWN_KEY: sPressed = false; break;
        case W_KEY: upPressed = false; break;
        case A_KEY: leftPressed = false; break;
        case D_KEY: rightPressed = false; break;
        case S_KEY: downPressed = false; break;
        case SPACE_KEY: spacePressed = false; break;

    }
    e.preventDefault();

}

function resetKeyState() {
    leftPressed = false;
    rightPressed = false;
    downPressed = false;
    upPressed = false;
    wPressed = false;
    aPressed = false;
    dPressed = false;
    sPressed = false;
    spacePressed = false;
}