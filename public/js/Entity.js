import math from "./math.js";

const sides = {
    TOP: Symbol("top"),
    BOTTOM: Symbol("bottom")
};

function makeEntity() {
    const entity = {};
    entity.pos = math.vec2(0, 0);
    entity.vel = math.vec2(0, 0);
    entity.size = math.vec2(0, 0);
    entity.traits = [];

    entity.addTrait = function add(trait) {
        entity.traits.push(trait);
        entity[trait.NAME] = trait;
    };

    entity.obstruct = function obstruct(side) {
        entity.traits.forEach(function (trait) {
            trait.obstruct(entity, side);
        });
    };

    entity.update = function update(deltaTime) {
        entity.traits.forEach(function (trait) {
            trait.update(entity, deltaTime);
        });
    };
    return entity;
}

export default Object.freeze({
    sides,
    makeEntity
});