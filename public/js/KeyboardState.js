const PRESSED = 1;
const RELEASED = 0;

const makeKeyboardState = function makeKeyboardState() {
    const keyboard = {};
    // Holds the current state of a given key
    keyboard.keyStates = new Map();
    // Holds the callback functions for a key code
    keyboard.keyMap = new Map();

    keyboard.addMapping = function addMapping(code, callback) {
        keyboard.keyMap.set(code, callback);
    };

    keyboard.handleEvent = function handleEvent(event) {
        const {code} = event;

        if (!keyboard.keyMap.has(code)) {
            // Did not have key mapped.
            return;
        }

        event.preventDefault();

        const keyState = (
            event.type === "keydown"
            ? PRESSED
            : RELEASED
        );

        if (keyboard.keyStates.get(code) === keyState) {
            return;
        }

        keyboard.keyStates.set(code, keyState);

        keyboard.keyMap.get(code)(keyState);
    };

    keyboard.listenTo = function listenTo(window) {
        ["keydown", "keyup"].forEach(function addHandlers(eventName) {
            window.addEventListener(eventName, function keyHandler(event) {
                keyboard.handleEvent(event);
            });
        });
    };
    return keyboard;
};

export default Object.freeze(makeKeyboardState);