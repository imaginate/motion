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
   * DOWNLOAD BIKES HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method handles the AJAX calls that download the bikes. After each
   * successful fetch it adds its downloaded bikes to the current state and
   * initiates the next AJAX call until all bikes have been downloaded.
   *
   * @param {number} page
   * @param {!PageOptions} opts
   * @param {!BikesDB} db
   * @param {!function} done
   * @return {void}
   */
  function downloadBikes(page, opts, db, done) {
      const url = SITE_URL + '/api/user/bikes/' + page;
      let isLastPage = false;
      fetch(url)
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' download the bikes failed.');
              setTimeout(() => { throw err }, 0);
          })
          .then(res => {
              if (!res.ok) {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  alert('SERVER ERROR: The attempt to download the bikes from'
                      + ' our server failed.');
                  setTimeout(() => { throw err }, 0);
              }
              if (res.headers.get('Page-Number')
                  === res.headers.get('Last-Page')
              ) {
                  isLastPage = true;
              }
              return res.json();
          })
          .then(bikes => {
              if (!isLastPage) {
                  downloadBikes(page + 1, opts, db, done);
              }
              db.adds(bikes, false);
              if (isLastPage) {
                  done();
              }
          })
          .catch(err => setTimeout(() => { throw err }, 0));
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
   * IS VALID DATE STRING HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const DATE_PATT$1 = /^[2-9][0-9]{3}-(?:1[0-2]|0?[1-9])-(?:3[01]|[12][0-9]|0?[1-9])$/;
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
          : DATE_PATT$1.test(date)
      );
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * DATE STRING TO NUMBERS HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const DATE_PATT = /^([2-9][0-9]{3})-(1[0-2]|0?[1-9])-(3[01]|[12][0-9]|0?[1-9])$/;

  /**
   * @param {string} date
   *     Must be a valid date string.
   * @return {!Array<number>}
   *     Returns an array with the year, month, and day of the month in order.
   *     Note that the month and day are one-based, `1` - `12` and `1` - `31`
   *     respectively.
   */
  function dateStringToNumbers(date) {
      return [
          +date.replace(DATE_PATT, '$1'),
          +date.replace(DATE_PATT, '$2'),
          +date.replace(DATE_PATT, '$3')
      ];
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * DATE INSTANCE TO NUMBERS HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * @param {!Date} date
   * @return {!Array<number>}
   *     Returns an array with the year, month, and day of the month in order.
   *     Note that the month and day are one-based, `1` - `12` and `1` - `31`
   *     respectively.
   */
  function dateInstanceToNumbers(date) {
      return [
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
      ];
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID DATE INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * @param {*} input
   * @return {boolean}
   */
  function isValidDateInput(input) {
      if (isValidDateString(input)) {
          input = dateStringToNumbers(input);
      } else if (isDateInstance(input)) {
          input = dateInstanceToNumbers(input);
      } else {
          return false;
      }
      const [ inyear, inmonth, inday ] = input;
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
   * IS VALID MODEL INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const MODEL_PATT = /^[a-zA-Z0-9"](?:[a-zA-Z0-9-~ ,'"&/]{0,30}[a-zA-Z0-9'"])?$/;

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isValidModelInput(val) {
      return !!val && typeof val === 'string' && MODEL_PATT.test(val);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID COLOR INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const COLOR_PATT = /^[a-zA-Z0-9"](?:[a-zA-Z0-9-~ ,'"&/]{0,14}[a-zA-Z0-9'"])?$/;

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isValidColorInput(val) {
      return !!val && typeof val === 'string' && COLOR_PATT.test(val);
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * IS VALID LOCATION INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const LOCATION_PATT = /^[a-zA-Z0-9"](?:[a-zA-Z0-9-~ ,'"&/]{0,62}[a-zA-Z0-9'"])?$/;

  /**
   * @param {*} val
   * @return {boolean}
   */
  function isValidLocationInput(val) {
      return !!val && typeof val === 'string' && LOCATION_PATT.test(val);
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
   *     tab: !function(string): boolean,
   *     from: !function(string): boolean,
   *     to: !function(string): boolean,
   *     model: !function(string): boolean,
   *     color: !function(string): boolean,
   *     location: !function(string): boolean,
   *     rating: !function(string): boolean
   * }} ValidOptionInputs
   */

  /** @const {!RegExp} */
  const TAB = /^[0-9]+$/;

  /**
   * The valid page option keys and their value validation methods.
   *
   * @const {!ValidOptionInputs}
   */
  const VALID_OPTION_INPUTS = Object.create(null);
  VALID_OPTION_INPUTS.tab = validTabInput;
  VALID_OPTION_INPUTS.from = isValidDateInput;
  VALID_OPTION_INPUTS.to = isValidDateInput;
  VALID_OPTION_INPUTS.model = isValidModelInput;
  VALID_OPTION_INPUTS.color = isValidColorInput;
  VALID_OPTION_INPUTS.location = isValidLocationInput;
  VALID_OPTION_INPUTS.rating = isValidRatingInput;

  /**
   * @param {string} input
   * @return {boolean}
   */
  function validTabInput(input) {
      return TAB.test(input);
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
  const DATE = /^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})$/;

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
          this._params = new URLSearchParams(this.url.search);
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
       *     - `"from"`
       *     - `"to"`
       *     - `"model"`
       *     - `"color"`
       *     - `"location"`
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
       *     - `"from"`
       *     - `"to"`
       *     - `"model"`
       *     - `"color"`
       *     - `"location"`
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
       *     - `"from"`
       *     - `"to"`
       *     - `"model"`
       *     - `"color"`
       *     - `"location"`
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
       *     - `"from"`
       *     - `"to"`
       *     - `"model"`
       *     - `"color"`
       *     - `"location"`
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
       *     - `"from"`
       *     - `"to"`
       *     - `"model"`
       *     - `"color"`
       *     - `"location"`
       *     - `"rating"`
       * @param {(string|number|!Date|!DateOption)} val
       * @return {(string|number|!DateOption|undefined)}
       */
      set(key, val) {
          if (!this.isValid(key)) {
              return undefined;
          }
          val = clean(key, val, this);
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
                  from: this.from() && this.from().key(),
                  to: this.to() && this.to().key(),
                  model: this.model(),
                  color: this.color(),
                  location: this.location(),
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
       * @param {(string|number)=} val = `undefined`
       * @return {(number|undefined)}
       */
      tab(val) {
          return val === undefined
              ? this.get('tab')
              : this.set('tab', val);
      }

      /**
       * @param {(string|!Date|!DateOption)=} val = `undefined`
       * @return {(!DateOption|undefined)}
       */
      from(val) {
          return val === undefined
              ? this.get('from')
              : this.set('from', val);
      }

      /**
       * @param {(string|!Date|!DateOption)=} val = `undefined`
       * @return {(!DateOption|undefined)}
       */
      to(val) {
          return val === undefined
              ? this.get('to')
              : this.set('to', val);
      }

      /**
       * @param {string=} val = `undefined`
       * @return {(string|undefined)}
       */
      model(val) {
          return val === undefined
              ? this.get('model')
              : this.set('model', val);
      }

      /**
       * @param {string=} val = `undefined`
       * @return {(string|undefined)}
       */
      color(val) {
          return val === undefined
              ? this.get('color')
              : this.set('color', val);
      }

      /**
       * @param {string=} val = `undefined`
       * @return {(string|undefined)}
       */
      location(val) {
          return val === undefined
              ? this.get('location')
              : this.set('location', val);
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
   * @param {!PageOptions} opts
   * @return {(number|?DateOption|string|undefined)}
   */
  function clean(key, val, opts) {
      switch (key) {
          case 'tab':
              return cleanTab(val);
          case 'from':
              return cleanFrom(val, opts);
          case 'to':
              return cleanTo(val, opts);
          case 'model':
              return cleanModel(val);
          case 'color':
              return cleanColor(val);
          case 'location':
              return cleanLocation(val);
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
   * @param {!PageOptions} opts
   * @return {?DateOption}
   */
  function cleanFrom(val, opts) {
      const from = typeof val === 'string'
          ? VALID_OPTION_INPUTS.from(val)
              ? new DateOption(val)
              : null
          : typeof val === 'object' && (
              val instanceof Date || val instanceof DateOption
          )
              ? new DateOption(val)
              : null;
      return !from || (opts.has('to') && from.compare(opts.get('to')) > 0)
          ? null
          : from;
  }

  /**
   * @private
   * @param {*} val
   * @param {!PageOptions} opts
   * @return {?DateOption}
   */
  function cleanTo(val, opts) {
      const to = typeof val === 'string'
          ? VALID_OPTION_INPUTS.to(val)
              ? new DateOption(val)
              : null
          : typeof val === 'object' && (
              val instanceof Date || val instanceof DateOption
          )
              ? new DateOption(val)
              : null;
      return !to || (opts.has('from') && opts.get('from').compare(to) > 0)
          ? null
          : to;
  }

  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function cleanModel(val) {
      return val && typeof val === 'string' && VALID_OPTION_INPUTS.model(val)
          ? val
          : '';
  }

  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function cleanColor(val) {
      return val && typeof val === 'string' && VALID_OPTION_INPUTS.color(val)
          ? val
          : '';
  }

  /**
   * @private
   * @param {*} val
   * @return {string}
   */
  function cleanLocation(val) {
      return val && typeof val === 'string' && VALID_OPTION_INPUTS.location(val)
          ? val
          : '';
  }

  /**
   * @private
   * @param {*} val
   * @return {number}
   */
  function cleanRating(val) {
      if (typeof val === 'string') {
          if (!VALID_OPTION_INPUTS.rating(val)) {
              return 0;
          }
          val = +val;
      } else if (typeof val !== 'number') {
          return 0;
      }
      return val > 0 && val < 6
          ? Math.floor(val)
          : 0;
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * BIKES DB CLASS
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * A database with all lists of the available bikes and bike choices.
   *
   * @class BikesDB
   */
  class BikesDB {
      /**
       * @param {!PageOptions} pageOptions
       * @param {?Array<!Object>=} bikes = `null`
       * @constructor
       */
      constructor(pageOptions, bikes = null) {
          const db = newObject();
          db.data = [];
          db.startDate = newStartDate();
          db.endDate = newEndDate(db.startDate);
          db.calendar = newCalendar(db.startDate, db.endDate);
          db.model = newObject();
          db.color = newObject();
          db.location = newObject();
          db.rating = newRating();
          this._db = db;
          this._pageOptions = pageOptions;
          this._available = [];
          this._matching = [];
          this._bikes = [];
          if (bikes) {
              this.adds(bikes);
          }
      }

      /**
       * @param {!Object} bike
       * @param {boolean=} update = `true`
       * @return {void}
       */
      add(bike, update = true) {
          const db = this._db;
          db.data.push(bike);
          addToCalendar(db, bike);
          addToModel(db, bike);
          addToColor(db, bike);
          addToLocation(db, bike);
          addToRating(db, bike);
          if (update) {
              this.update();
          }
      }

      /**
       * @param {!Array<!Object>} bikes
       * @param {boolean=} update = `true`
       * @return {void}
       */
      adds(bikes, update = true) {
          for (const bike of bikes) {
              this.add(bike, false);
          }
          if (update) {
              this.update();
          }
      }

      /**
       * Gets all bikes that are available for rental and match the selected
       * filtering options.
       *
       * @return {!Array<!Object>}
       */
      bikes() {
          return this._bikes.slice();
      }

      /**
       * Gets all of the available choices for a bike value.
       *
       * @param {string} key
       *     The available keys are as follows:
       *     - `"datespan"`
       *     - `"dates"`
       *     - `"model"`
       *     - `"color"`
       *     - `"location"`
       *     - `"rating"`
       * @return {!Array<(!DateOption|string|number)>}
       */
      choices(key) {
          switch (key) {
              case 'datespan':
                  return [ this._db.startDate, this._db.endDate ];
              case 'dates':
                  return Array.from(this._db.calendar.dates.values());
              case 'model':
              case 'color':
              case 'location':
                  return Object.keys(this._db[key]);
              case 'rating':
                  return [ 1, 2, 3, 4, 5 ];
          }
          return [];
      }

      /**
       * @return {void}
       */
      update() {
          if (this._pageOptions.has('from') || this._pageOptions.has('to')) {
              this._available = getAvailableBikes(this._db, this._pageOptions);
              this._matching = getMatchingBikes(this._db, this._pageOptions);
              this._bikes = getSelectedBikes(this._available, this._matching);
          } else {
              this._available = this._db.data;
              this._matching = getMatchingBikes(this._db, this._pageOptions);
              this._bikes = this._matching;
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
   * @return {!Object}
   */
  function newCalendar(startDate, endDate) {
      const calendar = newObject();
      const dates = new Map();
      const data = new Map();
      calendar.dates = dates;
      calendar.data = data;
      const startYear = startDate.year();
      const startMonth = startDate.month();
      const stopMonth = endDate.month() === 12
          ? 1
          : endDate.month() + 1;
      const startDay = startDate.day();
      for (let i = 1, date = startDate; date.month() !== stopMonth; ++i) {
          const key = date.key();
          dates.set(key, date);
          data.set(key, new Set());
          date = new DateOption(startYear, startMonth, startDay + i);
      }
      return calendar;
  }

  /**
   * @private
   * @return {!Object}
   */
  function newRating() {
      const rating = newObject();
      rating[1] = newObject();
      rating[1].data = [];
      rating[2] = newObject();
      rating[2].data = [];
      rating[3] = newObject();
      rating[3].data = [];
      rating[4] = newObject();
      rating[4].data = [];
      rating[5] = newObject();
      rating[5].data = [];
      return rating;
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
              reserved.add(date.key());
              date = new DateOption(date.year(), date.month(), date.day() + 1);
          }
      }
      return reserved;
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} bike
   * @return {void}
   */
  function addToCalendar(db, bike) {
      const reserved = newReserved(bike);
      const data = db.calendar.data;
      for (const key of data.keys()) {
          if (!reserved.has(key)) {
              data.get(key).add(bike);
          }
      }
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} bike
   * @return {void}
   */
  function addToModel(db, bike) {
      if (!(bike.model in db.model)) {
          db.model[bike.model] = newObject();
          db.model[bike.model].data = [];
          db.model[bike.model].color = newObject();
          db.model[bike.model].location = newObject();
          db.model[bike.model].rating = newRating();
      }
      db.model[bike.model].data.push(bike);
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} bike
   * @return {void}
   */
  function addToColor(db, bike) {
      if (!(bike.color in db.color)) {
          db.color[bike.color] = newObject();
          db.color[bike.color].data = [];
          db.color[bike.color].location = newObject();
          db.color[bike.color].rating = newRating();
      }
      if (!(bike.color in db.model[bike.model].color)) {
          db.model[bike.model].color[bike.color] = newObject();
          db.model[bike.model].color[bike.color].data = [];
          db.model[bike.model].color[bike.color].location = newObject();
          db.model[bike.model].color[bike.color].rating = newRating();
      }
      db.color[bike.color].data.push(bike);
      db.model[bike.model].color[bike.color].data.push(bike);
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} bike
   * @return {void}
   */
  function addToLocation(db, bike) {
      if (!(bike.location in db.location)) {
          db.location[bike.location] = newObject();
          db.location[bike.location].data = [];
          db.location[bike.location].rating = newRating();
      }
      if (!(bike.location in db.color[bike.color].location)) {
          db.color[bike.color].location[bike.location] = newObject();
          db.color[bike.color].location[bike.location].data = [];
          db.color[bike.color].location[bike.location].rating = newRating();
      }
      if (!(bike.location in db.model[bike.model].location)) {
          db.model[bike.model].location[bike.location] = newObject();
          db.model[bike.model].location[bike.location].data = [];
          db.model[bike.model].location[bike.location].rating = newRating();
      }
      if (!(bike.location in db.model[bike.model].color[bike.color].location)) {
          db.model[bike.model].color[bike.color]
              .location[bike.location] = newObject();
          db.model[bike.model].color[bike.color]
              .location[bike.location].data = [];
          db.model[bike.model].color[bike.color]
              .location[bike.location].rating = newRating();
      }
      db.location[bike.location].data.push(bike);
      db.color[bike.color].location[bike.location].data.push(bike);
      db.model[bike.model].location[bike.location].data.push(bike);
      db.model[bike.model].color[bike.color]
          .location[bike.location].data.push(bike);
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!Object} bike
   * @return {void}
   */
  function addToRating(db, bike) {
      const rating = Math.floor(bike.rating);
      db.rating[rating].data.push(bike);
      db.location[bike.location].rating[rating].data.push(bike);
      db.color[bike.color].rating[rating].data.push(bike);
      db.color[bike.color].location[bike.location]
          .rating[rating].data.push(bike);
      db.model[bike.model].rating[rating].data.push(bike);
      db.model[bike.model].location[bike.location]
          .rating[rating].data.push(bike);
      db.model[bike.model].color[bike.color].rating[rating].data.push(bike);
      db.model[bike.model].color[bike.color].location[bike.location]
          .rating[rating].data.push(bike);
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!PageOptions} opts
   * @return {!Set<!Object>}
   */
  function getAvailableBikes(db, opts) {
      if (opts.has('from')) {
          if (opts.from().compare(db.startDate) < 0) {
              opts.delete('from');
          } else if (opts.from().compare(db.endDate) > 0) {
              opts.from(db.endDate);
          }
      }
      if (opts.has('to')) {
          if (opts.to().compare(db.startDate) < 0) {
              opts.to(db.startDate);
          } else if (opts.to().compare(db.endDate) > 0) {
              opts.delete('to');
          }
      }
      const from = opts.from() || db.startDate;
      const to = opts.to() || db.endDate;
      if (from.equals(to)) {
          return db.calendar.data.get(from.key());
      }
      const keys = [];
      let foundStart = false;
      for (const [ key, date ] of db.calendar.dates) {
          if (foundStart) {
              keys.push(key);
              if (date.equals(to)) {
                  break;
              }
          } else if (date.equals(from)) {
              foundStart = true;
          }
      }
      const data = [];
      for (const key of keys) {
          data.push(db.calendar.data.get(key));
      }
      const available = new Set();
      outerloop:
      for (const bike of db.calendar.data.get(from.key())) {
          for (const set of data) {
              if (!set.has(bike)) {
                  continue outerloop;
              }
          }
          available.add(bike);
      }
      return available;
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!PageOptions} opts
   * @return {!Array<!Object>}
   */
  function getMatchingBikes(db, opts) {
      if (opts.has('model')) {
          if (!(opts.model() in db.model)) {
              return [];
          }
          db = db.model[opts.model()];
      }
      if (opts.has('color')) {
          if (!(opts.color() in db.color)) {
              return [];
          }
          db = db.color[opts.color()];
      }
      if (opts.has('location')) {
          if (!(opts.location() in db.location)) {
              return [];
          }
          db = db.location[opts.location()];
      }
      if (opts.has('rating')) {
          if (!(opts.rating() in db.rating)) {
              return [];
          }
          db = db.rating[opts.rating()];
      }
      return db.data;
  }

  /**
   * @private
   * @param {!Set<!Object>} available
   * @param {!Array<!Object>} matching
   * @return {!Array<!Object>}
   */
  function getSelectedBikes(available, matching) {
      const selected = [];
      for (const bike of matching) {
          if (available.has(bike)) {
              selected.push(bike);
          }
      }
      return selected;
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
   * This component creates and manages the bike list filters.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Filters({
    opts,
    db,
    bikes,
    handleOptionsChange
  }) {
    const datespan = db.choices('datespan');
    const fromMaxDate = opts.has('to') ? opts.to().strictkey() : datespan[1].strictkey();
    const toMinDate = opts.has('from') ? opts.from().strictkey() : datespan[0].strictkey();
    const models = db.choices('model');
    const colors = db.choices('color');
    const locations = db.choices('location');
    const ratings = db.choices('rating');
    /**
     * @param {!Object} event
     * @return {void}
     */

    function handleFromChange(event) {
      const input = event.target;
      const from = input.value;

      if (from && VALID_OPTION_INPUTS.from(from)) {
        const [start, end] = db.choices('datespan');
        opts.from(from);

        if (!opts.has('from')) {
          input.value = '';
        } else if (opts.from().compare(start) < 0) {
          opts.delete('from');
          input.value = '';
        } else if (opts.from().compare(end) > 0) {
          opts.from(end);

          if (opts.has('from')) {
            input.value = opts.from().strictkey();
          } else {
            opts.delete('from');
            input.value = '';
          }
        }
      } else {
        opts.delete('from');
        input.value = '';
      }

      handleOptionsChange();
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleToChange(event) {
      const input = event.target;
      const to = input.value;

      if (to && VALID_OPTION_INPUTS.to(to)) {
        const [start, end] = db.choices('datespan');
        opts.to(to);

        if (!opts.has('to')) {
          input.value = '';
        } else if (opts.to().compare(start) < 0) {
          opts.to(start);

          if (opts.has('to')) {
            input.value = opts.to().strictkey();
          } else {
            opts.delete('to');
            input.value = '';
          }
        } else if (opts.to().compare(end) > 0) {
          opts.delete('to');
          input.value = '';
        }
      } else {
        opts.delete('to');
        input.value = '';
      }

      handleOptionsChange();
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleModelChange(event) {
      const input = event.target;
      const model = trimWhitespace(input.value);

      if (model && VALID_OPTION_INPUTS.model(model)) {
        opts.model(model);
      } else {
        opts.delete('model');
        input.value = '';
      }

      handleOptionsChange();
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleColorChange(event) {
      const input = event.target;
      const color = trimWhitespace(input.value);

      if (color && VALID_OPTION_INPUTS.color(color)) {
        opts.color(color);
      } else {
        opts.delete('color');
        input.value = '';
      }

      handleOptionsChange();
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleLocationChange(event) {
      const input = event.target;
      const location = trimWhitespace(input.value);

      if (location && VALID_OPTION_INPUTS.location(location)) {
        opts.location(location);
      } else {
        opts.delete('location');
        input.value = '';
      }

      handleOptionsChange();
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleRatingChange(event) {
      const input = event.target;
      const rating = input.value;

      if (rating && VALID_OPTION_INPUTS.rating(rating)) {
        opts.rating(rating);
      } else {
        opts.delete('rating');
        input.value = '';
      }

      handleOptionsChange();
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filters"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "from"
    }, "Available From:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "date",
      id: "from",
      className: "date",
      min: datespan[0].strictkey(),
      max: fromMaxDate,
      onChange: handleFromChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "to"
    }, "Available To:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "date",
      id: "to",
      className: "date",
      min: toMinDate,
      max: datespan[1].strictkey(),
      onChange: handleToChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "model"
    }, "Model:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "model",
      className: "text",
      list: "modeldatalist",
      onChange: handleModelChange,
      placeholder: "Model"
    }), /*#__PURE__*/React__default["default"].createElement("datalist", {
      id: "modeldatalist"
    }, models.map((model, i) => /*#__PURE__*/React__default["default"].createElement("option", {
      key: makeUniqueID(i),
      value: model
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "color"
    }, "Color:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "color",
      className: "text",
      list: "colordatalist",
      onChange: handleColorChange,
      placeholder: "Color"
    }), /*#__PURE__*/React__default["default"].createElement("datalist", {
      id: "colordatalist"
    }, colors.map((color, i) => /*#__PURE__*/React__default["default"].createElement("option", {
      key: makeUniqueID(i),
      value: color
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "location"
    }, "Location:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "location",
      className: "text",
      list: "locationdatalist",
      onChange: handleLocationChange,
      placeholder: "Location"
    }), /*#__PURE__*/React__default["default"].createElement("datalist", {
      id: "locationdatalist"
    }, locations.map((location, i) => /*#__PURE__*/React__default["default"].createElement("option", {
      key: makeUniqueID(i),
      value: location
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "rating"
    }, "Rating:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "rating",
      className: "text",
      list: "ratingdatalist",
      onChange: handleRatingChange,
      placeholder: "Rating"
    }), /*#__PURE__*/React__default["default"].createElement("datalist", {
      id: "ratingdatalist"
    }, ratings.map((rating, i) => /*#__PURE__*/React__default["default"].createElement("option", {
      key: makeUniqueID(i),
      value: rating
    })))));
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
   * This component renders a single bike.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Bike({
    bike
  }) {
    const href = SITE_URL + '/bike/' + bike.id;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikerow"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      id: 'bike:' + bike.id,
      className: "bike"
    }, /*#__PURE__*/React__default["default"].createElement("a", {
      href: href,
      className: "bikelink"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, bike.model)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, bike.color)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, bike.location)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikecell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, bike.rating, " / 5")))));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * BIKE-LIST COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component renders the list of bikes.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function BikeList({
    opts,
    db,
    bikes,
    tab
  }) {
    const start = (tab - 1) * 20;
    const end = Math.min(bikes.length, tab * 20);
    const list = bikes.slice(start, end);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "bikelist"
    }, list.length === 0 && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "nobikes"
    }, "No Matching Bikes"), list.map((bike, i) => /*#__PURE__*/React__default["default"].createElement(Bike, {
      key: makeUniqueID(i),
      bike: bike
    })));
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
   * The page tabs enable you to view a new selection of 20 matching bikes.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Tabs({
    bikes,
    tab,
    handleTabChange
  }) {
    const lastTab = Math.ceil(bikes.length / 20); // We are going to pick 9 sequential page tabs (including the current tab)
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
   * BIKES COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This method is the root component for the main bikes list page. It sets up
   * the environment, verifies the user, loads the bikes, and hands over the
   * rendering to other components.
   *
   * @return {!ReactElement}
   */

  function Bikes() {
    /** @const {!PageOptions} */
    const [opts] = React__default["default"].useState(() => new PageOptions());
    /** @const {!BikesDB} */

    const [db] = React__default["default"].useState(() => new BikesDB(opts));
    /** @const {boolean} */

    const [authenticated, setAuthenticated] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [loggedin, setLoggedin] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [loaded, setLoaded] = React__default["default"].useState(false);
    /** @const {number} */

    const [tab, setTab] = React__default["default"].useState(() => opts.tab());
    /** @const {!Array<!Object>} */

    const [bikes, setBikes] = React__default["default"].useState(() => db.bikes()); // This effect sets up the browser history state, appends the handler for
    // history state change (e.g. the user presses the back button), and
    // starts the bike list download. On unmount this effect removes the
    // history state management listener.

    React__default["default"].useEffect(() => {
      if (!opts.has('tab')) {
        opts.tab(1);
      }

      window.history.replaceState({
        opts: opts.state(),
        bikes
      }, '', opts.urlpath());
      window.addEventListener('popstate', handleHistoryChange);
      authenticateUser(handleAuthenticateComplete);
      downloadBikes(1, opts, db, handleDownloadComplete);
      return () => {
        window.removeEventListener('popstate', handleHistoryChange);
      };
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
      const bikes = db.bikes(); // If the tab value is greater than the total tab count set the tab
      // to the last tab.

      opts.tab(bikes.length <= (opts.tab() - 1) * 20 ? Math.ceil(bikes.length / 20) : opts.tab());
      window.history.replaceState({
        opts: opts.state(),
        bikes
      }, '', opts.urlpath());
      setTab(opts.tab());
      setBikes(bikes);
      setLoaded(true);
    }
    /**
     * @return {void}
     */


    function handleOptionsChange() {
      db.update();
      const bikes = db.bikes();
      window.history.pushState({
        opts: opts.state(),
        bikes
      }, '', opts.urlpath());
      setTab(opts.tab() || 1);
      setBikes(bikes);
    }
    /**
     * @param {number} tab
     * @return {void}
     */


    function handleTabChange(tab) {
      opts.tab(tab);
      window.history.pushState({
        opts: opts.state(),
        bikes
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
      setTab(opts.tab() || 1);
      setBikes(event.state.bikes);

      if (!authenticated) {
        authenticateUser(handleAuthenticateComplete);
      }

      if (!loaded) {
        downloadBikes(1, opts, db, handleDownloadComplete);
      }
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
      }, "Bike Rental"), /*#__PURE__*/React__default["default"].createElement(Loading, null));
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(UserNavBar, null), /*#__PURE__*/React__default["default"].createElement(LogButtons, {
      loggedin: loggedin,
      handleLogout: handleLogout
    }), /*#__PURE__*/React__default["default"].createElement("h1", {
      className: "intro"
    }, "Bike Rental"), /*#__PURE__*/React__default["default"].createElement(Filters, {
      opts: opts,
      db: db,
      bikes: bikes,
      handleOptionsChange: handleOptionsChange
    }), /*#__PURE__*/React__default["default"].createElement(BikeList, {
      opts: opts,
      db: db,
      bikes: bikes,
      tab: tab
    }), /*#__PURE__*/React__default["default"].createElement(Tabs, {
      bikes: bikes,
      tab: tab,
      handleTabChange: handleTabChange
    }));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * MAIN APP
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /** @const {!HTMLElement} */

  const main = document.getElementsByTagName('main')[0];
  /** @const {!Object} */

  const root = ReactDOM__default["default"].createRoot(main);
  root.render( /*#__PURE__*/React__default["default"].createElement(Bikes, null));

})(React, ReactDOM);
