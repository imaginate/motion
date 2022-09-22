/**
 * ---------------------------------------------------------------------------
 * IS VALID DATE STRING HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const DATE_PATT = /^[2-9][0-9]{3}-(?:1[0-2]|0?[1-9])-(?:3[01]|[12][0-9]|0?[1-9])$/;
/** @const {!RegExp} */
const STRICT_DATE_PATT = /^[2-9][0-9]{3}-(?:1[0-2]|0[1-9])-(?:3[01]|[12][0-9]|0[1-9])$/;

/**
 * @param {*} date
 * @param {boolean=} strict = `false`
 * @return {boolean}
 */
function isValidDateString(date, strict = false) {
    return !!date && typeof date === 'string' && (strict
        ? STRICT_DATE_PATT.test(date)
        : DATE_PATT.test(date)
    );
}

export default isValidDateString;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
