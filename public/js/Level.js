import compositor from "./Compositor.js";
import tileCollider from "./TileCollider.js";
import math from "./math.js";

function makeLevel() {
    const level = {};
    level.gravity = 2000;
    level.totalTime = 0;
    level.comp = compositor();
    level.entities = new Set();
    level.tiles = math.matrix();
    level.tileCollider = tileCollider(level.tiles);

    level.update = function update(deltaTime) {
        level.entities.forEach(function updateEntity(entity) {
            entity.update(deltaTime);

            entity.pos.x += entity.vel.x * deltaTime;
            level.tileCollider.checkX(entity);

            entity.pos.y += entity.vel.y * deltaTime;
            level.tileCollider.checkY(entity);

            entity.vel.y += level.gravity * deltaTime;

            level.totalTime += deltaTime;
        });
    };
    return level;
}

export default Object.freeze(makeLevel);