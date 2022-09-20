/**
 * ---------------------------------------------------------------------------
 * DATABASE TASK
 * ---------------------------------------------------------------------------
 * @file Use `$ act db` to access this file.
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org/)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

//////////////////////////////////////////////////////////////////////////////
// EXPORTS
//////////////////////////////////////////////////////////////////////////////

exports['desc'] = 'prepare the database';
exports['method'] = mkDB;

//////////////////////////////////////////////////////////////////////////////
// MAIN DIRECTORIES
//////////////////////////////////////////////////////////////////////////////

/** @type {string} */
let SRC = 'srv/data';
/** @type {string} */
let DEST = '.data';
/** @type {string} */
let SRCPATH;
/** @type {string} */
let DESTPATH;

//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/** @const {!Function<string, !function>} */
const { fuse, get, is, to } = require('node-vitals')('base', 'fs');
/** @const {!function(...string): string} */
const { resolve } = require('path');
/** @const {!function} */
const { makeDirpath } = require('./helpers/fs.js');
/** @const {!function} */
const {
    changeExt,
    isRelativePath,
    trimCurrentRelativePath,
    trimEndSlash,
    trimExt
} = require('./helpers/path.js');

//////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @return {void}
 */
function mkDB() {
    prepareMainDirectories();
    setDefaultDBData();
}

//////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @return {void}
 */
function prepareMainDirectories() {

    if (!SRC || !is.str(SRC)) {
        throw new TypeError('invalid `SRC` dirpath');
    }
    if (!DEST || !is.str(DEST)) {
        throw new TypeError('invalid `DEST` dirpath');
    }

    SRC = trimCurrentRelativePath(SRC);
    SRC = trimEndSlash(SRC);
    DEST = trimCurrentRelativePath(DEST);
    DEST = trimEndSlash(DEST);

    if (isRelativePath(SRC)) {
        throw new Error('invalid `SRC` dirpath - relative path not allowed');
    }
    if (isRelativePath(DEST)) {
        throw new Error('invalid `DEST` dirpath - relative path not allowed');
    }

    if (!is.dir(SRC)) {
        throw new Error(fuse('invalid `SRC` path - `', SRC, '/`'));
    }
    if (!is.dir(DEST)) {
        makeDirpath(DEST);
    }

    SRCPATH = resolve(SRC);
    SRCPATH = trimEndSlash(SRC);
    DESTPATH = resolve(DEST);
    DESTPATH = trimEndSlash(DEST);
}

/**
 * @private
 * @return {void}
 */
function setDefaultDBData() {
    /** @const {!Array<string>} */
    const filenames = get.filepaths(SRC, {
        validExts: 'json'
    });
    for (const filename of filenames) {
        /** @const {string} */
        const srcpath = fuse(SRCPATH, '/', filename);
        /** @const {string} */
        const destpath = fuse(DESTPATH, '/', filename);
        /** @const {string} */
        const content = get.file(srcpath);
        to.file(content, destpath);
    }
}

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
