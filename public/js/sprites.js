import spriteSheet from "./SpriteSheet.js";
import loaders from "./loaders.js";

function loadMarioSprite() {
    return loaders.loadImage("/img/characters.gif").then(
        function defineSprites(image) {
            const sprites = spriteSheet(image, 16, 16);
            sprites.define("idle", 276, 44, 16, 16);
            return sprites;
        }
    );
}

export default Object.freeze({loadMarioSprite});
