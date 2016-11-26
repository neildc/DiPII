
BASE_FALLING_RATE = 3;
PLATFORM_SIDE_SPEED = 2;

function FallingPlatform() {
    this.x = canvas.width/2;
    this.y = 0;
    this.speed = BASE_FALLING_RATE * goal.getSpeedMultiplier();

    this.draw = function () {
        ctx.beginPath();
        ctx.rect(this.x, this.y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
        ctx.fillStyle = "#FF95DD";
        ctx.fill();
        ctx.closePath();
    } 


    this.rect = function() {return {x:this.x, y:this.y, width:PLATFORM_WIDTH, height:PLATFORM_HEIGHT}};

    this.resetToTop = function() {
        this.y = 0; 
        this.x = randomXInCanvasWidth(PLATFORM_WIDTH); 
    }

    this.crashedIntoTheGround = function() {
        return (this.y >= canvas.height);
    }

    this.collidedWithPlayer = function(player) {
        var playerRect = {x: player.x, y: player.y,
                          width: PLAYER_WIDTH, height: PLAYER_HEIGHT};

        return collision(playerRect, this.rect());
    }

    this.collidedWithPlacedPlatform = function(pp) {
        var playerRect = {x: pp.x, y: pp.y,
                          width: PLATFORM_WIDTH, height: PLATFORM_HEIGHT};

        return collision(playerRect, this.rect());

    }

    this.moveLeft = function() {
        var leftBound = 0 + PLATFORM_WIDTH;
        if (this.x > leftBound) {
            this.x -= PLATFORM_SIDE_SPEED;
        }
    }

    this.moveRight = function() {
        var rightBound = canvas.width - PLATFORM_WIDTH;
        if (this.x < rightBound) {
            this.x += PLATFORM_SIDE_SPEED;
        }
    }

    this.update = function () {
        if (this.crashedIntoTheGround()) {
            this.resetToTop();
        }
        this.y += this.speed;

        if (aPressed) {
            this.moveLeft();
        }

        if (dPressed) {
            this.moveRight();
        }
    }
}
