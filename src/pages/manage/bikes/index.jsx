/**
 * ---------------------------------------------------------------------------
 * MANAGE BIKES APP
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!ReactDOM} */
import ReactDOM from 'react-dom/client';
/** @const {!function} */
import Bikes from './_components/bikes.jsx';

/** @const {!HTMLElement} */
const main = document.getElementsByTagName('main')[0];
/** @const {!Object} */
const root = ReactDOM.createRoot(main);
root.render(<Bikes />);
