
// Source:
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
export function collision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width
        && rect1.x + rect1.width > rect2.x
        && rect1.y < rect2.y + rect2.height
        && rect1.height + rect1.y > rect2.y;
}

// src:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    //The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getCanvas() {
    return document.getElementById("gameCanvas");
}

export function randomXInCanvasWidth(modelWidth) {
    var rightBound = getCanvas().width - modelWidth;
    // Random value between 0 - rightbound
    return Math.floor(Math.random() * rightBound + 0);
}
