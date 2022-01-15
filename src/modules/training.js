function unixtime() {
    return (new Date).getTime();
}

function getData() {
    let ls = localStorage.getItem("progress");
    if (ls) {
        return JSON.parse(ls);
    }

    /* sorted by frequency */
    let chars = " -.etaonihsrlducmwyfgpbvkjxqz0123456789";
    let hints = {
        " ": "G7",
        "-": "G8",
        ".": "G9"
    };
    for (let i = 0; i < 36; i++) {
        let hint = "G" + Math.floor(i / 6 + 1) + " G" + (i % 6 + 1);
        let ch = i < 26 ?
            String.fromCharCode("a".charCodeAt() + i) :
            (i - 26) + "";
        hints[ch] = hint;
    }
    let data = chars.split("").map(c => ({
        c: c,
        hint: hints[c],
        numt: 0, /* how often this character was tested */
        score: 0,
        lastt: 0, /* timestamp of the last test */
    }));
    return data;
}

function setData(data) {
    localStorage.setItem("progress", JSON.stringify(data));
}


function getMaxIndex(valueFn, list) {
    let max;
    let maxValue = 0;
    for (let i = 0; i < list.length; i++) {
        let v = valueFn(list[i]);
        if (v != 0 && (!max || v > maxValue)) {
            max = i;
            maxValue = v;
        }
    }
    return max;
}

/* basic idea:
 * - remove previously tested character from the list of possible ones (so
 *   that no character is tested twice)
 * - if there are chars older than a week, test the oldest
 * - if there are chars with a score less than 20 test the one with minimal
 *   score
 * - else test a new char
 * - if all chars are known take the char with minimal score
 *
 * score:
 * - starts at 0
 * - test correct?   +5
 * - test incorrect? /2
 * - showing hints counts as incorrect (maybe also set a time limit?)
 *
 * return value consists of the character and a hint
 */
function getTest() {
    let data = getData();

    let prev = getMaxIndex(e => e.lastt, data);
    if (prev) {
        data.splice(prev, 1);
    }

    let old = getMaxIndex(e => -e.lastt, data);
    if (old && data[old].lastt < unixtime() - 1000 * 60 * 60 * 24 * 7) {
        return [data[old].c, data[old].hint];
    }

    let known = data.filter(e => e.numt > 0).sort(
        (a, b) => (a.score - b.score)
    );
    let unknown = data.filter(e => e.numt == 0);

    // console.log(known);
    // console.log(unknown);

    if ((known.length != 0 && known[0].score < 20) || unknown.length == 0) {
        return [known[0].c, known[0].hint];
    }
    return [unknown[0].c, unknown[0].hint];
}

function saveTest(c, success) {
    // console.log(c, success);
    let data = getData();
    let elem = data.find(e => e.c == c);
    elem.numt++;
    elem.lastt = unixtime();
    if (success) elem.score += 5;
    else elem.score = Math.floor(elem.score / 2);
    setData(data);
}

module.exports = {
    getTest,
    saveTest
}
