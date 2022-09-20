/**
 * ---------------------------------------------------------------------------
 * VALID OPTION INPUTS OBJECT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/**
 * @typedef {{
 *     tab: !function(string): boolean,
 *     from: !function(string): boolean,
 *     to: !function(string): boolean,
 *     model: !function(string): boolean,
 *     color: !function(string): boolean,
 *     location: !function(string): boolean,
 *     rating: !function(string): boolean
 * }} ValidOptionInputs
 */

/** @const {!RegExp} */
const TAB = /^[0-9]+$/;
/** @const {!RegExp} */
const DATE = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/;
/** @const {!RegExp} */
const MODEL = /^[a-zA-Z0-9](?:[a-zA-Z0-9- ,']{0,30}[a-zA-Z0-9])?$/;
/** @const {!RegExp} */
const COLOR = /^[a-zA-Z0-9](?:[a-zA-Z0-9- ,']{0,14}[a-zA-Z0-9])?$/;
/** @const {!RegExp} */
const LOCATION = /^[a-zA-Z0-9](?:[a-zA-Z0-9- ,']{0,62}[a-zA-Z0-9])?$/;
/** @const {!RegExp} */
const RATING = /^[1-5]$/;

/**
 * The valid page option keys and their value validation methods.
 *
 * @const {!ValidOptionInputs}
 */
const VALID_OPTION_INPUTS = Object.create(null);
VALID_OPTION_INPUTS.tab = validTabInput;
VALID_OPTION_INPUTS.from = validDateInput;
VALID_OPTION_INPUTS.to = validDateInput;
VALID_OPTION_INPUTS.model = validModelInput;
VALID_OPTION_INPUTS.color = validColorInput;
VALID_OPTION_INPUTS.location = validLocationInput;
VALID_OPTION_INPUTS.rating = validRatingInput;

/**
 * @param {string} input
 * @return {boolean}
 */
function validTabInput(input) {
    return TAB.test(input);
}

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

/**
 * @param {string} input
 * @return {boolean}
 */
function validModelInput(input) {
    return MODEL.test(input);
}

/**
 * @param {string} input
 * @return {boolean}
 */
function validColorInput(input) {
    return COLOR.test(input);
}

/**
 * @param {string} input
 * @return {boolean}
 */
function validLocationInput(input) {
    return LOCATION.test(input);
}

/**
 * @param {string} input
 * @return {boolean}
 */
function validRatingInput(input) {
    return RATING.test(input);
}

export default VALID_OPTION_INPUTS;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
