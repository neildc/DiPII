class PlacedPlatform {

    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.drawImage(textures.placedPlatform, this.x, this.y);
    }

    /**
     * Checks if the player is ontop of this
     * placed platform instance
     */
    playerIsOnPlatform(player) {

        // Allow player to stand of the left edge
        var platformLeftBound = this.x - PLAYER_WIDTH;
        var platformRightBound = this.x + PLATFORM_WIDTH;

        // console.log(player);

        /**
         * Only checking the top bounds
         * Since we will have a collision detector
         * for the bottom and sides of the platform which will
         * be triggered before this.
         */
        if (player.x > platformLeftBound &&
            player.x < platformRightBound) {

            // This would be the bottom of the visible model
            const playersFeet = player.y + PLAYER_HEIGHT;

            // We want the player to be standing on top of the platform
            return (playersFeet >= this.y && playersFeet <= this.y+10);

        } else {
            return false;
        }
    }
}
