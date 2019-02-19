/*jslint browser */
const makeTrait = function (name) {
    const trait = {};
    trait.NAME = name;
    trait.update = function update() {
        window.console.warn("Unhandled update call");
    };
    return trait;
};

export default makeTrait;
