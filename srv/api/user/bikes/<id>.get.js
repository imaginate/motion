/**
 * ---------------------------------------------------------------------------
 * USER API: GET BIKES
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
function getBikes(req, res) {

    const tab = ID_PATT.test(req.path)
        ? +req.path.replace(ID_PATT, '$1')
        : 0;
    if (!tab || tab > 1) {
        res.status(404);
        res.send();
        return;
    }

    const bikes = require(BIKES_FILEPATH);
    res.set('Content-Type', 'application/json');
    res.set('Cache-Control', 'no-cache, no-store');
    res.set('Page-Number', '1');
    res.set('Last-Page', '1');
    res.send(JSON.stringify(bikes));
}

module.exports = getBikes;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
