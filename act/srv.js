/**
 * ---------------------------------------------------------------------------
 * SRV TASK
 * ---------------------------------------------------------------------------
 * @file Use `$ act srv` to access this file.
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

exports.desc = 'runs the local web server';
exports.default = '-solo';
exports.methods = {
  solo: {
    desc: 'runs the local web server without opening a browser (requires a'
        + ' kill signal to terminate the server)',
    method: runServerSolo
  },
  exit: {
    desc: 'runs the local web server, opens a browser, and terminates the'
        + ' server on browser exit',
    method: runServerExit
  },
  persist: {
    desc: 'runs the local web server and opens a browser (requires a kill'
        + ' signal to terminate the server)',
    method: runServerPersist
  }
};
exports.methods.s = exports.methods.solo;
exports.methods.e = exports.methods.exit;
exports.methods.p = exports.methods.persist;

//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/** @const {function(string): boolean} */
const act = require('node-act');
/** @const {function(string, !Object): void} */
const open = require('open');
/** @const {function(...string): string} */
const { resolve } = require('path');

//////////////////////////////////////////////////////////////////////////////
// PATHS
//////////////////////////////////////////////////////////////////////////////

/** @const {string} */
const SERVER = resolve('srv/server.js');
/** @const {string} */
const URL = require('./helpers/env.js').loadEnv().url;

//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @return {void}
 */
async function runServerSolo() {
    act('css js html db');
    require(SERVER);
}

/**
 * @public
 * @return {void}
 */
async function runServerExit() {
    act('css js html db');
    const server = require(SERVER);
    await open(URL, { wait: true });
    server.close();
}

/**
 * @public
 * @return {void}
 */
async function runServerPersist() {
    act('css js html db');
    require(SERVER);
    await open(URL);
}

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
