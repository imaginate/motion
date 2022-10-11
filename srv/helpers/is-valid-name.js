/**
 * ---------------------------------------------------------------------------
 * IS VALID NAME HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const NAME_PATT = /^(?:\p{L}|\p{N}|[-~ ,'"&/]){1,32}$/u;

/**
 * @param {*} val
 * @return {boolean}
 */
function isValidName(val) {
    return !!val && typeof val === 'string' && NAME_PATT.test(val);
}

module.exports = isValidName;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
