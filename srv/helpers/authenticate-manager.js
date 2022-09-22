/**
 * ---------------------------------------------------------------------------
 * AUTHENTICATE MANAGER HELPER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!function(...string): string} */
const { resolve } = require('path');

/** @const {string} */
const SESSIONS_FILEPATH = resolve('.data/sessions.json');

/**
 * @param {!Request} req
 * @return {number}
 *     Returns the authenticated user's ID, `0`, or `-1`. `0` indicates a
 *     failed authentication and `-1` indicates a invalid permissions.
 */
function authenticateManager(req) {
    if (!('session' in req.cookies)) {
        return 0;
    }
    const sessionID = req.cookies.session;
    const sessions = require(SESSIONS_FILEPATH);
    for (const session of sessions) {
        if (session.id === sessionID) {
            return session.manager
                ? session.user_id
                : -1;
        }
    }
    return 0;
}

module.exports = authenticateManager;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
