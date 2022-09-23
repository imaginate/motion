/**
 * ---------------------------------------------------------------------------
 * USER API: POST RATING
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
const authenticateUser = require('../../helpers/authenticate-user.js');

/** @const {string} */
const BIKES_FILEPATH = resolve('.data/bikes.json');
/** @const {string} */
const RESERVATIONS_FILEPATH = resolve('.data/reservations.json');

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function postRating(req, res) {

    const userID = authenticateUser(req);
    if (!userID) {
        res.status(401);
        res.send();
        return;
    }

    const reservations = require(RESERVATIONS_FILEPATH);
    const reservation = reservations[req.body.reservation_id - 1];
    if (reservation.rating === req.body.rating) {
        res.send();
        return;
    }

    const bikes = require(BIKES_FILEPATH);
    const bike = bikes[req.body.bike_id - 1];
    if (req.body.rating === 0) {
        --bike.rate_count;
        bike.rate_total -= reservation.rating;
    } else if (reservation.rating === 0) {
        ++bike.rate_count;
        bike.rate_total += req.body.rating;
    } else {
        bike.rate_total += req.body.rating - reservation.rating;
    }
    bike.rating = bike.rate_total / bike.rate_count;
    to.file(JSON.stringify(bikes, null, 4), BIKES_FILEPATH);

    reservation.rating = req.body.rating;
    to.file(JSON.stringify(reservations, null, 4), RESERVATIONS_FILEPATH);

    res.send();
}

module.exports = postRating;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
