const m = require("mithril");
const input = require("../modules/input.js");

/* inputCallback: expects one argument: char to input
 * keyCallback: can be used for event handling of other pressed keys
 */
module.exports = (vnode) => {
    let icb = vnode.attrs.inputCallback;
    let kcb = vnode.attrs.keyCallback;
    let active = [false, false, false];
    // contains indizes of pressed key in the order in which they were pressed
    let pressed = [];
    // if there was a point in time during this gesture where all keys were
    // pressed simultaneously
    let full = false;
    // gestures that are not processed yet
    let gestures = [];
    return {
        oncreate: () => {
            document.onkeydown = (e) => {
                let index = input.keys.indexOf(e.key);
                if (!e.repeat) {
                    if (kcb) kcb(e);
                    if (index != -1) {
                        active[index] = true;
                        if (active.every(e => e)) full = true;
                        pressed.push(index);
                        m.redraw();
                    }
                }
            }
            document.onkeyup = (e) => {
                let index = input.keys.indexOf(e.key);
                if (index != -1) {
                    active[index] = false;
                    if (active.every(e => !e)) {
                        gestures.push(input.pressed2gesture(pressed, full));
                        pressed = [];
                        full = false;
                        let charMaybe = input.gestures2char(gestures);
                        if (charMaybe) {
                            icb(charMaybe);
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
