/**
 * ---------------------------------------------------------------------------
 * JS TASK
 * ---------------------------------------------------------------------------
 * @file Use `$ act jsx` to access this file.
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

exports['desc'] = 'Compile JSX assets';
exports['method'] = compileJSAssets;

//////////////////////////////////////////////////////////////////////////////
// MAIN DIRECTORIES
//////////////////////////////////////////////////////////////////////////////

/** @type {string} */
let SRC = 'src';
/** @type {string} */
let DEST = 'www/js';
/** @type {string} */
let TMP = '.tmp';
/** @type {string} */
let SRCPATH;
/** @type {string} */
let DESTPATH;
/** @type {string} */
let TMPPATH;

//////////////////////////////////////////////////////////////////////////////
// EXTERNAL HELPERS
//////////////////////////////////////////////////////////////////////////////

/** @const {!Function<string, !function>} */
const { fuse, get, is, to } = require('node-vitals')('base', 'fs');

/** @const {!Object} */
const babel = require('@babel/core');

/** @const {!function} */
const { rollup } = require('rollup');

/** @const {!Function} */
const od = require('onlydata');

/** @const {!function} */
const { green, red } = require('./helpers/term.js');

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

/** @const {!function(...string): string} */
const { resolve } = require('path');

/** @const {!function} */
const { loadEnv } = require('./helpers/env.js');

/** @const {!function} */
const { rmSync } = require('fs');

/** @const {!function} */
const { spawn } = require('child_process');
/** @const {string} */
const eslint = './node_modules/.bin/eslint';

//////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @return {void}
 */
function compileJSAssets() {
    prepareMainDirectories();
    lintAllJS(() => {
        prepareTmpDirectories();
        cloneSrcToTmp();
        compileJSX();
        compileJS();
    });
}

//////////////////////////////////////////////////////////////////////////////
// PRIVATE METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @private
 * @return {void}
 */
function cloneSrcToTmp() {
    /** @const {!Array<string>} */
    const files = get.filepaths(SRCPATH, {
        recursive: true,
        basepath: false,
        validExts: [ 'js', 'jsx' ]
    });
    for (const file of files) {
        /** @const {string} */
        const srcpath = fuse(SRCPATH, '/', file);
        /** @const {string} */
        const destpath = fuse(TMPPATH, '/', file);
        /** @const {string} */
        const content = get.file(srcpath);
        to.file(content, destpath);
    }
}

/**
 * @private
 * @return {void}
 */
function compileJS() {
    /** @const {string} */
    const pagesDirpath = fuse(TMPPATH, '/pages');
    /** @const {!Array<string>} */
    const pageDirs = get.dirpaths(pagesDirpath, {
        recursive: true,
        basepath: false,
        invalidDirs: /^_/
    });
    for (const dir_ of pageDirs) {
        /** @const {string} */
        const dir = trimEndSlash(dir_);
        /** @const {string} */
        const dirpath = fuse(TMPPATH, '/pages/', dir);
        /** @const {!Array<string>} */
        const filenames = get.filepaths(dirpath, {
            validExts: 'js'
        });
        for (const filename of filenames) {
            /** @const {string} */
            const srcpath = fuse(dirpath, '/', filename);
            /** @const {string} */
            const odname = changeExt(filename, 'od');
            /** @const {string} */
            const odpath = fuse(SRCPATH, '/pages/', dir, '/', odname);
            if (!is.file(odpath)) {
                throw new Error(fuse('FILE ERROR: missing `"', odpath, '"`'));
            }
            /** @const {!Object} */
            const data = od(odpath);
            /** @const {string} */
            const destpath = fuse(DESTPATH, '/', data.page, '.js');
            runCompiler(srcpath, destpath);
        }
    }
}

/**
 * @private
 * @return {void}
 */
function compileJSX() {
    /** @const {!Array<string>} */
    const filepaths = get.filepaths(TMPPATH, {
        recursive: true,
        basepath: true,
        validExts: 'jsx'
    });
    for (const filepath of filepaths) {
        /** @const {string} */
        const content = transformJSX(get.file(filepath))
            .replace(/^(import [\w,.:{} ]+ from '[^']+\.js)x';$/mg, '$1\';');
        to.file(content, changeExt(filepath, 'js'));
        rmSync(filepath);
    }
}

