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
   * DOWNLOAD RESERVATIONS HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method handles the AJAX calls that download the reservations. After
   * each successful fetch it adds its downloaded reservations to the current
   * state and initiates the next AJAX call until all reservations have been
   * downloaded.
   *
   * @param {number} page
   * @param {!PageOptions} opts
   * @param {!ReservationsDB} db
   * @param {!function} done
   * @return {void}
   */
  function downloadReservations(page, opts, db, done) {
      const url = SITE_URL + '/api/user/reservations/' + page;
      let isLastPage = false;
      fetch(url)
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' download the reservations failed.');
              setTimeout(() => { throw err }, 0);
          })
          .then(res => {
              if (!res.ok) {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  alert('SERVER ERROR: The attempt to download the reservations'
                      + ' from our server failed.');
                  setTimeout(() => { throw err }, 0);
              }
              if (res.headers.get('Page-Number')
                  === res.headers.get('Last-Page')
              ) {
                  isLastPage = true;
              }
              return res.json();
          })
          .then(reservations => {
              if (!isLastPage) {
                  downloadReservations(page + 1, opts, db, done);
              }
              db.adds(reservations, false);
              if (isLastPage) {
                  done();
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID ID INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const ID_PATT = /^[1-9][0-9]{0,9}$/;

  /**
   * @param {*} input
   * @return {boolean}
   */
  function isValidIDInput(input) {
      if (typeof input === 'number') {
          input = String(input);
      }
      return !!input && typeof input === 'string' && ID_PATT.test(input);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS DATE INSTANCE HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDateInstance(val) {
      return !!val && typeof val === 'object' && val instanceof Date;
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
  const DATE = /^([2-9][0-9]{3})-(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])$/;

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
                      +date.replace(DATE, '$1'),
                      +date.replace(DATE, '$2') - 1,
                      +date.replace(DATE, '$3')
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
       * Creates a string for the date that requires six to eight digits,
       * `"MM/DD/YYYY"` or `"M/D/YYYY"`.
       *
       * @return {string}
       */
      pretty() {
          return this.month() + '/' + this.day() + '/' + this.year();
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
   * IS DATE OPTION INSTANCE HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isDateOptionInstance(val) {
      return !!val && typeof val === 'object' && val instanceof DateOption;
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID DATE STRING HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const DATE_PATT = /^[2-9][0-9]{3}-(?:1[0-2]|0?[1-9])-(?:3[01]|[12][0-9]|0?[1-9])$/;
  /** @const {!RegExp} */
  const STRICT_DATE_PATT = /^[2-9][0-9]{3}-(?:1[0-2]|0[1-9])-(?:3[01]|[12][0-9]|0[1-9])$/;

  /**
   * @param {*} date
   * @param {boolean=} strict = `false`
   * @return {boolean}
   */
  function isValidDateString(date, strict = false) {
      return !!date && typeof date === 'string' && (strict
          ? STRICT_DATE_PATT.test(date)
          : DATE_PATT.test(date)
      );
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID RATING INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const RATING_PATT = /^[1-5]$/;

  /**
   * @param {*} input
   * @return {boolean}
   */
  function isValidRatingInput(input) {
      if (typeof input === 'number' && input >= 1 && input <= 5) {
          input = String(input);
      }
      return !!input && typeof input === 'string' && RATING_PATT.test(input);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * VALID OPTION INPUTS OBJECT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * @typedef {{
   *     tab: !function(*): boolean,
   *     id: !function(*): boolean,
   *     bike: !function(*): boolean,
   *     date: !function(*): boolean,
   *     rating: !function(*): boolean
   * }} ValidOptionInputs
   */

  /** @const {!RegExp} */
  const TAB_PATT = /^[0-9]+$/;

  /**
   * The valid page option keys and their value validation methods.
   *
   * @const {!ValidOptionInputs}
   */
  const VALID_OPTION_INPUTS = Object.create(null);
  VALID_OPTION_INPUTS.tab = isValidTabInput;
  VALID_OPTION_INPUTS.id = isValidIDInput;
  VALID_OPTION_INPUTS.bike = isValidIDInput;
  VALID_OPTION_INPUTS.date = isValidDateInput;
  VALID_OPTION_INPUTS.rating = isValidRatingInput;

  /**
   * @param {*} input
   * @return {boolean}
   */
  function isValidTabInput(input) {
      if (typeof input === 'number') {
          input = String(input);
      }
      return !!input && typeof input === 'string' && TAB_PATT.test(input);
  }

  /**
   * @param {*} input
   * @return {boolean}
   */
  function isValidDateInput(input) {
      return isValidDateString(input)
          || isDateInstance(input)
          || isDateOptionInstance(input);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * PAGE OPTIONS CLASS
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * Saves the options passed from the URL parameters. Makes it easy to convert
   * the options into an URL parameters string.
   *
   * @class PageOptions
   */
  class PageOptions {
      /**
       * @constructor
       */
      constructor() {
          this._url = new URL(window.location.href);
          this._params = new URLSearchParams(this._url.search);
          this._vals = Object.create(null);
          const tmp = Object.create(null);
          for (const [ key, val ] of this._params) {
              tmp[key] = val;
          }
          for (const key in tmp) {
              if (!(key in VALID_OPTION_INPUTS)
                  || !VALID_OPTION_INPUTS[key](tmp[key])
              ) {
                  this._params.delete(key);
              }
          }
          for (const [ key, val ] of this._params) {
              this.set(key, val);
          }
      }

      /**
       * @param {string} key
       *     The valid keys are as follows:
       *     - `"tab"`
       *     - `"id"`
       *     - `"bike"`
       *     - `"date"`
       *     - `"rating"`
       * @return {(string|number|!DateOption|undefined)}
       */
      delete(key) {
          if (!this.isValid(key)) {
              return undefined;
          }
          const val = this._vals[key];
          this._vals[key] = undefined;
          this._params.delete(key);
          return val;
      }

      /**
       * @param {string} key
       *     The valid keys are as follows:
       *     - `"tab"`
       *     - `"id"`
       *     - `"bike"`
       *     - `"date"`
       *     - `"rating"`
       * @return {(string|number|!DateOption|undefined)}
       */
      get(key) {
          return this.isValid(key)
             ? this._vals[key]
             : undefined;
      }

      /**
       * @param {string} key
       *     The valid keys are as follows:
       *     - `"tab"`
       *     - `"id"`
       *     - `"bike"`
       *     - `"date"`
       *     - `"rating"`
       * @return {boolean}
       */
      has(key) {
          return this.isValid(key) && this._vals[key] !== undefined;
      }

      /**
       * @param {string} key
       *     The valid keys are as follows:
       *     - `"tab"`
       *     - `"id"`
       *     - `"bike"`
       *     - `"date"`
       *     - `"rating"`
       * @return {boolean}
       */
      isValid(key) {
          return key in VALID_OPTION_INPUTS;
      }

      /**
       * @param {string} key
       *     The valid keys are as follows:
       *     - `"tab"`
       *     - `"id"`
       *     - `"bike"`
       *     - `"date"`
       *     - `"rating"`
       * @param {(string|number|!Date|!DateOption)} val
       * @return {(string|number|!DateOption|undefined)}
       */
      set(key, val) {
          if (!this.isValid(key)) {
              return undefined;
          }
          val = clean(key, val);
          if (val) {
              this._vals[key] = val;
              this._params.set(key, val.toString());
          } else {
              this.delete(key);
          }
          return val || undefined;
      }

      /**
       * This method builds and returns a simple state object with the current
       * parameter values or takes a previous state object and updates the
       * PageOptions instance values. The state object is used for the history
       * functionality (going back or forward a page).
       *
       * @param {!Object=} state = `undefined`
       *     If undefined the current state is compiled and returned. If defined
       *     the state is used to update each of the option's values.
       * @return {!Object}
       */
      state(state) {
          if (!state) {
              return {
                  tab: this.tab(),
                  id: this.id(),
                  bike: this.bike(),
                  date: this.date() && this.date().key(),
                  rating: this.rating()
              };
          }
          for (const key in VALID_OPTION_INPUTS) {
              if (state[key]) {
                  this.set(key, state[key]);
              } else {
                  this.delete(key);
              }
          }
          return state;
      }

      /**
       * This method returns the current url path name with or without the
       * current parameter values.
       *
       * @param {boolean=} withparams = `true`
       * @return {string}
       */
      urlpath(withparams = true) {
          const params = this._params.toString();
          this._url.search = params && '?' + params;
          return withparams
              ? this._url.pathname + this._url.search
              : this._url.pathname;
      }

      /**
       * This method returns the complete url with the current parameter values.
       *
       * @return {string}
       */
      url() {
          const params = this._params.toString();
          this._url.search = params && '?' + params;
          return this._url.toString();
      }

      /**
       * If the current tab value is greater than the total tab count, this
       * method sets the tab value to the last available tab.
       *
       * @param {number} len
       *     The total length of rows to display.
       * @return {number}
       *     The new tab value is returned.
       */
      prunetab(len) {

          let tab = this.get('tab');

          if (!tab) {
              tab = 1;
              this.set('tab', tab);
          }

          const tablen = (tab - 1) * 20;

          if (len <= tablen) {
              tab = Math.ceil(len / 20) || 1;
              this.set('tab', tab);
          }

          return tab;
      }

      /**
       * @param {(string|number)=} val = `undefined`
       * @return {(number|undefined)}
       */
      tab(val) {
          return val === undefined
              ? this.get('tab')
              : this.set('tab', val);
      }

      /**
       * @param {(string|number)=} val = `undefined`
       * @return {(number|undefined)}
       */
      id(val) {
          return val === undefined
              ? this.get('id')
              : this.set('id', val);
      }

      /**
       * @param {(string|number)=} val = `undefined`
       * @return {(number|undefined)}
       */
      bike(val) {
          return val === undefined
              ? this.get('bike')
              : this.set('bike', val);
      }

      /**
       * @param {(string|!Date|!DateOption)=} val = `undefined`
       * @return {(!DateOption|undefined)}
       */
      date(val) {
          return val === undefined
              ? this.get('date')
              : this.set('date', val);
      }

      /**
       * @param {(string|number)=} val = `undefined`
       * @return {(number|undefined)}
       */
      rating(val) {
          return val === undefined
              ? this.get('rating')
              : this.set('rating', val);
      }
  }

  /**
   * @private
   * @param {string} key
   * @param {*} val
   * @return {(number|?DateOption|string|undefined)}
   */
  function clean(key, val) {
      switch (key) {
          case 'tab':
              return cleanTab(val);
          case 'id':
              return cleanID(val);
          case 'bike':
              return cleanID(val);
          case 'date':
              return cleanDate(val);
          case 'rating':
              return cleanRating(val);
      }
      return undefined;
  }

  /**
   * @private
   * @param {*} val
   * @return {number}
   */
  function cleanTab(val) {
      if (typeof val === 'string') {
          val = VALID_OPTION_INPUTS.tab(val)
              ? +val.slice(0, 10)
              : 1;
      } else if (typeof val !== 'number') {
          return 1;
      }
      return val < 1
          ? 1
          : Math.floor(val);
  }

  /**
   * @private
   * @param {*} val
   * @return {number}
   */
  function cleanID(val) {
      return VALID_OPTION_INPUTS.id(val)
          ? +val
          : 0;
  }

  /**
   * @private
   * @param {*} val
   * @return {?DateOption}
   */
  function cleanDate(val) {
      return VALID_OPTION_INPUTS.date(val)
          ? new DateOption(val)
          : null;
  }

  /**
   * @private
   * @param {*} val
   * @return {number}
   */
  function cleanRating(val) {
      return VALID_OPTION_INPUTS.rating(val)
          ? +val
          : 0;
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * RESERVATIONS DB CLASS
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * A database with all lists of the available reservations.
   *
   * @class ReservationsDB
   */
  class ReservationsDB {
      /**
       * @param {!PageOptions} opts
       * @param {?Array<!Object>=} reservations = `null`
       * @constructor
       */
      constructor(opts, reservations = null) {
          this._db = newDB();
          this._opts = opts;
          this._reservations = [];
          if (reservations) {
              this.adds(reservations);
          }
      }

      /**
       * @param {!Object} reservation
       * @param {boolean=} update = `true`
       * @return {void}
       */
      add(reservation, update = true) {
          const db = this._db;
          db.all.push(reservation);
          db.allset.add(reservation);
          db.id[reservation.id] = reservation;
          addToBike(db, reservation);
          addToDate(db, reservation);
          addToRating(db, reservation);
          if (update) {
              this.update();
          }
      }

      /**
       * @param {!Array<!Object>} reservations
       * @param {boolean=} update = `true`
       * @return {void}
       */
      adds(reservations, update = true) {
          for (const reservation of reservations) {
              this.add(reservation, false);
          }
          if (update) {
              this.update();
          }
      }

      /**
       * @param {!Object} reservation
       * @param {(string|number)} rating
       * @return {void}
       */
      changeRating(reservation, rating) {
          const db = this._db;
          removeFromRating(db, reservation);
          reservation.rating = isValidRatingInput(rating)
              ? +rating
              : 0;
          addToRating(db, reservation);
      }

      /**
       * Gets all reservations that are assigned to the user and matches the
       * selected filtering options.
       *
       * @return {!Array<!Object>}
       */
      reservations() {
          return this._reservations.slice();
      }

      /**
       * @return {void}
       */
      update() {
          this._reservations = this._opts.has('id')
              ? getReservation(this._opts.id(), this._db)
              : getMatchingReservations(this._db, this._opts);
      }

      /**
       * @return {void}
       */
      wipe() {
          this._db = newDB();
          this._reservations = [];
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
   * @return {!Object}
   */
  function newDB() {
      const db = newObject();
      db.all = [];
      db.allset = new Set();
      db.id = newObject();
      db.bike = newObject();
      db.date = newObject();
      db.rating = newRating();
      return db;
  }

  /**
   * @private
   * @return {!Object}
   */
  function newRating() {
      const rating = newObject();
      for (let i = 1; i < 6; ++i) {
          rating[i] = new Set();
      }
      return rating;
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} reservation
   * @return {void}
   */
  function addToBike(db, reservation) {
      const id = reservation.bike_id;
      if (!(id in db.bike)) {
          db.bike[id] = new Set();
      }
      db.bike[id].add(reservation);
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} reservation
   * @return {void}
   */
  function addToDate(db, reservation) {
      const from = new DateOption(reservation.from);
      const to = new DateOption(reservation.to);
      for (let date = from; date.compare(to) < 1;) {
          const key = date.strictkey();
          if (!(key in db.date)) {
              db.date[key] = new Set();
              db.date[date.key()] = db.date[key];
          }
          db.date[key].add(reservation);
          date = new DateOption(date.year(), date.month(), date.day() + 1);
      }
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} reservation
   * @return {void}
   */
  function addToRating(db, reservation) {
      if (reservation.rating in db.rating) {
          db.rating[reservation.rating].add(reservation);
      }
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} reservation
   * @return {void}
   */
  function removeFromRating(db, reservation) {
      if (reservation.rating in db.rating) {
          db.rating[reservation.rating].delete(reservation);
      }
  }

  /**
   * @private
   * @param {number} id
   * @param {!Object} db
   * @return {!Array<!Object>}
   */
  function getReservation(id, db) {
      return id in db.id
          ? [ db.id[id] ]
          : [];
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!PageOptions} opts
   * @return {!Array<!Object>}
   */
  function getMatchingReservations(db, opts) {
      let set = opts.has('bike')
          ? db.bike[opts.bike()]
          : db.allset;
      set = mergeSets('date', set, db, opts);
      set = mergeSets('rating', set, db, opts);
      return set
          ? Array.from(set.values())
          : [];
  }

  /**
   * @private
   * @param {string} key
   * @param {?Set<!Object>} set
   * @param {!Object} db
   * @param {!PageOptions} opts
   * @return {?Set<!Object>}
   */
  function mergeSets(key, set, db, opts) {

      if (!set || !opts.has(key)) {
          return set;
      }

      const newset = db[key][opts.get(key)];

      if (!newset) {
          return newset;
      }

      // Make sure you iterate over the smaller set. It can save a lot of time.
      const refset = set.size < newset.size
          ? newset
          : set;
      const itset = set.size < newset.size
          ? set
          : newset;
      set = new Set();
      for (const reservation of itset) {
          if (refset.has(reservation)) {
              set.add(reservation);
          }
      }
      return set;
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
   * TRIM WHITESPACE HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const LEAD_SPACE_PATT = /^[ \r\n\t]+/;
  /** @const {!RegExp} */
  const END_SPACE_PATT = /[ \r\n\t]+$/;

  /**
   * @param {string} str
   * @return {void}
   */
  function trimWhitespace(str) {
      return str.replace(LEAD_SPACE_PATT, '').replace(END_SPACE_PATT, '');
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * FILTERS COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component creates and manages the reservation list filters.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Filters({
    opts,
    db,
    reservations,
    handleOptionsChange
  }) {
    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleIDChange(event) {
      const input = event.target;
      const val = trimWhitespace(input.value);
      const prev = opts.id();

      if (val && VALID_OPTION_INPUTS.id(val)) {
        opts.id(val);
      } else {
        opts.delete('id');
        input.value = '';
      }

      if (prev !== opts.id()) {
        handleOptionsChange();
      }
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleBikeChange(event) {
      const input = event.target;
      const val = trimWhitespace(input.value);
      const prev = opts.bike();

      if (val && VALID_OPTION_INPUTS.bike(val)) {
        opts.bike(val);
      } else {
        opts.delete('bike');
        input.value = '';
      }

      if (prev !== opts.bike()) {
        handleOptionsChange();
      }
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleDateChange(event) {
      const input = event.target;
      const val = input.value;
      const prev = opts.date();

      if (val && VALID_OPTION_INPUTS.date(val)) {
        opts.date(val);
      } else {
        opts.delete('date');
        input.value = '';
      }

      if (prev !== opts.date()) {
        handleOptionsChange();
      }
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleRatingChange(event) {
      const input = event.target;
      const val = input.value;
      const prev = opts.rating();

      if (val && VALID_OPTION_INPUTS.rating(val)) {
        opts.rating(val);
      } else {
        opts.delete('rating');
        input.value = '';
      }

      if (prev !== opts.rating()) {
        handleOptionsChange();
      }
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filters"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "id"
    }, "Reservation ID:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "id",
      className: "text",
      placeholder: "Reservation ID",
      value: opts.has('id') ? opts.id() : '',
      onChange: handleIDChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "bike"
    }, "Bike ID:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "bike",
      className: "text",
      placeholder: "Bike ID",
      value: opts.has('bike') ? opts.bike() : '',
      onChange: handleBikeChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "date"
    }, "Reserved On:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "date",
      id: "date",
      className: "date",
      value: opts.has('date') ? opts.date().strictkey() : '',
      onChange: handleDateChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "rating"
    }, "Rating:"), /*#__PURE__*/React__default["default"].createElement("select", {
      id: "rating",
      value: opts.has('rating') ? opts.rating() : '',
      onChange: handleRatingChange
    }, /*#__PURE__*/React__default["default"].createElement("option", {
      value: ""
    }, "All"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "1"
    }, "1"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "2"
    }, "2"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "3"
    }, "3"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "4"
    }, "4"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "5"
    }, "5"))));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * PRETTIFY DATE HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * @param {(string|!Date|!DateOption)} date
   * @return {string}
   *     Returns a string with the month, day of the month, and year in order.
   *     Note that the month and day are one-based, `1` - `12` and `1` - `31`
   *     respectively. The string looks like `"MM/DD/YYYY"`. There are no
   *     preceding zeros.
   */
  function prettifyDate(date) {
      date = new DateOption(date);
      return date.pretty();
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * UPLOAD RATING HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method handles the AJAX POST that updates a reservation's rating.
   *
   * @param {!Object} reservation
   * @param {!function(?Error): void} done
   * @return {void}
   */
  function uploadRating(reservation, done) {
      const url = SITE_URL + '/api/user/rating';
      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              reservation_id: reservation.id,
              bike_id: reservation.bike_id,
              rating: reservation.rating
          })
      })
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              done(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' update the rating failed.');
              setTimeout(() => { throw err }, 0);
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
                  alert('SERVER ERROR: The attempt to update the rating with'
                      + ' our server failed.');
                  setTimeout(() => { throw err }, 0);
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * DELETE RESERVATION HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method handles the AJAX POST that deletes a reservation.
   *
   * @param {!Object} reservation
   * @param {!function(?Error)} done
   * @return {void}
   */
  function deleteReservation(reservation, done) {
      const url = SITE_URL + '/api/user/reservation/' + reservation.id;
      fetch(url, {
          method: 'DELETE'
      })
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              done(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' delete the reservation failed.');
              setTimeout(() => { throw err }, 0);
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
                  alert('SERVER ERROR: The attempt to delete the reservation'
                      + ' with our server failed.');
                  setTimeout(() => { throw err }, 0);
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * RESERVATION COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component renders a single reservation.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Reservation({
    db,
    opts,
    reservation,
    handleOptionsChange,
    handleDelete
  }) {
    /** @const {(string|number)} */
    const [rating, setRating] = React__default["default"].useState(() => isValidRatingInput(reservation.rating) ? reservation.rating : '');
    /** @const {boolean} */

    const [updating, setUpdating] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [failure, setFailure] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [success, setSuccess] = React__default["default"].useState(false);
    /**
     * @param {!Event} event
     * @return {void}
     */

    function handleRatingChange(event) {
      const val = event.target.value;
      setFailure(false);
      setSuccess(false);
      setUpdating(true);
      const prev = reservation.rating;
      db.changeRating(reservation, val);
      uploadRating(reservation, err => {
        if (err) {
          db.changeRating(reservation, prev);
          setFailure(true);
          setTimeout(() => setFailure(false), 5000);
        } else {
          setRating(val);

          if (opts.rating()) {
            handleOptionsChange();
          } else {
            setSuccess(true);
            setTimeout(() => setSuccess(false), 5000);
          }
        }

        setUpdating(false);
      });
    }
    /**
     * @return {void}
     */


    function handleDeleteClick() {
      const msg = 'Are you sure you want to delete reservation #' + reservation.id + '?';

      if (confirm(msg)) {
        deleteReservation(reservation, handleDelete);
      }
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "reservationrow"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "reservationcell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, "#", reservation.id)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "reservationcell"
    }, /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/bike/' + reservation.bike_id,
      className: "reservationlink"
    }, "Bike #", reservation.bike_id)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "reservationcell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, prettifyDate(reservation.from) + ' - ' + prettifyDate(reservation.to))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "reservationcell"
    }, updating || /*#__PURE__*/React__default["default"].createElement("select", {
      id: "rating",
      value: rating,
      title: "Change Rating",
      onChange: handleRatingChange
    }, /*#__PURE__*/React__default["default"].createElement("option", {
      value: ""
    }, "No Rating"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "1"
    }, "1 / 5"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "2"
    }, "2 / 5"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "3"
    }, "3 / 5"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "4"
    }, "4 / 5"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "5"
    }, "5 / 5")), updating && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "updating-rating"
    }, /*#__PURE__*/React__default["default"].createElement("img", {
      className: "icon",
      src: SITE_URL + '/img/loading-green-24x24.svg',
      alt: "Updating Rating"
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rating-update-result-placeholder"
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "rating-update-result"
    }, failure && /*#__PURE__*/React__default["default"].createElement("img", {
      className: "icon",
      src: SITE_URL + '/img/x-red-24x24.svg',
      alt: "Rating Update Failed"
    }), success && /*#__PURE__*/React__default["default"].createElement("img", {
      className: "icon",
      src: SITE_URL + '/img/checkmark-green-24x24.svg',
      alt: "Rating Updated"
    }))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "reservationcell"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      id: "delete",
      title: "Delete Reservation",
      onClick: handleDeleteClick
    }, "X")));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * RESERVATION LIST COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component renders the list of reservations.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function ReservationList({
    opts,
    db,
    reservations,
    tab,
    handleOptionsChange,
    handleDelete
  }) {
    const start = (tab - 1) * 20;
    const end = Math.min(reservations.length, tab * 20);
    const list = reservations.slice(start, end);
    const last = list.length - 1;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "reservationlist"
    }, list.length === 0 && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "noreservations"
    }, "No Matching Reservations"), list.map((reservation, i) => /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Reservation, {
      key: makeUniqueID(i),
      db: db,
      opts: opts,
      reservation: reservation,
      handleDelete: handleDelete,
      handleOptionsChange: handleOptionsChange
    }), i !== last && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "spacerow"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "spacecell"
    })))));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * TAB COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component is a single page tab.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Tab({
    tab,
    active,
    handleTabChange
  }) {
    /**
     * @return {void}
     */
    function handleTabClick() {
      if (!active) {
        handleTabChange(tab);
      }
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "tab"
    }, active ? /*#__PURE__*/React__default["default"].createElement("button", {
      className: "active",
      onClick: handleTabClick
    }, tab) : /*#__PURE__*/React__default["default"].createElement("button", {
      onClick: handleTabClick
    }, tab));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * TABS COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component handles the page tabs located at the bottom of the screen.
   * The page tabs enable you to view a new selection of 20 matching
   * reservations.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Tabs({
    reservations,
    tab,
    handleTabChange
  }) {
    const lastTab = Math.ceil(reservations.length / 20); // We are going to pick 9 sequential page tabs (including the current tab)
    // to display. If possible we want the current tab to be the middle value.

    const startTab = tab < 5 ? 1 : tab + 4 > lastTab ? lastTab - 8 > 1 ? lastTab - 8 : 1 : tab - 4;
    const endTab = startTab + 8 > lastTab ? lastTab : startTab + 8;
    const tabs = [];

    for (let t = startTab; t <= endTab; ++t) {
      const id = makeUniqueID(t);
      tabs.push([id, t, t === tab]);
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "tabbox"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "tabs"
    }, tabs.map(([id, tab, active]) => /*#__PURE__*/React__default["default"].createElement(Tab, {
      key: id,
      tab: tab,
      active: active,
      handleTabChange: handleTabChange
    }))));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * RESERVATIONS COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This method is the root component for the user reservations page. It sets
   * up the environment, verifies the user, loads the reservations, and hands
   * over the rendering to other components.
   *
   * @return {!ReactElement}
   */

  function Reservations() {
    /** @const {boolean} */
    const [authenticated, setAuthenticated] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [loaded, setLoaded] = React__default["default"].useState(false);
    /** @const {!PageOptions} */

    const [opts] = React__default["default"].useState(() => new PageOptions());
    /** @const {!ReservationsDB} */

    const [db] = React__default["default"].useState(() => new ReservationsDB(opts));
    /** @const {number} */

    const [tab, setTab] = React__default["default"].useState(() => opts.tab());
    /** @const {!Array<!Object>} */

    const [reservations, setReservations] = React__default["default"].useState(() => db.reservations()); // This effect sets up the browser history state, appends the handler for
    // history state change (e.g. the user presses the back button), and
    // starts the reservation list download. On unmount this effect removes
    // the history state management listener.

    React__default["default"].useEffect(() => {
      if (!opts.has('tab')) {
        opts.tab(1);
      }

      window.history.replaceState({
        opts: opts.state(),
        reservations
      }, '', opts.urlpath());
      window.addEventListener('popstate', handleHistoryChange);
      authenticateUser(handleAuthenticateComplete);
      return () => {
        window.removeEventListener('popstate', handleHistoryChange);
      };
    }, []);
    /**
     * @param {boolean} loggedin
     * @return {void}
     */

    function handleAuthenticateComplete(loggedin) {
      if (!loggedin) {
        window.location.replace(SITE_URL + '/login');
        return;
      }

      setAuthenticated(true);
      downloadReservations(1, opts, db, handleDownloadComplete);
    }
    /**
     * @return {void}
     */


    function handleDownloadComplete() {
      db.update();
      const reservations = db.reservations();
      opts.prunetab(reservations.length);
      window.history.replaceState({
        opts: opts.state(),
        reservations
      }, '', opts.urlpath());
      setTab(opts.tab());
      setReservations(reservations);
      setLoaded(true);
    }
    /**
     * @return {void}
     */


    function handleOptionsChange() {
      db.update();
      const reservations = db.reservations();
      opts.prunetab(reservations.length);
      window.history.pushState({
        opts: opts.state(),
        reservations
      }, '', opts.urlpath());
      setTab(opts.tab());
      setReservations(reservations);
    }
    /**
     * @param {number} tab
     * @return {void}
     */


    function handleTabChange(tab) {
      opts.tab(tab);
      window.history.pushState({
        opts: opts.state(),
        reservations
      }, '', opts.urlpath());
      setTab(opts.tab());
    }
    /**
     * This method handles a history state change (e.g. user clicks the back
     * or forward button).
     *
     * @param {!Event} event
     * @return {void}
     */


    function handleHistoryChange(event) {
      opts.state(event.state.opts);
      opts.prunetab(event.state.reservations.length);
      setTab(opts.tab());
      setReservations(event.state.reservations);

      if (!authenticated) {
        authenticateUser(handleAuthenticateComplete);
      }

      if (!loaded) {
        downloadReservations(1, opts, db, handleDownloadComplete);
      }
    }
    /**
     * @param {?Error} err
     * @return {void}
     */


    function handleDelete(err) {
      if (!err) {
        setLoaded(false);
        db.wipe();
        downloadReservations(1, opts, db, handleDownloadComplete);
      }
    }
    /**
     * @return {void}
     */


    function handleLogout() {
      window.location.href = SITE_URL + '/bikes';
    }

    if (!authenticated || !loaded) {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement("h1", {
        className: "intro"
      }, "Your Reservations"), /*#__PURE__*/React__default["default"].createElement(Loading, null));
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement(LogButtons, {
      loggedin: true,
      handleLogout: handleLogout
    }), /*#__PURE__*/React__default["default"].createElement("h1", {
      className: "intro"
    }, "Your Reservations"), /*#__PURE__*/React__default["default"].createElement(Filters, {
      opts: opts,
      db: db,
      reservations: reservations,
      handleOptionsChange: handleOptionsChange
    }), /*#__PURE__*/React__default["default"].createElement(ReservationList, {
      opts: opts,
      db: db,
      reservations: reservations,
      tab: tab,
      handleDelete: handleDelete,
      handleOptionsChange: handleOptionsChange
    }), /*#__PURE__*/React__default["default"].createElement(Tabs, {
      reservations: reservations,
      tab: tab,
      handleTabChange: handleTabChange
    }));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * RESERVATIONS APP
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /** @const {!HTMLElement} */

  const main = document.getElementsByTagName('main')[0];
  /** @const {!Object} */

  const root = ReactDOM__default["default"].createRoot(main);
  root.render( /*#__PURE__*/React__default["default"].createElement(Reservations, null));

})(React, ReactDOM);
