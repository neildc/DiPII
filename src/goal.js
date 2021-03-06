import {getCanvas, randomXInCanvasWidth, collision} from './util.js';
import {PLAYER_WIDTH, PLAYER_HEIGHT} from './player.js';

const GOAL_SIZE = 24;
const LEVEL_STEP = 70;

export default class Goal {

    constructor() {
        this.currentLevel = 1; //TODO: not sure if this should go here
        this.y = yFromLevel(1);
        this.x = randomXInCanvasWidth(GOAL_SIZE);
    }

    draw(ctx, textures) {
        ctx.drawImage(textures.goal, this.x, this.y);
    }

    rect() {
        return { x: this.x, y: this.y, width: GOAL_SIZE, height: GOAL_SIZE };
    }

    collidedWithPlayer(player) {

        var playerRect = { x: player.x, y: player.y,
            width: PLAYER_WIDTH, height: PLAYER_HEIGHT };

        return collision(playerRect, this.rect());
    }

    levelUp() {
        this.currentLevel++;
        this.y = yFromLevel(this.currentLevel);
        this.x = randomXInCanvasWidth(GOAL_SIZE);
    }

}

// Used to increase the distance from the floor of the game
// as the level increases
//
// Caps at 700 at level 10
function yFromLevel(level) {
    var y;
    if (level < 10) {
        y = level * LEVEL_STEP;
    } else {
        y = 10 * LEVEL_STEP;;
    }

    return (getCanvas().height - y);
}
