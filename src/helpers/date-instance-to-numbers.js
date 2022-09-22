/**
 * ---------------------------------------------------------------------------
 * DATE INSTANCE TO NUMBERS HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/**
 * @param {!Date} date
 * @return {!Array<number>}
 *     Returns an array with the year, month, and day of the month in order.
 *     Note that the month and day are one-based, `1` - `12` and `1` - `31`
 *     respectively.
 */
function dateInstanceToNumbers(date) {
    return [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
    ];
}

export default dateInstanceToNumbers;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
