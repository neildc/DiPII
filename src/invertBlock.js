/**
 * invertBlock.js
 *
 */

class InvertBlock {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, textures) {
        ctx.drawImage(textures.invertBlock, this.x, this.y);
    }

    rect() {
        return { x: this.x, y: this.y, width: PLATFORM_WIDTH, height: PLATFORM_HEIGHT };
    }

    collidedWithPlayer(player) {
        var playerRect = { x: player.x, y: player.y,
            width: PLAYER_WIDTH, height: PLAYER_HEIGHT };

        return collision(playerRect, this.rect());
    }

}
