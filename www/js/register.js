(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  /**
   * ---------------------------------------------------------------------------
   * ENVIRONMENT SETTINGS
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * The protocol and full domain name for the website.
   *
   * @const {string}
   */
  const SITE_URL = 'http://localhost:8080';

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * LOADING COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This is the loading component which is the loading icon for all pages.
   *
   * @return {!ReactElement}
   */

  function Loading() {
    return /*#__PURE__*/React__default["default"].createElement("div", {
      id: "loadingbox"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      id: "loading"
    }, /*#__PURE__*/React__default["default"].createElement("div", null), /*#__PURE__*/React__default["default"].createElement("div", null), /*#__PURE__*/React__default["default"].createElement("div", null), /*#__PURE__*/React__default["default"].createElement("div", null)));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * AUTHENTICATE MANAGER HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method makes an AJAX call to the server to authenticate the manager.
   *
   * @param {!function(boolean, boolean)} done
   * @return {void}
   */
  function authenticateManager(done) {
      const url = SITE_URL + '/api/manager/authenticate';
      fetch(url, { method: 'HEAD' })
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' authenticate the manager failed.');
              setTimeout(() => { throw err }, 0);
          })
          .then(res => {
              if (res.ok) {
                  done(true, true);
              } else if (/401/.test(res.status)) {
                  done(false, false);
              } else if (/403/.test(res.status)) {
                  done(true, false);
              } else {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  alert('SERVER ERROR: The attempt to authenticate the manager'
                      + ' with our server failed.');
                  setTimeout(() => { throw err }, 0);
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * MAKE REGISTRATION HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method handles the AJAX POST that registers you.
   *
   * @param {!Object} user
   * @param {!function(boolean)} done
   * @return {void}
   */
  function makeRegistration(user, done) {
      const url = SITE_URL + '/api/user/register';
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
      })
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              done(false);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' register you failed.');
              setTimeout(() => { throw err }, 0);
          })
          .then(res => {
              if (res.ok) {
                  done(true);
              } else if (/409/.test(res.status)) {
                  done(false);
              } else {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  done(false);
                  alert('SERVER ERROR: The attempt to register you with our'
                      + ' server failed.');
                  setTimeout(() => { throw err }, 0);
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID EMAIL HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const EMAIL_PATT = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  /**
   * @param {*} email
   * @return {boolean}
   */
  function isValidEmail(email) {
      return !!email && typeof email === 'string' && EMAIL_PATT.test(email);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID NAME INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const NAME_PATT = /^(?:\p{L}|\p{N}|[-~ ,'"&/]){1,32}$/u;

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isValidNameInput(val) {
      return !!val && typeof val === 'string' && NAME_PATT.test(val);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID PASSWORD INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const PWD_PATT = /^(?:\p{L}|\p{N}|\p{M}|\p{S}|\p{P}){8,64}$/u;
  /** @const {!RegExp} */
  const UPPER_PATT = /(?:\p{Lu}|\p{Lt})/u;
  /** @const {!RegExp} */
  const LOWER_PATT = /\p{Ll}/u;
  /** @const {!RegExp} */
  const NUM_PATT = /\p{N}/u;
  /** @const {!RegExp} */
  const SPEC_PATT = /(?:\p{M}|\p{S}|\p{P})/u;

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isValidPasswordInput(val) {
      return !!val
          && typeof val === 'string'
          && PWD_PATT.test(val)
          && UPPER_PATT.test(val)
          && LOWER_PATT.test(val)
          && NUM_PATT.test(val)
          && SPEC_PATT.test(val);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * USER NAV BAR COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This is the user navigation component for all user pages.
   *
   * @return {!ReactElement}
   */

  const UserNavBar = React__default["default"].memo(function UserNavBar() {
    return /*#__PURE__*/React__default["default"].createElement("nav", {
      className: "topnav"
    }, /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/bikes',
      className: "topnav"
    }, "Bikes"), /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/reservations',
      className: "topnav"
    }, "Reservations"));
  });
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * LOGOUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method makes an AJAX call to the server to logout the user.
   *
   * @param {!function} done
   * @return {void}
   */
  function logout(done) {
      const url = SITE_URL + '/api/user/logout';
      fetch(url, { method: 'HEAD' })
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' logout the user failed.');
              setTimeout(() => { throw err }, 0);
          })
          .then(res => {
              if (res.ok) {
                  done();
              } else {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  alert('SERVER ERROR: The attempt to logout the user with our'
                      + ' server failed.');
                  setTimeout(() => { throw err }, 0);
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * LOG BUTTONS COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * These are the login, logout, and register buttons.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function LogButtons({
    loggedin,
    handleLogout
  }) {
    /**
     * @return {void}
     */
    function handleLogoutClick() {
      logout(handleLogout);
    }

    if (loggedin) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "logbtns"
      }, /*#__PURE__*/React__default["default"].createElement("button", {
        className: "logbtn",
        onClick: handleLogoutClick
      }, "Logout"));
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "logbtns"
    }, /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/login',
      className: "logbtn"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      className: "logbtn"
    }, "Login")), /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/register',
      className: "logbtn"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      className: "logbtn"
    }, "Register")));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * REGISTER COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This method is the root component for the user registration.
   *
   * @return {!ReactElement}
   */

  function Register() {
    /** @const {boolean} */
    const [authenticated, setAuthenticated] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [registering, setRegistering] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [firstNameBlurred, setFirstNameBlurred] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [lastNameBlurred, setLastNameBlurred] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emailBlurred, setEmailBlurred] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [passwordBlurred, setPasswordBlurred] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emptyFirstName, setEmptyFirstName] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emptyLastName, setEmptyLastName] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emptyEmail, setEmptyEmail] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emptyPassword, setEmptyPassword] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [badFirstName, setBadFirstName] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [badLastName, setBadLastName] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [badEmail, setBadEmail] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [badPassword, setBadPassword] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [attemptRegister, setAttemptRegister] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [failRegister, setFailRegister] = React__default["default"].useState(false);
    /** @const {string} */

    const [firstName, setFirstName] = React__default["default"].useState('');
    /** @const {string} */

    const [lastName, setLastName] = React__default["default"].useState('');
    /** @const {string} */

    const [email, setEmail] = React__default["default"].useState('');
    /** @const {string} */

    const [password, setPassword] = React__default["default"].useState('');
    /** @const {!ReactRef} */

    const firstNameRef = React__default["default"].useRef(null);
    /** @const {!ReactRef} */

    const lastNameRef = React__default["default"].useRef(null);
    /** @const {!ReactRef} */

    const emailRef = React__default["default"].useRef(null);
    /** @const {!ReactRef} */

    const passwordRef = React__default["default"].useRef(null);
    React__default["default"].useEffect(() => {
      authenticateManager(handleAuthenticateComplete);
    }, []);
    /**
     * @param {boolean} loggedin
     * @param {boolean} isManager
     * @return {void}
     */

    function handleAuthenticateComplete(loggedin, isManager) {
      if (loggedin) {
        window.location.replace(isManager ? SITE_URL + '/manage/bikes' : SITE_URL + '/bikes');
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
      }, success => {
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
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement("h1", {
        className: "intro"
      }, "Register"), /*#__PURE__*/React__default["default"].createElement(Loading, null));
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement(LogButtons, {
      loggedin: false,
      handleLogout: null
    }), /*#__PURE__*/React__default["default"].createElement("h1", {
      className: "intro"
    }, "Register"), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "register"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell firstname"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "firstname",
      ref: firstNameRef,
      placeholder: "First Name",
      onChange: handleFirstNameChange,
      onKeyUp: handleEnterKeyUp,
      onBlur: handleFirstNameBlur
    }), emptyFirstName && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "First Name Is Required"), badFirstName && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid First Name"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "32 Character Limit"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "break"
    }, "Letters, Numbers,"), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "break"
    }, "& Limited Special"), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "break"
    }, "Characters Accepted")))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell lastname"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "lastname",
      ref: lastNameRef,
      placeholder: "Last Name",
      onChange: handleLastNameChange,
      onKeyUp: handleEnterKeyUp,
      onBlur: handleLastNameBlur
    }), emptyLastName && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Last Name Is Required"), badLastName && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid Last Name"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "32 Character Limit"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "break"
    }, "Letters, Numbers,"), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "break"
    }, "& Limited Special"), /*#__PURE__*/React__default["default"].createElement("span", {
      className: "break"
    }, "Characters Accepted")))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell email"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "email",
      id: "email",
      ref: emailRef,
      placeholder: "Email",
      onChange: handleEmailChange,
      onKeyUp: handleEnterKeyUp,
      onBlur: handleEmailBlur
    }), emptyEmail && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Email Is Required"), badEmail && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid Email")), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell password"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "password",
      id: "password",
      ref: passwordRef,
      placeholder: "Password",
      onChange: handlePasswordChange,
      onKeyUp: handleEnterKeyUp,
      onBlur: handlePasswordBlur
    }), emptyPassword && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Password Is Required"), badPassword && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid Password"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "8 Character Minimum"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "64 Character Limit"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Uppercase Letter Required"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Lowercase Letter Required"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Number Required"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Special Character Required"), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "No Space Characters Allowed"))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell registerbtn"
    }, registering ? /*#__PURE__*/React__default["default"].createElement("p", {
      className: "registering"
    }, "Registering") : /*#__PURE__*/React__default["default"].createElement("button", {
      id: "register",
      className: "register",
      onClick: handleRegisterClick
    }, "Register"), attemptRegister && emptyFirstName && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "First Name Is Required"), attemptRegister && badFirstName && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid First Name"), attemptRegister && emptyLastName && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Last Name Is Required"), attemptRegister && badLastName && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid Last Name"), attemptRegister && emptyEmail && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Email Is Required"), attemptRegister && badEmail && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid Email"), attemptRegister && emptyPassword && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Password Is Required"), attemptRegister && badPassword && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid Password"), failRegister && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Registration Failed"))));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * REGISTER APP
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /** @const {!HTMLElement} */

  const main = document.getElementsByTagName('main')[0];
  /** @const {!Object} */

  const root = ReactDOM__default["default"].createRoot(main);
  root.render( /*#__PURE__*/React__default["default"].createElement(Register, null));

})(React, ReactDOM);
