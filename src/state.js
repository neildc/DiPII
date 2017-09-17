class State {

    constructor() {
        this.reset();
    }

    reset () {
        let canvas = getCanvas();
        this.p1 = new Player(canvas.width / 2, canvas.height - PLAYER_HEIGHT, 5);
        this.goal = new Goal();
        this.placedPlatforms = [];
        this.fallingPlatform = new FallingPlatform();
        this.invertBlock = null;
    }
}
