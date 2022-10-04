/**
 * ---------------------------------------------------------------------------
 * USER API: POST BIKE EDIT
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
const authenticateManager = require('../../../helpers/authenticate-manager.js');

/** @const {string} */
const BIKES_FILEPATH = resolve('.data/bikes.json');

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function postBikeEdit(req, res) {

    res.set('Cache-Control', 'no-cache, no-store');

    const userID = authenticateManager(req);
    if (!userID) {
        res.status(401);
        res.send();
        return;
    }
    if (userID < 0) {
        res.status(403);
        res.send();
        return;
    }

    const bikeID = req.body.bike_id;
    const bikes = require(BIKES_FILEPATH);
    if (typeof bikeID !== 'number' || bikeID < 1 || bikeID > bikes.length) {
        res.status(404);
        res.send();
        return;
    }

    const b = Math.floor(bikeID - 1);
    const bike = bikes[b];
    const data = req.body.data;
    for (const key in data) {
        switch (key) {
            case 'model':
            case 'color':
            case 'location':
                bike[key] = data[key];
        }
    }
    to.file(JSON.stringify(bikes, null, 4), BIKES_FILEPATH);

    res.send();
}

module.exports = postBikeEdit;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
