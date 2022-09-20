/**
 * ---------------------------------------------------------------------------
 * LOCAL SERVER
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 */

'use strict';

/** @const {!Object} */
const process = require('process');
/** @const {!Function} */
const express = require('express');
/** @const {!Function} */
const cookieParser = require('cookie-parser');
/** @const {!function(...string): string} */
const { resolve } = require('path');
/** @const {!Object} */
const { get } = require('node-vitals')('fs');

/** @const {string} */
const WWW_DIRPATH = resolve('www');
/** @const {string} */
const HTML_DIRPATH = resolve('srv/html').replace(/\/$/, '');
/** @const {string} */
const API_DIRPATH = resolve('srv/api').replace(/\/$/, '');
/** @const {!Object} */
const HTML_FILES = get.filepaths(HTML_DIRPATH, { deep: true });
/** @const {!Object} */
const API_FILES = get.filepaths(API_DIRPATH, { deep: true });

/** @const {!Object} */
const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    res.redirect('/bikes');
});

const EXT_PATT = /\.[^.]+$/;
const INDEX_PATT = /\/?index$/;
const ID_PATT = /\/<id>$/;
const METHOD_PATT = /^.*\.(head|get|post|delete)\.[^.]+$/;
const METHOD_TRIM_PATT = /\.(?:head|get|post|delete)$/;

for (const file of HTML_FILES) {
    const urlpath = '/' + file.replace(EXT_PATT, '').replace(INDEX_PATT, '');
    const urlpatt = ID_PATT.test(urlpath)
        ? new RegExp('^' + urlpath.replace(ID_PATT, '')
            + '/[0-9]+/?(?:\\?.*)?$')
        : null;
    const filepath = HTML_DIRPATH + '/' + file;

    app.get(urlpatt || urlpath, (req, res) => {
        res.sendFile(filepath);
    });
}

for (const file of API_FILES) {
    const urlpath = '/api/' + file.replace(EXT_PATT, '')
        .replace(METHOD_TRIM_PATT, '');
    const urlpatt = ID_PATT.test(urlpath)
        ? new RegExp('^' + urlpath.replace(ID_PATT, '')
            + '/[0-9]+/?(?:\\?.*)?$')
        : null;
    const method = file.replace(METHOD_PATT, '$1');
    const filepath = API_DIRPATH + '/' + file;

    app[method](urlpatt || urlpath, require(filepath));
}

app.use(express.static(WWW_DIRPATH, { fallthrough: false }));

/** @const {!Object} */
const server = app.listen(8080);

process.on('exit', () => {
    server.close();
});
process.on('SIGTERM', () => {
    server.close();
});

module.exports = server;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
