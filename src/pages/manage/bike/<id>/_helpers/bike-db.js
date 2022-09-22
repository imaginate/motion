/**
 * ---------------------------------------------------------------------------
 * BIKE DB CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!DateOption} */
import DateOption from '../../../../../helpers/date-option.js';

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

export default BikeDB;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
