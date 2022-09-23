/**
 * ---------------------------------------------------------------------------
 * VALID OPTION INPUTS OBJECT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!function} */
import isValidIDInput from '../../../helpers/is-valid-id-input.js';
/** @const {!function} */
import isDateInstance from '../../../is-date-instance.js';
/** @const {!function} */
import isDateOptionInstance from '../../../is-date-option-instance.js';
/** @const {!function} */
import isValidDateString from '../../../is-valid-date-string.js';
/** @const {!function} */
import isValidRatingInput from '../../../helpers/is-valid-rating-input.js';

/**
 * @typedef {{
 *     tab: !function(*): boolean,
 *     id: !function(*): boolean,
 *     bike: !function(*): boolean,
 *     date: !function(*): boolean,
 *     rating: !function(*): boolean
 * }} ValidOptionInputs
 */

/** @const {!RegExp} */
const TAB_PATT = /^[0-9]+$/;

/**
 * The valid page option keys and their value validation methods.
 *
 * @const {!ValidOptionInputs}
 */
const VALID_OPTION_INPUTS = Object.create(null);
VALID_OPTION_INPUTS.tab = isValidTabInput;
VALID_OPTION_INPUTS.id = isValidIDInput;
VALID_OPTION_INPUTS.bike = isValidIDInput;
VALID_OPTION_INPUTS.date = isValidDateInput;
VALID_OPTION_INPUTS.rating = isValidRatingInput;

/**
 * @param {*} input
 * @return {boolean}
 */
function isValidTabInput(input) {
    if (typeof input === 'number') {
        input = String(input);
    }
    return !!input && typeof input === 'string' && TAB_PATT.test(input);
}

/**
 * @param {*} input
 * @return {boolean}
 */
function isValidDateInput(input) {
    return isValidDateString(input)
        || isDateInstance(input)
        || isDateOptionInstance(input);
}

export default VALID_OPTION_INPUTS;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
