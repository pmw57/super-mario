import entity from "./Entity.js";
import go from "./traits/Go.js";
import jump from "./traits/Jump.js";
import loaders from "./loaders.js";
import createAnim from "./createAnim.js";

function createMario() {
    return loaders.loadSpriteSheet("mario").then(
        function addMario(sprite) {
            const mario = entity();
            mario.size.set(14, 16);

            mario.addTrait(go());
            mario.addTrait(jump());

            const runAnim = createAnim(["run-1", "run-2", "run-3"], 10);
            function routeFrame(mario) {
                if (mario.go.dir !== 0) {
                    return runAnim(mario.go.distance);
                }
                return "idle";
            }

            mario.draw = function drawMario(context) {
                sprite.draw(
                    routeFrame(mario),
                    context,
                    0,
                    0,
                    mario.go.heading < 0
                );
            };

            return mario;
        }
    );
}

export default Object.freeze({createMario});