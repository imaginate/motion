/**
 * ---------------------------------------------------------------------------
 * IS DATE OPTION INSTANCE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!DateOption} */
import DateOption from './date-option.js';

/**
 * @param {*} val
 * @return {boolean}
 */
function isDateOptionInstance(val) {
    return !!val && typeof val === 'object' && val instanceof DateOption;
}

export default isDateOptionInstance;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
