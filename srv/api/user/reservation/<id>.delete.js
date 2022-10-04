/**
 * ---------------------------------------------------------------------------
 * USER API: DELETE RESERVATION
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
const authenticateUser = require('../../../helpers/authenticate-user.js');

/** @const {string} */
const BIKES_FILEPATH = resolve('.data/bikes.json');
/** @const {string} */
const RESERVATIONS_FILEPATH = resolve('.data/reservations.json');

/** @const {!RegExp} */
const ID_PATT = /^.*\/([1-9][0-9]{0,9})\/?$/;

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function deleteReservation(req, res) {

    res.set('Cache-Control', 'no-cache, no-store');

    const userID = authenticateUser(req);
    if (!userID) {
        res.status(401);
        res.send();
        return;
    }

    const reservationID = ID_PATT.test(req.path)
        ? +req.path.replace(ID_PATT, '$1')
        : 0;
    const reservations = require(RESERVATIONS_FILEPATH);
    if (!reservationID || reservationID > reservations.length) {
        res.status(404);
        res.send();
        return;
    }

    const reservation = reservations[reservationID - 1];
    const bikes = require(BIKES_FILEPATH);
    const { reserved } = bikes[reservation.bike_id - 1];
    for (let i = 0; i < reserved.length; ++i) {
        if (reserved[i][0] === reservation.from) {
            reserved.splice(i, 1);
            break;
        }
    }
    to.file(JSON.stringify(bikes, null, 4), BIKES_FILEPATH);

    reservations.splice(reservationID - 1, 1);
    for (let i = 0; i < reservations.length; ++i) {
        reservations[i].id = i + 1;
    }
    to.file(JSON.stringify(reservations, null, 4), RESERVATIONS_FILEPATH);

    res.send();
}

module.exports = deleteReservation;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
