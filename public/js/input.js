import keyboard from "./KeyboardState.js";

function setupKeyboard(entity) {
    const input = keyboard();

    input.addMapping("Space", function (keyState) {
        if (keyState) {
            entity.jump.start();
        } else {
            entity.jump.cancel();
        }
    });

    input.addMapping("ArrowRight", function (keyState) {
        entity.go.dir = keyState;
    });

    input.addMapping("ArrowLeft", function (keyState) {
        entity.go.dir = -keyState;
    });

    return input;
}

export default Object.freeze({setupKeyboard});