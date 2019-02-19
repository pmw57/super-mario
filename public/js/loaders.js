/*jslint browser */
import Level from "./Level.js";
import SpriteSheet from "./SpriteSheet.js";
import layers from "./layers.js";

function loadImage(url) {
    return new Promise(function resolveImage(resolve) {
        const image = new window.Image();
        image.addEventListener("load", () => resolve(image));
        image.src = url;
    });
}

function loadJSON(url) {
    return window.fetch(url).then((r) => r.json());
}

function createTiles(level, backgrounds) {

    function applyRange(background, xStart, xLen, yStart, yLen) {
        const xEnd = xStart + xLen;
        const yEnd = yStart + yLen;
        let x = xStart;
        while (x < xEnd) {
            let y = yStart;
            while (y < yEnd) {
                level.tiles.set(x, y, {
                    name: background.tile,
                    type: background.type
                });
                y += 1;
            }
            x += 1;
        }
    }

    backgrounds.forEach(function (background) {
        background.ranges.forEach(function (range) {
            const [xStart, xLen, yStart, yLen] = range;
            if (range.length === 4) {
                applyRange(background, xStart, xLen, yStart, yLen);

            } else if (range.length === 3) {
                applyRange(background, xStart, xLen, yStart, 1);

            } else if (range.length === 2) {
                applyRange(background, range.xStart, 1, range.yStart, 1);
            }
        });
    });
}

function loadSpriteSheet(name) {
    return loadJSON(`/sprites/${name}.json`).then(
        (sheetSpec) => Promise.all([
            sheetSpec,
            loadImage(sheetSpec.imageURL)
        ])
    ).then(function ([sheetSpec, image]) {
        const sprites = new SpriteSheet(
            image,
            sheetSpec.tileW,
            sheetSpec.tileH
        );

        sheetSpec.tiles.forEach(function (tileSpec) {
            sprites.defineTile(
                tileSpec.name,
                tileSpec.index[0],
                tileSpec.index[1]
            );
        });

        return sprites;
    });
}

function loadLevel(name) {
    return loadJSON(`/levels/${name}.json`).then(
        (levelSpec) => Promise.all([
            levelSpec,
            loadSpriteSheet(levelSpec.spriteSheet)
        ])
    ).then(function ([levelSpec, backgroundSprites]) {
        const level = new Level();

        createTiles(level, levelSpec.backgrounds);

        const backgroundLayer = layers.createBackgroundLayer(
            level,
            backgroundSprites
        );
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = layers.createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
    });
}

export default Object.freeze({loadImage, loadLevel});