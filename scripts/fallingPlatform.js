
BASE_FALLING_RATE = 3;
PLATFORM_SIDE_SPEED = 2;
FALL_SPEED_UP = 2;

function FallingPlatform() {
    this.x = canvas.width/2;
    this.y = 0;
    this.speed = BASE_FALLING_RATE * goal.getSpeedMultiplier();

    this.draw = function () {

        ctx.drawImage(amazonLogo, this.x, this.y);

        // ctx.beginPath();
        // ctx.rect(this.x, this.y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
        // ctx.fillStyle = "#FFFF00";
        // ctx.fill();
        // ctx.closePath();
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
        var placedPlatformRect = {x: pp.x, y: pp.y,
                          width: PLATFORM_WIDTH, height: PLATFORM_HEIGHT};

        return collision(placedPlatformRect, this.rect());

    }

    this.moveLeft = function() {
        var leftBound = 0;
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
        // Ensure that there is always a falling block visible 
        // on the screen
        if (this.crashedIntoTheGround()) {
            this.resetToTop();
        }

        // Allow the user speed up the falling speed of the block
        if (sPressed) {
            this.y += this.speed * FALL_SPEED_UP;
        } else {
            // Platform still falls with no input
            this.y += this.speed;
        }

        if (aPressed) {
            this.moveLeft();
        }

        if (dPressed) {
            this.moveRight();
        }
    }
}
