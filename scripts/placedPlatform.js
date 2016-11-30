
PLATFORM_WIDTH = 75;
PLATFORM_HEIGHT = 15;

function PlacedPlatform(x, y){
    this.x = x;
    this.y = y;

    this.draw = function () {

        ctx.drawImage(dollarBill, this.x, this.y);

        // ctx.beginPath();
        // ctx.rect(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
        // ctx.fillStyle = "#00FF00";
        // ctx.fill();
        // ctx.closePath();
    } 

    /**
     * Checks if the player is ontop of this 
     * placed platform instance
     */
    this.playerIsOnPlatform = function(player) {

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
            playersFeet = player.y + PLAYER_HEIGHT;

            // We want the player to be standing on top of the platform
            return (playersFeet >= this.y && playersFeet <= this.y+10);

        } else {
            return false;
        }
    }
}
