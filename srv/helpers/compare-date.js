/**
 * ---------------------------------------------------------------------------
 * COMPARE DATE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!RegExp} */
const DATE_PATT = /^([2-9][0-9]{3})-(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])$/;

/**
 * @param {(string|!Date)} date1
 * @param {(string|!Date)} date2
 * @return {number}
 */
function compareDate(date1, date2) {
    if (typeof date1 === 'string') {
        date1 = new Date(
            +date1.replace(DATE_PATT, '$1'),
            +date1.replace(DATE_PATT, '$2') - 1,
            +date1.replace(DATE_PATT, '$3')
        );
    }
    if (typeof date2 === 'string') {
        date2 = new Date(
            +date2.replace(DATE_PATT, '$1'),
            +date2.replace(DATE_PATT, '$2') - 1,
            +date2.replace(DATE_PATT, '$3')
        );
    }
    if (date1.getFullYear() < date2.getFullYear()) {
        return -1;
    }
    if (date1.getFullYear() > date2.getFullYear()) {
        return 1;
    }
    if (date1.getMonth() < date2.getMonth()) {
        return -1;
    }
    if (date1.getMonth() > date2.getMonth()) {
        return 1;
    }
    return date1.getDate() < date2.getDate()
        ? -1
        : date1.getDate() === date2.getDate()
            ? 0
            : 1;
}

module.exports = compareDate;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
