/**
 * ---------------------------------------------------------------------------
 * IS VALID NAME INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const NAME_PATT = /^[a-zA-Z0-9"](?:[a-zA-Z0-9-~ ,'"&/]{0,30}[a-zA-Z0-9'"])?$/;

/**
 * @param {*} val
 * @return {boolean}
 */
function isValidNameInput(val) {
    return !!val && typeof val === 'string' && NAME_PATT.test(val);
}

export default isValidNameInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