/**
 * @private
 * @param {!function} done
 * @return {void}
 */
function lintAllJS(done) {
    /** @const {!Array<string>} */
    const filepaths = get.filepaths(SRCPATH, {
        recursive: true,
        basepath: true,
        validExts: [ 'js', 'jsx' ]
    });
    runLinter(filepaths, done);
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
    if (!TMP || !is.str(TMP)) {
        throw new TypeError('invalid `TMP` dirpath');
    }

    SRC = trimCurrentRelativePath(SRC);
    SRC = trimEndSlash(SRC);
    DEST = trimCurrentRelativePath(DEST);
    DEST = trimEndSlash(DEST);
    TMP = trimCurrentRelativePath(TMP);
    TMP = trimEndSlash(TMP);

    if (isRelativePath(SRC)) {
        throw new Error('invalid `SRC` dirpath - relative path not allowed');
    }
    if (isRelativePath(DEST)) {
        throw new Error('invalid `DEST` dirpath - relative path not allowed');
    }
    if (isRelativePath(TMP)) {
        throw new Error('invalid `TMP` dirpath - relative path not allowed');
    }

    if (!is.dir(SRC)) {
        throw new Error(fuse('invalid `SRC` path - `', SRC, '/`'));
    }
    if (!is.dir(DEST)) {
        makeDirpath(DEST);
    }
    if (!is.dir(TMP)) {
        makeDirpath(TMP);
    }

    SRCPATH = resolve(SRC);
    SRCPATH = trimEndSlash(SRC);
    DESTPATH = resolve(DEST);
    DESTPATH = trimEndSlash(DEST);
    TMPPATH = resolve(TMP);
    TMPPATH = trimEndSlash(TMP);
}

/**
 * @private
 * @return {void}
 */
function prepareTmpDirectories() {
    /** @const {!Array<string>} */
    const dirs = get.dirpaths(SRCPATH, {
        recursive: true,
        basepath: false
    });
    for (const dir of dirs) {
        /** @const {string} */
        const dirpath = fuse(TMP, '/', dir);
        if (!is.dir(dirpath)) {
            makeDirpath(dirpath);
        }
    }
}

/**
 * @private
 * @param {string} srcpath
 * @param {string} destpath
 * @return {void}
 */
async function runCompiler(srcpath, destpath) {
    /** @type {!Object} */
    let bundle;
    try {
        bundle = await rollup({
            external: [
                'react',
                'react-dom/client'
            ],
            input: srcpath
        });
        await bundle.write({
            file: destpath,
            format: 'iife',
            globals: {
                'react': 'React',
                'react-dom/client': 'ReactDOM'
            }
        });
    } catch (err) {
        if (bundle) {
            await bundle.close();
        }
        console.error(red('COMPILE ERROR: `rollup\' failed'));
        throw err;
    }
    if (bundle) {
        await bundle.close();
    }
}

/**
 * @private
 * @param {!function} done
 * @param {!Array<string>} filepaths
 * @return {void}
 */
function runLinter(filepaths, done) {
    /** @const {!Array<string>} */
    const args = [ '--color', '--' ].concat(filepaths);
    /** @const {!ChildProcess} */
    const proc = spawn(eslint, args);
    proc.stdout.on('data', data => {
        data = data && data.toString();
        if (data || data === '') {
            console.log(data);
        }
    });
    proc.stderr.on('data', data => {
        data = data && data.toString();
        if (data || data === '') {
            console.error(data);
        }
    });
    proc.on('error', err => {
        console.error(red('ERROR: ESLint failed.'));
        throw err;
    });
    proc.on('close', code => {
        if (code) {
            console.error(red(fuse('ESLint found bugs. Please fix every bug',
                ' before continuing.\n')));
            throw new Error(fuse('ESLint non-zero exit, `', code, '\'.'));
        } else {
            done();
        }
    });
}

/**
 * @private
 * @param {string} content
 * @return {string}
 */
function transformJSX(content) {
    return babel.transformSync(content, {
        plugins: [ '@babel/plugin-transform-react-jsx' ],
    }).code;
}

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
