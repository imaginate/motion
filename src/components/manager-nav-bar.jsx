/**
 * ---------------------------------------------------------------------------
 * MANAGER NAV BAR COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../env.js';
/** @const {!React} */
import React from 'react';

/**
 * This is the user navigation component for all management pages.
 *
 * @return {!ReactElement}
 */
const ManagerNavBar = React.memo(function ManagerNavBar() {
    return (
        <nav className="topnav">
            <a href={SITE_URL + '/manage/bikes'} className="topnav">Bikes</a>
            <a href={SITE_URL + '/manage/users'} className="topnav">Users</a>
            <a 
                href={SITE_URL + '/manage/reservations'}
                className="topnav"
            >Reservations</a>
        </nav>
    );
});

export default ManagerNavBar;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
