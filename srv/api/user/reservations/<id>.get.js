/**
 * ---------------------------------------------------------------------------
 * USER API: GET RESERVATIONS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!function(...string): string} */
const { resolve } = require('path');
/** @const {!function} */
const authenticateUser = require('../../../helpers/authenticate-user.js');

/** @const {string} */
const RESERVATIONS_FILEPATH = resolve('.data/reservations.json');

/** @const {!RegExp} */
const ID_PATT = /^.*\/([1-9][0-9]{0,9})\/?$/;

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function getReservations(req, res) {

    const userID = authenticateUser(req);
    if (!userID) {
        res.status(401);
        res.send();
        return;
    }

    const tab = ID_PATT.test(req.path)
        ? +req.path.replace(ID_PATT, '$1')
        : 0;
    if (!tab || tab > 1) {
        res.status(404);
        res.send();
        return;
    }

    const matched = [];
    const reservations = require(RESERVATIONS_FILEPATH);
    for (const reservation of reservations) {
        if (reservation.user_id === userID) {
            matched.push(reservation);
        }
    }

    res.set('Content-Type', 'application/json');
    res.set('Page-Number', '1');
    res.set('Last-Page', '1');
    res.send(JSON.stringify(matched));
}

module.exports = getReservations;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
