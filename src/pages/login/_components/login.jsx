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
    const [ emailBlurred, setEmailBlurred ] = React.useState(false);

    /** @const {boolean} */
    const [ attemptLogin, setAttemptLogin ] = React.useState(false);
    /** @const {boolean} */
    const [ emptyEmail, setEmptyEmail ] = React.useState(false);
    /** @const {boolean} */
    const [ emptyPassword, setEmptyPassword ] = React.useState(false);
    /** @const {boolean} */
    const [ badLogin, setBadLogin ] = React.useState(false);
    /** @const {boolean} */
    const [ badEmail, setBadEmail ] = React.useState(false);

    /** @const {string} */
    const [ email, setEmail ] = React.useState('');
    /** @const {string} */
    const [ password, setPassword ] = React.useState('');

    /** @const {!ReactRef} */
    const emailRef = React.useRef(null);
    /** @const {!ReactRef} */
    const passwordRef = React.useRef(null);

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
        focusEmailInput();
    }

    /**
     * @return {void}
     */
    function focusEmailInput() {
        if (emailRef.current) {
            emailRef.current.focus();
        } else {
            setTimeout(focusEmailInput, 100);
        }
    }

    /**
     * @return {void}
     */
    function focusPasswordInput() {
        if (passwordRef.current) {
            passwordRef.current.focus();
        } else {
            setTimeout(focusPasswordInput, 100);
        }
    }

    /**
     * @param {string} email
     * @return {boolean}
     */
    function checkEmail(email) {
        const res = isValidEmail(email);
        setEmptyEmail(!email);
        setBadEmail(!!email && !res);
        return res;
    }

    /**
     * @param {string} password
     * @return {boolean}
     */
    function checkPassword(password) {
        setEmptyPassword(!password);
        return !!password;
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleEmailChange(event) {
        const val = event.target.value;
        setAttemptLogin(false);
        setBadLogin(false);
        setEmail(val);
        if (emailBlurred) {
            checkEmail(val);
        }
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handlePasswordChange(event) {
        const val = event.target.value;
        setAttemptLogin(false);
        setBadLogin(false);
        setPassword(val);
        checkPassword(val);
    }

    /**
     * @return {void}
     */
    function handleEmailBlur() {
        setEmailBlurred(true);
        checkEmail(email);
    }

    /**
     * @return {void}
     */
    function handlePasswordBlur() {
        checkPassword(password);
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleEnterKeyUp(event) {
        if (event.key === 'Enter') {
            handleLoginClick();
        }
    }

    /**
     * @return {void}
     */
    function handleLoginClick() {

        setAttemptLogin(false);
        setBadLogin(false);
        setEmailBlurred(true);

        if (!checkEmail(email)) {
            checkPassword(password);
            setAttemptLogin(true);
            focusEmailInput();
            return;
        } else if (!checkPassword(password)) {
            setAttemptLogin(true);
            focusPasswordInput();
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
                focusEmailInput();
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
                        ref={emailRef}
                        placeholder="Email"
                        onChange={handleEmailChange}
                        onKeyUp={handleEnterKeyUp}
                        onBlur={handleEmailBlur}
                    />
                    {emptyEmail && (
                        <p className="failure">Email Is Required</p>
                    )}
                    {badEmail && <p className="failure">Invalid Email</p>}
                </div>
                <div className="logincell password">
                    <input
                        type="password"
                        id="password"
                        ref={passwordRef}
                        placeholder="Password"
                        onChange={handlePasswordChange}
                        onKeyUp={handleEnterKeyUp}
                        onBlur={handlePasswordBlur}
                    />
                    {emptyPassword && (
                        <p className="failure">Password Is Required</p>
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
                    {attemptLogin && emptyEmail && (
                        <p className="failure">Email Is Required</p>
                    )}
                    {attemptLogin && badEmail && (
                        <p className="failure">Invalid Email</p>
                    )}
                    {attemptLogin && emptyPassword && (
                        <p className="failure">Password Is Required</p>
                    )}
                    {badLogin && (
                        <p className="failure">Incorrect Email Or Password</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Login;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
