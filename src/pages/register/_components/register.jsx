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
import isValidNameInput from '../../../helpers/is-valid-name-input.js';
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
    const [ badFirstName, setBadFirstName ] = React.useState(false);
    /** @const {boolean} */
    const [ badLastName, setBadLastName ] = React.useState(false);
    /** @const {boolean} */
    const [ badEmail, setBadEmail ] = React.useState(false);
    /** @const {boolean} */
    const [ badPassword, setBadPassword ] = React.useState(false);

    /** @const {boolean} */
    const [ invalidField, setInvalidField ] = React.useState(false);
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
        const val = event.target.value;
        setFirstName(val);
        setEmptyFirstName(false);
        setBadFirstName(false);
        if (!val) {
            setEmptyFirstName(true);
        } else if (!isValidNameInput(val)) {
            setBadFirstName(true);
        }
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleLastNameChange(event) {
        const val = event.target.value;
        setLastName(val);
        setEmptyLastName(false);
        setBadLastName(false);
        if (!val) {
            setEmptyLastName(true);
        } else if (!isValidNameInput(val)) {
            setBadLastName(true);
        }
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleEmailChange(event) {
        const val = event.target.value;
        setEmail(val);
        setEmptyEmail(false);
        setBadEmail(false);
        if (!val) {
            setEmptyEmail(true);
        } else if (!isValidEmail(val)) {
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
        setEmptyPassword(false);
        setBadPassword(false);
        if (!val) {
            setEmptyPassword(true);
        } else if (val.length < 8) {
            setBadPassword(true);
        }
    }

    /**
     * @return {void}
     */
    function handleRegisterClick() {
         setInvalidField(false);
         setFailRegistration(false);

        if (emptyFirstName || emptyLastName || emptyEmail || emptyPassword
            || badFirstName || badLastName || badEmail || badPassword
        ) {
            setInvalidField(true);
            return;
        }

        setRegistering(true);
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
                    {emptyFirstName && (
                        <p className="failure">First Name Is Required</p>
                    )}
                    {badFirstName && (
                        <p className="failure">Invalid First Name</p>
                    )}
                </div>
                <div className="registercell lastname">
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Last Name"
                        onChange={handleLastNameChange}
                    />
                    {emptyLastName && (
                        <p className="failure">Last Name Is Required</p>
                    )}
                    {badLastName && (
                        <p className="failure">Invalid Last Name</p>
                    )}
                </div>
                <div className="registercell email">
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleEmailChange}
                    />
                    {emptyEmail && (
                        <p className="failure">Email Is Required</p>
                    )}
                    {badEmail && <p className="failure">Invalid Email</p>}
                </div>
                <div className="registercell password">
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={handlePasswordChange}
                    />
                    {emptyPassword && (
                        <p className="failure">Password Is Required</p>
                    )}
                    {badPassword && (
                        <p className="failure">
                            Password Must Be 8+ Characters Long
                        </p>
                    )}
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
                    {invalidField && (
                        <p className="failure">Invalid Field</p>
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
