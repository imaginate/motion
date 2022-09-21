/**
 * ---------------------------------------------------------------------------
 * IS MANAGER HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!function(...string): string} */
const { resolve } = require('path');

/** @const {string} */
const USERS_FILEPATH = resolve('.data/users.json');

/**
 * @param {number} userID
 * @return {boolean}
 */
function isManager(userID) {
    const users = require(USERS_FILEPATH);
    const user = users[userID - 1];
    return !!user && user.manager;
}

module.exports = isManager;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
