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
   * DOWNLOAD BIKES HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * This method handles the AJAX calls that download the users. After each
   * successful fetch it adds its downloaded users to the current state and
   * initiates the next AJAX call until all users have been downloaded.
   *
   * @param {number} page
   * @param {!PageOptions} opts
   * @param {!UsersDB} db
   * @param {!function} done
   * @return {void}
   */
  function downloadUsers(page, opts, db, done) {
      const url = SITE_URL + '/api/manager/users/' + page;
      let isLastPage = false;
      fetch(url)
          .catch(err => {
              err.message += '\nfetch("' + url + '") failed to connect with the'
                  + ' server';
              console.error(err.message);
              console.error(err);
              alert('SERVER ERROR: The attempt to connect with our server to'
                  + ' download the users failed.');
              setTimeout(() => { throw err }, 0);
          })
          .then(res => {
              if (!res.ok) {
                  const err = new Error('fetch("' + url + '") responded with'
                      + ' status ' + res.status);
                  console.error(err.message);
                  console.error(err);
                  alert('SERVER ERROR: The attempt to download the users from'
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
          .then(users => {
              if (!isLastPage) {
                  downloadUsers(page + 1, opts, db, done);
              }
              db.adds(users, false);
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
   * IS VALID NAME INPUT HELPER
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /** @const {!RegExp} */
  const NAME_PATT = /^[a-zA-Z0-9"](?:[a-zA-Z0-9-~ ,'"&/]{0,30}[a-zA-Z0-9'"])?$/;

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
   * VALID OPTION INPUTS OBJECT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * @typedef {{
   *     tab: !function(*): boolean,
   *     id: !function(*): boolean,
   *     first: !function(*): boolean,
   *     last: !function(*): boolean,
   *     email: !function(*): boolean,
   *     level: !function(*): boolean
   * }} ValidOptionInputs
   */

  /** @const {!RegExp} */
  const TAB_PATT = /^[0-9]+$/;
  /** @const {!RegExp} */
  const LEVEL_PATT = /^[12]$/;

  /**
   * The valid page option keys and their value validation methods.
   *
   * @const {!ValidOptionInputs}
   */
  const VALID_OPTION_INPUTS = Object.create(null);
  VALID_OPTION_INPUTS.tab = isValidTabInput;
  VALID_OPTION_INPUTS.id = isValidIDInput;
  VALID_OPTION_INPUTS.first = isValidNameInput;
  VALID_OPTION_INPUTS.last = isValidNameInput;
  VALID_OPTION_INPUTS.email = isValidEmail;
  VALID_OPTION_INPUTS.level = isValidLevelInput;

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
  function isValidLevelInput(input) {
      if (typeof input === 'number') {
          input = String(input);
      }
      return !!input && typeof input === 'string' && LEVEL_PATT.test(input);
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
       *     - `"first"`
       *     - `"last"`
       *     - `"email"`
       *     - `"level"`
       * @return {(string|number|undefined)}
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
       *     - `"first"`
       *     - `"last"`
       *     - `"email"`
       *     - `"level"`
       * @return {(string|number|undefined)}
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
       *     - `"first"`
       *     - `"last"`
       *     - `"email"`
       *     - `"level"`
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
       *     - `"first"`
       *     - `"last"`
       *     - `"email"`
       *     - `"level"`
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
       *     - `"first"`
       *     - `"last"`
       *     - `"email"`
       *     - `"level"`
       * @param {(string|number)} val
       * @return {(string|number|undefined)}
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
                  first: this.first(),
                  last: this.last(),
                  email: this.email(),
                  level: this.level()
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
       * @param {(string|number)=} val = `undefined`
       * @return {(number|undefined)}
       */
      id(val) {
          return val === undefined
              ? this.get('id')
              : this.set('id', val);
      }

      /**
       * @param {string=} val = `undefined`
       * @return {(string|undefined)}
       */
      first(val) {
          return val === undefined
              ? this.get('first')
              : this.set('first', val);
      }

      /**
       * @param {string=} val = `undefined`
       * @return {(string|undefined)}
       */
      last(val) {
          return val === undefined
              ? this.get('last')
              : this.set('last', val);
      }

      /**
       * @param {string=} val = `undefined`
       * @return {(string|undefined)}
       */
      email(val) {
          return val === undefined
              ? this.get('email')
              : this.set('email', val);
      }

      /**
       * @param {(string|number)=} val = `undefined`
       * @return {(number|undefined)}
       */
      level(val) {
          return val === undefined
              ? this.get('level')
              : this.set('level', val);
      }
  }

  /**
   * @private
   * @param {string} key
   * @param {*} val
   * @return {(number|string|undefined)}
   */
  function clean(key, val) {
      switch (key) {
          case 'tab':
              return cleanTab(val);
          case 'id':
              return cleanID(val);
          case 'first':
              return cleanString('first', val);
          case 'last':
              return cleanString('last', val);
          case 'email':
              return cleanString('email', val);
          case 'level':
              return cleanLevel(val);
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
   * @return {string}
   */
  function cleanString(key, val) {
      return typeof val === 'string'
          ? val
          : '';
  }

  /**
   * @private
   * @param {*} val
   * @return {number}
   */
  function cleanLevel(val) {
      return VALID_OPTION_INPUTS.level(val)
          ? +val
          : 0;
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * SUFFIX TREE CLASS
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * A suffix tree designed specifically designed for user names and emails.
   *
   * @class SuffixTree
   */
  class SuffixTree {
      /**
       * @param {string} key
       *     Must be one of the following:
       *     - `"first_name"`
       *     - `"last_name"`
       *     - `"email"`
       * @constructor
       */
      constructor(key) {
          this.root = new SuffixTreeNode();
          this.key = key;
      }
      
      /** 
       * @param {!Object} user
       * @return {void}
       */
      add(user) {
          const str = user[this.key];
          for (let i = 0; i < str.length; ++i) {
              let node = this.root;
              for (const ch of str.slice(i)) {
                  node = node.add(ch, user);
              }
          }
      }

      /**
       * @param {!Array<!Object>} users
       * @return {void}
       */
      adds(users) {
          for (const user of users) {
              this.add(user);
          }
      }

      /** 
       * @param {string} str
       * @return {?Set<!Object>}
       */
      get(str) {
          let node = this.root;
          for (const ch of str) {
              node = node.get(ch);
              if (!node) {
                  break;
              }
          }
          return node && node.users;
      }

      /** 
       * @param {string} str
       * @return {boolean}
       */
      has(str) {
          let node = this.root;
          for (const ch of str) {
              node = node.get(ch);
              if (!node) {
                  return false;
              }
          }
          return true;
      }
  }

  /**
   * The nodes for the *SuffixTree*. The *root* property of the *SuffixTree* is
   * an instance of this class.
   *
   * @class SuffixTreeNode
   */
  class SuffixTreeNode {
      /**
       * @constructor
       */
      constructor() {
          this.users = new Set();
          this.children = Object.create(null);
      }

      /** 
       * @param {string} ch
       * @param {!Object} user
       * @return {!SuffixTreeNode}
       */
      add(ch, user) {
          ch = ch.toLowerCase();
          if (!(ch in this.children)) {
              this.children[ch] = new SuffixTreeNode();
          }
          this.children[ch].users.add(user);
          return this.children[ch];
      }
      
      /** 
       * @param {string} ch
       * @return {?SuffixTreeNode}
       */
      get(ch) {
          ch = ch.toLowerCase();
          return ch in this.children
              ? this.children[ch]
              : null;
      }

      /** 
       * @param {string} ch
       * @return {boolean}
       */
      has(ch) {
          return ch.toLowerCase() in this.children;
      }
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * USERS DB CLASS
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */

  /**
   * A database with all lists of the available users and user choices.
   *
   * @class UsersDB
   */
  class UsersDB {
      /**
       * @param {!PageOptions} opts
       * @param {?Array<!Object>=} users = `null`
       * @constructor
       */
      constructor(opts, users = null) {
          const db = newObject();
          db.all = [];
          db.allset = new Set();
          db.first = new SuffixTree('first_name');
          db.last = new SuffixTree('last_name');
          db.email = new SuffixTree('email');
          db.level = newObject();
          db.level[1] = new Set();
          db.level[2] = new Set();
          db.level.get = getLevel;
          this._db = db;
          this._opts = opts;
          this._users = [];
          if (users) {
              this.adds(users);
          }
      }

      /**
       * @param {!Object} user
       * @param {boolean=} update = `true`
       * @return {void}
       */
      add(user, update = true) {
          const db = this._db;
          db.all.push(user);
          db.allset.add(user);
          db.first.add(user);
          db.last.add(user);
          db.email.add(user);
          if (user.manager) {
              db.level[2].add(user);
          } else {
              db.level[1].add(user);
          }
          if (update) {
              this.update();
          }
      }

      /**
       * @param {!Array<!Object>} users
       * @param {boolean=} update = `true`
       * @return {void}
       */
      adds(users, update = true) {
          for (const user of users) {
              this.add(user, false);
          }
          if (update) {
              this.update();
          }
      }

      /**
       * Gets all users that match the selected filtering options.
       *
       * @return {!Array<!Object>}
       */
      users() {
          return this._users.slice();
      }

      /**
       * @return {void}
       */
      update() {
          this._users = this._opts.has('id')
              ? getUser(this._opts.id(), this._db)
              : getMatchingUsers(this._db, this._opts);
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
   * @param {(number|string)} level
   * @return {!Set<!Object>}
   */
  function getLevel(level) {
      return this[level];
  }

  /**
   * @private
   * @param {number} id
   * @param {!Object} db
   * @return {!Array<!Object>}
   */
  function getUser(id, db) {
      return id > db.all.length
          ? []
          : [ db.all[id - 1] ];
  }

  /**
   * @private
   * @param {!Object} db
   * @param {!PageOptions} opts
   * @return {!Array<!Object>}
   */
  function getMatchingUsers(db, opts) {
      let set = opts.has('first')
          ? db.first.get(opts.first())
          : db.allset;
      set = mergeSets('last', set, db, opts);
      set = mergeSets('email', set, db, opts);
      set = mergeSets('level', set, db, opts);
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

      const newset = db[key].get(opts.get(key));

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
      for (const user of itset) {
          if (refset.has(user)) {
              set.add(user);
          }
      }
      return set;
  }

  // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * MANAGER NAV BAR COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This is the user navigation component for all management pages.
   *
   * @return {!ReactElement}
   */

  const ManagerNavBar = React__default["default"].memo(function ManagerNavBar() {
    return /*#__PURE__*/React__default["default"].createElement("nav", {
      className: "topnav"
    }, /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/manage/bikes',
      className: "topnav"
    }, "Bikes"), /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/manage/users',
      className: "topnav"
    }, "Users"), /*#__PURE__*/React__default["default"].createElement("a", {
      href: SITE_URL + '/manage/reservations',
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
    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleIDChange(event) {
      const input = event.target;
      const val = trimWhitespace(input.value);
      const prev = opts.id();

      if (VALID_OPTION_INPUTS.id(val)) {
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


    function handleFirstChange(event) {
      const input = event.target;
      const val = input.value;
      const prev = opts.first();

      if (val) {
        opts.first(val);
      } else {
        opts.delete('first');
      }

      if (prev !== opts.first()) {
        handleOptionsChange();
      }
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleLastChange(event) {
      const input = event.target;
      const val = input.value;
      const prev = opts.last();

      if (val) {
        opts.last(val);
      } else {
        opts.delete('last');
      }

      if (prev !== opts.last()) {
        handleOptionsChange();
      }
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleEmailChange(event) {
      const input = event.target;
      const val = input.value;
      const prev = opts.email();

      if (val) {
        opts.email(val);
      } else {
        opts.delete('email');
      }

      if (prev !== opts.email()) {
        handleOptionsChange();
      }
    }
    /**
     * @param {!Object} event
     * @return {void}
     */


    function handleLevelChange(event) {
      const input = event.target;
      const val = input.value;
      const prev = opts.level();

      if (val) {
        opts.level(val);
      } else {
        opts.delete('level');
      }

      if (prev !== opts.level()) {
        handleOptionsChange();
      }
    }

    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filters"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "id"
    }, "User ID:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "id",
      className: "text",
      placeholder: "User ID",
      value: opts.has('id') ? opts.id() : '',
      onChange: handleIDChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "first"
    }, "First Name:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "first",
      className: "text",
      placeholder: "First Name",
      value: opts.has('first') ? opts.first() : '',
      onChange: handleFirstChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "last"
    }, "Last Name:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "last",
      className: "text",
      placeholder: "Last Name",
      value: opts.has('last') ? opts.last() : '',
      onChange: handleLastChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "email"
    }, "Email:"), /*#__PURE__*/React__default["default"].createElement("input", {
      type: "text",
      id: "email",
      className: "text",
      placeholder: "Email",
      value: opts.has('email') ? opts.email() : '',
      onChange: handleEmailChange
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "filter"
    }, /*#__PURE__*/React__default["default"].createElement("label", {
      htmlFor: "level"
    }, "Authority:"), /*#__PURE__*/React__default["default"].createElement("select", {
      id: "level",
      onChange: handleLevelChange,
      value: opts.has('level') ? opts.level() : ''
    }, /*#__PURE__*/React__default["default"].createElement("option", {
      value: ""
    }, "Users & Managers"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "1"
    }, "Users Only"), /*#__PURE__*/React__default["default"].createElement("option", {
      value: "2"
    }, "Managers Only"))));
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
   * USER COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component renders a single user.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function User({
    user
  }) {
    const href = SITE_URL + '/manage/user/' + user.id;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "userrow"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      id: 'user:' + user.id,
      className: "user"
    }, /*#__PURE__*/React__default["default"].createElement("a", {
      href: href,
      className: "userlink"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "usercell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, user.id)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "usercell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, user.first_name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "usercell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, user.last_name)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "usercell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, user.email)), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "usercell"
    }, /*#__PURE__*/React__default["default"].createElement("p", null, user.manager ? 'Manager' : 'User')))));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * USER LIST COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This component renders the list of users.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function UserList({
    opts,
    db,
    users,
    tab
  }) {
    const start = (tab - 1) * 20;
    const end = Math.min(users.length, tab * 20);
    const list = users.slice(start, end);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "userlist"
    }, list.length === 0 && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "nousers"
    }, "No Matching Users"), list.map((user, i) => /*#__PURE__*/React__default["default"].createElement(User, {
      key: makeUniqueID(i),
      user: user
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
   * The page tabs enable you to view a new selection of 20 matching users.
   *
   * @param {!Object} props
   * @return {!ReactElement}
   */

  function Tabs({
    users,
    tab,
    handleTabChange
  }) {
    const lastTab = Math.ceil(users.length / 20); // We are going to pick 9 sequential page tabs (including the current tab)
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
   * USERS COMPONENT
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /**
   * This method is the root component for the users management page. It sets up
   * the environment, verifies the manager, loads the users, and hands over the
   * rendering to other components.
   *
   * @return {!ReactElement}
   */

  function Users() {
    /** @const {boolean} */
    const [authenticated, setAuthenticated] = React__default["default"].useState(false);
    /** @const {boolean} */

    const [loaded, setLoaded] = React__default["default"].useState(false);
    /** @const {!PageOptions} */

    const [opts] = React__default["default"].useState(() => new PageOptions());
    /** @const {!UsersDB} */

    const [db] = React__default["default"].useState(() => new UsersDB(opts));
    /** @const {number} */

    const [tab, setTab] = React__default["default"].useState(() => opts.tab());
    /** @const {!Array<!Object>} */

    const [users, setUsers] = React__default["default"].useState(() => db.users()); // This effect sets up the browser history state, appends the handler for
    // history state change (e.g. the user presses the back button), and
    // starts the user list download. On unmount this effect removes the
    // history state management listener.

    React__default["default"].useEffect(() => {
      if (!opts.has('tab')) {
        opts.tab(1);
      }

      window.history.replaceState({
        opts: opts.state(),
        users
      }, '', opts.urlpath());
      window.addEventListener('popstate', handleHistoryChange);
      authenticateManager(handleAuthenticateComplete);
      return () => {
        window.removeEventListener('popstate', handleHistoryChange);
      };
    }, []);
    /**
     * @param {boolean} loggedin
     * @param {boolean} isManager
     * @return {void}
     */

    function handleAuthenticateComplete(loggedin, isManager) {
      if (!loggedin) {
        window.location.replace(SITE_URL + '/login');
        return;
      }

      if (!isManager) {
        window.location.replace(SITE_URL + '/bikes');
        return;
      }

      setAuthenticated(true);
      downloadUsers(1, opts, db, handleDownloadComplete);
    }
    /**
     * @return {void}
     */


    function handleDownloadComplete() {
      db.update();
      const users = db.users(); // If the tab value is greater than the total tab count set the tab
      // to the last tab.

      opts.tab(users.length <= (opts.tab() - 1) * 20 ? Math.ceil(users.length / 20) : opts.tab());
      window.history.replaceState({
        opts: opts.state(),
        users
      }, '', opts.urlpath());
      setTab(opts.tab());
      setUsers(users);
      setLoaded(true);
    }
    /**
     * @return {void}
     */


    function handleOptionsChange() {
      db.update();
      const users = db.users();
      window.history.pushState({
        opts: opts.state(),
        users
      }, '', opts.urlpath());
      setTab(opts.tab() || 1);
      setUsers(users);
    }
    /**
     * @param {number} tab
     * @return {void}
     */


    function handleTabChange(tab) {
      opts.tab(tab);
      window.history.pushState({
        opts: opts.state(),
        users
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
      setUsers(event.state.users);

      if (!authenticated) {
        authenticateManager(handleAuthenticateComplete);
      }

      if (!loaded) {
        downloadUsers(1, opts, db, handleDownloadComplete);
      }
    }
    /**
     * @return {void}
     */


    function handleLogout() {
      window.location.href = SITE_URL + '/bikes';
    }

    if (!authenticated || !loaded) {
      return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ManagerNavBar, null), /*#__PURE__*/React__default["default"].createElement("h1", {
        className: "intro"
      }, "Manage Users"), /*#__PURE__*/React__default["default"].createElement(Loading, null));
    }

    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ManagerNavBar, null), /*#__PURE__*/React__default["default"].createElement(LogButtons, {
      loggedin: true,
      handleLogout: handleLogout
    }), /*#__PURE__*/React__default["default"].createElement("h1", {
      className: "intro"
    }, "Manage Users"), /*#__PURE__*/React__default["default"].createElement(Filters, {
      opts: opts,
      db: db,
      users: users,
      handleOptionsChange: handleOptionsChange
    }), /*#__PURE__*/React__default["default"].createElement(UserList, {
      opts: opts,
      db: db,
      users: users,
      tab: tab
    }), /*#__PURE__*/React__default["default"].createElement(Tabs, {
      users: users,
      tab: tab,
      handleTabChange: handleTabChange
    }));
  }
   // vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol

  /**
   * ---------------------------------------------------------------------------
   * MANAGE USERS APP
   * ---------------------------------------------------------------------------
   * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
   * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
   */
  /** @const {!HTMLElement} */

  const main = document.getElementsByTagName('main')[0];
  /** @const {!Object} */

  const root = ReactDOM__default["default"].createRoot(main);
  root.render( /*#__PURE__*/React__default["default"].createElement(Users, null));

})(React, ReactDOM);
