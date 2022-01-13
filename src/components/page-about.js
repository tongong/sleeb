const m = require("mithril");

module.exports = () => {
    return {
        view: () => m("div",
            m("h1", "sleepykeeb"),
            m("p", "This is an experimental idea for a keyboard layout / input method with only three keys."),
            m("h2", "inspiration"),
            m("p", "The main inspiration for this project stems from these two findings on hackernews:"),
            m("ul",
                m("li", m("a",
                    {href: "https://github.com/taylorconor/threeboard"},
                    "threeboard")),
                m("li", m("a",
                    {href: "https://news.ycombinator.com/item?id=29853731"},
                    "this hackernews thread"))
            )
        )
    }
};
