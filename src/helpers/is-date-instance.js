/**
 * ---------------------------------------------------------------------------
 * IS DATE INSTANCE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/**
 * @param {*} val
 * @return {boolean}
 */
function isDateInstance(val) {
    return !!val && typeof val === 'object' && val instanceof Date;
}

export default isDateInstance;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
