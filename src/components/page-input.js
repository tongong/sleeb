const m = require("mithril");
const keyBoxes = require("./key-boxes.js");

module.exports = () => {
    let written = "> ";
    let oninput = (c) => {
        written += c;
    }
    return {
        view: () => m("div",
            m("div.inputTop", written),
            m("div.inputBottom", m(keyBoxes, {inputCallback: oninput}))
        )
    }
};
