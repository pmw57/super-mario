/*jslint browser */
function makeSpriteSheet(image, width, height) {
    const spriteSheet = {};
    spriteSheet.image = image;
    spriteSheet.width = width;
    spriteSheet.height = height;
    spriteSheet.tiles = new Map();

    spriteSheet.define = function define(name, x, y, width, height) {
        const buffer = document.createElement("canvas");
        buffer.width = width;
        buffer.height = height;
        buffer.getContext("2d").drawImage(
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
        spriteSheet.tiles.set(name, buffer);
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

    spriteSheet.draw = function draw(name, context, x, y) {
        const buffer = spriteSheet.tiles.get(name);
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