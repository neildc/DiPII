
BASE_FALLING_RATE = 3;
PLATFORM_SIDE_SPEED = 2;
FALL_SPEED_UP = 2;

class FallingPlatform {

    constructor(){
        this.x = canvas.width/2;
        this.y = 0;
        this.speed = BASE_FALLING_RATE * goal.getSpeedMultiplier();
    }


    draw() {
        ctx.drawImage(textures.fallingPlatform, this.x, this.y);
    }

    rect () {
        return {
            x:this.x, y:this.y, width:PLATFORM_WIDTH, height:PLATFORM_HEIGHT
        };
    }

    resetToTop() {
        this.y = 0;
        this.x = randomXInCanvasWidth(PLATFORM_WIDTH);
    }

    crashedIntoTheGround () {
        return (this.y >= canvas.height);
    }

    collidedWithPlayer(player) {
        var playerRect = {x: player.x, y: player.y,
                          width: PLAYER_WIDTH, height: PLAYER_HEIGHT};

        return collision(playerRect, this.rect());
    }

    collidedWithPlacedPlatform(pp) {
        var playerRect = {x: pp.x, y: pp.y,
                          width: PLATFORM_WIDTH, height: PLATFORM_HEIGHT};

        return collision(playerRect, this.rect());

    }

    moveLeft() {
        var leftBound = 0;
        if (this.x > leftBound) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        var rightBound = canvas.width - PLATFORM_WIDTH;
        if (this.x < rightBound) {
            this.x += this.speed;
        }
    }

    update() {
        if (this.crashedIntoTheGround()) {
            this.resetToTop();
        }

        // Allow the user speed up the falling speed of the block
        if (sPressed) {
            this.y += this.speed * FALL_SPEED_UP;
        } else {
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
