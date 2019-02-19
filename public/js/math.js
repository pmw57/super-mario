function makeMatrix() {
    const matrix = {};
    matrix.grid = [];

    matrix.forEach = function forEach(callback) {
        matrix.grid.forEach(function (column, x) {
            column.forEach(function (value, y) {
                callback(value, x, y);
            });
        });
    };

    matrix.get = function get(x, y) {
        const col = matrix.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    };

    matrix.set = function set(x, y, value) {
        if (!matrix.grid[x]) {
            matrix.grid[x] = [];
        }

        matrix.grid[x][y] = value;
    };
    return matrix;
}

function makeVec2(x, y) {
    const vec2 = {};

    vec2.set = function set(x, y) {
        vec2.x = x;
        vec2.y = y;
    };

    vec2.set(x, y);

    return vec2;
}

export default Object.freeze({
    matrix: makeMatrix,
    vec2: makeVec2
});