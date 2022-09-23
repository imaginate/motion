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
import makeUniqueID from '../../../helpers/make-unique-id.js';
/** @const {!function} */
import trimWhitespace from '../../../helpers/trim-whitespace.js';
/** @const {!ValidOptionInputs} */
import VALID_OPTION_INPUTS from '../_helpers/valid-option-inputs.js';

/**
 * This component creates and manages the reservation list filters.
 *
 * @param {!Object} props
 * @return {!ReactElement}
 */
function Filters({ opts, db, reservations, handleOptionsChange }) {

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleIDChange(event) {
        const input = event.target;
        const val = trimWhitespace(input.value);
        const prev = opts.id();
        if (val && VALID_OPTION_INPUTS.id(val)) {
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
    function handleBikeChange(event) {
        const input = event.target;
        const val = trimWhitespace(input.value);
        const prev = opts.bike();
        if (val && VALID_OPTION_INPUTS.bike(val)) {
            opts.bike(val);
        } else {
            opts.delete('bike');
            input.value = '';
        }
        if (prev !== opts.bike()) {
            handleOptionsChange();
        }
    }

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleDateChange(event) {
        const input = event.target;
        const val = input.value;
        const prev = opts.date();
        if (val && VALID_OPTION_INPUTS.date(val)) {
            opts.date(val);
        } else {
            opts.delete('date');
            input.value = '';
        }
        if (prev !== opts.date()) {
            handleOptionsChange();
        }
    }

    /**
     * @param {!Object} event
     * @return {void}
     */
    function handleRatingChange(event) {
        const input = event.target;
        const val = input.value;
        const prev = opts.rating();
        if (val && VALID_OPTION_INPUTS.rating(val)) {
            opts.rating(val);
        } else {
            opts.delete('rating');
            input.value = '';
        }
        if (prev !== opts.rating()) {
            handleOptionsChange();
        }
    }

    return (
        <div className="filters">
            <div className="filter">
                <label htmlFor="id">Reservation ID:</label>
                <input
                    type="text"
                    id="id"
                    className="text"
                    placeholder="Reservation ID"
                    value={opts.has('id') ? opts.id() : ''}
                    onChange={handleIDChange}
                />
            </div>
            <div className="filter">
                <label htmlFor="bike">Bike ID:</label>
                <input
                    type="text"
                    id="bike"
                    className="text"
                    placeholder="Bike ID"
                    value={opts.has('bike') ? opts.bike() : ''}
                    onChange={handleBikeChange}
                />
            </div>
            <div className="filter">
                <label htmlFor="date">Reserved On:</label>
                <input
                    type="date"
                    id="date"
                    className="date"
                    value={opts.has('date') ? opts.date().strictkey() : ''}
                    onChange={handleDateChange}
                />
            </div>
            <div className="filter">
                <label htmlFor="rating">Rating:</label>
                <select
                    id="rating"
                    value={opts.has('rating') ? opts.rating() : ''}
                    onChange={handleRatingChange}
                >
                    <options value="">All</option>
                    <options value="1">1</option>
                    <options value="2">2</option>
                    <options value="3">3</option>
                    <options value="4">4</option>
                    <options value="5">5</option>
                </select>
            </div>
        </div>
    );
}

export default Filters;

// vim:ts=4:et:ai:cc=79:fen:fdm=marker:eol
