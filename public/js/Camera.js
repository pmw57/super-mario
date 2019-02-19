import math from "./math.js";

function Camera() {
    const camera = {};
    camera.pos = math.vec2(0, 0);
    camera.size = math.vec2(256, 224);
    return camera;
}

export default Object.freeze(Camera);