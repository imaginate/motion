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
import isValidPasswordInput from '../../../helpers/is-valid-password-input.js';
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
    const [ firstNameBlurred, setFirstNameBlurred ] = React.useState(false);
    /** @const {boolean} */
    const [ lastNameBlurred, setLastNameBlurred ] = React.useState(false);
    /** @const {boolean} */
    const [ emailBlurred, setEmailBlurred ] = React.useState(false);
    /** @const {boolean} */
    const [ passwordBlurred, setPasswordBlurred ] = React.useState(false);

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
    const [ attemptRegister, setAttemptRegister ] = React.useState(false);
    /** @const {boolean} */
    const [ failRegister, setFailRegister ] = React.useState(false);

    /** @const {string} */
    const [ firstName, setFirstName ] = React.useState('');
    /** @const {string} */
    const [ lastName, setLastName ] = React.useState('');
    /** @const {string} */
    const [ email, setEmail ] = React.useState('');
    /** @const {string} */
    const [ password, setPassword ] = React.useState('');

    /** @const {!ReactRef} */
    const firstNameRef = React.useRef(null);
    /** @const {!ReactRef} */
    const lastNameRef = React.useRef(null);
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
        focusInput(firstNameRef);
    }

    /**
     * @param {!ReactRef} ref
     * @return {void}
     */
    function focusInput(ref) {
        if (ref.current) {
            ref.current.focus();
        } else {
            setTimeout(() => focusInput(ref), 100);
        }
    }

    /**
     * @param {string} firstName
     * @return {boolean}
     */
    function checkFirstName(firstName) {
        const res = isValidNameInput(firstName);
        setEmptyFirstName(!firstName);
        setBadFirstName(!!firstName && !res);
        return res;
    }

    /**
     * @param {string} lastName
     * @return {boolean}
     */
    function checkLastName(lastName) {
        const res = isValidNameInput(lastName);
        setEmptyLastName(!lastName);
        setBadLastName(!!lastName && !res);
        return res;
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
        const res = isValidPasswordInput(password);
        setEmptyPassword(!password);
        setBadPassword(!!password && !res);
        return res;
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleFirstNameChange(event) {
        const val = event.target.value;
        setAttemptRegister(false);
        setFailRegister(false);
        setFirstName(val);
        if (firstNameBlurred) {
            checkFirstName(val);
        }
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleLastNameChange(event) {
        const val = event.target.value;
        setAttemptRegister(false);
        setFailRegister(false);
        setLastName(val);
        if (lastNameBlurred) {
            checkLastName(val);
        }
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleEmailChange(event) {
        const val = event.target.value;
        setAttemptRegister(false);
        setFailRegister(false);
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
        setAttemptRegister(false);
        setFailRegister(false);
        setPassword(val);
        if (passwordBlurred) {
            checkPassword(val);
        }
    }

    /**
     * @return {void}
     */
    function handleFirstNameBlur() {
        setFirstNameBlurred(true);
        checkFirstName(firstName);
    }

    /**
     * @return {void}
     */
    function handleLastNameBlur() {
        setLastNameBlurred(true);
        checkLastName(lastName);
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
        setPasswordBlurred(true);
        checkPassword(password);
    }

    /**
     * @param {!Event} event
     * @return {void}
     */
    function handleEnterKeyUp(event) {
        if (event.key === 'Enter') {
            handleRegisterClick();
        }
    }

    /**
     * @return {void}
     */
    function handleRegisterClick() {

        setAttemptRegister(false);
        setFailRegister(false);
        setFirstNameBlurred(true);
        setLastNameBlurred(true);
        setEmailBlurred(true);
        setPasswordBlurred(true);

        let failedRef = null;
        if (!checkPassword(password)) {
            failedRef = passwordRef;
        }
        if (!checkEmail(email)) {
            failedRef = emailRef;
        }
        if (!checkLastName(lastName)) {
            failedRef = lastNameRef;
        }
        if (!checkFirstName(firstName)) {
            failedRef = firstNameRef;
        }

        if (failedRef) {
            setAttemptRegister(true);
            focusInput(failedRef);
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
                setFailRegister(true);
                setRegistering(false);
                focusInput(emailRef);
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
                        ref={firstNameRef}
                        placeholder="First Name"
                        onChange={handleFirstNameChange}
                        onKeyUp={handleEnterKeyUp}
                        onBlur={handleFirstNameBlur}
                    />
                    {emptyFirstName && (
                        <p className="failure">First Name Is Required</p>
                    )}
                    {badFirstName && (<>
                        <p className="failure">Invalid First Name</p>
                        <p className="failure">32 Character Limit</p>
                        <p className="failure">
                            <span className="break">Letters, Numbers,</span>
                            <span className="break">& Limited Special</span>
                            <span className="break">Characters Accepted</span>
                        </p>
                    </>)}
                </div>
                <div className="registercell lastname">
                    <input
                        type="text"
                        id="lastname"
                        ref={lastNameRef}
                        placeholder="Last Name"
                        onChange={handleLastNameChange}
                        onKeyUp={handleEnterKeyUp}
                        onBlur={handleLastNameBlur}
                    />
                    {emptyLastName && (
                        <p className="failure">Last Name Is Required</p>
                    )}
                    {badLastName && (<>
                        <p className="failure">Invalid Last Name</p>
                        <p className="failure">32 Character Limit</p>
                        <p className="failure">
                            <span>Letters, Numbers, & Limited Special</span>
                            <span> Characters Accepted</span>
                        </p>
                    </>)}
                </div>
                <div className="registercell email">
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
                <div className="registercell password">
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
                    {badPassword && (<>
                        <p className="failure">Invalid Password</p>
                        <p className="failure">8 Character Minimum</p>
                        <p className="failure">64 Character Limit</p>
                        <p className="failure">Uppercase Letter Required</p>
                        <p className="failure">Lowercase Letter Required</p>
                        <p className="failure">Number Required</p>
                        <p className="failure">Special Character Required</p>
                        <p className="failure">No Space Characters Allowed</p>
                    </>)}
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
                    {attemptRegister && emptyFirstName && (
                        <p className="failure">First Name Is Required</p>
                    )}
                    {attemptRegister && badFirstName && (
                        <p className="failure">Invalid First Name</p>
                    )}
                    {attemptRegister && emptyLastName && (
                        <p className="failure">Last Name Is Required</p>
                    )}
                    {attemptRegister && badLastName && (
                        <p className="failure">Invalid Last Name</p>
                    )}
                    {attemptRegister && emptyEmail && (
                        <p className="failure">Email Is Required</p>
                    )}
                    {attemptRegister && badEmail && (
                        <p className="failure">Invalid Email</p>
                    )}
                    {attemptRegister && emptyPassword && (
                        <p className="failure">Password Is Required</p>
                    )}
                    {attemptRegister && badPassword && (
                        <p className="failure">Invalid Password</p>
                    )}
                    {failRegister && (
                        <p className="failure">Registration Failed</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Register;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
