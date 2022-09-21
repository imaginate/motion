(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

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
   * AUTHENTICATE USER HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method makes an AJAX call to the server to authenticate the user.
   *
   * @param {!function(boolean)} done
   * @return {void}
   */
  function authenticateUser(done) {
      const url = SITE_URL + '/api/user/authenticate';
      fetch(url, { method: 'HEAD' })
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' authenticate the user failed.');
              setTimeout(() => { throw err }, 0);
          })
          .then(res => {
              if (res.ok) {
                  done(true);
              } else if (/401/.test(res.status)) {
                  done(false);
              } else {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  alert('SERVER ERROR: The attempt to authenticate the user'
                      + ' with our server failed.');
                  setTimeout(() => { throw err }, 0);
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * DOWNLOAD BIKE HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method handles the AJAX call that downloads the bike's data.
   *
   * @param {number} bikeID
   * @param {!BikeDB} db
   * @param {!function} done
   * @return {void}
   */
  function downloadBike(bikeID, db, done) {
      const url = SITE_URL + '/api/user/bike/' + bikeID;
      fetch(url)
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' download the bike data failed.');
              setTimeout(() => { throw err }, 0);
          })
          .then(res => {
              if (!res.ok) {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  alert('SERVER ERROR: The attempt to download the bike date'
                      + ' from our server failed.');
                  setTimeout(() => { throw err }, 0);
              }
              return res.json();
          })
          .then(bike => {
              db.bike(bike, false);
              done();
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * GET BIKE ID HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const ID_PATT = /^.*\/([1-9][0-9]{0,9})\/?(?:\?.*)?$/;

  /**
   * Retrieves the ID from the URL path.
   *
   * @return {number}
   */
  function getBikeID() {
      const url = new URL(window.location.href);
      const path = url.pathname;
      return ID_PATT.test(path)
          ? +path.replace(ID_PATT, '$1')
          : 0;
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * DATE OPTION CLASS
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const DATE$1 = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/;

  /**
   * A wrapper for the date options like `"to"` and `"from"`.
   *
   * @class DateOption
   */
  class DateOption {
      /**
       * @param {(!Date|!DateOption|string|number)=} date = `undefined`
       *     If *date* is a string it must be formatted as `"YYYY-MM-DD"` with a
       *     one-based month (i.e. `1` - `12`) (note that the month and day
       *     should not have preceding zeros). If *date* is a number it must be
       *     a year, and *month* and *day* must be defined. If *date* is
       *     undefined the current local time is used.
       * @param {number=} month = `undefined`
       *     If *month* is defined it must be an one-based month (i.e. `1` -
       *     `12`). You may use a value less than one or greater than twelve.
       *     Values less than one will roll back the year and month, and values
       *     greater than twelve will roll forward the year and month. See
       *     [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth)
       *     for a description of using values exceeding the base range.
       * @param {number=} day = `undefined`
       *     If *day* is defined it must be an one-based day (i.e. `1` - `31`).
       *     You may use a value less than one or greater than thirty-one.
       *     Values less than one will roll back the year, month, and day, and
       *     values greater than the last day of the month will roll forward the
       *     year, month, and day. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate#description)
       *     for examples of using values exceeding the base range.
       * @constructor
       */
      constructor(date, month, day) {
          switch (typeof date) {
              case 'string':
                  date = new Date(
                      +date.replace(DATE$1, '$1'),
                      +date.replace(DATE$1, '$2') - 1,
                      +date.replace(DATE$1, '$3')
                  );
                  break;
              case 'number':
                  date = new Date(date, month - 1, day);
                  break;
              case 'object':
                  if (date instanceof DateOption) {
                      date = new Date(date.date());
                  } else if (!(date instanceof Date)) {
                      date = new Date();
                  }
                  break;
              default:
                  date = new Date();
                  break;
          }
          this._vals = Object.create(null);
          this._vals.year = date.getFullYear();
          this._vals.month = date.getMonth() + 1;
          this._vals.day = date.getDate();
          this._vals.week = date.getDay() + 1;
          this._vals.date = date;
      }

      /**
       * @param {!DateOption} date
       * @return {number}
       */
      compare(date) {
          const vals = this._vals;
          if (vals.year < date.year()) {
              return -1;
          }
          if (vals.year > date.year()) {
              return 1;
          }
          if (vals.month < date.month()) {
              return -1;
          }
          if (vals.month > date.month()) {
              return 1;
          }
          return vals.day < date.day()
              ? -1
              : vals.day === date.day()
                  ? 0
                  : 1;
      }

      /**
       * @param {!DateOption} date
       * @return {boolean}
       */
      equals(date) {
          return this._vals.year === date.year()
              && this._vals.month === date.month()
              && this._vals.day === date.day();
      }

      /**
       * @param {string} key
       *     The valid keys are as follows:
       *     - `"year"` - The four digit year.
       *     - `"month"` - The one-based digit month from `1` to `12`.
       *     - `"day"` - The one-based digit day of the month from `1` to `31`.
       *     - `"week"` - The one-based digit day of the week from `1` to `7`.
       *     - `"date"` - The underlying `Date` class instance.
       * @return {(number|!Date|undefined)}
       */
      get(key) {
          return this.has(key)
              ? this._vals[key]
              : undefined;
      }

      /**
       * @param {string} key
       *     The valid keys are as follows:
       *     - `"year"`
       *     - `"month"`
       *     - `"day"`
       *     - `"week"`
       *     - `"date"`
       * @return {boolean}
       */
      has(key) {
          return key in this._vals;
      }

      /**
       * Creates a string for the date that requires six to eight digits,
       * `"YYYY-MM-DD"` or `"YYYY-M-D"`.
       *
       * @return {string}
       */
      key() {
          return this.year() + '-' + this.month() + '-' + this.day();
      }

      /**
       * @param {string} key
       * @param {(number|!Date)} val
       *     The *val* should be a number unless the *key* is `"date"`. If the
       *     *key* is `"date"` the *val* should be an instance of the `Date`
       *     class. Note that when *key* is `"month"` or `"day"` that numbers in
       *     excess of the standard range roll the entire date forward or
       *     backward depending on the exact value provided. See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/setDate#description)
       *     for examples of using values exceeding the standard range. Also
       *     when *key* is `"month"` an one-based month should be used. See the
       *     *month* and *day* parameters for the `DateOption` constructor for a
       *     detailed explanation of the accepted *month* and *day* values.
       * @return {(number|!Date|undefined)}
       */
      set(key, val) {
          if (!this.has(key)) {
              return;
          }
          switch (key) {
              case 'year':
                  this._vals.date.setFullYear(val);
                  val = this._vals.date.getFullYear();
                  break;
              case 'month':
                  this._vals.date.setMonth(val - 1);
                  val = this._vals.date.getMonth() + 1;
                  break;
              case 'day':
                  this._vals.date.setDate(val);
                  val = this._vals.date.getDate();
                  break;
              case 'week':
                  return this._vals.week;
              case 'date':
                  this._vals.date = val;
                  break;
          }
          const date = this._vals.date;
          this._vals.year = date.getFullYear();
          this._vals.month = date.getMonth() + 1;
          this._vals.day = date.getDate();
          this._vals.week = date.getDay() + 1;
          return val;
      }

      /**
       * Gets and sets the four digit year.
       *
       * @param {number=} val = `undefined`
       * @return {number}
       */
      year(val) {
          return typeof val === 'number'
              ? this.set('year', val)
              : this.get('year');
      }

      /**
       * Gets and sets the one-based digit month from `1` to `12`. When setting
       * the month you may exceed the standard numeric range. Exceeding the
       * standard range rolls the year and month forward or backward. See the
       * *month* parameter for the `DateOption` constructor for a detailed
       * explanation of the accepted *month* values.
       *
       * @param {number=} val = `undefined`
       * @return {number}
       */
      month(val) {
          return typeof val === 'number'
              ? this.set('month', val)
              : this.get('month');
      }

      /**
       * Gets and sets the one-based digit day of the month from `1` to `31`.
       * When setting the day you may exceed the standard numeric range.
       * Exceeding the standard range rolls the year, month, and day forward or
       * backward. See the *day* parameter for the `DateOption` constructor for
       * a detailed explanation of the accepted *day* values.
       *
       * @param {number=} val = `undefined`
       * @return {number}
       */
      day(val) {
          return typeof val === 'number'
              ? this.set('day', val)
              : this.get('day');
      }

      /**
       * Gets the one-based digit day of the week from `1` to `7`.
       *
       * @return {number}
       */
      week() {
          return this.get('week');
      }

      /**
       * Gets and sets the underlying `Date` class instance.
       *
       * @param {!Date=} val = `undefined`
       * @return {!Date}
       */
      date(val) {
          return typeof val === 'object'
              ? this.set('date', val)
              : this.get('date');
      }

      /**
       * Creates a string for the date that strictly requires eight digits,
       * `"YYYY-MM-DD"`.
       *
       * @return {string}
       */
      strictkey() {
          const month = this.month() < 10
              ? '0' + this.month()
              : String(this.month());
          const day = this.day() < 10
              ? '0' + this.day()
              : String(this.day());
          return this.year() + '-' + month + '-' + day;
      }

      /**
       * Creates a string for the date that requires six to eight digits,
       * `"YYYY-MM-DD"` or `"YYYY-M-D"`.
       *
       * @return {string}
       */
      toString() {
          return this.year() + '-' + this.month() + '-' + this.day();
      }
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * BIKE DB CLASS
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * A database with all of the bike data and available rental dates.
   *
   * @class BikeDB
   */
  class BikeDB {
      /**
       * @constructor
       */
      constructor() {
          const db = newObject();
          db.startDate = newStartDate();
          db.endDate = newEndDate(db.startDate);
          db.dates = newObject();
          db.dates.all = newDates(db.startDate, db.endDate);
          db.dates.available = db.dates.all.slice();
          this._db = db;
          this._bike = null;
      }

      /**
       * Get the bike data or overwrite the existing bike data with a new bike
       * object.
       *
       * @param {?Object=} newbike = `undefined`
       * @param {boolean=} update = `true`
       *     This parameter is only valid if *newbike* is defined.
       * @return {?Object}
       */
      bike(newbike = undefined, update = true) {
          if (typeof newbike === 'object') {
              this._bike = newbike;
              if (update) {
                  this.update();
              }
          }
          return this._bike || null;
      }

      /**
       * Get the available dates to rent the bike.
       *
       * @return {!Array<string>}
       */
      dates() {
          return this._db.dates.available.slice();
      }

      /**
       * Make a reservation.
       *
       * @param {!DateOption} from
       * @param {!DateOption} to
       * @param {boolean=} update = `true`
       * @return {void}
       */
      reserve(from, to, update = true) {
          this._bike.reserved.push([ from.strictkey(), to.strictkey() ]);
          if (update) {
              this.update();
          }
      }

      /**
       * @return {void}
       */
      update() {
          if (this._bike) {
              this._db.dates.available = getAvailableDates(this._bike,this._db);
          } else {
              this._db.dates.available = this._db.dates.all.slice();
          }
      }
  }

  /**
   * @private
   * @return {!Object}
   */
  function newObject() {
      return Object.create(null);
  }

  /**
   * @private
   * @return {!DateOption}
   */
  function newStartDate() {
      const date = new DateOption();
      return new DateOption(date.year(), date.month(), date.day() + 1);
  }

  /**
   * @private
   * @param {!DateOption} startDate
   * @return {!DateOption}
   */
  function newEndDate(startDate) {
      return new DateOption(startDate.year(), startDate.month() + 4, 0);
  }

  /**
   * @private
   * @param {!DateOption} startDate
   * @param {!DateOption} endDate
   * @return {!Array<string>}
   */
  function newDates(startDate, endDate) {
      const dates = [];
      const startYear = startDate.year();
      const startMonth = startDate.month();
      const stopMonth = endDate.month() === 12
          ? 1
          : endDate.month() + 1;
      const startDay = startDate.day();
      for (let i = 1, date = startDate; date.month() !== stopMonth; ++i) {
          dates.push(date.strictkey());
          date = new DateOption(startYear, startMonth, startDay + i);
      }
      return dates;
  }

  /**
   * @private
   * @param {!Object} bike
   * @return {!Set<string>}
   */
  function newReserved(bike) {
      const reserved = new Set();
      const ranges = bike.reserved;
      for (const [ fromKey, toKey ] of ranges) {
          const from = new DateOption(fromKey);
          const to = new DateOption(toKey);
          for (let date = from; date.compare(to) < 1;) {
              reserved.add(date.strictkey());
              date = new DateOption(date.year(), date.month(), date.day() + 1);
          }
      }
      return reserved;
  }

  /**
   * @private
   * @param {!Object} bike
   * @param {!Object} db
   * @return {!Array<string>}
   */
  function getAvailableDates(bike, db) {
      const reserved = newReserved(bike);
      const available = [];
      for (const date of db.dates.all) {
          if (!reserved.has(date)) {
              available.push(date);
          }
      }
      return available;
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
   * MAKE-UNIQUE-ID HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * @param {number} i
   * @return {void}
   */
  function makeUniqueID(i) {
      return Date.now().toString(36) + Math.random().toString(36).substr(2) + i;
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * MAKE RESERVATION HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method handles the AJAX POST that reserves a bike.
   *
   * @param {!Object} bike
   * @param {!DateOption} from
   * @param {!DateOption} to
   * @param {!function(?Error)} done
   * @return {void}
   */
  function makeReservation(bike, from, to, done) {
      const url = SITE_URL + '/api/user/bike/reserve';
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              bike_id: bike.id,
              from: from.key(),
              to: to.key()
          })
      })
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              done(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' make your reservation failed.');
          })
          .then(res => {
              if (res.ok) {
                  done(null);
              } else {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  done(err);
                  alert('SERVER ERROR: The attempt to make your reservation'
                      + ' with our server failed.');
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * VALID DATE INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const DATE = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/;

  /**
   * @param {string} input
   * @return {boolean}
   */
  function validDateInput(input) {
      if (!DATE.test(input)) {
          return false;
      }
      const inyear = +input.replace(DATE, '$1');
      const inmonth = +input.replace(DATE, '$2');
      const inday = +input.replace(DATE, '$3');
      if (inyear < 2022
          || inmonth < 1 || inmonth > 12
          || inday < 1 || inday > 31
      ) {
          return false;
      }
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (inyear === year) {
          if (inmonth < month || inmonth > month + 3) {
              return false;
          }
      } else if (month < 10 || inyear !== year + 1) {
          return false;
      } else if (inmonth > month - 9) {
          return false;
      }
      const indate = new Date(inyear, inmonth - 1, inday);
      return inday === indate.getDate() && (inmonth !== month || inday > day);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * RESERVE COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component handles making reservations for the bike.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Reserve({
    bike,
    db,
    loggedin
  }) {
    /** @const {!Array<string>} */
    const [dates, setDates] = React__default["default"].useState(() => db.dates());
    /** @const {!Set<string>} */

    const [dateset, setDateset] = React__default["default"].useState(() => new Set(dates));
    /** @const {boolean} */

    const [reserving, setReserving] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [success, setSuccess] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [failure, setFailure] = React__default["default"].useState(false);
    /** @const {?DateOption} */

    const [from, setFrom] = React__default["default"].useState(null);
    /** @const {?DateOption} */

    const [to, setTo] = React__default["default"].useState(null);
    /**
     * @param {!Event} event
     * @return {void}
     */

    function handleFromChange(event) {
      const input = event.target;
      const newfrom = input.value && validDateInput(input.value) ? new DateOption(input.value) : null;

      if (!newfrom || !dateset.has(newfrom.strictkey()) || to && newfrom.compare(to) > 0) {
        input.value = '';
        setFrom(null);
        return;
      }

      if (!to) {
        input.value = newfrom.strictkey();
        setFrom(newfrom);
        return;
      }

      for (let date = newfrom; !date.equals(to);) {
        date = new DateOption(date.year(), date.month(), date.day() + 1);

        if (!dateset.has(date.strictkey())) {
          input.value = '';
          setFrom(null);
          return;
        }
      }

      input.value = newfrom.strictkey();
      setFrom(newfrom);
    }
    /**
     * @param {!Event} event
     * @return {void}
     */


    function handleToChange(event) {
      const input = event.target;
      const newto = input.value && validDateInput(input.value) ? new DateOption(input.value) : null;

      if (!newto || !dateset.has(newto.strictkey()) || from && from.compare(newto) > 0) {
        input.value = '';
        setTo(null);
        return;
      }

      if (!from) {
        input.value = newto.strictkey();
        setTo(newto);
        return;
      }

      for (let date = from; !date.equals(newto);) {
        date = new DateOption(date.year(), date.month(), date.day() + 1);

        if (!dateset.has(date.strictkey())) {
          input.value = '';
          setTo(null);
          return;
        }
      }

      input.value = newto.strictkey();
      setTo(newto);
    }
    /**
     * @param {!Event} event
     * @return {void}
     */


    function handleReserveClick(event) {
      if (!loggedin) {
        window.location.href = SITE_URL + '/login';
        return;
      }

      if (!from || !to) {
        setSuccess(false);
        setFailure(true);
        setTimeout(() => setFailure(false), 5000);
        return;
      }

      setReserving(true);
      makeReservation(bike, from, to, err => {
        if (err) {
          setSuccess(false);
          setFailure(true);
        } else {
          db.reserve(from, to);
          const newdates = db.dates();
          setDates(newdates);
          setDateset(new Set(newdates));
          setFrom(null);
          setTo(null);
          setSuccess(true);
          setFailure(false);
        }

        setReserving(false);
        setTimeout(() => {
          setSuccess(false);
          setFailure(false);
        }, 5000);
      });
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell reserve"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "from"
    }, "Reserve From:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "date",
      id: "from",
      list: "datesdatalist",
      value: from ? from.strictkey() : '',
      onChange: handleFromChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell reserve"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "to"
    }, "Reserve To:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "date",
      id: "to",
      list: "datesdatalist",
      value: to ? to.strictkey() : '',
      onChange: handleToChange
    })), /*#__PURE__*/React__default["default"].createElement("datalist", {
      id: "datesdatalist"
    }, dates.map((date, i) => /*#__PURE__*/React__default["default"].createElement("option", {
      key: makeUniqueID(i),
      value: date
    }))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell reserve"
    }, reserving ? /*#__PURE__*/React__default["default"].createElement("p", {
      className: "reserving"
    }, "Reserving") : /*#__PURE__*/React__default["default"].createElement("button", {
      id: "reserve",
      onClick: handleReserveClick
    }, "Make Reservation"), success && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success"
    }, "Success"), failure && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "failure"
    }, "Failed")));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * BIKE COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This method is the root component for the user bike app. It sets up the
   * environment, verifies the user, loads the bike, and hands over the
   * rendering to other components.
   *
   * @return {!ReactElement}
   */

  function Bike() {
    /** @const {number} */
    const [bikeID] = React__default["default"].useState(() => getBikeID());
    /** @const {!BikesDB} */

    const [db] = React__default["default"].useState(() => new BikeDB());
    /** @const {boolean} */

    const [authenticated, setAuthenticated] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [loggedin, setLoggedin] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [loaded, setLoaded] = React__default["default"].useState(false);
    /** @const {?Object} */

    const [bike, setBike] = React__default["default"].useState(() => db.bike());
    React__default["default"].useEffect(() => {
      authenticateUser(handleAuthenticateComplete);
      downloadBike(bikeID, db, handleDownloadComplete);
    }, []);
    /**
     * @param {boolean} loggedin
     * @return {void}
     */

    function handleAuthenticateComplete(loggedin) {
      setLoggedin(loggedin);
      setAuthenticated(true);
    }
    /**
     * @return {void}
     */


    function handleDownloadComplete() {
      db.update();
      setBike(db.bike());
      setLoaded(true);
    }
    /**
     * @return {void}
     */


    function handleLogout() {
      setLoggedin(false);
    }

    if (!authenticated || !loaded) {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement("h1", {
        className: "intro"
      }, "Bike ", bikeID, " Rental"), /*#__PURE__*/React__default["default"].createElement(Loading, null));
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement(LogButtons, {
      loggedin: loggedin,
      handleLogout: handleLogout
    }), /*#__PURE__*/React__default["default"].createElement("h1", {
      className: "intro"
    }, "Bike ", bikeID, " Rental"), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bike"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell model"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "label"
    }, "Model:"), /*#__PURE__*/React__default["default"].createElement("span", null, " ", bike.model))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell color"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "label"
    }, "Color:"), /*#__PURE__*/React__default["default"].createElement("span", null, " ", bike.color))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell location"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "label"
    }, "Location:"), /*#__PURE__*/React__default["default"].createElement("span", null, " ", bike.location))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell rating"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, bike.rating, "/5 from ", bike.rate_count, " reviews")), /*#__PURE__*/React__default["default"].createElement(Reserve, {
      bike: bike,
      db: db,
      loggedin: loggedin
    })));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * USER BIKE APP
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /** @const {!HTMLElement} */

  const main = document.getElementsByTagName('main')[0];
  /** @const {!Object} */

  const root = ReactDOM__default["default"].createRoot(main);
  root.render( /*#__PURE__*/React__default["default"].createElement(Bike, null));

})(React, ReactDOM);
