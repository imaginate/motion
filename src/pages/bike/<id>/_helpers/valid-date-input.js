/**
 * ---------------------------------------------------------------------------
 * VALID DATE INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const DATE = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/;

/**
 * @param {string} input
 * @return {boolean}
 */
function validDateInput(input) {
    if (!DATE.test(input)) {
        return false;
    }
    const inyear = +input.replace(DATE, '$1');
    const inmonth = +input.replace(DATE, '$2');
    const inday = +input.replace(DATE, '$3');
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

export default validDateInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
