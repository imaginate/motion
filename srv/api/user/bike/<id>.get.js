/**
 * ---------------------------------------------------------------------------
 * USER API: GET BIKE
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!function(...string): string} */
const { resolve } = require('path');

/** @const {string} */
const BIKES_FILEPATH = resolve('.data/bikes.json');
/** @const {!RegExp} */
const ID_PATT = /^.*\/([1-9][0-9]{0,9})\/?$/;

/**
 * @param {!Request} req
 * @param {!Response} res
 * @return {void}
 */
function getBike(req, res) {

    res.set('Cache-Control', 'no-cache, no-store');

    const bikes = require(BIKES_FILEPATH);
    const id = ID_PATT.test(req.path)
        ? +req.path.replace(ID_PATT, '$1')
        : 0;
    if (!id || id > bikes.length) {
        res.status(404);
        res.send();
        return;
    }

    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify(bikes[id - 1]));
}

module.exports = getBike;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
