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

exports['desc'] = 'runs the local website server';
exports['method'] = runServer;

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
async function runServer() {
    act('css js html db');
    const server = require(SERVER);
    await open(URL, { wait: true });
    server.close();
}

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol