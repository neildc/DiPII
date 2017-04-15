
// Source: 
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function collision(rect1, rect2){
    return (
        rect1.x < rect2.x + rect2.width &&
       rect1.x + rect1.width > rect2.x &&
       rect1.y < rect2.y + rect2.height &&
       rect1.height + rect1.y > rect2.y)
}

function randomXInCanvasWidth(modelWidth) {
    var rightBound = canvas.width - modelWidth;
    // Random value between 0 - rightbound
    return (Math.floor((Math.random() * rightBound) + 0));
}