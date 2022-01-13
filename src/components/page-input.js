const m = require("mithril");
const keyBoxes = require("./key-boxes.js");

module.exports = () => {
    let written = "";
    let ongesture = (g) => {
        written += g;
    }
    return {
        view: () => m("div",
            m("div", {style: "height:40%;width:100%"}, written),
            m("div", {style: "height:60%;width:100%"},
                m(keyBoxes, {inputCallback: ongesture})
            )
        )
    }
};
