/**
 * ---------------------------------------------------------------------------
 * USER API: POST RESERVATION
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!function(...string): string} */
const { resolve } = require('path');
/** @const {!Object} */
const { to: vto } = require('node-vitals')('fs');
/** @const {!function} */
const authenticateUser = require('../../../helpers/authenticate-user.js');
/** @const {!function} */
const isDate = require('../../../helpers/is-date.js');
/** @const {!function} */
const compareDate = require('../../../helpers/compare-date.js');

/** @const {string} */
const BIKES_FILEPATH = resolve('.data/bikes.json');
/** @const {string} */
const RESERVATIONS_FILEPATH = resolve('.data/reservations.json');

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function postReserve(req, res) {

    res.set('Cache-Control', 'no-cache, no-store');

    const userID = authenticateUser(req);
    if (!userID) {
        res.status(401);
        res.send();
        return;
    }

    const reserveReq = req.body;
    const bikeID = reserveReq.bike_id;
    const bikes = require(BIKES_FILEPATH);
    if (typeof bikeID !== 'number' || bikeID < 1 || bikeID > bikes.length) {
        res.status(404);
        res.send();
        return;
    }
    const b = Math.floor(bikeID - 1);
    const bike = bikes[b];

    const from = reserveReq.from;
    const to = reserveReq.to;
    const today = new Date();
    if (!isDate(from) || !isDate(to)
        || compareDate(from, to) > 0
        || compareDate(from, today) < 1
    ) {
        res.status(404);
        res.send();
        return;
    }
    for (const [ start, end ] of bike.reserved) {
        if (compareDate(from, start) < 1) {
            if (compareDate(to, start) < 0) {
                continue;
            }
        } else if (compareDate(from, end) > 0) {
            continue;
        }
        res.status(404);
        res.send();
        return;
    }
    bike.reserved.push([ from, to ]);
    vto.file(JSON.stringify(bikes, null, 4), BIKES_FILEPATH);

    const reservations = require(RESERVATIONS_FILEPATH);
    reservations.push({
        id: reservations.length + 1,
        bike_id: bike.id,
        user_id: userID,
        from,
        to,
        rating: 0
    });
    vto.file(JSON.stringify(reservations, null, 4), RESERVATIONS_FILEPATH);

    res.send();
}

module.exports = postReserve;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
