import trait from "../Trait.js";

function makeGo() {
    const go = trait("go");
    go.dir = 0;
    go.speed = 6000;

    go.update = function update(entity, deltaTime) {
        entity.vel.x = go.speed * go.dir * deltaTime;
    };
    return go;
}

export default Object.freeze(makeGo);