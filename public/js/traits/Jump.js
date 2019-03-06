import trait from "../Trait.js";

function makeJump() {
    const jump = trait("jump");
    jump.ready = false;
    jump.duration = 0.5;
    jump.engageTime = 0;
    jump.velocity = 200;
    jump.start = function start() {
        if (jump.ready) {
            jump.engageTime = jump.duration;
        }
    };
    jump.cancel = function cancel() {
        jump.engageTime = 0;
    };
    jump.obstruct = function obstruct(ignore, side) {
        if (side === "bottom") {
            jump.ready = true;
        }
    };
    jump.update = function update(entity, deltaTime) {
        if (jump.engageTime > 0) {
            entity.vel.y = -jump.velocity;
            jump.engageTime -= deltaTime;
        }
        jump.ready = false;
    };
    return jump;
}

export default Object.freeze(makeJump);