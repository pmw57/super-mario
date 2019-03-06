import trait from "../Trait.js";
import entity from "../Entity.js";

const sides = entity.sides;

function makeJump() {
    const jump = trait("jump");
    jump.ready = 0;
    jump.duration = 0.3;
    jump.engageTime = 0;
    jump.requestTime = 0;
    jump.gracePeriod = 0.1;
    jump.speedBoost = 0.3;
    jump.velocity = 200;

    Object.defineProperty(jump, "falling", {
        get: function falling() {
            return jump.ready < 0;
        }
    });
    jump.start = function start() {
        jump.requestTime = jump.gracePeriod;
    };
    jump.cancel = function cancel() {
        jump.engageTime = 0;
        jump.requestTime = 0;
    };
    jump.obstruct = function obstruct(ignore, side) {
        if (side === sides.BOTTOM) {
            jump.ready = 1;
        } else if (side === sides.TOP) {
            jump.cancel();
        }
    };
    jump.update = function update(entity, deltaTime) {
        if (jump.requestTime > 0) {
            if (jump.ready > 0) {
                jump.engageTime = jump.duration;
                jump.requestTime = 0;
            }
            jump.requestTime -= deltaTime;
        }
        if (jump.engageTime > 0) {
            entity.vel.y = -(
                jump.velocity + Math.abs(entity.vel.x) * jump.speedBoost
            );
            jump.engageTime -= deltaTime;
        }
        jump.ready -= 1;
    };
    return jump;
}

export default Object.freeze(makeJump);