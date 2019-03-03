/*jslint browser */
function Timer(deltaTime = 1 / 60) {
    const timer = {};

    let accumulatedTime = 0;
    let lastTime = 0;

    timer.updateProxy = function updateProxy(time) {
        accumulatedTime += (time - lastTime) / 1000;

        if (accumulatedTime > 1) {
            accumulatedTime = 1;
        }

        while (accumulatedTime > deltaTime) {
            timer.update(deltaTime);
            accumulatedTime -= deltaTime;
        }

        lastTime = time;

        timer.enqueue();
    };

    timer.enqueue = function enqueue() {
        window.requestAnimationFrame(timer.updateProxy);
    };

    timer.start = function start() {
        timer.enqueue();
    };
    return timer;
}

export default Object.freeze(Timer);