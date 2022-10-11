/**
 * ---------------------------------------------------------------------------
 * IS VALID PASSWORD HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const PWD_PATT = /^(?:\p{L}|\p{N}|\p{M}|\p{S}|\p{P}){8,64}$/u;
/** @const {!RegExp} */
const UPPER_PATT = /(?:\p{Lu}|\p{Lt})/u;
/** @const {!RegExp} */
const LOWER_PATT = /\p{Ll}/u;
/** @const {!RegExp} */
const NUM_PATT = /\p{N}/u;
/** @const {!RegExp} */
const SPEC_PATT = /(?:\p{M}|\p{S}|\p{P})/u;

/**
 * @param {*} val
 * @return {boolean}
 */
function isValidPassword(val) {
    return !!val
        && typeof val === 'string'
        && PWD_PATT.test(val)
        && UPPER_PATT.test(val)
        && LOWER_PATT.test(val)
        && NUM_PATT.test(val)
        && SPEC_PATT.test(val);
}

module.exports = isValidPassword;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
