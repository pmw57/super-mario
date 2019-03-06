import keyboard from "./KeyboardState.js";

function setupKeyboard(entity) {
    const input = keyboard();

    input.addMapping("KeyP", function (keyState) {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping("KeyD", function (keyState) {
        entity.go.dir += (
            keyState
            ? 1
            : -1
        );
    });

    input.addMapping("KeyA", function (keyState) {
        entity.go.dir += (
            keyState
            ? -1
            : 1
        );
    });

    return input;
}

export default Object.freeze({setupKeyboard});