/**
 * ---------------------------------------------------------------------------
 * IS VALID STRING HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/**
 * @param {*} val
 * @return {boolean}
 */
function isValidString(val) {
    return !!val && typeof val === 'string';
}

module.exports = isValidString;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
