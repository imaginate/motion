/**
 * ---------------------------------------------------------------------------
 * PAGE OPTIONS CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!ValidOptionInputs} */
import VALID_OPTION_INPUTS from './valid-option-inputs.js';
/** @const {!DateOption} */
import DateOption from '../../../helpers/date-option.js';

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

export default PageOptions;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
