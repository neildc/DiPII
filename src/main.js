function main() {
    let textures = {};
    var fire;

    enableNormalKeyEventListeners();

    // Loads images then run the following callback once that is complete
    loadImages(sources, function(images) {
        let canvas = document.getElementById("gameCanvas");
        let ctx = canvas.getContext("2d");
        let state = new State();
        tabIndex = 1;

        textures.goal = images.goal;
        textures.fallingPlatform = images.fallingPlatform;
        textures.invertBlock = images.invertBlock;
        textures.placedPlatform = images.placedPlatform;
        textures.dude = images.dude;
        textures.fire = images.fire;
        textures.background = images.background;

        resetGame(state);

        // Run the game loop every 10ms
        setInterval(() => {gameLoop(ctx, textures, state);}, 10);
    });
}
m
