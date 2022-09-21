/**
 * ---------------------------------------------------------------------------
 * IS DATE HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!RegExp} */
const DATE_PATT = /^[2-9][0-9]{3}-1[0-2]|0?[1-9]-3[01]|[12][0-9]|0?[1-9]$/;

/**
 * @param {*} date
 * @return {boolean}
 */
function isDate(date) {
    return typeof date === 'string'
        ? !!date && DATE_PATT.test(date)
        : !!date && typeof date === 'object' && date instanceof Date;
}

module.exports = isDate;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
