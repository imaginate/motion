/**
 * ---------------------------------------------------------------------------
 * IS VALID MODEL INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const MODEL_PATT = /^(?:\p{L}|\p{N}|[-~ ,'"&/]){1,32}$/u;

/**
 * @param {*} val
 * @return {boolean}
 */
function isValidModelInput(val) {
    return !!val && typeof val === 'string' && MODEL_PATT.test(val);
}

export default isValidModelInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
