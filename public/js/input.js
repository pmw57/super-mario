import keyboard from "./KeyboardState.js";

function setupKeyboard(entity) {
    const input = keyboard();

    input.addMapping("KeyP", function jump(keyState) {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping("KeyD", function moveRight(keyState) {
        entity.go.dir += (
            keyState
            ? 1
            : -1
        );
    });

    input.addMapping("KeyA", function moveLeft(keyState) {
        entity.go.dir += (
            keyState
            ? -1
            : 1
        );
    });

    return input;
}

export default Object.freeze({setupKeyboard});