const m = require("mithril");
const input = require("../modules/input.js");
const keyBoxes = require("./key-boxes.js");

module.exports = () => {
    let written = "";
    let blind = false;
    let oninput = (c) => {
        // clear input on "-" -> new bullet point / new thought
        if (c == "-") written = "";
        else if (c == input.deletechar)
            written = written.substring(0, written.length - 1)
        else written += c;
    };
    let blindhandler = (e) => {
        if (e.key == input.blindkey) blind = !blind;
        m.redraw();
    };
    return {
        view: () => m("div",
            m("div.inputTop", "> " + written),
            m("div.inputBottom", m(keyBoxes, {
                inputCallback: oninput,
                keyCallback: blindhandler
            })),
            m(".blindOverlay", {class: blind? "" : "invisible"})
        )
    }
};
