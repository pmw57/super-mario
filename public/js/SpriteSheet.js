/*jslint browser */
function makeSpriteSheet(image, width, height) {
    const spriteSheet = {};
    spriteSheet.image = image;
    spriteSheet.width = width;
    spriteSheet.height = height;
    spriteSheet.tiles = new Map();

    spriteSheet.define = function define(name, x, y, width, height) {
        const buffers = [false, true].map(function (flip) {
            const buffer = document.createElement("canvas");
            buffer.width = width;
            buffer.height = height;

            const context = buffer.getContext("2d");

            if (flip) {
                context.scale(-1, 1);
                context.translate(-width, 0);
            }

            context.drawImage(
                spriteSheet.image,
                x,
                y,
                width,
                height,
                0,
                0,
                width,
                height
            );
            return buffer;
        });
        spriteSheet.tiles.set(name, buffers);
    };

    spriteSheet.defineTile = function defineTile(name, x, y) {
        spriteSheet.define(
            name,
            x * spriteSheet.width,
            y * spriteSheet.height,
            spriteSheet.width,
            spriteSheet.height
        );
    };

    spriteSheet.draw = function draw(name, context, x, y, flip = false) {
        const buffer = spriteSheet.tiles.get(name)[(
            flip
            ? 1
            : 0
        )];
        context.drawImage(buffer, x, y);
    };

    spriteSheet.drawTile = function drawTile(name, context, x, y) {
        spriteSheet.draw(
            name,
            context,
            x * spriteSheet.width,
            y * spriteSheet.height
        );
    };

    return spriteSheet;
}

export default Object.freeze(makeSpriteSheet);