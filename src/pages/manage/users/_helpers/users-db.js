/**
 * ---------------------------------------------------------------------------
 * USERS DB CLASS
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!SuffixTree} */
import SuffixTree from './suffix-tree.js';

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
        db.first = new SuffixTree('first');
        db.last = new SuffixTree('last');
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
        : null;
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

    if (!opts.has(key)) {
        return set;
    }

    const newset = db[key].get(opts.get(key));

    if (!set) {
        return newset;
    }
    if (!newset) {
        return set;
    }

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

export default UsersDB;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
