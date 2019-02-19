import trait from "../Trait.js";

function makeGo() {
    const go = trait("go");
    go.dir = 0;
    go.speed = 6000;
    go.distance = 0;

    go.update = function update(entity, deltaTime) {
        entity.vel.x = go.speed * go.dir * deltaTime;
        if (go.dir) {
            go.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            go.distance = 0;
        }
    };
    return go;
}

export default Object.freeze(makeGo);