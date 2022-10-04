/**
 * ---------------------------------------------------------------------------
 * USER API: HEAD LOGOUT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!function(...string): string} */
const { resolve } = require('path');
/** @const {!Object} */
const { to } = require('node-vitals')('fs');

/** @const {string} */
const SESSIONS_FILEPATH = resolve('.data/sessions.json');

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function headLogout(req, res) {

    res.set('Cache-Control', 'no-cache, no-store');

    if (!('session' in req.cookies)) {
        res.send();
        return;
    }

    const sessionID = req.cookies.session;
    const sessions = require(SESSIONS_FILEPATH);
    let userID = 0;
    for (const session of sessions) {
        if (session.id === sessionID) {
            userID = session.user_id;
            break;
        }
    }
    if (userID) {
        for (let i = sessions.length - 1; i >= 0; --i) {
            if (sessions[i].user_id === userID) {
                sessions.splice(i, 1);
            }
        }
        to.file(JSON.stringify(sessions, null, 4), SESSIONS_FILEPATH);
    }

    res.cookie('session', '', {
        token: 'deleted',
        path: '/',
        expires: new Date()
    });
    res.send();
}

module.exports = headLogout;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
