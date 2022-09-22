/**
 * ---------------------------------------------------------------------------
 * IS VALID RATING INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const RATING_PATT = /^[1-5]$/;

/**
 * @param {*} input
 * @return {boolean}
 */
function isValidRatingInput(input) {
    if (typeof input === 'number' && input >= 1 && input <= 5) {
        input = String(input);
    }
    return !!input && typeof input === 'string' && RATING_PATT.test(input);
}

export default isValidRatingInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
