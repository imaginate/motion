/**
 * ---------------------------------------------------------------------------
 * IS VALID COLOR INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const COLOR_PATT = /^[a-zA-Z0-9"](?:[a-zA-Z0-9-~ ,'"&/]{0,14}[a-zA-Z0-9'"])?$/;

/**
 * @param {*} val
 * @return {boolean}
 */
function isValidColorInput(val) {
    return !!val && typeof val === 'string' && COLOR_PATT.test(val);
}

export default isValidColorInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
