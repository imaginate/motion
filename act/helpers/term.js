/**
 * ---------------------------------------------------------------------------
 * TERMINAL HELPERS
 * ---------------------------------------------------------------------------
 * @file Task helper methods for the file system.
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org/)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/** @const {!Function<string, function>} */
const { fuse, is } = require('node-vitals')('base');

/**
 * @param {...string} msg
 * @return {string}
 */
function green(...msgs) {

    if (arguments.length < 1) {
        throw new TypeError('missing `msg` param');
    }

    /** @const {string} */
    const msg = fuse('', ...msgs);

    if (!msg) {
        throw new TypeError('invalid empty `msg` param');
    }

    return fuse('\x1b[32m', msg, '\x1b[0m');
}

/**
 * @param {...string} msg
 * @return {string}
 */
function red(...msgs) {

    if (arguments.length < 1) {
        throw new TypeError('missing `msg` param');
    }

    /** @const {string} */
    const msg = fuse('', ...msgs);

    if (!msg) {
        throw new TypeError('invalid empty `msg` param');
    }

    return fuse('\x1b[31m', msg, '\x1b[0m');
}

module.exports = {
    green,
    red
};

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
