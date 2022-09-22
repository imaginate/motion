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
    const [ badPwd, setBadPwd ] = React.useState(false);
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
                ? SITE_URL + '/manager/bikes'
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
        setEmail(event.target.value);
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    /**
     * @return {void}
     */
    function handleLoginClick() {
        setLoggingin(true);
        const _email = email;
        const _pwd = password;
        if (!isValidEmail(_email)) {
            setBadEmail(true);
            if (_pwd.length < 8) {
                setBadPwd(true);
            }
            setTimeout(() => {
                setBadEmail(false);
                setBadPwd(false);
            }, 5000);
            setLoggingin(false);
            return;
        } else if (_pwd.length < 8) {
            setBadPwd(true);
            setTimeout(() => setBadPwd(false), 5000);
            setLoggingin(false);
            return;
        }
        makeLoginAttempt(_email, _pwd, (success) => {
            if (success) {
                authenticateManager((_, isManager) => {
                    window.location.replace(isManager
                        ? SITE_URL + '/manager/bikes'
                        : SITE_URL + '/bikes'
                    );
                });
            } else {
                setBadLogin(true);
                setTimeout(() => setBadLogin(false), 5000);
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
                    {badPwd && (
                        <p className="failure">Must be 8+ characters long</p>
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
                        <p className="failure">Invalid email or password</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
