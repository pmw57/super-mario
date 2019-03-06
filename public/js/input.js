import keyboard from "./KeyboardState.js";

function setupKeyboard(mario) {
    const input = keyboard();

    input.addMapping("KeyP", function jump(keyState) {
        if (keyState) {
            mario.jump.start();
        } else {
            mario.jump.cancel();
        }
    });

    input.addMapping("KeyO", function moveRight(keyState) {
        mario.turbo(keyState);
    });

    input.addMapping("KeyD", function moveRight(keyState) {
        mario.go.dir += (
            keyState
            ? 1
            : -1
        );
    });

    input.addMapping("KeyA", function moveLeft(keyState) {
        mario.go.dir += (
            keyState
            ? -1
            : 1
        );
    });

    return input;
}

export default Object.freeze({setupKeyboard});