/**
 * ---------------------------------------------------------------------------
 * FILTERS COMPONENT
 * ---------------------------------------------------------------------------
 * @author Adam Smith <imagineadamsmith@gmail.com> (https://github.com/imaginate)
 * @copyright 2022 Adam A Smith <imagineadamsmith@gmail.com>
 */

/** @const {!React} */
import React from 'react';
/** @const {!function} */
import trimWhitespace from '../../../../helpers/trim-whitespace.js';
/** @const {!ValidOptionInputs} */
import VALID_OPTION_INPUTS from '../_helpers/valid-option-inputs.js';

/**
 * This component creates and manages the bike list filters.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function Filters({ opts, db, bikes, handleOptionsChange }) {

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

    return (
        <div className="filters">
            <div className="filter">
                <label htmlFor="id">User ID:</label>
                <input
                    type="text"
                    id="id"
                    className="text"
                    onChange={handleIDChange}
                    placeholder="User ID"
                />
            </div>
            <div className="filter">
                <label htmlFor="first">First Name:</label>
                <input
                    type="text"
                    id="first"
                    className="text"
                    placeholder="First Name"
                    onChange={handleFirstChange}
                />
            </div>
            <div className="filter">
                <label htmlFor="last">Last Name:</label>
                <input
                    type="text"
                    id="last"
                    className="text"
                    placeholder="Last Name"
                    onChange={handleLastChange}
                />
            </div>
            <div className="filter">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    className="text"
                    placeholder="Email"
                    onChange={handleEmailChange}
                />
            </div>
            <div className="filter">
                <label htmlFor="level">Authority:</label>
                <select id="level" onChange={handleLevelChange}>
                    <option value='' selected>Users &#38; Managers</option>
                    <option value='1'>Users Only</option>
                    <option value='2'>Managers Only</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
