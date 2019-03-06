/*jslint browser */
const makeTrait = function (name) {
    const trait = {};
    trait.NAME = name;
    trait.obstruct = function obstruct() {
        return;
    };
    trait.update = function update() {
        window.console.warn("Unhandled update call");
    };
    return trait;
};

export default Object.freeze(makeTrait);
