// maybe add a configuration option for this later
const keys = ["j", "k", "l"];
const hintkey = "h";

/* pressed is an array of pressed indizes from one gesture */
function pressed2gesture(pressed) {
    if (pressed.length == 1) return pressed[0] + 7;
    else {
        let m = [
            [0, 1, 5],
            [2, 0, 3],
            [6, 4, 0]
        ];
        return m[pressed[0]][pressed[1]];
    }
}

// returns false if gestures are not enough to create a character
function gestures2char(gestures) {
    if (gestures.length == 0) return false;
    let lastg = gestures[gestures.length - 1];
    if (lastg >= 7) {
        switch (lastg) {
            case 7:
                return " ";
            case 8:
                return "-";
            case 9:
                return ".";
            default:
                return false;
        }
    }
    let m = [
        "abcdef",
        "ghijkl",
        "mnopqr",
        "stuvwx",
        "yz0123",
        "456789"
    ];
    return m[gestures[0] - 1][gestures[1] - 1];
}


module.exports = {
    keys,
    hintkey,
    pressed2gesture,
    gestures2char
}
