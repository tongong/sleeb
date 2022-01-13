const m = require("mithril");

module.exports = () => {
    return {
        view: (vnode) => ( m("div",
            m(".header", vnode.attrs.pages.map(p =>
                m("div", {
                    class: (m.route.get() == "/" + p)? "bold" : ""
                }, m(m.route.Link, {href: "/" + p}, p))
            )),
            m(".main-content", m("div", vnode.children))
        ))
    }
}
