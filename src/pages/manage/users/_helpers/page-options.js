/**
 * ---------------------------------------------------------------------------
 * PAGE OPTIONS CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!ValidOptionInputs} */
import VALID_OPTION_INPUTS from './valid-option-inputs.js';

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

export default PageOptions;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
