/**
 * ---------------------------------------------------------------------------
 * USER API: POST LOGIN
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!function(...string): string} */
const { resolve } = require('path');
/** @const {!Object} */
const { to } = require('node-vitals')('fs');
/** @const {!function} */
const { randomBytes } = require('crypto');
/** @const {!function(*): boolean} */
const isValidEmail = require('../../helpers/is-valid-email.js');

/** @const {number} */
const MAX_AGE = 2 ** 30;

/** @const {string} */
const USERS_FILEPATH = resolve('.data/users.json');
/** @const {string} */
const SESSIONS_FILEPATH = resolve('.data/sessions.json');

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function postLogin(req, res) {

    if (!isValidEmail(req.body.email)) {
        res.status(401);
        res.send();
        return;
    }

    const users = require(USERS_FILEPATH);
    let sessionUser = null;
    for (const user of users) {
        if (user.email === req.body.email) {
            if (user.password === req.body.password) {
                sessionUser = user;
            }
            break;
        }
    }
    if (!sessionUser) {
        res.status(401);
        res.send();
        return;
    }

    const sessionID = randomBytes(16).toString('hex');
    const sessions = require(SESSIONS_FILEPATH);
    for (let i = sessions.length - 1; i >= 0; --i) {
        if (sessions[i].user_id === sessionUser.id) {
            sessions.splice(i, 1);
        }
    }
    sessions.push({
        id: sessionID,
        user_id: sessionUser.id,
        manager: sessionUser.manager
    });
    to.file(JSON.stringify(sessions, null, 4), SESSIONS_FILEPATH);
    
    res.cookie('session', sessionID, {
        httpOnly: true,
        path: '/',
        maxAge: MAX_AGE
    });
    res.send();
}

module.exports = postLogin;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
