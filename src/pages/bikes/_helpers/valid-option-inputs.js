/**
 * ---------------------------------------------------------------------------
 * VALID OPTION INPUTS OBJECT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!function} */
import isValidDateInput from '../../../helpers/is-valid-date-input.js';
/** @const {!function} */
import isValidModelInput from '../../../helpers/is-valid-model-input.js';
/** @const {!function} */
import isValidColorInput from '../../../helpers/is-valid-color-input.js';
/** @const {!function} */
import isValidLocationInput from '../../../helpers/is-valid-location-input.js';
/** @const {!function} */
import isValidRatingInput from '../../../helpers/is-valid-rating-input.js';

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

/**
 * The valid page option keys and their value validation methods.
 *
 * @const {!ValidOptionInputs}
 */
const VALID_OPTION_INPUTS = Object.create(null);
VALID_OPTION_INPUTS.tab = validTabInput;
VALID_OPTION_INPUTS.from = isValidDateInput;
VALID_OPTION_INPUTS.to = isValidDateInput;
VALID_OPTION_INPUTS.model = isValidModelInput;
VALID_OPTION_INPUTS.color = isValidColorInput;
VALID_OPTION_INPUTS.location = isValidLocationInput;
VALID_OPTION_INPUTS.rating = isValidRatingInput;

/**
 * @param {string} input
 * @return {boolean}
 */
function validTabInput(input) {
    return TAB.test(input);
}

export default VALID_OPTION_INPUTS;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
