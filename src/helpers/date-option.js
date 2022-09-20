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

export default DateOption;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
