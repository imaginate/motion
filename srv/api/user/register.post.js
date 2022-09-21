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
/** @const {!function(*): boolean} */
const isValidEmail = require('../../helpers/is-valid-email.js');
/** @const {!function(*): boolean} */
const isValidString = require('../../helpers/is-valid-string.js');

/** @const {string} */
const USERS_FILEPATH = resolve('.data/users.json');

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function postRegister(req, res) {

    const regReq = req.body;
    const users = require(USERS_FILEPATH);

    if (!isValidString(regReq.first_name)
        || !isValidString(regReq.last_name)
        || !isValidEmail(regReq.email)
        || !isValidString(regReq.password)
    ) {
        res.status(400);
        res.send();
        return;
    }

    for (const user of users) {
        if (user.email === regReq.email) {
            res.status(409);
            res.send();
            return;
        }
    }

    users.push({
        id: users.length + 1,
        first_name: regReq.first_name,
        last_name: regReq.last_name,
        email: regReq.email,
        manager: false,
        password: regReq.password
    });
    to.file(JSON.stringify(users, null, 4), USERS_FILEPATH);
    
    res.send();
}

module.exports = postRegister;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
