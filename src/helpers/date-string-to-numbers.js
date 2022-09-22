/**
 * ---------------------------------------------------------------------------
 * DATE STRING TO NUMBERS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const DATE_PATT = /^([2-9][0-9]{3})-(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])$/;

/**
 * @param {string} date
 *     Must be a valid date string.
 * @return {!Array<number>}
 *     Returns an array with the year, month, and day of the month in order.
 *     Note that the month and day are one-based, `1` - `12` and `1` - `31`
 *     respectively.
 */
function dateStringToNumbers(date) {
    return [
        +date.replace(DATE_PATT, '$1'),
        +date.replace(DATE_PATT, '$2'),
        +date.replace(DATE_PATT, '$3')
    ];
}

export default dateStringToNumbers;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
