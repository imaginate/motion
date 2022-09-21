/**
 * ---------------------------------------------------------------------------
 * MANAGER API: HEAD AUTHENTICATE
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
 * @param {!Response} res
 * @return {void}
 */
function headAuthenticate(req, res) {
    if ('session' in req.cookies) {
        const sessions = require(SESSIONS_FILEPATH);
        const sessionID = req.cookies.session;
        let userSession = null;
        for (const session of sessions) {
            if (session.id === sessionID) {
                userSession = session;
                break;
            }
        }
        if (!userSession) {
            res.status(401);
            res.cookie('session', '', {
                token: 'deleted',
                path: '/',
                expires: new Date()
            });
        } else if (!userSession.manager) {
            res.status(403);
        }
    } else {
        res.status(401);
    }
    res.send();
}

module.exports = headAuthenticate;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
