/**
 * ---------------------------------------------------------------------------
 * BUILD TASK
 * ---------------------------------------------------------------------------
 * @file Use `$ act build` to access this file.
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

exports['desc'] = 'validates, bundles, and compiles all source code';
exports['method'] = build;

//////////////////////////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////////////////////////

/** @const {function(string): boolean} */
const act = require('node-act');

//////////////////////////////////////////////////////////////////////////////
// METHODS
//////////////////////////////////////////////////////////////////////////////

/**
 * @public
 * @return {void}
 */
function build() {
    act('css html js');
}

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
