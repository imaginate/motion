/**
 * ---------------------------------------------------------------------------
 * VALID ID INPUT HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!RegExp} */
const ID = /^[1-9][0-9]{0,9}$/;

/**
 * @param {string} input
 * @return {boolean}
 */
function validIDInput(input) {
    return input && ID.test(input);
}

export default validIDInput;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
