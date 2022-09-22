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

  function LogButtons(props) {
    /**
     * @return {void}
     */
    function handleLogout() {
      props.handleLogout();
    }

    if (props.loggedin) {
      return /*#__PURE__*/React__default["default"].createElement("div", {
        className: "logbtns"
      }, /*#__PURE__*/React__default["default"].createElement("button", {
        id: "logout",
        className: "logbtn",
        onClick: handleLogout
      }, "Logout"));
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "logbtns"
    }, /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/login',
      className: "logbtn"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      id: "login",
      className: "logbtn"
    }, "Login")), /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/register',
      className: "logbtn"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      id: "register",
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

    const [loggedin, setLoggedin] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [registering, setRegistering] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emptyFirstName, setEmptyFirstName] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emptyLastName, setEmptyLastName] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emptyEmail, setEmptyEmail] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [emptyPassword, setEmptyPassword] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [badEmail, setBadEmail] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [badPassword, setBadPassword] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [failRegistration, setFailRegistration] = React__default["default"].useState(false);
    /** @const {string} */

    const [firstName, setFirstName] = React__default["default"].useState('');
    /** @const {string} */

    const [lastName, setLastName] = React__default["default"].useState('');
    /** @const {string} */

    const [email, setEmail] = React__default["default"].useState('');
    /** @const {string} */

    const [password, setPassword] = React__default["default"].useState('');
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
        window.location.replace(isManager ? SITE_URL + '/manager/bikes' : SITE_URL + '/bikes');
      }

      setLoggedin(loggedin);
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
      }, success => {
        if (success) {
          window.location.replace(SITE_URL + '/bikes');
        } else {
          setFailRegistration(true);
          setTimeout(() => setFailRegistration(false), 5000);
          setRegistering(false);
        }
      });
    }
    /**
     * @return {void}
     */


    function handleLogout() {
      setLoggedin(false);
    }

    if (!authenticated) {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement("h1", {
        className: "intro"
      }, "Register"), /*#__PURE__*/React__default["default"].createElement(Loading, null));
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement(LogButtons, {
      loggedin: loggedin,
      handleLogout: handleLogout
    }), /*#__PURE__*/React__default["default"].createElement("h1", {
      className: "intro"
    }, "Register"), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "register"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell firstname"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "firstname",
      placeholder: "First Name",
      onChange: handleFirstNameChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell lastname"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "lastname",
      placeholder: "Last Name",
      onChange: handleLastNameChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell email"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "email",
      id: "email",
      placeholder: "Email",
      onChange: handleEmailChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell password"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: "password",
      id: "password",
      placeholder: "Password",
      onChange: handlePasswordChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "registercell registerbtn"
    }, registering ? /*#__PURE__*/React__default["default"].createElement("p", {
      className: "registering"
    }, "Registering") : /*#__PURE__*/React__default["default"].createElement("button", {
      id: "register",
      className: "register",
      onClick: handleRegisterClick
    }, "Register"), emptyFirstName && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "First Name Is Required"), emptyLastName && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Last Name Is Required"), badEmail && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Invalid Email"), emptyEmail && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Email Is Required"), badPassword && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Password Must Be 8+ Characters Long"), emptyPassword && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Password Is Required"), failRegistration && /*#__PURE__*/React__default["default"].createElement("p", {
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
