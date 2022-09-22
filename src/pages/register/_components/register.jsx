/**
 * ---------------------------------------------------------------------------
 * REGISTER COMPONENT
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
import makeRegistration from '../_helpers/make-registration.js';
/** @const {!function} */
import isValidEmail from '../../../helpers/is-valid-email.js';
/** @const {!function} */
import UserNavBar from '../../../components/user-nav-bar.jsx';
/** @const {!function} */
import LogButtons from '../../../components/log-buttons.jsx';

/**
 * This method is the root component for the user registration.
 *
 * @return {!ReactElement}
 */
function Register() {

    /** @const {boolean} */
    const [ authenticated, setAuthenticated ] = React.useState(false);

    /** @const {boolean} */
    const [ registering, setRegistering ] = React.useState(false);
    /** @const {boolean} */
    const [ emptyFirstName, setEmptyFirstName ] = React.useState(false);
    /** @const {boolean} */
    const [ emptyLastName, setEmptyLastName ] = React.useState(false);
    /** @const {boolean} */
    const [ emptyEmail, setEmptyEmail ] = React.useState(false);
    /** @const {boolean} */
    const [ emptyPassword, setEmptyPassword ] = React.useState(false);
    /** @const {boolean} */
    const [ badEmail, setBadEmail ] = React.useState(false);
    /** @const {boolean} */
    const [ badPassword, setBadPassword ] = React.useState(false);
    /** @const {boolean} */
    const [ failRegistration, setFailRegistration ] = React.useState(false);

    /** @const {string} */
    const [ firstName, setFirstName ] = React.useState('');
    /** @const {string} */
    const [ lastName, setLastName ] = React.useState('');
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
    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleLastNameChange(event) {
        setLastName(event.target.value);
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
    function handleRegisterClick() {
        setRegistering(true);
        
        let invalid = false;
        if (!firstName) {
            setEmptyFirstName(true);
            invalid = true;
        }
        if (!lastName) {
            setEmptyLastName(true);
            invalid = true;
        }
        if (!email) {
            setEmptyEmail(true);
            invalid = true;
        }
        if (!password) {
            setEmptyPassword(true);
            invalid = true;
        }
        if (email && !isValidEmail(email)) {
            setBadEmail(true);
            invalid = true;
        }
        if (password && password.length < 8) {
            setBadPassword(true);
            invalid = true;
        }
        if (invalid) {
            setTimeout(() => {
                setEmptyFirstName(false);
                setEmptyLastName(false);
                setEmptyEmail(false);
                setEmptyPassword(false);
                setBadEmail(false);
                setBadPassword(false);
            }, 5000);
            setRegistering(false);
            return;
        }

        makeRegistration({
            first_name: firstName,
            last_name: lastName,
            email,
            password
        }, (success) => {
            if (success) {
                window.location.replace(SITE_URL + '/bikes');
            } else {
                setFailRegistration(true);
                setTimeout(() => setFailRegistration(false), 5000);
                setRegistering(false);
            }
        });
    }

    if (!authenticated) {
        return (
            <>
                <UserNavBar/>
                <h1 className="intro">Register</h1>
                <Loading/>
            </>
        );
    }

    return (
        <>
            <UserNavBar/>
            <LogButtons loggedin={false} handleLogout={null}/>
            <h1 className="intro">Register</h1>
            <div className="register">
                <div className="registercell firstname">
                    <input
                        type="text"
                        id="firstname"
                        placeholder="First Name"
                        onChange={handleFirstNameChange}
                    />
                </div>
                <div className="registercell lastname">
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Last Name"
                        onChange={handleLastNameChange}
                    />
                </div>
                <div className="registercell email">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="registercell password">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="registercell registerbtn">
                    {registering
                        ? <p className="registering">Registering</p>
                        : <button
                            id="register"
                            className="register"
                            onClick={handleRegisterClick}
                        >Register</button>
                    }
                    {emptyFirstName && (
                        <p className="failure">First Name Is Required</p>
                    )}
                    {emptyLastName && (
                        <p className="failure">Last Name Is Required</p>
                    )}
                    {badEmail && <p className="failure">Invalid Email</p>}
                    {emptyEmail && (
                        <p className="failure">Email Is Required</p>
                    )}
                    {badPassword && (
                        <p className="failure">
                            Password Must Be 8+ Characters Long
                        </p>
                    )}
                    {emptyPassword && (
                        <p className="failure">Password Is Required</p>
                    )}
                    {failRegistration && (
                        <p className="failure">Registration Failed</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Register;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
