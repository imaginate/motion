/**
 * ---------------------------------------------------------------------------
 * PRETTIFY DATE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!DateOption} */
import DateOption from './date-option.js';

/**
 * @param {(string|!Date|!DateOption)} date
 * @return {string}
 *     Returns a string with the month, day of the month, and year in order.
 *     Note that the month and day are one-based, `1` - `12` and `1` - `31`
 *     respectively. The string looks like `"MM/DD/YYYY"`. There are no
 *     preceding zeros.
 */
function prettifyDate(date) {
    date = new DateOption(date);
    return date.pretty();
}

export default prettifyDate;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
