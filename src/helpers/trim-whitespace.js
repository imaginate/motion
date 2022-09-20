/**
 * ---------------------------------------------------------------------------
 * TRIM WHITESPACE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const LEAD_SPACE_PATT = /^[ \r\n\t]+/;
/** @const {!RegExp} */
const END_SPACE_PATT = /[ \r\n\t]+$/;

/**
 * @param {string} str
 * @return {void}
 */
function trimWhitespace(str) {
    return str.replace(LEAD_SPACE_PATT, '').replace(END_SPACE_PATT, '');
}

export default trimWhitespace;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
