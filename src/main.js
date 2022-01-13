const m = require("mithril");

// maybe add a configuration option for this later
const keys = ["j", "k", "l"];

function main() {
    let active = [false, false, false];
    return {
        oncreate: function() {
            document.onkeydown = (e) => {
                if (!e.repeat && keys.indexOf(e.key) != -1) {
                    active[keys.indexOf(e.key)] = true;
                    m.redraw();
                }
            }
            document.onkeyup = (e) => {
                if (keys.indexOf(e.key) != -1) {
                    active[keys.indexOf(e.key)] = false;
                    m.redraw();
                }
            }
        },
        view: function() {
            return m(".keyBoxWrap", [0, 1, 2].map(
                i => m(".keyBox", {
                    class: active[i] ? "keyBoxHighlight" : ""
                })
            ));
        }
    }
};

m.mount(document.body, main);
