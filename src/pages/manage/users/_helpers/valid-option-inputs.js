/**
 * ---------------------------------------------------------------------------
 * VALID OPTION INPUTS OBJECT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!function} */
import isValidIDInput from '../../../../helpers/is-valid-id-input.js';
/** @const {!function} */
import isValidNameInput from '../../../../helpers/is-valid-name-input.js';
/** @const {!function} */
import isValidEmailInput from '../../../../helpers/is-valid-email.js';

/**
 * @typedef {{
 *     tab: !function(*): boolean,
 *     id: !function(*): boolean,
 *     first: !function(*): boolean,
 *     last: !function(*): boolean,
 *     email: !function(*): boolean,
 *     level: !function(*): boolean
 * }} ValidOptionInputs
 */

/** @const {!RegExp} */
const TAB_PATT = /^[0-9]+$/;
/** @const {!RegExp} */
const LEVEL_PATT = /^[012]$/;

/**
 * The valid page option keys and their value validation methods.
 *
 * @const {!ValidOptionInputs}
 */
const VALID_OPTION_INPUTS = Object.create(null);
VALID_OPTION_INPUTS.tab = isValidTabInput;
VALID_OPTION_INPUTS.id = isValidIDInput;
VALID_OPTION_INPUTS.first = isValidNameInput;
VALID_OPTION_INPUTS.last = isValidNameInput;
VALID_OPTION_INPUTS.email = isValidEmailInput;
VALID_OPTION_INPUTS.level = isValidLevelInput;

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
function isValidLevelInput(input) {
    if (typeof input === 'number') {
        input = String(input);
    }
    return !!input && typeof input === 'string' && LEVEL_PATT.test(input);
}

export default VALID_OPTION_INPUTS;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
