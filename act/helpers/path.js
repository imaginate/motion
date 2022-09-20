/**
 * ---------------------------------------------------------------------------
 * PATH HELPERS
 * ---------------------------------------------------------------------------
 * @file Task helper methods for paths.
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org/)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/** @const {!Function<string, function>} */
const { cut, fuse, has, is } = require('node-vitals')('base');

/**
 * @param {string} filepath
 * @param {string} newExt
 * @return {string}
 */
function changeExt(filepath, newExt) {
    if (!filepath || !is.string(filepath)) {
        throw new TypeError('invalid `filepath` param');
    }
    if (!newExt || !is.string(newExt)) {
        throw new TypeError('invalid `newExt` param');
    }
    filepath = trimExt(filepath);
    newExt = cut(newExt, /^\./);
    return fuse(filepath, '.', newExt);
}

/**
 * @param {string} dirpath
 * @return {boolean}
 */
function isRelativePath(dirpath) {
    if (!dirpath || !is.string(dirpath)) {
        throw new TypeError('invalid `dirpath` param');
    }
    return has(dirpath, /^\.\.\//);
}

/**
 * @param {string} dirpath
 * @return {string}
 */
function trimCurrentRelativePath(dirpath) {
    if (!dirpath || !is.string(dirpath)) {
        throw new TypeError('invalid `dirpath` param');
    }
    return cut(dirpath, /^\.\//);
}

/**
 * @param {string} dirpath
 * @return {string}
 */
function trimEndSlash(dirpath) {
    if (!dirpath || !is.string(dirpath)) {
        throw new TypeError('invalid `dirpath` param');
    }
    return cut(dirpath, /\/$/);
}

/**
 * @param {string} filepath
 * @return {string}
 */
function trimExt(filepath) {
    if (!filepath || !is.string(filepath)) {
        throw new TypeError('invalid `filepath` param');
    }
    return cut(filepath, /\.[^.]+$/);
}

module.exports = {
    changeExt,
    isRelativePath,
    trimCurrentRelativePath,
    trimEndSlash,
    trimExt
};

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
