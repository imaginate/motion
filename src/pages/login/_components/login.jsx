/**
 * ---------------------------------------------------------------------------
 * LOGIN COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {string} */
import { SITE_URL } from '../../../env.js';
/** @const {!React} */
import React from 'react';
/** @const {!function} */
import Loading from '../../../components/loading.jsx';
/** @const {!function} */
import authenticateManager from '../../../helpers/authenticate-manager.js';
/** @const {!function} */
import makeLoginAttempt from '../_helpers/make-login-attempt.js';
/** @const {!function} */
import isValidEmail from '../../../helpers/is-valid-email.js';
/** @const {!function} */
import UserNavBar from '../../../components/user-nav-bar.jsx';
/** @const {!function} */
import LogButtons from '../../../components/log-buttons.jsx';

/**
 * This method is the root component for the user login.
 *
 * @return {!ReactElement}
 */
function Login() {

    /** @const {boolean} */
    const [ authenticated, setAuthenticated ] = React.useState(false);
    /** @const {boolean} */
    const [ loggingin, setLoggingin ] = React.useState(false);

    /** @const {boolean} */
    const [ badLogin, setBadLogin ] = React.useState(false);
    /** @const {boolean} */
    const [ badEmail, setBadEmail ] = React.useState(false);
    /** @const {boolean} */
    const [ badPassword, setBadPassword ] = React.useState(false);

    /** @const {string} */
    const [ email, setEmail ] = React.useState('');
    /** @const {string} */
    const [ password, setPassword ] = React.useState('');

    React.useEffect(() => {
        authenticateManager(handleAuthenticateComplete);
    }, []);

    /**
     * @param {boolean} loggedin
     * @param {boolean} isManager
     * @return {void}
     */
    function handleAuthenticateComplete(loggedin, isManager) {
        if (loggedin) {
            window.location.replace(isManager
                ? SITE_URL + '/manage/bikes'
                : SITE_URL + '/bikes'
            );
        }
        setAuthenticated(true);
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleEmailChange(event) {
        const val = event.target.value;
        setEmail(val);
        if (isValidEmail(val)) {
            setBadEmail(false);
        } else {
            setBadEmail(true);
        }
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handlePasswordChange(event) {
        const val = event.target.value;
        setPassword(val);
        if (val.length < 8) {
            setBadPassword(true);
        } else {
            setBadPassword(false);
        }
    }

    /**
     * @return {void}
     */
    function handleLoginClick() {
        if (badEmail || badPassword) {
            return;
        }
        setLoggingin(true);
        makeLoginAttempt(email, password, (success) => {
            if (success) {
                authenticateManager((_, isManager) => {
                    window.location.replace(isManager
                        ? SITE_URL + '/manage/bikes'
                        : SITE_URL + '/bikes'
                    );
                });
            } else {
                setBadLogin(true);
                setLoggingin(false);
            }
        });
    }

    if (!authenticated) {
        return (
            <>
                <UserNavBar/>
                <h1 className="intro">Login</h1>
                <Loading/>
            </>
        );
    }

    return (
        <>
            <UserNavBar/>
            <LogButtons loggedin={false} handleLogout={null}/>
            <h1 className="intro">Login</h1>
            <div className="login">
                <div className="logincell email">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                    />
                    {badEmail && <p className="failure">Invalid Email</p>}
                </div>
                <div className="logincell password">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                    {badPassword && (
                        <p className="failure">Must Be 8+ Characters Long</p>
                    )}
                </div>
                <div className="logincell loginbtn">
                    {loggingin
                        ? <p className="loggingin">Logging In</p>
                        : <button
                            id="login"
                            className="login"
                            onClick={handleLoginClick}
                        >Login</button>
                    }
                    {badLogin && (
                        <p className="failure">Invalid Email Or Password</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
