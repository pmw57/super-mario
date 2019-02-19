import trait from "../Trait.js";

function makeVelocity() {
    const velocity = trait("velocity");

    velocity.update = function update(entity, deltaTime) {
        entity.pos.x += entity.vel.x * deltaTime;
        entity.pos.y += entity.vel.y * deltaTime;
    };
    return velocity;
}

export default Object.freeze(makeVelocity);