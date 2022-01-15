const m = require("mithril");
const keyBoxes = require("./key-boxes.js");
const training = require("../modules/training.js");
const input = require("../modules/input.js");

function fixSpace(c) {
    if (c == " ") return "_";
    return c;
}

module.exports = () => {
    let test;
    let showHint = false;
    let hintWasShown = false;
    let wrongSubmit = false;
    let hinthandler = (e) => {
        if (e.key == input.hintkey) showHint = !showHint;
        if (showHint) hintWasShown = true;
        m.redraw();
    }
    let newTest = () => {
        test = training.getTest();
        showHint = false;
        hintWasShown = false;
        wrongSubmit = false;
    }
    let oninput = (c) => {
        if (test[0] == c) {
            training.saveTest(test[0], !hintWasShown && !wrongSubmit);
            newTest();
        }
        else wrongSubmit = true;
    }
    return {
        oninit: () => {
            newTest();
        },
        view: () => m("div",
            m(".trainerTop",
                m(".bigletter", {
                    class: wrongSubmit ? "red" : ""
                }, m("span", fixSpace(test[0]))),
                m(".hint", {
                    class: showHint ? "" : "invisible"
                }, "Hint: " + test[1])
            ),
            m(".trainerBottom", m(keyBoxes, {
                inputCallback: oninput,
                keyCallback: hinthandler
            }))
        )
    }
};
