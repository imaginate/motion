/**
 * ---------------------------------------------------------------------------
 * IS VALID DATE INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!function} */
import isDateInstance from './is-date-instance.js';
/** @const {!function} */
import isValidDateString from './is-valid-date-string.js';
/** @const {!function} */
import dateStringToNumbers from './date-string-to-numbers.js';
/** @const {!function} */
import dateInstanceToNumbers from './date-instance-to-numbers.js';

/**
 * @param {*} input
 * @return {boolean}
 */
function isValidDateInput(input) {
    if (isValidDateString(input)) {
        input = dateStringToNumbers(input);
    } else if (isDateInstance(input)) {
        input = dateInstanceToNumbers(input);
    } else {
        return false;
    }
    const [ inyear, inmonth, inday ] = input;
    if (inyear < 2022
        || inmonth < 1 || inmonth > 12
        || inday < 1 || inday > 31
    ) {
        return false;
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (inyear === year) {
        if (inmonth < month || inmonth > month + 3) {
            return false;
        }
    } else if (month < 10 || inyear !== year + 1) {
        return false;
    } else if (inmonth > month - 9) {
        return false;
    }
    const indate = new Date(inyear, inmonth - 1, inday);
    return inday === indate.getDate() && (inmonth !== month || inday > day);
}

export default isValidDateInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
