import entity from "./Entity.js";
import go from "./traits/Go.js";
import jump from "./traits/Jump.js";
import loaders from "./loaders.js";
import createAnim from "./anim.js";

const SLOW_DRAG = 1 / 1000;
const FAST_DRAG = 1 / 5000;

function createMario() {
    return loaders.loadSpriteSheet("mario").then(
        function addMario(sprite) {
            const mario = entity.makeEntity();
            mario.size.set(14, 16);

            mario.addTrait(go());
            mario.go.dragFactor = SLOW_DRAG;
            mario.addTrait(jump());

            mario.turbo = function setTurboState(turboOn) {
                mario.go.dragFactor = (
                    turboOn
                    ? FAST_DRAG
                    : SLOW_DRAG
                );
            };

            const runAnim = createAnim(["run-1", "run-2", "run-3"], 6);
            function routeFrame(mario) {
                if (mario.jump.falling) {
                    return "jump";
                }
                if (mario.go.distance > 0) {
                    if (
                        (mario.vel.x > 0 && mario.go.dir < 0) ||
                        (mario.vel.x < 0 && mario.go.dir > 0)
                    ) {
                        return "brake";
                    }
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