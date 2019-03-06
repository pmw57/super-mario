function setupMouseControl(canvas, entity, camera) {
    let lastEvent;

    ["mousedown", "mousemove"].forEach(function addEvents(eventName) {
        canvas.addEventListener(eventName, function mouseHandler(event) {
            if (event.buttons === 1) {
                entity.vel.set(0, 0);
                entity.pos.set(
                    event.offsetX + camera.pos.x,
                    event.offsetY + camera.pos.y
                );
            } else if (
                event.buttons === 2 &&
                lastEvent && lastEvent.buttons === 2 &&
                lastEvent.type === "mousemove"
            ) {
                camera.pos.x -= event.offsetX - lastEvent.offsetX;
            }
            lastEvent = event;
        });
    });

    canvas.addEventListener("contextmenu", function preventContext(event) {
        event.preventDefault();
    });
}

export default Object.freeze({setupMouseControl});