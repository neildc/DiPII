/**

 */

function drawStatus(ctx, state) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Fuel: " + state.p1.fuel, 8, 20);
    ctx.fillText("Lives: " + state.p1.lives, 8, 40);
    ctx.fillText("Platforms: " + remainingPlatforms(state.placedPlatforms), 8, 60);
    ctx.fillText("Level: " + state.goal.currentLevel, 8, 80);
}

function drawPlacedPlatforms(ctx, textures, state) {
    state.placedPlatforms.forEach(pp => pp.draw(ctx, textures));
}

function drawBackground(ctx, textures) {
    ctx.drawImage(textures.background, 0, 0);
}

function detectCollisions(state) {

    if (state.fallingPlatform.collidedWithPlayer(state.p1)) {
        state.p1.respawn();
        state.fallingPlatform.resetToTop();
    }

    if (state.goal.collidedWithPlayer(state.p1)) {
        levelUp(state);
    }

    if (state.invertBlock != null) {
        if (state.invertBlock.collidedWithPlayer(state.p1)) {
            state.invertBlock = null;
            invertKeys();
        }
    }

    state.placedPlatforms.forEach(function (pp) {
        if (state.fallingPlatform.collidedWithPlacedPlatform(pp)) {
            state.placedPlatforms.splice(state.placedPlatforms.indexOf(pp), 1);
            state.p1.platforms++;
        }
    });
}

function update(state) {
    if (state.p1.lives == 0) {
        gameover(state);
    } else {
        state.p1.update(state);
        state.fallingPlatform.update();
    }
}

function detectKeys(state) {

    state.p1.detectKeys();
    state.fallingPlatform.detectKeys();

    if (spacePressed) {
        // TODO: proper debounce/single press
        if (state.fallingPlatform.y > 50) {
            // 10% chance of placing an invert block instead
            // of a normal block
            if (Math.floor(Math.random() * 10 + 0) == 0) {
                placeInvertBlock(state);
            } else {
                placePlatform(state);
            }
        }
    }
}

function draw(ctx, textures, state) {
    ctx.clearRect(0, 0, getCanvas().width, getCanvas().height);
    drawBackground(ctx, textures);
    drawPlacedPlatforms(ctx, textures, state);
    state.p1.draw(ctx, textures);
    state.goal.draw(ctx, textures);
    state.fallingPlatform.draw(ctx, textures);
    if (state.invertBlock != null) state.invertBlock.draw(ctx, textures);
    drawStatus(ctx, state);
}

function gameLoop(ctx, textures, state) {

    detectCollisions(state);
    detectKeys(state);
    update(state);
    draw(ctx, textures, state);
}

function levelUp(state) {
    state.goal.levelUp();
    console.log("level is :", state.goal.currentLevel);
    state.fallingPlatform.updateSpeed(state.goal.currentLevel);
    state.p1.resetPlayerToRandomXAtBottom();
}

function resetGame(state) {
    state.reset();
}

function gameover(state) {
    resetGame(state);
}

function remainingPlatforms (placedPlatforms) {
    return MAX_PLATFORMS - placedPlatforms.length;
}

function placePlatform(state) {
    if (remainingPlatforms(state.placedPlatforms)) {
        state.placedPlatforms.push(
            new PlacedPlatform(state.fallingPlatform.x,
                               state.fallingPlatform.y));
        state.fallingPlatform.resetToTop();
    }
}

function placeInvertBlock(state) {

    // Overwrite the existing invertblock if its there
    // We only want a single invertblock at any time
    state.invertBlock = new InvertBlock(state.fallingPlatform.x,
                                        state.fallingPlatform.y);
    state.fallingPlatform.resetToTop();
}
