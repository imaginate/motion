/**
 * ---------------------------------------------------------------------------
 * BIKES DB CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!DateOption} */
import DateOption from '../../../helpers/date-option.js';

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

export default BikesDB;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
