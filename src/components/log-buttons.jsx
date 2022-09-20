/**
 * ---------------------------------------------------------------------------
 * LOG BUTTONS COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../env.js';
/** @const {!React} */
import React from 'react';
/** @const {!function} */
import logout from '../helpers/logout.js';

/**
 * These are the login, logout, and register buttons.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function LogButtons(props) {

    /**
     * @return {void}
     */
    function handleLogout() {
        logout();
        props.handleLogout();
    }

    if (props.loggedin) {
        return (
            <div className="logbtns">
                <button
                    id="logout"
                    className="logbtn"
                    onClick={handleLogout}
                >Logout</button>
            </div>
        );
    }

    return (
        <div className="logbtns">
            <a href={SITE_URL + '/login'} className="logbtn">
                <button id="login" className="logbtn">Login</button>
            </a>
            <a href={SITE_URL + '/register'} className="logbtn">
                <button id="register" className="logbtn">Register</button>
            </a>
        </div>
    );
}

export default LogButtons;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
