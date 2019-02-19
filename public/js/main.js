/*jslint browser */
import camera from "./Camera.js";
import timer from "./Timer.js";
import loaders from "./loaders.js";
import entities from "./entities.js";
import layers from "./layers.js";
import input from "./input.js";
import debug from "./debug.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([
    entities.createMario(),
    loaders.loadLevel("1-1")
]).then(function playLevel([mario, level]) {
    window.camera = camera();

    mario.pos.set(64, 64);

    level.comp.layers.push(
        layers.createCollisionLayer(level),
        layers.createCameraLayer(window.camera)
    );

    level.entities.add(mario);

    const keyboard = input.setupKeyboard(mario);
    keyboard.listenTo(window);

    debug.setupMouseControl(canvas, mario, window.camera);

    const gameTimer = timer(1 / 60);
    gameTimer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.comp.draw(context, window.camera);
    };

    gameTimer.start();
});