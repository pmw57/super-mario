import math from "./math.js";

function makeEntity() {
    const entity = {};
    entity.pos = math.vec2(0, 0);
    entity.vel = math.vec2(0, 0);
    entity.size = math.vec2(0, 0);
    entity.traits = [];

    entity.addTrait = function (trait) {
        entity.traits.push(trait);
        entity[trait.NAME] = trait;
    };

    entity.obstruct = function obstruct(side) {
        entity.traits.forEach(function (trait) {
            trait.obstruct(entity, side);
        });
    };

    entity.update = function (deltaTime) {
        entity.traits.forEach(function (trait) {
            trait.update(entity, deltaTime);
        });
    };
    return entity;
}

export default Object.freeze(makeEntity);