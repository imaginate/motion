/**
 * ---------------------------------------------------------------------------
 * FILE SYSTEM HELPERS
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
const { fuse, is } = require('node-vitals')('base', 'fs');
/** @const {!Object} */
const fs = require('fs');

/**
 * @param {string} dirpath
 * @return {void}
 */
function makeDirpath(dirpath) {

    if (!dirpath || !is.string(dirpath)) {
        throw new TypeError('invalid `dirpath` param');
    }

    if (is.dir(dirpath)) {
        return;
    }

    /** @const {!Array<string>} */
    const dirs = dirpath.split('/');
    /** @type {string} */
    let path = '';

    for (const dir of dirs) {
        path = path
            ? fuse(path, '/', dir)
            : dir;
        if (!is.dir(path)) {
            fs.mkdirSync(path);
        }
    }
}

module.exports = {
    makeDirpath
};

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
