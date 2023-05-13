"use strict";
function getLength1(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
