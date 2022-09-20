/**
 * ---------------------------------------------------------------------------
 * DEVELOPMENT ENVIRONMENT HELPERS
 * ---------------------------------------------------------------------------
 * @file Task helper methods for the development environment.
 *
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 *
 * @see [JSDoc3](http://usejsdoc.org/)
 * @see [Closure Compiler JSDoc](https://developers.google.com/closure/compiler/docs/js-for-compiler)
 */

'use strict';

/** @const {string} */
const ENV_PATH = 'src/env.od';

/** @const {!Function<string, function>} */
const fuse = require('node-vitals')('fuse');
/** @const {!Function} */
const od = require('onlydata');

/**
 * @return {!Object}
 */
function loadEnv() {
    return od(ENV_PATH);
}

module.exports = {
    loadEnv
};

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
