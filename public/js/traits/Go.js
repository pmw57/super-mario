import trait from "../Trait.js";

function makeGo() {
    const go = trait("go");
    go.dir = 0;
    go.acceleration = 400;
    go.deceleration = 300;
    go.dragFactor = 1 / 5000;

    go.distance = 0;
    go.heading = 1;

    go.update = function update(entity, deltaTime) {
        const absX = Math.abs(entity.vel.x);
        if (go.dir !== 0) {
            entity.vel.x += go.acceleration * deltaTime * go.dir;
            go.heading = go.dir;
        } else if (entity.vel.x !== 0) {
            const decel = Math.min(absX, go.deceleration * deltaTime);
            entity.vel.x += (
                entity.vel.x > 0
                ? -decel
                : decel
            );
        } else {
            go.distance = 0;
        }
        const drag = go.dragFactor * entity.vel.x * absX;
        entity.vel.x -= drag;

        go.distance += absX * deltaTime;
    };
    return go;
}

export default Object.freeze(makeGo);