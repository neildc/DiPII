/**
 * invertBlock.js
 * 
 */

function InvertBlock(x, y)  {
   this.x = x; 
   this.y = y;

   this.draw = function () {
        ctx.beginPath();
        ctx.rect(x, y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
        ctx.fillStyle = "#FF0000";
        ctx.fill();
        ctx.closePath();
    } 
    
    this.rect = function() {return {x:this.x, y:this.y, width:PLATFORM_WIDTH, height:PLATFORM_HEIGHT}};


    this.collidedWithPlayer = function(player) {
        var playerRect = {x: player.x, y: player.y,
                          width: PLAYER_WIDTH, height: PLAYER_HEIGHT};

        return collision(playerRect, this.rect());
    }

} 