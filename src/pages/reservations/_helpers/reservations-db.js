/**
 * ---------------------------------------------------------------------------
 * RESERVATIONS DB CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!DateOption} */
import DateOption from '../../../helpers/date-option.js';

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

export default ReservationsDB;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
