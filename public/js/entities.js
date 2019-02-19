import entity from "./Entity.js";
import go from "./traits/Go.js";
import jump from "./traits/Jump.js";
// import Velocity from "./traits/Velocity.js";
import sprites from "./sprites.js";

function addMario(sprite) {
    const mario = entity();
    mario.size.set(14, 16);

    mario.addTrait(go());
    mario.addTrait(jump());
    //mario.addTrait(velocity());

    mario.draw = function drawMario(context) {
        sprite.draw("idle", context, 0, 0);
    };

    return mario;
}
function createMario() {
    return sprites.loadMarioSprite().then(addMario);
}

export default Object.freeze({createMario});