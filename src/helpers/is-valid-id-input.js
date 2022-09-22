/**
 * ---------------------------------------------------------------------------
 * IS VALID ID INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const ID_PATT = /^[1-9][0-9]{0,9}$/;

/**
 * @param {*} input
 * @return {boolean}
 */
function isValidIDInput(input) {
    return !!input && typeof input === 'string' && ID_PATT.test(input);
}

export default isValidIDInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
