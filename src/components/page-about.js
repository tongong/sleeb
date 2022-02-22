const m = require("mithril");

module.exports = () => {
    return {
        view: () => m("div",
            m("h1", "sleeb"),
            m("p", "This is an experimental idea for a keyboard layout / input method with only three keys (labeled Key 1, Key 2 and Key 3)."),
            m("h2", "idea"),
            m("p", "The basic idea is to encode characters with movements / gestures using the three keys. A gesture made of two keys (you press the first key then the second one and release in any order) has three possibilities for the first key and two for the second one. There are thus 6 such gestures:"),
            m("ul",
                m("li", "G1: K1 -> K2"),
                m("li", "G2: K2 -> K1"),
                m("li", "G3: K2 -> K3"),
                m("li", "G4: K3 -> K2"),
                m("li", "G5: K1 -> K3"),
                m("li", "G6: K3 -> K1")
            ),
            m("p", "Combining two of these gestures enables 36 characters - enough for the English alphabet and all 10 digits (the mapping is ([number of the first gesture] - 1) * 6 + [number of the second gesture] in a string \"a...z0...9\"). Additionally there are four special gestures:"),
            m("ul",
                m("li", "G7: tap K1 to enter ' '"),
                m("li", "G8: tap K2 to start a new note / a new thought"),
                m("li", "G9: tap K3 to enter '.'"),
                m("li", "G10: press all three keys simultaneously to delete a character")
            ),
            m("h2", "keymaps"),
            m("p", "The three keys are currently mapped to ",
                m("kbd", "j"),
                ", ",
                m("kbd", "k"),
                " and ",
                m("kbd", "l"),
                ". In training mode you can (and have to on the first occurrence of each character) use ",
                m("kbd", "h"),
                " to show a hint. In input mode you can toggle the ui using ",
                m("kbd", "b"),
                "."
            ),
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
