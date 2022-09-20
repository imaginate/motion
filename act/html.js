/**
 * ---------------------------------------------------------------------------
 * HTML TASK
 * ---------------------------------------------------------------------------
 * @file Use `$ act html` to access this file.
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

exports['desc'] = 'Compile HTML assets';
exports['method'] = compileHTML;

//////////////////////////////////////////////////////////////////////////////
// MAIN DIRECTORIES
//////////////////////////////////////////////////////////////////////////////

/** @type {string} */
let SRC = 'src';
/** @type {string} */
let DEST = 'srv/html';

//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/** @const {!Function<string, !function>} */
const { fuse, get, is, to } = require('node-vitals')('base', 'fs');

/** @const {!Function} */
const od = require('onlydata');

/** @const {!Object} */
const hbs = require('handlebars');

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

/** @const {function} */
const { loadEnv } = require('./helpers/env.js');

//////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @return {void}
 */
function compileHTML() {
    prepareMainDirectories();
    compileToHTML();
}

//////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @return {void}
 */
function compileToHTML() {
    registerPartials();
    /** @const {!Object} */
    const env = loadEnv();
    /** @const {string} */
    const pagesDirpath = fuse(SRC, '/pages');
    /** @const {!Array<string>} */
    const pageDirs = get.dirpaths(pagesDirpath, {
        recursive: true,
        basepath: false,
        invalidDirs: /^_/
    });
    for (const dir of pageDirs) {
        /** @const {string} */
        const destdir = trimEndSlash(fuse(DEST, '/', dir));
        if (!is.dir(destdir)) {
            makeDirpath(destdir);
        }
        /** @const {string} */
        const dirpath = trimEndSlash(fuse(pagesDirpath, '/', dir));
        /** @const {!Array<string>} */
        const filenames = get.filepaths(dirpath, {
            validExts: 'hbs'
        });
        for (const filename of filenames) {
            /** @const {string} */
            const hbspath = fuse(dirpath, '/', filename);
            /** @const {string} */
            const content = get.file(hbspath);
            /** @const {string} */
            const odpath = changeExt(hbspath, 'od');
            /** @const {!Object} */
            const data = is.file(odpath)
                ? fuse.obj({}, env, od(odpath))
                : fuse.obj({}, env);
            /** @const {string} */
            const result = renderHandlebars(content, data);
            /** @const {string} */
            const destfile = changeExt(filename, 'html');
            /** @const {string} */
            const destpath = fuse(destdir, '/', destfile);
            to.file(result, destpath);
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
 * @return {void}
 */
function registerPartials() {
    /** @const {string} */
    const dirpath = fuse(SRC, '/partials');
    if (!is.dir(dirpath)) {
        return;
    }
    /** @const {!Array<string>} */
    const filenames = get.filepaths(dirpath, {
        validExts: 'hbs'
    });
    for (const filename of filenames) {
        /** @const {string} */
        const name = trimExt(filename);
        /** @const {string} */
        const filepath = fuse(dirpath, '/', filename);
        /** @const {string} */
        const content = get.file(filepath);
        hbs.registerPartial(name, content);
    }
}

/**
 * @private
 * @param {string} content
 * @param {!Object} data
 * @return {string}
 */
function renderHandlebars(content, data) {
    return hbs.compile(content)(data);
}

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
