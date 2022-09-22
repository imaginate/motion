/**
 * ---------------------------------------------------------------------------
 * USER API: POST REGISTER
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
/** @const {!function(*): boolean} */
const isValidString = require('../../helpers/is-valid-string.js');

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
function postRegister(req, res) {

    if (!isValidString(req.body.first_name)
        || !isValidString(req.body.last_name)
        || !isValidEmail(req.body.email)
        || !isValidString(req.body.password)
    ) {
        res.status(400);
        res.send();
        return;
    }

    const users = require(USERS_FILEPATH);

    for (const user of users) {
        if (user.email === req.body.email) {
            res.status(409);
            res.send();
            return;
        }
    }

    const userID = users.length + 1;
    users.push({
        id: userID,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        manager: false,
        password: req.body.password
    });
    to.file(JSON.stringify(users, null, 4), USERS_FILEPATH);
    
    const sessionID = randomBytes(16).toString('hex');
    const sessions = require(SESSIONS_FILEPATH);
    sessions.push({
        id: sessionID,
        user_id: userID,
        manager: false
    });
    to.file(JSON.stringify(sessions, null, 4), SESSIONS_FILEPATH);

    res.cookie('session', sessionID, {
        httpOnly: true,
        path: '/',
        maxAge: MAX_AGE
    });
    res.send();
}

module.exports = postRegister;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
