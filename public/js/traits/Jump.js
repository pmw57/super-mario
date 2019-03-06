import trait from "../Trait.js";
import entity from "../Entity.js";

const sides = entity.sides;

function makeJump() {
    const jump = trait("jump");
    jump.ready = 0;
    jump.duration = 0.5;
    jump.engageTime = 0;
    jump.velocity = 200;

    Object.defineProperty(jump, "falling", {
        get: function falling() {
            return jump.ready < 0;
        }
    });
    jump.start = function start() {
        if (jump.ready > 0) {
            jump.engageTime = jump.duration;
        }
    };
    jump.cancel = function cancel() {
        jump.engageTime = 0;
    };
    jump.obstruct = function obstruct(ignore, side) {
        if (side === sides.BOTTOM) {
            jump.ready = 1;
        } else if (side === sides.TOP) {
            jump.cancel();
        }
    };
    jump.update = function update(entity, deltaTime) {
        if (jump.engageTime > 0) {
            entity.vel.y = -jump.velocity;
            jump.engageTime -= deltaTime;
        }
        jump.ready -= 1;
    };
    return jump;
}

export default Object.freeze(makeJump);