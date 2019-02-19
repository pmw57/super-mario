function Compositor() {
    const compositor = {};
    compositor.layers = [];

    compositor.draw = function draw(context, camera) {
        compositor.layers.forEach(
            (layer) => layer(context, camera)
        );
    };
    return compositor;
}

export default Object.freeze(Compositor);