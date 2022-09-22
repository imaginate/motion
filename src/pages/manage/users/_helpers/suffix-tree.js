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
     *     - `"first"`
     *     - `"last"`
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
