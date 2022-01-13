const m = require("mithril");
const layout = require("./components/layout.js");
const pageInput = require("./components/page-input.js");
const pageTrainer = require("./components/page-trainer.js");
const pageAbout = require("./components/page-about.js");

// ugly workaround to fix scrolling on route change
// https://github.com/MithrilJS/mithril.js/issues/1655
m.mount(
    // Don't attach to the document
    document.createDocumentFragment(),
    {
        // We need a valid view for Mithril to behave
        view : () => '',
        // Will execute on the DOM ready phase of every draw
        onupdate(){
            const route = m.route.get();
            if (route != this.route) scrollTo(0, 0);
            this.route = route;
        }
    }
)

let resolver = (component) => ({
    onmatch: () => {
        return component;
    },
    render: (vnode) => {
        return m(layout, {pages: ["input", "trainer", "about"]}, vnode);
    }
});

m.route(document.body, "/input", {
    "/input": resolver(pageInput),
    "/trainer": resolver(pageTrainer),
    "/about": resolver(pageAbout)
});
