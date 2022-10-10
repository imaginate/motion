/**
 * ---------------------------------------------------------------------------
 * IS VALID LOCATION INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const LOCATION_PATT = /^(?:\p{L}|\p{N}|[-~ ,'"&/]){1,64}$/u;

/**
 * @param {*} val
 * @return {boolean}
 */
function isValidLocationInput(val) {
    return !!val && typeof val === 'string' && LOCATION_PATT.test(val);
}

export default isValidLocationInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
