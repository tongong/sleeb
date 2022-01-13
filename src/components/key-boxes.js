const m = require("mithril");
const input = require("../modules/input.js");

/* inputCallback:
 * expects one argument: char to input
 */
module.exports = (vnode) => {
    let cb = vnode.attrs.inputCallback;
    let active = [false, false, false];
    // contains indizes of pressed key in the order in which they were pressed
    let pressed = [];
    // gestures that are not processed yet
    let gestures = [];
    return {
        oncreate: () => {
            document.onkeydown = (e) => {
                let index = input.keys.indexOf(e.key);
                if (!e.repeat && index != -1) {
                    active[index] = true;
                    pressed.push(index);
                    m.redraw();
                }
            }
            document.onkeyup = (e) => {
                let index = input.keys.indexOf(e.key);
                if (index != -1) {
                    active[index] = false;
                    if (active.every(e => !e)) {
                        gestures.push(input.pressed2gesture(pressed));
                        pressed = [];
                        let charMaybe = input.gestures2char(gestures);
                        if (charMaybe) {
                            cb(charMaybe);
                            gestures = [];
                        }
                    }
                    m.redraw();
                }
            }
        },
        view: () => m(".keyBoxWrapWrap",
            m(".keyBoxWrap", [0, 1, 2].map(
                i => m(".keyBox", {
                    class: active[i] ? "keyBoxHighlight" : ""
                })
            )),
            m(".keyBoxHint", gestures.map(e => "G" + e).join(" "))
        )
    }
};
