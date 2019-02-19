function makeTileResolver(matrix, tileSize = 16) {
    const tileResolver = {};
    tileResolver.matrix = matrix;
    tileResolver.tileSize = tileSize;

    tileResolver.toIndex = function toIndex(pos) {
        return Math.floor(pos / tileResolver.tileSize);
    };

    tileResolver.toIndexRange = function toIndexRange(pos1, pos2) {
        const pMax = Math.ceil(
            pos2 / tileResolver.tileSize
        ) * tileResolver.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(tileResolver.toIndex(pos));
            pos += tileResolver.tileSize;
        } while (pos < pMax);
        return range;
    };

    tileResolver.getByIndex = function getByIndex(indexX, indexY) {
        const tile = tileResolver.matrix.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * tileResolver.tileSize;
            const x2 = x1 + tileResolver.tileSize;
            const y1 = indexY * tileResolver.tileSize;
            const y2 = y1 + tileResolver.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2
            };
        }
    };

    tileResolver.searchByPosition = function searchByPosition(posX, posY) {
        return tileResolver.getByIndex(
            tileResolver.toIndex(posX),
            tileResolver.toIndex(posY)
        );
    };

    tileResolver.searchByRange = function searchByRange(x1, x2, y1, y2) {
        const matches = [];
        tileResolver.toIndexRange(x1, x2).forEach(function (indexX) {
            tileResolver.toIndexRange(y1, y2).forEach(function (indexY) {
                const match = tileResolver.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(match);
                }
            });
        });
        return matches;
    };
    return tileResolver;
}

export default Object.freeze(makeTileResolver);