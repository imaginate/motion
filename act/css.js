/**
 * ---------------------------------------------------------------------------
 * CSS TASK
 * ---------------------------------------------------------------------------
 * @file Use `$ act css` to access this file.
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

exports['desc'] = 'Compile CSS assets';
exports['method'] = compileCSSAssets;

//////////////////////////////////////////////////////////////////////////////
// MAIN DIRECTORIES
//////////////////////////////////////////////////////////////////////////////

/** @type {string} */
let SRC = 'src';
/** @type {string} */
let DEST = 'www/css';

//////////////////////////////////////////////////////////////////////////////
// EXTERNAL HELPERS
//////////////////////////////////////////////////////////////////////////////

/** @const {!Function<string, function>} */
const { fuse, get, is, to } = require('node-vitals')('base', 'fs');

/** @const {!Object} */
const sass = require('sass');

/** @const {function} */
const { makeDirpath } = require('./helpers/fs.js');

/** @const {!function} */
const {
    changeExt,
    isRelativePath,
    trimCurrentRelativePath,
    trimEndSlash,
    trimExt
} = require('./helpers/path.js');

/** @const {!Function} */
const od = require('onlydata');

//////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @return {void}
 */
function compileCSSAssets() {
    prepareMainDirectories();
    compileCSS();
}

//////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @return {void}
 */
function compileCSS() {
    /** @const {string} */
    const pagesDirpath = fuse(SRC, '/pages');
    /** @const {!Array<string>} */
    const pageDirpaths = get.dirpaths(pagesDirpath, {
        recursive: true,
        basepath: true,
        invalidDirs: /^_/
    });
    for (const dirpath_ of pageDirpaths) {
        /** @const {string} */
        const dirpath = trimEndSlash(dirpath_);
        /** @const {!Array<string>} */
        const filenames = get.filepaths(dirpath, {
            validExts: 'scss'
        });
        for (const filename of filenames) {
            /** @const {string} */
            const scsspath = fuse(dirpath, '/', filename);
            /** @const {!Buffer} */
            const css = renderCSS(scsspath);
            /** @const {string} */
            const odpath = changeExt(scsspath, 'od');
            if (!is.file(odpath)) {
                throw new Error(fuse('FILE ERROR: missing `"', odpath, '"`'));
            }
            /** @const {!Object} */
            const data = od(odpath);
            /** @const {string} */
            const destpath = fuse(DEST, '/', data.page, '.css');
            to.file(css, destpath);
        }
    }
}

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
}

/**
 * @private
 * @param {string} filepath
 * @return {!Buffer}
 */
function renderCSS(filepath) {
    return sass.renderSync({
        outputStyle: 'expanded',
        sourceMap: false,
        file: filepath
    }).css;
}

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
