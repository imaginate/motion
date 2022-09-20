/**
 * ---------------------------------------------------------------------------
 * MAKE-UNIQUE-ID HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/**
 * @param {number} i
 * @return {void}
 */
function makeUniqueID(i) {
    return Date.now().toString(36) + Math.random().toString(36).substr(2) + i;
}

export default makeUniqueID;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
